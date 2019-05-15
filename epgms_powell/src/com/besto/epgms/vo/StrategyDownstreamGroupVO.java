package com.besto.epgms.vo;


/**
 * 策略实体
 * @author <powell/滕翔>
 */
public class StrategyDownstreamGroupVO extends CommunVO{
	private static final long serialVersionUID = 1L;
	
	private int strategy_id; //策略ID
	private String strategy_name; //策略名称
	private int group_id; //分组ID
	private String group_name; //分组名称
	private int downStream_id; //下游平台ID
	private String downStream_name; //下游平台名称
	private String groupIds; //分组ID
	private String groupNames; //名称
	private String[] groupListIds; //分组ID
	
	private String addGroupResult;//添加分组结果
	
	

	public String getAddGroupResult() {
		return addGroupResult;
	}
	public void setAddGroupResult(String addGroupResult) {
		this.addGroupResult = addGroupResult;
	}
	public int getGroup_id() {
		return group_id;
	}
	public void setGroup_id(int groupId) {
		group_id = groupId;
	}
	public String getGroup_name() {
		return group_name;
	}
	public void setGroup_name(String groupName) {
		group_name = groupName;
	}
	public int getDownStream_id() {
		return downStream_id;
	}
	public void setDownStream_id(int downStreamId) {
		downStream_id = downStreamId;
	}
	public String getDownStream_name() {
		return downStream_name;
	}
	public void setDownStream_name(String downStreamName) {
		downStream_name = downStreamName;
	}
	public int getStrategy_id() {
		return strategy_id;
	}
	public void setStrategy_id(int strategyId) {
		strategy_id = strategyId;
	}
	public String getStrategy_name() {
		return strategy_name;
	}
	public void setStrategy_name(String strategyName) {
		strategy_name = strategyName;
	}
	public String getGroupIds() {
		return groupIds;
	}
	public void setGroupIds(String groupIds) {
		this.groupIds = groupIds;
	}
	public String getGroupNames() {
		return groupNames;
	}
	public void setGroupNames(String groupNames) {
		this.groupNames = groupNames;
	}
	public String[] getGroupListIds() {
		return groupListIds;
	}
	public void setGroupListIds(String[] groupListIds) {
		this.groupListIds = groupListIds;
	}
	
	
	
}
