var patentwindowflag = true;
var media = document.getElementsByClassName('media');
var edi = document.getElementsByClassName('edi');
var rol = document.getElementsByClassName('rol');
var readMore = document.getElementsByClassName('readMore');
var classic = document.getElementsByClassName('classic');
var collection = document.getElementsByClassName('collection');
var fun = document.getElementsByClassName('fun');
var recommod = document.getElementsByClassName('recommod');


var boxBorder = document.getElementById('border')


//记录位置 0为未出现 1为弹出一层 2为弹出两层
var isColl = 0; //是否收藏


var rolMoveParas = [
];

var mediaMoveParas = [
	{up:-1,right:105,down:107,left:-1}
];

var readMoreMoveParas = [
	{up:-1,right:-1,down:104,left:100}
];

var ediMoveParas = [
	
];

var classicMoveParas = [
];

var collectionMoveParas = [

];

var funMoveParas = [
	{up:105,right:1,down:107,left:-1},
	{up:105,right:2,down:107,left:0},
	{up:105,right:-1,down:107,left:1}
];

var recommodMoveParas = [
];

var area = {
	100:{
		ele:media,
		paras:mediaMoveParas,
		currentIndex:0,
		selStyle:'sel'
	},
	101:{
		ele:edi,
		paras:ediMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
	},
	102:{
		ele:rol,
		paras:rolMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
	},
	103:{
		ele:readMore,
		paras:readMoreMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
	},
	104:{
		ele:classic,
		paras:classicMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
	},
	105:{
		ele:collection,
		paras:collectionMoveParas,
		currentIndex:0,
		selStyle:'collectionSel'
	},
	106:{
		ele:fun,
		paras:funMoveParas,
		currentIndex:0,
		selStyle:'sel'
	},
	107:{
		ele:recommod,
		paras:recommodMoveParas,
		currentIndex:0,
		selStyle:'sel'
	},
	'current':100
}

var current = {};
var pageControl = {};

function fnSetCurrent(){
	var ca = area[area.current];
	current.area = ca;
	current.index = ca.currentIndex;
	current.ele = ca.ele[current.index]
}

function fnGetNextEleIndex(dir){
	return current.area.paras[current.index][dir];
}

pageControl.moveLeft = function(){
	var nextEle = fnGetNextEleIndex('left');
	if(nextEle == -1){
		return false;
	}
	unshowRecordPop();
	if(area.current == 107){
		recomblur();
	}
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 104){
		seriesload();
		setmove();
		return;
	}
	if(area.current == 107){
		recomfocus();
	}
	showRecordPop();
}

pageControl.moveRight = function(){
	var nextEle = fnGetNextEleIndex('right');
	if(nextEle == -1){
		return false;
	}
	unshowRecordPop();
	if(area.current == 107){
		recomblur();
	}	

	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 104){
		seriesload();
		setmove();
		return;
	}

	if(area.current == 107){
		recomfocus();
	}
	showRecordPop();
	
}

pageControl.moveUp = function(){
	var nextEle = fnGetNextEleIndex('up');
	if(nextEle == -1){
		return false;
	}
	unshowRecordPop();
	if(area.current == 107){
		recomblur();
	}	
	if(area.current == 103){
		return;
	}	
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 104){
		seriesload();
		return;
	}
	showRecordPop();
	
} 

