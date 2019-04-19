var contentArray;
var strCotent = {
	name:'',
	code:'',
	category_id:'',
	primaryid:'',
	fileurl:'',
	director:'',
	actordisplay:'',
	description:'',
	category_name:'',
	serieslist:'',
	volumncount:'',
	releaseyear:''
};
var tuijianlist;
var category_id=fnGetQueryStringByName('category_id');
var recommendRandomList=new Array();
var resjianquan ='2';
var recordArrJson;

var media = document.getElementsByClassName('media');
var edi = document.getElementsByClassName('edi');
var rol = document.getElementsByClassName('rol');
var readMore = document.getElementsByClassName('readMore')
var variety = document.getElementsByClassName('Variety');
var fun = document.getElementsByClassName('fun');
var recommod = document.getElementsByClassName('recommod');
var collPop = document.getElementsByClassName('collPop');
var varietyPop = document.getElementsByClassName('VarietyPop');
var temptoken = getCookie('temptoken');
var userid = getuserid();
var boxBorder = document.getElementById('border')


//记录位置 0为未出现 1为弹出一层 2为弹出两层
var isColl = 0; //是否收藏


var rolMoveParas = [
];

var mediaMoveParas = [
	{up:-1,right:104,down:106,left:-1}
];

var readMoreMoveParas = [
	{up:-1,right:-1,down:104,left:100}
];

var ediMoveParas = [
	
];

/*var classicMoveParas = [
];*/

var varietyMoveParas = [

];

var funMoveParas = [
	{up:105,right:1,down:107,left:-1},
	{up:105,right:2,down:107,left:0},
	{up:105,right:-1,down:107,left:1}
];

var recommodMoveParas = [
];

var collPopMoveParas = [
];

var varietyPopMoveParas = [
];

var area = {
	100:{
		ele:media,
		paras:mediaMoveParas,
		currentIndex:0,
		selStyle:'sel'
	},
	101:{
		ele:edi,
		paras:ediMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
	},
	102:{
		ele:rol,
		paras:rolMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
	},
	103:{
		ele:readMore,
		paras:readMoreMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
	},
	/*104:{
		ele:classic,
		paras:classicMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
	},*/
	104:{
		ele:variety,
		paras:varietyMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
	},
	105:{
		ele:fun,
		paras:funMoveParas,
		currentIndex:0,
		selStyle:'sel'
	},
	106:{
		ele:recommod,
		paras:recommodMoveParas,
		currentIndex:0,
		selStyle:'sel'
	},
	107:{
		ele:collPop,
		paras:collPopMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
	},
	108:{
		ele:varietyPop,
		paras:varietyPopMoveParas,
		currentIndex:0,
		selStyle:'bulueC'
	},	
	'current':100
}

var current = {};
var pageControl = {};

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
	if(nextEle == -1){
		return false;
	}
	unshowRecordPop();
    if(area.current == 106){
        recomblur();
    }
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
    if(area.current == 106){
        recomfocus();
    }
	if(area.current == 107){
		seriesload();
		setmove();
		return;
	}
	showRecordPop();
}

pageControl.moveRight = function(){
	var nextEle = fnGetNextEleIndex('right');
	if(nextEle == -1){
		return false;
	}
	unshowRecordPop();
    if(area.current == 106){
        recomblur();
    }
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
    if(area.current == 106){
        recomfocus();
    }
	if(area.current == 107){
		seriesload();	
		setmove();
	}
	showRecordPop();
}

pageControl.moveUp = function(){
	var nextEle = fnGetNextEleIndex('up');
	if(nextEle == -1){
		return false;
	}
	unshowRecordPop();
	if(area.current == 103){
		return;
	}
	if(area.current == 106){
		recomblur();
	}
	if(nextEle>=100){
		area.current = nextEle;
		nextEle = current.index;
	}
	
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);	
	showRecordPop();
} 

