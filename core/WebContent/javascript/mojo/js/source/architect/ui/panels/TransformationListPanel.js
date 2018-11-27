(function(){mstrmojo.requiresCls("mstrmojo.architect.EnumDataChangeEvents","mstrmojo.architect.ui.UnitList","mstrmojo.architect.ui.panels.BaseListPanel");var $A=mstrmojo.array,STR_ADD_TRANSFORMATION=mstrmojo.desc(12214,"Add transformation"),$ENUM_DATA_CHANGE_EVENTS=mstrmojo.architect.EnumDataChangeEvents,STR_INVALID_TRANSFORMATION=mstrmojo.desc(12211,"Transformation '%1' is in an invalid state, it needs to be fixed before proceeding"),STR_HIDE_TRANSFORMATIONS=mstrmojo.desc(12209,"Hide transformations"),STR_TRANSFORMATIONS=mstrmojo.desc(12215,"Transformations"),STR_TRANSFORMATION="transformation",STR_DELETE_CONFIRM="Are you sure you want to delete $$ '##'?";function renameTransformationItems(evt){var index=$A.find(this.contentWidget.items,"id",evt.itemID),cw=this.contentWidget;if(index>=0){cw.items[index].name=evt.itemName;cw.refresh();}}function onTransformationsChanged(evt){this.contentWidget.set("items",evt.items||[]);}mstrmojo.architect.ui.panels.TransformationListPanel=mstrmojo.declare(mstrmojo.architect.ui.panels.BaseListPanel,null,{scriptClass:"mstrmojo.architect.ui.panels.TransformationListPanel",title:STR_TRANSFORMATIONS,addTitle:STR_ADD_TRANSFORMATION,init:function init(props){props.showListBtnTitle=STR_HIDE_TRANSFORMATIONS;this._super(props);var evtConfig={},panelConfig=evtConfig[this.id]={};mstrApp.getRootController().attachDataChangeListeners(evtConfig);panelConfig[$ENUM_DATA_CHANGE_EVENTS.TRANSFORMATIONS_CHANGED]=onTransformationsChanged;panelConfig[$ENUM_DATA_CHANGE_EVENTS.VIEW_ITEM_RENAMED]=renameTransformationItems;mstrApp.getRootController().attachDataChangeListeners(evtConfig);},getContentWidget:function getContentWidget(){var rootController=mstrApp.rootController;return{scriptClass:"mstrmojo.architect.ui.UnitList",singleSelect:function singleSelect(idx){var id=this.items[idx].id,transformationId=rootController.model.currentTransformationId;if(transformationId!==id){var check=rootController.preSwitchCheck(rootController.getTransformation(transformationId),STR_INVALID_TRANSFORMATION,"name");if(check.canProceed){rootController.commitTransformation(transformationId,{success:mstrmojo.emptyFn()});rootController.editTransformation(id);}else{mstrmojo.alert(check.msg);}}},onItemDeleted:function onItemDeleted(listItem){listItem.did=listItem.id;mstrmojo.confirm(STR_DELETE_CONFIRM.replace("##",listItem.name).replace("$$",STR_TRANSFORMATION),{confirmBtn:{fn:function(){if(rootController.model.currentTransformationId===listItem.did){rootController.closeViewObject();}rootController.deleteObject(listItem);}}});},onItemRenamed:function onItemRenamed(listItem,newName){listItem.did=listItem.id;var rootController=mstrApp.rootController,id=listItem.did,isValid=rootController.renameTransformation(id,newName);if(isValid){rootController.updateViewListItem(id,newName);}}};},onItemAdd:function onItemAdd(){var rootController=mstrApp.rootController,transformationId=rootController.model.currentTransformationId,check=rootController.preSwitchCheck(rootController.getTransformation(transformationId),STR_INVALID_TRANSFORMATION,"name");if(check.canProceed){rootController.commitTransformation(transformationId,{success:mstrmojo.emptyFn()});rootController.addTransformation(true,"");}else{mstrmojo.alert(check.msg);}}});}());