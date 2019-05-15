package com.besto.interceptor;

import java.util.ResourceBundle;
//import org.apache.log4j.Logger;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.MethodFilterInterceptor;

/**
 * 
* Comments:  <页面保值拦截器>         
* JDK version used:<JDK1.6>
* Namespace:  KeepValueInterceptor
* Author:   <powell/滕翔>
* Create Date: <2016-1-8>  
* Version:  <1.0>
* 
* 1.在common.properties 添加(actionsearch/***)
* 2.在struts.xml中设置拦截器
* <interceptor name="keepValue" class="com.besto.interceptor.KeepValueInterceptor">
* </interceptor>
*	...
* <interceptor-ref name="keepValue" />
* 3.不要在session中使用 kvVO_key/kvVO_value/kvVO_method/kvVO_changed 等name
* 
* 如果跳转Action中含有 common.properties文件中 actionsearch 对应的value
* 则此页面进行保值操作
* 
 */
public class KeepValueInterceptor extends MethodFilterInterceptor {
	private static final long serialVersionUID = 1L;
//	private Logger logger = Logger.getLogger(this.getClass());
	
	/**
	 * @Title: intercept 
	 * @Description: 登录用户验证
	 * @throws Exception
	 * @return String 
	 * @author  <jackicyang>
	 * @Create Date: < 2015-5-21>
	 */

	@Override
	protected String doIntercept(ActionInvocation invocation) throws Exception {
		
		String actionsearch=ResourceBundle.getBundle("common").getString("actionsearch");//actionsearch
		String keepvaluevo_key="kvVO_key";
		String keepvaluevo_value="kvVO_value";
		String keepvaluevo_method="kvVO_method";
		String keepvaluevo_changed="kvVO_changed";
		
		
		//获取当前session
		ActionContext ctx = invocation.getInvocationContext();
		String name=invocation.getInvocationContext().getName();
		String nameForSession=(String)ctx.getSession().get(keepvaluevo_method);
		ctx.getSession().put(keepvaluevo_changed, (null==nameForSession||name.equals(nameForSession))?"0":"1");
		
		if(name.contains(actionsearch)){
			
			//初始化
			if(null==ctx.getSession().get(keepvaluevo_key)||((String)ctx.getSession().get(keepvaluevo_key)).trim().length()<1){

				ctx.getSession().put(keepvaluevo_key, name);
			}
			
			//点击左侧菜单重置
			else  if(invocation.getInvocationContext().getParameters().size()==0){
				ctx.getSession().put(keepvaluevo_key, name);
				ctx.getSession().remove(keepvaluevo_value);
			}
			//点击其他菜单重置
			else if(!name.equals(ctx.getSession().get(keepvaluevo_key))){
				
				ctx.getSession().put(keepvaluevo_key, name);
				ctx.getSession().remove(keepvaluevo_value);
			}
			
			
		}
		
		ctx.getSession().put(keepvaluevo_method, name);
		
		return invocation.invoke();
	}
	
	
	

}
