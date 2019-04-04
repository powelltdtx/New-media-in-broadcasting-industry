<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
<link rel="stylesheet" type="text/css" href="resource/newpages/css/newTemp.css" />
<link rel="stylesheet" type="text/css"
	href="resource/newpages/js/lib/layer/skin/layer.css" />
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
.left_nav{
	height: 720px !important;
}
</style>
</head>
<body>
	<div class="container-fluid">
		<!--主内容部分-->
		<main>
			<!--左侧导航--> 
	<nav class="left_nav navbar-left bg-info" style="height: 720px;">
		<content class="content">
		<div class="con">
			<a class="con_sub headerCur" href="#" id="tempView" onclick="toGo('templet_search.action', 'tempView')"><i></i>模板创建</a>
		</div>
		<div id="templateExamine"  class="con">
			<a class="con_sub" href="#" id="templatecheck" onclick="toGo('templet_searchByExamine.do', 'templatecheck')"><i></i>模板审核</a>
		</div>
		<div class="con">
			<a class="con_sub" href="#" id="templatecreate" onclick="toGo('updatePages/updatePages.jsp', 'templatecreate')"><i></i>模板开发</a>
		</div>
		<div id="templateRelease" class="con">
			<a class="con_sub" href="#" id="templeCple" onclick="toGo('templet_searchByRelease.do', 'templeCple')"><i></i>模板下发</a>
		</div>
		<div class="con">
			<a class="con_sub" href="#" id="templeArea" onclick="toGo('templet_searchArea.do', 'templeArea')"><i></i>分域管理</a>
		</div>
		<div id="templatelib" class="con">
			<a class="con_sub" href="#" id="templatePool" onclick="toGo('templetPool_searchTemplatePool.do?poolVO.pagecount=12', 'templatePool')"><i></i>模板仓库</a>
		</div>
		<div class="con">
			<a class="con_sub" href="" id="showMont" onclick="parent.window.location='templet_showMont.do'"><i></i>监控信息</a>
		</div>
		<div class="con">
			<a class="con_sub" href="" id="templetOpera" onclick="toGo('templet_searchArea.do', 'templeArea')"><i></i>操作查看</a>
		</div>
		<div class="con">
			<a class="con_sub" href="" id="templetSynalize" onclick="toGo('templet_synalize.do', 'templetSynalize')"><i></i>数据分析</a>
		</div>
		</content> 
	</nav> 
		<iframe style="width:84%;height:720px;" name="right" id="rightframe"
				src="templet_search.do" frameborder="0" scrolling="no"></iframe>
		</main>
	</div>
	<script src="resource/newpages/js/jquery-3.2.1.min.js"></script>
	<script src="resource/newpages/js/bootstrap.min.js"></script>
	<script src="resource/newpages/layDate/laydate/laydate.js"></script>
	<script src="resource/newpages/js/common.js"></script>
	<script type="text/javascript"
	src="resource/newpages/js/ajaxFileUpload/ajaxfileupload.js"></script>
	<script type="text/javascript" src="resource/newpages/js/lib/layer/layer.min.js"></script>
</body>
</html>
<script>
	
	<%-- $(function () {
		$("#templateRelease").hide();
		$("#templatelib").hide();
		var role = "<%=session.getAttribute("role")%>";
		if(role == 4){
			$("#templateExamine").hide();
		}
	}); --%>

	function toGo(url, id) {
		$('.headerCur').removeClass('headerCur');
		$('#' + id).addClass('headerCur');
		document.getElementById('rightframe').src = "";
		document.getElementById('rightframe').src = url;
	}
</script>