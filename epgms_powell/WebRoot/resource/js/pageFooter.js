/**页脚分页js*/
$(document).ready(function(){
		//跳转
		$("#JumptoPage").click(function(){
			if(/^[1-9]\d*$/.exec(parseInt($('#showPage').val()))) {
				document.getElementById("page").value=document.getElementById("showPage").value;
					if(parseInt(document.forms[0].page.value)>=parseInt(document.forms[0].pages.value)){
	 					document.forms[0].page.value=document.forms[0].pages.value;
			        }
					document.forms[0].submit();
			} else {
				alert('请输入正整数');
			}
			return false;
		});
		//上一页
		$("#backpage").click(function(){
			if(document.forms[0].page.value=="1"){
				document.forms[0].page.value=1;
	        }else{
  				if(document.forms[0].page.value=="0"){
     					document.forms[0].page.value=1;
  				}else{
      				document.forms[0].page.value = parseInt(document.forms[0].page.value) - 1;
  				}
			}  
			document.forms[0].submit();
			return false;
		});
		//下一页
		$("#nextpage").click(function(){
			if(parseInt(document.forms[0].page.value)>=parseInt(document.forms[0].pages.value)){
				document.forms[0].page.value=document.forms[0].pages.value;
			}else{
				document.forms[0].page.value = parseInt(document.forms[0].page.value) + 1;
			}
			document.forms[0].submit();
			return false;
		});
		//首页
		$("#firstpage").click(function(){
			document.forms[0].page.value = 1;
			document.forms[0].submit();
			return false;
		});
		//末页
		$("#lastpage").click(function(){
			document.forms[0].page.value =document.forms[0].pages.value;
			document.forms[0].submit();
			return false;
		});
			
});