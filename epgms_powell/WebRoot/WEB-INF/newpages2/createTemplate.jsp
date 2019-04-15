<%@ page language="java" contentType="text/html;charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="c" uri="epgmstags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>模板创建</title>
<link rel="stylesheet" href="resource/newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="resource/newpages/css/font-awesome.min.css">
<link rel="stylesheet" href="resource/newpages/layDate/laydate/theme/default/laydate.css">
<link rel="stylesheet" href="resource/newpages/css/common.css">
<link rel="stylesheet" href="resource/newpages/css/cpsp.css">
<link rel="stylesheet" href="resource/newpages/css/newTemp.css">
<link rel="stylesheet" href="resource/newpages/css/templatePool.css">
</head>
<body>
	<div class="container-fluid">
		<!--主内容部分-->
		<main> 
		<div class="data data_table navbar-left dataDefault">
			<form action="templet_search.do" class="form-inline" method="post">
				<input type="hidden" id="templateId" name=templetVO.id value="">
				<div class="data-search" style="width: 98%;">
					<div>
						<div class="col-md-4">
							<label class="col-md-5">模板名称：</label>
							<s:textfield name="templetVO.name" class="col-md-6 ipt"
								maxlength="20" id="nameInput">
							</s:textfield>
						</div>
	
						<div class="col-md-4">
							<label class="col-md-5">模板类型：</label>
							<s:select class="col-md-6 ipt" name="templetVO.type" id="type"
								list="#request.templet_type" headerKey="" headerValue="全部">
							</s:select>
						</div>

						<div class="col-md-4">
							<label class="col-md-5">模板来源：</label>
							<s:select class="col-md-6 ipt" name="templetVO.source"
								id="source" list="#request.templet_source" headerKey=""
								headerValue="全部">
							</s:select>
						</div>

						<div class="col-md-4">
							<label class="col-md-5">模板状态：</label>
							<s:select class="col-md-6 ipt2" name="templetVO.status"
								id="status" list="#request.templet_status" headerKey=""
								headerValue="全部">
							</s:select>
						</div>
						
						<div class="col-md-4">
							<label class="sel col-md-5">专题标识：</label>
							<s:select class="sel col-md-6 ipt2" name="templetVO.isTopic"
								id="isTopic" list="#{'0':'普通模板','1':'专题模板'}" headerKey=""
								headerValue="全部">
							</s:select>
						</div>

						<div class="col-md-4">
							<label class="col-md-3">创建时间：</label>
							<s:textfield name="templetVO.begintime" maxlength="20" id="bTime"
										 class="col-md-4 date-icon ipt">
							</s:textfield>
							<label class="col-md-1">至：</label>
							<s:textfield name="templetVO.endtime" maxlength="20" id="eTime"
										 class="col-md-4 date-icon ipt">
							</s:textfield>
						</div>

						<input type="hidden" id="strategyGroupIds" name="templetVO.groupIds" value="">
					</div>

					<div class="form-group search_btn" style="width:100%;text-align:center;">
						<input type="button" name="newTem" id="newTemp" value="新增" class="btn blue-btn" />
						
						<input  class="btn btn-default primary" type="submit" id="que" onclick="query()" value="查询" >
						
						<input  class="btn btn-default primary" type="button" onclick="funreset()" id="J_clearBtn" value="重置" >
						
						<input type="button" name="" id="examine" class="btn btn-default primary" value="提交审核" />
						
						<input type="button" name="" id="templatePool" class="btn btn-default primary" value="存入模板库" />
					</div>
				</div>

				<div class="table-responsive">
					<table class="table table-hover text-center">
						<thead>
							<tr>
								<th><input class="th_checkbox checkBox" type="checkbox"></th>
								<th><span class="spanCls">创建时间</span></th>
								<th><span class="spanCls">模板名称</span></th>
								<th><span class="spanCls">模板类型</span></th>
								<th><span class="spanCls">模板来源</span></th>
								<th><span class="spanCls">模板状态</span></th>
								<th><span class="spanCls">专题标识</span></th>
								<th><span class="spanCls">推荐位状态</span></th>
								<th><span class="spanCls">操作</span></th>
							</tr>
						</thead>
						<tbody class="form-body">
							<s:iterator var="vo" value="#request.list" status="sta">
								<tr>
									<td>
										<input type="checkbox" name="templateCheckBox" 
											   value="<s:property value="#vo.id"/>" 
											   statusval="<s:property value="#vo.status"/>" 
									    />
									</td>
									<td title="<s:property value="#vo.createdate"/>"><s:property
											value="#vo.createdate" /></td>

									<!-- 隐藏标签,存放tar的名称 -->
									<td id="tarName" name="tarNames" style="display: none"
										title="<s:property value="#vo.filename"/>">
										<s:property value="#vo.filename" />
									</td>

									<td title="<s:property value="#vo.name"/>"><s:property
											value="#vo.name" /></td>

									<td title="<s:property value="getTypeName()"/>"><s:property
											value="getTypeName()" /></td>

									<td title="<s:property value="getSourceName()"/>"><s:property
											value="getSourceName()" /></td>

									<td title="<s:property value="getStatusName()"/>"><s:property
											value="getStatusName()" /></td>
									<td id="isTopic" title="<s:property value="getIsTopicName()"/>">
										<s:property value="getIsTopicName()" />
									</td>
									<td id="topicStatus" title="<s:property value="getTopicStatusName()"/>">
										<s:property value="getTopicStatusName()" />
									</td>

									<td><select class="oper" id="selected">
											<option value="">操作</option>
											<option value="<s:property value="#vo.id"/>">查看</option>
											<option name="<s:property value="#vo.id"/>" title="<s:property value="getIsTopicName()" />" value="<s:property value="#vo.filename"/>">预览</option>
											<option name="<s:property value="#vo.id"/>" title="<s:property value="getIsTopicName()" />" value="<s:property value="#vo.filename"/>">编排</option>
									</select></td>
								</tr>
							</s:iterator>
						</tbody>

					</table>

					<div class="page center-block">
						<ul>
							<li><input type="hidden" name="templetVO.pageid" id="page"
								value="<s:property value="#request.pid"/>" /> <input
								type="hidden" name="pages"
								value="<s:property value="#request.pages"/> " />
								<button type="button" class="" onclick="firstpage()">首页</button>
								<button type="button" class="" onclick="backpage()">上一页</button>
								<button type="button" class="" onclick="nextpage()">下一页</button>
								<button type="button" class="" onclick="lastpage()">尾页</button>
								<span>每页显示 <select name="templetVO.pagecount" id=""
									class="text-input" onchange="dosearch()">
										<s:iterator var="num" value="#request.sizelist">
											<option
												<s:if test='#request.pagecount==#num.key'>selected="selected"</s:if>
												value="<s:property value="#num.key"/>"><s:property
													value="#num.value" /></option>
										</s:iterator>
								</select> 条
							</span> 跳转到 <input type="text" size="3" id="showPage"
								value="<s:property value="#request.pid"/>" />页 <span><s:property
										value="#request.pid" />/ <s:property value="#request.pages" /></span>
								<button type="button" class="pageBtn7"
									style="background-color: #ff7a19;" onclick="jumptoPage()">跳转</button>
							</li>
						</ul>
					</div>

					<!--遮罩层-->
					<div class="mask" id="z_mask"></div>
					<!-- 选择下发分域 -->
					<div id="j_formAdd" class="form-add">
						<div class="form-add-title" id="select_box">
							<span>请选择分域 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;请选择分组</span>
						</div>
						<div class="main2" style="overflow: auto; height: 158px;">
							<table border="0" cellpadding="0" cellspacing="0" width="45%;">
								<tbody class="form-body" id="preTbody">
								</tbody>
							</table>
							<table  border="0" cellpadding="0" cellspacing="0" width="45%;"  class="preTbody2">
								<tbody class="form-body" id="preTbody2">
								</tbody>
							</table>
						</div>
						<div class="form-submit">
							<input type="button" value="选择" id="j_btnAdd"> 
							<input type="button" name="j_hideFormAdd" id="j_hideFormAdd" value="取消" />
						</div>
					</div>
					
					<!-- 转圈圈效果 -->
					<!--灰背景-->
					<div class="h_bj"></div>
					<!--loading-->
					<div class="loading">
						<img src="resource/img/admin/loading.gif" />
					</div>

				</div>
			</form>
		</div>
	</div>
	</main>
	<!-- 添加模板库弹窗 -->
	<div class="layer addpic">
		<form id="templatePoolForm"  enctype="multipart/form-data" method="post" action="templetPool_saveTemplatePool.do">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<div>
				<label class="templatePoolName">模板入库名称：</label>
				<input class="templatePoolInput" type="text" id="templatePoolName" name="poolVO.name" value=""/>
			</div>
			<tr>
				<td>
					<div class="picImg">
						<img src="resource/img/admin/default.jpg" alt="" id="uploadImage" width="185" height="135"/>
					</div>
					<input type="hidden" id="uploadImageSrc"/>
				</td>
				<td>
					<div class="upload">
						<input type="file" name="file" id="image" class="file-upload" onchange="upload(this);"/> 
						<input type="button" style="color:#ffffff;width:115px; height:30px;"  value="上传图片" class="btn blue-btn" />
					</div>
				</td>
			</tr>
				
			</table>
			</form>
			<div class="buttons">
				<input type="button" style="width:115px; height:30px;" class="btn blue-btn image" id="savePic" value="保存" />
				<input type="button" style="width:115px; height:30px;" class="btn blue-btn cancelSavePool" value="取消" />
			</div>
	</div>

	</div>
	<script src="resource/newpages/js/jquery-3.2.1.min.js"></script>
	<script src="resource/newpages/js/bootstrap.min.js"></script>
	<script src="resource/newpages/layDate/laydate/laydate.js"></script>
	<script src="resource/newpages/js/lib/layer/layer.js"></script>
	<script src="resource/newpages/js/common.js"></script>
	<script src="resource/js/ajaxFileUpload/ajaxfileupload.js"></script>
	<script type="text/javascript">
		$('#newTemp').click(function() {
			window.location.href = 'templet_showAdd.do';
		});
		$(function() {
			$("#j_btnAdd").on('click',function() {
								//获取绑定的分分域
								var areaIds = new Array();
								$("input[name='areaIds']:checked").each(function() {
									areaIds[areaIds.length] = $(this).val();
								});
								//获取绑定的分组
								var groupIds = new Array();
								$("input[name='groupIds']:checked").each(function() {
									groupIds[groupIds.length] = $(this).val();
								});
								
								if (areaIds.length == 0 || groupIds == 0) {
									alert("请选择分域和分组");
									//layer.msg("请选择策略",2,3);
									return false;
								} else {
									$(".h_bj").show();
									$(".loading").show();
									$.ajax({
												url : 'templet_bindingAreaAndGroup.do?areaIds='+ areaIds+'&groups='+groupIds+'&templetVO.id='+ $("#templateId").val() + '&templetVO.status=1',
												type : 'post',
												dataType : 'json',
												success : function(data) {
													//console.log(data);
													//$("#strategyDown").val(data.groupNames);
													//$("#strategyGroupIds").val(data.groupListIds);
													$(".h_bj").hide();
													$(".loading").hide();
													$("#j_formAdd").hide();
													$("#z_mask").hide();
													alert(data.result);
													window.location.replace("templet_search.do")
												}
											})
								}
							});

			$('#j_hideFormAdd').on('click', function() {
				$("#preTbody").children().remove();
				$("#preTbody2").children().remove();
				$("#j_formAdd").hide();
				$("#z_mask").hide();
				$(".h_bj").hide();
			})
		})
		
