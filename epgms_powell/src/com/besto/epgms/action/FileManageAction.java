/**
 * 查询log记录action
 * @author jackicyang
 */
package com.besto.epgms.action;

import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.besto.epgms.manage.FileManageService;
import com.besto.epgms.vo.FileInfoVO;
import com.besto.util.CreateJSUtil;


@Controller("fileManageAction")
@Scope("prototype")
@Lazy
public class FileManageAction  extends BaseAction{
	private static final long serialVersionUID = 1L;
	private FileInfoVO vo;
	
	@Autowired
	private FileManageService fileManageService;
	private Logger logger = Logger.getLogger(this.getClass());

	public String search() throws Exception {
		logger.debug("进入FileManageAction的search方法");
		if(null == vo){
			vo = new FileInfoVO();
		}
		//初始化分页值(保值)
		vo=(FileInfoVO)this.initPageValueAndKeepValue(vo, FileInfoVO.class);
		//查询分页
		List<FileInfoVO> list=fileManageService.search(vo);
		//结果集绑定到request 中供前台使用
		this.pageBindValue(vo,"list",list);	
		return "index";
	}
	public String resumeIssue() throws Exception {
		CreateJSUtil createJSUtil = new CreateJSUtil();
		List<FileInfoVO> list = null;
		String[] strArr = vo.getIds();
		for(String filecode : strArr){
			logger.info("[resumeIssue] filecode:" + filecode);
			vo.setCode(filecode);
			list=fileManageService.searchByCode(vo);
			if(list != null){
				createJSUtil.resumeuploadfile(list.get(0));
			}
			
		}
		
/*		logger.debug("进入FileManageAction的search方法");
		if(null == vo){
			vo = new FileInfoVO();
		}
		//初始化分页值(保值)
		vo=(FileInfoVO)this.initPageValueAndKeepValue(vo, FileInfoVO.class);
		//查询分页
		List<FileInfoVO> list=fileManageService.search(vo);
		//结果集绑定到request 中供前台使用
		this.pageBindValue(vo,"list",list);	*/		
		return "action";
	}

	public FileInfoVO getVo() {
		return vo;
	}

	public void setVo(FileInfoVO vo) {
		this.vo = vo;
	}
	
	
}
