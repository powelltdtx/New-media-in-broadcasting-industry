<%@ page language="java" import="java.util.*" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>模板创建</title>
<link rel="stylesheet" href="resource/newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="resource/newpages/css/font-awesome.min.css">
<link rel="stylesheet" href="resource/newpages/css/common.css">
<link rel="stylesheet" href="resource/newpages/css/cpsp.css">
<link rel="stylesheet" type="text/css" href="newpages/css/newTemp.css" />
<link rel="stylesheet" type="text/css"
	href="newpages/js/lib/layer/skin/layer.css" />
<style type="text/css">
.layer-msg, .confrimBtn {
	margin: 80px 20px;
	text-align: center;
	font-size: 24px;
	color: #FF7A19;
}

.confrimBtn .btn {
	color: #FFFFFF;
	background: #FF7A19;
	margin-top: 30px;
	margin-right: 20px;
}
</style>
</head>
<body>
	<div class="container-fluid">
		<!--主内容部分-->
		<main>
		<form action="templetPool_add.do?picVO.path=1111" method="post" id="form1"
			enctype="multipart/form-data">
			<div class="main-wrap">
				<div class="form-head">
					<div class="crumb">
						<a href="templet_search.do">模板管理</a> &gt; <a href="#">新增模板库</a>
					</div>
				</div>
				<div class="form-main" style="padding-top: 10px;">
					<div class="block">
						<h3 style="font-size: 20px;">基本信息</h3>
						<table cellpadding="0" cellspacing="0" border="0" class="form-con add_table">
							<tbody class="cent">
								<tr>
									<th width="140"><i>*</i>模板名称：</th>
									<td width="">
										<input type="text" name="poolVO.name" maxlength="20" value="" id="nameInput" class="ipt" style="width: 226px;">
									</td>
								</tr>
								<tr id="temList">
									<th width="140"><i>*</i>模板类型：</th>
									<td width="">
										<select name="poolVO.type" id="type" class="ipt" style="width: 226px; margin-top: 25px;">
											<option value="1">普通模板</option>
											<option value="2">应急模板</option>
										</select>
									</td>
								</tr>
								<tr>
									<th width="140"><i>*</i>模板文件上传：</th>
									<td>
										<input type="text" name="poolVO.filename" maxlength="20" value="" readonly="readonly" id="filenameSel" class="ipt" style="width: 226px;">
										<div class="upload">
											<input type="hidden" id="uploadSrc" name="uploadSrc">
											<input type="hidden" id="fileChangeFlg" name="fileChangeFlg" value="0"> 
											<input type="file" style="position: absolute;top:265px;left:694px;" class="file-upload newtp" id="apksrc" name="file" onchange="change(this);" style="">
											<a class="choseTemp">
											   <p>选择文件</p>
												<input type="button" value="" class="btn blue-btn" id="choseBtn">
											</a>
										</div> 
									</td>
								</tr>
								<tr>
									<th width="140">来源厂商：</th>
									<td width="">本地</td>
									<input type="hidden" id="source" name="poolVO.source" value="2">
								</tr>
								
								<tr id="temList">
									<th width="140"><i>*</i>API环境：</th>
									<td width="">
										<select name="poolVO.api" id="api" class="ipt" style="width: 226px; margin-top: 25px;">
											<option value="0">百途环境</option>
											<option value="1">华为环境</option>
											<option value="2">中兴环境</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>
										<div class="picImg" style="margin-top: 45px;">
											<img src="resource/img/admin/default.jpg" alt="" id="uploadImage" width="185" height="135"/>
										</div>
										<input type="hidden" id="uploadImageSrc"/>
									</td>
									<td>
										<div class="upload">
											<input type="file" style="position:absolute;top:470px;left:690px;z-index:9999;opacity:0 !important;" name="file" id="image" class="file-upload" onchange="uploadPic(this);"/> 
											<input type="button" style="color:#ffffff;width:165px; height:30px;line-height:30px;background-color:#ff7a19; border-radius: 5px;position:absolute;top:470px;left:690px;border:none;"  value="上传图片" class="choseTempPic" />
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<div class="layer confirm" style="display: none;">
						<div class="layer-tit"></div>
						<div class="layer-msg">正在进行保存操作，是否确认保存？</div>
						<div class="confrimBtn">
							<input type="button" class="btn blue-btn" value="确认"
								onclick="goSave()" /> <input type="button"
								class="btn blue-btn cancel" value="取消" />
						</div>
					</div>	
					<div class="buttons ts_buttons" id="subBtn">
						<input type="button" class="btn blue-btn" value="保存" onclick="goConfirm()"> 
						<input type="button" class="btn blue-btn" value="返回 " id="close" onclick="goback()">
					</div>
				</div>
			</div>
		</form>

		<!--灰背景-->
		<div class="h_bj"></div>
		<!--loading-->
		<div class="loading">
			<img src="resource/img/admin/loading.gif" />
		</div>
		</main>
	</div>
	<script src="newpages/js/jquery-3.2.1.min.js"></script>
	<script src="newpages/js/bootstrap.min.js"></script>
	<script src="newpages/layDate/laydate/laydate.js"></script>
	<script src="newpages/js/common.js"></script>
	<script src="newpages/js/newTemp.js"></script>
	<script type="text/javascript" src="newpages/js/ajaxFileUpload/ajaxfileupload.js"></script>
	<script type="text/javascript" src="newpages/js/lib/layer/layer.min.js"></script>
	<script type="text/javascript">
		$(function() {
			$('.cancel').on('click', function() {
				layer.closeAll();
			});
		})
		function goSave() {
			layer.closeAll();
			$(".h_bj").show();
			$(".loading").show();
			upload();
		}

		function goConfirm() {
			var fileName = document.getElementById("filenameSel").value;
			var nameInput = document.getElementById("nameInput").value;
			var type = document.getElementById("type").value;
			var api = document.getElementById("api").value;
			var picPath = $("#uploadImageSrc").val();
			if (fileName == null || fileName == "" || nameInput == null || 
									nameInput == "" || type == null || type == "" || 
									api == null || api == "" || picPath == null || picPath == "") {
				alert("请完整填写带*的内容!");
				return;
			} else {
				$.layer({
					type : 1, //0-4的选择,
					shade : [ 0.6, '#000', true ],
					title : false,
					border : [ 0 ],
					closeBtn : [ 0 ],
					shadeClose : true,
					area : [ '450px', '280px' ],
					page : {
						dom : ".confirm"
					}
				});
			}
		}

		/**文件上传*/
		function upload() {
			var fullpath = $("#uploadSrc").val();
			$.ajaxFileUpload({
				url : "upload.do?", //需要链接到服务器地址
				secureuri : false,
				fileElementId : 'apksrc', //文件选择框的id属性
				dataType : 'content', //服务器返回的格式content，可以是JSON
				//相当于java中try语句块的用法
				async : false,
				timeout : 0,
				type : 'post',
				success : function(result, data) { //data是从服务器返回来的值
					var rs = JSON.parse(result);
					if (rs.success == false) {
						$(".h_bj").hide();
						$(".loading").hide();
						layer.closeAll();
						alert(rs.errorMsg);
					} else {
						$("#uploadSrc").val(rs.path);
						var picPath = $("#uploadImageSrc").val();
						document.forms[0].setAttribute("action","templetPool_add.do?picVO.path=" + picPath);
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
		
		/**图片上传*/
		function uploadPic(target) {
			var fileName = document.getElementById("image").value;
			var ext = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
		
			if (ext == ".jpg" || ext == ".png" || ext == ".jpeg") { 
			    
				$.ajaxFileUpload({
		
					//url : "upload.do?code="+$("#code").val()+"&imageContentType="+$('#imageContentType').val()+"&temp="+new Date().getTime()+"&savePath=program", //需要链接到服务器地址
					url : "uploadNameByTime.do?temp="+new Date().getTime()+"&savePath=templatePoolPic", //需要链接到服务器地址
					secureuri : false,
					fileElementId : 'image', //文件选择框的id属性
					dataType : 'content', //服务器返回的格式content，可以是JSON
					//相当于java中try语句块的用法
					success : function(result, data) { //data是从服务器返回来的值
						//result:templatePoolPic/1527042734064.jpg 
						//data:success
						if (data == "fail") {
						     layer.msg("上传失败，请重新上传",3,3);
						} else {
						    if(result == "fail"){
						        layer.msg("上传文件不能大于2M！", 3, 3);
						    }else{
								var uploadImage = result;
								document.getElementById("uploadImage").src=uploadImage+"?id="+Math.random();
								$("#uploadImageSrc").val(uploadImage);
							}
						}
					},
					//相当于java中catch语句块的用法
					error : function(data, status, e) {
						layer.msg("上传失败，请重新上传",3,3);
					}
				});
			} else {
				layer.msg("规则文件类型不正确,允许类型:jpg png jpeg",3,3);
			}
			return false;
		}
		function change(target) {

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
		function goback() {
			document.forms[0].action = "templetPool_searchTemplatePool.do";
			document.forms[0].method = "POST";
			document.forms[0].submit();

		}
	</script>
</body>
</html>