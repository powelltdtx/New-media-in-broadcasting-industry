var huiad = document.getElementsByClassName('program');
var huiitem = document.getElementsByClassName('programitem');
var media = document.getElementsByClassName('media');
var nav = document.getElementsByClassName('nav');

var maskborder = document.getElementsByClassName('maskborder')[0];
//广告位
var huiadParas = [
	{up:-1,right:101,down:1,left:-1},
	{up:0,right:2,down:103,left:-1},
	{up:101,right:3,down:103,left:1},
	{up:101,right:4,down:103,left:2},
	{up:102,right:-1,down:103,left:3}
];
var mediaParas = [
	{up:-1,right:102,down:100,left:100}
];
var huiitemParas = [
   {up:-1,right:-1,down:1,left:101},
   {up:0,right:-1,down:2,left:101},  
   {up:1,right:-1,down:3,left:101}, 
   {up:2,right:-1,down:4,left:101},
   {up:3,right:-1,down:5,left:101},  
   {up:4,right:-1,down:6,left:101},  
   {up:5,right:-1,down:7,left:101},
   {up:6,right:-1,down:8,left:101},  
   {up:7,right:-1,down:100,left:101}
];
var navParas = [
	{up:100,right:1,down:-1,left:-1},
	{up:100,right:2,down:-1,left:0},
	{up:100,right:3,down:-1,left:1},
	{up:100,right:4,down:-1,left:2},
	{up:100,right:5,down:-1,left:3},
	{up:100,right:-1,down:-1,left:4}
];

var area = {
	100:{
		ele:huiad,
		paras:huiadParas,
		currentIndex:0,
		selStyle:'huiGood_sel'
	},
	101:{
		ele:media,
		paras:mediaParas,
		currentIndex:0,
		selStyle:'huiGood_sel'
	},	
	102:{
		ele:huiitem,
		paras:huiitemParas,
		currentIndex:0,
		selStyle:'huiGood_sub_info_sel'
	},	
	103:{
		ele:nav,
		paras:navParas,
		currentIndex:1,
		selStyle:'bottom_nav_sel'
	},		
	'current':103
}

var ads = ["http://117.71.25.104:81/sdms/js/data/ad/iptv_AHcate.js","http://117.71.25.104:81/sdms/js/data/ad/iptv_AHlives.js","http://117.71.25.104:81/sdms/js/data/ad/iptv_AHsociety.js","http://117.71.25.104:81/sdms/js/data/ad/iptv_AHopera.js"];

var current = {};
var pageControl = {};

function fnSetCurrent(){
	
	var ca = area[area.current];
	current.area = ca;

	current.index = ca.currentIndex;
	current.ele = ca.ele[current.index];
}

function fnGetNextEleIndex(dir){
	return current.area.paras[current.index][dir];
}
pageControl.moveLeft = function(){
	var nextEle = fnGetNextEleIndex('left');
	if(nextEle == -1){
		return false;
	}
	if(area.current == 102){
		movielistblur();
	}
	if(area.current == 100){
		contentlistblur();
	}
	if(nextEle>=100){
		if(area.current == 101){
			area[100].currentIndex = 0;
		}
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
    if(area.current == 100){
        marqueeText();
    }
	if(area.current == 103 && current.index == 0){
		if(contentJsonArr[curplayindex].code != ''){
			if(mediaPlayStartFlag){
				jump();
				return;
			}else{
				current.area.currentIndex = 1;
				fnSetCurrent();
			}
		}else{
			jump();
			return;
		}
		
	}    
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 102){
		movielistfocus();
	}
	if(area.current == 103 && current.index > 0){
		document.getElementById("videoPlay").contentWindow.closemedia();
		area[100].currentIndex=0;
		loadAD(current.index - 1);
		getdataitems();
	}
}

pageControl.moveRight = function(){
	var nextEle = fnGetNextEleIndex('right');
	if(area.current == 103 && nextEle == 5){
		return false;
	}
	if(nextEle == -1){
		return false;
	}
	if(area.current == 102){
		movielistblur();
	}
    if(area.current == 100){
        contentlistblur();
    }
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
    if(area.current == 100){
        marqueeText();
    }
    if(area.current == 103 && current.index == 5){
    	if(contentjson[curplayindex].code != ''){
			if(mediaPlayStartFlag){
				jump();
				return;
			}else{
				current.area.currentIndex = 4;
				fnSetCurrent();
			}
		}else{
			jump();
			return;
		}
    }
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 102){
		movielistfocus();
	}
	if(area.current == 103){
		document.getElementById("videoPlay").contentWindow.closemedia();
		area[100].currentIndex=0;
		loadAD(current.index - 1);
		getdataitems();
	}    
}

