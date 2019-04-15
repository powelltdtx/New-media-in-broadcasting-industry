package com.besto.epgms.action;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.besto.epgms.action.LoginAction;
import com.besto.epgms.manage.UserInfoService;
import com.besto.epgms.vo.UserInfoVO;
import com.opensymphony.xwork2.ActionContext;


/***Project:  <epgms>
 * Comments:  <登陆信息类action>         
 * JDK version used:<JDK1.6>
 * Author：   滕翔
 * Create Date：  2015-10-21
 * Version:  <1.0>
 */
@Scope("prototype")
@Controller("loginAction")
@Lazy
public class LoginAction extends BaseAction{
	private static final long serialVersionUID = 1L;
	private final String MAIN_PAGE = "main";
	private String message;
	private UserInfoVO vo;
	/** 初始化服务类 */
	@Autowired
	UserInfoService userInfoService ;
	/**
	 * @Title: init 
	 * @Description: 登陆初期化实现
	 * @throws Exception
	 * @return String 
	 * @author  <滕翔>
	 * @Create Date: < 2014-12-31>
	 */
	public String init() throws Exception {
		return INPUT;
	}
	/**
	 * @Title: login 
	 * @Description: 用户登录功能实现
	 * @throws Exception
	 * @return String 
	 *@author  滕翔
	 * @Create Date: < 2015-12-03>
	 */
	public String login() throws Exception {
		if(vo!=null && vo.getUserid() !=null && vo.getPassword() != null && !"".equals(vo.getUserid()) && !"".equals(vo.getPassword())){
			UserInfoVO rvo = userInfoService.searchById(vo.getUserid(), false);
			if(rvo!=null && vo.getPassword().equals(rvo.getPassword())){
				if(rvo.getStatus().equals("0")) {
					Map<String, Object> session = ActionContext.getContext().getSession();
					//将用户名信息存入session
					session.put("admin", vo.getUserid());
					session.put("adminname", rvo.getUsername());
					//将用户权限存入session
					String codes = userInfoService.searchButtonByUserId(vo.getUserid());
					session.put("rolebtns", codes);
					return MAIN_PAGE;
				} else {
					message="该用户已经失效。";
					return INPUT;
				}
			}else{
				message="用户名或密码输入错误，请重新输入。";
				return INPUT;
			}
		}else{
			message="请输入用户名和密码！";
			return INPUT;
		}
	}
	/**
	 * @Title: loginOut 
	 * @Description: 退出登陆功能实现
	 * @throws Exception
	 * @return String 
	 * @author  <滕翔>
	 * @Create Date: < 2015-10-21>
	 */
	public String logout() throws Exception {
		Map<String, Object> session = ActionContext.getContext().getSession();
		//将用户信息从session中移除
		session.remove("admin");
		session.remove("adminname");
		session.remove("rolebtns");
		return INPUT;
	}
	//set he get
	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}
	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}
	/**
	 * @return the vo
	 */
	public UserInfoVO getVo() {
		return vo;
	}
	/**
	 * @param vo the vo to set
	 */
	public void setVo(UserInfoVO vo) {
		this.vo = vo;
	}
	
}
