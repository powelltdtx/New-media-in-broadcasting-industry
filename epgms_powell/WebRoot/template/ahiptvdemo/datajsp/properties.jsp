<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%
//AAA
String AAApath = "http://10.30.238.112:82/authbilling/";
//String AAApath = "http://10.178.40.105:8080/authbilling/";
//cms
String cmspath = "http://10.30.238.112:81/cms/";
//asm
String asmpath = "http://10.30.238.112:81/asm/";
//ugms
String ugmspath = "http://10.30.238.112:83/ugms/";

//pcs
//String pcspath = "http://60.19.30.67/pcs/";
//String pcsselecturl = "pay/category_Details_pop2.jsp";
//dams
String damslogpath= "";
Map asmPathMap = new HashMap();
asmPathMap.put("dblby", "movielist.jsp?category_id=valuecategoryid");
asmPathMap.put("zblby", "zb_page.jsp?parentid=valueparentid&categoryid=valuecategoryid");
asmPathMap.put("ztlby", "zhuanti.jsp?parentid=valueparentid&categoryid=valuecategoryid");
asmPathMap.put("dyxqy", "terminal.jsp?code=valuecode&category_id=valuecategoryid");
asmPathMap.put("dsjxqy", "variety_detail.jsp?programid=valuecode&columnid=valuecategoryid");
asmPathMap.put("zyxqy", "variety_detail.jsp?programid=valuecode&columnid=valuecategoryid");
asmPathMap.put("basecategorylist", "/gxpay/pay/vod_list.jsp?isInside=1&style=2&columnId=");
asmPathMap.put("baseplay", "/play_ControlChannel.jsp?COMEFROMFLAG=0&ISSUB=0&PREVIEWFLAG=0&CHANNELNUM=");
asmPathMap.put("basetv", "gxpay/pay/pay_tv_detail.jsp?columnId=&vodId=");
asmPathMap.put("basemovie", "gxpay/pay/pay_movie_detail.jsp?columnId=&vodId=");
asmPathMap.put("basevodplay", "au_PlayFilm.jsp?PLAYTYPE=1&CONTENTTYPE=0&BUSINESSTYPE=1&PROGID=programId&TYPE_ID=columnId");
Map sdmsMap = new HashMap();
sdmsMap.put("sdmsflag", "1");//0代表走静态数据；1代表走动态数据
sdmsMap.put("sdmspath", "/data/pic/sdms/js/data/ad/");//静态数据文件存放路径

String hasorderurl = "http://61.191.45.116:7002/itv-api/has_order";
String orderproviderId = "sp_ahgd";
String ordernotifyurl = "http://117.71.25.104:81/bytuetechAPI/OrderNotify";

String  loggerPath="/data/dams_logs/";
String  loggerStatus="yes";

%>
