<%@ page language="java" import="java.util.*"
	contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>新增分域</title>
<link rel="stylesheet" href="newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="newpages/css/font-awesome.min.css">
<link rel="stylesheet" href="newpages/css/common.css">
<link rel="stylesheet" href="newpages/css/cpsp.css">
<link rel="stylesheet" type="text/css" href="newpages/css/addArea.css" />
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
		<form action="" method="post" id="saveArea"
			enctype="multipart/form-data">
			<div class="main-wrap">
				<div class="form-head">
					<div class="crumb">
						<a href="templet_search.do">分域管理</a> &gt; <a href="#">新增分域</a>
					</div>
				</div>
				<div class="form-main" style="padding-top: 10px;">
					<th width=""><i>*</i>基本信息</th>
					<div class="block" style="height:80px">
						<!-- <h3 style="font-size: 20px;">基本信息</h3> -->
						<table cellpadding="0" cellspacing="0" border="0"
							class="form-con add_table">
							<tbody class="cent">
								<tr>
									<th width="100"><i>*</i>分域名称：</th>
									<td width="">
										<input type="text" name="areaVO.name"
											maxlength="20" value="" id="areaName" class="ipt"
											style="width: 226px;">
									</td>

									<th width="100"><i>*</i>分域状态：</th>
									<td width="">
										<input type="text" name="areaVO.status"
											maxlength="20" value="" id="areaStatus" class="ipt"
											style="width: 226px;">
									</td>


									<th width="100"><i>*</i>选择运营商：</th>
									<td width="">
									<select name="areaVO.operator" id="areaOperator"
										class="ipt" style="width: 160px;">
											<option value="0">移动</option>
											<option value="1">联通</option>
											<option value="2">电信</option>
									</select>
									</td>
								</tr>
								<tr style="position: absolute; margin-top: 15px;margin-left: 300px" >
									<td>
										<input type="button" name="" id="addGroup"
											class="btn btn-default primary" value="添加分组" />
									</td>
									<td>
										<input type="button" name="" id="addServer"
											class="btn btn-default primary" value="绑定服务器" />
									</td>
								</tr>
							</tbody>
						</table>

					</div>
                    <div style="width: 700px;margin-left: 0px">
						<th width="140"><i>*</i>分组列表:</th>
						
						<table class="table table-hover text-center" border="1">
							<thead>
								<tr>
									<!-- <th><input class="th_checkbox checkBox" type="checkbox"></th> -->
									<th><span class="spanCls">分组名称</span></th>
									<th><span class="spanCls">分组标识</span></th>
									<th><span class="spanCls">对应用户组</span></th>
									<th><span class="spanCls">用户数量</span></th>
									<th><span class="spanCls">操作</span></th>
								</tr>
							</thead>
	
							<tbody class="form-body" id="groupTbody">
							</tbody>
	
						</table>
						<div style="margin-top: 50px;">
							<th width="140"><i>*</i>服务器列表:</th>
							<table class="table table-hover text-center" border="1">
								<thead>
									<tr>
										<!-- <th><input class="th_checkbox checkBox" type="checkbox"></th> -->
										<th><span class="spanCls">服务器名称</span></th>
										<th><span class="spanCls">服务器IP</span></th>
										<th><span class="spanCls">端口号</span></th>
										<th><span class="spanCls">存储路径</span></th>
										<th><span class="spanCls">操作</span></th>
									</tr>
								</thead>
								<tbody class="form-body" id="serverTbody">
								</tbody>
								</tbody>
		
							</table>
						</div>
					</div>

					
				</div>
			</div>
			<div class="buttons ts_buttons" id="subBtn" >
						<input type="button" class="btn blue-btn" value="保存分域"
							onclick="goSaveArea()"> 
						<input type="button"
							class="btn blue-btn" value="返回 " id="close" onclick="goback()">
			</div>
		</form>

		<!--遮罩层-->
		<div class="mask" id="z_mask"></div>
		<!-- 添加分组 -->
		<div id="j_formAdd" class="form-add">
			<div class="main2" style="overflow: auto; height: 380px;">
				<form id="saveGroup">
					<input type="hidden" id="groupIds" value="" name="groups">
					<input type="hidden" id="serverIds" value="" name="servers">
					<table align="center">
						<tr align="center">
							<td align="center">
							<th width="140" align="center">添加分组</th>
							</td>
						</tr>
						<tr height="15"></tr>
						<tr align="center">
							<th width="140"><i>*</i>分组名称：</th>
							<td width="" align="center"><input type="text"
								name="groupVO.name" maxlength="20" value="" id="groupName"
								class="ipt" style="width: 175px;"></td>
						</tr align="center">
						<tr height="15"></tr>
						<tralign="center">
						<th width="140"><i>*</i>分组标识：</th>
						<td width="" align="center"><input type="text"
							name="groupVO.mark" maxlength="20" value="" id="mark" class="ipt"
							style="width: 175px;"></td>
						</tr align="center">
						<tr height="15"></tr>
						<tr align="center">
							<th width="140"><i>*</i>分组状态：</th>
							<td width="" align="center"><input type="text"
								name="groupVO.status" maxlength="20" value="" id="status"
								class="ipt" style="width: 175px;"></td>
						</tr>
						<tr height="15"></tr>
						<tr align="center">
							<th width="140"><i>*</i>对应用户组：</th>
							<td width="" align="center"><input type="text"
								name="groupVO.usersGroup" maxlength="20" value=""
								id="usersGroup" class="ipt" style="width: 175px;"></td>
						</tr>
						<tr height="15"></tr>
						<tr align="center">
							<th width="140"><i></i>描述：</th>
							<td width="" align="center">
								<!-- <input type="text" name="templetVO.name"
								maxlength="20" value="" id="nameInput" class="ipt"
								style="width: 175px;"> --> <textarea rows="" cols=""
									name="groupVO.description" id="description"></textarea>
							</td>
						</tr>
						<tr height="15"></tr>
						<tr class="form-submit" align="center">
							<td><input type="button" value="保存" id="goSaveServer"></td>
							<td><input type="button" name="j_hideFormAdd" id="notSave"
								value="取消" /></td>
						</tr>
					</table>
				</form>
			</div>
		</div>

		<!-- 绑定服务器 -->
		<div id="server_formAdd" class="form-add">
			<div class="form-add-title" id="select_box">
				<span>请绑定服务器</span>
			</div>
			<div class="main2" style="overflow: auto; height: 158px;">
				<table border="0" cellpadding="0" cellspacing="0" width="100%;">
					<tbody class="form-body" id="choiceServerTbody">
					</tbody>
				</table>
			</div>
			<div class="form-submit">
				<input type="button" value="选择" id="choice"> <input
					type="button" name="j_hideFormAdd" id="notChoice" value="取消" />
			</div>
		</div>



		<div class="layer confirm"  style="display: none;">
			<div class="layer-tit"></div>
			<div class="layer-msg">正在进行保存操作，是否确认保存？</div>
			<div class="confrimBtn">
				<input type="button" class="btn blue-btn" value="确认保存分域"
					onclick="confirmSaveArea()" /> 
				<input type="button" class="btn blue-btn cancel" value="取消保存分域"
					onclick="concleSaveArea()" />
			</div>
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
	
		//绑定服务器
		$("#addServer").on('click',function() {
			//查询所有的服务器列表
			$.ajax({
				url : 'serversManage_searchAll.do',
				type : 'post',
				dataType : 'json',
				success : function(data) {
					$("#choiceServerTbody").children()
							.remove();
					for (var i = 0; i < data.length; i++) {
						$("#choiceServerTbody").append("<tr>");
						$("#choiceServerTbody").append("<td width='10%'><input type='checkbox' name='choiceServerIds' value="+data[i].id+" /></td>");
						$("#choiceServerTbody").append("<td title="+data[i].name+">"+ data[i].name+ "</td>");
						$("#choiceServerTbody").append("<tr/>");
					}
					$('#z_mask').show();
					$('#server_formAdd').show();
				}
			})
		});
		
		//选择绑定服务器
		$("#choice").on('click',function(){
			var choiceServerIds = new Array();
			$("input[name='choiceServerIds']:checked").each(function() {
				choiceServerIds[choiceServerIds.length] = $(this).val();
			});
			if (choiceServerIds.length == 0) {
				alert("请选择服务器");
				return false;
			}else{
				$.ajax({
					url : 'serversManage_searchServerByIds.do?serverIds='+choiceServerIds,
					type : 'post',
					dataType : 'json',
					success : function(data) {
						$("#serverTbody").children().remove();
						//先清除掉隐藏标签中的serverId
						$("#serverIds").val(""); 
						for (var i = 0; i < data.length; i++) {
							//把选择的serverId存入隐藏标签
							$("#serverIds").val($("#serverIds").val()+data[i].id+",");
							$("#serverTbody").append("<tr id="+"serverTr"+data[i].id+"></tr>");
							$("#serverTr"+data[i].id).append("<td title="+data[i].name+">"+ data[i].name+ "</td>");
							$("#serverTr"+data[i].id).append("<td title="+data[i].ip+">"+ data[i].ip+ "</td>");
							$("#serverTr"+data[i].id).append("<td title="+data[i].port+">"+ data[i].port+ "</td>");
							$("#serverTr"+data[i].id).append("<td title=路径>"+data[i].path+"</td>");
							$("#serverTr"+data[i].id).append("<td title="+data[i].id+"><input type='button' name='delServerbtn' id='serverBtn' value='删除' onclick='deleteServer("+ data[i].id+ ")'/></td>");
						}
						$('#z_mask').hide();
						$('#server_formAdd').hide();
					}
				})
			}
		});
		
		//删除已选服务器
		function deleteServer(id){
			//删除对应的服务器对象标签
			$("#serverTr" + id).remove();
			//去掉对应的服务器隐藏id标签中的的id
			var ids = $("#serverIds").val();
			var reids = ids.replace(id+",", "");
			$("#serverIds").val(reids);
		}
		
		//取消选择服务器
		$("#notChoice").on('click',function(){
			$('#z_mask').hide();
			$('#server_formAdd').hide();
		});

		//添加分组
		$("#addGroup").on('click', function() {
			$('#z_mask').show();
			$('#j_formAdd').show();
		});
		
		//删除分组
		function deleteGroup(id) {
			$.ajax({
				url : 'templet_deleteGroupById.do?groupVO.id=' + id,
				type : 'post',
				dataType : 'json',
				success : function(data) {
					//删除对应的分组对象标签
					$("#tr" + id).remove();
					//去掉对应的分组分组对象的id
					var ids = $("#groupIds").val();
					var reids = ids.replace(id+",", "");
					$("#groupIds").val(reids);
				}
			});
		}
		
		//保存分组
		$('#goSaveServer').on('click',function() {
							var groupName = $("#groupName").val();
							var mark = $("#mark").val();
							var status = $("#status").val();
							var usersGroup = $("#usersGroup").val();
							if (groupName == "" || mark == "" || status == "" || usersGroup == "") {
								alert("请完整填写带*的内容!");
								//layer.msg("请完整填写带*的内容!",2,3);
								return;
							} else {

								//$("#saveArea").submit();
								$.ajax({
									type : "POST", //提交的方法
									url : "templet_addGroup.do", //提交的地址  
									data : $('#saveGroup').serialize(),// 序列化表单值  
									async : false,
									success : function(data) { //成功
										var eva = eval('(' + data + ')');
										//把添加的分组id存入hidden标签
										var groupId = eva.groupId;
										$("#groupIds").val($("#groupIds").val() +groupId +",");
										$('#z_mask').hide();
										$('#j_formAdd').hide();
										
										$("#groupTbody").append("<tr id="+"tr"+groupId+"></tr>");
										$("#tr" + groupId).append("<td title="+groupName+">"+ groupName + "</td>");
										$("#tr" + groupId).append("<td title="+mark+">"+ mark+ "</td>");
										$("#tr" + groupId).append("<td title="+status+">"+ status+ "</td>");
										$("#tr" + groupId).append("<td title="+usersGroup+">"+ usersGroup+ "</td>");
										$("#tr" + groupId).append("<td title="+groupId+"><input type='button' name='delbtn' id='btn' value='删除' onclick='deleteGroup("+ groupId + ")'/></td>");
										
										$('#groupName,#mark,#status,#usersGroup,#description').val('');
									}
								});

							/* 	$.ajax({
									url : 'templet_searchGroupByIds.do?groups='+ $("#groupIds").val(),
									type : 'post',
									dataType : 'json',
									success : function(data) {
										//$("#groupTbody").children().remove();
										for (var i = 0; i < data.length; i++) {
											$("#groupTbody").append("<tr id="+"tr"+data[i].id+"></tr>");
											$("#tr" + data[i].id).append("<td title="+data[i].name+">"+ data[i].name+ "</td>");
											$("#tr" + data[i].id).append("<td title="+data[i].mark+">"+ data[i].mark+ "</td>");
											$("#tr" + data[i].id).append("<td title="+data[i].usersGroup+">"+ data[i].usersGroup+ "</td>");
											$("#tr" + data[i].id).append("<td title="+data[i].usersCount+">"+ data[i].usersCount+ "</td>");
											$("#tr" + data[i].id).append("<td title="+data[i].id+"><input type='button' name='delbtn' id='btn' value='删除' onclick='deleteGroup("+ data[i].id+ ")'/></td>");
										}
									}
								}); */
							}
						});
						
		//取消分组
		$('#notSave').on('click', function() {
			$('#z_mask').hide();
			$('#j_formAdd').hide();
		})
		
		//保存分域确认框
		function goSaveArea() {
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
		
		//保存分域
		function confirmSaveArea(){
			var groupIds = $('#groupIds').val();
			var serverIds = $('#serverIds').val();
			
			var areaName = $('#areaName').val();
			var areaStatus = $('#areaStatus').val();
			var areaOperator = $('#areaOperator').val();
			
			if(groupIds != "" && serverIds != "" && areaStatus!="" && areaOperator!= ""){
				$('#saveArea').attr('action',"templet_addArea.do?groups="+groupIds+"&servers="+serverIds);
				$('#saveArea').submit();
			}else{
				alert("请完整填写带*的内容!");
			}
				
		}
		
		//取消保存分域
		function concleSaveArea(){
			layer.closeAll();
		}
	</script>
</body>
</html>