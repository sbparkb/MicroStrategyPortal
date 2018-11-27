(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.Label","mstrmojo.HBox","mstrmojo.TextBox","mstrmojo.RadioList","mstrmojo.Button","mstrmojo.ui.Pulldown","mstrmojo.Refine.RefineConstants");mstrmojo.requiresDescs(134,12361,13574,14178,14179,12348);var constants=mstrmojo.Refine.RefineConstants;var diConstants=mstrmojo.DI.DIConstants;var _C=mstrmojo.css;function applyOperations(){var i=1,j,unique,operations=[],operation,transformation,columns,index,columnName,transformationList,idx,targetColumn,newColumnName,columnIndex;transformation=this.parent;columns=transformation.columns;index=columns.selectedIndex;columnIndex=columns.items[columns.selectedIndex].columnIndex;if(index===undefined){return ;}columnName=(columns.items[index]).name;transformationList=transformation.transformationList;idx=transformationList.subType%10;if(idx===0){var controller=mstrApp.getRootController();var dialog=controller.showDialog(diConstants.dialogType.refineClusteringPage,{columnName:columnName,controller:this.controller});this.controller.model.attachEventListener("clustersFetched",dialog.id,dialog.handleClustersFetched);return ;}while(true){newColumnName=columnName+" "+i;unique=true;for(j=0;j<columns.items.length;j++){if(newColumnName===(columns.items[j]).name){unique=false;break;}}i++;if(unique){targetColumn=newColumnName;break;}}switch(idx){case 1:operation=JSON.parse(JSON.stringify(this.operations.duplicate));operation.description=operation.description.replace("[new column name]",targetColumn);operation.description=operation.description.replace("[column name]",columnName);operation.columnInsertIndex=columnIndex+1;operation.newColumnName=operation.newColumnName.replace("[column name]",targetColumn);operation.baseColumnName=operation.baseColumnName.replace("[column name]",columnName);break;case 2:targetColumn=this.optionsBox.name.value;if(targetColumn===""){mstrmojo.alert(mstrmojo.desc(13574,"Please fill out all fields before apply."));return ;}operation=JSON.parse(JSON.stringify(this.operations.Rename));operation.description=operation.description.replace("####",columnName);operation.description=operation.description.replace("@@@@",targetColumn);operation.oldColumnName=columnName;operation.newColumnName=targetColumn;break;case 3:var columnIndex2=this.optionsBox.columns.selectedIndex;if(columnIndex2===undefined){mstrmojo.alert(mstrmojo.desc(13574,"Please fill out all fields before apply."));return ;}var columnName2=(this.optionsBox.columns.items[columnIndex2]).name;operation=JSON.parse(JSON.stringify(this.operations.ConcatenateColumns));operation.description=operation.description.replace("####",columnName);operation.description=operation.description.replace("@@@@",columnName2);operation.description=operation.description.replace("@@@@",targetColumn);operation.baseColumnName=columnName;operation.newColumnName=targetColumn;operation.columnInsertIndex=Math.max(columnIndex,columnIndex2)+1;operation.expression=operation.expression.replace(new RegExp("\\[column name 1\\]","gm"),columnName);operation.expression=operation.expression.replace(new RegExp("\\[column name 2\\]","gm"),columnName2);break;case 4:var keyColumn=this.optionsBox.name2.value;var valueColumn=this.optionsBox.name3.value;var localColumns=this.optionsBox.columns;if(localColumns.selectedIndex===undefined||!keyColumn||!localColumns){mstrmojo.alert(mstrmojo.desc(13574,"Please fill out all fields before apply."));return ;}var count=localColumns.items[localColumns.selectedIndex].columnIndex-columnIndex+1;operation=JSON.parse(JSON.stringify(this.operations.TransposeColumnsIntoRows));operation.description=operation.description.replace("####",count);operation.description=operation.description.replace("@@@@",columnName);operation.description=operation.description.replace("@@@@",keyColumn);operation.description=operation.description.replace("@@@@",valueColumn);operation.startColumnName=columnName;operation.keyColumnName=keyColumn;operation.valueColumnName=valueColumn;operation.columnCount=count;}if(!(idx===2||idx===4)){operation.engineConfig=JSON.parse(this.controller.model.engine);}operations.push(operation);this.controller.applyOperations({operations:JSON.stringify(operations),engine:JSON.stringify({facets:[],mode:"row-based"})});this.optionsBox.name.set("value","");}mstrmojo.Refine.RefineControlOther=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.Refine.RefineControlOther",markupString:'<div class="refine-controls"><div></div></div>',markupSlots:{optionsNode:function(){return this.domNode.children[0];}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";},onsubTypeChange:function(){if(this.subType===70||this.subType===71){this.optionsBox.apply.onclick();}if(this.subType===74){var columns=this.parent.columns;var index=columns.selectedIndex;var columnIndex=columns.items[index].columnIndex;this.populate(this.columns.slice(columnIndex+1),columnIndex+1);this.handleColumnUnSelected();}else{if(this.subType===73){this.populate(this.columns);this.handleColumnUnSelected();}}}},operations:null,bindings:{visible:function(){return(this.parentBox.transformationList.type===constants.transformationType.Other);},subType:function(){return((this.parentBox.transformationList.type===constants.transformationType.Other)?this.parentBox.transformationList.subType:-1);}},children:[{scriptClass:"mstrmojo.HBox",slot:"optionsNode",alias:"optionsBox",children:[{scriptClass:"mstrmojo.Refine.RefineSearchablePulldown",alias:"columns",cssClass:"refine-pulldown refine-other-columns",onitemSelected:function(item){_C.toggleClass(this.domNode,"selected",true);this.set("value",item.name);},bindings:{visible:function(){return(this.parent.parent.parentBox.transformationList.subType%10===3||this.parent.parent.parentBox.transformationList.subType%10===4);}},getPopupListConfig:function getpopupListConfig(){return{scriptClass:"mstrmojo.ui.PopupList",alias:"list",useRichTooltip:true,selectionPolicy:"reselect",locksHover:true,listHooks:{select:function select(el,item,index){this.parent.set("selectedIndex",index);this.close();}},getItemProps:function getItemProps(item,idx){return mstrmojo._IsList.getItemProps.call(this,item,idx);}};}},{scriptClass:"mstrmojo.TextBox",alias:"name",emptyText:mstrmojo.desc(12361,"Column Name"),tooltip:mstrmojo.desc(12361,"Column Name"),bindings:{visible:function(){return(this.parent.parent.parentBox.transformationList.subType%10===2);}}},{scriptClass:"mstrmojo.TextBox",alias:"name2",emptyText:mstrmojo.desc(14178,"Key Column"),tooltip:mstrmojo.desc(14178,"Key Column"),bindings:{visible:function(){return(this.parent.parent.parentBox.transformationList.subType%10===4);}}},{scriptClass:"mstrmojo.TextBox",alias:"name3",emptyText:mstrmojo.desc(14179,"Value Column"),tooltip:mstrmojo.desc(14179,"Value Column"),bindings:{visible:function(){return(this.parent.parent.parentBox.transformationList.subType%10===4);}}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton hot",text:mstrmojo.desc(134,"Apply"),alias:"apply",onclick:function(){applyOperations.call(this.parent.parent);},bindings:{visible:function(){return(this.parent.parent.parentBox.transformationList.subType%10!==0&&this.parent.parent.parentBox.transformationList.subType%10!==1);}}}]}],populate:function populate(columns,slice){if(!slice){slice=0;}var items=[],i;for(i=0;i<columns.length;i++){items.push({n:columns[i].name,name:columns[i].name,columnIndex:i+slice});}this.optionsBox.columns.set("items",items);},handleColumnsChanged:function handleColumnsChanged(event){this.columns=event.value.columns;this.populate(this.columns);},handleColumnUnSelected:function(){this.optionsBox.columns.set("value",mstrmojo.desc(12348,"Select Column"));this.optionsBox.columns.selectedIndex=undefined;this.optionsBox.columns.list.set("selectedIndex",null);_C.toggleClass(this.optionsBox.columns.domNode,"selected",false);}});}());