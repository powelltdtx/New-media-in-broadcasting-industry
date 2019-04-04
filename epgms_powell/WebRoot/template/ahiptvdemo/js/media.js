var mp;
var instanceId = -1;
var continuetime = 0;
function initVideo() {
    mp = new MediaPlayer();
    mp.bindNativePlayerInstance(0);
    instanceId = mp.getNativePlayerInstanceID();
    // MediaPlayer的播放模式. 0：单媒体的播放模式 (默认值)，1: 播放列表的播放模式
    var playListFlag = 0;
    var videoDisplayMode = 1;

    var height = 720;
    var width = 1280;
    var left = 0; 		// 自定义尺寸必须指定
    var top = 0;  		// 自定义尺寸必须指定
    var muteFlag = 0; 		// 0-有声(默认),1-静音
    var useNativeUIFlag = 0; 		// 0-不使用player的本地UI显示功能,1-使用player的本地UI显示功能(默认)
    var subtitleFlag  = 0; 		// 字幕显示,0-不显示字幕(默认),1-显示字幕
    var videoAlpha = 0; 		// 视频的透明度,0-不透明(默认),100-完全透明
    var cycleFlag = 1;		// 0-设置为循环播放（默认值）, 1-设置为单次播放
    var randomFlag = 0;
    var autoDelFlag = 0;
    // 初始化mediaplayer对象
    mp.initMediaPlayer(
       instanceId,
        playListFlag,
        videoDisplayMode,
        height, width, left, top,
        muteFlag, useNativeUIFlag, subtitleFlag,
        videoAlpha,
        cycleFlag,randomFlag,autoDelFlag
    );
    mp.setAllowTrickmodeFlag(0);        //0-允许 TrickMode 操做 ,1-不允许 TrickMode 操作 (默认值)
};
function keyIptvEvent(){
	var json = Utility.getEvent();
	eval("eventJson = " + json);
	var typeStr = eventJson.type;
	switch(typeStr)
    {  	  
		case "EVENT_MEDIA_END":
			if(typeof(playEnd) != "undefined"){
				playEnd();
				return;
			}
			if(typeof(parent.playEnd) != "undefined"){
				parent.playEnd();
				return;
			}			
			break;
		case "EVENT_MEDIA_BEGINING":
			if(continuetime > 0){
				mp.playByTime(1, continuetime);
				continuetime = 0;
			}
			break;	
		case "EVENT_PLAYMODE_CHANGE":
			if(continuetime > 0){
				mp.playByTime(1, continuetime);
				continuetime = 0;
			}
			break;
    }
}
function playVideo(url, time) {
	continuetime = parseInt(time, 10);
    var mediaStr = getMediaStr(url);
    if(!mediaStr) {
        return;
    }
     mp.setSingleMedia(mediaStr);

    if(arguments.length == 6) {
        // 窗口播放
        var left = parseInt(arguments[2]);
        var top = parseInt(arguments[3]);
        var width = parseInt(arguments[4]);
        var height = parseInt(arguments[5]);
        mp.setVideoDisplayMode(0);
        mp.setVideoDisplayArea(left, top, width, height);
        mp.setNativeUIFlag(0);
    } else {
        // 全屏播放
        mp.setVideoDisplayMode(1);
        mp.setNativeUIFlag(0);
    }
    var fr = mp.playFromStart();
    //mp.playByTime(1,time,1);
    mp.refreshVideoDisplay();
    return true;
};
function liveplayVideo(url) {
    var mediaStr = getLiveMediaStr(url);
    if(!mediaStr) {
        return;
    }
     mp.setSingleMedia(mediaStr);

    if(arguments.length == 6) {
        // 窗口播放
        var left = parseInt(arguments[2]);
        var top = parseInt(arguments[3]);
        var width = parseInt(arguments[4]);
        var height = parseInt(arguments[5]);
        mp.setVideoDisplayMode(0);
        mp.setVideoDisplayArea(left, top, width, height);
        mp.setNativeUIFlag(0);
    } else {
        // 全屏播放
        mp.setVideoDisplayMode(1);
        mp.setNativeUIFlag(0);
    }
    //mp.playFromStart();
    mp.playByTime(1,time,1);
    mp.refreshVideoDisplay();
    return true;
};
/** 获取视频播放字符串 */
function getMediaStr(playUrl) {

    var mediaStr = '';
    // 返回针对华为rtsp的播放字符串
    mediaStr = '[{mediaUrl:"'+ playUrl +'",';
    mediaStr += 'mediaCode: "jsoncode1",';
    mediaStr += 'mediaType:2,';
    mediaStr += 'audioType:1,';
    mediaStr += 'videoType:1,';
    mediaStr += 'streamType:1,';
    mediaStr += 'drmType:1,';
    mediaStr += 'fingerPrint:0,';
    mediaStr += 'copyProtection:1,';
    mediaStr += 'allowTrickmode:1,';
    mediaStr += 'startTime:100,';
    mediaStr += 'endTime:20000.3,';
    mediaStr += 'entryID:"jsonentry1"}]';

    return mediaStr;
};

function getLiveMediaStr(playUrl) {
    var mediaStr = '';
    // 返回针对华为rtsp的播放字符串
    mediaStr = '[{mediaUrl:"'+ playUrl +'",';
    mediaStr += 'mediaCode: "jsoncode1",';
    mediaStr += 'mediaType:1,';
    mediaStr += 'audioType:1,';
    mediaStr += 'videoType:1,';
    mediaStr += 'streamType:1,';
    mediaStr += 'drmType:1,';
    mediaStr += 'fingerPrint:0,';
    mediaStr += 'copyProtection:1,';
    mediaStr += 'allowTrickmode:1,';
    mediaStr += 'entryID:"jsonentry1"}]';
    return mediaStr;
};

function closemedia() {
	mp.stop();
    mp.releaseMediaPlayer(instanceId);
   // mp.refreshVideoDisplay();
    instanceId = -1;
};

function bindVideo() {
    mp = new MediaPlayer();
    // 绑定本地的媒体播放实例
    mp.bindNativePlayerInstance(instanceId); 
    if(arguments.length == 4) {
        // 窗口播放
        var left = parseInt(arguments[0]);
        var top = parseInt(arguments[1]);
        var width = parseInt(arguments[2]);
        var height = parseInt(arguments[3]);
        mp.setVideoDisplayMode(0);
        mp.setVideoDisplayArea(left, top, width, height);
        mp.setNativeUIFlag(0);
    } else {
        // 全屏播放
        mp.setVideoDisplayMode(1);
        mp.setNativeUIFlag(0);
    }
    // 恢复一下视频,让播放器的状态变量设对来
    mp.resume();  
    mp.refreshVideoDisplay(); 
};

function continueplay(time){
	mp.playByTime(1, continuetime, 1);
}
var int;
function tryplay(){ 
	int = setInterval("breakplay()",5000);
}
function breakplay () {
	if (parseInt(mp.getCurrentPlayTime()) >= 360) {
		mp.stop();
	}
}