pageControl.moveDown = function(){
	var nextEle = fnGetNextEleIndex('down');
	if(nextEle == -1){
		return false;
	}
	unshowRecordPop();
	if(nextEle >= 100){
		area.current = nextEle;
		nextEle = current.index;
	}
	fnRemoveEleClass(current.ele,current.area.selStyle);
	current.area.currentIndex = nextEle;
	fnSetCurrent();
	fnAddEleClass(current.ele,current.area.selStyle);
	if(area.current == 106){
		recomfocus();
	}
	showRecordPop();
}
var readMoreflag = false;
pageControl.keyBack = function(){
	
	if(area.current > 106){
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
	if(area.current == 103 && readMoreflag){
		$("morepop").style.display = "none";
		area.current = 103;
		area[103].currentIndex = 0;
		fnSetCurrent();
		fnAddEleClass(current.ele,current.area.selStyle);	
		readMoreflag = false;
		return;
	}	

	var url = getbackurl();
	if(url){
		closemedia();
		window.location=url;
	}
}
var seriesindex = 0; //子集的位置
pageControl.ok=function(){
	if(area.current == 105){
		if(area[105].currentIndex == 0){
			var cururl = '' + location;
			if(cururl.indexOf("&area=") > 0){
				cururl = cururl.substring(0, cururl.indexOf("&area="));
			}
			cururl = cururl + "&area=" + area.current + "&index=" + current.index;
			setpageurl(cururl);
			
			seriesindex = curplayindex;
			maxwindowplay();
		  	//var url = "myplay.jsp?instanceId=" + instanceId + "&playurl=" + playurl + "&time=0";
		  	//url = url + "&pcode=" + code + "&childcode=" + childcode + "&name=" + name + "&vod_episode=" + vod_episode + "&vod_current_episode=" + vod_current_episode + "&imgurl=" + imgurl + "&category_id=" + category_id;	
		  	//url = url + "&category_id=1099001&pcode=" + code + "&childcode=" + childcode + "&name=" + name + "&vod_episode=" + vod_episode + "&vod_current_episode=" + vod_current_episode + "&imgurl=" + imgurl + "&category_id=" + category_id;	
			
		  	//window.location=url;
			return;
		}
		if(area[105].currentIndex == 1 && resjianquan == 2){
			setcollection(collectionflag);
			return;
		}
		if(area[105].currentIndex == 2 && resjianquan != 2){
			setcollection(collectionflag);
			return;
		}		
		if(resjianquan != 2  && area[105].currentIndex == 1){
			/*var returnUrl = '' + location;
			returnUrl = returnUrl.substring(0, cururl.indexOf("&area="));
			returnUrl = encodeURIComponent(returnUrl);
			var contentid = strCotent.primaryid;
			var contentName = strCotent.name;
			var itvAccount = "pwg251";
			var productId = "1001";
			var price = 1000;
			var providerId = "ahgd";
			var temptoken = getCookie('temptoken');
			
			var url = "/bytuetechAPI/Order?returnUrl=" + returnUrl;
			url = url + "&itvAccount=" + itvAccount;
			url = url + "&productId=" + productId;
			url = url + "&contentId=" + contentid;
			url = url + "&price=" + price;
			url = url + "&providerId=" + providerId;
			url = url + "&contentName=" + contentName;
			url = url + "&temptoken=" + temptoken;
			window.location=url;
			return;*/
		}		
	}
	if(area.current == 100){
		var cururl = '' + location;
		if(cururl.indexOf("&area=") > 0){
			cururl = cururl.substring(0, cururl.indexOf("&area="));
		}
		cururl = cururl + "&area=" + area.current + "&index=" + current.index;
		setpageurl(cururl);
		
		seriesindex = curplayindex;
		maxwindowplay();
	  	//var url = "myplay.jsp?instanceId=" + instanceId + "&playurl=" + playurl + "&time=0";
	  //	url = url + "category_id="+code+"&pcode=" + code + "&childcode=" + childcode + "&name=" + name + "&vod_episode=" + vod_episode + "&vod_current_episode=" + vod_current_episode + "&imgurl=" + imgurl + "&category_id=" + category_id;	
//	  	url = url + "&category_id=1099001&pcode=" + code + "&childcode=" + childcode + "&name=" + name + "&vod_episode=" + vod_episode + "&vod_current_episode=" + vod_current_episode + "&imgurl=" + imgurl + "&category_id=" + category_id;	
		
	  	//window.location=url;
		return;
	}
	if(area.current == 104){
		if(contentArray.length<=6){
			var cururl = '' + location;
			if(cururl.indexOf("&area=") > 0){
				cururl = cururl.substring(0, cururl.indexOf("&area="));
			}
			cururl = cururl + "&area=" + area.current + "&index=" + current.index;
			setpageurl(cururl);
			seriesindex =area[104].currentIndex;
			var childcode = contentArray[seriesindex].code;
			//alert("seriesindex1:" + seriesindex + "$childcode:" + childcode);
			flag = 2;
			getplayurl(childcode);
		  	//var url = "myplay.jsp?instanceId=" + instanceId + "&playurl=" + playurl + "&time=" + time;
		  	//url = url + "&category_id="+code+"&pcode=" + code + "&childcode=" + childcode + "&name=" + name + "&vod_episode=" + vod_episode + "&vod_current_episode=" + vod_current_episode + "&imgurl=" + imgurl + "&category_id=" + category_id;
		  	
		  	//window.location=url;
		  	return;
		}else if (contentArray.length>6 && current.index!=5){
			var cururl = '' + location;
			if(cururl.indexOf("&area=") > 0){
				cururl = cururl.substring(0, cururl.indexOf("&area="));
			}
			cururl = cururl + "&area=" + area.current + "&index=" + current.index;
			setpageurl(cururl);
			seriesindex =area[104].currentIndex;
			var childcode = contentArray[seriesindex].code;
			//alert("seriesindex2:" + seriesindex + "$childcode:" + childcode);
			flag = 2;
			getplayurl(childcode);
		  	//var url = "myplay.jsp?instanceId=" + instanceId + "&playurl=" + playurl + "&time=" + time;
		  	//url = url + "&category_id="+code+"&pcode=" + code + "&childcode=" + childcode + "&name=" + name + "&vod_episode=" + vod_episode + "&vod_current_episode=" + vod_current_episode + "&imgurl=" + imgurl + "&category_id=" + category_id;
		  	
		  //	window.location=url;
			return;
		}

	}
	
	if(area.current == 106){
		var category_id = recommendRandomList[parseInt(current.index)];
		var url = '';
		if(category_id != ''){
			url = "varietyDet.jsp?category_id=" + category_id + "&code=" + code+"&temptoken=" + temptoken + "&userid=" + userid;;
		}else{
			url = "varietyDet.jsp?category_id=" + code + "&code=" + code;
		}
		//var url = "moiveDet.jsp?category_id=" + category_id + "&code=" + code;
		closemedia();
		window.location = url;
		return;
	}
	
	if(area.current == 104){
		if(current.index == 5){
			$("copo").style.display = 'block';
			tabload();
			seriesload();
			area.current = 107;
			current.area.currentIndex = 0;
			fnSetCurrent();
			fnAddEleClass(current.ele,current.area.selStyle);
			return;
		}
	}
	
	if(area.current == 108){
		var cururl = '' + location;
		if(cururl.indexOf("&area=") > 0){
			cururl = cururl.substring(0, cururl.indexOf("&area="));
		}
		cururl = cururl + "&area=" + area.current + "&index=" + current.index + "&tabindex=" + area[107].currentIndex;
		setpageurl(cururl);
		seriesindex =(area[107].currentIndex * 10)+area[108].currentIndex*1;
		var childcode = contentArray[seriesindex].code;
		//alert("seriesindex3:" + seriesindex + "$childcode:" + childcode);
		flag = 2;
		getplayurl(childcode);
	  	//var url = "myplay.jsp?instanceId=" + instanceId + "&playurl=" + playurl + "&time=" + time;
	  	//url = url + "&category_id=" + code + "&pcode=" + code + "&childcode=" + childcode + "&name=" + name + "&vod_episode=" + vod_episode + "&vod_current_episode=" + vod_current_episode + "&imgurl=" + imgurl;	
	  	//url = url + "&category_id="+code+"&pcode=" + code + "&childcode=" + childcode + "&name=" + name + "&vod_episode=" + vod_episode + "&vod_current_episode=" + vod_current_episode + "&imgurl=" + imgurl;
		//window.location=url;		
	}
	
	if(area.current == 103){
		var description = strCotent.description;
		if(description.length > 22){
			$("morepop").style.display = "block";
			$("moredeta").innerHTML = description;
			readMoreflag = true;
		}
		
	}
	
}

function setBorderIn(ele){
	ele.style.transform = 'scale(1.05)';
	var w = (ele.getElementsByTagName('img')[0].offsetWidth)*1.05;
	var h = (ele.getElementsByTagName('img')[0].offsetHeight)*1.05;
	var difW = ((ele.getElementsByTagName('img')[0].offsetWidth)*1.05 - ele.getElementsByTagName('img')[0].offsetWidth)/2;
	var difH = ((ele.getElementsByTagName('img')[0].offsetHeight)*1.05 - ele.getElementsByTagName('img')[0].offsetHeight)/2;
	var l = ele.offsetLeft;
	var t = ele.offsetTop;
	boxBorder.style.height = (h-4)+'px';
	boxBorder.style.width = (w-4)+'px';
	boxBorder.style.left = (l-difW)+'px';
	boxBorder.style.top = (t-difH-4)+'px';
	boxBorder.style.opacity = 1;
	}

	
function setBorderOut(ele){
	ele.style.transform = 'scale(1)';
	var w = (ele.getElementsByTagName('img')[0].offsetWidth);
	var h = (ele.getElementsByTagName('img')[0].offsetHeight);
	var difW = ((ele.getElementsByTagName('img')[0].offsetWidth) - ele.getElementsByTagName('img')[0].offsetWidth)/2;
	var difH = ((ele.getElementsByTagName('img')[0].offsetHeight) - ele.getElementsByTagName('img')[0].offsetHeight)/2;
	var l = ele.offsetLeft;
	var t = ele.offsetTop;
	boxBorder.style.height = h+'px';
	boxBorder.style.width = w+'px';
	boxBorder.style.left = (l-difW)+'px';
	boxBorder.style.top = (t-difH)+'px';
	boxBorder.style.opacity = 0;
}

function setBorderIn105(ele){
	ele.style.transform = 'scale(1.05)';
	var w = (ele.offsetWidth)*1.05;
	var h = (ele.offsetHeight)*1.05;
	var difW = ((ele.offsetWidth)*1.05 - ele.offsetWidth)/2;
	var difH = ((ele.offsetHeight)*1.05 - ele.offsetHeight)/2;
	var l = ele.offsetLeft;
	var t = ele.offsetTop;
	boxBorder.style.height = (h-4)+'px';
	boxBorder.style.width = (w-8)+'px';
	boxBorder.style.left = (l-difW)+'px';
	boxBorder.style.top = (t-difH)+'px';
	boxBorder.style.opacity = 1;
}

function setBorderOut105(ele){
	ele.style.transform = 'scale(1)';
	var w = (ele.offsetWidth);
	var h = (ele.offsetHeight);
	var difW = ((ele.offsetWidth) - ele.offsetWidth)/2;
	var difH = ((ele.offsetHeight) - ele.offsetHeight)/2;
	var l = ele.offsetLeft;
	var t = ele.offsetTop;
	boxBorder.style.height = (h-4)+'px';
	boxBorder.style.width = (w-8)+'px';
	boxBorder.style.left = (l-difW)+'px';
	boxBorder.style.top = (t-difH)+'px';
	boxBorder.style.opacity = 0;
}	
var curplayindex = 0;
var baseurl = '';
window.onload=function(){
	baseurl = '' + location;
	baseurl = baseurl.substring(0, baseurl.indexOf('AHvarietyDetail.html'));
	//setcollection(2);
	//datainit();
	var parentcategoryId = category_id.substring(0, category_id.length - 3);
	var jsurl = getJSPath(parentcategoryId, 1);
	jsurl = jsurl + 'C' + parentcategoryId + '.js';
	loadJS(jsurl);
//}
}

function playEnd(){
	//判断是否播放到最后一集
	if((curplayindex + 1) < contentArray.length){
		curplayindex = curplayindex + 1;
		var code = contentArray[curplayindex].code;
		flag = 3;
		getplayurl(code);
		//playVideo(playurl, 0, 58, 48, 530, 313);
	}
}

var flag = 0;//0：第一次加载页面  1：小窗口播放的请求 2：全屏播放的请求
var playurl;
function getplayurl(code){
/*	code = code.replace(/UmaiPROG/,"Umai:PROG/");
	code = code.replace(/AHTVAHGD/,"@AHTV.AHGD");
	var url = "datajsp/getPlayUrl.jsp?code=" + code;
 	dataFrame.location.href = url;*/
}
/*document.getElementById("dataFrame").onload = function () {
	if(flag == 1){
		initVideo();
		var time = '0';
		if(recordArrJson.length > 0){
			time = recordArrJson[0].vod_current_time;
		}
		playVideo(playurl, time, 58, 48, 530, 313);
	}
	if(flag == 2){
		maxwindowplay();
	}
	if(flag == 3){
		playVideo(playurl, 0, 58, 48, 530, 313);
	}
}*/

var collectionflag = 0;
function setcollection(type){
/*	flag = 1;
	var userid = getuserid();
  	var code = strCotent.code;
  	var name = strCotent.name;
  	var imgurl = strCotent.fileurl;
	var url = "datajsp/setcollection.jsp?code=" + code;
	url = url + "&userid=" + userid;
	url = url + "&name=" + name;
	url = url + "&imgurl=" + imgurl;
	url = url + "&flag=" + type;
	collectionFrame.location.href = url;*/
	
}
/*document.getElementById("collectionFrame").onload = function () {
	if(flag == 1){
		if(collectionflag == 1){
			//colled_btn.png
			$('collbt').src = "images/colled_btn.png";
		}else{
			$('collbt').src = "images/coll_btn.png";
		}
	}
}*/

function setmove(){
	var totalwidth = 1012;
	var pindex = current.index;
	var count = collPop.length;
	var width = collPop[pindex].offsetWidth;
	var left = collPop[pindex].offsetLeft;
	var fastleft = collPop[0].offsetLeft;
	if((pindex + 1) < count){
		if((left + width) >= (totalwidth - width)){
			collPop[0].style.marginLeft = (fastleft - width) + 'px';
			return;
		}
	}
	if(pindex == 1){
		collPop[0].style.marginLeft = "0px";
		return;
	}
	if((pindex - 1) > 0){
		if((left - width) <= 0){
			collPop[0].style.marginLeft = (fastleft + width) + "px";
			return;
		}
	}
}

function maxwindowplay(){
	var code = strCotent.code;
	var childcode = contentArray[seriesindex].code;
	var vod_episode = strCotent.volumncount;
	var vod_current_episode = seriesindex + 1;
  	var name = strCotent.name;
  	var imgurl = strCotent.fileurl;
  	var category_id = strCotent.category_id;
	var starttime = 0;
	if(curplayindex == seriesindex){
		starttime = mp.getCurrentPlayTime();
	}
/*	if(recordArrJson.length > 0 && recordArrJson[0].vod_current_episode == vod_current_episode && starttime == 0){
		starttime = recordArrJson[0].vod_current_time;
	}*/
  	var callbackurl = '' + location;
  	callbackurl = callbackurl.substring(0, callbackurl.lastIndexOf("/") + 1) + "callbackForAPK.jsp?";
  	callbackurl = callbackurl + "pcode=" + code + "&childcode=" + childcode + "&name=" + name + "&vod_episode=" + vod_episode + "&vod_current_episode=" + vod_current_episode + "&imgurl=" + imgurl + "&category_id=" + category_id;
  	closemedia();
  	playByAPK(playurl, starttime, contentArray[seriesindex].name, code, "0", "", vod_current_episode, callbackurl, "film", "");
}


function recomfocus(){
    //var name = tuijianlist[current.index].name;
    var name = current.ele.getElementsByTagName("p")[0].innerHTML;
    var len = getStrLength(name);
    if(len > 18){
        //  behavior="alternate" direction="left"
        var marq = '<marquee scrollamount="4">' +  name + '</marquee>';
        current.ele.getElementsByTagName("p")[0].innerHTML = marq;
    }
}

function recomblur(){
    //var len = getStrLength(name);
    if(current.ele.getElementsByTagName("marquee")[0]){
        var name = current.ele.getElementsByTagName("marquee")[0].innerHTML;
        current.ele.getElementsByTagName("p")[0].innerHTML = name;
    }
}

function setRecordPopUp(name){
		$("showRecorddiv").innerHTML = "<span>您上次观看到" + name + "</span>";
		return;
}

function showRecordPop(){
	if(area.current == 105){
		if(area[105].currentIndex == 0 && resjianquan == '2'){
/*			if(recordArrJson.length > 0){
				$("showRecorddiv").style.display = "block";
			}*/
		}
	}
}
function unshowRecordPop(){
	if(area.current == 105){
		if(area[105].currentIndex == 0 && resjianquan == '2'){
	/*		if(recordArrJson.length > 0){
				$("showRecorddiv").style.display = "none";
			}*/
		}
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

function ContentListCallback(jsonarr){
	contentArray = jsonarr;
	strCotent.volumncount = contentArray.length;
	tabnum = Math.ceil(contentArray.length / 10);
	datainit();
	
	if(resjianquan == '2'){
		$("buybt").style.display = "none";
		$("playimg").src = "img/detail/play_btn.png";
		$("playbt").style.display = 'inline-block';
		$("collbutton").style.display = 'inline-block';	
	}else{
		$("playimg").src = "img/detail/try_btn.png";
		$("buybt").style.display = 'inline-block';
		$("playbt").style.display = 'inline-block';
		$("collbutton").style.display = 'inline-block';			
	}
	//获取播放地址并播放
	var code = contentArray[0].code;
	/*if(recordArrJson.length > 0){
		curplayindex = parseInt(recordArrJson[0].vod_current_episode, 10) - 1;
		setRecordPopUp(contentArray[curplayindex].name);
		code = contentArray[curplayindex].code;
	}*/
/*	flag = 1; //标识小窗口播放请求播放地址
	getplayurl(code);*/
	var areaFrom=fnGetQueryStringByName('area');
	var indexFrom=fnGetQueryStringByName('index');
	var tabindexFrom=fnGetQueryStringByName('tabindex');	
	if(parseInt(areaFrom, 10) == 108){
		$("copo").style.display = 'block';
		tabload();
		if(tabindexFrom != ""){
			area[107].currentIndex = parseInt(tabindexFrom, 10);
		}
		seriesload();
	}	
	
	if(areaFrom!=''&&indexFrom!=''&&area[areaFrom].ele[indexFrom]){
		area.current=areaFrom;
		area[area.current].currentIndex=indexFrom;
	}
	//找到获取焦点元素
	fnSetCurrent();
	//添加样式
	fnAddEleClass(current.ele,current.area.selStyle);
	//if(hasorderJson.respCode == 0){
	//if(hasorderJson.ordered == 1 && resjianquan == '2'){
	if(resjianquan == '2'){
		fun = document.getElementsByClassName('has');
		 funMoveParas = [
		    {up:104,right:1,down:106,left:-1},
		    {up:104,right:-1,down:106,left:0}
		];
		$("buybt").style.display = 'none';
		area[105].ele = fun;
		area[105].paras = funMoveParas;
	}
}
function CategoryListCallback(jsonarr){
	var jsurl = getJSPath(category_id, 2);
	jsurl = jsurl + 'P' + category_id + '.js';
	loadJS(jsurl);
	tuijianlist = jsonarr;
	var length = jsonarr.length;
	for(var i = 0; i < length; i++){
		if(category_id == jsonarr[i].primaryid){
			strCotent.name = jsonarr[i].name;
			strCotent.description = jsonarr[i].description;
			strCotent.code = category_id;
			strCotent.category_id = category_id;
			strCotent.fileurl = jsonarr[i].fileurl;
		}
	}
}
