function $(aaa) {
	var a = document.getElementById(aaa);
	return a;
}
var textList = document.getElementsByClassName('textList');
var nav = document.getElementsByClassName('classic');
var newsImg = document.getElementsByClassName('newsImg');
var vedioBox = document.getElementsByClassName('vedioBox');

var maskborder = document.getElementsByClassName('maskborder')[0];

var newsImgMoveParas = [{
	up: -1,
	right: -1,
	down: 1,
	left: 101
}, {
	up: 0,
	right: -1,
	down: 2,
	left: 101
}, {
	up: 1,
	right: -1,
	down: -1,
	left: 102
}];

var vedioBoxMoveParas = [{
	up: -1,
	right: 103,
	down: 102,
	left: 100
}];

var navMoveParas = [{
	up: -1,
	right: 101,
	down: 1,
	left: -1
}, {
	up: 0,
	right: 101,
	down: 2,
	left: -1
}, {
	up: 1,
	right: 101,
	down: 3,
	left: -1
}, {
	up: 2,
	right: 101,
	down: 4,
	left: -1
}, {
	up: 3,
	right: 101,
	down: 5,
	left: -1
}, {
	up: 4,
	right: 102,
	down: 6,
	left: -1
}, {
	up: 5,
	right: 102,
	down: 7,
	left: -1
}, {
	up: 6,
	right: 102,
	down: -1,
	left: -1
}];

var textListMoveParas = [{
	up: 101,
	right: 103,
	down: 1,
	left: 100
}, {
	up: 0,
	right: 103,
	down: 2,
	left: 100
}, {
	up: 1,
	right: 103,
	down: 3,
	left: 100
}, {
	up: 2,
	right: 103,
	down: 4,
	left: 100
}, {
	up: 3,
	right: 103,
	down: -1,
	left: 100
}];

var area = {
	100: {
		ele: nav,
		paras: navMoveParas,
		currentIndex: 0,
		selStyle: 'sel'
	},
	101: {
		ele: vedioBox,
		paras: vedioBoxMoveParas,
		currentIndex: 0,
		selStyle: 'sel'
	},
	102: {
		ele: textList,
		paras: textListMoveParas,
		currentIndex: 0,
		selStyle: 'sel'
	},
	103: {
		ele: newsImg,
		paras: newsImgMoveParas,
		currentIndex: 0,
		selStyle: 'sel'
	},
	'current': 100
}

var current = {};
var pageControl = {};

function fnSetCurrent() {

	var ca = area[area.current];
	current.area = ca;

	current.index = ca.currentIndex;
	current.ele = ca.ele[current.index];
}

function fnGetNextEleIndex(dir) {
	return current.area.paras[current.index][dir];
}

