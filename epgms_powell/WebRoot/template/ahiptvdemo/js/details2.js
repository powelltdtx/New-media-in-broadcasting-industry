var patentwindowflag = true;
var media = document.getElementsByClassName('media');
var edi = document.getElementsByClassName('edi');
var rol = document.getElementsByClassName('rol');
var readMore = document.getElementsByClassName('readMore');
var fun = document.getElementsByClassName('fun');
var recommod = document.getElementsByClassName('recommod');

var boxBorder = document.getElementById('border')

// 记录位置 0为未出现 1为弹出一层 2为弹出两层
var isColl = 0; // 是否收藏

var rolMoveParas = [ {
	up : 101,
	right : 1,
	down : 103,
	left : 100
}, {
	up : 101,
	right : 2,
	down : 103,
	left : 0
}, {
	up : 101,
	right : 3,
	down : 103,
	left : 1
}, {
	up : 101,
	right : 4,
	down : 103,
	left : 2
}, {
	up : 101,
	right : -1,
	down : 103,
	left : 3
} ];

var mediaMoveParas = [ {
	up : -1,
	right : 104,
	down : 105,
	left : -1
} ];

var readMoreMoveParas = [ {
	up : -1,
	right : -1,
	down : 104,
	left : 100
} ];

var ediMoveParas = [ {
	up : -1,
	right : -1,
	down : 102,
	left : 100
} ];

var funMoveParas = [ {
	up : -1,
	right : 1,
	down : 105,
	left : 100
}, {
	up : -1,
	right : 2,
	down : 105,
	left : 0
}, {
	up : -1,
	right : -1,
	down : 105,
	left : 1
} ];

var recommodMoveParas = [ {
	up : 104,
	right : 1,
	down : -1,
	left : -1
}, {
	up : 104,
	right : 2,
	down : -1,
	left : 0
}, {
	up : 104,
	right : 3,
	down : -1,
	left : 1
}, {
	up : 104,
	right : 4,
	down : -1,
	left : 2
}, {
	up : 104,
	right : 5,
	down : -1,
	left : 3
}, {
	up : 104,
	right : -1,
	down : -1,
	left : 4
} ];

var area = {
	100 : {
		ele : media,
		paras : mediaMoveParas,
		currentIndex : 0,
		selStyle : 'sel'
	},
	101 : {
		ele : edi,
		paras : ediMoveParas,
		currentIndex : 0,
		selStyle : 'bulueC'
	},
	102 : {
		ele : rol,
		paras : rolMoveParas,
		currentIndex : 0,
		selStyle : 'bulueC'
	},
	103 : {
		ele : readMore,
		paras : readMoreMoveParas,
		currentIndex : 0,
		selStyle : 'bulueC'
	},

	104 : {
		ele : fun,
		paras : funMoveParas,
		currentIndex : 0,
		selStyle : 'sel'
	},
	105 : {
		ele : recommod,
		paras : recommodMoveParas,
		currentIndex : 0,
		selStyle : 'sel'
	},
	'current' : 100
}

var current = {};
var pageControl = {};

function fnSetCurrent() {
	var ca = area[area.current];
	current.area = ca;
	current.index = ca.currentIndex;
	current.ele = ca.ele[current.index]
}

function fnGetNextEleIndex(dir) {
	return current.area.paras[current.index][dir];
}

pageControl.moveLeft = function() {
	var nextEle = fnGetNextEleIndex('left');
	if (nextEle == -1) {
		return false;
	}
	unshowRecordPop();
	if (area.current == 105) {
		recomblur();
	}
	if (nextEle >= 100) {
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele, current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele, current.area.selStyle);
	if (area.current == 105) {
		recomfocus();
	}
	showRecordPop();
}

pageControl.moveRight = function() {
	var nextEle = fnGetNextEleIndex('right');
	if (nextEle == -1) {
		return false;
	}
	unshowRecordPop();
	if (area.current == 105) {
		recomblur();
	}
	if (nextEle >= 100) {
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele, current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele, current.area.selStyle);
	if (area.current == 105) {
		recomfocus();
	}
	showRecordPop();

}

