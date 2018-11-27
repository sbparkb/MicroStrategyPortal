(function(){mstrmojo.requiresClsP("mstrmojo.chart.enums","EnumLineJoinType");mstrmojo.requiresClsP("mstrmojo.chart","GraphObject","FormatLine");var $C=mstrmojo.chart,$CHART_ENUMS=mstrmojo.chart.enums,$LJT=$CHART_ENUMS.EnumLineJoinType,kCairoMiterLimit=10;function isStraightSection(isVertical,pA,pB){return isVertical?pA.x===pB.x:pA.y===pB.y;}function applyLineFormat(){var chartCtx=this.mChartContextPtr,lineFormat=this.mFormatLinePtr,gradient=lineFormat.getGradient(),hasGradient=lineFormat&&gradient&&gradient.valid;if(!chartCtx.mIsGraphMatrix||!hasGradient){this.ApplyLineFormat();}else{if(gradient.style===0){this.ApplyLineFormat();}else{var isVertical=gradient.angle===1;this.Vibrate(0.01,isVertical);this.ApplyLineFormat();}}}function hGetOnePolygon(irLinePoints,orPolygon){var i,len=irLinePoints.length;for(i=1;i<=len*2;i++){orPolygon.push({});}var lOffset=Math.max(this.mFormatLinePtr.mLineThickness/2,$C.gOutlineBlack.mLineThickness/1.3);var helperStart={x:2*irLinePoints[0].x-irLinePoints[1].x,y:2*irLinePoints[0].y-irLinePoints[1].y};var helperEnd={x:2*irLinePoints[len-1].x-irLinePoints[len-2].x,y:2*irLinePoints[len-1].y-irLinePoints[len-2].y};this.GetAngularBisectorIntersectionPoint(irLinePoints[1],irLinePoints[0],helperStart,lOffset,orPolygon[0]);this.GetAngularBisectorIntersectionPoint(helperEnd,irLinePoints[len-1],irLinePoints[len-2],lOffset,orPolygon[len-1]);this.GetAngularBisectorIntersectionPoint(irLinePoints[len-2],irLinePoints[len-1],helperEnd,lOffset,orPolygon[len]);this.GetAngularBisectorIntersectionPoint(helperStart,irLinePoints[0],irLinePoints[1],lOffset,orPolygon[2*len-1]);for(i=1;i<len-1;++i){this.GetAngularBisectorIntersectionPoint(irLinePoints[i+1],irLinePoints[i],irLinePoints[i-1],lOffset,orPolygon[i]);this.GetAngularBisectorIntersectionPoint(irLinePoints[i-1],irLinePoints[i],irLinePoints[i+1],lOffset,orPolygon[2*len-1-i]);}}mstrmojo.chart.PolyLineObject=mstrmojo.declare(mstrmojo.chart.GraphObject,null,{scriptClass:"mstrmojo.chart.PolyLineObject",mLinePoints:null,isClosePath:false,identity:null,init:function init(props){props.hasLine=props.hasLine||true;props.isClosePath=props.isClosePath||false;this._super(props);var i,linePoints=this.mLinePoints=[],polyLine=props.PolyLine,len=polyLine.length;for(i=0;i<len;i++){linePoints.push(polyLine[i]);}if(props.Identity!==undefined&&props.Identity!==null){this.identity=props.Identity;}},Draw:function Draw(){if(this.mLinePoints.length<2){return ;}var chartCtx=this.mChartContextPtr,backupLineJoinType=chartCtx.GetLineJoin();chartCtx.SetLineJoin($LJT.LJT_ROUND);this.SetLineWidth();this.SetPath();applyLineFormat.call(this);chartCtx.SetLineJoin(backupLineJoinType);chartCtx.FinishDrawPolyline(this.mLinePoints,this.mTripleId,!this.mIsDetectable,this.identity,this.startPoint,this.midPoint,this.endPoint);},GetPolygons:function GetPolygons(orPolygons){var i,j,linePoints=this.mLinePoints,len=linePoints.length;if(len<2){return ;}var lTolerance=2/(kCairoMiterLimit*kCairoMiterLimit);var splitIndex=[];splitIndex.push(0);for(i=1;i+1<len;++i){var vectorBA={x:linePoints[i-1].x-linePoints[i].x,y:linePoints[i-1].y-linePoints[i].y};var vectorBC={x:linePoints[i+1].x-linePoints[i].x,y:linePoints[i+1].y-linePoints[i].y};vectorBA.x=vectorBA.x/Math.sqrt(vectorBA.x*vectorBA.x+vectorBA.y*vectorBA.y);vectorBA.y=vectorBA.y/Math.sqrt(vectorBA.x*vectorBA.x+vectorBA.y*vectorBA.y);vectorBC.x=vectorBC.x/Math.sqrt(vectorBC.x*vectorBC.x+vectorBC.y*vectorBC.y);vectorBC.y=vectorBC.y/Math.sqrt(vectorBC.x*vectorBC.x+vectorBC.y*vectorBC.y);if(1-(vectorBA.x*vectorBC.x+vectorBA.y*vectorBC.y)<lTolerance){splitIndex.push(i);}}splitIndex.push(len-1);len=splitIndex.length;for(i=1;i<len;++i){var lLinePoints=[];for(j=splitIndex[i-1];j<=splitIndex[i];++j){lLinePoints.push(linePoints[j]);}var polygon=[];hGetOnePolygon.call(this,lLinePoints,polygon);orPolygons.push(polygon);}},SetPath:function SetPath(){var chartCtx=this.mChartContextPtr,formatLine=this.mFormatLinePtr,linePoints=this.mLinePoints,polygon=[];if(this.isClosePath){polygon=polygon.concat(linePoints);polygon.pop();chartCtx.DrawPolygon(polygon,true,false,0,formatLine.mLineStyle);}else{chartCtx.DrawPolyLine(linePoints,true,false,0,formatLine.mLineStyle);}},getBoundingPoints:function getBoundingPoints(){return{Shape:1,Points:this.mLinePoints};},movePointsAgainstBorder:function movePointsAgainstBorder(){var chartCtx=this.mChartContextPtr,points=this.mLinePoints,len=points.length,isVeritical=chartCtx.IsVertical();if(chartCtx.mIsGraphMatrix===false){return ;}var lineThickness=this.mFormatLinePtr.mLineThickness;if(lineThickness>2){return ;}var i,lowBase=isVeritical?chartCtx.mGraphHeight:0,highBase=isVeritical?0:chartCtx.mGraphWidth;for(i=0;i<len;i++){if(isVeritical){if(points[i].y>=lowBase){points[i].y--;}if(points[i].y<=highBase){points[i].y++;}}else{if(points[i].x<=lowBase){points[i].x++;}if(points[i].x>=lowBase){points[i].x--;}}}},Vibrate:function Vibrate(vibration,isVertical){var i,points=this.mLinePoints;for(i=0;i+1<points.length;i+=2){if(isStraightSection.call(this,isVertical,points[i],points[i+1])){if(isVertical){points[i+1].x+=vibration;}else{points[i+1].y+=vibration;}}}}});}());