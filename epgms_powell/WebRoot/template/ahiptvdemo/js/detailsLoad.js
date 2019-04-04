function $(aaa) {
	var a = document.getElementById(aaa);
	return a;
}
var arrdirectorLength = 0;
var tuijianLength = 0;
var arrkpeopleLength = 0;
var tabnumLength = 0;
var seriesLength = 0;

// datainit();
// 级数标签
var voicePageNumber = [];
var voiceSeriesNumber = [];
var voicerecommod = [];
var voice = 0;
function datainit() {
	var mediafileurl = strCotent.fileurl;
	$("title").innerHTML = strCotent.name.replace(/quot/g, '"');
	var director = strCotent.director;
	if (director == '' || director == null || director == 'null') {
		director = '暂无';
	}
	arrdirector = director.split(';');
	$("year").innerHTML = '年份：' + strCotent.releaseyear;
	var strdirector = '导演：';
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
	var arrkpeople = actordisplay.split(';');
	// alert("strCotent.actordisplay:" + strCotent.actordisplay);
	var pepole = '主演：';
	arrkpeopleLength = arrkpeople.length;
	for (var i = 0; i < arrkpeople.length; i++) {
		pepole = pepole + '<span class="rol funs">' + arrkpeople[i] + "</span>";
	}
	$("role").innerHTML = pepole;
	var description = strCotent.description.replace(/quot/g, '"');
	if (description.length > 22) {
		document.getElementsByClassName("readMore")[0].style.display = 'inline-block';
		description = description.substring(0, 22);
		$("description").innerHTML = description + "...";
	} else {
		$("description").innerHTML = description;
		document.getElementsByClassName("readMore")[0].style.display = 'none';
	}
	// $("description").innerHTML = strCotent.description.substring(0,22);

	var volumncount = strCotent.serieslist.length;
	var tabnum = Math.ceil(volumncount / 20);
	tabnumLength = tabnum;
	var innertab = '';
	for (var i = 1; i <= tabnum; i++) {
		var start = (i - 1) * 20 + 1;
		var end = i * 20;
		if (i == tabnum) {
			voicePageNumber[voice] = start + "到" + volumncount + "集";
			innertab = innertab + '<div class="classic">' + start + '-'
					+ volumncount + '集' + '</div>';
		} else {
			voicePageNumber[voice] = start + "到" + end + "集";
			innertab = innertab + '<div class="classic">' + start + '-' + end
					+ '集' + '</div>';
		}
		voice++;
	}
	$("classic").innerHTML = innertab;
	var strseries = '';
	seriesLength = strCotent.serieslist.length;
	for (var i = 0; i < strCotent.serieslist.length && i < 20; i++) {
		voiceSeriesNumber[i] = "第" + strCotent.serieslist[i].sequence + "集";
		strseries = strseries + '<li class="collection">'
				+ strCotent.serieslist[i].sequence + '</li>';
	}
	$("collection").getElementsByTagName("ul")[0].innerHTML = strseries;
	if(strCotent.charging > 0){
		var temptoken = getCookieByunescape('temptoken');
		var url = "datajsp/getjq.jsp?category_id=" + fnGetQueryStringByName('category_id')
		+ "&temptoken=" + temptoken + "&primaryid=" + strCotent.primaryid;
		JQFrame.location.href = url;
	}else{
		resjianquan = '2';
		buttoninit();
		getRecord();
	}
	setediMoveParas();
	setrolMoveParas();
	setclassicMoveParas();
	setcollectionMoveParas();
	
	edi = document.getElementsByClassName('edi');
	rol = document.getElementsByClassName('rol');
	classic = document.getElementsByClassName('classic');
	collection = collection = document.getElementsByClassName('collection');
	area[101].ele = edi;
	area[102].ele = rol;
	area[104].ele = classic;
	area[105].ele = collection;
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
				+ tuijianlist[i].name + '</p></li>'
		voicerecommod[i] = tuijianlist[i].name.replace(/quot/g, '"')
	}
	$('recommod').getElementsByTagName("ul")[0].innerHTML = innertuijian;
	setrecommodMoveParas();
	area[107].ele = recommod;
	recommod = document.getElementsByClassName('recommod');
	initVoice();
}
function seriesload() {
	voiceSeriesNumber = [];
	var index = area[104].currentIndex;
	var j = index * 20;

	var strseries = '';
	for (var i = 0; i < 20 && j < seriesLength; i++) {
		strseries = strseries + '<li class="collection">'
				+ strCotent.serieslist[j].sequence + '</li>';
		voiceSeriesNumber[i] = "第" + strCotent.serieslist[j].sequence + "集";
		j++;
	}
	$("collection").getElementsByTagName("ul")[0].innerHTML = strseries;
	setcollectionMoveParas();
	collection = document.getElementsByClassName('collection');
	area[105].ele = collection;
	initVoice();
}

