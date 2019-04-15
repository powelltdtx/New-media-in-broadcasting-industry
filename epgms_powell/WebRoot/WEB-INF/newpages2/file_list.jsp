<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>文件管理</title>
<link rel="stylesheet" href="resource/newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="resource/newpages/css/font-awesome.min.css">
<link rel="stylesheet"
	href="resource/newpages/layDate/laydate/theme/default/laydate.css">
<link rel="stylesheet" href="resource/newpages/css/common.css">
<link rel="stylesheet" href="resource/newpages/css/cpsp.css">
</head>
<style>
	.table > thead > tr > th:nth-child(2) > span{
		text-align: center;
		display: block;
		width: 72px !important;
	}
</style>
<body>
	<div class="container-fluid">
		<!--主内容部分-->
		<main>
			<!--右侧数据(默认)-->
			<div class="data data_table navbar-left dataDefault">
				<form action="fileManage_search.do" class="form-inline"
					method="post">
					<div class="data-search" style="width: 100%;">
						<div class="form-group col-md-3 ID">
							<label for="" class="col-md-4">服务器分组：</label>
							<s:textfield name="vo.group_name" cssClass="col-md-7"
								id="groupname"></s:textfield>
						</div>
						<div class="form-group col-md-3 ID">
							<label for="" class="col-md-4">服务器名称：</label>
							<s:textfield name="vo.server_name" cssClass="col-md-7"
								id="servername"></s:textfield>
						</div>

						<div class="form-group col-md-3 ID">
							<label for="" class="col-md-4">服务器IP：</label>
							<s:textfield name="vo.server_ip" cssClass="col-md-7"
								id="serverip"></s:textfield>
						</div>
						<div class="form-group col-md-3">
							<label for="" class="col-md-4">文件类别：</label> <select
								name="vo.filetype" class="col-md-7" id="filetype">
								<option <s:if test='vo.filetype==""'>selected="selected"</s:if>
									value="">--全部--</option>
								<option <s:if test='vo.filetype=="1"'>selected="selected"</s:if>
									value="1">分类列表</option>
								<option <s:if test='vo.filetype=="2"'>selected="selected"</s:if>
									value="2">节目列表</option>
								<option <s:if test='vo.filetype=="3"'>selected="selected"</s:if>
									value="3">节目详情</option>
								<option <s:if test='vo.filetype=="4"'>selected="selected"</s:if>
									value="4">频道列表</option>
								<option <s:if test='vo.filetype=="5"'>selected="selected"</s:if>
									value="5">广告</option>
							</select>
						</div>
						<div class="form-group col-md-3">
							<label for="" class="col-md-4">文件名称：</label>
							<s:textfield name="vo.name" cssClass="col-md-7" id="filename"></s:textfield>
						</div>

						<div class="form-group col-md-3 ID">
							<label for="" class="col-md-4">下发状态：</label> <select
								name="vo.status" class="col-md-7" id="status">
								<option <s:if test='vo.status==""'>selected="selected"</s:if>
									value="">--全部--</option>
								<option <s:if test='vo.status=="0"'>selected="selected"</s:if>
									value="0">下发等待</option>
								<option <s:if test='vo.status=="1"'>selected="selected"</s:if>
									value="1">下发中</option>
								<option <s:if test='vo.status=="2"'>selected="selected"</s:if>
									value="2">下发成功</option>
								<option <s:if test='vo.status=="-1"'>selected="selected"</s:if>
									value="-1">下发失败</option>
								<option <s:if test='vo.status=="3"'>selected="selected"</s:if>
									value="3">等待删除</option>
								<option <s:if test='vo.status=="4"'>selected="selected"</s:if>
									value="4">删除中</option>
								<option <s:if test='vo.status=="5"'>selected="selected"</s:if>
									value="5">删除成功</option>
								<option <s:if test='vo.status=="-2"'>selected="selected"</s:if>
									value="-2">删除失败</option>
							</select>
						</div>
						<div class="form-group col-md-3 timeSearch">
							<label for="" class="col-md-4">起始时间：</label>
							<s:textfield name="vo.startDate" id="bTime" cssClass="time col-md-7"></s:textfield>
						</div>
						<div class="form-group col-md-3 timeSearch">
							<label for="" class="col-md-4">结束时间：</label>
							<s:textfield name="vo.toDate" id="eTime" cssClass="time col-md-7"></s:textfield>
						</div>
					</div>

					<div class="search_btn">

						<input type="button" name="" id="que" class="resetBtn" value="查询"
							onclick="query();" /> <input type="button" name="" id="reset"
							class="resetBtn" value="重置" onclick="funreset();" /> <input
							type="button" name="" id="issue" class="resetBtn" value="重新下发"
							onclick="funissue();" />
					</div>

					<div class="table-responsive">
						<table class="table table-hover text-center">
							<thead>
								<tr>
									<th><input class="th_checkbox checkBox" type="checkbox"></th>
									<th><span class="spanCls">服务器分组</span></th>
									<th><span class="spanCls">服务器名称</span></th>
									<th><span class="spanCls">服务器IP</span></th>
									<th><span class="spanCls">文件类别</span></th>
									<th><span class="spanCls">内容路径</span></th>
									<th><span class="spanCls">文件名称</span></th>
									<th><span class="spanCls">下发状态</span></th>
									<th><span class="spanCls">下发时间</span></th>
								</tr>
							</thead>
							<tbody>
								<s:iterator value="#request.list" var="vo">
									<tr <s:if test='#vo.status=="-2"'>bgcolor="red"</s:if>
										<s:if test='#vo.status=="-1"'>bgcolor="red"</s:if>>
										<td><input class="tbody_checkbox checkBox" name="vo.ids"
											statusval="<s:property value="#vo.status"/>"
											value="<s:property value="#vo.code"/>" type="checkbox">
										</td>
										<td title="<s:property value="#vo.group_name"/>"><span><s:property
													value="#vo.group_name" /></span></td>
										<td title="<s:property value="#vo.server_name"/>"><span><s:property
													value="#vo.server_name" /></span></td>
										<td title="<s:property value="#vo.server_ip"/>"><span><s:property
													value="#vo.server_ip" /></span></td>
										<td
											title="<s:if test='#vo.filetype=="1"'>分类列表</s:if><s:if test='#vo.filetype=="2"'>节目列表</s:if><s:if test='#vo.filetype=="3"'>节目详情</s:if><s:if test='#vo.filetype=="4"'>频道列表</s:if><s:if test='#vo.filetype=="5"'>广告  </s:if>"><span><s:if
													test='#vo.filetype=="1"'>分类列表</s:if> <s:if
													test='#vo.filetype=="2"'>节目列表</s:if> <s:if
													test='#vo.filetype=="3"'>节目详情</s:if> <s:if
													test='#vo.filetype=="4"'>频道列表</s:if> <s:if
													test='#vo.filetype=="5"'>广告  </s:if></span></td>
										<td title="<s:property value="#vo.contentpath"/>" width="20"
											style="overflow: hidden;"><span><s:property
													value="#vo.contentpath" /></span></td>
										<td
											title="<s:property value="#vo.path"/><s:property value="#vo.name"/>"><span><s:property
													value="#vo.name" /></span></td>
										<td
											title="<s:if test='#vo.status=="-2"'>删除失败</s:if><s:if test='#vo.status=="-1"'>下发失败</s:if><s:if test='#vo.status=="0"'>下发等待</s:if><s:if test='#vo.status=="1"'>下发中</s:if><s:if test='#vo.status=="2"'>下发完成</s:if><s:if test='#vo.status=="3"'>等待删除</s:if><s:if test='#vo.status=="4"'>删除中</s:if><s:if test='#vo.status=="5"'>删除成功</s:if>"><span><s:if
													test='#vo.status=="-2"'>删除失败</s:if> <s:if
													test='#vo.status=="-1"'>下发失败</s:if> <s:if
													test='#vo.status=="0"'>下发等待</s:if> <s:if
													test='#vo.status=="1"'>下发中</s:if> <s:if
													test='#vo.status=="2"'>下发完成</s:if> <s:if
													test='#vo.status=="3"'>等待删除</s:if> <s:if
													test='#vo.status=="4"'>删除中</s:if> <s:if
													test='#vo.status=="5"'>删除成功</s:if></span></td>
										<td title="<s:property value="#vo.issuetime"/>"><span><s:property
													value="#vo.issuetime" /></span></td>
									</tr>
								</s:iterator>
							</tbody>
						</table>
						<div class="page center-block">
							<ul>
								<li><input type="hidden" name="vo.pageid" id="page"
									value="<s:property value="#request.pid"/>" /> <input
									type="hidden" name="pages"
									value="<s:property value="#request.pages"/> " />
									<button type="button" class="" onclick="firstpage()">首页</button>
									<button type="button" class="" onclick="backpage()">上一页</button>
									<button type="button" class="" onclick="nextpage()">下一页</button>
									<button type="button" class="" onclick="lastpage()">尾页</button>
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
									<button type="button" class="pageBtn3"
										style="background-color: #ff7a19;" onclick="jumptoPage()">跳转</button>
								</li>
							</ul>
						</div>
					</div>
				</form>
			</div>
		</main>
	</div>
	<script src="resource/newpages/js/jquery-3.2.1.min.js"></script>
	<script src="resource/newpages/js/bootstrap.min.js"></script>
	<script src="resource/newpages/layDate/laydate/laydate.js"></script>
	<script src="resource/newpages/js/common.js"></script>
	<script type="text/javascript">
		/**查询*/
		function dosearch() {
			document.getElementById("page").value = "1";
			document.forms[0].action = "fileManage_search.do";
			document.forms[0].submit();
		}
		function firstpage() {
			document.forms[0].page.value = 1;
			document.forms[0].action = "fileManage_search.do";
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
			document.forms[0].action = "fileManage_search.do";
			document.forms[0].submit();
			return false;
		}
		function nextpage() {
			if (parseInt(document.forms[0].page.value) >= parseInt(document.forms[0].pages.value)) {
				document.forms[0].page.value = document.forms[0].pages.value;
			} else {
				document.forms[0].page.value = parseInt(document.forms[0].page.value) + 1;
			}
			document.forms[0].action = "fileManage_search.do";
			document.forms[0].submit();
			return false;
		}
		function lastpage() {
			document.forms[0].page.value = document.forms[0].pages.value;
			document.forms[0].action = "fileManage_search.do";
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
				document.forms[0].action = "fileManage_search.do";
				document.forms[0].submit();
			} else {
				alert('请输入正整数');
			}
			return false;
		}
		function query() {
			document.getElementById("page").value = "1";
			document.forms[0].action = "fileManage_search.do";
			document.forms[0].submit();
			return false;
		}
		function funreset() {
			$(
					'#groupname, #servername, #serverip, #filetype, #filename, #status, #bTime, #eTime')
					.val('');
			return false;
		}
		function funissue() {
			var strIds = new Array();
			var num = 0;
			$("input[name='vo.ids']:checked").each(
					function() {
						if ($(this).attr("statusval") == '-1'
								|| $(this).attr("statusval") == '-2') {
							strIds[strIds.length] = $(this).val();
						} else {
							alert("请选择下发失败的进行重新下发！");
							num += 1;
							return false;
						}
					});
			if (strIds.length > 0 && num == 0) {
				document.forms[0].action = "fileManage_resumeIssue.do";
				document.forms[0].submit();
				return false;
			}
		}
	</script>
</body>

</html>
<script>
	//执行一个laydate实例
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