$(function(){
	//侧导航地址跳转
	//操作日志
	 $('#operMan').click(function () {
    	 window.location.href = 'sysMange.html';
    });
	 //用户管理
	 $('#useManger').click(function () {
    	 window.location.href = 'useManger.html';
    });
    //角色管理
    $('#roleManger').click(function () {
    	 window.location.href = 'roleManger.html';
    });
    //用户新增
	$('#newUse').click(function () {
    	 window.location = 'userAdd.html';
    });
    //新增角色
    $('#newRole').click(function () {
    	 window.location = 'roleAdd.html';
    });
    //服务器管理
    $('#SerManage').click(function () {
    	 window.location = 'SerManage.html';
    });
     //服务器添加
    $('#serAdd').click(function () {
    	 window.location = 'serAdd.html';
    });
    //遮罩层
//  $("#sver,#confirm").click(function(){
//  	$('#z_mask').show().next().show();
//  })
    //取消
//	$("#sure,#no").click(function() {
//		$("#z_mask").hide().next().hide();
//	})
//  $("#serverBtn").click(function(){
//  	
//  })
    
})