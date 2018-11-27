(function(){mstrmojo.requiresClsP("mstrmojo","Editor","Container","TextBoxWithLabel","EditableLabel","Label","Container","hash","array");mstrmojo.requiresCls("mstrmojo.vi.ui.GroupDEList","mstrmojo.vi.ui.editors.DerivedElementPanel","mstrmojo.ui.Pulldown","mstrmojo.ui.Checkbox");mstrmojo.requiresDescs(118,221,1911,5348,6199,12091,12409,12410,12411,12412,13248,13249,13253,13916);var $DESC=mstrmojo.desc,$CSS=mstrmojo.css,$HASH=mstrmojo.hash,$FOREACHARRAY=mstrmojo.array.forEach,$EID;function popupOpen(){$CSS.addClass(this.list.domNode,"mstrmojo-others-rules");}function validateElementName(name){if(name.search(/\\|"|\[|\]|\./)!==-1){mstrmojo.alert($DESC(13916,'Group and calculation names cannot contain the following characters: \\"[].'));return false;}return true;}mstrmojo.vi.ui.editors.DerivedElementsEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.vi.ui.editors.DerivedElementsEditor",cssClass:"mstrmojo-DerivedElementsEditor",title:$DESC(13248,"Group Editor"),help:"element_group_editor.htm",browseConfig:null,init:function init(props){this._super(props);$EID=this.id;},onOpen:function onOpen(){this.deList.updateScrollbars();},_set_model:function(n,v){var defaultName=v.attName+$DESC(13253,"(Group)");this.model=v;this.deList.set("items",v.items);this.set("title",$DESC(13248,"Group Editor")+" - "+(v.isNew===true?defaultName:v.n));this.children[0].editDEName.set("label",(v.isNew||v.fromDS)?$DESC(12199,"Attribute Name:"):$DESC(13249,"Display Name:"));this.children[0].editDEName.set("value",(v.isNew===true)?defaultName:(v.dispName?v.dispName:v.n));this.children[0].editDEName.set("emptyText",(v.isNew===true)?defaultName:(v.dispName?v.dispName:v.n));this.initExcludeList();this.toggleEdit(false,false);this.othersProp.showChildren.set("selectedIndex",v.isNew?0:v.othersDE.showChildren?0:1);return true;},initExcludeList:function(){var excludeList=this.elementPanel.excludeList={};$FOREACHARRAY(this.model.items,function(item){if(item.t===1){$FOREACHARRAY(item.es,function(e){excludeList[e.v]=true;});}});},editItem:function(elemId){var me=this;if(elemId){$FOREACHARRAY(this.model.items,function(item,itemIndex){if(item.id===elemId){me.deList.set("selectedIndex",itemIndex);me.toggleEdit(true,false,item);return false;}});}else{this.toggleEdit(true,true);}},commitEdit:function(elems,isNew){var name=this.newGroupNode.editDEName.text,isValid=validateElementName(name);if(isValid){if(isNew){this.model.addDE(name,elems);}else{this.model.updateDE(this.deList.selectedIndex,this.newGroupNode.editDEName.text,elems);}this.deList.refresh();}return isValid;},toggleEdit:function(isEdit,isNew,item){var newGroupTag=1,deItems=this.model.items,newGroupName=mstrmojo.desc(5187,"Group"),selectedElems=this.elementPanel.selectedElems(),hasSameName=function(item){return item.n===newGroupName+" "+newGroupTag;};this.othersProp.showChildren.set("enabled",!isEdit);if(isEdit===true){this.elementPanel.set("isNew",isNew);this.elementPanel.set("visible",true);selectedElems.set("items",isNew?[]:$HASH.clone(item.es));}else{this.elementPanel.set("visible",false);}if(isNew&&deItems){while(true){if(deItems.some(hasSameName)){newGroupTag++;}else{break;}}}this.newGroupNode.toggleEdit(isEdit,isNew?newGroupName+" "+newGroupTag:item&&item.n);if(isEdit){this.okBtn.set("enabled",false);}else{this.enableOkBtn();}},enableOkBtn:function(){this.okBtn.set("enabled",this.model.isDirty()&&this.deList.items&&this.deList.items.length>1);},children:[{scriptClass:"mstrmojo.Container",markupString:'<div  class="{@cssClass}"><div></div><div style="clear:both;"></div></div>',cssClass:"attrNameEdit",markupSlots:{editNode:function(){return this.domNode.firstChild;}},children:[{scriptClass:"mstrmojo.TextBoxWithLabel",slot:"editNode",alias:"editDEName",label:$DESC(13249,"Display Name:"),value:"Attribute(group)",onblur:function(){var m=mstrmojo.all[$EID].model;if(this.value&&this.value.length>0&&this.value!==m.n){m.isNameChanged=true;if(m.isNew||m.fromDS){m.n=this.value;}else{m.dispName=this.value;}}}}]},{scriptClass:"mstrmojo.Widget",markupString:"<div class='elementsTitles'><div>"+$DESC(5207,"Group Name")+"</div><div>"+$DESC(12091,"Selected Elements")+"</div></div>"},{scriptClass:"mstrmojo.Container",alias:"newGroupNode",markupString:"<div class='mstrmojo-VIGroupDERow new {@cssClass}'><div><div class='group-column'><div class='draggable-icon'></div><div class='name' mstrAttach:click>"+mstrmojo.desc(12412,"Add a Group")+"</div><div></div></div></div><div style='clear:both;float:none;'></div></div></div>",markupSlots:{editNode:function(){return this.domNode.firstChild.firstChild.children[2];},newNode:function(){return this.domNode.firstChild.firstChild.children[1];}},children:[{scriptClass:"mstrmojo.EditableLabel",cssClass:"mstrmojo-new-DEName",visible:false,slot:"editNode",alias:"editDEName",onkeyup:function(evt){mstrmojo.EditableLabel.prototype.onkeyup.call(this,evt);if(this.isEditing){var editableNode=this[this.editableSlot];if(this.text!==(editableNode.innerText||editableNode.textContent||"")){this.parent.parent.elementPanel.enableSaveBtn();}}}}],onclick:function(){mstrmojo.all[$EID].toggleEdit(true,true);},toggleEdit:function(isEdit,v){this.editDEName.set("visible",isEdit);this.editDEName.set("text",v);this.editDEName.set("isEditing",isEdit);if(this.hasRendered){$CSS.toggleClass(this.domNode,"isEdit",isEdit);}else{this.set("cssClass",isEdit?"isEdit":"");}}},{scriptClass:"mstrmojo.vi.ui.GroupDEList",alias:"deList",items:[]},{scriptClass:"mstrmojo.EditableLabel",cssClass:"mstrmojo-edit-DEName",isEditing:true,visible:false,alias:"renameDE",allowEmptyText:false,onTextEditComplete:function(bChanged){this.set("visible",false);if(bChanged){this.parent.deList.selectedItem.isDirty=true;this.parent.deList.selectedItem.n=this.text;this.parent.enableOkBtn();this.parent.deList.refresh();}}},{scriptClass:"mstrmojo.HBox",alias:"othersProp",cssClass:"othersProp",children:[{scriptClass:"mstrmojo.Label",text:$DESC(12409,"Display all other elements as")},{scriptClass:"mstrmojo.ui.Pulldown",cssClass:"mstrmojo-others-rule",alias:"showChildren",selectedIndex:0,isHostedWithin:false,onPopupWidgetOpened:function onPopupWidgetOpened(){popupOpen.call(this);},onitemSelected:function onitemSelected(item){var w=this.parent.parent;if(this.hasRendered){w.model.editOthers({showChildren:item.v});w.enableOkBtn();}},items:[{n:$DESC(12410,"individual items"),v:true},{n:$DESC(12411,"a consolidated group"),v:false}]}]},{scriptClass:"mstrmojo.Button",slot:"buttonNode",cssClass:"mstrmojo-WebButton Derived-Elements-Editor-Button",text:$DESC(221,"Cancel"),onclick:function(){mstrmojo.all[$EID].close();}},{scriptClass:"mstrmojo.Button",slot:"buttonNode",alias:"okBtn",cssClass:"mstrmojo-WebButton Derived-Elements-Editor-Button saveBtn",iconClass:"hot",text:$DESC(118,"Save"),onclick:function(){this.parent.model.save();mstrmojo.all[$EID].close();}},{scriptClass:"mstrmojo.vi.ui.editors.DerivedElementPanel",alias:"elementPanel",visible:false}]});mstrmojo.vi.ui.editors.DerivedElementsEditor.validateElementName=validateElementName;}());