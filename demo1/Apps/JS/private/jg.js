var zTreeObj;
var id;
var pw = external.parentWindow;
var g = pw.__g;
// var rmpGuid;
var rmp;
var fds;

function jgTreeFrame() {
	
	// FeatureLayer 
	if(pw._object_type == pw.gviObjectType.gviObjectFeatureLayer || pw._object_type == pw.gviObjectType.gviObjectTerrainImageLabel){
		
		fds = getFds(pw._gd_fl);//通过Featurelayer获取fds
		
	} else {// gviObject3DTileLayer: 282,传递的是图层的名字，提取其中的工点名称
		
		if(pw._is_local == 1)
		{
			fds = getFdsFromLocalTl(pw._tl_fdb_connInfo);
			
		} else {
			
			var tl_name = pw._tl_name;//将tl_name传递给后台，获取的就是工点的结构树信息
            
            var gdName;
            
            if(tl_name.indexOf("区间路基") > 0){
                //提取整数里程
                //前：DK181+798.10～DK183+583.99区间路基
                //后：DK181+798～DK183+583区间路基
                var dk1 = tl_name.split(/[.～~]/)[0];//DK181+798
                var dk2 = tl_name.split(/[.～~]/)[2];//DK183+583
                
                gdName = dk1 + "～" + dk2 + "路基.FDB";
                
            }
		
			gdName = tl_name + ".FDB";
			
			fds = getFdsFromServer(gdName);
		}
	}

	// 根据专业打开不同的结构树
	if(fds.name.indexOf("通信") >=0 ){//通信
		// alert("通信专业");
		//无线基站(DK509+150)
		var data = [
{
"id":"59vUSCmlpn",
"pId":"0",
"name":"无线基站(DK509+150)",
"level":"1",
"ILD":"无线基站(DK509+150)",
"fcName":"电气设备,常规模型,数据设备,专用设备"
},
{
"id":"RJFU54EHFj",
"pId":"59vUSCmlpn",
"name":"传输及接入",
"level":"2",
"ILD":"无线基站(DK509+150)-传输及接入",
"fcName":"电气设备"
},
{
"id":"8wlAUeSaqP",
"pId":"RJFU54EHFj",
"name":"传输设备",
"level":"3",
"ILD":"无线基站(DK509+150)-传输及接入-传输设备",
"fcName":"电气设备"
},
{
"id":"8w0JEP7ZRB",
"pId":"8wlAUeSaqP",
"name":"SDH",
"level":"4",
"ILD":"无线基站(DK509+150)-传输及接入-传输设备-SDH",
"fcName":"电气设备"
},
{
"id":"aluzvbjQhv",
"pId":"8w0JEP7ZRB",
"name":"SDH 622M ADM",
"level":"5",
"ILD":"无线基站(DK509+150)-传输及接入-传输设备-SDH-SDH 622M ADM",
"fcName":"电气设备"
},
{
"id":"neQLcNjBkE",
"pId":"59vUSCmlpn",
"name":"数据通信",
"level":"2",
"ILD":"无线基站(DK509+150)-数据通信",
"fcName":"电气设备"
},
{
"id":"KDBzC0JYnG",
"pId":"neQLcNjBkE",
"name":"交换机",
"level":"3",
"ILD":"无线基站(DK509+150)-数据通信-交换机",
"fcName":"电气设备"
},
{
"id":"YP3qvp6usJ",
"pId":"KDBzC0JYnG",
"name":"交换机1",
"level":"4",
"ILD":"无线基站(DK509+150)-数据通信-交换机-交换机1",
"fcName":"电气设备"
},
{
"id":"PagdAWyur4",
"pId":"KDBzC0JYnG",
"name":"交换机2",
"level":"4",
"ILD":"无线基站(DK509+150)-数据通信-交换机-交换机2",
"fcName":"电气设备"
},
{
"id":"neQLcNEhLG",
"pId":"neQLcNjBkE",
"name":"路由器",
"level":"3",
"ILD":"无线基站(DK509+150)-数据通信-路由器",
"fcName":"电气设备"
},
{
"id":"P29hsdSUVB",
"pId":"neQLcNEhLG",
"name":"路由器",
"level":"4",
"ILD":"无线基站(DK509+150)-数据通信-路由器-路由器",
"fcName":"电气设备"
},
{
"id":"hvqWVbKrAV",
"pId":"59vUSCmlpn",
"name":"无线移动通信",
"level":"2",
"ILD":"无线基站(DK509+150)-无线移动通信",
"fcName":"常规模型"
},
{
"id":"sKLbBwt6x5",
"pId":"hvqWVbKrAV",
"name":"无线通信基站设备",
"level":"3",
"ILD":"无线基站(DK509+150)-无线移动通信-无线通信基站设备",
"fcName":"常规模型"
},
{
"id":"7bukWIgC3A",
"pId":"sKLbBwt6x5",
"name":"无线通信基站设备",
"level":"4",
"ILD":"无线基站(DK509+150)-无线移动通信-无线通信基站设备-无线通信基站设备",
"fcName":"常规模型"
},
{
"id":"E36KbxT5Ei",
"pId":"59vUSCmlpn",
"name":"电源",
"level":"2",
"ILD":"无线基站(DK509+150)-电源",
"fcName":"电气设备,常规模型"
},
{
"id":"AcrYpxQYXJ",
"pId":"E36KbxT5Ei",
"name":"不间断电源",
"level":"3",
"ILD":"无线基站(DK509+150)-电源-不间断电源",
"fcName":"电气设备"
},
{
"id":"YHN5GdnZ7n",
"pId":"AcrYpxQYXJ",
"name":"不间断电源",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-不间断电源-不间断电源",
"fcName":"电气设备"
},
{
"id":"WLPsbaVkPw",
"pId":"E36KbxT5Ei",
"name":"开关电源",
"level":"3",
"ILD":"无线基站(DK509+150)-电源-开关电源",
"fcName":"常规模型"
},
{
"id":"my4KkqyC20",
"pId":"WLPsbaVkPw",
"name":"开关电源柜",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-开关电源-开关电源柜",
"fcName":"常规模型"
},
{
"id":"hvqWVbK16h",
"pId":"E36KbxT5Ei",
"name":"蓄电池",
"level":"3",
"ILD":"无线基站(DK509+150)-电源-蓄电池",
"fcName":"常规模型"
},
{
"id":"cxW8pXTm84",
"pId":"hvqWVbK16h",
"name":"蓄电池1",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池1",
"fcName":"常规模型"
},
{
"id":"jr2ewXdtxr",
"pId":"hvqWVbK16h",
"name":"蓄电池10",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池10",
"fcName":"常规模型"
},
{
"id":"jPKY0JsPry",
"pId":"hvqWVbK16h",
"name":"蓄电池11",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池11",
"fcName":"常规模型"
},
{
"id":"GCvc0J81wE",
"pId":"hvqWVbK16h",
"name":"蓄电池12",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池12",
"fcName":"常规模型"
},
{
"id":"GIH3Y6pGRl",
"pId":"hvqWVbK16h",
"name":"蓄电池13",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池13",
"fcName":"常规模型"
},
{
"id":"wSP45hzIFr",
"pId":"hvqWVbK16h",
"name":"蓄电池14",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池14",
"fcName":"常规模型"
},
{
"id":"wPW5mHpzeP",
"pId":"hvqWVbK16h",
"name":"蓄电池15",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池15",
"fcName":"常规模型"
},
{
"id":"Sl1jJCShc4",
"pId":"hvqWVbK16h",
"name":"蓄电池16",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池16",
"fcName":"常规模型"
},
{
"id":"zR9kplilBI",
"pId":"hvqWVbK16h",
"name":"蓄电池2",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池2",
"fcName":"常规模型"
},
{
"id":"zEB0JqE0JA",
"pId":"hvqWVbK16h",
"name":"蓄电池3",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池3",
"fcName":"常规模型"
},
{
"id":"pSLwsfzSPQ",
"pId":"hvqWVbK16h",
"name":"蓄电池4",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池4",
"fcName":"常规模型"
},
{
"id":"pmu0JG3yzW",
"pId":"hvqWVbK16h",
"name":"蓄电池5",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池5",
"fcName":"常规模型"
},
{
"id":"LKBwcl9l8i",
"pId":"hvqWVbK16h",
"name":"蓄电池6",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池6",
"fcName":"常规模型"
},
{
"id":"7grB6fh5pe",
"pId":"hvqWVbK16h",
"name":"蓄电池8",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池8",
"fcName":"常规模型"
},
{
"id":"XKjvBE8jNB",
"pId":"hvqWVbK16h",
"name":"蓄电池9",
"level":"4",
"ILD":"无线基站(DK509+150)-电源-蓄电池-蓄电池9",
"fcName":"常规模型"
},
{
"id":"sKgu0JScLS",
"pId":"59vUSCmlpn",
"name":"综合布线及机柜",
"level":"2",
"ILD":"无线基站(DK509+150)-综合布线及机柜",
"fcName":"常规模型"
},
{
"id":"59vUSC0J7V",
"pId":"sKgu0JScLS",
"name":"机柜",
"level":"3",
"ILD":"无线基站(DK509+150)-综合布线及机柜-机柜",
"fcName":"常规模型"
},
{
"id":"iekxlxTS1c",
"pId":"59vUSC0J7V",
"name":"电池柜1",
"level":"4",
"ILD":"无线基站(DK509+150)-综合布线及机柜-机柜-电池柜1",
"fcName":"常规模型"
},
{
"id":"XWQ1SmAn8d",
"pId":"59vUSC0J7V",
"name":"电池柜2",
"level":"4",
"ILD":"无线基站(DK509+150)-综合布线及机柜-机柜-电池柜2",
"fcName":"常规模型"
},
{
"id":"1DKD4GDpcu",
"pId":"59vUSC0J7V",
"name":"视频柜",
"level":"4",
"ILD":"无线基站(DK509+150)-综合布线及机柜-机柜-视频柜",
"fcName":"常规模型"
},
{
"id":"PcFpv6El7g",
"pId":"59vUSCmlpn",
"name":"调度通信",
"level":"2",
"ILD":"无线基站(DK509+150)-调度通信",
"fcName":"电气设备"
},
{
"id":"ZakHudK1pS",
"pId":"PcFpv6El7g",
"name":"语音记录仪设备",
"level":"3",
"ILD":"无线基站(DK509+150)-调度通信-语音记录仪设备",
"fcName":"电气设备"
},
{
"id":"DMsHrVjFeS",
"pId":"ZakHudK1pS",
"name":"语音记录仪设备",
"level":"4",
"ILD":"无线基站(DK509+150)-调度通信-语音记录仪设备-语音记录仪设备",
"fcName":"电气设备"
},
{
"id":"fZ7sXEuNPA",
"pId":"59vUSCmlpn",
"name":"配线及引入",
"level":"2",
"ILD":"无线基站(DK509+150)-配线及引入",
"fcName":"数据设备"
},
{
"id":"MxFCPdQUMJ",
"pId":"fZ7sXEuNPA",
"name":"MDF配线单元",
"level":"3",
"ILD":"无线基站(DK509+150)-配线及引入-MDF配线单元",
"fcName":"数据设备"
},
{
"id":"0JBLGMWkfk",
"pId":"MxFCPdQUMJ",
"name":"MDF配线单元",
"level":"4",
"ILD":"无线基站(DK509+150)-配线及引入-MDF配线单元-MDF配线单元",
"fcName":"数据设备"
},
{
"id":"3SZ35rZTWN",
"pId":"59vUSCmlpn",
"name":"铁塔",
"level":"2",
"ILD":"无线基站(DK509+150)-铁塔",
"fcName":"专用设备"
},
{
"id":"3EN7N82x8K",
"pId":"3SZ35rZTWN",
"name":"架空支撑结构",
"level":"3",
"ILD":"无线基站(DK509+150)-铁塔-架空支撑结构",
"fcName":"专用设备"
},
{
"id":"HzKYCzpR9C",
"pId":"3EN7N82x8K",
"name":"塔",
"level":"4",
"ILD":"无线基站(DK509+150)-铁塔-架空支撑结构-塔",
"fcName":"专用设备"
},
{
"id":"upvPQ1gCuq",
"pId":"HzKYCzpR9C",
"name":"塔",
"level":"5",
"ILD":"无线基站(DK509+150)-铁塔-架空支撑结构-塔-塔",
"fcName":"专用设备"
}
];

	} else{//信号
		// alert("信号专业");
		//中继站25(DK509+600)
		var data = [
{
"id":"0JT394lntM",
"pId":"0",
"name":"中继站25(DK509+600)",
"level":"1",
"ILD":"中继站25(DK509+600)",
"fcName":"电气设备,常规模型,电缆桥架"
},
{
"id":"iUNjN6F3Df",
"pId":"0JT394lntM",
"name":"列车运行控制系统",
"level":"2",
"ILD":"中继站25(DK509+600)-列车运行控制系统",
"fcName":"电气设备"
},
{
"id":"iUNjN6cwUy",
"pId":"iUNjN6F3Df",
"name":"室内设备",
"level":"3",
"ILD":"中继站25(DK509+600)-列车运行控制系统-室内设备",
"fcName":"电气设备"
},
{
"id":"WYvAxMaXMv",
"pId":"iUNjN6cwUy",
"name":"车站或中继站列控中心机柜",
"level":"4",
"ILD":"中继站25(DK509+600)-列车运行控制系统-室内设备-车站或中继站列控中心机柜",
"fcName":"电气设备"
},
{
"id":"qFIn1A2t3v",
"pId":"WYvAxMaXMv",
"name":"车站或中继站列控中心机柜1",
"level":"5",
"ILD":"中继站25(DK509+600)-列车运行控制系统-室内设备-车站或中继站列控中心机柜-车站或中继站列控中心机柜1",
"fcName":"电气设备"
},
{
"id":"biCztR7rUC",
"pId":"WYvAxMaXMv",
"name":"车站或中继站列控中心机柜2",
"level":"5",
"ILD":"中继站25(DK509+600)-列车运行控制系统-室内设备-车站或中继站列控中心机柜-车站或中继站列控中心机柜2",
"fcName":"电气设备"
},
{
"id":"p2xypEUuZv",
"pId":"0JT394lntM",
"name":"区间闭塞系统",
"level":"2",
"ILD":"中继站25(DK509+600)-区间闭塞系统",
"fcName":"常规模型,电缆桥架"
},
{
"id":"z61dYIYI4E",
"pId":"p2xypEUuZv",
"name":"室内设备",
"level":"3",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备",
"fcName":"常规模型,电缆桥架"
},
{
"id":"ckKLSYmX84",
"pId":"z61dYIYI4E",
"name":"区间移频柜",
"level":"4",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-区间移频柜",
"fcName":"常规模型"
},
{
"id":"rJUGI6tv1t",
"pId":"ckKLSYmX84",
"name":"区间移频柜1",
"level":"5",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-区间移频柜-区间移频柜1",
"fcName":"常规模型"
},
{
"id":"E1H0J2a6Cr",
"pId":"ckKLSYmX84",
"name":"区间移频柜2",
"level":"5",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-区间移频柜-区间移频柜2",
"fcName":"常规模型"
},
{
"id":"81KdfuPWcn",
"pId":"ckKLSYmX84",
"name":"区间移频柜3",
"level":"5",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-区间移频柜-区间移频柜3",
"fcName":"常规模型"
},
{
"id":"H1jF9gHCbL",
"pId":"z61dYIYI4E",
"name":"区间组合柜",
"level":"4",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-区间组合柜",
"fcName":"常规模型"
},
{
"id":"sDJBq0JtRl",
"pId":"H1jF9gHCbL",
"name":"区间组合柜1",
"level":"5",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-区间组合柜-区间组合柜1",
"fcName":"常规模型"
},
{
"id":"6YzisGPb5H",
"pId":"z61dYIYI4E",
"name":"区间综合柜",
"level":"4",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-区间综合柜",
"fcName":"常规模型"
},
{
"id":"aevKn0JM90",
"pId":"6YzisGPb5H",
"name":"区间综合柜1",
"level":"5",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-区间综合柜-区间综合柜1",
"fcName":"常规模型"
},
{
"id":"T1nfUTdEqY",
"pId":"6YzisGPb5H",
"name":"区间综合柜2",
"level":"5",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-区间综合柜-区间综合柜2",
"fcName":"常规模型"
},
{
"id":"Kj5VDiWBH5",
"pId":"z61dYIYI4E",
"name":"走线架",
"level":"4",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-走线架",
"fcName":"电缆桥架"
},
{
"id":"kbBwzPwQ6T",
"pId":"Kj5VDiWBH5",
"name":"走线架1",
"level":"5",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-走线架-走线架1",
"fcName":"电缆桥架"
},
{
"id":"lLk2P76yxX",
"pId":"Kj5VDiWBH5",
"name":"走线架2",
"level":"5",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-走线架-走线架2",
"fcName":"电缆桥架"
},
{
"id":"WAsyu34YdL",
"pId":"Kj5VDiWBH5",
"name":"走线架3",
"level":"5",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-走线架-走线架3",
"fcName":"电缆桥架"
},
{
"id":"ESHm0J5ejh",
"pId":"Kj5VDiWBH5",
"name":"走线架4",
"level":"5",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-走线架-走线架4",
"fcName":"电缆桥架"
},
{
"id":"jGAzwYhz8R",
"pId":"Kj5VDiWBH5",
"name":"走线架5",
"level":"5",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-走线架-走线架5",
"fcName":"电缆桥架"
},
{
"id":"Pbksq3DbzM",
"pId":"Kj5VDiWBH5",
"name":"走线架6",
"level":"5",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室内设备-走线架-走线架6",
"fcName":"电缆桥架"
},
{
"id":"vq7kx8zTv9",
"pId":"p2xypEUuZv",
"name":"室外设备",
"level":"3",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室外设备",
"fcName":"常规模型"
},
{
"id":"FiYgihqGZB",
"pId":"vq7kx8zTv9",
"name":"区间信号机",
"level":"4",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室外设备-区间信号机",
"fcName":"常规模型"
},
{
"id":"dtmfCtc1uV",
"pId":"FiYgihqGZB",
"name":"区间信号机",
"level":"5",
"ILD":"中继站25(DK509+600)-区间闭塞系统-室外设备-区间信号机-区间信号机",
"fcName":"常规模型"
},
{
"id":"mgH5PAS5vM",
"pId":"0JT394lntM",
"name":"综合防雷设备",
"level":"2",
"ILD":"中继站25(DK509+600)-综合防雷设备",
"fcName":"常规模型"
},
{
"id":"mgH5Pp5R2N",
"pId":"mgH5PAS5vM",
"name":"防雷分线柜",
"level":"3",
"ILD":"中继站25(DK509+600)-综合防雷设备-防雷分线柜",
"fcName":"常规模型"
},
{
"id":"t7R2SWFihn",
"pId":"mgH5Pp5R2N",
"name":"防雷分线柜",
"level":"4",
"ILD":"中继站25(DK509+600)-综合防雷设备-防雷分线柜-防雷分线柜",
"fcName":"常规模型"
},
{
"id":"E52srtVihu",
"pId":"0JT394lntM",
"name":"集中监测系统",
"level":"2",
"ILD":"中继站25(DK509+600)-集中监测系统",
"fcName":"常规模型"
},
{
"id":"HNgYQeZXVF",
"pId":"E52srtVihu",
"name":"车站及中继站监测分机",
"level":"3",
"ILD":"中继站25(DK509+600)-集中监测系统-车站及中继站监测分机",
"fcName":"常规模型"
},
{
"id":"Et4PBa1gsx",
"pId":"HNgYQeZXVF",
"name":"信号集中监测机柜",
"level":"4",
"ILD":"中继站25(DK509+600)-集中监测系统-车站及中继站监测分机-信号集中监测机柜",
"fcName":"常规模型"
},
{
"id":"UxnH8qU0J0",
"pId":"HNgYQeZXVF",
"name":"信号集中监测组合柜",
"level":"4",
"ILD":"中继站25(DK509+600)-集中监测系统-车站及中继站监测分机-信号集中监测组合柜",
"fcName":"常规模型"
}
];

	}
	
	data.name = "结构树"
	zTreeObj = $.fn.zTree.init($("#jgTree"), setting, data);
}

