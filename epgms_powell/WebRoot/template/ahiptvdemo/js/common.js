//获取id
function $(aaa){
	var a = document.getElementById(aaa);
	return a;	
}
//刷新时间
function fnRefreshTime(interval){
	interval=typeof interval==='undefined'?60:interval
	var d=new Date()
	var mins=d.getMinutes()
	time.innerHTML=d.getHours()+':'+(mins<10?('0'+mins):mins)
	setTimeout(function(){
		fnRefreshTime()
	},interval*1000)
	var months=d.getMonth();
	day.innerHTML=(months<10?(''+months+1):months+1) + "/" + d.getDate();
}
//一个元素动画
function fnEleAnimat(ele,styleName,current,des,mul,callback,callbackParas){
	isAnimat=true
	
	animat()
	function animat(){
		current+=mul
		if(moveEnd()){
			current=des
			fnUpdateEleStyle(ele,styleName,current+'px')
			callback&&callback(callbackParas)
			isAnimat=false
			return
		}
		fnUpdateEleStyle(ele,styleName,current+'px')
		setTimeout(animat,20)
	}
	function moveEnd(){
		return mul>0?current>=des:current<=des
	}
}
//两个元素同时动画
function fnElesAnimat(ele1,styleName1,current1,des1,mul1,ele2,styleName2,current2,des2,mul2,callback,callbackParas){
	isAnimat=true
	animat()
	function animat(){
		var ele1MoveEnd=false
		var ele2MoveEnd=false
		current1+=mul1
		current2+=mul2
		if(!ele1MoveEnd){
			if(moveEnd1()){
				current1=des1
				fnUpdateEleStyle(ele1,styleName1,current1+'px')
				ele1MoveEnd=true
			}else{
				fnUpdateEleStyle(ele1,styleName1,current1+'px')
			}
		}
		if(!ele2MoveEnd){
			if(moveEnd2()){
				current2=des2
				fnUpdateEleStyle(ele2,styleName2,current2+'px')
				ele2MoveEnd=true
			}else{
				fnUpdateEleStyle(ele2,styleName2,current2+'px')
			}
		}
		//两个动画都结束
		if(ele1MoveEnd&&ele2MoveEnd){
			callback&&callback(callbackParas)
			isAnimat=false
			return
		}
		setTimeout(animat,20)
	}
	function moveEnd1(){
		return mul1>0?current1>=des1:current1<=des1
	}
	function moveEnd2(){
		return mul2>0?current2>=des2:current2<=des2
	}
}
//更改元素样式
function fnUpdateEleStyle(ele,styleName,val){
	ele.style[styleName]=val
}
//移除元素样式
function fnRemoveEleClass(ele,className){
	var classNames=ele.className
	if(classNames.indexOf(className)==0){

		ele.className=classNames.replace(className,'')
	}
	if(classNames.indexOf(className)>0){
		ele.className=classNames.replace(' '+className,'')
	}
}
//添加元素样式
function fnAddEleClass(ele,className){
	if(ele.className.indexOf(className)>=0){
		return
	}
	ele.className+=' '+className
}
//修改元素样式
function fnModifyEleClass(ele,oldClassName,newClassName){
	if(ele.className.indexOf(oldClassName)>=0){
		fnRemoveEleClass(ele,oldClassName)
	}
	fnAddEleClass(ele,newClassName)
}
//移除当前节目效果
function fnRemoveCurrentStyle(){
	fnAddEleClass(program.current.ele.getElementsByClassName('program-sel')[0],'dn')
}
//添加当前节目效果
function fnAddCurrentStyle(){
	fnRemoveEleClass(program.current.ele.getElementsByClassName('program-sel')[0],'dn')
}
function fnGetQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

//nav添加移入样式
function changeUrlIn(ele){
	var src = ele.getElementsByTagName('img')[0].getAttribute('src')
	var imgName = src.slice(src.indexOf('/')+1,src.indexOf('.'))+'H';
	ele.getElementsByTagName('img')[0].setAttribute('src','images/'+imgName+'.png')
}

//nav添加移出样式
function changeUrlOut(ele){
	var src = ele.getElementsByTagName('img')[0].getAttribute('src')
	var imgName = src.slice(src.indexOf('/')+1,src.indexOf('.'));
	imgName=imgName.substring(0,imgName.length-1)	
	ele.getElementsByTagName('img')[0].setAttribute('src','images/'+imgName+'.png')
}

