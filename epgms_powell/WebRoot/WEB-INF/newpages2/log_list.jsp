<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>操作日志</title>
<link rel="stylesheet" href="resource/newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="resource/newpages/css/font-awesome.min.css">
<link rel="stylesheet"
	href="resource/newpages/layDate/laydate/theme/default/laydate.css">
<link rel="stylesheet" href="resource/newpages/css/common.css">
<link rel="stylesheet" href="resource/newpages/css/cpsp.css">
</head>

<body onload="init()">
	<div class="container-fluid">
		<!--主内容部分-->
		<main>	
			<form action="operationLog_search.do" method="post"
				class="form-inline">
				<!--右侧数据(默认)-->
				<div class="data data_table navbar-left dataDefault">
					<div class="data-search" style="width:75%;">
						<div class="form-group col-md-6">
							<label for="" class="col-md-5">用户名</label>
							<s:textfield name="operationLog.username" cssClass="col-md-6"
								maxlength="20" style="width: 226px;" id="idInput" />
							<input type="hidden" name="usernameforecxel"
								id="usernameforecxel" value="" />
						</div>
						<div class="form-group col-md-6 ID">
							<label for="" class="time">时间</label>
							<s:textfield name="operationLog.startDate" maxlength="20"
								id="bTime" cssClass="ipt date-icon"></s:textfield>
							<input type="hidden" name="startDateforecxel"
								id="startDateforecxel" value="" /> <span>-</span>
							<s:textfield name="operationLog.toDate" maxlength="20" id="eTime"
								cssClass="ipt date-icon"></s:textfield>
							<input type="hidden" name="toDateforecxel" id="toDateforecxel"
								value="" />
						</div>
						<div class="search_btn">
							<input type="button" name="" id="que" class="resetBtn" value="查询"
								onclick="dosearch()" /> <input type="button" name=""
								class="resetBtn" value="重置" id="J_clearBtn" />
							<s:if test="#request.list==null||#request.list.size()==0">
								<input type="button" name="" class="resetBtn resetBtt"
									value="下载" id="export" onclick="doexport()" disabled="disabled" />
							</s:if>
							<s:if test="#request.list.size()!=0">
								<input type="button" name="" class="resetBtn resetBtt"
									value="下载" id="export" onclick="doexport()" />
							</s:if>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table table-hover text-center">
							<thead>
								<tr>
									<th><span class="spanCls">序号</span></th>
									<th><span class="spanCls">用户名</span></th>
									<th><span class="spanCls">操作类型</span></th>
									<th><span class="spanCls">时间</span></th>
									<th><span class="spanCls">操作详情</span></th>

								</tr>
							</thead>
							<tbody>
								<s:iterator value="#request.list" status="sta" var="vo">
									<tr>
										<td title="<s:property value="#sta.index+1"/>"><span><s:property
													value="#sta.index+1" /></span></td>
										<td title="<s:property value="#vo.username"/>"><span><s:property
													value="#vo.username" /></span></td>
										<td title="<s:property value="#vo.moduleDesc"/>"><span><s:property
													value="#vo.moduleDesc" /></span></td>
										<td title="<s:property value="#vo.date"/>"><span><s:property
													value="#vo.date" /></span></td>
										<td><span>在 <s:property value="#vo.time" /> 对 <s:property
													value="#vo.moduleDesc" /> 执行 <s:property
													value="#vo.optdesc" /> 操作
										</span></td>

									</tr>
								</s:iterator>
							</tbody>
						</table>
						<div class="page center-block">
							<ul>
								<li><input type="hidden" name="operationLog.pageid"
									id="page" value="<s:property value="#request.pid"/> " /> <input
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
									<span>每页显示 <select name="operationLog.pagecount" id=""
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
	<script src="resource/newpages/js/jquery-3.2.1.min.js"></script>
	<script src="resource/newpages/js/bootstrap.min.js"></script>
	<script src="resource/newpages/layDate/laydate/laydate.js"></script>
	<script src="resource/newpages/js/common.js"></script>
	<script src="resource/newpages/js/mangerUse.js"></script>
	<script>
		$('#J_clearBtn').click(function() {
			$('#idInput, #bTime,#eTime').val('');
		});
		function init() {
			$("#usernameforecxel")
					.val(document.getElementById("idInput").value);
			$("#startDateforecxel").val(document.getElementById("bTime").value);
			$("#toDateforecxel").val(document.getElementById("eTime").value);
		}
		/**查询*/
		function dosearch() {
			document.getElementById("page").value = "1";
			document.forms[0].submit();
		}
		/**导出*/
		function doexport() {
			document.forms[0].action = "operationLog!exportLog.action";
			document.forms[0].submit();
			document.forms[0].action = "operationLog_search.do";
			return false;
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