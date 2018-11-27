mstrVisPropsEditorImplScript=true;mstrVisPropsEditorImpl.prototype=new mstrEditorImpl();mstrVisPropsEditorImpl.prototype.visEditorId;mstrVisPropsEditorImpl.prototype.currentTab=1;mstrVisPropsEditorImpl.prototype.visProps;mstrVisPropsEditorImpl.prototype.newVisProps;mstrVisPropsEditorImpl.prototype.widgetPropsXml;mstrVisPropsEditorImpl.prototype.sdp;mstrVisPropsEditorImpl.prototype.onload=function(){try{this.initEditor();this.dialogDiv=this.elem;this.setCurrentTab();}catch(err){microstrategy.errors.log(err);}};mstrVisPropsEditorImpl.prototype.setCurrentTab=function(tabSelected){try{if(tabSelected){this.currentTab=tabSelected.getAttribute("curtab");}var tabContainers=microstrategy.findChildrenWithAtt(this.elem,"div","ty","tab");if(tabContainers){for(var i=0;i<tabContainers.length;i++){tabContainers[i].style.display=(tabContainers[i].getAttribute("curtab")==this.currentTab)?"block":"none";}}var tabSets=microstrategy.findChildrenWithAtt(this.elem,"span","ty","tab");if(tabSets){for(var i=0;i<tabSets.length;i++){tabSets[i].className=(tabSets[i].getAttribute("curtab")==this.currentTab)?"mstrTabSetTabSelected":"mstrTabSetTab";}}}catch(err){microstrategy.errors.log(err);}};mstrVisPropsEditorImpl.prototype.okChanges=function(){try{var visEditorBone=microstrategy.bone(this.visEditorId),selects=microstrategy.findChildrenWithAtt(this.elem,"select","visprop","1"),inputs=microstrategy.findChildrenWithAtt(this.elem,"input","visprop","1"),textareas=microstrategy.findChildrenWithAtt(this.elem,"textarea","visprop","1");inputs=inputs.concat(selects).concat(textareas);if(inputs){for(var i=0;i<inputs.length;i++){var input=inputs[i];var value="";var isValidAttribute=input.getAttribute("isvalid");if(isValidAttribute){var isValid=eval(isValidAttribute);if(isValid!=true){alert(isValid);return ;}}switch(input.type){case"text":case"textarea":value=(input.getAttribute("getvalue"))?eval(input.getAttribute("getvalue")):input.value;break;case"checkbox":value=input.checked?input.value:"0";break;case"hidden":value=(input.getAttribute("getvalue"))?eval(input.getAttribute("getvalue")):input.value;break;case"radio":value=input.checked?input.value:null;break;case"select-one":for(var j=0;j<input.length;j++){var option=input[j];if(option.selected==true){value=option.value;if(value.length==0&&input.getAttribute("allowEmpty")=="false"){value=null;}break;}}break;default:alert("input type not supported");}if(value==-1&&input.id=="sgProps"){return ;}if(value!=null){if(!this.newVisProps){this.newVisProps=(this.scope==microstrategy.VIS_EDITOR_SCOPE_REPORT)?visEditorBone.visProps||{}:{};}this.newVisProps[input.id]=value;}}}if(this.newVisProps){var widgetPropsXml="<widgetProps><fmt>";for(var k in this.newVisProps){widgetPropsXml+="<"+k+' value="'+encode(encode(this.newVisProps[k]))+'" />';}widgetPropsXml+="</fmt></widgetProps>";}var sdpArray=new Array();var sdpSelects=microstrategy.findChildrenWithAtt(this.elem,"select","sdp","1");var sdpInputs=microstrategy.findChildWithAtt(this.elem,"input","id","sdps");if(sdpSelects&&sdpSelects.length>0){var sdpSelect=sdpSelects[0];for(var j=0;sdpSelect&&j<sdpSelect.length;j++){var option=sdpSelect[j];if(option.selected==true){this.sdp=option.value;}}}else{if(sdpInputs){this.sdp=(sdpInputs.getAttribute("getval"))?eval(sdpInputs.getAttribute("getval")):sdpInput.value;}}if(visEditorBone){if(this.newVisProps){visEditorBone.visProps=this.newVisProps;visEditorBone.widgetPropsXml=widgetPropsXml;visEditorBone.flushChanges=true;}if(this.sdp!=null){visEditorBone.setSelectedDataSourceKeys(this.sdp);visEditorBone.flushChanges=true;}}else{if(this.newVisProps||this.sdp!=null){var bt=mstr.$obj("widgetBoneTranslator");if(bt){if(this.newVisProps){bt.set("WidgetProps",widgetPropsXml);}if(this.sdp!=null){bt.set("SecondaryDataProvidersValue"," ");bt.set("SecondaryDataProvidersValue",this.sdp);}}else{alert("Cannot save visualization properties");}}}this.close();}catch(err){microstrategy.errors.log(err);return false;}};mstrVisPropsEditorImpl.prototype.togglePicker=function(show,id,tool){try{if(tool&&(!tool.disabled)){dropDown.togglePicker(show,id,tool,this);}}catch(err){microstrategy.errors.log(err);}return false;};mstrVisPropsEditorImpl.prototype.closePicker=function(e){try{dropDown.closePicker(e,this);return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrVisPropsEditorImpl.prototype.execPicker=function(picker,obj){try{var cmdId=picker.commandId;var newValue=obj.getAttribute("id").slice(3);if(newValue=="More"){var dropDown=document.getElementById(this.id+cmdId);var color=(dropDown&&dropDown.getElementsByTagName("span").length>0)?dropDown.getElementsByTagName("span")[0].style.backgroundColor:"";microstrategy.openDialog("edtColorPicker",null,null,microstrategy.servletName+"."+microstrategy.pageName,{activeBoneID:this.id,activeControlID:dropDown.id,currentColor:color});microstrategy.updateManager.flushAndSubmitChanges();}else{var dropDown=document.getElementById(this.id+cmdId);if(dropDown){this.updateColorPicker(dropDown,newValue);}}return true;}catch(err){microstrategy.errors.log(err);}return false;};mstrVisPropsEditorImpl.prototype.updateColorPicker=function(obj,value){try{if(value==null){value="transparent";}if(obj&&(value!="-2")){var spans=obj.getElementsByTagName("span");if(spans.length>0){spans[0].style.backgroundColor=value;if(!value||value=="transparent"){spans[0].innerHTML=microstrategy.descriptors.getDescriptor(3779);}else{spans[0].innerHTML="";}}else{obj.style.backgroundColor=value;}var hiddenInputId=obj.getAttribute("hiddeninput");var hiddenInput=microstrategy.findChildrenWithAtt(this.elem,"input","id",hiddenInputId);if(hiddenInput&&hiddenInput[0]){hiddenInput[0].value=value;}else{alert("hidden input not found");}}}catch(err){microstrategy.errors.log(err);return false;}};mstrVisPropsEditorImpl.prototype.exec=function(cmdId,cmdVal){try{switch(cmdId){case"advColorPicker":var info=cmdVal.split("|");this.updateColorPicker(document.getElementById(info[0]),info[1]);break;}}catch(err){microstrategy.errors.log(err);return false;}};mstrVisPropsEditorImpl.prototype.ondocumentclick=function(e){try{if(!e){e=window.event;}if(this.currentPicker){this.closePicker(e);}}catch(err){microstrategy.errors.log(err);alert(err);}};mstrVisPropsEditorImpl.prototype.getTargetBone=function(){if(!this.targetBone){if(this.scope==microstrategy.VIS_EDITOR_SCOPE_REPORT){this.targetBone=microstrategy.bone("UniqueReportID");}else{if(this.scope==microstrategy.VIS_EDITOR_SCOPE_RW_GRID){this.targetBone=microstrategy.findBone(microstrategy.bone("rwb_viewer").commands.queryState("selectedGrid"));}else{this.targetBone=microstrategy.bone("rwb_viewer").doc;}}}return this.targetBone;};mstrVisPropsEditorImpl.prototype.computeZIndex=function(){var zIndex=mstrEditorImpl.prototype.computeZIndex.call(this);if(zIndex<1000){zIndex=1001;}return zIndex;};function mstrVisPropsEditorImpl(id){this.inherits=mstrEditorImpl;this.inherits(id);this.inherits=null;return this;}