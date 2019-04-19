<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>
<%@ page import="com.besto.util.CommonInterfaceBytuetech" %>
<%@ page import="java.net.URLEncoder"%>
<%@ page import="org.json.JSONArray"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="org.apache.log4j.Logger"%>
<%@ include file = "properties.jsp"%>
<%
	Logger logger = Logger.getLogger(CommonInterfaceBytuetech.class);
	CommonInterfaceBytuetech ci = new CommonInterfaceBytuetech();
	String userid = "";
	if (request.getParameter("userid") != null) {
		userid = request.getParameter("userid");
	}
	int count = 3;
	if (request.getParameter("count") != null) {
		count =Integer.parseInt(request.getParameter("count")) ;
	}	
	String strRecord = ci.getRecordLastItems(ugmspath, userid, count);
	logger.info("getRecordLastItems.jsp strRecord:" + strRecord);
%>
<script>
parent.recordJson = <%=strRecord%>;
</script>
