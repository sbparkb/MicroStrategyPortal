(function(){mstrmojo.requiresCls("mstrmojo.Editor");mstrmojo.requiresDescs(221,1442,12389,12999);var $ARR=mstrmojo.array,$DESC=mstrmojo.desc;mstrmojo.DI.DIPartitionGroupDialog=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.DI.DIPartitionGroupDialog",cssClass:"mstrmojo-di-partitiongroup-dialog",title:mstrmojo.desc(12999,"Partitioned Tables"),groups:null,callback:null,zIndex:1000,onOpen:function onOpen(){var groups=this.groups,items=[];$ARR.forEach(groups,function(group){items.push({n:group.tableNames.join(", ")});});this.content.set("items",items);},onPreClose:function onPreClose(){this.onCancel();return true;},onOK:function onOK(){mstrApp.getRootController().partitionController.addMultiPartitions(this.groups,this.callback);},onCancel:function onCancel(){var callback=this.callback;if(callback&&callback.onCancel){callback.onCancel();}},children:[{scriptClass:"mstrmojo.Label",text:$DESC(12389,"The following tables have the same set of objects. Do you want to group these partition tables into a single table?")},{scriptClass:"mstrmojo.WidgetList",cssClass:"partitiongroup-list",alias:"content",itemFunction:function(item,index,list){return new mstrmojo.Label({text:"- "+item.n});}}],buttons:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton hot",text:$DESC(219,"Yes"),onclick:function onclick(){var dialog=this.parent.parent;if(dialog.onOK){dialog.onOK();}dialog.close();}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton",text:$DESC(218,"No"),onclick:function onclick(){var dialog=this.parent.parent;if(dialog.onCancel){dialog.onCancel();}dialog.close();}}]});}());