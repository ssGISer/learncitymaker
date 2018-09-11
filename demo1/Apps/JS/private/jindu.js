//ghy++  20171111  施工进度模拟 
var _startTime;//开始时间
var _endTime;//结束时间
var _playTime = 1000;//播放时间隔时间，毫秒
var _slider;
var _timeColPath = "时态\\桥\\桥";//时间列fl路径
var __fl1, __fl2;
var _step = 2;
var _timerObj;

var pset;
var __g;
function initjindu() {


    _startTime = new Date("2017-01-01");
    _endTime = new Date("2018-01-30");
    $("#d_start").text(_startTime.getFullYear() + "-" + (_startTime.getMonth() + 1) + "-" + _startTime.getDate());
    $("#d_end").text(_endTime.getFullYear() + "-" + (_endTime.getMonth() + 1) + "-" + _endTime.getDate());
    set_slider(_startTime, _endTime);
    var flarr = [];
    var fl1 = external.parentWindow.getPFromPath("大兴水利枢纽总装模型\\水工主体模型\\0SDPC0101");
    flarr.push(fl1);

    var fl2 = external.parentWindow.getPFromPath("大兴水利枢纽总装模型\\水工主体模型\\0SDPC0206");
    flarr.push(fl2);

   for (var i = 0; i <flarr.length; i++) {
       var fl = flarr[i];
                pset = __g.new_PropertySet;
                pset.setProperty("num", _startTime);
                fl.compareRenderRuleVariants = pset;

                var render = __g.new_ValueMapGeometryRender;
                {
                    var scheme = __g.new_GeometryRenderScheme;
                    var rule = __g.new_ComparedRenderRule;
                    rule.lookUpField = "st";
                    rule.compareVariant = "num";
                    rule.compareOperator = 1;
                    scheme.addRule(rule);
                    render.addScheme(scheme);
                }
                {
                    var scheme = __g.new_GeometryRenderScheme;
                    var rule = __g.new_ComparedRenderRule;
                    rule.lookUpField = "st";
                    rule.compareVariant = "num";
                    rule.compareOperator = 2;
                    scheme.addRule(rule);

                    var symbol = __g.new_ModelPointSymbol;
                    symbol.enableColor = true;
                    symbol.color = 0x660A00FF;
                    scheme.symbol = symbol;
                    render.addScheme(scheme);
                }

              
                fl.setGeometryRender(render);
                if (fl.name == "0SDPC0101") {
                    __fl1 = fl;
                } else if (fl.name == "0SDPC0206") {
                    __fl2 = fl;
                } 
   }

}




//设置滑块
function set_slider(start_time, end_time) {
    var max_num = dateToNumber(_startTime, _endTime);
    _slider = $("#d_time").slider({
        min: 0,
        max: max_num,
        step: _step,
        orientation: "horizontal",
        range: "min",
        animate: true,
        slide: function (event, ui) {
            //改变事件
            set_time(ui.value);
        }
    });
}
//滑块改变事件
function set_time(val) {
    var now_time = dateAddDay(_startTime, val);
    $("#sDate").html(now_time.getFullYear() + "-" + (now_time.getMonth() + 1) + "-" + now_time.getDate());

    var time = now_time.getFullYear() + "-" + (now_time.getMonth() + 1) + "-" + now_time.getDate();
    pset.setProperty("num", time);
    __fl1.compareRenderRuleVariants = pset;
    __fl2.compareRenderRuleVariants = pset;

}
var _now_val;
//播放事件
function play() {
   
    var max_num = dateToNumber(_startTime, _endTime);
    if (_now_val < max_num) {
        play_node(_now_val, max_num);
    } else {
        play_node(0, max_num);
    }
}
//自动播放设置节点
function play_node(now_num, max_num) {
    if (now_num <= max_num) {
        _now_val = now_num;
        _slider.slider("value", now_num);
        set_time(now_num);
        _timerObj = setTimeout(function () {
            now_num += _step;
            play_node(now_num, max_num)
        }, _playTime);
    }
}

function pause() {
    clearTimeout(_timerObj);
}
//将时间间隔转换为整数
function dateToNumber(start_time, end_time) {
    return parseInt(Math.abs(end_time - start_time) / 1000 / 60 / 60 / 24)//把相差的毫秒数转换为天数
}
//时间加n天
function dateAddDay(time, n) {
    var d = new Date(time);
    d.setDate(d.getDate() + n);
    return d;
}