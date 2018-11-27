(function(){function shouldRenderSec(x,y,left,right,top,bottom,orH){if(y>bottom){return false;}return(!orH)||(x===0)||((x<right)&&(y>=top-(bottom-top)));}function shouldRenderSub(ss,x,y,left,right,top,bottom,orH){if(y>bottom){return false;}return(!orH)||((x<right)&&(y>=top-ss.getHeight()));}function fireRender(w,parent,bBuildCh){w.renderMode="scroll";w.render();w.numChildrenRendered=0;parent.numChildrenRendered++;if(bBuildCh&&!w.builtChildren){w.buildChildren();}}function getScrollBuffer(){return this.useScrollBuffer?this.scrollBuffer:0;}mstrmojo._CanRenderDocOnScroll=mstrmojo.provide("mstrmojo._CanRenderDocOnScroll",{_mixinName:"mstrmojo._CanRenderDocOnScroll",renderMode:"scroll",scrollBuffer:0,preBuildRendering:function preBuildRendering(){if(!!mstrApp.features["ignore-incremental-rendering"]){this.renderMode=null;}if(this._super){this._super();}},postBuildRendering:function postBuildRendering(){if(this.renderMode===null){return this._super();}this.renderChildren();return true;},childRenderOnAddCheck:function(children){if(this.renderMode===null){return this._super(children);}return false;},renderChildren:function renderChildren(){var own;if(this.renderMode==="scroll"){var anc=this;while(anc){if(anc.scrollboxNode&&(anc.scrollboxWidthFixed||anc.scrollboxHeightFixed)&&anc.connectScrollbox){own=anc;break;}anc=anc.parent;}}if((this.renderMode!=="scroll")||!own){this._super();return ;}if(this.containerNode){this.scrollboxOwner=own;own.connectScrollbox(this);this.numChildrenRendered=0;var len=this.numChildren;if(len===undefined){this.numChildren=len=this._getModelChildNodes(this.node,false,0,0,true).total;}this.sectionsToRender=len;this.subsectionsToRender=0;if(len){this._startSubsectionThread(false);}}if(this.resizeOrReposition){this.resizeOrReposition();}},onscroll:function onscroll(){if(!this.renderingSubsections){this.useScrollBuffer=true;this._startSubsectionThread(true);}},_startSubsectionThread:function _stSbsThd(bPauseBeforeCtls){var me=this;var fnClearIntv=function(n,bIsTimeout){if(me[n]){if(bIsTimeout){self.clearTimeout(me[n]);}else{self.clearInterval(me[n]);}delete me[n];}};var fnCleanUp=function(bPause){me.renderingSubsections=false;var fn=function(){fnClearIntv("renderCtlsTimer");me.showRenderStatus(false);me.renderCtrlsInViewport();me.raiseEvent({name:"afterScroll"});me=null;};if(bPause){me.renderCtlsTimer=self.setTimeout(fn,me.scrollboxOwner.scrollInterval+1);}else{fn();}};fnClearIntv("renderSubsTimer");fnClearIntv("renderCtlsTimer",true);this.renderingSubsections=true;if((this.sectionsToRender||this.subsectionsToRender)&&!this._renderSubsectionsToScroll()){this.showRenderStatus(true);this.renderSubsTimer=self.setInterval(function(){if(me._renderSubsectionsToScroll()){fnClearIntv("renderSubsTimer");fnCleanUp(bPauseBeforeCtls);}else{me.showRenderStatus(true);}},this.scrollboxOwner.scrollInterval);}else{fnCleanUp(bPauseBeforeCtls);}},showRenderStatus:function shwRndrSts(show,msg){var p=this.parent;if(!p||!p.showStatus){return ;}var txt=msg,per;if(show){var num=this.numChildrenRendered,tot=this.numChildren;per=tot&&parseInt(100*num/tot,10);txt="*Rendering section "+num+" of "+tot+".*";}p.showStatus(show,txt,per);},_renderSubsectionsToScroll:function rndSubs2Scll(){var own=this.scrollboxOwner,top=own.scrollboxTop,left=own.scrollboxLeft,bottom=own.scrollboxBottom+getScrollBuffer.call(this),right=own.scrollboxRight,height=bottom-top,x=0,y=0,yStart=null,yStop=null,forcedH,sidx;bottom+=1;function fnUpdateStart(){yStart=y;yStop=yStart+height;}var secsCount=this.numChildren,secs=this.children||[],model=this.model,node=this.node,orH=false;for(sidx=0;sidx<secsCount;sidx++){var sec=secs[sidx];if(!sec){sec=this.addChildren(this.builder.build(this._getModelChildNodes(node,false,sidx,1,true).nodes,model))[0];secs=this.children||[];}var orWas=orH;orH=!!sec.defn.horiz;forcedH=(sidx>0&&sec.node.data.bh);if((!orH&&orWas)||(forcedH&&orWas)){x=0;y+=secs[sidx-1].getHeight();if(y>bottom){return true;}if((yStop!==null)&&(y>yStop)){return false;}}if(!sec.hasRendered){if(!shouldRenderSec(x,y,left,right,top,bottom,orH)){if(orH){continue;}else{return true;}}this._renderSection(sec,sidx);this.sectionsToRender--;this.subsectionsToRender+=(sec.children&&sec.children.length)||0;if(yStart===null){fnUpdateStart();}}var ssch=sec.children||[],ss=null,ssidx,sslen;for(ssidx=0,sslen=ssch.length;ssidx<sslen;ssidx++){ss=ssch[ssidx];if(!ss.hasRendered){if(!shouldRenderSub(ss,x,y,left,right,top,bottom,orH)){if(orH){break;}else{return true;}}fireRender(ss,sec);this.subsectionsToRender--;if(yStart===null){fnUpdateStart();}}if(orH){x+=ss.getWidth();if(x>right){break;}}else{y+=ss.getHeight();if(y>bottom){return true;}if((yStop!==null)&&(y>yStop)){return false;}}}}return true;},_renderSection:function _renderSection(sec,sidx){fireRender(sec,this,true);},_getModelChildNodes:function(node,isPartial,start,count,includeTotal){return this.model.getChildren(node,isPartial,start,count,includeTotal);},renderCtrlsInViewport:function rnCtlsInVw(){var own=this.scrollboxOwner,top=own.scrollboxTop,left=own.scrollboxLeft,bottom=own.scrollboxBottom+getScrollBuffer.call(this),right=own.scrollboxRight,x=0,y=0,orH=false,secs=this.children||[],orWas,forcedH,sidx,secCount;var fnIncSize=function(ss){if(orH){x+=ss.getWidth();}else{y+=ss.getHeight();}};var fnCtlInt=function(s,cx,cs,vs,ve){var cxNum=parseInt(cx,10)||0,csNum=parseInt(cs,10);return(isNaN(csNum))?(s+cxNum<=ve):mstrmojo.boxmodel.rangeIntersect(s+cxNum,s+cxNum+csNum,vs,ve);};for(sidx=0,secCount=(secs&&secs.length)||0;sidx<secCount;sidx++){var sec=secs[sidx];orWas=orH;orH=!!sec.defn.horiz;forcedH=(sidx>0&&sec.node.data.bh);if((!orH&&orWas)||(forcedH&&orWas)){x=0;y+=secs[sidx-1].getHeight();if(y>bottom){return ;}}if(!sec.hasRendered){if(!orH){return ;}continue;}var subs=sec.children,ssCount=(subs&&subs.length)||0,ssidx,ss;for(ssidx=0;ssidx<ssCount;ssidx++){ss=subs[ssidx];if(!ss.hasRendered){break;}if(ss.builtChildren&&(ss.numChildrenRendered===((ss.children&&ss.children.length)||0))){fnIncSize(ss);}else{if((y+ss.getHeight()>=top)&&(!orH||(x+ss.getWidth()>=left))){var chdn=ss.children,chLen=(chdn&&chdn.length)||0;if(!chLen&&!ss.builtChildren){ss.buildChildren();chdn=ss.children;chLen=(chdn&&chdn.length)||0;}var rc=[],i;for(i=0;i<chLen;i++){var c=chdn[i];if(c.hasRendered){continue;}var cf=c.getFormats()||{};if(fnCtlInt(y,cf.top,cf.height,top,bottom)&&fnCtlInt(x,cf.left,cf.width,left,right)){c.render();rc.push(c);}}ss.performCanGrowCanShrink(rc,true);}fnIncSize(ss);}if((orH&&x>right)||(!orH&&y>bottom)){break;}}}},unrender:function unrdr(ignoreDom){var own=this.scrollboxOwner;if(own){own.disconnectScrollbox(this);}this._super(ignoreDom);}});}());