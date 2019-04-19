<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="org.apache.log4j.Logger"%>
<%@ page import="com.besto.util.CommonInterfaceBytuetech"%>
<%@ include file = "properties.jsp"%>
<%
	CommonInterfaceBytuetech ci = new CommonInterfaceBytuetech();
	Logger logger = Logger.getLogger(CommonInterfaceBytuetech.class);
	String temptoken = "";
	if (request.getParameter("temptoken") != null) {
		temptoken = request.getParameter("temptoken");
	}
	String primaryid = "";
	if (request.getParameter("primaryid") != null) {
		primaryid = request.getParameter("primaryid");
	}
	String category_id = "";
	if (request.getParameter("category_id") != null) {
		category_id = request.getParameter("category_id");
	}
	logger.info("primaryid:" + primaryid + "@category_id=" + category_id + "@temptoken=" + temptoken);
	String resjianquan = ci.getJq(AAApath, primaryid, category_id, "", "",temptoken);//播放鉴权
	if(resjianquan == null || "".equals(resjianquan)){
		resjianquan = "1";
	}
	
%>
<script>
parent.jqcallback("<%=resjianquan%>");
</script>

