package com.besto.epgms.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.besto.epgms.manage.AreaGroupService;
import com.besto.epgms.manage.AreaServerService;
import com.besto.epgms.manage.GroupService;
import com.besto.epgms.manage.ServersManageService;
import com.besto.epgms.manage.ShowMontService;
import com.besto.epgms.manage.StrategyDownstreamGroupService;
import com.besto.epgms.manage.TemplateAreaService;
import com.besto.epgms.manage.TemplateService;
import com.besto.epgms.vo.AreaGroupVO;
import com.besto.epgms.vo.AreaServerVO;
import com.besto.epgms.vo.GroupVO;
import com.besto.epgms.vo.GuardAllInfoVO;
import com.besto.epgms.vo.GuardVO;
import com.besto.epgms.vo.HeartBeatVO;
import com.besto.epgms.vo.ServerVO;
import com.besto.epgms.vo.StrategyDownstreamGroupVO;
import com.besto.epgms.vo.StrategyVO;
import com.besto.epgms.vo.AreaVO;
import com.besto.epgms.vo.TemplateAreaVO;
import com.besto.epgms.vo.TempletGroupVO;
import com.besto.epgms.vo.TempletVO;
import com.besto.util.FtpUtil;

/***
 * 模板管理
 * 
 * @author 滕翔 2016-1-22
 */
@SuppressWarnings("serial")
@Scope("prototype")
@Controller("templetAction")
@Lazy
public class TempletAction extends BaseAction {
	private static Logger logger = Logger.getLogger(TempletAction.class);
	// private static final String CP_FILE = "cp_file";
	private TempletVO templetVO;
	private AreaVO areaVO = new AreaVO();
	private GroupVO groupVO = new GroupVO();
	/** 初始化服务类 */
	@Autowired
	TemplateService templateService;

	/** 初始化服务类 */
	@Autowired
	GroupService groupService;

	@Autowired
	StrategyDownstreamGroupService strategyDownstreamGroupService;

	@Autowired
	TemplateAreaService templateAreaService;

	@Autowired
	AreaGroupService areaGroupService;

	@Autowired
	AreaServerService areaServerService;

	private String doFlag;// 消息弹出标识
	private String tip;// 处理标识
	private String[] groupIds;// 分组ID
	private String groups;// 分组ID串 :1;2;3;(新)
	private String servers;// 服务器ID串 :1,2,3;(新)
	private String strategyIds;// 策略ID
	private String areaIds;// 分域ID
	private static final String TEMPLET_TYPE = "templet_type";
	private static final String TEMPLET_STATUS = "templet_status";
	private static final String TEMPLET_LEVEL = "templet_level";
	private static final String TEMPLET_SOURCE = "templet_source";
	// private List<String> tarNames;
	private String uploadSrc;// 缓存路径
	// private String tarName = "";// 模板tar包名称
	private static ObjectMapper objectMapper = new ObjectMapper();

	/**
	 * 查询模板
	 * 
	 * @return 分页查询结果
	 * @throws Exception
	 */
	public String search() throws Exception {
		logger.debug("进入了TempletAction的search方法");
		// 初始化分页值(保值)
		templetVO = (TempletVO) this.initPageValueAndKeepValue(templetVO, TempletVO.class);
		// 查询分页
		List<TempletVO> list = templateService.search(templetVO);
		// 结果集绑定到request 中供前台使用
		this.pageBindValue(templetVO, "list", list);
		// 模板类型存放request
		getRequest().put(TEMPLET_TYPE, transList(TEMPLET_TYPE));
		// 审核状态存放request
		getRequest().put(TEMPLET_STATUS, transList(TEMPLET_STATUS));
		// 审核阶段存放request
		getRequest().put(TEMPLET_LEVEL, transList(TEMPLET_LEVEL));
		// 厂商来源存放request
		getRequest().put(TEMPLET_SOURCE, transList(TEMPLET_SOURCE));
		return SUCCESS;
	}

	public String synalize() {
		return "synalize";
	}

