
//地形透明
function valueOnChange(value) {

	__g.terrain.opacity = value / 100;
}

//关闭DEM(关闭高程)
function closeDEM() {
	__g.terrain.demAvailable = !__g.terrain.demAvailable;
}

//显示隐藏地形（显示地形）
function showTerrain() {
	if (__g.terrain.visibleMask == gviViewportMask.gviView0) {
		__g.terrain.visibleMask = gviViewportMask.gviViewNone;
	} else {
		__g.terrain.visibleMask = gviViewportMask.gviView0;
	}
}

//飞到地形（定位地形）
function flyToTerrain() {
	__g.terrain.flyTo(gviTerrainActionCode.gviFlyToTerrain); //使相机飞到相关地形处 
}

//获取Wkt
function getWkt() {
	alert(__g.terrain.crsWKT);
}

//4视口
function viewportQuard(){
	if(__g.viewport.viewportMode == gviViewportMode.gviViewportQuad){
		__g.viewport.viewportMode = gviViewportMode.gviViewportSinglePerspective;
	} else {
		__g.viewport.viewportMode = gviViewportMode.gviViewportQuad;//设置视口模型--四视口
		__g.viewport.cameraViewBindMask = gviViewportMask.gviViewAllNormalView;
	}
}


//幻灯片
function showPPT(){
	__g.projectTree.showSlide = !__g.projectTree.showSlide;
}

