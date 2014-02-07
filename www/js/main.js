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
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
        var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
        driving.search(from, end);
    }

    // 主逻辑
    createDianping();
    createNewMap('普天德胜大厦', '西二旗');
    createDouban();
    
}();

// }, false);