/**
 * 主窗体action
 * @author Johan.H
 */
package com.besto.epgms.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.besto.epgms.manage.UserInfoService;
@Controller("portal")
@Scope("prototype")
@Lazy
public class MainAction extends BaseAction{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/** 初始化服务类 */
	@Autowired
	UserInfoService userInfoService;
	public String toMain(){
		/*Map<String, Object> session = ActionContext.getContext().getSession();
		String pages = "";
		List<ActionVO> list = new ArrayList<ActionVO>();
		if(session.get("roles") != null){
			pages = (String)session.get("roles");
		}
		if(pages != null && !"".equals(pages)){
			list = userInfoService.searchAction(pages);
		}
		this.getRequest().put("actlist", list);	*/
		return "success";
	}
}
