/**
 * 属性查询   单击判断是模型还是瓦片  模型判断是否有bim字段属性，有就显示，
 */

function tdbxquery() {
	//设置选择对象类型
	__g.interactMode = gviInteractMode.gviInteractSelect;// 不同漫游模式
	__g.mouseSelectObjectMask = gviMouseSelectObjectMask.gviSelectAll; //选择所有对象
	__g.mouseSelectMode = gviMouseSelectMode.gviMouseSelectClick;
}


//function viewportPIP() {
//	__g.interactMode = gviInteractMode.gviInteractSelect;//鼠标拾取模式
//	__g.mouseSelectObjectMask = gviMouseSelectObjectMask.gviSelectFeatureLayer;
//	__g.mouseSelectMode = gviMouseSelectMode.gviMouseSelectClick;
//	
//	__g.viewport.viewportMode = gviViewportMode.gviViewportPIP; //设置视口模型--pip,画中画
//	__g.viewport.activeView = 4;
//}

function selectMode(){
	__g.interactMode = gviInteractMode.gviInteractSelect;//鼠标拾取模式
	__g.mouseSelectObjectMask = gviMouseSelectObjectMask.gviSelectFeatureLayer;
	__g.mouseSelectMode = gviMouseSelectMode.gviMouseSelectClick;
}

//图层获取要素类
function getFc(fl) {
	var fdsNames = fl.featureClassInfo.dataSetName;
	var c  = fl.featureClassInfo.dataSourceConnectionString;
	var featureClassName = fl.featureClassInfo.featureClassName;
	var ds = __g.dataSourceFactory.openDataSourceByString(c);
	pickFds = ds.openFeatureDataset(fdsNames);
	var fc = pickFds.openFeatureClass(featureClassName);
	return fc;
}

//BIM
var propertyData = [];
var rmp; //瓦片查询 高亮fdb模型，临时模型
var pickFc, pickFid, pickType;

/**
 * 鼠标点击事件
 */
