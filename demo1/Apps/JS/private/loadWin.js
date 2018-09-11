function loadwindows() {
	loadWin.loadButton();
	loadWin.loadBtnWeather();
	loadWin.loadBtnMeasure();
	loadWin.loadBtnCut();
	loadWin.loadBtnOthers();
	loadWin.loadLogo();
}
var loadWin = (function () {

	var loadButton = function () {

		var width = _globe.clientWidth;
		var height = _globe.clientHeight;
		var localPath = _globe.localpath;
		var uiManager = __g.uiWindowManager;

		//基本功能按钮（左侧）
		var arr_basicButtons = ["漫游", "天气", "量测", "剖切", "亮度", "图层", "查询", "脚本", "透明"];
		for (var i = 0; i < arr_basicButtons.length; i++) {
			//UI
			uiLeft.init(0.02, 0);
			uiTop.init(0.18 + i * 0.07, 0);
			uiRight.init(0.13, 0);
			uiB.init(0.24 + i * 0.07, 0);
			rect.init(uiLeft, uiTop, uiRight, uiB);

			var imgButton = uiManager.createImageButton();
			var rootWindow = uiManager.uiRootWindow;
			rootWindow.addChild(imgButton);

			// IUIImageButton
			imgButton.setArea(rect); //设置图片范围
			imgButton.name = arr_basicButtons[i];
			imgButton.isVisible = true;

			if (arr_basicButtons[i] == "漫游") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/manyou.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/manyou.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/manyou.png";

			} else if (arr_basicButtons[i] == "天气") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/cjtq.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/cjtq.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/cjtq.png";
			} else if (arr_basicButtons[i] == "亮度") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/cjld.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/cjld.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/cjld.png";
			} else if (arr_basicButtons[i] == "量测") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/liangce.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/liangce.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/liangce.png";
			} else if (arr_basicButtons[i] == "剖切") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/cutting.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/cutting.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/cutting.png";
			} else if (arr_basicButtons[i] == "脚本") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/shitu.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/shitu.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/shitu.png";
			} else if (arr_basicButtons[i] == "图层") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/treeC.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/treeC.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/treeC.png";
			} else if (arr_basicButtons[i] == "查询") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/search.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/search.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/search.png";
			}
			//			else if(arr_basicButtons[i] == "透明") {
			//				imgButton.normalImage = _globe.localpath + "Data/img/btn/touming.png";
			//				imgButton.hoverImage  = _globe.localpath + "Data/img/btn/touming.png";
			//				imgButton.pushedImage = _globe.localpath + "Data/img/btn/touming.png";
			//			}

			imgButton.toolTipText = arr_basicButtons[i];
			imgButton.subscribeEvent(gviUIEventType.gviUIMouseClick);

			_windows.initButtons.push(imgButton);
		}

	};

	var loadBtnWeather = function () {
		var width = _globe.clientWidth;
		var height = _globe.clientHeight;
		var localPath = _globe.localpath;
		var uiManager = __g.uiWindowManager;

		var arr_weatherButtons = ["晴天", "小雨", "大雨", "小雪", "大雪"];
		for (var i = 0; i < arr_weatherButtons.length; i++) {
			uiLeft.init(0.13, 0);
			uiTop.init(0.25 + i * 0.07, 0);
			uiRight.init(0.19, 0);
			uiB.init(0.31 + i * 0.07, 0);
			rect.init(uiLeft, uiTop, uiRight, uiB);
			var imgButton = uiManager.createImageButton();
			var rootWindow = uiManager.uiRootWindow;
			rootWindow.addChild(imgButton);
			imgButton.setArea(rect);
			imgButton.name = arr_weatherButtons[i];
			imgButton.isVisible = false;
			if (arr_weatherButtons[i] == "晴天") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/weather1.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/weather1.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/weather1.png";
			} else if (arr_weatherButtons[i] == "小雨") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/weather2.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/weather2.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/weather2.png";
			} else if (arr_weatherButtons[i] == "大雨") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/weather3.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/weather3.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/weather3.png";
			} else if (arr_weatherButtons[i] == "小雪") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/weather4.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/weather4.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/weather4.png";
			} else if (arr_weatherButtons[i] == "大雪") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/weather5.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/weather5.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/weather5.png";
			}

			imgButton.toolTipText = arr_weatherButtons[i];
			imgButton.subscribeEvent(gviUIEventType.gviUIMouseClick);

			_windows.weatherButtons.push(imgButton);
		}

	};

	var loadBtnMeasure = function () {
		var width = _globe.clientWidth;
		var height = _globe.clientHeight;
		var localPath = _globe.localpath;
		var uiManager = __g.uiWindowManager;

		var arr_measureButtons = ["水平", "垂直", "直线", "面积", "坐标"];
		for (var i = 0; i < arr_measureButtons.length; i++) {
			uiLeft.init(0.13, 0);
			uiTop.init(0.32 + i * 0.07, 0);
			uiRight.init(0.19, 0);
			uiB.init(0.38 + i * 0.07, 0);
			rect.init(uiLeft, uiTop, uiRight, uiB);

			var imgButton = uiManager.createImageButton();
			var rootWindow = uiManager.uiRootWindow;
			rootWindow.addChild(imgButton);
			imgButton.setArea(rect);
			imgButton.name = arr_measureButtons[i];
			imgButton.isVisible = false;
			if (arr_measureButtons[i] == "水平") {
				imgButton.normalImage = _globe.localpath + "Data/img/btn/measure1.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/measure1.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/measure1.png";
			} else if (arr_measureButtons[i] == "垂直") {
				imgButton.normalImage = _globe.localpath + "Data/img/btn/measure2.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/measure2.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/measure2.png";
			} else if (arr_measureButtons[i] == "直线") {
				imgButton.normalImage = _globe.localpath + "Data/img/btn/measure3.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/measure3.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/measure3.png";
			} else if (arr_measureButtons[i] == "面积") {
				imgButton.normalImage = _globe.localpath + "Data/img/btn/measure4.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/measure4.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/measure4.png";
			} else if (arr_measureButtons[i] == "坐标") {
				imgButton.normalImage = _globe.localpath + "Data/img/btn/measure5.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/measure5.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/measure5.png";
			}

			imgButton.toolTipText = arr_measureButtons[i];
			imgButton.subscribeEvent(gviUIEventType.gviUIMouseClick);

			_windows.measureButtons.push(imgButton);
		}

	};

	var loadBtnCut = function () {
		var width = _globe.clientWidth;
		var height = _globe.clientHeight;
		var localPath = _globe.localpath;
		var uiManager = __g.uiWindowManager;

		var arr_cutButtons = ["面剖切", "体剖切"];
		for (var i = 0; i < arr_cutButtons.length; i++) {
			uiLeft.init(0.13, 0);
			uiTop.init(0.39 + i * 0.07, 0);
			uiRight.init(0.19, 0);
			uiB.init(0.45 + i * 0.07, 0);
			rect.init(uiLeft, uiTop, uiRight, uiB);
			var imgButton = uiManager.createImageButton();
			var rootWindow = uiManager.uiRootWindow;
			rootWindow.addChild(imgButton);
			imgButton.setArea(rect);
			imgButton.name = arr_cutButtons[i];
			imgButton.isVisible = false;
			if (arr_cutButtons[i] == "面剖切") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/cut1.png";;
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/cut1.png";;
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/cut1.png";;
			} else if (arr_cutButtons[i] == "体剖切") {

				imgButton.normalImage = _globe.localpath + "Data/img/btn/cut2.png";
				imgButton.hoverImage = _globe.localpath + "Data/img/btn/cut2.png";
				imgButton.pushedImage = _globe.localpath + "Data/img/btn/cut2.png";
			}

			imgButton.toolTipText = arr_cutButtons[i];
			imgButton.subscribeEvent(gviUIEventType.gviUIMouseClick);

			_windows.cutButtons.push(imgButton);
		}

	};

	var loadBtnOthers = function () {
		//		 var arr_btnOthers = ["实时绘制", "开关DEM", "开关地形", "多视口", "动画导航", "画中画", "定位地形", "地模透明"];
		//		 for(var i = 0;i<arr_btnOthers.length;i++){
		//		 	uiLeft.init(0.42+i*0.017, 0);
		//          uiTop.init(0.065, 0);
		//          uiRight.init(0.43+i*0.017,0);
		//          uiB.init(0.095, 0);
		//          rect.init(uiLeft, uiTop, uiRight, uiB);
		//          
		//          var imgBtn = manager.createImageButton();
		//          var rootWindow = manager.uiRootWindow;
		//          rootWindow.addChild(imgBtn);
		//          imgBtn.setArea(rect);
		//          imgBtn.name = arr_btnOthers[i];
		//          imgBtn.isVisible = true;
		//          
		//          if (arr_btnOthers[i] == "实时绘制") {
		//
		//              imgBtn.normalImage = _globe.localpath + "Data/img/btn/setting.png";
		//              imgBtn.hoverImage  = _globe.localpath + "Data/img/btn/setting1.png";
		//              imgBtn.pushedImage = _globe.localpath + "Data/img/btn/setting2.png";
		//          } else if (arr_btnOthers[i] == "开关DEM") {
		//
		//              imgBtn.normalImage = _globe.localpath + "Data/img/btn/setting.png";
		//              imgBtn.hoverImage  = _globe.localpath + "Data/img/btn/setting1.png";
		//              imgBtn.pushedImage = _globe.localpath + "Data/img/btn/setting2.png";
		//              
		//          } else if (arr_btnOthers[i] == "开关地形"){
		//          	
		//          	imgBtn.normalImage = _globe.localpath + "Data/img/btn/setting.png";
		//              imgBtn.hoverImage  = _globe.localpath + "Data/img/btn/setting1.png";
		//              imgBtn.pushedImage = _globe.localpath + "Data/img/btn/setting2.png";
		//          	
		//          } else if (arr_btnOthers[i] == "多视口") {
		//
		//              imgBtn.normalImage = _globe.localpath + "Data/img/btn/setting.png";
		//              imgBtn.hoverImage  = _globe.localpath + "Data/img/btn/setting1.png";
		//              imgBtn.pushedImage = _globe.localpath + "Data/img/btn/setting2.png";
		//              
		//          } else if (arr_btnOthers[i] == "动画导航") {
		//          	
		//				imgBtn.normalImage = _globe.localpath + "Data/img/btn/setting.png";
		//              imgBtn.hoverImage  = _globe.localpath + "Data/img/btn/setting1.png";
		//              imgBtn.pushedImage = _globe.localpath + "Data/img/btn/setting2.png";
		//              
		//          } else if (arr_btnOthers[i] == "画中画") {
		//
		//              imgBtn.normalImage = _globe.localpath + "Data/img/btn/setting.png";
		//              imgBtn.hoverImage  = _globe.localpath + "Data/img/btn/setting1.png";
		//              imgBtn.pushedImage = _globe.localpath + "Data/img/btn/setting2.png";
		//              
		//          } else if (arr_btnOthers[i] == "定位地形") {
		//
		//              imgBtn.normalImage = _globe.localpath + "Data/img/btn/setting.png";
		//              imgBtn.hoverImage  = _globe.localpath + "Data/img/btn/setting1.png";
		//              imgBtn.pushedImage = _globe.localpath + "Data/img/btn/setting2.png";
		//              
		//          } else if (arr_btnOthers[i] == "地模透明") {
		//
		//              imgBtn.normalImage = _globe.localpath + "Data/img/btn/setting.png";
		//              imgBtn.hoverImage  = _globe.localpath + "Data/img/btn/setting1.png";
		//              imgBtn.pushedImage = _globe.localpath + "Data/img/btn/setting2.png";
		//          }
		//          
		//          imgBtn.toolTipText = arr_btnOthers[i];
		//          imgBtn.subscribeEvent(gviUIEventType.gviUIMouseClick);
		//          
		//		 }
	}

	var loadLogo = function () {
		var path1 = _globe.localpath + "Data/img/btn/logo.png";
		_globe.overlayLabel = _globe.objectManager.createOverlayLabel(_globe.__rootId);
		_globe.overlayLabel.imageName = path1;
		_globe.overlayLabel.setWidth(_globe.clientWidth * 0.9, 0, 0);
		_globe.overlayLabel.setHeight(_globe.clientHeight * 0.13, 0, 0);
		_globe.overlayLabel.setX(_globe.clientWidth / 2, 0, 0);
		_globe.overlayLabel.setY(-_globe.clientHeight / 17.6, 0, 1);
		_globe.overlayLabel.visibleMask = 1;
	};

	return {
		loadButton: loadButton,
		loadBtnWeather: loadBtnWeather, //天气
		loadBtnMeasure: loadBtnMeasure, //测量
		loadBtnCut: loadBtnCut, //剖切
		loadBtnOthers: loadBtnOthers,
		loadLogo: loadLogo
	}
})();

