var pickFid;
//按钮事件
function onUIWindowEvent(args, type) {
	if(args.uiWindow == null)
		return;
	if(type == gviUIEventType.gviUIMouseClick) {
		if(args.uiWindow.type == gviUIWindowType.gviUIImageButton) {

			switch(args.uiWindow.name) {
				case "漫游":
					__g.interactMode = gviInteractMode.gviInteractNormal;
					__g.featureManager.unhighlightAll();
					__g.viewport.viewportMode = gviViewportMode.gviViewportSinglePerspective; //设置视口模型
					valueOnChange(100);

					if(rmp) {
						_globe.objectManager.deleteObject(rmp.guid);
						rmp = "";
					}
					if(uilabel1) {
						__g.objectManager.deleteObject(uilabel1.guid);
					}
					clickNum = 0;
					break;

				case "脚本":
					var tree = __g.objectManager.getProjectTree();
					tree.showSlide = !tree.showSlide;
					break;

				case "查询":
					tdbxquery(); //属性查询
					break;

				case "图层":
					loadHtml.htmlfl();
					// loadHtml.htmlenv();

					break;
				case "亮度":
					if(colorId == 100) {
						var color = color2(50);
						colorId = 50;
					} else {
						var color = color2(100);
						colorId = 100;
					}
					__g.setRenderParam(gviRenderControlParameters.gviRenderParamLightModelAmbient, color);
					break;
				case "量测":
					hideButton(_windows.weatherButtons);
					hideButton(_windows.cutButtons)
					buttonShowHide(_windows.measureButtons);
					break;
				case "天气":
					hideButton(_windows.cutButtons);
					hideButton(_windows.measureButtons)
					buttonShowHide(_windows.weatherButtons);
					break;
				case "剖切":
					hideButton(_windows.measureButtons);
					hideButton(_windows.weatherButtons)
					buttonShowHide(_windows.cutButtons);
					break;
				case "晴天":
					var skyboxObj = __g.objectManager.getSkyBox(0);
					skyboxObj.weather = 0;
					break;
				case "小雨":
					var skyboxObj = __g.objectManager.getSkyBox(0);
					skyboxObj.weather = 1;
					break;
				case "大雨":
					var skyboxObj = __g.objectManager.getSkyBox(0);
					skyboxObj.weather = 3;
					break;
				case "小雪":
					var skyboxObj = __g.objectManager.getSkyBox(0);
					skyboxObj.weather = 4;
					break;
				case "大雪":
					var skyboxObj = __g.objectManager.getSkyBox(0);
					skyboxObj.weather = 6;
					break;
				case "面剖切":
					__g.interactMode = gviInteractMode.gviInteractClipPlane;
					__g.clipMode = gviClipMode.gviClipCustomePlane;
					break;
				case "体剖切":
					__g.interactMode = gviInteractMode.gviInteractClipPlane;
					__g.clipMode = gviClipMode.gviClipBox;
					break;
				case "水平":
					__g.interactMode = gviInteractMode.gviInteractMeasurement;
					__g.measurementMode = gviMeasurementMode.gviMeasureHorizontalDistance;
					break;
				case "垂直":
					__g.interactMode = gviInteractMode.gviInteractMeasurement;
					__g.measurementMode = gviMeasurementMode.gviMeasureVerticalDistance;
					break;
				case "直线":
					__g.interactMode = gviInteractMode.gviInteractMeasurement;
					__g.measurementMode = gviMeasurementMode.gviMeasureAerialDistance;
					break;
				case "面积":
					__g.interactMode = gviInteractMode.gviInteractMeasurement;
					__g.measurementMode = gviMeasurementMode.gviMeasureArea;
					break;
				case "坐标":
					__g.interactMode = gviInteractMode.gviInteractMeasurement;
					__g.measurementMode = gviMeasurementMode.gviMeasureCoordinate;
					break;					
				case "模型透明":
					
					break;
				default:
					__g.featureManager.unhighlightAll();
					break;
			}
		} else {

			switch(args.uiWindow.name) {

			}

		}
	} else if(type == gviUIEventType.gviUIMouseEntersArea) {
		switch(args.uiWindow.name) {
			case "stcImg_probar_none":
			case "stcImg_probar_done":
				{
					stcImg_pop.isVisible = true;
					stcTxt_pop.isVisible = true;
				}
				break;
		}
	}
}


//设置按钮的显示隐藏
function buttonShowHide(arr) {
	if(arr[0].isVisible == false) {
		for(var i = 0; i < arr.length; i++) {
			var button = arr[i];
			button.isVisible = true;
		}
	} else {
		for(var i = 0; i < arr.length; i++) {
			var button = arr[i];
			button.isVisible = false;
		}
	}
}

function hideButton(arr) {
	for(var i = 0; i < arr.length; i++) {
		var button = arr[i];
		button.isVisible = false;
	}

}

//通过地址 找到演示脚本对象
function getPFromPath(name) {

	var chliditemId = __g.projectTree.findItem(name);
	var step = __g.objectManager.getObjectById(chliditemId);
	return step;
}