function onMouseClickSelect(pickResult, intersectPoint, mask, sender) {
	if(rmp) {
		_globe.objectManager.deleteObject(rmp.guid);
		rmp = "";
	}
	if(pickResult == null) return;

//	propertyData = [];
	//判断是否是FDB
	if(pickResult.type == gviObjectType.gviObjectFeatureLayer) {//gviObjectType.gviObjectFeatureLayer
		
		__g.featureManager.unhighlightAll();
		
		pickFid = pickResult.featureId;
		var pickFl = pickResult.featureLayer;
		pickFc = getFc(pickFl);
		var pickFds = pickFc.featureDataSet;

		if(clickNum == 2) {// 编辑，绘制多边形
			var row = pickFc.getRow(pickFid);
			var geoindex = row.fieldIndex("Geometry");
			var geoMp = row.getValue(geoindex);
			currentGeometry = geoMp;

			var mps = __g.new_ModelPointSymbol;
			mps.setResourceDataSet(pickFds);

			rmp = __g.objectManager.createRenderModelPoint(geoMp, mps, _globe.__rootId);
			__g.objectEditor.startEditRenderGeometry(rmp, gviGeoEditType.gviGeoEditCreator);
			return;
			
		} else if(clickNum == 5) {//画中画
			
			__g.viewport.viewportMode = gviViewportMode.gviViewportPIP; //设置视口模型--pip,画中画
			__g.viewport.activeView = 4;//画中画视图序号
			
			__g.featureManager.highlightFeature(pickFc, pickFid, 0xffff0000);
			
			var row = pickFc.getRow(pickFid);
			var geoindex = row.fieldIndex("Geometry");
			var mp = row.getValue(geoindex);
			var mps = __g.new_ModelPointSymbol;
			mps.setResourceDataSet(pickFc.featureDataSet);
			
			rmp = __g.objectManager.createRenderModelPoint(mp, mps, _globe.__rootId);
			rmp.visibleMask = gviViewportMask.gviViewPIP;
			
			var crs = __g.getCurrentCrsWKT();
	        var targetCrs = __g.crsFactory.createFromWKT(crs);
	        mp.project(targetCrs);

			var ang = __g.new_EulerAngle;
			ang.set(0, -30, 0);
			__g.camera.lookAt(mp.position, 100, ang);
			clickNum = 0;
			return;
			
		} 
		//复制模型、保存数据库结束
		getBimData(pickFc, 1, pickFid); //type=1是 查询fdb显示数据
		
		__g.featureManager.highlightFeature(pickFc, pickFid, 0xffff0000);
		
		
	} else if (pickResult.type == gviObjectType.gviObject3DTileLayer) {//pickResult 是 I3DTileLayerPickResult，//判断是否是TDBX
	
		__g.featureManager.unhighlightAll();

		var tile = pickResult.tileLayer;//I3DTileLayer
		var dbname = tile.name + ".FDB";
		// alert("dbname = " + dbname);
		
//		var info = tile.connectioninfo + ".fdb";//获取瓦片链接的FDB
//		alert("tile.connectioninfo = " + info);
		
		
		var wkt = tile.getWKT();
		var tileCrs = __g.crsFactory.createFromWKT(wkt);
		
		var crs = __g.getCurrentCrsWKT();
		var currentCrs = __g.crsFactory.createFromWKT(crs);
		
		intersectPoint.project(tileCrs);//从球面坐标转换为投影坐标！！！！
		
		// alert("intersectPoint  x, y, z = " + intersectPoint.x + ", "+ intersectPoint.y + ", "+intersectPoint.z);

		// 创建交集对象
		var camera = __g.camera.getCamera2();
		var ang = camera.angle;
		var pos = camera.position;
		
		pos.project(tileCrs);//相机点也要转换坐标！！！！！！！
		
		var length = pos.distance3D(intersectPoint);
		var factor = length * 0.02;
		//  var factor=20
		var aimingPoint = __g.camera.getAimingPoint2(intersectPoint, ang, factor)
		var sourcePoint = __g.camera.getAimingPoint2(intersectPoint, ang, -factor)
		
		var intersetPolyline = __g.geometryFactory.createGeometry(gviGeometryType.gviGeometryPolyline, gviVertexAttribute.gviVertexAttributeZ);
		intersetPolyline.spatialCRS = tileCrs;
		intersetPolyline.appendPoint(sourcePoint);
		intersetPolyline.appendPoint(aimingPoint);

		var r = tile.polylineIntersect(intersetPolyline);
		var fcName = r.featureClassName;
		// alert("fcName = "+ fcName);
		if(fcName == undefined) return;
		var dsName = r.featureDataSetName;
		// alert("dsname = " + dsName);
		var fid = r.fid;
		
//		var c = __g.new_ConnectionInfo;
//		c.connectionType = gviConnectionType.gviConnectionFireBird2x;
//		c.database = info;
		
		var ci = __g.new_ConnectionInfo;
		ci.connectionType = 101;
		ci.server = "127.0.0.1";
		ci.port = 8040;
		ci.database = dbname;
		ci.userName = "";
		ci.password = "";
			
		var ds = __g.dataSourceFactory.openDataSource(ci);
		var pickFds = ds.openFeatureDataset(dsName);
		// var __dataspatialCRS = pickFds.spatialReference
		var fc = pickFds.openFeatureClass(fcName);
		
		if(clickNum == 5){// tdbx的画中画模式
            alert("3DTile 画中画");
            __g.viewport.viewportMode = gviViewportMode.gviViewportPIP; 
            __g.viewport.activeView = 4;
            
            // 高亮
            var row = fc.getRow(fid);
            var rowIndex = row.fieldIndex('Geometry');
            var mp = row.getValue(rowIndex);
            var mps = __g.new_ModelPointSymbol;
            mps.color = 0xffff0000;
            mps.enableColor = true;
            mps.enableTexture = false;
            mps.setResourceDataSet(fc.featureDataSet);
            
            rmp = __g.objectManager.createRenderModelPoint(mp, mps, _globe.__rootId);
            rmp.depthTestMode = gviDepthTestMode.gviDepthTestDisable;
            
            rmp = __g.obejctManager.createRenderModelPoint(mp, mps, _globe.__rootId);
            rmp.visibleMask = gviViewportMask.gviViewPIP;
            
            mp.project(currentCrs);
            
            var ang = __g.new_EulerAngle;
            ang.set(0, -30, 0);
            __g.camera.lookAt(mp.position, 80, ang);
            
            clickNum = 0;
            return; 
        }
		
		pickFc = fc;
		pickFid = fid;
		getBimData(pickFc, 2, pickFid); //type=2是 为瓦片查询fdb显示数据
	}
}

