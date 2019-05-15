package com.besto.epgms.vo;

import java.util.List;

/**
 * 策略实体
 * @author <powell/滕翔>
 */
public class StrategyVO extends CommunVO{
	private static final long serialVersionUID = 1L;
	
	private int id;  //主键
	private String name;  //策略名称
	private String status;  //状态
	private String description;  //描述
	private String createdate;  //创建时间
	private String createperson;  //创建人
	private List<GroupVO> groupList;//策略分组
	private List<DownstreamVO> downstreamList;// 下游平台
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCreatedate() {
		return createdate;
	}
	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}
	public String getCreateperson() {
		return createperson;
	}
	public void setCreateperson(String createperson) {
		this.createperson = createperson;
	}
	public List<GroupVO> getGroupList() {
		return groupList;
	}
	public void setGroupList(List<GroupVO> groupList) {
		this.groupList = groupList;
	}
	public List<DownstreamVO> getDownstreamList() {
		return downstreamList;
	}
	public void setDownstreamList(List<DownstreamVO> downstreamList) {
		this.downstreamList = downstreamList;
	}
	
	
}
