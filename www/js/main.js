// document.addEventListener('deviceready', function() {
void function() {
    // 主程序开始
    var appWrapper = jQuery('.app');
    // 地理位置 
    var G_location;

    // 大众点评
    function createDianping() {
        wandoujiaApi.dianping().done(function(list) {
            var data = {};
            data.list = list;
            var tpl = baidu.template('dianping-tpl', data);
            $('.app').append(tpl);

            $('body').on('click', '.d-fly', function () {
                var url = $(this).data('url');
                baseApi.openApp(url);
            });

            $('#dianpingSlider').slider({arrow:false, dots:false});
        });
    }

    // 豆瓣电影
    function createDouban() {
        wandoujiaApi.douban().done(function(list) {
            var data = {};
            data.list = list;
            var tpl = baidu.template('douban-tpl', data);
            $('.app').append(tpl);
            $('.douban-id').on('click',function() {
                var id = $(this).attr('data-id');
                wandoujiaApi.openDoubanMovie(id);
            });
            $('#doubanSlider').slider({arrow:false, dots:false});
        });
    }

    // 附近视频
    function createVideo() {
        wandoujiaApi.video().done(function(list) {
            var data = {};
            data.list = list;
            var tpl = baidu.template('video-tpl', data);
            $('.app').append(tpl);
            $('.movie-id').on('click',function() {
                var id = $(this).attr('data-id');
                wandoujiaApi.openWandoujiaMovie(id);
            });
            $('#videoSlider').slider({arrow:false, dots:false});
        });
    }

    // 体育比赛
    function createSports() {
        wandoujiaApi.sports().done(function(list) {
            var data = {};
            data.list = list;
            var tpl = baidu.template('sports-tpl', data);
            $('.app').append(tpl);
            $('#sportsSlider').slider({arrow:false, dots:false});
            $('.sports .s-team').on('click', function() {
                console.log(this);
                wandoujiaApi.openKanbisai();
            });

            setInterval(function () {
                wandoujiaApi.sports().done(function(list) {
                    var data = {};
                    data.list = list;
                    var tpl = baidu.template('sports-tpl2', data);
                    $('.sports').html(tpl);
                    $('#sportsSlider').slider({arrow:false, dots:false});
                });
            },15000);

        });
    }

    // 生成地图
    function createNewMap(from, end) {
        var tpl = baidu.template('map-tpl');
        appWrapper.append(tpl);
        $('.map-destination').hide();
        $('.map-change-btn').hide();
        var ele = $('#map-block');

        // 百度地图API功能
        var map = new BMap.Map("map-wrapper");
        map.addControl(new BMap.MapTypeControl());
        function search(from, end) {
            var driving = new BMap.DrivingRoute(map, {
                renderOptions:{
                    map: map,
                    autoViewport: true
                },
                onSearchComplete: function(results) {
                    map.clearOverlays();
                    var plan = results.getPlan(0);
                    // plan.getDistance(true)
                    var time = plan.getDuration(true);
                    ele.find('.time').text(time);
                    ele.find('.destination').text(end);
                    getLocation().done(function(position) {
                        var url = 'http://api.map.baidu.com/direction?origin=latlng:'+ position.coords.latitude +','+ position.coords.longitude +'|name:当前位置&destination=西二旗&mode=driving&region=北京&output=html&src=yourCompanyName|yourAppName';
                        ele.find('.map-href').attr('href', url);
                    });
                }
            });
            driving.search(from, end);
        }
        search(from, end);
        $('.map-change-btn').on('click', function() {
            var ele = $('.map-destination');
            setDestination(ele.val());
            search('普天德胜大厦', getDestination());
            ele.val('');
        });
        $('.map-change').on('click', function () {
            $(this).hide();
            $('.map-destination').show();
            $('.map-change-btn').show();
        });
    }

    function setDestination(val) {
        baseApi.setStorage('destination', val);
    }

    function getDestination() {
        var val = baseApi.getStorage('destination');
        if (!val) {
            val = '西二旗';
        }
        return val;
    }

    function getLocation() {
        var dfd = jQuery.Deferred();
        if (G_location) {
            dfd.resolve(G_location);
        } else {
            baseApi.getLocation().done(function(position) {
                dfd.resolve(position);
            });
        }
        return dfd;
    }

    function createWeather() {
        wandoujiaApi.weather().done(function(list) {
            var data = {};
            data.list = list;
            console.log(list);
            var tpl = baidu.template('weather-tpl', data);
            appWrapper.append(tpl);
        });
    }

    // 主逻辑
    
    getLocation();
    createWeather();
    var mapFunction = createNewMap('普天德胜大厦', getDestination());
    createDianping();
    createDouban();
    createVideo();
    createSports();    
}();

// }, false);