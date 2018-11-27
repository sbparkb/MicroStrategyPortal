(function(){mstrmojo.requiresCls("mstrmojo.Box","mstrmojo.dom","mstrmojo.css","mstrmojo.string","mstrmojo.VisUtility");var $CSS=mstrmojo.css,$UTILS=mstrmojo.VisUtility,$ARR=mstrmojo.array,$STR=mstrmojo.string,cssBaseClass="vis-tooltip",OFFSET_MAX=20,MAX_STRING_WIDTH=165,MAX_WIDTH=350,MAX_HEIGHT=350,PX="px";function addTableNode(){var domNode=this.domNode;domNode.innerHTML="";var container=document.createElement("div");container.className=cssBaseClass+"-container";var table=document.createElement("table");table.className=cssBaseClass+"-table";for(var i=0;i<3;i++){table.appendChild(document.createElement("COL"));}container.appendChild(table);this.domNode.appendChild(container);return table;}function getTrendLineFuncHtmlText(funcTokens){var textArr=[],hasSuper=false;$ARR.forEach(funcTokens,function(exprToken){if(!exprToken.isSuper){textArr.push(exprToken.v);}else{hasSuper=true;textArr.push("<sup>"+exprToken.v+"</sup>");}});return{hasSuper:hasSuper,htmlText:textArr.join("")};}mstrmojo.VisTooltip=mstrmojo.declare(mstrmojo.Box,null,{scriptClass:"mstrmojo.VisTooltip",init:function init(props){this._super(props);$CSS.addWidgetCssClass(this,(props&&props.widgetClass)?[props.widgetClass,cssBaseClass]:cssBaseClass);},toggle:function toggle(show){var inPrintPreview=mstrApp.isAppStatePrintPreview&&mstrApp.isAppStatePrintPreview();if(this.domNode){this.domNode.style.display=show&&!inPrintPreview?"block":"none";}},displayInfo:function displayInfo(infoArr,pos,nContainColon){var container=this.domNode,table=addTableNode.call(this),isLastTRSeparator=false,maxNameLen=0,maxValueLen=0,spaceLen=10,exceedMaxHeight=false,col0=table.childNodes[0],col2=table.childNodes[2];infoArr.forEach(function(infoItem){var itemName,itemValue,nameFs,nameLen,valueFs,valueLen,lineCountToTruncate,result,tlFuncHtmlText,isFuncToken,tableWidth,needEncode;if(!exceedMaxHeight){var tr=table.insertRow(-1),td0=tr.insertCell(-1),td1=tr.insertCell(-1),td2=tr.insertCell(-1);tr.className=cssBaseClass+"-tr";td0.className=cssBaseClass+"-name";td1.className=cssBaseClass+"-space";td2.className=cssBaseClass+"-value";if(infoItem===null){$CSS.addClass(tr,"separator");isLastTRSeparator=true;}else{if(isLastTRSeparator){$CSS.addClass(tr,"below-separator");}if(!nContainColon){td1.innerHTML=":";}itemName=infoItem.n;needEncode=!infoItem.skipEncode;td0.innerHTML=needEncode?$STR.encodeHtmlString(itemName,true):itemName;nameFs=$UTILS.getComputedFontStyle(td0);nameLen=Math.ceil($UTILS.measureTextWidth(td0.innerHTML,nameFs,nameFs.bonus));lineCountToTruncate=container.offsetHeight>=MAX_HEIGHT?1:2;if(nameLen>MAX_STRING_WIDTH){result=$UTILS.truncateTextToLineWithWordWrap(itemName,nameFs,MAX_STRING_WIDTH,lineCountToTruncate,true);if(result.canWordWrap){td0.innerHTML=needEncode?$STR.encodeHtmlString(result.text,true):result.text;}else{result=$UTILS.truncateTextToLineWithWordWrap(itemName,nameFs,MAX_STRING_WIDTH,1);td0.innerHTML=needEncode?$STR.encodeHtmlString(result,true):result;}}maxNameLen=Math.min(Math.max(maxNameLen,nameLen),MAX_STRING_WIDTH);itemValue=infoItem.v;isFuncToken=infoItem.isTrendLineFuncToken;if(isFuncToken){tlFuncHtmlText=getTrendLineFuncHtmlText(itemValue);}if(!isFuncToken||!tlFuncHtmlText.hasSuper){if(isFuncToken){itemValue=tlFuncHtmlText.htmlText;}td2.innerHTML=needEncode?$STR.encodeHtmlString(itemValue,true):itemValue;valueFs=$UTILS.getComputedFontStyle(td2);valueLen=Math.ceil($UTILS.measureTextWidth(td2.innerHTML,valueFs,valueFs.bonus,null,true));if(valueLen>MAX_STRING_WIDTH){result=$UTILS.truncateTextToLineWithWordWrap(itemValue,valueFs,MAX_STRING_WIDTH,infoItem.noTruncate?100:lineCountToTruncate,true);if(!result.canWordWrap){result=$UTILS.truncateTextToLineWithWordWrap(itemValue,valueFs,MAX_STRING_WIDTH,1,true);}td2.innerHTML=needEncode?$STR.encodeHtmlString(result.text,true):result.text;valueLen=result.maxLineLen;}maxValueLen=Math.min(Math.max(maxValueLen,valueLen),MAX_STRING_WIDTH);}else{td2.innerHTML=tlFuncHtmlText.htmlText;valueFs=$UTILS.getComputedFontStyle(td2);valueLen=0;$ARR.forEach(itemValue,function(exprToken){exprToken.textWidth=$UTILS.measureSuperTextWidth(exprToken.isSuper,exprToken.v,valueFs,valueFs.bonus);valueLen+=exprToken.textWidth;});valueLen=Math.ceil(valueLen);if(valueLen>MAX_STRING_WIDTH){result=$UTILS.truncateTextToLineWithWordWrapForTokens(itemValue,valueFs,MAX_STRING_WIDTH,infoItem.noTruncate?100:lineCountToTruncate,true,true);if(!result.canWordWrap){result=$UTILS.truncateTextToLineWithWordWrapForTokens(itemValue,valueFs,MAX_STRING_WIDTH,1,true);}td2.innerHTML=getTrendLineFuncHtmlText(result.text).htmlText;valueLen=result.maxLineLen;}maxValueLen=Math.min(Math.max(maxValueLen,valueLen),MAX_STRING_WIDTH);}col0.style.width=maxNameLen+"px";col2.style.width=maxValueLen+"px";tableWidth=maxNameLen+maxValueLen+spaceLen;table.style.width=mstrmojo.dom.isIE9?(tableWidth+2)+"px":tableWidth+"px";isLastTRSeparator=false;}if(container.offsetHeight>=MAX_HEIGHT){var tbody=table.lastChild;tbody&&tbody.removeChild(tbody.lastChild);exceedMaxHeight=true;}}});if(pos){this.moveTo(pos.x,pos.y);}},moveTo:function(x,y){var loc=mstrmojo.dom.position(document.body),domNode=this.domNode,w=domNode.offsetWidth,h=domNode.offsetHeight,ctnX2=loc.x+loc.w,ctnY2=loc.y+loc.h,ox=x+OFFSET_MAX,oy=y+OFFSET_MAX;if(ox>ctnX2-w||oy>ctnY2-h){if(ox<=ctnX2-w){oy=ctnY2-h;}else{if(oy<=ctnY2-h){ox=ctnX2-w;}else{ox=ctnX2-w;oy=y-OFFSET_MAX-h;}}}var domNodeStyle=domNode.style;domNodeStyle.left=ox+PX;domNodeStyle.top=oy+PX;},doLayout:function doLayout(tableMaxWidth){var table=this.domNode.getElementsByTagName("table")[0];if(!table){return ;}var tooltipStyle=$CSS.getComputedStyle(this.domNode),maxWidthForValue=tableMaxWidth-parseInt(tooltipStyle.paddingLeft,10)-parseInt(tooltipStyle.paddingRight,10);maxWidthForValue-=table.rows[0].cells[0].offsetWidth;maxWidthForValue-=10;table.getElementsByClassName(cssBaseClass+"-value").forEach(function(cell){cell.style.maxWidth=maxWidthForValue+PX;});},posTo:function posTo(pos){var domNodeStyle=this.domNode.style;domNodeStyle.left=pos.x+PX;domNodeStyle.top=pos.y+PX;},renderErrMsg:function renderErrMsg(msg){addTableNode.call(this).insertRow(-1).insertCell(-1).innerText=msg;}});}());