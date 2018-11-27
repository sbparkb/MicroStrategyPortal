(function(){mstrmojo.requiresClsP("mstrmojo.chart","Angle","Rect2D","ChartContext","ShapeObject","ImageMap","Point2D");mstrmojo.requiresClsP("mstrmojo.chart.enums","EnumLineJoinType","EnumObjectShape","EnumBoundingRectType","EnumRadientGradientUsage");mstrmojo.requiresClsP("mstrmojo.chart.model.enums","EnumDSSGraphProperty","EnumDSSGraphFillBevelEffect");var $C=mstrmojo.chart,$CHART_ENUMS=$C.enums,$LJT=$CHART_ENUMS.EnumLineJoinType,$BOUNDING_RECT_TYPE=$CHART_ENUMS.EnumBoundingRectType,$RAD_GRADIENT_USAGE=$CHART_ENUMS.EnumRadientGradientUsage,$GMM=$C.gModuleMain,$M=$C.model,$MODEL_ENUMS=$M.enums,$BE=$MODEL_ENUMS.EnumDSSGraphFillBevelEffect,emptyBlock=0,kRectangleAngle_Start=0,kRectangleAngle_End=1,kPolygonApproximationAngle=8;function hFillSide(){var formatFill=this.mFormatFillPtr;formatFill.MakeDarker(0.75);this.ApplyFillFormat(true);formatFill.RestoreColor();}function hApplyFillAndLine(){if(this.mIsOutline){this.ApplyOutlineFormat();}else{var boundingRectType=this.mBoundingRectType;if((boundingRectType===$BOUNDING_RECT_TYPE.BRT_TOP)||(boundingRectType===$BOUNDING_RECT_TYPE.BRT_BOTTOM)){this.ApplyFillFormat();}else{hFillSide.call(this);}this.ApplyLineFormat();}}function hDrawGlowEffect(){var glowWidth=$GMM.mGlowWidth,chartCtx=this.mChartContextPtr,sliceInfo=this.mSliceInfo;chartCtx.DrawRingSector(sliceInfo.mCenter,sliceInfo.mRadius+glowWidth,sliceInfo.mRadius,$GMM.DegreeToRadian(sliceInfo.mStartAngle),$GMM.DegreeToRadian(sliceInfo.mEndAngle));chartCtx.saveState();chartCtx.Clip();chartCtx.RestoreState();}function hDrawRingPieOneSeriesTop(){var chartCtx=this.mChartContextPtr,sliceInfo=this.mSliceInfo,lCenter=new $C.Point2D({x:sliceInfo.mCenter.x,y:sliceInfo.mCenter.y-sliceInfo.mDepth}),lTempRadius=sliceInfo.mRadius*(sliceInfo.mRingPieFactor*0.01);if(this.mIsOutline){chartCtx.drawArc(lCenter,sliceInfo.mRadius,this.mStartAngleRadian,this.mEndAngleRadian);hApplyFillAndLine.call(this);chartCtx.drawArc(lCenter,lTempRadius,this.mStartAngleRadian,this.mEndAngleRadian);hApplyFillAndLine.call(this);}else{chartCtx.DrawRingSector(lCenter,sliceInfo.mRadius,lTempRadius,this.mStartAngleRadian,this.mEndAngleRadian);this.SetBoundingRectType($BOUNDING_RECT_TYPE.BRT_TOP);this.ApplyFillFormat();chartCtx.drawArc(lCenter,sliceInfo.mRadius,this.mStartAngleRadian,this.mEndAngleRadian);this.ApplyLineFormat();chartCtx.drawArc(lCenter,lTempRadius,this.mStartAngleRadian,this.mEndAngleRadian);this.ApplyLineFormat();}}function hDrawRingPieOneSeriesBottom(){var chartCtx=this.mChartContextPtr,sliceInfo=this.mSliceInfo,lTempRadius=sliceInfo.mRadius*(sliceInfo.mRingPieFactor*0.01);if(this.mIsOutline){chartCtx.drawArc(sliceInfo.mCenter,sliceInfo.mRadius,this.mStartAngleRadian,this.mEndAngleRadian);hApplyFillAndLine.call(this);chartCtx.drawArc(sliceInfo.mCenter,lTempRadius,this.mStartAngleRadian,this.mEndAngleRadian);hApplyFillAndLine.call(this);}else{chartCtx.DrawRingSector(sliceInfo.mCenter,sliceInfo.mRadius,lTempRadius,this.mStartAngleRadian,this.mEndAngleRadian);this.SetBoundingRectType($BOUNDING_RECT_TYPE.BRT_BOTTOM);this.ApplyFillFormat();chartCtx.drawArc(sliceInfo.mCenter,sliceInfo.mRadius,this.mStartAngleRadian,this.mEndAngleRadian);this.ApplyLineFormat();chartCtx.drawArc(sliceInfo.mCenter,lTempRadius,this.mStartAngleRadian,this.mEndAngleRadian);this.ApplyLineFormat();}}function hDrawRingPieTop(){var sliceInfo=this.mSliceInfo,lCenter=new $C.Point2D({x:sliceInfo.mCenter.x,y:sliceInfo.mCenter.y-sliceInfo.mDepth});var lTempRadius=sliceInfo.mRadius*(sliceInfo.mRingPieFactor*0.01);this.mChartContextPtr.DrawRingSector(lCenter,sliceInfo.mRadius,lTempRadius,this.mStartAngleRadian,this.mEndAngleRadian);this.SetBoundingRectType($BOUNDING_RECT_TYPE.BRT_TOP);hApplyFillAndLine.call(this);}function hDrawRingPieBottom(){var sliceInfo=this.mSliceInfo,lTempRadius=sliceInfo.mRadius*(sliceInfo.mRingPieFactor*0.01);this.mChartContextPtr.DrawRingSector(sliceInfo.mCenter,sliceInfo.mRadius,lTempRadius,this.mStartAngleRadian,this.mEndAngleRadian);this.SetBoundingRectType($BOUNDING_RECT_TYPE.BRT_BOTTOM);hApplyFillAndLine.call(this);}function hDrawRingPieMiddleRectangle(iRectangleAngle){var sliceInfo=this.mSliceInfo,angle,temp=0;if(iRectangleAngle===kRectangleAngle_Start){angle=sliceInfo.mStartAngle%360;if((angle<=90)||(angle>=270)){return ;}temp=this.mStartAngleRadian;}else{angle=sliceInfo.mEndAngle%360;if((angle>=90)&&(angle<=270)){return ;}temp=this.mEndAngleRadian;}var tempX=sliceInfo.mRadius;var tempY=sliceInfo.mRadius;tempX*=Math.cos(temp);tempY*=Math.sin(temp);var lArc=new $C.Point2D({x:sliceInfo.mCenter.x,y:sliceInfo.mCenter.y});lArc.x+=tempX;lArc.y+=tempY;var lRingArc=new $C.Point2D({x:sliceInfo.mCenter.x,y:sliceInfo.mCenter.y});lRingArc.x+=tempX*(sliceInfo.mRingPieFactor*0.01);lRingArc.x+=tempY*(sliceInfo.mRingPieFactor*0.01);var lPolygon=[];lPolygon.push(lRingArc);lPolygon.push(lArc);var P1=new $C.Point2D({x:lArc.x,y:lArc.y-sliceInfo.mDepth});lPolygon.push(P1);var P2=new $C.Point2D({x:lRingArc.x,y:lRingArc.y-sliceInfo.mDepth});lPolygon.push(P2);this.mChartContextPtr.DrawPolygon(lPolygon);if(iRectangleAngle===kRectangleAngle_Start){this.SetBoundingRectType($BOUNDING_RECT_TYPE.BRT_START_RECT);}else{this.SetBoundingRectType($BOUNDING_RECT_TYPE.BRT_END_RECT);}hApplyFillAndLine.call(this);}function hDrawCylinder(iIsRing,iStartAngle,iEndAngle){var sliceInfo=this.mSliceInfo;if(this.mIsOutline&&iIsRing){return ;}var lStartAngle=$GMM.DegreeToRadian(iStartAngle);var lEndAngle=$GMM.DegreeToRadian(iEndAngle);var lRadius=sliceInfo.mRadius;if(iIsRing){lRadius*=(sliceInfo.mRingPieFactor*0.01);}this.mChartContextPtr.DrawCylinder(sliceInfo.mCenter,lRadius,lStartAngle,lEndAngle,sliceInfo.mDepth);if(iIsRing){this.SetBoundingRectType($BOUNDING_RECT_TYPE.BRT_RING_CYLINDER);}else{this.SetBoundingRectType($BOUNDING_RECT_TYPE.BRT_CYLINDER);}this.SetCylinderStart(iStartAngle);this.SetCylinderEnd(iEndAngle);hApplyFillAndLine.call(this);}function hDrawRingPieMiddleCylinder(){var sliceInfo=this.mSliceInfo,startAngle=sliceInfo.mStartAngle,endAngle=sliceInfo.mEndAngle;if(startAngle<180){if(endAngle<180){hDrawCylinder.call(this,false,startAngle,endAngle);}else{if(endAngle<=360){hDrawCylinder.call(this,true,180,endAngle);hDrawCylinder.call(this,false,startAngle,180);}else{hDrawCylinder.call(this,true,180,360);hDrawCylinder.call(this,false,startAngle,180);hDrawCylinder.call(this,false,360,endAngle);}}}else{if(startAngle<360){if(endAngle<=360){hDrawCylinder.call(this,true,startAngle,endAngle);}else{if(endAngle<540){hDrawCylinder.call(this,true,startAngle,360);hDrawCylinder.call(this,false,360,endAngle);}else{hDrawCylinder.call(this,true,startAngle,360);hDrawCylinder.call(this,true,540,endAngle);hDrawCylinder.call(this,false,360,540);}}}else{if(startAngle<540){if(endAngle<540){hDrawCylinder.call(this,false,startAngle,endAngle);}else{hDrawCylinder.call(this,true,540,endAngle);hDrawCylinder.call(this,false,startAngle,540);}}else{hDrawCylinder.call(this,true,startAngle,endAngle);}}}}function hDrawRingPieMiddle(){hDrawRingPieMiddleCylinder.call(this);hDrawRingPieMiddleRectangle.call(this,kRectangleAngle_Start);hDrawRingPieMiddleRectangle.call(this,kRectangleAngle_End);}function hDrawRingPieSlice(){var sliceInfo=this.mSliceInfo;if(this.mOneSeries){if(sliceInfo.mIs2DCircular){hDrawRingPieOneSeriesBottom.call(this);}else{hDrawRingPieMiddleCylinder.call(this);hDrawRingPieOneSeriesTop.call(this);}this.mChartContextPtr.FinishDrawRing(sliceInfo.mCenter,sliceInfo.mRadius,sliceInfo.mRadius*sliceInfo.mRingPieFactor/100,this.mTripleId,true);}else{if(sliceInfo.mIs2DCircular){hDrawRingPieBottom.call(this);}else{hDrawRingPieMiddle.call(this);hDrawRingPieTop.call(this);}this.mChartContextPtr.FinishDrawRingPieSlice(sliceInfo.mCenter,sliceInfo.mRadius,sliceInfo.mRadius*sliceInfo.mRingPieFactor/100,this.mStartAngleRadian,this.mEndAngleRadian,this.mTripleId);}}function hDrawNormalPieOneSeriesTop(){var sliceInfo=this.mSliceInfo,lCenter=new $C.Point2D({x:sliceInfo.mCenter.x,y:sliceInfo.mCenter.y-sliceInfo.mDepth});this.mChartContextPtr.drawArc(lCenter,sliceInfo.mRadius,this.mStartAngleRadian,this.mEndAngleRadian);this.SetBoundingRectType($BOUNDING_RECT_TYPE.BRT_TOP);hApplyFillAndLine.call(this);}function hDrawNormalPieOneSeriesBottom(){var sliceInfo=this.mSliceInfo;this.mChartContextPtr.drawArc(sliceInfo.mCenter,sliceInfo.mRadius,this.mStartAngleRadian,this.mEndAngleRadian);this.SetBoundingRectType($BOUNDING_RECT_TYPE.BRT_BOTTOM);hApplyFillAndLine.call(this);}function hDrawNormalPieTop(){var sliceInfo=this.mSliceInfo,lCenter=new $C.Point2D({x:sliceInfo.mCenter.x,y:sliceInfo.mCenter.y-sliceInfo.mDepth});this.mChartContextPtr.DrawSector(lCenter,sliceInfo.mRadius,this.mStartAngleRadian,this.mEndAngleRadian);this.SetBoundingRectType($BOUNDING_RECT_TYPE.BRT_TOP);hApplyFillAndLine.call(this);}function hDrawNormalPieBottom(){var sliceInfo=this.mSliceInfo;this.mChartContextPtr.DrawSector(sliceInfo.mCenter,sliceInfo.mRadius,this.mStartAngleRadian,this.mEndAngleRadian);this.SetBoundingRectType($BOUNDING_RECT_TYPE.BRT_BOTTOM);hApplyFillAndLine.call(this);}function hDrawNormalPieMiddleRectangle(iRectangleAngle){var sliceInfo=this.mSliceInfo,angle,lTemp=0;if(iRectangleAngle===kRectangleAngle_Start){angle=sliceInfo.mStartAngle%360;if((angle<=90)||(angle>=270)){return ;}lTemp=this.mStartAngleRadian;}else{angle=sliceInfo.mEndAngle%360;if((angle>=90)&&(angle<=270)){return ;}lTemp=this.mEndAngleRadian;}var arc=new $C.Point2D({x:sliceInfo.mCenter.x,y:sliceInfo.mCenter.y});arc.x+=sliceInfo.mRadius*Math.cos(lTemp);arc.y+=sliceInfo.mRadius*Math.sin(lTemp);var polygon=[];polygon.push(sliceInfo.mCenter);polygon.push(arc);var P1=new $C.Point2D({x:arc.x,y:arc.y-sliceInfo.mDepth});polygon.push(P1);var P2=new $C.Point2D({x:sliceInfo.mCenter.x,y:sliceInfo.mCenter.y-sliceInfo.mDepth});polygon.push(P2);this.mChartContextPtr.DrawPolygon(polygon);if(iRectangleAngle===kRectangleAngle_Start){this.SetBoundingRectType($BOUNDING_RECT_TYPE.BRT_START_RECT);}else{this.SetBoundingRectType($BOUNDING_RECT_TYPE.BRT_END_RECT);}hApplyFillAndLine.call(this);}function hDrawNormalPieMiddleCylinder(){var sliceInfo=this.mSliceInfo,startAngle=sliceInfo.mStartAngle,endAngle=sliceInfo.mEndAngle;if(startAngle<180){if(endAngle<180){hDrawCylinder.call(this,false,startAngle,endAngle);}else{if(endAngle<=360){hDrawCylinder.call(this,false,startAngle,180);}else{hDrawCylinder.call(this,false,startAngle,180);hDrawCylinder.call(this,false,360,endAngle);}}}else{if(startAngle<360){if(endAngle<=360){emptyBlock++;}else{if(endAngle<540){hDrawCylinder.call(this,false,360,endAngle);}else{hDrawCylinder.call(this,false,360,540);}}}else{if(startAngle<540){if(endAngle<540){hDrawCylinder.call(this,false,startAngle,endAngle);}else{hDrawCylinder.call(this,false,startAngle,540);}}else{emptyBlock++;}}}}function hDrawNormalPieMiddle(){hDrawNormalPieMiddleCylinder.call(this);hDrawNormalPieMiddleRectangle.call(this,kRectangleAngle_Start);hDrawNormalPieMiddleRectangle.call(this,kRectangleAngle_End);}function hDrawNormalPieSlice(){var sliceInfo=this.mSliceInfo;if(this.mOneSeries){if(sliceInfo.mIs2DCircular){hDrawNormalPieOneSeriesBottom.call(this);}else{hDrawNormalPieMiddleCylinder.call(this);hDrawNormalPieOneSeriesTop.call(this);}this.mChartContextPtr.FinishDrawPieSlice(sliceInfo.mCenter,sliceInfo.mRadius,this.mStartAngleRadian,this.mEndAngleRadian,this.mTripleId,true,this.mIsWhitenOuterBorder);}else{if(sliceInfo.mIs2DCircular){hDrawNormalPieBottom.call(this);}else{hDrawNormalPieMiddle.call(this);hDrawNormalPieTop.call(this);}this.mChartContextPtr.FinishDrawPieSlice(sliceInfo.mCenter,sliceInfo.mRadius,this.mStartAngleRadian,this.mEndAngleRadian,this.mTripleId,false,this.mIsWhitenOuterBorder);}}function hGetIntersectionConvertedAngleToSliceAngle(irAngle){var sliceInfo=this.mSliceInfo,sliceAngle={mStartAngle:sliceInfo.mStartAngle,mEndAngle:sliceInfo.mEndAngle};this.ConvertAngle(sliceAngle);if(sliceAngle.mStartAngle>sliceAngle.mEndAngle){var lSliceAngleElement=[{mStartAngle:0,mEndAngle:sliceAngle.mEndAngle},{mStartAngle:sliceAngle.mStartAngle,mEndAngle:360}];if(irAngle.mStartAngle>irAngle.mEndAngle){return true;}return this.GetIntersectionAngle(irAngle,lSliceAngleElement[0])||this.GetIntersectionAngle(irAngle,lSliceAngleElement[1]);}if(irAngle.mStartAngle>irAngle.mEndAngle){var lAngle=[{mStartAngle:0,mEndAngle:irAngle.mEndAngle},{mStartAngle:irAngle.mStartAngle,mEndAngle:360}];return this.GetIntersectionAngle(sliceAngle,lAngle[0])||this.GetIntersectionAngle(sliceAngle,lAngle[1]);}return this.GetIntersectionAngle(sliceAngle,irAngle);}function hPointInRingPieSlice(irPoint){var xDiff,yDiff,sliceInfo=this.mSliceInfo,sliceCenter=sliceInfo.mCenter,sliceRadius=sliceInfo.mRadius;if(sliceInfo.mIs2DCircular){xDiff=(irPoint.x-sliceCenter.x);yDiff=(irPoint.y-sliceCenter.y);var distance=Math.sqrt(xDiff*xDiff+yDiff*yDiff);if(((sliceRadius-distance)>-$GMM.mTolerance)&&((distance-(sliceRadius*sliceInfo.mRingPieFactor/100))>-$GMM.mTolerance)){var angle=$GMM.RadianToDegree(Math.acos(xDiff/distance));if(yDiff<-$GMM.mTolerance){angle=360-angle;}if((angle>=sliceInfo.mStartAngle)&&(angle<=sliceInfo.mEndAngle)){return true;}angle+=360;if((angle>=sliceInfo.mStartAngle)&&(angle<=sliceInfo.mEndAngle)){return true;}return false;}return false;}xDiff=(irPoint.x-sliceCenter.x);var lASinOut,lR,returnVal,angleBOF,angleAOE,squareOut=(sliceRadius*sliceRadius-xDiff*xDiff),squareIn=sliceRadius*sliceRadius*(sliceInfo.mRingPieFactor*sliceInfo.mRingPieFactor/10000)-xDiff*xDiff;if(squareOut<-$GMM.mTolerance){return false;}if(squareIn<-$GMM.mTolerance){lASinOut=$GMM.RadianToDegree(Math.asin(Math.sqrt(squareOut)/sliceRadius));yDiff=(irPoint.y-(sliceCenter.y-sliceInfo.mDepth));angleBOF=new $C.Angle();angleAOE=new $C.Angle();if(xDiff>$GMM.mTolerance){angleBOF.mEndAngle=lASinOut;angleBOF.mStartAngle=360-lASinOut;lR=Math.sqrt(xDiff*xDiff+yDiff*yDiff);if(yDiff>$GMM.mTolerance){angleAOE.mEndAngle=$GMM.RadianToDegree(Math.asin(yDiff/lR));}else{angleAOE.mEndAngle=360+$GMM.RadianToDegree(Math.asin(yDiff/lR));}yDiff-=sliceInfo.mDepth;lR=Math.sqrt(xDiff*xDiff+yDiff*yDiff);if(yDiff>$GMM.mTolerance){angleAOE.mStartAngle=$GMM.RadianToDegree(Math.asin(yDiff/lR));}else{angleAOE.mStartAngle=360+$GMM.RadianToDegree(Math.asin(yDiff/lR));}}else{angleBOF.mStartAngle=180-lASinOut;angleBOF.mEndAngle=180+lASinOut;lR=Math.sqrt(xDiff*xDiff+yDiff*yDiff);angleAOE.mStartAngle=180-$GMM.RadianToDegree(Math.asin(yDiff/lR));yDiff-=sliceInfo.mDepth;lR=Math.sqrt(xDiff*xDiff+yDiff*yDiff);angleAOE.mEndAngle=180-$GMM.RadianToDegree(Math.asin(yDiff/lR));}returnVal=new $C.Angle();if(!this.GetIntersectionConvertedAngles(angleBOF,angleAOE,returnVal)){return false;}return hGetIntersectionConvertedAngleToSliceAngle.call(this,returnVal);}lASinOut=$GMM.RadianToDegree(Math.asin(Math.sqrt(squareOut)/sliceRadius));var lASinIn=$GMM.RadianToDegree(Math.asin(Math.sqrt(squareIn)/(sliceRadius*sliceInfo.mRingPieFactor)));yDiff=(irPoint.y-(sliceCenter.y-sliceInfo.mDepth));var lAngleDOF=new $C.Angle();var lAngleBOC=new $C.Angle();angleAOE={};if(xDiff>$GMM.mTolerance){lAngleDOF.mStartAngle=360-lASinOut;lAngleDOF.mEndAngle=360-lASinIn;lAngleBOC.mStartAngle=lASinIn;lAngleBOC.mEndAngle=lASinOut;lR=Math.sqrt(xDiff*xDiff+yDiff*yDiff);if(yDiff>$GMM.mTolerance){angleAOE.mEndAngle=$GMM.RadianToDegree(Math.asin(yDiff/lR));}else{angleAOE.mEndAngle=360+$GMM.RadianToDegree(Math.asin(yDiff/lR));}yDiff-=sliceInfo.mDepth;lR=Math.sqrt(xDiff*xDiff+yDiff*yDiff);if(yDiff>$GMM.mTolerance){angleAOE.mStartAngle=$GMM.RadianToDegree(Math.asin(yDiff/lR));}else{angleAOE.mStartAngle=360+$GMM.RadianToDegree(Math.asin(yDiff/lR));}}else{lAngleDOF.mStartAngle=180-lASinOut;lAngleDOF.mEndAngle=180-lASinIn;lAngleBOC.mStartAngle=180+lASinIn;lAngleBOC.mEndAngle=180+lASinOut;lR=Math.sqrt(xDiff*xDiff+yDiff*yDiff);angleAOE.mStartAngle=180-$GMM.RadianToDegree(Math.asin(yDiff/lR));yDiff-=sliceInfo.mDepth;lR=Math.sqrt(xDiff*xDiff+yDiff*yDiff);angleAOE.mEndAngle=180-$GMM.RadianToDegree(Math.asin(yDiff/lR));}returnVal=[new $C.Angle(),new $C.Angle()];if(!this.GetIntersectionConvertedAngles(lAngleDOF,angleAOE,returnVal[0])){if(!this.GetIntersectionConvertedAngles(lAngleBOC,angleAOE,returnVal[1])){return false;}return hGetIntersectionConvertedAngleToSliceAngle.call(this,returnVal[1]);}if(!this.GetIntersectionConvertedAngles(lAngleBOC,angleAOE,returnVal[1])){return hGetIntersectionConvertedAngleToSliceAngle.call(this,returnVal[0]);}return(hGetIntersectionConvertedAngleToSliceAngle.call(this,returnVal[0])||hGetIntersectionConvertedAngleToSliceAngle.call(this,returnVal[1]));}function hPointInNormalPieSlice(irPoint){var xDiff,yDiff,distance,sliceInfo=this.mSliceInfo,sliceCenter=sliceInfo.mCenter,sliceRadius=sliceInfo.mRadius;if(sliceInfo.mIs2DCircular){xDiff=(irPoint.x-sliceCenter.x);yDiff=(irPoint.y-sliceCenter.y);distance=Math.sqrt(xDiff*xDiff+yDiff*yDiff);if((sliceRadius-distance)>-$GMM.mTolerance){if(distance<$GMM.mTolerance){return false;}var lAngle=$GMM.RadianToDegree(Math.acos(xDiff/distance));if(yDiff<-$GMM.mTolerance){lAngle=360-lAngle;}if((lAngle>=sliceInfo.mStartAngle)&&(lAngle<=sliceInfo.mEndAngle)){return true;}lAngle+=360;if((lAngle>=sliceInfo.mStartAngle)&&(lAngle<=sliceInfo.mEndAngle)){return true;}return false;}return false;}xDiff=(irPoint.x-sliceCenter.x);var angleBOD,angleAOC,lR,square=sliceRadius*sliceRadius-xDiff*xDiff;if(square<-$GMM.mTolerance){return false;}var lASin=$GMM.RadianToDegree(Math.asin(Math.sqrt(square)/sliceRadius));yDiff=(irPoint.y-(sliceCenter.y-sliceInfo.mDepth));angleBOD={mStartAngle:0,mEndAngle:0};angleAOC={mStartAngle:0,mEndAngle:0};if(xDiff>$GMM.mTolerance){angleBOD.mEndAngle=lASin;angleBOD.mStartAngle=360-lASin;lR=Math.sqrt(xDiff*xDiff+yDiff*yDiff);if(yDiff>$GMM.mTolerance){angleAOC.mEndAngle=$GMM.RadianToDegree(Math.asin(yDiff/lR));}else{angleAOC.mEndAngle=360+$GMM.RadianToDegree(Math.asin(yDiff/lR));}yDiff-=sliceInfo.mDepth;lR=Math.sqrt(xDiff*xDiff+yDiff*yDiff);if(yDiff>$GMM.mTolerance){angleAOC.mStartAngle=$GMM.RadianToDegree(Math.asin(yDiff/lR));}else{angleAOC.mStartAngle=360+$GMM.RadianToDegree(Math.asin(yDiff/lR));}}else{angleBOD.mStartAngle=180-lASin;angleBOD.mEndAngle=180+lASin;lR=Math.sqrt(xDiff*xDiff+yDiff*yDiff);angleAOC.mStartAngle=180-$GMM.RadianToDegree(Math.asin(yDiff/lR));yDiff-=sliceInfo.mDepth;lR=Math.sqrt(xDiff*xDiff+yDiff*yDiff);angleAOC.mEndAngle=180-$GMM.RadianToDegree(Math.asin(yDiff/lR));}var returnVal={mStartAngle:0,mEndAngle:0};if(!this.GetIntersectionConvertedAngles(angleBOD,angleAOC,returnVal)){return false;}return hGetIntersectionConvertedAngleToSliceAngle.call(this,returnVal);}function hGetTopBottomBoundingRect(orBoundingRect){var tempRadius,sliceInfo=this.mSliceInfo,sliceDepth=sliceInfo.mDepth,sliceCenter=sliceInfo.mCenter,sliceRadius=sliceInfo.mRadius,radianStartAngle=$GMM.DegreeToRadian(sliceInfo.mStartAngle),radianEndAngle=$GMM.DegreeToRadian(sliceInfo.mEndAngle);var lStart=new $C.Point2D({x:sliceCenter.x+sliceRadius*Math.cos(radianStartAngle),y:sliceCenter.y+sliceRadius*Math.sin(radianStartAngle)});var lEnd=new $C.Point2D({x:sliceCenter.x+sliceRadius*Math.cos(radianEndAngle),y:sliceCenter.y+sliceRadius*Math.sin(radianEndAngle)});if(this.mBoundingRectType===$BOUNDING_RECT_TYPE.BRT_TOP){lStart.y-=sliceDepth;lEnd.y-=sliceDepth;}var leftTop=new $C.Point2D({x:Math.min(lStart.x,lEnd.x),y:Math.min(lStart.y,lEnd.y)});var rightBottom=new $C.Point2D({x:Math.max(lStart.x,lEnd.x),y:Math.max(lStart.y,lEnd.y)});if(sliceInfo.mIsRingPie){tempRadius=sliceRadius*(sliceInfo.mRingPieFactor/100);var ringStart=new $C.Point2D({x:sliceCenter.x+tempRadius*Math.cos(radianStartAngle),y:sliceCenter.y+tempRadius*Math.sin(radianStartAngle)});var lRingEnd=new $C.Point2D({x:sliceCenter.x+tempRadius*Math.cos(radianEndAngle),y:sliceCenter.y+tempRadius*Math.sin(radianEndAngle)});if(this.mBoundingRectType===$BOUNDING_RECT_TYPE.BRT_TOP){ringStart.y-=sliceDepth;lRingEnd.y-=sliceDepth;}leftTop.x=Math.min(leftTop.x,ringStart.x);leftTop.y=Math.min(leftTop.y,ringStart.y);rightBottom.x=Math.max(rightBottom.x,ringStart.x);rightBottom.y=Math.max(rightBottom.y,ringStart.y);leftTop.x=Math.min(leftTop.x,lRingEnd.x);leftTop.y=Math.min(leftTop.y,lRingEnd.y);rightBottom.x=Math.max(rightBottom.x,lRingEnd.x);rightBottom.y=Math.max(rightBottom.y,lRingEnd.y);}else{leftTop.x=Math.min(leftTop.x,sliceCenter.x);rightBottom.x=Math.max(rightBottom.x,sliceCenter.x);var lTempY=sliceCenter.y;if(this.mBoundingRectType===$BOUNDING_RECT_TYPE.BRT_TOP){lTempY-=sliceDepth;}leftTop.y=Math.min(leftTop.y,lTempY);rightBottom.y=Math.max(rightBottom.y,lTempY);}var axisAngle;for(axisAngle=(sliceInfo.mStartAngle/90+1)*90;axisAngle<sliceInfo.mEndAngle;(axisAngle+=90)){var axisRadian=$GMM.DegreeToRadian(axisAngle);var axisPoint=new $C.Point2D({x:sliceCenter.x+sliceRadius*Math.cos(axisRadian),y:sliceCenter.y+sliceRadius*Math.sin(axisRadian)});if(this.mBoundingRectType===$BOUNDING_RECT_TYPE.BRT_TOP){axisPoint.y-=sliceDepth;}leftTop.x=Math.min(leftTop.x,axisPoint.x);leftTop.y=Math.min(leftTop.y,axisPoint.y);rightBottom.x=Math.max(rightBottom.x,axisPoint.x);rightBottom.y=Math.max(rightBottom.y,axisPoint.y);if(sliceInfo.mIsRingPie){tempRadius=sliceRadius*(sliceInfo.mRingPieFactor/100);var ringAxisPoint=new $C.Point2D({x:sliceCenter.x+tempRadius*Math.cos(axisRadian),y:sliceCenter.y+tempRadius*Math.sin(axisRadian)});if(this.mBoundingRectType===$BOUNDING_RECT_TYPE.BRT_TOP){ringAxisPoint.y-=sliceDepth;}leftTop.x=Math.min(leftTop.x,ringAxisPoint.x);leftTop.y=Math.min(leftTop.y,ringAxisPoint.y);rightBottom.x=Math.max(rightBottom.x,ringAxisPoint.x);rightBottom.y=Math.max(rightBottom.y,ringAxisPoint.y);}}orBoundingRect.x=leftTop.x;orBoundingRect.y=leftTop.y;orBoundingRect.width=rightBottom.x-leftTop.x;orBoundingRect.height=rightBottom.y-leftTop.y;}function hGetCylinderBoundingRect(orBoundingRect){var sliceInfo=this.mSliceInfo,sliceDepth=sliceInfo.mDepth,sliceCenter=sliceInfo.mCenter,lTempRadius=sliceInfo.mRadius;if(this.mBoundingRectType===$BOUNDING_RECT_TYPE.BRT_RING_CYLINDER){lTempRadius*=(sliceInfo.mRingPieFactor/100);}var lRadianStartAngle=$GMM.DegreeToRadian(this.mCylinderStart);var lRadianEndAngle=$GMM.DegreeToRadian(this.mCylinderEnd);var lStart=new $C.Point2D({x:sliceCenter.x+lTempRadius*Math.cos(lRadianStartAngle),y:sliceCenter.y+lTempRadius*Math.sin(lRadianStartAngle)});var lEnd=new $C.Point2D({x:sliceCenter.x+lTempRadius*Math.cos(lRadianEndAngle),y:sliceCenter.y+lTempRadius*Math.sin(lRadianEndAngle)});var lLeftTop=new $C.Point2D({x:Math.min(lStart.x,lEnd.x),y:Math.min(lStart.y-sliceDepth,lEnd.y-sliceDepth)});var lRightBottom=new $C.Point2D({x:Math.max(lStart.x,lEnd.x),y:Math.max(lStart.y,lEnd.y)});var lAxisAngle;for(lAxisAngle=(this.mCylinderStart/90+1)*90;lAxisAngle<this.mCylinderEnd;(lAxisAngle+=90)){var lAxisRadian=$GMM.DegreeToRadian(lAxisAngle);var lAxisPoint=new $C.Point2D({x:sliceCenter.x+lTempRadius*Math.cos(lAxisRadian),y:sliceCenter.y+lTempRadius*Math.sin(lAxisRadian)});lLeftTop.x=Math.min(lLeftTop.x,lAxisPoint.x);lLeftTop.y=Math.min(lLeftTop.y,(lAxisPoint.y-sliceDepth));lRightBottom.x=Math.max(lRightBottom.x,lAxisPoint.x);lRightBottom.y=Math.max(lRightBottom.y,lAxisPoint.y);}orBoundingRect.x=lLeftTop.x;orBoundingRect.y=lLeftTop.y;orBoundingRect.width=lRightBottom.x-lLeftTop.x;orBoundingRect.height=lRightBottom.y-lLeftTop.y;}function hGetRectangleBoundingRect(orBoundingRect){var sliceInfo=this.mSliceInfo,sliceRadius=sliceInfo.mRadius,sliceDepth=sliceInfo.mDepth,sliceCenter=sliceInfo.mCenter,ringPieFactor=sliceInfo.mRingPieFactor,lAngle=(this.mBoundingRectType===$BOUNDING_RECT_TYPE.BRT_START_RECT)?sliceInfo.mStartAngle:sliceInfo.mEndAngle;if(lAngle>=360){lAngle-=360;}var radianAngle=$GMM.DegreeToRadian(lAngle);if(sliceInfo.mIsRingPie){orBoundingRect.width=(sliceRadius*(1-ringPieFactor/100)*Math.abs(Math.cos(radianAngle)));orBoundingRect.height=(sliceDepth+sliceRadius*(1-ringPieFactor/100)*Math.abs(Math.sin(radianAngle)));}else{orBoundingRect.width=(sliceRadius*Math.abs(Math.cos(radianAngle)));orBoundingRect.height=(sliceDepth+Math.abs(sliceRadius*Math.sin(radianAngle)));}if(lAngle<90){if(sliceInfo.mIsRingPie){orBoundingRect.x=(sliceCenter.x+sliceRadius*(ringPieFactor/100)*Math.cos(radianAngle));orBoundingRect.y=(sliceCenter.y-sliceDepth+sliceRadius*(ringPieFactor/100)*Math.sin(radianAngle));}else{orBoundingRect.x=sliceCenter.x;orBoundingRect.y=sliceCenter.y-sliceDepth;}}else{if(lAngle<180){orBoundingRect.x=(sliceCenter.x+sliceRadius*Math.cos(radianAngle));if(sliceInfo.mIsRingPie){orBoundingRect.y=(sliceCenter.y-sliceDepth+sliceRadius*(ringPieFactor/100)*Math.sin(radianAngle));}else{orBoundingRect.y=sliceCenter.y-sliceDepth;}}else{if(lAngle<270){orBoundingRect.x=(sliceCenter.x+sliceRadius*Math.cos(radianAngle));orBoundingRect.y=(sliceCenter.y-sliceDepth+sliceRadius*Math.sin(radianAngle));}else{orBoundingRect.y=(sliceCenter.y-sliceDepth+sliceRadius*Math.sin(radianAngle));if(sliceInfo.mIsRingPie){orBoundingRect.x=(sliceCenter.x+sliceRadius*(ringPieFactor/100)*Math.cos(radianAngle));}else{orBoundingRect.x=sliceCenter.x;}}}}}mstrmojo.chart.PieSliceObject=mstrmojo.declare(mstrmojo.chart.ShapeObject,null,{scriptClass:"mstrmojo.chart.PieSliceObject",mSliceInfo:null,mBoundingRectType:$BOUNDING_RECT_TYPE.BRT_TOP,mCylinderStart:0,mCylinderEnd:0,mOneSeries:false,mIsOutline:false,mStartAngleRadian:0,mEndAngleRadian:0,mMiddleAngleRadian:0,mMiddleAngle:0,mIsShown:false,mIsWhitenOuterBorder:false,init:function init(props){if(props.TripleId){props.TripleId.angleByIndex=props.AngleIndex||0;props.TripleId.sliceById=props.SliceId||0;}this._super(props);this.mSliceInfo={};var si=this.mSliceInfo;si.mStartAngle=props.StartAngle;si.mEndAngle=props.EndAngle;si.mRingPieFactor=props.RingPieFactor;si.mIsRingPie=props.IsRing;si.mIs2DCircular=props.Is2DCircular;si.mScale=props.Scale;si.mCenter=props.Center;si.mRadius=props.Radius;si.mDepth=props.Depth;this.mOneSeries=props.OneSeries;this.mIsShown=props.IsShown;this.mStartAngleRadian=$GMM.DegreeToRadian(si.mStartAngle);this.mEndAngleRadian=$GMM.DegreeToRadian(si.mEndAngle);this.mMiddleAngleRadian=0.5*(this.mStartAngleRadian+this.mEndAngleRadian);this.mMiddleAngle=(0.5*(si.mStartAngle+si.mEndAngle));var lMiddleAngle=this.mMiddleAngle;if(lMiddleAngle>=360){lMiddleAngle%=360;}this.mMiddleAngleQuadrant=Math.floor(lMiddleAngle/90+1);if(!this.mOneSeries){si.mCenter.x+=(props.Explode*Math.cos(this.mMiddleAngleRadian));si.mCenter.y+=(props.Explode*Math.sin(this.mMiddleAngleRadian));}this.mIsWhitenOuterBorder=props.IsWhitenOuterBorder||false;},SetCylinderStart:function SetCylinderStart(iCylinderStart){this.mCylinderStart=iCylinderStart;},SetCylinderEnd:function SetCylinderEnd(iCylinderEnd){this.mCylinderEnd=iCylinderEnd;},SetBoundingRectType:function SetBoundingRectType(iBoundingRectType){this.mBoundingRectType=iBoundingRectType;},SetDrawOutline:function SetDrawOutline(iIsOutline){this.mIsOutline=iIsOutline;},GetSliceInfo:function GetSliceInfo(){return this.mSliceInfo;},GetMiddleAngleQuadrant:function GetMiddleAngleQuadrant(){return this.mMiddleAngleQuadrant;},GetMiddleAngle:function GetMiddleAngle(){return this.mMiddleAngle;},GetMiddleAngleRadian:function GetMiddleAngleRadian(){return this.mMiddleAngleRadian;},Draw:function Draw(){if(this.mIsShown){this.SetLineWidth();this.mIsOutline=false;if(this.mSliceInfo.mIsRingPie){hDrawRingPieSlice.call(this);}else{hDrawNormalPieSlice.call(this);}}},DrawOutLine:function DrawOutLine(){if(this.mIsShown){var chartCtx=this.mChartContextPtr,si=this.mSliceInfo;if(!(si.mIsRingPie)&&si.mIs2DCircular){hDrawGlowEffect.call(this);}var lBackupLineJoinType=this.mChartContextPtr.GetLineJoin();chartCtx.SetLineJoin($LJT.LJT_BEVEL);this.SetOutlineWidth();if(!si.mIs2DCircular){chartCtx.Scale(1,si.mScale);}this.mIsOutline=true;if(si.mIsRingPie){hDrawRingPieSlice.call(this);}else{hDrawNormalPieSlice.call(this);}if(!si.mIs2DCircular){chartCtx.Scale(1,1/si.mScale);}chartCtx.SetLineJoin(lBackupLineJoinType);}},PointInObject:function PointInObject(irPoint){if(this.mIsShown&&this.mFormatLinePtr){var result=false;if(this.mSliceInfo.mIsRingPie){result=hPointInRingPieSlice.call(this,irPoint);}else{result=hPointInNormalPieSlice.call(this,irPoint);}return result;}return false;},GetBoundingRect:function GetBoundingRect(orBoundingRect){if(orBoundingRect===undefined){orBoundingRect=new $C.Rect2D();}var formatFill=this.mFormatFillPtr,sliceInfo=this.mSliceInfo,sliceCenter=sliceInfo.mCenter,sliceRadius=sliceInfo.mRadius;switch(this.mBoundingRectType){case $BOUNDING_RECT_TYPE.BRT_TOP:case $BOUNDING_RECT_TYPE.BRT_BOTTOM:if(formatFill.supportAdvancedFill(0)&&formatFill.mFillBevel.type===$BE.DssGraphFillBevelSphere){orBoundingRect.x=sliceCenter.x-sliceRadius;orBoundingRect.y=sliceCenter.y-sliceInfo.mDepth-sliceRadius;orBoundingRect.width=2*sliceRadius;orBoundingRect.height=2*sliceRadius;}else{hGetTopBottomBoundingRect.call(this,orBoundingRect);}break;case $BOUNDING_RECT_TYPE.BRT_CYLINDER:case $BOUNDING_RECT_TYPE.BRT_RING_CYLINDER:hGetCylinderBoundingRect.call(this,orBoundingRect);break;case $BOUNDING_RECT_TYPE.BRT_START_RECT:case $BOUNDING_RECT_TYPE.BRT_END_RECT:hGetRectangleBoundingRect.call(this,orBoundingRect);break;}return orBoundingRect;},FillBevel:function FillBevel(){var formatFill=this.mFormatFillPtr,sliceInfo=this.mSliceInfo,chartCtx=this.mChartContextPtr;if(formatFill.supportAdvancedFill(0)===false){return ;}if(formatFill.mFillBevel.type===$BE.DssGraphFillBevelDonut){var lInnerRadius=0;if(sliceInfo.mIsRingPie){lInnerRadius=sliceInfo.mRadius*sliceInfo.mRingPieFactor/100;}var lCX=sliceInfo.mCenter.x;var lCY=sliceInfo.mCenter.y;if(!(sliceInfo.mIs2DCircular)){lCY-=sliceInfo.mDepth;}chartCtx.saveState();chartCtx.Clip();chartCtx.FillRadientGradient(formatFill,$RAD_GRADIENT_USAGE.RG_PIESLICE,lCX,lCY,lInnerRadius,sliceInfo.mRadius);chartCtx.RestoreState();}else{if(formatFill.mFillBevel.type===$BE.DssGraphFillBevelSphere){var lAngle=formatFill.mFillBevel.lightAngle;formatFill.mFillBevel.lightAngle=270;$C.ShapeObject.prototype.FillBevel.apply(this,[]);formatFill.mFillBevel.lightAngle=lAngle;}}},ConvertAngle:function ConvertAngle(iorAngle){while(iorAngle.mStartAngle<0){iorAngle.mStartAngle+=360;}while(iorAngle.mStartAngle>360){iorAngle.mStartAngle-=360;}while(iorAngle.mEndAngle<0){iorAngle.mEndAngle+=360;}while(iorAngle.mEndAngle>360){iorAngle.mEndAngle-=360;}},GetIntersectionConvertedAngles:function GetIntersectionConvertedAngles(irAngle1,irAngle2,orAngle){var angle1,angle2;if(irAngle1.mStartAngle>irAngle1.mEndAngle){angle1=[{mStartAngle:0,mEndAngle:irAngle1.mEndAngle},{mStartAngle:irAngle1.mStartAngle,mEndAngle:360}];if(irAngle2.mStartAngle>irAngle2.mEndAngle){angle2=[{mStartAngle:0,mEndAngle:irAngle2.mEndAngle},{mStartAngle:irAngle2.mStartAngle,mEndAngle:360}];var lReturn={mStartAngle:0,mEndAngle:0};this.GetIntersectionAngle(angle1[0],angle2[0],lReturn);orAngle.mEndAngle=lReturn.mEndAngle;this.GetIntersectionAngle(angle1[1],angle2[1],lReturn);orAngle.mStartAngle=lReturn.mStartAngle;return true;}return this.GetIntersectionAngle(irAngle2,angle1[0],orAngle)||this.GetIntersectionAngle(irAngle2,angle1[1],orAngle);}if(irAngle2.mStartAngle>irAngle2.mEndAngle){angle2=[{mStartAngle:0,mEndAngle:irAngle2.mEndAngle},{mStartAngle:irAngle2.mStartAngle,mEndAngle:360}];return this.GetIntersectionAngle(irAngle1,angle2[0],orAngle)||this.GetIntersectionAngle(irAngle1,angle2[1],orAngle);}return this.GetIntersectionAngle(irAngle1,irAngle2,orAngle);},GetIntersectionAngle:function GetIntersectionAngle(irAngle1,irAngle2,orAngle){var maxStart=(irAngle1.mStartAngle>irAngle2.mStartAngle)?irAngle1.mStartAngle:irAngle2.mStartAngle;var minEnd=(irAngle1.mEndAngle>irAngle2.mEndAngle)?irAngle2.mEndAngle:irAngle1.mEndAngle;if(maxStart>minEnd){return false;}if(orAngle){orAngle.mStartAngle=maxStart;orAngle.mEndAngle=minEnd;}return true;},ElementDrawRingPieTop:function ElementDrawRingPieTop(){hDrawRingPieTop.call(this);},ElementDrawNormalPieTop:function ElementDrawNormalPieTop(){hDrawNormalPieTop.call(this);},ElementFillSide:function ElementFillSide(){hFillSide.call(this);},GetClockwisePolygon:function GetClockwisePolygon(){var orPolygon=[],sliceInfo=this.mSliceInfo;var lCenter=new $C.Point2D({x:sliceInfo.mCenter.x,y:sliceInfo.mCenter.y});if(!(sliceInfo.mIs2DCircular)){lCenter.y-=sliceInfo.mDepth;}orPolygon.push(new $C.Point2D({x:lCenter.x,y:lCenter.y*sliceInfo.mScale}));var lAngle;for(lAngle=sliceInfo.mStartAngle;lAngle-sliceInfo.mEndAngle<0;lAngle+=kPolygonApproximationAngle){var lAngleRadian=$GMM.DegreeToRadian(lAngle);orPolygon.push(new $C.Point2D({x:lCenter.x+sliceInfo.mRadius*Math.cos(lAngleRadian),y:((lCenter.y+sliceInfo.mRadius*Math.sin(lAngleRadian))*sliceInfo.mScale)}));}var lEndAngleRadian=$GMM.DegreeToRadian(sliceInfo.mEndAngle);orPolygon.push(new $C.Point2D({x:lCenter.x+sliceInfo.mRadius*Math.cos(lEndAngleRadian),y:(lCenter.y+sliceInfo.mRadius*Math.sin(lEndAngleRadian))*sliceInfo.mScale}));return orPolygon;},IsCircularShape:function IsCircularShape(){return true;},SetWhitenOuterBorder:function SetWhitenOuterBorder(iWhiten){this.mIsWhitenOuterBorder=iWhiten;},getRadialInfo:function getRadialInfo(){var sliceInfo=this.mSliceInfo,info={r:sliceInfo.mRadius,cx:sliceInfo.mCenter.x,cy:sliceInfo.mCenter.y,fx:0,fy:0};info.fx=info.cx;info.fy=info.cy;if(sliceInfo.mIsRingPie){info.startStop=sliceInfo.mRingPieFactor/100;}return info;},getShapeSize:function getShapeSize(){if(this.mSliceInfo){return this.mSliceInfo.mRadius||0;}return 0;}});}());