/***********************************************************************/
/* 从本地的FeatureLayer获取FDS
/***********************************************************************/
function getFds(fl) {
    //要素层
    var conn_fl = fl.featureClassInfo.dataSourceConnectionString; //图层链接字符串
    var ds = g.dataSourceFactory.openDataSourceByString(conn_fl); //数据集
    //要素集
    var fdsNames = fl.featureClassInfo.dataSetName; //要素集(第二层rvt文件名)
    var fds = ds.openFeatureDataset(fdsNames); //打开要素集
    return fds;
}
/************************************************************************/
/* 从本地获取与TileLayer关联的FDS                                          */
/************************************************************************/

function getFdsFromLocalTl(conn){
	var ci = g.new_ConnectionInfo;;
	ci.connectionType = gviConnectionType.gviConnectionFireBird2x;
	ci.database = conn;
	
	var ds = g.dataSourceFactory.openDataSource(ci);
	var fdsNames = ds.getFeatureDatasetNames();
	if (fdsNames.length == 0)
		return;
	var fds = ds.openFeatureDataset(fdsNames[0]);
	return fds;
}
/************************************************************************/
/* 从 Http Server类型数据库  获取要素集                                                                                                                    */
/************************************************************************/
function getFdsFromServer(dbname){
	
	var ci = g.new_ConnectionInfo;
	ci.connectionType = 101;
	ci.server = "127.0.0.1";
	ci.port = 8040;
	ci.database = dbname;
	ci.userName = "";
	ci.password = "";
	
	var ds = g.dataSourceFactory.openDataSource(ci);
	var fdsNames = ds.getFeatureDatasetNames();
	if (fdsNames.length == 0)
		return;
	var fds = ds.openFeatureDataset(fdsNames[0]);
	return fds;
}

