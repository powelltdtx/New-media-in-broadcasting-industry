$(function(){
	//左侧收起打开
	var $toggle = $(".leftm-toggle");
	var $left = $(".left");
	$toggle.find("span").click(function(){
		if($left.hasClass("min")){
			$left.removeClass("min");
			$(".right").css({margin:"0 0 0 382px"})
		}else{
			$left.addClass("min");
			$(".right").css({margin:"0 0 0 242px"})
		}
	})
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