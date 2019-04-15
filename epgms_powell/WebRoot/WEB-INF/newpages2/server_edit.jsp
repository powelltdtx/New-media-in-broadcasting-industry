<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>服务器添加</title>
<link rel="stylesheet" href="resource/newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="resource/newpages/css/font-awesome.min.css">
<link rel="stylesheet" href="resource/newpages/css/common.css">
<link rel="stylesheet" href="resource/newpages/css/cpsp.css" />
<link rel="stylesheet" href="resource/newpages/css/mangerUse.css" />
</head>

<body>
	<div class="container-fluid">
		<!--主内容部分-->
		<main>
			<!--右侧数据(默认)-->
			<form action="serversManage_save.do" method="post">
				<input type="hidden" name="vo.id" id="serverid"
					value="<s:property value="vo.id"/>" />
				<div class="main-wrap">
					<div class="form-head">
						<div class="crumb">
							<a href="SerManage.html">服务器管理</a> &gt; <a
								href="javascript:void(0)">添加页</a>
						</div>
					</div>
					<div class="form-main" style="padding-top: 10px;">
						<table cellpadding="0" cellspacing="0" border="0" class="form-con">
							<tbody>
								<tr>
									<th width="140"><i>*</i>服务器名称：</th>
									<td width="270"><s:textfield name="vo.name"
											id="servername" cssClass="ipt"></s:textfield></td>
									<th width="140"><i>*</i>用户名：</th>
									<td width="270"><s:textfield name="vo.ftpname"
											id="ftpname" cssClass="ipt"></s:textfield></td>
								</tr>
								<tr>
									<th width="140"></th>
									<td height="20"><span id="p_name" class="tsy"></span></td>
									<th width="140"></th>
									<td width="270" height="20"><span id="p_ftpname"
										class="tsy"></span></td>
								</tr>
								<tr>
									<th width="140"><i>*</i>密码：</th>
									<td width="270"><input type="password" class="ipt bt"
										id="password" name="vo.ftppassword"
										value="<s:property value="vo.ftppassword"/>"
										onkeyup="WidthCheck(this,20)" /></td>
									<th width="140"><i>*</i>重复密码：</th>
									<td width="270"><input type="password" class="ipt bt"
										id="password2" value="<s:property value="vo.ftppassword"/>"
										onkeyup="WidthCheck(this,20)" /></td>
								</tr>
								<tr>
									<th width="140"></th>
									<td width="270"><span id="p_password" class="tsy">
											<!--p密码-->
									</span></td>
									<th width="140"></th>
									<td height="20"><span id="p_password2" class="tsy">
											<!--p重复密码-->
									</span></td>
								</tr>
								<tr>
									<th width="140"><i>*</i>状态：</th>
									<td width="270"><select name="vo.status" id="selectStatus"
										class="ipt choseSele">
											<option
												<s:if test='vo.status == ""'>selected="selected"</s:if>
												value="">----</option>
											<option
												<s:if test='vo.status == "1"'>selected="selected"</s:if>
												value="1">生效</option>
											<option
												<s:if test='vo.status == "0"'>selected="selected"</s:if>
												value="0">失效</option>
									</select></td>
									<th width="140"><i>*</i>服务器分组：</th>
									<td width=""><select name="vo.groupid" id="servegroupid"
										class="ipt choseSele">
											<option
												<s:if test='vo.groupid == ""'>selected="selected"</s:if>
												value="">----</option>
											<s:iterator value="#request.grouplist" var="groupvo">
												<option
													<s:if test='#groupvo.id==vo.groupid'>selected="selected"</s:if>
													value="<s:property value="#groupvo.id"/>"><s:property
														value="#groupvo.name" /></option>
											</s:iterator>
									</select></td>
								</tr>
								<tr>
									<th width="140"></th>
									<td width="270" height="20"><span id="p_status"
										class="tsy">
											<!--p状态-->
									</span></td>
									<th width="140"></th>
									<td height="20"><span id="p_groupid" class="tsy">
											<!--p分组-->
									</span></td>
								</tr>
								<tr>
									<th width="140"><i>*</i>IP：</th>
									<td width="270"><s:textfield name="vo.ip" id="serverip"
											cssClass="ipt"></s:textfield></td>
									<th width="140"><i>*</i>端口：</th>
									<td width="270"><s:textfield name="vo.port"
											id="serverport" cssClass="ipt"></s:textfield></td>

								</tr>
								<tr>
									<th width="140"></th>
									<td width="270" height="20"><span id="p_ip" class="tsy">
											<!--p邮箱-->
									</span></td>
									<th width="140"></th>
									<td><span id="p_port" class="tsy"></span></td>
								</tr>
								<tr>
									<th><i>*</i>路径：</th>
									<td colspan="3"><s:textfield name="vo.path"
											id="serverpath" cssClass="ipt"></s:textfield></td>
								</tr>
								<tr>
									<th width="140"></th>
									<td colspan="3" height="20"><span id="p_path" class="tsy"></span></td>
								</tr>
								<tr>
									<th>备注：</th>
									<td colspan="3"><textarea name="vo.description" rows=""
											cols="" id="remark" class="remark"><s:property
												value="vo.description" /></textarea></td>
								</tr>
							</tbody>
						</table>
						<div class="buttons">
							<input type="button" class="btn blue-btn" id="confirm" value="保存" />
							<input type="button" class="btn blue-btn" value="取消"
								onclick="goback()" />
						</div>
						<div class="warn">请完整填写上方必填信息（*）</div>
					</div>
				</div>
			</form>
		</main>
	</div>
	<script src="resource/newpages/js/jquery-3.2.1.min.js"></script>
	<script src="resource/newpages/js/bootstrap.min.js"></script>
	<script src="resource/newpages/js/common.js"></script>
	<script src="resource/newpages/js/mangerUse.js"></script>
