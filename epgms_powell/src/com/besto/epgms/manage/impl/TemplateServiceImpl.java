package com.besto.epgms.manage.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Map.Entry;
import java.util.ResourceBundle;
import java.util.Set;

import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.besto.epgms.manage.TemplateService;
import com.besto.epgms.manage.TempletHistoryService;
import com.besto.epgms.mapper.DownstreamGroupMapper;
import com.besto.epgms.mapper.GroupMapper;
import com.besto.epgms.mapper.GuardMapper;
import com.besto.epgms.mapper.InterfacelogMapper;
import com.besto.epgms.mapper.ServersManageMapper;
import com.besto.epgms.mapper.TemplateAreaMapper;
import com.besto.epgms.mapper.TemplateServerMapper;
import com.besto.epgms.mapper.TempletGroupMapper;
import com.besto.epgms.mapper.TempletMapper;
import com.besto.epgms.mapper.XmlinfoMapper;
import com.besto.epgms.thread.ExecCmdRequestThread;
import com.besto.epgms.thread.ExecCmdRequestToPreviewThread;
import com.besto.epgms.vo.DownstreamGroupVO;
import com.besto.epgms.vo.DownstreamVO;
import com.besto.epgms.vo.FileGuardVO;
import com.besto.epgms.vo.GroupVO;
import com.besto.epgms.vo.ServerVO;
import com.besto.epgms.vo.TemplateAreaVO;
import com.besto.epgms.vo.TempletGroupStreamVO;
import com.besto.epgms.vo.TempletGroupVO;
import com.besto.epgms.vo.TempletHistoryVO;
import com.besto.epgms.vo.TempletVO;
import com.besto.util.FtpUtil;
import com.besto.util.HashMethod;
import com.besto.util.ReadProperties;
import com.besto.util.RedisUtil;
import com.besto.util.SM4Utils;
import com.besto.util.StringUitl;
import com.besto.util.TarUtils;
import com.besto.util.TimeSource;
import com.besto.webservice.ExecCmdRequestWbs;
import com.opensymphony.xwork2.ActionContext;

@Service("templateService")
@Lazy
public class TemplateServiceImpl implements TemplateService {

	// private static final String LOCAL_XMLPATH="E:";
	// private static final String LOCAL_TARPATH="E:";
	// private static final String FTP_XMLPATH="textxml";
	// private static final String FTP_TARPATH="texttar";
	// private static final String FTP_IP="10.10.8.201";
	// private static final String FTP_USER="updateuser";
	// private static final String FTP_PWD="updateuser*1#2!";
	// private static final int FTP_POST=21;
	// public static final String CREATE_XML_LOCAL_PATH="E://downstreamxml";
	// public static final String CREATE_XML_LOCAL_NAME="20151227_01.xml";

	private static Logger log = Logger.getLogger(TemplateServiceImpl.class);
	@Autowired
	XmlinfoMapper xmlinfoMapper;
	@Autowired
	InterfacelogMapper interfacelogMapper;
	@Autowired
	TempletMapper templetMapper;
	@Autowired
	TempletHistoryService spInfoService;
	@Autowired
	GroupMapper groupMapper;
	@Autowired
	TempletGroupMapper templetGroupMapper;

	@Autowired
	DownstreamGroupMapper downstreamGroupMapper;
	@Autowired
	GuardMapper guardMapper;
	@Autowired
	TemplateAreaMapper templateAreaMapper;
	@Autowired
	ServersManageMapper serversManageMapper;
	
	@Autowired
	TemplateServerMapper templateServerMapper;
	// @Autowired
	// ExecCmdRequestWbs execCmdRequestWbs;
	private static final String COLON = "：";
	private static final String STOP = "、";
	private static final String WRAP = "<br/>";
	private static final String COMMA = ",";

	@Override
	public String add(TempletVO vo) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * 
	 * FunName: ExecCmdRequest Description : 模板下发
	 * 
	 * @param: templetVO_id 模板id
	 * @param: group_ids 分组id数组
	 * @return: void
	 * @throws
	 * @Author: <powell/滕翔>
	 * @Create Date:<2015-12-25>
	 */
	@Override
	public void ExecCmdRequest(String templetVO_id, String[] group_ids,
			String downUrl) throws Exception {

		ExecCmdRequestThread execCmdRequestThread = new ExecCmdRequestThread(
				templetVO_id, group_ids, downUrl);
		Thread thread = new Thread(execCmdRequestThread);
		thread.start();
	}
	/**
	 * 
	 * FunName: ExecCmdRequestToPreview Description : 模板下发到华为/中兴预览服务器
	 * 
	 * @param: templetVO_id 模板id
	 * @return: void
	 * @throws
	 */
	@Override
	public void ExecCmdRequestToPreview(String templetVO_id,String downUrl) throws Exception {
		
		ExecCmdRequestToPreviewThread execCmdRequestToPreviewThread = new ExecCmdRequestToPreviewThread(templetVO_id, downUrl);
		Thread thread = new Thread(execCmdRequestToPreviewThread);
		thread.start();
	}

	/**
	 * 
	 * FunName: search Description : 获取模板
	 * 
	 * @param vo
	 * @return List<TempletVO>
	 * @throws
	 * @throws
	 * @Author: <powell/滕翔>
	 * @Create Date:<2015-1-22>
	 */
	@Override
	public List<TempletVO> search(TempletVO vo) {
		// 查询模板表
		List<TempletVO> list = new ArrayList<TempletVO>();
		try {
			list = templetMapper.searchPage(vo);
		} catch (Exception e) {
			log.error("search 出错:" + e.getMessage());
		}
		return list;
	}

