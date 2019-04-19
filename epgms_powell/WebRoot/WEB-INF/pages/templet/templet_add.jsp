<%@ page language="java" import="java.util.*" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>模板管理详细</title>
<link href="<%=basePath%>resource/css/admin.css" rel="stylesheet" type="text/css"/>
<link href="<%=basePath%>resource/css/loading.css" rel="stylesheet" type="text/css"/>
<script src="<%=basePath%>resource/js/jquery.js" type="text/javascript"></script>
<script src="<%=basePath%>resource/js/jquery.treeview.js" type="text/javascript"></script>
<script src="<%=basePath%>resource/js/common.js" type="text/javascript"></script>

<script type="text/javascript" src="<%=basePath%>resource/js/lib/laydate/laydate.js"></script>
<script type="text/javascript" src="<%=basePath%>resource/js/lib/layer/layer.min.js"></script>
<script type="text/javascript" src="<%=basePath%>resource/js/ajaxFileUpload/ajaxfileupload.js"></script>
<style type="text/css">
.loading{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 50%;
    margin-left: -15px;
    top: 50%;
    margin-top: -15px;
    z-index: 500;
    display: none;
    
}
.loading img{
    width: 100%;
}
.h_bj{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: .5;
    z-index: 1000;
    display: none;
    filter:alpha(opacity=50);
    /* IE */
    -moz-opacity:0.5;
    /* 老版Mozilla */
    -khtml-opacity:0.5;
    /* 老版Safari */
    _position: absolute;
    _bottom: auto;
    _top:expression(eval(document.documentElement.scrollTop));
}
</style>
</head>
<body>
<form action="templet_add.do" method="post" id = "form1" enctype="multipart/form-data">
<div class="main-wrap">
	<div class="form-head">
		<div class="crumb"><a href="templet_search.do">模板管理</a> > <a href="#">新增模板</a></div>
	</div>
	<div class="form-main" style="padding-top: 10px;">
		<div class="block">
			<h3 style="font-size:20px; color:#FFF;">基本信息</h3>
		<table cellpadding="0" cellspacing="0" border="0" class="form-con add_table">
			<tbody>
				<tr>
					<th width="140"><i>*</i>模板名称：</th>
					<td width="">
						<s:textfield name="templetVO.name" class="ipt" maxlength="20" id="nameInput" style="width: 226px;"/>
					</td>
				</tr>				
				<tr>
					<th width="140"><i>*</i>模板类型：</th>
					<td width="">
						<s:select class="ipt" name="templetVO.type" id="type" list="#request.templet_type" style="width: 242px;"></s:select>
					</td>
				</tr>
			   <tr>
					
					<th width="140"><i>*</i>模板文件上传：</th>
                    <td>
                    	 <s:textfield readonly="true" name="templetVO.filename" class="ipt" maxlength="20" id="filenameSel" style="width: 226px;"/>
		                 <div class="upload">
		                 	<input type="hidden" id="uploadSrc" name="uploadSrc" />
		                 	<input type="hidden" id="fileChangeFlg" name="fileChangeFlg" value="0"/>
							<input type="file" class="file-upload" id="apksrc" name="file" onchange="change(this);"/>
							<input type="button"  value="选择文件" class="btn blue-btn" />
						</div>
                    </td>
				</tr>
				<tr>
					<th width="140">来源厂商：</th>
					<td width="">本地</td>
					<input type="hidden" id="source" name="templetVO.source" value="2"/>
				</tr>
			</tbody>
	   </table>
		</div>
		 
		<div class="block">
	   	<h3 style="font-size:20px; color:#FFF;">下发策略</h3>
		<table cellpadding="0" cellspacing="0" border="0" class="form-con add_table">
			<tbody>   
				<tr>
					<th width="140"><i>*</i>下发策略：</th>
					<td width="">
						<input type="hidden" id="strategyGroupIds" name="templetVO.groupIds" value="<s:property value="templetVO.groupIds"/>"/>
						<s:textarea readonly="true" class="ipt" style="vertical-align:middle;width: 226px;" id="strategyDown" name="templetVO.downstreamGroupName"></s:textarea>
						&nbsp;
						<input type="button" class="btn blue-btn"  value="选择" id="selectId"/>
					</td>
				</tr> 
			</tbody>
		</table>
		</div>
		
		<div class="buttons ts_buttons">
			<input type="button" class="btn blue-btn"  value="保存" onclick="goConfirm()"/>
			<input type="button" class="btn blue-btn"  value="返回 " id = "close" onclick="goback()"/>
		</div>
	</div>
</div>
</form>
<!--弹出层-->
<div class="layer select_box" id="select_box" style="display: none; height:280px;weidth:450px;z-index:20000;">
    <div class="title">请选择下发策略</div>
    <div class="main2" style="overflow :auto;height:150px;weidth:450px;" >
    	<table border="0" cellpadding="0" cellspacing="0" width="100%;" >
    		<tbody class="form-body" id = "preTbody" id = "preTbody">
				
			</tbody>
		</table>
    </div>
    <div class="button">
    <br/>
        <ul>
            <li><input type="button" class="btn blue-btn" value="选择"  id="sele_sel" ></li>
			<li><input type="button" class="btn blue-btn" value="取消"  id="close_sel" ></li>
        </ul>
    </div>
