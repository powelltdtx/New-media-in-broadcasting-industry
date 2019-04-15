<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>后台登陆</title>
<link href="resource/css/admin.css" rel="stylesheet" type="text/css"/>
<script src="resource/js/jquery.js" type="text/javascript"></script>
<!--[if IE 6]>
	<script src="js/DD_belatedPNG.js"></script>
<![endif]-->
</head>
<body>
<form action="login_login.do" method="post">
	<div class="login-wrap">
		<div class="login">
			<img src="resource/img/login/logo.png" alt="" class="login-logo pngFix" />
			<div class="login-input">
				<label for="username" class="user pngFix">用户名</label>
				<input type="text" name="vo.userid" id="username" class="" />
			</div>
			<div class="login-input">
				<label for="password" class="pw pngFix">密码</label>
				<input type="password" name="vo.password" id="password" class="" />
			</div>
			<div>
				<input type="submit" class="login-btn" value="登陆" />
			</div>
			<div class="login-error">
			<s:if test="null!=message">
				<s:property  value="message"/>
		    </s:if>
			</div>
			<div class="design-info">
			Version:<s:text name="version"></s:text><br/>
			DESIGN BY BYTUE
			</div>
		</div>
	</div>
</form>
<script type="text/javascript">
    var wh = $(window).height();
    $(".login-wrap").height(wh);
</script>
</body>

</html>

