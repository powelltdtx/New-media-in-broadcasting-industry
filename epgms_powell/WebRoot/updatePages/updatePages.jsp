 <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta charset="UTF-8">
<meta name="Page-View-Size" content="1280*720">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<title>图形化开发工具</title>

<link href="adresourceJsp/adresource/style/admin.css" rel="stylesheet"
	type="text/css" />
<link rel="stylesheet" href="updatePages/css/bootstrap.min.css">
<link rel="stylesheet" href="updatePages/css/index.css">
</head>
<script src="updatePages/js/jquery-3.2.1.min.js"></script>
<script src="updatePages/js/bootstrap.min.js"></script>
<script src="updatePages/js/index.js"></script>
<script type="text/javascript"
	src="adresourceJsp/adresource/lib/layer/layer.min.js"></script>
<body>
	<!--<div class="box">-->
	<div class="main"></div>
	<!--</div>-->
	<div class="operateShow">
		<input id="upload" class="upload" type="file"
			onchange="getImgUrl(this)" enctype="multipart/form-data" />
		<div class="imgList"></div>
		<div class="textList"></div>
	</div>
	<div class="editPart">
		<form action="">
			<p class="edit">编辑</p>
			<label for="">宽度：</label>
			<input class="e_width" type="number" min="0">
			<label for="">高度：</label>
			<input class="e_height" type="number"min="0"> 
			<label for="">居左：</label>
			<input class="e_left" type="number" min="0"> 
			<label for="">居上：</label>
			<input class="e_top" type="number" min="0"> 
			<label for="">角度：</label>
			<input class="e_deg" type="number" min="0" max="360"> 
			<label for="">层级：</label>
			<input class="e_zIndex" type="number"> 
			<label for="">地址：</label>
			<input class="e_url" type="url" id="urlPath">
			<label for="">专题名称：</label>
			<input class="topicName" type="text" id="topicName">
			
			<label class="grape" for="">拖选形状：</label>
				<select class="grape e_grape">
				    <option value="请选择拖选形状">请选择拖选形状</option>
				    <option value="矩形">矩形</option>
				    <option value="圆形">圆形</option>
				</select>
			<label class="flat" for="">扁平度：</label><input class="flat e_flat" type="number" value="" min="0" max="360" step="0.01">
			
			
			<div class="formBtn">
				<input id="selectUrl" class="btn btn-default saveBtn" value="选择地址" />
				<input id="ser" class="btn btn-default saveBtn" onclick="serBtn()" value="保存" /> 
				<input type="reset" class="btn btn-default resetBtn" value="重置" />
				<button class="btn btn-default refresh" onclick="location.reload()">刷新页面</button>
			</div>
		</form>
	</div>



	<input type="hidden" id="actiontype" name="adresource.imgurl" value="" />
	<input type="hidden" id="actionUrl" name="adresource.actionUrl"
		value="" />
	<input type="hidden" id="guid" name="adresource.guid" value="" />
	<input type="hidden" id="imgurl" name="adresource.imgurl" value="" />
	<!-- 选择地址的iframe -->
	<div class="layer selectLinks" style="background: #fff; width: 650px;">
		<div class="layer-tit">
			<span class="link-t">分类</span> <span class="link-t">内容</span> <span
				class="link-t">节目单</span>
		</div>

		<input type="hidden" id="listtype" name="adresource.listtype" value="" />
		<input type="hidden" id="categoryid" name="adresource.categoryid"
			value="" /> <input type="hidden" id="seriesflag"
			name="adresource.seriesflag" value="" />
		<form
			action="adresourceEpgmsAction_initCategoryList.do?adresource.listtype=1"
			id="formcategory" target="categoryList" method="post">
			<div style="width: 630px; height: 440px">
				<iframe
					src="adresourceEpgmsAction_initCategoryList.do?adresource.listtype=1"
					id="categoryList" frameborder="0" name="categoryList" width="100%"
					height="100%"> </iframe>
			</div>
			<div class="buttons">
				<input type="button" id = "yesBtn" class="btn blue-btn" value="确定"
					onclick="savecategory()" /> 
				<input id="newaddid-del" type="button"
					class="btn blue-btn cancel" value="取消" />
			</div>

		</form>
		<input type="hidden" id="state" value="" /> <a id="type"
			style="visibility: hidden;">
			<%-- ${advertising.type} --%>
		</a>
		<script type="text/javascript">
			$('.link-list').find(':radio').on('click', function() {
				$('.link-list').find('tr').removeClass('checked');
				$(this).parent().parent('tr').addClass('checked');

			});
			var about = $('').find().valueOf();
			$('option');
		</script>
	</div>

