var huiright = document.getElementsByClassName('programright');
var huileft = document.getElementsByClassName('programleft');
var nav = document.getElementsByClassName('nav');

var maskborder = document.getElementsByClassName('maskborder')[0];
//由上到下 由左到右
var huileftParas = [
	{up:-1,right:101,down:1,left:-1},
	{up:0,right:101,down:2,left:-1},
	{up:1,right:101,down:3,left:-1},
	{up:2,right:101,down:4,left:-1},
	{up:3,right:101,down:102,left:-1}
];
var huirightParas = [
    {up:-1,right:2,down:1,left:100},
    {up:0,right:3,down:102,left:100},
    {up:-1,right:5,down:3,left:0},
    {up:2,right:4,down:102,left:1},
    {up:2,right:7,down:102,left:3},
    {up:-1,right:-1,down:6,left:2},
    {up:5,right:-1,down:7,left:2},
    {up:6,right:-1,down:102,left:4}
];
var navParas = [
	{up:101,right:1,down:-1,left:-1},
	{up:-1,right:-1,down:-1,left:-1}
];

var area = {
	100:{
		ele:huileft,
		paras:huileftParas,
		currentIndex:0,
		selStyle:'huiGood_leftNav_sel'
	},
	101:{
		ele:huiright,
		paras:huirightParas,
		currentIndex:2,
		selStyle:'huiGood_sel'
	},
	102:{
		ele:nav,
		paras:navParas,
		currentIndex:0,
		selStyle:'bottom_nav_sel'
	},	
	'current':102
}

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

function contentlistblur(){
    if(current.ele.getElementsByTagName("marquee")[0]){
        var name = current.ele.getElementsByTagName("marquee")[0].innerHTML;
        current.ele.getElementsByTagName("span")[0].innerHTML = name;
    }
}

pageControl.moveLeft = function(){
	var nextEle = fnGetNextEleIndex('left');
	if(nextEle == -1){
		return false;
	}
	if(area.current == 101){
		contentlistblur();
	}
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}

	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
    if(area.current ==101){
        console.log('inside');
        marqueeText();
    }
	fnAddEleClass(current.ele,current.area.selStyle);
}

pageControl.moveRight = function(){
	var nextEle = fnGetNextEleIndex('right');
	if(nextEle == -1){
		return false;
	}
    if(area.current == 101){
        contentlistblur();
    }
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();

    if(area.current ==101){
        console.log('inside');
        marqueeText();
    }

	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 102 && current.index == 1){
		var url = "huiGood_sub.html";
		window.location=url;
	}
	
}

pageControl.moveUp = function(){
	var nextEle = fnGetNextEleIndex('up');
	if(nextEle == -1){
		return false;
	}
    if(area.current == 101){
        contentlistblur();
    }
	if(nextEle >= 100){
		area.current = nextEle;
		nextEle = current.index;
	}else{
		fnRemoveEleClass(current.ele,current.area.selStyle);
	}
	
	//fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
    if(area.current ==101){
        console.log('inside');
        marqueeText();
    }
	fnAddEleClass(current.ele,current.area.selStyle);
		
} 

pageControl.moveDown = function(){
	var nextEle = fnGetNextEleIndex('down');
	if(nextEle == -1){
		return false;
	}
    if(area.current == 101){
        contentlistblur();
    }
	if(nextEle >= 100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
    if(area.current ==101){
        console.log('inside');
        marqueeText();
    }
	fnAddEleClass(current.ele,current.area.selStyle);
}


pageControl.ok=function(){
	if(area.current == 100){
		var cururl = baseurl + "hui_good.jsp?area=" + area.current + "&index=" + current.index;
		setpageurl(cururl);
		var url = huileftParas[area[100].currentIndex].url;
		window.location=url;
	}
	if(area.current == 101){
		var cururl = baseurl + "hui_good.jsp?area=" + area.current + "&index=" + current.index;
		setpageurl(cururl);
		var url = huirightParas[area[101].currentIndex].url;
		window.location=url;
	}	
}


var baseurl = '';
window.onload=function(){
	baseurl = '' + location;
	baseurl = baseurl.substring(0, baseurl.indexOf('hui_good.html'));
	adinit();
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

	if(area.current==102){
		
	}
}