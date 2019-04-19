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

/*keyIptvEvent = function()
{
	var json = Utility.getEvent();
	eval("eventJson = " + json);
	var typeStr = eventJson.type;
	var newplaymode = eventJson.new_play_mode;
	var newplayrate = eventJson.new_play_rate;
	alert("typeStr1=" + typeStr);
	switch(typeStr)
    {  	  
		case "EVENT_MEDIA_END":
			break;
		case "EVENT_MEDIA_BEGINING":
			alert("begin");
			break;	
    }
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

//document.onkeydown = grabEvent;
//document.onkeydown = grabEvent;
document.onkeypress = grabEvent;

function grabEvent(event)
{	
	//var keycode = event.which;
	//var keycode = event.keyCode;
	
	var keycode = event.which ? event.which: event.keyCode;
	//alert("keycode:" + keycode);
	switch(keycode)
	{
		case (8):
			keyBack();
			break;
		case (270):
			keyBack();
			break;
		case (275):
			keyBvod();
			break;
		case (276):
			keyTvod();
			break;
		case (277):
			keyVod();
			break;
		case (278):
			loadMiniInfo();
			break;
		case (281):
			keyFavourite();	
			break;
		case (271):
			keyPos();
			break;
		case (1108):
			keyBvod();
			break;
		case (1110):
			keyTvod() ;
			break;
		case (1109):
			keyVod() ;
			break;
		case (1111):
			keyComm() ;
			break;
		case (262):
			keyTrack();
			break;
		case (268):
			keyInfo();
			break;
		case (284):
			keyHelp();
			break;
		case (768):
			keyIptvEvent();
			break;
		case (263):
			keyPausePlay();
			break;
		case (259):
			keyVolUp();
			break;
		case (260):
			keyVolDown();
			break;
		case (257):
			keyChannelUp();
			break;
		case (258):
			keyChannelDown() ;
			break;
		case (261):
			keyMute() ;
			break;
		case (264):
			keyFastForward() ;
			break;
		case (265):
			keyFastRewind() ;
			break;
		case (283):
			keyBottomLine() ;
			break;
		case (39170):
			keyPreviewTimesOver() ;
			break;
		case (39171):
			keyPreviewTimesUp() ;
			break;
		case (39172):
			keyStbNoChannel() ;
			break;
		case (37):
			keyLeft(); 
			break;
		case (39):
			keyRight() ;
			break;
		case (38):
			keyUp();
			break;
		case (40):
			keyDown();
			break;
		case (48):
			inputNum(0);
			break;
		case (49):
			inputNum(1);
			break;
		case (50):
			inputNum(2);
			break;
		case (51):
			inputNum(3);
			break;
		case (52):
			inputNum(4);
			break;
		case (53):
			inputNum(5);
			break;
		case (54):
			inputNum(6);
			break;
		case (55):
			inputNum(7);
			break;
		case (56):
			inputNum(8);
			break;
		case (57):
			inputNum(9);
			break;
		case (272):
			keyPortal();
			break;
		case (33):
			keyPageUp();
			break;
		case (34):
			keyPageDown();
			break;
		case (13):
			keyOk();
			break;
		case (9):
			keyBack();
			break;
		case 0x300:	
			//alert("0x300");
		// 虚拟按键定义，EPG页面的js逻辑通过onkeypress函数进行响应。虚拟事件通过Utility对象的getEvent函数获取
		/*if(keyIptvEvent&&typeof(keyIptvEvent)=="function"){
			//alert("keyIptvEvent 0x300");
			keyIptvEvent();
		}*/
		keyIptvEvent();
		break;
		default:
			//return 0 ;
			//break ;
	}
	
}

