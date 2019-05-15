package com.besto.epgms.vo;

public class ResultVO extends CommunVO{
	private String code;
	private String reeatetime;
	private String deleteflag;
	private String description;
	private String edittime;
	private String fileurl;
	private String id;
	private String name;
	private String platform;
	private String parentName;
	private String createtime;
	private String parentcode;
	private String parentid;
	private String parent_id;
	private String level;
	
	
	private String pictype;
	private String primaryid;
	private String providerid;
	private String sequence;
	private String status;    // cms内容接口返回的节目状态
	private String channelName;
	private String seriesflag;
	private String playurl;
	private String basecategory;  // 节目所属分类
	private String category_id;
	private String title;   // 新闻内容查询接口
	
	private String duration; // 节目单时长
	private String programName;  // 节目单名称
	private String startDate;  // 节目单开始日期
	private String startTime;  // 节目单开始时间
	private String state;     //  节目单状态
	private String channelid; // 判断id
	
	private String htmPath;   // 新闻模板地址
	private String curPid;
    private String nextPid;
    private String nextp;
    private String channelnumber ;
    private String pictureId;
    private String lastPid;
    private String lastp;
    private String fielUrl;
    
   //20150813
    private String enterimg;		//入口图片地址
    private String titleimg;		//标题图片地址
    
    private String guest;			// D1（标清）   1080i（高清）
    
    private String categoryName;
	private String domainSrcUrl;//源图片域名
	private String domainUrl;//图片域名
	private String parentsnames;
	
	public String getParentsnames() {
		return parentsnames;
	}
	public void setParentsnames(String parentsnames) {
		this.parentsnames = parentsnames;
	}
	public String getDomainSrcUrl() {
		return domainSrcUrl;
	}
	public void setDomainSrcUrl(String domainSrcUrl) {
		this.domainSrcUrl = domainSrcUrl;
	}
	public String getDomainUrl() {
		return domainUrl;
	}
	public void setDomainUrl(String domainUrl) {
		this.domainUrl = domainUrl;
	}
	public String getGuest() {
		return guest;
	}
	public void setGuest(String guest) {
		this.guest = guest;
	}
	public String getEnterimg() {
		return enterimg;
	}
	public void setEnterimg(String enterimg) {
		this.enterimg = enterimg;
	}
	public String getTitleimg() {
		return titleimg;
	}
	public void setTitleimg(String titleimg) {
		this.titleimg = titleimg;
	}
	public String getFielUrl() {
		return fielUrl;
	}
	public void setFielUrl(String fielUrl) {
		this.fielUrl = fielUrl;
	}
	public String getLastPid() {
		return lastPid;
	}
	public void setLastPid(String lastPid) {
		this.lastPid = lastPid;
	}
	public String getLastp() {
		return lastp;
	}
	public void setLastp(String lastp) {
		this.lastp = lastp;
	}
	public String getPictureId() {
		return pictureId;
	}
	public void setPictureId(String pictureId) {
		this.pictureId = pictureId;
	}
	public String getChannelnumber() {
		return channelnumber;
	}
	public void setChannelnumber(String channelnumber) {
		this.channelnumber = channelnumber;
	}
	public String getNextp() {
		return nextp;
	}
	public void setNextp(String nextp) {
		this.nextp = nextp;
	}
	public String getNextPid() {
		return nextPid;
	}
	public void setNextPid(String nextPid) {
		this.nextPid = nextPid;
	}
	public String getCurPid() {
		return curPid;
	}
	public void setCurPid(String curPid) {
		this.curPid = curPid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getPlayurl() {
		return playurl;
	}
	public void setPlayurl(String playurl) {
		this.playurl = playurl;
	}
	public String getChannelName() {
		return channelName;
	}
	public void setChannelName(String channelName) {
		this.channelName = channelName;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getReeatetime() {
		return reeatetime;
	}
	public void setReeatetime(String reeatetime) {
		this.reeatetime = reeatetime;
	}
	public String getDeleteflag() {
		return deleteflag;
	}
	public void setDeleteflag(String deleteflag) {
		this.deleteflag = deleteflag;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getEdittime() {
		return edittime;
	}
	public void setEdittime(String edittime) {
		this.edittime = edittime;
	}
	public String getFileurl() {
		return fileurl;
	}
	public void setFileurl(String fileurl) {
		this.fileurl = fileurl;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getParentName() {
		return parentName;
	}
	public void setParentName(String parentName) {
		this.parentName = parentName;
	}
	public String getCreatetime() {
		return createtime;
	}
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	public String getParentcode() {
		return parentcode;
	}
	public void setParentcode(String parentcode) {
		this.parentcode = parentcode;
	}
	public String getParentid() {
		return parentid;
	}
	public void setParentid(String parentid) {
		this.parentid = parentid;
	}
	public String getPictype() {
		return pictype;
	}
	public void setPictype(String pictype) {
		this.pictype = pictype;
	}
	public String getPrimaryid() {
		return primaryid;
	}
	public void setPrimaryid(String primaryid) {
		this.primaryid = primaryid;
	}
	public String getProviderid() {
		return providerid;
	}
	public void setProviderid(String providerid) {
		this.providerid = providerid;
	}
	public String getSequence() {
		return sequence;
	}
	public void setSequence(String sequence) {
		this.sequence = sequence;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getSeriesflag() {
		return seriesflag;
	}
	public void setSeriesflag(String seriesflag) {
		this.seriesflag = seriesflag;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public String getProgramName() {
		return programName;
	}
	public void setProgramName(String programName) {
		this.programName = programName;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getBasecategory() {
		return basecategory;
	}
	public void setBasecategory(String basecategory) {
		this.basecategory = basecategory;
	}
	public String getChannelid() {
		return channelid;
	}
	public void setChannelid(String channelid) {
		this.channelid = channelid;
	}
	public String getHtmPath() {
		return htmPath;
	}
	public void setHtmPath(String htmPath) {
		this.htmPath = htmPath;
	}
	public String getPlatform() {
		return platform;
	}
	public void setPlatform(String platform) {
		this.platform = platform;
	}
	public String getParent_id() {
		return parent_id;
	}
	public void setParent_id(String parent_id) {
		this.parent_id = parent_id;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getCategory_id() {
		return category_id;
	}
	public void setCategory_id(String category_id) {
		this.category_id = category_id;
	}
}
