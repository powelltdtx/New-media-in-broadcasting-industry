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
<title>预警监控</title>
<link rel="stylesheet" href="newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="newpages/css/font-awesome.min.css">
<link rel="stylesheet" href="newpages/css/common.css">
<link rel="stylesheet" href="newpages/css/cpsp.css">
<link rel="stylesheet" href="newpages/css/layer.css" />
</head>
<body>
	<div class="container-fluid">

		<!--主内容部分-->
		<main>
		<form action="heartBeat_search.do" method="post" class="form-inline">
			<div class="data data_table navbar-left dataDefault">
				<div class="data-search" style="width: 100%;">
					<div class="form-group col-md-2">
						<label for="" class="col-md-3">分组</label>
						<s:textfield name="heartBeatVO.serverGroup" class="col-md-8"
							maxlength="30" id="serverGroup">
						</s:textfield>
					</div>
					<div class="form-group col-md-3 ID">
						<label for="" class="col-md-3">类别</label>
						<s:select name="heartBeatVO.type" class="cate sel col-md-8"
							list="#{'文件服务器':'文件服务器','EPG服务器':'EPG服务器'}" id="type"
							headerKey="" headerValue="--全部--">
						</s:select>
					</div>
					<div class="form-group col-md-2 ID">
						<label for="" class="col-md-2">IP</label>
						<s:textfield name="heartBeatVO.ip" class="col-md-8" maxlength="30"
							id="ip">
						</s:textfield>

					</div>
					<div class="form-group col-md-2 ID">
						<label for="" class="col-md-3">名称</label>
						<s:textfield name="heartBeatVO.serverName" class="col-md-8"
							maxlength="30" id="serverName">
						</s:textfield>

					</div>
					<div class="form-group col-md-3 ID">
						<label for="" class="col-md-2">状态</label>
						<s:select name="heartBeatVO.status" id="status"
							class="sels col-md-6" list="#{'正常':'正常','异常':'异常','关闭','关闭'}"
							headerKey="" headerValue="--全部--">
						</s:select>
					</div>
					<div class="search_btn">
						<button class="btn btn-default primary" onclick="query()"
							type="submit" id="que">查询</button>

						<input type="button" name="" id="" class="resetBtn" value="添加" />
						<button class="btn btn-default primary" onclick="funreset()"
							id="J_clearBtn">重置</button>
						<input type="button" name="" id="del" class="resetBtn" value="删除" />
					</div>

				</div>
				<div class="table-responsive">
					<table class="table table-hover text-center">
						<thead>
							<tr>
								<th><input class="th_checkbox checkBox" type="checkbox"></th>
								<th><span class="spanCls">分组</span></th>
								<th><span class="spanCls">类别</span></th>
								<th><span class="spanCls">IP</span></th>
								<th><span class="spanCls">名称</span></th>
								<th><span class="spanCls">状态</span></th>
								<th><span class="spanCls">时间</span></th>
								<th><span class="spanCls">处理</span></th>
								<th><span class="spanCls">操作</span></th>
							</tr>
						</thead>

						<tbody class="form-body">
							<s:iterator var="vo" value="#request.list" status="sta">
								<tr>
									<th><input class="th_checkbox checkBox" type="checkbox"
										name="vo.ids"></th>

									<td style="display: none" title="<s:property value="#vo.id"/>"><s:property
											value="#vo.id" /></td>

									<td title="<s:property value="#vo.serverGroup"/>"><s:property
											value="#vo.serverGroup" /></td>
									<td title="<s:property value="#vo.type"/>"><s:property
											value="#vo.type" /></td>
									<td title="<s:property value="#vo.ip"/>"><s:property
											value="#vo.ip" /></td>
									<td title="<s:property value="#vo.serverName"/>"><s:property
											value="#vo.serverName" /></td>
									<td title="<s:property value="#vo.status"/>"><s:property
											value="#vo.status" /></td>
									<td title="<s:property value="#vo.checkTime"/>"><s:property
											value="#vo.checkTime" /></td>
									<td title="<s:property value="#vo.handleResult"/>"><s:property
											value="#vo.handleResult" /></td>
									<td><select name="" class="oper" id="selected">
											<option value="">操作</option>
											<option value="<s:property value="#vo.id"/>">开启</option>
											<option value="<s:property value="#vo.id"/>">关闭</option>
									</select></td>

								</tr>
							</s:iterator>
						</tbody>
					</table>
					<div class="page center-block">
						<ul>
							<li><input type="hidden" name="heartBeatVO.pageid" id="page"
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
		</form>
	</div>
	</div>


	<input type="hidden" id="voId" value="" />
	
	<div class="layer confirm" id="confirm" style="display: none">
		<div class="layer-tit"></div>
		<div class="layer-msg">正在进行删除操作 ，是否确认删除？</div>
		<div class="buttons">
			<input type="button" class="btn blue-btn" value="确认"
				onclick="goSub()" /> <input type="button"
				class="btn blue-btn cancel" value="取消" />
		</div>
	</div>
	<div class="layer confirm" id="close" style="display: none">
		<div class="layer-tit"></div>
		<div class="layer-msg">正在进行关闭操作 ，是否确认关闭？</div>
		<div class="buttons">
			<input type="button" class="btn blue-btn" value="确认"
				onclick="goSub()" /> <input type="button"
				class="btn blue-btn cancel" value="取消" />
		</div>
	</div>
	</main>
	</div>
	<script src="newpages/js/jquery-3.js"></script>
	<script src="newpages/js/bootstrap.js"></script>
	<script src="newpages/js/common.js"></script>
	<script src="newpages/js/layer.js"></script>
