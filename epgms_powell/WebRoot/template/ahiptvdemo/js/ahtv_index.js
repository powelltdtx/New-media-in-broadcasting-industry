
var twoad = "";
var flag=false;
var channelNum="";
var namevoice="";
function setTimer(pageId,code,nodeId,contentType,functionName) {
	setInterval(function() {
		loadAdConfingJSONData(pageId,code,nodeId,contentType,functionName);
	}, 300000);
}

function getData(iptv_jpad) {
	var lsflag = 137;
	var baseurl = "";
	var xmlhttp;
	var obj;	
	var aad;
	var providerid = "hw";
	var ChannelCount = '137';
	
	var temptoken = getCookie('temptoken');
	var userid = getuserid();
	
	twoad = "";
	//baseurl = "http://117.71.25.104:81/bytuetechAPI/jsp/ahiptv/";
	baseurl = "http://117.71.25.104:81/bytuetechAPI/jsp/ahiptv/";
	
	var plates = iptv_jpad.position;
	var advers = plates[0].plate;
	var adress = advers[0].advertising;
	
	/*if("5" ==adress[0].adresource[0].actiontype){//显示直播窗口
		document.getElementById("foucus").style.display = "none";
		document.getElementById("focusChannel").style.display = "block";
		channelNum=adress[0].adresource[0].guid;
		document.getElementById("channelPlay").src='play.jsp?channelNum='+channelNum;
		flag=true;
	}else{
		document.getElementById("focusChannel").style.display = "none";
		document.getElementById("foucus").style.display = "block";
		document.getElementById("channelPlay").src='';
		flag=false;
	}*/
	//update 20170601 spark start to data error Value should be plates
	for ( var j = 0; j < adress.length; j++) {
		var adarr = adress[j].adresource;
	//for ( var j = 0; j < plates.length; j++) {

		/*advers = plates[j].plate;
		adress = advers[0].advertising;
		var adarr = adress[0].adresource;*/
		//no ad exist
		if(adarr.length == 0){
			aad = "" + "@@@@" + "";
			twoad += aad + "||||";
			continue;
		}
		//update 20170601 spark end
		for ( var i = 0; i < 1; i++) {
			if (namevoice == "") {
				namevoice = adarr[i].name;
			} else {
				namevoice = namevoice + "," + adarr[i].name;
			}
			var actionType = adarr[i].actiontype;

			var categoryid = adarr[i].categoryid;

			var parentid = adarr[i].parentId;

			var listtype = adarr[i].listtype;

			var guid = adarr[i].guid;

			var img = adarr[i].imgurl;

			var actionUrl = adarr[i].actionUrl;

			var pageurl;

			if ("6" == actionType) {

				if ("1" == listtype) {

					pageurl = baseurl + "moiveList.jsp?category_id=" + categoryid;

				} else if ("2" == listtype) {

					pageurl = baseurl + "zb_page.jsp?parentid=" + parentid
							+ "&categoryid=" + categoryid;

				} else if ("4" == listtype) {

					pageurl = baseurl + "special.jsp?topic_id=" + categoryid;

				} else {

					pageurl = baseurl + "dy_page.jsp?parentid=" + parentid
							+ "&categoryid=" + categoryid;

				}

			} else if ("2" == actionType) {
				guid = guid.replace(/UmaiPROG/,"Umai:PROG/");
				guid = guid.replace(/AHTVAHGD/,"@AHTV.AHGD");
				pageurl = baseurl + "moiveDet2.jsp?code=" + guid  + "&temptoken=" + temptoken + "&userid=" + userid;

			} else if ("3" == actionType) {
				guid = guid.replace(/UmaiPROG/,"Umai:PROG/");
				guid = guid.replace(/AHTVAHGD/,"@AHTV.AHGD");
				pageurl = baseurl + "moiveDet.jsp?code=" + guid + "&temptoken=" + temptoken + "&userid=" + userid;

			} else if ("1" == actionType) {

				pageurl = actionUrl;

			}else if ("5" == actionType) {

				pageurl = actionUrl;

			}else {

				pageurl = "";

			}
			aad = pageurl + "@@@@" + img;
			twoad += aad + "||||";
		
		}
	}
	initdata();
	voice();
}

