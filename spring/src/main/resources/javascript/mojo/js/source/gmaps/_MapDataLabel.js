(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.color","mstrmojo.VisUtility","mstrmojo.gmaps.MapEnums","mstrmojo.chart.enums.EnumFontStyle");var $Clr=mstrmojo.color,VisUtil=mstrmojo.VisUtility,$EnumDataLabel=mstrmojo.gmaps.EnumDataLabel,$EnumDataLabelShowOption=mstrmojo.gmaps.EnumDataLabelShowOption,ENUM_FONT_SYLTE=mstrmojo.chart.enums.EnumFontStyle,$ALIGN_OPT=mstrmojo.gmaps.MarkerAlignOption,OVERLAP_GAP=2,LABELS_MARKER_PADDING=4,GRID_INTERVAL=10,MARKER_LABELS_POSITION=["bottom","top","left","right"];function rectOutsideView(left,top,width,height){return left>this.intsecXmax||top>this.screenHeight||(left+width<this.intsecXmin)||(top+height<0);}function getCellSpan(left,top,width,height){var cellSpan={};cellSpan.rowStart=Math.floor(top/GRID_INTERVAL);cellSpan.colStart=Math.floor(left/GRID_INTERVAL);cellSpan.rowEnd=Math.floor((top+height)/GRID_INTERVAL);cellSpan.colEnd=Math.floor((left+width)/GRID_INTERVAL);return cellSpan;}function checkRectsIntersection(rect1,rect2){var temp;if(rect2.x<rect1.x){temp=rect2;rect2=rect1;rect1=temp;}var left1=rect1.x,right1=left1+rect1.w,top1=rect1.y,bottom1=top1+rect1.h,left2=rect2.x,top2=rect2.y,bottom2=top2+rect2.h;return left2<=right1&&top2<=bottom1&&bottom2>=top1;}function getTheAreaOfPolygon(points){if(!points||points.length<=0){return 0;}var area=0,len=points.length,i,px,py,p2x,p2y;for(i=0;i<len-1;i++){px=points[i][0];py=points[i][1];p2x=points[i+1][0];p2y=points[i+1][1];area+=(px*p2y-p2x*py);}px=points[len-1][0];py=points[len-1][1];p2x=points[0][0];p2y=points[0][1];area+=(px*p2y-p2x*py);return Math.abs(area);}function getTheBiggestPointsArray(points){var i,n=(points&&points.length)||0,area,maxArea=Number.NEGATIVE_INFINITY,maxIndex=-1;if(n===1){return 0;}for(i=0;i<n;i++){area=getTheAreaOfPolygon(points[i]);if(area>maxArea){maxArea=area;maxIndex=i;}}return maxIndex;}function getDataLabelFontStyle(widgetProps,isEsriMap){var decoration,color,fs=widgetProps[$EnumDataLabel.DATA_LABEL_FONT_STYLE],labelStyle={fontFamily:widgetProps[$EnumDataLabel.DATA_LABEL_FONT_FAMILY],fontSize:widgetProps[$EnumDataLabel.DATA_LABEL_FONT_SIZE]};if(fs&ENUM_FONT_SYLTE.FS_BOLD){labelStyle.fontWeight="bold";}else{labelStyle.fontWeight="normal";}if(fs&ENUM_FONT_SYLTE.FS_ITALIC){labelStyle.fontStyle="italic";}else{labelStyle.fontStyle="normal";}if((fs&ENUM_FONT_SYLTE.FS_STRIKETHROUGH)&&(fs&ENUM_FONT_SYLTE.FS_UNDERLINE)){decoration="line-through underline";}else{if(fs&ENUM_FONT_SYLTE.FS_STRIKETHROUGH){decoration="line-through";}else{if(fs&ENUM_FONT_SYLTE.FS_UNDERLINE){decoration="underline";}else{decoration="none";}}}labelStyle.textDecoration=decoration;color=widgetProps[$EnumDataLabel.DATA_LABEL_FONT_COLOR];if(isEsriMap){color=color==="transparent"?[0,0,0,0]:$Clr.decodeColor(color);labelStyle.color=new dojo.Color(color);}else{labelStyle.color=color==="transparent"?"rgba(0,0,0,0)":$Clr.decodeColor(color);}return labelStyle;}function createDataLabelFont(Font,labelStyle){var font=new Font(labelStyle.fontSize);font.setFamily(labelStyle.fontFamily);if(labelStyle.fontWeight==="bold"){font.setWeight(Font.WEIGHT_BOLD);}if(labelStyle.fontStyle==="italic"){font.setStyle(Font.STYLE_ITALIC);}font.setDecoration(labelStyle.textDecoration);return font;}mstrmojo.gmaps._MapDataLabel=mstrmojo.provide("mstrmojo.gmaps._MapDataLabel",{_mixinName:"mstrmojo.gmaps._MapDataLabel",getCentroidOfPolygon:function(points){var index=getTheBiggestPointsArray(points);if(index<0){return null;}points=points[index];var area=0,innerArea,len=points.length,i,px,py,p2x,p2y,centroid=[0,0];for(i=0;i<len-1;i++){px=points[i][0];py=points[i][1];p2x=points[i+1][0];p2y=points[i+1][1];innerArea=(px*p2y-p2x*py);area+=innerArea;centroid[0]+=(px+p2x)*innerArea;centroid[1]+=(py+p2y)*innerArea;}px=points[len-1][0];py=points[len-1][1];p2x=points[0][0];p2y=points[0][1];innerArea=(px*p2y-p2x*py);area+=innerArea;centroid[0]+=(px+p2x)*innerArea;centroid[1]+=(py+p2y)*innerArea;area=area*3;centroid=[centroid[0]/area,centroid[1]/area];return centroid;},populateDataLabelMetricValues:function(){var i,rowIndex,dataItems,dataRow,dlMtxIdx,gvsItems=this.data.gvs&&this.data.gvs.items,dlMtxCfg=this.parent.dataLabelMetricConfig,dataLabelsConfig=this.dataLabelsConfig,n=(dataLabelsConfig&&dataLabelsConfig.length)||0;if(!dlMtxCfg||!gvsItems){return ;}dlMtxIdx=dlMtxCfg.index;for(i=0;i<n;i++){if(!dataLabelsConfig[i].disableLabel){rowIndex=dataLabelsConfig[i].rowIndex;dataLabelsConfig[i].values=[];if(rowIndex!==undefined&&gvsItems[rowIndex]){dataItems=gvsItems[rowIndex].items;dataRow=dataItems&&dataItems[dlMtxIdx];if(dataRow){dataLabelsConfig[i].values.push(dataRow.v);}}}}},initParas:function(){var parent=this.parent,screenWidth=parent.getWidth(),screenHeight=parent.getHeight();this.cellMatrix={};this.rectPool={};this.screenWidth=screenWidth;this.screenHeight=screenHeight;this.intsecXmin=0;this.intsecXmax=screenWidth;this.isMarkerMapType=this.isMarkerMap();},setGlobalOption:function(widgetProps,showOption,isEsriMap,labelStyle){this.showAllDataLabel=widgetProps[$EnumDataLabel.DATA_LABEL_SHOW_ALL];this.dlShowOption=showOption;this.isEsriMap=isEsriMap;this.dlFontStyle=labelStyle;this.dlFontHeight=VisUtil.measureTextHeight("Style",labelStyle);if(isEsriMap){this.dlFont=createDataLabelFont(esri.symbol.Font,labelStyle);}},buildDataLabelLayer:function(){if(!this.supportDataLabel()||!this.parent){return ;}this.initParas();var i,k,labelStyle,labelsRectConfig,isEsriMap=this.scriptClass==="mstrmojo.esrimap.ESRIMapViewer",positions=this.isMarkerMapType?MARKER_LABELS_POSITION:["center"],posNums=positions.length,parent=this.parent,dataLabelsConfig=this.dataLabelsConfig,n=(dataLabelsConfig&&dataLabelsConfig.length)||0,widgetProps=parent.widgetProps,showOption=widgetProps[$EnumDataLabel.DATA_LABEL_SHOW];if(showOption===$EnumDataLabelShowOption.NONE||n<=0){this.removeDataLabelLayer();return ;}this.clearDataLabelLayer();this.createDataLavelLayer();labelStyle=getDataLabelFontStyle(widgetProps,isEsriMap);this.setGlobalOption(widgetProps,showOption,isEsriMap,labelStyle);try{this.updateScreenPoint(dataLabelsConfig);}catch(e){this.removeDataLabelLayer();return ;}if(this.isMarkerMapType){this.addMarkerRectange();}for(i=0;i<n;i++){if(!dataLabelsConfig[i].disableLabel){for(k=0;k<posNums;k++){labelsRectConfig=this.getLabelsRectConfig(dataLabelsConfig[i],positions[k]);if(this.canBeShown(labelsRectConfig)){this.drawDataLabels(labelsRectConfig.labels,labelsRectConfig.mapPoint);break;}}}}},evaluateLabels:function(labels){var i,label,width,labelStyle=this.dlFontStyle,mergedSize={width:0},n=(labels&&labels.length)||0,effectLabels=[];for(i=0;i<n;i++){label=labels[i];if(label){width=VisUtil.measureTextWidth(label,labelStyle);if(mergedSize.width<width){mergedSize.width=width;}effectLabels.push({label:label,width:width});}}mergedSize.height=effectLabels.length*this.dlFontHeight;return{labels:effectLabels,size:mergedSize};},getLabelsRectConfig:function(config,position){var texts;switch(this.dlShowOption){case $EnumDataLabelShowOption.SHOW_TEXT:texts=[config.text];break;case $EnumDataLabelShowOption.SHOW_VALUE:texts=config.values||[];break;case $EnumDataLabelShowOption.SHOW_BOTH:texts=[config.text].concat(config.values||[]);break;}return this.addLabelRect(config,texts,position);},addLabelRect:function(config,texts,position){var i,xOffset,yOffset,left,top,markerRect,markerCenterX,markerCenterY,halfMarkerRectWidth,halfMarkerRectHeight,labelsRectConfig,isEsriMap=this.isEsriMap,yOffsetFactor=isEsriMap?-1:1,fontHeight=this.dlFontHeight,isMarkerMap=this.isMarkerMapType,screenPoint=config.screenPoint,alignOption=config.symbolSize&&config.symbolSize.alignOption,labelsSizeObj=this.evaluateLabels(texts),labelsWidth=labelsSizeObj.size.width,labelsHeight=labelsSizeObj.size.height,halfLabelsWidth=labelsWidth/2,halfLabelsHeight=labelsHeight/2,labels=labelsSizeObj.labels,n=labels.length;if(n===0){return null;}labelsRectConfig={labels:[],mapPoint:config.mapPoint,index:"label#"+config.rowIndex};left=screenPoint.x-halfLabelsWidth;top=screenPoint.y-halfLabelsHeight;if(isMarkerMap){markerRect=config.markerRect;halfMarkerRectWidth=markerRect.w/2;halfMarkerRectHeight=markerRect.h/2;markerCenterX=markerRect.x+halfMarkerRectWidth;markerCenterY=markerRect.y+halfMarkerRectHeight;left=markerCenterX-halfLabelsWidth;top=markerCenterY-halfLabelsHeight;switch(position){case"left":left=markerCenterX-halfMarkerRectWidth-labelsWidth-LABELS_MARKER_PADDING;break;case"top":top=markerCenterY-halfMarkerRectHeight-labelsHeight-LABELS_MARKER_PADDING;break;case"right":left=markerCenterX+halfMarkerRectWidth+LABELS_MARKER_PADDING;break;case"bottom":top=markerCenterY+halfMarkerRectHeight+LABELS_MARKER_PADDING;break;}}labelsRectConfig.rect={x:left,y:top,w:labelsWidth,h:labelsHeight};for(i=0;i<n;i++){if(isEsriMap){xOffset=0;yOffset=halfLabelsHeight-(i+0.8)*fontHeight;}else{xOffset=-labels[i].width/2;yOffset=-halfLabelsHeight+i*fontHeight;}if(isMarkerMap){switch(position){case"left":xOffset-=halfLabelsWidth+halfMarkerRectWidth+LABELS_MARKER_PADDING;break;case"top":yOffset-=(halfLabelsHeight+halfMarkerRectHeight+LABELS_MARKER_PADDING)*yOffsetFactor;break;case"right":xOffset+=halfLabelsWidth+halfMarkerRectWidth+LABELS_MARKER_PADDING;break;case"bottom":yOffset+=(halfLabelsHeight+halfMarkerRectHeight+LABELS_MARKER_PADDING)*yOffsetFactor;break;}switch(alignOption){case $ALIGN_OPT.TOP:yOffset+=halfMarkerRectHeight*yOffsetFactor;break;case $ALIGN_OPT.TOP_LEFT:xOffset+=halfMarkerRectWidth;yOffset+=halfMarkerRectHeight*yOffsetFactor;break;case $ALIGN_OPT.TOP_RIGHT:xOffset-=halfMarkerRectWidth;yOffset+=halfMarkerRectHeight*yOffsetFactor;break;case $ALIGN_OPT.LEFT:xOffset+=halfMarkerRectWidth;break;case $ALIGN_OPT.RIGHT:xOffset-=halfMarkerRectWidth;break;case $ALIGN_OPT.BOTTOM:yOffset-=halfMarkerRectHeight*yOffsetFactor;break;case $ALIGN_OPT.BOTTOM_LEFT:xOffset+=halfMarkerRectWidth;yOffset-=halfMarkerRectHeight*yOffsetFactor;break;case $ALIGN_OPT.BOTTOM_RIGHT:xOffset-=halfMarkerRectWidth;yOffset-=halfMarkerRectHeight*yOffsetFactor;break;}}labelsRectConfig.labels.push({label:labels[i].label,xOffset:xOffset,yOffset:yOffset});}return labelsRectConfig;},canBeShown:function(labelsRectConfig){if(!labelsRectConfig){return false;}var cellSpan,row,col,cell,rect,l,t,w,h,pl,pt,pw,ph,key,index,cellMatrix=this.cellMatrix,rectPool=this.rectPool;index=labelsRectConfig.index;rect=labelsRectConfig.rect;l=rect.x;t=rect.y;w=rect.w;h=rect.h;pl=l-OVERLAP_GAP;pt=t-OVERLAP_GAP;pw=w+OVERLAP_GAP*2;ph=h+OVERLAP_GAP*2;if(rectOutsideView.call(this,pl,pt,pw,ph)){return false;}if(this.showAllDataLabel){return true;}cellSpan=getCellSpan(pl,pt,pw,ph);for(row=cellSpan.rowStart;row<=cellSpan.rowEnd;row++){for(col=cellSpan.colStart;col<=cellSpan.colEnd;col++){if(cellMatrix[row]&&cellMatrix[row][col]){cell=cellMatrix[row][col];for(key in cell){if(cell.hasOwnProperty(key)&&checkRectsIntersection({x:pl,y:pt,w:pw,h:ph},rectPool[key])){return false;}}}}}rectPool[index]=rect;for(row=cellSpan.rowStart;row<=cellSpan.rowEnd;row++){for(col=cellSpan.colStart;col<=cellSpan.colEnd;col++){if(!cellMatrix[row]){cellMatrix[row]={};}if(!cellMatrix[row][col]){cellMatrix[row][col]={};}cellMatrix[row][col][index]=true;}}return true;},addMarkerRectange:function(){var i,config,symbolSize,screenPoint,left,top,width,height,cellSpan,row,col,index,markerRect,cellMatrix=this.cellMatrix,rectPool=this.rectPool,showAllDataLabel=this.showAllDataLabel,dataLabelsConfig=this.dataLabelsConfig,n=(dataLabelsConfig&&dataLabelsConfig.length)||0;for(i=0;i<n;i++){config=dataLabelsConfig[i];index="marker#"+config.rowIndex;symbolSize=config.symbolSize;width=symbolSize.width;height=symbolSize.height;screenPoint=config.screenPoint;left=screenPoint.x-width/2;top=screenPoint.y-height/2;switch(symbolSize.alignOption){case $ALIGN_OPT.TOP:top=screenPoint.y;break;case $ALIGN_OPT.TOP_LEFT:left=screenPoint.x;top=screenPoint.y;break;case $ALIGN_OPT.TOP_RIGHT:left=screenPoint.x-width;top=screenPoint.y;break;case $ALIGN_OPT.LEFT:left=screenPoint.x;break;case $ALIGN_OPT.RIGHT:left=screenPoint.x-width;break;case $ALIGN_OPT.BOTTOM:top=screenPoint.y-height;break;case $ALIGN_OPT.BOTTOM_LEFT:left=screenPoint.x;top=screenPoint.y-height;break;case $ALIGN_OPT.BOTTOM_RIGHT:left=screenPoint.x-width;top=screenPoint.y-height;break;}markerRect={x:left,y:top,w:width,h:height};config.markerRect=markerRect;if(showAllDataLabel||rectOutsideView.call(this,left,top,width,height)){continue;}rectPool[index]=markerRect;cellSpan=getCellSpan(left,top,width,height);for(row=cellSpan.rowStart;row<=cellSpan.rowEnd;row++){for(col=cellSpan.colStart;col<=cellSpan.colEnd;col++){if(!cellMatrix[row]){cellMatrix[row]={};}if(!cellMatrix[row][col]){cellMatrix[row][col]={};}cellMatrix[row][col][index]=true;}}}}});}());