(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.Label","mstrmojo.Widget","mstrmojo.WidgetList","mstrmojo.Refine.RefineHelpers","mstrmojo.hash");var $H=mstrmojo.hash;var RefineHelpers=mstrmojo.Refine.RefineHelpers;mstrmojo.requiresDescs(8953);function getPreviewValue(value,separator,suggestion_subtype,startOffset,endOffset){var arr,v=[],k,idx,str,pos,regex;if(suggestion_subtype===0){if(startOffset!==-1&&endOffset!==-1){if(value.length>endOffset){v.push(value.substring(0,startOffset));v.push(value.substring(startOffset,endOffset));v.push(value.substring(endOffset));}else{if(value.length>startOffset){v.push(value.substring(0,startOffset));v.push(value.substring(startOffset));}else{v.push(value);}}}else{if(startOffset===-1){if(value.length>endOffset){v.push(value.substring(0,endOffset));v.push(value.substring(endOffset));}else{v.push(value);}}else{if(value.length>startOffset){v.push(value.substring(0,value.length-startOffset));v.push(value.substring(value.length-startOffset));}else{v.push("");v.push(value);}}}}else{if(suggestion_subtype===1){arr=value.split(separator);for(k=0;k<arr.length;k++){v.push(arr[k]);}}else{if(suggestion_subtype===2){if(value.match(separator)){str=value.match(separator)[0];idx=value.search(separator);pos=str.length+idx;v.push(value.substring(0,pos));v.push(value.substring(pos));}else{v.push(value);}}else{if(suggestion_subtype===3){if(value.match(separator)){pos=value.search(separator);v.push(value.substring(0,pos));v.push(value.substring(pos));}else{v.push(value);}}else{if(suggestion_subtype===4){if(value.match(separator)){v.push(value.match(separator)[0]);}}else{if(suggestion_subtype===5){if(value.match(separator)){str=value.match(separator)[0];idx=value.search(separator);pos=str.length+idx;v.push(value.substring(pos));}}else{if(suggestion_subtype===6){if(value.match(separator)){pos=value.search(separator);v.push(value.substring(0,pos));}else{v.push(value);}}else{if(suggestion_subtype===7){regex=new RegExp(separator.source,"g");v.push(value.replace(regex,""));}else{if(suggestion_subtype===8){if(value.match(separator)){str=value.match(separator)[0];idx=value.search(separator);pos=str.length+idx;v.push(value.substring(0,pos));}else{v.push(value);}}else{if(suggestion_subtype===9){if(value.match(separator)){pos=value.search(separator);v.push(value.substring(pos));}else{v.push(value);}}}}}}}}}}}return v;}function getColumnNumber(cellIndex,separator,rows,suggestion_subtype,startOffset,endOffset){var i,columnNumber=0,cells,value,arr;if(suggestion_subtype===0){if(startOffset!==-1&&endOffset!==-1){return 3;}else{return 2;}}else{if(suggestion_subtype===1){for(i=0;i<rows.length;i++){cells=rows[i].cells;if(cells[cellIndex]){value=cells[cellIndex].v;arr=value.toString().split(separator);columnNumber=Math.max(arr.length,columnNumber);}}}else{if(suggestion_subtype===2){return 2;}else{if(suggestion_subtype===3){return 2;}else{if(suggestion_subtype===4){return 1;}else{if(suggestion_subtype===5){return 1;}else{if(suggestion_subtype===6){return 1;}else{if(suggestion_subtype===7){return 1;}else{if(suggestion_subtype===8){return 1;}else{if(suggestion_subtype===9){return 1;}}}}}}}}}}return columnNumber;}function getColumns(columnNumber,columnName,suggestion_subtype,columns){var newColumns=[],i,j,column;switch(suggestion_subtype){case 0:case 1:case 2:case 3:for(i=0;i<columnNumber;i++){column={};if(columnNumber>4&&i>=2&&i<=columnNumber-1){if(i===2){column.suggestionPreview=true;column.cellIndex=i;column.name="...";column.columnNumber=(columnNumber>4?4:columnNumber);newColumns.push(column);}if(i===columnNumber-1){column.suggestionPreview=true;column.cellIndex=3;column.name="New Column "+i;column.columnNumber=(columnNumber>4?4:columnNumber);newColumns.push(column);}continue;}column.suggestionPreview=true;column.cellIndex=i;column.name="New Column "+i;column.columnNumber=(columnNumber>4?4:columnNumber);newColumns.push(column);}break;case 4:case 5:case 6:var newColumnName,unique,newColumn;column={};i=1;while(true){newColumnName=columnName+" "+i;unique=true;for(j=0;j<columns.length;j++){if(newColumnName===columns[j].name){unique=false;break;}}i++;if(unique){newColumn=newColumnName;break;}}column.suggestionPreview=true;column.cellIndex=0;column.name=newColumn;column.columnNumber=1;newColumns.push(column);break;case 7:case 8:case 9:column={};column.suggestionPreview=true;column.cellIndex=0;column.name=columnName;column.columnNumber=1;newColumns.push(column);break;}return newColumns;}function getPreviewData(cellIndex,separator,rows,suggestion_subtype,columnNumber,startOffset,endOffset){var i,j;for(i=0;i<rows.length;i++){var cells=rows[i].cells,cell={};var newCells=[];if(cells[cellIndex]){var valueArray=getPreviewValue(cells[cellIndex].v.toString(),separator,suggestion_subtype,startOffset,endOffset);for(j=0;j<columnNumber;j++){cell={};if(j<valueArray.length){cell.v=valueArray[j];}else{cell.v="";}if(columnNumber>4&&j>=2&&j<columnNumber-1){if(j===2){cell.v="...";}else{continue;}}cell.columnNumber=(columnNumber>4?4:columnNumber);newCells.push(cell);}}else{for(j=0;j<columnNumber;j++){cell={};cell.v="";if(columnNumber>4&&j>=2&&j<columnNumber-1){if(j===2){cell.v="...";}else{continue;}}cell.columnNumber=(columnNumber>4?4:columnNumber);newCells.push(cell);}}rows[i].cells=[].concat(newCells);}}function unHighlight(suggestion_type,suggestions){var controller=suggestions.controller;if(suggestion_type===1){controller.model.raiseEvent({name:"unPreviewSuggestion"});}suggestions.highlighted=false;}function handleMouseOut(evt){unHighlight(evt.src.data.suggestion_type,evt.src.suggestions);}function handleMouseOver(evt){var suggestions=evt.src.suggestions;var data=evt.src.data;var columns=JSON.parse(JSON.stringify(suggestions.columns));var datas=JSON.parse(JSON.stringify(suggestions.data));if(!suggestions.highlighted){var controller=suggestions.controller;if(data.suggestion_type===1){var newColumns,cellIndex,columnNumber;var column={};$H.copy(columns[data.index],column);cellIndex=column.cellIndex;columnNumber=getColumnNumber(cellIndex,data.separator,datas.rows,data.suggestion_subtype,data.startOffset,data.endOffset);newColumns=getColumns(columnNumber,column.name,data.suggestion_subtype,columns);getPreviewData(cellIndex,data.separator,datas.rows,data.suggestion_subtype,columnNumber,data.startOffset,data.endOffset);controller.model.raiseEvent({name:"previewSuggestion",columns:newColumns,data:datas,scrollTop:data.scrollTop,cellPos:suggestions.cellPos});}evt.src.suggestions.highlighted=true;}}mstrmojo.Refine.RefineSuggestions=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.Refine.RefineSuggestions",markupString:'<div id="{@id}" class="refine-suggestions"><div class="refine-suggestions-list"></div></div>',markupSlots:{listNode:function(){return this.domNode.children[0];}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},setDimensions:function setDimensions(h,w){var height=parseInt(h,10);var width=parseInt(w,10);if(isNaN(height)||isNaN(width)){return ;}if(!this.layoutConfig){this.layoutConfig={h:{},w:{}};}this.layoutConfig.h.listNode=(height-3)+"px";this.layoutConfig.w.listNode=(width)+"px";if(this._super){this._super((height)+"px",(width)+"px");}},highlighted:false,children:[{scriptClass:"mstrmojo.WidgetList",renderOnScroll:false,slot:"listNode",alias:"suggestions",itemFunction:function itemFunction(item,idx,w){var it=new mstrmojo.Widget({data:item,markupString:'<div class="list-item" mstrAttach:mouseover,mouseout>'+item.description+"</div>"});if(item.suggestion_type!==undefined){it.onmouseover=handleMouseOver;it.onmouseout=handleMouseOut;it.suggestions=w.parent;}return it;},populate:function populate(list){this.unrender();var operation,suggestion,suggestions=[];var controller=this.parent.controller;var model=controller.model;var facetPanel=controller.refinePanel.bottomPanal.splitter.facetPanel;if(facetPanel.hasSelection()){operation=JSON.parse(JSON.stringify(model.transformations.Delete.DeleteRowsInTheView));operation.engineConfig=facetPanel.getJSON();var requirement=facetPanel.getRequirementDiscription();operation.description=operation.description.replace("[Requirement]",requirement);suggestion=JSON.parse(JSON.stringify(model.suggestions.partialCell.deleteRows[1]));suggestion.operations=JSON.stringify([operation]);suggestions.push(suggestion);operation=JSON.parse(JSON.stringify(model.transformations.Delete.DeleteRowsNotInTheView));operation.engineConfig=facetPanel.getJSON();operation.description=operation.description.replace("[Requirement]",requirement);suggestion=JSON.parse(JSON.stringify(model.suggestions.partialCell.deleteRows[2]));suggestion.operations=JSON.stringify([operation]);suggestions.push(suggestion);list=suggestions.concat(list);}this.set("items",list);this.set("selectedIndex",-1);this.render();this.set("visible",list.length);this.parent.label.set("visible",!list.length);},onchange:function(event){var controller=this.parent.controller,facetPanel,params,ops,op;if(this.selectedIndex===-1){return ;}if(event.src.selectedItem.suggestion_type===2){facetPanel=controller.refinePanel.bottomPanal.splitter.facetPanel;facetPanel.resetAllFacets();}ops=JSON.parse(event.src.selectedItem.operations);if(ops&&ops.length){op=ops[0];}params={operations:event.src.selectedItem.operations,engine:JSON.stringify({facets:[],mode:"row-based"})};if(controller.model.hasAddSample()&&op&&(op.op==="core/fill-down"||op.op==="core/blank-down")){RefineHelpers.confirmFilldownOrBlankdown(function(){controller.applyOperations(params);});}else{controller.applyOperations(params);}unHighlight(this.selectedItem.suggestion_type,this.parent);},multiSelect:false,visible:false},{scriptClass:"mstrmojo.Label",slot:"listNode",alias:"label",cssClass:"refine-suggestions-label",text:mstrmojo.desc(8953,"Suggestions")}],populate:function populate(list){this.suggestions.populate(list);},handleDataChanged:function(event){this.data=event.value;},handleColumnsChanged:function(event){this.columns=event.value.columns;},handleGotSuggestions:function handleGotSuggestions(evt){this.populate(evt.list);if(evt.cellPos){this.cellPos=evt.cellPos;}},handleEmptySuggestions:function handleEmptySuggestions(){this.populate([]);}});}());