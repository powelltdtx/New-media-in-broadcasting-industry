function $(aaa) {
	var a = document.getElementById(aaa);
	return a;
}
var arrdirectorLength = 0;
var tuijianLength = 0;
var arrkpeopleLength = 0;
var tabnumLength = 0;
var seriesLength = 0;

var voicerecommod = [];
var voiceSeries = [];
var voice=0;
function datainit() {
	curseriesindex = strCotent.serieslist.length - 1;
	tabnum = Math.ceil(strCotent.serieslist.length / 10);
	setcollection(2);
	var mediafileurl = strCotent.fileurl;
	$("title").innerHTML = strCotent.name.replace(/quot/g, '"');
	var director = strCotent.director;
	if (director == '' || director == null || director == 'null') {
		director = '暂无';
	}
	arrdirector = director.split(';');
	$("year").innerHTML = '年份：' + strCotent.releaseyear;
	var strdirector = '主持人：';
	arrdirectorLength = arrdirector.length;
	for (var i = 0; i < arrdirector.length; i++) {
		strdirector = strdirector + '<span class="edi funs">' + arrdirector[i]
				+ '</span>';
	}
	$("editor").innerHTML = strdirector;
	var actordisplay = strCotent.actordisplay;
	if (actordisplay == '' || actordisplay == null || actordisplay == 'null') {
		actordisplay = "暂无";
	}
	var arractordisplay = actordisplay.split(';');
	// alert("strCotent.actordisplay:" + strCotent.actordisplay);
	var pepole = '嘉宾：';
	arrkpeopleLength = arractordisplay.length;
	for (var i = 0; i < arractordisplay.length; i++) {
		pepole = pepole + '<span class="rol funs">' + arractordisplay[i]
				+ "</span>";
	}
	$("role").innerHTML = pepole;
	var description = strCotent.description.replace(/quot/g, '"');
	if (description.length > 22) {
		description = description.substring(0, 22);
		document.getElementsByClassName("readMore")[0].style.display = 'inline-block';
		$("description").innerHTML = description + "...";
	} else {
		$("description").innerHTML = description;
		document.getElementsByClassName("readMore")[0].style.display = 'none';
	}

	var strvariety = '';
	var j = 0;
	var ilen = strCotent.serieslist.length;
	for (var i = (ilen - 1); i >= 0; i--) {
		if (j < 5) {
			strvariety = strvariety + '<div class="Variety">'
					+ strCotent.serieslist[i].name + '</div>';
			voiceSeries[voice] = strCotent.serieslist[i].name;
		} else {
			if ((j + 1) < strCotent.serieslist.length) {
				strvariety = strvariety + '<div class="Variety">更多往期内容>></div>';
				voiceSeries[voice] = "更多往期内容";
			} else {
				strvariety = strvariety + '<div class="Variety">'
						+ strCotent.serieslist[i].name + '</div>';
				voiceSeries[voice] = strCotent.serieslist[i].name;
			}
			break;
		}
		j++;
		voice++;
	}
	$("Variety").innerHTML = strvariety;
	variety = document.getElementsByClassName('Variety');
	area[104].ele = variety;
	if(strCotent.charging > 0){
		var temptoken = getCookieByunescape('temptoken');
		var url = baseurl + "datajsp/getjq.jsp?category_id=" + fnGetQueryStringByName('category_id')
		+ "&temptoken=" + temptoken + "&primaryid=" + strCotent.primaryid;
		JQFrame.location.href = url;
	}else{
		resjianquan = '2';
		buttoninit();
		getRecord();
	}

	// setcollectionMoveParas();
	setvarietyMoveParas();
	initVoice();
}

function tuijiandatainit(){
	var innertuijian = '';
	var tjfileurl = "";
	tuijianLength = tuijianlist.length;
	for (var i = 0; i < tuijianlist.length; i++) {
		tjfileurl = tuijianlist[i].fileurl;
		innertuijian = innertuijian + '<li class="recommod img"><img src="'
				+ tjfileurl
				+ '" width="166" height="222"><p>'
				+ tuijianlist[i].name + '</p></li>';
		voicerecommod[i] = tuijianlist[i].name;
	}
	$('recommod').getElementsByTagName("ul")[0].innerHTML = innertuijian;
	recommod = document.getElementsByClassName('recommod');
	area[106].ele = recommod;
	setrecommodMoveParas();
}


