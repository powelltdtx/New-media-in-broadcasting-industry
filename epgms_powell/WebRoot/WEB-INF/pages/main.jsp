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
<title>EPG 管理系统</title>
<link href="resource/css/admin.css" rel="stylesheet" type="text/css"/>
<script src="resource/js/jquery.js" type="text/javascript"></script>
<script src="resource/js/jquery.treeview.js" type="text/javascript"></script>
<script src="resource/js/common.js" type="text/javascript"></script>
<!--[if IE 6]>
	<script src="js/DD_belatedPNG.js"></script>
<![endif]-->
</head>
<body onload="time()">
	<div class="left">
		<div class="leftm">
			<div class="lefttop">
				<div class="ltop">
					<div class="logo"><img src="<%=basePath %>resource/img/admin/logo.jpg" alt="" /></div>
					<div class="date" id="date"></div>
					<div class="welcome">
						<img src="<%=basePath %>resource/img/admin/user.gif" alt="" />
						<span><s:property value="#session.admin"/></span>
						<a href="login_init.do" target="_top">退出</a>
					</div>
				</div>
			</div>
			<div class="left-nav">
				<ul>
					<li class="service-manage"><a href="templet_search.do" target="right">模板管理</a></li>
					<li class="service-manage"><a href="templetHistory_search.do" target="right">上线历史管理</a></li>
					<li class="service-manage"><a href="role_searchAllRoles.do" target="right">角色管理</a></li>
					<li class="service-manage"><a href="user_search.do" target="right">用户管理</a></li>
<!--					<li title="操作日志" class="service-manage"><a href="operationLog_toLogPage.do" target="right">操作日志</a></li>-->
					<li title="操作日志" class="service-manage"><a href="operationLog_search.do?searchLevel=0&indexFlag=index" target="right">操作日志</a></li>
					<li class="service-manage"><a href="fileGuard_search.do" target="right">篡改通知</a></li>
				</ul>
			</div>
			<div class="leftm-toggle">
				<span></span>
			</div>
			<div class="design-info">
				Version:<s:text name="version"></s:text><br/>
				DESIGN BY BYTUE
			</div>
		</div>
	</div>
	<div class="right">
		<div class="main">
			<iframe width="100%" name="right" src="hello.html" frameborder="0" scrolling="yes"></iframe>
		</div>
	</div>
<script>
$(".left-nav").find("a").on("click",function(){
	$(".left-nav").find("li").removeClass("current");
	$(this).parent("li").addClass("current");
});
function time(){
	var myDate = new Date();
	var myYears = ( myDate.getYear() < 1900 ) ? ( 1900 + myDate.getYear() ) : myDate.getYear();
	var myMonths = myDate.getMonth() + 1;
	document.getElementById("date").innerHTML=myYears + "年" + myMonths + "月" + myDate.getDate()
		+ "日";
}
$(".leftm-toggle").find("span").on("click",function(){
	var $leftm = $(".leftm");
	var $right = $(".right");
	if($leftm.hasClass("min")){
		$right.removeClass("minRight");
		$leftm.removeClass("min");
	}else{
		$right.addClass("minRight");
		
		$leftm.addClass("min");
	}
	
});
</script>
</body>
</html>

