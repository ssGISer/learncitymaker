//根目录bimtest
function getSamplesPath() {
	var flag = unescape(location.pathname).lastIndexOf("YX-FDBDemo");
	if(flag > 0) {
		return(unescape(location.pathname).substring(1, flag) + "YX-FDBDemo");
	}
}

function getSamplesRelatePath(relPath) {
	return(getSamplesPath() + relPath).replace(/\//g, "\\");
}

/************************************************************/
/* 初始化全局变量、控件，设置天空盒子
/************************************************************/
var init = (function() {
	//初始化控件
	var initAxControl = function() {
		__g = document.getElementById("__g");

		var ps = __g.new_PropertySet;
		ps.setProperty("MultiTouch", true);

		__g.initialize(false, ps);

		var _project = __g.project;
		_globe.localpath = getSamplesRelatePath("") + "\\";

		var cepPath = "http://127.0.0.1:8090/XiHanServer.cep";
		var bool = _project.open(cepPath, false, "");

		__g.interactMode = gviInteractMode.gviInteractNormal;
		__g.mouseSelectObjectMask = gviMouseSelectObjectMask.gviSelectAll;
		__g.mouseSelectMode = gviMouseSelectMode.gviMouseSelectClick;

		_globe.clientWidth = $("#__g").width();
		_globe.clientHeight = $("#__g").height();

		_globe.objectManager = __g.objectManager;
		_globe.camera = __g.camera;
		_globe.projectTree = __g.projectTree;
		_globe.html = __g.htmlWindow;

		_globe.__rootId = _globe.objectManager.getProjectTree().rootID;
		_globe.camera.undergroundMode = true;
		_globe.camera.flyTime = 2;

		//设置天空盒子
		var skyboxPath = getSamplesRelatePath("/Data/img/skybox");
		var skyboxObj = __g.objectManager.getSkyBox(0);
		skyboxObj.setImagePath(gviSkyboxImageIndex.gviSkyboxImageBack, skyboxPath + "/1_BK.jpg");
		skyboxObj.setImagePath(gviSkyboxImageIndex.gviSkyboxImageBottom, skyboxPath + "/1_DN.jpg");
		skyboxObj.setImagePath(gviSkyboxImageIndex.gviSkyboxImageFront, skyboxPath + "/1_FR.jpg");
		skyboxObj.setImagePath(gviSkyboxImageIndex.gviSkyboxImageLeft, skyboxPath + "/1_LF.jpg");
		skyboxObj.setImagePath(gviSkyboxImageIndex.gviSkyboxImageRight, skyboxPath + "/1_RT.jpg");
		skyboxObj.setImagePath(gviSkyboxImageIndex.gviSkyboxImageTop, skyboxPath + "/1_UP.jpg");

		// 绑定RenderControl事件
		initControlEvents(__g);

		//UI
		rect = __g.new_UIRect;
		uiLeft = __g.new_UIDim;
		uiTop = __g.new_UIDim;
		uiRight = __g.new_UIDim;
		uiB = __g.new_UIDim;
		manager = __g.uiWindowManager;
		rootWindow = manager.uiRootWindow;

		//4视口设置
		_tx_guid = __g.projectTree.findItem("银西线\\四电\\通信\\无线基站(DK509+150)");
		_xh_guid = __g.projectTree.findItem("银西线\\四电\\信号\\中继站25(DK509+600)");

		var tx_obj = __g.objectManager.getObjectById(_tx_guid);

		var xh_obj = __g.objectManager.getObjectById(_xh_guid);

		var mp = __g.geometryFactory.createGeometry(gviGeometryType.gviGeometryModelPoint, gviVertexAttribute.gviVertexAttributeZ);
		var rmp = __g.objectManager.createRenderModelPoint(mp, null, _globe.__rootId);

	};

	var addOverlay = function() {

		var path2 = _globe.localpath + "Data/img/btn/xyz.png";
		_globe.overlayLabel2 = _globe.objectManager.createOverlayLabel(_globe.__rootId);
		_globe.overlayLabel2.imageName = "";
		_globe.overlayLabel2.setWidth(_globe.clientWidth * 0.18, 0, 0);
		_globe.overlayLabel2.setHeight(_globe.clientHeight * 0.04, 0, 0);
		_globe.overlayLabel2.setX(_globe.clientWidth - (_globe.clientWidth * 0.2) * 3 / 4, 0, 0);
		_globe.overlayLabel2.setY(_globe.clientHeight / 20, 0, 0);
		_globe.overlayLabel2.visibleMask = 1;
	};

	return {

		initAxControl: initAxControl,

		addOverlay: addOverlay
	}
})();
function onMouseMove(f, x, y){
    var stw = __g.camera.screenToWorld(x,y);
    var x = stw.intersectPoint.x;
    var y = stw.intersectPoint.y;
    var z = stw.intersectPoint.z;
    x = x.toFixed(2);//保留小数点后2位
    y = y.toFixed(2);
    z = z.toFixed(2);
    var pt = stw.intersectPoint.clone();
    var crs = __g.getCurrentCrsWKT();
    var targetCrs = __g.crsFactory.createFromWKT(crs);
    pt.project(targetCrs);
    var x2 = pt.x.toFixed(2);
    var y2 = pt.y.toFixed(2);
    _globe.overlayLabel2.text = "X:" + x + ", Y:" + y + ",Z:" + z;
}