	/**
	 * 
	 * FunName: getDetailById Description : 获取模板详细
	 * 
	 * @param vo
	 * @return TempletVO
	 * @throws Exception
	 * @throws
	 * @Author: <powell/滕翔>
	 * @Create Date:<2015-1-22>
	 */
	@Override
	public TempletVO getDetailById(TempletVO vo) {
		// 查询模板表
		TempletVO templetVO = new TempletVO();
		List<TempletGroupStreamVO> templetGroupStreamVOList = new ArrayList<TempletGroupStreamVO>();
		// 下游平台查询
		List<DownstreamVO> downstreamList = new ArrayList<DownstreamVO>();
		try {
			// 模板分组平台查询
			templetGroupStreamVOList = templetMapper
					.searchTempletGroupDownstreamBytempletId(vo);
			if (templetGroupStreamVOList != null
					&& templetGroupStreamVOList.size() > 0) {
				// 下游平台设置
				templetVO.setDownstreamList(downstreamList);
				// 模板属性设置
				TempletGroupStreamVO templepGroupStreamVOtemp = templetGroupStreamVOList
						.get(0);
				templetVO.setId(templepGroupStreamVOtemp.getTemplet_id());
				templetVO.setName(templepGroupStreamVOtemp.getTemplet_name());
				templetVO.setType(templepGroupStreamVOtemp.getType());
				templetVO.setSource(templepGroupStreamVOtemp.getSource());
				templetVO.setCreatedate(templepGroupStreamVOtemp
						.getCreatedate());
				templetVO.setFilename(templepGroupStreamVOtemp.getFilename());
				String ftpurl = templepGroupStreamVOtemp.getFtpurl();
				templetVO.setFtpurl(ftpurl);
				templetVO.setTopicUrl(templepGroupStreamVOtemp.getTopicUrl());
				templetVO.setIsTopic(templepGroupStreamVOtemp.getIsTopic());
				// 无分组
				if (templetGroupStreamVOList.size() == 1
						&& templepGroupStreamVOtemp.getGroup_id() == 0
						&& templepGroupStreamVOtemp.getDownStream_id() == 0) {
					// 无分组不处理
					;
				} else {
					// 模板结果循环
					for (TempletGroupStreamVO templetGroupStreamVO : templetGroupStreamVOList) {
						int downstreamId = templetGroupStreamVO
								.getDownStream_id();
						// 下游平台是否存在
						boolean downstreamflg = false;
						for (DownstreamVO downstreamVOtemp : downstreamList) {
							if (downstreamVOtemp.getId() == downstreamId) {
								// 存在结束循环
								downstreamflg = true;
								break;
							}
						}
						// 下游平台列表中不存在，加入下游平台列表
						if (!downstreamflg) {
							DownstreamVO downstreamVO = new DownstreamVO();
							// downstreamVO的设定 有需要追加项目
							// 下游平台ID
							downstreamVO.setId(templetGroupStreamVO
									.getDownStream_id());
							// 下游平台名称
							downstreamVO.setName(templetGroupStreamVO
									.getDownStream_name());
							// downstreamVO的groupVOList设定
							List<GroupVO> groupList = new ArrayList<GroupVO>();
							for (TempletGroupStreamVO templetGroupStreamVOTemp : templetGroupStreamVOList) {
								if (templetGroupStreamVOTemp.getDownStream_id() == downstreamVO
										.getId()) {
									// 平台下分组
									GroupVO groupVO = new GroupVO();
									// TODO：平台下分组设置
									// 分组ID
									groupVO.setId(templetGroupStreamVOTemp
											.getGroup_id());
									// 分组名称
									groupVO.setName(templetGroupStreamVOTemp
											.getGroup_name());
									groupList.add(groupVO);
								}
							}
							downstreamVO.setGroupList(groupList);

							// 加入平台列表
							downstreamList.add(downstreamVO);
						}
					}
					// 显示名称设置downstreamGroupName
					String downstreamGroupName = "";
					List<Integer> groupIds = new ArrayList<Integer>();

					for (int j = 0; j < downstreamList.size(); j++) {
						DownstreamVO downstreamVO = downstreamList.get(j);
						downstreamGroupName = downstreamGroupName
								+ downstreamVO.getName() + COLON;
						if (downstreamVO.getGroupList() != null) {
							List<GroupVO> groupList = downstreamVO
									.getGroupList();
							for (int i = 0; i < groupList.size(); i++) {
								// groupId追加
								groupIds.add(groupList.get(i).getId());
								if (i == groupList.size() - 1) {
									downstreamGroupName = downstreamGroupName
											+ groupList.get(i).getName();
								} else {
									downstreamGroupName = downstreamGroupName
											+ groupList.get(i).getName() + STOP;
								}
							}
						}
						if (j != downstreamList.size() - 1) {
							downstreamGroupName = downstreamGroupName + "\n";
						}
					}
					String[] groupIdsUp = new String[groupIds.size()];
					String groupIdstemp = "";
					for (int k = 0; k < groupIds.size(); k++) {
						String groupid = String.valueOf(groupIds.get(k));
						groupIdsUp[k] = groupid;
						if (k == 0) {
							groupIdstemp += groupid;
						} else {
							groupIdstemp += COMMA + groupid;
						}
					}
					templetVO.setGroupIds(groupIdstemp);
					templetVO.setGroupIdsUp(groupIdsUp);
					templetVO.setDownstreamGroupName(downstreamGroupName);
				}
			}

		} catch (Exception e) {
			log.error("getDetailById 出错:" + e.getMessage());
		}
		return templetVO;
	}