//属性查询，获取BIM数据信息
function getBimData(fc, type, fid) {

	if(fc) {
		record = "Revit"; //默认查询 revit数据
		//如果查询构建  就用GetRow
		var row = fc.getRow(fid);
		infoAdd(fc, row);

		var index = row.fieldIndex("Properties"); //判断是否存在BIM详细属性
		if(index == -1) {
			// showProperties();
			loadHtml.htmlsx();
			return;
		}
		if(type == 2) { //当是瓦片查询的时候 需要创建render模型来展示高亮
			
			var rowIndex = row.fieldIndex('Geometry')
			var mp = row.getValue(rowIndex)
			var mps = __g.new_ModelPointSymbol;
			mps.color = 0xffff0000;
			mps.enableColor = true;
			mps.enableTexture = false;
			mps.setResourceDataSet(fc.featureDataSet);
			
		    rmp = __g.objectManager.createRenderModelPoint(mp, mps, _globe.__rootId);
			rmp.depthTestMode = gviDepthTestMode.gviDepthTestDisable;
		}
		if(row.getValue(index) == null) {
			propertyData.push({
				"name": "详细数据",
				"value": "无",
				"group": "数据",
				"editor": "text"
			});
		} else {
			var properties = "";
			try {
				//获取指定行记录
				var value = row.getValue(index); //获取指定位置的字段值
				if(value == null) return;
				var binaryBuffer = value; //赋值

				properties = binaryBuffer.asString(); //转换成字符串
				
				console.log(properties);
				//salert(properties);
				if(record == "Revit") { //判断传入参数名字
					properties = properties.replace('l version="1.0" standalone="yes"?>', "");
					console.log(properties);
				} else if(record == "MicroStation") {
					properties = properties.replace('l version="1.0" encoding="UTF-8"?>', "");
				}
			} catch(ex) {
				alert("查询Revit属性出错！");
			}
			
			var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM"); //ActiveXObject对象             
			xmlDoc.async = false;
			var xmlLoadResult = xmlDoc.loadXML(properties);
			var nodeTwo;
			var nodeValue;
			var node;
			if(xmlLoadResult) {
				var xmlE = xmlDoc.documentElement;
				var nodelist = xmlE.childNodes;
				nodeLength = nodelist.length;
				for(var a = 0; a < nodelist.length; a++) {
					if(record == "Revit") {
						nodeValue = nodelist[a].nodeTypedValue;
						var attributeColl = nodelist[a].attributes;
						for(var s = 0; s < attributeColl.length; s++) {
							bol2 = true;
							nodeTwo = attributeColl[0].nodeTypedValue;
							node = attributeColl[1].nodeTypedValue;	
						}
					} else if(record == "MicroStation") {
						nodeValue = nodelist[a].nodeTypedValue;
						nodeTwo = nodelist[a].nodeName;
						node = "Properties";
					}
					propertyData.push({
						"name": nodeTwo,
						"value": nodeValue,
						"group": node
					});
				}
			}
		}
		// showProperties();
		loadHtml.htmlsx();
	}
}
//html页面
var id = 0;
var wpBim;

function showProperties() {
	
	id = id + 50;
	wpBim = __g.htmlWindow.createWindowParam(); //IhtmlWindow  接口  其中windowParam对象
	wpBim.filePath = _globe.localpath + "Apps/HTML/query.html?" + id;
	
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
var infoData = [];

function infoAdd(fc, row) {
	infoData = [];
	var fInfoColl = fc.getFields(); //对应表的字段集合  表头集合
	for(var i = 0; i < fInfoColl.count; ++i) {
		var fieleInfo = fInfoColl.get(i);
		var name = fieleInfo.name; //获取字段名称
		var nPos = row.fieldIndex(name); //获取字段索引值  通过名称获取索引      然后通过 fdeRow.getValue(nPos);  得到字段的值
		if(fieleInfo.fieldType == 99) {
			continue;
		}
		if(fieleInfo.fieldType == 9) {
			continue;
		}
		var value = row.getValue(nPos); // 从库中读取值
		infoData.push({
			"name": name,
			"value": value
		});
	}
}