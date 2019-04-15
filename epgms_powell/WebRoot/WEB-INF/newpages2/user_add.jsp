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
<title>用户添加</title>
<link rel="stylesheet" href="resource/newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="resource/newpages/css/font-awesome.min.css">
<link rel="stylesheet" href="resource/newpages/css/layer.css" />
<link rel="stylesheet" href="resource/newpages/css/common.css">
<link rel="stylesheet" href="resource/newpages/css/cpsp.css" />
<link rel="stylesheet" href="resource/newpages/css/mangerUse.css" />

</head>

<body>
	<div class="container-fluid">
		<!--主内容部分-->
		<main>
			<!--右侧数据(默认)-->
			<form action="user_save.do" method="post">
				<div class="main-wrap">
					<div class="form-head">
						<div class="crumb">
							<a href="useManger.html">用户管理</a> &gt; <a
								href="javascript:void(0)">添加页</a>
						</div>
					</div>
					<div class="form-main" style="padding-top: 10px;">
						<table cellpadding="0" cellspacing="0" border="0" class="form-con">
							<tbody>
								<tr>
									<th width="140"><i>*</i>用户ID：</th>
									<td width="270"><s:textfield cssClass="ipt"
											name="userinfoVO.userid" id="userid"
											onkeyup="WidthCheck(this,20)" /></td>
									<th width="140"><i>*</i>昵称：</th>
									<td width="270"><s:textfield cssClass="ipt"
											name="userinfoVO.username" id="username"
											onkeyup="WidthCheck(this,20)" /></td>
								</tr>
								<tr>
									<th width="140"></th>
									<td width="270" height="20"><span id="p_userid"
										class="tsy">
											<!--p用户ID-->
									</span></td>
									<th width="140"></th>
									<td height="20"><span id="p_username" class="tsy">
											<!--p昵称-->
									</span></td>
								</tr>
								<tr>
									<th width="140"><i>*</i>密码：</th>
									<td width="270"><input type="password" class="ipt bt"
										id="password" name="userinfoVO.password"
										onkeyup="WidthCheck(this,20)" /></td>
									<th width="140"><i>*</i>重复密码：</th>
									<td width="270"><input type="password" class="ipt bt"
										id="password2" onkeyup="WidthCheck(this,20)" /></td>
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
									<td width="270"><s:select list="#{0:'生效',1:'失效'}"
											cssClass="ipt choseSele" name="userinfoVO.status" id="status"
											listKey="key" listValue="value">
										</s:select></td>
									<th width="140">手机号：</th>
									<td width="270"><s:textfield cssClass="ipt"
											name="userinfoVO.phone" id="phone"
											onkeyup="WidthCheck(this,20)" /></td>
								</tr>
								<tr>
									<th width="140"></th>
									<td width="270" height="20"><span id="p_status"
										class="tsy">
											<!--p状态-->
									</span></td>
									<th width="140"></th>
									<td height="20"><span id="p_phone" class="tsy">
											<!--p手机号-->
									</span></td>
								</tr>
								<tr>
									<th width="140"><i>*</i>邮箱：</th>
									<td width="270"><s:textfield cssClass="ipt"
											name="userinfoVO.email" id="email"
											onkeyup="WidthCheck(this,50)" /></td>

									<th width="140">角色：</th>
									<td width=""><select class="ipt choseSele"
										name="userinfoVO.userrole">
											<s:iterator id="datas" value="#request.rolelist">
												<option value="${datas.id}">${datas.name}</option>
											</s:iterator>
									</select></td>
								</tr>
								<tr>
									<th width="140"></th>
									<td width="270" height="20"><span id="p_email" class="tsy">
											<!--p邮箱-->
									</span></td>
									<th width="140"></th>
									<td><span id="" class="tsy"></span></td>
								</tr>

								<tr>
									<th>备注：</th>
									<td colspan="3"><s:textarea name="userinfoVO.remark"
											id="remark" cols="30" rows="3" cssClass="remark"
											onkeydown="if(this.value.length>256){this.value=this.value.substring(0,256);}"></s:textarea>
									</td>
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
	<div class="layer confirm" style="display: none">
		<div class="layer-tit"></div>
		<div class="layer-msg layerMsg">确定保存吗？</div>
		<div class="layerButtons">
			<input type="button" class="btn blue-btn" value="确认"
				onclick="javascript:setClose()" /> <input type="button"
				class="btn blue-btn cancel" value="取消" />
		</div>
	</div>
	<div class="layer alert-suc" style="display: none">
		<div class="layer-msg">
			<span>操作成功！</span>
		</div>
	</div>
	<div class="layer alert-fail" style="display: none">
		<div class="layer-msg">
			<span>操作失败！</span>
		</div>
	</div>
	<!--灰背景-->
	<div class="h_bj"></div>
	<!--loading-->
	<div class="loading">
		<img src="resource/img/admin/loading.gif" />
	</div>
	<script src="resource/newpages/js/jquery-3.2.1.min.js"></script>
	<script src="resource/newpages/js/bootstrap.min.js"></script>
	<script src="resource/newpages/js/common.js"></script>
	<script src="resource/newpages/js/mangerUse.js"></script>
	<script src="resource/newpages/js/layer.min.js"></script>
