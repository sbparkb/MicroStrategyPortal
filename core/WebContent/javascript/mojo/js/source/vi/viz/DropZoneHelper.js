(function(){mstrmojo.requiresCls("mstrmojo.Base","mstrmojo.array");var $MOJO=mstrmojo,$ARR=$MOJO.array,METRIC_NAMES_ID="00000000000000000000000000000000",METRIC_TEMPLATE_HEADER=-1;function isMetric(item){return item.t===4&&item.id!==METRIC_NAMES_ID;}function isMetricZone(z){var i,n=(z&&z.length)||0;if(n===0){return false;}for(i=0;i<n;i++){if(!isMetric(z[i])){return false;}}return true;}mstrmojo.VisProps=null;mstrmojo.vi.viz.DropZoneHelper=mstrmojo.declare(mstrmojo.Base,null,{scriptClass:"mstrmojo.vi.viz.DropZoneHelper",getXml:function getXml(){return"";},setData:function setData(p){},isMetric:function(item){return isMetric(item);},isMetricZone:function(z){return isMetricZone(z);},getMetricCountInZone:function getMetricCountInZone(zoneItems){var metricCnt=0;$ARR.forEach(zoneItems,function(item){if(isMetric(item)){metricCnt++;}});return metricCnt;}});mstrmojo.vi.viz.DropZoneHelper.METRIC_NAMES_ID=METRIC_NAMES_ID;mstrmojo.vi.viz.DropZoneHelper.isMetricNames=function isMetricNames(item){return(parseInt(item.did,10)===METRIC_TEMPLATE_HEADER)||(item.id===METRIC_NAMES_ID)||(item.did===METRIC_NAMES_ID);};}());