/* 		$("#saveAdresource").on('click', function() {
			var strIds = new Array();
			$("input[name='templateCheckBox']:checked").each(function() {
				strIds[strIds.length] = $(this).val()
				
			});

			if (strIds.length != 1) {
				alert("请选择一个需要操作的对象模板!!");
				//layer.msg("请选择需要操作的对象",2,3);
				return false;
			} else {
				//把勾选的模板id绑定到hidden中
				$("#templateId").val(strIds[0]);
				
				$.ajax({
					url : 'adresourceEpgmsAction_saveAdresource.do?templateId='+strIds[0],
					type : 'post',
					dataType : 'json',
					success : function(data) {
						if("0" == data){
							alert("未编排广告信息!")
						}
						if("1"== data){
							alert("保存广告信息成功!")
						}
						 window.location.replace("templet_search.do");
					}
				})
				
			}
		}) */
		
		//提交审核
		$("#examine").on('click', function() {
			var strIds = new Array();
			$("input[name='templateCheckBox']:checked").each(function() {
				strIds[strIds.length] = $(this).val()
			});

			if (strIds.length != 1) {
				alert("请选择一个需要操作的对象模板!!");
				//layer.msg("请选择需要操作的对象",2,3);
				return false;
			} else {
				//把勾选的模板id绑定到hidden中
				$("#templateId").val(strIds[0]);
				
				$.ajax({
					url : 'templet_getAllArea.do',
					type : 'post',
					dataType : 'json',
					success : function(data) {
						$("#preTbody").children().remove();
							for (var i = 0; i < data.length; i++) {
								$("#preTbody").append( "<tr>");
								$("#preTbody").append( "<td width='10%'><input type='checkbox' id='checkA' onclick='checkArea()' name='areaIds' value="+data[i].id+" /></td>");
								$("#preTbody").append( "<td title="+data[i].name+">" + data[i].name + "</td>");
								$("#preTbody").append("<tr/>");
							}
					  	
						$('#z_mask').show();
						$('#j_formAdd').show();
						
					}
				})
				
			}
		});
		$('.cancel').on('click', function() {
			layer.closeAll();
		});
		
		//存入模板库
		$("#templatePool").on('click', function() {
			var strIds = new Array();
			$("input[name='templateCheckBox']:checked").each(function() {
				strIds[strIds.length] = $(this).val()
			});

			if (strIds.length != 1) {
				alert("请选择一个需要操作的对象模板!!");
				//layer.msg("请选择需要操作的对象",2,3);
				return false;
			} else {
				//把勾选的模板id存到隐藏标签
				$("#templateId").val(strIds[0]);
				$.layer({
					type : 1, //0-4的选择,
					shade : [ 0.6, '#000', true ],
					title : false,
					border : [ 0 ],
					closeBtn : [ 0 ],
					shadeClose : true,
					area : [ '500px', '280px' ],
					page : {
						dom : ".addpic"
					}
				})
				//获取被勾选的复选框的父节点td
				var td = $("input[name='templateCheckBox']:checked")[0].parentNode;
				var tr = td.parentNode;
				var tarName = tr.cells[3].innerHTML
				//去掉前后空格
				tarName = tarName.replace(/(^\s*)|(\s*$)/g, "");
				$("#templatePoolName").val(tarName);
			}
		})
		
		//保存模板到模板库
		$("#savePic").on('click', function() {
			if($("#uploadImageSrc").val() == ""){
				alert("请上传缩略图");
			}else{
				var action = $("#templatePoolForm").attr("action");
				$("#templatePoolForm").attr("action",action + "?picVO.path="+$("#uploadImageSrc").val() + "&poolVO.templateId=" + $("#templateId").val());
				//alert($("#templatePoolForm").attr("action"));
				$("#templatePoolForm").submit();
			}
		})
		//取消保存到模板库
		$('.cancelSavePool').on('click', function() {
			layer.closeAll();
		    document.forms[0].action = "templet_search.do";
			document.forms[0].submit();
		});
		
		
		/**图片上传*/
		function upload(target) {
			var fileName = document.getElementById("image").value;
			var ext = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
		
			if (ext == ".jpg" || ext == ".png" || ext == ".jpeg") { 
			    
				$.ajaxFileUpload({
		
					//url : "upload.do?code="+$("#code").val()+"&imageContentType="+$('#imageContentType').val()+"&temp="+new Date().getTime()+"&savePath=program", //需要链接到服务器地址
					url : "uploadNameByTime.do?temp="+new Date().getTime()+"&savePath=templatePoolPic", //需要链接到服务器地址
					secureuri : false,
					fileElementId : 'image', //文件选择框的id属性
					dataType : 'content', //服务器返回的格式content，可以是JSON
					//相当于java中try语句块的用法
					success : function(result, data) { //data是从服务器返回来的值
						//result:templatePoolPic/1527042734064.jpg 
						//data:success
						if (data == "fail") {
						     layer.msg("上传失败，请重新上传",3,3);
						} else {
						    if(result == "fail"){
						        layer.msg("上传文件不能大于2M！", 3, 3);
						    }else{
								var uploadImage = result;
								document.getElementById("uploadImage").src=uploadImage+"?id="+Math.random();
								$("#uploadImageSrc").val(uploadImage);
							}
						}
					},
					//相当于java中catch语句块的用法
					error : function(data, status, e) {
						layer.msg("上传失败，请重新上传",3,3);
					}
				});
			} else {
				layer.msg("规则文件类型不正确,允许类型:jpg png jpeg",3,3);
			}
			return false;
		}
		
		//根据勾选的分域,查询对应的所有分组
		function checkArea(){
			var checkIds = Array();
			$("input[name='areaIds']:checked").each(function() {
				checkIds[checkIds.length] = $(this).val();
			});
			//获取勾选的分组
			var groupIds = new Array();
			$("input[name='groupIds']:checked").each(function() {
				groupIds[groupIds.length] = $(this).val();
			});
// 			$("#preTbody2").children().remove();
			if(checkIds.length > 0){
				$.ajax({
					url : 'templet_searchGroupByAreaIds.do?areaIds='+checkIds,
					type : 'post',
					dataType : 'json',
					success : function(data) {
						 $("#preTbody2").children().remove();
							for (var i = (data.length)-1; i >= 0; i--) {
								if(groupIds.length != 0){
										if(groupIds.indexOf(""+data[i].id) != -1){
											$("#preTbody2").append( "<tr>");
											$("#preTbody2").append( "<td width='10%'><input type='checkbox' checked='checked' id='checkGroup' name='groupIds' value="+data[i].id+" /></td>");
											$("#preTbody2").append( "<td title="+data[i].name+">" + data[i].name + "</td>");
											$("#preTbody2").append("<tr/>");
										}else{
											$("#preTbody2").append( "<tr>");
											$("#preTbody2").append( "<td width='10%'><input type='checkbox' id='checkGroup' name='groupIds' value="+data[i].id+" /></td>");
											$("#preTbody2").append( "<td title="+data[i].name+">" + data[i].name + "</td>");
											$("#preTbody2").append("<tr/>");
										}
								}else{
									$("#preTbody2").append( "<tr>");
									$("#preTbody2").append( "<td width='10%'><input type='checkbox' id='checkGroup' name='groupIds' value="+data[i].id+" /></td>");
									$("#preTbody2").append( "<td title="+data[i].name+">" + data[i].name + "</td>");
									$("#preTbody2").append("<tr/>");
								}
							}
						$('#z_mask').show();
						$('#j_formAdd').show();
						
					}
				})
			}else{
				$("#preTbody2").children().remove();
			}
			
			
		}
		//分页
		function dosearch() {
			/* document.forms[0].page.value = "1";
			document.forms[0].submit(); */

			document.getElementById("page").value = "1";
			document.forms[0].action = "templet_search.do";
			document.forms[0].submit();
		}
		function firstpage() {
			document.forms[0].page.value = 1;
			document.forms[0].action = "templet_search.do";
			document.forms[0].submit();
			return false;
		}
		function backpage() {
			if (document.forms[0].page.value == "1") {
				document.forms[0].page.value = 1;
			} else {
				if (document.forms[0].page.value == "0") {
					document.forms[0].page.value = 1;
				} else {
					document.forms[0].page.value = parseInt(document.forms[0].page.value) - 1;
				}
			}
			document.forms[0].action = "templet_search.do";
			document.forms[0].submit();
			return false;
		}
		function nextpage() {
			if (parseInt(document.forms[0].page.value) >= parseInt(document.forms[0].pages.value)) {
				document.forms[0].page.value = document.forms[0].pages.value;
			} else {
				document.forms[0].page.value = parseInt(document.forms[0].page.value) + 1;
			}
			document.forms[0].action = "templet_search.do";
			document.forms[0].submit();
			return false;
		}
		function lastpage() {
			document.forms[0].page.value = document.forms[0].pages.value;
			document.forms[0].action = "templet_search.do";
			document.forms[0].submit();
			return false;
		}
		function jumptoPage() {
			if (/^[1-9]\d*$/.exec(parseInt($('#showPage').val()))) {
				document.getElementById("page").value = document
						.getElementById("showPage").value;
				if (parseInt(document.forms[0].page.value) >= parseInt(document.forms[0].pages.value)) {
					document.forms[0].page.value = document.forms[0].pages.value;
				}
				document.forms[0].action = "templet_search.do";
				document.forms[0].submit();
			} else {
				alert('请输入正整数');
			}
			return false;
		}

		function query() {
			document.getElementById("page").value = "1";
			document.forms[0].action = "templet_search.do";
			document.forms[0].submit();
			return false;
		}

		function funreset() {
			$('#nameInput, #bTime,#eTime,#type,#level,#status,#source').val('');
			window.location.replace("templetPool_searchTemplatePool.do");
			return false;
		}
	</script>
