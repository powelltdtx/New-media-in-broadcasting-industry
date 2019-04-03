var xmlHttpIphone = false;

function MakeHttpRequestIphone(){
	 return (window.ActiveXObject) ? new window.ActiveXObject ("microsoft.xmlhttp"): new window.XMLHttpRequest();
}

xmlHttpIphone = MakeHttpRequestIphone();

function callServer(url) {
	   var url = url;
	   xmlHttpIphone.open("POST", url, true);
	   xmlHttpIphone.setRequestHeader( "Content-Type","text/html;charset=utf-8");
	   xmlHttpIphone.onreadystatechange = processResponse;
	   xmlHttpIphone.send(null);
}
	
// 处理返回信息函数  
function processResponse() {  
	if (xmlHttpIphone.readyState == 4) {// 判断对象状态  
		var context = xmlHttpIphone.responseText;
		var strArray=new Array();
		$.layer({
	    type: 1,   //0-4的选择,
	    shade: [0.6 , '#000' , true],
	    title: false,
	    border: [0],
	    closeBtn: [0],
	    shadeClose: true,
	    offset:['100px', ''],
	    area: ['580px', '580px'],
	    page: {
	        dom:".selectPage"
	    }
	});
	}
}