pageControl.moveUp = function() {
	var nextEle = fnGetNextEleIndex('up');
	if (nextEle == -1) {
		return false;
	}
	if (area.current == 103) {
		return;
	}
	unshowRecordPop();
	if (area.current == 105) {
		recomblur();
	}
	if (nextEle >= 100) {
		area.current = nextEle;
		nextEle = current.index;
	}

	fnRemoveEleClass(current.ele, current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele, current.area.selStyle);
	showRecordPop();
}

pageControl.moveDown = function() {
	var nextEle = fnGetNextEleIndex('down');
	if (nextEle == -1) {
		return false;
	}
	unshowRecordPop();
	if (nextEle >= 100) {
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele, current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele, current.area.selStyle);
	if (area.current == 105) {
		recomfocus();
	}
	showRecordPop();
}

var readMoreflag = false;
pageControl.keyBack = function() {
	if (area.current == 103 && readMoreflag) {
		$("morepop").style.display = "none";
		area.current = 103;
		area[103].currentIndex = 0;
		fnSetCurrent();
		fnAddEleClass(current.ele, current.area.selStyle);
		readMoreflag = false;
		return;
	}
	var searchflag = fnGetQueryStringByName("searchflag");
	if (searchflag == '1') {
		var url = getbackurl();
		setpageurl(url);
		if (url) {
			closemedia();
			window.location = url;
		}
		STBAppManager.startAppByIntent("{\"intentType\":0,\"appName\":\"com.amt.qrcode\", \"className\":\"com.amt.qrcode.ui.activity.SearchActivity\"}");
		return;
	}
	
	if (searchflag == '2') {

		var url ="http://117.71.25.104:81/bytuetechAPI/jsp/ahiptv/index.jsp";
		setpageurl(url);
		if (url) {
			closemedia();
			window.location = url;
		}
		return;
	}
	jumpurl = getbackurl();
	setRecord();
}

pageControl.ok = function() {
	// var url=current.ele.dataset['url'];
	if (area.current == 104) {
		if (area[104].currentIndex == 0) {
			fullplay();
			return;
		}
	}
	if (area.current == 100) {
		fullplay();
		return;
	}
	if (area.current == 105) {
		var code = tuijianlist[current.index].code;
		var category_id = tuijianlist[current.index].category_id;
		var seriesflag = tuijianlist[current.index].seriesflag;
		var url = baseurl;
		if(seriesflag == '0'){
			url = url + "movieDet2.html?category_id=" + category_id + "&code=" + code;
		}else{
			if(category_id.indexOf("1003") == 0){
				url = url + "movieDet3.html?category_id=" + category_id + "&code=" + code;
			}else{
				url = url + "movieDet.html?category_id=" + category_id + "&code=" + code;
			}
			
		}
		jumpurl = url;
		setRecord();
		return;
	}
	if (area.current == 104) {
		if (resjianquan != 2 && area[104].currentIndex == 1) {
			return;
		}
		if (resjianquan != 2 && area[104].currentIndex == 2) {
			setcollection(collectionflag);
			return;
		}
		if (resjianquan == 2 && area[104].currentIndex == 1) {
			setcollection(collectionflag);
			return;
		}
	}

	if (area.current == 103) {
		var description = strCotent.description;
		if (description.length > 85) {
			$("morepop").style.display = "block";
			$("moredeta").innerHTML = "简介：" + description;
			readMoreflag = true;
		}
		return;
	}
	if(area.current == 101){
		var cururl = '' + location;
		if(cururl.indexOf("&area=") > 0) {
			cururl = cururl.substring(0, cururl.indexOf("&area="));
		}
		cururl = cururl + "&area=" + area.current + "&index=" + current.index; 
		setpageurl(cururl);
		var name = edi[current.index].innerHTML;
		var url = baseurl + "person_movieList.html?name=" + name
		window.location=url;
	}
	if(area.current == 102){
		var cururl = '' + location;
		if(cururl.indexOf("&area=") > 0) {
			cururl = cururl.substring(0, cururl.indexOf("&area="));
		}
		cururl = cururl + "&area=" + area.current + "&index=" + current.index; 
		setpageurl(cururl);
		var name = rol[current.index].innerHTML;
		var url = baseurl + "person_movieList.html?name=" + name
		window.location=url;
	}
}

