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
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>模板审核</title>
<link rel="stylesheet" href="resource/newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="resource/newpages/css/font-awesome.min.css">
<link rel="stylesheet"
	href="resource/newpages/layDate/laydate/theme/default/laydate.css">
<link rel="stylesheet" href="resource/newpages/css/common.css">
<link rel="stylesheet" href="resource/newpages/css/cpsp.css">
<link rel="stylesheet" href="resource/newpages/css/newTemp.css">
</head>
<body>
	<div class="container-fluid">
		<!--主内容部分-->
		<main> 
		<div class="data data_table navbar-left dataDefault">
			<form action="" class="form-inline" method="post">
				<input type="hidden" id="templateId" name=templetVO.id value="">
				<div class="data-search" style="width: 85%;">
					<div>
						<div class="form-group col-md-4">
							<label class="col-md-5">模板名称：</label>
							<s:textfield name="templetVO.name" class="col-md-6 ipt"
								maxlength="20" id="nameInput">
							</s:textfield>
						</div>

						<div class="form-group col-md-4">
							<label class="col-md-5">模板类型：</label>
							<s:select class="col-md-6 ipt" name="templetVO.type" id="type"
								list="#request.templet_type" headerKey="" headerValue="全部" style='height:25px;'>
							</s:select>
						</div>

						<div class="form-group col-md-4">
							<label class="col-md-5">模板来源：</label>
							<s:select class="col-md-6 ipt" name="templetVO.source"
								id="source" list="#request.templet_source" headerKey=""
								headerValue="全部" style='height:25px;'>
							</s:select>
						</div>

						<div class="form-group col-md-4">
							<label class="sel col-md-5">模板状态：</label>
							<s:select class="sel col-md-6 ipt2" name="templetVO.status"
								id="status" list="#request.templet_status" headerKey=""
								headerValue="全部" style='height:25px;'>
							</s:select>
						</div>

						<div class="form-group col-md-4">
							<label class="col-md-5">创建时间：</label>
							<s:textfield name="templetVO.begintime" maxlength="20" id="bTime"
								class="date-icon ipt col-md-6">
							</s:textfield>
						</div>
						<div class="form-group col-md-4">
							<label class="col-md-5">至：</label>
							<s:textfield name="templetVO.endtime" maxlength="20" id="eTime"
										 class="date-icon ipt col-md-6">
							</s:textfield>
						</div>


						<input type="hidden" id="strategyGroupIds"
							name="templetVO.groupIds" value="">

					</div>

					<div class="search_btn">

						<button class="btn btn-default primary" id="sub" onclick=""
							type="button">通过</button>
							
						<button class="btn btn-default primary" id="noPass" onclick="">不通过</button>

						<button class="btn btn-default primary" id="que" onclick="query()"
							type="submit">查询</button>
						<button class="btn btn-default primary" id="J_clearBtn"
							onclick="funreset()">重置</button>
						<input type="button" name="" id="saveAdresource"
						class="btn btn-default primary" value="保存广告" />

					</div>
				</div>
				<div class="table-responsive">
					<table class="table table-hover text-center">
						<thead>
							<tr>
								<th width="5%"><input type="checkbox" name="allIds"
									id="allIds" class="selectAll" onclick="checkAll(this)" /></th>
								<th><span class="spanCls">创建时间</span></th>
								<th><span class="spanCls">模板名称</span></th>
								<th><span class="spanCls">模板类型</span></th>
								<th><span class="spanCls">模板来源</span></th>
								<th><span class="spanCls">模板状态</span></th>
								<th><span class="spanCls">推荐位状态</span></th>
								<th><span class="spanCls">专题标识</span></th>
								<th><span class="spanCls">操作</span></th>

							</tr>
						</thead>
						<tbody class="form-body">
							<s:iterator var="vo" value="#request.list" status="sta">
								<tr>
									<td><input type="checkbox" name="templetVO.ids"
										value="<s:property value="#vo.id"/>" onclick="checkNode(this)"
										statusval="<s:property value="#vo.status"/>" /></td>
									<td title="<s:property value="#vo.createdate"/>"><s:property
											value="#vo.createdate" /></td>

									<!-- 隐藏标签,存放tar的名称 -->
									<td id="tarName" name="tarNames" style="display: none"
										title="<s:property value="#vo.filename"/>"><s:property
											value="#vo.filename" /></td>

									<td title="<s:property value="#vo.name"/>"><s:property
											value="#vo.name" /></td>

									<td title="<s:property value="getTypeName()"/>"><s:property
											value="getTypeName()" /></td>

									<td title="<s:property value="getSourceName()"/>"><s:property
											value="getSourceName()" /></td>

									<td title="<s:property value="getStatusName"/>"><s:property
											value="getStatusName()" /></td>

									
									<td id="topicStatus" title="<s:property value="getTopicStatusName()"/>">
										<s:property value="getTopicStatusName()" />
									</td>
									
									<td id="isTopic" title="<s:property value="getIsTopicName()"/>">
										<s:property value="getIsTopicName()" />
									</td>
									
									<td>
									<select class="oper" id="selected">
											<option value="">操作</option>
											<option name="<s:property value="#vo.topicUrl"/>" title="<s:property value="getIsTopicName()" />" value="<s:property value="#vo.filename"/>">预览</option>
									</select>
									</td>
									
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

					<div class="layer confirm" id="confirm" style="display: none">
						<div class="layer-tit"></div>
						<div class="layer-msg">通过审核即发布，是否确认通过审核？</div>
						<div class="buttons">
							<input type="button" class="btn blue-btn" value="确认"
								onclick="goSub()" /> <input type="button"
								class="btn blue-btn cancel" value="取消" />
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
	</div>
	<script src="resource/newpages/js/jquery-3.2.1.min.js"></script>
	<script src="resource/newpages/js/bootstrap.min.js"></script>
	<script src="resource/newpages/layDate/laydate/laydate.js"></script>
	<script src="resource/newpages/js/lib/layer/layer.js"></script>
	<script src="resource/newpages/js/common.js"></script>
	<script src="resource/newpages/js/cscp.js"></script>
	<script type="text/javascript">
		//分页
		function dosearch() {
			/* document.forms[0].page.value = "1";
			document.forms[0].submit(); */

			document.getElementById("page").value = "1";
			document.forms[0].action = "templet_searchByExamine.do";
			document.forms[0].submit();
		}
		function firstpage() {
			document.forms[0].page.value = 1;
			document.forms[0].action = "templet_searchByExamine.do";
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
			document.forms[0].action = "templet_searchByExamine.do";
			document.forms[0].submit();
			return false;
		}
		function nextpage() {
			if (parseInt(document.forms[0].page.value) >= parseInt(document.forms[0].pages.value)) {
				document.forms[0].page.value = document.forms[0].pages.value;
			} else {
				document.forms[0].page.value = parseInt(document.forms[0].page.value) + 1;
			}
			document.forms[0].action = "templet_searchByExamine.do";
			document.forms[0].submit();
			return false;
		}
		function lastpage() {
			document.forms[0].page.value = document.forms[0].pages.value;
			document.forms[0].action = "templet_searchByExamine.do";
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
				document.forms[0].action = "templet_searchByExamine.do";
				document.forms[0].submit();
			} else {
				alert('请输入正整数');
			}
			return false;
		}

		function query() {
			document.getElementById("page").value = "1";
			document.forms[0].action = "templet_searchByExamine.do";
			document.forms[0].submit();
			return false;
		}

		function funreset() {
			$('#nameInput, #bTime,#eTime,#type,#level,#status,#source').val('');
			return false;
		}

		function goSub() {
			layer.closeAll();
			$("#h_bj").show();
			$(".loading").show();
			document.forms[0].action = "templet_releaseSubmit.do";
			document.forms[0].method = "POST";
			document.forms[0].submit();
		}

		/**发布*/
		$("#sub").on('click', function() {
			var strIds = new Array();
			$("input[name='templetVO.ids']:checked").each(function() {
				strIds[strIds.length] = $(this).val()
			});

			if (strIds.length == 0) {
				alert("请选择需要操作的对象模板!!");
				//layer.msg("请选择需要操作的对象",2,3);
				return false;
			} else {
				$.layer({
					type : 1, //0-4的选择,
					shade : [ 0.6, '#000', true ],
					title : false,
					border : [ 0 ],
					closeBtn : [ 0 ],
					shadeClose : true,
					area : [ '450px', '280px' ],
					page : {
						dom : "#confirm"
					}
				});
			}
		});
		$('.cancel').on('click', function() {
			layer.closeAll();
		});
		
		//预览
		$(function() {
			
			$(".oper").on(
							"change",
							function() {
								//预览
								if ($("option:selected", this).text() == '预览') {
									//window.location.href ="C:/Users/44403/Desktop/epgMan/cpsp.html"
									var isTopic = $("option:selected", this).attr("title");
									if(isTopic == "专题模板"){
										var topicPath = $("option:selected", this).attr("name");
										var spTopicPath = topicPath.split("/")[2];
										// 	http://10.178.30.103:8080/bytuetechAPI/jsp/ahiptvdemo
										window.open('http://10.178.30.101/epgms/upload/' + spTopicPath + topicPath, 'height=1000, width=1300, top=0px, left=0px, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
										window.location.href = "templet_searchByExamine.do";
									}else{
										var fileName = $("option:selected", this).val();
										fileName = fileName.replace(".tar","");
										var templateId = $("option:selected", this).attr("name");
										
										
										window.open('viewTemplate/'+ fileName + '/index_sub.html?fileName='+fileName, '_blank', 'height=1000, width=1300, top=0px, left=0px, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
										window.location.href = "templet_searchByExamine.do"
									}
								} 
							})
		})
		
		//保存专题广告
		$("#saveAdresource").on('click', function() {
			var strIds = new Array();
			$("input[name='templetVO.ids']:checked").each(function() {
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
						 window.location.replace("templet_searchByExamine.do");
					}
				})
				
			}
			
			
		})
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

	
</script>