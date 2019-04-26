package com.besto.epgms.mapper;

import java.util.List;
import com.besto.epgms.vo.TempletHistoryVO;

public interface TempletHistoryMapper {


	
	/**
	 * 
	* FunName:        searchPage
	* Description :   分页查询
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	List<CPInfo>  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-12-16>
	 */
	public List<TempletHistoryVO> searchPage(TempletHistoryVO vo) throws Exception;
	
	/**
	 * 
	* FunName:        searchById
	* Description :   查询
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	SPInfoVO  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-12-16>
	 */
	public TempletHistoryVO searchById(TempletHistoryVO vo) throws Exception;
	
	
	/**
	 * 
	* FunName:        save
	* Description :   保存TempletHistoryVO信息
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	int  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-12-16>
	 */
	public int save(TempletHistoryVO vo)throws Exception;
	
	
	/**
	 * 
	* FunName:        update
	* Description :   修改TempletHistoryVO信息
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	int  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-12-16>
	 */
	public int update(TempletHistoryVO vo)throws Exception;
	
}
