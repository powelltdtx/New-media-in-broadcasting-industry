var seriesListTags= document.getElementsByClassName('seriesList');
var tabnumTags= document.getElementsByClassName('tabnum');
var exitbuttonTags = document.getElementsByClassName('exitbutton');
var seriesListParas = [
	{up:-1,right:-1,down:-1,left:-1}
];

var tabnumMoveParas=[
	{up:-1,right:-1,down:-1,left:-1}
];
var exitbuttonMoveParas = [
	{up:-1,right:1,down:-1,left:-1},
	{up:-1,right:-1,down:-1,left:0}
];
var area = {
	100:{
		ele:seriesListTags,
		paras:seriesListParas,
		currentIndex:0,
		selStyle:'seriesSel'
	},
	101:{
		ele:tabnumTags,
		paras:tabnumMoveParas,
		currentIndex:0,
		selStyle:'setSel'
	},
	102:{
		ele:exitbuttonTags,
		paras:exitbuttonMoveParas,
		currentIndex:0,
		selStyle:'buttonSel'
	},	
	'current':101
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
	if(!series_showflag && !exitshowflag){
		clearTimeout(jumptime_flag);
		clearTimeout(timeflag);
		showprogressbar();
		mpjump(0-jumptime);
		timeflag = setTimeout('hiddenprogressbar()', 2000);
		jumptime = jumptime + 1;
		jumptime_flag = setTimeout('resumejumptime()', 300);
		return false;
	}
	if(series_showflag){
		clearTimeout(series_timeflag);
		showseriesDiv();
		series_timeflag = setTimeout('hiddenseriesDiv()', 3000);
	}
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
	if(area.current == 101){
		setseries(current.index);
	}
}

