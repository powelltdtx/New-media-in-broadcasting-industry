function $(aaa) {
	var a = document.getElementById(aaa);
	return a;
}

var oldUl = '';
var remNum = 0;
var isScoll = false;

function loadMoveList(num) {
	oUlNum++
	var oUl = document.createElement('ul');
	oUl.setAttribute('class', 'moveListRow');
	for (var i = 0; i < num; i++) {
		var oLi = document.createElement('li');
		oLi.innerHTML = '<img src=""><p></p>'
		oLi.setAttribute('class', 'moveListLi');
		oUl.appendChild(oLi);
		oUl.style.top = '938px';
		oUl.style.left = '319px';
	}
	document.getElementById('moveList').appendChild(oUl);

}
var totalpage;
var voicecategory = [];
function datainit() {

	var tagul = $("chooseBar").getElementsByTagName("ul");
	var tagli1 = '<li class="chooseLI">';
	var tagli2 = '</li>';
	tagul[0].innerHTML = '';
	for (var i = 0; i < categoryListJsonArr.length; i++) {
		tagul[0].innerHTML = tagul[0].innerHTML + tagli1 + categoryListJsonArr[i].name
				+ tagli2;
		voicecategory[i] = categoryListJsonArr[i].name;
	}
	/*
	 * if (iTitle != 5) { tagul[0].innerHTML = tagul[0].innerHTML + tagli1 +
	 * "更多" + tagli2; }
	 */
	setchooseMoveParas();
	/*
	 * tagul = $("moveList").getElementsByTagName("ul"); var contentlist =
	 * contentjson.list; var tag = '<li class="moveListLi"><img
	 * src="images/moive_img.jpg" width="175" height="258"><p><span>相关电影名称</span><span>8.2</span></p></li>';
	 * tagul[0].innerHTML = ''; var fileurl = ""; for(var i = 0; i <
	 * contentlist.length; i++){ fileurl = contentlist[i].fileurl; fileurl =
	 * fileurl.replace("117.71.25.104:85", "10.178.40.109:85");
	 * tagul[0].innerHTML = tagul[0].innerHTML + '<li class="moveListLi"><img
	 * src="' + fileurl + '" width="175" height="258"><p><span>' +
	 * contentlist[i].name + '</span><span>8.2</span></p></li>'; }
	 */
}
var getpageid = 1;// 请求数据的页码id
var pagecount = 30;// 每页请求的数据数
var usecount = 0;// 已经展示的条数
var voiceContent = [];
var voice = 0;
var cupage = 0;
var voiceMovieIndex = 0;