	/**
	 * 查询模板---下发页
	 * 
	 * @return 分页查询结果
	 * @throws Exception
	 */
	public String searchByRelease() throws Exception {
		logger.debug("进入了TempletAction的searchByRelease方法");
		// 初始化分页值(保值)
		templetVO = (TempletVO) this.initPageValueAndKeepValue(templetVO, TempletVO.class);
		// 查询分页
		// 查询的是通过审核的模板列表
		templetVO.setStatus("1");
		List<TempletVO> list = templateService.searchTemplateServer(templetVO);
		// 结果集绑定到request 中供前台使用
		this.pageBindValue(templetVO, "list", list);
		// 模板类型存放request
		getRequest().put(TEMPLET_TYPE, transList(TEMPLET_TYPE));
		// 审核状态存放request
		getRequest().put(TEMPLET_STATUS, transList(TEMPLET_STATUS));
		// 审核阶段存放request
		getRequest().put(TEMPLET_LEVEL, transList(TEMPLET_LEVEL));
		// 厂商来源存放request
		getRequest().put(TEMPLET_SOURCE, transList(TEMPLET_SOURCE));
		return "release";
	}
	/**
	 * 查询模板---审核页
	 * 
	 * @return 分页查询结果
	 * @throws Exception
	 */
	public String searchByExamine() throws Exception {
		logger.debug("进入了TempletAction的searchByRelease方法");
		// 初始化分页值(保值)
		templetVO = (TempletVO) this.initPageValueAndKeepValue(templetVO, TempletVO.class);
		// 查询分页
		templetVO.setStatus("1"); // 查询模板状态为未审核的
		templetVO.setTopicStatus("1"); // 查询专题模板状态为未审核的
		List<TempletVO> list = templateService.search(templetVO);
		// 结果集绑定到request 中供前台使用
		this.pageBindValue(templetVO, "list", list);
		// 模板类型存放request
		getRequest().put(TEMPLET_TYPE, transList(TEMPLET_TYPE));
		// 审核状态存放request
		getRequest().put(TEMPLET_STATUS, transList(TEMPLET_STATUS));
		// 审核阶段存放request
		getRequest().put(TEMPLET_LEVEL, transList(TEMPLET_LEVEL));
		// 厂商来源存放request
		getRequest().put(TEMPLET_SOURCE, transList(TEMPLET_SOURCE));
		return "examine";
	}

	/**
	 * 查询模板详细
	 * 
	 * @return 模板详细信息
	 * @throws Exception
	 */
	public String getDetail() throws Exception {

		// 详细查询
		templetVO = templateService.getDetailById(templetVO);
		// 模板类型存放request
		getRequest().put(TEMPLET_TYPE, transList(TEMPLET_TYPE));
		// 审核状态存放request
		getRequest().put(TEMPLET_STATUS, transList(TEMPLET_STATUS));
		// 审核阶段存放request
		getRequest().put(TEMPLET_LEVEL, transList(TEMPLET_LEVEL));
		// 厂商来源存放request
		getRequest().put(TEMPLET_SOURCE, transList(TEMPLET_SOURCE));
		getRequest().put("templetVO", templetVO);
		if ("edit".equals(tip)) {
			return "edit";
		} else {
			return "detail";
		}
	}

	/**
	 * 指定策略分组查询
	 * 
	 * @author 滕翔
	 * @return 处理结果
	 * @throws Exception
	 */
	public String getDownstreamGroups() throws Exception {
		StrategyDownstreamGroupVO vo = new StrategyDownstreamGroupVO();
		String[] ids = strategyIds.split(",");
		vo.setIds(ids);
		StrategyDownstreamGroupVO newVO = strategyDownstreamGroupService.getDownstreamGroups(vo);
		this.jsnt(objectMapper.writeValueAsString(newVO));
		return null;
	}

	/**
	 * 添加模板的分组信息
	 * 
	 * @return
	 * @throws Exception
	 */

	// private static final String COMMA = ",";

