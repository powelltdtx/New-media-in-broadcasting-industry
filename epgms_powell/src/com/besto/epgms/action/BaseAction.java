package com.besto.epgms.action;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.ResourceBundle;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.RequestAware;
import org.apache.struts2.interceptor.SessionAware;
import com.besto.epgms.vo.CommunVO;
import com.besto.util.FtpUtil;
import com.besto.util.ReadProperties;
import com.besto.util.SecurityTools;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;


/*
 * 
 *@ClassName: BaseAction 
 *@Description: TODO(所有action的父类) 
 *@author powell/滕翔   
 *@date 2019年3月12日 下午3:16:05
 *
 */
public class BaseAction extends ActionSupport implements RequestAware, SessionAware{
	private static Logger logger = Logger.getLogger(BaseAction.class);
	private static final long serialVersionUID = 1L;
	private Map<String, Object> request;
	private Map<String, Object> session;
	private String result;	/**json返回结果*/
	Properties prop ;
	// 接受依赖注入的属性（保存路径）
    private String savePath;
	int count = 0;			/**数据总数初始化  默认0*/
	int pid = 1;			/**当前页数  	默认1*/
	int pagecount = 10;		/**每页显示数量  	默认10条*/
	int pages=0;           /**总页数   默认0*/
	/**
     * 初始化分页值
     *@param entityName 分页实体
     *
     *@param clz 分页实体对应类
     *
     *@return 分页对象
     */
	@SuppressWarnings("unchecked")
	public Object initPageValue(Object entityName,Class clz){
		if (entityName != null) {					//对象不为空
			CommunVO commnumvo=(CommunVO)entityName;
			pid = commnumvo.getPageid();			//获取当前页
			pagecount = commnumvo.getPagecount();   //获取分页值
			return entityName;
		} else {									//对象为空
			CommunVO  comvon = null;
			try{
				comvon=(CommunVO)clz.newInstance();	//新建对象
			}catch(Exception e){
				logger.error("initPageValue 错误:"+e.getMessage());
			}
			comvon.setPageid(pid);					 //设置当前页
			comvon.setPagecount(pagecount);			 //设置每页显示数
			return comvon;							 
		}	
	}
	public Object initPageValueAndKeepValue(Object entityName,Class clz) throws Exception{
		String keepvaluevo_value="kvVO_value";
		String keepvaluevo_changed="kvVO_changed";
		CommunVO  keepVO =(CommunVO)clz.newInstance();
		if(getSession().containsKey(keepvaluevo_value)){
			keepVO=(CommunVO)getSession().get(keepvaluevo_value);
			if("1".equals(getSession().get(keepvaluevo_changed))){ 
				entityName=(CommunVO)initPageValue(keepVO, clz);
			}else{
				entityName=(CommunVO)initPageValue(entityName,clz);
			}
		}else{
			entityName=(CommunVO)initPageValue(entityName,clz);
		}
		session.put(keepvaluevo_value, entityName);
		return entityName;
	}
	/**
	* 
	* FunName:        setPageValues
	* Description :   绑定分页值              
	* @param:   @param entityName   
	* @return:	void  
	* @throws                  
	* @Author:   <auther/滕翔>  
	* @Create Date:<2016-1-15>
	 */
	public Object setPageValues(Object entityName){
		CommunVO commnumvo=(CommunVO)entityName;
		setPages((commnumvo.getCount()+commnumvo.getPagecount()-1)/commnumvo.getPagecount());
		setCount(commnumvo.getCount());
		return entityName;
	}
	/**
	 * 分页计算
	 *@param entityName 分页实体
	 *@return 分页对象
	 */
	public Object pageCalculate(Object entityName){
		CommunVO commnumvo=(CommunVO)entityName;
		pages = count / pagecount;
		if (count % pagecount > 0) {
			pages++;
		}
		/**不足一页时+1*/
		if (pages == 0) {
			pages++;
		}
		if (pid >= pages && pages > 0) {
			pid = pages;
			commnumvo.setPageid(pid);
		}
		/**当前页小于1时当前页为1*/
		if (pid <= 0) {
			pid = 1;
		}
		return entityName;
	}
	/**
	 * 分页结果值绑定
	 * @param bindResultName  绑定名称
	 * @param obj  			     绑定结果集
	 */
	public void pageBindValue(String bindResultName,Object obj){
		this.getRequest().put("prepid", String.valueOf(pid - 1));	//上一页
		this.getRequest().put("nextpid", String.valueOf(pid + 1));	//下一页
		this.getRequest().put("pages", String.valueOf(pages));		//一共多少页
		this.getRequest().put("pid", String.valueOf(pid));			//当前页
		this.getRequest().put("count", String.valueOf(count));		//共多少条
		this.getRequest().put("pagecount", pagecount);				//每页显示几条
		this.getRequest().put(bindResultName, obj);				   //结果集合
		this.getRequest().put("sizelist", getPageSizeMap());		//页数下拉列表
	}
	public void clearFlag(Object entityName){
	}
	/**
	* FunName:        pageBindValue
	* Description :   分页结果值绑定
	* @param entityName
	* @param bindResultName
	* @param obj   
	* @return	void  
	* @throws                  
	* @Author:   <auther/滕翔>  
	* @Create Date:<2016-1-15>
	 */
	public void pageBindValue(Object entityName,String bindResultName,Object obj){
		this.setPageValues(entityName);
		this.pageBindValue(bindResultName, obj);
		this.clearFlag(entityName);
	}
	/**
	 * 页面返回方法
	 * @param info
	 * @return String
	 */
	public String jsnt(String info) {
		String flag = "1";
		HttpServletResponse response = (HttpServletResponse) ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_RESPONSE);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		try {
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(info);
		} catch (IOException e) {
			flag = "2";
			e.printStackTrace();
		}
		return flag;
	}
	public boolean checkCode(String KEY , String time , String riddle){
		String key = new SecurityTools().encrypt(KEY+time);
		if(key.equals(riddle)){
			return true;
		}else{
			return false;
		}
	}
	 /**
     * 将本地文件上传到ftp上
     * @author ella
     * 2014-12-30
     * @throws Exception
     */
	@SuppressWarnings("deprecation")
	public  void  uploadFtp() throws Exception{
		HttpServletRequest request = ServletActionContext.getRequest(); 
		String	path = this.getClass().getClassLoader().getResource(
				"ftp.properties").toURI().getPath();
		prop = ReadProperties.readProperties(path);
		/**创建FTP链接*/
		FtpUtil ftp = new FtpUtil(prop.getProperty("ftp.ip"), Integer.parseInt(prop.getProperty("ftp.port")), prop.getProperty("ftp.username"), prop.getProperty("ftp.password"));
		/**复制文件夹到ftp上*/
		ftp.uploadAll(request.getRealPath("/")+getSavePath(), prop.getProperty("ftp.url"),getSavePath());
		logger.debug("ftp链接成功！");
	}
	 /**
     * 将本地文件上传到ftp上(多文件)
     * @param node		ftp服务器二级节点
     * @param urlList	本地文件路径list
     * @author <auther/滕翔> 
     * 2016-01-18
     * @throws Exception
     */
	@SuppressWarnings("deprecation")
	public  void  uploadFtp(String node, List<String> urlList) throws Exception{
		HttpServletRequest request = ServletActionContext.getRequest(); 
		String	path = this.getClass().getClassLoader().getResource("ftp.properties").toURI().getPath();
		prop = ReadProperties.readProperties(path);
		/**创建FTP链接*/
		FtpUtil ftp = new FtpUtil(prop.getProperty("ftp.ip"), Integer.parseInt(prop.getProperty("ftp.port")), prop.getProperty("ftp.username"), prop.getProperty("ftp.password"));
		ftp.uploadFiles(prop.getProperty("ftp.url")+node+"/", urlList,request.getRealPath("/"));
		logger.debug("ftp链接成功！");
	}
	/**
     * 将本地文件上传到ftp上
     * @param node		ftp服务器节点
     * @param urlList	本地文件路径list
     * @author <auther/滕翔> 
     * 2016-01-18
     * @throws Exception
     */
	@SuppressWarnings("deprecation")
	public  void  uploadFtp(String node,String  url) throws Exception{
		HttpServletRequest request = ServletActionContext.getRequest(); 
		String	path = this.getClass().getClassLoader().getResource("ftp.properties").toURI().getPath();
		System.out.println(path);
		prop = ReadProperties.readProperties(path);
		/**创建FTP链接*/
		FtpUtil ftp = new FtpUtil(prop.getProperty("ftp.ip"), Integer.parseInt(prop.getProperty("ftp.port")), prop.getProperty("ftp.username"), prop.getProperty("ftp.password"));
		ftp.uploadFiles("/"+node+"/", url,request.getRealPath("/"));
		logger.debug("ftp链接成功！");
	}
	/**
	 * 
	* FunName:        getPageSizeMap
	* Description :   获取页面可选条数数据
	* @return:	Map<String,String>  
	* @Author:   <auther/滕翔>  
	* @Create Date:<2016-1-8>
	 */
	private Map<String, String> getPageSizeMap(){
		Map<String, String> map = new LinkedHashMap<String, String>();
		ResourceBundle rb = ResourceBundle.getBundle("common");
		String value = rb.getString("page_size");
		String[] values = value.split(",");
		for(int i = 0; i < values.length; i++){
			map.put(values[i],String.format("%s条",values[i]));
		}
		return map;
	}
	/**
	 * 
	* FunName:        transList
	* Description :   获取common中 对应的value值(数组)
	*                     
	* @param:   @param key
	* @param:   @return   
	* @return:	Map<String,String>  
	* @throws                  
	* @Author:   <auther/滕翔>  
	* @Create Date:<2016-1-22>
	 */
	public Map<String, String> transList(String key){
		Map<String, String> map = new LinkedHashMap<String, String>();
		ResourceBundle rb = ResourceBundle.getBundle("common");
		String value = rb.getString(key);
		String[] values = value.split(",");
		for(int i = 0; i < values.length; i++){
			String[] val = values[i].split(":");
			map.put(val[0], val[1]);
		}
		return map;
	}
	/**
	 * 
	* FunName:        transValue
	* Description :   获取common中 对应的value值(字符串)
	* @param:   @param key
	* @param:   @return   
	* @return:	String  
	* @throws                  
	* @Author:   <auther/滕翔>  
	* @Create Date:<2017-1-22>
	 */
	public String transValue(String key){
		ResourceBundle rb = ResourceBundle.getBundle("common");
		return rb.getString(key);
	}
	/**
	* 
	* FunName:        getFTPRoot
	* Description :   获取ftp跟路径
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	String  
	* @throws                  
	* @Author:   <auther/滕翔>  
	* @Create Date:<2016-1-22>
	 */
	public String getFTPRoot() throws Exception{
		String path = this.getClass().getClassLoader().getResource("ftp.properties").toURI().getPath();
		Properties prop = ReadProperties.readProperties(path);
		return prop.getProperty("ftp.root");
	}
	public void setSession(Map<String, Object> session) {
		this.session = session;
	}
	public void setRequest(Map<String, Object> request) {
		this.request = request;
	}
	public Map<String, Object> getRequest() {
		return request;
	}
	public Map<String, Object> getSession() {
		return session;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public int getPagecount() {
		return pagecount;
	}
	public void setPagecount(int pagecount) {
		this.pagecount = pagecount;
	}
    public int getPages() {
		return pages;
	}
	public void setPages(int pages) {
		this.pages = pages;
	}
	public String getSavePath() {
		return savePath;
	}
	public void setSavePath(String savePath) {
		this.savePath = savePath;
	}
	public Properties getProp() {
		return prop;
	}
	public void setProp(Properties prop) {
		this.prop = prop;
	}
}
