// document.addEventListener('deviceready', function() {
void function() {
    // 主程序开始
    var appWrapper = $('.app');
    // 地理位置 
    var G_location;

    // 大众点评
    function createDianping() {
        wandoujiaApi.dianping().done(function(list) {
            var data = {};
            data.list = list;
            var tpl = baidu.template('dianping-tpl', data);
            appWrapper.append(tpl);

            $('body').on('click', '.d-fly', function () {
                var url = $(this).data('url');
                baseApi.openApp(url);
            });
        }).fail(function() {});
    }

    // 豆瓣电影
    function createDouban() {
        wandoujiaApi.douban().done(function(list) {
            var data = {};
            data.list = list;
            var tpl = baidu.template('douban-tpl', data);
            appWrapper.append(tpl);
        }).fail(function(xhr, status, error) {
            console.log(status, error);
        });
    }

    // 生成地图
    function createNewMap(from, end) {
        var tpl = baidu.template('map-tpl');
        appWrapper.append(tpl);
        var ele = $('#map-block');

        // 百度地图API功能
        var map = new BMap.Map("map-wrapper");
        map.addControl(new BMap.MapTypeControl());
        var driving = new BMap.DrivingRoute(map, {
            renderOptions:{
                map: map, 
                autoViewport: true
            },
            onSearchComplete: function(results) {
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

    function getLocation() {
        var dfd = $.Deferred();
        if (G_location) {
            dfd.resolve(G_location);
        } else {
            baseApi.getLocation().done(function(position) {
                dfd.resolve(position);
            });
        }
        return dfd;
    }

    // 主逻辑
    createDianping();
    createNewMap('普天德胜大厦', '西二旗');
    createDouban();
}();

// }, false);