var tabnum = 0;
// var startindex = 0;
var voiceSeriesNumber=[];
function tabload() {
	var volumncount = strCotent.serieslist.length;
	tabnum = Math.ceil(volumncount / 10);
	var temp = volumncount;
	var collpop = '';

	for (var i = 0; i < tabnum; i++) {
		if ((temp - 10) > 0) {
			collpop = collpop + '<div class="collPop">' + temp + '-'
					+ (temp - 9) + '</div>';
			voiceSeriesNumber[i]=temp+'到'+(temp - 9)+'期';
			temp = temp - 10;
		} else {
			collpop = collpop + '<div class="collPop">' + temp + '-'
					+ '1</div>';
			voiceSeriesNumber[i]=temp+'到1期';
		}
	}
	$("collPop").innerHTML = collpop;
	collPop = document.getElementsByClassName('collPop');
	area[107].ele = collPop;
	setcollPopMoveParas();
	initVoice();
}

var tabindex = 0;
var voiceAllSeries=[];
function seriesload() {

	area[108].currentIndex = 0;
	var volumncount = strCotent.serieslist.length;
	var startindex = volumncount - (area[107].currentIndex * 10);
	var j = 0;
	var strvariety = '';
	voice=0;
	for (var i = (startindex - 1); i >= 0 && j < 10; i--) {
		strvariety = strvariety + ' <div class="VarietyPop">'
				+ strCotent.serieslist[i].name + '</div>';
		voiceAllSeries[voice]=strCotent.serieslist[i].name;
		j++;
		voice++;
	}

	$("VarietyPop").innerHTML = strvariety;

	varietyPop = document.getElementsByClassName('VarietyPop');
	area[108].ele = varietyPop;
	setvarietyPopMoveParas();
	initVoice();
}

function setvarietyMoveParas() {
	var up = -1;
	var down = -1;
	var right = -1;
	var left = -1;
	varietyMoveParas = [];
	var varietyMovePara = {};
	var len = variety.length;

	for (var i = 0; i < len; i++) {
		varietyMovePara = {};
		if (i < 2) {
			if (strCotent.description.length > 22) {
				up = 103;
			} else {
				up = -1;
			}
		} else {
			up = i - 2;
		}
		if ((i + 2) < len) {
			down = i + 2;
		} else {
			if (i == 1 || i == 3) {
				if ((i + 1) < len) {
					down = i + 1;
				}
			} else {
				down = 105;
			}
		}

		if (i == 1 || i == 3 || i == 5) {
			right = -1;
		} else {
			if ((i + 1) < len) {
				right = i + 1;
			} else {
				right = -1;
			}
		}

		if (i == 0 || i == 2 || i == 4) {
			left = 100;
		} else {
			left = i - 1;
		}

		varietyMovePara.up = up;
		varietyMovePara.down = down;
		varietyMovePara.right = right;
		varietyMovePara.left = left;
		varietyMoveParas[i] = varietyMovePara;
	}
	area[104].paras = varietyMoveParas;
}

function setfunMoveParas() {
	if (resjianquan == '2') {
		fun = document.getElementsByClassName('has');
		funMoveParas = [ {
			up : 104,
			right : 1,
			down : 106,
			left : -1
		}, {
			up : 104,
			right : -1,
			down : 106,
			left : 0
		} ];
	} else {
		fun = document.getElementsByClassName('fun');
		funMoveParas = [ {
			up : 104,
			right : 1,
			down : 106,
			left : -1
		}, {
			up : 104,
			right : 2,
			down : 106,
			left : 0
		}, {
			up : 104,
			right : -1,
			down : 106,
			left : 1
		} ];
	}
	area[105].ele = fun;
	area[105].paras = funMoveParas;
}

function setrecommodMoveParas() {
	var up = -1;
	var down = -1;
	var right = -1;
	var left = -1;
	recommodMoveParas = [];
	var recommodMovePara = {};
	for (var i = 0; i < tuijianLength; i++) {
		recommodMovePara = {};
		up = 105;
		down = -1;
		if ((i + 1) < tuijianLength) {
			right = i + 1;
		} else {
			right = -1;
		}
		if (i > 0) {
			left = i - 1;
		} else {
			left = -1;
		}
		recommodMovePara.up = up;
		recommodMovePara.down = down;
		recommodMovePara.right = right;
		recommodMovePara.left = left;
		recommodMoveParas[i] = recommodMovePara;
	}
	area[106].paras = recommodMoveParas;
}