</body>
</html>
<script>
	/**删除*/
	$("#del").on('click', function() {
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
	//关闭
	//关闭操作
	$(".oper").on("change", function() {
		if ($("option:selected", this).text() == '关闭') {
			
			$("#voId").attr("value",$("option:selected", this).val());
			$.layer({
				type : 1, //0-4的选择,
				shade : [ 0.6, '#000', true ],
				title : false,
				border : [ 0 ],
				closeBtn : [ 0 ],
				shadeClose : true,
				area : [ '450px', '280px' ],
				page : {
					dom : "#close"
				}
			});
		}
	});
	$('.cancel').on('click', function() {
		layer.closeAll();
	});

	function dosearch() {
		/* document.forms[0].page.value = "1";
		document.forms[0].submit(); */

		document.getElementById("page").value = "1";
		document.forms[0].action = "heartBeat_search.do";
		document.forms[0].submit();
	}
	function firstpage() {
		document.forms[0].page.value = 1;
		document.forms[0].action = "heartBeat_search.do";
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
		document.forms[0].action = "heartBeat_search.do";
		document.forms[0].submit();
		return false;
	}
	function nextpage() {
		if (parseInt(document.forms[0].page.value) >= parseInt(document.forms[0].pages.value)) {
			document.forms[0].page.value = document.forms[0].pages.value;
		} else {
			document.forms[0].page.value = parseInt(document.forms[0].page.value) + 1;
		}
		document.forms[0].action = "heartBeat_search.do";
		document.forms[0].submit();
		return false;
	}
	function lastpage() {
		document.forms[0].page.value = document.forms[0].pages.value;
		document.forms[0].action = "heartBeat_search.do";
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
			document.forms[0].action = "heartBeat_search.do";
			document.forms[0].submit();
		} else {
			alert('请输入正整数');
		}
		return false;
	}

	function query() {
		document.getElementById("page").value = "1";
		document.forms[0].action = "heartBeat_search.do";
		document.forms[0].submit();
		return false;
	}

	function funreset() {
		$('#serverGroup,#type,#ip,#serverName,#status').val('');
		return false;
	}
	
	function goSub(){
		layer.closeAll();
		$("#h_bj1").show();
		$(".loading").show();
		//var id=$('#selected option:selected').val();
		var id=$("#voId").val();
		alert(id);
		document.getElementById("page").value = "1";
		document.forms[0].action = "heartBeat_closeServer.do?heartBeatVO.id="+id;
		document.forms[0].submit();
		
	}
</script>
