mstrSaveAsReportImplScript=true;mstrSaveAsReportImpl.prototype=new mstrSaveAsEditorImpl();mstrSaveAsReportImpl.prototype.crtFdEditor=null;mstrSaveAsReportImpl.prototype.advEditor=null;mstrSaveAsReportImpl.prototype.simpleOptions=null;mstrSaveAsReportImpl.prototype.advancedLink=null;mstrSaveAsReportImpl.prototype.showAdvanced=false;mstrSaveAsReportImpl.prototype.CREATEFOLDER_ID="ed_create_saveasbean";mstrSaveAsReportImpl.prototype.ADVANCED_ID="advanced_saveasbean";mstrSaveAsReportImpl.prototype.SIMPLE_ID="simple_saveasbean";mstrSaveAsReportImpl.prototype.currentPopUp=null;mstrSaveAsReportImpl.prototype.onload=function(e){try{mstrSaveAsEditorImpl.prototype.onload.call(this);if(this.saveasName){this.saveasName.focus();}this.advancedLink=document.getElementById("divAdvancedLink");if(this.advancedLink){var advAnc=this.advancedLink.parentNode;if(advAnc&&advAnc.tagName.toLowerCase()=="a"){advAnc.href="javascript:microstrategy.bone('"+this.id+"').toggleAdvanced();";}}var sKeepPromptCK=document.getElementById("saveAsSimpleKeepPrompt");if(sKeepPromptCK){sKeepPromptCK.onclick=new Function("e","return microstrategy.bone('"+this.id+"').onSimpleOptionsClicked(e);");}var sKeepLinkedCK=document.getElementById("saveAsSimpleKeepLinked");if(sKeepLinkedCK){sKeepLinkedCK.onclick=new Function("e","return microstrategy.bone('"+this.id+"').onSimpleOptionsClicked(e);");}window.onresize=new Function("microstrategy.bone('"+this.id+"').recenterPopup();");this.crtFdEditor=microstrategy.registerBone(this.CREATEFOLDER_ID,"(true)",null);if(this.crtFdEditor){this.crtFdEditor.parentBone=this;this.crtFdEditor.path="microstrategy.bone('"+this.id+"').crtFdEditor";this.crtFdEditor.onload();this.crtFdEditor.setSaveasForm(this.saveasForm);}this.advEditor=new mstrAdvancedOptionsImpl(this.ADVANCED_ID);if(this.advEditor){this.advEditor.parentBone=this;this.advEditor.path="microstrategy.bone('"+this.id+"').advEditor";this.advEditor.setSaveasForm(this.saveasForm);this.advEditor.onload();}this.simpleOptions=document.getElementById(this.SIMPLE_ID);this.toggleAdvancedLink();}catch(err){microstrategy.errors.log(err);return false;}};mstrSaveAsReportImpl.prototype.onunload=function(e){try{if(this.crtFdEditor){this.crtFdEditor.onunload(e);}if(this.advEditor){this.advEditor.onunload(e);}mstrSaveAsEditorImpl.prototype.onunload.call(this);}catch(err){microstrategy.errors.log(err);}};mstrSaveAsReportImpl.prototype.onsubmit=function(e){try{if(this.submitted){return false;}else{this.submitted=true;}if(this.saveasName){var value=this.saveasName.value.replace(/ /g,"");if(value.length==0){showMessage({contents:microstrategy.descriptors.getDescriptor("3380"),elements:microstrategy.OK_BUTTON,okEval:"document.getElementById('"+this.saveasName.id+"').focus();",type:mstrMsgBoxImpl.MSG_WARNING});this.submitted=false;return false;}}this.preSaveSubmit();return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrSaveAsReportImpl.prototype.onSimpleOptionsClicked=function(e){try{if(!e){e=window.event;}var src=getEventTarget(e);if(src&&this.advEditor){this.advEditor.validateSimpleOptions(src);}this.toggleAdvancedLink();}catch(err){microstrategy.errors.log(err);return false;}};mstrSaveAsReportImpl.prototype.initBone=function(){mstrSaveAsEditorImpl.prototype.initBone.call(this);this.saveasForm=document.getElementById("SaveReport");this.saveasName=document.getElementById("saveAsReportName");this.saveasDesc=document.getElementById("saveAsReportDescription");this.saveasSimpleKeepPrompt=document.getElementById("saveAsSimpleKeepPrompt");};mstrSaveAsReportImpl.prototype.toggleCreateFolder=function(bShow){if(this.crtFdEditor){this.crtFdEditor.show();this.currentPopUp=this.crtFdEditor.elem;}};mstrSaveAsReportImpl.prototype.isKeepPromptChecked=function(){var sKeepPromptCK=document.getElementById("saveAsSimpleKeepPrompt");return sKeepPromptCK&&sKeepPromptCK.checked;};mstrSaveAsReportImpl.prototype.isKeepLinkedExisted=function(){return document.getElementById("saveAsSimpleKeepLinked")!=null;};mstrSaveAsReportImpl.prototype.isCopyNameTransExisted=function(){return document.getElementById("saveAsCopyNameTranslations")!=null;};mstrSaveAsReportImpl.prototype.isShowAdvanced=function(){return this.isKeepPromptChecked()||this.isKeepLinkedExisted()||this.isCopyNameTransExisted();};mstrSaveAsReportImpl.prototype.toggleAdvanced=function(){if(this.advEditor&&this.isShowAdvanced()){this.showAdvanced=!this.showAdvanced;this.advEditor.toggleAdvanced(this.showAdvanced);if(this.advancedLink){this.advancedLink.className=this.showAdvanced?"open":"";}}};mstrSaveAsReportImpl.prototype.toggleAdvancedLink=function(){if(this.advancedLink){var originalCSSName=this.showAdvanced?"open":"";this.advancedLink.className=this.isShowAdvanced()?originalCSSName:"advancedLinkDisabled";if(this.advEditor&&!this.isShowAdvanced()){this.showAdvanced=false;this.advEditor.toggleAdvanced(false);}}};mstrSaveAsReportImpl.prototype.recenterPopup=function(){if(this.currentPopUp!=null){this.crtFdEditor.moveToCenter();}};mstrSaveAsReportImpl.prototype.generateSaveURL=function(obj){if(obj&&obj.href){var URL=obj.href;if(this.saveasForm){var folderObj=this.saveasForm.folderID;if(folderObj){folderObj.name="dummy";}addURLAsHiddenInputsToForm(this.saveasForm,URL,true);var evt=getURLParameter(URL,"evt");createHiddenInput(this.saveasForm,evt,"1");this.addInputsToForm();submitForm(this.saveasForm);}}};mstrSaveAsReportImpl.prototype.addInputsToForm=function(){var fltManipulations="0";var promptAnswers="0";var filterShortcut="0";var templateShorcut="0";var obj=document.getElementById("saveAsKeepFilterManipulations");if(obj&&obj.checked==true){fltManipulations=obj.value;}var obj=document.getElementById("saveAsKeepPromptAnswers");if(obj&&obj.checked==true){promptAnswers=obj.value;}var obj=document.getElementById("saveAsKeepFilterShortcuts");if(obj&&obj.checked==true){filterShortcut=obj.value;}var obj=document.getElementById("saveAsKeepTemplateShortcuts");if(obj&&obj.checked==true){templateShorcut=obj.value;}if(mstrAdvancedOptionsImpl.ifFound(this.saveasForm,"saveAsKeepFilterManipulations")){if(fltManipulations=="0"){createHiddenInput(this.saveasForm,"saveAsKeepFilterManipulations","0");}}if(mstrAdvancedOptionsImpl.ifFound(this.saveasForm,"saveAsKeepPromptAnswers")){if(promptAnswers=="0"){createHiddenInput(this.saveasForm,"saveAsKeepPromptAnswers","0");}}if(mstrAdvancedOptionsImpl.ifFound(this.saveasForm,"saveAsKeepFilterShortcuts")){if(filterShortcut=="0"){createHiddenInput(this.saveasForm,"saveAsKeepFilterShortcuts","0");}}if(mstrAdvancedOptionsImpl.ifFound(this.saveasForm,"saveAsKeepTemplateShortcuts")){if(templateShorcut=="0"){createHiddenInput(this.saveasForm,"saveAsKeepTemplateShortcuts","0");}}};mstrSaveAsReportImpl.prototype.addExtraURL=function(href){var flags=document.getElementsByName("saveAsReportSaveAsFlags");for(var i=0;i<flags.length;i++){if(flags[i].checked){return this.appendParameters(href,"saveAsReportSaveAsFlags",flags[i].value);}}if(this.saveasSimpleKeepPrompt&&!this.saveasSimpleKeepPrompt.checked){href=this.appendParameters(href,this.saveasSimpleKeepPrompt.id,"0");href=this.appendParameters(href,"saveAsAdvKeepPrompt1","1");}return href;};mstrSaveAsReportImpl.prototype.encode=function(input){return this.doubleEncode(input);};mstrSaveAsReportImpl.prototype.hasDoubleEncoded=function(){return true;};function mstrSaveAsReportImpl(id){this.inherits=mstrSaveAsEditorImpl;this.inherits(id);delete this.inherits;return this;}