pageControl.moveUp = function(){
	var nextEle = fnGetNextEleIndex('up');
	if(nextEle == -1){
		if(area.current == 102 && pagenum > 1){
			pagenum = pagenum - 2;
			contentLoad();
			fnSetCurrent();
			fnAddEleClass(current.ele,current.area.selStyle);
			setcurplaycolor();
			if(area.current == 102){
				movielistfocus();
			}
			return;
		}
		return false;
	}
	if(area.current == 102){
		movielistblur();
	}
    if(area.current == 100){
        contentlistblur();
    }
	if(area.current != 103){
		fnRemoveEleClass(current.ele,current.area.selStyle);
	}
	if(nextEle >= 100){
		area.current = nextEle;
		nextEle = current.index;
	}
	current.area.currentIndex = nextEle;
	fnSetCurrent();
    if(area.current == 100){
        marqueeText();
    }
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 102){
		movielistfocus();
	}
		
} 

pageControl.moveDown = function(){
	var nextEle = fnGetNextEleIndex('down');
	if(nextEle == -1){
		return false;
	}
	if(area.current == 102){
		movielistblur();
	}
    if(area.current == 100){
        contentlistblur();
    }
	if(nextEle >= 100){
		if(area.current == 101){
			area[100].currentIndex = 2;
		}
		if(area.current == 102){
			if((pagenum * 9) < contentlen){
                fnRemoveEleClass(current.ele,current.area.selStyle);
				contentLoad();
				area[102].currentIndex = 0;
				fnSetCurrent();
                fnAddEleClass(current.ele,current.area.selStyle);
				setcurplaycolor();

				if(area.current == 102){
					movielistfocus();
				}
				return;
			}else{
				area[100].currentIndex = 4;
			}
		}		
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
    if(area.current == 100){
        marqueeText();
    }
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 102){
        movielistfocus();
    }
}

pageControl.keyBack=function(){
	close();
}

pageControl.ok=function(){
	if(area.current == 100){
		var cururl = '' + location;
		if(cururl.indexOf("?area=") > 0){
			cururl = cururl.substring(0, cururl.indexOf("?area="));
		}
		cururl = cururl + "?area=" + area.current + "&index=" + current.index + "&curplayindex=" + curplayindex + "&navindex=" + area[103].currentIndex;
		setpageurl(cururl);
		closemedia();
		var url = huiadParas[area[100].currentIndex].url;
		window.location=url;
	}
	if(area.current == 102){
		cancelplaycolor();
		curplayindex = (pagenum - 1) * 9 + current.index;
		var code = contentJsonArr[curplayindex].code;
		if(code != ''){
			document.getElementById("videoPlay").contentWindow.closemedia();
			geturl(code);
		}
		setcurplaycolor();
		return;
	}
	if(area.current == 101){
		fullplay();
		return;
	}
}

var curplayindexFrom;
var baseurl = '';
window.onload=function(){
	baseurl = '' + location;
	baseurl = baseurl.substring(0, baseurl.indexOf('huiGood_sub.html'));
    var test = window.location.search;
    if(test == "?currentIndex=4"){
        area[103].currentIndex = parseInt(test.split("=")[1]);
    }
	var areaFrom=fnGetQueryStringByName('area');
	var indexFrom=fnGetQueryStringByName('index');
	var navindex=fnGetQueryStringByName('navindex');
	curplayindexFrom = fnGetQueryStringByName('curplayindex');
	if(areaFrom!=''&&indexFrom!=''&&area[areaFrom].ele[indexFrom]){
		area.current=areaFrom;
		area[area.current].currentIndex=indexFrom;
		navindex = parseInt(navindex, 10);
		area[103].currentIndex = navindex;
		loadAD(navindex - 1);
	}else{
		loadAD(area[103].currentIndex - 1);
	}
	var ele = area[103].ele[area[103].currentIndex];
	fnAddEleClass(ele, area[103].selStyle);
	getdataitems();
}
var mediaPlayStartFlag = false;
var frameflag = false;
var contentjson;
var contentJsonArr;
var categoryArr = ['1099001002002002', '1099001002003002', '1099001002004002', '1099001002005001'];
function getdataitems(){
	curplayindex = 0;
	pagenum = 0;
	var index = area[103].currentIndex;
	var category_id = categoryArr[index - 1];
	var jsurl = getJSPath(category_id, 2);
	jsurl = jsurl + 'P' + category_id + '.js';
	loadJS(jsurl);
}

