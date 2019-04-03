// JavaScript Document
    var flag = 0;   // 把调用ajax成功后的操作类型：0：异步调用刷新页面；1：异步调用后进行负责给页面标签
	var xmlHttpIphone = false;
	
	function MakeHttpRequestIphone(){
	
		 return (window.ActiveXObject) ? new window.ActiveXObject ("microsoft.xmlhttp"): new window.XMLHttpRequest();
		 
	}
	
	xmlHttpIphone = MakeHttpRequestIphone();
	
	function callServer(url,fg) {
		
		   var url = url;
		   
		   flag = fg;  
		   
		   xmlHttpIphone.open("POST", url, true);
		   
		   xmlHttpIphone.setRequestHeader( "Content-Type","text/html;charset=utf-8");

		   xmlHttpIphone.onreadystatechange = processResponse;
		   
		   xmlHttpIphone.send(null);
	   
	}
		
	// 处理返回信息函数  
	function processResponse() {  
		if (xmlHttpIphone.readyState == 4) {// 判断对象状态  
			// 信息已经成功返回，开始处理信息 
			var context = xmlHttpIphone.responseText;
			var strArray=new Array();
			if(flag == 0){
				location.reload();
			}else if(flag == 1){
				 var strArray = context.trim().split("$");
				 if(strArray!=null){ 
					  document.getElementById("advertisingid3").value =strArray[0]; 
					  document.getElementById("name3").value =strArray[1]; 
					  document.getElementById("advertisingnum3").value =strArray[2]; 
					  document.getElementById("widths3").value =strArray[3]; 
					  document.getElementById("heigths3").value =strArray[4]; 
					  document.getElementById("type3").value =strArray[5]; 
					  document.getElementById("showrules3").value =strArray[6]; 
			    }			
		   }
		}
	}

