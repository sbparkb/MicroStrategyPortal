(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.num","mstrmojo.VisEnum","mstrmojo.VisUtility","mstrmojo.gm.GMEnums","mstrmojo.color","mstrmojo.chart","mstrmojo.chart.common.Utility");mstrmojo.requiresClsP("mstrmojo.chart.enums","EnumGraphMajorType");mstrmojo.requiresClsP("mstrmojo.chart.model.enums","EnumDSSGraphObject");var $MOJO=mstrmojo,$ARR=mstrmojo.array,$HASH=mstrmojo.hash,$NUM=mstrmojo.num,$VISUTILS=mstrmojo.VisUtility,$C=mstrmojo.chart,$CHART_ENUMS=$C.enums,$GMT=$CHART_ENUMS.EnumGraphMajorType,$Utility=$C.common.Utility,$M=$C.model,$MODEL_ENUMS=$M.enums,$GO=$MODEL_ENUMS.EnumDSSGraphObject,CTRL_TYPE=mstrmojo.VisEnum.ControlType,$GM=$MOJO.gm,PRP_TEXT_HALIGN=mstrmojo.gm.EnumTextAlignH,PRP_TEXT_VALIGN=mstrmojo.gm.EnumTextAlignV,ELEMENT_SEP=";",INTER_SEP=",",TIME_STAMP="_tmsp",$FORM_SEP=" ",INVALID_METRIC_IDX=-20,$SEL_OPT_LVL=mstrmojo.gm.EnumSelectionOptionLevel,$SP=mstrmojo.gm.EnumShape,CLR=mstrmojo.color,IDEN_TYPE=mstrmojo.gm.EnumIdentityType,kPercentageTolerance=0.00001,GMUTIL,POW2_30=Math.pow(2,30),POW2_60=Math.pow(2,60);var REF_TYPE_DESCS=["Reserved",mstrmojo.desc(2125,"Maximum"),mstrmojo.desc(2127,"Minimum"),mstrmojo.desc(2122,"Average"),mstrmojo.desc(2126,"Median"),mstrmojo.desc(4046,"First"),mstrmojo.desc(4049,"Last"),mstrmojo.desc(7194,"Constant")];function isDigitalArrayEqual(arr1,arr2){var i,len=arr1.length;if(len!==arr2.length){return false;}for(i=0;i<len;i++){if(arr1[i]!==arr2[i]){return false;}}return true;}function checkAndCopyProperty(srcObj,destObj,pNm){var overwrite=false,pNm_Tm=pNm+TIME_STAMP,srcObj_pNm_Tm=srcObj[pNm_Tm],destObj_pNm_Tm=destObj[pNm_Tm];if(destObj[pNm]===undefined){overwrite=true;}else{if((destObj_pNm_Tm===undefined&&srcObj_pNm_Tm!==undefined)||(destObj_pNm_Tm!==undefined&&srcObj_pNm_Tm!==undefined&&destObj_pNm_Tm<srcObj_pNm_Tm)){overwrite=true;}}if(overwrite){destObj[pNm]=srcObj[pNm];if(destObj_pNm_Tm!==undefined){destObj[pNm_Tm]=srcObj_pNm_Tm;}}}function copyAllProps(srcObj,destObj){var key;for(key in srcObj){if(srcObj.hasOwnProperty(key)){checkAndCopyProperty(srcObj,destObj,key);}}return destObj;}function getResolvedFormatsObject(formatsArr){var res={},i,arr=[],len;$ARR.forEach(formatsArr,function(formatObj){if(formatObj!==undefined){arr.push(formatObj);}});len=arr.length;if(len===1){return arr[0];}for(i=0;i<len;i++){copyAllProps(arr[i],res);}return res;}function formatNumber(num){return{n:num,s:num.toString(),on:num};}function computeStep(min,max,intAsStep){if(max===min){return 0;}var range=max-min,step=1;while(range<1){range*=10;step/=10;}while(range>=10){range/=10;step*=10;}if(range<1.8){step*=0.2;}else{if(range<3.1){step*=0.4;}else{if(range<4.6){step*=0.5;}else{if(range>=8.1){step*=2;}}}}if(intAsStep){step=Math.round(step);if(step<1){step=1;}}return step;}function doComputeTicksForFlexMinMax(min,max,intAsStep,fixedStep){var labels=[];if(min===max){if(min<0){labels.push(mstrmojo.gm.GMUtility.formatNumber(min,"nearest"));}labels.push({n:0,s:"0",on:0});if(min>0){labels.push(mstrmojo.gm.GMUtility.formatNumber(min,"nearest"));}return labels;}var step=fixedStep>0?fixedStep:computeStep(min,max,intAsStep);var maxTick=Math.ceil(max/step)*step;if(maxTick-max>=step*0.9){maxTick=Math.floor(max/step)*step;}var minTick=Math.floor(min/step)*step;if(min-minTick>=step*0.9){minTick=Math.ceil(min/step)*step;}var numTicks=Math.floor((maxTick-minTick+step/100)/step)+1,i;for(i=0;i<numTicks;++i){labels.push(mstrmojo.gm.GMUtility.formatNumber(minTick+i*step,"nearest"));}return labels;}function hComputeTicksForPercent(result,actualOptions){var tick;result.mMaxTick=1;if(this.mChartContextPtr.mIsGraphMatrix){result.mStep=this.mMinimum<0?0.2:0.1;if(actualOptions.mUseCustomMinMax){var options=actualOptions;result.mMaxTick=options.mAxisMaxValue;result.mMinTick=options.mAxisMinValue;result.mMaxTick=Math.min(1,result.mMaxTick);result.mMinTick=Math.max(-1,result.mMinTick);result.mStep=0.1;}else{if(this.mMaximum>=0.5){result.mMaxTick=1;result.mMinTick=Math.floor(this.mMinimum/result.mStep)*result.mStep;result.mMinTick=(result.mMinTick*this.mMinimum<0)?0:(result.mMinTick>0?0:result.mMinTick);if(this.mMinimum<-0.5){result.mMinTick=-1;}}else{if(this.mMaximum>0){result.mMaxTick=Math.ceil(this.mMaximum/result.mStep)*result.mStep;result.mMinTick=-1;}else{result.mStep=0.1;result.mMaxTick=0;result.mMinTick=-1;}}}}else{result.mMinTick=(this.mMinimum<0)?-1:0;if(hHasTooManyTicks.call(this,result)){return ;}result.mStep=this.mMajorGrid.mUseManualGrid?this.mMajorGrid.mGridInterval:(result.mMaxTick-result.mMinTick)/10;}for(tick=result.mMinTick+result.mStep;tick+$C.gModuleMain.mTolerance<result.mMaxTick;tick+=result.mStep){result.mTicks.push(Math.round(tick*100)/100);}}function hComputeTicksForLogScale(result,actualOptions){var ceilLogMax,floorLogMin,axisOptions=actualOptions,drawCustomLine=axisOptions.mDrawCustomLine,customLineValue=axisOptions.mAxisCustomValue,i;result.mStep=1;if(this.mMaximum<=0){result.mMinTick=1;result.mMaxTick=10;if(drawCustomLine&&customLineValue<=1){axisOptions.mAxisCustomValue=result.mMinTick;}return ;}if(this.mMinimum<=0){floorLogMin=this.mMaximum>1?0:-1;result.mMinTick=Math.pow(10,floorLogMin);if(axisOptions.mUseCustomMinMax){result.mMaxTick=this.mMaximum;ceilLogMax=Math.floor(log10.call(this,this.mMaximum));if(log10.call(this,this.mMaximum)===ceilLogMax){ceilLogMax--;}}else{ceilLogMax=Math.ceil(log10.call(this,this.mMaximum));result.mMaxTick=Math.pow(10,ceilLogMax);}for(i=floorLogMin+1;i<ceilLogMax;++i){result.mTicks.push(Math.pow(10,Math.floor(i)));}if(drawCustomLine&&customLineValue<=0){axisOptions.mAxisCustomValue=Math.max(result.mMinTick,axisOptions.mAxisCustomValue);}return ;}if(axisOptions.mUseCustomMinMax){ceilLogMax=log10.call(this,this.mMaximum);floorLogMin=log10.call(this,this.mMinimum);result.mMaxTick=this.mMaximum;result.mMinTick=this.mMinimum;}else{ceilLogMax=Math.ceil(log10.call(this,this.mMaximum));floorLogMin=Math.floor(log10.call(this,this.mMinimum));result.mMaxTick=Math.pow(10,ceilLogMax);result.mMinTick=Math.pow(10,floorLogMin);}for(i=floorLogMin+1;i<ceilLogMax;++i){result.mTicks.push(Math.pow(10,Math.floor(i)));}if(drawCustomLine&&customLineValue<=0){axisOptions.mAxisCustomValue=result.mMinTick;}}function hComputeTicksForFlexMinMax(result,actualOptions){var axisOptions=actualOptions,ticksCount,i;result.mStep=hComputeStep.call(this,this.mMaximum,this.mMinimum,axisOptions.mAlwaysIncludeZero);result.mMaxTick=Math.ceil(this.mMaximum/result.mStep)*result.mStep;result.mMinTick=Math.floor(this.mMinimum/result.mStep)*result.mStep;result.mMinTick=(result.mMinTick*this.mMinimum<0)?0:result.mMinTick;if(axisOptions.mAlwaysIncludeZero){result.mMaxTick=(this.mMaximum<0)?0:result.mMaxTick;result.mMinTick=(this.mMinimum>0)?0:result.mMinTick;}var range=result.mMaxTick-result.mMinTick;if(result.mStep>=range){return ;}if(hHasTooManyTicks.call(this,result)){return ;}ticksCount=Math.floor((result.mMaxTick-result.mMinTick+result.mStep/100)/result.mStep)+1;var numberFormat=this.mNumberFormat;for(i=1;i<ticksCount-1;++i){var value=result.mMinTick+i*result.mStep,displayVal,integerPart,diff;if(result.mStep<1&&numberFormat.mFormatType===4&&numberFormat.mCustomFormat.indexOf("%")!==-1){displayVal=value*100;if(!$Utility.isIntegar(displayVal)){integerPart=Math.round(displayVal);diff=Math.abs(displayVal-integerPart);if(diff<kPercentageTolerance){value=integerPart/100;}}}result.mTicks.push(value);}}function hComputeTicksForFixMinMax(result,actualOptions){var options=actualOptions,range,numberOfEqualIntervals,numberOfGridIntervals,i,foundEvenDivision,gridInterval,secondTick,numberOfTicks;result.mMaxTick=options.mAxisMaxValue;result.mMinTick=options.mAxisMinValue;if(hHasTooManyTicks.call(this,result)){return ;}if(!hIsPolarXOrHistogramX.call(this)||this.mMajorGrid.mUseManualGrid){result.mStep=hComputeStep.call(this,result.mMaxTick,result.mMinTick,false);range=result.mMaxTick-result.mMinTick;if(result.mStep>=range){return ;}numberOfEqualIntervals=Math.floor(range/result.mStep);if(!(this.mChartContextPtr.mIsTimeSeriesChart)&&range===numberOfEqualIntervals*result.mStep){for(i=1;i<numberOfEqualIntervals;++i){result.mTicks.push(result.mMinTick+i*result.mStep);}}else{range=result.mMaxTick-result.mMinTick;numberOfGridIntervals=10;foundEvenDivision=false;for(i=3;i<numberOfEqualIntervals;++i){gridInterval=range/i;while(gridInterval<1){gridInterval*=10;}while(gridInterval>=10){gridInterval/=10;}if(gridInterval===Math.floor(gridInterval)){numberOfGridIntervals=i;foundEvenDivision=true;break;}}if(foundEvenDivision){result.mStep=range/numberOfGridIntervals;for(i=1;i<numberOfGridIntervals;++i){result.mTicks.push(result.mMinTick+i*result.mStep);}}else{secondTick=Math.ceil((result.mMinTick+result.mStep/100)/result.mStep)*result.mStep;numberOfTicks=Math.floor((result.mMaxTick-result.mStep/100-secondTick)/result.mStep)+3;for(i=0;i<numberOfTicks-2;++i){result.mTicks.push(secondTick+i*result.mStep);}}}}else{range=result.mMaxTick-result.mMinTick;numberOfGridIntervals=10;for(i=6;i<=9;++i){gridInterval=range/i;while(gridInterval<10){gridInterval*=10;}while(gridInterval>=100){gridInterval/=10;}if(gridInterval===Math.floor(gridInterval)){numberOfGridIntervals=i;break;}}result.mStep=range/numberOfGridIntervals;for(i=1;i<numberOfGridIntervals;++i){result.mTicks.push(result.mMinTick+i*result.mStep);}}}function hComputeTicksForFixMax(result,actualOptions){var lMin,lNumberOfTicks,i;result.mMaxTick=actualOptions.mAxisMaxValue;if(result.mMaxTick<=this.mMinimum){this.mMinimum=result.mMaxTick-1;}result.mStep=hComputeStep.call(this,result.mMaxTick,this.mMinimum,actualOptions.mAlwaysIncludeZero&&(result.mMaxTick>0));lMin=(actualOptions.mAlwaysIncludeZero&&(this.mMinimum>0))?0:this.mMinimum;if(hIsPolarXOrHistogramX.call(this)){result.mMinTick=result.mMaxTick-Math.ceil((result.mMaxTick-lMin)/result.mStep)*result.mStep;}else{result.mMinTick=Math.floor(lMin/result.mStep)*result.mStep;}if(hHasTooManyTicks.call(this,result)){return ;}lNumberOfTicks=Math.floor((result.mMaxTick-result.mStep/100-result.mMinTick)/result.mStep)+2;for(i=1;i<lNumberOfTicks-1;++i){result.mTicks.push(result.mMinTick+i*result.mStep);}}function hComputeTicksForFixMin(result,actualOptions){var lMax,lSecondTick,lNumberOfTicks,i;result.mMinTick=actualOptions.mAxisMinValue;if(result.mMinTick>=this.mMaximum){this.mMaximum=result.mMinTick+1;}result.mStep=hComputeStep.call(this,this.mMaximum,result.mMinTick,actualOptions.mAlwaysIncludeZero&&(result.mMinTick<0));lMax=(actualOptions.mAlwaysIncludeZero&&(this.mMaximum<0))?0:this.mMaximum;if(hIsPolarXOrHistogramX.call(this)){result.mMaxTick=result.mMinTick+Math.ceil((lMax-result.mMinTick)/result.mStep)*result.mStep;}else{result.mMaxTick=Math.ceil(lMax/result.mStep)*result.mStep;}if(hHasTooManyTicks.call(this,result)){return ;}lSecondTick=Math.ceil((result.mMinTick+result.mStep/100)/result.mStep)*result.mStep;lNumberOfTicks=Math.floor((result.mMaxTick-lSecondTick+result.mStep/100)/result.mStep)+2;for(i=0;i<lNumberOfTicks-2;++i){result.mTicks.push(lSecondTick+i*result.mStep);}}function hComputeStep(iMaximum,iMinimum,iIncludeZero){var range,step;if(this.mMajorGrid.mUseManualGrid){return this.mMajorGrid.mGridInterval;}range=0;if(iIncludeZero){range=Math.max(iMaximum,iMaximum-iMinimum);range=Math.max(range,-iMinimum);}else{range=iMaximum-iMinimum;}if(range===0){this.mIsShown=false;return 1;}if(range>=1&&range<=4&&parseInt(range)===range){var mIdxs=this.PrimaryMetricIndex,count=mIdxs.length;for(var k=0;k<count;k++){var dataset=this.mChartContextPtr.mDatasetPtr,dp=dataset.dataProvider,sCnt=dp.getSeriesCount(),gCnt=dp.getGroupCount(),mIdx=mIdxs[k],metricIndex,isInteger;for(var i=0;i<sCnt;i++){metricIndex=dp.getMetricIndexForSeries(i);if(metricIndex===mIdx){isInteger=true;for(var j=0;j<gCnt;j++){var data=dataset.GetData(i,j);if(parseInt(data)!==data){isInteger=false;break;}}}if(isInteger){return 1;}}}}var absoluteRange=range;step=1;while(range<1){range*=10;step/=10;}while(range>=10){range/=10;step*=10;}if(range<1.8){step*=2;step/=10;}else{if(range<3.1){step*=4;step/=10;}else{if(range<4.6){step*=5;step/=10;}else{if(range>=8.1){step*=2;}}}}step=this.postProcessStep(step,absoluteRange);return step;}function hHasTooManyTicks(result){if(this.mChartContextPtr.mIsGraphMatrix){return false;}var majorGrid=this.mMajorGrid;return majorGrid.mUseManualGrid&&(majorGrid.mGridInterval<(result.mMaxTick-result.mMinTick)/30);}function log10(x){return Math.log(x)/Math.log(10);}function hIsPolarXOrHistogramX(){return(this.mGraphMajorType===$GMT.GMT_HISTOGRAM||this.mGraphMajorType===$GMT.GMT_POLAR)&&this.mTripleId.mObjectId===$GO.DssGraphX1Body;}function getAddReferenceLineSubMenu(itemContext){var visGM=this,scopeId=visGM.id,metricId=itemContext.metricId,subMenu=new $MOJO.ui.menus.MenuConfig();(itemContext.options).forEach(function(refType){if(refType!==$GM.EnumRefLineModelType.CONST){subMenu.addMenuItem(REF_TYPE_DESCS[refType],"xt",function(){visGM.toggleRefLineEnabled(metricId,refType,true);});}else{subMenu.addEditorMenuItem(REF_TYPE_DESCS[$GM.EnumRefLineModelType.CONST],scopeId,function(){return new mstrmojo.ui.menus.EditorConfig({data:{},contents:[{scriptClass:"mstrmojo.ValidationTextBox",alias:"constVal",dtp:mstrmojo.expr.DTP.FLOAT,constraints:{trigger:mstrmojo.validation.TRIGGER.ONBLUR},onEnter:function(){this.validate();}}],fnOk:function(data,editor){var txtWgt=editor.constVal;if(txtWgt.isValid()){visGM.toggleRefLineEnabled(metricId,refType,true,txtWgt.value);}}});});}});return subMenu;}function getRemoveReferenceLineSubMenu(itemContext){var visGM=this,metricId=itemContext.metricId,subMenu=new $MOJO.ui.menus.MenuConfig();(itemContext.options).forEach(function(refLine){var refType=refLine.refType,menuDesc=REF_TYPE_DESCS[refType]+((refType===$GM.EnumRefLineModelType.CONST)?("-["+$NUM.toLocaleString(refLine.c)+"]"):"");subMenu.addMenuItem(menuDesc,"xt",function(){visGM.toggleRefLineEnabled(metricId,refType,false,0,refLine.modix);});});return subMenu;}function getChageShapeOptions(visGM,metricIdx){var gmCtr=visGM.GMController,fbdShps=gmCtr.getForbiddenShapeForMetric(metricIdx),allShapeCollection=[];[{text:mstrmojo.desc(12097,"Bar"),value:$SP.BAR},{text:mstrmojo.desc(2059,"Line"),value:$SP.LINE},{text:mstrmojo.desc(9738,"Area"),value:$SP.AREA},{text:mstrmojo.desc(12100,"Circle"),value:$SP.CIRCLE},{text:mstrmojo.desc(12101,"Square"),value:$SP.SQUARE},{text:mstrmojo.desc(12102,"Tick"),value:$SP.TICK}].forEach(function(opt){if(fbdShps.indexOf(opt.value)<0){allShapeCollection.push(opt);}});return allShapeCollection;}function shapeChanged(metricId,changeShapeFunc){return function(newValue,oldValue){if(newValue!==oldValue){changeShapeFunc({ctxt:{sp:newValue,mid:metricId}});}};}function getChangeShapeRadioToggleMenu(itemContext){var options=itemContext.options,gmChangeShapeHandler=this.getMenuHandler("changeShape"),chgShapeSubMenu=new mstrmojo.ui.menus.MenuConfig();chgShapeSubMenu.addRadioMenuGroup(itemContext.currValue,shapeChanged(itemContext.metricId,gmChangeShapeHandler),options,"checkMark",undefined,true);return chgShapeSubMenu;}mstrmojo.gm.GMUtility=mstrmojo.provide("mstrmojo.gm.GMUtility",{mTimers:[],mUseTimer:true,timerId:0,startTimer:function startTimer(desc){if(this.mUseTimer){var timerId=this.timerId++;this.mTimers.push({timeStamp:new Date(),timerId:timerId,desc:desc.functionName+": "+desc.purpose});return timerId;}},endTimer:function endTimer(timerId){if(this.mUseTimer){var timer,timers=this.mTimers;if(timerId===undefined){timer=timers.pop();}else{var i,t;for(i=0;i<timers.length;i++){t=timers[i];if(t.timerId===timerId){timer=t;timers.splice(i,1);i--;}}}if(timer){$VISUTILS.visPrint("%c"+timer.desc+": "+(new Date()-timer.timeStamp)+"ms","color: blue");}}},computeTicksForPercentchart:function(min,max,fixedStep){return doComputeTicksForFlexMinMax(min,max,false,fixedStep);},computeTicksForFlexMinMax:function(min,max,intAsStep,fixedStep){return doComputeTicksForFlexMinMax(min,max,intAsStep,fixedStep);},formatNumber:function(num,roundType,lenLimit){return formatNumber(num,roundType,lenLimit===undefined?3:lenLimit);},sizeCalculator:{sum:function(arr,space,n){var i,cnt=0,total=0;if(n===undefined){n=arr.length;}space=space||1;for(i=0;i<n;i++){if(arr[i]>0){total+=arr[i];cnt+=1;}}if(cnt>1){total+=(cnt-1)*space;}return total;},add:function(currentSum,toAdd,space){space=space||1;if(toAdd>0){currentSum+=(toAdd+space);}return currentSum;},minus:function(currentSum,toMinus,space){if(toMinus>0){currentSum-=(toMinus+space);}return currentSum;}},replaceSpecialChars:function(value){value=value.replace(/&/g,"&amp;");value=value.replace(/</g,"&lt;");value=value.replace(/>/g,"&gt;");value=value.replace(/"/g,"&quot;");return value;},restoreSpecialChars:function(value){value=value.replace(/&nbsp;/g," ");value=value.replace(/&lt;/g,"<");value=value.replace(/&gt;/g,">");value=value.replace(/&quot;/g,'"');value=value.replace(/&amp;/g,"&");return value;},removeExtraSpace:function(text){return text.replace(/ {2,}/g," ");},stringToJSON:function(value){if(value===undefined){return undefined;}if(typeof value==="string"){value=value.replace(/'/g,'"');return JSON.parse(value);}return value;},everythingToString:function(value){if(value===undefined){return undefined;}var result;if(typeof value==="object"){result=JSON.stringify(value.jsonObj||value);}else{result=value.toString();}result=result.replace(/"/g,"'");return result;},compareElementObj:function(obj1,obj2){var tid1=obj1.tid.toString(),tid2=obj2.tid.toString(),eid1=obj1.eid,eid2=obj2.eid;if(tid1!==tid2){return tid1>tid2?1:-1;}if(eid1===eid2){return 0;}return eid1>eid2?1:-1;},isEqualComb:function(eleComb1,eleComb2){var iEqual=true,i,len1=eleComb1.length,len2=eleComb2.length;if(len1!==len2){return false;}if(eleComb1.length>1){eleComb1.sort(this.compareElementObj);}if(eleComb2.length>1){eleComb2.sort(this.compareElementObj);}for(i=0;i<len1;i++){if(this.compareElementObj(eleComb1[i],eleComb2[i])!==0){iEqual=false;break;}}return iEqual;},serializeCombination:function(elemComb){var res="";if(elemComb.length>1){elemComb.sort(this.compareElementObj);}$ARR.forEach(elemComb,function(e){if(res!==""){res+=ELEMENT_SEP;}res+=(e.tid+INTER_SEP+e.eid);});return res;},deserializeCombination:function(combStr){var pairArr=combStr.split(ELEMENT_SEP),res=[];$ARR.forEach(pairArr,function(pair){var a=pair.split(INTER_SEP);var tid=a[0];var eid=a[1];res.push({tid:tid,eid:eid});});return res;},getElementCombinationForMetric:function(metricId){var allElements=[];allElements.push({tid:-1,eid:metricId});return allElements;},getResolvedFormatsObject:function(formatsArr){return getResolvedFormatsObject(formatsArr);},isDigitalArrayEqual:function(arr1,arr2){return isDigitalArrayEqual.call(this,arr1,arr2);},indexOf:function(arrayOfUntis,unit){var i,len=arrayOfUntis.length;for(i=0;i<len;i++){if(isDigitalArrayEqual(arrayOfUntis[i],unit)){return i;}}return -1;},parseAxisScaleData:function(str){var i,n,nv,arr=str.split(","),rtn=[];for(i=0,n=arr.length;i<n;i++){nv=arr[i].split(":");rtn.push(nv);}return rtn;},parseCSSColor:function(strCSSColor,reverse){var digits=strCSSColor.slice(1),arr=[],i;if(digits.length===6){if(reverse===true){arr[0]=digits[4];arr[1]=digits[5];arr[2]=digits[2];arr[3]=digits[3];arr[4]=digits[0];arr[5]=digits[1];}else{for(i=0;i<6;i++){arr[i]=digits[i];}}}else{if(reverse===true){for(i=2;i>=0;i--){arr.push(digits[i]);arr.push(digits[i]);}}else{for(i=0;i<3;i++){arr.push(digits[i]);arr.push(digits[i]);}}}return parseInt("0x"+arr.join(""),16);},RGB_BRG_Switch:function(intColor){var red=(intColor>>16)&255,green=(intColor>>8)&255,blue=(intColor>>0)&255;return(blue<<16)|(green<<8)|(red<<0);},encodeColor:function(v){if(v===undefined||v===null||v==="transparent"||v==="default"){return v;}var isRGB=false,grdObj={};if(isRGB){if(typeof v==="object"){grdObj.c1=this.RGB_BRG_Switch(CLR.encodeColor(v.c1));grdObj.c2=this.RGB_BRG_Switch(CLR.encodeColor(v.c2));grdObj.or=v.or;return grdObj;}return this.RGB_BRG_Switch(CLR.encodeColor(v));}if(typeof v==="object"){grdObj.c1=CLR.encodeColor(v.c1);grdObj.c2=CLR.encodeColor(v.c2);grdObj.or=v.or;return grdObj;}return CLR.encodeColor(v);},checkEquality:function(v1,v2){if(typeof v1==="object"&&v1.c1!==undefined){if(v1.c1!==v2.c1){return false;}if(v1.c2!==v2.c2){return false;}if(v1.or!==v2.or){return false;}return true;}return v1===v2;},decodeColor:function(color){if(color===undefined||color===null||color==="transparent"||color==="default"){return color;}var isRGB=false,grdObj={};if(isRGB){if(typeof color==="object"){grdObj.c1=CLR.decodeColor(this.RGB_BRG_Switch(color.c1));grdObj.c2=CLR.decodeColor(this.RGB_BRG_Switch(color.c2));grdObj.or=color.or;return grdObj;}return CLR.decodeColor(this.RGB_BRG_Switch(color));}if(typeof color==="object"){grdObj.c1=CLR.decodeColor(color.c1);grdObj.c2=CLR.decodeColor(color.c2);grdObj.or=color.or;return grdObj;}return CLR.decodeColor(color);},getTrendLineToggleHandler:function(viz,metricId,enable){return function(){viz.switchOnOffTrendLineForMetric(metricId,enable);};},getTrendLineToggleState:function(viz,metricId){return viz.queryTrendLineStatusForMetric(metricId);},getEditTrendLineHandler:function(viz,metricId){return function(){mstrApp.rootCtrl.docCtrl.selectViPanel("propertiesPanel");viz.raiseEventCMSelection(IDEN_TYPE.TREND_LINE,metricId);};},getEditRefLineHandler:function(viz,metricId){return function(){mstrApp.rootCtrl.docCtrl.selectViPanel("propertiesPanel");viz.raiseEventCMSelection(IDEN_TYPE.REF_LINE,metricId);};},getEditAxisScaleHandler:function(viz,metricId){return function(){mstrApp.rootCtrl.docCtrl.selectViPanel("propertiesPanel");viz.raiseEventCMSelection(IDEN_TYPE.AXIS_SCALE,metricId);};},getEditAxisOriginHandler:function(viz,metricId){return function(){mstrApp.rootCtrl.docCtrl.selectViPanel("propertiesPanel");viz.raiseEventCMSelection(IDEN_TYPE.AXIS_ORIGIN_DEFINE,metricId);};},getEditLogScaleHandler:function(viz,metricId){return function(){mstrApp.rootCtrl.docCtrl.selectViPanel("propertiesPanel");viz.raiseEventCMSelection(IDEN_TYPE.LOG_SCALE,metricId);};},getOptionObjArr:function(mIndexArr,axis,forceToAxis){if(!GMUTIL){GMUTIL=mstrmojo.gm.GMUtility;}var res={},mo;if(axis!==undefined){axis=axis.toLowerCase();if(axis==="x1"){axis="x";}else{if(axis==="y1"){axis="y";}}}if(mIndexArr.length>1||(forceToAxis&&mIndexArr.length===1)){if(axis==="x"){res.opt=mstrmojo.desc(11712,"Bottom Axis");res.key="XAxis";}else{if(axis==="x2"){res.opt=mstrmojo.desc(11710,"Top Axis");res.key="X2Axis";}else{if(axis==="y"){res.opt=mstrmojo.desc(11715,"Left Axis");res.key="YAxis";}else{if(axis==="y2"){res.opt=mstrmojo.desc(11713,"Right Axis");res.key="Y2Axis";}else{if(axis==="z"){res.opt=mstrmojo.desc(12090,"SizeBy");res.key="SizeBy";}}}}}res.optLvl=$SEL_OPT_LVL.AXIS;res.mos=this.getMetricFormatFromIndexArray(mIndexArr);}else{if(mIndexArr.length===1){mo=this.getMetricFormat(mIndexArr[0]);res.opt=mo.n;res.mos=[mo];res.key=mo.mId;res.comb=GMUTIL.getElementCombinationForMetric(mo.mId);res.optLvl=$SEL_OPT_LVL.METRIC;if(axis==="z"){res.sizeBy=true;}}}return res;},filterInValidMetricIndex:function(metricIndexArr){var res=[];$ARR.forEach(metricIndexArr,function(mtx){if(mtx!==INVALID_METRIC_IDX){res.push(mtx);}});return res;},fillBackgroundDiv:function(div){var bkDiv=document.createElement("div");bkDiv.setAttribute("class","gm-bk-div");bkDiv.style.backgroundColor="rgba(0,0,0,0)";div.appendChild(bkDiv);},getSubMenu:function(visGM,menuCfg,metricId,metricIdx){var shapeOptions=getChageShapeOptions(visGM,metricIdx),gmChangeShapeHandler=visGM.getMenuHandler("changeShape"),currValue=visGM.GMController.getOnTheFlyShapeForMetric(metricIdx);if(shapeOptions.length>1){menuCfg.addSubMenuItem(mstrmojo.desc(11972,"Change Shape"),"",visGM.id,getChangeShapeRadioToggleMenu,{currValue:currValue,options:shapeOptions,metricId:metricId});}else{menuCfg.addRadioMenuGroup(currValue,shapeChanged(metricId,gmChangeShapeHandler),shapeOptions,"checkMark",undefined,true);}},getReferenceLineSubMenu:function(visGM,menuCfg,isABL,metricId){var SUB_TYPE=mstrmojo.gm.EnumSubtype,resultantSubtype=visGM.GMController.chartSubType;if(isABL&&resultantSubtype===SUB_TYPE.PERCENT){return ;}var scopeId=visGM.id,availableRefLineTypes=visGM.getAvailableRefLineTypes(metricId)||[];if(availableRefLineTypes.length>0){menuCfg.addSubMenuItem(mstrmojo.desc(13021,"Add Reference Line"),"xt",scopeId,getAddReferenceLineSubMenu,{metricId:metricId,options:availableRefLineTypes});}var refLineOptions=visGM.getExistingRefLineOptions(metricId)||[];if(refLineOptions.length>0){menuCfg.addMenuItem(mstrmojo.desc(13659,"Edit Reference Line"),"xt",GMUTIL.getEditRefLineHandler(visGM,metricId));menuCfg.addSubMenuItem(mstrmojo.desc(13022,"Remove Reference Line"),"xt",scopeId,getRemoveReferenceLineSubMenu,{metricId:metricId,options:refLineOptions});}},reverseMapping:function reverseMapping(arr){var mp={},i,len=arr.length;for(i=0;i<len;i++){mp[arr[i]]=i;}return mp;},longIntAnd:function(a,b){var tmp;if(a===b){return a;}if(a>POW2_60||b>POW2_60){throw new Error("Operand exceeds valid data range.");}if(a<POW2_30&&b<POW2_30){return a&b;}if(a>=POW2_30||b>=POW2_30){if(a<b){tmp=a;a=b;b=tmp;}}var highA=Math.floor(a/POW2_30),highB=Math.floor(b/POW2_30),lowA=a-highA*POW2_30,lowB=b-highB*POW2_30;return(lowA&lowB)+(highA&highB)*POW2_30;},longIntOr:function(a,b){var tmp;if(a===b){return a;}if(a<POW2_30&&b<POW2_30){return a|b;}if(a<b){tmp=a;a=b;b=tmp;}tmp=this.longIntAnd(a,b);return b-tmp+a;},parseNumeric:function(v){return +v||parseFloat(v);},fillTextInDiv:function(div,identity,text,width,height,wrap,styles,hAlign,vAlign){if(width===undefined){width=div.offsetWidth;}if(height===undefined){height=div.offsetHeight;}if(hAlign===undefined){hAlign=PRP_TEXT_HALIGN.MIDDLE;}if(vAlign===undefined){vAlign=PRP_TEXT_VALIGN.MIDDLE;}if(wrap===undefined){wrap=false;}var textWidth,textHeight,textBody,cls=wrap?"gm-text-body":"gm-text-body-nowrap",needTooltip=false,dotsWidth;textWidth=$VISUTILS.measureTextWidth(text,styles,6);dotsWidth=$VISUTILS.measureTextWidth("...",styles,6);if(textWidth>width&&dotsWidth>width){return ;}textBody=document.createElement("div");textBody.setAttribute("class",cls);textBody.setAttribute("type",CTRL_TYPE.GM_TEXT_BODY);textBody.identity=identity;$VISUTILS.applyStyles2DomNode(textBody,styles);textBody.innerHTML=text;div.appendChild(textBody);if(wrap){if(textWidth>width){textHeight=textBody.offsetHeight;}else{textHeight=$VISUTILS.measureTextHeight(text,styles,4);}}else{textHeight=$VISUTILS.measureTextHeight(text,styles,4);needTooltip=textWidth>width;}textWidth=Math.min(textWidth,width);textBody.style.width=textWidth+"px";if(wrap){needTooltip=textBody.scrollWidth>textWidth||textBody.scrollHeight>textHeight;}if(needTooltip){textBody.setAttribute("title",text);}else{textBody.setAttribute("title","");}switch(hAlign){case PRP_TEXT_HALIGN.LEFT:textBody.style.left="0px";textBody.style.textAlign="left";break;case PRP_TEXT_HALIGN.MIDDLE:textBody.style.left=((width-textWidth)>>1)+"px";break;case PRP_TEXT_HALIGN.RIGHT:textBody.style.right="0px";textBody.style.textAlign="right";break;}switch(vAlign){case PRP_TEXT_VALIGN.TOP:textBody.style.top="0px";break;case PRP_TEXT_VALIGN.MIDDLE:textBody.style.top=((height-textHeight)>>1)+"px";break;case PRP_TEXT_VALIGN.BOTTOM:textBody.style.bottom="0px";break;}},updateTextColorAndAlignment:function(div,hAlign,vAlign){var textBody=div.firstChild,textStyle=textBody.style,width=div.clientWidth,textWidth=textBody.clientWidth,height=div.clientHeight,textHeight=textBody.clientHeight;textStyle.left="auto";textStyle.right="auto";switch(hAlign){case PRP_TEXT_HALIGN.LEFT:textStyle.left="0px";break;case PRP_TEXT_HALIGN.MIDDLE:textStyle.left=((width-textWidth)>>1)+"px";break;case PRP_TEXT_HALIGN.RIGHT:textStyle.right="0px";break;}textStyle.top="auto";textStyle.bottom="auto";switch(vAlign){case PRP_TEXT_VALIGN.TOP:textStyle.top="0px";break;case PRP_TEXT_VALIGN.MIDDLE:textStyle.top=((height-textHeight)>>1)+"px";break;case PRP_TEXT_VALIGN.BOTTOM:textStyle.bottom="0px";break;}},toggleDisplay:function(div,show){if(!div){return ;}if(show){div.style.display="block";}else{div.style.display="none";}},isTrendLineAvailableForMetric:function(visGM,midx,metricShape){var skipTrd=false,SUB_TYPE=mstrmojo.gm.EnumSubtype,SHAPE_TYPE=$MOJO.gm.EnumShape,gmCtr=visGM.GMController,resultantSubtype=gmCtr.chartSubType,dz=visGM.model.data.dz,xAxis=dz.XAxis,yAxis=dz.YAxis,breakBy=dz.BreakBy,sliceBy=dz.SliceBy,metricShapeType=metricShape,chtInfo=gmCtr.getChartInfo(),isMultiSeries=gmCtr.getBreakByAttrsID().length>0||(chtInfo.isABL&&((xAxis.MetricNames!==undefined)||(yAxis.MetricNames!==undefined)||(breakBy.MetricNames!==undefined)||(sliceBy.MetricNames!==undefined)));if(metricShapeType===undefined){metricShapeType=gmCtr.getOnTheFlyShapeForMetric(midx);}if(chtInfo.isABL&&resultantSubtype===SUB_TYPE.PERCENT){skipTrd=true;}if(isMultiSeries&&!chtInfo.isBubbleOrScatter&&(metricShapeType===SHAPE_TYPE.BAR||resultantSubtype===SUB_TYPE.STACKED||(resultantSubtype===SUB_TYPE.AUTO&&metricShapeType===SHAPE_TYPE.AREA))){skipTrd=true;}if(chtInfo.isABL){if(xAxis.TemplateUnit&&xAxis.TemplateUnit.length>1){skipTrd=true;}if(yAxis.TemplateUnit&&yAxis.TemplateUnit.length>1){skipTrd=true;}if(xAxis.TemplateUnit===undefined&&yAxis.TemplateUnit===undefined){skipTrd=true;}}skipTrd=skipTrd||this.isIgnoredMetric(visGM,midx);return !skipTrd;},isTrendLineAvailableForAnyMetric:function(visGM){var metrics=visGM.model.data.gsi.mx,midx;for(midx in metrics){if(this.isTrendLineAvailableForMetric(visGM,midx)){return true;}}return false;},isIgnoredMetric:function(visGM,midx){var gmCtr=visGM.GMController,metricsOnAxis,indexOnAxis;if(gmCtr.bubbleSeriesNum!==undefined){metricsOnAxis=gmCtr.getMetricsOnYAxis();indexOnAxis=metricsOnAxis.indexOf(midx);if(indexOnAxis>=gmCtr.bubbleSeriesNum){return true;}metricsOnAxis=gmCtr.getMetricsOnXAxis();indexOnAxis=metricsOnAxis.indexOf(midx);if(indexOnAxis>=gmCtr.bubbleSeriesNum){return true;}}return false;},getAxisMetricsInfo:function(visGM){var dz=visGM.model.data.dz,mx=visGM.model.data.gsi.mx,metrics,found,rets=[];if(!dz||!dz.ColorBy||!mx){return mx;}var getTm=function(dzn){return(dzn&&dzn.TemplateMetric)||[];};metrics=getTm(dz.YAxis).concat(getTm(dz.XAxis));$ARR.forEach(mx,function(outer){found=false;$ARR.forEach(metrics,function(inner){if(outer.did===inner.id){found=true;return false;}});if(found){rets.push(outer);}});return rets;},isInvalidTemplate:function isInvalidTemplate(modelData){if(modelData.eg){return false;}var temp=modelData.gts;var invalidTemplate=temp.row.length===0&&temp.col.length===0;$ARR.forEach(temp.row,function(u){if(u.otp===-1){invalidTemplate=true;}});var gtsCol=temp.col;if(gtsCol.length>0){var i,last=gtsCol.length-1;for(i=0;i<last;i++){if(gtsCol[i].otp===-1){invalidTemplate=true;}}}return invalidTemplate;},isNoData:function(modelData){return modelData.eg!==undefined;},getInvalidTemplateErrMsg:function(dftMsg){return dftMsg||mstrmojo.desc(12094,"The Graph Matrix requires:")+"\n"+mstrmojo.desc(12095,"- at least one attribute to be placed on the row or column axis")+"\n"+mstrmojo.desc(12096,"- all metrics to be placed on the column axis, below any attributes");},initColorPickerBtnWithGradientDir:function(colorPickerBtn,vis){mstrmojo.func.override({showPickerForCurrentMode:function showPickerForCurrentMode(){this._super();if(this.pickerMode===2&&typeof this.color!=="object"){var gradientDir=this.gradientOrientation,isVerticalGraph=vis.getChartInfo().dirc===mstrmojo.gm.EnumABLDirection.VERTICAL;gradientDir.set("selectedIndex",$ARR.find(gradientDir.items,"id",isVerticalGraph?0:1));}}},colorPickerBtn.colorPicker);},generateToolTipContent:function(startIndex,count,isRowAttribute,objsArr,elesArr,contentArr,partInfo){var i,currentObj,previousObj,currentEle,previousEle,isRowAttr;for(i=startIndex;i<count;i++){currentObj=objsArr[i];currentEle=elesArr[i];if(i>startIndex){previousObj=objsArr[i-1];previousEle=elesArr[i-1];if(currentObj.id===previousObj.id){if(currentEle===""){continue;}if(currentObj.fid===previousObj.fid&&currentEle.idx===previousEle.idx){continue;}if(currentObj.n===""){contentArr[contentArr.length-1].v+=$FORM_SEP+currentEle.n;continue;}}}if(partInfo){contentArr.push({n:currentObj.n,tid:currentObj.id,v:currentEle.n});}else{isRowAttr=isRowAttribute===undefined?currentObj.isRowAttribute:isRowAttribute;contentArr.push({n:currentObj.n,tid:currentObj.id,v:currentEle.n,eid:currentEle.id,tp:currentObj.otp,axis:isRowAttr?1:2,tui:currentObj.tui,ui:currentObj.tui,dpt:currentObj.tui+1,at:currentEle.at,isRowAttribute:isRowAttr,dei:currentEle.dei,o:currentEle.o});}}},getAttributeFormCnt:function(attr){var formCount;if((attr.fcnt===undefined||attr.fcnt===null)&&attr.fs){attr.fcnt=attr.fs.length||1;}if(attr.fcnt!==undefined&&attr.fcnt!==null){formCount=attr.fcnt;}else{if(attr.t===47){formCount=1;}else{formCount=attr.cs!==undefined?attr.cs:attr.rs;}}return formCount;},isTrueForBoolValue:function(value){return value===true||value==="true";},computeTicksForAxis:function(axis,customOptions){var options=axis.mOptions,actualOptions,result={mTicks:[]};if(customOptions){actualOptions=$HASH.copy(options);$HASH.copy(customOptions,actualOptions);}else{actualOptions=options;}if(axis.mIsPercent){hComputeTicksForPercent.call(axis,result,actualOptions);return result;}if(actualOptions.mUseLogarithmicScale){hComputeTicksForLogScale.call(axis,result,actualOptions);return result;}if(axis.mGraphMajorType===$GMT.GMT_BUBBLE&&axis.mTripleId.mObjectId===$GO.DssGraphZBody){result.mMinTick=actualOptions.mUseMinValue?actualOptions.mAxisMinValue:axis.mMinimum;result.mMaxTick=actualOptions.mUseMaxValue?actualOptions.mAxisMaxValue:axis.mMaximum;if(axis.mMinTick>=axis.mMaxTick){result.mMaxTick=result.mMinTick+1;}return result;}if(!actualOptions.mUseMaxValue&&!actualOptions.mUseMinValue){hComputeTicksForFlexMinMax.call(axis,result,actualOptions);}else{if(actualOptions.mUseMaxValue&&actualOptions.mUseMinValue){hComputeTicksForFixMinMax.call(axis,result,actualOptions);}else{if(actualOptions.mUseMaxValue){hComputeTicksForFixMax.call(axis,result,actualOptions);}else{hComputeTicksForFixMin.call(axis,result,actualOptions);}}}return result;},computeTicksForLogScale:function(axis){var options=axis.mOptions,result={mTicks:[]};hComputeTicksForLogScale.call(axis,result,options);return result;},destroyDisposable:function(scope,obj){if(obj){$ARR.removeItem(scope.disposables,obj);obj.destroy();}},handleDestroy:function(scope,filter){if(!scope){return ;}var obj,i=0,disposables=scope.disposables,n=(disposables&&disposables.length)||0;while(i<n){obj=disposables[i];if(!obj.scriptClass||filter.indexOf(obj.scriptClass)<0){this.destroyDisposable(scope,obj);}if(disposables.length<n){n=disposables.length;}else{i++;}}}});}());