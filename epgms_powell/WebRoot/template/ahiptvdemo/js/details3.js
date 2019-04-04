var patentwindowflag = true;
var media = document.getElementsByClassName('media');
var edi = document.getElementsByClassName('edi');
var rol = document.getElementsByClassName('rol');
var readMore = document.getElementsByClassName('readMore')
var variety = document.getElementsByClassName('Variety');
var fun = document.getElementsByClassName('fun');
var recommod = document.getElementsByClassName('recommod');
var collPop = document.getElementsByClassName('collPop');
var varietyPop = document.getElementsByClassName('VarietyPop');

var boxBorder = document.getElementById('border')


//记录位置 0为未出现 1为弹出一层 2为弹出两层
var isColl = 0; //是否收藏


var rolMoveParas = [
];

var mediaMoveParas = [
	{up:-1,right:104,down:106,left:-1}
];

var readMoreMoveParas = [
	{up:102,right:-1,down:104,left:100}
];

var ediMoveParas = [
	
];

/*var classicMoveParas = [
];*/

var varietyMoveParas = [

];

var funMoveParas = [
	{up:105,right:1,down:107,left:-1},
	{up:105,right:2,down:107,left:0},
	{up:105,right:-1,down:107,left:1}
];

var recommodMoveParas = [
];

var collPopMoveParas = [
];

var varietyPopMoveParas = [
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
	/*104:{
		ele:classic,
		paras:classicMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
	},*/
	104:{
		ele:variety,
		paras:varietyMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
	},
	105:{
		ele:fun,
		paras:funMoveParas,
		currentIndex:0,
		selStyle:'sel'
	},
	106:{
		ele:recommod,
		paras:recommodMoveParas,
		currentIndex:0,
		selStyle:'sel'
	},
	107:{
		ele:collPop,
		paras:collPopMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
	},
	108:{
		ele:varietyPop,
		paras:varietyPopMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
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
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 107){
		seriesload();
		setmove();
		return;
	}
	showRecordPop();
}

pageControl.moveRight = function(){
	var nextEle = fnGetNextEleIndex('right');
	if(nextEle == -1){
		return false;
	}
	unshowRecordPop();
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 107){
		seriesload();	
		setmove();
	}
	showRecordPop();
}

