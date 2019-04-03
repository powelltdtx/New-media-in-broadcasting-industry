$(function(){
	//js容错代码
	window.onerror=function(){return true;} 

	//树状导航
	$("#column").treeview({
		toggle: function() {
			console.log("%s was toggled.", $(this).find(">span").text());
		},
		collapsed: true
	});

	//所属分类
	$("#selectType").treeview({
		toggle: function() {
			console.log("%s was toggled.", $(this).find(">span").text());
		}
	});
})