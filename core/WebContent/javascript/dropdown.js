var dropDown=new function(){};dropDown.prototype=new Object();dropDown.togglePicker=function(show,id,dropdown,bone){try{if(typeof microstrategy.log!="undefined"&&microstrategy.log.shouldLog(mstrLogImpl.METHOD_LEVEL)){microstrategy.log.start("dropDown.togglePicker",0);}var oldPicker=null;if(bone.currentPicker){oldPicker=bone.currentPicker;if(bone.currentPicker.selected){var item=bone.currentPicker.selected;if(item){item.className="";}bone.currentPicker.selected=null;bone.currentPicker.commandId=null;bone.currentPicker.toolId=null;}bone.currentPicker.style.display="none";bone.currentPicker=null;}if(show){bone.currentPicker=document.getElementById(id);if(!bone.currentPicker){microstrategy.errors.log(microstrategy.descriptors.getDescriptor("3623"));return false;}bone.currentPicker.style.zIndex=1000;var cmdId=dropdown.getAttribute(microstrategy.HTMLATTR_CMD_ID);if(!cmdId){cmdId=dropdown.parentNode.getAttribute(microstrategy.HTMLATTR_CMD_ID);}bone.currentPicker.commandId=cmdId;var subtypeStyle=bone.currentPicker.getAttribute(microstrategy.HTMLATTR_STYLE);if(subtypeStyle!=null){this.adjustPickerElements(bone.currentPicker);}if(bone.selectPickerElement){bone.selectPickerElement(bone.currentPicker);}for(var i=0;i<bone.currentPicker.childNodes.length;i++){var oChild=bone.currentPicker.childNodes[i];auxStr=oChild.getAttribute("de");if(auxStr&&auxStr.length>0){oChild.className=(eval(auxStr))?" ":"disabled";}}var leftElem=mstr.utils.BoxModel.getElementSumOffsetLeftAccurately(dropdown,document.body);var bottomElem=mstr.utils.BoxModel.getElementSumOffsetTopAccurately(dropdown,document.body)+getObjHeight(dropdown);if(bone.dialogDiv&&bone.dialogDiv.getAttribute(mstrHTMLAttributes.ATTR_DIALOG)=="true"){leftElem-=getObjSumLeft(bone.dialogDiv);bottomElem-=getObjSumTop(bone.dialogDiv);}bone.currentPicker.style.visibility="hidden";bone.currentPicker.style.display="block";var lClientWidth=getClientWidth();var lPickerWidth=getObjWidth(bone.currentPicker);if(lPickerWidth+leftElem>lClientWidth+((bone.dialogDiv&&!mstr.utils.ISIE6)?bone.dialogDiv.scrollLeft:0)){leftElem=Math.max(leftElem-lPickerWidth+getObjWidth(dropdown),0);}moveObjTo(bone.currentPicker,leftElem,bottomElem);if(bIsIE6&&!bIsIE7&&bone.maxHeight){bone.currentPicker.style.height="auto";bone.currentPicker.style.height=(bone.currentPicker.clientHeight<parseInt(bone.maxHeight))?bone.currentPicker.clientHeight+"px":bone.maxHeight;}bone.currentPicker.style.visibility="visible";togglePulldowns(bone.currentPicker,false);}else{if(oldPicker){togglePulldowns(oldPicker,true);}}}catch(err){microstrategy.errors.log(err);}finally{if(typeof microstrategy.log!="undefined"&&microstrategy.log.shouldLog(mstrLogImpl.METHOD_LEVEL)){microstrategy.log.stop("dropDown.togglePicker",0);}}return false;};dropDown.closePicker=function(e,bone){try{if(typeof microstrategy.log!="undefined"&&microstrategy.log.shouldLog(mstrLogImpl.METHOD_LEVEL)){microstrategy.log.start("dropDown.closePicker",0);}if(!e){e=window.event;}var obj=getEventTarget(e);var bClose=true;if(obj){if(!obj.getAttribute("id")&&obj.parentNode.nodeType==1){obj=obj.parentNode;}var bSelected=false;if(bone.currentPicker){bSelected=(findTarget(obj,"ty")==bone.currentPicker)&&(obj!=bone.currentPicker)&&(obj.className.indexOf("disabled")<0);bClose=(obj.className.indexOf("disabled")<0)&&(obj!=bone.currentPicker);}if(bSelected){if(bone.execPicker){bClose=bone.execPicker(bone.currentPicker,obj);}else{alert("Option '"+obj.getAttribute("id")+"' was selected from picker '"+bone.currentPicker.id+"'. Please make sure the bone '"+bone.id+"' implements execPicker.");}}}if(bClose&&bone.currentPicker){dropDown.togglePicker(false,bone.currentPicker.id,null,bone);}return true;}catch(err){microstrategy.errors.log(err);return false;}finally{if(typeof microstrategy.log!="undefined"&&microstrategy.log.shouldLog(mstrLogImpl.METHOD_LEVEL)){microstrategy.log.stop("dropDown.closePicker",0);}}};dropDown.adjustPickerElements=function(pickerList){try{var subtypeStyle=pickerList.getAttribute(microstrategy.HTMLATTR_STYLE);switch(subtypeStyle){case"color":var userColors=microstrategy.userPalette;if(userColors){var pkrCustom=microstrategy.findChildWithAtt(pickerList,"span","name","pkrCustom");if(!pkrCustom){return ;}if(pkrCustom.getElementsByTagName("img").length==0){var placeholder=document.createElement("img");placeholder.src=microstrategy.FOLDER_IMAGES+"1ptrans.gif";pkrCustom.appendChild(placeholder);}displayObj(pkrCustom);if(!ISIE7){var pkrMore=microstrategy.findChildWithAtt(pickerList,"span","name","pkrMore");if(pkrMore){pkrMore.style.marginTop="25px";}}userColors=userColors.split(",");var colorOptions=microstrategy.findChildrenWithAtt(pickerList,"span","custom","1");if(colorOptions.length==userColors.length&&colorOptions.length==8){if(colorOptions[0].id=="pkr"+userColors[0]){return ;}}else{if(colorOptions.length==userColors.length){return ;}}for(var i=0;i<colorOptions.length;i++){pickerList.removeChild(colorOptions[i]);}for(var i=(userColors.length-1);i>=0;i--){var newColor=document.createElement("span");newColor.setAttribute("custom","1");newColor.id="pkr"+userColors[i];newColor.setAttribute("name","pkr"+userColors[i]);newColor.setAttribute("title",userColors[i]);newColor.style.backgroundColor=userColors[i];pkrCustom.insertAdjacentElement("afterEnd",newColor);}}break;}}catch(err){microstrategy.errors.log(err);return false;}};