function moviedata() {
	var len = contentListJosnArr.length;
	var index = area[100].currentIndex;
	var count = 10;
	if (index == 0 && getpageid == 1 && usecount == 0 && iTitle == 1) {
		count = 5;
		document.getElementsByClassName('recommonList')[0].style.display = 'block';
		document.getElementById("moveListRow").style.top = "303px";
	} else {
		document.getElementsByClassName('recommonList')[0].style.display = 'none';
		chooseMoveParas[0].right = 102;
		document.getElementById("moveListRow").style.top = "100px";
	}
	var tagul = $("moveList").getElementsByTagName("ul");
	var tag = '<li class="moveListLi"><img src="" width="175" height="258"><p><span></span></p></li>';
	tagul[0].innerHTML = '';
	var fileurl = "";
	var charging = 0;
	var j = usecount;
	voiceMovieIndex=usecount;
	var voicecategory;
	for (var i = j; i < (j + count + 5) && i < contentListJosnArr.length; i++) {
		if (i < (j + count)) {
			usecount = usecount + 1;
		}
		fileurl = contentListJosnArr[i].fileurl;
		fileurl = fileurl.replace(".jpg", "_min.jpg");
		charging = contentListJosnArr[i].charging * 1;
		voicecategory = contentListJosnArr[i].category_id;
		if (charging > 0) {
			tagul[0].innerHTML = tagul[0].innerHTML
					+ '<li class="moveListLi"><img src="img/movielist/corner_mem.png" style="position:absolute;left:0px;top:0px;" width="48" height="51"><img src="'
					+ fileurl + '" onload="this.src=\'' + contentListJosnArr[i].fileurl + '\';this.removeAttribute (\'onload\');" onerror="this.src=\'img/error.png\'" width="175" height="258"><p ><span>'
					+ contentListJosnArr[i].name.replace(/quot/g, '"') + '</span></p></li>';
			if (i >= (cupage) * 10 && i < (cupage + 1) * 10 && voice < 10
					&& (cupage + 1) > 1) {
				voiceContent[voice] = contentListJosnArr[i].name;
				voice++;
			} else {
				if (voice < 5 && voicecategory == 1001001 && document.getElementsByClassName('recommonList')[0].style.display == 'block') {
					voiceContent[voice] = contentListJosnArr[i].name;
				} else if (voice < 10 && voicecategory == 1001001 && voiceMovieIndex > 0 && document.getElementsByClassName('recommonList')[0].style.display == 'none') {
					voiceContent[voice] = contentListJosnArr[i].name;
				}
//				if (voice < 10 && voicecategory == 1001001 && voiceMovieIndex > 0 && document.getElementsByClassName('recommonList')[0].style.display == 'none') {
//					alert("3");
//					voiceContent[voice] = contentlist[i].name;
//				}
				if (voicecategory != 1001001 && voice < 10) {
					voiceContent[voice] = contentListJosnArr[i].name;
				}
				voice++;

			}

		} else {
			tagul[0].innerHTML = tagul[0].innerHTML
					+ '<li class="moveListLi"><img src="img/movielist/corner_free.png" style="position:absolute;left:0px;top:0px;" width="48" height="51"><img src="'
					+ fileurl + '" onload="this.src=\'' + contentListJosnArr[i].fileurl + '\';this.removeAttribute (\'onload\');" onerror="this.src=\'img/error.png\'" width="175" height="258"><p ><span>'
					+ contentListJosnArr[i].name.replace(/quot/g, '"') + '</span></p></li>';
			if (i >= (cupage) * 10 && i < (cupage + 1) * 10 && voice < 10
					&& (cupage + 1) > 1) {
				voiceContent[voice] = contentListJosnArr[i].name;
				voice++;
			} else {
				if (voice < 5 && voicecategory == 1001001 && cupage == 0) {
					voiceContent[voice] = contentListJosnArr[i].name;
				}else if (voice < 10 && voicecategory == 1001001 && voiceMovieIndex > 0 && document.getElementsByClassName('recommonList')[0].style.display == 'none') {
					voiceContent[voice] = contentListJosnArr[i].name;
				}
				if (voicecategory != 1001001 && voice < 10) {
					voiceContent[voice] = contentListJosnArr[i].name;
				}
				voice++;

			}

		}
	}

	var pageid = $("page");
	cupage = 1;
	if (iTitle == 1 && index == 0) {
		if (usecount > 5) {
			cupage = Math.ceil((usecount - 5) / 10) + 1;
		}
		if (contentListJosnArr.length == 0) {
			totalpage = 0;
		} else {
			totalpage = Math.ceil((contentListJosnArr.length - 5) / 10) + 1;
		}

	} else {
		cupage = Math.ceil(usecount / 10);
		if (contentListJosnArr.length == 0) {
			totalpage = 0;
		} else {
			totalpage = Math.ceil(contentListJosnArr.length / 10);
		}
	}

	pageid.innerHTML = "第" + cupage + "/" + totalpage + "页";

	setmoiveMoveParas();
	if (area.current == 102) {
		fnSetCurrent();
		fnAddEleClass(current.ele, current.area.selStyle);
		if (area.current == 102) {
			movielistfocus();
		}
	}
	initVoice();
	voice = 0;
}
var callback = function(intent) {
	document.getElementsByClassName("moveNum").innerHTML = JSON
			.stringify(intent);
	var command = intent._command;
	var commandarray = command.split(",");
	movielistblur();
	fnRemoveEleClass(current.ele, current.area.selStyle);
	area.current = parseInt(commandarray[1]);
	area[area.current].currentIndex = parseInt(commandarray[commandarray.length - 1]);
	fnSetCurrent();
	fnAddEleClass(current.ele, current.area.selStyle);
	if (parseInt(commandarray[1]) != 100) {
		pageControl.ok();
	} else {
		getpageid = 1;
		usecount = 0;
		tempcontentjsonArr = [];
		temppagenum = 0;
		movecount = 0;
		loadProgramJS();
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
	var voiceArray = [];
	var voicestr="";
	for (var i = 0; i < voicecategory.length; i++) {
		voiceArray[0] = voicecategory[i];
		commands["movie,100," + i] = voiceArray;
		voiceArray = [];
		voicestr = "进入" + voicecategory[i];
		feedbacks["movie,100," + i] = voicestr;
		voicestr="";
	}

	for (var i = 0; i < voiceContent.length; i++) {
		voiceArray[0] = voiceContent[i];
		commands["movie,102," + i] = voiceArray;
		voiceArray = [];
		voicestr = "进入" + voiceContent[i];
		feedbacks["movie,102," + i] = voicestr;
		voicestr="";
	}
	scene["_commands"] = commands;
	scene["_feedbacks"] = feedbacks;
//	var f = true;
//	if (f) {
//		alert(JSON.stringify(scene));
//		f = false;
//	}

	var listener = new Xiri.Listener(callback);
	listener.regist(scene);
	voiceContent = [];
}