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
        return $.ajax({
            type: 'get',
            url: 'http://now.wandoulabs.com/shop',
            async: false,
            contentType: 'application/json',
            dataType: 'jsonp',
            timeout: 10000
        }).done(function(list) {
        }).fail(function(xhr, status, error) {
        });
    },
    douban: function() {
        return $.ajax({
            type: 'get',
            url: 'http://now.wandoulabs.com/movie',
            async: false,
            contentType: 'application/json',
            dataType: 'jsonp',
            timeout: 10000
        }).done(function(list) {
        }).fail(function(xhr, status, error) {
        });
    },
    video: function() {
        return $.ajax({
            type: 'get',
            url: 'http://now.wandoulabs.com/video',
            async: false,
            contentType: 'application/json',
            dataType: 'jsonp',
            timeout: 10000
        }).done(function(list) {
        }).fail(function(xhr, status, error) {
        });
    },
    openWandoujiaMovie: function(movieId) {
        alert(movieId);
        cordova.exec(function(args) {
        }, function(args) {
            
        }, 'WebIntent', 'wandou', [movieId]);
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
    }
};