pageControl.moveRight = function(){
	if(!series_showflag && !exitshowflag){
		clearTimeout(jumptime_flag);
		clearTimeout(timeflag);
		showprogressbar();
		mpjump(jumptime);
		timeflag = setTimeout('hiddenprogressbar()', 2000);
		jumptime = jumptime + 1;
		jumptime_flag = setTimeout('resumejumptime()', 300);
		return false;
	}
	if(series_showflag){
		clearTimeout(series_timeflag);
		showseriesDiv();
		series_timeflag = setTimeout('hiddenseriesDiv()', 3000);		
	}
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
	if(area.current == 101){
		setseries(current.index);
	}
	
}
var series_showflag = false;
pageControl.moveUp = function(){
	
	if(!series_showflag && !exitshowflag){
		if(seriesflag == '1'){
			series_showflag = true;
			showseriesDiv();
			fnSetCurrent();
			fnAddEleClass(current.ele,current.area.selStyle);
			clearTimeout(series_timeflag);
			series_timeflag = setTimeout('hiddenseriesDiv()', 3000);
			return false;
		}else{
			return false;
		}
	}
	var nextEle = fnGetNextEleIndex('up');
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

pageControl.moveDown = function(){
	if(!series_showflag){
		return false;
	}else{
		clearTimeout(series_timeflag);
		showseriesDiv();
		series_timeflag = setTimeout('hiddenseriesDiv()', 3000);
	}
	var nextEle = fnGetNextEleIndex('down');
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
var exitshowflag = false;
pageControl.keyBack=function(){
	if(!exitshowflag){
		mp.pause();
		exitshowflag = true;
		document.getElementsByClassName('exit')[0].style.display = "block";
		area.current = 102;
		fnSetCurrent();
		fnAddEleClass(current.ele,current.area.selStyle);
	}else{
		mp.resume();
		exitshowflag = false;
		document.getElementsByClassName('exit')[0].style.display = "none";
		area[102].currentIndex = 0;
		fnRemoveEleClass(current.ele,current.area.selStyle);
		area.current = 101;
		fnSetCurrent();
	}
}
var playstatus = 1; //1:正在播放 2:暂停
pageControl.ok=function(){
	if(exitshowflag){
		if(current.index == 0){
			mp.resume();
			parent.smallplay();

		}else{
			mp.resume();	
		}
		exitshowflag = false;
		document.getElementsByClassName('exit')[0].style.display = "none";
		area[102].currentIndex = 0;
		fnRemoveEleClass(current.ele,current.area.selStyle);
		area.current = 101;
		fnSetCurrent();		
		return;
	}
	if(series_showflag && area.current == 100){
		series_timeflag = setTimeout('hiddenseriesDiv()', 3000);
		var index = current.index + (area[101].currentIndex * 15);
		var playurl = programDetial.serieslist[index].playurl;
		closemedia();
		initVideo();
		playVideo(playurl, playtime);
		return false;
	}
	if(playstatus == 1){
		mpjump(0);
		playstatus = 2;
		mp.pause();
		$('playstatus').style.background = "url(img/vodplay/player_icon_pause.png) no-repeat";
		$('pauseDiv').style.visibility = 'visible';
		showprogressbar();
	}else{
		playstatus = 1;
		mp.resume();
		$('pauseDiv').style.visibility = 'hidden';
		$('playstatus').style.background = "url(img/vodplay/player_icon_playing.png) no-repeat";
		
		timeflag = setTimeout('hiddenprogressbar()', 2000);
	}
	
	
}
var timeflag;
var volume_timeflag;
function keyVolUp(){
	clearTimeout(volume_timeflag);
	showvolume();
	var volume = mp.getVolume();
	volume = volume + 5;
	if(volume > 100){
		volume = 100;
	}
	mp.setVolume(volume);
	$('volumecolorbar').style.height = (volume * 4) + "px";
	$('volumepercent').innerHTML = volume + "%";
	volume_timeflag = setTimeout('hiddenvolume()', 2000);
}
function keyVolDown(){
	clearTimeout(volume_timeflag);
	showvolume();
	var volume = mp.getVolume();
	volume = volume - 5;
	if(volume < 0){
		volume = 0;
	}
	mp.setVolume(volume);
	$('volumecolorbar').style.height = (volume * 4) + "px";
	$('volumepercent').innerHTML = volume + "%";
	volume_timeflag = setTimeout('hiddenvolume()', 2000);
}
var programDetial = {};
var seriesflag = '';
var instanceId = -1;
window.onload=function(){
/*	var category_id = fnGetQueryStringByName('category_id');
	var jsurl = getJSPath(category_id, 3);
	jsurl = jsurl + 'D' + fnGetQueryStringByName('code') + '.js';
	loadJS(jsurl);*/
	var areaFrom=fnGetQueryStringByName('area');
	var indexFrom=fnGetQueryStringByName('index');
	if(areaFrom!=''&&indexFrom!=''){
		area.current=areaFrom;
		area[area.current].currentIndex=indexFrom;
	}
/*	//找到获取焦点元素
	fnSetCurrent();
	//添加样式
	fnAddEleClass(current.ele,current.area.selStyle);*/

}
var tabnums = 0;
var serienums = 0;
function ContentDetailCallback(json){
	programDetial = json;
	seriesflag = programDetial.seriesflag;
	var strhtml = '';
	$("playprogramname").innerHTML ='正在播放:' + programDetial.name;
	if(seriesflag == '1'){
		$("seriesnum").innerHTML = "(第" + programDetial.serieslist[seriesindex].sequence + "集)";
		$("playprogramname").innerHTML = $("playprogramname").innerHTML + $("seriesnum").innerHTML;
		var serieslist = programDetial.serieslist;
		var length = serieslist.length;
		tabnums = Math.ceil(length/15);
		strhtml = '';
		for(var i = 0; i < tabnums; i++){
			var start = i * 15 + 1;
			var end = 0;
			if((i + 1) < tabnums){
				end = (i + 1) * 15;
			}else{
				end = length;
			}
			strhtml = strhtml + '<span class="tabnum">' + start + "-" + end + '</span>';
		}
		$("tab").innerHTML = strhtml;
		settabnumMoveParas();
		setseries(0);		
	}
	//bindVideo();
}
function play(url, time, left, top, width, height){
	initVideo();
	playVideo(url, time, left, top, width, height);	
}
function setseries(tabindex){
	var serieslist = programDetial.serieslist;
	var start = tabindex * 15;
	var end = 0;
	if((tabindex + 1) < tabnums){
		end = (tabindex + 1) * 15;
	}else{
		end = serieslist.length;
	}
	var strhtml = '';
	for(var i =  start; i < end; i++){
		strhtml = strhtml + '<div class="seriesList"><span>' + serieslist[i].sequence + '</span></div>'
	}
	serienums = end - start;
	$("seriesList").innerHTML = strhtml;
	setseriesListParas();
}
function setseriesListParas(){
	seriesListParas = [];
	var seriesListPara = {};
	var up = -1;
	var right = -1;
	var down = -1;
	var left = -1;
	for(var i = 0; i < serienums; i++){
		seriesListPara = {};
		if(i == 0){
			left = -1;
		}else{
			left = i - 1;
		}
		if((i + 1) < serienums){
			right = i + 1;
		}else{
			right = -1;
		}
		up = -1;
		down = 101;
		seriesListPara.left = left;
		seriesListPara.right = right;
		seriesListPara.up = up;
		seriesListPara.down = down;
		seriesListParas[i] = seriesListPara;
	}
	area[100].paras = seriesListParas;
	seriesListTags= document.getElementsByClassName('seriesList');
	area[100].ele = seriesListTags;
	area[100].currentIndex = 0;
}

function settabnumMoveParas(){
	tabnumMoveParas = [];
	var tabnumMovePara = {};
	var up = -1;
	var right = -1;
	var down = -1;
	var left = -1;
	for(var i = 0; i < tabnums; i++){
		tabnumMovePara = {};
		if(i == 0){
			left = -1;
		}else{
			left = i - 1;
		}
		if((i + 1) < tabnums){
			right = i + 1;
		}else{
			right = -1;
		}
		up = 100;
		down = -1;
		tabnumMovePara.left = left;
		tabnumMovePara.right = right;
		tabnumMovePara.up = up;
		tabnumMovePara.down = down;
		tabnumMoveParas[i] = tabnumMovePara;
	}
	area[101].paras = tabnumMoveParas;
	tabnumTags= document.getElementsByClassName('tabnum');
	area[101].ele = tabnumTags;
}

function hiddenvolume(){
	$("volumeDiv").style.visibility="hidden";
}
function showvolume(){
	$("volumeDiv").style.visibility="visible";
}

function showprogressbar(){
	$('progressdiv').style.visibility="visible";
}
function hiddenprogressbar(){
	$('progressdiv').style.visibility="hidden";
}
var jumptime = 20;
var jumptime_flag;
function resumejumptime(){
	jumptime = 20;
}

function showquestion(){
	$('question').style.visibility="visible";
}
function hiddenquestion(){
	$('question').style.visibility="hidden";
}
var series_timeflag;
function showseriesDiv(){
	$('seriesDiv').style.visibility="visible";
}
function hiddenseriesDiv(){
	series_showflag = false;
	$('seriesDiv').style.visibility="hidden";
}

function mpjump(jump){
	var duration = parseInt(mp.getMediaDuration(), 10);
	var currenttime = parseInt(mp.getCurrentPlayTime(), 10) + jump;
	//alert("duration:" + duration + "$currenttime:" + currenttime);
	if(currenttime > duration ){
		currenttime = duration;
	}else if(currenttime < 0){
		currenttime = 0;
	}
	var width = ((currenttime/duration) * 1000) + 'px';
	$("progressbar").style.width = width;
	var minute;
	var second;
	var minute1;
	var second1;
	minute = Math.floor(currenttime / 60);
	second = currenttime % 60;
	minute1 = Math.floor(duration / 60);
	second1 = duration % 60;
	if(second < 10){
		second = '0' + second;
	}
	if(second1 < 10){
		second1 = '0' + second1;
	}
	$("playtime").innerHTML = minute + ":" + second + "/" + minute1 + ":" + second1;
	$("playingtime").innerHTML = minute + ":" + second;
	$("playingtimediv").style.left = width;
	mp.playByTime(-1,currenttime,1);	
}
var seriesindex = 0;
function setRecord(){
	var userId = getuserid();
	userId = 'ahgd04';
	var code = programDetial.code;
	var name = programDetial.name;
	name = escape(name);
	var category_id = programDetial.category_id;
	var total_time = parseInt(mp.getMediaDuration(), 10);
	var current_time = parseInt(mp.getCurrentPlayTime(), 10);
	var url = "datajsp/setRecord.jsp?total_time=" + total_time + "&current_time=" + current_time + "&callback=close";
	if(programDetial.seriesflag == '0'){
		url = url + "&pcode=" + code + "&name=" + name
		+ "&imgurl=" + imgurl + "&category_id=" + category_id + "&userId=" + userId;
	}else{
		var childcode = programDetial.serieslist[seriesindex].code;
		var vod_episode = programDetial.volumncount;
		var vod_current_episode = seriesindex + 1;
		url = url + "&pcode=" + code + "&childcode=" + childcode + "&name=" + name + "&vod_episode="
		+ vod_episode + "&vod_current_episode=" + vod_current_episode
		+ "&imgurl=" + imgurl + "&category_id=" + category_id + "&userId=" + userId;
	}
	recordFrame.location.href = url;
}
function close(){
	parent.smallplay();
	closemedia();
}