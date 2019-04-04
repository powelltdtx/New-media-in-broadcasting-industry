
var current = {};
var pageControl = {};
var movecount = 0;
//分类dom缓存
var chooseLi = document.getElementsByClassName('chooseLI');
//电影推荐dom缓存
var recListLi = document.getElementsByClassName('recListLi');	
//电影列表dom缓存
var moveList = document.getElementsByClassName('moveListLi');
var fun = document.getElementsByClassName('fun');

var chooseMoveParas = [];
var recListLiMoveParas = [
	{up:-1,right:1,down:102,left:-1},
	{up:-1,right:2,down:102,left:0},
	{up:-1,right:-1,down:102,left:1}
];	
var moiveMoveParas=[];
var funMoveParas = [
	{up:-1,right:101,down:100,left:-1}
];

var area = {
	100:{
		ele:chooseLi,
		paras:chooseMoveParas,
		currentIndex:0,
		selStyle:'choose-sel'
	},
	101:{
		ele:recListLi,
		paras:recListLiMoveParas,
		currentIndex:0,
		selStyle:'moiveList-sel'
	},		
	102:{
		ele:moveList,
		paras:moiveMoveParas,
		currentIndex:0,
		selStyle:'moiveList-sel'
	},
	103:{
		ele:fun,
		paras:funMoveParas,
		currentIndex:0,
		selStyle:'fun-sel'
	},
	'current':100
}

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
	if(nextEle==-1){
		return false;
	}
	if(area.current == 102){
		movielistblur();
	}
	if(nextEle == 100){
		var ele = area[100].ele[area[100].currentIndex];
		fnRemoveEleClass(ele,'choose-nosel');
	}
	if(nextEle>=100){
		area.current=nextEle;
		nextEle=current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 102){
		movielistfocus();
	}
			
}

pageControl.moveRight = function(){	
	var nextEle = fnGetNextEleIndex('right');
	if(nextEle == -1){
		return false;
	}
	if(area.current == 102){
		movielistblur();
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	if(area.current == 100){
		fnAddEleClass(current.ele,'choose-nosel');
		//current.ele.style.color = '#65c7ff';
	}
	//跨区
	if(nextEle>=100){
		area.current=nextEle;
		nextEle=current.index;
	}
	
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 102){
		movielistfocus();
	}	
}

pageControl.moveUp = function(){
	var nextEle = fnGetNextEleIndex('up');
	if(area.current == 102 && nextEle == -1){
		if(iTitle == 1 && area[100].currentIndex == 0){
			if(moveList.length > 10){
				if(usecount <= 15){
					usecount = 0;
					moviedata();
				}else{
					usecount = usecount - 20
					moviedata();
				}
			}else{
				if(usecount <= 15){
					usecount = 0;
					moviedata();
				}else{
					usecount = usecount - 10 - moveList.length;
					moviedata();
				}
			}
		}else{
			if(moveList.length > 10){
				if(usecount > 10){
					usecount = usecount - 20;
					moviedata();
				}
			}else{
				if(usecount > 10){
					usecount = usecount - 10 - moveList.length;
					moviedata();
				}
			}				
		}	
	}
	
	if(nextEle == -1){
		return false;
	}
	if(area.current == 102){
		movielistblur();
	}
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 102){
		movielistfocus();
	}	
	if(area.current == 100){
		getpageid = 1;
		usecount = 0;
		movecount = 0;
		loadProgramJS();
	}
}
pageControl.moveDown=function(){
	var nextEle = fnGetNextEleIndex('down');
	if(area.current == 102 && nextEle > 9 && nextEle < 100){
		current.area.currentIndex = 0;
		movecount = movecount + 1;
		moviedata();	
		return;
	}
	if(area.current == 102 && usecount == 5 && nextEle > 4 && nextEle < 100){
		current.area.currentIndex = 0;
		movecount = movecount + 1;
		moviedata();	
		return;
	}
	if(nextEle == -1){
		return false;
	}
	if(area.current == 102){
		movielistblur();
	}
	if(nextEle >= 100){
		area.current = nextEle;
		nextEle = current.index;
	}
		
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 102){
		movielistfocus();
	}
	if(area.current == 100){
		getpageid = 1;
		usecount = 0;
		movecount = 0;		
		loadProgramJS();
	}	
}
pageControl.ok=function(){
	var url = baseurl;
	var index = parseInt(area[area.current].currentIndex, 10);
	var moviecount = moveList.length;
	var seriesflag = '';
	if(area.current == 102 && index < 10){
		var code = '';
		if(usecount <= 5 || (usecount <= 10 && iTitle != 1)){
			seriesflag = contentListJosnArr[index].seriesflag;
			code = contentListJosnArr[index].code;
			usecount = 0;
		}else{
			if(moviecount > 10){
				seriesflag = contentListJosnArr[usecount - 10 + index].seriesflag;
				code = contentListJosnArr[usecount - 10 + index].code;	
				usecount = usecount - 10;
			}else{
				seriesflag = contentListJosnArr[usecount - moviecount + index].seriesflag;
				code = contentListJosnArr[usecount - moviecount + index].code;
				usecount = usecount - moviecount;
			}
			
		}
		var categoryposition = area[100].currentIndex;
		var temptoken = getCookieByunescape('temptoken');
		var userid = getuserid();
		if(seriesflag == '0'){
			url = url + "movieDet2.html?category_id=" + categoryListJsonArr[categoryposition].primaryid + "&code=" + code + "&temptoken=" + temptoken + "&userid=" + userid;
		}else{
			var subcategory_id = '' + categoryListJsonArr[categoryposition].primaryid;
			subcategory_id = subcategory_id.substring(0, 4);
			if(subcategory_id == '1003'){
				url = url + "movieDet3.html?category_id=" + categoryListJsonArr[categoryposition].primaryid + "&code=" + code + "&temptoken=" + temptoken + "&userid=" + userid;
			}else{
				url = url + "movieDet.html?category_id=" + categoryListJsonArr[categoryposition].primaryid + "&code=" + code + "&temptoken=" + temptoken + "&userid=" + userid;
			}
			
		}
		var cururl = baseurl + "movieList.html?area=" + area.current + "&index=" + current.index + "&category_id=" + category_id + "&categoryindex=" + area[100].currentIndex + "&getpageid=" + getpageid + "&usecount=" + usecount + "&moviecount=" + moviecount + "&iTitle=" + iTitle;
		setpageurl(cururl);
		window.location=url;
	}
	
	if(area.current == 101){
		var cururl = "movieList.html?area=" + area.current + "&index=" + current.index + "&category_id=" + category_id + "&categoryindex=" + area[100].currentIndex + "&iTitle=" + iTitle;
		setpageurl(cururl);
		var url = recListLiMoveParas[current.index].url;
		window.location=url;
	}
	if(area.current == 103){
		var cururl = "movieList.html?area=" + area.current + "&index=" + current.index + "&category_id=" + category_id + "&categoryindex=" + area[100].currentIndex + "&iTitle=" + iTitle;
		setpageurl(cururl);	
		var url = baseurl + "search.html";
		window.location=url;
	}
}

