$(function() {
	//选择
	$("#selectId").click(function() {
		$("#z_mask").show().next().show();
	})
	//取消
	$("#j_hideFormAdd").click(function() {
		$("#z_mask").hide().next().hide();
	})
	//添加数据
	$("#j_btnAdd").on("click", function() {
		      
		      var a=$("#preTbody input");
		      
             $("#j_hideFormAdd").click();
	})
	
	//返回
	$("#close").click(function(){
//		window.location="newpages/createTemplate.jsp";
		window.location="templet_search.do";
	})
//	//模板审核跳转
	$("#tempView").click(function(){
//		window.location="newpages/createTemplate.jsp";
		window.location="templet_search.do";
	})
	
})
