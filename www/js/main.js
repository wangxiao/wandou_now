// document.addEventListener('deviceready', function() {
void function() {
    // 主程序开始
    var appWrapper = $('.app');

    // 大众点评
    function createDianping() {
        wandoujiaApi.dianping().done(function(list) {
            console.log(list);
            var data = {};
            data.list = list;
            var tpl = baidu.template('dianping-tpl', data);
            appWrapper.append(tpl);
        }).fail(function() {

        });
    }

    // 主逻辑
    createDianping();
    
}();

// }, false);