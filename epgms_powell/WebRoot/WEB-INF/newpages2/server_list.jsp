<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>服务器管理</title>
<link rel="stylesheet" href="resource/newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="resource/newpages/css/font-awesome.min.css">
<link rel="stylesheet" href="resource/newpages/css/layer.css" />
<link rel="stylesheet" href="resource/newpages/css/common.css">
<link rel="stylesheet" href="resource/newpages/css/cpsp.css">
</head>

<body>
	<div class="container-fluid">
		<main>
			<!--右侧数据(默认)-->
			<div class="" style="height: 600px;">
				<form action="" class="form-inline" method="post">
					<input type="hidden" name="vo.id" id="serverid" value="" />
					<div class="data-search" style="width:75%;">
						<div class="form-group col-md-3">
							<label for="" class="col-md-5">服务器名称</label>
							<s:textfield name="vo.name" id="servername" cssClass="col-md-6"></s:textfield>
						</div>
						<div class="form-group col-md-3">
							<label for="" class="col-md-5">服务器IP</label>
							<s:textfield name="vo.ip" id="serveip" cssClass="col-md-6"></s:textfield>
						</div>
						<div class="form-group col-md-3 ID">
							<label for="" class="col-md-5">服务器分组</label> <select
								name="vo.groupid" id="servegroupid" class="sel col-md-6">
								<option <s:if test='vo.groupid == ""'>selected="selected"</s:if>
									value="">--全部--</option>
								<s:iterator value="#request.grouplist" var="groupvo">
									<option
										<s:if test='#groupvo.id==vo.groupid'>selected="selected"</s:if>
										value="<s:property value="#groupvo.id"/>"><s:property
											value="#groupvo.name" /></option>
								</s:iterator>
							</select>
						</div>
						<div class="form-group col-md-3 ID">
							<label for="" class="col-md-4">状态</label> <select
								name="vo.status" id="servestatus" class="sel col-md-6">
								<option <s:if test='vo.status == ""'>selected="selected"</s:if>
									value="">--全部--</option>
								<option <s:if test='vo.status == "1"'>selected="selected"</s:if>
									value="1">生效</option>
								<option <s:if test='vo.status == "0"'>selected="selected"</s:if>
									value="0">失效</option>
							</select>
						</div>
						<div class="search_btn">
							<input type="button" name="" id="serAdd" class="resetBtn"
								value="添加" onclick="addServer()" /> <input type="button"
								name="" id="que" class="resetBtn" value="查询" onclick="query();" />
							<input type="button" name="" id="resetbtn"
								class="resetBtn resetBtt" value="重置" onclick="funreset();" />
						</div>
					</div>
					<div class="table-responsive">
						<%-- <input type="hidden" name="vo.pageid" id="page" value="<s:property value="#request.pid"/>"/> --%>
						<table class="table table-hover text-center">
							<thead>
								<tr>
									<!-- <th><input class="th_checkbox checkBox" type="checkbox"></th> -->
									<th><span class="spanCls">序号</span></th>
									<th><span class="spanCls">服务器分组</span></th>
									<th><span class="spanCls">服务器名称</span></th>
									<th><span class="spanCls">服务器IP</span></th>
									<th><span class="spanCls">端口</span></th>
									<th><span class="spanCls">存储路径</span></th>
									<th><span class="spanCls">状态</span></th>
									<th><span class="spanCls">操作</span></th>
								</tr>
							</thead>
							<tbody>
								<s:iterator value="#request.list" status="sta" var="vo">
									<tr>
										<td title="<s:property value="#sta.index+1"/>"><span><s:property
													value="#sta.index+1" /></span></td>
										<td title="<s:property value="#vo.groupname"/>"><span><s:property
													value="#vo.groupname" /></span></td>
										<td title="<s:property value="#vo.name"/>"><span><s:property
													value="#vo.name" /></span></td>
										<td title="<s:property value="#vo.ip"/>"><span><s:property
													value="#vo.ip" /></span></td>
										<td title="<s:property value="#vo.port"/>"><span><s:property
													value="#vo.port" /></span></td>
										<td title="<s:property value="#vo.path"/>"><span><s:property
													value="#vo.path" /></span></td>
										<td
											title="<s:if test='#vo.status=="0"'>失效</s:if><s:if test='#vo.status=="1"'>生效</s:if>"><span><s:if
													test='#vo.status=="0"'>失效</s:if>
												<s:if test='#vo.status=="1"'>生效</s:if></span></td>
										<td><select class="oper">
												<option value="">操作</option>
												<option value="<s:property value="#vo.id"/>">编辑</option>
												<option value="<s:property value="#vo.id"/>">删除</option>
										</select></td>
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
									<button type="button" class="pageBtn7"
										style="background-color: #ff7a19;" onclick="jumptoPage()">跳转</button>
								</li>
							</ul>
						</div>
					</div>
				</form>
			</div>
		</main>
	</div>
	<div class="layer confirm" style="display: none">
		<div class="layer-tit"></div>
		<div class="layer-msg layerMsgDel">正在进行删除操作，是否删除？</div>
		<div class="layerButtonsDel"  style="margin: 80px 40px;">
			<input style="color: #FFFFFF;background-color: #FF7A19;margin-left:90px;" type="button" class="btn blue-btn" value="确认"
				onclick="funDeleteServer()" id="sure" /> 
			<input style="color: #FFFFFF;background-color: #FF7A19;" type="button"
				class="btn blue-btn cancel" value="取消"
				onclick="funcancelDeleteServer()" id="no" />
		</div>
	</div>
	<script src="resource/newpages/js/jquery-3.2.1.min.js"></script>
	<script src="resource/newpages/js/bootstrap.min.js"></script>
	<script src="resource/newpages/js/common.js"></script>
	<script src="resource/newpages/js/layer.min.js"></script>
	<script type="text/javascript">
		/**查询*/
		function dosearch() {
			document.getElementById("page").value = "1";
			document.forms[0].action = "serversManage_search.do";
			document.forms[0].submit();
		}
		function firstpage() {
			document.forms[0].page.value = 1;
			document.forms[0].action = "serversManage_search.do";
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
			document.forms[0].action = "serversManage_search.do";
			document.forms[0].submit();
			return false;
		}
		function nextpage() {
			if (parseInt(document.forms[0].page.value) >= parseInt(document.forms[0].pages.value)) {
				document.forms[0].page.value = document.forms[0].pages.value;
			} else {
				document.forms[0].page.value = parseInt(document.forms[0].page.value) + 1;
			}
			document.forms[0].action = "serversManage_search.do";
			document.forms[0].submit();
			return false;
		}
		function lastpage() {
			document.forms[0].page.value = document.forms[0].pages.value;
			document.forms[0].action = "serversManage_search.do";
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
				document.forms[0].action = "serversManage_search.do";
				document.forms[0].submit();
			} else {
				alert('请输入正整数');
			}
			return false;
		}
		function query() {
			document.getElementById("page").value = "1";
			document.forms[0].action = "serversManage_search.do";
			document.forms[0].submit();
			return false;
		}
		function funreset() {
			$('#servername, #serveip, #servegroupid, #servestatus').val('');
			return false;
		}
		function addServer() {
			document.forms[0].action = "serversManage_addPage.do";
			document.forms[0].submit();
			return false;
		}
		function funDeleteServer() {
			document.forms[0].action = "serversManage_delete.do";
			document.forms[0].submit();
		}
		function funcancelDeleteServer() {
			layer.closeAll();
		}
	</script>
</body>

</html>
<script>
	$(function() {

		$(".oper").on("change", function() {
			//编辑
			if ($("option:selected", this).text() == '编辑') {
				console.log($("option:selected", this).val());
				$("#serverid").attr("value", $("option:selected", this).val());
				document.forms[0].action = "serversManage_editPage.do";
				document.forms[0].submit();
				return false;
			}
			//删除
			if ($("option:selected", this).text() == '删除') {
				console.log($("option:selected", this).val());
				$("#serverid").attr("value", $("option:selected", this).val());
				$(this).get(0).selectedIndex = 0;
				$.layer({
					type : 1, //0-4的选择,
					shade : [ 0.6, '#000', true ],
					title : false,
					border : [ 0 ],
					closeBtn : [ 0 ],
					shadeClose : true,
					area : [ '450px', '280px' ],
					page : {
						dom : ".confirm"
					}
				});
				/* 	document.forms[0].action = "serversManage_delete.do";
				document.forms[0].submit(); */
			}
		})
	})

	
</script>