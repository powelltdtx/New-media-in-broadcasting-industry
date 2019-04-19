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
<title>权限管理</title>
<link href="<%=basePath %>resource/css/admin.css" rel="stylesheet" type="text/css"/>
<script src="<%=basePath %>resource/js/jquery.js" type="text/javascript"></script>
<script src="<%=basePath %>resource/js/jquery.treeview.js" type="text/javascript"></script>
<script src="<%=basePath %>resource/js/common.js" type="text/javascript"></script>
<script src="<%=basePath %>resource/js/role.js" type="text/javascript"></script>
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
<style>
.mb25 { margin:25px 0;}
.form-list2 th { height:40px; line-height:40px; background:#313d5f; text-align:center; border-bottom:1px solid #465788;border-right:1px solid #465788;}
.form-list2 tbody { height:300px; overflow-y:auto;}
.form-list2 td {height:30px; line-height:30px; background:#38466d; text-align:center; border-bottom:1px solid #465788;border-right:1px solid #465788;}
</style>
<!--[if IE 6]>
	<script src="js/DD_belatedPNG.js"></script>
<![endif]-->
</head>
<body>

<div class="main-wrap">
	<div class="form-head">
		<div class="crumb"><a href="role!searchAllRoles.action">角色管理</a> &gt; <a href="javascript:void(0)">角色新增</a></div>
	</div>
	<div class="form-main" style="padding-top: 10px;">
	<form action="" method="post">
    <table cellpadding="0" cellspacing="0" border="0" class="form-con" style="width:0">
        <tr>
        	<th width="140"><i>*</i>角色名称</th>
            <td width="650"><input type="text" name="vo.name" class="ipt bt" id="roleName" onkeyup="WidthCheck(this,20)"/></td>
        </tr>
        
        <tr>
        	<th><i>*</i>权限范围</th>
            <td style="padding-top:10px;">
            <s:iterator var="vo" value="#request.list" status="sta">
				<div class="cbox">	
					<div class="cT"><input type="checkbox" class="allC" /><label><s:property value="#vo.name"/></label></div>
					<ul class="cArry">
					    <s:iterator var="btn" value="#vo.buttonList">
					       <li><input type="checkbox" name="vo.btnCodes" value="<s:property value="#btn.code"/>" /><label><s:property value="#btn.name"/></label></li>
					    </s:iterator>
					</ul>
				</div>		
			</s:iterator>                                                                                                           
            </td>
        </tr>
        <tr>
            <th>备注：</th>
            <td colspan="3"><textarea id="" cols="30" rows="3" class="txtarea w635" name="vo.remark" onkeyup="WidthCheck(this,200)"></textarea></td>
        </tr>
        
    </table>
    </form>
		<div class="buttons">
		    <input type="button" class="btn blue-btn" value="保存" onclick="toSave()"/>
			<input type="button" class="btn blue-btn" value="取消" onclick="window.location.href='role!searchAllRoles.action'"/>
		</div>
		<div class="warn">
			请完整填写上方必填信息（*）
		</div>
	</div>
</div>

<div class="layer cancelFreeze">
    <div class="layer-tit"></div>
    <div class="layer-msg">
        确定保存吗？
    </div>
    <div class="buttons">
        <input type="button" class="btn blue-btn" value="确认"  onclick="javascript:doSave()"/>
        <input type="button" class="btn blue-btn cancel" value="取消"  onclick="closeLayer()"/>
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
<script type="text/javascript" src="<%=basePath %>resource/js/lib/layer/layer.min.js"></script>
<script>
function doSave(){
	layer.closeAll();
    $(".h_bj").show();
    $(".loading").show();
    document.forms[0].action="role!insertRole.action";
	document.forms[0].submit();
}
function toSave(){
	var name=/^[\w\W]*[%]+[\w\W]*$/;  //限制%等特殊字符
	var name1=$("#roleName").val();
	
	if($("#roleName").val()==""){
        alert("策略名称不能为空");
        return false;
    }
	if(name.test(name1)||name1.trim()!=name1){
		 alert("格式错误:不能包含%或以空格开头或结尾");
        return false;
	}
	    
	
	$.post("role_chackRoleName.do",{roleName:$("#roleName").val()},function(data){   
		if(null!=data&&data!="0"){
			alert("策略名已经存在");
	        return false;
		}else{
			//判断是否勾选权限
			var count =0;
			$("input[type='checkbox']:checked").each(function(){
				count++;
			});
			if(count>0){
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
					        dom:".layer.cancelFreeze"
					    }
					});   
			}else{
				alert("至少选择一个权限按钮！");
			}		
		}	
	},"text");	
}
//关闭弹层
function closeLayer(){
	layer.closeAll();
}
$(function(){
	//全选功能
	$('.allC').on('click' , function(){
		var aInput = $(this).parent().siblings('ul').find('input');
		if($(this).is(':checked')){
			aInput.each(function(){
				$(this).prop('checked','checked');
				});
			}else {
				aInput.each(function(){
				$(this).prop('checked','');
				});
				}
		});
		
	//点击事件并且判断该组是否全选	
	var iBtn = true;
	$('.cArry input').on('click',function(){
		iBtn = true;	
		if($(this).is(':checked')){
			$(this).prop('checked' , true);
			}else {
				$(this).prop('checked' , false);
				}
		
		var a = $(this).parents('ul').find('input');
		a.each(function(){
			if($(this).prop('checked') == false){
				iBtn = false;
				}
			});
			
		//判断是否子复选框全部选择了	
		if(iBtn){
			var b =$(this).parents('ul').siblings('.cT').find('input');	
			b.prop('checked' , true);
			}else {
				var b =$(this).parents('ul').siblings('.cT').find('input');
				b.prop('checked' , false);
				}
		});		

});
//限制最大输入字节数
function WidthCheck(str, maxLen){  
	var w = 0;  
	//length 获取字数数，不区分汉子和英文 
	for (var i=0; i<str.value.length; i++) {  
         //charCodeAt()获取字符串中某一个字符的编码 
		var c = str.value.charCodeAt(i);  
		//单字节加1  
		if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {  
				w++;  
		} else {    
				w+=2;  
		}  
		if (w > maxLen) {  
				str.value = str.value.substr(0,i); 
				break; 
		}    
	}  
	} 

</script>
</body>
</html>