function setediMoveParas() {
	var up = -1;
	var down = -1;
	var right = -1;
	var left = -1;
	ediMoveParas = [];
	var ediMovePara = {};
	for (var i = 0; i < arrdirectorLength; i++) {
		ediMovePara = {};
		up = -1;
		down = 102;
		left = 100;
		if ((i + 1) < arrdirectorLength) {
			right = i + 1;
		} else {
			right = -1;
		}
		ediMovePara.up = up;
		ediMovePara.down = down;
		ediMovePara.right = right;
		ediMovePara.left = left;
		ediMoveParas[i] = ediMovePara;
	}
	area[101].paras = ediMoveParas;
}

function setrolMoveParas() {
	var up = -1;
	var down = -1;
	var right = -1;
	var left = -1;
	rolMoveParas = [];
	var rolMovePara = {};
	for (var i = 0; i < arrkpeopleLength; i++) {
		rolMovePara = {};
		up = 101;
		down = 103;
		left = 100;
		if ((i + 1) < arrkpeopleLength) {
			right = i + 1;
		} else {
			right = -1;
		}
		rolMovePara.up = up;
		rolMovePara.down = down;
		rolMovePara.right = right;
		rolMovePara.left = left;
		rolMoveParas[i] = rolMovePara;
	}
	area[102].paras = rolMoveParas;
}

function setclassicMoveParas() {
	var up = -1;
	var down = -1;
	var right = -1;
	var left = -1;
	classicMoveParas = [];
	var classicMovePara = {};
	for (var i = 0; i < tabnumLength; i++) {
		classicMovePara = {};
		/*
		 * up = 103; down = 105;
		 */
		if (strCotent.description.length > 22) {
			up = 103;
		} else {
			up = -1;
		}

		down = 105;
		if (i > 0) {
			left = i - 1;
		} else {
			left = 100;
		}
		if ((i + 1) < tabnumLength) {
			right = i + 1;
		} else {
			right = -1;
		}
		classicMovePara.up = up;
		classicMovePara.down = down;
		classicMovePara.right = right;
		classicMovePara.left = left;
		classicMoveParas[i] = classicMovePara;
	}
	area[104].paras = classicMoveParas;
}

function setcollectionMoveParas() {
	var up = -1;
	var down = -1;
	var right = -1;
	var left = -1;
	collectionMoveParas = [];
	area[105].currentIndex = 0;
	var collectionMovePara = {};
	var len = collection.length;
	/*
	 * if(tabnumLength == 1){ len = arrdirectorLength; }else{
	 * if(area[104].currentIndex < (tabnumLength - 1)){ len = 20; }else{ len =
	 * arrdirectorLength - ((tabnumLength - 1) * 20); } }
	 */
	for (var i = 0; i < len; i++) {
		collectionMovePara = {};
		if (i < 10) {
			up = 104;
		} else {
			up = i - 10;
		}

		if (i < 10) {
			if ((i + 10) < len) {
				down = i + 10;
			} else {
				if (11 < len) {
					down = len - 1;
				} else {
					down = 106;
				}
			}
		} else {
			down = 106;
		}
		if (i == 9 || i == 19) {
			right = -1;
		} else {
			if ((i + 1) < len) {
				right = i + 1;
			} else {
				right = -1;
			}
		}

		if (i == 0 || i == 10) {
			left = 100;
		} else {
			left = i - 1;
		}

		collectionMovePara.up = up;
		collectionMovePara.down = down;
		collectionMovePara.right = right;
		collectionMovePara.left = left;
		collectionMoveParas[i] = collectionMovePara;
	}
	area[105].paras = collectionMoveParas;
}

