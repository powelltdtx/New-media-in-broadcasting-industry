var programs= document.getElementsByClassName('program');
var nav = document.getElementsByClassName('nav');

var maskborder = document.getElementsByClassName('maskborder')[0];

var programMoveParas = [
	{up:-1,right:1,down:5,left:-1,url:''},
	{up:-1,right:2,down:6,left:0,url:''},
	{up:-1,right:3,down:6,left:1,url:''},
	{up:-1,right:4,down:9,left:2,url:''},
	{up:-1,right:11,down:9,left:3,url:''},
	{up:0,right:30,down:14,left:-1,url:'search.html'},
	{up:1,right:9,down:7,left:30,url:'myplay.jsp?pcode=57126&name=生化危机:终章'},
	{up:6,right:10,down:8,left:30,url:'myplay.jsp?pcode=72475&name=长城 '},
	{up:7,right:10,down:16,left:30,url:'myplay.jsp?pcode=69271&name=喜欢你'},
	{up:3,right:11,down:10,left:6,url:'movieList.html?category_id=1006&iTitle=5'},
	{up:9,right:11,down:17,left:8,url:'Recom.jsp'},
	{up:-1,right:12,down:19,left:4,url:''},
	{up:-1,right:-1,down:13,left:11,url:''},
	{up:12,right:-1,down:21,left:11,url:''},
	{up:5,right:15,down:22,left:-1,url:'TOPIC/specialMV.html?topic_id=76'},
	{up:5,right:16,down:23,left:14,url:''},
	{up:8,right:17,down:24,left:15,url:'movieList.html?category_id=1002&iTitle=2'},
	{up:8,right:18,down:25,left:16,url:'movieList.html?category_id=1001&iTitle=1'},
	{up:10,right:19,down:26,left:17,url:'joyu/dongshi_shaoer/home/home/home.html'},
	{up:11,right:20,down:27,left:18,url:'movieList.html?category_id=1003&iTitle=3'},
	{up:11,right:21,down:28,left:19,url:'movieList.html?category_id=1004&iTitle=4'},
	{up:13,right:-1,down:29,left:20,url:'TOPIC/child.html?topic_id=77'},
	{up:14,right:23,down:-1,left:-1,url:'TOPIC/movieReview.html?topic_id=78'},
	{up:15,right:24,down:-1,left:22,url:'news.html?category_id=1099001001'},
	{up:16,right:25,down:-1,left:23,url:'http://117.71.25.110:8087/index/anhuigd/entrance?app=SPORT'},
	{up:17,right:26,down:-1,left:24,url:'http://117.71.25.104:81/bytuetechAPI/jsp/geeyazone/Gaming/index_sub.jsp'},
	{up:18,right:27,down:-1,left:25,url:'fashion.jsp'},
	{up:19,right:28,down:-1,left:26,url:'http://117.71.25.110:8081/enter/2'},
	{up:20,right:29,down:-1,left:27,url:'hui_good.html'},
	{up:21,right:-1,down:-1,left:28,url:'http://117.71.34.74:52303/imutv-epg/hd/index_karaoke.jsp?source=hd_activity_gcw'},
	{up:1,right:6,down:15,left:5,url:'history.jsp'}
];


var area = {
	100:{
        ele:programs,
        paras:programMoveParas,
        currentIndex:0,
        selStyle:'nav-sel'
    },
	'current':100
}

