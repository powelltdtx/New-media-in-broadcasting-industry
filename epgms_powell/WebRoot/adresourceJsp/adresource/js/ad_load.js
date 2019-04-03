/**
 * 加载广告位内容 
 * @author 赵健修改版
 * @version 1.2		absm 1.9.2
 * @param pageId 页面Id用于加载js
 * @param contentId 节目Id
 * @param programId 节点Id.
 * @param handlerFunction 渲染的fuction
 */
function loadAdConfingJSONData(addatas,contentId,proprogramId,handlerFunction){
	var copy = JSON.parse(JSON.stringify(addatas));
	var result = getConfingJSON(copy,{contentId:contentId,proprogramId:proprogramId});
	handlerFunction(result);
}

/**
 * js解析入口
 * @param data
 * @param option
 * @returns {___anonymous3728_3751}
 */
function getConfingJSON(data,option){
	var jsonObject = data;
	var contentId = option.contentId;
	var programId = option.proprogramId;
	var postionJSON = {};
	//获取postion配置 key id.  返回plate 集合。
	var plateData =  getComponentsJons(jsonObject.position,{
		unUsedField:'plate',
		singleKeyField:'id'
	},postionJSON);
	//获取plate配置 key id 返回 advertising 集合.
	var plateJSON ={};
	var advertisingData = getComponentsJons(plateData, {
		unUsedField:'advertising',
		singleKeyField:'id'	
	},plateJSON);
	//获取 advertising 相关配置。 返回advertising 集合.
	var  advertisingJSON ={};
	var adstrategyData = getComponentsJons(advertisingData, {
		unUsedField:'',
		singleKeyField:'id'		
	}, advertisingJSON);
	advertisingData =[];
	for(var i in advertisingJSON){
		var singleAdvertising = advertisingJSON[i];
		var adstrategyArray = singleAdvertising[0]['adstrategy'];
		filterAdstrategyBelongOneAdvertising(adstrategyArray);
		var adstrategyDataJSON = {};
		for(var w=0;w<adstrategyArray.length;w++){
			var singleAdstrategy = adstrategyArray[w];
			if(singleAdstrategy == null){
				continue;
			}
			if(adstrategyDataJSON[singleAdstrategy.amid]==null|| adstrategyDataJSON[singleAdstrategy.amid] == undefined){
				adstrategyDataJSON[singleAdstrategy.aimid] =[];
			}
			var array = adstrategyDataJSON[singleAdstrategy.aimid];
			array[array.length] = singleAdstrategy;
		}
		var selectAdstrategyArray = selctAdstrategyData(adstrategyDataJSON, contentId, programId);
		delete singleAdvertising[0]['adstrategy'];
		singleAdvertising[0]['adresource'] = [];
		if(selectAdstrategyArray!=null&&selectAdstrategyArray.length>0&&selectAdstrategyArray != undefined){
			singleAdvertising[0]['adresource'] = selectAdstrategyArray[0].adresource;
		}
		adstrategyData[adstrategyData.length] = singleAdvertising;
	}
	var plateArrayResult = [];
	var plateLocationMap ={};
	for(var w=0;w<adstrategyData.length;w++){
	    var currentData = adstrategyData[w][0];
	    var fComponent = plateJSON[currentData.fid];
	    var onlyKey = fComponent[0]["id"];
	    var result = null;
	    if(plateLocationMap[onlyKey]!=null&&plateLocationMap[onlyKey]!= undefined){
	    	result = plateArrayResult[plateLocationMap[onlyKey]];
	    }
	    if(plateLocationMap[onlyKey] == null||plateLocationMap[onlyKey] == undefined){
	    	result = {};
	    }else{
	    	result = plateArrayResult[plateLocationMap[onlyKey]];
	    }
	    becomeResult(currentData, fComponent, result,"advertising", false);
	    if(plateLocationMap[onlyKey]!=null&&plateLocationMap[onlyKey]!= undefined){
	    	plateArrayResult[plateLocationMap[onlyKey]] = result;
	    }else{
	    	plateArrayResult[plateArrayResult.length] = result;
	    	plateLocationMap[onlyKey] = plateArrayResult.length-1;
	    }
	}
	var postionResult =[];
	var postionLocation = {};
	for(var q = 0;q<plateArrayResult.length;q++){
		var currentData = plateArrayResult[q];
		var fComponent = postionJSON[currentData.fid];
		var onlyKey = fComponent[0]["id"];
		var result = null;
		if(postionLocation[onlyKey]== null||postionLocation[onlyKey] == undefined){
			result={};
		}else{
			result = postionResult[postionLocation[onlyKey]];
		}
		becomeResult(currentData, fComponent, result,"plate", false);
		postionResult[postionResult.length] = result;
		postionLocation[onlyKey] = postionResult.length-1;
	}
	//最后的结果
	var finalResult = {position:postionResult};
	return finalResult;
}
/**
 * 转换为想要的结果
 * @param currentData 当前的数据集
 * @param fCompent 父组件
 * @param result 对应生成的结果
 * @param childFieldName 子元素标记key
 * @param isSpecial 是否是策略
 */