var loadHtml = (function () {

	var htmlfl = function () {

		var wpfl = __g.htmlWindow.createWindowParam();
		wpfl.filePath = _globe.localpath + "Apps/HTML/layerTree.html";

		wpfl.offsetX = _globe.clientWidth - 920;
		wpfl.offsetY = 130;

		wpfl.sizeX = 400;
		wpfl.sizeY = 600;

		wpfl.resizable = false;
		wpfl.hastitle = false;
		wpfl.resetOnHide = "about:blank";

		wpfl.position = gviHTMLWindowPosition.gviWinPosUserDefined;
		wpfl.hideOnClick = false;
		wpfl.winId = 7;
		wpfl.transparence = 200;
		wpfl.isPopupWindow = 1;
		__g.htmlWindow.setWindowParam(wpfl);

	};

	var htmljg = function () {

		var wpjg = __g.htmlWindow.createWindowParam();
		wpjg.filePath = _globe.localpath + "Apps/HTML/jgTree.html";

		wpjg.offsetX = _globe.clientWidth - 920;
		wpjg.offsetY = 130;

		wpjg.sizeX = 430;//400
		wpjg.sizeY = 730;//600

		wpjg.resizable = false;
		wpjg.hastitle = false;
		wpjg.hideOnClick = false;
		wpjg.resetOnHide = "about:blank";

		wpjg.position = gviHTMLWindowPosition.gviWinPosUserDefined;

		wpjg.winId = 8; //winId 一定不能重复！！！！！！！！否则会只有一个html窗口
		wpjg.transparence = 200;
		wpjg.isPopupWindow = 1;
		__g.htmlWindow.setWindowParam(wpjg);

	};

	var htmlenv = function () {

		var wpjg = __g.htmlWindow.createWindowParam();
		wpjg.filePath = _globe.localpath + "Apps/HTML/environmentPage.html";

		wpjg.offsetX = _globe.clientWidth - 920;
		wpjg.offsetY = 130;

		wpjg.sizeX = 400;
		wpjg.sizeY = 600;

		wpjg.resizable = false;
		wpjg.hastitle = false;
		wpjg.hideOnClick = false;
		wpjg.resetOnHide = "about:blank";

		wpjg.position = gviHTMLWindowPosition.gviWinPosUserDefined;

		wpjg.winId = 8; //winId 一定不能重复！！！！！！！！否则会只有一个html窗口
		wpjg.transparence = 200;
		wpjg.isPopupWindow = 1;
		__g.htmlWindow.setWindowParam(wpjg);

	};

	var htmlsx = function () {
		wpBim = __g.htmlWindow.createWindowParam(); //IhtmlWindow  接口
		wpBim.filePath = _globe.localpath + "Apps/HTML/query.html";

		wpBim.sizeX = 400;
		wpBim.sizeY = 600;
		wpBim.offsetX = _globe.clientWidth - 457;
		wpBim.offsetY = 130;

		wpBim.hastitle = false;
		wpBim.hideOnClick = false;
		wpBim.winId = 3333333;

		wpBim.transparence = 255;
		wpBim.resizable = false;
		wpBim.isPopupWindow = false;
		wpBim.resetOnHide = "about:blank";
		__g.htmlWindow.setWindowParam(wpBim); //显示弹窗html
	}

	return {

		htmlfl: htmlfl, //工程树
		htmljg: htmljg, //结构树
		htmlenv: htmlenv,
		htmlsx: htmlsx
	}
})();
