package com.besto.epgms.action;

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

/***
 *Project:  <cbms>
 * Comments:  <标签类>         
 * JDK version used:<JDK1.6>
 * Author：   <滕翔>
 * Create Date：  2015-10-21
 * Version:  <1.0>
 */
public class UserRolePermissionTags extends TagSupport {
	private static final long serialVersionUID = 1L;   
	private String btncode;//按钮编码
	public UserRolePermissionTags() {   
    }   

    public int doStartTag() throws JspException {
        return SKIP_BODY;   
    }   
  
    public int doEndTag() throws JspException {
		try {
			// 无操作权限,则按钮灰置，不能点击，有操作权限，则正常
			String ret = " class=\"btn\" disabled=\"disabled\" style=\"cursor:default;\" ";
			JspWriter out = pageContext.getOut();
			HttpSession session = pageContext.getSession();
			String rolebtns = "";
			if (session.getAttribute("rolebtns") != null) {
				rolebtns = (String) session.getAttribute("rolebtns");
				if (rolebtns.contains("," + btncode + ",")) {
					ret = " class=\"btn blue-btn\" ";
				}
			}
			out.println(ret);
		} catch (Exception e) {
			e.printStackTrace();
		}
        return EVAL_PAGE;
    }

	/**
	 * @return the btncode
	 */
	public String getBtncode() {
		return btncode;
	}

	/**
	 * @param btncode the btncode to set
	 */
	public void setBtncode(String btncode) {
		this.btncode = btncode;
	}   
  
}
