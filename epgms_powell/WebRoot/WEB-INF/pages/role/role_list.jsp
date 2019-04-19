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
<script type="text/javascript" src="<%=basePath %>resource/js/pageFooter.js"></script>
</head>
<body onload="init()">

<div class="main-wrap">
	<div class="form-head">
        <div class="head-table">
        </div>
	</div>
	<form action="role_searchAllRoles.do" method="post">
	<div class="form-main">
		<table width="100%" cellpadding="0" cellspacing="0" border="0" class="form-operation">
			<tbody>
				<tr>
					<td class="btn_left">
						<input type="button"  id="out" <c:roleTag btncode='rolemanage_addrole'></c:roleTag> value="新增"  onclick="window.location.href='role!searchAllMenuAndbtn.action'"/>
					</td>
				</tr>
			</tbody>
		</table>
		<table width="100%" cellpadding="0" cellspacing="0" border="0" class="form-list">
			<thead>
				<tr>
					<th width="30%">角色名称</th>
					<th width="40%">描述</th>
                    <th width="30%">操作</th>
				</tr>
			</thead>
			<tbody class="form-body">
						<s:iterator var="vo" value="#request.list">
							<tr>
							<td title="<s:property value="#vo.name"/>"><s:property
									value="#vo.name" />
							</td>
							<td title="<s:property value="#vo.remark"/>"><s:property
									value="#vo.remark" />
							</td>
							<td>
							<input type="button" <c:roleTag btncode='rolemanage_seeoredit'></c:roleTag>  value="编辑/查看" onclick="goEdit('<s:property value="#vo.id"/>','<s:property value="#vo.name"/>')"/>
							<input type="button"  <c:roleTag btncode='rolemanage_delerole'></c:roleTag> value="删除" onclick="del(<s:property value="#vo.id"/>)"/>
							</td>
							</tr>
						</s:iterator>
				</tbody>
		</table>
		
		 <!-- 信息总页数 隐藏字段-->
		<div class="pagelist">
			<label class="">
               	每页显示：
               	<select name="vo.pagecount" id="" class="text-input" onchange="dosearch()">
               		<s:iterator var="num" value="#request.sizelist">
						<option <s:if test='#request.pagecount==#num.key'>selected="selected"</s:if>value="<s:property value="#num.key"/>"><s:property value="#num.value"/></option>
					</s:iterator>
               	</select>
           	 </label>
           	 	<input type="hidden" name="vo.pageid" id="page" value="<s:property value="#request.pid"/> "/>
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
<div class="layer cannotdelete">
	<div class="layer-tit"></div>
	<div class="layer-msg">
		正在进行角色删除操作，角色已被用户使用，无法被删除。
	</div>
	<div class="buttons">
		<input type="button" class="btn blue-btn cancel" value="确认" onclick="closeLayer()" />
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
<!--灰背景-->
<div class="h_bj"></div>
<!--loading-->
<div class="loading">
    <img src="resource/img/admin/loading.gif"/>
</div>


<script type="text/javascript">
/**判断成功还是失败*/
function init(){
	if('1'=='<s:property value="doFlag"/>'){
		alertSuc();
	}else if('0'=='<s:property value="doFlag"/>'){
		alertFail();
	}
};
/**成功*/
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
};
/**失败*/
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
};
function goEdit(id,name){
	window.location.href="role!toEditRole.action?vo.id="+id+"&menuVO.id="+id;
}
function del(id){
	$.post("role_checkRole.do",{roleid:id},function(data){
		if(null!=data&&data!="0"){
			//弹出窗体
			   $.layer({
				    type: 1,   //0-4的选择,
				    shade: [0.6 , '#000' , true],
				    title: false,
				    border: [0],
				    closeBtn: [0],	
				    shadeClose: false,
				    area: ['450px', '280px'],
				    page: {
				        dom:".layer.cannotdelete"
				    }
				});   
	        return false;
		}else{
			
			if (!confirm("确定进行角色删除操作吗？删除后，该角色不可用，确认删除吗？")) {
		        return false;
		     } 
		    $(".h_bj").show();
		    $(".loading").show();
			window.location.href='role_delRole.do?vo.id='+id;
		}	
	},"text");	
}

function dosearch(){
	document.forms[0].page.value="1";
	document.forms[0].submit();
}

//关闭弹出层
function closeLayer(){
	layer.closeAll();
}
$(".form-list tbody").find("tr").hover(function(){
	$(this).addClass("tr-hover");
},function(){
	$(this).removeClass("tr-hover");
});
/**时间控件初始化*/
laydate({
    istime: true,
    elem: '#bTime',
    format: 'YYYY-MM-DD',
    max: laydate.now(),
    choose: function(datas){
    	if($("#bTime").val()!=''){
    		if($("#bTime").val()<datas){
		        alert('开始时间不能大于结束时间');
		        $("#eTime").val('');
    		};
    	}
    }
});
laydate({
    istime: true,
    elem: '#eTime',
    format: 'YYYY-MM-DD',
    max: laydate.now(),
    choose: function(datas){
    	if($("#eTime").val()!=''){
    		if($("#eTime").val()<datas){
		        alert('开始时间不能大于结束时间');
		        $("#bTime").val('');
    		};
    	}
    }
});
</script>
</body>
</html>
