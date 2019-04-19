
function loadAdConfingJSONData(addatas,contentId,proprogramId,contentType,handlerFunction){

	var copy = JSON.parse(JSON.stringify(addatas));	
	var result = getConfingJSON(copy,{contentId:contentId,proprogramId:proprogramId,contentType:contentType});
	handlerFunction(result);
}


function getConfingJSON(data,option){
	var jsonObject = data;
	var contentId = option.contentId;
	var programId = option.proprogramId;
	var contentType = option.contentType;
	var postionJSON = {};

	var plateData =  getComponentsJons(jsonObject.position,{
		unUsedField:'plate',
		singleKeyField:'id'
	},postionJSON);

	var plateJSON ={};
	var advertisingData = getComponentsJons(plateData, {
		unUsedField:'advertising',
		singleKeyField:'id'	
	},plateJSON);

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
			if(adstrategyDataJSON[singleAdstrategy.aimid]==null|| adstrategyDataJSON[singleAdstrategy.aimid] == undefined){
				adstrategyDataJSON[singleAdstrategy.aimid] =[];
			}
			var array = adstrategyDataJSON[singleAdstrategy.aimid];
			array[array.length] = singleAdstrategy;
		}		

		var selectAdstrategy =  selectAdstrategyDataByProiority(adstrategyDataJSON, contentId, programId, contentType);		 
		delete singleAdvertising[0]['adstrategy'];
		singleAdvertising[0]['adresource'] = [];
		if(selectAdstrategy!=null&&selectAdstrategy != undefined){
			singleAdvertising[0]['adresource'] = selectAdstrategy.adresource;
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
		if(postionLocation[onlyKey] == null || postionLocation[onlyKey] == undefined){
			postionResult[postionResult.length] = result;
			postionLocation[onlyKey] = postionResult.length-1;
		}
	}

	var finalResult = {position:postionResult};
	return finalResult;
}

function becomeResult(currentData,fCompent,result,childFieldName,isSpecial){

	if(fCompent== null||fCompent == undefined){
		return;
	}
	if(result == undefined){
		return;
	}

	if(result[childFieldName]==null||result[childFieldName]==undefined){
		result[childFieldName]=[];
		for(var i in fCompent[0]){
			result[i] = fCompent[0][i];
		}
	}
	if(!isSpecial){

		result[childFieldName][result[childFieldName].length] = currentData;
	}else{

		for(var i=0;i<currentData.adresource.length;i++){
			result[childFieldName][result[childFieldName].length] = currentData.adresource[i];
		}
	}
}

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

function selectAdstrategyDataByProiority(adstrategyDataJSON,contentId,proprogramId,contentType){
   var contentAdstrategys = adstrategyDataJSON[contentId];
   var contentAdstrategy = getUsedAndDefaultAdstrategy(contentAdstrategys,contentType);
   var proprogramAdstrategys = adstrategyDataJSON[proprogramId];
   var proprogramAdstrateg = getUsedAndDefaultAdstrategy(proprogramAdstrategys, contentType);
   var defaultAdstrategy = compareTwoAdstrategy(proprogramAdstrateg.defaultAdstrategy, contentAdstrategy.defaultAdstrategy);
   var usedAdstrategy = compareTwoAdstrategy(proprogramAdstrateg.usedAdstrategy,contentAdstrategy.usedAdstrategy);
   return usedAdstrategy!=null?usedAdstrategy:defaultAdstrategy;
}


function getUsedAndDefaultAdstrategy(adstrategyDataJSON,contentType){
	var usedResult = null;
	var defaultResult = null;
	
	if(adstrategyDataJSON!=null&&adstrategyDataJSON!= undefined){
	for(var i=0;i<adstrategyDataJSON.length;i++){
		var singleAdstrategy = adstrategyDataJSON[i];
		var isdefault = singleAdstrategy.isdefault;
		var adstrategyType = singleAdstrategy.aimtype;
		
		
		if(contentType!=adstrategyType){
			continue;
		}
		if(isdefault == "1"){
			if(defaultResult==null){
				defaultResult = singleAdstrategy;
			}else{
			   defaultResult = compareTwoAdstrategy(defaultResult, singleAdstrategy);	
			}
		}else{
			if(usedResult ==null){
				usedResult = singleAdstrategy;
			}else{
				usedResult = compareTwoAdstrategy(usedResult, singleAdstrategy);
			}
		}
	}
	}
	return {
		defaultAdstrategy:defaultResult,
		usedAdstrategy:usedResult
	}
}


function compareTwoAdstrategy(old,fresh){
	if(old==null&&fresh==null){
		return null;
	}else if(old==null&&fresh!=null){
		return fresh;
	}else if(old!=null&&fresh==null){
		return old;
	}

	var oldPriority = old.priority;
	var freshPriority = fresh.priority;

	if(oldPriority!=freshPriority){
		return oldPriority>freshPriority?old:fresh;
	}else{

		var oldReleasetime =  new Date(old.releasetime.replace(/-/g,"/")).getTime();
		var freshReleasetime = new Date(fresh.releasetime.replace(/-/g,"/")).getTime();
		return oldReleasetime>freshReleasetime?old:fresh;
	}
}

function selctAdstrategyData(adstrategyDataJSON,contentId,proprogramId){
	var adstrategyArray = [];

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