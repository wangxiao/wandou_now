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
    weather: function() {
        return jQuery.ajax({
            type: 'get',
            url: 'http://cdn.weather.hao.360.cn/api_weather_info.php',
            data: { app: 'hao360', code: '101010100', _jsonp: 'sb360'},
            async: false,
            contentType: 'application/json',
            dataType: 'jsonp',
            timeout: 10000
        });
    },
    dianping: function() {
        return jQuery.ajax({
            type: 'get',
            url: 'http://now.wandoulabs.com/shop',
            async: false,
            contentType: 'application/json',
            dataType: 'jsonp',
            timeout: 10000
        });
    },
    douban: function() {
        return jQuery.ajax({
            type: 'get',
            url: 'http://now.wandoulabs.com/movie',
            async: false,
            contentType: 'application/json',
            dataType: 'jsonp',
            timeout: 10000
        });
    },
    video: function() {
        return jQuery.ajax({
            type: 'get',
            url: 'http://now.wandoulabs.com/video',
            async: false,
            contentType: 'application/json',
            dataType: 'jsonp',
            timeout: 10000
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
        var dfd = jQuery.Deferred();
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

// 天气
var sb360 = function (list) {
    console.log(list);
    var data = {};
    data.list = list;
    var tpl = baidu.template('weather-tpl', data);
    $('.app').prepend(tpl);
};