var contentjson;
var iTitle = 1;
var category_id = '';
var backflag = false;
var backflag1 = false;
var backflag2 = false;
var onloadflag = false;
var baseurl = '';
window.onload=function(){
	baseurl = '' + location;
	baseurl = baseurl.substring(0, baseurl.indexOf('movieList.html'));
	
	var areaFrom=fnGetQueryStringByName('area');
	var indexFrom=fnGetQueryStringByName('index');
	var categoryindex=fnGetQueryStringByName('categoryindex');
	if(fnGetQueryStringByName('getpageid') != ''){
		backflag = true;
		getpageid = parseInt(fnGetQueryStringByName('getpageid'), 10);
	}
	if(fnGetQueryStringByName('temppagenum') != ''){
		temppagenum = parseInt(fnGetQueryStringByName('temppagenum'), 10);
	}
	if(fnGetQueryStringByName('usecount') != ''){
		usecount = parseInt(fnGetQueryStringByName('usecount'), 10);
	}	
	var moviecount = fnGetQueryStringByName('moviecount');
	if(moviecount != ''){
		moviecount = parseInt(moviecount, 10);
	}
	
	if(areaFrom!=''&& indexFrom!=''){
		area.current=parseInt(areaFrom, 10);
		area[area.current].currentIndex=parseInt(indexFrom, 10);
	}
	if(categoryindex != ''){
		area[100].currentIndex = parseInt(categoryindex,10);
	}
	adinit();
	iTitle = fnGetQueryStringByName('iTitle'); //用于标题切换
	if(iTitle == ''){
		iTitle = 1;
	}
	//切换标题
	if(iTitle == 1){
		document.getElementById('title').innerHTML = '<img src="img/movielist/tit_1.png">';
		}
	else if(iTitle == 2){
		funMoveParas[0].right = 102;
		document.getElementById('title').innerHTML = '<img src="img/movielist/tit_2.png">';
		}
	else if(iTitle == 3){
		funMoveParas[0].right = 102;
		document.getElementById('title').innerHTML = '<img src="img/movielist/tit_3.png">';
		}	
	else if(iTitle == 4){
		funMoveParas[0].right = 102;
		document.getElementById('title').innerHTML = '<img src="img/movielist/tit_4.png">';
		}	
	else if(iTitle == 5){
		funMoveParas[0].right = 102;
		document.getElementById('title').innerHTML = '<img src="img/movielist/tit_5.png">';
		}
	//datainit();
	category_id = fnGetQueryStringByName('category_id');
	var jsurl = getJSPath(category_id, 1);
	jsurl = jsurl + 'C' + category_id + '.js';
	loadJS(jsurl);
}
function htmlinit(){
	var categoryindex=fnGetQueryStringByName('categoryindex');
	if(categoryindex != ''){
		area[100].currentIndex = categoryindex;
		fnAddEleClass(area[100].ele[categoryindex],'choose-nosel');
		//fnAddEleClass(area[100].ele[categoryindex],area[100].selStyle);
	}	
	//找到获取焦点元素
	fnSetCurrent();
	//添加样式
	fnAddEleClass(current.ele,current.area.selStyle);	
}
var categoryListJsonArr;
function CategoryListCallback(jsonarr){
	categoryListJsonArr = jsonarr;
	datainit();
	var categoryindex=fnGetQueryStringByName('categoryindex');
	var categoryId = '';
	if(categoryindex && categoryindex != ''){
		categoryId = categoryListJsonArr[categoryindex].primaryid
	}else{
		categoryId = categoryListJsonArr[0].primaryid
	}
	var jsurl = getJSPath(categoryId, 2);
	jsurl = jsurl + 'P' + categoryId + '.js';
	loadJS(jsurl);
}
function loadProgramJS(){
	var categoryId = categoryListJsonArr[current.index].primaryid;
	var jsurl = getJSPath(categoryId, 2);
	jsurl = jsurl + 'P' + categoryId + '.js';
	loadJS(jsurl);
}