</body>

</html>
<script type="text/javascript">
	$(function() {
		$('#confirm')
				.on(
						'click',
						function() {
							var user_code = /^[\w\W]*[%]+[\w\W]*$/; //限制%等特殊字符
							$("#p_userid").html("");
							$("#p_userid").attr("class", "tsy");

							$("#p_username").html("");
							$("#p_username").attr("class", "tsy");

							$("#p_password").html("");
							$("#p_password").attr("class", "tsy");

							$("#p_password2").html("");
							$("#p_password2").attr("class", "tsy");

							$("#p_phone").html("");
							$("#p_phone").attr("class", "tsy");

							$("#p_email").html("");
							$("#p_email").attr("class", "tsy");

							if ($("#userid").val() == "") {
								$("#p_userid").html("请输入用户ID");
								$("#p_userid").attr("class", "tsy1");
								return false;
							}
							if (user_code.test($("#userid").val())
									|| $("#userid").val().trim() != $("#userid")
											.val()) {
								$("#p_userid").html("请不要包含%或以空格开头或结尾");
								$("#p_userid").attr("class", "tsy1");
								return false;
							}
							if ($("#username").val() == "") {
								$("#p_username").html("请输入用户昵称");
								$("#p_username").attr("class", "tsy1");
								return false;
							}
							if (user_code.test($("#username").val())
									|| $("#username").val().trim() != $(
											"#username").val()) {
								$("#p_username").html("请不要包含%或以空格开头或结尾");
								$("#p_username").attr("class", "tsy1");
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

							if ($("#email").val() == "") {
								$("#p_email").html("请输邮箱");
								$("#p_email").attr("class", "tsy1");
								return false;
							}
							if (user_code.test($("#email").val())
									|| $("#email").val().trim() != $("#email")
											.val()) {
								$("#p_email").html("请不要包含%或以空格开头或结尾");
								$("#p_email").attr("class", "tsy1");
								return false;
							}
							if ($("#password2").val() != $("#password").val()) {
								$("#p_password2").html("两次输入密码不一致");
								$("#p_password2").attr("class", "tsy1");
								return false;
							}

							//保存
							$.post('user_checkUserId.do', {
								user_id : $("#userid").val()
							}, function(dataResult) {
								if (dataResult == '0') {

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
								} else {
									$("#p_userid").html("管理员ID已经存在");
									$("#p_userid").attr("class", "tsy1");
									return false;
								}

							}, 'json');
						});
		//取消
		$('.cancel').on('click', function() {
			layer.closeAll();
		});
	});
	function setClose() {
		layer.closeAll();
		$(".h_bj").show();
		$(".loading").show();
		/**保存*/
		document.forms[0].action = "user_save.do";
		document.forms[0].method = "POST";
		document.forms[0].submit();
	}
	function goback() {
		window.location.href = "user_search.do";
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