	/**
	 * 
	 * FunName: getTempletGroupByIds Description : 获取模板分组详细
	 * 
	 * @param vo
	 * @return List<TempletVO>
	 * @throws Exception
	 * @throws
	 * @Author: <powell/滕翔>
	 * @Create Date:<2016-1-22>
	 */
	@Override
	public List<TempletVO> getTempletGroupByIds(TempletVO vo) throws Exception {

		// 获取模板分组详细
		List<TempletVO> list = new ArrayList<TempletVO>();
		try {
			list = templetMapper.searchGroupByIds(vo);
		} catch (Exception e) {
			log.error("getTempletGroupByIds 出错:" + e.getMessage());
		}
		return list;
	}

	/**
	 * 
	 * FunName: releaseSubmit Description : 提交发布服务
	 * 
	 * @param vo
	 * @return String
	 * @throws Exception
	 * @throws
	 * @Author: <powell/滕翔>
	 * @Create Date:<2016-1-22>
	 */
	@Override
	public String releaseSubmit(TempletVO templetVO) throws Exception {
		String result = "submitOk";
		// 已通过check

		List<TempletVO> list = this.getTempletGroupByIds(templetVO);
		for (TempletVO templetVOcheck : list) {
			if (templetVOcheck.getGroupIds() == null
					|| "".equals(templetVOcheck.getGroupIds())) {
				result = "noGroupFal";
				return result;
			}
		}

		String flag = "success";
		// 先将附属文件tar包下发
//		for (TempletVO template : list) {
//			// 根据模板对象id,查询模板对应的服务器对象,并获取下发的下游平台接口地址
//			List<ServerVO> serverList = serversManageMapper
//					.searchServerByTemplateId(template);
//			ArrayList<String> downUrlList = new ArrayList<String>();
//			for (ServerVO serverVO : serverList) {
//				String downUrl = serverVO.getDownUrl();
//				downUrlList.add(downUrl);
//			}
//			String[] groupIds = template.getGroupIds().split(",");
//			
//			//查询分组
//			List<GroupVO> gl=groupMapper.searchByIds(groupIds);
//			for (GroupVO groupVO : gl) {
//				String mark = groupVO.getMark();
//				
//				// 去掉tar名称的后缀
//				String wsdlFTPTarPath = StringUitl.getWsdlFTPCheckFileTarPath(mark + ".tar");
//				// 下发md5加密码的tar包
//				// 此处判断下发方式sendType=0全量下发,sendType=1增量下发
//				String sendType = ResourceBundle.getBundle("epg").getString(
//						"sendType");
//				if("0".equals(sendType)){
//					ExecCmdRequestWbs.deleteFileAndcheckFile(downUrlList);
//				}
//				String res = ExecCmdRequestWbs.execTarReques(wsdlFTPTarPath,
//						downUrlList);
//				if (!"success".equals(res)) {
//					flag = "fail";
//				}
//			}
//			
//		}
		// 若tar包下发成功,再下发模板
		if ("success".equals(flag)) {

			for (TempletVO templetVOtemp : list) {

				// 根据模板对象id,查询模板对应的服务器对象,并获取下发的下游平台接口地址
				List<ServerVO> serverList = serversManageMapper
						.searchServerByTemplateId(templetVOtemp);
//				ArrayList<String> downUrlList = new ArrayList<String>();

				// 分组ID
				String groupIds = templetVOtemp.getGroupIds();
				String[] groupIdsArray = groupIds.split(COMMA);
				// 模板ID
				String templetId = String.valueOf(templetVOtemp.getId());
				// 发布
				try {
					Map<String, Object> session = ActionContext.getContext().getSession();

					for (ServerVO serverVO : serverList) {

						String downUrl = serverVO.getDownUrl();

						// 模板下发
						this.ExecCmdRequest(templetId, groupIdsArray, downUrl);
					}

					// 模板更新状态 已通过
					TempletVO templetVOForStatusUpdate = new TempletVO();
					templetVOForStatusUpdate.setId(templetVOtemp.getId());
					// 模板状态 "已通过"
					templetVOForStatusUpdate.setStatus("2");
					// TODO 审核时间 审核人
					// templetVOForStatusUpdate.setExaminetime(TimeSource.getNowTime19());
					// // 审核时间
					// templetVOForStatusUpdate.setExamineperson(session.get("admin").toString());
					// // 审核人
					templetMapper.updateTempletstatus(templetVOForStatusUpdate);
					// 插入发布历史
					TempletHistoryVO templetHistoryVO = new TempletHistoryVO();
					templetHistoryVO.setName(templetVOtemp.getName());
					templetHistoryVO.setTemplet_id(String.valueOf(templetVOtemp
							.getId()));
					templetHistoryVO.setOnlinetime(TimeSource.getNowTime19());

					templetHistoryVO.setOnlineperson(session.get("admin")
							.toString());
					templetHistoryVO
							.setLevel("".equals(templetVOtemp.getLevel())
									|| templetVOtemp.getLevel() == null ? null
									: Integer.parseInt(templetVOtemp.getLevel()));
					templetHistoryVO.setExaminetime(templetVOtemp
							.getExaminetime());
					templetHistoryVO.setExamineperson(templetVOtemp
							.getExamineperson());
					templetHistoryVO.setUpstreamgroup_id(templetVOtemp
							.getUpstreamgroup_id());
					templetHistoryVO.setEpgfileid(templetVOtemp.getEpgfileid());
					templetHistoryVO.setAction(templetVOtemp.getAction());
					templetHistoryVO.setSourceurl(templetVOtemp.getSourceurl());
					templetHistoryVO.setDestpath(templetVOtemp.getDestpath());
					templetHistoryVO.setMd5(templetVOtemp.getMd5());
					templetHistoryVO.setFileid(templetVOtemp.getFileid());
					templetHistoryVO.setFilename(templetVOtemp.getFilename());
					templetHistoryVO.setFtpurl(templetVOtemp.getFtpurl());
					templetHistoryVO.setType("".equals(templetVOtemp.getType())
							|| templetVOtemp.getType() == null ? null : Integer
							.parseInt(templetVOtemp.getType()));
					templetHistoryVO.setUpstream_id(templetVOtemp
							.getUpstream_id());
					// 策略信息拼接
					TempletVO templetVODownstream = this
							.getDetailById(templetVOtemp);
					String issuedstrategy = "";
					if (templetVODownstream.getDownstreamList() != null
							&& templetVODownstream.getDownstreamList().size() != 0) {
						for (int j = 0; j < templetVODownstream
								.getDownstreamList().size(); j++) {
							DownstreamVO downstreamVO = templetVODownstream
									.getDownstreamList().get(j);
							issuedstrategy = issuedstrategy
									+ downstreamVO.getName() + COLON;
							if (downstreamVO.getGroupList() != null) {
								List<GroupVO> groupList = downstreamVO
										.getGroupList();
								for (int i = 0; i < groupList.size(); i++) {
									if (i == groupList.size() - 1) {
										issuedstrategy = issuedstrategy
												+ groupList.get(i).getName();
									} else {
										issuedstrategy = issuedstrategy
												+ groupList.get(i).getName()
												+ STOP;
									}
								}
							}
							if (j != templetVODownstream.getDownstreamList()
									.size() - 1) {
								issuedstrategy = issuedstrategy + WRAP;
							}
						}
					}
					templetHistoryVO.setIssuedstrategy(issuedstrategy);
					templetHistoryVO.setDidonline(1);
					templetHistoryVO.setSource(templetVOtemp.getSource());
					spInfoService.save(templetHistoryVO);
				} catch (Exception e) {
					log.error("releaseSubmit 发布出错 ：" + "templetId:" + templetId
							+ " " + e.getMessage());
					e.printStackTrace();
					throw e;
				}
			}

		}
		return result;

	}

