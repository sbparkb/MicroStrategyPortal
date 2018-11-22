(function(){mstrmojo.requiresClsP("mstrmojo.chart.enums","EnumGraphMajorType","EnumDSSExtraGraphObject","EnumDSSGraphObjectManager");mstrmojo.requiresClsP("mstrmojo.chart.model.enums","EnumDSSGraphType","EnumDSSGraphProperty","EnumDSSGraphObject","EnumVariantBool","EnumDSSExtraGraphProperty");mstrmojo.requiresClsP("mstrmojo.chart","GraphObjectManager","CategoryPlotManager","TripleId","Rect2D","RectangleObject","TextObject","Legend","GridChartPlotManager","ValuePlotManager");var $C=mstrmojo.chart,$CHART_ENUMS=$C.enums,$EGO=$CHART_ENUMS.EnumDSSExtraGraphObject,$GMT=$CHART_ENUMS.EnumGraphMajorType,$CHART_CONTEXT=$C.ChartContext,$GOM=$CHART_ENUMS.EnumDSSGraphObjectManager,$GOM_LEGEND=$GOM.DssLegend,$NULL_ID=$C.gNullTripleId,$NULL_SERIES_ID=$C.gNullSeriesId,$NULL_GROUP_ID=$C.gNullGroupId;var $M=mstrmojo.chart.model,$MODEL_ENUMS=$M.enums,$GT=$MODEL_ENUMS.EnumDSSGraphType,$GP=$MODEL_ENUMS.EnumDSSGraphProperty,$GO=$MODEL_ENUMS.EnumDSSGraphObject,$VB=$MODEL_ENUMS.EnumVariantBool,$VF=$VB.VARIANT_FALSE,$EGP=$MODEL_ENUMS.EnumDSSExtraGraphProperty;function hDisplayBanner(area,enfored){var chartCtx=this.mChartContextPtr,objectList=this.mGraphObjectList,warningMessageStr,warningMessageObj,boundingRect;enfored=enfored||false;if(!this.isSupportedChartType()||enfored){warningMessageStr="Graph Type Not Supported";warningMessageObj=new $C.TextObject({TripleId:new $C.TripleId({ObjectId:$EGO.DssGraphWarningMessage}),GraphObjectManager:this});warningMessageObj.SetTextWidthLimit(area.width);warningMessageObj.SetText(warningMessageStr);boundingRect=warningMessageObj.GetBoundingRect();warningMessageObj.SetTextWidthLimit(area.width);warningMessageObj.MoveTo((area.width-boundingRect.width)/2,(area.height-boundingRect.height)/2);objectList.push(warningMessageObj);return true;}if(!this.checkDataset()){warningMessageStr="Insufficient Data To Plot";warningMessageObj=new $C.TextObject({TripleId:new $C.TripleId([$EGO.DssGraphWarningMessage,$NULL_SERIES_ID,$NULL_GROUP_ID]),GraphObjectManager:this});warningMessageObj.SetTextWidthLimit(area.width);warningMessageObj.SetText(warningMessageStr);boundingRect=warningMessageObj.GetBoundingRect();warningMessageObj.SetTextWidthLimit(area.width);warningMessageObj.MoveTo((area.width-boundingRect.width)/2,(area.height-boundingRect.height)/2);objectList.push(warningMessageObj);return true;}var showBanner=chartCtx.mImageUsage===32;if(showBanner){warningMessageStr=this.mDatasetPtr.GetBannerText();warningMessageObj=new $C.TextObject({TripleId:new $C.TripleId([$EGO.DssGraphBanner,0,0]),GraphObjectManager:this});warningMessageObj.SetTextWidthLimit(area.width);warningMessageObj.SetText(warningMessageStr);boundingRect=warningMessageObj.GetBoundingRect();warningMessageObj.SetTextWidthLimit(area.width);warningMessageObj.MoveTo((area.width-boundingRect.width)/2,(area.height-boundingRect.height)/2);objectList.push(warningMessageObj);return true;}return false;}mstrmojo.chart.ChartManager=mstrmojo.declare(mstrmojo.chart.GraphObjectManager,null,{scriptClass:"mstrmojo.chart.ChartManager",mGraphType:$GT.DssGraphTypeVertical_Bar_Side_by_Side,mPlotManagers:null,mDatasetPtr:null,mLegendPtr:null,mHighlightLayerObjectPtr:null,mIsTitleShown:false,mIsSubtitleShown:false,mIsFootnoteShown:false,mIsLegendShown:false,mIsExpanded:false,mIsInitialized:false,mLeftMargin:0,mRightMargin:0,mTopMargin:0,mBottomMargin:0,mAxisLabelsAutoFit:true,init:function init(props){this._super(props);this.mPlotManagers=[];},GenerateMapAndList:function GenerateMapAndList(){var chartCtx=this.mChartContextPtr,area,value,background,plot,plotManager,len,i;this.LoadProperties();area=new $C.Rect2D({x:0,y:0,width:chartCtx.mGraphWidth,height:chartCtx.mGraphHeight});if(hDisplayBanner.call(this,area)===true){this.mIsInitialized=true;return ;}if(!chartCtx.mIsGraphMatrix){value=chartCtx.GetProperty($GP.DssGraph2ScaleDirection,new $C.TripleId({ObjectId:$GO.DssGraphO1Body,SeriesId:-3}));if(value){this.mDatasetPtr.mReverseGroup=(value!==$VF);}else{this.mDatasetPtr.mReverseGroup=false;}background=this.CreateBackground();this.mGraphObjectList.unshift(background);this.AddToMap(background);}plot=null;plotManager=null;switch(chartCtx.GetGraphMajorType()){case $GMT.GMT_GRID:this.CalculateLayout(area);plotManager=new $C.GridChartPlotManager({TripleId:$C.PlotManagerId,GraphObjectManager:this,Area:area});break;case $GMT.GMT_BOX:case $GMT.GMT_CATEGORY:this.CalculateLayout(area);plotManager=new $C.CategoryPlotManager({TripleId:$C.PlotManagerId,GraphObjectManager:this,Area:area});break;case $GMT.GMT_PIE:break;case $GMT.GMT_SCATTER:case $GMT.GMT_BUBBLE:this.CalculateLayout(area);plotManager=new $C.ValuePlotManager({TripleId:$C.PlotManagerId,GraphObjectManager:this,Area:area});break;default:hDisplayBanner.call(this,area,true);break;}if(plotManager!==null&&plotManager!==undefined){this.mGraphObjectManagerList.unshift(plotManager);plotManager.SetDataset(this.mDatasetPtr);plotManager.mLegendPtr=this.mLegendPtr;if(chartCtx.mIsTimeSeriesChart){this.mRightMargin=0;}plotManager.SetMarginInfo(this.mLeftMargin,this.mRightMargin,this.mTopMargin,this.mBottomMargin);this.mPlotManagers.push(plotManager);len=this.mPlotManagers.length;for(i=0;i<len;++i){this.mPlotManagers[i].GenerateMapAndList();}}this.mIsInitialized=true;},LoadProperties:function LoadProperties(){var chartCtx=this.mChartContextPtr,value,graphMajorType,readExpandOption,value2;value=chartCtx.GetProperty($GP.DssGraphType,$NULL_ID);if(value){this.mGraphType=value;}if(chartCtx.mIsTimeSeriesChart||chartCtx.mIsGraphMatrix){this.mIsTitleShown=false;this.mIsSubtitleShown=false;this.mIsFootnoteShown=false;this.mIsLegendShown=false;return ;}graphMajorType=chartCtx.GetGraphMajorType();if(graphMajorType!==$GMT.GMT_3D_CATEGORY&&graphMajorType!==$GMT.GMT_HISTOGRAM&&graphMajorType!==$GMT.GMT_BOX){value=chartCtx.GetProperty($GP.DssGraphShowLegendText,$NULL_ID);if(value){this.mIsLegendShown=value!==$VF;}}value=chartCtx.GetProperty($GP.DssGraphShowTitle,$NULL_ID);if(value){this.mIsTitleShown=value!==$VF;}value=chartCtx.GetProperty($GP.DssGraphShowSubtitle,$NULL_ID);if(value){this.mIsSubtitleShown=value!==$VF;}value=chartCtx.GetProperty($GP.DssGraphShowfootnote,$NULL_ID);if(value){this.mIsFootnoteShown=value!==$VF;}readExpandOption=false;if(!chartCtx.mManualLayoutMode){readExpandOption=true;}else{value=chartCtx.GetProperty($EGP.DssGraphInfoRecalculateLegend,$NULL_ID);if(value){if(value!==$VF){readExpandOption=true;}}}if(readExpandOption){value=chartCtx.GetProperty($EGP.DssGraphInfoAutosizeHorizontal,$NULL_ID);value2=chartCtx.GetProperty($EGP.DssGraphInfoAutosizeVertical,$NULL_ID);if(value&&value2){this.mIsExpanded=(value!==$VF&&value2!==$VF);}}if(chartCtx.mManualLayoutMode){value=chartCtx.GetProperty($GP.DssGraphAxisAutoFit,new $C.TripleId({ObjectId:$GO.DssGraphO1Body}));if(value){this.mAxisLabelsAutoFit=value!==$VF;}if(this.mAxisLabelsAutoFit){chartCtx.mRecalculateFrame=true;}}},CreateBackground:function CreateBackground(){var chartCtx=this.mChartContextPtr,tripleId,backgroundRect;tripleId=new $C.TripleId({ObjectId:$GO.DssGraphBackground,SeriesId:$NULL_SERIES_ID,GroupId:$NULL_GROUP_ID});backgroundRect=new $C.Rect2D({x:0,y:0,width:chartCtx.mGraphWidth,height:chartCtx.mGraphHeight});return new $C.RectangleObject({TripleId:tripleId,GraphObjectManager:this,Area:backgroundRect});},isSupportedChartType:function isSupportedChartType(){var chartCtx=this.mChartContextPtr,graphMajorType;graphMajorType=chartCtx.GetGraphMajorType();switch(graphMajorType){case $GMT.GMT_CATEGORY:case $GMT.GMT_PIE:case $GMT.GMT_BUBBLE:case $GMT.GMT_SCATTER:case $GMT.GMT_GRID:case $GMT.GMT_BOX:return true;default:return false;}},checkDataset:function checkDataset(){var seriesCount=this.mDatasetPtr.GetSeriesCount(),chartCtx=this.mChartContextPtr;if(this.mDatasetPtr.CountMetric()===0&&this.mChartContextPtr.mIsGraphMatrix){var emptyRow=this.mDatasetPtr.IsHeaderEmpty(true),emptyCol=this.mDatasetPtr.IsHeaderEmpty(false);return(!emptyCol||!emptyRow);}return true;},CalculateLayout:function CalculateLayout(iorArea){var chartCtx=this.mChartContextPtr,heightMargin,widthMargin,right,bottom,title,titleLocation,titleId,titleArea,subtitle,subtitleId,subtitleLocation,subtitleArea,footnote,footnoteId,footnoteLocation,footnoteArea,value,originalGraphWidth,originalGraphHeight,count,seriesTitle,area,newGraphWidth,newGraphHeight,newTopMargin,tempVal,extraMargin,defaultMargin;heightMargin=0;widthMargin=0;if(chartCtx.mIsTimeSeriesChart){defaultMargin=$CHART_CONTEXT.sDefaultMarginForTimeSeries;heightMargin=defaultMargin;widthMargin=defaultMargin;this.mRightMargin=0;}else{if(chartCtx.mIsUniformAxisMode&&!(chartCtx.mIsEntireChart)){defaultMargin=$CHART_CONTEXT.sDefaultUniformAxisMargin;heightMargin=defaultMargin;widthMargin=defaultMargin;this.mRightMargin=widthMargin;}else{defaultMargin=$CHART_CONTEXT.sDefaultMargin;heightMargin=chartCtx.vdHeight(defaultMargin);widthMargin=chartCtx.vdWidth(defaultMargin);this.mRightMargin=widthMargin;}}right=iorArea.x+iorArea.width;bottom=iorArea.y+iorArea.height;iorArea.x+=widthMargin;iorArea.y+=heightMargin;right-=this.mRightMargin;bottom-=heightMargin;iorArea.width=right-iorArea.x;iorArea.height=bottom-iorArea.y;this.mLeftMargin=widthMargin;this.mTopMargin=heightMargin;this.mBottomMargin=heightMargin;if(chartCtx.mIsTimeSeriesChart){return ;}title=null;if(this.mIsTitleShown){titleLocation=chartCtx.mManualLayoutMode&&!chartCtx.mRecalculateFrame?new $C.Rect2D():chartCtx.vdRect($C.gDefaultTitlePosition);titleId=new $C.TripleId({ObjectId:$GO.DssGraphTitle});tempVal=chartCtx.GetProperty($GP.DssGraphTextContent,titleId);if(tempVal){value=tempVal;}else{value="Graph Title";}title=new $C.TextObject({TripleId:titleId,GraphObjectManager:this,rect:titleLocation});title.SetText(value);this.AddToMapAndList(title);if(!chartCtx.mManualLayoutMode||chartCtx.mRecalculateFrame){titleArea=title.GetBoundingRect();bottom=iorArea.y+iorArea.height;iorArea.y=titleArea.y+titleArea.height+heightMargin;iorArea.height=bottom-iorArea.y;if(iorArea.height<0){iorArea.height=0;}}if(chartCtx.mManualLayoutMode){titleLocation=chartCtx.GetLocation($GP.DssGraphTitleLocation);title.SetRect(titleLocation);title.CalculateDeviceRect();}else{if(!this.mIsExpanded){chartCtx.PutLocation($GP.DssGraphTitleLocation,titleArea);}}}subtitle=null;if(this.mIsSubtitleShown){subtitleLocation=chartCtx.mManualLayoutMode&&!chartCtx.mRecalculateFrame?new $C.Rect2D():chartCtx.vdRect($C.gDefaultSubtitlePosition);subtitleId=new $C.TripleId({ObjectId:$GO.DssGraphSubtitle});tempVal=chartCtx.GetProperty($GP.DssGraphTextContent,subtitleId);value=(tempVal===null||tempVal===undefined)?("Graph Subtitle"):tempVal;subtitle=new $C.TextObject({TripleId:subtitleId,GraphObjectManager:this,rect:subtitleLocation});subtitle.SetText(value);this.AddToMapAndList(subtitle);if(!chartCtx.mManualLayoutMode||chartCtx.mRecalculateFrame){subtitle.MoveTo(subtitleLocation.x,iorArea.y);subtitleArea=subtitle.GetBoundingRect();bottom=iorArea.y+iorArea.height;iorArea.y=subtitleArea.y+subtitleArea.height+heightMargin;iorArea.height=bottom-iorArea.y;if(iorArea.height<0){iorArea.height=0;}}if(chartCtx.mManualLayoutMode){subtitleLocation=chartCtx.GetLocation($C.DssGraphSubTitleLocation);subtitle.SetRect(subtitleLocation);subtitle.CalculateDeviceRect();}else{if(!this.mIsExpanded){chartCtx.PutLocation($C.DssGraphTitleLocation,subtitleArea);}}}footnote=null;if(this.mIsFootnoteShown){footnoteLocation=chartCtx.mManualLayoutMode&&!chartCtx.mRecalculateFrame?new $C.Rect2D():chartCtx.vdRect($C.gDefaultFootnotePosition);footnoteId=new $C.TripleId({ObjectId:$GO.DssGraphFootnote});tempVal=chartCtx.GetProperty($GP.DssGraphTextContent,footnoteId);if(tempVal===null||tempVal===undefined){value="Graph Footnote";}else{value=tempVal;}footnote=new $C.TextObject({TripleId:footnoteId,GraphObjectManager:this,rect:footnoteLocation});footnote.SetText(value);this.AddToMapAndList(footnote);if(!chartCtx.mManualLayoutMode||chartCtx.mRecalculateFrame){footnoteArea=footnote.GetBoundingRect();footnote.MoveTo(footnoteLocation.x,iorArea.y+iorArea.height-footnoteArea.height);iorArea.height=(iorArea.y+iorArea.height-heightMargin-footnoteArea.height)-iorArea.y;if(iorArea.height<0){iorArea.height=0;}}if(chartCtx.mManualLayoutMode){footnoteLocation=chartCtx.GetLocation($GP.DssGraphFootnoteLocation);footnote.SetRect(footnoteLocation);footnote.CalculateDeviceRect();}else{if(!this.mIsExpanded){chartCtx.PutLocation($GP.DssGraphTitleLocation,footnoteArea);}}}originalGraphWidth=chartCtx.mGraphWidth;originalGraphHeight=chartCtx.mGraphHeight;if(this.mIsLegendShown&&!chartCtx.mIsGraphMatrix){count=this.mDatasetPtr.GetSeriesCount();if(count===1){seriesTitle=this.mDatasetPtr.GetSeriesLabel(0,false);if(seriesTitle===""){this.mIsLegendShown=false;}}}if(this.mIsLegendShown){if(iorArea.height>0){this.mLegendPtr=new $C.Legend({TripleId:new $C.TripleId({ObjectId:$GOM_LEGEND}),GraphObjectManager:this,DataSet:this.mDatasetPtr,Area:iorArea});this.mLegendPtr.GenerateMapAndList();this.mGraphObjectManagerList.push(this.mLegendPtr);if(!chartCtx.mManualLayoutMode||chartCtx.mRecalculateFrame){area=new $C.Rect2D({Rect2D:iorArea});this.mLegendPtr.CalculateFrame(widthMargin,heightMargin,iorArea);this.mLeftMargin+=iorArea.x-area.x;this.mRightMargin+=area.x+area.width-(iorArea.x+iorArea.width);this.mBottomMargin+=area.y+area.height-(iorArea.y+iorArea.height);if(!chartCtx.mManualLayoutMode){if(this.mIsExpanded){if(title!==null&&title!==undefined){titleLocation=chartCtx.vdRect($C.gDefaultTitlePosition);title.SetRect(titleLocation);title.CalculateDeviceRect();chartCtx.PutLocation($GP.DssGraphTitleLocation,titleLocation);}if(subtitle!==null&&subtitle!==undefined){subtitleLocation=chartCtx.vdRect($C.gDefaultSubtitlePosition);subtitle.SetRect(subtitleLocation);subtitle.CalculateDeviceRect();chartCtx.PutLocation($GP.DssGraphSubTitleLocation,subtitleLocation);}if(footnote!==null&&footnote!==undefined){footnoteLocation=chartCtx.vdRect($C.gDefaultFootnotePosition);footnote.SetRect(footnoteLocation);footnote.CalculateDeviceRect();chartCtx.PutLocation($GP.DssGraphFootnoteLocation,footnoteLocation);}}}}}}if(chartCtx.mManualLayoutMode&&!chartCtx.mRecalculateFrame){newGraphWidth=chartCtx.mGraphWidth;newGraphHeight=chartCtx.mGraphHeight;if(this.mIsExpanded){chartCtx.SetGraphSize(originalGraphWidth,originalGraphHeight);}if(this.mIsExpanded){chartCtx.SetGraphSize(newGraphWidth,newGraphHeight);}}else{if(!this.mChartContextPtr.mIsGraphMatrix){newTopMargin=15;tempVal=chartCtx.GetProperty($GP.DssGraphFontSize100,new $C.TripleId({ObjectId:$GO.DssGraphDataText,SeriesId:0}));if(tempVal){newTopMargin=Math.floor(tempVal/100+0.5);}if(newTopMargin>this.mTopMargin){extraMargin=newTopMargin-this.mTopMargin;if(extraMargin>iorArea.height/10){extraMargin=iorArea.height/10;}iorArea.y+=extraMargin;iorArea.height-=extraMargin;this.mTopMargin=newTopMargin;}}}},Draw:function Draw(){var graphObjectListSize,plotManagerListSize,i;if(!this.mIsInitialized){this.GenerateMapAndList();}graphObjectListSize=this.mGraphObjectList.length;if(graphObjectListSize>0){this.mGraphObjectList[0].Draw();}plotManagerListSize=this.mPlotManagers.length;for(i=0;i<plotManagerListSize;++i){this.mPlotManagers[i].Draw();}if(this.mLegendPtr!==null&&this.mLegendPtr!==undefined){this.mLegendPtr.Draw();}for(i=1;i<graphObjectListSize;++i){this.mGraphObjectList[i].Draw();}}});}());