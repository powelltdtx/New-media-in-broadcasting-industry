package com.besto.epgms.action;

import java.util.List;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;
import com.besto.epgms.mapper.UserInfoMapper;
import com.besto.epgms.po.Role;
import com.besto.util.BeanFactory;

/***
 *Project:  <cbms>
 * Comments:  <标签类>         
 * JDK version used:<JDK1.6>
 * Author：   <滕翔>
 * Create Date：  2015-10-21
 * Version:  <1.0>
 */
public class UserRolesTags extends TagSupport {
	private static final long serialVersionUID = 1L;   
	
	private String user_id;//id
	
	public UserRolesTags() {   
    }   

    public int doStartTag() throws JspException {
        return SKIP_BODY;   
    }   
  
    public int doEndTag() throws JspException {
		try {
			//通过父类TagSupport的属性值pageContext 取得相关的内置对象   
	        JspWriter out=pageContext.getOut();   
			String ret = "";
			UserInfoMapper userInfoMapper = BeanFactory.getBean("userInfoMapper", null);
			List<Role> roleList = userInfoMapper.searchUserRole(user_id);
			for(int i = 0; i < roleList.size(); i++){
				ret += roleList.get(i).getName()+"<br>";
			}
			out.println(ret);
		} catch (Exception e) {
			e.printStackTrace();
		}
        return EVAL_PAGE;
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
