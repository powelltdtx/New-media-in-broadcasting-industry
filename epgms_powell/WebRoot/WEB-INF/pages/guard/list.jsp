<%@ page language="java" contentType="text/html;charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="c" uri="epgmstags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>模板管理</title>
<link href="resource/css/admin.css" rel="stylesheet" type="text/css"/>
<script src="resource/js/jquery.js" type="text/javascript"></script>
<script src="resource/js/jquery.treeview.js" type="text/javascript"></script>
<script src="resource/js/common.js" type="text/javascript"></script>
<script type="text/javascript" src="resource/js/lib/layer/layer.min.js"></script>
<script type="text/javascript" src="<%=basePath %>resource/js/pageFooter.js"></script>
<script type="text/javascript" src="resource/js/lib/laydate/laydate.js"></script>
<!--[if IE 6]>
	<script src="js/DD_belatedPNG.js"></script>
<![endif]-->
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
<body >
<form action="fileGuard_search.do" method="post">
<div class="main-wrap">
	<!-- 查询条件区 -->
	<div class="form-head">
	<div class="crumb"><a href="#">篡改通知</a> ></div>
		
	</div>

	<div class="form-main">
		
		<table width="100%" cellpadding="0" cellspacing="0" border="0" class="form-list">
			<thead>
				<tr>
					<th width="8">序号</th>
					<th width="8%">平台</th>
					<th width="12%">IP</th>
					<th width="18%">文件路径</th>
					<th width="8%">篡改方式</th>
					<th width="15%">篡改时间</th>
					<th width="8%">处理方式</th>
					<th width="8%">处理结果</th>
					<th width="15%">处理时间</th>
				</tr>
			</thead>
			<tbody class="form-body">
				<s:iterator var="vo" value="#request.list" status="sta">
					<tr>
					<td><s:property value="#sta.index+1"/></td>
					<td title="<s:property value="#vo.platForm"/>"><s:property value="#vo.platForm"/></td>
					<td title="<s:property value="#vo.ip"/>"><s:property value="#vo.ip"/></td>
					<td title="<s:property value="#vo.filePath"/>"><s:property value="#vo.filePath"/></td>
					<td title="<s:property value="#vo.tamperMode"/>"><s:property value="#vo.tamperMode"/></td>
					
					<td title="<s:property value="#vo.tamperTime"/>"><s:property value="#vo.tamperTime"/></td>
					<td title="<s:property value="#vo.handleMode"/>"><s:property value="#vo.handleMode"/></td>
					<td title="<s:property value="#vo.handleResult"/>"><s:property value="#vo.handleResult"/></td>
					<td title="<s:property value="#vo.handleTime"/>"><s:property value="#vo.handleTime"/></td>
				</tr>
				</s:iterator>
			</tbody>
		</table>
		
		<!-- 信息总页数 隐藏字段-->
		<div class="pagelist">
			<label class="">
			   	每页显示：
			   	<select name="guardVO.pagecount" id="" class="text-input" onchange="dosearch()">
			   		<s:iterator var="num" value="#request.sizelist">
						<option <s:if test='#request.pagecount==#num.key'>selected="selected"</s:if>value="<s:property value="#num.key"/>"><s:property value="#num.value"/></option>
					</s:iterator>
			   	</select>
		   	 </label>
		   	 	<input type="hidden" name="guardVO.pageid" id="page" value="<s:property value="#request.pid"/> "/>
				<input type="hidden" name="pages" value="<s:property value="#request.pages"/> "/>
				<span <s:if test="request.pid>1">id="firstpage"</s:if> style="<s:if test="request.pid>1">cursor:pointer;</s:if> text-decoration: none;">首页</span>
				<span <s:if test="request.pid>1">id="backpage"</s:if> style="<s:if test="request.pid>1">cursor:pointer;</s:if> text-decoration: none;">上一页</span>
				<span <s:if test="request.pid!=request.pages">id="nextpage"</s:if> style="<s:if test="request.pid!=request.pages">cursor:pointer;</s:if> text-decoration: none;">下一页</span>
				<span <s:if test="request.pid!=request.pages">id="lastpage"</s:if> style="<s:if test="request.pid!=request.pages">cursor:pointer;</s:if> text-decoration: none;">尾页</span>
				
			跳转到<input name="showPage" id="showPage" size="3" class="ipt"  value="<s:property value="#request.pid"/> "/>页
			<span><s:property value="#request.pid"/>/ <s:property value="#request.pages"/></span>
			<input type="button" class="btn go-page" value="GO" id="JumptoPage"/>
		</div>
	</div>

</div>
</form>

<script>

function dosearch(){
	document.forms[0].page.value="1";
	document.forms[0].submit();
}

</script>
</body>