var contentListJosnArr;
function ContentListCallback(jsonarr){
	contentListJosnArr = jsonarr;
	moviedata();
	if(!onloadflag){
		htmlinit();
		onloadflag = true;
	}
	
}

function setchooseMoveParas(){
	chooseMoveParas = [];
	var choosePara = {};
	var up = -1;
	var right = -1;
	var down = -1;
	var left = -1;
	
	var catecount = categoryListJsonArr.length;
	var i = 0;
	for(i = 0; i < catecount; i++){
		choosePara = {};
		if(i == 0){
			up = 103;
			right = 101;
		}else{
			up = i - 1;
			right = 102;
		}
		
		if((i + 1) < catecount){
			down = i + 1;
		}else{
			down = -1;
		}
		
		left = -1;
		
		choosePara.up = up;
		choosePara.down = down;
		choosePara.right = right;
		choosePara.left = left;
		chooseMoveParas[i] = choosePara;
	}
	area[100].paras = chooseMoveParas;
	chooseLi = document.getElementsByClassName('chooseLI');
	area[100].ele = chooseLi;
}

function setmoiveMoveParas(){
	var moviePara = {};
	var up = -1;
	var right = -1;
	var down = -1;
	var left = -1;
	moveList = document.getElementsByClassName('moveListLi');
	moiveMoveParas = [];
	var count = moveList.length;
	for(var i = 0; i < count; i++){
		 moviePara = {};
		if(i < 5 && getpageid == 1 && usecount == 5){
			up = 101;
		}else{
			if(i < 5){
				up = -1;
			}else{
				up = i - 5;
			}
		}
		
		if((i + 5) < count){
			down = i + 5;
		}else{
			down = -1;
		}
		
		if(i == 0 || i == 5){
			left = 100;
		}else{
			left = i - 1;
		}
		
		if(i == 4 || i == 9){
			right = -1;
		}else{
			if((i + 1) < count){
				right = i + 1;
			}else{
				right = -1;
			}
			
		}
		
		moviePara.up = up;
		moviePara.down = down;
		moviePara.left = left;
		moviePara.right = right;
		moiveMoveParas[i] = moviePara;
	}
	area[102].paras = moiveMoveParas;
	area[102].ele = moveList;
}

function adinit(){
	loadAdConfingJSONData(addatas,'','','',getData);
	setTimer(addatas,'','','',getData);
}

function movielistfocus(){
	//var name = tuijianlist[current.index].name;
	var name = current.ele.getElementsByTagName("span")[0].innerHTML;
	var len = getStrLength(name);
	if(len > 14){
		//  behavior="alternate" direction="left"
		var marq = '<marquee scrollamount="4">' +  name + '</marquee>';
		current.ele.getElementsByTagName("span")[0].innerHTML = marq;
	}
}

function movielistblur(){
	//var len = getStrLength(name);
	if(current.ele.getElementsByTagName("marquee")[0]){
		var name = current.ele.getElementsByTagName("marquee")[0].innerHTML;
		current.ele.getElementsByTagName("span")[0].innerHTML = name;
	}
}