	public String addGroupStatus() throws Exception {

		StrategyDownstreamGroupVO vo = new StrategyDownstreamGroupVO();
		String[] ids = strategyIds.split(",");
		vo.setIds(ids);
		StrategyDownstreamGroupVO newVO = strategyDownstreamGroupService.getDownstreamGroups(vo);

		TempletGroupVO groupVO = new TempletGroupVO();
		// 模板ID
		groupVO.setTemplet_id(templetVO.getId());
		// 给模板绑定分组信息
		String groupIds = newVO.getGroupIds();

		String result = templateService.addGroupService(groupVO, groupIds);
		newVO.setAddGroupResult(result);

		this.jsnt(objectMapper.writeValueAsString(newVO));
		return null;

	}

	/**
	 * 新建分域
	 * 
	 * @return
	 */
	public String addArea() {
		// 添加分域
		areaVO.setStatus("1");// 设置分域状态为未失效
		int areaId = templateAreaService.save(areaVO);
		// 分域关联分组
		String[] groupIds = groups.split(",");
		for (String groupId : groupIds) {

			AreaGroupVO areaGroupVO = new AreaGroupVO();
			areaGroupVO.setAreaId(areaId);
			areaGroupVO.setGroupId(Integer.valueOf(groupId));
			areaGroupService.save(areaGroupVO);
		}
		// 分域关联服务器
		String[] serverIds = servers.split(",");
		for (String serverId : serverIds) {
			AreaServerVO areaServerVO = new AreaServerVO();
			areaServerVO.setAreaId(areaId);
			areaServerVO.setServerId(Integer.valueOf(serverId));
			areaServerService.save(areaServerVO);
		}
		return "saveAreaOk";
	}

	/**
	 * 新建分组
	 * 
	 * @return
	 * @throws IOException
	 * @throws JsonMappingException
	 * @throws JsonGenerationException
	 */
	public String addGroup() throws IOException {
		int id = groupService.addGroup(groupVO);
		JSONObject json = new JSONObject();
		json.put("result", "添加分组ok!");
		json.put("groupId", id);
		this.jsnt(objectMapper.writeValueAsString(json));

		return null;
	}

	/**
	 * 根据分组id查询分组
	 * 
	 * @return
	 * @throws Exception
	 */
	public String searchGroupByIds() throws Exception {
		String[] groupIds = groups.split(";");
		List<GroupVO> list = groupService.searchGroupByIds(groupIds);
		JSONArray groupList = JSONArray.fromObject(list);

		this.jsnt(objectMapper.writeValueAsString(groupList));
		return null;
	}

	/**
	 * 根据分组id删除分组
	 * 
	 * @return
	 * @throws Exception
	 */
	public String deleteGroupById() throws Exception {
		groupService.deleteGroupById(groupVO);
		this.jsnt(objectMapper.writeValueAsString("deleteOK!"));
		return null;
	}

	/**
	 * 所有策略分组查询
	 * 
	 * @author 滕翔
	 * @return 处理结果
	 * @throws Exception
	 */
	public String getAllStrategyGroups() throws Exception {
		List<StrategyVO> list = strategyDownstreamGroupService
				.searchStrategyDownstreamGroupByStrategyId(new StrategyVO());
		this.jsnt(objectMapper.writeValueAsString(list));

		return null;
	}

	/**
	 * 获取所有的分域信息
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAllArea() throws Exception {
		List<AreaVO> list = templateAreaService.searchAllArea();
		JSONArray jsonList = JSONArray.fromObject(list);
		this.jsnt(objectMapper.writeValueAsString(jsonList));
		return null;
	}

	/**
	 * 提交发布服务
	 * 
	 * @author 滕翔
	 * @return 处理结果
	 * @throws Exception
	 */
	public String releaseSubmit() throws Exception {
		String result = "releaseFal";
		try {
			result = templateService.releaseSubmit(templetVO);
		} catch (Exception e) {
			result = "releaseFal";
		}
		return result;
	}

	/**
	 * 提交发布服务---模板下发页面的重新下发
	 * 
	 * @author 滕翔
	 * @return 处理结果
	 * @throws Exception
	 */
	public String releaseSubmitByAgain() throws Exception {
		String result = "againReleaseFal";
		try {
			result = templateService.releaseSubmit(templetVO);
			if ("submitOk".equals(result)) {
				result = "againSubmitOk";
			}
		} catch (Exception e) {
			result = "againReleaseFal";
		}
		return result;
	}