function becomeResult(currentData,fCompent,result,childFieldName,isSpecial){
	//判断有无父元素
	if(fCompent== null||fCompent == undefined){
		return;
	}
	if(result == undefined){
		return;
	}
	//当result没有相关属性时拷贝父元素属性
	if(result[childFieldName]==null||result[childFieldName]==undefined){
		result[childFieldName]=[];
		for(var i in fCompent[0]){
			result[i] = fCompent[0][i];
		}
	}
	if(!isSpecial){
		//不是策略时执行.
		result[childFieldName][result[childFieldName].length] = currentData;
	}else{
		//是策略时执行
		for(var i=0;i<currentData.adresource.length;i++){
			result[childFieldName][result[childFieldName].length] = currentData.adresource[i];
		}
	}
}
/**
 * 根据开始时间与结束时间过滤策略过滤条件为 btime<=ctime && ctime<etime;
 * @param adstrategyDataJSON
 */
function filterAdstrategy(adstrategyDataJSON){
	var currentTime = new Date().getTime();
	for(var i in adstrategyDataJSON){
		var adstrategyArray = adstrategyDataJSON[i];
		for(var w=0;w<adstrategyArray.length;w++){
			var singleAdstrategy = adstrategyArray[w];
			var beginTime =  new Date(singleAdstrategy.beginTime.replace(/-/g,"/")).getTime();
			var endTime = new Date(singleAdstrategy.endTime.replace(/-/g,"/")).getTime();
			if(currentTime<beginTime||currentTime>=endTime){
				adstrategyArray[w] = null;
			}
		}
	}
}
/**
 * 筛选策略
 * @param adstrategyArray
 */
function filterAdstrategyBelongOneAdvertising(adstrategyArray){
	var currentTime = new Date().getTime();
	for(var w=0;w<adstrategyArray.length;w++){
		var singleAdstrategy = adstrategyArray[w];
		var beginTime =  new Date(singleAdstrategy.beginTime.replace(/-/g,"/")).getTime();
		var endTime = new Date(singleAdstrategy.endTime.replace(/-/g,"/")).getTime();
		if(currentTime<beginTime||currentTime>=endTime){
			adstrategyArray[w] = null;
		}
	}
	
	
}
/**
 * 选择策略数组.
 * @param adstrategyDataJSON 策略json
 * @param aimid 节目Id或节点Id
 * @returns
 */
function selctAdstrategyData(adstrategyDataJSON,contentId,proprogramId){
	var adstrategyArray = [];
	//var adstrategyArray = adstrategyDataJSON[contentId];
	if(contentId!=""){
		adstrategyArray=adstrategyDataJSON[contentId];
	}
	if (adstrategyArray==null||adstrategyArray== undefined) {
		adstrategyArray = adstrategyDataJSON[proprogramId];
		if(adstrategyArray == null||adstrategyArray== undefined){
			var proprogramIdLength = proprogramId.length;
			var time = proprogramIdLength/3;
			for(var w = 1;w<time;w++){
			   for(var i in adstrategyDataJSON){
					if(proprogramId.indexOf(i)==0&&i.length+w*3){
						adstrategyArray = adstrategyDataJSON[i];
						break;
					}
			   }
			   if(adstrategyArray!=null&&adstrategyArray!=undefined){
				    break;
				}
			}
		}
	}
	
	var selectAdStrategy = [];
	var fidIdIndexOption={};
	
	if(contentId==""&&proprogramId==""){
		adstrategyArray = adstrategyDataJSON[""];
	}
	if(adstrategyArray == undefined){
		adstrategyArray = [];
	}
	
	if(0 != adstrategyArray.length){
		for(var i=0;i<adstrategyArray.length;i++){
			var singleAdstrategy = adstrategyArray[i];
			if(singleAdstrategy!=null){
				if(fidIdIndexOption[singleAdstrategy.fid]==null||fidIdIndexOption[singleAdstrategy.fid]== undefined){
					selectAdStrategy[selectAdStrategy.length] = singleAdstrategy;
					fidIdIndexOption[singleAdstrategy.fid] = selectAdStrategy.length-1;
				}else{
					var index = fidIdIndexOption[singleAdstrategy.fid];
					console.log("index "+index);
					console.log("selectAdStrategy"+JSON.stringify(selectAdStrategy));
					console.log("fidIdIndexOption "+JSON.stringify(fidIdIndexOption));
					var oldAdStrategy = selectAdStrategy[index];
					var oldCtime = new Date(oldAdStrategy.createTime.replace(/-/g,"/")).getTime();
					var newCtime = new Date(singleAdstrategy.createTime.replace(/-/g,"/")).getTime();
					if(newCtime>oldCtime){
						selectAdStrategy[index] = singleAdstrategy;
					}
		    }
			}
		}
	}
	
	return selectAdStrategy;
	
}
/**
 * 获取组件的独立json.
 * @param data 目标数据.
 * @param option 相关配置.
 *  singleKeyField 指定作为key 的zid
 *  fid:父元素Id.
 *  unUsedField: 下级元素的key
 */
function getComponentsJons(data,option,result){
	var unUseData = [];
	for(var i=0;i<data.length;i++){
		 var singleData= data[i];
		 var singleObj = {};
		 for(var w in singleData){
			if(w!=""&&w==option.unUsedField){
		        for(var q=0;q<singleData[w].length;q++){
		        	var singleUnUsed = singleData[w][q];
		        	singleUnUsed['fid'] = singleData[option.singleKeyField];
		        	unUseData[unUseData.length] = singleUnUsed;
		        }
				//singleData[w];
				continue;
			}
			singleObj[w] = singleData[w];
		 }
		 var array = result[singleData[option.singleKeyField]];
		 var propertyKey =singleData[option.singleKeyField];
		 if(array == null||array==undefined){
			 result[propertyKey] = [];
			 result[propertyKey][0] = singleObj;
		 }else{
			 var length = result[propertyKey].length;
			 result[propertyKey][length] = singleObj;
		 }
	}
	return unUseData;
}