/**
 * 双击，定位，高亮
 */
function zTreeOnDblClick(event, treeId, treeNode) {

    if (treeNode == null)
        return;
    if (treeNode.isParent == false) {

        g.featureManager.unhighlightAll(); //先把原来的高亮删除

        var id = treeNode.id; //结构树节点id
		
        var fcName = treeNode.fcName;
		
		// alert("fcname = " + fcName);
		
        var fc = fds.openFeatureClass(fcName);

        fly2Object(id, fc);
		
// 		if(pw._object_type == 282){
// 			g.objectManager.deleteObject(rmp.guid);
// 		}
    }
}


/**
 * 通过lookAt跳转到构件
 */
function fly2Object(id, fc) {
    try {

        var sql = "\"ID\" = '" + id + "'"; //工点的ID
        var filter = g.new_QueryFilter;
        filter.whereClause = sql;

        var cursor = fc.search(filter, true);
        var fdeRow, fid, index;
        while ((fdeRow = cursor.nextRow()) != null) {
            index = fdeRow.fieldIndex("oid");
            fid = fdeRow.getValue(index);
            var ok = g.featureManager.highlightFeature(fc, fid, 0xffff0000); //高亮
// 			alert("fid = " + fid);
// 			alert("highlight = " + ok);
        }

        var row_buffer = fc.getRow(fid);
        var geo_index = row_buffer.fieldIndex("Geometry");
        var mp = row_buffer.getValue(geo_index);

        var crs = g.getCurrentCrsWKT();
        var targetCrs = g.crsFactory.createFromWKT(crs);
        mp.project(targetCrs);
		
		var mps = g.new_ModelPointSymbol;
		mps.color = 0xffff0000;
		mps.enableColor = true;
		mps.enableTexture = false;
		mps.setResourceDataSet(fc.featureDataSet);
		
		rmp = g.objectManager.createRenderModelPoint(mp, mps, fid);
		rmp.depthTestMode = pw.gviDepthTestMode.gviDepthTestDisable;
		rmp.glow(3000);
		
// 		//如果是瓦片类型则创建rmp，否则不创建
// 		if(pw._object_type == 282)
// 		{
// 			var mps = g.new_ModelPointSymbol;
// 			mps.color = 0xffff0000;
// 			mps.enableColor = true;
// 			mps.enableTexture = false;
// 			mps.setResourceDataSet(fc.featureDataSet);
// 			
// 			rmp = g.objectManager.createRenderModelPoint(mp, mps, fid);
// 			rmp.depthTestMode = pw.gviDepthTestMode.gviDepthTestDisable;
// 		}
// 		
		var angle = g.new_EulerAngle;
        angle.set(0, -30, 0);
        g.camera.flyTime = 0.5;
        g.camera.lookAt(rmp.position, 10, angle); //距离太远会看不见
		// g.camera.flyToObject(rmp.guid, gviActionCode.gviActionFlyTo);
		g.objectManager.delayDelete(rmp.guid, 3000);

    } catch (e) {
        alert("错误：" + e.message + "!");
    }


}

