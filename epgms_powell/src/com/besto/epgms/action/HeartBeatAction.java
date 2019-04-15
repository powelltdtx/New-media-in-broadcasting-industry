package com.besto.epgms.action;

import java.io.IOException;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.besto.epgms.manage.HeartBeatService;
import com.besto.epgms.vo.HeartBeatVO;
import com.opensymphony.xwork2.ActionContext;

/***
 * 服务器心跳监控管理
 * 
 */
@SuppressWarnings("serial")
@Scope("prototype")
@Controller("heartBeatAction")
@Lazy
public class HeartBeatAction extends BaseAction {

	private HeartBeatVO heartBeatVO;
	
	private static ObjectMapper objectMapper = new ObjectMapper();
	
	
	

	@Autowired
	HeartBeatService heartBeatService;

	public String search() throws Exception {
		// 初始化分页值(保值)
		heartBeatVO = (HeartBeatVO) this.initPageValueAndKeepValue(heartBeatVO,
				HeartBeatVO.class);
		// 查询分页
		List<HeartBeatVO> list = heartBeatService.search(heartBeatVO);
		// 结果集绑定到request 中供前台使用
		this.pageBindValue(heartBeatVO, "list", list);

		return SUCCESS;
	}
	
	//点击关闭服务器按钮
	public String closeServer() throws Exception{
		System.out.println("+++++++++++++++++++++++++异常服务器已被关闭");
		
		heartBeatService.updateServerStatus(heartBeatVO);
		String result="服务器已关闭";
		
		return "updateOK";
	}
	
	public String jsnt(String info) {
		String flag = "1";
		HttpServletResponse response = (HttpServletResponse) ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_RESPONSE);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		try {
			response.getWriter().write(info);
		} catch (IOException e) {
			flag = "2";
			e.printStackTrace();
		}
		return flag;
	}
	
	public HeartBeatVO getHeartBeatVO() {
		return heartBeatVO;
	}

	public void setHeartBeatVO(HeartBeatVO heartBeatVO) {
		this.heartBeatVO = heartBeatVO;
	}

}
