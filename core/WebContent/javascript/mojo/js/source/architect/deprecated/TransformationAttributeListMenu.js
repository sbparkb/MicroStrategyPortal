(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.architect.menu.ArchitectMenu","mstrmojo.architect.menu.EnumMenuActions");var $MNU_ACTIONS=mstrmojo.architect.menu.EnumMenuActions,ENUM_ACTION_ADD_TO_TRANSFORMATION=$MNU_ACTIONS.ADD_TO_TRANSFORMATION,STR_ADD_TO_TRANSFORMATION="Add to transformation";mstrmojo.architect.menu.TransformationAttributeListMenu=mstrmojo.declare(mstrmojo.architect.menu.ArchitectMenu,null,{scriptClass:"mstrmojo.architect.menu.TransformationAttributeListMenu",cm:[{action:ENUM_ACTION_ADD_TO_TRANSFORMATION,n:STR_ADD_TO_TRANSFORMATION,icn:"rnm"}],executeCommand:function executeCommand(item){var data=this.data,rootController=mstrApp.getRootController();switch(item.action){case ENUM_ACTION_ADD_TO_TRANSFORMATION:rootController.addAttributeToTransformation(data.attributeId,data.n);break;}}});}());