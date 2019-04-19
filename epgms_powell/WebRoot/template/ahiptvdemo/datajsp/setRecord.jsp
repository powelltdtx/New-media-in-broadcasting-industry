<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
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

	String pcode = "";
	if (request.getParameter("pcode") != null) {
		pcode = request.getParameter("pcode");
	}
	logger.info("pcode:" + pcode);
	String childcode = "";
	if (request.getParameter("childcode") != null) {
		childcode = request.getParameter("childcode");
	}
	String name = "";
	if (request.getParameter("name") != null) {
		name = request.getParameter("name");
	}
	logger.info("name:" + request.getParameter("name"));
	logger.info("name:" + name);
	String vod_episode = "";
	if (request.getParameter("vod_episode") != null) {
		vod_episode = request.getParameter("vod_episode");
	}
	String vod_current_episode = "";
	if (request.getParameter("vod_current_episode") != null) {
		vod_current_episode = request.getParameter("vod_current_episode");
	}
	String imgurl = "";
	if (request.getParameter("imgurl") != null) {
		imgurl = request.getParameter("imgurl");
	}	
	logger.info("imgurl:" + imgurl);
	String total_time = "";
	if (request.getParameter("total_time") != null) {
		total_time = request.getParameter("total_time");
	}
	
	String category_id = "";
	if (request.getParameter("category_id") != null) {
		category_id = request.getParameter("category_id");
	}	
	logger.info("category_id:" + category_id);
	
	String current_time = "";
	if (request.getParameter("current_time") != null) {
		current_time = request.getParameter("current_time");
	}
	String userId = "";
	if (request.getParameter("userId") != null) {
		userId = request.getParameter("userId");
	}
	String callback = "";
	if (request.getParameter("callback") != null) {
		callback = request.getParameter("callback");
	}
	String resultflag = "0";
	logger.info("userId:" + userId);
	logger.info("current_time:" + current_time);
	JSONObject resjson = ci.saveRecord(ugmspath, userId, pcode, childcode, name, vod_episode, vod_current_episode, total_time, current_time, imgurl, category_id);
	logger.info("resjson:" + resjson.toString());
	if(resjson.getString("result").equals("ok")){
		resultflag = "1";
	}else{
		resultflag = "0";
	}
	
%>
<script>
parent.<%=callback%>();
</script>