//动态插入电影海报焦点列表
function pushMMp(){
moiveMoveParas = [];
	
for(var i = 0; i < moveList.length; i++){	
	//不是最后一行  并且 不是最后一个元素  并且 第二行对应的位置还有元素
	if(Math.floor(i/5) < oUlNum-1 && i!=moveList.length-1 && i+5<moveList.length){
	
		moiveMoveParas.push({up:Math.floor(i/5)==0?-1:i-5,right:i+1,down:i+5,left:i-1});
		}
		
	//不是最后一行  并且 不是最后一个元素  并且 第二行没有对应的位置还有元素	
	if(Math.floor(i/5)< oUlNum-1 && i!=moveList.length-1 && i+5>=moveList.length){
		moiveMoveParas.push({up:Math.floor(i/5)==0?-1:i-5,right:i+1,down:moveList.length-1,left:i-1});
		}	
		
	//不是最后一行  并且 是最后一个元素  并且 第二行没有对应的位置还有元素	
	if(Math.floor(i/5) < oUlNum-1 && i==moveList.length-1 && i+5>=moveList.length){
		moiveMoveParas.push({up:Math.floor(i/5)==0?-1:i-5,right:-1,down:-1,left:i-1});
		}	
		
	//不是最后一行  并且 是最后一个元素  并且 第二行对应的位置还有元素	
	if(Math.floor(i/5) < oUlNum-1 && i==moveList.length-1 && i+5<moveList.length){
		moiveMoveParas.push({up:Math.floor(i/5)==0?-1:i-5,right:-1,down:i+5,left:i-1});
		}
		
			
			
	//在最后一行  并且 不是最后一个元素 
	if(Math.floor(i/5)==oUlNum-1 && i!=moveList.length-1 ){
		moiveMoveParas.push({up:i-5,right:i+1,down:-1,left:i-1});
		}
		
	//在最后一行  并且 是最后一个元素	
	if(Math.floor(i/5)==oUlNum-1 && i==moveList.length-1){
		moiveMoveParas.push({up:i-5,right:-1,down:-1,left:i-1});
		}	
	}
	
for(var i = 0; i < moveList.length; i++){
		
	if(i%5==0){
		moiveMoveParas[i].left = 100;
	}	
	if(i%5==4){
		moiveMoveParas[i].right = -1;
	}
}

}

function getCookie(c_name)
{
	if (document.cookie.length>0){
		var c_start=document.cookie.indexOf(c_name + "=")
		if(c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1
			var c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return document.cookie.substring(c_start,c_end)
		} 
	}
	return ""
}

function setCookieByescape(name,value)
{
	document.cookie = name + "="+ escape (value);
}

