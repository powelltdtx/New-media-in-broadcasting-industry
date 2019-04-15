package com.besto.epgms.action;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import javax.annotation.Resource;
import javax.jms.Session;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;
import org.mortbay.log.Log;
import org.omg.CORBA.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.besto.epgms.manage.AdresourceEpgmsService;
import com.besto.epgms.manage.TemplateService;
import com.besto.epgms.po.Adresource;
import com.besto.epgms.vo.AdresourceVO;
import com.besto.epgms.vo.AdstrategyVO;
import com.besto.epgms.vo.ResultVO;
import com.besto.epgms.vo.TempletVO;
import com.besto.http.HttpUtils;
import com.besto.util.FtpUtil;
import com.besto.util.PropertiesUtil;
import com.besto.util.ReadProperties;
import com.besto.util.UUIDGenerator;
import com.opensymphony.xwork2.ActionContext;
/*
 * 
 *@ClassName: AdresourceEpgmsAction 
 *@Description: TODO(这里用一句话描述这个类的作用) 
 *@author powell/滕翔   
 *@date 2019年3月12日 下午3:10:32
 *
 */
@Scope("prototype")
@Controller("adresourceEpgmsAction")
@SuppressWarnings("unused")
public class AdresourceEpgmsAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	private File upload;// 上传的文件
	private String uploadFileName;// 文件名称
	private String uploadContentType;// 文件类型
	private String templateId;// 模板Id,用于标识被修改的广告数据
	private String imgId;// 图片位置id
	private String jsSrc;// 模板引用的js数据路径
	private static Logger logger = Logger.getLogger(AdresourceEpgmsAction.class);
	private static String logHeader = "[AdresourceAction]";
	private AdresourceVO adresource = new AdresourceVO();
	private AdstrategyVO adstrategy;
	private static String isQuery = "0";// 是否查询 0 否 1 是
	public static String getIsQuery() {
	return isQuery;
	}

	public static void setIsQuery(String isQuery) {
		AdresourceEpgmsAction.isQuery = isQuery;
	}

	Map<String, Object> session = ActionContext.getContext().getSession();
	private String isNewsShow = "";
	/** 初始化服务类 */
	@Autowired
	AdresourceEpgmsService adresourceEpgmsService;
	@Autowired
	TemplateService templateService;

	private static ObjectMapper objectMapper = new ObjectMapper();

	private HttpServletRequest request = (HttpServletRequest) ActionContext.getContext()
			.get(org.apache.struts2.StrutsStatics.HTTP_REQUEST);
	@SuppressWarnings("deprecation")
	private String savePath = request.getRealPath("/").toString() + "WEB-INF" + File.separator + "Logs"
			+ File.separator;

	public String goEditAdresource() {
		System.out.println(templateId);
		System.out.println(imgId);

		try {
			// 读取本地js数据信息,用于回显示
			String subJsSrc = jsSrc.substring((jsSrc.indexOf("epgms") + 5), jsSrc.indexOf("?"));
			String realPath = request.getSession().getServletContext().getRealPath("/");
			String JsPath = realPath.replace("\\", "/") + subJsSrc;
			Log.info("realPath----->" + realPath);
			Log.info("jsSrc----->" + jsSrc);
			String JsData = "";
			FileInputStream in = new FileInputStream(JsPath);
			InputStreamReader inReader = new InputStreamReader(in, "UTF-8");
			BufferedReader bufReader = new BufferedReader(inReader);
			String line = null;
			int i = 1;
			while ((line = bufReader.readLine()) != null) {
				JsData = JsData + line;
				i++;
			}
			bufReader.close();
			inReader.close();
			in.close();
			JsData = JsData.replace("var addatas = ", "");
			JsData = JsData.replace(";", "");
			JSONObject jsonObject = new JSONObject(JsData);
			JSONArray jsonArray = jsonObject.getJSONArray("position");
			JSONObject position = (JSONObject) jsonArray.get(0);
			JSONArray plate = position.getJSONArray("plate");
			JSONObject plateObject = (JSONObject) plate.get(0);
			JSONArray advertising = plateObject.getJSONArray("advertising");
			JSONObject advertisingObject = (JSONObject) advertising.get(Integer.valueOf(imgId.split("_")[1]));// 根据imgId获取图片位置
			JSONArray adstrategy = advertisingObject.getJSONArray("adstrategy");
			JSONObject adstrategyObject = (JSONObject) adstrategy.get(0);
			JSONArray adresourceJs = adstrategyObject.getJSONArray("adresource");
			JSONObject adresourceObject = (JSONObject) adresourceJs.get(0);
			// 从json数据中获取被双击的广告数据,用于在编辑页回显
			String adstrategyId = adstrategyObject.getString("id");
			String name = adresourceObject.getString("name");
			String adresourcenum = adresourceObject.getString("adresourcenum");
			String sequence = adresourceObject.getString("sequence");
			String resourceType = adresourceObject.getString("resourceType");
			String imgurl = adresourceObject.getString("imgurl");
			String title = adresourceObject.getString("title");
			String programName = adresourceObject.getString("programName");
			String actionUrl = adresourceObject.getString("actionUrl");
			String desplayTime = adresourceObject.getString("desplayTime");
			String description = adresourceObject.getString("description");
			String id = adresourceObject.getString("id");
			String seriesflag = adresourceObject.getString("seriesflag");
			// fixedurl id
			adresource.setAdstrategyid(adstrategyId);
			adresource.setName(name);
			adresource.setAdresourcenum(adresourcenum);
			adresource.setSequence(sequence);
			adresource.setResourceType(resourceType);
			adresource.setImgurl(imgurl);
			adresource.setTitle(title);
			adresource.setProgramName(programName);
			adresource.setActionUrl(actionUrl);
			adresource.setDesplayTime(Integer.valueOf(desplayTime));
			adresource.setDescription(description);
			adresource.setId(Integer.valueOf(id));
			adresource.setSeriesflag(seriesflag);
			Log.info("seriesflag------------------->" + seriesflag);
			// 将数据存入request,便于前端展示
			request.setAttribute("adresource", adresource);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "goEdit";
	}
	/**
	 * 
	 * @Title: updateJS 
	 * @author powell/滕翔
	 * @Description: TODO(修改广告的js文件) 
	 * @param @return     
	 * @return String    返回类型 
	 * @throws 
	 *
	 */
	public String updateJS() {
		System.out.println(adresource);
		try {
			// 图片上传
			String realpath = ServletActionContext.getServletContext().getRealPath("/WEB-INF/pic/iptv");

			/*
			 * 这里做上传文件的空值验证和类型验证。没做验证未通过时的返回结果. 验证过才将上传文件保存到工程指定的文件目录下。
			 * 
			 * @author Johan.H
			 */
			FileOutputStream uploadFos = null;
			FileInputStream uploadFis = null;
			if ((upload != null) && ((uploadContentType.contains("image/jpeg"))
					|| (uploadContentType.contains("image/png")) || (uploadContentType.contains("image/jpg"))
					|| (uploadContentType.contains("image/gif")) || (uploadContentType.contains("image/bmp")))) {
				uploadFileName = (UUIDGenerator.getUUID() + uploadFileName.substring(uploadFileName.lastIndexOf(".")));
				try {
					// 建立文件输出流
					logger.info("上传路径 upload path:" + realpath + "/" + uploadFileName);
					uploadFos = new FileOutputStream(realpath + "/" + uploadFileName);
					// 建立文件上传流
					uploadFis = new FileInputStream(upload);
					byte[] buffer = new byte[1024];
					int len = 0;
					while ((len = uploadFis.read(buffer)) > 0) {
						uploadFos.write(buffer, 0, len);
					}
				} catch (Exception e) {
					System.out.println("文件上传失败");
					e.printStackTrace();
				} finally {
					try {
						uploadFos.close();
						uploadFis.close();
					} catch (IOException e) {

						e.printStackTrace();
					}
				}
				// 图片上传ftp

				java.util.Properties props = new java.util.Properties();
				try {
					props.load(getClass().getClassLoader().getResourceAsStream("ftp.properties"));
					String updatePic_ip = props.get("updatePic_ip").toString();
					String updatePic_port = props.get("updatePic_port").toString();
					String updatePic_username = props.get("updatePic_username").toString();
					String updatePic_password = props.get("updatePic_password").toString();
					FtpUtil ftp = new FtpUtil(updatePic_ip, Integer.valueOf(updatePic_port), updatePic_username,
							updatePic_password);
					// 设置ftp被动模式
					ftp.setPassive();
					ftp.uploadFile("absm/updatepic/", realpath + "/" + uploadFileName);
				} catch (Exception e) {
					logger.error("读取properties出错");
				}
			}
			// 处理actionurl的字符串
			String adresourceStr = adresource.getActionUrl();
			if (adresourceStr == null)
				adresourceStr = "";
			logger.info(logHeader + "update=提交的url地址 submit url：" + adresourceStr + "$is,是否有逗号："
					+ adresourceStr.indexOf(","));
			logger.info(
					"update测试的地址：" + adresourceStr.substring(adresourceStr.indexOf(",") + 1, adresourceStr.length()));
			if (adresourceStr.length() > 0) {
				if (adresourceStr.indexOf(",") != -1 && adresourceStr.indexOf(",") == 0) {
					adresource.setActionUrl(
							adresourceStr.substring(adresourceStr.indexOf(",") + 1, adresourceStr.length()).trim());
				} else {
					adresource.setActionUrl(adresourceStr);
				}
			}
			// 处理Imgurl
			String adresourceImgurl = adresource.getImgurl();
			if (adresourceImgurl == null)
				adresourceImgurl = "";
			logger.info(logHeader + "insert=提交的imgurl地址 submit imgurl：" + adresourceImgurl + "$is,是否有逗号："
					+ adresourceImgurl.indexOf(","));
			logger.info("insert测试的地址："
					+ adresourceImgurl.substring(adresourceImgurl.indexOf(",") + 1, adresourceImgurl.length()));
			if (adresourceImgurl.length() > 0) {
				if ((adresourceImgurl.indexOf(",") != -1) && (adresourceImgurl.indexOf(",") == 0)) {
					adresource.setImgurl(adresourceImgurl
							.substring(adresourceImgurl.indexOf(",") + 1, adresourceImgurl.length()).trim());
				} else if ((adresourceImgurl.indexOf(",") != -1) && (adresourceImgurl.indexOf(",") >= 1)) {
					adresource.setImgurl(adresourceImgurl.substring(0, adresource.getImgurl().indexOf(",")).trim());
				} else {
					adresource.setImgurl(adresourceImgurl);
				}
			}
			// 处理title
			String adresourceTitle = adresource.getTitle();
			if (adresourceTitle == null)
				adresourceTitle = "";
			logger.info(logHeader + "insert=提交的Title submit Title：" + adresourceTitle + "$is,是否有逗号："
					+ adresourceTitle.indexOf(","));
			logger.info("insert测试的地址："
					+ adresourceTitle.substring(adresourceTitle.indexOf(",") + 1, adresourceTitle.length()));
			if (adresourceTitle.length() > 0) {
				if ((adresourceTitle.indexOf(",") != -1) && (adresourceTitle.indexOf(",") == 0)) {
					adresource.setTitle(adresourceTitle
							.substring(adresourceTitle.indexOf(",") + 1, adresourceTitle.length()).trim());
				} else if ((adresourceTitle.indexOf(",") != -1) && (adresourceTitle.indexOf(",") >= 1)) {
					adresource.setTitle(adresourceTitle.substring(0, adresource.getTitle().indexOf(",")).trim());
				} else {
					adresource.setTitle(adresourceTitle);
				}
			}
			logger.info(logHeader + "=======actiontype==========" + adresource.getActiontype());
			logger.info(logHeader + "=======listtype==========" + adresource.getListtype());
			logger.info(logHeader + "=======categoryid==========" + adresource.getCategoryid());
			logger.info(logHeader + "=======guid==========" + adresource.getGuid());
			Log.info("jsSrc--->" + jsSrc);
			String subJsSrc = jsSrc.substring((jsSrc.indexOf("epgms") + 5), jsSrc.indexOf("?"));
			String realPath = request.getSession().getServletContext().getRealPath("/");
			String JsPath = realPath.replace("\\", "/") + subJsSrc;
			Log.info("读取的Js文件的物理路径JsPath--->" + JsPath);
			String JsData = "";
			FileInputStream in = new FileInputStream(JsPath);
			InputStreamReader inReader = new InputStreamReader(in, "UTF-8");
			BufferedReader bufReader = new BufferedReader(inReader);
			String line = null;
			int i = 1;
			while ((line = bufReader.readLine()) != null) {
				JsData = JsData + line;
				i++;
			}
			bufReader.close();
			inReader.close();
			in.close();
			JsData = JsData.replace("var addatas = ", "");
			JsData = JsData.replace(";", "");
			JSONObject jsonObject = new JSONObject(JsData);
			JSONArray jsonArray = jsonObject.getJSONArray("position");
			JSONObject position = (JSONObject) jsonArray.get(0);
			JSONArray plate = position.getJSONArray("plate");
			JSONObject plateObject = (JSONObject) plate.get(0);
			JSONArray advertising = plateObject.getJSONArray("advertising");
			JSONObject advertisingObject = (JSONObject) advertising.get(Integer.valueOf(imgId.split("_")[1]));// 根据imgId获取图片位置
			JSONArray adstrategy = advertisingObject.getJSONArray("adstrategy");
			JSONObject adstrategyObject = (JSONObject) adstrategy.get(0);
			JSONArray adresourceJs = adstrategyObject.getJSONArray("adresource");
			JSONObject adresourceObject = (JSONObject) adresourceJs.get(0);
			adresourceObject.put("name", adresource.getName());
			adresourceObject.put("adresourcenum", adresource.getAdresourcenum());
			adresourceObject.put("sequence", adresource.getSequence());
			adresourceObject.put("resourceType", adresource.getResourceType());
			String oldImgurl = adresource.getImgurl();
			// http://117.71.25.104:85/pic/absm/20170702/28fe3bac1aa14ddaaf794ab4101db87b.png
			String newImgurl = "http://117.71.25.104:85/pic/absm/updatepic/" + uploadFileName;
			adresource.setImgurl(newImgurl);
			Log.info("newImgurl----->" + newImgurl);
			adresourceObject.put("imgurl", newImgurl);
			adresourceObject.put("title", adresource.getTitle());
			adresourceObject.put("actionUrl", adresource.getActionUrl());
			adresourceObject.put("desplayTime", adresource.getDesplayTime());
			adresourceObject.put("description", adresource.getDescription());
			adresourceObject.put("guid", adresource.getGuid());
			adresourceObject.put("actiontype", adresource.getActiontype());
			adresourceObject.put("programName", adresource.getProgramName());
			adresourceObject.put("categoryid", adresource.getCategoryid());
			adresourceObject.put("seriesflag", adresource.getSeriesflag());
			Log.info("Categoryid======================>" + adresource.getCategoryid());
			String newJsData = jsonObject.toString();
			// 覆盖原.js文件
			FileOutputStream fos = new FileOutputStream(new File(JsPath));
			System.out.println(newJsData);
			fos.write(("var addatas = " + newJsData + ";").getBytes());
			// 将广告修改的相关数据存入session,并以模板id+标识符命名
			HttpSession adresourceSession = request.getSession();
			// 将Js数据中adresource的id获取,存入adresource对象
			int id = adresourceObject.getInt("id");
			adresource.setId(id);
			// 将模板的专题模板审核状态修改为1--未审核
			TempletVO templetVO = new TempletVO();
			templetVO.setId(Integer.valueOf(templateId));
			templetVO.setTopicStatus("1");
			templateService.updateTempletTopicStatus(templetVO);
			// 将Js数据中adstrategy的id获取,存入adresource对象
			String adstrategyId = adstrategyObject.getString("id");
			adresource.setAdstrategyid(adstrategyId);
			JSONObject adresourceJsonObject = new JSONObject(adresource);
			adresourceSession.setAttribute("adresource_" + templateId, adresourceJsonObject.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "closeEdit";
	}
	/**
	 * 保存修改后的广告信息到数据库
	 * 
	 * @return
	 */
	public String saveAdresource() {
		HttpSession session = request.getSession();
		String adresourceJs = (String) session.getAttribute("adresource_" + templateId);
		try {
			if (adresourceJs == null || adresourceJs == "") {
				// 未编排
				HttpServletResponse response = ServletActionContext.getResponse();
				this.jsnt(objectMapper.writeValueAsString("0"));
			} else {
				// 已编排
				// 修改模板表的专题模板审核状态为2--已审核
				TempletVO templetVO = new TempletVO();
				templetVO.setId(Integer.valueOf(templateId));
				templetVO.setTopicStatus("2");
				templateService.updateTempletTopicStatus(templetVO);
				String saveAdresourceResponse = HttpUtils.saveAdresourceByHttpClient(
						"http://10.178.30.101/absm/adstrategyActionByHttpClient_saveUpdateAdresourceByEpgms.do",
						adresourceJs);
				Log.info("HttpClient响应结果:" + saveAdresourceResponse);
				session.removeAttribute("adresource_" + templateId);
				this.jsnt(objectMapper.writeValueAsString("1"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public static void main(String[] args) throws Exception {
		FtpUtil ftp = new FtpUtil("10.178.40.141", 21, "updateuser", "updateuser*1#2!");
		ftp.uploadFile("absm/updatepic/", "d:/tools/1.txt");
	}
	/**
	 * 弹出层上的分类查询
	 * 
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public String searchCmsCategory() throws Exception {
		String logMethodName = "searchCmsCategory()";
		String groupId = "1";
		isNewsShow = "iptv";
		List<ResultVO> list = adresourceEpgmsService.searchCmsCategory(adresource, groupId);
		logger.info(logHeader + "isQuery:" + adresource.getIsQuery());
		this.pageBindValue("list", list);
		String isQueryStr = adresource.getIsQuery();
		if (isQueryStr == null)
			isQueryStr = "0";
		if (isQueryStr.equals("1")) {
			int listSize = 0;
			try {
				listSize = list.size();
			} catch (Exception e) {
				listSize = 0;
			}
			this.pageBindValue("isQuery", "当前搜索结果为" + listSize + "个");
		}
		return "resultsuccess";
	}
	/**
	 * 弹出层查询内容
	 * 
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public String searchCmsProgram() throws Exception {
		String logMethodName = "searchCmsProgram()";
		String groupId = "1";
		isNewsShow = "iptv";
		List<ResultVO> list = adresourceEpgmsService.searchCmsProgram(adresource, groupId);
		this.pageBindValue("list", list);
		logger.info(logHeader + "isQuery:" + adresource.getIsQuery());
		String isQueryStr = adresource.getIsQuery();
		if (isQueryStr == null)
			isQueryStr = "0";
		if (isQueryStr.equals("1")) {
			int listSize = 0;
			try {
				listSize = list.size();
			} catch (Exception e) {
				listSize = 0;
			}
			this.pageBindValue("isQuery", "当前搜索结果为" + listSize + "个");
		}
		return "programresult";
	}
	/**
	 * 弹出层查询节目单
	 * 
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public String searchCmsSchedule() throws Exception {
		String logMethodName = "searchCmsSchedule()";
		String groupId = "";
		if (session.get("grouptype") == null) {
		} else {
			groupId = (String) session.get("grouptype");
		}
		// 查询节目单分类
		Map<String, String> scheudleClassify = new LinkedHashMap<String, String>();
		scheudleClassify = adresourceEpgmsService.searchScheduleClassify(adresource);
		this.pageBindValue("scheudleClassify", scheudleClassify);

		// 查询节目单频道列表
		Map<String, String> channelMap = new LinkedHashMap<String, String>();
		channelMap = adresourceEpgmsService.searchCmsLive(adresource, groupId);
		this.pageBindValue("channelMap", channelMap);
		// 查询节目单
		List<ResultVO> scheduleList = adresourceEpgmsService.searchCmsSchedule(adresource, groupId);
		this.pageBindValue("scheduleList", scheduleList);
		ActionContext ac = ActionContext.getContext();
		ac.getSession().put("adresource", adresource);
		return "scheduleresult";
	}
	/**
	 * 页面返回方法
	 * 
	 * @param info
	 * @return String
	 */
	public String jsnt(String info) {
		String flag = "1";
		HttpServletResponse response = (HttpServletResponse) ActionContext.getContext()
				.get(org.apache.struts2.StrutsStatics.HTTP_RESPONSE);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		try {
			response.getWriter().write(info);
		} catch (IOException e) {
			flag = "2";
			e.printStackTrace();
		}
		return flag;
	}
	public String initSelectVideo() {
		String groupId = "";
		if (session.get("grouptype") != null) {
			groupId = (String) session.get("grouptype");
		}
		if (groupId.equals("2")) {
			isNewsShow = "ott";
		} else if (groupId.equals("1")) {
			isNewsShow = "iptv";
		} else {
			isNewsShow = "phone";
		}
		return "selectVideo_success";
	}

	public String initCategoryList() {
		isNewsShow = "iptv";
		return "categorylist";
	}
	public String initProgramList() {
		isNewsShow = "iptv";
		return "programlist";
	}

	public void checkdesplaytime() {
		String result = "0";
		int desplayTime = this.adresource.getDesplayTime();
		Properties props = new Properties();
		try {
			props.load(getClass().getClassLoader().getResourceAsStream("config.properties"));
		} catch (IOException e) {
			logger.info(logHeader + "获取配置文件出错：" + e);
			e.printStackTrace();
		}
		int configdesplaytime = Integer.parseInt(props.getProperty("desplayTimeLimit"));
		if (desplayTime > configdesplaytime) {
			result = "1";
		}

		HttpServletResponse response = ServletActionContext.getResponse();

		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8");
		try {
			PrintWriter out = response.getWriter();

			out.write(result.toString());
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String getIsNewsShow() {
		return isNewsShow;
	}

	public void setIsNewsShow(String isNewsShow) {
		this.isNewsShow = isNewsShow;
	}

	public AdstrategyVO getAdstrategy() {
		return adstrategy;
	}

	public void setAdstrategy(AdstrategyVO adstrategy) {
		this.adstrategy = adstrategy;
	}

	public AdresourceVO getAdresource() {
		return adresource;
	}

	public void setAdresource(AdresourceVO adresource) {
		this.adresource = adresource;
	}

	public AdresourceEpgmsService getadresourceEpgmsService() {
		return adresourceEpgmsService;
	}

	public void setadresourceEpgmsService(AdresourceEpgmsService adresourceEpgmsService) {
		this.adresourceEpgmsService = adresourceEpgmsService;
	}

	public File getUpload() {
		return upload;
	}

	public void setUpload(File upload) {
		this.upload = upload;
	}

	public String getUploadFileName() {
		return uploadFileName;
	}

	public void setUploadFileName(String uploadFileName) {
		this.uploadFileName = uploadFileName;
	}

	public String getUploadContentType() {
		return uploadContentType;
	}

	public void setUploadContentType(String uploadContentType) {
		this.uploadContentType = uploadContentType;
	}

	public String getTemplateId() {
		return templateId;
	}

	public void setTemplateId(String templateId) {
		this.templateId = templateId;
	}

	public String getImgId() {
		return imgId;
	}

	public void setImgId(String imgId) {
		this.imgId = imgId;
	}

	public String getJsSrc() {
		return jsSrc;
	}

	public void setJsSrc(String jsSrc) {
		this.jsSrc = jsSrc;
	}

}