	/**
	 * 预览提交发布
	 * 
	 * @author 滕翔
	 * @return 处理结果
	 * @throws Exception
	 */
	public String preReleaseSubmit() throws Exception {

		String result = "preSubmitFal";
		try {
			result = templateService.preReleaseSubmit(templetVO, groupIds);
		} catch (Exception e) {
			result = "preSubmitFal";
		}
		return result;
	}

	/**
	 * 所有预览分组查询
	 * 
	 * @author 滕翔
	 * @return 处理结果
	 * @throws Exception
	 */
	public String getAllPreviewGroups() throws Exception {

		List<GroupVO> groupVOList = groupService.searchAllPreviewGroups();
		this.jsnt(objectMapper.writeValueAsString(groupVOList));
		return null;
	}

	/**
	 * 模板编辑处理
	 * 
	 * @author 滕翔
	 * @return 处理结果
	 * @throws Exception
	 * @throws Exception
	 */
	public String edit() throws Exception {
		TempletVO templetforUpdateVO = new TempletVO();
		// path补位空（有新的文件上传）
		if (getUploadSrc() != null && getUploadSrc().trim().length() > 0) {
			String ftppath = ResourceBundle.getBundle("ftp").getString("ftp.tarpath");
			// 从服务器上传文件到ftp
			try {
				this.uploadFtp(ftppath, getUploadSrc());
			} catch (Exception e) {
				e.printStackTrace();
				return "updateFal";
			}
		}

		templetforUpdateVO.setId(templetVO.getId());
		templetforUpdateVO.setName(templetVO.getName());
		templetforUpdateVO.setFilename(templetVO.getFilename());
		templetforUpdateVO.setType(templetVO.getType());
		templetforUpdateVO.setGroupIdsUp(templetVO.getGroupIds().split(","));
		// update模板表
		String result = "updateFal";
		try {
			result = templateService.updateTempletInfo(templetforUpdateVO);
		} catch (Exception e) {
			result = "updateFal";
		}
		return result;
	}

	/**
	 * 模板新增处理
	 * 
	 * @author 滕翔
	 * @return 处理结果
	 * @throws Exception
	 * @throws Exception
	 */
	public String add() throws Exception {
		logger.debug("进入了TempletAction的add方法");

		// path补位空（有新的文件上传）
		String result = "addOk";
		if (getUploadSrc() != null && getUploadSrc().trim().length() > 0) {
			try {
				templetVO.setIsTopic("0");
				// add模板表
				String templateId = templateService.addTempletInfo(templetVO);

				// tar包上传的路径
				String tarBasePath = ResourceBundle.getBundle("epg").getString("local.tarBasePath");
				// tar包本地解压用于预览的路径
				String previewPath = ResourceBundle.getBundle("epg").getString("local.previewPath");
				// api环境为华为/中兴时,basetar包上传到ftp的路径
				String tarpath = ResourceBundle.getBundle("ftp").getString("ftp.tarpath");
				// ftp信息
				String ip = ResourceBundle.getBundle("ftp").getString("ftp.ip");
				String port = ResourceBundle.getBundle("ftp").getString("ftp.port");
				String username = ResourceBundle.getBundle("ftp").getString("ftp.username");
				String password = ResourceBundle.getBundle("ftp").getString("ftp.password");

				// 1.将服务器端的tar(tar包上传的路径:tarBasePath)解压到指定文件:explodePath
				// tar包上传到本地的路径,在此路径下生成附属文件并打包
				unTar(tarBasePath + getUploadSrc(), previewPath);
				logger.info("=======================tar包上传本地完毕!====================");
				// tar上传ftp,用于下发到华为/中兴环境下预览
				if (templetVO.getApi().equals("1")) {
					// 如果是华为环境,则先通过c1接口下发,再实现预览
					FtpUtil ftpUtil = new FtpUtil(ip, Integer.valueOf(port), username, password);
					ftpUtil.uploadFile(tarpath, tarBasePath + templetVO.getFilename());
					ftpUtil.ftpclose();
					templateService.ExecCmdRequestToPreview(templateId,
							"http://localhost:8083//bytueguard/webservice/ReceiveData");
				}
			} catch (Exception e) {
				e.printStackTrace();
				return "addFal";
			}
		}
		// add模板表
		return result;
	}

