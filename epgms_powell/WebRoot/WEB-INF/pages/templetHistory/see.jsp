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
<title>SP管理</title>
<link href="<%=basePath%>resource/css/admin.css" rel="stylesheet" type="text/css"/>
<link href="<%=basePath%>resource/css/loading.css" rel="stylesheet" type="text/css"/>
<script src="<%=basePath%>resource/js/jquery.js" type="text/javascript"></script>
<script src="<%=basePath%>resource/js/jquery.treeview.js" type="text/javascript"></script>
<script src="<%=basePath%>resource/js/common.js" type="text/javascript"></script>

<script type="text/javascript" src="<%=basePath%>resource/js/lib/laydate/laydate.js"></script>
<script type="text/javascript" src="<%=basePath%>resource/js/lib/layer/layer.min.js"></script>

</head>
<body>
<form action="templetHistory_search.do" method="post">
<div class="main-wrap">
	<div class="form-head">
		<div class="crumb"><a href="templetHistory_search.do">上线历史管理</a> > <a href="#">查看</a></div>
	</div>
	<div class="form-main" style="padding-top: 10px;">
    	<div class="block">
        	<h3 style="font-size:20px; color:#FFF;">基本信息</h3>
        <table cellpadding="0" cellspacing="0" border="0" class="form-con add_table">
            <tbody>
                <tr>
                    <th width="140">模板编码：</th>
                    <td width=""><s:property value="templetHistoryVO.templet_id"/></td>
                </tr>
                <tr>
                    <th width="140">模板名称：</th>
                    <td width=""><s:property value="templetHistoryVO.name"/></td>
                </tr>                
                <tr>
                    <th width="140">模板类型：</th>
                    <td width=""><s:property value="templetHistoryVO.getTypeName()"/></td>
                </tr>
               <tr>
                    <th width="140">模板文件地址：</th>
                    <td width=""><s:property value="templetHistoryVO.getFtpurlToShow()"/></td>
                </tr>
            </tbody>
       </table>
        </div>
         
        <div class="block">
       	<h3 style="font-size:20px; color:#FFF;">下发策略</h3>
        <table cellpadding="0" cellspacing="0" border="0" class="form-con add_table">
            <tbody>   
                <tr>
                    <th width="140">下发策略：</th>
                    <td width=""><s:property value="templetHistoryVO.issuedstrategy" escape="false"/></td>
                </tr> 
            </tbody>
        </table>
		</div>
        
		<div class="buttons ts_buttons">
			<input type="button" class="btn blue-btn"  value="返回 " onclick="window.history.go(-1);"/>
		</div>
	</div>
</div>

</form>
</body>
</html>
