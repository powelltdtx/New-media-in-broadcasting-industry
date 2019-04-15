package com.besto.epgms.action;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.besto.epgms.manage.UserInfoService;
import com.besto.epgms.vo.UserInfoVO;
import com.besto.util.Constants;

/***
 * 用户管理
 * @author 滕翔
 * 2015-10-21
 */
@SuppressWarnings("serial")
@Scope("prototype")
@Controller("userInfoAction")
@Lazy
public class UserInfoAction extends BaseAction{
	private static Logger logger = Logger.getLogger(UserInfoAction.class);
	private UserInfoVO userinfoVO;
	/** 初始化服务类 */
	@Autowired
	UserInfoService userInfoService;
	private String doFlag;//消息弹出标识
	private String user_id;
	
	
	/**
	 * 查询用户
	 * 
	 * @return 分页查询结果
	 * @throws Exception
	 */
	public String search() throws Exception {
		
		//初始化分页值(保值)
		userinfoVO=(UserInfoVO)this.initPageValueAndKeepValue(userinfoVO, UserInfoVO.class);
		//查询分页
		List<UserInfoVO> list=userInfoService.search(userinfoVO);
		//结果集绑定到request 中供前台使用
		this.pageBindValue(userinfoVO,"list",list);

		return SUCCESS;
	}
	
	/**
	 *  
	 * 跳转到  添加用 户页面
	 * 
	 * */
	public String add(){
		this.pageBindValue("rolelist",userInfoService.searchAllRoles());
		return "add";	
	}

	/**
	 *  
	 * 添加用 户
	 * 
	 * */
	public String save(){
		String result = userInfoService.save(userinfoVO);
		if(Constants.RESULT_OK.equals(result)){
			doFlag = "1";
		}else{
			doFlag = "2";
			this.addActionError("save 错误详情查询日志");
		}
		return "ok";	
	}
	/**
	 *  
	 * 跳转到  编辑用 户页面
	 * 
	 * */
	public String edit(){
		userinfoVO = userInfoService.searchById(user_id, false);
		this.pageBindValue("rolelist",userInfoService.searchAllRoles());
		this.pageBindValue("ownrolelist",userInfoService.searchOwnPer(user_id));
		return "edit";	
	}
	
	/**
	 *  
	 * 修改用 户
	 * 
	 * */
	public String update(){
		String result = userInfoService.update(userinfoVO);
		if(Constants.RESULT_OK.equals(result)){
			doFlag = "1";
		}else{
			doFlag = "2";
			this.addActionError("update 错误详情查询日志");
		}
		return "ok";	
	}
	
	/**
	 *  
	 * 删除用 户
	 * 
	 * */
	public String delete(){
		String result = userInfoService.delete(userinfoVO);
		if(Constants.RESULT_OK.equals(result)){
			doFlag = "1";
		}else{
			doFlag = "2";
			this.addActionError("delete 错误详情查询日志");
		}
		return "ok";	
	}
	
	/**
	 *  
	 * 校验用户id重复
	 * 
	 * */
	public void checkUserId(){
		jsnt(userInfoService.checkUserId(user_id) + "");
	}
	
	/**
	 * @return the userinfoVO
	 */
	public UserInfoVO getUserinfoVO() {
		return userinfoVO;
	}

	/**
	 * @param userinfoVO the userinfoVO to set
	 */
	public void setUserinfoVO(UserInfoVO userinfoVO) {
		this.userinfoVO = userinfoVO;
	}

	/**
	 * @return the doFlag
	 */
	public String getDoFlag() {
		return doFlag;
	}

	/**
	 * @param doFlag the doFlag to set
	 */
	public void setDoFlag(String doFlag) {
		this.doFlag = doFlag;
	}

	/**
	 * @return the user_id
	 */
	public String getUser_id() {
		return user_id;
	}

	/**
	 * @param user_id the user_id to set
	 */
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
}