function setfunMoveParas() {
	if (resjianquan == '2') {
		fun = document.getElementsByClassName('has');
		funMoveParas = [ {
			up : 105,
			right : 1,
			down : 107,
			left : -1
		}, {
			up : 105,
			right : -1,
			down : 107,
			left : 0
		} ];
	} else {
		fun = document.getElementsByClassName('has');
		funMoveParas = [ {
			up : 105,
			right : 1,
			down : 107,
			left : -1
		}, {
			up : 105,
			right : 2,
			down : 107,
			left : 0
		}, {
			up : 105,
			right : -1,
			down : 107,
			left : 1
		} ];
	}

	area[106].paras = funMoveParas;
	area[106].ele = fun;
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
		up = 106;
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
	area[107].paras = recommodMoveParas;
}
var callback = function(intent) {

	var command = intent._command;
	var commandarray = command.split(",");

	if(commandarray[0]=='ShowAllText'){
		document.getElementById("moredeta").innerHTML=strCotent.description;
		$("morepop").style.display = "block";
		area.current = 103;
		area[103].currentIndex = 0;
		fnSetCurrent();
		fnAddEleClass(current.ele,current.area.selStyle);	
		return;
	}
	if(commandarray[0]=='CancelAllText'){
		$("morepop").style.display = "none";
		area.current = 103;
		area[103].currentIndex = 0;
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
	if(commandarray[0]=='_EPISODE'){
		var index = intent.index;
		fnRemoveEleClass(current.ele, current.area.selStyle);
		area.current = parseInt('105');
		area[area.current].currentIndex = parseInt(index)-1;
		fnSetCurrent();
		fnAddEleClass(current.ele, current.area.selStyle);
		if (area.current == 104) {
			seriesload();
			setmove();
			return;
		}
		pageControl.ok();
	}else {
		fnRemoveEleClass(current.ele, current.area.selStyle);
		area.current = parseInt(commandarray[1]);
		area[area.current].currentIndex = parseInt(commandarray[commandarray.length - 1]);
		fnSetCurrent();
		fnAddEleClass(current.ele, current.area.selStyle);
		if (area.current == 104) {
			seriesload();
			setmove();
			return;
		}
		pageControl.ok();
	}
	
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
	for (var i = 0; i < voicePageNumber.length; i++) {
		voiceArray[0] = voicePageNumber[i];
		commands["series,104," + i] = voiceArray;
		voiceArray = [];
		voicestr = "进入" + voicePageNumber[i];
		feedbacks["series,104," + i] = voicestr;
		voicestr = "";
	}

	for (var i = 0; i < voiceSeriesNumber.length; i++) {
		voiceArray[0] = "$P(" + voiceSeriesNumber[i] + ")";
		EPISODE["series,105," + i] = voiceArray;
		voiceArray = [];
		voiceArray[0] =voiceSeriesNumber[i];
		commands["series,105," + i] = voiceArray;
		voiceArray = [];
		voicestr = "进入" + voiceSeriesNumber[i];
		feedbacks["series,105," + i] = voicestr;
		voicestr = "";
	}
	for (var i = 0; i < voicerecommod.length; i++) {
		voiceArray[0] = voicerecommod[i];
		commands["series,107," + i] = voiceArray;
		voiceArray = [];
		voicestr = "进入" + voicerecommod[i];
		feedbacks["series,107," + i] = voicestr;
		voicestr = "";
	}
	if (resjianquan == '2') {
		voiceArray[0] = "播放";
		commands["series,106," + 0] = voiceArray;
		feedbacks["series,106," + 0]="开始播放"
		voiceArray = [];
		voiceArray[0] = "收藏";
		commands["collections,106," + 1] = voiceArray;
		feedbacks["collections,106," +1]="正在为您收藏中"
		voiceArray = [];
		voiceArray[0] = "取消收藏";
		commands["collections1,106," + 1] = voiceArray;
		feedbacks["collections1,106," +1]="正在为您取消收藏"
		voiceArray = [];
	} else {
		voiceArray[0] = "订购";
		commands["series,106," + 1] = voiceArray;
		feedbacks["series,106," + 1]="跳转订购"
		voiceArray = [];
		voiceArray[0] = "试看";
		commands["series,106," + 0] = voiceArray;
		feedbacks["series,106," + 0]="试看播放"
		voiceArray = [];
		voiceArray[0] = "收藏";
		commands["collections,106," + 2] = voiceArray;
		feedbacks["collections,106," +2]="正在为您收藏中"
		voiceArray = [];
		voiceArray[0] = "取消收藏";
		commands["collections1,106," + 2] = voiceArray;
		feedbacks["collections1,106," +2]="正在为您取消收藏"
		voiceArray = [];
	}
	voiceArray[0]='显示全文';
	voiceArray[1]='显示全文';
	commands["ShowAllText,103,0"]=voiceArray;
	voiceArray = [];
	feedbacks["ShowAllText,103,0"] = "显示全文";
	voiceArray[0]='关闭全文';
	voiceArray[1]='退出全文';
	commands["CancelAllText,103,0"]=voiceArray;
	voiceArray = [];
	feedbacks["CancelAllText,103,0"] = "关闭全文";
	scene["_commands"] = commands;
	scene["_EPISODE"] = EPISODE;
	scene["_feedbacks"] = feedbacks;


	var listener = new Xiri.Listener(callback);
	listener.regist(scene);
	voiceContent = [];
}