function setcollPopMoveParas() {
	var up = -1;
	var down = -1;
	var right = -1;
	var left = -1;
	collPopMoveParas = [];
	var collPopMovePara = {};
	var len = collPop.length;
	for (var i = 0; i < len; i++) {
		collPopMovePara = {};
		up = -1;
		down = 108;
		if ((i + 1) < len) {
			right = i + 1;
		} else {
			right = -1;
		}
		if (i > 0) {
			left = i - 1;
		} else {
			left = -1;
		}
		collPopMovePara.up = up;
		collPopMovePara.down = down;
		collPopMovePara.right = right;
		collPopMovePara.left = left;
		collPopMoveParas[i] = collPopMovePara;
	}
	area[107].paras = collPopMoveParas;
}

function setvarietyPopMoveParas() {
	var up = -1;
	var down = -1;
	var right = -1;
	var left = -1;
	varietyPopMoveParas = [];
	var varietyPopMovePara = {};
	var len = varietyPop.length;

	for (var i = 0; i < len; i++) {
		varietyPopMovePara = {};
		if (i < 2) {
			up = 107;
		} else {
			up = i - 2;
		}
		if ((i + 2) < len) {
			down = i + 2;
		} else {
			if (i == 1 || i == 3 || i == 5 || i == 7) {
				if ((i + 1) < len) {
					down = i + 1;
				}
			} else {
				down = -1;
			}
		}

		if (i == 1 || i == 3 || i == 5 || i == 7 || i == 9) {
			right = -1;
		} else {
			if ((i + 1) < len) {
				right = i + 1;
			} else {
				right = -1;
			}
		}

		if (i == 0 || i == 2 || i == 4 || i == 6 || i == 8) {
			left = -1;
		} else {
			left = i - 1;
		}

		varietyPopMovePara.up = up;
		varietyPopMovePara.down = down;
		varietyPopMovePara.right = right;
		varietyPopMovePara.left = left;
		varietyPopMoveParas[i] = varietyPopMovePara;
	}
	area[108].paras = varietyPopMoveParas;
}

