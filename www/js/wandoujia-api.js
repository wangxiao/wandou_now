// phonegap API
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// 豌豆荚的 API
var wandoujiaApi = {
    dianping: function() {
        $.ajax({
            type: 'get',
            url: 'http://now.wandoulabs.com/shop',
            async: false,
            contentType: 'application/json',
            dataType: 'jsonp',
            timeout: 10000,
            success: function(list){
                var data = {};
                data.list = list;
                var tpl = baidu.template('dianping-tpl', data);
                $('.app').append(tpl);

                $('body').on('click', '.d-fly', function () {
                    var url = $(this).data('url');
                    baseApi.openApp(url);
                });

                $('#dianpingSlider').slider({arrow:false, dots:false});
            },
            error: function(xhr, type){}
        });
    },
    douban: function() {
        return $.ajax({
            type: 'get',
            url: 'http://now.wandoulabs.com/movie',
            async: false,
            contentType: 'application/json',
            dataType: 'jsonp',
            timeout: 10000,
            success: function(list){
                var data = {};
                data.list = list;
                var tpl = baidu.template('douban-tpl', data);
                $('.app').append(tpl);
                $('.douban-id').on('click',function() {
                    var id = $(this).attr('data-id');
                    wandoujiaApi.openDoubanMovie(id);
                });
                $('#doubanSlider').slider({arrow:false, dots:false});
            },
            error: function(xhr, type){}
        });
    },
    video: function() {
        return $.ajax({
            type: 'get',
            url: 'http://now.wandoulabs.com/video',
            async: false,
            contentType: 'application/json',
            dataType: 'jsonp',
            timeout: 10000,
            success: function(list){
                var data = {};
                data.list = list;
                var tpl = baidu.template('video-tpl', data);
                $('.app').append(tpl);
                $('.movie-id').on('click',function() {
                    var id = $(this).attr('data-id');
                    wandoujiaApi.openWandoujiaMovie(id);
                });
                $('#videoSlider').slider({arrow:false, dots:false});
            },
            error: function(xhr, type){}
        });
    },
    openWandoujiaMovie: function(movieId) {
        cordova.exec(function(args) {
        }, function(args) {
        }, 'WebIntent', 'wandou', [movieId]);
    },
    openDoubanMovie: function(id) {
        cordova.exec(function(args) {
        }, function(args) {
        }, 'WebIntent', 'douban', [id]);
    }
};

// 基础方法
var baseApi = {
    openApp: function(url) {
        window.plugins.webintent.startActivity({
            action: window.plugins.webintent.ACTION_VIEW,
            url: url
            // url: 'dianping://shopinfo?id=4175436'
        }, function() {
        }, function() {
        });
    },
    getLocation: function() {
        var dfd = $.Deferred();
        navigator.geolocation.getCurrentPosition(function(position) {
            dfd.resolve(position);
        }, function() {
            dfd.reject();
        });
        return dfd;
    },
    setStorage: function(item, value) {
        window.localStorage.setItem(item, value);
    },
    getStorage: function(item) {
        return window.localStorage.getItem(item);
    }
};
