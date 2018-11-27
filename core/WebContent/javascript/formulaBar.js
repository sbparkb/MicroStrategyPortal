mstrFormulaBarImplScript=true;mstrFormulaBarImpl.prototype=new mstrEditorImpl();mstrFormulaBarImpl.prototype.mask=null;mstrFormulaBarImpl.prototype.dragSource=null;mstrFormulaBarImpl.prototype.maskFor=null;mstrFormulaBarImpl.prototype.maskArea=null;mstrFormulaBarImpl.prototype.type=microstrategy.OBJTYPE_FORMULA_BAR;mstrFormulaBarImpl.prototype.GRID_MODE=0;mstrFormulaBarImpl.prototype.DATASET_MODE=1;mstrFormulaBarImpl.prototype.onload=function(){try{this.initEditor();this.dragSource=null;this.elem.onkeypress=new Function("e","return microstrategy.bone('"+this.id+"').onkeypress(e);");var submitButton=microstrategy.findChildWithAtt(this.elem,"input","name","17004");if(submitButton){submitButton.onclick=new Function("e","if( microstrategy.bone('"+this.id+"').onsubmit(e) != false ){ return UpdateHelper.submitFormThroughXHR(e, true); } else { return false; }");}submitButton=microstrategy.findChildWithAtt(this.elem,"input","name","17003");if(submitButton){submitButton.onclick=new Function("e","if( microstrategy.bone('"+this.id+"').onsubmit(e) != false ){ return UpdateHelper.submitFormThroughXHR(e, true); } else { return false; }");}var nameField=microstrategy.findChildWithAtt(this.elem,"input","name","fbName");if(nameField){nameField.onchange=new Function("e","return microstrategy.bone('"+this.id+"').onchange(e);");}}catch(err){microstrategy.errors.log(err);return false;}};mstrFormulaBarImpl.prototype.onPassThroughCahnged=function(ptCheckBox){var curElement=this.curElement();var oName=getObj("fbName");curElement.formula="";curElement.isPassThrough=ptCheckBox.checked;curElement.alias=oName.value;this.onTemplateElementChanged();};mstrFormulaBarImpl.prototype.onTemplateElementChanged=function(){var oTemplateElement=getObj("fbTemplateElement");var oName=getObj("fbName");var oFormula=getObj("fbFormula");var oFormulaSpn=getObj("spnfbFormula");var oAvailable=getObj("fbAvailable");var oFuncWizard=getObj("tbFunctionWizard");var addButton=document.getElementById("tb_dmAdd");var ti=parseInt(oTemplateElement.value);var curElement=this.tElements[ti];oFormula.value=curElement.formula;if(ti==0&&curElement.alias==""){oName.value=this.nmName;}else{oName.value=curElement.alias;}if(addButton){addButton.className=addButton.className.replace("Disabled","");}if(!curElement.isDerived||curElement.type=="101"){oFormula.readOnly=true;oFormula.className="disabled";oFormulaSpn.setAttribute("TG","FALSE");oAvailable.disabled=true;oAvailable.selectedIndex=-1;if(oFuncWizard){oFuncWizard.style.visibility="hidden";}if(addButton){addButton.className+="Disabled";}}else{oFormula.readOnly=false;oFormula.className="";oFormulaSpn.setAttribute("TG","TRUE");oAvailable.disabled=false;this._fillAvailable(curElement,oAvailable);if(oFuncWizard){if(curElement.isPassThrough){oFuncWizard.style.visibility="hidden";}else{oFuncWizard.style.visibility="visible";}}}var oDynamicAlias=getObj("fbHasDynamicAlias");var disabled=(curElement.type!="3");oDynamicAlias.disabled=disabled;oDynamicAlias.checked=(curElement.hasDynamicAlias);var oAggFromBase=getObj("fbApplyAggFromBase");if(oAggFromBase){oAggFromBase.disabled=disabled;}this._adjustPTBox();};mstrFormulaBarImpl.prototype.curElement=function(){var oTemplateElement=getObj("fbTemplateElement");var ti=parseInt(oTemplateElement.value);return this.tElements[ti];};mstrFormulaBarImpl.prototype._adjustPTBox=function(){var ptCheckBox=document.getElementById("fbPassThrough");if(!ptCheckBox){return ;}var curElement=this.curElement(),ptLbl=document.getElementById("fbPTLbl"),cbVis="hidden",lblVis="hidden";if(curElement.isDerived){ptCheckBox.checked=curElement.isPassThrough;switch(this.dmMode){case 0:cbVis="visible";lblVis="visible";break;case 1:if(!curElement.isPassThrough){cbVis="visible";}lblVis="visible";break;case 2:if(curElement.isPassThrough){cbVis="visible";lblVis="visible";}break;}}ptCheckBox.style.visibility=cbVis;ptLbl.style.visibility=lblVis;};mstrFormulaBarImpl.prototype._fillAvailable=function(curElement,oAvailable){var size=oAvailable.options.length,ips=curElement.isPassThrough,metrics=this.metrics,vName=ips?"tn":"v",m,option;for(var i=size-1;i>=0;i--){oAvailable.remove(i);}size=metrics.length;for(var i=0;i<size;i++){m=metrics[i];if(ips&&m.isDerived){continue;}option=document.createElement("option");option.text=m.n;option.value=m[vName];oAvailable.add(option);}};mstrFormulaBarImpl.prototype.addToFormula=function(e){var oFormula=getObj("fbFormula");var oAvailable=getObj("fbAvailable");if(oAvailable){if(!oAvailable.disabled&&oAvailable.selectedIndex>=0&&oAvailable.options[oAvailable.selectedIndex]){if(oFormula){oFormula.focus();if(document.selection&&document.selection.createRange){var sel=document.selection.createRange();sel.text=oAvailable.options[oAvailable.selectedIndex].value;}else{oFormula.value+=oAvailable.options[oAvailable.selectedIndex].value;}}}}};mstrFormulaBarImpl.prototype.onnotifydrag=function(items,bone,types){try{var type="";if(bone.type==microstrategy.OBJTYPE_GRID||bone.type==microstrategy.OBJTYPE_OBJBROWSER){types.sort(function(a,b){return parseInt(a)-parseInt(b);});type=(types[0]==types[types.length-1])?types[0]:"";}if(type){this.dragSource=bone;}}catch(err){microstrategy.errors.log(err);return false;}};mstrFormulaBarImpl.prototype.onmouseup=function(e){try{if(typeof (mstr)!="undefined"){this.detachWinListener(this,"mousemove");this.detachWinListener(this,"mouseup");}else{document.onmousemove=null;document.onmouseup=null;}}catch(err){microstrategy.errors.log(err);}return false;};mstrFormulaBarImpl.prototype.exec=function(cmdId,cmdValue){switch(cmdId){case"openFunctionWizard":var name=microstrategy.findChildrenWithAtt(this.elem,"input","name","fbName");var formula=microstrategy.findChildrenWithAtt(this.elem,"textarea","name","fbFormula");if(name.length){name=name[0];}if(formula.length){formula=formula[0];}microstrategy.updateManager.add([microstrategy.updateManager.createActionObject(this.elem,mstrUpdateManager.UPDATE_FORMULA_EDITOR,this.beanPath,["12006","12007"],[name.value,formula.value],[],[])]);var result=toggleShowBean("functionWizard",true,cmdValue);break;}return result;};mstrFormulaBarImpl.prototype.ondrop=function(area,selections){try{var items=selections.getItems();if(this.dragSource&&items){inputObj=inputObj[inputObj.length-1];if(inputObj){var mode=inputObj.getAttribute("mode");switch(this.dragSource.type){case microstrategy.OBJTYPE_OBJBROWSER:var datasetId=null;if(mode&&(mode==this.DATASET_MODE)){datasetId=inputObj.getAttribute("dsId");}var count=0;for(var i=0;i<items.length;i++){var metricDatasetId=items[i].id;if(metricDatasetId.length>32){metricDatasetId=metricDatasetId.substr(0,32);}if((mode==this.GRID_MODE)||((datasetId&&(datasetId==metricDatasetId)))){if(count>0){inputObj.value+=" + ";}inputObj.value+="["+items[i].innerText.substr(1)+"]";count++;}}break;case microstrategy.OBJTYPE_GRID:if(mode&&(mode==this.GRID_MODE)){if((items[0]!=null)&&(items[0].getAttribute(microstrategy.HTMLATTR_SUBOBJTYPE)==microstrategy.OBJTYPE_METRIC)){inputObj.value+="["+items[0].getAttribute("ds")+"] ";}}}}}}catch(err){microstrategy.errors.log(err);return false;}};mstrFormulaBarImpl.prototype.onkeypress=function(e){try{if(!e){e=window.event;}var src=getEventTarget(e);return !((src.tagName.toLowerCase()=="input")&&(e.keyCode==13));}catch(err){microstrategy.errors.log(err);return true;}};mstrFormulaBarImpl.prototype.onsubmit=function(e){var oName=getObj("fbName"),oDynamicAlias=getObj("fbHasDynamicAlias"),attr=(mstrHTMLAttributes.ATTR_REGEX).toLowerCase();if(oDynamicAlias&&oDynamicAlias.checked){if(!this.regex){this.regex=oName.getAttribute(attr);}oName.setAttribute(attr,"");}else{this.regex&&oName.setAttribute(attr,this.regex);}if(this.validateInputs()){return mstrEditorImpl.prototype.onsubmit.call(this,e);}else{return false;}};mstrFormulaBarImpl.prototype.onchange=function(e){var src=getEventTarget(e);if(src){src.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,src.value);}};mstrFormulaBarImpl.prototype.validateField=function(field,message,enforceValidation){var deltaMessage=mstrEditorImpl.prototype.validateField.call(this,field,message,enforceValidation);if(deltaMessage&&deltaMessage.length>0){return deltaMessage;}if(field.id!="fbName"){return deltaMessage;}var oName=getObj("fbName");var oAvailable=getObj("fbAvailable");var fieldId=field.getAttribute(mstrHTMLAttributes.ATTR_FLDID);var fieldName=null;if(typeof (fieldId)!="undefined"&&fieldId!=null){fieldName=microstrategy.descriptors.getDescriptor(fieldId);}if(fieldName==null){fieldName=field.getAttribute(mstrHTMLAttributes.ATTR_FLD);}if(oName&&oAvailable){var te=getObj("fbTemplateElement");if(te&&(te.selectedIndex==0||(field.defaultValue!=field.value))){for(var idx=0;idx<oAvailable.children.length;idx++){if(oAvailable.children[idx].attributes.did&&oAvailable.children[idx].attributes.did.nodeValue!=oName.selectedElemDid&&oAvailable.children[idx].title==field.value){deltaMessage+=microstrategy.descriptors.getDescriptor("6174")+" "+fieldName+"<br />";}}}}return deltaMessage;};function mstrFormulaBarImpl(id){this.inherits=mstrEditorImpl;this.inherits(id);delete this.inherits;return this;}