function getCookieByunescape(c_name)
{
	if (document.cookie.length>0){
		var c_start=document.cookie.indexOf(c_name + "=")
		if(c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1
			var c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return ""
}

//获取字符串长度	按字符来计算，汉字为2个字符长度
function getStrLength(str){
	str = str.replace(new RegExp(/(&nbsp;)/g), " ");
	var realLength = 0; 
	var len = str.length;
	var charCode = -1;
	for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
}
//获取字符串该长度的字符位置	按字符来计算，汉字为2个字符长度
function getStrIndex(str, length){
	str = str.replace(new RegExp(/(&nbsp;)/g), " ");
	var realLength = 0; 
	var len = str.length;
	var charCode = -1;
	var i = 0;
	for (i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
        if(realLength > length){
        	break;
        }
    }
    return i - 1;
}

function getuserid(){
	var userid = '';
	if(typeof(Authentication) != "undefined"){
		if ('CTCSetConfig' in Authentication) {
	  		userid = Authentication.CTCGetConfig("UserID");//USERID
	 	} else {
	 		userid = Authentication.CTCGetConfig("UserID");
	 	}	
		//alert("userid:" + userid);
	}else{
		//alert("undefined");
	}
	return userid;

}

function playByAPK(playurl,startTime, name, code,tryflag,orderInfo,episodes,callbackurl, videotype, cp){
	var strjson = "{\"intentType\":0,\"appName\":\"com.anhui.tv\", \"className\":\"com.anhui.tv.activity.AnHuiPlayDemandActivity\"," + 
	"\"extra\":[{\"name\":\"PlayUrl\", \"value\":\""+ playurl + "\"}," + 
	"{\"name\":\"StartTime\", \"value\":\""+ startTime + "\"}," + 
	"{\"name\":\"Type\", \"value\":\"0\"}," + 
	"{\"name\":\"Title\", \"value\":\"" + name + "\"},"+
	"{\"name\":\"Vid\", \"value\":\"" + code + "\"},"+
	"{\"name\":\"AutoPlay\", \"value\":\"1\"},"+
	"{\"name\":\"Bwatermark\", \"value\":\"0\"},"+
	"{\"name\":\"Cp\", \"value\":\"" + cp + "\"},"+
	"{\"name\":\"Battempt\", \"value\":\"" + tryflag + "\"},"+
	"{\"name\":\"AttemptTime\", \"value\":\"7\"},"+
	"{\"name\":\"AttemptUrl\", \"value\":\"" + orderInfo + "\"},"+
	"{\"name\":\"License\", \"value\":\"ahdx\"},"+
	"{\"name\":\"Episodes\", \"value\":\"" + episodes + "\"},"+
	"{\"name\":\"WebReturnUrl\", \"value\":\""+ callbackurl + "\"},"+
	"{\"name\":\"VideoType\", \"value\":\"" + videotype + "\"}]}";
	//alert("strjson:" + strjson);
	STBAppManager.startAppByIntent(strjson);
	//alert("back");
}
//catgory_id : 分类
//type : 类型 : 1 分类列表 2 节目列表 3 节目详情 4 频道列表
function getJSPath(catgory_id, type){
	var path = "";
	if("undefined" != typeof config_basepath){
		path = config_basepath;
		if(type == 1){
			path = path + config_jsCategoryPath;
		}else if(type == 2){
			path = path + config_jsContentPath;
		}else if(type == 3){
			path = path + config_jsDetailPath;
		}else if(type == 4){
			path = path + config_jsChannelPath;
		}
		if(catgory_id == ''){
			return path;
		}
		var length = catgory_id.length;
		var location = 1;
		do{
			path = path + catgory_id.substring(0, location) + "/";
			location = location + 3;
			
		}while(location <= length);
	}
	
	return path;
}

function loadJS(url){
	var script = document.createElement("script");
	script.type = "text/javascript";
	if(url.indexOf("?time=") < 0){
		url = url + '?time=' + new Date().getTime();
	}
	script.src = url;
	document.body.appendChild(script);
}
function loadJS_Async(url, callback){
	var script = document.createElement("script");
	script.type = "text/javascript";
	if(script.readyState){ // IE
	      script.onreadystatechange = function(){
	          if(script.readyState == "loaded" || script.readyState == "complete"){
	              script.onreadystatechange = null;
	              callback();
	          }
	      };
	  }else{ // FF, Chrome, Opera, ...
	      script.onload = function(){
	    	  callback();
	      };
	  }
		if(url.indexOf("?time=") < 0){
			url = url + '?time=' + new Date().getTime();
		}
	  script.src = url;
	  document.body.appendChild(script);
}
function randomArray(count, jsonarr, code){
	var length = jsonarr.length;
	var randomarr = [];
	var arrindex = [];
	var flag = true;
	var random = 0;
	if(length == 1){
		return randomarr;
	}
	var i = 0;
	if(length <= (count + 1)){
		var j = 0;
		for(i = 0; i < length; i++){
			if(jsonarr[random].code == code){
				continue;
			}
			randomarr[j] = jsonarr[i];
			j++;
		}
		return randomarr;
	}
	for(i = 0; i < count; i++){
		if(i == 0){
			random = Math.floor(Math.random() * length);
			if(jsonarr[random].code == code){
				i = -1;
				continue;
			}
			arrindex[i] = random;
			randomarr[i] = jsonarr[random];
		}else{
			flag = true;
			while(flag){
				flag = false;
				random = Math.floor(Math.random() * length);
				for(var index in arrindex){
					if(random == arrindex[index]){
						flag = true;
						break;
					}
					if(jsonarr[random].code == code){
						flag = true;
						break;
					}
				}
			}
			arrindex[i] = random;
			randomarr[i] = jsonarr[random];
		}
	}
	return randomarr;
}
function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}