var callback = function(intent) {

	var command = intent._command;
	var commandarray = command.split(",");
	if (commandarray[0] == 'ShowAllText') {
		document.getElementById("moredeta").innerHTML = strCotent.description;
		$("morepop").style.display = "block";
		area.current = 103;
		area[103].currentIndex = 0;
		fnSetCurrent();
		fnAddEleClass(current.ele, current.area.selStyle);
		return;
	}
	if (commandarray[0] == 'CancelAllText') {
		$("morepop").style.display = "none";
		area.current = 103;
		area[103].currentIndex = 0;
		fnSetCurrent();
		fnAddEleClass(current.ele, current.area.selStyle);
		return;
	}
	if(commandarray[0] == 'series1'){
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
	if(commandarray[0]=="collections1" ||commandarray[0]=="collections"){
		if(collectionflag=="1" && commandarray[0]=="collections"){
			return;
		}
		if(commandarray[0]=="collections1" && collectionflag!="1" ){
			return;
		}
	}
	fnRemoveEleClass(current.ele, current.area.selStyle);
	area.current = parseInt(commandarray[1]);
	area[area.current].currentIndex = parseInt(commandarray[2]);
	fnSetCurrent();
	fnAddEleClass(current.ele, current.area.selStyle);
	if(area.current == 107){
		seriesload();
		setmove();
		return;
	}
	pageControl.ok();
}
function initVoice() {
	var scene = {
		"_scene" : "com.iflytek.xiri.MyScene",
		"_fuzzy_words" : {
			"video" : [ "张亮牵手无心", "超级大赢家主持人参与爸爸去哪儿" ]
		}
	};
	var commands = {
		"key1" : [ "打开", "开始" ],
		"key2" : [ "$W(video)" ],
		"Index" : [ "首页", "主页", "第一页" ],
		"up" : [ "上一页" ],
		"down" : [ "下一页" ],
		"back" : [ "返回" ],
		"_PLAY" : [ "$P(_PLAY)" ],
		"_PAGE" : [ "$P(_PAGE)" ],
		"_EPISODE" : [ "$P(_EPISODE)" ],
		"_SELECT" : [ "$P(_SELECT)" ]
	}
	var feedbacks = {

	}

	var EPISODE = {};
	var voiceArray = [];
	var voicestr = "";
	
	voiceArray[0] = '显示全文';
	voiceArray[1] = '显示全文';
	commands["ShowAllText,103,0"] = voiceArray;
	voiceArray = [];
	feedbacks["ShowAllText,103,0"] = "显示全文";
	voiceArray[0] = '关闭全文';
	voiceArray[1] = '退出全文';
	commands["CancelAllText,103,0"] = voiceArray;
	voiceArray = [];
	feedbacks["CancelAllText,103,0"] = "关闭全文";
	
	for (var i = 0; i < voiceSeries.length; i++) {
		voiceArray[0] = voiceSeries[i];
		commands["series,104," + i] = voiceArray;
		voiceArray = [];
		voicestr = "进入" + voiceSeries[i];
		feedbacks["series,104," + i] = voicestr;
		voicestr = "";
		if( i==voiceSeries.length-1){
			voiceArray[0] = "更多往期内容";
			voiceArray[1] = "打开更多往期内容";
			voiceArray[2] = "显示更多往期内容"
			commands["series,104," + i] = voiceArray;
			voiceArray = [];
			voicestr = "打开更多往期内容" ;
			feedbacks["series,104," + i] = voicestr;
			voicestr = "";
			voiceArray[0] = "关闭";
			voiceArray[1] = "退出";
			voiceArray[2] = "关闭更多往期内容";
			voiceArray[3] = "退出更多往期内容"
			commands["series1,104," + i] = voiceArray;
			voiceArray = [];
			voicestr = "退出更多往期内容" ;
			feedbacks["series1,104," + i] = voicestr;
			voicestr = "";
		}
	}
	
	if (resjianquan == '2') {
		voiceArray[0] = "播放";
		commands["series,105," + 0] = voiceArray;
		feedbacks["series,105," + 0]="跳转播放";
		voiceArray = [];
		voiceArray[0] = "收藏";
		commands["collections,105," + 1] = voiceArray;
		feedbacks["collections,105," + 1]="正在为您收藏中";
		voiceArray = [];
		voiceArray[0] = "取消收藏";
		commands["collections1,105," + 1] = voiceArray;
		feedbacks["collections1,105," + 1]="正在为您取消收藏";
		voiceArray = [];
	} else {
		voiceArray[0] = "订购";
		commands["series,105," + 1] = voiceArray;
		feedbacks["series,105," + 1]="跳转订购";
		voiceArray = [];
		voiceArray[0] = "试看";
		commands["series,105," + 0] = voiceArray;
		feedbacks["series,105," + 0]="试看播放";
		voiceArray = [];
		voiceArray[0] = "收藏";
		commands["collections,105," + 2] = voiceArray;
		feedbacks["collections,105," + 2]="正在为您收藏中";
		voiceArray = [];
		voiceArray[0] = "取消收藏";
		commands["collections1,105," + 2] = voiceArray;
		feedbacks["collections1,105," + 2]="正在为您取消收藏";
		voiceArray = [];
	}
	for (var i = 0; i < voicerecommod.length; i++) {
		voiceArray[0] = voicerecommod[i];
		commands["recommod,106," + i] = voiceArray;
		voiceArray = [];
		voicestr = "进入" + voicerecommod[i];
		feedbacks["recommod,106," + i] = voicestr;
		voicestr = "";
	}
	for (var i = 0; i < voiceSeriesNumber.length; i++) {
		voiceArray[0] = voiceSeriesNumber[i];
		commands["seriesAllNumber,107," + i] = voiceArray;
		voiceArray = [];
		voicestr = "进入" + voiceSeriesNumber[i];
		feedbacks["seriesAllNumber,107," + i] = voicestr;
		voicestr = "";
	}
	for (var i = 0; i < voiceAllSeries.length; i++) {
		voiceArray[0] = voiceAllSeries[i];
		commands["seriesAll,108," + i] = voiceArray;
		voiceArray = [];
		voicestr = "进入" + voiceAllSeries[i];
		feedbacks["seriesAll,108," + i] = voicestr;
		voicestr = "";
	}
	scene["_commands"] = commands;
	scene["_feedbacks"] = feedbacks;
	var listener = new Xiri.Listener(callback);
	listener.regist(scene);
	voiceContent = [];
}
