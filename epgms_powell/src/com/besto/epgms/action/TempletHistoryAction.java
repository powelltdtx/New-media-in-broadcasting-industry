package com.besto.epgms.action;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.besto.epgms.manage.TempletHistoryService;
import com.besto.epgms.vo.TempletHistoryVO;

/**
 * 
 * Project: < ms> Comments: <描述> JDK version used:<JDK1.6> Namespace:
 * TempletHistoryAction Author: <auther/滕翔> Create Date: <2016-1-22> Version:
 * <1.0>
 */
@SuppressWarnings("serial")
@Scope("prototype")
@Controller("templetHistoryAction")
@Lazy
public class TempletHistoryAction extends BaseAction {
	private static Logger logger = Logger.getLogger(TempletHistoryAction.class);
	private TempletHistoryVO templetHistoryVO;
	/** 初始化服务类 */
	@Autowired
	TempletHistoryService templetHistoryService;

	private String doFlag;// 消息弹出标识

	private static final String TEMPLET_TYPE = "templet_type";
	private static final String TEMPLET_SOURCE = "templet_source";

	/**
	 * 
	 * FunName: search Description : 分页查询
	 * 
	 * @param: @return
	 * @param: @throws
	 *             Exception
	 * @return: String
	 * @throws @Author:
	 *             <auther/滕翔>
	 * @Create Date:<2016-01-22>
	 */
	public String search() throws Exception {

		// 初始化分页值(保值)
		templetHistoryVO = (TempletHistoryVO) this.initPageValueAndKeepValue(templetHistoryVO, TempletHistoryVO.class);
		// 查询分页
		List<TempletHistoryVO> list = templetHistoryService.search(templetHistoryVO);
		// 结果集绑定到request 中供前台使用
		this.pageBindValue(templetHistoryVO, "list", list);
		getRequest().put(TEMPLET_TYPE, this.transList(TEMPLET_TYPE)); // 状态
		getRequest().put(TEMPLET_SOURCE, transList(TEMPLET_SOURCE)); // 来源

		return SUCCESS;
	}

	/**
	 * 
	 * FunName: checkPage Description : 跳转到查看页面
	 * 
	 * @param: @return
	 * @return: String
	 * @throws @Author:
	 *             <auther/滕翔>
	 * @Create Date:<2016-01-22>
	 */
	public String checkPage() {
		try {
			templetHistoryVO = templetHistoryService.searchById(templetHistoryVO);
		} catch (Exception e) {

		}
		return "check";
	}

	public String getDoFlag() {
		return doFlag;
	}

	public void setDoFlag(String doFlag) {
		this.doFlag = doFlag;
	}

	public TempletHistoryVO getTempletHistoryVO() {
		return templetHistoryVO;
	}

	public void setTempletHistoryVO(TempletHistoryVO templetHistoryVO) {
		this.templetHistoryVO = templetHistoryVO;
	}

}