function initdata() {

	var str = new Array();
	str = twoad.split("||||");
	var i=0;
	var j=0;
	if(flag==true){
		i=1;
		j=5;
	}else{
		i=0;
		j=0;
	}
	for (i; i < str.length; i++) {
		var addata = new Array();
		if (str[i] != "") {
			
			addata = str[i].split("@@@@");
			var ahref = addata[0];
			
			if(i < 5){
				programMoveParas[i].url = ahref;
			}else{
				programMoveParas[i + 6].url = ahref;
			}
			var pic = addata[1];
			var jumpurl = "javascript:jumptohref('" + ahref + "')";
			document.getElementById("img_" + j).src = pic;
			
		}
		j++;
		if(j>=8){
			break;
		}
	}
}
var callback = function(intent) {
	var command = intent._command;
	var commandarray = command.split(",");
	
	fnRemoveEleClass(current.ele, current.area.selStyle);
	current.area.currentIndex = parseInt(commandarray[commandarray.length - 1]);
	fnSetCurrent();
	fnAddEleClass(current.ele, current.area.selStyle);
	pageControl.ok();

}
function voice(){
	var namevoicestr = namevoice.split(",");
	var recordvoicearray=recordvoice.split(",");
var scene = {
	"_scene" : "com.iflytek.xiri.MyScene",
	"_commands" : {
		"key1" : [ "打开", "开始" ],
		"key2" : [ "$W(video)" ],
		"key3" : [ "谍影重重5" ],
		"Index" : [ "首页", "主页", "第一页"],
		"back":["返回"],
		"Index,100,0" : [ namevoicestr[0] ],
		"Index,100,1" : [ namevoicestr[1] ],
		"Index,100,2" : [ namevoicestr[2] ],
		"Index,100,3" : [ namevoicestr[3] ],
		"Index,100,4" : [ namevoicestr[4] ],
		"Index,100,6":[recordvoicearray[0]],
		"Index,100,7":[recordvoicearray[1]],
		"Index,100,8":[recordvoicearray[2]],
		"Index,100,9" : [ "4k专区" ],
		"Index,100,10" : [ "热播" ],
		"Index,100,11" : [ namevoicestr[5] ],
		"Index,100,12" : [ namevoicestr[6] ],
		"Index,100,13" : [ namevoicestr[7] ],
		"Index,100,14" : [ "我的" ],
		"Index,100,15" : [ "频道" ],
		"Index,100,16" : [ "电视剧" ],
		"Index,100,17" : [ "电影" ],
		"Index,100,18" : [ "动画" ],
		"Index,100,19" : [ "综艺" ],
		"Index,100,20" : [ "纪实" ],
		"Index,100,21" : [ "服务" ],
		"Index,100,22" : [ "党教" ],
		"Index,100,23" : [ "新闻" ],
		"Index,100,24" : [ "体育" ],
		"Index,100,25" : [ "电竞" ],
		"Index,100,26" : [ "时尚" ],
		"Index,100,27" : [ "教育" ],
		"Index,100,28" : [ "徽好看" ],
		"Index,100,29" : [ "广场舞", "广场舞大赛" ],
		"Index,100,30" : [ "最近收看"],
		"_PLAY" : [ "$P(_PLAY)" ],
		"_PAGE" : [ "$P(_PAGE)" ],
		"_EPISODE" : [ "$P(_EPISODE)" ],
		"_SELECT" : [ "$P(_SELECT)" ]
	},
	"_feedbacks" : {
		"back":"返回",
		"Index,100,0" :  "打开" + namevoicestr[0] ,
		"Index,100,1" :  "打开" + namevoicestr[1] ,
		"Index,100,2" :  "打开" + namevoicestr[2] ,
		"Index,100,3" :  "打开" + namevoicestr[3] ,
		"Index,100,4" :  "打开" + namevoicestr[4] ,
		"Index,100,6":   "打开" + recordvoicearray[0],
		"Index,100,7":   "打开" + recordvoicearray[1],
		"Index,100,8":   "打开" + recordvoicearray[2],
		"Index,100,9" :  "进入4k专区" ,
		"Index,100,10" :  "进入热播" ,
		"Index,100,11" :  "打开" + namevoicestr[5] ,
		"Index,100,12" :  "打开" + namevoicestr[6] ,
		"Index,100,13" :  "打开" + namevoicestr[7] ,
		"Index,100,14" :  "进入我的" ,
		"Index,100,15" :  "进入频道" ,
		"Index,100,16" :  "进入电视剧" ,
		"Index,100,17" :  "进入电影" ,
		"Index,100,18" :  "进入动画" ,
		"Index,100,19" :  "进入综艺" ,
		"Index,100,20" :  "进入纪实" ,
		"Index,100,21" :  "进入服务" ,
		"Index,100,22" :  "进入党教" ,
		"Index,100,23" :  "进入新闻" ,
		"Index,100,24" :  "进入体育" ,
		"Index,100,25" :  "进入电竞" ,
		"Index,100,26" :  "进入时尚" ,
		"Index,100,27" :  "进入教育" ,
		"Index,100,28" :  "进入徽好看" ,
		"Index,100,29" :  "进入广场舞大赛" ,
		"Index,100,30" :  "进入最近收看",
		"_PLAY" : [ "$P(_PLAY)" ],
		"_PAGE" : [ "$P(_PAGE)" ],
		"_EPISODE" : [ "$P(_EPISODE)" ],
		"_SELECT" : [ "$P(_SELECT)" ]
	},
	"_fuzzy_words" : {
		"video" : [ "张亮牵手无心", "超级大赢家主持人参与爸爸去哪儿" ]
	}
};
//var f=true;
//if(f){
//	alert(JSON.stringify(scene));
//	f=false;
//}

/*var listener = new Xiri.Listener(callback);
listener.regist(scene)*/
}