function setBorderIn(ele) {
	ele.style.transform = 'scale(1.05)';
	var w = (ele.getElementsByTagName('img')[0].offsetWidth) * 1.05;
	var h = (ele.getElementsByTagName('img')[0].offsetHeight) * 1.05;
	var difW = ((ele.getElementsByTagName('img')[0].offsetWidth) * 1.05 - ele
			.getElementsByTagName('img')[0].offsetWidth) / 2;
	var difH = ((ele.getElementsByTagName('img')[0].offsetHeight) * 1.05 - ele
			.getElementsByTagName('img')[0].offsetHeight) / 2;
	var l = ele.offsetLeft;
	var t = ele.offsetTop;
	boxBorder.style.height = (h - 4) + 'px';
	boxBorder.style.width = (w - 4) + 'px';
	boxBorder.style.left = (l - difW) + 'px';
	boxBorder.style.top = (t - difH - 4) + 'px';
	boxBorder.style.opacity = 1;
}

function setBorderOut(ele) {
	ele.style.transform = 'scale(1)';
	var w = (ele.getElementsByTagName('img')[0].offsetWidth);
	var h = (ele.getElementsByTagName('img')[0].offsetHeight);
	var difW = ((ele.getElementsByTagName('img')[0].offsetWidth) - ele
			.getElementsByTagName('img')[0].offsetWidth) / 2;
	var difH = ((ele.getElementsByTagName('img')[0].offsetHeight) - ele
			.getElementsByTagName('img')[0].offsetHeight) / 2;
	var l = ele.offsetLeft;
	var t = ele.offsetTop;
	boxBorder.style.height = h + 'px';
	boxBorder.style.width = w + 'px';
	boxBorder.style.left = (l - difW) + 'px';
	boxBorder.style.top = (t - difH) + 'px';
	boxBorder.style.opacity = 0;
}

function setBorderIn105(ele) {
	ele.style.transform = 'scale(1.05)';
	var w = (ele.offsetWidth) * 1.05;
	var h = (ele.offsetHeight) * 1.05;
	var difW = ((ele.offsetWidth) * 1.05 - ele.offsetWidth) / 2;
	var difH = ((ele.offsetHeight) * 1.05 - ele.offsetHeight) / 2;
	var l = ele.offsetLeft;
	var t = ele.offsetTop;
	boxBorder.style.height = (h - 4) + 'px';
	boxBorder.style.width = (w - 8) + 'px';
	boxBorder.style.left = (l - difW) + 'px';
	boxBorder.style.top = (t - difH) + 'px';
	boxBorder.style.opacity = 1;
}

function setBorderOut105(ele) {
	ele.style.transform = 'scale(1)';
	var w = (ele.offsetWidth);
	var h = (ele.offsetHeight);
	var difW = ((ele.offsetWidth) - ele.offsetWidth) / 2;
	var difH = ((ele.offsetHeight) - ele.offsetHeight) / 2;
	var l = ele.offsetLeft;
	var t = ele.offsetTop;
	boxBorder.style.height = (h - 4) + 'px';
	boxBorder.style.width = (w - 8) + 'px';
	boxBorder.style.left = (l - difW) + 'px';
	boxBorder.style.top = (t - difH) + 'px';
	boxBorder.style.opacity = 0;
}

var baseurl = '';
window.onload=function(){
	baseurl = '' + location;
	baseurl = baseurl.substring(0, baseurl.indexOf('movieDet2.html'));
	var category_id=fnGetQueryStringByName('category_id');
	var code = fnGetQueryStringByName('code');
	var jsurl = getJSPath(category_id, 3);
	jsurl = jsurl + 'D' + code + '.js';
	loadJS(jsurl);
	jsurl = getJSPath(category_id, 2);
	jsurl = jsurl + 'P' + category_id + '.js';
	loadJS(jsurl);

}

