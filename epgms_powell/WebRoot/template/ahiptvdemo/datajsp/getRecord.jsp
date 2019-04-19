<%@page import="java.net.URLDecoder"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>
<%@ page import="com.besto.util.CommonInterfaceBytuetech" %>
<%@ page import="com.besto.util.Crypto" %>
<%@ page import="java.net.URLEncoder"%>
<%@ page import="org.json.JSONArray"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="org.apache.log4j.Logger"%>
<%@ include file = "properties.jsp"%>
<%
	CommonInterfaceBytuetech ci = new CommonInterfaceBytuetech();
	Logger logger = Logger.getLogger(CommonInterfaceBytuetech.class);

	String code = "";
	if (request.getParameter("code") != null) {
		code = request.getParameter("code");
	}
	String userId = "";
	if (request.getParameter("userId") != null) {
		userId = request.getParameter("userId");
	}
	logger.info("getRecord code:" + code + "$userId:" + userId);
	String resRecord = ci.getRecord(ugmspath, userId, code);
%>
<script>
parent.recordArrJson = <%=resRecord%>;
</script>
