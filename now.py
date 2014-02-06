#!/usr/bin/env python
#-*-coding:utf-8-*-
import tornado.httpserver
import tornado.ioloop
import tornado.web
import tornado.options
import tornado.auth
from tornado.options import define, options

from ldap_auth import Auth
import json


class BaseHandler(tornado.web.RequestHandler):

    def get_current_user(self):
        return self.get_secure_cookie("user")


class LogoutHandler(BaseHandler):

    def get(self):
        self.clear_cookie("user")
        self.redirect("/")


class LoginHandler(tornado.web.RequestHandler):

    def get(self):
        return self.render('login.html')

    def post(self):
        mail = self.get_argument('mail')
        if mail.endswith("@wandoujia.com"):
            mail = mail.strip("@wandoujia.com")
        passwd = self.get_argument("passwd")
        if Auth(mail, passwd):
            user = dict()
            user['email'] = mail + "@wandoujia.com"
            self.set_secure_cookie("user", json.dumps(user))
            self.redirect("/")
        else:
            return self.render('login_failed.html')


class IndexHandler(BaseHandler):

    @tornado.web.authenticated
    def get(self):
        if not self.current_user:
            raise tornado.web.HTTPError(403)
            return
        self.user = json.loads(self.current_user)
        email = self.user["email"]
        name = email.split("@")[0]
        self.render('index.html', name=name)

    @tornado.web.authenticated
    def post(self):
        if not self.current_user:
            raise tornado.web.HTTPError(403)
            return
        self.user = json.loads(self.current_user)
        email = self.user["email"]
        name = email.split("@")[0]
        self.render('index.html', name=name)


class ManagerHandler(BaseHandler):

    @tornado.web.authenticated
    def get(self):
        if not self.current_user:
            raise tornado.web.HTTPError(403)
            return
        self.user = json.loads(self.current_user)
        self.render('manager.html')


class AdminHandler(BaseHandler):

    @tornado.web.authenticated
    def get(self):
        if not self.current_user:
            raise tornado.web.HTTPError(403)
            return
        self.user = json.loads(self.current_user)
        self.render('admin.html')


class ReviewHandler(BaseHandler):

    @tornado.web.authenticated
    def get(self):
        if not self.current_user:
            raise tornado.web.HTTPError(403)
            return
        self.user = json.loads(self.current_user)
        self.render('admin.html')


def main():
    define("port", default=8089, help="run on the given port", type=int)
    settings = {"debug": True, "template_path": "templates",
                "static_path": "static", "login_url": "/login",
                "cookie_secret": "z1DAVh+WTvyqpWGmOtJCQLETQYUznEuYskSF06To="}
    tornado.options.parse_command_line()
    application = tornado.web.Application([
        (r"/", IndexHandler),
        (r"/login", LoginHandler),
        (r"/logout", LogoutHandler),
        (r"/manager", ManagerHandler),
        (r"/admin", AdminHandler),
        (r"/review", ReviewHandler),

    ], **settings)
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
if __name__ == "__main__":
    main()