	/**
	 * 展示分域列表信息
	 * 
	 * @return
	 * @throws Exception
	 */
	public String searchArea() throws Exception {
		// 初始化分页值(保值)
		logger.debug("进入了TempletAction的search方法");
		// 初始化分页值(保值)
		areaVO = (AreaVO) this.initPageValueAndKeepValue(areaVO, AreaVO.class);
		// 查询分页
		List<AreaVO> list = templateAreaService.searchAreaPage(areaVO);

		for (AreaVO areaVO : list) {
			String[] areaIds = String.valueOf(areaVO.getId()).split(",");
			areaVO.setAreaIds(areaIds);
			List<GroupVO> groupList = areaGroupService.searchGroupByAreaIds(areaVO);
			String groupName = "";
			String mark = "";
			for (GroupVO groupVO : groupList) {
				groupName = groupName + "," + groupVO.getName();
				mark = mark + "," + groupVO.getMark();
			}
			if (groupName != null && !"".equals(groupName)) {

				areaVO.setGroupName(groupName.substring(1));
			}
			if (mark != null && !"".equals(mark)) {

				areaVO.setMark(mark.substring(1));
			}
		}

		// for (AreaVO areaVO : list) {
		// System.out.println(areaVO.getId() + "===" + areaVO.getName()
		// + "===" + areaVO.getGroupName());
		// }
		// ArrayList<AreaVO> newList = new ArrayList<AreaVO>();
		// int tempIndex = 0;
		//
		// for (int i = 0; i < list.size(); i++) {
		// if (i - 1 >= 0) {
		//
		// if (list.get(i).getId() == list.get(i - 1).getId()) {
		//
		// // 拼接groupName
		// list.get(tempIndex).setGroupName(
		// list.get(tempIndex).getGroupName() + ","
		// + list.get(i).getGroupName());
		// // 拼接mark
		// list.get(tempIndex).setMark(
		// list.get(tempIndex).getMark() + ","
		// + list.get(i).getMark());
		//
		// if (i == (list.size() - 1)) {
		// newList.add(list.get(tempIndex));
		// }
		//
		// } else {
		// newList.add(list.get(tempIndex));
		// tempIndex = i;
		//
		// }
		// }
		//
		// }
		// System.out.println("************" + newList);
		//
		// for (AreaVO areaVO : newList) {
		// System.out.println(areaVO.getId() + "---" + areaVO.getName()
		// + "---" + areaVO.getGroupName());
		// }
		// 结果集绑定到request 中供前台使用
		this.pageBindValue(areaVO, "list", list);
		return "searchArea";
	}

	/**
	 * 给模板绑定分域信息
	 * 
	 * @return
	 * @throws IOException
	 * @throws JsonMappingException
	 * @throws JsonGenerationException
	 */
	public String bindingAreaAndGroup() throws Exception {
		// String[] areaIdsArr = areaIds.split(",");
		int templateId = templetVO.getId();
		// 绑定分域信息
		TemplateAreaVO templateAreaVO = new TemplateAreaVO();
		templateAreaVO.setTemplateId(templateId);
		// 给模板添加分域
		templateService.addAreaService(templateAreaVO, areaIds);
		// 绑定(模板-分组)信息
		TempletGroupVO templateGroupVO = new TempletGroupVO();
		templateGroupVO.setTemplet_id(templateId);
		// 给模板添加分组
		templateService.addGroupService(templateGroupVO, groups);
		// 设置此模板的模板状态为1--未审核
		templateService.updateTempletstatus(templetVO);
		String markPath = ResourceBundle.getBundle("epg").getString("local.markPath");
		String tarBasePath = ResourceBundle.getBundle("epg").getString("local.tarBasePath");
		// 模板文件备份路径(用于篡改恢复)
		String bak_templatePath = ResourceBundle.getBundle("ftp").getString("ftp.templatePath");
		// 获取sendType,判断是全量下发还是增量下发,0:全量下发,1:增量下发
		String sendType = ResourceBundle.getBundle("epg").getString("sendType");
		// 获取模板名称
		TempletVO vo = templateService.searchTemplateById(templetVO);
		String filename = vo.getFilename();
		List<GroupVO> groupList = groupService.searchGroupByIds(groups.split(","));
		for (GroupVO groupVO : groupList) {
			String mark = groupVO.getMark();
			unTarChangeName(tarBasePath + filename, markPath, mark);
			if ("0".equals(sendType)) {
				// 如果是全量下发,则先删除备份文件夹下的原文件
				deleteFiles(bak_templatePath);
			}
			// 将重命名为mark的模板文件打包上传.并生成校验码,写入redis缓存
			templateService.createCheckFileService(mark);
		}

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("result", "绑定分域成功!");
		this.jsnt(objectMapper.writeValueAsString(jsonObject));
		return null;
	}

