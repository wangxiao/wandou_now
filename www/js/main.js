// document.addEventListener('deviceready', function() {
void function() {
    // 主程序开始
    var appWrapper = $('.app');

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
                var ele = $('#map-block');
                ele.find('.time').text(time);
                ele.find('.destination').text(end);
                var url = 'http://api.map.baidu.com/direction?destination='+ end +'&mode=driving&region=北京&output=html';
                ele.find('.map-href').attr('href', encodeURIComponent(url));
                ele.show();

                setTimeout(function() {
                    map.setCenter(new BMap.Point(116.375254, 40.00393));   //设置地图中心点。center除了可以为坐标点以外，还支持城市名
                    map.setZoom(11);
                }, 500);
            }
        });
        driving.search(from, end);
    }

    // 主逻辑
    createDianping();
    createNewMap('普天德胜大厦', '西二旗');
    createDouban();
}();

// }, false);