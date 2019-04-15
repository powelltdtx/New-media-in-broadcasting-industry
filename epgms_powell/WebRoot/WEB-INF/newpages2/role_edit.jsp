<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>角色添加</title>
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
			<!--右侧数据(默认)-->
			<div class="main-wrap">
				<div class="form-head">
					<div class="crumb">
						<a href="roleManger.html">角色管理</a> &gt; <a
							href="javascript:void(0)">角色编辑/查看</a>
					</div>
				</div>
				<div class="form-main" style="padding-top: 10px;">
					<form action="" method="post">
						<table cellpadding="0" cellspacing="0" border="0" class="form-con"
							style="width:55%">
							<tr>
								<th width="10%"><i>*</i>角色名称</th>
								<td width="50%"><input type="text" name="vo.name"
									class="ipt bt" id="roleName"
									value="<s:property value="vo.name"/>"
									onkeyup="WidthCheck(this,20)" /> <!-- 隐藏字段 --> <input
									type="hidden" name="vo.id" class="ipt bt" id="roleId"
									value="<s:property value="vo.id"/>" />
							</tr>

							<tr>
								<th><i>*</i>权限范围</th>
								<td style="padding-top:10px;"><s:iterator var="menuVo"
										value="#request.allMenuList">
										<div class="cbox">
											<div class="cT">
												<input type="checkbox" class="allC" /><label><s:property
														value="#menuVo.name" /></label>
											</div>
											<ul class="cArry">
												<s:iterator var="btn" value="#menuVo.buttonList">
													<li><input type="checkbox" name="vo.btnCodes"
														value="<s:property value="#btn.code"/>"
														<s:iterator var="roleBtn" value="#request.roleBtnlList">
											    	<s:if test="#roleBtn.code==#btn.code">
											    	 checked="checked" 
											    	</s:if>
											    	</s:iterator> />
														<label><s:property value="#btn.name" /></label></li>
												</s:iterator>
											</ul>
										</div>
									</s:iterator></td>
							</tr>
							<tr>
								<th>备注：</th>
								<td colspan="3"><textarea id="" cols="30" rows="3"
										class="txtarea w635 remark" name="vo.remark"
										onkeyup="WidthCheck(this,200)"><s:property
											value='vo.remark' /></textarea></td>
							</tr>

						</table>
					</form>
					<div class="buttons">
						<input type="button" class="btn blue-btn" value="保存"
							onclick="toSave()" id="sver" /> <input type="button"
							class="btn blue-btn" value="取消"
							onclick="window.location.href='role!searchAllRoles.action'" />
					</div>
					<div class="warn">请完整填写上方必填信息（*）</div>
				</div>
			</div>
		</main>
	</div>
	<div class="layer confirm" style="display: none">
		<div class="layer-tit"></div>
		<div class="layer-msg layerMsg">确定保存吗？</div>
		<div class="layerButtons">
			<input type="button" class="btn blue-btn" value="确认"
				onclick="javascript:doSave()" /> <input type="button"
				class="btn blue-btn cancel" value="取消" onclick="closeLayer()" />
		</div>
	</div>

	<div class="layer alert-suc" style="display: none">
		<div class="layer-msg">
			<span>操作成功！</span>
		</div>
	</div>
	<div class="layer alert-fail" style="display: none">
		<div class="layer-msg">
			<span>操作失败！</span>
		</div>
	</div>
	<!--灰背景-->
	<div class="h_bj"></div>
	<!--loading-->
	<div class="loading">
		<img src="resource/img/admin/loading.gif" />
	</div>
	<script src="resource/newpages/js/jquery-3.2.1.min.js"></script>
	<script src="resource/newpages/js/bootstrap.min.js"></script>
	<script src="resource/newpages/js/common.js"></script>
	<script src="resource/newpages/js/mangerUse.js"></script>
	<script src="resource/newpages/js/layer.min.js"></script>
</body>

</html>
<script>
	function doSave() {
		layer.closeAll();
		$(".h_bj").show();
		$(".loading").show();
		document.forms[0].action = "role!editRole.action";
		document.forms[0].submit();
	}
	function toSave() {
		var name = /^[\w\W]*[%]+[\w\W]*$/; //限制%等特殊字符
		var name1 = $("#roleName").val();

		if ($("#roleName").val() == "") {
			alert("策略名称不能为空");
			return false;
		}
		if (name.test(name1) || name1.trim() != name1) {
			alert("格式错误:不能包含%或以空格开头或结尾");
			return false;
		}
		if ($("#roleName").val() != '<s:property value="vo.name"  escape="false"/>') {
			$.post("role_chackRoleName.do", {
				roleName : $("#roleName").val()
			}, function(data) {
				if (null != data && data != "0") {
					alert("策略名已经存在");
					return false;
				} else {
					//判断是否勾选权限
					var count = 0;
					$("input[type='checkbox']:checked").each(function() {
						count++;
					});
					if (count > 0) {
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
					} else {
						alert("至少选择一个权限按钮！");
					}
				}
			}, "text");
		} else {
			//判断是否勾选权限
			var count = 0;
			$("input[type='checkbox']:checked").each(function() {
				count++;
			});
			if (count > 0) {
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
			} else {
				alert("至少选择一个权限按钮！");
			}
		}

	}
	//关闭弹层
	function closeLayer() {
		layer.closeAll();
	}
	$(function() {
		//全选功能
		$('.allC').on('click', function() {
			var aInput = $(this).parent().siblings('ul').find('input');
			if ($(this).is(':checked')) {
				aInput.each(function() {
					$(this).prop('checked', 'checked');
				});
			} else {
				aInput.each(function() {
					$(this).prop('checked', '');
				});
			}
		});

		//点击事件并且判断该组是否全选	
		var iBtn = true;
		$('.cArry input').on('click', function() {
			iBtn = true;
			if ($(this).is(':checked')) {
				$(this).prop('checked', true);
			} else {
				$(this).prop('checked', false);
			}

			var a = $(this).parents('ul').find('input');
			a.each(function() {
				if ($(this).prop('checked') == false) {
					iBtn = false;
				}
			});

			//判断是否子复选框全部选择了	
			if (iBtn) {
				var b = $(this).parents('ul').siblings('.cT').find('input');
				b.prop('checked', true);
			} else {
				var b = $(this).parents('ul').siblings('.cT').find('input');
				b.prop('checked', false);
			}
		});

	});
	//限制最大输入字节数
	function WidthCheck(str, maxLen) {
		var w = 0;
		//length 获取字数数，不区分汉子和英文 
		for (var i = 0; i < str.value.length; i++) {
			//charCodeAt()获取字符串中某一个字符的编码 
			var c = str.value.charCodeAt(i);
			//单字节加1  
			if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
				w++;
			} else {
				w += 2;
			}
			if (w > maxLen) {
				str.value = str.value.substr(0, i);
				break;
			}
		}
	}

	
</script>