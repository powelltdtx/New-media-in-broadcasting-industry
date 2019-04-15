<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>角色管理</title>
<link rel="stylesheet" href="resource/newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="resource/newpages/css/font-awesome.min.css">
<link rel="stylesheet" href="resource/newpages/css/layer.css" />
<link rel="stylesheet" href="resource/newpages/css/common.css">
<link rel="stylesheet" href="resource/newpages/css/cpsp.css" />
<link rel="stylesheet" href="resource/newpages/css/mangerUse.css" />
</head>

<body>
	<div class="container-fluid">
		<!--主内容部分-->
		<main>
			<form action="role_searchAllRoles.do" class="form-inline"
				method="post">
				<!--右侧数据(默认)-->
				<div class="data data_table navbar-left dataDefault">
					<div class="data-search" style="width:75%;height: 65px;">
						<div class="search_btn">
							<input type="button" name="newTem" id="newRole" value="新增"
								class="btn blue-btn"
								onclick="window.location.href='role!searchAllMenuAndbtn.action'" />
						</div>
					</div>
					<div class="table-responsive">
						<table class="table table-hover text-center">
							<thead>
								<tr>
									<th><span class="spanCls">角色名称</span></th>
									<th><span class="spanCls">备注信息</span></th>
									<th><span class="spanCls">操作</span></th>
								</tr>
							</thead>
							<tbody>
								<s:iterator var="vo" value="#request.list">
									<tr>
										<td title="<s:property value="#vo.name"/>"><s:property
												value="#vo.name" /></td>
										<td title="<s:property value="#vo.remark"/>"><s:property
												value="#vo.remark" /></td>
										<td><select name="" class="oper">
												<option value="">操作</option>
												<option value="<s:property value="#vo.id"/>">编辑/查看</option>
												<option value="<s:property value="#vo.id"/>">删除</option>
										</select></td>
									</tr>
								</s:iterator>
							</tbody>
						</table>
						<div class="page center-block">
							<ul>
								<li><input type="hidden" name="vo.pageid" id="page"
									value="<s:property value="#request.pid"/> " /> <input
									type="hidden" name="pages"
									value="<s:property value="#request.pages"/> " />
									<button type="button"
										<s:if test="request.pid>1">onclick="firstpage()"</s:if>
										style="<s:if test="request.pid==1">cursor:text;</s:if> text-decoration: none;"
										class="">首页</button>
									<button type="button"
										<s:if test="request.pid>1">onclick="backpage()"</s:if>
										style="<s:if test="request.pid==1">cursor:text;</s:if> text-decoration: none;">上一页</button>
									<button type="button"
										<s:if test="request.pid!=request.pages"> onclick="nextpage()"</s:if>
										style="<s:if test="request.pid==request.pages">cursor:text;</s:if> text-decoration: none;">下一页</button>
									<button type="button"
										<s:if test="request.pid!=request.pages">onclick="lastpage()"</s:if>
										style="<s:if test="request.pid==request.pages">cursor:text;</s:if> text-decoration: none;">尾页</button>
									<span>每页显示 <select name="vo.pagecount" id=""
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
									<button type="button" class="pageBtn8"
										style="background-color: #ff7a19;" onclick="jumptoPage()">跳转</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</form>
		</main>
	</div>
	<div class="layer confirm" style="display: none">
		<div class="layer-tit"></div>
		<div class="layer-msg layerMsgDel">正在进行角色删除操作，角色已被用户使用，无法被删除。</div>
		<div class="layerButtonsDel">
			<input type="button" class="btn blue-btn" value="确认"
				onclick="closeLayer()" />
		</div>
	</div>
	<div class="layer alert-suc" style="display: none">
		<div class="layer-msg operTit">
			<span>操作成功！</span>
		</div>
	</div>
	<div class="layer alert-fail" style="display: none">
		<div class="layer-msg operTit">
			<span>操作失败！</span>
		</div>
	</div>
	<!-- 遮罩层  -->
	<!--灰背景-->
	<div class="h_bj"></div>
	<!--loading-->
	<div class="loading">
		<img src="resource/img/admin/loading.gif" />
	</div>
	<script src="resource/newpages/js/jquery-3.2.1.min.js"></script>
	<script src="resource/newpages/js/bootstrap.min.js"></script>
	<script src="resource/newpages/js/mangerUse.js"></script>
	<script src="resource/newpages/js/common.js"></script>
	<script src="resource/newpages/js/layer.min.js"></script>
	<script type="text/javascript">
		/**查询*/
		function dosearch() {
			document.getElementById("page").value = "1";
			document.forms[0].submit();
		}
		function firstpage() {
			document.forms[0].page.value = 1;
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
			document.forms[0].submit();
			return false;
		}
		function nextpage() {
			if (parseInt(document.forms[0].page.value) >= parseInt(document.forms[0].pages.value)) {
				document.forms[0].page.value = document.forms[0].pages.value;
			} else {
				document.forms[0].page.value = parseInt(document.forms[0].page.value) + 1;
			}
			document.forms[0].submit();
			return false;
		}
		function lastpage() {
			document.forms[0].page.value = document.forms[0].pages.value;
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
				document.forms[0].submit();
			} else {
				alert('请输入正整数');
			}
			return false;
		}
		function closeLayer() {
			layer.closeAll();
		}
		function init() {
			if ('1' == '<s:property value="doFlag"/>') {
				alertSuc();
			} else if ('2' == '<s:property value="doFlag"/>') {
				alertFail();
			}
		}
		function alertSuc() {
			$.layer({
				type : 1, //0-4的选择,
				shade : [ 0.6, '#000', true ],
				title : false,
				time : 2,
				border : [ 0 ],
				closeBtn : [ 0 ],
				shadeClose : true,
				area : [ '450px', '280px' ],
				page : {
					dom : ".alert-suc"
				}
			});
		}
		function alertFail() {
			$.layer({
				type : 1, //0-4的选择,
				shade : [ 0.6, '#000', true ],
				title : false,
				time : 2,
				border : [ 0 ],
				closeBtn : [ 0 ],
				shadeClose : true,
				area : [ '450px', '280px' ],
				page : {
					dom : ".alert-fail"
				}
			});
		}
	</script>
</body>

</html>
<script>
	$(function() {

		$(".oper").on(
				"change",
				function() {
					//编辑
					if ($("option:selected", this).text() == '编辑/查看') {
						console.log($("option:selected", this).val());
						window.location.href = "role!toEditRole.action?vo.id="
								+ $("option:selected", this).val()
								+ "&menuVO.id="
								+ $("option:selected", this).val();
						return false;
					}
					//删除
					if ($("option:selected", this).text() == '删除') {
						console.log($("option:selected", this).val());
						var id = $("option:selected", this).val();
						$(this).get(0).selectedIndex = 0;
						$.post("role_checkRole.do", {
							roleid : id
						}, function(data) {
							if (null != data && data != "0") {
								//弹出窗体
								$.layer({
									type : 1, //0-4的选择,
									shade : [ 0.6, '#000', true ],
									title : false,
									border : [ 0 ],
									closeBtn : [ 0 ],
									shadeClose : false,
									area : [ '450px', '280px' ],
									page : {
										dom : ".confirm"
									}
								});
								return false;
							} else {

								if (!confirm("确定进行角色删除操作吗？删除后，该角色不可用，确认删除吗？")) {
									return false;
								}
								$(".h_bj").show();
								$(".loading").show();
								window.location.href = 'role_delRole.do?vo.id='
										+ id;
							}
						}, "text");
						/* 	document.forms[0].action = "serversManage_delete.do";
						document.forms[0].submit(); */
					}
				})
	});

	
</script>