function setRecord(){
	recordflag = 1;
	var userId = getuserid();
	userId = 'ahgd04';
	var code = strCotent.code;
	var name = strCotent.name;
	//name = escape(name);
	var imgurl = strCotent.fileurl;
	var category_id = strCotent.category_id;
	var total_time = parseInt(document.getElementById("videoPlay").contentWindow.mp.getMediaDuration(), 10);
	var current_time = parseInt(document.getElementById("videoPlay").contentWindow.mp.getCurrentPlayTime(), 10);
	var url = baseurl + "datajsp/setRecord.jsp?total_time=" + total_time + "&current_time=" + current_time + "&callback=close";
	url = url + "&pcode=" + code + "&name=" + name
	+ "&imgurl=" + imgurl + "&category_id=" + category_id + "&userId=" + userId;
	recordFrame.location.href = url;
}


var strCotent;
function ContentDetailCallback(json){
	document.getElementById("videoPlay").contentWindow.ContentDetailCallback(json);
	strCotent = json;
	datainit();
	setcollection(2);
	
	var areaFrom = fnGetQueryStringByName('area');

	var indexFrom = fnGetQueryStringByName('index');
	if (areaFrom != '' && indexFrom != '' && area[areaFrom].ele[indexFrom]) {
		area.current = areaFrom;
		area[area.current].currentIndex = indexFrom;
	}
	fnSetCurrent();
	fnAddEleClass(current.ele, current.area.selStyle);
}
var tuijianlist;
function ContentListCallback(jsonarr){
	var length = jsonarr.length;
	tuijianlist = randomArray(6, jsonarr, fnGetQueryStringByName('code'));
	tuijiandatainit();
	initVoice();
}

var resjianquan;
function jqcallback(result){
	resjianquan = result;
	buttoninit();
	getRecord();
}

function getRecord(){
	var userId = getuserid();
	userId = 'ahgd04';
	var code = strCotent.code;
	var url = baseurl + "datajsp/getRecord.jsp?code=" + code + "&userId=" + userId;
	recordFrame.location.href = url;
}
var recordArrJson;
var recordflag = 0; // 0:获取观看记录 1:设置观看记录
document.getElementById("recordFrame").onload = function() {
	
	if(typeof(recordArrJson) != "undefined" && recordflag == 0){
		var starttime = '0';
		if(recordArrJson.length > 0){
			starttime = parseInt(recordArrJson[0].vod_current_time, 10);
			setRecordPopUp(starttime);
		}
		if(resjianquan == 2){
			var url = strCotent.playurl;
			document.getElementById("videoPlay").contentWindow.play(url, starttime,62, 52, 530, 313);
		}else{
			document.getElementById("videoPlay").contentWindow.play(url, '0',62, 52, 530, 313);
		}
		showRecordPop();
	}
}