var timer;
var tabindex = 0;
var direction = 0;
function setTabImg(){
	if(direction == 1){
		programs[tabindex + 1].getElementsByTagName('img')[0].style.opacity = 0.3;
	}else{
		programs[tabindex - 1].getElementsByTagName('img')[0].style.opacity = 0.3;
	}
	var ele = programs[tabindex];
	ele.getElementsByTagName('img')[0].style.opacity = 1;
	document.getElementById("img_center").src = ele.getElementsByTagName('img')[0].src;
	if(direction == 0){
		if(tabindex == 4){
			direction = 1;
		}else{
			tabindex = tabindex + 1;
		}
	}
	if(direction == 1){
		if(tabindex == 0){
			direction = 0;
			tabindex = tabindex + 1;
		}else{
			tabindex = tabindex - 1;
		}
		
	}
	
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

function recentWatchFocus(){
    //var name = tuijianlist[current.index].name;
    var name = current.ele.innerHTML;
    var len = getStrLength(name);
    if(len > 10){
        //  behavior="alternate" direction="left"
        var marq = '<marquee scrollamount="4">' +  name + '</marquee>';
        current.ele.innerHTML = marq;
    }
}
function recentWatchBlur() {
    if(current.ele.getElementsByTagName("marquee")[0]){
        var name = current.ele.getElementsByTagName("marquee")[0].innerHTML;
        current.ele.innerHTML = name;
    }
}
pageControl.moveLeft = function(){
	var nextEle = fnGetNextEleIndex('left');
	if(nextEle == -1){
		return false;
	}
    if(area.current == '100' && (current.index == 6 || current.index == 7 || current.index ==8)){
        recentWatchBlur();
    };
	fnRemoveEleClass(current.ele,current.area.selStyle);
	if(current.index < 5){
		current.ele.getElementsByTagName('img')[0].style.opacity = 0.3;
	}	
	if(nextEle< 5 && area.current == '100'){
		if(nextEle == 4){
			maskborder.style.display = "block";
			timer = clearInterval(timer);
			nextEle = tabindex;
			//programs[tabindex].getElementsByTagName('img')[0].style.opacity = 0.3;
			if(programs[tabindex].getElementsByTagName('img')[0].style.opacity != 1){
				if(direction == 1){
					tabindex = tabindex + 1;
				}else{
					tabindex = tabindex - 1;
				}
				nextEle = tabindex;
			}else{
				nextEle = tabindex;
			}
		}
		current.area.currentIndex = nextEle;
		fnSetCurrent();
		maskborder.style.left = (current.ele.offsetLeft-15)+'px';
		current.ele.getElementsByTagName('img')[0].style.opacity = 1;
		document.getElementById("img_center").src=current.ele.getElementsByTagName('img')[0].src;
		return;
	}
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);

    if(area.current == '100' && (current.index == 6 || current.index == 7 || current.index ==8)){
        recentWatchFocus();
    };
}


pageControl.moveRight = function(){
	var nextEle = fnGetNextEleIndex('right');
	if(nextEle == -1){
		return false;
	}
    if(area.current == '100' && (current.index == 6 || current.index == 7 || current.index ==8)){
        recentWatchBlur();
    };
	if(current.index < 4){
		current.ele.getElementsByTagName('img')[0].style.opacity = 0.3;
	}
	if(current.index == 4){
		direction = 1;
		tabindex = 3;
		if(!timer){
			maskborder.style.display = "none";
			timer = setInterval("setTabImg()", 2000);	
		}
	}
	if(nextEle<=4 && area.current == '100'){
		current.area.currentIndex = nextEle;
		fnSetCurrent();
		current.ele.getElementsByTagName('img')[0].style.opacity = 1;
		maskborder.style.left = (current.ele.offsetLeft-15)+'px';
		document.getElementById("img_center").src=current.ele.getElementsByTagName('img')[0].src;
	}
	else {
		fnRemoveEleClass(current.ele,current.area.selStyle);
		current.area.currentIndex = nextEle;
		fnSetCurrent();
		fnAddEleClass(current.ele,current.area.selStyle);
	}

    if(area.current == '100' && (current.index == 6 || current.index == 7 || current.index ==8)){
        recentWatchFocus();
    };
}

pageControl.moveUp = function(){
	var nextEle = fnGetNextEleIndex('up');
	if(nextEle == -1){
		return false;
	}
    if(area.current == '100' && (current.index == 6 || current.index == 7 || current.index ==8)){
        recentWatchBlur();
    };
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	
	if(area.current == '100' && (current.index == 5 ||current.index == 6 || current.index == 9 || current.index == 30)){
		maskborder.style.display = "block";
		timer = clearInterval(timer);
		fnRemoveEleClass(current.ele,current.area.selStyle);
		if(programs[tabindex].getElementsByTagName('img')[0].style.opacity != 1){
			if(direction == 1){
				tabindex = tabindex + 1;
			}else{
				tabindex = tabindex - 1;
			}
		}
		current.area.currentIndex = tabindex;
		fnSetCurrent();
		maskborder.style.left = (current.ele.offsetLeft-15)+'px'
		current.ele.getElementsByTagName('img')[0].style.opacity = 1;
		document.getElementById("img_center").src=current.ele.getElementsByTagName('img')[0].src;
		return false;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);

    if(area.current == '100' && (current.index == 6 || current.index == 7 || current.index ==8)){
        recentWatchFocus();
    }
} 

