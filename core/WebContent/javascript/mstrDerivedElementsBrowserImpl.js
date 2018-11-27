mstrDerivedElementsBrowserImplScript=true;mstrDerivedElementsBrowserImpl.prototype=new mstrBoneImpl();mstrDerivedElementsBrowserImpl.prototype.commands=null;mstrDerivedElementsBrowserImpl.prototype.selections=null;mstrDerivedElementsBrowserImpl.prototype.elemLists=null;mstrDerivedElementsBrowserImpl.prototype.textEditor=null;mstrDerivedElementsBrowserImpl.prototype.currentElmtId=null;mstrDerivedElementsBrowserImpl.prototype.isEditable=true;mstrDerivedElementsBrowserImpl.DE_TYPE_LIST=1;mstrDerivedElementsBrowserImpl.DE_TYPE_CALCULATION=2;mstrDerivedElementsBrowserImpl.DE_TYPE_FILTER=3;mstrDerivedElementsBrowserImpl.DE_TYPE_OTHERS=4;mstrDerivedElementsBrowserImpl.DE_TYPE_CSS=new Array("","deList","deCal","deFilter","deOther","deSct");mstrDerivedElementsBrowserImpl.ATTR_DE_ID="deId";mstrDerivedElementsBrowserImpl.VISIBLE_CHECKBOX="deVisible";mstrDerivedElementsBrowserImpl.PARENT_CHECKBOX="prt";mstrDerivedElementsBrowserImpl.CHILDREN_CHECKBOX="children";mstrDerivedElementsBrowserImpl.prototype.onload=function(e){try{mstrBoneImpl.prototype.onload.call(this,e);this.commands=new mstrDeBrowserCommandsImpl(this);this.selections=new mstrDeBrowserSelectionsImpl(this);this.elemLists=new Array();}catch(err){microstrategy.errors.log(err);return false;}};mstrDerivedElementsBrowserImpl.prototype.onpostload=function(e){try{mstrBoneImpl.prototype.onpostload.call(this,e);this.initBrowser();}catch(err){microstrategy.errors.log(err);return false;}};mstrDerivedElementsBrowserImpl.prototype.initBrowser=function(){try{var browserTable=document.getElementById("deListTable");if(browserTable){var allRows=browserTable.rows;for(var i=1;i<allRows.length;i++){allRows[i].onclick=new Function("e","return microstrategy.bone('"+this.id+"').onRowClick(e, this);");var oElem=this.getObj(allRows[i]);if(oElem&&oElem.getAttribute("id")!=null){this.setRowDeId(allRows[i],oElem.getAttribute("id"));this.setElmtIcon(oElem);this.elemLists.push(oElem);}}this.initShowParentsChildren(browserTable);}var outerEditor=microstrategy.findAncestorWithAtt(this.elem,microstrategy.HTMLATTR_OBJTYPE,"dialog");if(outerEditor){this.parentBone=microstrategy.findBone(outerEditor);this.parentBone.deBrowserBone=this;this.initSelections(this.parentBone);}this.initNameEditArea();if(this.selections){var oRow=this.selections.firstItem();if(oRow){oRow.scrollIntoView(false);var oNewElmt=this.getObj(oRow);if(oNewElmt&&this.shallEditName){this.editObj(oRow);this.shallEditName=false;}}}}catch(err){microstrategy.errors.log(err);return false;}};mstrDerivedElementsBrowserImpl.prototype.initNameEditArea=function(){try{if(this.textEditor==null){var txtDiv=document.createElement("DIV");txtDiv.setAttribute("id","deNameEdit");var txt=document.createElement("input");txt.setAttribute("id","deNameInput");txt.className="mstrActionInput";txt.setAttribute("type","text");txtDiv.appendChild(txt);this.textEditor=this.elem.appendChild(txtDiv);var inputField=this.textEditor.getElementsByTagName("input")[0];with(this.textEditor.style){zIndex=5;display="none";padding="0px";left="0px";top="0px";}var actionApply=document.createElement("span");var actionCancel=document.createElement("span");txtDiv.appendChild(actionApply);actionApply.className="mstrIcon-tb";actionApply.id="tbActionApply";txtDiv.appendChild(actionCancel);actionCancel.className="mstrIcon-tb";actionCancel.id="tbActionCancel";inputField.tabindex=1;inputField.onkeydown=new Function("e","return microstrategy.bone('"+this.id+"').onKeyDown(e);");actionApply.onclick=new Function("e","return microstrategy.bone('"+this.id+"').saveText();");actionCancel.onclick=new Function("e","return microstrategy.bone('"+this.id+"').cancelText();");}}catch(err){microstrategy.errors.log(err);return false;}};mstrDerivedElementsBrowserImpl.prototype.initShowParentsChildren=function(browserTable){try{if(browserTable){var allcheckboxes=browserTable.getElementsByTagName("input");for(var i=0;i<allcheckboxes.length;i++){var curItem=allcheckboxes[i];var type=curItem.getAttribute("type");if(type.toLowerCase()=="radio"){curItem.onclick=new Function("e","return microstrategy.bone('"+this.id+"').onChangeShowParentChildren(e, this);");}else{if(type.toLowerCase()=="checkbox"){curItem.onclick=new Function("e","return microstrategy.bone('"+this.id+"').onChangeVisibility(true, this);");}}if(curItem.getAttribute("name")==mstrDerivedElementsBrowserImpl.VISIBLE_CHECKBOX){this.onChangeVisibility(false,curItem);}}}}catch(err){microstrategy.errors.log(err);return false;}};mstrDerivedElementsBrowserImpl.prototype.checkVisible=function(){try{var browserTable=document.getElementById("deListTable");if(browserTable){var allcheckboxes=browserTable.getElementsByTagName("input");if(allcheckboxes.length==0){return true;}for(var i=0;i<allcheckboxes.length;i++){var curItem=allcheckboxes[i];if(curItem.getAttribute("name")==mstrDerivedElementsBrowserImpl.VISIBLE_CHECKBOX&&curItem.checked){return true;}}}}catch(err){microstrategy.errors.log(err);return false;}return false;};mstrDerivedElementsBrowserImpl.prototype.onChangeVisibility=function(update,item){try{if(!item){return false;}var oname=item.getAttribute("name");var evtName=null;var id=null;if(oname=mstrDerivedElementsBrowserImpl.VISIBLE_CHECKBOX){evtName=mstrUpdateManager.DE_TOGGLE_VISIBLE;}var parentRow=this.getParentRow(item);if(parentRow!=null){id=this.getRowDeId(parentRow);}if(evtName!=null){var oCheckboxes=parentRow.getElementsByTagName("input");for(var i=0;i<oCheckboxes.length;i++){var cur=oCheckboxes[i];if(cur.getAttribute("type")=="radio"){var curName=cur.getAttribute("group");if(curName==mstrDerivedElementsBrowserImpl.PARENT_CHECKBOX||curName==mstrDerivedElementsBrowserImpl.CHILDREN_CHECKBOX){cur.disabled=!item.checked;}}}}if(update&&evtName&&id&&microstrategy&&microstrategy.updateManager){var um=microstrategy.updateManager;var actionCollection=new Array();actionCollection.push(um.createActionObject(null,evtName,this.parentBone.beanPath,["109001"],[id],[]));um.add(actionCollection);}}catch(err){microstrategy.errors.log(err);return false;}};mstrDerivedElementsBrowserImpl.prototype.getParentRow=function(item){for(var res=item.parentNode;res!=null;res=res.parentNode){if(res.tagName.toLowerCase()=="tr"){return res;}}return null;};mstrDerivedElementsBrowserImpl.prototype.onChangeShowParentChildren=function(e,item){try{if(!item){return false;}var oname=item.getAttribute("group");var evtName=null;var evtName2=null;var id=null;if(oname==mstrDerivedElementsBrowserImpl.PARENT_CHECKBOX){evtName=mstrUpdateManager.DE_TOGGLE_SHOW_PARENT;evtName2=mstrUpdateManager.DE_TOGGLE_SHOW_CHILDREN;}else{if(oname==mstrDerivedElementsBrowserImpl.CHILDREN_CHECKBOX){evtName=mstrUpdateManager.DE_TOGGLE_SHOW_CHILDREN;evtName2=mstrUpdateManager.DE_TOGGLE_SHOW_PARENT;}}var parentRow=item.parentNode.parentNode;if(parentRow!=null&&parentRow.tagName.toLowerCase()=="tr"){id=this.getRowDeId(parentRow);}if(evtName&&id&&microstrategy&&microstrategy.updateManager){var um=microstrategy.updateManager;var actionCollection=new Array();actionCollection.push(um.createActionObject(null,evtName,this.parentBone.beanPath,["109001"],[id],[]));actionCollection.push(um.createActionObject(null,evtName2,this.parentBone.beanPath,["109001"],[id],[]));um.add(actionCollection);}}catch(err){microstrategy.errors.log(err);return false;}};mstrDerivedElementsBrowserImpl.prototype.onselectionchange=function(e){try{return this.parentBone.onselectionchange(e);}catch(err){microstrategy.errors.log(err);return false;}};mstrDerivedElementsBrowserImpl.prototype.onKeyDown=function(e){try{if(!e){e=window.event;}switch(e.keyCode){case 27:this.cancelText();return false;case 13:this.saveText();stopEventBubbling(e);return false;}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrDerivedElementsBrowserImpl.prototype.initSelections=function(deEditorBone){try{if(deEditorBone&&this.currentElmtId&&this.selections){var currentRow=microstrategy.findChildWithAtt(this.elem,"tr",mstrDerivedElementsBrowserImpl.ATTR_DE_ID,this.currentElmtId);if(currentRow){this.selections.clear();this.selections.add(currentRow);}}else{this.onselectionchange();}return false;}catch(err){microstrategy.errors.log(err);return false;}};mstrDerivedElementsBrowserImpl.prototype.editObj=function(currentRow){try{if(!currentRow){currentRow=(this.selections)?this.selections.firstItem():null;}if(!currentRow){return false;}var value="";var textObj=this.getObj(currentRow);if(!textObj.innerHTML||textObj.innerHTML.length<=0){this.addDefaultName(textObj);}value=textObj.innerHTML;value=value.replace(/\\n/g,"\r\n");value=decode(value,true);var inputField=this.textEditor.getElementsByTagName("input")[0];inputField.value=value;inputField.source=textObj;var src=textObj;var w=0,h=0;if(bIsIE4){w=getObjWidth(src);h=getObjHeight(src);}else{w=getObjInnerWidth(src);h=getObjInnerHeight(src);}textObj.parentNode.appendChild(this.textEditor);textObj.style.display="none";var cell=src.parentNode;var browserDiv=document.getElementById("derivedElmtBrowser");with(this.textEditor.style){left=getObjSumLeft(src)-getObjSumLeft(this.parentBone.elem)+"px";display="block";}microstrategy.setCursorToEnd(inputField);return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrDerivedElementsBrowserImpl.prototype.saveText=function(){try{if(this.textEditor.style.display=="none"){return true;}var inputField=this.textEditor.getElementsByTagName("input")[0];if(!inputField.value){showMessage({contents:microstrategy.descriptors.getDescriptor("5426"),elements:microstrategy.OK_BUTTON,okEval:"microstrategy.bone('"+this.id+"').editObj()",type:mstrMsgBoxImpl.MSG_ERROR});return false;}if(inputField.value.search(/\[|\]|\"|\\/)!=-1){showMessage({contents:microstrategy.descriptors.getDescriptor("5160"),elements:microstrategy.OK_BUTTON,okEval:"microstrategy.bone('"+this.id+"').editObj()",type:mstrMsgBoxImpl.MSG_ERROR});return false;}inputField.source.innerHTML=inputField.value;if(microstrategy&&microstrategy.updateManager){var um=microstrategy.updateManager;var actionCollection=new Array();var id=inputField.source.getAttribute("id");actionCollection.push(um.createActionObject(null,mstrUpdateManager.DE_SET_NAME,this.parentBone.beanPath,["109001","109002"],[id,inputField.value],[]));um.add(actionCollection);}this.cancelText();return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrDerivedElementsBrowserImpl.prototype.cancelText=function(){try{this.textEditor.blur();var inputField=this.textEditor.getElementsByTagName("input")[0];inputField.source.style.display="inline";this.textEditor.style.display="none";}catch(err){microstrategy.errors.log(err);return false;}};mstrDerivedElementsBrowserImpl.prototype.addDefaultName=function(deElmt){try{var txt="";var type=this.getType(deElmt);if(type==null||typeof (type)=="undefined"){return ;}type=parseInt(type);switch(type){case mstrDerivedElementsBrowserImpl.DE_TYPE_LIST:txt=microstrategy.descriptors.getDescriptor("6177");break;case mstrDerivedElementsBrowserImpl.DE_TYPE_CALCULATION:txt=microstrategy.descriptors.getDescriptor("5422");break;case mstrDerivedElementsBrowserImpl.DE_TYPE_FILTER:txt=microstrategy.descriptors.getDescriptor("5425");break;}deElmt.innerHTML=txt;}catch(err){microstrategy.errors.log(err);return null;}};mstrDerivedElementsBrowserImpl.prototype.onRowClick=function(e,currentRow){try{if(!e){e=window.event;}if(bIsFirefox&&e.target.id=="deNameInput"&&(e.target.selectionEnd>e.target.selectionStart)){return false;}if(currentRow&&currentRow.tagName.toLowerCase()=="tr"){var origTarget=e.originalTarget||e.srcElement,target=getEventTarget(e);if(target.tagName.toLowerCase()=="input"||origTarget.tagName.toLowerCase()=="input"){return ;}var objId=this.getRowDeId(currentRow);currentRow.id=objId;if(this.selections){if(this.selections.isSelected(currentRow)){if(e.ctrlKey){this.selections.remove(currentRow);}}else{if(!this.saveText()){return false;}this.selections.clear(e);this.selections.add(currentRow);}}}else{if(this.selections){this.selections.clear();}}if(objId!=this.currentElmtId){this.currentElmtId=objId;this.onsubmit(e,currentRow);}}catch(err){microstrategy.errors.log(err);return false;}};mstrDerivedElementsBrowserImpl.prototype.onsubmit=function(e,currentRow){if(!e){e=window.event;}var form=findTargetTag(currentRow,"form");var in1=createHiddenInput(form,"109001","true");var in2=createHiddenInput(form,"deId",this.getRowDeId(currentRow));this.parentBone.setRefreshDEComponent("Editor",form,true);this.parentBone.setRefreshDEComponent("Browser",form,false);submitForm(form,true);form.removeChild(in1);form.removeChild(in2);};mstrDerivedElementsBrowserImpl.prototype.getType=function(deElmt){if(deElmt){return(deElmt.getAttribute("sty"));}return null;};mstrDerivedElementsBrowserImpl.prototype.getUsage=function(deElmt){if(deElmt){return(deElmt.getAttribute("usg"));}return null;};mstrDerivedElementsBrowserImpl.prototype.getObj=function(deElmtRow){if(deElmtRow){return(deElmtRow.cells[1].firstChild);}return null;};mstrDerivedElementsBrowserImpl.prototype.setRowDeId=function(deElmtRow,id){if(deElmtRow&&id!=null){deElmtRow.setAttribute(mstrDerivedElementsBrowserImpl.ATTR_DE_ID,id);}return true;};mstrDerivedElementsBrowserImpl.prototype.getRowDeId=function(deElmtRow){if(deElmtRow){return deElmtRow.getAttribute(mstrDerivedElementsBrowserImpl.ATTR_DE_ID);}return null;};mstrDerivedElementsBrowserImpl.prototype.setElmtIcon=function(elmt){if(elmt){var elmtType=this.getType(elmt);if(elmtType!=null){elmt.className=mstrDerivedElementsBrowserImpl.DE_TYPE_CSS[elmtType];}}return true;};mstrDerivedElementsBrowserImpl.prototype.deleteall=function(){if(microstrategy&&microstrategy.updateManager){var um=microstrategy.updateManager;var actionCollection=new Array();actionCollection.push(um.createActionObject(null,mstrUpdateManager.DE_REMOVE_ALL,this.parentBone.beanPath,[],[],[]));um.add(actionCollection);this.parentBone.setRefreshDEComponent("Editor",null,true,um);this.parentBone.setRefreshDEComponent("Browser",null,true,um);um.flushAndSubmitChanges(true);}this.parentBone.isEditable=true;return true;};function mstrDerivedElementsBrowserImpl(id){this.inherits=mstrBoneImpl;this.inherits(id);delete this.inherits;return this;}mstrDeBrowserSelectionsImpl.prototype=new mstrSelectionsImpl();mstrDeBrowserSelectionsImpl.prototype.add=function(obj){this.items[this.getSelectionIndex(obj)]=obj;this.length++;if(this.parentBone&&this.parentBone.onselectionchange){this.parentBone.onselectionchange();}this.hilite(obj);};mstrDeBrowserSelectionsImpl.prototype.remove=function(obj){delete this.items[this.getSelectionIndex(obj)];this.length--;if(this.parentBone.onselectionchange){this.parentBone.onselectionchange();}this.removeHilite(obj);obj.ondblclick=null;};mstrDeBrowserSelectionsImpl.prototype.hilite=function(obj){if(obj.tagName.toLowerCase()=="tr"){obj.className="deBrowserSelected";}var oItem=this.parentBone.getObj(obj);if(oItem&&this.parentBone.isEditable){obj.ondblclick=new Function("e","microstrategy.bone('"+this.parentBone.id+"').editObj(this);");}};mstrDeBrowserSelectionsImpl.prototype.removeHilite=function(obj){if(obj.tagName.toLowerCase()=="tr"){obj.className="";}};mstrDeBrowserSelectionsImpl.prototype.clear=function(e){for(var i in this.items){this.removeHilite(this.items[i]);}mstrSelectionsImpl.prototype.clear.call(this,null,e);};mstrDeBrowserSelectionsImpl.prototype.moveup=function(){if(this.length!=1){return ;}var src=this.firstItem();var prevSib=src.previousSibling;if(prevSib!=null){var id=this.getSelectionIndex(src);var temp=src.cloneNode(true);temp.onclick=src.onclick;prevSib.parentNode.removeChild(src);var oNode=prevSib.parentNode.insertBefore(temp,prevSib);this.clear();this.add(oNode);if(microstrategy&&microstrategy.updateManager){var um=microstrategy.updateManager;var actionCollection=new Array();actionCollection.push(um.createActionObject(null,mstrUpdateManager.DEBR_EVENT_MOVE_UP,this.parentBone.beanPath,["110001"],[id],[]));um.add(actionCollection);}}return ;};mstrDeBrowserSelectionsImpl.prototype.movedown=function(){if(this.length!=1){return ;}var src=this.firstItem();var nextSib=src.nextSibling;if(nextSib!=null){var id=this.getSelectionIndex(src);var temp=src.cloneNode(true);temp.onclick=src.onclick;nextSib.parentNode.removeChild(src);var oNode=null;if(nextSib.nextSibling!=null){oNode=nextSib.parentNode.insertBefore(temp,nextSib.nextSibling);}else{oNode=nextSib.parentNode.appendChild(temp);}this.clear();this.add(oNode);if(microstrategy&&microstrategy.updateManager){var um=microstrategy.updateManager;var actionCollection=new Array();actionCollection.push(um.createActionObject(null,mstrUpdateManager.DEBR_EVENT_MOVE_DOWN,this.parentBone.beanPath,["110001"],[id],[]));um.add(actionCollection);}}return ;};mstrDeBrowserSelectionsImpl.prototype.deleteElem=function(){if(this.length!=1){return ;}var src=this.firstItem();if(src.parentNode!=null){var id=this.getSelectionIndex(src);src.parentNode.removeChild(src);this.parentBone.elemLists.pop(src);this.clear();if(microstrategy&&microstrategy.updateManager){var um=microstrategy.updateManager;var actionCollection=new Array();actionCollection.push(um.createActionObject(null,mstrUpdateManager.DE_REMOVE,this.parentBone.beanPath,["109001"],[id],[]));um.add(actionCollection);this.parentBone.parentBone.setRefreshDEComponent("Editor",null,true,um);this.parentBone.parentBone.setRefreshDEComponent("Browser",null,true,um);um.flushAndSubmitChanges(true);}}return ;};mstrDeBrowserSelectionsImpl.prototype.getSelectionIndex=function(item){return this.parentBone.getRowDeId(item);};function mstrDeBrowserSelectionsImpl(parent){this.parentBone=parent;return this;}mstrDeBrowserCommandsImpl.prototype=new Object();mstrDeBrowserCommandsImpl.prototype.exec=function(cmdId,cmdVal){switch(cmdId){case"moveup":if(this.parentBone.selections){return this.parentBone.selections.moveup();}break;case"movedown":if(this.parentBone.selections){return this.parentBone.selections.movedown();}break;case"delete":if(this.parentBone.selections){return this.parentBone.selections.deleteElem();}break;case"rename":if(this.parentBone.selections){return this.parentBone.editObj(this.parentBone.selections.firstItem());}break;case"deleteall":return this.parentBone.deleteall();}return true;};mstrDeBrowserCommandsImpl.prototype.queryEnabled=function(cmdId){var enabled=true;var selections=this.parentBone.selections;var hasOneElmtSelected=(selections&&selections.length==1);var item=selections.firstItem();var oItem=this.parentBone.getObj(item);switch(cmdId){case"moveup":enabled=(hasOneElmtSelected&&(item!=null&&item.previousSibling!=null));break;case"movedown":enabled=(hasOneElmtSelected&&(item!=null&&item.nextSibling!=null));break;case"delete":enabled=(hasOneElmtSelected&&this.parentBone.getType(oItem)!=mstrDerivedElementsBrowserImpl.DE_TYPE_OTHERS&&this.parentBone.getUsage(oItem)!=1&&this.parentBone.isEditable);break;case"deleteall":enabled=(this.parentBone.elemLists&&this.parentBone.elemLists.length>0);break;case"rename":case"format":enabled=(hasOneElmtSelected&&oItem&&this.parentBone.isEditable);break;case"save":enabled=(hasOneElmtSelected&&oItem&&this.parentBone.isEditable&&mstr.behaviors.featureResolver.featAvailable("save_derived_elements"));break;case"add":if(hasOneElmtSelected){enabled=this.parentBone.isEditable;}break;default:break;}return enabled;};mstrDeBrowserCommandsImpl.prototype.queryState=function(cmdId){};function mstrDeBrowserCommandsImpl(parent){this.parentBone=parent;return this;}