function geturl(code){
	code = encodeURIComponent(code);
	code = code.replace(/%/g, "@");
	var index = area[103].currentIndex;
	var category_id = categoryArr[index - 1];
	var jsurl = getJSPath(category_id, 3);
    jsurl = jsurl + 'D' + code + '.js';
	loadJS(jsurl);
}
var playurl = '';

var curplayindex = 0;
function playEnd(){
	document.getElementById("videoPlay").contentWindow.closemedia();
	if((curplayindex + 1) < contentlen){
		cancelplaycolor();
		curplayindex = curplayindex + 1;
		var page = parseInt(curplayindex / 9, 10);
		if((pagenum - 1) !=  page){
			pagenum = page;
			contentLoad();
			if(area.current == 102){
				 
				if(current.index < huiitem.length){
					area[102].currentIndex = current.index;
				}else{
					area[102].currentIndex = huiitem.length - 1;
				}
				fnSetCurrent();
				fnAddEleClass(current.ele,current.area.selStyle);
			}
		}
		
		var code = contentJsonArr[curplayindex].code;
		if(code != ''){
			geturl(code);
		}
		setcurplaycolor();
	}
}

var pagenum = 0;
var countpage = 0;
var contentlen = 0;

function contentLoad(){
	    
	var j = 0;
	var tag = $("programlist");
	var strinnerHTML = '';
	for(var i = (pagenum * 9); i < contentlen; i++){
//		console.log(contentJsonArr[i].name)
		
		strinnerHTML = strinnerHTML + ' <li class="programitem"><i></i><em>' + contentJsonArr[i].name + '</em></li>';
		j++;
		if(j == 9){
			break;
		}
	}
	pagenum++;
	tag.innerHTML = strinnerHTML;
	huiitem = document.getElementsByClassName('programitem');
	sethuiitemParas();
	area[102].ele = huiitem;
	area[102].paras = huiitemParas;
	scroll();
}
//自动加载广告js文件
function loadAD(position){
	initimg();
	var oldjs = document.getElementById("adjs"); 
	if(oldjs) oldjs.parentNode.removeChild(oldjs); 
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.id = "adjs";
	if(script.readyState){ // IE
      script.onreadystatechange = function(){
          if(script.readyState == "loaded" || script.readyState == "complete"){
              script.onreadystatechange = null;
              if((area[103].currentIndex - 1) == position){
            	  adinit();
              }
             
          }
      };
  }else{ // FF, Chrome, Opera, ...
      script.onload = function(){
    	  if((area[103].currentIndex - 1) == position){
    		  adinit();
    	  }
      };
  }
  script.src = ads[position];
  document.getElementsByTagName("head")[0].appendChild(script);
} 

function adinit(){
	loadAdConfingJSONData(addatas,'','','',getData);
}

function initimg(){
	for(var i = 0; i < 5; i++){
		huiad[i].getElementsByTagName("img")[0].src = "";
		huiad[i].getElementsByTagName("span")[0].innerHTML = "";
	}
}

function sethuiitemParas(){
	huiitemParas = [];
	var huiitemPara = {};
	var up = -1;
	var down = -1;
	var left = 101;
	var right = -1;
	var len = huiitem.length;
	for(var i = 0; i < len; i++){
		huiitemPara = {};
		if(i > 0){
			up = i - 1;
		}else{
			up = -1
		}
		if(i < (len - 1)){
			down = i + 1;
		}else{
			down = 100;
		}
		huiitemPara.up = up;
		huiitemPara.down = down;
		huiitemPara.left = left;
		huiitemPara.right = right;
		huiitemParas[i] = huiitemPara;
	}
}