	/**
	 * 
	 * FunName: preReleaseSubmit Description : 预览提交发布服务
	 * 
	 * @param vo
	 * @return String
	 * @throws Exception
	 * @throws
	 * @Author: <powell/滕翔>
	 * @Create Date:<2016-1-22>
	 */
	@Override
	public String preReleaseSubmit(TempletVO templetVO, String[] groupIds)
			throws Exception {
		String result = "preSubmitOk";
		// 模板ID
		String templetId = String.valueOf(templetVO.getId());
		// 发布
		try {
			List<ServerVO> serverList = serversManageMapper
					.searchServerByTemplateId(templetVO);
			for (ServerVO serverVO : serverList) {
				String downUrl = serverVO.getDownUrl();
				// 模板下发
				this.ExecCmdRequest(templetId, groupIds, downUrl);
			}
			// 模板更新状态 已通过
			templetVO = templetMapper.getTempletById(templetVO);
			// 插入发布历史
			TempletHistoryVO templetHistoryVO = new TempletHistoryVO();
			templetHistoryVO.setName(templetVO.getName());
			templetHistoryVO.setTemplet_id(String.valueOf(templetVO.getId()));
			templetHistoryVO.setOnlinetime(TimeSource.getNowTime19());
			Map<String, Object> session = ActionContext.getContext()
					.getSession();
			templetHistoryVO.setOnlineperson(session.get("admin").toString());
			templetHistoryVO.setLevel("".equals(templetVO.getLevel())
					|| templetVO.getLevel() == null ? null : Integer
					.parseInt(templetVO.getLevel()));
			templetHistoryVO.setExaminetime(templetVO.getExaminetime());
			templetHistoryVO.setExamineperson(templetVO.getExamineperson());
			templetHistoryVO.setUpstreamgroup_id(templetVO
					.getUpstreamgroup_id());
			templetHistoryVO.setEpgfileid(templetVO.getEpgfileid());
			templetHistoryVO.setAction(templetVO.getAction());
			templetHistoryVO.setSourceurl(templetVO.getSourceurl());
			templetHistoryVO.setDestpath(templetVO.getDestpath());
			templetHistoryVO.setMd5(templetVO.getMd5());
			templetHistoryVO.setFileid(templetVO.getFileid());
			templetHistoryVO.setFilename(templetVO.getFilename());
			templetHistoryVO.setFtpurl(templetVO.getFtpurl());
			templetHistoryVO.setType("".equals(templetVO.getType())
					|| templetVO.getType() == null ? null : Integer
					.parseInt(templetVO.getType()));
			templetHistoryVO.setUpstream_id(templetVO.getUpstream_id());
			// 策略信息拼接
			List<DownstreamGroupVO> groupList = downstreamGroupMapper
					.getDownPreviewGroups(groupIds);
			String issuedstrategy = "";
			if (groupList != null) {
				for (int i = 0; i < groupList.size(); i++) {
					DownstreamGroupVO downstreamGroupVO = groupList.get(i);
					issuedstrategy = issuedstrategy
							+ downstreamGroupVO.getDownstream_name() + COLON
							+ downstreamGroupVO.getGroup_name();
					if (i != groupList.size() - 1) {
						issuedstrategy = issuedstrategy + WRAP;
					}
				}
			}
			templetHistoryVO.setIssuedstrategy(issuedstrategy);
			templetHistoryVO.setDidonline(1);
			templetHistoryVO.setSource(templetVO.getSource());
			spInfoService.save(templetHistoryVO);
		} catch (Exception e) {
			log.error("preReleaseSubmit 发布出错 ：" + "templetId:" + templetId
					+ " " + e.getMessage());
			e.printStackTrace();
			throw e;
		}
		return result;
	}