	/**
	 * 根据分域id查询所对应的的分组列表
	 * 
	 * @return
	 * @throws Exception
	 */
	public String searchGroupByAreaIds() throws Exception {
		areaVO.setAreaIds(areaIds.split(","));
		List<GroupVO> list = areaGroupService.searchGroupByAreaIds(areaVO);
		JSONArray jsonList = JSONArray.fromObject(list);
		this.jsnt(objectMapper.writeValueAsString(jsonList));

		return null;

	}

	/**
	 * 模板增加处理
	 * 
	 * @author 滕翔
	 * @return 处理结果
	 * @throws Exception
	 */
	public String showAdd() {
		// 模板类型存放request
		getRequest().put(TEMPLET_TYPE, transList(TEMPLET_TYPE));
		// 审核状态存放request
		getRequest().put(TEMPLET_STATUS, transList(TEMPLET_STATUS));
		// 审核阶段存放request
		getRequest().put(TEMPLET_LEVEL, transList(TEMPLET_LEVEL));
		// 厂商来源存放request
		getRequest().put(TEMPLET_SOURCE, transList(TEMPLET_SOURCE));
		return "add";
	}

	/**
	 * 展示分域添加页面
	 * 
	 * @return
	 */
	public String showAddArea() {
		return "addArea";
	}

	@Autowired
	ShowMontService showMontService;
	@Autowired
	ServersManageService serversManageService;

	/**
	 * 展示监控信息
	 */
	public String showMont() {
		Map<String, Integer> map = showMontService.searchMonitorCount();
		// 本日异常信息总数
		Integer dayTotalCount = map.get("dayTotalCount");
		// 本月异常信息总数
		Integer monthTotalCount = map.get("monthTotalCount");
		// 服务器异常信息总数
		Integer totalCountByServer = map.get("totalCountByServer");
		// 模板监控异常信息总数
		Integer totalCountByTemplate = map.get("totalCountByTemplate");
		// 查询所有边缘服务器列表
		List<ServerVO> serverList = serversManageService.searchAll();
		JSONArray serverListJson = JSONArray.fromObject(serverList);
		getRequest().put("dayTotalCount", dayTotalCount);
		getRequest().put("monthTotalCount", monthTotalCount);
		getRequest().put("totalCountByServer", totalCountByServer);
		getRequest().put("totalCountByTemplate", totalCountByTemplate);
		getRequest().put("serverListJson", serverListJson);
		System.out.println(map);

		// // 条形图
		// List<TempletVO> serverList =
		// showMontService.searchMonitorCountByBar();
		//
		// ArrayList<String> groupNameList = new ArrayList<String>();
		// ArrayList<String> totalCountList = new ArrayList<String>();
		// for (TempletVO templet : serverList) {
		// groupNameList.add(templet.getGroupName());
		// totalCountList.add(templet.getTotalCount());
		// }
		// JSONArray groupNameJson = JSONArray.fromObject(groupNameList);
		// JSONArray totalCountJson = JSONArray.fromObject(totalCountList);
		// JSONObject json = new JSONObject();
		// json.put("groupNameJson", groupNameJson);
		// json.put("totalCountJson", totalCountJson);
		// getRequest().put("groupNameJson", groupNameJson);
		// getRequest().put("totalCountJson", totalCountJson);

		return "showMont";
	}