// /**
//  * zTreeOnClick事件
//  */
// function zTreeOnClick(event, treeId, treeNode) {
//     if (treeNode == null)
//         return;
//     //是父节点
//     if (treeNode.isParent == true) {
//         var id = treeNode.id;
//         var fcName = treeNode.fcName;
//         var ild = treeNode.ILD;
//         var fcNames = fcName.split(",");
//         //高亮
//         highlight(fcNames, ild);
//     }
// }
// 
// /**
//  * 高亮多个要素类中的要素
//  */
// function highlightFcs(fcNames, ild) {
// 
//     for (int i = 0; i < fcNames.length; i++) {
//         var fc = fds.openFeatureClass(fcNames[i]);
//         highlightFc(fc, ild);
//     }
// }
// 
/**
 * 高亮同类的构件
 */
function highlightFc(fc, ild) {
    ild = ild + "-"; //不获取本身，因为
    var sql = "\"ILD\" LIKE '" + ild + "'"; //工点的ID
    var filter = g.new_QueryFilter;
    filter.whereClause = sql;
    var cursor = fc.search(filter, true);
    var fdeRow;
    var fids = [];
    while ((fdeRow = cursor.nextRow()) != null) {
        var oidIndex = fdeRow.fieldIndex("oid");
        var fid = fdeRow.getValue(oidIndex);
        fids.push(fid);
    }
    //高亮features
    g.featureManager.highligthFeatures(fc, fids, 0xffff0000);
}

