//获取返回的地址
function getbackurl(){
	var strCookie = document.cookie;
	var arrCookie=strCookie.split(";"); //将每个cookie键值对分割出来
	var cookieValue;
	var backurl = "";
	//循环所有键值对，找得backurl
	for(var i=0;i<arrCookie.length;i++){
		cookieValue = arrCookie[i];
		if(cookieValue.indexOf("bytueback") >= 0){
			var strurls = cookieValue.split("=");
			if(strurls[1] != ""){
				var arrurl = strurls[1].split("|");
				backurl = arrurl[arrurl.length - 1];
				backurl = unescape(backurl);//取到的返回地址值
				var index = strurls[1].lastIndexOf('|');
				//重新设置返回地址的值
				if(index == -1){
					document.cookie = "bytueback=" +"; path=/";
				}else{
					document.cookie = "bytueback=" + strurls[1].substring(0, index) +"; path=/";
				}
				break;
				
			}
		}
	}
//	alert("backurl---"+backurl);
	return backurl;
}
//设置返回路径到cookie
function setpageurl(pageurl){
	pageurl = escape(pageurl);//将url编码,防止url中含有特殊字符
//	alert("pageurl--"+pageurl);
	var strCookie = document.cookie;
	var index = strCookie.indexOf("bytueback");
	//判断backurl在cookie是否存在
	if(index >= 0){
//		alert("setpage if index="+index);
		var arrCookie=strCookie.split(";");//将每个cookie键值对取出来
		var cookieValue;
		//循环找到pageurl并修改值
		for(var i=0;i<arrCookie.length;i++){
			cookieValue = arrCookie[i];
			var strurls = cookieValue.split("=");
			var temp = strurls[0];
			if(temp.indexOf('bytueback') >= 0){//判断是否是pageurl
			  var backurls = strurls[1];
			  backurls = backurls + "|" + pageurl;//追加返回地址值
			  document.cookie = "bytueback=" + backurls +"; path=/";
			  break;
			}
		}
	}else{
//		alert("setpage else index="+index);
		document.cookie = "bytueback=" + pageurl +"; path=/";
	}
}