	/**
	 * 
	 * FunName: updateTempletInfo Description : 更新模板信息
	 * 
	 * @param: templetVO
	 * @param:
	 * @param:
	 * @return: String
	 * @throws Exception
	 * @Author: <powell/滕翔>
	 * @Create Date:<2016-01-28>
	 */
	public String updateTempletInfo(TempletVO templetVO) throws Exception {

		try {
			// ftpurl
			String fileName = templetVO.getFilename();
			if (fileName != null && !"".equals(fileName)) {
				fileName = fileName.substring(fileName.lastIndexOf("\\") + 1,
						fileName.length());
			}
			templetVO.setFtpurl(StringUitl.getWsdlFTPTarPath(fileName));
			// fileName
			templetVO.setFilename(fileName);
			// 模板更新
			templetMapper.updateTemplet(templetVO);
			TempletVO templetStatusVO = new TempletVO();
			templetStatusVO.setId(templetVO.getId());
			templetStatusVO.setStatus("1"); // 待审核
			templetStatusVO.setLevel("1"); // 一审
			// TODO 审核时间和审核人删除
			// 审核状态更新
			templetMapper.updateTempletstatus(templetStatusVO);

			TempletGroupVO vo = new TempletGroupVO();
			// 模板ID
			vo.setTemplet_id(templetVO.getId());
			// 分组删除
			templetGroupMapper.deleteByTempletId(vo);
			String[] groupIds = templetVO.getGroupIdsUp();
			for (String groupId : groupIds) {
				vo.setGroup_id(groupId);
				// 模板分组追加
				templetGroupMapper.save(vo);
			}

		} catch (Exception e) {
			log.error("updateTempletInfo 出错 ：" + e.getMessage());
			throw e;
		}
		return "updateOk";

	}

	/**
	 * 
	 * FunName: addTempletInfo Description : 新增模板信息
	 * 
	 * @param: templetVO
	 * @param:
	 * @param:
	 * @return: String
	 * @throws Exception
	 * @Author: <powell/滕翔>
	 * @Create Date:<2016-01-28>
	 */
	public String addTempletInfo(TempletVO templetVO) throws Exception {

		int templateId ;
		try {
			// 读取common.properties文件
			ResourceBundle rb = ResourceBundle.getBundle("common");
			// upstreamgroup_id
			String upstreamgroup_id = rb.getString("upstreamgroup_id");
			// epgfileid
			String epgfileid = rb.getString("epgfileid");
			// action
			String action = rb.getString("action");
			// sourceurl
			String sourceurl = rb.getString("sourceurl");
			// destpath
			String destpath = rb.getString("destpath");
			// md5
			String md5 = rb.getString("md5");
			// upstream_id
			String upstream_id = rb.getString("upstream_id");
			// 模板更新
			templetVO.setUpstreamgroup_id(upstreamgroup_id);
			templetVO.setEpgfileid(epgfileid);
			templetVO.setAction(action);
			templetVO.setSourceurl(sourceurl);
			templetVO.setDestpath(destpath);
			templetVO.setMd5(md5);
			templetVO.setUpstream_id(upstream_id);
			// ftpurl
			String fileName = templetVO.getFilename();
			if (fileName != null && !"".equals(fileName)) {
				fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
			}
			String ftpurl = StringUitl.getWsdlFTPTarPath(fileName);
			// fileName
			templetVO.setFilename(fileName);
			templetVO.setFtpurl(ftpurl);

			templetVO.setCreatedate(TimeSource.getNowTime19());
			String isTopic = templetVO.getIsTopic();
			if("0".equals(isTopic)){
				
				Map<String, Object> session = ActionContext.getContext()
						.getSession();
				templetVO.setCreateperson(session.get("admin").toString());
			}else{
				templetVO.setCreateperson("admin_topic");
			}
			// 一审
			templetVO.setLevel("1");
			// 待审核
			templetVO.setStatus("0");
			templetVO.setSource(templetVO.getSource());
			templetMapper.add(templetVO);
			templateId = templetVO.getId();
			templetMapper.addTempletStatus(templetVO);
//			TempletGroupVO vo = new TempletGroupVO();
//			// 模板ID
//			vo.setTemplet_id(templateId);

			// 绑定模板分组
			// String[] groupIds = templetVO.getGroupIds().split(COMMA);
			// for (String groupId : groupIds) {
			// vo.setGroup_id(groupId);
			// // 模板分组追加
			// templetGroupMapper.save(vo);
			// }

		} catch (Exception e) {
			log.error("addTempletInfo 出错 ：" + e.getMessage());
			throw e;
		}
		return ""+templateId;

	}