pageControl.moveDown = function(){
	var nextEle = fnGetNextEleIndex('down');
	if(nextEle == -1){
		return false;
	}
	unshowRecordPop();
	if(nextEle >= 100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 104){
		seriesload();
		return;
	}

	if(area.current == 107){
		recomfocus();
	}
	showRecordPop();
	
}
var readMoreflag = false;
pageControl.keyBack = function(){
	alert(22);
	if(area.current == 103 && readMoreflag){
		$("morepop").style.display = "none";
		area.current = 103;
		area[103].currentIndex = 0;
		fnSetCurrent();
		fnAddEleClass(current.ele,current.area.selStyle);	
		readMoreflag = false;
		return;
	}	
	var searchflag = fnGetQueryStringByName("searchflag");
	if(searchflag == '1'){
		var url = getbackurl();
		setpageurl(url);
		if(url){
			closemedia();
			window.location=url;
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

pageControl.ok=function(){
	if(area.current == 106){
		if(area[106].currentIndex == 0){
			fullplay();
			return;
		}
		if(area[106].currentIndex == 1 && resjianquan == 2){
			setcollection(collectionflag);
			return;
		}
		if(area[106].currentIndex == 2 && resjianquan != 2){
			setcollection(collectionflag);
			return;
		}		
		if(resjianquan != 2  && area[106].currentIndex == 1){
			return;
		}		
	}
	if(area.current == 100){
		fullplay();
		return;
	}
	if(area.current == 105){
		var seriesindex = (area[104].currentIndex * 20) + area[105].currentIndex;
		if(seriesindex == curseriesindex){
			fullplay();
		}else{
			var url = strCotent.serieslist[currentIndex].playurl;
			curseriesindex = seriesindex;
			document.getElementById("videoPlay").contentWindow.closemedia();
			document.getElementById("videoPlay").contentWindow.seriesindex = curseriesindex;
			document.getElementById("videoPlay").contentWindow.play(url, starttime,0, 0, 1280, 720);
			fullplay();
		}
		return;
	}
	
	if(area.current == 107){
		
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
	if(area.current == 103){
		var description = strCotent.description;
		if(description.length > 22){
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

function setBorderIn(ele){
	ele.style.transform = 'scale(1.05)';
	var w = (ele.getElementsByTagName('img')[0].offsetWidth)*1.05;
	var h = (ele.getElementsByTagName('img')[0].offsetHeight)*1.05;
	var difW = ((ele.getElementsByTagName('img')[0].offsetWidth)*1.05 - ele.getElementsByTagName('img')[0].offsetWidth)/2;
	var difH = ((ele.getElementsByTagName('img')[0].offsetHeight)*1.05 - ele.getElementsByTagName('img')[0].offsetHeight)/2;
	var l = ele.offsetLeft;
	var t = ele.offsetTop;
	boxBorder.style.height = (h-4)+'px';
	boxBorder.style.width = (w-4)+'px';
	boxBorder.style.left = (l-difW)+'px';
	boxBorder.style.top = (t-difH-4)+'px';
	boxBorder.style.opacity = 1;
	}

	
function setBorderOut(ele){
	ele.style.transform = 'scale(1)';
	var w = (ele.getElementsByTagName('img')[0].offsetWidth);
	var h = (ele.getElementsByTagName('img')[0].offsetHeight);
	var difW = ((ele.getElementsByTagName('img')[0].offsetWidth) - ele.getElementsByTagName('img')[0].offsetWidth)/2;
	var difH = ((ele.getElementsByTagName('img')[0].offsetHeight) - ele.getElementsByTagName('img')[0].offsetHeight)/2;
	var l = ele.offsetLeft;
	var t = ele.offsetTop;
	boxBorder.style.height = h+'px';
	boxBorder.style.width = w+'px';
	boxBorder.style.left = (l-difW)+'px';
	boxBorder.style.top = (t-difH)+'px';
	boxBorder.style.opacity = 0;
}

function setBorderIn105(ele){
	ele.style.transform = 'scale(1.05)';
	var w = (ele.offsetWidth)*1.05;
	var h = (ele.offsetHeight)*1.05;
	var difW = ((ele.offsetWidth)*1.05 - ele.offsetWidth)/2;
	var difH = ((ele.offsetHeight)*1.05 - ele.offsetHeight)/2;
	var l = ele.offsetLeft;
	var t = ele.offsetTop;
	boxBorder.style.height = (h-4)+'px';
	boxBorder.style.width = (w-8)+'px';
	boxBorder.style.left = (l-difW)+'px';
	boxBorder.style.top = (t-difH)+'px';
	boxBorder.style.opacity = 1;
}

function setBorderOut105(ele){
	ele.style.transform = 'scale(1)';
	var w = (ele.offsetWidth);
	var h = (ele.offsetHeight);
	var difW = ((ele.offsetWidth) - ele.offsetWidth)/2;
	var difH = ((ele.offsetHeight) - ele.offsetHeight)/2;
	var l = ele.offsetLeft;
	var t = ele.offsetTop;
	boxBorder.style.height = (h-4)+'px';
	boxBorder.style.width = (w-8)+'px';
	boxBorder.style.left = (l-difW)+'px';
	boxBorder.style.top = (t-difH)+'px';
	boxBorder.style.opacity = 0;
}	
var curseriesindex = 0;
var baseurl = '';
window.onload=function(){
	baseurl = '' + location;
	baseurl = baseurl.substring(0, baseurl.indexOf('movieDet.html'));
	var category_id=fnGetQueryStringByName('category_id');
	var code = fnGetQueryStringByName('code');
	var jsurl = getJSPath(category_id, 3);
	jsurl = jsurl + 'D' + code + '.js';
	loadJS(jsurl);
	jsurl = getJSPath(category_id, 2);
	jsurl = jsurl + 'P' + category_id + '.js';
	loadJS(jsurl);
	
//}
}
function getRecord(){
	var userId = getuserid();
	userId = 'ahgd04';
	var code = strCotent.code;
	var url = "datajsp/getRecord.jsp?code=" + code + "&userId=" + userId;
	recordFrame.location.href = url;
}
var recordArrJson;
var recordflag = 0; // 0:获取观看记录 1:设置观看记录
document.getElementById("recordFrame").onload = function() {
	if(typeof(recordArrJson) != "undefined" && recordflag == 0){
		var starttime = '0';
		if(recordArrJson.length > 0){
			var serisnum = parseInt(recordArrJson[0].vod_current_episode, 10);
			setRecordPopUp(serisnum);
			var index = serisnum - 1;
			curseriesindex = index;
			code = strCotent.serieslist[index].code;
			var tabnum = parseInt(index / 20, 10);
			index = index - (tabnum * 20);
			area[104].currentIndex = tabnum;
			seriesload();
			area[105].currentIndex = index;
			area.current = 105;
			starttime = parseInt(recordArrJson[0].vod_current_time, 10);
		}
		document.getElementById("videoPlay").contentWindow.seriesindex = curseriesindex;
		var url = strCotent.serieslist[curseriesindex].playurl;
		if(resjianquan == 2){
			document.getElementById("videoPlay").contentWindow.play(url, starttime,58, 48, 530, 313);
		}else{
			document.getElementById("videoPlay").contentWindow.play(url, '0',58, 48, 530, 313);
		}
		showRecordPop();
	}
}
var resjianquan;
function jqcallback(result){
	resjianquan = result;
	buttoninit();
	getRecord();
}
var strCotent;
function ContentDetailCallback(json){
	document.getElementById("videoPlay").contentWindow.ContentDetailCallback(json);
	strCotent = json;
	datainit();
	setcollection(2);
	
	var areaFrom=fnGetQueryStringByName('area');
	var indexFrom=fnGetQueryStringByName('index');
	if(areaFrom!=''&&indexFrom!=''&&area[areaFrom].ele[indexFrom]){
		area.current=areaFrom;
		area[area.current].currentIndex=indexFrom;
	}
	//找到获取焦点元素
	fnSetCurrent();
	//添加样式
	fnAddEleClass(current.ele,current.area.selStyle);
}
var tuijianlist;
function ContentListCallback(jsonarr){
	var length = jsonarr.length;
	tuijianlist = randomArray(6, jsonarr, fnGetQueryStringByName('code'));
	tuijiandatainit();
}
function playEnd(){
	//判断是否播放到最后一集
	if((curseriesindex + 1) < strCotent.serieslist.length){
		curseriesindex = curseriesindex + 1;
		playurl = strCotent.serieslist[curseriesindex].playurl;
		playVideo(playurl, 0, 58, 48, 530, 313);
	}
}

var collectionflag;
function setcollection(type){
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
document.getElementById("collectionFrame").onload = function () {
	if(typeof(collectionflag) != "undefined"){
		if(collectionflag == 1){
			//colled_btn.png
			$('collbt').src = "img/detail/colled_btn.png";
		}else{
			$('collbt').src = "img/detail/coll_btn.png";
		}
	}
}
//tuijianlist
function recomfocus(){
	//var name = tuijianlist[current.index].name;
	var name = current.ele.getElementsByTagName("p")[0].innerHTML;
	var len = getStrLength(name);
	if(len > 18){
		//  behavior="alternate" direction="left"
		var marq = '<marquee scrollamount="4">' +  name + '</marquee>';
		current.ele.getElementsByTagName("p")[0].innerHTML = marq;
	}
}

function recomblur(){
	//var len = getStrLength(name);
	if(current.ele.getElementsByTagName("marquee")[0]){
		var name = current.ele.getElementsByTagName("marquee")[0].innerHTML;
		current.ele.getElementsByTagName("p")[0].innerHTML = name;
	}
}

function setRecordPopUp(serisindex){
	if(serisindex > 0){
		$("showRecorddiv").innerHTML = "<span>您上次观看到第" + serisindex + "集</span>";
		return;
	}
	
}

function showRecordPop(){
	if(area.current == 106){
		if(area[106].currentIndex == 0 && resjianquan == '2'){
			if(recordArrJson.length > 0){
				$("showRecorddiv").style.display = "block";
			}
		}
	}
}
function unshowRecordPop(){
	if(area.current == 106){
		if(area[106].currentIndex == 0 && resjianquan == '2'){
			if(recordArrJson.length > 0){
				$("showRecorddiv").style.display = "none";
			}
		}
	}
}

function setmove(){
	var totalwidth = 595;
	var pindex = current.index;
	var count = classic.length;
	var width = classic[pindex].offsetWidth;
	var left = classic[pindex].offsetLeft;
	var fastleft = classic[0].offsetLeft;
	if((pindex + 1) < count){
		if((left + width) >= (totalwidth - width)){
			classic[0].style.marginLeft = (fastleft - width) + 'px';
			return;
		}
	}
	if(pindex == 1){
		classic[0].style.marginLeft = "0px";
		return;
	}
	if((pindex - 1) > 0){
		if((left - width) <= 0){
			classic[0].style.marginLeft = (fastleft + width) + "px";
			return;
		}
	}
	//595
	
}

var hiddenProperty = 'hidden' in document ? 'hidden' :
	'webkitHidden' in document ? 'webkitHidden' :
	   'mozHidden' in document ? 'mozHidden' :
	     null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function(){
	if (!document[hiddenProperty]) {
		var url = getbackurl();
		if(url){
		  closemedia();
		  window.location=url;
		}
	}
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);

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
	document.getElementById("videoPlay").blur();
	//document.body.style.background="url(img/movie_backgroud.png) no-repeat";
	document.getElementById("container").style.display = 'block';
	document.getElementById("videoPlay").width = "530px";
	document.getElementById("videoPlay").height = "313px";
	document.getElementById("videoPlay").style.left = "58px";
	document.getElementById("videoPlay").style.top = "48px";
	document.getElementById("videoPlay").contentWindow.mp.setVideoDisplayArea(58, 48, 530, 313);
	document.getElementById("videoPlay").contentWindow.mp.refreshVideoDisplay();
	document.documentElement.focus();
}
var jumpurl;
function close(){
	document.getElementById("videoPlay").contentWindow.closemedia();
	if (typeof(jumpurl) != "undefined") {
		window.location=jumpurl;
	}
}

function setRecord(){
	recordflag = 1;
	var userId = getuserid();
	userId = 'ahgd04';
	var code = strCotent.code;
	var name = strCotent.name;
	name = escape(name);
	var imgurl = strCotent.fileurl;
	var category_id = strCotent.category_id;
	var total_time = parseInt(document.getElementById("videoPlay").contentWindow.mp.getMediaDuration(), 10);
	var current_time = parseInt(document.getElementById("videoPlay").contentWindow.mp.getCurrentPlayTime(), 10);
	//var total_time = 100000;
	//var current_time = 200;
	var url = baseurl + "datajsp/setRecord.jsp?total_time=" + total_time + "&current_time=" + current_time + "&callback=close";
	if(strCotent.seriesflag == '0'){
		url = url + "&pcode=" + code + "&name=" + name
		+ "&imgurl=" + imgurl + "&category_id=" + category_id + "&userId=" + userId;
	}else{
		var childcode = strCotent.serieslist[curseriesindex].code;
		var vod_episode = strCotent.volumncount;
		var vod_current_episode = curseriesindex + 1;
		url = url + "&pcode=" + code + "&childcode=" + childcode + "&name=" + name + "&vod_episode="
		+ vod_episode + "&vod_current_episode=" + vod_current_episode
		+ "&imgurl=" + imgurl + "&category_id=" + category_id + "&userId=" + userId;
	}
	recordFrame.location.href = url;
}

function buttoninit(){
	if(resjianquan == '2'){
		$("playimg").src = "img/detail/play_btn.png";
		$("buybt").style.display = "none";
		$("playbt").style.display = 'inline-block';
		$("collbutton").style.display = 'inline-block';	

	}else{
		$("playimg").src = "img/detail/try_btn.png";
		$("buybt").style.display = 'inline-block';
		$("playbt").style.display = 'inline-block';
		$("collbutton").style.display = 'inline-block';
	}
	setfunMoveParas();
}