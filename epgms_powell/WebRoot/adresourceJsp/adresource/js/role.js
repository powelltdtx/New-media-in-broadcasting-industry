// JavaScript Document
$(function(){
	//初始化提交按钮
	$('#confirmx').removeClass('blue-btn');
	$('#confirmx').css('cursor','default');
	$('#confirmx').attr('disabled','disabled');
	var iKey = false;
	
	//判断按钮是否为可点击状态
	$('.bt').blur(function(){
		$('.bt').each(function(i,elem){
			
			if($(this).val() == ''){
				iKey = false;
				return false;
				}else {
					iKey = true;
					}
			})	
		if(iKey && ($('#Op').val() == $('#Tp').val())){
			$('#confirmx').removeAttr('disabled');
			$('#confirmx').addClass('blue-btn');
			$('#confirmx').css('cursor','pointer');
		}else {
			$('#confirmx').removeClass('blue-btn');
			$('#confirmx').css('cursor','default');
			$('#confirmx').attr('disabled','disabled');
			}		
	})
	
	
	//判断2次密码是否一致	
	var re = /[0-9]{11}/;
	$('.mobileH').blur(function(){
			if(re.test($('.mobileH').val())){
		}else {
			alert('您输入的电话号码有误');
			}
		})
	$('#Tp').blur(function(){
		if($('#Op').val() !== $('#Tp').val()){
			$('#Tp').next('p').show();
		}else {
			$('#Tp').next('p').hide();
			}	
		})	
			
	//判断用户名和密码是否符合要求
	var re2 = /^\w{0,20}$/;
	$('#userName').blur(function(){
		if(re2.test($(this).val())){
			}else {
				alert('输入格式有误,请重新输入！');
				$('#userName').val('');
				}		
		})
		
		$('#Op').blur(function(){
		if(re2.test($(this).val())){
			}else {
				alert('输入格式有误,请重新输入！');
				$('#Op').val('');
				}		
		})	
	
	//点击保存事件
	$('#confirmx').click(function(){
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
		
		})
	
	})