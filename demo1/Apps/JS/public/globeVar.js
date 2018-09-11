
var __g = null;
var rect, uiLeft, uiTop, uiRight, uiB, manager, rootWindow;//ui
var colorId = 100;

var _gdName;//记录双击后的工点名称

var _gd_fl;
var _fcId;
var _tl_fdb_connInfo; // TileLayer关联的fdb的信息，不需要了
var _tl_name;					// TileLayer的名字

var _object_type; // 记录对象类型，是FeatureLayer还是3DTileLayer
var _is_local;    // 记录数据是local还是在server,local=1,server=其他

var rmp;
var _guid;

// 4视口不同fdb的guid
var _tx_guid;//通信
var _xh_guid;//信号
var _ql_guid;//桥梁
var _lj_guid;//路基



var clickNum = 0 ;//设置全局变量，用来标识具体那个功能

var _globe = (function(){
    var __rootId=null;
    var commonWidth=1920;
    var commonHeigth=1080;
    var clientWidth = 0;
    var clientHeight = 0;
    var __sourceCRS = null;
    var __datasetCRS = null;
    var __projectCRS = null;
    var objectManager = null;
    var camera = null;
    var localpath = null;
    var html = null;
    

    return{
        __rootId:__rootId,
        commonWidth:commonWidth,
        commonHeigth:commonHeigth,
        __sourceCRS: __sourceCRS,
        __datasetCRS: __datasetCRS,
        __projectCRS: __projectCRS,
        objectManager: objectManager,
        camera: camera,
        clientWidth: clientWidth,
        clientHeight: clientHeight,
        html: html
    }
})();

var _data = (function(){
    var fcMap={};		//featureclass, key: guid, value: fc
    var flMap={};		//featurelayer, key: guid, value: fl
    var fcGeoMap={};//geometry, 		key: guid, value: geoNames[]
   
    return{
        fcMap:fcMap,
        flMap:flMap,
        fcGeoMap: fcGeoMap
    }
})();

var _windows = (function(){
    var weatherButtons = [];
    var measureButtons = [];
    var cutButtons = [];
    var initButtons = [];

    return {
     
        initButtons: initButtons,
        measureButtons:measureButtons,
       
        cutButtons: cutButtons,
        weatherButtons: weatherButtons
    }
})();

var _globleVar = (function(){
	var rootId = null;
	var commonWidth = 1920;
	var commonHeigth = 1080;
	var clientWidth = 0;
	var clientHeight = 0;
	var sourceCRS = null;
	var datasetCRS = null;
	var projectCRS = null;
	var objectManager = null;
	var camera = null;
	var localpath = null;
	var html = null;
	
  return{
		rootId: rootId,
		commonWidth: commonWidth,
		commonHeigth: commonHeigth,
		sourceCRS: sourceCRS,
		datasetCRS: datasetCRS,
		projectCRS: projectCRS,
		objectManager: objectManager,
		camera: camera,
		clientWidth: clientWidth,
		clientHeight: clientHeight,
		html: html
	}
	
})();