	/**
	 * 饼形图
	 * 
	 * @return
	 * @throws Exception
	 * @throws JsonMappingException
	 * @throws JsonGenerationException
	 */
	public String showPieChart() throws Exception {
		JSONObject json = new JSONObject();

		Map<String, Integer> map = showMontService.searchMonitorCount();
		// 本日异常信息总数
		Integer dayTotalCount = map.get("dayTotalCount");
		// 服务器异常信息总数
		Integer totalCountByServer = map.get("totalCountByServer");
		// 模板监控异常信息总数
		Integer totalCountByTemplate = map.get("totalCountByTemplate");
		// 模版监控信息和服务器监控信息异常总和
		Integer totalAll = totalCountByServer + totalCountByTemplate;
		// 本日异常信息总数
		json.put("dayTotalCount", dayTotalCount);
		json.put("totalCountByServer", totalCountByServer);
		json.put("totalCountByTemplate", totalCountByTemplate);
		json.put("totalAll", totalAll);
		this.jsnt(objectMapper.writeValueAsString(json));

		return null;

	}

	/**
	 * 条形图
	 * 
	 * @return
	 * @throws Exception
	 * @throws @throws
	 */
	public String showBarChart() throws Exception {
		JSONObject jsonObject = new JSONObject();

		// 查询15天内的模板异常信息数量总和
		List<HashMap<Date, Long>> templateList = showMontService.searchTemplateCountByBar();
		ArrayList<Long> templateCountList = new ArrayList<Long>();
		for (HashMap<Date, Long> hashMap : templateList) {
			Long countNum = hashMap.get("countNum");
			templateCountList.add(countNum);
		}
		JSONArray templateListJson = JSONArray.fromObject(templateCountList);
		jsonObject.put("templateListJson", templateListJson);

		// 查询15天内服务器异常信息数量总和
		List<HashMap<Date, Long>> serverList = showMontService.searchServerCountByBar();
		ArrayList<Long> serverCountList = new ArrayList<Long>();
		for (HashMap<Date, Long> hashMap : serverList) {
			Long countNum = hashMap.get("countNum");
			serverCountList.add(countNum);
		}
		JSONArray serverListJson = JSONArray.fromObject(serverCountList);
		jsonObject.put("serverListJson", serverListJson);

		this.jsnt(objectMapper.writeValueAsString(jsonObject));

		return null;
	}

	// 显示模版文件异常信息表信息
	public String showGuardNotice() throws Exception {

		List<GuardAllInfoVO> allExceptionInfo = showMontService.searchAllForTemplate();
		JSONArray allExceptionInfoJson = JSONArray.fromObject(allExceptionInfo);
		this.jsnt(objectMapper.writeValueAsString(allExceptionInfoJson));
		return null;
	}

	// 模板监控---灯光
	public String showMontByLightTemplate() throws Exception {
		// 查询30内插入模板异常信息表的数据
		List<GuardVO> lightForTemplate = showMontService.searchLightForTemplate30Second();
		// JSONArray templateLightList = JSONArray.fromObject(lightForTemplate);
		this.jsnt(objectMapper.writeValueAsString(lightForTemplate));
		return null;
	}

	// 服务器监控---灯光
	public String showMontByLightServer() throws Exception {
		// 服务器监控--灯光
		List<HeartBeatVO> lightForServer = showMontService.searchLightForServer();

		// JSONArray serverLightList = JSONArray.fromObject(lightForServer);
		this.jsnt(objectMapper.writeValueAsString(lightForServer));
		return null;
	}

	public void createDirectory(String outputDir, String subDir) {
		File file = new File(outputDir);
		if (!(subDir == null || subDir.trim().equals(""))) {// 子目录不为空
			file = new File(outputDir + File.separator + subDir);
		}
		if (!file.exists()) {
			file.mkdirs();
		}
	}

	public String getFtpFileName(String ftpUrl) {
		return ftpUrl.substring(ftpUrl.lastIndexOf("/") + 1);
	}

