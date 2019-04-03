<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="c" uri="epgmstags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>操作日志</title>
<link href="<%=basePath %>resource/css/admin.css" rel="stylesheet" type="text/css"/>
<link href="<%=basePath%>resource/css/loading.css" rel="stylesheet" type="text/css"/>
<script src="<%=basePath %>resource/js/jquery.js" type="text/javascript"></script>
<script src="<%=basePath %>resource/js/jquery.treeview.js" type="text/javascript"></script>
<script src="<%=basePath %>resource/js/common.js" type="text/javascript"></script>
<script type="text/javascript" src="<%=basePath %>resource/js/lib/layer/layer.min.js"></script>
<script type="text/javascript" src="<%=basePath %>resource/js/lib/laydate/laydate.js"></script>
<script type="text/javascript" src="resource/js/pageFooter.js"></script>

</head>
<body>
<form action="templetHistory_search.do" method="post">
	<div class="main-wrap">
	<div class="form-head">
	<div class="crumb"><a href="#">上线历史管理</a> ></div>
        <div class="head-table">
			 <div class="cx-reset cx-reset-h">
                <input type="button" class="btn blue-btn" value="查询" onclick="dosearch()"/>
                <input type="button" class="btn blue-btn" value="重置" id="J_clearBtn" />
            </div>
            <ul>
                <li>
                    <label>模板编码：</label>
                    <s:textfield name="templetHistoryVO.templet_id"  maxlength="20" style="width: 164px;" id="templet_id" class="ipt "/>
                </li>
                <li>
                    <label>模板名称：</label>
                    <s:textfield name="templetHistoryVO.name"  maxlength="20" style="width: 164px;" id="name"  class="ipt"/>
                </li>
                <li>
					<label>模板类型：</label>
					<s:select  name="templetHistoryVO.type" id="type"  class="ipt" list="#request.templet_type" headerKey="" headerValue="全部"></s:select>
				</li>
				
				<li>
					<label>上线时间：</label>
					<s:textfield  name="templetHistoryVO.onlinestart" id="onlinestart"  class="date-icon ipt"/>
					<span>到</span>
					<s:textfield  name="templetHistoryVO.onlineend" id="onlineend"  class="date-icon ipt"/>
				</li>
				<li>
					<label>厂商来源：</label>
					<s:select class="ipt" name="templetHistoryVO.source" id="source" list="#request.templet_source" headerKey="" headerValue="全部"></s:select>
				</li>
				
				<li>
					<label>下发策略：</label>
					<s:textfield name="templetHistoryVO.issuedstrategy"  maxlength="20" style="width: 164px;" id="issuedstrategy"  class="ipt"/>
				</li>
            </ul>
            
        </div>
	</div>
	
	<div class="form-main">
		<table width="100%" cellpadding="0" cellspacing="0" border="0" class="form-list">
			<thead>
				<tr>
	                <th width="">上线时间</th>
	                <th width="">模板编码</th>
	                <th width="">模板名称</th>
	                <th width="">模板类型</th>
	                <th width="">厂商来源</th>
	                <th width="">下发策略</th>
	                <th width="">操作</th>
				</tr>
			</thead>
			<tbody class="form-body">
				<s:iterator var="vo" value="#request.list">
					<tr>
					<td title="<s:property value="#vo.onlinetime"/>"><s:property
							value="#vo.onlinetime" />
					</td>
					<td title="<s:property value="#vo.templet_id"/>"><s:property
							value="#vo.templet_id" />
					</td>
					<td title="<s:property value="#vo.name"/>"><s:property
							value="#vo.name" />
					</td>
					<td title="<s:property value="getTypeName()"/>">
						 <s:property value="getTypeName()"/>
					</td>
					<td title="<s:property value="getSourceName()"/>">
						 <s:property value="getSourceName()"/>
					</td>
					<td title="<s:property value="getIssuedstrategyOmit()"/>"><p><s:property value="getIssuedstrategyOmit()"  escape="false"/></p>
					</td>
					<td>
						<input type="button" class="btn blue-btn"  value="查看" onclick="goCheck('<s:property value="#vo.id"/>')"/>
					</td>
					</tr>
				</s:iterator>
			</tbody>
		</table>
		
        <!-- 信息总页数 隐藏字段-->
		<div class="pagelist">
			<label class="">
               	每页显示：
               	<select name="templetHistoryVO.pagecount" id="" class="text-input" onchange="dosearch()">
               		<option <s:if test='#request.pagecount=="10"'>selected="selected"</s:if>value="10">10条</option>
                   	<option <s:if test='#request.pagecount=="20"'>selected="selected"</s:if>value="20">20条</option>
                   	<option <s:if test='#request.pagecount=="30"'>selected="selected"</s:if>value="30">30条</option>
                   	<option <s:if test='#request.pagecount=="40"'>selected="selected"</s:if>value="40">40条</option>
                   	<option <s:if test='#request.pagecount=="50"'>selected="selected"</s:if>value="50">50条</option>
               	</select>
           	 </label>
           	 	<input type="hidden" name="templetHistoryVO.pageid" id="page" value="<s:property value="#request.pid"/> "/>
				<input type="hidden" name="pages" value="<s:property value="#request.pages"/> "/>
           	 	<s:if test="request.pid==1">
					<span style="text-decoration: none;">首页</span>
					<span style="text-decoration: none;">上一页</span>
				</s:if>
				<s:else>
					<a id="firstpage" style="text-decoration: none;cursor:pointer;">首页</a>
					<a id="backpage"  style="text-decoration: none;cursor:pointer;">上一页</a>
				</s:else>
				
				<s:if test="request.pid==request.pages">
					<span  style="text-decoration: none;">下一页</span>
					<span style="text-decoration: none;">尾页</span>
				</s:if>
				<s:else>
					<a id="nextpage"  style="text-decoration: none;cursor:pointer;">下一页</a>
					<a id="lastpage"  style="text-decoration: none;cursor:pointer;">尾页</a>
				</s:else>
			跳转到<input name="showPage" id="showPage" size="3" class="ipt"  value="<s:property value="#request.pid"/> "/>页
			<span><s:property value="#request.pid"/>/ <s:property value="#request.pages"/></span>
			<input type="button" class="btn go-page" value="GO" id="JumptoPage"/>
			
			
		</div>		
	</div>

	</div>
</form>

<!--灰背景-->
<div class="h_bj"></div>
<!--loading-->
<div class="loading">
    <img src="resource/img/admin/loading.gif"/>
</div>

<script type="text/javascript">

laydate({
	istime: true,
	isclear: false, 
	elem: '#onlinestart',
	format: 'YYYY-MM-DD hh:mm:ss'
});
laydate({
	istime: true,
	isclear: false, 
	elem: '#onlineend',
	format: 'YYYY-MM-DD hh:mm:ss'
});

//重置 
$('#J_clearBtn').click(function() {
	$('.ipt').val('');
});

function dosearch(){
	document.forms[0].page.value="1";
	document.forms[0].submit();
}


function goCheck(id) {
	window.location.href="templetHistory_checkPage.do?templetHistoryVO.id=" + id;
}

//取消
$('.cancel').on('click', function(){
	layer.closeAll();
});	
	
$(".form-list tbody").find("tr").hover(function(){
	$(this).addClass("tr-hover");
},function(){
	$(this).removeClass("tr-hover");
});

</script>
</body>
</html>
