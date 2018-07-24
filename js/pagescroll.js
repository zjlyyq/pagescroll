/**1.当鼠标滚轮滚动时，触发onwheel事件，实现相应的函数
 * 3.设置窗口大小改变事件onresize的触发函数*/
window.onload = function() {
    var pages = document.getElementsByTagName('div');
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.height = window.innerHeight + 'px';
    };
    // document.body.style.overflow='hidden';//为什么不加这句代码会出现
    var iscomplete = true;
    //添加滚动滚动事件
    window.onwheel = function(e) {
        if (iscomplete) {
            iscomplete = false;
            //滚轮向下滑动
            if (e.wheelDelta < 0) {
                let arriveScrolltop = document.body.scrollTop + window.innerHeight;
                let maxArrive = document.body.scrollHeight - window.innerHeight;
                arriveScrolltop = arriveScrolltop >= maxArrive ? maxArrive : arriveScrolltop;
                scrollAnimate(document.body, { "scrollTop": arriveScrolltop });
            } else {
                //滚轮向上滑动
                let arriveScrolltop = document.body.scrollTop - window.innerHeight;
                arriveScrolltop = arriveScrolltop < 0 ? 0 : arriveScrolltop;
                scrollAnimate(document.body, { "scrollTop": arriveScrolltop });
            };
        };
    };
    window.onresize = function() {
        //窗口大小改变时，需要重新给每个页面设置高度
        for (let i = 0; i < pages.length; i++) {
            pages[i].style.height = window.innerHeight + 'px';
        };
        //判断是否仍然是一个整页div占据全屏，若不是更改scrollTop
        if (document.body.scrollTop % window.innerHeight) {
            iscomplete = false;
            let newScrolltop = Math.round(document.body.scrollTop / window.innerHeight) * window.innerHeight;
            scrollAnimate(document.body, { "scrollTop": newScrolltop });
        };
    };

    //定义一个执行动画的函数,使用定时器完成动画效果
    function scrollAnimate(obj, json) {
        var flag = true;
        var timer = setInterval(function() {
            for (let i in json) {
                var curScroll = obj[i];
                if (curScroll == json[i]) {
                    flag = true;
                } else {
                    flag = false;
                };
                var p_scroll = (json[i] - curScroll) / 10;
                p_scroll = p_scroll > 0 ? Math.ceil(p_scroll) : Math.floor(p_scroll);
                obj[i] += p_scroll;
            };
            if (flag) {
                clearInterval(timer);
                iscomplete = true;
            };
        }, 15);
    };
};