	/**
	 * 生成指定文件的加密字符
	 * 
	 * @param filePath
	 * @return Map<String,String>键:文件名,值:sm4加密后的文件HashCode
	 */
	public Map<String, FileGuardVO> createFileCode(String filePath) {
		File file = new File(filePath);
		Map<String, FileGuardVO> fileCodeMap = new HashMap<String, FileGuardVO>();
		try {
			log.info("----------------------Sm4Code校验码写入缓存开始!----------------------");
			fileCodeMap = fileLoop(file, fileCodeMap);
			log.info("----------------------Sm4Code校验码写入缓存结束!----------------------");
		} catch (Exception e) {
			e.printStackTrace();
		}

		return fileCodeMap;
	}

	/**
	 * 递归,生成文件的加密字符,并存入map
	 * 
	 * @param file
	 * @param map
	 * @return
	 * @throws Exception
	 */
	private Map<String, FileGuardVO> fileLoop(File file,
			Map<String, FileGuardVO> map) throws Exception {
		File[] listFiles = file.listFiles();
		for (File f : listFiles) {
			if (f.isDirectory()) {
				fileLoop(f, map);
			} else {
				// 获得文件的HashCode
				HashMethod hm = new HashMethod();
				String hash = hm.getHash(f.toString());
				// 将文件HashCode通过国密SM4+秘钥3加密
				SM4Utils sm4 = new SM4Utils();
				String key = ResourceBundle.getBundle("heartBeat").getString("filekey");
				sm4.setSecretKey(key);
				String fileCodeSM4 = sm4.encryptData_ECB(hash);
//				System.out.println("fileCodeSM4_EPGMS-------------------------------->>>"+ fileCodeSM4);
				FileGuardVO fileGuardVO = new FileGuardVO();
				fileGuardVO.setMd5(fileCodeSM4);
				fileGuardVO.setCreatetime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
				fileGuardVO.setFilename(f.getName());
				fileGuardVO.setFilepath(f.toString());
				// 以文件路径为key,将文件的加密字符存入map
				map.put(f.getPath(), fileGuardVO);
				String markPath = ResourceBundle.getBundle("epg").getString("local.markPath");
				String path = f.getPath();
				path = path.replace("\\", "/");
				if(path.contains(markPath)){
					path = path.replace(markPath,"");
				}
				// 将文件路径和校验码存入redis
				// 判断是否开启防篡改功能
				String monitorStatus = ResourceBundle.getBundle("epg").getString("local.monitorStatus");
				if(monitorStatus.equals("1")){
					String redisResult = RedisUtil.setString(path, fileCodeSM4);
					if(!"OK".equals(redisResult)){
						log.info("写入redis失败! key:" + path + "   value:" + fileCodeSM4);
					}
				}
			}
		}
		return map;
	}

	/**
	 * 将文件的sm4加密值存入数据库(epgms_guard)
	 * 
	 * @param fileCodeMap
	 */
	public void addFileSM4Code(Map<String, FileGuardVO> fileCodeMap) {
		Set<String> keySet = fileCodeMap.keySet();
		List<FileGuardVO> list = new ArrayList<FileGuardVO>();
		for (String key : keySet) {
			FileGuardVO fileGuardVO = fileCodeMap.get(key);
			list.add(fileGuardVO);
		}
		// 将生成的文件sm4加密字符存入数据库(epgms_guard)
		guardMapper.add_GuardForList(list);
	}