</body>
</html>

<script>
	//	执行一个laydate实例
	laydate({
		istime : true,
		isclear : false,
		elem : '#bTime',
		format : 'YYYY-MM-DD hh:mm:ss'
	});
	laydate({
		istime : true,
		isclear : false,
		elem : '#eTime',
		format : 'YYYY-MM-DD hh:mm:ss'
	});

	$(function() {
		
		$(".oper").on("change",
						function() {
							//查看
							if ($("option:selected", this).text() == '查看') {
								window.location.href = "templet_getDetail.do?templetVO.id="
										+ $("option:selected", this).val();
								return false;
							}
							//预览
							if ($("option:selected", this).text() == '预览') {
								var fileName = $("option:selected", this).val();
								fileName = fileName.replace(".tar","");
								var templateId = $("option:selected", this).attr("name");
								window.open('template/'+ fileName + '/theater.html?random='+Math.random(), '_blank', 'height=1000, width=1300, top=0px, left=0px, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
								window.location.href = "templet_search.do"
								return false;
							}
							//编排
							if ($("option:selected", this).text() == '编排') {
								//window.location.href ="C:/Users/44403/Desktop/epgMan/cpsp.html"
								var isTopic = $("option:selected", this).attr("title");
								if(isTopic == "专题模板"){
									alert("专题模板无法编排!");
									window.location.href = "templet_search.do?";
								}else{
									var fileName = $("option:selected", this).val();
									fileName = fileName.replace(".tar","");
									var templateId = $("option:selected", this).attr("name");
									
									window.open('template/'+ fileName + '/index_sub.html?fileName='+fileName+"&templateId="+templateId, '_blank', 'height=1000, width=1300, top=0px, left=0px, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
									window.location.href = "templet_search.do?"
								}
							} 
						})
	})
	
</script>
