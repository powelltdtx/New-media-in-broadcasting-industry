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
			<form action="templet_searchArea.do" class="form-inline" method="post">
				<input type="hidden" id="templateAreaId" name=templateAreaVO.id value="">
				<div class="data-search" style="width: 85%;">
					<div>
						<div class="form-group col-md-4">
							<label class="col-md-5">分域名称：</label>
							<s:textfield name="templateAreaVO.name" class="col-md-6 ipt"
								maxlength="20" id="areaNameInput" style="width: 164px;">
							</s:textfield>
						</div>

						<div class="form-group col-md-4">
							<label class="col-md-5">分域状态：</label>
							<s:select class="col-md-5 ipt" name="templateAreaVO.status" id="status"
								list="#{0:'已失效',1:'未失效'}" headerKey="" headerValue="全部">
							</s:select>
						</div>

						<div class="form-group col-md-4">
							<label class="col-md-5">分组名称：</label>
							<s:textfield name="templateAreaVO.groupName" class="col-md-6 ipt"
								maxlength="20" id="groupNameInput" style="width: 164px;">
							</s:textfield>
						</div>

					<!-- 	<input type="hidden" id="strategyGroupIds"
							name="templetVO.groupIds" value=""> -->

					</div>

					<div class="search_btn">
					<input type="button" name="newTem" id="addArea" value="添加"
						class="btn blue-btn" />
							
