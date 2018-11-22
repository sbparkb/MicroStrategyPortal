(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo.heatmap.vi.VisHeatMapColorTheme","mstrmojo.dom","mstrmojo.hash","mstrmojo.css","mstrmojo.VisUtility","mstrmojo.util.color");var $CLRUTIL=mstrmojo.util.color,$UTILS=mstrmojo.VisUtility,$HASH=mstrmojo.hash;var LABEL={ON:0,OFF:1,PROPORTIONAL:2};var FMT={LABEL_CTNR_THRES:6,LABEL_CTNR_WIDTH_THRES:32,LGD_GUTTER:5,LABEL_PADDING:5};var LABEL_TEXT_SIZE_PADDING=0.5;function wfs(root,f){var arr=[root];while(arr.length!==0){var node=arr.shift();if(node===undefined||node.deleted){continue;}f(node);var children=node.entityChildren;if(children!==undefined){var l=children.length,i;for(i=0;i<l;i++){arr.push(children[i]);}}}}function dfs(root,f,indexString){if(root.deleted){return ;}if(indexString===undefined){f(root);}else{f(root,indexString);}if(root.entityChildren===undefined){return ;}var arr=root.entityChildren,l=arr.length,i;for(i=0;i<l;i++){var e=arr[i];if(indexString===undefined){dfs(e,f);}else{var param=indexString;if(!param){param=i.toString();}else{param=param+":"+i;}dfs(e,f,param);}}}function scaleFontSize(str,numberValue){var value=parseFloat(str),len=value.toString().length,unit=str.substring(len);return value*numberValue+unit;}function getLabelCSS(l,n,isHeaderOnTop){var css;if(isHeaderOnTop){if(l===0){css="heatmap-level-1-header-on-top";}else{if(l===1){css="heatmap-level-2-header-on-top";}else{css="heatmap-level-3-header-on-top";}}}else{if(n===1){if(l===0){css="heatmap-one-level-1";}}else{if(n===2){if(l===0){css="heatmap-multi-level-1";}else{if(l===1){css="heatmap-two-level-2";}}}else{if(n>=3){if(l===0){css="heatmap-multi-level-1";}else{if(l===1){css="heatmap-multi-level-2";}else{if(l===2){css="heatmap-multi-level-3";}}}}}}}return css;}function intersect(lhs,rhs){if(!lhs||!rhs){return false;}return !(rhs.x>=lhs.x+lhs.w||rhs.y>=lhs.y+lhs.h||rhs.x+rhs.w<=lhs.x||rhs.y+rhs.h<=lhs.y);}function rectIntersection(a,b){var x=Math.max(a.x,b.x);var y=Math.max(a.y,b.y);var w=Math.min(a.x+a.w,b.x+b.w)-x;var h=Math.min(a.y+a.h,b.y+b.h)-y;if(w<0||h<0){return{x:NaN,y:NaN,w:NaN,h:NaN};}return{x:x,y:y,w:w,h:h};}function measureFontGroup(group){var dom=this.domSpan;Object.keys(group||[]).forEach(function(css){if(css!=="scale"&&css!=="family"){dom.className=css;var fontSize=group[css];if(fontSize){dom.style.fontFamily=group.family;dom.style.fontSize=scaleFontSize(fontSize,group.scale);}var res=document.defaultView.getComputedStyle(dom);group[css]={fontSize:parseInt(res.fontSize,10),fontWeight:res.fontWeight};}});}function mixWithBgColor(clr){var bgc=this.bgColor,bg={value:bgc!==undefined?bgc:"#ffffff",opacity:1};return $CLRUTIL.mix(clr,bg);}function generateLabel(o){var e=o.e,css=o.css,s=o.s,div=document.createElement("div"),color=this.getLabelColor(e,s),style=div.style;div.className=css+" heatmap-trun-text";style.position="absolute";style.width=s.w+"px";style.height=(s.h+0.5)+"px";style.lineHeight=o.lh+"px";style.zIndex=1;style.color=color;if(o.fontSize){style.fontSize=o.fontSize;}if(o.fontFamily){style.fontFamily=o.fontFamily;}if(o.fontWeight){style.fontWeight=o.fontWeight;}div.innerHTML="<span>#label</span>".replace("#label",e.text);div.firstChild.setAttribute("idx",e.idx);e.labelDomNode=div;var container=document.createElement("div"),cs=container.style;cs.position="absolute";cs.left=s.x+"px";cs.top=s.y+"px";cs.width=s.w+"px";cs.height=s.h+"px";container.appendChild(div);var square=document.createElement("div");square.className="heatmap-label-square";var squareSize=4;square.style.width=squareSize+"px";square.style.height=squareSize+"px";square.style.top=(o.lh-squareSize)+"px";container.appendChild(square);return container;}mstrmojo.heatmap.vi.VisHeatMapCanvas=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.heatmap.vi.VisHeatMapCanvas",parent:null,root:null,colorTheme:null,attributes:[],scale:1,labelSetting:0,showMetric:false,bgColor:"#333333",numImages:0,offsetX:0,offsetY:0,markupString:'<div style="position:absolute; width:{@width}px; height:{@height}px"><canvas width={@width} height={@height} style="visibility: hidden; z-index:0"></canvas><span></span></div>',markupSlots:{domCanvas:function(){return this.domNode.firstChild;},domSpan:function(){return this.domNode.childNodes[1];},domImage:function(){return this.domNode.childNodes[2];}},init:function(props){if(this._super){this._super(props);}this.canvasStepX=this.scale*this.width;this.canvasStepY=this.scale*this.height;},postBuildRendering:function(){if(!this.isFontHeightMeasured){this.measureFontHeight();}this.draw();this._super();},removeImageAndLabels:function(){var dom=this.domNode,labels=dom.childNodes,n=labels.length,i;for(i=n-1;i>1;i--){var node=labels[i];dom.removeChild(node);}this.numImages=0;},removeLabels:function(){var dom=this.domNode,labels=dom.childNodes,n=labels.length,stop=1+this.numImages,i;for(i=n-1;i>stop;i--){var node=labels[i];dom.removeChild(node);}},updateOffsets:function(x,y){this.offsetX=x;this.offsetY=y;this.removeLabels();this.drawLabels();},draw:function(x,y){if(x!==undefined){this.offsetX=x;}if(y!==undefined){this.offsetY=y;}this.removeImageAndLabels();this.drawRects();this.drawLabels();},drawRects:function(){var w=this.width,h=this.height,k=this.scale,cw=Math.ceil(w*k),ch=Math.ceil(h*k),cvs=this.domCanvas,dom=this.domNode,fragment=document.createDocumentFragment(),stepX=this.canvasStepX,stepY=this.canvasStepY,row=Math.ceil(ch/stepY),col=Math.ceil(cw/stepX),count=0,i,j,ctx,view;var drawPiece=function(e,idx){var rect,color,cv,startX,startY,endX,endY;if(!e.deleted){if(e.entityChildren===undefined){rect=e.size;color=e.color;}else{if(e.headerSize){rect=e.headerSize;color=e.headerColor;}}if(intersect(view,rect)){var x1=Math.max(rect.x-view.x,0),y1=Math.max(rect.y-view.y,0),x2=Math.min(rect.x+rect.w-view.x,view.w),y2=Math.min(rect.y+rect.h-view.y,view.h);cv=color.value;if($CLRUTIL.isGradientColor(cv)&&cv.or===1){startX=x1;startY=y1;endX=x2;endY=y1;}else{startX=x1;startY=y1;endX=x1;endY=y2;}ctx.fillStyle=$CLRUTIL.createCanvasFillPattern(color,ctx,startX,startY,endX,endY);ctx.fillRect(x1,y1,x2-x1,y2-y1);}}e.idx=idx;};for(i=0;i<row;i++){for(j=0;j<col;j++){view={x:j*stepX,y:i*stepY,w:stepX,h:stepY};if(i+1===row){view.h=ch-view.y;}if(j+1===col){view.w=cw-view.x;}cvs.width=view.w;cvs.height=view.h;ctx=cvs.getContext("2d");ctx.fillStyle="rgba(0, 0, 0, 0)";ctx.fillRect(0,0,view.w,view.h);dfs(this.root,drawPiece,"");var res=cvs.toDataURL();var img=document.createElement("img");img.src=res;img.style.position="absolute";img.style.left=view.x+"px";img.style.top=view.y+"px";img.draggable=false;img.setAttribute("orgx",view.x);img.setAttribute("orgy",view.y);fragment.appendChild(img);count++;}}cvs.width=0;cvs.height=0;dom.style.width=cw+"px";dom.style.height=ch+"px";dom.appendChild(fragment);this.numImages=count;},drawLabels:function(){var attributeCount=this.attributes.length,that=this,gutter=FMT.LGD_GUTTER*2,padding=2*FMT.LABEL_PADDING,window={x:this.offsetX,y:this.offsetY,w:this.width,h:this.height},caches=[],layout=[{},{},{}];var ext=Math.floor(Math.log(this.scale)/Math.log(2));ext=Math.min(ext,attributeCount-3);ext=Math.max(ext,0);this._ext=ext;var isLabelOff=this.labelSetting===LABEL.OFF;var ellipsis="\u2026";function getProportionalFontSize(str,fontName,fontWeight,loc){var lh=9,step=8,shrink=false,txtS=that.getTextSize(str,fontName,lh,fontWeight,false,loc.w);while(step>=1){if(txtS.h<loc.h){lh+=step;}else{if(lh===9){break;}if(lh>=loc.w){break;}if(!shrink){step/=2;}shrink=true;lh-=step;}txtS=that.getTextSize(str,fontName,lh,fontWeight,false,loc.w);if(shrink){step=step>>1;}}if(txtS.h>loc.h&&lh>9){lh--;}if(lh>loc.w){lh=loc.w;}return{fontSize:lh,loc:loc};}function drawCellText(labelInfo,rect,str,fontFamily,fontSize,fontWeight){var w=rect&&(rect.w-padding),h=rect&&(rect.h-padding);var labelTooLarge={drop:true};var tw,th,lineHeight,txtS,ellipsisWidth;if(that.labelSetting===LABEL.PROPORTIONAL){var loc=mstrmojo.hash.copy(rect);loc.w=w;loc.h=h;var newLayout=getProportionalFontSize(str,fontFamily,fontWeight,loc);lineHeight=newLayout.fontSize;loc=newLayout.loc;labelInfo.fs=lineHeight;labelInfo.lh=lineHeight;txtS=that.getTextSize(str,fontFamily,lineHeight,fontWeight,false,w);if(txtS.h>loc.h){return labelTooLarge;}tw=txtS.w;th=txtS.h;fontSize=lineHeight;}else{lineHeight=fontSize;txtS=that.getTextSize(str,fontFamily,lineHeight,fontWeight,false,w,true);ellipsisWidth=that.getTextSize(ellipsis,fontFamily,lineHeight,fontWeight,false).scrollWidth;th=txtS.h;tw=txtS.w;labelInfo.lh=lineHeight;if(txtS.scrollWidth/2+ellipsisWidth+LABEL_TEXT_SIZE_PADDING>w){return labelTooLarge;}if(th>h){return labelTooLarge;}}labelInfo.isLowestLevel=true;return{w:tw,h:th,fontSize:fontSize};}function drawHeaderText(level,labelInfo,rect,str,fontFamily,fontSize,fontWeight){var w=rect&&rect.w,h=rect&&rect.h,isHeaderOnMiddle=!that.isHeaderOnTop,dropLabel={drop:true};if(isHeaderOnMiddle&&attributeCount>1&&level===0){w-=gutter;h-=gutter;}var textSize,th,tw,ellipsisWidth;if(that.showMetric){textSize=that.getTextSize(str,fontFamily,fontSize,fontWeight,false);}else{if(!caches[level]){caches[level]={};}var cache=caches[level];textSize=cache[str];if(!textSize){textSize=that.getTextSize(str,fontFamily,fontSize,fontWeight,false,w,true);cache[str]=textSize;}}th=textSize.h;tw=Math.min(textSize.w,w);if(isHeaderOnMiddle){ellipsisWidth=0;}else{ellipsisWidth=that.getTextSize(ellipsis,fontFamily,fontSize,fontWeight,false).scrollWidth;}if(textSize.scrollWidth/2+ellipsisWidth+LABEL_TEXT_SIZE_PADDING>w){return dropLabel;}if(th>h){return dropLabel;}labelInfo.lh=th;return{w:tw,h:th,fontSize:fontSize};}function saveLabelSizeInfo(level,idx,rect,textInfo,labelInfo){var tw=textInfo.w;var th=textInfo.h;var fontSize=textInfo.fontSize;var x=rect.x+((rect.w-tw)/2);var y=rect.y+((rect.h-th)/2);labelInfo.s={x:x,y:y,w:tw,h:th};if(layout[level]===undefined){layout[level]={};}var fontGroup=that.getFontGroup(that.fonts,level);if(fontGroup){labelInfo.fontFamily=fontGroup.family;}labelInfo.fontSize=fontSize+"px";layout[level][idx]=labelInfo;}function dropEntityLabel(e){if(e===that.root||e.deleted||(isLabelOff&&!e.entityChildren)){return true;}var rect=(that.isHeaderOnTop&&e.entityChildren)?e.headerSize:e.size;if(!intersect(window,rect)){return true;}if(rect.w<FMT.LABEL_CTNR_WIDTH_THRES+2*FMT.LABEL_PADDING||rect.h<FMT.LABEL_CTNR_THRES){return true;}if(!that.isHeaderOnTop){var level=e.level-ext;if(level<0||level>=3){return true;}}return false;}function drawText(e){if(dropEntityLabel(e)){return ;}var rect,level;if(that.isHeaderOnTop){rect=e.entityChildren?e.headerSize:e.size;level=e.level;}else{rect=e.size;level=e.level-ext;}var textInfo,str=e.text,idx=e.idx,labelCSS=getLabelCSS(level,attributeCount,that.isHeaderOnTop),fontGroup=that.getFontGroup(that.measuredFonts,e.level),fontFamily=fontGroup.family,fontStyles=fontGroup[labelCSS],fontSize=fontStyles.fontSize,fontWeight=fontStyles.fontWeight,labelInfo={s:{},e:e,m:0,css:labelCSS};if(!e.entityChildren){textInfo=drawCellText(labelInfo,rect,str,fontFamily,fontSize,fontWeight);}else{textInfo=drawHeaderText(level,labelInfo,rect,str,fontFamily,fontSize,fontWeight);}if(textInfo.drop){return ;}saveLabelSizeInfo(level,idx,rect,textInfo,labelInfo);}wfs(this.root,drawText);if(this.isHeaderOnTop){this.layoutLabelsOnTop(layout);}else{this.layoutLabelsOnMiddle(layout);}},layoutLabelsOnTop:function(layout){var fragment=document.createDocumentFragment(),len=layout.length,i,_this=this;for(i=0;i<len;i++){var L=layout[i],idx;for(idx in L){var info=L[idx],labelContainer=generateLabel.call(this,info),style=labelContainer.firstChild.style;if(info.isLowestLevel||_this.isHeaderColorsModified()){style.color=_this.getLabelColor(info.e);}if(info.isLowestLevel&&_this.labelSetting===LABEL.PROPORTIONAL){style.wordBreak="break-all";}else{style.textOverflow="ellipsis";style.wordBreak="normal";}fragment.appendChild(labelContainer);}}this.domNode.appendChild(fragment);},layoutLabelsOnMiddle:function(layout){var doc=document,fragment=doc.createDocumentFragment(),_this=this;function generateLabelOnMiddle(info){var labelContainer=generateLabel.call(_this,info);var style=labelContainer.firstChild.style;if(info.isLowestLevel&&_this.labelSetting===LABEL.PROPORTIONAL){style.wordBreak="break-all";}else{style.wordBreak="normal";}fragment.appendChild(labelContainer);}var L0=layout[0],L1=layout[1],L2=layout[2],idx,rmIt;for(idx in L1){var info=L1[idx],bbox=info.s,node=info.e,prt=node.parentEntity,pinfo=L0[prt.idx];if(pinfo===undefined){generateLabelOnMiddle(info);}if(!!pinfo){var pbox=pinfo.s,inter=rectIntersection(bbox,pbox);if(inter.w>5||inter.h>5){var delta;if(pbox.y<=bbox.y){delta=((pbox.y+pbox.h-bbox.y)>>1)+1;if(pinfo.m!==2&&(pbox.y-delta>=prt.size.y)&&(bbox.y+bbox.h+delta<=node.size.y+node.size.h)){pbox.y-=delta;bbox.y+=delta;pinfo.m=1;}else{rmIt=true;}}else{delta=((bbox.y+bbox.h-pbox.y)>>1)+1;if(pinfo.m!==1&&(pbox.y+pbox.h+delta<=prt.size.y+prt.size.h)&&(bbox.y-delta>=node.size.y)){pbox.y+=delta;bbox.y-=delta;pinfo.m=2;}else{rmIt=true;}}}if(rmIt!==true){generateLabelOnMiddle(info);}}}for(idx in L0){generateLabelOnMiddle(L0[idx]);}for(idx in L2){rmIt=false;var info2=L2[idx],node2=info2.e,node1=node2.parentEntity,node0=node1.parentEntity,idx1=node1.idx,idx0=node0.idx,info1=L1[idx1],info0=L0[idx0];if(info1!==undefined){var inter12=rectIntersection(info1.s,info2.s);if(!isNaN(inter12.w)){rmIt=true;}}if(rmIt===false&&info0!==undefined){var inter02=rectIntersection(info0.s,info2.s);if(!isNaN(inter02.w)){rmIt=true;}}if(rmIt!==true){generateLabelOnMiddle(info2);}}this.domNode.appendChild(fragment);},getLabelColor:function(e,s,filter){var ret,ct=this.colorTheme,bgmixer=mixWithBgColor.bind(this),color,value,level,mixer;if(filter){mixer=function(labelBackgroundColor){return filter(bgmixer(labelBackgroundColor));};}else{mixer=bgmixer;}if(this.isHeaderOnTop){if(!e.entityChildren){color=e.color;}else{color=e.headerColor;}color=mixer(color);value=$CLRUTIL.getColorValue(color.value);ret=$CLRUTIL.getCSSColorString(ct.getContrastColor(value));}else{level=e.level-this._ext;if(level===0){return"#FFFFFF";}if(e.entityChildren===undefined){color=mixer(e.color);value=$CLRUTIL.getColorValue(color.value);return $CLRUTIL.getCSSColorString(ct.getContrastColor(value));}var stack=[e],ls=0,ds=0;while(stack.length!==0){var node=stack.shift(),ch=node.entityChildren,n=node.entityChildren.length,i;for(i=0;i<n;i++){var child=ch[i];if(child.deleted){continue;}var rect=rectIntersection(s,child.size);if(child.entityChildren===undefined){if(!isNaN(rect.w)){color=mixer(child.color);value=$CLRUTIL.getColorValue(color.value);if(ct.isBrightColor(value)){ls+=rect.w*rect.h;}else{ds+=rect.w*rect.h;}}}else{if(!isNaN(rect.w)){stack.push(child);}}}}if(ls>ds){ret="#000000";}else{if(level===1){ret="#e6e7e8";}else{ret="#d1d3d4";}}}return ret;},getEntity:function(pos){var ox=pos.x,oy=pos.y,target;var hitTest=function(node){if(node.deleted){return ;}var size;if(node.entityChildren===undefined){size=node.size;}else{if(node.entityChildren&&node.headerSize!==undefined){size=node.headerSize;}}if(size){var x1=size.x,y1=size.y,x2=x1+size.w,y2=y1+size.h;if(ox>=x1&&ox<=x2&&oy>=y1&&oy<=y2){target=node;}}};var dfsReturnOnFound=function(root,f){if(root.deleted){return ;}f(root);var arr=root.entityChildren;if(arr!==undefined){var l=arr.length,i;for(i=0;i<l;i++){var e=arr[i];dfsReturnOnFound(e,f);if(target!==undefined){return ;}}}};dfsReturnOnFound(this.root,hitTest);return target;},getFontGroup:function(fonts,level){if(!this.isHeaderOnTop){return fonts.headerOnMiddle;}var n=this.attributes.length;return n===level+1?fonts.headerOnTop.cell:fonts.headerOnTop.header;},clearFontCache:function(){this.isFontHeightMeasured=false;},measureFontHeight:function(){this.measuredFonts=$HASH.clone(this.fonts);var measuredFonts=this.measuredFonts;measureFontGroup.call(this,measuredFonts.headerOnMiddle);measureFontGroup.call(this,measuredFonts.headerOnTop.header);measureFontGroup.call(this,measuredFonts.headerOnTop.cell);this.isFontHeightMeasured=true;},getTextSize:function(str,fontName,fontSize,fontWeight,isItalic,width,normalBreak){function measureTextSize(useScroll){var dom=this.domSpan,w,h,scrollWidth;dom.className="";dom.innerHTML=str;dom.style.cssText="position:absolute; visibility:hidden; z-index:-1; font-family:"+fontName+"; font-size:"+fontSize+"px; font-weight:"+fontWeight+"; font-style:"+(isItalic?"italic":"normal")+"; line-height:"+fontSize+"px;";if(!useScroll){w=dom.offsetWidth;h=dom.offsetHeight;}if(useScroll||(width!==undefined&&w>width)){dom.style.cssText+="overflow:hidden; word-break:"+breakMethod+"; width:"+width+"px;";h=dom.offsetHeight;w=dom.offsetWidth;if(useScroll){scrollWidth=dom.scrollWidth;}}return{w:w,h:h,scrollWidth:useScroll?scrollWidth:w};}var w,h,size,fontSizeStr,fs;var breakMethod="break-all";if(normalBreak){breakMethod="normal";}if(typeof fontSize==="number"){fontSizeStr=fontSize+"px";}fontWeight=fontWeight||"normal";if(this.showMetric){size=measureTextSize.call(this);}else{fs={fontFamily:fontName,fontSize:fontSizeStr,fontWeight:fontWeight,fontStyle:isItalic?"italic":"normal"};w=Math.ceil($UTILS.measureTextWidth(str.trim(),fs));h=fontSize;if(width!==undefined&&w>width){size=measureTextSize.call(this,true);}else{size={w:w,h:h,scrollWidth:w};}}size.w+=LABEL_TEXT_SIZE_PADDING;return size;}});}());