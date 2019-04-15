package com.besto.epgms.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.besto.epgms.manage.TemplatePoolService;
import com.besto.epgms.manage.TemplateService;
import com.besto.epgms.vo.PicVO;
import com.besto.epgms.vo.PoolPicVO;
import com.besto.epgms.vo.PoolVO;
import com.besto.epgms.vo.TempletVO;
import com.besto.util.StringUitl;
import com.besto.util.TimeSource;
import com.opensymphony.xwork2.ActionContext;

/***
 * 模板库管理
 */
@SuppressWarnings("serial")
@Scope("prototype")
@Controller("templetPoolAction")
@Lazy
public class TempletPoolAction extends BaseAction {
	private static Logger logger = Logger.getLogger(TempletPoolAction.class);
	private static final String TEMPLET_TYPE = "templet_type";
	private static final String TEMPLET_STATUS = "templet_status";
	private static final String TEMPLET_LEVEL = "templet_level";
	private static final String TEMPLET_SOURCE = "templet_source";
	private PoolVO poolVO;
	private PicVO picVO;
	private static ObjectMapper objectMapper = new ObjectMapper();
	@Autowired
	TemplatePoolService templatePoolService;
	@Autowired
	TemplateService templateService;

	/**
	 * 将创建模板页面的模板,保存到模板库
	 * 
	 */
	public String saveTemplatePool() throws Exception {
		logger.debug("进入了TempletPoolAction的saveTemplatePool方法");
		// 根据templateId查询出templateVO
		TempletVO templetVOParam = new TempletVO();
		templetVOParam.setId(Integer.valueOf(poolVO.getTemplateId()));
		TempletVO templetVO = templatePoolService.searchTemplate(templetVOParam);
		templetVO.setName(poolVO.getName());
		templetVO.setCreatedate(TimeSource.getNowTime19());
		BeanUtils.copyProperties(poolVO, templetVO);
		// 保存到epgms_pool表
		String poolId = templatePoolService.savePool(poolVO);
		// 保存到epgms_pic表
		String picName = null;
		String uploadImageSrc = picVO.getPath();
		if (uploadImageSrc != "" && uploadImageSrc != null) {
			picName = uploadImageSrc.substring(uploadImageSrc.indexOf("/") + 1);
		}
		picVO.setPicName(picName);
		String picId = templatePoolService.savePic(picVO);
		// 保存到epgms_pool_pic表
		PoolPicVO poolPicVO = new PoolPicVO();
		poolPicVO.setPicId(picId);
		poolPicVO.setPoolId(poolId);
		templatePoolService.saveEpgms_Pool_Pic(poolPicVO);
		return "searchTemplate";
	}

	/**
	 * 模板库---将模板库中的模板保存到epgms_templet表
	 * 
	 */
	public String savePoolToTemplate() throws Exception {
		logger.debug("进入了TempletPoolAction的saveTemplatePool方法");
		String reusult = "fail";// fail:失败,
		PoolVO pool = templatePoolService.searchPoolById(poolVO);
		String templateId = pool.getTemplateId();
		// 根据templateId查询出templateVO
		TempletVO templetVOParam = new TempletVO();
		templetVOParam.setId(Integer.valueOf(templateId));
		TempletVO templetVO = templatePoolService.searchTemplate(templetVOParam);
		templetVO.setName(pool.getName());
		templetVO.setCreatedate(TimeSource.getNowTime19());
		// 同时在epgms_template表插入一条新的模板记录
		reusult = templateService.addTempletInfo(templetVO);
		this.jsnt(objectMapper.writeValueAsString(reusult));
		return null;
	}

	/**
	 * 模板库页面---下载tar包方法
	 * 
	 * @throws Exception
	 */
	public void downLoad() throws Exception {
		logger.debug("进入了TempletPoolAction的downLoad方法,开始下载tar包!!!");
		String tarBasePath = ResourceBundle.getBundle("epg").getString("local.tarBasePath");
		PoolVO pool = templatePoolService.searchPoolById(poolVO);
		// 获取下载的tar包的名称
		String filename = pool.getFilename();
		// 下载
		HttpServletResponse response = ServletActionContext.getResponse();
		response.reset();
		response.setContentType("application/ostet-stream");
		response.addHeader("Content-Disposition", "attachment; filename=\"" + filename + "\"");
		File file = new File(tarBasePath + filename);
		int fileLength = (int) file.length();
		response.setContentLength(fileLength);
		/* 如果文件长度大于0 */
		if (fileLength != 0) {
			/* 创建输入流 */
			InputStream inStream = new FileInputStream(file);
			byte[] buf = new byte[4096];
			/* 创建输出流 */
			ServletOutputStream servletOS = response.getOutputStream();
			int readLength;
			while (((readLength = inStream.read(buf)) != -1)) {
				servletOS.write(buf, 0, readLength);
			}
			inStream.close();
			servletOS.flush();
			servletOS.close();
		}
	}
	/**
	 * 查询模板库列表
	 * 
	 * @return
	 * @throws Exception
	 */
	public String searchTemplatePool() throws Exception {
		logger.debug("进入了TempletPoolAction的searchTemplatePool方法,查询分页列表");
		// 初始化分页值(保值)
		poolVO = (PoolVO) this.initPageValueAndKeepValue(poolVO, PoolVO.class);
		// 查询分页
		List<PoolVO> list = templatePoolService.search(poolVO);
		// 结果集绑定到request 中供前台使用
		this.pageBindValue(poolVO, "list", list);
		// 模板类型存放request
		getRequest().put(TEMPLET_TYPE, transList(TEMPLET_TYPE));
		// 审核状态存放request
		getRequest().put(TEMPLET_STATUS, transList(TEMPLET_STATUS));
		// 审核阶段存放request
		getRequest().put(TEMPLET_LEVEL, transList(TEMPLET_LEVEL));
		// 厂商来源存放request
		getRequest().put(TEMPLET_SOURCE, transList(TEMPLET_SOURCE));
		return "searchPoolPage";
	}

	/**
	 * 根据模板库的模板id查询pic对象
	 * 
	 * @return
	 * @throws Exception
	 */
	public String searchPicByPoolId() throws Exception {
		logger.debug("进入了TempletPoolAction的searchPicPathByPoolId方法,查询缩略图路径");
		PicVO pic = templatePoolService.searchPicByPoolId(poolVO);
		String picPath = pic.getPath();
		this.jsnt(objectMapper.writeValueAsString(picPath));
		return null;
	}

	public PoolVO getPoolVO() {
		return poolVO;
	}

	public void setPoolVO(PoolVO poolVO) {
		this.poolVO = poolVO;
	}

	public PicVO getPicVO() {
		return picVO;
	}

	public void setPicVO(PicVO picVO) {
		this.picVO = picVO;
	}

}