var voicevRecommend = [];
function datainit() {
	var mediafileurl = strCotent.fileurl;
	$("title").innerHTML = strCotent.name.replace(/quot/g, '"');
	$("year").innerHTML = '年份：' + strCotent.releaseyear;
	var director = strCotent.director;
	if (director == '' || director == null || director == 'null') {
		director = '暂无';
	}
	var arrdirector = director.split(';');
	var strdirector = '导演：';
	for (var i = 0; i < arrdirector.length; i++) {
		strdirector = strdirector + '<span class="edi funs">' + arrdirector[i]
				+ '</span>';
	}
	$("editor").innerHTML = strdirector;
	var actordisplay = strCotent.actordisplay;
	if (actordisplay == '' || actordisplay == null || actordisplay == 'null') {
		actordisplay = "暂无";
	}
	var arrkpeople = actordisplay.split(';');
	var pepole = '主演：';
	for (var i = 0; i < arrkpeople.length; i++) {
		pepole = pepole + '<span class="rol funs">' + arrkpeople[i] + "</span>";
	}
	$("role").innerHTML = pepole;
	var description = strCotent.description.replace(/quot/g, '"');
	if (description.length > 85) {
		description = description.substring(0, 85) + "......";
		$("description").innerHTML = description;
		document.getElementsByClassName("readMore")[0].style.display = 'inline-block';
	} else {
		$("description").innerHTML = description;
		document.getElementsByClassName("readMore")[0].style.display = 'none';
	}
	
	if(strCotent.charging > 0){
		var temptoken = getCookieByunescape('temptoken');
		var url = baseurl + "datajsp/getjq.jsp?category_id=" + fnGetQueryStringByName('category_id')
		+ "&temptoken=" + temptoken + "&primaryid=" + strCotent.primaryid;
		JQFrame.location.href = url;
	}else{
		resjianquan = '2';
		buttoninit();
		getRecord();
	}
	
	// $("description").innerHTML = strCotent.description.substring(0,22);
}
function tuijiandatainit(){
	var innertuijian = '';
	var tjfileurl = "";
	for (var i = 0; i < tuijianlist.length; i++) {
		voicevRecommend[i] = tuijianlist[i].name;
		tjfileurl = tuijianlist[i].fileurl;
		// tjfileurl = tjfileurl.replace("117.71.25.104:85",
		// "10.178.40.109:85");
		innertuijian = innertuijian + '<li class="recommod img"><img src="'
				+ tjfileurl
				+ '" width="166" height="222"><p>'
				+ tuijianlist[i].name + '</p></li>';
	}
	$('recommod').getElementsByTagName("ul")[0].innerHTML = innertuijian;
}
var flag = false;
var collectionflag = 0;
function setcollection(type) {
	flag = true;
	var userid = getuserid();
	userid = 'ahgd04';
	var code = strCotent.code;
	var name = strCotent.name;
	name = escape(name);
	var imgurl = strCotent.fileurl;
	var url = "datajsp/setcollection.jsp?code=" + code;
	url = url + "&userid=" + userid;
	url = url + "&name=" + name;
	url = url + "&imgurl=" + imgurl;
	url = url + "&flag=" + type;
	collectionFrame.location.href = url;

}
document.getElementById("collectionFrame").onload = function() {
	if (flag) {
		if (collectionflag == 1) {
			$('collbt').src = "img/detail/colled_btn.png";
		} else {
			$('collbt').src = "img/detail/coll_btn.png";
		}
	}
}

function recomfocus() {
	// var name = tuijianlist[current.index].name;
	var name = current.ele.getElementsByTagName("p")[0].innerHTML;
	var len = getStrLength(name);
	if (len > 18) {
		// behavior="alternate" direction="left"
		var marq = '<marquee scrollamount="4">' + name + '</marquee>';
		current.ele.getElementsByTagName("p")[0].innerHTML = marq;
	}
}

function recomblur() {
	// var len = getStrLength(name);
	if (current.ele.getElementsByTagName("marquee")[0]) {
		var name = current.ele.getElementsByTagName("marquee")[0].innerHTML;
		current.ele.getElementsByTagName("p")[0].innerHTML = name;
	}
}

function setRecordPopUp(starttime) {
	var hour = 0;
	var minu = 0;
	var sec = 0;
	hour = parseInt(starttime / 3600, 10);
	minu = parseInt(starttime / 60, 10) - hour * 60;
	sec = starttime - (minu * 60) - (hour * 3600);
	if (hour > 0) {
		$("showRecorddiv").innerHTML = "<span>您上次观看到" + hour + "时" + minu + "分"
				+ sec + "秒</span>";
		return;
	}
	if (minu > 0) {
		$("showRecorddiv").innerHTML = "<span>您上次观看到" + minu + "分" + sec
				+ "秒</span>";
		return;
	}
	$("showRecorddiv").innerHTML = "<span>您上次观看到" + sec + "秒</span>";
	return;

}

