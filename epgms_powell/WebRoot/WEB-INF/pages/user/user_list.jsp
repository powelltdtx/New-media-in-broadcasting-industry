<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="c" uri="epgmstags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>权限管理</title>
<link href="<%=basePath%>resource/css/admin.css" rel="stylesheet" type="text/css"/>
<link href="<%=basePath%>resource/css/loading.css" rel="stylesheet" type="text/css"/>
<script src="<%=basePath%>resource/js/jquery.js" type="text/javascript"></script>
<script src="<%=basePath%>resource/js/jquery.treeview.js" type="text/javascript"></script>
<script src="<%=basePath%>resource/js/common.js" type="text/javascript"></script>
<script type="text/javascript" src="<%=basePath%>resource/js/lib/layer/layer.min.js"></script>
<script type="text/javascript" src="<%=basePath %>resource/js/pageFooter.js"></script>
</head>
<body onload="init()">
<form action="user_search.do" method="post">
    <!--弹出层-->
	<div id="del_cover">
    	<h3>确定要删除吗？</h3>
        <div class="buttons" style="width:auto">
        	<input type="button" class="btn blue-btn" id="trueB" value="确定" />
			<input type="button" class="btn blue-btn cancel" value="取消" />
        </div>
    </div>
<div class="main-wrap">
	<div class="form-head">
        <div class="head-table">
        </div>
	</div>
	<div class="form-main">
		<table width="100%" cellpadding="0" cellspacing="0" border="0" class="form-operation">
			<tbody>
				<tr>
					<td class="btn_left">
						<input type="button" <c:roleTag btncode='usermanage_adduser'></c:roleTag>  id="out" value="新增"  onclick="add()"/>
					</td>
				</tr>
			</tbody>
		</table>
		<table width="100%" cellpadding="0" cellspacing="0" border="0" class="form-list">
			<thead>
				<tr>
					<th>ID</th>
					<th>昵称</th>
					<th>关联角色</th>
					<th>备注信息</th>
					<th>状态</th>
                    <th>操作</th>
				</tr>
			</thead>
			<tbody class="form-body">
			<s:iterator id="datas" value="#request.list">
				<tr>
                    <td><s:property value="userid"/></td>
                    <td><s:property value="username"/></td>
                    <td><s:property value="userrolename"/></td>
                    <!-- <td class="aRole"><c:roleNamesTag user_id="${userid}"></c:roleNamesTag></td> -->
                    <td class="Bizhu"><s:property value="remark"/></td>
                    <td>
                    <!-- 
                     <s:property value="getStatusName()"/>$<s:property value="#vo.status"/>
                      -->
                      <s:if test="status==0">生效</s:if>
                      <s:if test="status==1">失效</s:if>
                      </td>
                    <td><input type="button" <c:roleTag btncode='usermanage_seeoredit'></c:roleTag> value="编辑" onclick="goEdit('<s:property value="userid"/>')"/>
                    <input type="button" <c:roleTag btncode='usermanage_deleuser'></c:roleTag> value="删除" onclick="doDelete('<s:property value="userid"/>');"/>
                    </td>
                </tr>
			</s:iterator>
			</tbody>
		</table>
		
		<!-- 信息总页数 隐藏字段-->
		<div class="pagelist">
			<label class="">
               	每页显示：
               	<select name="userinfoVO.pagecount" id="" class="text-input" onchange="dosearch()">
               		<s:iterator var="num" value="#request.sizelist">
						<option <s:if test='#request.pagecount==#num.key'>selected="selected"</s:if>value="<s:property value="#num.key"/>"><s:property value="#num.value"/></option>
					</s:iterator>
               	</select>
           	 </label>
           	 	<input type="hidden" name="userinfoVO.pageid" id="page" value="<s:property value="#request.pid"/> "/>
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
<div class="layer delete">
	<div class="layer-tit"></div>
	<div class="layer-msg">
	正在进行用户删除操作，删除后该用户后将无法再次进行登录操作，是否确认删除？
	</div>
	<div class="buttons">
		<input type="button" class="btn blue-btn SurB" value="确认" onclick="javascript:setClose()"/>
		<input type="button" class="btn blue-btn cancel" value="取消" />
		<input type="hidden" id="hiuserid" />
	</div>
</div>
<div class="layer alert-suc">
	<div class="layer-msg">
		<span>操作成功！</span>
	</div>
</div>
<div class="layer alert-fail">
	<div class="layer-msg">
		<span>操作失败！</span>
	</div>
</div>
<!-- 遮罩层  -->
<!--灰背景-->
<div class="h_bj"></div>
<!--loading-->
<div class="loading">
    <img src="resource/img/admin/loading.gif"/>
</div>

<script type="text/javascript">
function add(){
window.location.href="user_add.do";
}
function goEdit(id){
window.location.href='user_edit.do?user_id='+id;
}
function init(){
	if('1'=='<s:property value="doFlag"/>'){
		alertSuc();
	}else if('2'=='<s:property value="doFlag"/>'){
		alertFail();
	}
}
function alertSuc(){
	$.layer({
	    type: 1,   //0-4的选择,
	    shade: [0.6 , '#000' , true],
	    title: false,
	    time: 2,
	    border: [0],
	    closeBtn: [0],
	    shadeClose: true,
	    area: ['450px', '280px'],
	    page: {
	        dom:".alert-suc"
	    }
	});
}
function alertFail(){
	$.layer({
	    type: 1,   //0-4的选择,
	    shade: [0.6 , '#000' , true],
	    title: false,
	    time: 2,
	    border: [0],
	    closeBtn: [0],
	    shadeClose: true,
	    area: ['450px', '280px'],
	    page: {
	        dom:".alert-fail"
	    }
	});
}
function doDelete(id){
document.getElementById("hiuserid").value=id;
	$.layer({
	    type: 1,   //0-4的选择,
	    shade: [0.6 , '#000' , true],
	    title: false,
	    border: [0],
	    closeBtn: [0],
	    shadeClose: true,
	    area: ['450px', '280px'],
	    page: {
	        dom:".delete"
	    }
	});
}
function setClose(){
	document.forms[0].action="user_delete.do?userinfoVO.userid="+document.getElementById("hiuserid").value;
    document.forms[0].method="POST";
    document.forms[0].submit();
    layer.closeAll();
    $(".h_bj").show();
    $(".loading").show();
}
</script>
<script type="text/javascript">
$(".form-list tbody").find("tr").hover(function(){
	$(this).addClass("tr-hover");
},function(){
	$(this).removeClass("tr-hover");
});
$('.cancel').on('click', function(){
	layer.closeAll();
});
function dosearch(){
	document.forms[0].page.value="1";
	document.forms[0].submit();
}
</script>

</form>
</body>
</html>