<!-- 						<button class="btn btn-default primary" type="submit" id="newTem" -->
<!-- 							onclick="">添加</butt	on> -->
						<button class="btn btn-default primary" type="submit" id="delete"
							onclick="">删除</butt	on>
						<button class="btn btn-default primary" type="submit" id="que"
							onclick="query()">查询</button>
						<button class="btn btn-default primary" onclick="funreset()"
							id="J_clearBtn">重置</button>
					</div>	
				</div>

				<div class="table-responsive">
					<table class="table table-hover text-center">
						<thead>
							<tr>
								<th><input class="th_checkbox checkBox" type="checkbox"></th>
								<th><span class="spanCls">分域名称</span></th>
								<th><span class="spanCls">分域状态</span></th>
								<th><span class="spanCls">分组名称</span></th>
								<th><span class="spanCls">分组标识</span></th>
								<th><span class="spanCls">对应用户组</span></th>
								<th><span class="spanCls">用户数量</span></th>
								<th><span class="spanCls">运营商</span></th>
								<th><span class="spanCls">操作</span></th>
							</tr>
						</thead>
						<tbody class="form-body">
							<s:iterator var="vo" value="#request.list" status="sta">
							
				
								<tr>
									<td><input type="checkbox" name="templateAreaVO.ids"
										value="<s:property value="#vo.id"/>" onclick="checkNode(this)"
										statusval="<s:property value="#vo.status"/>" /></td>
									<td title="<s:property value="#vo.name"/>"><s:property
											value="#vo.name" /></td>

									<td title="<s:property value="getStatusName()"/>"><s:property
											value="getStatusName()" /></td>

									<td title="<s:property value="#vo.groupName"/>">
										<s:property value="#vo.groupName" />
									</td>
									
									<td title="<s:property value="#vo.mark"/>">
										<s:property value="#vo.mark" />
									</td>

									<td title="<s:property value="#vo.usersGroup"/>"><s:property
											value="#vo.usersGroup" /></td>
											
									<td title="<s:property value="#vo.usersCount"/>"><s:property
											value="#vo.usersCount" /></td>
											
									<td title="<s:property value="getOperatorName()"/>"><s:property
											value="getOperatorName()" /></td>

								</tr>
							</s:iterator>
						</tbody>

					</table>

					<div class="page center-block">
						<ul>
							<li><input type="hidden" name="AreaVO.pageid" id="page"
								value="<s:property value="#request.pid"/>" /> <input
								type="hidden" name="pages"
								value="<s:property value="#request.pages"/> " />
								<button type="button" class="" onclick="firstpage()">首页</button>
								<button type="button" class="" onclick="backpage()">上一页</button>
								<button type="button" class="" onclick="nextpage()">下一页</button>
								<button type="button" class="" onclick="lastpage()">尾页</button>
								<span>每页显示 <select name="AreaVO.pagecount" id=""
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
					<!-- 选择下发策略 -->
					<div id="j_formAdd" class="form-add">
						<div class="form-add-title" id="select_box">
							<span>请选择下发策略</span>
						</div>
						<div class="main2" style="overflow: auto; height: 158px;">
							<table border="0" cellpadding="0" cellspacing="0" width="100%;">
								<tbody class="form-body" id="preTbody">
								</tbody>
							</table>
						</div>
						<div class="form-submit">
							<input type="button" value="选择" id="j_btnAdd"> <input
								type="button" name="j_hideFormAdd" id="j_hideFormAdd" value="取消" />
						</div>
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
	<script type="text/javascript">
		$('#addArea').click(function() {
			window.location.href = 'templet_showAddArea.do';
		});
		$(function() {
			
			$("#j_btnAdd").on(
					'click',
					function() {
						var strategyIds = new Array();
						$("input[name='strategyIds']:checked").each(function() {
							strategyIds[strategyIds.length] = $(this).val();
						});
						if (strategyIds.length == 0) {
							alert("请选择策略");
							//layer.msg("请选择策略",2,3);
							return false;
						} else {

							$.ajax({
								/* url : 'templet_getDownstreamGroups.do?strategyIds='+ strategyIds, */
								url : 'templet_addGroupStatus.do?strategyIds='
										+ strategyIds + '&templateAreaVO.id='
										+ $("#templateId").val(),
								type : 'post',
								dataType : 'json',
								success : function(data) {
									//console.log(data);
									//$("#strategyDown").val(data.groupNames);
									//$("#strategyGroupIds").val(data.groupListIds);
									alert(data.addGroupResult);
				
									$("#j_formAdd").hide();
									$("#z_mask").hide();
									$(".h_bj").hide();
									window.location
											.replace("templet_search.do")
								}
							})
						}
					});

			$('#j_hideFormAdd').on('click', function() {
				$("#j_formAdd").hide();
				$("#z_mask").hide();
				$(".h_bj").hide();
			})
		})
		
		$('.cancel').on('click', function() {
			layer.closeAll();
		});

		//分页
		function dosearch() {
			/* document.forms[0].page.value = "1";
			document.forms[0].submit(); */

			document.getElementById("page").value = "1";
			document.forms[0].action = "templet_searchArea.do";
			document.forms[0].submit();
		}
		function firstpage() {
			document.forms[0].page.value = 1;
			document.forms[0].action = "templet_searchArea.do";
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
			document.forms[0].action = "templet_searchArea.do";
			document.forms[0].submit();
			return false;
		}
		function nextpage() {
			if (parseInt(document.forms[0].page.value) >= parseInt(document.forms[0].pages.value)) {
				document.forms[0].page.value = document.forms[0].pages.value;
			} else {
				document.forms[0].page.value = parseInt(document.forms[0].page.value) + 1;
			}
			document.forms[0].action = "templet_searchArea.do";
			document.forms[0].submit();
			return false;
		}
		function lastpage() {
			document.forms[0].page.value = document.forms[0].pages.value;
			document.forms[0].action = "templet_searchArea.do";
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
				document.forms[0].action = "templet_searchArea.do";
				document.forms[0].submit();
			} else {
				alert('请输入正整数');
			}
			return false;
		}

		function query() {
			document.getElementById("page").value = "1";
			document.forms[0].action = "templet_searchArea.do";
			document.forms[0].submit();
			return false;
		}

		function funreset() {
			$('#areaNameInput, #groupNameInput,#status').val('');
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
		$(".oper")
				.on(
						"change",
						function() {
							//查看
							if ($("option:selected", this).text() == '查看') {
								window.location.href = "templet_getDetail.do?templetVO.id="
										+ $("option:selected", this).val();
								return false;
							}
							//编辑
							if ($("option:selected", this).text() == '编辑') {
								window.location.href = "templet_getDetail.do?templetVO.id="
										+ $("option:selected", this).val()
										+ "&tip=" + "edit";
								return false;
							}
							//预览
							/* if ($("option:selected", this).text() == '编辑') {
								window.location.href ="C:/Users/44403/Desktop/epgMan/cpsp.html"
							} */
						})
	})
</script>
