package com.besto.epgms.vo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


public class BaseClass implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private int time = 0;
	
	private HashMap<Object, Object> monitorMap = new HashMap<Object, Object>();
	
	private List<GuardVO> guardNoticeList = new ArrayList<GuardVO>();
	
	
	public List<GuardVO> getGuardNoticeList() {
		return guardNoticeList;
	}

	public void setGuardNoticeList(List<GuardVO> guardNoticeList) {
		this.guardNoticeList = guardNoticeList;
	}

	public HashMap<Object, Object> getMonitorMap() {
		return monitorMap;
	}

	public void setMonitorMap(HashMap<Object, Object> monitorMap) {
		this.monitorMap = monitorMap;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	
	
}