function showRecordPop() {
	if (area.current == 104) {
		if (area[104].currentIndex == 0 && resjianquan == '2') {
			if (recordArrJson.length > 0) {
				$("showRecorddiv").style.display = "block";
			}
		}
	}
}
function unshowRecordPop() {
	if (area.current == 104) {
		if (area[104].currentIndex == 0 && resjianquan == '2') {
			if (recordArrJson.length > 0) {
				$("showRecorddiv").style.display = "none";
			}
		}
	}
}
var hiddenProperty = 'hidden' in document ? 'hidden'
		: 'webkitHidden' in document ? 'webkitHidden'
				: 'mozHidden' in document ? 'mozHidden' : null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i,
		'visibilitychange');
var onVisibilityChange = function() {
	if (!document[hiddenProperty]) {
		if (url) {
			closemedia();
			window.location = url;
		}
	} else {
	}
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);
var callback = function(intent) {
	var command = intent._command;
	var commandarray = command.split(",");
	if(commandarray[0]=='ShowAllText'){
		document.getElementById("moredeta").innerHTML=strCotent.description;
		$("morepop").style.display = "block";
		area.current = 103;
		area[103].currentIndex = 0;
		fnSetCurrent();
		fnAddEleClass(current.ele,current.area.selStyle);	
		return;
	}
	if(commandarray[0]=='CancelAllText'){
		$("morepop").style.display = "none";
		area.current = 103;
		area[103].currentIndex = 0;
		fnSetCurrent();
		fnAddEleClass(current.ele,current.area.selStyle);	
		return;
	}
	if(commandarray[0]=="collections1" ||commandarray[0]=="collections"){
		if(collectionflag=="1" && commandarray[0]=="collections"){
			return;
		}
		if(commandarray[0]=="collections1" && collectionflag!="1" ){
			return;
		}
	}
	
	fnRemoveEleClass(current.ele, current.area.selStyle);
	area.current = parseInt(commandarray[1]);
	area[area.current].currentIndex = parseInt(commandarray[commandarray.length-1]);
	fnSetCurrent();
	fnAddEleClass(current.ele, current.area.selStyle);
	pageControl.ok();

}
function initVoice() {
	var scene = {
		"_scene" : "com.iflytek.xiri.MyScene",
		"_fuzzy_words" : {
			"video" : [ "张亮牵手无心", "超级大赢家主持人参与爸爸去哪儿" ]
		}
	};
	var commands = {
		"key1" : [ "打开", "开始" ],
		"key2" : [ "$W(video)" ],
		"Index" : [ "首页", "主页", "第一页" ],
		"back" : [ "返回" ],
		"_PLAY" : [ "$P(_PLAY)" ],
		"_PAGE" : [ "$P(_PAGE)" ],
		"_EPISODE" : [ "$P(_EPISODE)" ],
		"_SELECT" : [ "$P(_SELECT)" ]
	}
	var voiceArray = [];
	var feedbacks={};
	for (var i = 0; i < voicevRecommend.length; i++) {
		voiceArray[0] = voicevRecommend[i];
		commands["movie,105," + i] = voiceArray;
		feedbacks["movie,105," +i]="进入"+voicevRecommend[i];
		voiceArray = [];
	}
	if (resjianquan == '2') {
		voiceArray[0] = "播放";
		commands["movie,104,"+0] = voiceArray;
		feedbacks["movie,104,"+0]="跳转播放"
		voiceArray = [];
		voiceArray[0] = "收藏";
		commands["collections,104,"+1] = voiceArray;
//		collectionflag 1:已收藏 
		feedbacks["collections,104,"+1]="正在为您收藏中"
		voiceArray = [];
		voiceArray[0] = "取消收藏";
		commands["collections1,104,"+1] = voiceArray;
		feedbacks["collections1,104,"+1]="正在为您取消收藏"
		voiceArray = [];
	} else {
		voiceArray[0] = "订购";
		commands["movie,104,"+1] = voiceArray;
		feedbacks["movie,104,"+1]="跳转订购"
		voiceArray = [];
		voiceArray[0] = "试看";
		commands["movie,104,"+0] = voiceArray;
		feedbacks["movie,104,"+0]="试看播放"
		voiceArray = [];
		voiceArray[0] = "收藏";
		commands["collections,104,"+2] = voiceArray;
		feedbacks["collections,104,"+2]="正在为您收藏中"
		voiceArray = [];
		voiceArray[0] = "取消收藏";
		commands["collections1,104,"+2] = voiceArray;
		feedbacks["collections1,104,"+2]="正在为您取消收藏"
		voiceArray = [];
	}

	voiceArray[0] = '显示全文';
	voiceArray[1] = '打开全文';
	commands["ShowAllText,103,0"] = voiceArray;
	voiceArray = [];
	feedbacks["ShowAllText,103,0"] = "显示全文";
	voiceArray[0] = '关闭全文';
	voiceArray[1] = '退出全文';
	commands["CancelAllText,103,0"] = voiceArray;
	voiceArray = [];
	feedbacks["CancelAllText,103,0"] = "关闭全文"

	scene["_commands"] = commands;
	scene["_feedbacks"] = feedbacks;
	var listener = new Xiri.Listener(callback);
	listener.regist(scene)
}

