package com.besto.epgms.websinterface;

import java.util.List;
import java.util.Map;

import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

import com.besto.epgms.vo.HashVO;


/**
 * 
*Project:  < epgms>      
* Comments:  <描述>         
* JDK version used:<JDK1.6>
* Namespace:  TemplateSyncCmdRequestService
* Author:   <powell/滕翔>
* Create Date: <2015-12-24>  
* Version:  <1.0>
 */

@WebService
@SOAPBinding(style = Style.RPC)
public interface GuardForCxfService {
	
	
	/**
	 * 
	* FunName:        add
	* Description :   更新hash值
	*                     
	* @param:   @param vo
	* @param:   @return   
	* @return:	String  
	* @throws                  
	* @Author:   <auther/刘杨>  
	* @Create Date:<2017-03-08>
	 */
//	public String add(HashVO vo);
	
	/**
	 * 
	* FunName:        add
	* Description :   查询hash值
	*                     
	* @param:   @param vo
	* @param:   @return   
	* @return:	String  
	* @throws                  
	* @Author:   <auther/刘杨>  
	* @Create Date:<2017-03-08>
	 */
//	public String search(HashVO vo);
	
	/**
	 * 
	* FunName:        add
	* Description :   删除hash值
	*                     
	* @param:   @param vo
	* @param:   @return   
	* @return:	String  
	* @throws                  
	* @Author:   <auther/刘杨>  
	* @Create Date:<2017-03-08>
	 */
//	public String delete(HashVO vo);

	
//	public String getFileMd5(Map map);
	
//	public String tamperNotice(String filePath,String platForm,String ip,String tamperMode,String tamperTime,String handleMode,String handleResult,String serverName);
	
	/**
	 * 将Json形式的多个模板篡改信息,统一存入数据库
	 * @param str
	 * @return
	 */
	public String tamperNoticeByJson(String str);
	
	public String testMethod(String s);
//	public List<GuardVO> search(GuardVO vo);
//	
//	public int getFilePathCount(Map map);

}
