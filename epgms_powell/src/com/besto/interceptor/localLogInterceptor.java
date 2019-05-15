/***CopyRright (c)2008-2015: <维动科技widgetdo>
 *Project:  <obss>
 * Comments:  <操作日志log>         
 * JDK version used:<JDK1.6>
 * Author：   <Johan.H>
 * Create Date：  2015-01-12
 * Version:  <1.0>
 */
package com.besto.interceptor;

import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;

import com.besto.epgms.manage.OperationLogService;
import com.besto.epgms.po.OperationLog;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class localLogInterceptor extends AbstractInterceptor{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Logger loggerA = Logger.getLogger(this.getClass());
	
	@Autowired
	private OperationLogService operationLogBiz;
	
	
	@Override
	public String intercept(ActionInvocation arg0) throws Exception {
		loggerA.debug("进入日志拦截器");
		ActionContext ctx = arg0.getInvocationContext();
		Map<String, Object> session = ctx.getSession();
		String ip = ServletActionContext.getRequest().getRemoteAddr();
		//获取用户
		String user = (String) session.get("admin");
		DateFormat format = new SimpleDateFormat("yyyyMMddHH:mm:ss");
		String d = format.format(new Date());
		Object[] array =  ctx.getParameters().values().toArray();
		StringBuffer sb = new StringBuffer("");
		for(int i=0;i<array.length;i++){
			if(array[i] instanceof  File[]){
				sb.append(((File[])array[i]).toString());
			}else{
				try {
					String[] ca = (String[])array[i];
					for(int j=0;j<ca.length;j++){
						sb.append(ca[j]+" ");
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		OperationLog log = new OperationLog();
		log.setUsername(user);
		loggerA.debug("username:"+user);
		log.setModuleName(arg0.getAction().getClass().getSimpleName());
		loggerA.debug("ModuleName："+arg0.getAction().getClass().getSimpleName());
		log.setOptidName(arg0.getProxy().getMethod());
		loggerA.debug("OptidName："+arg0.getProxy().getMethod());
		log.setIp(ip);
		loggerA.debug("ip:"+ip);
		log.setParams(sb.toString());
		loggerA.debug("params:"+sb.toString());
		log.setDate(d.substring(0, 8));
		loggerA.debug("Date:"+d.substring(0, 8));
		log.setTime(d.substring(8));
		loggerA.debug("Time:"+d.substring(8));
		operationLogBiz.addLog(log);
		return arg0.invoke();
	}


	public OperationLogService getOperationLogBiz() {
		return operationLogBiz;
	}


	public void setOperationLogBiz(OperationLogService operationLogBiz) {
		this.operationLogBiz = operationLogBiz;
	}
	
	
}
