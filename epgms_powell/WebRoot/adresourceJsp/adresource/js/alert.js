//取消
$('.cancel').on('click', function(){
    layer.closeAll();
});

//删除
$("#del").on('click', function(){
    $.layer({
        type: 1,   //0-4的选择,
        shade: [0.6 , '#000' , true],
        title: false,
        border: [0],
        closeBtn: [0],
        shadeClose: true,
        area: ['450px', '210px'],
        page: {
            dom:".delete"
        }
    });
});
//成功提示层
function alertSuc(){
    $.layer({
        type: 1,   //0-4的选择,
        shade: [0.6 , '#000' , true],
        title: false,
        time: 2,
        border: [0],
        closeBtn: [0],
        shadeClose: true,
        area: ['450px', '280px'],
        page: {
            dom:".alert-suc"
        }
    });
}
//失败提示层
function alertFail(){
    $.layer({
        type: 1,   //0-4的选择,
        shade: [0.6 , '#000' , true],
        title: false,
        time: 2,
        border: [0],
        closeBtn: [0],
        shadeClose: true,
        area: ['450px', '280px'],
        page: {
            dom:".alert-fail"
        }
    });
}

//保存
$('#confirm').on('click', function(){
    $.layer({
        type: 1,   //0-4的选择,
        shade: [0.6 , '#000' , true],
        title: false,
        border: [0],
        closeBtn: [0],
        shadeClose: true,
        area: ['450px', '210px'],
        page: {
            dom:".confirm"
        }
    });
});

//激活用户
$("#activate").on('click', function(){
    $.layer({
        type: 1,   //0-4的选择,
        shade: [0.6 , '#000' , true],
        title: false,
        border: [0],
        closeBtn: [0],
        shadeClose: true,
        area: ['450px', '210px'],
        page: {
            dom:".activate"
        }
    });
});
//待销用户
$("#gag").on('click', function(){
    $.layer({
        type: 1,   //0-4的选择,
        shade: [0.6 , '#000' , true],
        title: false,
        border: [0],
        closeBtn: [0],
        shadeClose: true,
        area: ['450px', '210px'],
        page: {
            dom:".gagbox"
        }
    });
});
//冻结
$("#freeze").on('click', function(){
    $.layer({
        type: 1,   //0-4的选择,
        shade: [0.6 , '#000' , true],
        title: false,
        border: [0],
        closeBtn: [0],
        shadeClose: true,
        area: ['450px', '210px'],
        page: {
            dom:".freeze"
        }
    });
});
//取消冻结
$("#cancelFreeze").on('click', function(){
    $.layer({
        type: 1,   //0-4的选择,
        shade: [0.6 , '#000' , true],
        title: false,
        border: [0],
        closeBtn: [0],
        shadeClose: true,
        area: ['450px', '210px'],
        page: {
            dom:".cancelFreeze"
        }
    });
});

function funclose(){
    layer.closeAll();
}
function setClose(){
    funclose();
    alertSuc();
}
function setClose2(){
    funclose();
    alertLoading();
}

//显示loading层
function alertLoading(){
    $.layer({
        type: 1,   //0-4的选择,
        shade: [0.6 , '#000' , true],
        title: false,
        time: 5,
        border: [0],
        closeBtn: [0],
        shadeClose: true,
        area: ['450px', '280px'],
        page: {
            dom:".alert-L"
        }
    });
}



//2015-08-03修改
//删除
var mYtr;
$(document).on('click' ,'.delN', function(){
	$('#del_cover').show();
	$('#mask').show();
	mYtr = $(this).parents('tr');
	})
	
$('#trueB').on('click' , function(){
	mYtr.remove();
	mYtr = '';
	$('#del_cover').hide();
	$('.sur_btn').show();
	setTimeout(function(){
		$('.sur_btn').hide();
		$('#mask').hide();
		} , 2000)
	})	
	
//全选功能
$('.allC').on('click' , function(){
	var aInput = $(this).parent().siblings('ul').find('input');
	if($(this).is(':checked')){
		aInput.each(function(){
			$(this).prop('checked','checked');
			})
		}else {
			aInput.each(function(){
			$(this).prop('checked','');
			})
			}
	})
	
//点击事件并且判断该组是否全选	
var iBtn = true;
$('.cArry input').on('click',function(){
	iBtn = true;	
	if($(this).is(':checked')){
		$(this).prop('checked' , true);
		}else {
			$(this).prop('checked' , false);
			}
	
	var a = $(this).parents('ul').find('input');
	a.each(function(){
		if($(this).prop('checked') == false){
			iBtn = false;
			}
		})
		
	//判断是否子复选框全部选择了	
	if(iBtn){
		var b =$(this).parents('ul').siblings('.cT').find('input');	
		b.prop('checked' , true);
		}else {
			var b =$(this).parents('ul').siblings('.cT').find('input');
			b.prop('checked' , false);
			}
	})		