function buttoninit(){
	if (resjianquan == '2') {
		fun = document.getElementsByClassName('has');
		if (strCotent.description.length > 85) {
			funMoveParas = [ {
				up : 103,
				right : 1,
				down : 105,
				left : 100
			}, {
				up : 103,
				right : -1,
				down : 105,
				left : 0
			} ];
		} else {
			funMoveParas = [ {
				up : -1,
				right : 1,
				down : 105,
				left : 100
			}, {
				up : -1,
				right : -1,
				down : 105,
				left : 0
			} ];
		}
		$("playimg").src = "img/detail/play_btn.png";
		$("buybt").style.display = 'none';
		$("playbt").style.display = 'inline-block';
		$("collbutton").style.display = 'inline-block';
	} else {
		if (strCotent.description.length > 85) {
			funMoveParas = [ {
				up : 103,
				right : 1,
				down : 105,
				left : 100
			}, {
				up : 103,
				right : 2,
				down : 105,
				left : 0
			}, {
				up : 103,
				right : -1,
				down : 105,
				left : 1
			} ];
		} else {
			funMoveParas = [ {
				up : -1,
				right : 1,
				down : 105,
				left : 100
			}, {
				up : -1,
				right : 2,
				down : 105,
				left : 0
			}, {
				up : -1,
				right : -1,
				down : 105,
				left : 1
			} ];
		}
		$("playimg").src = "img/detail/try_btn.png";
		$("buybt").style.display = 'inline-block';
		$("playbt").style.display = 'inline-block';
		$("collbutton").style.display = 'inline-block';
	}
	area[104].ele = fun;
	area[104].paras = funMoveParas;
}
var jumpurl;
function close(){
	document.getElementById("videoPlay").contentWindow.closemedia();
	if (typeof(jumpurl) != "undefined") {
		window.location = jumpurl;
	}
}

function fullplay(){
	document.getElementById("videoPlay").focus();
	document.getElementById("videoPlay").width = "1280px";
	document.getElementById("videoPlay").height = "720px";
	document.getElementById("videoPlay").style.left = "0px";
	document.getElementById("videoPlay").style.top = "0px";
	document.getElementById("container").style.display = 'none';
	//document.body.style.background="";
	document.getElementById("videoPlay").contentWindow.mp.setVideoDisplayArea(0, 0, 1280, 720);
	document.getElementById("videoPlay").contentWindow.mp.refreshVideoDisplay();
}

function smallplay(){
	//document.body.style.background="url(img/movie_backgroud.png) no-repeat";
	document.getElementById("videoPlay").blur();
	document.getElementById("container").style.display = 'block';
	document.getElementById("videoPlay").width = "530px";
	document.getElementById("videoPlay").height = "313px";
	document.getElementById("videoPlay").style.left = "58px";
	document.getElementById("videoPlay").style.top = "48px";
	document.getElementById("videoPlay").contentWindow.mp.setVideoDisplayArea(58, 48, 530, 313);
	document.getElementById("videoPlay").contentWindow.mp.refreshVideoDisplay();
	document.documentElement.focus();
}