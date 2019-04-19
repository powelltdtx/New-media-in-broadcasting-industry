<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>
<%@ page import="com.besto.util.CommonInterfaceBytuetech" %>
<%@ page import="java.net.URLEncoder"%>
<%@ page import="org.json.JSONArray"%>
<%@ page import="org.json.JSONObject"%>
<%@ include file = "properties.jsp"%>
<%
	CommonInterfaceBytuetech ci = new CommonInterfaceBytuetech();
	String code = "";
	if (request.getParameter("code") != null) {
		code = request.getParameter("code");
	}
	String userid = "";
	if (request.getParameter("userid") != null) {
		userid = request.getParameter("userid");
	}

	String name = "";
	if (request.getParameter("name") != null) {
		name = request.getParameter("name");
	}
	
	String imgurl = "";
	if (request.getParameter("imgurl") != null) {
		imgurl = request.getParameter("imgurl");
	}	
	
	String flag = "";//0:收藏 1:取消收藏 2:查询
	if (request.getParameter("flag") != null) {
		flag = request.getParameter("flag");
	}	
	int collectionflag = 0;
	if(flag.equals("0")){
		JSONObject resjson = ci.saveCollection(ugmspath, userid, code, name, imgurl);
		if(resjson.getString("result").equals("ok")){
			collectionflag = 1;
		}else{
			collectionflag = 0;
		}
	}else if(flag.equals("1")){
		JSONObject resjson = ci.delCollection(ugmspath, userid, code);
		if(resjson.getString("result").equals("ok")){
			collectionflag = 0;
		}else{
			collectionflag = 1;
		}
	}else if(flag.equals("2")){
		JSONArray arrjson = ci.getCollectionByCode(ugmspath, userid, code);
		int len = arrjson.length();
		if(len > 0){
			collectionflag = 1;
		}
	}

	
	
%>
<script>
parent.collectionflag = <%=collectionflag%>;
</script>
