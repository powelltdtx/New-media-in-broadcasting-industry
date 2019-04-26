package com.besto.epgms.mapper;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.besto.epgms.vo.TempletGroupStreamVO;
import com.besto.epgms.vo.TempletVO;
@Repository("templetMapper")
@Lazy
public interface TempletMapper {

	/**
	 * 
	* FunName:        add
	* Description :   TODO
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	int  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-12-25>
	 */
	public int add(TempletVO vo)throws Exception;
	
	
	/**
	 * 
	* FunName:        get
	* Description :   获取模板
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	TempletVO  
	* @throws                  
	* @Author:   <powell/滕翔> 
	* @Create Date:<2015-12-27>
	 */
	public TempletVO get(TempletVO vo)throws Exception;
	
	/**
	 * 
	* FunName:        searchPage
	* Description :   获取模板
	*                     
	* @param vo
	* @return List<TempletVO>
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-1-22>
	 */
	public List<TempletVO> searchPage(TempletVO vo)throws Exception;
	
	/**
	 * 
	* FunName:        getTempletById
	* Description :   根据ID查询模板
	*                     
	* @param  vo
	* @return TempletVO
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-1-22>
	 */
	public TempletVO getTempletById(TempletVO vo) throws Exception;
	
	/**
	 * 
	* FunName:        searchTempletGroupDownstreamBytempletId
	* Description :   模板分组平台查询（只是有效且下发分组）
	*                     
	* @param vo
	* @return List<TemplepGroupStreamVO>
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-1-22>
	 */
	public List<TempletGroupStreamVO> searchTempletGroupDownstreamBytempletId(TempletVO vo)throws Exception;
	
	
	/**
	 * 
	* FunName:        searchGroupByIds
	* Description :   模板分组平台查询（只是有效且下发分组）
	*                     
	* @param vo
	* @return List<TempletVO>
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-1-22>
	 */
	public List<TempletVO> searchGroupByIds(TempletVO vo)throws Exception;
	
	
	/**
	 * 
	* FunName:        updateTemplet
	* Description :   模板表更新
	*                     
	* @param  vo
	* @return int
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-1-22>
	 */
	public int updateTemplet(TempletVO vo) throws Exception;
	
	/**
	 * 
	* FunName:        updateTempletstatus
	* Description :   模板状态表更新
	*                     
	* @param  vo
	* @return int
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>
	* @Create Date:<2015-1-22>
	 */
	public int updateTempletstatus(TempletVO vo) throws Exception;
	
	/**
	 * 
	* FunName:        addTempletStatus
	* Description :   模板状态表增加
	*                     
	* @param  vo
	* @return int
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-1-22>
	 */
	public int addTempletStatus(TempletVO vo) throws Exception;


	public TempletVO searchTemplateById(TempletVO templetVO);


}
