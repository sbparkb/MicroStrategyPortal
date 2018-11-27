(function(){mstrmojo.requiresCls("mstrmojo.Base");mstrmojo.requiresClsP("mstrmojo.chart","GridMap","TextObject","ChartContext","ChartConstants");mstrmojo.requiresClsP("mstrmojo.chart.enums","EnumGraphMatrixDataLabelPosition");mstrmojo.requiresClsP("mstrmojo.chart.model.enums","EnumDSSGraphMarkerShape","EnumShapeType");var $C=mstrmojo.chart,$K=$C.ChartConstants,$M=$C.model,$MODEL_ENUMS=$M.enums,$CHART_ENUMS=$C.enums,$MS=$MODEL_ENUMS.EnumDSSGraphMarkerShape,$GMDLP=$CHART_ENUMS.EnumGraphMatrixDataLabelPosition,$SHP=$MODEL_ENUMS.EnumShapeType,kRectUnit={};function hInitGridMapOccupationByDataObject(){var chartCtx=this.ChartContext,isPieChart=chartCtx.IsPieChart(),isBubbleScatterChart=(chartCtx.IsBubbleChart()||chartCtx.IsScatterChart()),len=this.SinglePointObjects.length,i,commonRect=new $C.Rect2D(),rect,gridMap=this.GridMap,polyLineObjects=this.PolyLineObjects,polygonObjects=this.PolygonObjects,rectangleObjects=this.RectangleObjects,dataAreaFrame=this.DataAreaFrame,circlePieObjects=this.CirclePieObjects;for(i=0;i<len;++i){commonRect.Reset(0,0,0,0);rect=this.SinglePointObjects[i].GetBoundingRect();if(chartCtx.RectangleIntersection(rect,dataAreaFrame,commonRect)){gridMap.UpdateMatrixRect(commonRect);}}len=polyLineObjects.length;for(i=0;i<len;++i){gridMap.UpdateMatrixPolyLine(polyLineObjects[i]);}len=polygonObjects.length;var canvas=document.createElement("canvas");canvas.width=this.ChartContext.mGraphWidth;canvas.height=this.ChartContext.mGraphHeight;for(i=0;i<len;++i){gridMap.UpdateMatrixPolygonWithCanvas(polygonObjects[i],canvas);}len=rectangleObjects.length;for(i=0;i<len;++i){commonRect.Reset(0,0,0,0);if(chartCtx.RectangleIntersection(rectangleObjects[i],dataAreaFrame,commonRect)){gridMap.UpdateMatrixRect(commonRect);if(isBubbleScatterChart){gridMap.UpdateMatrixOccupyObject(commonRect,rectangleObjects[i]);}}}len=circlePieObjects.length;for(i=0;i<len;++i){var center=circlePieObjects[i].mCenter,radius=circlePieObjects[i].mRadius,boundRect=new $C.Rect2D({x:center.x-radius,y:center.y-radius,height:radius*2,width:radius*2});gridMap.UpdateMatrixCircle(center,radius,true);if(isPieChart){gridMap.UpdateMatrixOccupyCircleObject(boundRect,center,radius);}}}function hGetCorrectLocationByOrder(order,dataLabel){var chartCtx=this.ChartContext,isLineChart=chartCtx.IsLineChart(),isAreaChart=chartCtx.IsAreaChart(),isBubbleScatterChart=(chartCtx.IsBubbleChart()||chartCtx.IsScatterChart()),isDataPointMarker=false,gmCtx=chartCtx.GetGraphMatrixContext(),dataLabelLocation=order,markerShape,chartFrame,hostMarkerPoint=dataLabel.HostMarkerPoint;markerShape=gmCtx.mMarkerShape;if(markerShape===$MS.DssGraphMarkerShapeCircle||markerShape===$MS.DssGraphMarkerShapeRectangle||markerShape===$MS.DssGraphMarkerShapeSquare){isDataPointMarker=true;}if((isLineChart&&!isDataPointMarker)||isAreaChart){if(order===$GMDLP._BOTTOM){dataLabelLocation=$GMDLP._TOP;}else{if(order===$GMDLP._TOP){dataLabelLocation=$GMDLP._BOTTOM;}}}else{if(isBubbleScatterChart){chartFrame=new $C.Rect2D({x:0,y:0,width:chartCtx.mGraphWidth,height:chartCtx.mGraphHeight});if(order===$GMDLP._BOTTOM){if(hostMarkerPoint.y<=chartFrame.height/2){dataLabelLocation=$GMDLP._TOP;}else{dataLabelLocation=$GMDLP._BOTTOM;}}else{if(order===$GMDLP._TOP){if(hostMarkerPoint.y<=chartFrame.height/2){dataLabelLocation=$GMDLP._BOTTOM;}else{dataLabelLocation=$GMDLP._TOP;}}}}}return dataLabelLocation;}function hPutDataLabelInLocation(dataLabel,location,dataLabelPadding){var hostCenter=dataLabel.HostMarkerPoint,xOffset=dataLabel.CenterXOffset,yOffset=dataLabel.CenterYOffset,dataLabelCenterX=hostCenter.x,dataLabelCenterY=hostCenter.y,rect=dataLabel.Label.GetBoundingRect(true);switch(location){case $GMDLP._BOTTOM:dataLabelCenterY+=yOffset+dataLabelPadding+rect.height*0.5;break;case $GMDLP._TOP:dataLabelCenterY-=yOffset+dataLabelPadding+rect.height*0.5;break;case $GMDLP._LEFT:dataLabelCenterX-=xOffset+dataLabelPadding+rect.width*0.5;break;case $GMDLP._RIGHT:dataLabelCenterX+=xOffset+dataLabelPadding+rect.width*0.5;break;default:break;}dataLabel.Label.MoveToCenter(dataLabelCenterX,dataLabelCenterY);}function hIsTwoRectFitPadding(dataLabelRect,Rect,padding){if(dataLabelRect.x+dataLabelRect.width+padding<=Rect.x||dataLabelRect.x>=Rect.x+Rect.width+padding){return true;}return(dataLabelRect.y+dataLabelRect.height+padding<=Rect.y||dataLabelRect.y>=Rect.y+Rect.height+padding);}mstrmojo.chart.DataLabelManager=mstrmojo.declare(mstrmojo.Base,null,{scriptClass:"mstrmojo.chart.DataLabelManager",GridMap:null,DataAreaFrame:null,ChartContext:null,seriesOptions:[],SinglePointObjects:[],PolygonObjects:[],PolyLineObjects:[],RectangleObjects:[],CirclePieObjects:[],init:function init(props){var chartCtx=this.ChartContext,gmCtx,dataLabelPadding;if(props&&props.DataArea){this.DataAreaFrame=props.DataArea;kRectUnit.height=2;kRectUnit.width=2;if(chartCtx!==null&&chartCtx!==undefined){gmCtx=chartCtx.GetGraphMatrixContext();dataLabelPadding=gmCtx.getPadding($K.kDataLabel);}this.GridMap=new $C.GridMap({Rect:this.DataAreaFrame,Unit:kRectUnit,dataLabelPadding:dataLabelPadding});}this.allowOverlap=(chartCtx&&chartCtx.allowOverlapBetweenDatalabels())||false;this.SinglePointObjects=[];this.PolygonObjects=[];this.PolyLineObjects=[];this.RectangleObjects=[];this.CirclePieObjects=[];this.seriesOptions=[];},PlaceDataLabels:function PlaceDataLabels(dataLabelVec,shownDataLabels,clearOnFinish){var isDataPointMarker=false,chartCtx=this.ChartContext,gmCtx=chartCtx.GetGraphMatrixContext(),isLineChart=chartCtx.IsLineChart(),isAreaChart=chartCtx.IsAreaChart(),isPieChart=chartCtx.IsPieChart(),isBubbleScatterChart=(chartCtx.IsBubbleChart()||chartCtx.IsScatterChart()),isComboChart=gmCtx.isCombinationChart(),len,i,j,k,dataLabelLocation,chartFrame,isAccomatable,markerShape,commonRect=new $C.Rect2D(),rect,seriesId,seriesIndex,seriesOption,shape,numberOfExistingDataLabels,checkDataLabel,checkRect,gridMap,dataLabelPadding=gmCtx.getPadding($K.kDataLabel);this.allowOverlap=(chartCtx&&chartCtx.allowOverlapBetweenDatalabels())||false;this.GridMap.populate();gridMap=this.GridMap;markerShape=gmCtx.mMarkerShape;clearOnFinish=clearOnFinish||!(chartCtx.isCombinationChart()||chartCtx.IsDualAxis());if(markerShape===$MS.DssGraphMarkerShapeCircle||markerShape===$MS.DssGraphMarkerShapeRectangle||markerShape===$MS.DssGraphMarkerShapeSquare){isDataPointMarker=true;}hInitGridMapOccupationByDataObject.call(this);len=dataLabelVec.length;for(i=0;i<len;++i){var dataLabel=dataLabelVec[i],valid=dataLabel.isValid;if(!valid){continue;}if(isComboChart){seriesId=dataLabel.SeriesId;seriesIndex=dataLabel.SeriesInfo;seriesOption=this.seriesOptions[seriesIndex];if(seriesOption){shape=seriesOption.mRealSereisType;if(shape===$SHP._LINE||shape===$SHP._GENERIC){isLineChart=true;}else{if(shape===$SHP._CIRCLE||shape===$SHP._SQUARE||shape===$SHP._RECTANGLE){isLineChart=true;isDataPointMarker=true;}else{if(shape===$SHP._AREA){isAreaChart=true;}else{if(shape===$SHP._PIE){isPieChart=true;}}}}}}isAccomatable=this.allowOverlap;for(j=$GMDLP._BOTTOM;j<=$GMDLP._RIGHT;++j){if(isPieChart&&j>0){break;}dataLabelLocation=$GMDLP._BOTTOM;if(!isPieChart){dataLabelLocation=hGetCorrectLocationByOrder.call(this,j,dataLabel);hPutDataLabelInLocation.call(this,dataLabel,dataLabelLocation,dataLabelPadding);}rect=dataLabel.Label.GetBoundingRectNoRotation(true);chartFrame=this.DataAreaFrame;if(this.allowOverlap===false){isAccomatable=gridMap.IsFitPaddingWithBorder(rect,chartFrame);if(!isAccomatable){continue;}if(isLineChart&&isDataPointMarker){isAccomatable=gridMap.IsAccomdatableConsiderLocation(rect,dataLabelLocation);}else{if((isLineChart&&!isPieChart)||isAreaChart){isAccomatable=gridMap.IsAccomdatableConsiderLabelPaddingOnly(rect,true);}else{if(isBubbleScatterChart){isAccomatable=gridMap.IsAccomdatableConsiderAccuDistPaddingRect(rect);}else{if(isPieChart){isAccomatable=gridMap.IsAccomdatableConsiderAccuDistPaddingCircle(dataLabel.HostMarkerPoint,dataLabel.HostMarkerBound.width/2,rect);}}}}if(!isAccomatable){continue;}numberOfExistingDataLabels=(shownDataLabels!==undefined&&shownDataLabels!==null)?shownDataLabels.length:0;for(k=0;k<numberOfExistingDataLabels;++k){checkDataLabel=shownDataLabels[k];if(checkDataLabel.mIsShown){checkRect=checkDataLabel.GetBoundingRect(true);isAccomatable=hIsTwoRectFitPadding.call(this,rect,checkRect,dataLabelPadding);if(!isAccomatable){break;}}}}if(isAccomatable){dataLabel.display=true;dataLabel.DataLabelLocation=dataLabelLocation;commonRect.Reset(0,0,0,0);if(chartCtx.RectangleIntersection(rect,this.DataAreaFrame,commonRect)){gridMap.UpdateMatrixDataLabelMarker(true,commonRect);if(isBubbleScatterChart||isPieChart){gridMap.UpdateMatrixOccupyObject(commonRect,rect);}}dataLabel.Label.mIsShown=true;if(shownDataLabels!==undefined&&shownDataLabels!==null){shownDataLabels.push(dataLabel.Label);}break;}}if(!isAccomatable){dataLabel.Label.mIsShown=false;}}if(clearOnFinish){this.GridMap.destroy();}return true;},UpdateMatrixDataLabel:function UpdateMatrixDataLabel(dataLabelRect){return this.GridMap.UpdateMatrixDataLabelMarker(true,dataLabelRect);}});}());