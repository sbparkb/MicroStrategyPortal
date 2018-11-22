mstrDocViewerImpl.prototype=new mstrStaticDocViewer();mstrDocViewerImpl.prototype.superClass=mstrEditorImpl.prototype;mstrDocViewerImpl.prototype.updateManager=microstrategy.updateManager;mstrDocViewerImpl.prototype.nextId=0;mstrDocViewerImpl.prototype.selectedObjects="";mstrDocViewerImpl.prototype.rArrowDND;mstrDocViewerImpl.prototype.rootNodeKey="";mstrDocViewerImpl.prototype.dirtySections=[];mstrDocViewerImpl.prototype.dScrollTop=0;mstrDocViewerImpl.prototype.dScrollLeft=0;mstrDocViewerImpl.prototype.allVisList=null;mstrDocViewerImpl.prototype.renderedPanelStyles=null;mstrDocViewerImpl.prototype.ruleCounter=0;mstrDocViewerImpl.prototype.timeoutQueue=new Object;mstrDocViewerImpl.prototype.callbackOnReload=null;mstrDocViewerImpl.prototype.onload=function(){try{mstrStaticDocViewer.prototype.onload.call(this);if(microstrategy.EDIT_MODE==microstrategy.ALLOW_EDIT_MODE){this.objProps=new mstrObjectPropsImpl(this);}this.elem.onmousedown=new Function("e","microstrategy.bone('"+this.id+"').onmousedown(e)");if(this.layoutHeightMode==1){this.callDelayedResize();if(this.scrollTopPosition!=0||this.scrollLeftPosition!=0){this.delayedScrollAdjust(this.scrollTopPosition,this.scrollLeftPosition);}}this.onLoadCalled=true;if(this.keepAlive){window.setTimeout("microstrategy.getViewerBone().commands.exec('ping');",this.keepAlive);}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.onreload=function(){mstrStaticDocViewer.prototype.onreload.call(this);if(this.updatedFGKeys){this.partialUpdateFGS();}};mstrDocViewerImpl.prototype.onpostload=function(){try{mstrStaticDocViewer.prototype.onpostload.call(this);if(this.selectedObjects!=""){this.doc.selections.reselect(this.selectedObjects);this.selectedObjects="";}if(this.observer){this.observer.notifyAll("onselectionchange");}if(this.dirtySections.length>0){var um=this.updateManager;var ac=[];var target=false;for(var i=0,len=this.dirtySections.length;i<len;i++){var sb=this.dirtySections[i].bone;var t=this.dirtySections[i].isTarget;target=(target||t);sb.wireTargets(ac,this.beanPath,t);}if(ac.length>0){um.add(ac,true);}this.dirtySections=[];}if(this.callbackOnReload){this.callbackOnReload();this.callbackOnReload=null;}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.partialUpdateFGS=function(){var fgKeys=this.updatedFGKeys;var fgDatas=this.updatedFGData;for(var fgKey in fgDatas){var fgData=fgDatas[fgKey];var sectionKey=fgData.sectionKey;for(var fieldKey in fgData){if(fieldKey=="sectionKey"){continue;}var fieldValue=fgData[fieldKey];var fieldObjs=document.getElementsByName(fieldKey);for(var i=0;fieldObjs&&i<fieldObjs.length;i++){if(!fieldValue||(i+1>fieldValue.length)){fieldObjs[i].parentNode.removeChild(fieldObjs[i]);}else{fieldObjs[i].innerHTML=fieldValue[i].value;fieldObjs[i].className=fieldValue[i].cssClass;}}if(!fieldObjs||(fieldValue&&(fieldObjs.length<fieldValue.length))){var length=fieldObjs?0:fieldObjs.length;for(var i=length;i<fieldValue.length;i++){var span=document.createElement("span");span.id=fieldKey;span.setAttribute("name",fieldKey);span.setAttribute("sty",106);span.setAttribute("ty","obj");span.innerHTML=fieldValue[i].value;span.className=fieldValue[i].cssClass;if(document.getElementById(sectionKey)){document.getElementById(sectionKey).appendChild(span);}}}}}this.updatedFGKeys=undefined;this.updatedFGData=undefined;};mstrDocViewerImpl.prototype.onmousedown=function(e){try{if(!e){e=window.event;}getMouse(e);var target=getEventTarget(e);if(this.isEditableViewModeEplus()&&!mstrGridStatic.isMouseOverScrollBar(this.elem,lMouseX,lMouseY)){if(target==this.elem||target.firstChild==this.doc.elem){this.doc.selections.clear();}}if(microstrategy.DISPLAY_MODE==microstrategy.DESIGN_MODE){var src=microstrategy.eventManager.getSource(e);if(src&&src.elem&&src.elem.getAttribute(microstrategy.HTMLATTR_OBJTYPE)==microstrategy.OBJTYPE_RULER){return this.doc.selections.onmousedown(e);}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrDocViewerImpl.prototype.adjustScrollValues=function(e){try{var i=document.createElement("img");document.body.appendChild(i);i.parentNode.removeChild(i);this.elem.onmousemove=null;this.dScrollTop=this.elem.scrollTop;this.dScrollLeft=this.elem.scrollLeft;return true;}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.onnotifydrag=function(items,bone,types){try{if(this.isEditableViewModeEplus()){this.doc.onnotifydrag(items,bone,types);}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.onnotifydragend=function(bone){try{if(this.isEditableViewModeEplus()){this.doc.onnotifydragend(bone);}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.onpanelchange=function(){try{this.doc.onpanelchange();}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.onPanelDeleted=function(id){try{this.doc.onPanelDeleted(id);}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.ondocumentclick=function(e){try{if(this.doc){this.doc.ondocumentclick(e);}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.onSubSectionResize=function(){try{if(this.docRszHandler&&this.tempHandler){var height=getObjHeight(this.doc.elem)+"px";this.docRszHandler.style.height=height;this.tempHandler.style.height=height;}this.doc.onSubSectionResize();return false;}catch(err){microstrategy.errors.log(err);return false;}};mstrDocViewerImpl.prototype.onwinresize=function(){try{this.callDelayedResize();}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.getAvailableWidgets=function(objSubType){try{var aw=[];for(var i=0,cnt=this.widgets.length;i<cnt;i++){var w=this.widgets[i];if(w.scope==objSubType){aw.push({dssid:w.rslPath||w.fqcn,n:w.title,mxsp:w.maxSecondaryProviders,mnsp:w.minSecondaryProviders,isVis:w.isVis});}}return aw;}catch(err){microstrategy.errors.log(err);return aw;}};mstrDocViewerImpl.prototype.getAvailableObjs=function(type){try{var aa=[],objs=this["document"+type];if(objs){for(var i=0,cnt=objs.length;i<cnt;i++){var a=objs[i];var content={dssid:a.id+"|"+a.ty+"|"+a.n,n:(a.als||a.n)};if(a.dsn){content.dsn=a.dsn;}if(type==="Attributes"&&a.sty){content.sty=a.sty;}if(type==="Attributes"){if(a.olap){content.olap=a.olap;}if(a.de){content.de=a.de;}}aa.push(content);}}return aa;}catch(err){microstrategy.errors.log(err);return aa;}};mstrDocViewerImpl.prototype.getAvailableAttributes=function(){return this.getAvailableObjs("Attributes");};mstrDocViewerImpl.prototype.getAvailableMetrics=function(){return this.getAvailableObjs("Metrics");};mstrDocViewerImpl.prototype.getPureAttributes=function(){try{var aa=[],objs=this["documentAttributes"];if(objs){for(var i=0,cnt=objs.length;i<cnt;i++){var a=objs[i];if(a.ty!=microstrategy.DSSTYPE_CONSOLIDATION&&!(a.ty==microstrategy.DSSTYPE_FILTER&&a.sty==microstrategy.DSSTYPE_CUSTOM_GROUP)){aa.push({dssid:a.id+"|"+a.ty+"|"+a.n,n:(a.als||a.n)});}}}return aa;}catch(err){microstrategy.errors.log(err);return aa;}};mstrDocViewerImpl.prototype.getAttributesWithDateForms=function(){try{var aa=[],atts=this["documentAttributes"],dss=this["datasetInfos"],attsWithDateForms={};if(dss&&atts){for(var ds in dss){mstr.$A.forEach(dss[ds].att,function(attr){if(!attsWithDateForms[attr.did]&&attr.t!=microstrategy.DSSTYPE_CONSOLIDATION&&!(attr.t==microstrategy.DSSTYPE_FILTER&&attr.st==microstrategy.DSSTYPE_CUSTOM_GROUP)&&!attr.de){mstr.$A.forEach(attr.fs,function(fm){if(fm.idf&&(fm.obf||attr.da)&&(fm.bftp==8||fm.bftp==1)){attsWithDateForms[attr.did]=true;return false;}});}});}mstr.$A.forEach(atts,function(a){if(attsWithDateForms[a.id]){aa.push({dssid:a.id+"|"+a.ty+"|"+a.n,n:(a.als||a.n)});}});}return aa;}catch(err){microstrategy.errors.log(err);return aa;}};mstrDocViewerImpl.prototype.getAttributesType=function(){try{var aa=[],objs=this["documentAttributes"];if(objs){for(var i=0,cnt=objs.length;i<cnt;i++){var a=objs[i];aa.push({type:a.ty+"|"+a.sty,n:a.n});}}return aa;}catch(err){microstrategy.errors.log(err);return aa;}};mstrDocViewerImpl.prototype.delay=function(eval){try{var timeoutID=window.setTimeout("microstrategy.bone('"+this.id+"')."+eval,0);if(this.timeoutQueue[eval]){window.clearTimeout(this.timeoutQueue[eval]);}this.timeoutQueue[eval]=timeoutID;}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.onunload=function(){try{mstrBoneImpl.prototype.onunload.call(this);if(this.observer){this.observer.onunload();}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.onredo=function(action){try{switch(action.id){case mstrUpdateManager.PASTE_FORMATTING:this.objProps.onredo(action);break;default:this.doc.onredo(action);break;}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrDocViewerImpl.prototype.onundo=function(action){try{switch(action.id){case mstrUpdateManager.PASTE_FORMATTING:this.objProps.onundo(action);break;default:this.doc.onundo(action);break;}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrDocViewerImpl.prototype.initViewer=function(){try{mstrStaticDocViewer.prototype.initViewer.call(this);if(this.observer){this.observer.onload();}if(this.isEditableViewModeEplus()){this.initRulers();}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.initRulers=function(){try{if(this.doc){for(var sectionId in this.doc.sections){var sectionObj=this.doc.sections[sectionId];for(var subSectionId in sectionObj.subsections){var subSectionObj=sectionObj.subsections[subSectionId];if((subSectionObj.ruler)&&(subSectionObj.ruler!=null)){this.rulers[subSectionObj.id]=subSectionObj.ruler;}if(subSectionObj.elem&&subSectionObj.elem.childNodes){for(var i=0;i<subSectionObj.elem.childNodes.length;i++){var subSectionChild=subSectionObj.elem.childNodes[i];if((subSectionChild.nodeType==1)&&(subSectionChild.getAttribute(microstrategy.HTMLATTR_SUBOBJTYPE)!=null)&&(subSectionChild.getAttribute(microstrategy.HTMLATTR_SUBOBJTYPE)==microstrategy.SUBOBJTYPE_VRULER)){this.rulers[subSectionObj.id+i]=subSectionChild;}}}}}this.rulers[this.id]=microstrategy.objectFind(this.elem,["DIV"],microstrategy.OBJTYPE_RULER);this.rulerShade=microstrategy.subObjectFind(this.rulers[this.id],["DIV"],microstrategy.SUBOBJTYPE_HRULER_SHADE);this.rulerTicker=document.getElementById("rArrow");if(this.rulerTicker){this.rulerTicker.style.left=getObjWidth(this.doc.elem)-parseInt(getObjWidth(this.rulerTicker)/2)+"px";this.rulerTicker.style.top="2.5px";}this.docRszHandler=document.getElementById("docRszHandler");if(this.docRszHandler){var height=getObjHeight(this.doc.elem);var top=getObjTop(this.doc.elem);this.docRszHandler.style.left=this.doc.elem.style.width;this.docRszHandler.style.top=top+"px";this.docRszHandler.style.height=height+"px";var oldColor=microstrategy.styleObj.getValue(this.docRszHandler,"backgroundColor");this.docRszHandler.onmouseover=new Function("this.style.cursor = 'e-resize';");this.docRszHandler.onmouseout=new Function("this.style.cursor = 'auto';");if(!this.tempHandler){this.tempHandler=document.createElement("img");this.tempHandler.src=microstrategy.FOLDER_IMAGES+"1ptrans.gif";this.tempHandler.style.position="absolute";this.tempHandler.style.zIndex=2;this.tempHandler.style.backgroundColor="#ffff00";this.tempHandler.style.left=this.doc.left+"px";this.tempHandler.style.top=this.docRszHandler.style.top;this.tempHandler.style.width="3px";this.tempHandler.style.height=height+"px";}this.dObj=new mstrDragnDropObjImpl("docRszHandler","microstrategy.bone('"+this.id+"').dObj","microstrategy.bone('"+this.id+"').rArrowDragEndEvent()",this.doc,this.tempHandler,this);this.doc.updateHRulerWidth();}if(this.rulerTicker){this.rArrowDND=new mstrDragnDropObjImpl("rArrow","microstrategy.bone('"+this.id+"').rArrowDND","microstrategy.bone('"+this.id+"').rArrowDragEndEvent()",this.doc,this.tempHandler,this);}}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.syncDocRszHandler=function(){try{if(!this.docRszHandler){this.docRszHandler=document.getElementById("docRszHandler");}if(this.docRszHandler){this.docRszHandler.style.left=getObjWidth(this.doc.elem)+"px";this.docRszHandler.style.top=getObjTop(this.doc.elem)+"px";this.docRszHandler.style.height=getObjHeight(this.doc.elem)+"px";}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.rArrowDragEndEvent=function(){try{var format=mstrFormatObject;var oldWidth=parseInt(microstrategy.styleObj.getValue(this.doc.elem,"width"));var barPos=getObjLeft(this.docRszHandler);if(this.rulerTicker){var tickerPos=getObjLeft(this.rulerTicker)+parseInt(getObjWidth(this.rulerTicker)/2);if(tickerPos==oldWidth){this.rulerTicker.style.left=barPos-parseInt(getObjWidth(this.rulerTicker)/2)+"px";}}if(barPos==oldWidth&&this.rulerTicker){this.docRszHandler.style.left=tickerPos+"px";}this.doc.elem.style.width=getObjLeft(this.docRszHandler)+"px";var ac=[];this.doc.saveDocProperty("width",this.doc.elem.style.width,ac);if(this.usePageWidthAsLayoutWidth!=0){this.usePageWidthAsLayoutWidth=0;this.doc.saveDocProperty("UsePageWidthAsLayoutWidth",this.usePageWidthAsLayoutWidth,ac);}if(ac.length){microstrategy.updateManager.add(ac,true);}if(this.tempHandler){this.doc.elem.removeChild(this.tempHandler);}if(getObjWidth(this.doc.elem)<this.doc.minWidth){this.doc.minWidth=getObjWidth(this.doc.elem);}this.docRszHandler.style.backgroundColor="";this.doc.displayPageBreaker();if(this.viewer100wm!=null){this.resize100WMObjects();}this.doc.updateHRulerWidth();}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.removeFrom100HMObjects=function(objId){try{var obj=document.getElementById(objId);if(obj!=null){var subBone=microstrategy.findBone(obj);if(subBone!=null&&subBone.elem!=null){var subId=subBone.elem.getAttribute("id");if(this[subId+"_100hm"]!=null){this[subId+"_100hm"]=this[subId+"_100hm"].replace(objId+",","");}}}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.addTo100HMObjects=function(objId){try{var obj=document.getElementById(objId);if(obj!=null){var subBone=microstrategy.findBone(obj);if(subBone!=null&&subBone.elem!=null){var subId=subBone.elem.getAttribute("id");if(this[subId+"_100hm"]!=null){if(this[subId+"_100hm"].indexOf(objId)<0){this[subId+"_100hm"]=this[subId+"_100hm"].concat(objId+",");}}else{this[subId+"_100hm"]=objId+",";}}}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.removeFrom100WMObjects=function(objId){try{var obj=document.getElementById(objId);if(obj!=null){var subBone=microstrategy.findBone(obj);if(subBone!=null&&subBone.elem!=null){var subId=subBone.elem.getAttribute("id");if(this[subId+"_100wm"]!=null){this[subId+"_100wm"]=this[subId+"_100wm"].replace(objId+",","");}}}if(String(this.viewer100wm).indexOf(objId)>-1){this.viewer100wm=this.viewer100wm.replace(objId+",","");}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.addTo100WMObjects=function(objId){try{var obj=document.getElementById(objId);if(obj!=null){var subBone=microstrategy.findBone(obj);if(subBone!=null&&subBone.elem!=null){var subId=subBone.elem.getAttribute("id");if(this[subId+"_100wm"]!=null){if(this[subId+"_100wm"].indexOf(objId)<0){this[subId+"_100wm"]=this[subId+"_100wm"].concat(objId+",");}}else{this[subId+"_100wm"]=objId+",";}}}if(this.viewer100wm!=null){if(String(this.viewer100wm).indexOf(objId)<0){this.viewer100wm+=objId+",";}}else{this.viewer100wm=objId+",";}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.turnOffRulerShade=function(){try{if(this.rulerShadeOn&&this.rulerOn&&this.rulerShade){this.rulerShade.style.width=0;this.rulerShade.style.left=0;for(var sectionId in this.doc.sections){var sectionObj=this.doc.sections[sectionId];for(var subSectionId in sectionObj.subsections){var subSectionObj=sectionObj.subsections[subSectionId];subSectionObj.turnOffRulerShade();}}this.rulerShadeOn=false;}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.turnOnRulerShade=function(range){try{if(!this.rulerShadeOn&&this.rulerOn&&this.rulerShade){this.rulerShade.style.width=(range.right-range.left+3)+"px";this.rulerShade.style.left=(range.left-this.doc.left)+"px";this.rulerShadeOn=true;}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.dragRulerShade=function(x,y,range){try{if(this.rulerShadeOn&&this.rulerOn&&this.rulerShade){xOffset=x-1-this.doc.left;if(xOffset>0){this.rulerShade.style.left=xOffset+"px";this.rulerShade.style.width=(range.right-range.left)+"px";}var rangeHeight=range.bottom-range.top+3;for(var sectionId in this.doc.sections){var sectionObj=this.doc.sections[sectionId];for(var subSectionId in sectionObj.subsections){var subSectionObj=sectionObj.subsections[subSectionId];var nSecTop=getObjSumTopScrolled(subSectionObj.elem);var nSecBottom=nSecTop+getObjHeight(subSectionObj.elem);var yFinal=y-nSecTop;var snapCoordOffset=((yFinal%2)>0)?1:0;if((y>=nSecTop)&&(y<=nSecBottom)){subSectionObj.turnOnRulerShade(range);subSectionObj.dragRulerShade(yFinal);}else{if((y>=nSecTop)&&((y+rangeHeight)>=nSecBottom)){subSectionObj.turnOnRulerShade(range);subSectionObj.dragRulerShade(yFinal);}else{if(((y+rangeHeight)>=nSecTop)&&(y<=nSecTop)){subSectionObj.turnOnRulerShade(range);subSectionObj.dragRulerShade(yFinal);}else{subSectionObj.turnOffRulerShade();}}}}}}}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.toggleRuler=function(){try{for(var rulerId in this.rulers){var rulerObj=this.rulers[rulerId];if(rulerObj){rulerObj.style.display=(this.rulerOn)?"none":"block";}}var hRulerRow=document.getElementById("hRulerRow");if(hRulerRow!=null){if(bIsW3C){hRulerRow.style.display=(this.rulerOn)?"none":"table-row";}else{hRulerRow.style.display=(this.rulerOn)?"none":"block";}}var vRulerCol=document.getElementById("vRulerCol");if(vRulerCol!=null){vRulerCol.className=vRulerCol.className.replace(/ off/g,"")+(this.rulerOn?" off":"");}this.rulerOn=!this.rulerOn;this.onwinresize();if(this.observer){this.observer.notifyAll("onstatechange");}this.updateManager.add([this.updateManager.createActionObject(null,mstrUpdateManager.SET_RULERS_DISPLAY,this.beanPath,["55002"],[this.rulerOn],[])],true);return this.rulerOn;}catch(err){microstrategy.errors.log(err);return false;}};mstrDocViewerImpl.prototype.toggleGrid=function(){try{if(this.doc){for(var sectionId in this.doc.sections){var sectionObj=this.doc.sections[sectionId];for(var subSectionId in sectionObj.subsections){sectionObj.subsections[subSectionId].toggleGrid(this.gridOn);}}}this.gridOn=!this.gridOn;this.toggleDivider(this.gridOn);if(this.observer){this.observer.notifyAll("onstatechange");}this.updateManager.add([this.updateManager.createActionObject(null,mstrUpdateManager.SET_ALIGNMENT_GRID_DISPLAY,this.beanPath,["55002"],[this.gridOn],[])],true);return this.gridOn;}catch(err){microstrategy.errors.log(err);return false;}};mstrDocViewerImpl.prototype.toggleDivider=function(state){try{if(typeof (state)=="undefined"){state=!this.dividerOn;}this.dividerOn=state;var i=0;if(this.doc&&microstrategy.DISPLAY_MODE==microstrategy.VIEW_MODE){for(var sectionId in this.doc.sections){var sectionObj=this.doc.sections[sectionId];for(var j=0;j<sectionObj.sibs.length;j++){var section=sectionObj.sibs[j];var handles=microstrategy.findChildrenWithAtt(this.elem,"div",microstrategy.HTMLATTR_SUBOBJTYPE,microstrategy.SUBOBJTYPE_SUBSECTION_HANDLE);if(handles){for(i=0;i<handles.length;i++){handles[i].style.display=(this.dividerOn)?"block":"none";}}var titles=microstrategy.findChildrenWithAtt(this.elem,"div",microstrategy.HTMLATTR_SUBOBJTYPE,microstrategy.SUBOBJTYPE_TITLEBAR);if(titles){for(i=0;i<titles.length;i++){titles[i].style.display=(this.dividerOn)?"block":"none";}}}}this.doc.displayPageBreaker();this.doc.resetMask();if(this.commands){this.commands.exec("SyncSelections");}this.updateManager.add([this.updateManager.createActionObject(null,mstrUpdateManager.SET_DIVIDERS_DISPLAY,this.beanPath,["55002"],[this.dividerOn],[])],true);return this.dividerOn;}}catch(err){microstrategy.errors.log(err);}return null;};mstrDocViewerImpl.prototype.getNextObjId=function(){return this.nextId++;};mstrDocViewerImpl.prototype.getChildBone=function(obj){try{if(this.doc==null||!this.doc.isLoaded){return null;}var type=obj.getAttribute(microstrategy.HTMLATTR_OBJTYPE);switch(type){case microstrategy.OBJTYPE_DOC:return this.doc;break;case microstrategy.OBJTYPE_DOC_SUBSECTION:case microstrategy.OBJTYPE_DOC_SECTION:case microstrategy.OBJTYPE_DOC_HORIZONTAL_CONTAINER:return this.doc.getChildBone(obj);break;}return null;}catch(err){microstrategy.errors.log(err);return false;}};mstrDocViewerImpl.prototype.handleTaskModelReadyStateChange=function(evt){try{this.doc.handleTaskModelReadyStateChange(evt);}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.findParentSubsection=function(obj){try{var res=microstrategy.findAncestorWithAtt(obj.parentNode,"ty",microstrategy.OBJTYPE_DOC_SUBSECTION);if(res&&res.getAttribute("sty")){res=this.findParentSubsection(res);}return res;}catch(err){microstrategy.errors.log(err);return false;}};mstrDocViewerImpl.prototype.isInteractiveViewModeEplus=function(e){if(!e){if(this.isFeatureAvailable(microstrategy.FEATURE_RW_INTERACTIVE_VIEW_MODE_EPLUS)){return true;}else{return false;}}var target=getEventTarget(e);if(!target){return true;}var src=microstrategy.eventManager.getSource(e);var isCorrectViewMode=false;var isTemplate=false;isTemplate=(src.bone!=null&&(src.bone.type==microstrategy.OBJTYPE_GRID||(src.bone.commands&&src.bone.commands.queryState("gridType")=="flash")));var isRMCLinksAvailable=(src.bone!=null&&(src.subType==microstrategy.SUBOBJTYPE_DOC_TEXT||src.subType==microstrategy.SUBOBJTYPE_DOC_IMAGE));if(this.isEditableViewModeEplus()){isCorrectViewMode=true;}else{if(this.isFeatureAvailable(microstrategy.FEATURE_RW_INTERACTIVE_VIEW_MODE_EPLUS)&&(isTemplate||isRMCLinksAvailable)){isCorrectViewMode=true;}}return isCorrectViewMode;};mstrDocViewerImpl.prototype.isEditableViewModeEplus=function(){return this.isFeatureAvailable(microstrategy.FEATURE_RW_EDITABLE_VIEW_MODE_EPLUS);};mstrDocViewerImpl.prototype.hasStylesFor=function(key){try{return this.renderedPanelStyles==null||this.renderedPanelStyles[key];}catch(err){microstrategy.errors.log(err);}};mstrDocViewerImpl.prototype.hasMultiDatasets=function(){try{if(!this.noDataset){var size=0;for(var id in this.documentDataSets){size++;if(size>1){return true;}}}return false;}catch(err){microstrategy.errors.log(err);}};function mstrDocViewerImpl(id){this.inherits=mstrStaticDocViewer;this.inherits(id);this.inherits=null;this.primaryBone=true;return this;}