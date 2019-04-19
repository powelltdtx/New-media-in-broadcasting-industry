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

</head>
<body>
<form>
<input type="hidden" name="searchLevel" />
<div class="main-wrap">
	<div class="form-head">
		<div class="crumb"><a href="templet_search.do">模板管理</a> > <a href="#">查看模板</a></div>
	</div>
	<div class="form-main" style="padding-top: 10px;">
		<div class="block">
			<h3 style="font-size:20px; color:#000;">基本信息</h3>
		<table cellpadding="0" cellspacing="0" border="0" class="form-con add_table">
			<tbody>
				<tr>
					<th width="140">模板编码：</th>
					<td width=""><s:property value="templetVO.id"/></td>
				</tr>
				<tr>
					<th width="140">模板名称：</th>
					<td width=""><s:property value="templetVO.name"/></td>
				</tr>				
				<tr>
					<th width="140">专题标识：</th>
					<td width=""  id ="isTopicName">
					</td>
				</tr>
				
			   <tr>
			   		<input type="hidden" id="isTopic" value="<s:property value="templetVO.isTopic"/>"></input>
					<th width="140">模板地址：</th>
					<td width="" id="topicPath" >
					http://10.178.30.103:8080/bytuetechAPI/jsp/ahiptvdemo<s:property value="templetVO.topicUrl"/>
					</td>
				</tr>
				<tr>
					<th width="140">来源厂商：</th>
					<td width=""><s:property value="templetVO.getSourceName()"/></td>
				</tr>
			</tbody>
	   </table>
		</div>
		 
<%-- 		<div class="block">
	   	<h3 style="font-size:20px; color:#FFF;">下发策略</h3>
		<table cellpadding="0" cellspacing="0" border="0" class="form-con add_table">
			<tbody>   
				<tr>
					<th width="140">下发策略：</th>
					<td width="">
						<ul>
						<s:iterator var="downstreamVo" value="templetVO.downstreamList" status="sta">
							<li>
								<label><s:property value="#downstreamVo.name"/>：</label>
								<s:iterator var="groupVo" value="#downstreamVo.groupList" status="sta2">
									<s:if test="#sta2.last">
										<s:label><s:property value="#groupVo.name"/></s:label>
									</s:if>
									<s:elseif test="!#sta2.last">
										<s:label><s:property value="#groupVo.name"/>、</s:label>
									</s:elseif>
									
								</s:iterator>
							</li>
						</s:iterator>
						</ul>
					</td>
				</tr> 
			</tbody>
		</table> --%>
		</div>
		
		<div class="buttons ts_buttons">
			<input type="button" class="btn blue-btn"  value="返回 " onclick="goback()"/>
		</div>
	</div>
</div>

</form>
<script type="text/javascript">

function goback(){
	document.forms[0].action="templet_search.do";
    document.forms[0].method="POST";
    document.forms[0].submit();
}

window.onload=function(){
	var isTopic = document.getElementById('isTopic').value;
	if(isTopic != 1){
		//普通模板
		document.getElementById("topicPath").innerHTML = "普通模板无预览地址!";
		document.getElementById("isTopicName").innerHTML = "普通模板";
	}else{
		//专题模板
		document.getElementById("isTopicName").innerHTML = "专题模板";
	}
	
}


</script>
</body>
</html>
