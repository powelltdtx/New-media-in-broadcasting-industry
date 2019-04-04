var keyBordTags= document.getElementsByClassName('keyBord');
var picListTags= document.getElementsByClassName('picList');
var resultTags = document.getElementsByClassName('result');
var navTags = document.getElementsByClassName('nav');
var resultListTags = document.getElementsByClassName('resultList');

var keyBordMoveParas = [
	{up:-1,right:1,down:5,left:-1},
	{up:-1,right:2,down:6,left:0},
	{up:-1,right:3,down:7,left:1},
	{up:-1,right:4,down:8,left:2},
	{up:-1,right:101,down:9,left:3},
	
	{up:0,right:6,down:10,left:-1},
	{up:1,right:7,down:11,left:5},
	{up:2,right:8,down:12,left:6},
	{up:3,right:9,down:13,left:7},
	{up:4,right:101,down:14,left:8},
	
	{up:5,right:11,down:15,left:-1},
	{up:6,right:12,down:16,left:10},
	{up:7,right:13,down:17,left:11},
	{up:8,right:14,down:18,left:12},
	{up:9,right:101,down:19,left:13},
	
	{up:10,right:16,down:20,left:-1},
	{up:11,right:17,down:21,left:15},
	{up:12,right:18,down:22,left:16},
	{up:13,right:19,down:23,left:17},
	{up:14,right:101,down:24,left:18},
	
	{up:15,right:21,down:25,left:-1},
	{up:16,right:22,down:26,left:20},
	{up:17,right:23,down:27,left:21},
	{up:18,right:24,down:28,left:22},
	{up:19,right:101,down:25,left:23},
	
	{up:20,right:26,down:-1,left:-1},
	{up:21,right:27,down:-1,left:25},
	{up:22,right:28,down:-1,left:26},
	{up:23,right:101,down:-1,left:27}
];
var tochar = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

var picListMoveParas=[
	{up:-1,right:1,down:102,left:100},
	{up:-1,right:2,down:102,left:0},
	{up:-1,right:3,down:102,left:1},
	{up:-1,right:-1,down:102,left:2}
];

var resultMoveParas=[
	{up:101,right:1,down:2,left:100},
	{up:101,right:-1,down:3,left:0},
	{up:0,right:3,down:4,left:100},
	{up:1,right:-1,down:5,left:2},
	{up:2,right:5,down:-1,left:100},
	{up:3,right:-1,down:-1,left:4}
];

