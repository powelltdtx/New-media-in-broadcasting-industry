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
<title>权限管理</title>
<link href="<%=basePath%>resource/css/admin.css" rel="stylesheet" type="text/css"/>
<script src="<%=basePath%>resource/js/jquery.js" type="text/javascript"></script>
<script src="<%=basePath%>resource/js/jquery.treeview.js" type="text/javascript"></script>
<script src="<%=basePath%>resource/js/common.js" type="text/javascript"></script>
<script type="text/javascript">
$(function(){
	$('#confirm').on('click', function(){
		  var user_code=/^[\w\W]*[%]+[\w\W]*$/;  //限制%等特殊字符
			$("#p_userid").html("");
		    $("#p_userid").attr("class","tsy");
		    
		    $("#p_username").html("");
	        $("#p_username").attr("class","tsy");
	        
	        $("#p_password").html("");
	        $("#p_password").attr("class","tsy");
	        
	        $("#p_password2").html("");
	        $("#p_password2").attr("class","tsy");
	        
	        $("#p_phone").html("");
	        $("#p_phone").attr("class","tsy");
	        
	        $("#p_email").html("");
	        $("#p_email").attr("class","tsy");
	        
		 if($("#userid").val()==""){
	         $("#p_userid").html("请输入用户ID");
	         $("#p_userid").attr("class","tsy1");
	         return false;
	     } 
		 if(user_code.test($("#userid").val())||$("#userid").val().trim()!=$("#userid").val()){
	         $("#p_userid").html("请不要包含%或以空格开头或结尾");
	         $("#p_userid").attr("class","tsy1");
	         return false;
	     } 
		 if($("#username").val()==""){
	         $("#p_username").html("请输入用户昵称");
	         $("#p_username").attr("class","tsy1");
	         return false;
	     } 
		 if(user_code.test($("#username").val())||$("#username").val().trim()!=$("#username").val()){
	         $("#p_username").html("请不要包含%或以空格开头或结尾");
	         $("#p_username").attr("class","tsy1");
	         return false;
	     } 
		 if($("#password").val()==""){
	         $("#p_password").html("请输入密码");
	         $("#p_password").attr("class","tsy1");
	         return false;
	     }
		 if($("#password").val().trim()!=$("#password").val()){
	         $("#p_password").html("请不要以空格开头或结尾");
	         $("#p_password").attr("class","tsy1");
	         return false;
	     } 
		 if($("#password2").val()==""){
	         $("#p_password2").html("请输入重复密码");
	         $("#p_password2").attr("class","tsy1");
	         return false;
	     }
		 <%--if($("#phone").val()==""){
	         $("#p_phone").html("请输电话号码");
	         $("#p_phone").attr("class","tsy1");
	         return false;
	     }--%>
		 if($("#email").val()==""){
	         $("#p_email").html("请输邮箱");
	         $("#p_email").attr("class","tsy1");
	         return false;
	     }
		 if(user_code.test($("#email").val())||$("#email").val().trim()!=$("#email").val()){
	         $("#p_email").html("请不要包含%或以空格开头或结尾");
	         $("#p_email").attr("class","tsy1");
	         return false;
	     } 
	     if($("#password2").val()!=$("#password").val()){
	         $("#p_password2").html("两次输入密码不一致");
	         $("#p_password2").attr("class","tsy1");
	         return false;
	     }
	     if($("#userid").val() != $("#olduserid").val()){
				//保存
				$.post('user_checkUserId.do',{user_id:$("#userid").val()},function(dataResult){
					   if(dataResult=='0'){
							
								$.layer({
							        type: 1,   //0-4的选择,
							        shade: [0.6 , '#000' , true],
							        title: false,
							        border: [0],
							        closeBtn: [0],
							        shadeClose: true,
							        area: ['450px', '280px'],
							        page: {
							            dom:".confirm"
							        }
							    });
						}else {
							$("#p_userid").html("用户ID已经存在");
					         $("#p_userid").attr("class","tsy1");
					         return false;
					   }
					   
				},'json');
		}else{
				$.layer({
			        type: 1,   //0-4的选择,
			        shade: [0.6 , '#000' , true],
			        title: false,
			        border: [0],
			        closeBtn: [0],
			        shadeClose: true,
			        area: ['450px', '280px'],
			        page: {
			            dom:".confirm"
			        }
			    });
		}
	});
	//取消
	$('.cancel').on('click', function(){
		layer.closeAll();
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
<!--[if IE 6]>
	<script src="js/DD_belatedPNG.js"></script>
<![endif]-->
</head>
<body>
<form action="user_update.do" method="post">
<div class="main-wrap">
	<div class="form-head">
		<div class="crumb"><a href="user_search.do">用户管理</a> &gt; <a href="javascript:void(0)">编辑页</a></div>
	</div>
	<div class="form-main" style="padding-top: 10px;">
    <table cellpadding="0" cellspacing="0" border="0" class="form-con">
        <tbody>
        <tr>
            <th width="140"><i>*</i>用户ID：</th>
            <td width="270">
            <s:textfield cssClass="ipt bt" name="userinfoVO.userid" id="userid" />
            <input type="hidden" id="olduserid" name="userinfoVO.olduserid" value="<s:property value="userinfoVO.userid"/>" onkeyup="WidthCheck(this,20)"/>
            </td>
            <th width="140"><i>*</i>昵称：</th>
            <td width="" >
            <s:textfield cssClass="ipt bt" name="userinfoVO.username" id="username" onkeyup="WidthCheck(this,20)"/>
            </td>
        </tr>
        <tr>
	        <th width="140"></th>
	        <td width="270"><span id="p_userid" class="tsy">p用户ID</span></td>
	        <th width="140"></th>
	        <td><span id="p_username" class="tsy">p昵称</span></td>
        </tr>
        <tr>
            <th width="140"><i>*</i>密码：</th>
            <td width="270">
            <input type="password" class="ipt bt" id="password" name="userinfoVO.password" value="<s:property value="userinfoVO.password"/>" onkeyup="WidthCheck(this,20)"/>
            </td>
            <th width="140"><i>*</i>重复密码：</th>
             <td width="270"><input type="password" class="ipt bt" id="password2" value="<s:property value="userinfoVO.password"/>" onkeyup="WidthCheck(this,20)"/><p style="display:none;">两次输入的密码不一样</p></td>
        </tr>
        <tr>
	        <th width="140"></th>
	        <td width="270"><span id="p_password" class="tsy">p密码</span></td>
	        <th width="140"></th>
	        <td><span id="p_password2" class="tsy">p重复密码</span></td>
        </tr>
          <tr>
            <th width="140"><i>*</i>状态：</th>
            <td width="270">
            	<s:select list="#{0:'生效',1:'失效'}"  name="userinfoVO.status" id="status" listKey="key" listValue="value">
				</s:select>
            </td>
            <th width="140">手机号：</th>
             <td width="270">
             <s:textfield cssClass="ipt bt" name="userinfoVO.phone" id="phone" onkeyup="WidthCheck(this,20)"/>
             </td>
        </tr>
        <tr>
	        <th width="140"></th>
	        <td width="270"><span id="p_status" class="tsy">p状态</span></td>
	        <th width="140"></th>
	        <td><span id="p_phone" class="tsy">p手机号</span></td>
        </tr>
         <tr>
            <th width="140"><i>*</i>邮箱：</th>
            <td width="270">
            <s:textfield cssClass="ipt bt" name="userinfoVO.email" id="email" onkeyup="WidthCheck(this,50)"/>
            </td>
            
            <th width="140">角色：</th>
			<td width="">
              	<select  class="text-input" name="userinfoVO.userrole" id="role">
                  	<s:iterator id="datas" value="#request.rolelist">
                  		<option value="${datas.id}">${datas.name}</option>
                  	</s:iterator>
				</select>
			</td>
        </tr>
         <tr>
	        <th width="140"></th>
	        <td width="270"><span id="p_email" class="tsy">p邮箱</span></td>
	        <th width="140"></th>
	        <td><span id="" class="tsy"></span></td>
        </tr>
 		<tr>
            <th colspan="2" style="color:#7297ca;">允许输入字母、数字或字母与数字的组合，不超过20个字符</th>
        </tr>
 <!--        <tr>
        	<td style="color:#FFF; padding-right:10px;" align="right">角色：</td>
        	<td>
            	<div style=" height:440px; overflow-y:auto; overflow-x:hidden;; width:800px;" class="mb25">
            	<table border="0" cellpadding="0" cellspacing="0" width="800px" class="form-list2">
                	<thead>
                	<tr>
                    	<th width="30%" align="center">选择</th>
                        <th width="70%" align="center">角色名称</th>
                    </tr>
                    </thead>
                     <tbody>
                     
                     <s:iterator value="#request.rolelist" status="sta" var="vo1">
	                     <tr>
	                    	<td><input type="checkbox" class="cbox" name="userinfoVO.authoritys" value='<s:property value="#vo1.id"/>' 
	                    	<s:iterator value="#request.ownrolelist" status="sta2" var="vo2">
	                    		<s:if test="#vo1.id==#vo2.roleid">
                        			checked="checked"
                        		</s:if>
	                    	</s:iterator>
	                    	
	                    	/>
	                    	</td>
	                        <td><s:property value="#vo1.name" /></td>
	                    </tr>
					</s:iterator>
                     </tbody>
                </table>
                </div>
            </td>
        </tr> -->
      
        <tr>
            <th>备注：</th>
            <td colspan="3">
            <s:textarea name="userinfoVO.remark" id="remark" cols="30" rows="3" cssClass="txtarea w635" onkeydown="if(this.value.length>256){this.value=this.value.substring(0,256);}"></s:textarea>
            </td>
        </tr>
        </tbody>
    </table>
		<div class="buttons">
		  <input type="button" class="btn blue-btn" id="confirm" value="保存"/>
			<input type="button" class="btn blue-btn" value="取消" onclick="goback()"/>
		</div>
		<div class="warn">
			请完整填写上方必填信息（*）
		</div>
	</div>
</div>
<div class="layer confirm">
    <div class="layer-tit"></div>
    <div class="layer-msg">
        确定保存吗？
    </div>
    <div class="buttons">
        <input type="button" class="btn blue-btn" value="确认"  onclick="javascript:setClose()"/>
        <input type="button" class="btn blue-btn cancel" value="取消" />
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
<script type="text/javascript" src="<%=basePath%>resource/js/lib/layer/layer.min.js"></script>
<script type="text/javascript" src="<%=basePath%>resource/js/lib/laydate/laydate.js"></script>
<script type="text/javascript">
function setClose(){
	layer.closeAll();
    $(".h_bj").show();
    $(".loading").show();
	/**保存*/
    document.forms[0].action="user_update.do";
    document.forms[0].method="post";
    document.forms[0].submit();
}
function goback(){
	window.location.href="user_search.do";
}

$("#role").val("<s:property value="userinfoVO.userrole"/>");
</script>
<!--灰背景-->
<div class="h_bj"></div>
<!--loading-->
<div class="loading">
    <img src="resource/img/admin/loading.gif"/>
</div>
</form>
</body>
</html>