	/**
	 * 解压tar包,并重命名
	 * 
	 * @param tarFile
	 * @param destDir
	 * @param newFileName
	 *            重新命名的文件名
	 * @return
	 * @throws Exception
	 */
	public List<String> unTarChangeName(String tarFile, String destDir, String newFileName) throws Exception {
		File file = new File(tarFile);
		String fileName = file.getName();
		int popint = fileName.indexOf(".");
		if (popint != -1) {
			fileName = fileName.substring(0, popint);
		}
		return unTar(file, destDir + "/" + newFileName);
	}

	public List<String> unTar(String tarFile, String destDir) throws Exception {
		File file = new File(tarFile);
		String fileName = file.getName();
		int popint = fileName.indexOf(".");
		if (popint != -1) {
			fileName = fileName.substring(0, popint);
			// tarName = fileName;
		}
		return unTar(file, destDir + "/" + fileName);
	}

	public List<String> unTar(File tarFile, String destDir) throws Exception {
		if (StringUtils.isBlank(destDir)) {
			destDir = tarFile.getParent();
		}
		destDir = destDir.endsWith(File.separator) ? destDir : destDir + File.separator;
		return unTar(new FileInputStream(tarFile), destDir);
	}

	private List<String> unTar(InputStream inputStream, String destDir) throws Exception {

		List<String> fileNames = new ArrayList<String>();
		TarArchiveInputStream tarIn = new TarArchiveInputStream(inputStream, 1024);
		TarArchiveEntry entry = null;
		try {
			while ((entry = tarIn.getNextTarEntry()) != null) {
				fileNames.add(entry.getName());
				if (entry.isDirectory()) {// 是目录
					createDirectory(destDir, entry.getName());// 创建空目录
				} else {// 是文件
					File tmpFile = new File(destDir + File.separator + entry.getName());
					createDirectory(tmpFile.getParent() + File.separator, null);// 创建输出目录
					OutputStream out = null;
					try {
						out = new FileOutputStream(tmpFile);
						int length = 0;
						byte[] b = new byte[2048];
						while ((length = tarIn.read(b)) != -1) {
							out.write(b, 0, length);
						}
					} finally {
						IOUtils.closeQuietly(out);
					}

					logger.info("tar解压成功，path：" + destDir + entry.getName());
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			IOUtils.closeQuietly(tarIn);
		}

		return fileNames;
	}

	private static void deleteFiles(String path) {
		File file = new File(path);
		File[] listFiles = file.listFiles();
		if (listFiles != null) {

			for (int i = 0; i < listFiles.length; i++) {

				if (listFiles[i].isDirectory()) {

					deleteFiles(path + "/" + listFiles[i].getName() + "//");
				}
				listFiles[i].delete();
			}
		}

	}

	public TempletVO getTempletVO() {
		return templetVO;
	}

	public void setTempletVO(TempletVO templetVO) {
		this.templetVO = templetVO;
	}

	public String getDoFlag() {
		return doFlag;
	}

	public void setDoFlag(String doFlag) {
		this.doFlag = doFlag;
	}

	public String getTip() {
		return tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	public String getUploadSrc() {
		return uploadSrc;
	}

	public void setUploadSrc(String uploadSrc) {
		this.uploadSrc = uploadSrc;
	}

	public String[] getGroupIds() {
		return groupIds;
	}

	public void setGroupIds(String[] groupIds) {
		this.groupIds = groupIds;
	}

	public String getStrategyIds() {
		return strategyIds;
	}

	public void setStrategyIds(String strategyIds) {
		this.strategyIds = strategyIds;
	}

	public AreaVO getAreaVO() {
		return areaVO;
	}

	public void setAreaVO(AreaVO areaVO) {
		this.areaVO = areaVO;
	}

	public String getAreaIds() {
		return areaIds;
	}

	public void setAreaIds(String areaIds) {
		this.areaIds = areaIds;
	}

	public GroupVO getGroupVO() {
		return groupVO;
	}

	public void setGroupVO(GroupVO groupVO) {
		this.groupVO = groupVO;
	}

	public String getGroups() {
		return groups;
	}

	public void setGroups(String groups) {
		this.groups = groups;
	}

	public String getServers() {
		return servers;
	}

	public void setServers(String servers) {
		this.servers = servers;
	}

}
