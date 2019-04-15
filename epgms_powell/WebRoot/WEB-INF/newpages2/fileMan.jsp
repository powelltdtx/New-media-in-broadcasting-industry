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
<title>文件监控</title>
<link rel="stylesheet" href="resource/newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="resource/newpages/css/font-awesome.min.css">
<link rel="stylesheet"
	href="resource/newpages/layDate/laydate/theme/default/laydate.css">
<link rel="stylesheet" href="resource/newpages/css/common.css">
<link rel="stylesheet" href="resource/newpages/css/cpsp.css">

    <style type="text/css">
        td
        {
            white-space: nowrap;
        }
    </style>
</head>
<body>
	<div class="container-fluid">
		<!--主内容部分-->
		<main>
		<div class="data data_table navbar-left dataDefault" style="height: 651px;">
			<div class="data-search" style="width: 100%;">
				<form action="fileGuard_search.do" method="post" class="form-inline">

					<input type="hidden" id="guardId" name=guardVO.id value="">
					<div class="form-group col-md-3">
						<label for="" class="col-md-6">服务器分类</label>
						<!--<input type="text" class="col-md-6">-->
						<select name="" id="" class="cate">
							<option value="">--全部--</option>
							<option value="">EPG服务器</option>
							<option value="">文件服务器</option>
						</select>
					</div>
					<div class="form-group col-md-3 ID">
						<label for="" class="col-md-5">篡改类型</label>
						<s:select name="guardVO.tamperMode" class="col-md-6 ipt" 
								  list="#{'删除':'删除','修改':'修改','新增':'新增'}"  id="tamperMode"  headerKey="" headerValue="--全部--"/>
					</div>

					<div class="form-group col-md-3 ID">
						<label for="" class="col-md-3">处理方式</label> 
						<s:select name="guardVO.handleMode" class="col-md-6 ipt" 
								  list="#{'恢复':'恢复','还原':'还原','删除':'删除'}"  id="handleMode"  headerKey="" headerValue="--全部--"/>

					</div>
					<div class="form-group col-md-3 ID">
						<label for="" class="col-md-3">状态</label> 
						<s:select name="guardVO.handleResult" class="col-md-6 ipt" 
								  list="#{'已处理':'已处理','未处理':'未处理'}"  id="handleResult"  headerKey="" headerValue="--全部--"/>
					</div>

					<div class="form-group col-md-3 ID">
						<label for="" class="col-md-4">服务器名称</label> 
						<s:textfield name="guardVO.serverName" class="col-md-6 ipt" maxlength="50"
								id="serverNameInput" >
						</s:textfield>
					</div>
					<div class="form-group col-md-3 ID">
						<label for="" class="col-md-5">服务器IP</label> 
						<s:textfield name="guardVO.ip" class="col-md-6 ipt" maxlength="20"
								id="ipInput" >
						</s:textfield>
					</div>

					<!--<div class="search_btn col-md-4">
						时间：
						<input type="text" class="time" name="guardVO.begintime" id="bTime" /> - 
						<input type="text" class="time" name="guardVO.endtime" id="eTime" />
						<button class="btn btn-default primary" onclick="query()" type="submit" id="que">查询</button>
					</div> -->
					
					<div class="search_btn col-md-6">
						<label class="">时间：</label>
						<s:textfield name="guardVO.begintime" maxlength="20" id="bTime"
							class="date-icon iptTime">
						</s:textfield>
						<span>至</span>
						<s:textfield name="guardVO.endtime" maxlength="20" id="eTime"
							class="date-icon iptTime">
						</s:textfield>
						
					</div>
			            <button class="btn btn-default primary" onclick="query()" type="submit" id="que">查询</button>
						<button class="btn btn-default primary" onclick="funreset()" id="J_clearBtn">重置</button>	
			</div>
			<div class="table-responsive">
				<table class="table table-hover text-center">
					<thead>
						<tr>
							<!-- <th><input class="th_checkbox checkBox" type="checkbox"></th> -->
							<th><span class="spanCls">序号</span></th>
							<%-- <th><span class="spanCls">分类</span></th> --%>
							<th><span class="spanCls">IP</span></th>
							<th><span class="spanCls">服务器名称</span></th>
							<th><span class="spanCls">文件路径</span></th>
							<%-- <th><span class="spanCls">文件名称</span></th> --%>
							<th><span class="spanCls">篡改类型</span></th>
							<th><span class="spanCls">状态</span></th>
							<th><span class="spanCls">时间</span></th>
							<th><span class="spanCls">处理方式</span></th>
						</tr>
					</thead>

					<tbody class="form-body">
						<s:iterator var="vo" value="#request.list" status="sta">
							<tr>
								<td><s:property value="#sta.index+1" /></td>

								<%-- <td title="<s:property value="#vo.platForm"/>"><s:property
										value="#vo.platForm" /></td> --%>
								<td title="<s:property value="#vo.ip"/>"><s:property
										value="#vo.ip" /></td>
								<td title="<s:property value="#vo.serverName"/>"><s:property
										value="#vo.serverName" /></td>
								<td  title="<s:property value="#vo.filePath"/>"><s:property
										value="#vo.filePath" /></td>
								<td title="<s:property value="#vo.tamperMode"/>"><s:property
										value="#vo.tamperMode" /></td>
								<td title="<s:property value="#vo.handleResult"/>"><s:property
										value="#vo.handleResult" /></td>
								<td title="<s:property value="#vo.tamperTime"/>"><s:property
										value="#vo.tamperTime" /></td>
								<td title="<s:property value="#vo.handleMode"/>"><s:property
										value="#vo.handleMode" /></td>
							</tr>
						</s:iterator>
					</tbody>
				</table>

					<div class="page center-block">
						<ul>
							<li><input type="hidden" name="guardVO.pageid" id="page"
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
		</main>
	</div>
	<script src="resource/newpages/js/jquery-3.2.1.min.js"></script>
	<script src="resource/newpages/js/bootstrap.min.js"></script>
	<script src="resource/newpages/layDate/laydate/laydate.js"></script>
	<script src="resource/newpages/js/common.js"></script>
	<script type="text/javascript">
		function dosearch() {
			/* document.forms[0].page.value = "1";
			document.forms[0].submit(); */

			document.getElementById("page").value = "1";
			document.forms[0].action = "fileGuard_search.do";
			document.forms[0].submit();
		}
		function firstpage() {
			document.forms[0].page.value = 1;
			document.forms[0].action = "fileGuard_search.do";
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
			document.forms[0].action = "fileGuard_search.do";
			document.forms[0].submit();
			return false;
		}
		function nextpage() {
			if (parseInt(document.forms[0].page.value) >= parseInt(document.forms[0].pages.value)) {
				document.forms[0].page.value = document.forms[0].pages.value;
			} else {
				document.forms[0].page.value = parseInt(document.forms[0].page.value) + 1;
			}
			document.forms[0].action = "fileGuard_search.do";
			document.forms[0].submit();
			return false;
		}
		function lastpage() {
			document.forms[0].page.value = document.forms[0].pages.value;
			document.forms[0].action = "fileGuard_search.do";
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
				document.forms[0].action = "fileGuard_search.do";
				document.forms[0].submit();
			} else {
				alert('请输入正整数');
			}
			return false;
		}

		function query() {
			document.getElementById("page").value = "1";
			document.forms[0].action = "fileGuard_search.do";
			document.forms[0].submit();
			return false;
		}

		function funreset() {
			$('#serverNameInput,#ipInput,#bTime,#eTime,#tamperMode,#handleMode,#handleResult,#handleResult').val('');
			return false;
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