pageControl.moveLeft = function() {
	var nextEle = fnGetNextEleIndex('left');
	if(nextEle == -1) {
		return false;
	}
	if(area.current == 102) {
		movielistblur();
	}
	if(area.current == 101 || area.current == 102) {
		var ele = area[100].ele[area[100].currentIndex];
		fnRemoveEleClass(ele, "blur");
	}

	if(nextEle >= 100) {
		if(area.current == 102) {
			newsReLoad();
		}
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele, current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	updateplaynewsBlur();
	setplaynewsBlur();
	fnAddEleClass(current.ele, current.area.selStyle);
	if(area.current == 102) {
		movielistfocus();
	}
}

pageControl.moveRight = function() {
	var nextEle = fnGetNextEleIndex('right');
	if(nextEle == -1) {
		return false;
	}
	if(area.current == 102) {
		movielistblur();
	}
	if(area.current == 100) {
		fnAddEleClass(current.ele, "blur");
	}
	if(area.current == 102) {
		setplaynewsBlur();
	}
	if(nextEle >= 100) {
		if(area.current == 102) {
			newsReLoad();
		}
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele, current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	updateplaynewsBlur();
	setplaynewsBlur();
	fnAddEleClass(current.ele, current.area.selStyle);
	if(area.current == 102) {
		movielistfocus();
	}

}
var turnpageflag = false;
var upflag = false;

pageControl.moveUp = function() {
	var nextEle = fnGetNextEleIndex('up');

	// 滚动条复位
	if(area.current == 100) {
        
	}

	if(nextEle == -1) {
		return false;
	}
	if(area.current == 102) {
		movielistblur();
	}
	if(nextEle >= 100) {
		if(area.current == 102 && pageindex > 0) {
			pageindex = pageindex - 5;
			contentLoad(pageindex, 0);
			fnSetCurrent();
			updateplaynewsBlur();
			setplaynewsBlur();
			fnAddEleClass(current.ele, current.area.selStyle);
			if(area.current == 102) {
				movielistfocus();
			}

			// if(cur)

			return;
		}

		if(area.current == 102) {
			newsReLoad();
		}
		area.current = nextEle;
		nextEle = current.index;
	}
	if(area.current == 102 && pageindex == (curplayindex - curindex)) {
		setplaynewsBlur();
	}
	fnRemoveEleClass(current.ele, current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	updateplaynewsBlur();
	setplaynewsBlur();
	fnAddEleClass(current.ele, current.area.selStyle);
	if(area.current == 100) {
		document.getElementsByClassName('news_slide')[0].style.top = 446 + 'px';
		turnpageflag = true;
		pageindex = 0;
		curindex = 0;
		getdata();
	}
	if(area.current == 102) {
		movielistfocus();
	}

}
var trueindex;
pageControl.moveDown = function() {
	var nextEle = fnGetNextEleIndex('down');

	if(nextEle == -1) {
		if(area.current == 102) {
			if(pageindex + current.area.currentIndex + 1 < totalcontent) {
				pageindex = pageindex + 5;
				nextEle = 0;
				contentLoad(pageindex, 0);
			} else {
				return false;
			}

		} else {
			return false;
		}

	}

	if(area.current == 102 && (nextEle + pageindex == totalcontent)) {
		return false;
	}
	if(area.current == 102) {
		movielistblur();
	}
	if(nextEle >= 100) {
		if(area.current == 102) {

			newsReLoad();
		}
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele, current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	updateplaynewsBlur();
	setplaynewsBlur();
	fnAddEleClass(current.ele, current.area.selStyle);
	if(area.current == 100) {
		document.getElementsByClassName('news_slide')[0].style.top = 446 + 'px';
		turnpageflag = true;
		pageindex = 0;
		curindex = 0;
		getdata();
	}
	if(area.current == 102) {
		movielistfocus();
	}
}

pageControl.keyBack=function(){
	close();
}

var contentindex;
var curpagenum;

var totalcontent;

var curplayindex = 0; // 当前播放的新闻所在数据列表中的位置
var curindex = 0; // 当前播放新闻的位置
pageControl.ok = function() {
	// var url=current.ele.dataset['url'];
	// /window.location=url;
	if(area.current == 102) {
		if(pageindex == (curplayindex - curindex) && curindex != current.index) {
			fnRemoveEleClass(area[102].ele[curindex], "blur");
		}
		var codeindex = current.area.currentIndex;
		curindex = codeindex;
		trueindex = pageindex + codeindex;
		var code = contentjson[trueindex].code;
		aotuindex = codeindex;
		curplayindex = trueindex;
		setplaynewsBlur();
		geturl(code);
		return;
	} else if(area.current == 101) {
		fullplay();
		return;
	} else if(area.current == 103) {
		var cururl = '' + location;
		if(cururl.indexOf("&area=") > 0) {
			cururl = cururl.substring(0, cururl.indexOf("&area="));
		}
		cururl = cururl + "&area=" + area.current + "&index=" + current.index +
			"&curplayindex=" + curplayindex + "&curindex=" + curindex +
			"&cateindex=" + area[100].currentIndex;
		setpageurl(cururl);
		closemedia();
		var url = newsImgMoveParas[current.index].url;
		window.location = url;
	}
}

window.onload = function() {
	init();
	categoryUrl();
}

function adSel(){
	var areaFrom = fnGetQueryStringByName('category_id');
	var indexFrom = fnGetQueryStringByName('index');
	var curplayindexFrom = fnGetQueryStringByName('curplayindex');
	var curindexFrom = fnGetQueryStringByName('curindex');
	var cateindexFrom = fnGetQueryStringByName('cateindex');

	if(areaFrom != '' && indexFrom != '' && area[areaFrom].ele[indexFrom]) {
		area.current = areaFrom;
		area[area.current].currentIndex = indexFrom;
	}
	if(curindexFrom != '') {
		curindex = parseInt(curindexFrom, 10);
	}
	if(curplayindexFrom != '') {
		curplayindex = parseInt(curplayindexFrom, 10);
		pageindex = curplayindex - curindex;

	}
	if(cateindexFrom != '') {
		area[100].currentIndex = parseInt(cateindexFrom, 10);
		fnAddEleClass(area[100].ele[area[100].currentIndex], "blur");
	}

	//getdata();
	// 找到获取焦点元素
	fnSetCurrent();
	fnAddEleClass(current.ele, current.area.selStyle);
	// 添加样式
	// fnAddEleClass(current.ele,current.area.selStyle);

	if(area.current == 102) {

	}
}

var voiceDataList = [];

function datainit() {
	var tag = $("classic");
	var taginnerhtml = '';
	var categoryList = categoryjson;

	for(var i = 0; i < categoryList.length; i++) {
		taginnerhtml = taginnerhtml + '<div class="classic">' +
			categoryList[i].name.replace(/quot/g, '"') + '</div>';
		voiceDataList[i] = categoryList[i].name;
	}
	// taginnerhtml = taginnerhtml + '<div class="classic">更多</div>';
	tag.innerHTML = taginnerhtml;
	// tag = $("textList");
	initVoice();
}
var flag = false;
var countpage = 0;

function getdata() {
    flag = true;
	var index = area[100].currentIndex;
	var category_id = categoryjson[index].primaryid;
	var jsurl = getJSPath(category_id, 2);
	jsurl = jsurl + 'P' + category_id + '.js';
	loadJS(jsurl);
}
var contentjson;
var aotuindex;
var pageindex = 0;
var voiceTextList = [];
var voice = 0;

function contentLoad(index, playflag) {
	var tag = $("textList");
	var taginnerhtml = '';
	var contentList = contentjson;
	
//	console.log(contentList);
	
	totalcontent = contentList.length;
	// aotuindex = 0;
	pageindex = index;
	for(var i = index; i < index + 5 && i < contentList.length; i++) {
		taginnerhtml = taginnerhtml + '<div class="textList">' + (i + 1) + '.' +
			contentList[i].name.replace(/quot/g, '"') + '</div>';
		voiceTextList[voice] = contentList[i].name;
		voice++;
	}
	tag.innerHTML = taginnerhtml;
	textList = document.getElementsByClassName('textList');
	area[102].ele = textList;
	if(playflag == 1) {
		curplayindex = 0;
		geturl(contentList[0].code);
		setplaynewsBlur();
	}
	scroll();
	initVoice();
	voice = 0;

}
var playurl = '';

/*document.getElementById("getPlayUrlFrame").onload = function() {
	// document.getElementById("tempid").innerHTML =
	// document.getElementById("tempid").innerHTML + ",playurl1:" + playurl +
	// ",flag=" + flag;
	if(flag) {
		initVideo();
		playVideo(playurl, '0', 256, 80, 603, 363);
	}
}*/

function getplayurl(code) {
	flag = true;
	var url = "datajsp/getPlayUrl.jsp?code=" + code;
	// document.getElementById("tempid").innerHTML =
	// document.getElementById("tempid").innerHTML + "getplayurl";
	getPlayUrlFrame.location.href = url;
}

function initplay(playurl) {
	playurl = playurl.replace(/(^\s*)|(\s*$)/g, "");
	// document.getElementById("tempid").innerHTML =
	// document.getElementById("tempid").innerHTML + ",initplay playurl2:" +
	// playurl;
	// alert("playurl2:" + playurl);
	initVideo();
	// playurl =
	// 'http://ahvod.youku.com.lv1.vcache.cn/vod/video_3516/episode_60012/media_61491.m3u8';
	playVideo(playurl, '0', 256, 80, 610, 370);
}

function geturl(code) {
	code = encodeURIComponent(code);
	code = code.replace(/%/g, "@");
	var index = area[100].currentIndex;
	var category_id = categoryjson[index].primaryid;
	var jsurl = getJSPath(category_id, 3);
    jsurl = jsurl + 'D' + code + '.js';
	loadJS(jsurl);
}

function getcallback(result) {
	playurl = result;
	initplay(result);
}

function playEnd(){
	aotuindex = curplayindex + 1;
	fnRemoveEleClass(area[102].ele[curindex], "blur");
	curindex = curindex + 1;
	curplayindex = curplayindex + 1;
	if(curindex == 5) {
		curindex = 0;
	}
	if((curplayindex - curindex) != pageindex) {
		pageindex = pageindex + 5;
		area[102].currentIndex = curindex;
	}
	newsReLoad();
	setplaynewsBlur();
	area[102].currentIndex = curindex;
	if(area.current == 102) {
		fnRemoveEleClass(current.ele, current.area.selStyle);
		fnSetCurrent();
		fnAddEleClass(current.ele, current.area.selStyle);
	}
	geturl(contentjson[aotuindex].code);
}

function setplaynewsBlur() {
	if(pageindex == (curplayindex - curindex)) {
		fnAddEleClass(area[102].ele[curindex], "blur");
	}
}
// 重新加载正在播放的新闻页
function newsReLoad() {
	var newsindex = parseInt(curplayindex / 5, 10);
	newsindex = newsindex * 5;
	contentLoad(newsindex, 0);
	fnAddEleClass(area[102].ele[curindex], "blur");

}

function updateplaynewsBlur() {
	if(pageindex != (curplayindex - curindex)) {
		fnRemoveEleClass(area[102].ele[curindex], "blur");
	}
}

function movielistfocus() {
	var name = current.ele.innerHTML;
	var len = getStrLength(name);
	if(len > 52) {
		var marq = '<marquee scrollamount="4">' + name + '</marquee>';
		current.ele.innerHTML = marq;
	}
}

function movielistblur() {
	// var len = getStrLength(name);
	if(current.ele.getElementsByTagName("marquee")[0]) {
		var name = current.ele.getElementsByTagName("marquee")[0].innerHTML;
		current.ele.innerHTML = name;
	}
}

function scroll() {
	// sub_r_slide
	if(countpage <= 1) {
		$("scrollbars").style.display = "none";
		return;
	}

	var pagenum = Math.ceil(pageindex / 5);
	var ceil = 191 / (countpage - 1);
	var moveheight = pagenum * ceil;
	document.getElementsByClassName('news_slide')[0].style.top = (446 + moveheight) +
		'px';

}

var hiddenProperty = 'hidden' in document ? 'hidden' :
	'webkitHidden' in document ? 'webkitHidden' :
	'mozHidden' in document ? 'mozHidden' : null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i,
	'visibilitychange');
var onVisibilityChange = function() {
	if(!document[hiddenProperty]) {
		var url = getbackurl();
		if(url) {
			closemedia();
			window.location = url;
		}
	}
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);

var callback = function(intent) {
	document.getElementsByClassName("moveNum").innerHTML = JSON
		.stringify(intent);
	var command = intent._command;
	var commandarray = command.split(",");
	if(commandarray[0] == 'up' || commandarray[0] == 'up1') {
		nextEle = 102;
		pageindex = pageindex - 5;
		contentLoad(pageindex, 0);
		pageControl.moveUp();
		fnRemoveEleClass(current.ele, current.area.selStyle);
		area.current = 102;
		area[area.current].currentIndex = 0;
		fnSetCurrent();
		fnAddEleClass(current.ele, current.area.selStyle);
		pageControl.ok();
		return;
	}
	if(commandarray[0] == 'down' || commandarray[0] == 'down1') {
		nextEle = 102;
		pageindex = pageindex + 5;
		contentLoad(pageindex, 0);
		pageControl.moveDown();
		fnRemoveEleClass(current.ele, current.area.selStyle);
		area.current = 102;
		area[area.current].currentIndex = 0;
		fnSetCurrent();
		fnAddEleClass(current.ele, current.area.selStyle);
		pageControl.ok();
		return;
	}
	movielistblur();
	fnRemoveEleClass(current.ele, current.area.selStyle);
	area.current = parseInt(commandarray[1]);
	area[area.current].currentIndex = parseInt(commandarray[commandarray.length - 1]);
	fnSetCurrent();
	fnAddEleClass(current.ele, current.area.selStyle);
	if(area.current == 100) {
		document.getElementsByClassName('news_slide')[0].style.top = 446 + 'px';
		turnpageflag = true;
		pageindex = 0;
		curindex = 0;
		getdata();
		return;
	}
	pageControl.ok();
}

function initVoice() {
	var scene = {
		"_scene": "com.iflytek.xiri.MyScene",
		"_fuzzy_words": {
			"video": ["张亮牵手无心", "超级大赢家主持人参与爸爸去哪儿"]
		}
	};
	var commands = {
		"key1": ["打开", "开始"],
		"key2": ["$W(video)"],
		"Index": ["首页", "主页", "第一页"],
		"up": ["上一页"],
		"up1": ["上页"],
		"down": ["下一页"],
		"down1": ["下页"],
		"vedioBox,101,0": ["播放"],
		"back": ["返回"],
		"_PLAY": ["$P(_PLAY)"],
		"_PAGE": ["$P(_PAGE)"],
		"_EPISODE": ["$P(_EPISODE)"],
		"_SELECT": ["$P(_SELECT)"]
	}
	var feedbacks = {

	}
	var voiceArray = [];
	var voicestr = "";
	for(var i = 0; i < voiceDataList.length; i++) {
		voiceArray[0] = voiceDataList[i];
		commands["news,100," + i] = voiceArray;
		voiceArray = [];
		voicestr = "进入" + voiceDataList[i];
		feedbacks["news,100," + i] = voicestr;
		voicestr = "";
	}

	for(var i = 0; i < voiceTextList.length; i++) {
		voiceArray[0] = voiceTextList[i];
		commands["newstext,102," + i] = voiceArray;
		voiceArray = [];
		voicestr = "进入" + voiceTextList[i];
		feedbacks["newstext,102," + i] = voicestr;
		voicestr = "";
	}
	feedbacks["UP"] = '跳转上一页';
	feedbacks["DOWN"] = '跳转下一页';
	feedbacks["UP1"] = '跳转上页';
	feedbacks["DOWN1"] = '跳转下页'
	feedbacks["vedioBox"] = '跳转播放'
	scene["_commands"] = commands;
	scene["_feedbacks"] = feedbacks;
	// var f = true;
	// if (f) {
	// alert(JSON.stringify(scene));
	// f = false;
	// }

	var listener = new Xiri.Listener(callback);
	listener.regist(scene);
	voiceContent = [];
}
//获取分类数据
function categoryUrl() {
    var areaFrom = fnGetQueryStringByName('category_id');
	var category_id = areaFrom;
	var jsurl = getJSPath(category_id, 1);
	jsurl = jsurl + 'C' + category_id + '.js';
	loadJS(jsurl);
}
//静态数据
var categoryjson = new Array();
function CategoryListCallback(ds) {
	categoryjson = ds;
	getdata();
	datainit();
}
var contentjson;
function ContentListCallback(ds) {
	contentjson = ds;
   adSel();
	
	if(flag) {
		var code = "";
		if(contentjson.length > 0 && turnpageflag) {
			code = contentjson[0].code;
			curindex = 0;
			curplayindex = 0;
			initplay(code);
		}
		// contentLoad(pageindex, 1);
		// 页面从其他页面返回
		countpage = Math.ceil(contentjson.length / 5);
		if(countpage <= 1) {
			$("scrollbars").style.display = "none";
		} else {
			$("scrollbars").style.display = "block";
		}
		if(pageindex < curplayindex && (pageindex + 5) > curplayindex) {
			contentLoad(pageindex, 0);
			var code = contentjson[curplayindex].code;
			geturl(code);
			area[102].currentIndex = curindex;
			setplaynewsBlur();
		} else {
			contentLoad(pageindex, 1);
			fnAddEleClass(area[102].ele[curindex], "blur");
		}
	}
	
}
function ContentDetailCallback(contentDetailJson){
	document.getElementById("videoPlay").contentWindow.closemedia();
	playurl = contentDetailJson.playurl;
	document.getElementById("videoPlay").contentWindow.play(playurl, '0',259, 82, 603, 353);
}

function close(){
	document.getElementById("videoPlay").contentWindow.closemedia();
	var url = getbackurl();
	if (url) {
		window.location = url;
	}
}

function fullplay(){
	document.getElementById("videoPlay").focus();
	document.body.style.background = "url()";
	document.getElementById("videoPlay").width = "1280px";
	document.getElementById("videoPlay").height = "720px";
	document.getElementById("videoPlay").style.left = "0px";
	document.getElementById("videoPlay").style.top = "0px";
	document.getElementById("container").style.display = 'none';
	document.getElementById("videoPlay").contentWindow.mp.setVideoDisplayArea(0, 0, 1280, 720);
	document.getElementById("videoPlay").contentWindow.mp.refreshVideoDisplay();
}

function smallplay(){
	document.getElementById("videoPlay").blur();
	document.body.style.background="url(img/news/newsBG.png) no-repeat";
	document.getElementById("container").style.display = 'block';
	document.getElementById("videoPlay").width = "603px";
	document.getElementById("videoPlay").height = "353px";
	document.getElementById("videoPlay").style.left = "259px";
	document.getElementById("videoPlay").style.top = "82px";
	document.getElementById("videoPlay").contentWindow.mp.setVideoDisplayArea(259, 82, 603, 353);
	document.getElementById("videoPlay").contentWindow.mp.refreshVideoDisplay();
	document.documentElement.focus();
}