function setcurplaycolor(){
	var index = curplayindex - ((pagenum - 1) * 9);
	if(index >= 0 && index < 9){
		var ele = area[102].ele[index];
		fnAddEleClass(ele,'huiGood_sub_info_cur');
	}
}
function cancelplaycolor(){
	var index = curplayindex - ((pagenum - 1) * 9);
	var ele = area[102].ele[index];
	fnRemoveEleClass(ele, 'huiGood_sub_info_cur');
}

function movielistfocus(){
	var name = current.ele.getElementsByTagName("em")[0].innerHTML;
	var len = getStrLength(name);
	if(len > 28){
		var marq = '<marquee scrollamount="4">' +  name + '</marquee>';
		current.ele.getElementsByTagName("em")[0].innerHTML = marq;
	}
}

function movielistblur(){
	//var len = getStrLength(name);
	if(current.ele.getElementsByTagName("marquee")[0]){
		var name = current.ele.getElementsByTagName("marquee")[0].innerHTML;
		current.ele.getElementsByTagName("em")[0].innerHTML = name;
	}
}

function contentlistblur(){
    if(current.ele.getElementsByTagName("marquee")[0]){
        var name = current.ele.getElementsByTagName("marquee")[0].innerHTML;
        current.ele.getElementsByTagName("span")[0].innerHTML = name;
    }
}

function marqueeText() {
    if(!current.ele.getElementsByTagName('span')[0]) return;
    var cur_span = current.ele.getElementsByTagName('span')[0];
    var curWidth = window.getComputedStyle(current.ele,null).width;
    var maxlen = Math.floor(parseFloat(curWidth)/20)*2;
    var realLen = getStrLength(cur_span.innerText);
    if(realLen > maxlen){
        var marq = '<marquee scrollamount="4">' + cur_span.innerHTML + '</marquee>';
        cur_span.innerHTML = marq;
    }
}

function scroll(){
	//sub_r_slide
	var subslide = document.getElementsByClassName('sub_r_slide');
	var subslideimg = subslide[0].getElementsByTagName("img")[1];
	if(countpage <= 1){
		subslide[0].style.display = "none";
		return;
	}
	var ceil = 275/(countpage - 1);
	var moveheight = (pagenum - 1) * ceil;
	subslideimg.style.top = (5 + moveheight) + 'px';
	
}

function jump(){
	
	if(current.index == 0){
		document.getElementById("videoPlay").contentWindow.closemedia();
		var url = "hui_good.html";
		window.location=url;
	}else if(current.index == 5){
		document.getElementById("videoPlay").contentWindow.closemedia();
		var url = "huiGood_zhuanti.jsp";
		window.location=url;
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

var contentListJOSNArr;
function ContentListCallback(jsonarr){
	contentJsonArr = jsonarr;
	if(curplayindexFrom != ''){
		curplayindex = parseInt(curplayindexFrom, 10);
		curplayindexFrom = '';
		pagenum = parseInt(curplayindex / 9, 10);
	}else{
		curplayindex = 0;
	}
	contentlen = contentJsonArr.length;
	countpage = Math.ceil(contentlen/9);
	if(countpage > 1){
		document.getElementsByClassName('sub_r_slide')[0].style.display = "block";
	}else{
		document.getElementsByClassName('sub_r_slide')[0].style.display = "none";
	}
	contentLoad();
	var code = contentJsonArr[curplayindex].code;
	mediaPlayStartFlag = true;
	if(code != ''){
		setcurplaycolor();
		geturl(code);
	}
	//找到获取焦点元素
	fnSetCurrent();
	//添加样式
	fnAddEleClass(current.ele,current.area.selStyle);
}

function ContentDetailCallback(contentDetailJson){
	document.getElementById("videoPlay").contentWindow.ContentDetailCallback(contentDetailJson);
	playurl = contentDetailJson.playurl;
	document.getElementById("videoPlay").contentWindow.play(playurl, 0, 296, 106, 591, 332);
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
	document.body.style.background="url(img/huigood/hui_good_sub_bg.png) no-repeat";
	document.getElementById("container").style.display = 'block';
	document.getElementById("videoPlay").width = "591px";
	document.getElementById("videoPlay").height = "332px";
	document.getElementById("videoPlay").style.left = "296px";
	document.getElementById("videoPlay").style.top = "106px";
	document.getElementById("videoPlay").contentWindow.mp.setVideoDisplayArea(296, 106, 591, 332);
	document.getElementById("videoPlay").contentWindow.mp.refreshVideoDisplay();
	document.documentElement.focus();
}