/**
 * zTree 设置
 */
var setting = {
    view: {
        showIcon: false,
        fontCss: {
            color: "white"
        }
    },
    callback: {
        onDblClick: zTreeOnDblClick,
        //OnClick: zTreeOnClick
    },
    check: {
        enable: false,
        chkStyle: "checkbox",
        chkboxType: {
            "Y": "s",
            "N": "s"
        }
    },
    data: {
        key: {
            name: 'name',
            checked: "visibility" //zTree 节点数据中保存 check 状态的属性名称。 用visibility代替checked设置是否勾选属性
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
}

/**
 * 图层获取要素类
 * @param fl
 *			要素图层
 */
// function getFcFromFl(fl) {
//     //要素层
//     var conn_fl = fl.featureClassInfo.dataSourceConnectionString; //图层链接字符串
//     var ds = g.dataSourceFactory.openDataSourceByString(conn_fl); //数据集
//     //要素集
//     var fdsNames = fl.featureClassInfo.dataSetName; //要素集(第二层rvt文件名)
//     var fds = ds.openFeatureDataset(fdsNames); //打开要素集
//     //要素类
//     var fcName = fl.featureClassInfo.featureClassName; //要素类名字（第三层）可以直接获取fcName
//     var fc = fds.openFeatureClass(fcName);
//     alert("getFcFromFl.fcName = " + fcName);
//     //     var fdsNames = ds.getFeatureDatasetNames();
//     //     if (fdsNames.length == 0) 
//     // 		return;
//     //     var fds = ds.openFeatureDataset(fdsNames[0]);
//     //     var fcNames = fds.getNamesByType(pw.gviDataSetType.gviDataSetFeatureClassTable);
//     //     var fc = fds.openFeatureClass(fcNames[fcId]);
//     return fc;
// 
// }
// 
/**
 * 获取guid
 * @param id
 * 			工程树中工点ID
 */
// function getRmpGuid(id, fc) {
// 
//     try {
//         alert("jg.getRmpGuid");
//         // alert("getRmpGuid.id = " + id);
//         var sql = "\"ID\" = '" + id + "'"; //工点的ID
//         var filter = g.new_QueryFilter;
//         filter.whereClause = sql;
// 
//         var cursor = fc.search(filter, true);
//         var fdeRow, fid, index;
//         while ((fdeRow = cursor.nextRow()) != null) {
//             index = fdeRow.fieldIndex("oid");
//             fid = fdeRow.getValue(index);
//             alert("getRmpGuid.fid = " + fid);
//             g.featureManager.highlightFeature(fc, fid, 0xffff0000); //高亮
//         }
// 
//         var row_buffer = fc.getRow(fid);
//         var geo_index = row_buffer.fieldIndex("Geometry");
//         var mp = row_buffer.getValue(geo_index);
// 
//         //=================2018.6.30 通过投影转换为经纬度 ================================
//         var crs = g.getCurrentCrsWKT();
//         alert("crs = " + crs);
//         var targetCrs = g.crsFactory.createFromWKT(crs);
//         mp.project(targetCrs);
//         // alert("mp.position : x, y, z = " + mp.position.x + ", " + mp.position.y + ", " + mp.position.z);
//         //=================2018.6.30 用LookAt实现跳转，无需创建rmp======================
//         var angle = g.new_EulerAngle;
//         angle.set(0, -21, 0);
//         g.camera.flyTime = 1;
//         g.camera.lookAt(mp.position, 80, angle);
// 
//         //=================2018.6.30 用LookAtEnvelope测试=====================================================
//         // 		var fieldInfos = fc.getFields();
//         // 		var fieldInfo = fieldInfos.get(geo_index);
//         // 		var geoDef = fieldInfo.geometryDef;
//         // 		var env = geoDef.envelope;
//         // 		alert("env.center : x, y, z = " + env.center.x + ", " + env.center.y + ", " + env.center.z);
//         // 		g.camera.lookAt(env.center, 300, angle);
//         // 		g.camera.lookAtEnvelope(env);
//         // 		
//         // 		
//         //         var mps = g.new_ModelPointSymbol;
//         //         mps.enableTexture = false;
//         //         mps.setResourceDataSet(fc.featureDataSet);
//         // 
//         //         rmp = g.objectManager.createRenderModelPoint(mp, mps, fid);
//         //         rmp.depthTestMode = pw.gviDepthTestMode.gviDepthTestAdvance;
//         // 
//         //         rmpGuid = rmp.guid;
//         // 
//     } catch (e) {
//         alert(e.message);
//     }
// 
// }
// 