pageControl.moveDown = function(){
	var nextEle = fnGetNextEleIndex('down');
	if(nextEle == -1){
		return false;
	}
    if(area.current == '100' && (current.index == 6 || current.index == 7 || current.index ==8)){
        recentWatchBlur();
    };
	if(current.index < 5){
		tabindex = current.index;
		if(tabindex == 4){
			tabindex = 3;
			direction = 1;
		}else if(tabindex == 0){
			tabindex = 1;
			direction = 0;
		}
		if(!timer){
			maskborder.style.display = "none";
			timer = setInterval("setTabImg()", 2000);	
		}
	}
	if(nextEle >= 100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);

    if(area.current == '100' && (current.index == 6 || current.index == 7 || current.index ==8)){
        recentWatchFocus();
    }
}

function startApp(flag){
	switch(flag){
		case 1:
			//alert("startApp");
			STBAppManager.startAppByIntent("{\"intentType\":0,\"appName\":\"com.amt\", \"className\":\"\",\"extra\":[{\"name\":\"towhere\",\"value\":\"personal\"}]}");
			break;
	}
}


pageControl.ok=function(){

	var url = current.area.paras[current.index].url;
	var cururl = baseurl + "index_sub.html?area=" + area.current + "&index=" + current.index;
	setpageurl(cururl);
	if(current.index == 15){
		STBAppManager.startAppByIntent("{\"intentType\":0,\"appName\":\"com.amt.launcherah\", \"className\":\"com.amt.launcherah.activity.MainActivity\",\"extra\":[{\"name\":\"towhere\",\"value\":\"channel\"}]}");
		return;
	}
	if(current.index == 18 || current.index == 24 || current.index == 27){
		var userid = getuserid();
	  	var temptoken = getCookieByunescape('temptoken');
	  	var backurl = "" + location;
	  	backurl = backurl.substring(0, backurl.indexOf("index_sub.html"));
	  	backurl = backurl + cururl;
	  	backurl = encodeURIComponent(backurl);
	  	if(current.index == 18 || current.index == 27){
	  		url = url + "?userId=" + userid + "&userToken=" + temptoken + "&backUrl=" + backurl;
	  	}else{
	  		url = url + "&userId=" + userid + "&userToken=" + temptoken + "&backUrl=" + backurl;
	  	}
	  	//alert("url:" + url);
	}
	if(current.index == 29){
	  	var backurl = "" + location;
	  	var userid = getuserid();
	  	backurl = backurl.substring(0, backurl.indexOf("index_sub.jsp"));
	  	backurl = backurl + cururl;
	  	backurl = encodeURIComponent(backurl);
		url = url + "&userid=" + userid + "&gcw_back_url=" + backurl;		
	}
	//alert("current.index=" + current.index + "$url:" + url);
	if(current.index == 25){
	  	var backurl = "" + location;
	  	backurl = backurl.substring(0, backurl.indexOf("index_sub.jsp"));
	  	backurl = backurl + cururl;
	  	backurl = encodeURIComponent(backurl);
		url = url + "?returnUrl=" + backurl;
	}
	if(current.index == 30){
		var userid = getuserid();
	  	url = url + "?userid=" + userid;
	}
	window.location=url;
}
var baseurl = '';
window.onload=function(){
	
	//防止缓存
	document.getElementById("jsPathScript").src="../../static_data/js/data/ad/iptv_AHindex.js?random="+Math.random();
	
	var recoms = document.getElementsByName('editor');
	for (var i = 0; i < recoms.length; i++) {
		var recom = recoms[i];
		//var imgId = recom.getElementsByTagName('img')[0].getAttribute('id');
		var templateId = fnGetQueryStringByName('templateId');
		recom.ondblclick = function() {
			var imgId = this.getElementsByTagName('img')[0].getAttribute('id');
			var srcList = document.getElementsByTagName('script');
			var jsSrc = srcList[0].src;
			window.open('../../adresourceEpgmsAction_goEditAdresource.do?imgId='+imgId+'&templateId='+templateId+"&jsSrc="+jsSrc, '_blank', 'height=750, width=800, top=100px, left=600px, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
		}
	}
	baseurl = '' + location;
	baseurl = baseurl.substring(0, baseurl.indexOf('index_sub.html'));
	//var EPGGroupNMB = Authentication.CTCGetConfig("EPGGroupNMB");
	//alert(EPGGroupNMB);
	document.cookie ="epgbackurl=";
	getRecord();
  	//document.getElementById("tempid").innerHTML = "userid:" + userid;
	adinit();
	var areaFrom=fnGetQueryStringByName('area');
	var indexFrom=fnGetQueryStringByName('index');
	if(areaFrom!=''&&indexFrom!=''&&area[areaFrom].ele[indexFrom]){
		area.current=areaFrom;
		area[area.current].currentIndex=indexFrom;
	}
	//找到获取焦点元素
	fnSetCurrent();
	if(area.current == '100' && current.index < 5){
		current.ele.getElementsByTagName('img')[0].style.opacity = 1;
		document.getElementById("img_center").src=current.ele.getElementsByTagName('img')[0].src;
		maskborder.style.left = (current.ele.offsetLeft-15)+'px';
		return;
	}
	if(!timer){
		maskborder.style.display = "none";
		timer = setInterval("setTabImg()", 2000);	
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	fnAddEleClass(current.ele,current.area.selStyle);
}

function adinit(){
		loadAdConfingJSONData(addatas,'','','',getData);
		setTimer(addatas,'','','',getData);
}

var frameflag = false;
document.getElementById("dataFrame").onload = function () {
	if(frameflag){
		recordLoad();
	}
}
var recordJson;
function getRecord(){
	var userid = getuserid();
	var url = "datajsp/getRecordLastItems.jsp?userid=" + userid;
	frameflag = true;
 	dataFrame.location.href = url;
}
var recordvoice="";
function recordLoad(){
	for(var i = 0; i < recordJson.list.length && i < 3; i++){
		var recordList = recordJson.list;
		var len = recordList.length;
		var j = 0;
		for(var i = 0; i < 3 && i < len; i++){
			var name = recordList[i].vod_name;
			var vod_parent_code = recordList[i].vod_parent_code;
			var vod_child_code = recordList[i].vod_child_code;
			var vod_episode = recordList[i].vod_episode;
			var vod_current_episode = recordList[i].vod_current_episode;
			var vod_poster_url = recordList[i].vod_poster_url;
			var category_id = recordList[i].category_id;
			if(name != '' && name != null){
				/*$("recentWatch_" + i).innerHTML = "" + name;
				var url = "myplay.jsp?pcode=" + vod_parent_code + "&childcode" + vod_child_code;
				url = url + "&vod_episode=" + vod_episode;
				url = url + "&vod_current_episode=" + vod_current_episode;
				url = url + "&imgurl=" + vod_poster_url;
				url = url + "&name=" + name;
				programMoveParas[6 + i].url = url;*/
				$("recentWatch_" + i).innerHTML = "" + name;
				var temptoken = getCookie('temptoken');
				var userid = getuserid();
				if(category_id.indexOf("1002") == 0 || category_id.indexOf("1004") == 0){
					var url = "moiveDet.jsp?category_id=" + category_id + "&code=" + vod_parent_code + "&temptoken=" + temptoken + "&userid=" + userid;
					programMoveParas[6 + j].url = url;
				}
				if(category_id.indexOf("1001") == 0){
					var url = "moiveDet2.jsp?category_id=" + category_id + "&code=" + vod_parent_code + "&temptoken=" + temptoken + "&userid=" + userid;
					programMoveParas[6 + j].url = url;
				}
				if(category_id.indexOf("1003") == 0){
					var url = "moiveDet3.jsp?category_id=" + category_id + "&code=" + vod_parent_code + "&temptoken=" + temptoken + "&userid=" + userid;
					programMoveParas[6 + j].url = url;
				}
				if(category_id.indexOf("1099") == 0){
					var url = "varietyDet.jsp?category_id=" + vod_parent_code + "&temptoken=" + temptoken + "&userid=" + userid;
					programMoveParas[6 + j].url = url;
				}				
				j++;
			}
		}
	}
	//voice();
}