pageControl.moveUp = function(){
	var nextEle = fnGetNextEleIndex('up');
	if(nextEle == -1){
		return false;
	}
	unshowRecordPop();
/*	if(area.current == 103){
		return;
	}*/
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);	
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
	showRecordPop();
}
var readMoreflag = false;
pageControl.keyBack = function(){
	if(area.current > 106){
		fnRemoveEleClass(current.ele,current.area.selStyle);
		$("copo").style.display = 'none';
		
		area[107].currentIndex = 0;
		area[108].currentIndex = 0;
		area.current = 104;
		area[104].currentIndex = 5;
		fnSetCurrent();
		fnAddEleClass(current.ele,current.area.selStyle);	
		return;
	}
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
	if(area.current == 105){
		if(area[105].currentIndex == 0){
			fullplay();
			return;
		}
		if(area[105].currentIndex == 1 && resjianquan == 2){
			setcollection(collectionflag);
			return;
		}
		if(area[105].currentIndex == 2 && resjianquan != 2){
			setcollection(collectionflag);
			return;
		}		
		if(resjianquan != 2  && area[105].currentIndex == 1){
			return;
		}		
	}
	if(area.current == 100){
		fullplay();
		return;
	}
	if(area.current == 104 && current.index != 5){
		var seriesindex = strCotent.serieslist.length - area[104].currentIndex - 1;
		if(curseriesindex == seriesindex){
			fullplay();
		}else{
			curseriesindex = seriesindex;
			document.getElementById("videoPlay").contentWindow.seriesindex = curseriesindex;
			document.getElementById("videoPlay").contentWindow.closemedia();
			var playurl = strCotent.serieslist[seriesindex].playurl;
			document.getElementById("videoPlay").contentWindow.play(url, starttime,0, 0, 1280, 720);
			fullplay();
		}
		
		return;
	}
	
	if(area.current == 106){
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
	
	if(area.current == 104){
		if(current.index == 5){
			$("copo").style.display = 'block';
			tabload();
			seriesload();
			area.current = 107;
			current.area.currentIndex = 0;
			fnSetCurrent();
			fnAddEleClass(current.ele,current.area.selStyle);
			return;
		}
	}
	
	if(area.current == 108){
		var seriesindex = strCotent.serieslist.length - (area[107].currentIndex * 10) - area[108].currentIndex - 1;
		if(curseriesindex == seriesindex){
			fullplay();
		}else{
			curseriesindex = seriesindex;
			document.getElementById("videoPlay").contentWindow.seriesindex = curseriesindex;
			document.getElementById("videoPlay").contentWindow.closemedia();
			var playurl = strCotent.serieslist[seriesindex].playurl;
			document.getElementById("videoPlay").contentWindow.play(url, starttime,0, 0, 1280, 720);
			fullplay();
		}
		return;		
	}
	
	if(area.current == 103){
		var description = strCotent.description;
		if(description.length > 22){
			$("morepop").style.display = "block";
			$("moredeta").innerHTML = "简介：" + description;
			readMoreflag = true;
		}
		
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
	baseurl = baseurl.substring(0, baseurl.indexOf('movieDet3.html'));
	
	var category_id=fnGetQueryStringByName('category_id');
	var code = fnGetQueryStringByName('code');
	var jsurl = getJSPath(category_id, 3);
	jsurl = jsurl + 'D' + code + '.js';
	loadJS(jsurl);
	jsurl = getJSPath(category_id, 2);
	jsurl = jsurl + 'P' + category_id + '.js';
	loadJS(jsurl);

}

var strCotent;
function ContentDetailCallback(json){
	document.getElementById("videoPlay").contentWindow.ContentDetailCallback(json);
	strCotent = json;
	datainit();
	
	var areaFrom=fnGetQueryStringByName('area');
	
	var indexFrom=fnGetQueryStringByName('index');
	
	var tabindexFrom=fnGetQueryStringByName('tabindex');	
	if(parseInt(areaFrom, 10) == 108){
		$("copo").style.display = 'block';
		tabload();
		if(tabindexFrom != ""){
			area[107].currentIndex = parseInt(tabindexFrom, 10);
		}
		seriesload();
	}	
	
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

function buttoninit(){
	if(resjianquan == '2'){
		$("buybt").style.display = "none";
		$("playimg").src = "img/detail/play_btn.png";
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
			var serisnum = parseInt(recordArrJson[0].vod_current_episode, 10);
			setRecordPopUp(serisnum);
			var index = serisnum - 1;
			curseriesindex = index;
			code = strCotent.serieslist[index].code;
			var tabnum = parseInt(index / 20, 10);
			index = index - (tabnum * 20);
			//area[104].currentIndex = tabnum;
			seriesload();
			//area[105].currentIndex = index;
			//area.current = 105;
			starttime = parseInt(recordArrJson[0].vod_current_time, 10);
		}
		document.getElementById("videoPlay").contentWindow.seriesindex = curseriesindex;
		if(resjianquan == 2){
			var url = strCotent.serieslist[curseriesindex].playurl;
			document.getElementById("videoPlay").contentWindow.play(url, starttime,58, 48, 530, 313);
		}else{
			document.getElementById("videoPlay").contentWindow.play(url, '0',58, 48, 530, 313);
		}
		showRecordPop();
	}
}


function playEnd(){
	if(curseriesindex > 0){
		curseriesindex = curseriesindex - 1;
		playurl = strCotent.serieslist[curseriesindex].playurl;
		playVideo(playurl, 0, 58, 48, 530, 313);
	}
}

var flag = false;
var playurl;

var collectionflag = 0;
function setcollection(type){
	flag = true;
	
	var userid = getuserid();
	userid = "ahgd04";
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
	if(flag){
		if(collectionflag == 1){
			//colled_btn.png
			$('collbt').src = "img/detail/colled_btn.png";
		}else{
			$('collbt').src = "img/detail/coll_btn.png";
		}
	}
}

function setmove(){
	var totalwidth = 1012;
	var pindex = current.index;
	var count = collPop.length;
	var width = collPop[pindex].offsetWidth;
	var left = collPop[pindex].offsetLeft;
	var fastleft = collPop[0].offsetLeft;
	if((pindex + 1) < count){
		if((left + width) >= (totalwidth - width)){
			collPop[0].style.marginLeft = (fastleft - width) + 'px';
			return;
		}
	}
	if(pindex == 1){
		collPop[0].style.marginLeft = "0px";
		return;
	}
	if((pindex - 1) > 0){
		if((left - width) <= 0){
			collPop[0].style.marginLeft = (fastleft + width) + "px";
			return;
		}
	}
}

function setRecordPopUp(serisindex){
	if(serisindex > 0){
		$("showRecorddiv").innerHTML = "<span>您上次观看到第" + serisindex + "期</span>";
		return;
	}
	
}

function showRecordPop(){
	if(area.current == 105){
		if(area[105].currentIndex == 0 && resjianquan == '2'){
			if(recordArrJson.length > 0){
				$("showRecorddiv").style.display = "block";
			}
		}
	}
}
function unshowRecordPop(){
	if(area.current == 105){
		if(area[105].currentIndex == 0 && resjianquan == '2'){
			if(recordArrJson.length > 0){
				$("showRecorddiv").style.display = "none";
			}
		}
	}
}

//function 
var listenerControl = {};
listenerControl.Scene = {
	"_scene": "com.iflytek.xiri.MyScene",
	"_commands": {},
	"_feedbacks": {},
	"_fuzzy_words": {}
};
listenerControl.regist = function(){
	var commands = {};
	commands.open = ["打开","进入"];
	commands.back = ["退出", "返回"];
	commands.moveup = ["向上", "往上"];
	commands.movedown = ["向下", "往下"];
	commands.moveright = ["向右", "往右"];
	commands.moveleft = ["向左", "往左"];
	commands[""] = ["播放"];
	var words = [];
	if (resjianquan == '2') {
		words[0] = "播放";
		commands["105," + 0] = words;
		voiceArray = [];
		words[0] = "收藏";
		commands["movie,105," + 1] = words;
		words = [];
		words[0] = "取消收藏";
		commands["105," + 1] = words;
		words = [];
	} else {
		words[0] = "订购";
		commands["105," + 1] = words;
		words = [];
		words[0] = "试看";
		commands["105," + 0] = words;
		words = [];
		words[0] = "收藏";
		commands["105," + 2] = words;
		words = [];
		words[0] = "取消收藏";
		commands["105," + 3] = words;
		words = [];
	}	
	for(var i = 0; i < tuijianlist.length; i++){
		words = [];
		words[0] = tuijianlist[i].name;
		commands["106," + i] = words;
	}
	var len = strCotent.serieslist.length;
	var j = 0;
	for(var i = len - 1; i < len; i++){
		words = [];
		if(j < 5){
			words[0] = strCotent.serieslist[i].name
			commands["104," + j] = words;			
		}else{
			if((j + 1) < len){
				words[0] = strCotent.serieslist[i].name
				commands["104," + j] = words;				
			}else{
				words[0] = strCotent.serieslist[i].name
				commands["104," + j] = words;				
			}
			break;
		}
		j++;
	}
	
	
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
