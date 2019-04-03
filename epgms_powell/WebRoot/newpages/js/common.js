$(document).ready(
		function() {
			addTitle();
			getNode();
			// 导航栏及data区高度
			var navbarHeight = $(document).height();
			$('.navbar-left').height(navbarHeight - 49);
			// header nav导航栏a 标签样式
			$(".header_nav a").click(function() {
				$(this).addClass('headerCur');
				$(this).siblings().removeClass('headerCur');
			});
			$('.th_checkbox').click(function() {
				// console.log($('.th_checkbox').is(':checked'));
				// var len = $('.tbody_checkbox').length;
				// console.log(len);
				// for(var i=0;i<len;i++) {
				// if ($('.th_checkbox').is(':checked')) {
				// $('.tbody_checkbox :checkbox').eq(i).attr('checked', true);
				// } else {
				// $('.tbody_checkbox :checkbox').eq(i).attr('checked', false);
				// }
				// }
				if ($('.th_checkbox').is(':checked')) {
					$('.tbody_checkbox').each(function() {
						$(this).attr('checked', true);
					})
				} else {
					$('.tbody_checkbox').each(function() {
						$(this).attr('checked', false);
					})
				}
			});
			// 选中的按钮
			// $('.tbody_checkbox').click(function () {
			// var len = $('.tbody_checkbox').length;
			// var flag = 1;
			// for(var i=0;i<len;i++){
			// console.log($('.tbody_checkbox').eq(i).is(':checked'));
			// if($('.tbody_checkbox').eq(i).is(':checked')){
			// flag *= 1;
			// }else{
			// flag *= 0;
			// }
			// }
			// if(flag == 1){
			// $('.th_checkbox').attr('checked',true);
			// }else{
			// $('.th_checkbox').attr('checked',false);
			// }
			// });
			function addTitle() {
				var len2 = $('tbody tr').find('td:nth-child(2)').length;
				for (var i = 0; i < len2; i++) {
					var tb_text = $('tbody tr').find('td:nth-child(2)').eq(i)
							.find('span').html();
					$('tbody tr').find('td:nth-child(2)').eq(i).find('span')
							.attr('title', tb_text);
				}
				var len3 = $('tbody tr').find('td:nth-child(3)').length;
				for (var i = 0; i < len3; i++) {
					var tb_text = $('tbody tr').find('td:nth-child(3)').eq(i)
							.find('span').html();
					$('tbody tr').find('td:nth-child(3)').eq(i).find('span')
							.attr('title', tb_text);
				}
			}
			// header导航栏
			function getNode() {
				var div = $(".col-md-3 a");
				for (var i = 0; i < div.length; i++) {
					$(div[i]).css({
					// "color":"#333",
					// "border-bottom":"4px solid rgba(240,10,23,0)"
					})
					// $(div[i]).mouseover(function(){
					// $(this).css("border-bottom","4px solid #FF7A19");
					// })
					// $(div[i]).mouseout(function(){
					// $(this).css("border-bottom","4px solid
					// rgba(240,10,23,0)")
					// })
				}
			}
			// 左侧导航点击跳转及样式
			$('.con_sub').click(function() {
				$('.con_sub').removeClass('headerCur');
				$(this).addClass('headerCur');
			});
			$('#SYManage').click(function() {
				window.location.href = 'heartBeat_search.do';
			});
			$('.CMSManage').click(function() {
				window.location.href = 'fileGuard_search.do';
			});
			$('#templeCple').click(function() {
				window.location.href = "templet_searchByRelease.do";
			});
//			$('#newTemp').click(function() {
//				window.location.href = 'templet_showAdd.do';
//			});
			$('#temVie').click(function() {
				window.location.href = 'templet_searchByExamine.do';
			});
			$('#main').click(function() {
				window.location.href = 'main.html';
			});
			$('#creTemp').click(function() {
				window.location.href = 'newpages/createTemplate.jsp';
			});
			$('#showMont').click(function() {
				window.location.href = 'templet_showMont.do';
			});

			// data table及tab数据高度自适应（超高出现滚动条）
//			var allHeight = $(document).height();
//			var tableHeight = $('.table-responsive').offset().top;
//			$('.data_table .table-responsive').height(allHeight - tableHeight);
		})