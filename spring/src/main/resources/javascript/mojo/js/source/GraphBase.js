(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.Widget","mstrmojo.tooltip","mstrmojo.string","mstrmojo.array");var mapIdx=0,$ARR=mstrmojo.array,$STR=mstrmojo.string;function configureDisplay(){var tn=this.textNode,img=this.imgNode;if(this.eg!=null){img.style.display="none";tn.innerHTML=this.eg||"";tn.style.display="block";}else{tn.style.display="none";img.style.display="block";if(this.tooltip){img.setAttribute("ttl",this.tooltip);}var fmts=this.getFormats();this.retrieveGraphSrc(fmts.height,fmts.width);}}var areaShapeMap={6:"poly",7:"rect",100:"circle"};function generateImageMap(){var areaData=this.as,len=areaData&&areaData.length;if(!len){return ;}var widgetId=this.id,mapId=widgetId+"_map"+mapIdx++,buf=[],x=-1,i;for(i=0;i<len;i++){var area=areaData[i];area.id=widgetId;area.aid=i;area.tooltip=$STR.multiReplace(area.tooltip||"",{"&#13":"<br />","&#32":" ",'"':"&quot;"});if(!isNaN(area.shape)){area.shape=this.getAreaShapeName(area.shape);}if(area.tks||area.tks===""||area.tty===1){area.extra=' href="#" ';}buf[++x]=$STR.apply(this.areaMarkup,area);}var mapMarkup='<map id="'+mapId+'" name="'+mapId+'">'+buf.join("")+"</map>";if(!this.domNode){this.att='usemap="#'+mapId+'" ';this.map=mapMarkup;}else{var newMap=document.createElement("div");newMap.innerHTML=mapMarkup;if(this.mapNode){newMap=newMap.firstChild;this.mapNode.innerHTML=newMap.innerHTML;}else{this.imgNode.setAttribute("usemap","#"+mapId);this.mapNode=this.domNode.appendChild(newMap.firstChild);}}}var graphBase=mstrmojo.GraphBase=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.GraphBase",cssClassPrefix:"mstrmojo-GraphBase",markupString:'<div id="{@id}" class="{@cssClassPrefix} {@cssClass}" title="{@tooltip}" style="{@domNodeCssText};"><div class="{@cssClassPrefix}-txt"></div><img {@att}src="../images/1ptrans.gif" class="{@cssClassPrefix} {@cssImageClass}" hidefocus="true" />{@map}</div>',att:"",map:"",cAreaIdx:-1,useRichTooltip:true,markupSlots:{imgNode:function imgNode(){return this.domNode.childNodes[1];},mapNode:function mapNode(){return this.domNode.childNodes.length>2?this.domNode.childNodes[2]:null;},textNode:function textNode(){return this.domNode.firstChild;}},markupMethods:{onvisibleChange:function onvisibleChange(){this.domNode.style.display=(this.visible)?"block":"none";}},preBuildRendering:function preBuildRendering(){generateImageMap.call(this);return this._super();},postBuildRendering:function postBuildRendering(){configureDisplay.call(this);return this._super();},setModel:function setModel(model){this.model=model;},updatingTooltipHelper:function updatingTooltipHelper(elem,ep,useGivenCoords){var aid=elem&&elem.getAttribute("aid"),ttl=elem&&elem.getAttribute("ttl"),borderColor=elem.getAttribute("SC"),ttN={refNode:this.domNode,posType:mstrmojo.tooltip.POS_BOTTOMLEFT,contentNodeCssClass:"gp-tooltip"},zoom=(this.model.getZoomFactor?this.model.getZoomFactor():(this.model.docModel?this.model.docModel.getZoomFactor():1))+"em";if(aid==this.cAreaIdx){return ;}this.cAreaIdx=aid;ttN.content=ttl||this.defaultTooltip;var cssText="font-size:"+zoom+";";if(borderColor){cssText+="border-color:#"+borderColor;}ttN.contentNodeCssText=cssText;var c=elem.getAttribute("coords"),x=99999,y=99999;if(!useGivenCoords){if(c&&c.length>0){c=c.split(",");var i=0;while(i+1<c.length){x=Math.min(x,parseInt(c[i++],10));y=Math.min(y,parseInt(c[i++],10));}}}if(x===99999){x=ep.x;}if(y===99999){y=ep.y;}ttN.top=y;ttN.left=x;this.richTooltip=null;this.set("richTooltip",ttN);},redraw:function redraw(){if(!this.hasRendered){return false;}configureDisplay.call(this);var f=this.getFormats();if(this.as&&f.height&&f.width){this.refreshMap();}return true;},refreshMap:function refreshMap(){if(this.as){generateImageMap.call(this);}},getAreaShapeName:function getAreaShapeName(shapeType){return areaShapeMap[parseInt(shapeType,10)]||"default";}});var tooltipCls=graphBase.tooltipCLS="mstrmojo-mobileGraph-Tooltip-content",canvasCls=graphBase.canvasCLS="mobile-graph-highlight-canvas";graphBase.hideTooltips=function(){$ARR.forEach(document.getElementsByClassName(tooltipCls),function(tooltip){tooltip.style.display="none";});$ARR.forEach(document.getElementsByClassName(canvasCls),function(canvas){canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);canvas.width=canvas.width;});};}());