</body>
</html>
<script>
	var date = new Date();
	var time = date.getTime();
	//document.cookie="time="+time;

	//弹出iframe
	$('#serPath').click(function() {
		$('#categoryList').css('display', 'block');
	});

	//选择链接
	$("#selectUrl").on('click', function() {

		// 打开禁用
		//document.getElementById("programName").disabled = false;
		$.layer({
			type : 1, //0-4的选择,
			shade : [ 0.6, '#000', true ],
			title : false,
			border : [ 0 ],
			closeBtn : [ 0 ],
			shadeClose : true,
			offset : [ '100px', '' ],
			area : [ '560px', '580px' ],
			page : {
				dom : ".selectLinks"
			}
		});

		$(".selectLinks").find(".link-t").eq(0).addClass("on");
		$(".selectLinks").find(".link-t").eq(1).removeClass("on");
		$(".selectLinks").find(".link-t").eq(2).removeClass("on");
	});

	var flag; // 判断选择的是分类0、内容1、节目单2
	$(".selectLinks").find(".link-t").eq(0).addClass("on");
	$(".selectLinks").find(".links").eq(0).show();
	$(".selectLinks").find(".link-t").on('click',function() {
						$(".selectLinks").find(".link-t").removeClass("on");
						$(this).addClass("on");
						var t = $(this).index();
						
						flag = t; // 把选择的分类类型赋值到全局变量中
						$(".selectLinks").find(".links").hide();
						if (t == 0) {
							$("#formcategory").attr("action","adresourceEpgmsAction_initCategoryList.do?adresource.listtype=1");
						} else if (t == 1) {
							
							$("#formcategory").attr("action","adresourceEpgmsAction_initProgramList.do?adresource.listtype=1");
						} else if (t == 2) {
							$("#formcategory").attr("action","adresourceEpgmsAction_searchCmsSchedule.do?adresource.begindate="+ GetDateStr(0) + "&adresource.guid=1");
						}
						$("#formcategory").submit();
						$(".selectLinks").find(".links").eq(t).show();

					});

	// 弹出层上的保存操作
	function savecategory() {

		var radio = document.getElementById('categoryList').contentWindow.document
				.getElementsByName("link");
		var value;
		var pageurl = "http://10.178.30.103:8080/bytuetechAPI/jsp/ahiptvdemo/";

		if (radio.length != 0) {
			//新的取值方式，点击父页面的确定时，从子页面的隐藏域中取值
			var programNameTemp = $("#categoryList").contents().find("#forFatherID").val();
			var adhrefTemp = $("#categoryList").contents().find("#forFatherHref").val();
			var seriesflag = $("#categoryList").contents().find("#forFatherSeriesflag").val();
			var categoryIDTemp = $("#categoryList").contents().find("#forFatherCategoryID").val();
			$("#programName").val(programNameTemp);
			$("#adhref").val(adhrefTemp);
			$("#categoryid").val(categoryIDTemp);
			//当前弹出框选择的信息为内容部分

			if (flag == 0) {//分类
				
				var listType = $("#listtype").val();
				if (listType == 1) {
					var forFatherHref = adhrefTemp;
					pageurl = pageurl + "movieList.html?category_id=" + adhrefTemp;
					if (adhrefTemp.substring(0, 4) == '1001') {
						pageurl = pageurl + "&iTitle=1";
					} else if (adhrefTemp.substring(0, 4) == '1002') {
						pageurl = pageurl + "&iTitle=2";
					} else if (adhrefTemp.substring(0, 4) == '1003') {
						pageurl = pageurl + "&iTitle=3";
					} else if (adhrefTemp.substring(0, 4) == '1004') {
						pageurl = pageurl + "&iTitle=4";
					}

				}
				if (listType == 4) {
					var forFatherHref = adhrefTemp;
					var level = $("#seriesflag").val();
					var page = $("#guid").val();
					pageurl = pageurl+"TOPIC/" + page + ".html?topic_id=" + forFatherHref;
				}
			}
			if (flag == 1) {//内容
				flag = 0;
				var actionType;
				if (seriesflag == 0) { // 判断是否单集  0：单集 1：多集
					actionType = 2;
					pageurl = pageurl + "movieDet2.html?code=" + adhrefTemp + "&category_id=" + $("#categoryid").val();

				} else if (seriesflag == 1) {
					var category_id = $("#categoryid").val();
					if (category_id.substring(0, 4) == '1002'
							|| category_id.substring(0, 4) == '1004') {
						pageurl = pageurl + "movieDet.html?code=" + adhrefTemp + "&category_id=" + $("#categoryid").val();
					} else if (category_id.substring(0, 4) == '1003') {
						pageurl = pageurl + "movieDet.html?code=" + adhrefTemp + "&category_id=" + $("#categoryid").val();
					}

					actionType = 3;
				} else if (seriesflag == 2) { // 借用单集多集标识，判断直播
					actionType = 5;

				} else if (seriesflag == 4) { // 借用单集多集标识，判断广播
					actionType = 8;

				} else if (seriesflag == 3) { // 借用单集多集标识，判断新闻
					actionType = 1;
					seriesflag = "";

				} else if (seriesflag == 5) { // 5用来判断是回看
					actionType = 9;
					seriesflag = "";
				}
				//				document.getElementById("guid").value = document.getElementById("adhref").value;
			}
		} else {
			alert("请选择至少一条节目单");
		}
		$("#urlPath").val(pageurl);
		
	 	savePath();
	 /* 	var imgs = document.getElementsByTagName('img')
	 	for (var int = 0; int < imgs.length; int++) {
	 		var title =imgs[i].getAttribute("id");
	 		console.log(imgs[i]);
	 		
		} */
	 	//console.log(imgs);
		layer.closeAll();
	}

	$('#yesBtn').click(function(){
		var urlPath = $('#urlPath').val();
		sessionStorage.setItem(id + '_url',urlPath);
		savePath();
	})
		//取消选择链接
	$("#newaddid-del").on('click', function() {
		layer.closeAll();
	});
	

	 function savePath(){

	 var cur_ID = $('.cur').attr('id');
	 var index = cur_ID.split('_')[1];
	 populateStorage(cur_ID);
	 var curWidth = sessionStorage.getItem(cur_ID + '_width');
	 var curHeight = sessionStorage.getItem(cur_ID + '_height');
	 var curLeft = sessionStorage.getItem(cur_ID + '_left');
	 var curTop = sessionStorage.getItem(cur_ID + '_top');
	 var curDeg = sessionStorage.getItem(cur_ID + '_deg');
	 var curzIndex = sessionStorage.getItem(cur_ID + '_zIndex');
	 var curUrl = sessionStorage.getItem(cur_ID + '_url');
	 curUrl = $("#urlPath").val();
	 console.log(curUrl == '');
	 if($('#' + cur_ID).parent().hasClass('textList')){
	 $('.newText_' + index).css({
	 'width':curWidth*.66,
	 'height':curHeight*.66,
	 'left':curLeft*.66,
	 'top':curTop*.66,
	 'transform':'rotate('+ curDeg +'deg)',
	 'zIndex':curzIndex
	 });
	 if(curUrl){
	 $('.newText_' + index).find('span').attr('title',curUrl);
	 }else{
	 $('.newText_' + index).find('span').attr('title','');
	 }
	 }
	 if($('#' + cur_ID).parent().hasClass('imgList')){
	 $('#img' + index + '_1').css({
	 'width':curWidth*.66,
	 'height':curHeight*.66,
	 'left':curLeft*.66,
	 'top':curTop*.66,
	 'transform':'rotate('+ curDeg +'deg)',
	 'zIndex':curzIndex
	 });
     if(curUrl){
         $('#img'+ index + '_1').attr('title',curUrl);
         $('#img'+ index + '_1').addClass('program');
         
     }else{
    	 
         $('#img'+ index + '_1').attr('title','');
         $('#img'+ index + '_1').removeClass('program');
         
     }
	 
	 }

	 }

	function serBtn() {
		var btm = $(".main").html();
		if (confirm("确定保存吗？")) {
		   var mainHtml = $('.main').html();
	        if(mainHtml == ''){
	            alert('请向左侧区域创建或拉取新图片！');
	        }else{
			//	sessionStorage.clear();
	        	location.reload();
	        }
	        	
		        
		}
		var topicName = $("#topicName").val();
		var topicUrl = $("#urlPath").val(); 
		$.ajax({
			type : "POST", //提交方式  
			url : 'updatePages/servlet/upload',//路径   
			dataType : 'json',
			data : {
				"btm" : btm,
				"time" : time,
				"topicName" : topicName,
				"topicUrl" : topicUrl
				
			},//数据，这里使用的是Json格式进行传输  
			success : function(result) {//返回数据根据结果进行相应的处理  
				if (result.success) {
					self.location = 'main.html';
					$("#tipMsg").text("图片和成成功");
				} else {
					alert(btm + "失败");
					$("#tipMsg").text("图片和成失败");
				}
			}
		});
	}
	$("#upload")
			.on(
					'change',
					function() {
						var files = $(this).get(0).files;
						var file = this.files[0];
						if (!/image\/\w+/.test(file.type)) {
							alert("只能选择图片");
							return false;
						}
						if (file.type == "image/png"
								|| file.type == "image/jpg"
								|| file.type == "image/jpeg"
								|| file.type == "image/JPG"
								|| file.type == "image/PNG") {
							//如果有选择图片则上传图片
							var formData = new FormData();
							if (files.length > 0) {
								for (var i = 0; i < files.length; i++) {
									var timea = time.toString();
									//FormData.set 和 append() 的区别在于，如果指定的键已经存在， FormData.set 会使用新值覆盖已有的值，而 append() 会把新值添加到已有值集合的后面。
									formData.append('files', files[i]);
									formData.append('time', timea);
								}
								var xhr = new XMLHttpRequest();
								xhr
										.open('POST',
												'/epgms/updatePages/servlet/UploadController');
								xhr.onreadystatechange = function() {
									if (xhr.readyState == 4
											&& xhr.status == 200) {
										//处理其他数据，这里根据需要进行调整
									}
								};
								xhr.send(formData);
							}
						} else {
							alert("请选择png或jpg格式图片上传");
							return false;
						}
					});

	
</script>