var navMoveParas=[
    {up:-1,right:1,down:104,left:100},
    {up:-1,right:2,down:104,left:0},
    {up:-1,right:3,down:104,left:1},
    {up:-1,right:-1,down:104,left:2}
];
var resultListMoveParas=[
    {up:-1,right:-1,down:-1,left:-1}
];
var area = {
	100:{
		ele:keyBordTags,
		paras:keyBordMoveParas,
		currentIndex:0,
		selStyle:'keyBordSel'
	},
	101:{
		ele:picListTags,
		paras:picListMoveParas,
		currentIndex:0,
		selStyle:'picListSel'
	},
	102:{
		ele:resultTags,
		paras:resultMoveParas,
		currentIndex:0,
		selStyle:'resultSel'
	},
	103:{
		ele:navTags,
		paras:navMoveParas,
		currentIndex:0,
		selStyle:'navSel'
	},
	104:{
		ele:resultListTags,
		paras:resultListMoveParas,
		currentIndex:0,
		selStyle:'resultListSel'
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
	if(area.current == 103){
		pageid = 1;
		var str = $('inputword').innerHTML;
		var url = "search.jsp?keyword=" + str.toLowerCase() + "&pageindex=1&pagecount=8&flag=" + (area[103].currentIndex + 1);
		dataFrame.location.href = url;
	}
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
	if(area.current == 103){
		pageid = 1;
		var str = $('inputword').innerHTML;
		var url = "search.jsp?keyword=" + str.toLowerCase() + "&pageindex=1&pagecount=8&flag=" + (area[103].currentIndex + 1);
		dataFrame.location.href = url;
	}
}

pageControl.moveUp = function(){
	var nextEle = fnGetNextEleIndex('up');
	if(nextEle == -1){
		return false;
	}
	if(nextEle>=100){
		if(area.current == 104){
			if(pageid > 1){
				pageid = pageid - 1;
				var str = $('inputword').innerHTML;
				var url = "search.jsp?keyword=" + str.toLowerCase() + "&pageindex=" + pageid + "&pagecount=8&flag=" + (area[103].currentIndex + 1);
				dataFrame.location.href = url;
				return false;
			}
		}
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
		if(area.current == 104){
			var count = searchResultJSON.count;
			
			if((pageid * 8) < count){
				pageid = pageid + 1;
				var str = $('inputword').innerHTML;
				var url = "search.jsp?keyword=" + str.toLowerCase() + "&pageindex=" + pageid + "&pagecount=8&flag=" + (area[103].currentIndex + 1);
				dataFrame.location.href = url;
			}
		}
		return false;
	}
	if(area.current != 103){
		fnRemoveEleClass(current.ele,current.area.selStyle);
	}
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
}


pageControl.ok=function(){
	if(area.current == 100){
		if(current.index < 26){
			$('inputword').innerHTML = $('inputword').innerHTML + tochar[current.index];
			var str = $('inputword').innerHTML;
			var url = "search.jsp?keyword=" + str.toLowerCase() + "&pageindex=1&pagecount=8&flag=1";
		 	pageid = 1;
			dataFrame.location.href = url;
			fnRemoveEleClass(area[103].ele[area[103].currentIndex],area[103].selStyle);
			area[103].currentIndex = 0;
			fnAddEleClass(area[103].ele[0],area[103].selStyle);
		}else{
			if(current.index == 27){
				var word = $('inputword').innerHTML;
				if(word.length > 0){
					word = word.substring(0, word.length - 1);
				}
				$('inputword').innerHTML = word;
				if(word.length > 0){
					var url = "search.jsp?keyword=" + word.toLowerCase() + "&pageindex=1&pagecount=8&flag=1";
					pageid = 1;
					dataFrame.location.href = url;
					fnRemoveEleClass(area[103].ele[area[103].currentIndex],area[103].selStyle);
					area[103].currentIndex = 0;
					fnAddEleClass(area[103].ele[0],area[103].selStyle);
				}else{
					fnRemoveEleClass(area[103].ele[area[103].currentIndex],area[103].selStyle);
					area[103].currentIndex = 0;
					fnAddEleClass(area[103].ele[0],area[103].selStyle);
					$('inputword').innerHTML = '';
					$('resultsearch').innerHTML = '';
					$('jieguo1').style.display = 'block';
					$('jieguo2').style.display = 'none';
					pageid = 1;
					pagecount = 0;
					setnavMoveParas();
					setkeyBordMoveParas();
				}
			}else if(current.index == 28){
				fnRemoveEleClass(area[103].ele[area[103].currentIndex],area[103].selStyle);
				area[103].currentIndex = 0;
				fnAddEleClass(area[103].ele[0],area[103].selStyle);
				$('inputword').innerHTML = '';
				$('resultsearch').innerHTML = '';
				$('jieguo1').style.display = 'block';
				$('jieguo2').style.display = 'none';
				pageid = 1;
				pagecount = 0;
				setnavMoveParas();
				setkeyBordMoveParas();
			}
		}
	}
	if(area.current == 104){
		var category_id = searchResultJSON.result[current.index].category_id;
		var code = searchResultJSON.result[current.index].code;
		var url = '';
		if(category_id.indexOf(config_moviebasecategoryid) == 0){
			url = "movieDetail.html?category_id=" + category_id + "&code=" + code;
		}else{
			var strarr = config_seriesbasecategoryid.split(",");
			for(var i = 0; i < strarr.length; i++){
				if(category_id.indexOf(strarr[i]) == 0){
					url = "seriesDetail.html?category_id=" + category_id + "&code=" + code;
				}
			}
			if(url == ''){
				url = "varietyDetail.html?category_id=" + category_id + "&code=" + code;
			}
		}
		var cururl = '' + location;
		if (cururl.indexOf("?area=") > 0) {
			cururl = cururl.substring(0, cururl.indexOf("?area="));
		}
		cururl = cururl + "?area=" + area.current + "&index="
				+ current.index;
		setpageurl(cururl);
		window.location=url;
	}
}

window.onload=function(){
	
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
var pageid = 1;
pagecount = 0;
var searchResultJSON;
function dataLoad(json){
	pagecount = 0;
	searchResultJSON = json;
	var resultJSONArr = json.result;
	var length = json.result.length;
	var strhtml = '';
	if(length > 0){
		var i = 0;
		for(i = 0; i < length; i++){
			strhtml = strhtml + '<div class="resultList"><div class="resultListName">' + resultJSONArr[i].name + '</div><img src="' + resultJSONArr[i].fileurl + '" width="174" height="254" /></div>';
		}
		pagecount = i;
	}
	$('resultsearch').innerHTML = strhtml;
	$('jieguo1').style.display = 'none';
	$('jieguo2').style.display = 'block';
	setresultListMoveParas();
	setkeyBordMoveParas();
	setnavMoveParas();
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
}

function setresultListMoveParas(){
	resultListMoveParas = [];
	var resultListMovePara = {};
	var up = -1;
	var right = -1;
	var down = -1;
	var left = -1;
	for(var i = 0; i < pagecount; i++){
		resultListMovePara = {};
		if(i == 0 || i == 4){
			left = 100;
		}else{
			left = i - 1;
		}
		if(i == 3 || i == 7){
			right = -1;
		}else{
			if((i+1) < pagecount){
				right = i + 1;
			}else{
				right = -1;
			}
		}
		if(i < 4){
			up = 103;
		}else{
			up = i - 4;
		}
		if(i > 3){
			down = -1;
		}else{
			if((i + 4) < pagecount){
				down = i + 4;
			}else{
				if(pagecount > 4){
					down = pagecount - 1;
				}
			}
		}
		resultListMovePara.left = left;
		resultListMovePara.right = right;
		resultListMovePara.up = up;
		resultListMovePara.down = down;
		resultListMoveParas[i] = resultListMovePara;
	}
	area[104].paras = resultListMoveParas;
	resultListTags = document.getElementsByClassName('resultList');
	area[104].ele = resultListTags;	
	area[104].currentIndex = 0;
}

function setnavMoveParas(){
	if(pagecount > 0){
		navMoveParas[0].down = 104;
		navMoveParas[1].down = 104;
		navMoveParas[2].down = 104;
		navMoveParas[3].down = 104;	
	}else{
		navMoveParas[0].down = 104;
		navMoveParas[1].down = 104;
		navMoveParas[2].down = 104;
		navMoveParas[3].down = 104;
	}
	area[103].paras = navMoveParas;
}

function setkeyBordMoveParas(){
	if(pagecount > 0){
		keyBordMoveParas[4].right = 104;
		keyBordMoveParas[9].right = 104;
		keyBordMoveParas[14].right = 104;
		keyBordMoveParas[19].right = 104;
		keyBordMoveParas[24].right = 104;
		keyBordMoveParas[28].right = 104;		
	}else{
		var str = $('inputword').innerHTML;
		if(str.length == 0){
			keyBordMoveParas[4].right = 101;
			keyBordMoveParas[9].right = 101;
			keyBordMoveParas[14].right = 101;
			keyBordMoveParas[19].right = 101;
			keyBordMoveParas[24].right = 102;
			keyBordMoveParas[28].right = 102;			
		}else{
			keyBordMoveParas[4].right = -1;
			keyBordMoveParas[9].right = -1;
			keyBordMoveParas[14].right = -1;
			keyBordMoveParas[19].right = -1;
			keyBordMoveParas[24].right = -1;
			keyBordMoveParas[28].right = -1;			
		}
		area[100].paras = keyBordMoveParas;
	}
	
}



