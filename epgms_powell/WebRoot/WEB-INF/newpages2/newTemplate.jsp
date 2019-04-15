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
		<form action="templet_add.do" method="post" id="form1"
			enctype="multipart/form-data">
			<div class="main-wrap">
				<div class="form-head">
					<div class="crumb">
						<a href="templet_search.do">模板管理</a> &gt; <a href="#">新增模板</a>
					</div>
				</div>
				<div class="form-main" style="padding-top: 10px;">
					<div class="block">
						<h3 style="font-size: 20px;">基本信息</h3>
						<table cellpadding="0" cellspacing="0" border="0"
							class="form-con add_table">
							<tbody class="cent">
								<tr>
									<th width="140"><i>*</i>模板名称：</th>
									<td width=""><input type="text" name="templetVO.name"
										maxlength="20" value="" id="nameInput" class="ipt"
										style="width: 226px;"></td>
								</tr>
								<tr id="temList">
									<th width="140"><i>*</i>模板类型：</th>
									<td width=""><select name="templetVO.type" id="type"
										class="ipt" style="width: 226px; margin-top: 25px;">
											<option value="1">普通模板</option>
											<option value="2">应急模板</option>
									</select></td>
								</tr>
								<tr>
									<th width="140"><i>*</i>模板文件上传：</th>
									<td><input type="text" name="templetVO.filename"
										maxlength="20" value="" readonly="readonly" id="filenameSel"
										class="ipt" style="width: 226px;">
										<div class="upload">
											<input type="hidden" id="uploadSrc" name="uploadSrc">
											<input type="hidden" id="fileChangeFlg" name="fileChangeFlg" value="0"> 
											<input type="file" class="file-upload newtp" id="apksrc" name="file" onchange="change(this);" style=""> 
												
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
									<input type="hidden" id="source" name="templetVO.source"
										value="2">
								</tr>
								
								<tr id="temList">
									<th width="140"><i>*</i>API环境：</th>
									<td width=""><select name="templetVO.api" id="api"
										class="ipt" style="width: 226px; margin-top: 25px;">
											<option value="0">百途环境</option>
											<option value="1">华为环境</option>
											<option value="2">中兴环境</option>
									</select></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="buttons ts_buttons" id="subBtn">
						<input type="button" class="btn blue-btn" value="保存"
							onclick="goConfirm()"> <input type="button"
							class="btn blue-btn" value="返回 " id="close" onclick="goback()">
					</div>
				</div>
			</div>
		</form>


		<div class="layer confirm" style="display: none;">
			<div class="layer-tit"></div>
			<div class="layer-msg">正在进行保存操作，是否确认保存？</div>
			<div class="confrimBtn">
				<input type="button" class="btn blue-btn" value="确认"
					onclick="goSave()" /> <input type="button"
					class="btn blue-btn cancel" value="取消" />
			</div>
		</div>

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
	<script type="text/javascript"
		src="newpages/js/ajaxFileUpload/ajaxfileupload.js"></script>
	<script type="text/javascript" src="newpages/js/lib/layer/layer.min.js"></script>
	<script type="text/javascript">
		$(function() {
// 			$('#selectId').on('click',function() {
// 								$.ajax({
// 											url : 'templet_getAllStrategyGroups.do',
// 											type : 'post',
// 											dataType : 'json',
// 											success : function(data) {
// 												$("#preTbody").children()
// 														.remove();
// 												for (var i = 0; i < data.length; i++) {
// 													$("#preTbody").append(
// 															"<tr>");
// 													$("#preTbody")
// 															.append(
// 																	"<td width='10%'><input type='checkbox' name='strategyIds' value="+data[i].id+" /></td>");
// 													$("#preTbody")
// 															.append(
// 																	"<td title="+data[i].name+">"
// 																			+ data[i].name
// 																			+ "</td>");
// 													$("#preTbody").append(
// 															"<tr/>");
// 												}
// 												//  			$(".h_bj").show();
// 												$('#select_box').show();
// 												//				$.layer({
// 												//						type: 1,   //0-4的选择,
// 												//						shade: [0.6 , '#000' , true],
// 												//						title: false,
// 												//						border: [0],
// 												//						closeBtn: [0],
// 												//						shadeClose: true,
// 												//						area: ['450px', '280px'],
// 												//						page: {
// 												//							dom:"#select_box"
// 												//						}
// 												//					}); 
// 											}
// 										})
// 							})

// 			$("#j_btnAdd")
// 					.on(
// 							'click',
// 							function() {
// 								var strategyIds = new Array();
// 								$("input[name='strategyIds']:checked")
// 										.each(
// 												function() {
// 													strategyIds[strategyIds.length] = $(
// 															this).val();
// 												});
// 								if (strategyIds.length == 0) {
// 									alert("请选择策略");
// 									//layer.msg("请选择策略",2,3);
// 									return false;
// 								} else {
// 									$.ajax({
// 												url : 'templet_getDownstreamGroups.do?strategyIds='
// 														+ strategyIds,
// 												type : 'post',
// 												dataType : 'json',
// 												success : function(data) {
// 													//console.log(data);
// 													$("#strategyDown").val(
// 															data.groupNames);
// 													$("#strategyGroupIds").val(
// 															data.groupListIds);
// 													$("#select_box").hide();
// 													$(".h_bj").hide();
// 												}
// 											})
// 								}
// 							});

// 			$('#j_hideFormAdd').on('click', function() {
// 				$("#select_box").hide();
// 				$(".h_bj").hide();
// 			})
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
			if (fileName == null || fileName == "" || nameInput == null
					|| nameInput == "" || type == null || type == ""
					|| api == null || api == "") {
				alert("请完整填写带*的内容!");
				//layer.msg("请完整填写带*的内容!",2,3);
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
		function change(target) {

			var fileName = document.getElementById("apksrc").value;
			var extStart = fileName.lastIndexOf(".");
			var ext = fileName.substring(extStart, fileName.length)
					.toUpperCase();
			if (".TAR" == ext) {
				$('#filenameSel').val(fileName);
			} else {
				alert("文件类型错误，请重新上传");
				//layer.msg("文件类型错误，请重新上传",2,3);
				$('#filenameSel').val("");
			}
		}
		function goback() {
			document.forms[0].action = "templet_search.do";
			document.forms[0].method = "POST";
			document.forms[0].submit();

		}
	</script>
</body>
</html>