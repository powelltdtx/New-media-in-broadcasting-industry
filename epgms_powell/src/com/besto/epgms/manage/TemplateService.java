package com.besto.epgms.manage;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.besto.epgms.vo.FileGuardVO;
import com.besto.epgms.vo.AreaVO;
import com.besto.epgms.vo.TemplateAreaVO;
import com.besto.epgms.vo.TempletGroupVO;
import com.besto.epgms.vo.TempletVO;


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
public interface TemplateService {
	
	
	/**
	 * 
	* FunName:        add
	* Description :   添加模板
	*                     
	* @param:   @param vo
	* @param:   @return   
	* @return:	String  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-12-25>
	 */
	public String add(TempletVO vo);
	
	/**
	 * 
	* FunName:        ExecCmdRequest
	* Description :   模板下发
	*                     
	* @param:   templetVO_id 模板id
	* @param:	group_ids	分组id数组   
	* @return:	void  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-12-25>
	 */
	public void ExecCmdRequest (String templetVO_id,String[] group_ids,String downUrl) throws Exception;
	
	/**
	 * 
	 * FunName: ExecCmdRequestToPreview Description : 模板下发到华为/中兴预览服务器
	 * 
	 * @param: templetVO_id 模板id
	 * @return: void
	 * @throws
	 */
	public void ExecCmdRequestToPreview(String templetVO_id,String downUrl) throws Exception;
	
	/**
	 * 
	* FunName:        search
	* Description :   获取模板
	*                     
	* @param vo
	* @return List<TempletVO>
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2016-1-22>
	 */
	public List<TempletVO> search (TempletVO vo) throws Exception;
	
	/**
	 * 
	* FunName:        getDetailById
	* Description :   获取模板详细
	*                     
	* @param vo
	* @return TempletVO
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2016-1-22>
	 */
	public TempletVO getDetailById (TempletVO vo) throws Exception;
	
	/**
	 * 
	* FunName:        getTempletGroupByIds
	* Description :   获取模板分组详细
	*                     
	* @param vo
	* @return List<TempletVO>
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2016-1-22>
	 */
	public List<TempletVO> getTempletGroupByIds (TempletVO vo) throws Exception;

	
	/**
	 * 
	* FunName:        releaseSubmit
	* Description :   提交发布服务
	*                     
	* @param  vo
	* @return String
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2016-1-22>
	 */
	@Transactional
	public String releaseSubmit (TempletVO vo) throws Exception;



	
	/**
	 * 
	* FunName:        preReleaseSubmit
	* Description :   预览分组下发模板
	*                     
	* @param: templetVO
	* @param: groupIds
	* @param:
	* @return:	String
	* @throws    Exception
	* @Author:   <powell/滕翔>  
	* @Create Date:<2016-01-28>
	 */
	public String preReleaseSubmit(TempletVO templetVO, String[] groupIds) throws Exception;

	/**
	 * 
	* FunName:        updateTempletInfo
	* Description :   更新模板信息
	*                     
	* @param: 
	* @param:
	* @param:
	* @return:	String  
	* @throws Exception 
	* @throws    Exception
	* @Author:   <powell/滕翔>  
	* @Create Date:<2016-01-28>
	 */
	public String updateTempletInfo(TempletVO templetVO) throws Exception;

	/**
	 * 
	* FunName:        addTempletInfo
	* Description :   新增模板信息
	*                     
	* @param:   templetVO
	* @param:
	* @param:
	* @return:	String  
	* @throws    Exception
	* @Author:   <powell/滕翔>  
	* @Create Date:<2016-01-28>
	 */
	public String addTempletInfo(TempletVO templetVO) throws Exception;
	
	/**
	 * 生成指定文件的加密字符
	 * @param filePath
	 * @return  Map<String,String>键:文件名,值:md5加密后的文件HashCode
	 */
	public Map<String,FileGuardVO> createFileCode(String filePath);

	/**
	 * 将文件的Md5加密值存入数据库(epgms_guard)
	 * @param fileCodeMap
	 */
	public void addFileSM4Code(Map<String, FileGuardVO> fileCodeMap);

	/**
	 * 将附属文件打包(.tar)
	 * @param md5FilePath
	 */
	public void createFile2Tar(String SM4FilePath);

	/**
	 * 将附属文件上传ftp
	 * @param ftppathString
	 * @throws Exception 
	 */
	public void uploadFtp(String ftppath,String SM4TarPath) throws Exception;
	
	/**
	 * 新增模板服务
	 */
	public void templateAdd(String tarName);
	

	/**
	 * 给模板添加分组信息
	 * @return
	 */
	public String addGroupService(TempletGroupVO groupVO,String groupIds);

	public String addAreaService(TemplateAreaVO templateAreaVO, String areaIds);

	public TempletVO searchTemplateById(TempletVO templetVO);
	
	/**
	 * 创建附属文件并打包服务
	 */
	public void createCheckFileService(String mark);

	/**
	 * 查询模板&服务器列表
	 * @param templetVO
	 * @return
	 */
	public List<TempletVO> searchTemplateServer(TempletVO templetVO);
	/**
	 * 更新模板状态
	 * @param templetVO
	 * @return
	 */
	public void updateTempletstatus(TempletVO templetVO) throws Exception;
	
	//修改模板表的专题模板审核状态
	public void updateTempletTopicStatus(TempletVO templetVO) throws Exception;

	
}