</body>
</html>
<script type="text/javascript">
	$(function() {
		$('#confirm')
				.on(
						'click',
						function() {
							var user_code = /^[\w\W]*[%]+[\w\W]*$/; //限制%等特殊字符

							$("#p_name").html("");
							$("#p_name").attr("class", "tsy");

							$("#p_ftpname").html("");
							$("#p_ftpname").attr("class", "tsy");

							$("#p_password").html("");
							$("#p_password").attr("class", "tsy");

							$("#p_password2").html("");
							$("#p_password2").attr("class", "tsy");

							$("#p_status").html("");
							$("#p_status").attr("class", "tsy");

							$("#p_groupid").html("");
							$("#p_groupid").attr("class", "tsy");

							$("#p_ip").html("");
							$("#p_ip").attr("class", "tsy");

							$("#p_port").html("");
							$("#p_port").attr("class", "tsy");

							$("#p_path").html("");
							$("#p_path").attr("class", "tsy");

							if ($("#servername").val() == "") {
								$("#p_name").html("请输入服务器名称");
								$("#p_name").attr("class", "tsy1");
								return false;
							}
							if (user_code.test($("#servername").val())
									|| $("#servername").val().trim() != $(
											"#servername").val()) {
								$("#p_name").html("请不要包含%或以空格开头或结尾");
								$("#p_name").attr("class", "tsy1");
								return false;
							}

							if ($("#ftpname").val() == "") {
								$("#p_ftpname").html("请输入用户名");
								$("#p_ftpname").attr("class", "tsy1");
								return false;
							}
							if (user_code.test($("#ftpname").val())
									|| $("#ftpname").val().trim() != $(
											"#ftpname").val()) {
								$("#p_ftpname").html("请不要包含%或以空格开头或结尾");
								$("#p_ftpname").attr("class", "tsy1");
								return false;
							}

							if ($("#password").val() == "") {
								$("#p_password").html("请输入密码");
								$("#p_password").attr("class", "tsy1");
								return false;
							}
							if ($("#password").val().trim() != $("#password")
									.val()) {
								$("#p_password").html("请不要以空格开头或结尾");
								$("#p_password").attr("class", "tsy1");
								return false;
							}
							if ($("#password2").val() == "") {
								$("#p_password2").html("请输入重复密码");
								$("#p_password2").attr("class", "tsy1");
								return false;
							}

							if ($("#selectStatus").val() == "") {
								$("#p_status").html("请选择服务器状态");
								$("#p_status").attr("class", "tsy1");
								return false;
							}
							if ($("#servegroupid").val() == "") {
								$("#p_groupid").html("请选择服务器分组");
								$("#p_groupid").attr("class", "tsy1");
								return false;
							}

							if ($("#serverip").val() == "") {
								$("#p_ip").html("请输服务器ip");
								$("#p_ip").attr("class", "tsy1");
								return false;
							}
							if (user_code.test($("#serverip").val())
									|| $("#serverip").val().trim() != $(
											"#serverip").val()) {
								$("#p_ip").html("请不要包含%或以空格开头或结尾");
								$("#p_ip").attr("class", "tsy1");
								return false;
							}

							if ($("#serverport").val() == "") {
								$("#p_port").html("请输服务器ip");
								$("#p_port").attr("class", "tsy1");
								return false;
							}
							if (user_code.test($("#serverport").val())
									|| $("#serverport").val().trim() != $(
											"#serverport").val()) {
								$("#p_port").html("请不要包含%或以空格开头或结尾");
								$("#p_port").attr("class", "tsy1");
								return false;
							}

							if ($("#serverpath").val() == "") {
								$("#p_path").html("请输存储路径");
								$("#p_path").attr("class", "tsy1");
								return false;
							}
							if (user_code.test($("#serverpath").val())
									|| $("#serverpath").val().trim() != $(
											"#serverpath").val()) {
								$("#p_path").html("请不要包含%或以空格开头或结尾");
								$("#p_path").attr("class", "tsy1");
								return false;
							}

							if ($("#password2").val() != $("#password").val()) {
								$("#p_password2").html("两次输入密码不一致");
								$("#p_password2").attr("class", "tsy1");
								return false;
							}

							document.forms[0].action = "serversManage_update.do";
							document.forms[0].method = "post";
							document.forms[0].submit();
						});
	});
	function goback() {
		document.forms[0].action = "serversManage_cancel.do";
		document.forms[0].method = "post";
		document.forms[0].submit();
	}
	//限制最大输入字节数
	function WidthCheck(str, maxLen) {
		var w = 0;
		//length 获取字数数，不区分汉子和英文 
		for (var i = 0; i < str.value.length; i++) {
			//charCodeAt()获取字符串中某一个字符的编码 
			var c = str.value.charCodeAt(i);
			//单字节加1  
			if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
				w++;
			} else {
				w += 2;
			}
			if (w > maxLen) {
				str.value = str.value.substr(0, i);
				break;
			}
		}
	}

	
</script>