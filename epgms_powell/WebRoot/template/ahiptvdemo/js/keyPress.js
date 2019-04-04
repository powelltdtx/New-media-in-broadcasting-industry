var pressFlag = true;


function keyBvod(){
	var url = "chan_RecordList.jsp";
	window.location.href = url;
}

function keyTvod(){
	var url = "tvod_progBillByRepertoire.jsp";
	window.location.href = url;
}

	function keyVod(){
	var url = "vod_Category.jsp ";
	window.location.href = url;
}

keyBlue = function(){
	//var url = "xf_category.html";
	//window.location.href = url;
}

function keyFavourite(){
	//var url = "favorite.jsp";
	//window.location.href = url;
}

//接收机顶盒发送的虚拟事件
/*keyIptvEvent = function()
{
	eval("eventJson="+Utility.getEvent());
	var typeStr = eventJson.type;
	switch(typeStr)
	{	
		case "EVENT_TVMS":
		case "EVENT_TVMS_ERROR":
			top.tvms.dealKeyEvent(eventJson);
			return 0;
		default:
			goUtility(eventJson);
			return 0;
	}
	return true;
}*/
keyTrack = function (){EPG.keyTrack();}
keyPageUp = function(){EPG.keyPageUp();}
keyPageDown = function(){EPG.keyPageDown();}
keyIME = function(){}
keyFav = function(){}
keyMore = function(){}
keySearch = function(){}

goUtility = function(){EPG.goUtility(eventJson);}
keyPausePlay = function(){EPG.keyPausePlay();}
keyVolUp = function(){EPG.keyVolUp();}
keyVolDown = function(){EPG.keyVolDown();}
keyChannelUp = function(){EPG.keyChannelUp();}
keyChannelDown = function(){EPG.keyChannelDown();}
keyMute = function(){EPG.keyMute();}
keyFastForward = function(){EPG.keyFastForward();}
keyFastRewind = function(){EPG.keyFastRewind();}

keyPreviewTimesOver = function(){EPG.keyPreviewTimesOver();}
keyPreviewTimesUp = function(){EPG.keyPreviewTimesUp();}
keyStbNoChannel= function(){EPG.keyStbNoChannel();}

keyInfo = function(){EPG.keyInfo();}
keyHelp = function(){EPG.keyHelp();}
keyPos = function(){EPG.keyPos();}


//以下代码为输入数字键中转致直播
var ChannelNum = "";
var showNumTimeOut = -1;
var lineArray = ["_","__","___"];
var lineIndex = 0;
var lineTimeout = -1;


 function inputNum(num){
	 if (playmode == "pause")return ;
	// createDiv("channel_num","50px","36px");
	ChannelNum = ChannelNum + num;
	//没下划线时输入数字的最大长度为3,有下划线时输入的最大长度为下划线的长度
	if(ChannelNum.length == 4 || (checkChanNumShow() && ChannelNum.length == (lineIndex+2)))
	{
		ChannelNum = num + "";
	}
	// window.frames["EPG"].window.document.getElementById("channel_num").innerText = ChannelNum;
	document.getElementById("channel_num").innerText = ChannelNum;
	showChanNumDiv("channel_num");
	clearTimeout(showNumTimeOut);
	clearTimeout(lineTimeout);
	showNumTimeOut = setTimeout(function (){
	if(!checkChanNumShow() || ChannelNum.length == (lineIndex+1))//判断输入的数字是否等于下划线的长度
	{
		playChannel();
	}
	},2000);
}

//上下左右键扩展方法
/*	keyUp = function(){}
	keyDown = function(){}
	keyLeft = function(){}
	keyRight = function(){}*/

function closeIframe()
{
	document.getElementById("tvmsInfo").style.display = "none";
	document.getElementById("close").blur();
	
}