	/**
	 * 创建储存加密字符的附属文件
	 * 
	 * @param fileCodeMap
	 */
	public void createSM4File(String SM4FilePath,Map<String, FileGuardVO> fileCodeMap,String mark) {

		Set<Entry<String, FileGuardVO>> entrySet = fileCodeMap.entrySet();
		for (Entry<String, FileGuardVO> entry : entrySet) {
			FileGuardVO fileGuardVO = entry.getValue();
			File md5File = new File(SM4FilePath);
			if (!md5File.exists()) {
				try {
					md5File.mkdir();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			try {
				String filename = fileGuardVO.getFilename();
				String filepath = fileGuardVO.getFilepath().split(mark)[1].replace(filename, "");
				if(filename.equals("properties.jsp")){
					System.out.println("111");
				}
				String SM4FileName = filename + "_checkFile.txt";
//				log.info(sm4FileName);
				// 加密字符写入的文件名称
				File SM4filepath = new File(SM4FilePath + filepath + SM4FileName);

				if(!SM4filepath.getParentFile().exists()){
					SM4filepath.getParentFile().mkdirs();
				}
				writeMd5File(fileGuardVO.getMd5(),SM4filepath);
//				System.out.println("写入附属文件结果++++++++++++++++++++++"+ writeMd5File);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 创建文件
	 * 
	 * @param fileName
	 * @return
	 */
	public boolean createFile(File fileName) throws Exception {
		boolean flag = false;
		try {
			if (!fileName.exists()) {
				boolean createNewFile = fileName.createNewFile();
				flag = createNewFile;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	/**
	 * 写入文件加密字符
	 * 
	 * @param content
	 * @param fileName
	 * @return
	 * @throws Exception
	 */
	public static boolean writeMd5File(String content, File fileName)
			throws Exception {
		RandomAccessFile mm = null;
		boolean flag = false;
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(fileName);
			fos.write(content.getBytes("GBK"));
			fos.close();
			// mm=new RandomAccessFile(fileName,"rw");
			// mm.writeBytes(content);
			flag = true;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (mm != null) {
				mm.close();
			}
		}
		return flag;
	}

	/**
	 * 将md5文件打包(.tar)
	 */
	public void createFile2Tar(String SM4FilePath) {

		new TarUtils().execute(SM4FilePath, SM4FilePath);// 参数1: 要打包的文件夹或文件的路径
															// ,参数2: 打包后的文件路径
	}

	/**
	 * 新增模板服务
	 */
	public void templateAdd(String tarName) {
//		// tar包上传到本地的路径,在此路径下生成附属文件并打包
//		String explodePath = ResourceBundle.getBundle("epg").getString(
//				"local.previewPath");
//
//		String ftppath = ResourceBundle.getBundle("ftp").getString(
//				"ftp.tarpath");
//
//		// 2.根据模板生成加密字符的map
//		Map<String, FileGuardVO> fileCodeMap = this.createFileCode(explodePath
//				+ tarName);
//		System.out.println("保存文件加密字符的map:::::::::::::::::::" + fileCodeMap);
//
//		// 3.将加密字符写入数据库
//		this.addFileMD5Code(fileCodeMap);
//		// 4.将加密字符写入附属文件
//		String Md5FilePath = explodePath + tarName + "_checkFile";
//		this.createMD5File(Md5FilePath, fileCodeMap);// 参数1:附属文件存放路径,参数2:存放fileGuardVo对象的map
//		// 5.将所有附属文件打包(.tar)
//		this.createFile2Tar(Md5FilePath);
//		// 5.将附属文件上传ftp
//		try {
//			this.uploadFtp(ftppath, Md5FilePath + ".tar");
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		// 6.将本地解压出的模板上传到ftp的template中一份,用于备份
//		 Copy2FtpTemplate copy2FtpTemplate = new Copy2FtpTemplate();
//		 String ftpTemplatePath = ResourceBundle.getBundle("ftp").getString(
//		 "ftp.templatepath");
//		 try {
//		 copy2FtpTemplate.upload2FtpTemplate(ftpTemplatePath, explodePath
//		 + "/" + tarName);
//		 } catch (Exception e) {
//		 e.printStackTrace();
//		 }
	}
	

	public void createCheckFileService(String mark) {
		// tar包上传到本地的路径,在此路径下生成附属文件并打包
		String ftppath = ResourceBundle.getBundle("ftp").getString("ftp.tarpath");
//		String checkFileTarPath = ResourceBundle.getBundle("ftp").getString("ftp.checkFileTarPath");
		String markPath = ResourceBundle.getBundle("epg").getString("local.markPath");
		//附属文件的路径
//		String markPathCheckFile = ResourceBundle.getBundle("epg").getString("local.markPathCheckFile");
		//模板文件备份路径(用于篡改恢复)
		String bak_templatePath = ResourceBundle.getBundle("ftp").getString("ftp.templatePath");
		//附属文件备份路径(用于篡改恢复)
//		String bak_checkFilePath = ResourceBundle.getBundle("ftp").getString("ftp.checkFilePath");
		
		// 2.根据模板生成加密字符的map
		Map<String, FileGuardVO> fileCodeMap = this.createFileCode(markPath + mark);
		System.out.println("保存文件加密字符的map:::::::::::::::::::" + fileCodeMap);
		
		// 3.将加密字符写入数据库
		this.addFileSM4Code(fileCodeMap);
//		// 4.将加密字符写入附属文件
//		String SM4FilePath = markPathCheckFile + mark;
//		this.createSM4File(SM4FilePath, fileCodeMap,mark);// 参数1:附属文件存放路径,参数2:存放fileGuardVo对象的map
//		// 5.将所有附属文件打包(.tar)
//		this.createFile2Tar(SM4FilePath);
		try {
			// 6.将打包好的附属文件解压到ftp的文件夹下(用于备份,文件篡改时恢复使用)
//			unTarNoTarName(SM4FilePath + ".tar", bak_checkFilePath);//此解压tar包方法,解压时,不会创建tar包同名的文件夹,而是将tar的内容平铺解压
			// 7.将附属文件上传ftp
//			this.uploadFtp(checkFileTarPath, SM4FilePath + ".tar");
			// 8.将重命名为mark的模板文件打包
			this.createFile2Tar(markPath+mark);
			// 9.将打包好的模板文件解压到ftp的文件夹下(用于备份,文件篡改时恢复使用)
			unTarNoTarName(markPath + mark + ".tar", bak_templatePath);
			// 10.将重命名为mark的模板文件tar包上传ftp
			this.uploadFtp(ftppath, markPath+mark + ".tar");
			// 11.将重命名为mark的模板文件上传ftp
//			this.uploadFtpFolder(markPath + mark);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	String ftp_templatePath = ResourceBundle.getBundle("ftp").getString("ftp.templatePath");
	String local_markPath = ResourceBundle.getBundle("epg").getString("local.markPath");
	public void uploadFtpFolder(String localPath ) throws Exception{
		
		String path = this.getClass().getClassLoader().getResource("ftp.properties").toURI().getPath();
		System.out.println(path);
		prop = ReadProperties.readProperties(path);

		/** 创建FTP链接 */
		FtpUtil ftp = new FtpUtil(prop.getProperty("ftp.ip"),
				Integer.parseInt(prop.getProperty("ftp.port")),
				prop.getProperty("ftp.username"),
				prop.getProperty("ftp.password"));
		ftp.setPassive();
		loopForUpload(ftp,localPath);
		ftp.ftpclose();
	}
	public void loopForUpload(FtpUtil ftp,String path) throws IOException{
		File file = new File(path);
		File[] listFiles = file.listFiles();
		for (File f : listFiles) {
			if(f.isDirectory()){
				loopForUpload(ftp,path+"/"+f.getName());
			}else{
				String localFullPath = f.getPath().replace("\\", "/");
				String ftpPath = localFullPath.replace(local_markPath, ftp_templatePath);
				File parentFile = new File(ftpPath).getParentFile();
				boolean mkFtpDir = ftp.mkFtpDir(parentFile.getPath().replace("\\", "/"));
				ftp.uploadFileByTemplate(ftpPath, localFullPath);
			}
		}
	}
	
	/**
	 * 给模板添加分组信息
	 * 
	 * @throws Exception
	 */

	@Override
	public String addGroupService(TempletGroupVO groupVO, String groupIds) {
		// 若勾选的模板已绑定groupId,则先根据模板id删除分组信息,再进行绑定
		try {

			templetGroupMapper.deleteByTempletId(groupVO);
			// 绑定模板分组
			String[] ids = groupIds.split(COMMA);
			for (String groupId : ids) {
				groupVO.setGroup_id(groupId);
				// 模板分组追加
				templetGroupMapper.save(groupVO);
			}
			return "绑定分组成功";
		} catch (Exception e) {
			e.printStackTrace();
			return "绑定分组失败";
		}

	}

	/**
	 * 将附属文件包上传ftp
	 */
	Properties prop;

	public void uploadFtp(String ftppath, String localTarPath) throws Exception {
		String path = this.getClass().getClassLoader().getResource("ftp.properties").toURI().getPath();
		prop = ReadProperties.readProperties(path);

		/** 创建FTP链接 */
		FtpUtil ftp = new FtpUtil(prop.getProperty("ftp.ip"),
				Integer.parseInt(prop.getProperty("ftp.port")),
				prop.getProperty("ftp.username"),
				prop.getProperty("ftp.password"));
		ftp.setPassive();

		ftp.uploadFile("/" + ftppath + "/", localTarPath);
		log.info("----------上传ftp路径:" + ftppath + "  本地tar包路径:" + localTarPath + "----------");
	}

	@Override
	public String addAreaService(TemplateAreaVO templateAreaVO, String areaIds) {
		try {

			templateAreaMapper.deleteAreaByTempletId(templateAreaVO);
			// 绑定模板分域
			String[] ids = areaIds.split(COMMA);
			for (String areaId : ids) {
				templateAreaVO.setAreaId(Integer.valueOf(areaId));
				// 模板分域追加
				templateAreaMapper.save(templateAreaVO);
			}
			return "绑定分域成功";
		} catch (Exception e) {
			e.printStackTrace();
			return "绑定分域失败";
		}
	}

	@Override
	public TempletVO searchTemplateById(TempletVO templetVO) {
		TempletVO vo = templetMapper.searchTemplateById(templetVO);
		return vo;
	}

	@Override
	public List<TempletVO> searchTemplateServer(TempletVO templetVO) {
		List<TempletVO> list = templateServerMapper.searchPage(templetVO);
		return list;
	}

	/**
	 * 更新模板状态
	 * @throws Exception 
	 */
	@Override
	public void updateTempletstatus(TempletVO templetVO) throws Exception {
		templetMapper.updateTempletstatus(templetVO);
	}

	@Override
	public void updateTempletTopicStatus(TempletVO templetVO) throws Exception {
		templetMapper.updateTemplet(templetVO);	
	}
	
	public List<String> unTarNoTarName(String tarFile, String destDir) throws Exception {
		File file = new File(tarFile);
//		String fileName = file.getName();
//		int popint = fileName.indexOf(".");
//		if (popint != -1) {
//			fileName = fileName.substring(0, popint);
//		}
//		return unTar(file, destDir + "/" + fileName);
		return unTar(file, destDir);
	}

	public List<String> unTar(File tarFile, String destDir) throws Exception {
		if (StringUtils.isBlank(destDir)) {
			destDir = tarFile.getParent();
		}
		destDir = destDir.endsWith(File.separator) ? destDir : destDir
				+ File.separator;
		return unTar(new FileInputStream(tarFile), destDir);
	}

	private List<String> unTar(InputStream inputStream, String destDir)
			throws Exception {

		List<String> fileNames = new ArrayList<String>();
		TarArchiveInputStream tarIn = new TarArchiveInputStream(inputStream,
				1024);
		TarArchiveEntry entry = null;
		try {
			while ((entry = tarIn.getNextTarEntry()) != null) {
				fileNames.add(entry.getName());
				if (entry.isDirectory()) {// 是目录
					createDirectory(destDir, entry.getName());// 创建空目录
				} else {// 是文件
					File tmpFile = new File(destDir + File.separator
							+ entry.getName());
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
					log.info("tar解压成功，path：" + destDir + entry.getName());
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
	public void createDirectory(String outputDir, String subDir) {
		File file = new File(outputDir);
		if (!(subDir == null || subDir.trim().equals(""))) {// 子目录不为空
			file = new File(outputDir + File.separator + subDir);
		}
		if (!file.exists()) {
			file.mkdirs();
		}
	}
	
}