</div>
<div class="layer confirm">
    <div class="layer-tit"></div>
    <div class="layer-msg">
        正在进行保存操作，是否确认保存？
    </div>
    <div class="buttons">
        <input type="button" class="btn blue-btn" value="确认"  onclick="goSave()"/>
        <input type="button" class="btn blue-btn cancel" value="取消"/>
    </div>
</div>
<!--灰背景-->
<div class="h_bj"></div>
<!--loading-->
<div class="loading">
    <img src="resource/img/admin/loading.gif"/>
</div>
<script type="text/javascript">
$(function(){
		$('#selectId').on('click' , function(){
			$.ajax( {  
		    url:'templet_getAllStrategyGroups.do',  
		    type:'post',
		    dataType:'json',  
		    success:function(data) {  
		    	$("#preTbody").children().remove();
		    	for (var i=0;i<data.length;i++) {
		    		$("#preTbody").append("<tr>");
		    		$("#preTbody").append("<td width='10%'><input type='checkbox' name='strategyIds' value="+data[i].id+" /></td>");
		    		$("#preTbody").append("<td title="+data[i].name+">"+data[i].name+"</td>");
		    		$("#preTbody").append("<tr/>");
		    	}
		    	$(".h_bj").show();
		    	$('#select_box').show();
//				$.layer({
//						type: 1,   //0-4的选择,
//						shade: [0.6 , '#000' , true],
//						title: false,
//						border: [0],
//						closeBtn: [0],
//						shadeClose: true,
//						area: ['450px', '280px'],
//						page: {
//							dom:"#select_box"
//						}
//					}); 
		     	}
			})
		})
		
		$("#sele_sel").on('click',function(){
				var strategyIds = new Array();
		 		$("input[name='strategyIds']:checked").each(function(){
		 			strategyIds[strategyIds.length]=$(this).val();
		 		});
		 		if(strategyIds.length==0){
		 			alert("请选择策略");
		 			//layer.msg("请选择策略",2,3);
			    	return false;
		 		}else {
		 			$.ajax( {  
					    url:'templet_getDownstreamGroups.do?strategyIds=' + strategyIds,  
					    type:'post', 
					    dataType:'json',  
					    success:function(data) {  
							//console.log(data);
							$("#strategyDown").val(data.groupNames);
							$("#strategyGroupIds").val(data.groupListIds);
							$("#select_box").hide();
							$(".h_bj").hide();
							}
						})
				}
		});
			
		$('#close_sel').on('click' , function(){
			$("#select_box").hide();
			$(".h_bj").hide();
		})
		$('.cancel').on('click', function(){
			layer.closeAll();
		});

	})

function goSave(){
		$(".h_bj").show();
	    $(".loading").show();
	 	upload();
}

function goConfirm(){
	var fileName = document.getElementById("filenameSel").value;
	var nameInput = document.getElementById("nameInput").value;
	var type = document.getElementById("type").value;
	var strategyGroupIds = document.getElementById("strategyGroupIds").value;
	 if(fileName == null || fileName == "" || nameInput == null || nameInput == "" 
	 || type == null || type == "" || strategyGroupIds == null || strategyGroupIds == ""){
	 	alert("请完整填写带*的内容!");
	 	//layer.msg("请完整填写带*的内容!",2,3);
	 	return ;
	 } else {
		$.layer({
	        type: 1,   //0-4的选择,
	        shade: [0.6 , '#000' , true],
	        title: false,
	        border: [0],
	        closeBtn: [0],
	        shadeClose: true,
	        area: ['450px', '280px'],
	        page: {
	            dom:".confirm"
	        }
		});
	 }
}


	/**文件上传*/
function upload() {
		var fullpath = $("#uploadSrc").val();
		$.ajaxFileUpload({
			url : "upload.do?savePath=tar", //需要链接到服务器地址
			secureuri : false,
			fileElementId : 'apksrc', //文件选择框的id属性
			dataType : 'content', //服务器返回的格式content，可以是JSON
			//相当于java中try语句块的用法
			async: false,
			timeout:0,
			type:'post',
			success : function(result, data) { //data是从服务器返回来的值
				var rs = JSON.parse(result);
				if (rs.success == false) {
					$(".h_bj").hide();
					$(".loading").hide();
					layer.closeAll();
					alert(rs.errorMsg);
				    //layer.msg(rs.errorMsg,2,3);
				} else {
					$("#uploadSrc").val(rs.path);
					document.forms[0].submit();
				}
			},
			//相当于java中catch语句块的用法
			error : function(data, status, e) {
				alert("上传失败，请重新上传");
				//layer.msg("上传失败，请重新上传",2,3);
			}
		});
		return false;
};
function change(target){

	var fileName = document.getElementById("apksrc").value;
	var extStart = fileName.lastIndexOf(".");
	var ext = fileName.substring(extStart, fileName.length).toUpperCase();
	if (".TAR" == ext) {
		$('#filenameSel').val(fileName);
	} else {
		alert("文件类型错误，请重新上传");
		//layer.msg("文件类型错误，请重新上传",2,3);
		$('#filenameSel').val("");
	}
}
function goback(){
	document.forms[0].action="templet_search.do";
    document.forms[0].method="POST";
    document.forms[0].submit();
	
}
</script>
</body>
</html>
