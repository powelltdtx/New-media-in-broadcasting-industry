var programs= document.getElementsByClassName('movie');
var programMoveParas = [
	{up:-1,right:1,down:5,left:-1},
	{up:-1,right:2,down:6,left:0},
	{up:-1,right:3,down:7,left:1},
	{up:-1,right:4,down:8,left:2},
	{up:-1,right:-1,down:9,left:3},
	
	{up:0,right:6,down:-1,left:-1},
	{up:1,right:7,down:-1,left:5},
	{up:2,right:8,down:-1,left:6},
	{up:3,right:9,down:-1,left:7},
	{up:4,right:-1,down:-1,left:8}
];

var area = {
	100:{
		ele:programs,
		paras:programMoveParas,
		currentIndex:0,
		selStyle:'movieSel'
	},
	'current':100
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

pageControl.moveLeft = function(){
	var nextEle = fnGetNextEleIndex('left');
	if(nextEle == -1){
		return false;
	}
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
}

pageControl.moveRight = function(){
	var nextEle = fnGetNextEleIndex('right');
	if(nextEle == -1){
		return false;
	}
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
	
}

pageControl.moveUp = function(){
	var nextEle = fnGetNextEleIndex('up');
	if(nextEle == -1){
		uppage();
		return false;
	}
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
} 

pageControl.moveDown = function(){
	var nextEle = fnGetNextEleIndex('down');
	if(nextEle == -1){
		nextpage();
		return false;
	}
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
}

pageControl.ok=function(){
	if(area.current == 100 && pagecount > 0){
		var cururl = '' + location;
		if(cururl.indexOf("&area=") > 0) {
			cururl = cururl.substring(0, cururl.indexOf("&area="));
		}
		cururl = cururl + "&area=" + area.current + "&index=" + current.index + "&pageid=" + pageid; 
		setpageurl(cururl);
		
		var index = (pageid - 1) * 10;
		index = index + current.index;
		var seriesflag = searchResultJSON.result[index].seriesflag;
		var code = searchResultJSON.result[index].code;
		var category_id = searchResultJSON.result[index].category_id;
		var url = baseurl;
		if(seriesflag == '0'){
			url = url + "movieDet2.html?category_id=" + category_id + "&code=" + code;
		}else{
			var subcategory_id = '' + categoryListJsonArr[categoryposition].primaryid;
			subcategory_id = subcategory_id.substring(0, 4);
			if(subcategory_id == '1002'){
				url = url + "movieDet.html?category_id=" + category_id + "&code=" + code;
			}else{
				url = url + "movieDet3.html?category_id=" + category_id + "&code=" + code;
			}
			
		}
		window.location=url;
	}
}

var baseurl = '';
var pageid = 1;
window.onload=function(){
	baseurl = '' + location;
	baseurl = baseurl.substring(0, baseurl.indexOf('person_movieList.html'));
	var pageidFrom = fnGetQueryStringByName('pageid');
	if(pageidFrom != ''){
		pageid = parseInt(pageidFrom, 10);
	}
	var name = fnGetQueryStringByName('name');
	document.getElementsByClassName("actorName")[0].innerHTML = '' + name;
	var url = baseurl + "search.jsp?keyword=" + name + "&pageindex=1&pagecount=5000&flag=1";
	dataFrame.location.href = url;
	
	var areaFrom=fnGetQueryStringByName('area');
	var indexFrom=fnGetQueryStringByName('index');
	if(areaFrom!=''&&indexFrom!=''&&area[areaFrom].ele[indexFrom]){
		area.current=areaFrom;
		area[area.current].currentIndex=indexFrom;
	}
}
var searchResultJSON
var pagecount = 0;
function dataLoad(json){
	pagecount = 0;
	searchResultJSON = json;
	var resultJSONArr = searchResultJSON.result;
	var length = resultJSONArr.length;
	if(length > 0){
		var i = (pageid - 1) * 10;
		if(i >= length){
			i = 0;
		}
		pagecount = 0;
		for(; i < length && pagecount <= 10; i++){
			programs[pagecount].style.display = "inline-block";
			programs[pagecount].getElementsByTagName("div")[0].innerHTML = resultJSONArr[pagecount].category_name + ':' + resultJSONArr[pagecount].name;
			programs[pagecount].getElementsByTagName("img")[0].src = resultJSONArr[pagecount].fileurl
			pagecount++;
		}
		for(var j = pagecount; j < 10; j++){
			programs[j].style.display = "none";
		}
		setprogramMoveParas();
		fnSetCurrent();
		fnAddEleClass(current.ele,current.area.selStyle);
	}

}
function nextpage(){
	var resultJSONArr = searchResultJSON.result;
	var length = resultJSONArr.length;
	if((pageid*10) < length){
		var i = pageid * 10;
		pagecount = 0;
		for(; i < length && pagecount <= 10; i++){
			programs[pagecount].style.display = "inline-block";
			programs[pagecount].getElementsByTagName("div")[0].innerHTML = resultJSONArr[pagecount].category_name + ':' + resultJSONArr[pagecount].name;
			programs[pagecount].getElementsByTagName("img")[0].src = resultJSONArr[pagecount].fileurl
			pagecount++;
		}
		for(var j = pagecount; j < 10; j++){
			programs[j].style.display = "none";
		}
		setprogramMoveParas();
		fnRemoveEleClass(current.ele,current.area.selStyle);
		area[100].currentIndex = 0;
		fnSetCurrent();
		fnAddEleClass(current.ele,current.area.selStyle);
		pageid = pageid + 1;
	}	
}

function uppage(){
	var resultJSONArr = searchResultJSON.result;
	var length = resultJSONArr.length;
	if(pageid > 1){
		var i = (pageid - 2) * 10;
		pagecount = 0;
		for(; i < length && pagecount <= 10; i++){
			programs[pagecount].style.display = "inline-block";
			programs[pagecount].getElementsByTagName("div")[0].innerHTML = resultJSONArr[pagecount].category_name + ':' + resultJSONArr[pagecount].name;
			programs[pagecount].getElementsByTagName("img")[0].src = resultJSONArr[pagecount].fileurl
			pagecount++;
		}
		for(var j = pagecount; j < 10; j++){
			programs[j].style.display = "none";
		}
		setprogramMoveParas();
		fnRemoveEleClass(current.ele,current.area.selStyle);
		area[100].currentIndex = 0;
		fnSetCurrent();
		fnAddEleClass(current.ele,current.area.selStyle);
		pageid = pageid - 1;
	}		
}

function setprogramMoveParas(){
	programMoveParas = [];
	programMovePara = {};
	var left  = -1;
	var right = -1;
	var up = -1;
	var down = -1;
	for(var i = 0; i < pagecount; i++){
		programMovePara = {};
		if(i == 0 || i == 5){
			left = -1;
		}else{
			left = i - 1;
		}
		if(i == 4 || i == 9 || (i + 1) == pagecount){
			right = -1;
		}else{
			right = i + 1;
		}
		if(i < 5){
			up = -1;
		}else{
			up = i -5;
		}
		if((i + 5) < pagecount){
			down = i + 5;
		}else{
			if(i < 5 && pagecount > 5){
				down = pagecount - 1;
			}else{
				down = -1;
			}
		}
		programMovePara.left = left;
		programMovePara.right = right;
		programMovePara.up = up;
		programMovePara.down = down;
		programMoveParas[i] = programMovePara;
	}
	area[100].paras = programMoveParas;	
}

