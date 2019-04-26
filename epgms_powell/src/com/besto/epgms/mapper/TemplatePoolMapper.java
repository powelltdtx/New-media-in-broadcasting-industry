package com.besto.epgms.mapper;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.besto.epgms.vo.PicVO;
import com.besto.epgms.vo.PoolPicVO;
import com.besto.epgms.vo.PoolVO;


@Repository("templatePoolMapper")
@Lazy
public interface TemplatePoolMapper {
	/**
	 * 保存模板到模板库
	 * @param vo
	 * @return
	 */
	public Long savePool(PoolVO vo);
	
	/**
	 * 保存缩略图图片
	 * @param vo
	 * @return
	 */
	public Long savePic(PicVO vo);
	
	/**
	 * 保存模板库的模板id 和 缩略图id 到epgms_pool_pic表
	 * @param vo
	 * @return
	 */
	public Long saveEpgms_Pool_Pic(PoolPicVO vo);

	/**
	 * 分页查询模板库列表
	 * @param PoolVO
	 * @return
	 */
	public List<PoolVO> searchPage(PoolVO vo);

	/**
	 * 根据poolId查询poolVO
	 * @param poolVO
	 * @return
	 */
	public PoolVO searchPoolById(PoolVO vo) throws Exception;
	/**
	 * 根据poolId查询PicVO
	 * @param PoolVO
	 * @return
	 */
	public PicVO searchPicByPoolId(PoolVO poolVO);
	/**
	 * 根据poolId更新epgms_pool信息
	 * @param PoolVO
	 * @return
	 */
	public int updatePoolById(PoolVO poolVO);

}