function playChannel()
{
	if(ChannelNum == "")
	{
		return;
	}
	if(typeof(changeChannelByNum) == "undefined")
	{
		goToPlayChannel(ChannelNum);
	}
	else
	{
		changeChannelByNum(ChannelNum);
		hiddenChanNumDiv("channel_num");
		hiddenChanNumDiv("channel_line");
	}
	ChannelNum = "";
}
function goToPlayChannel(ChannelNum)
{
	window.location.href = "ChanDirectAction.jsp?chanNum="+ChannelNum;
}
function keyBottomLine()
{
	createDiv("channel_line","35px","48px");
	clearTimeout(lineTimeout);

	if(checkChanNumShow())
	{
		lineIndex++;
		if(lineIndex == lineArray.length)
		lineIndex=0;
	}
	
	ChannelNum = "";
	document.getElementById("channel_num").innerText = ChannelNum;
	document.getElementById("channel_line").innerText = lineArray[lineIndex];

	showChanNumDiv("channel_line");
	lineTimeout = setTimeout(function(){hiddenChanNumDiv("channel_line");},2000);
}
function showChanNumDiv(divName)
{
	document.getElementById(divName).style.display = "block";
}
function hiddenChanNumDiv(divName)
{
	document.getElementById(divName).style.display = "none";
}
function checkChanNumShow()
{
	return document.getElementById("channel_line").style.display == "block";
}

document.onkeydown = grabEvent;
document.onkeydown = grabEvent;

function grabEvent(event)
{	
	//var keycode = event.which;
	var keycode = event.keyCode;
	switch(keycode)
	{
		case  8 :keyBack() ;return 0;break;
		case 270:keyBack() ;return 0;break;
		case 275:keyBvod() ;return 0;break;
		case 276:keyTvod() ;return 0;break;
		case 277:keyVod() ;return 0;break;
		case 278:loadMiniInfo() ;return 0;break;
		case 281:keyFavourite() ;return 0;break;
		case 271:keyPos() ;return 0;break;
		case 1108:keyBvod() ;return 0;break;
		case 1110:keyTvod() ;return 0;break;
		case 1109:keyVod() ;return 0;break;
		case 1111:keyComm() ;return 0;break;
		case 262 :keyTrack() ;return 0;break;
		case 268 :keyInfo() ;return 0;break;
		case 284 :keyHelp() ;return 0;break;
		case 768 : 
			if(typeof(patentwindowflag) != "undefined" && patentwindowflag){
				document.getElementById("videoPlay").contentWindow.keyIptvEvent();
			}else{
				keyIptvEvent();
			}
			return 0;break;
		case 263 : keyPausePlay() ;return 0;break;
		case 259:keyVolUp();return 0;break;
		case 260:keyVolDown();return 0;break;
		case 257:keyChannelUp() ;return 0;break;
		case 258:keyChannelDown() ;return 0;break;
		case 261:keyMute() ;return 0;break;
		case 264:keyFastForward() ;return 0;break;
		case 265:keyFastRewind() ;return 0;break;
		case 283:keyBottomLine() ;return 0;break;
		case 39170:keyPreviewTimesOver() ;return 0;break;
		case 39171:keyPreviewTimesUp() ;return 0;break;
		case 39172:keyStbNoChannel() ;return 0;break;
		case 37 :keyLeft(); return 0;break;
		case 39 :keyRight() ;return 0;break;
		case 38 :keyUp() ;return 0;break;
		case 40 :keyDown() ;return 0;break;
		case 48 :inputNum(0) ;return 0;break;
		case 49 :inputNum(1) ;return 0;break;
		case 50 :inputNum(2) ;return 0;break;
		case 51 :inputNum(3) ;return 0;break;
		case 52 :inputNum(4) ;return 0;break;
		case 53 :inputNum(5) ;return 0;break;
		case 54 :inputNum(6) ;return 0;break;
		case 55 :inputNum(7) ;return 0;break;
		case 56 :inputNum(8) ;return 0;break;
		case 57 :inputNum(9) ;return 0;break;
		case 272:keyPortal() ;return 0;break;
		case 33 :keyPageUp() ;return 0;break;
		case 34 :keyPageDown() ;return 0;break;
		case 13 :keyOk() ;return 0;break;
		default:
			//return 0 ;
			//break ;
	}
	
}

