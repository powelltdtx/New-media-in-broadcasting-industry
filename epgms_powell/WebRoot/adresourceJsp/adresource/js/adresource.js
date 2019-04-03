//下一页
var idTemp;
var adstrategyidTemp;
function nextpage(){
	if(document.forms[0].pageid.value=="" || document.forms[0].pageid.value=="0" ){
			document.forms[0].pageid.value=1;
	}else{
		var currentPage = document.forms[0].pages.value.trim();
		if(currentPage == "1"){
			return false;
		}else{
			document.forms[0].pageid.value = parseInt(document.forms[0].pageid.value) + 1;
			trimBlank();
			document.forms[0].submit();
			return false;
		}
	}
}
//上一页
function backpage(){
	if(document.forms[0].pageid.value=="" || document.forms[0].pageid.value=="1" || document.forms[0].pageid.value=="0" ){
		document.forms[0].pageid.value=1;
	}else{
		if(parseInt(document.forms[0].pageid.value) > 1){
			document.forms[0].pageid.value = parseInt(document.forms[0].pageid.value) - 1;
		}
	} 
	trimBlank();
	document.forms[0].submit();
	return false;
}
//跳转
function JumptoPage(){
	if(parseInt(document.forms[0].pageid.value)>=parseInt(document.forms[0].pages.value)){
		document.forms[0].pageid.value=document.forms[0].pages.value.trim();
	}
	var pageid=document.forms[0].pageid.value.trim();
	
	var re = /^[1-9]\d*$/;
	if(!re.test(pageid)){
		alert("您输入的页码不合法，请从新输入！");
		return false;
	}
	
	trimBlank();
	document.forms[0].submit();
	return false;
}
//增加form提交，字符串出现空格的方法
function trimBlank(){
	document.forms[0].pageid.value = document.forms[0].pageid.value.trim();
}
//edit
function edit(id,adstrategyid){
	window.location.href = "adresourceAction_editNew.do?adresource.adstrategyid=" + adstrategyid + "&adresource.id=" + id;
}
//watch
function watch(id,adstrategyid){
	window.location.href = "adresourceAction_watchNew.do?adresource.adstrategyid=" + adstrategyid + "&adresource.id=" + id;
}
//首页
function firstpage(){
	document.forms[0].pageid.value = 1;
	trimBlank();
	document.forms[0].submit();
    return false;
}
//末页
function lastpage(){
	document.forms[0].pageid.value = parseInt(document.forms[0].pages.value);
	trimBlank();
	document.forms[0].submit();
	return false;
}	
//返回
function onback(){
	window.location.href = "adstrategyAction_searchBykeyword.do?kvc=adstr0";
}
//删除
function del(id,adstrategyid){
	idTemp = id;
	adstrategyidTemp = adstrategyid;
	$.layer({
		type: 1,   //0-4的选择,
		shade: [0.6 , '#000' , true],
 		title: false,
 		border: [0],
 		closeBtn: [0],
 		shadeClose: true,
 		area: ['450px', '210px'],
 		page: {
 			dom:".delete"
 		}
 	});
}

function toDel(){
	$.ajax( {  
		type : "POST",
		url : "adresourceAction_deleteNew.do",
 		dataType: "json",
 		data: {
 			'adresource.id' : idTemp
 		},
 		async: false,
 		success : function(data) {
 			$(".delete").attr("style","display:none");
 			$(".xubox_main").attr("style","display:none");
 			$(".xubox_shade").attr("style","display:none");
 		   	window.location.href = "adresourceAction_adresourceNewlist.do?adresource.adstrategyid=" + adstrategyidTemp;
 		},   
 		error :function(){  
 			alert("error");
 			return false;
 		}   
 	});
}

function cancel(){
	layer.closeAll();
}