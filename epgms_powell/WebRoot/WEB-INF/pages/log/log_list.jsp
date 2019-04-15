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
<title>操作日志</title>
<link href="resource/css/admin.css" rel="stylesheet" type="text/css"/>
<script src="resource/js/jquery.js" type="text/javascript"></script>
<script src="resource/js/jquery.treeview.js" type="text/javascript"></script>
<script src="resource/js/common.js" type="text/javascript"></script>
<script type="text/javascript" src="resource/js/lib/layer/layer.min.js"></script>
<script type="text/javascript" src="<%=basePath %>resource/js/pageFooter.js"></script>
<script type="text/javascript" src="resource/js/lib/laydate/laydate.js"></script>
</head>
<body onload="init()">
<div class="main-wrap">
<form action="operationLog_search.do" method="post">
	<div class="form-head">
        <div class="head-table">
            <div class="cx-reset cx-reset-h">
                <input type="button" <c:roleTag btncode='operationlog_select'></c:roleTag> value="查询" onclick="dosearch()"/>
                <input type="button" <c:roleTag btncode='operationlog_select'></c:roleTag> value="重置" id="J_clearBtn"/>
            </div>
            <ul>
                <li>
                    <label>用户名：</label>
                    <s:textfield name="operationLog.username" cssClass="ipt" maxlength="20" style="width: 226px;" id="idInput"/>
                    <input type="hidden" name="usernameforecxel" id="usernameforecxel" value=""/>
                </li>
                <li class="date_m">
                    <label>时间：</label>
                        <s:textfield name="operationLog.startDate"  maxlength="20"  id="bTime" cssClass="ipt small date-icon"></s:textfield>
                        <input type="hidden" name="startDateforecxel" id="startDateforecxel"  value=""/>
                        <span>至</span>
                        <s:textfield name="operationLog.toDate" maxlength="20"  id="eTime" cssClass="ipt small date-icon" ></s:textfield>
                        <input type="hidden" name="toDateforecxel" id="toDateforecxel" value=""/>
                </li>
            </ul>
        </div>
	</div>
	<div class="form-main">
		<table width="100%" cellpadding="0" cellspacing="0" border="0" class="form-operation">
			<tbody>
				
				<tr>
					<s:if test="#request.list==null||#request.list.size()==0">
					<td class="btn_right">
						<input type="button" <c:roleTag btncode='operationlog_export'></c:roleTag> value="下载" id="export" onclick="doexport()" disabled="disabled"/>
					</td>
					</s:if>
					<s:if test="#request.list.size()!=0">
					<td class="btn_right">
						<input type="button" <c:roleTag btncode='operationlog_export'></c:roleTag> value="下载" id="export" onclick="doexport()"/>
					</td>
					</s:if>
				</tr>
			</tbody>
		</table>
		<table width="100%" cellpadding="0" cellspacing="0" border="0" class="form-list">
			<thead>
				<tr>
					<th>序号</th>
					<th>用户名</th>
					<th>操作类型</th>
					<th>时间</th>
					<th>操作详细</th>
				</tr>
			</thead>
			<tbody class="form-body">
              
             <s:iterator value="#request.list" status="sta" var="vo">
	            <tr>
	                <td title="<s:property value="#sta.index+1"/>"><s:property value="#sta.index+1"/></td>
	                <td title="<s:property value="#vo.username"/>"><s:property value="#vo.username"/></td>
	                <td title="<s:property value="#vo.moduleDesc"/>"><s:property value="#vo.moduleDesc"/></td>
	                <td title="<s:property value="#vo.date"/>"><s:property value="#vo.date"/></td>
	                <td>在  <s:property value="#vo.time"/>  对  <s:property value="#vo.moduleDesc"/>   执行    <s:property value="#vo.optdesc"/>   操作 </td>
	               
	            </tr>
            </s:iterator>

			</tbody>
		</table>
        <!-- 分页区 -->
		<div class="pagelist"
			<s:if test="#request.pages==0">
				style="display:none"
			</s:if>
		>
			<label class="">
               	每页显示：
               	<select name="operationLog.pagecount" id="" class="text-input" onchange="dosearch()">
               		<s:iterator var="num" value="#request.sizelist">
						<option <s:if test='#request.pagecount==#num.key'>selected="selected"</s:if>value="<s:property value="#num.key"/>"><s:property value="#num.value"/></option>
					</s:iterator>
               	</select>
           	 </label>
           	 	<input type="hidden" name="operationLog.pageid" id="page" value="<s:property value="#request.pid"/> "/>
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
	</form>
</div>
<script type="text/javascript">
$(".form-list tbody").find("tr").hover(function(){
	$(this).addClass("tr-hover");
},function(){
	$(this).removeClass("tr-hover");
});
$('#J_clearBtn').click(function() {
	$('#idInput, #bTime,#eTime').val('');
});
function init(){
	$("#usernameforecxel").val(document.getElementById("idInput").value);
	$("#startDateforecxel").val(document.getElementById("bTime").value);
	$("#toDateforecxel").val(document.getElementById("eTime").value);

//	document.getElementsByName("usernameforecxel").value = document.getElementById("idInput").value;
//	document.getElementsByName("startDateforecxel").value = document.getElementById("bTime").value;
//	document.getElementsByName("toDateforecxel").value = document.getElementById("eTime").value;
}

/**时间控件初始化*/
	laydate({
        istime: false,
        elem: '#bTime',
        format: 'YYYY-MM-DD',
        max: laydate.now(),//设定最大日期为当前日期
        choose: function(datas){
        	if($("#eTime").val()!=''){
        		if($("#eTime").val()<datas){
			        alert('开始时间不能大于结束时间');
			        $("#bTime").val('');
        		}
        	}
        } 
    });
    laydate({
        istime: false,
        elem: '#eTime',
        format: 'YYYY-MM-DD',
        choose: function(datas){
        	if($("#bTime").val()!=''){
        		if($("#bTime").val()>datas){
			        alert('结束时间不能小于开始时间');
			        $("#eTime").val('');
        		}
        	}
        } 
    });
</script>
<script type="text/javascript">
 /**查询*/
function dosearch(){
	 document.getElementById("page").value="1";
	document.forms[0].submit();
}
/**导出*/
function doexport(){
	document.forms[0].action="operationLog!exportLog.action";
	document.forms[0].submit();
	document.forms[0].action="operationLog_search.do";
	return false;
}
</script>
</body>
</html>
