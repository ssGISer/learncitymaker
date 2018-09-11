var zTreeObj;
var id;
var pp = external.parentWindow;
var gd_fl;

function leftFrameList() {
	var tree = pp.__g.projectTree;
	var treeData = tree.traverse();
	var projectztree = eval('(' + treeData + ')');
	projectztree.name = "工程树";
	zTreeObj = $.fn.zTree.init($("#treeDemoTemp"), setting, projectztree);
};

function inittree(projectztree) {
	projectztree.name = "工程树";
	zTreeObj = $.fn.zTree.init($("#treeDemoTemp"), setting, projectztree);
};

//双击节点
function zTreeOnDblClick(event, treeId, treeNode) {
	
	if(treeNode == null) 
		return;
		
	if(treeNode.isParent == false) {
		
		pp._guid = treeNode.id;// 工程树节点的guid
		
		var robj = pp.__g.objectManager.getObjectById(treeNode.id);
		pp._object_type = robj.type;//全局变量存储节点文件的对象类型
		
		if(robj == undefined)
			return;

		switch(robj.type) {
			case pp.gviObjectType.gviObjectFeatureLayer:
			case pp.gviObjectType.gviObjectTerrainImageLabel:

				//获取图层信息，要素类是从图层中获取的
				pp._gd_fl = pp.__g.objectManager.getFeatureLayer(treeNode.id);
				
				pp._is_local = 1;

				//飞行时间
				pp.__g.camera.flyTime = 1;
				pp.__g.camera.flyToObject(treeNode.id, pp.gviActionCode.gviActionFlyTo);

				pp.loadHtml.htmljg();

				break;
			case pp.gviObjectType.gviObjectPresentation:
				robj.resetPresentation();
				break;
			case pp.gviObjectType.gviObjectDynamicObject:
				pp.__g.camera.flyToObject(robj.guid, pp.gviActionCode.gviActionFollowBehindAndAbove);
				robj.play();
				break;
			case pp.gviObjectType.gviObjectTerrainLocation:
				var point = pp.__g.geometryFactory.createPoint(pp.gviVertexAttribute.gviVertexAttributeZ);
				var position = robj.position;
				var pos = pp.__g.new_Vector3;
				var ang = pp.__g.new_EulerAngle;
				pos.set(position.x, position.y, position.altitude);
				ang.heading = position.heading;
				ang.tilt = position.tilt;
				pp.__g.camera.lookAt(pos, 200, ang);
				break;
			default:
				if(robj != undefined) { // gviObject3DTileLayer: 282, 瓦片屏蔽结构树
					
					var render = robj.renderParams;
					
					pp._is_local = 1;
					pp.__g.camera.flyTime = 1;
					pp.__g.camera.flyToObject(treeNode.id, pp.gviActionCode.gviActionFlyTo);
					
					var connInfo = robj.connectionInfo;
					pp._tl_name = robj.name;				//瓦片图层名
					alert("3DTileLayerName = " + robj.name);
					pp._tl_fdb_connInfo = connInfo+ ".fdb";	//瓦片关联的fdb位置信息
					
					var keys = robj.renderParams.getAllKeys();
//					alert("keys.length = " + keys.length);
//				    alert("keys[0] = " + keys[0] + ", keys[1]=" + keys[1] + ", keys[2]=" + keys[2]);//Transparency
				    var val = robj.renderParams.getProperty("Transparency");
//				    alert("val=" + val);//1
				    
				    
					render.setProperty("Transparency", 0.3);
					robj.renderParams = render;
					
					//__g.initialize(false, ps);
				}
		}
	} else {

	}
};

//设置图层可见性
function zTreeOnCheck(event, treeId, treeNode) {
	if(treeNode == null) return;

	var group = treeNode.isParent;
	if(group) {
		if(treeNode.visibility == false) {
			treeVisibilityN(treeNode.id)
		} else {
			treeVisibility(treeNode.id)
		}
		return;
	}
	var robj = pp.__g.objectManager.getObjectById(treeNode.id);
	if(robj == undefined) return;
	if(treeNode.visibility == true) {
		//裁切面操作 
		if(robj.type == pp.gviObjectType.gviObjectClipPlaneOperation) {
			robj.execute();
		} else {
			treeVisibility(treeNode.id);
		}
	} else {
		if(robj.type == pp.gviObjectType.gviObjectClipPlaneOperation) {
			robj.cancel();
		} else {
			treeVisibilityN(treeNode.id);
		}
	}
};

function treeVisibility(guid) {
	pp.__g.projectTree.setVisibility(guid, pp.gviViewportMask.gviView0);
}

function treeVisibilityN(guid) {
	pp.__g.projectTree.setVisibility(guid, pp.gviViewportMask.gviViewNone);
}
//获取图层可见性
function getVisibility(guid) {
	var Vnum = pp.__g.projectTree.getVisibility(guid);
	return Vnum;
}

var hiddenNodes = []; //用于存储被隐藏的结点

//过滤ztree显示数据
function filter() {
	//显示上次搜索后被隐藏的结点
	zTreeObj.showNodes(hiddenNodes);

	//查找不符合条件的叶子节点
	function filterFunc(node) {
		var _keywords = $("#searchbox").val();
		if(node.isParent || node.name.indexOf(_keywords) != -1) return false;
		return true;
	}
	//获取不符合条件的叶子结点
	hiddenNodes = zTreeObj.getNodesByFilter(filterFunc);

	//隐藏不符合条件的叶子结点
	zTreeObj.hideNodes(hiddenNodes);
	zTreeObj.expandAll(true);
}

var setting = {
	view: {
		showIcon: false,
		dblClickExpand: true, //双击可以展开节点，只有最后叶子节点才获取对应值
		fontCss: {
			color: "white"
		}
	},
	callback: {
		onDblClick: zTreeOnDblClick,
		onCheck: zTreeOnCheck
	},
	check: {
		enable: true,
		chkStyle: "checkbox",
		chkboxType: {
			"Y": "s",
			"N": "s"
		}
	},
	data: {
		key: {
			name: 'name',
			// 用visibility代替checked设置是否勾选属性
			checked: "visibility"
		},
		simpleData: {
			enable: true,
			idKey: "id",
		}
	},
	edit: {
		drag: {
			isMove: false
		},
		enable: false
	}
};