(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.dom","mstrmojo.Refine.FileSaver");mstrmojo.requiresDescs(14184,2177,2400,3474,14243);var $DOM=mstrmojo.dom;mstrmojo.Refine.RefineExtractDialog=mstrmojo.declare(mstrmojo.Container,[mstrmojo._IsPopup,mstrmojo._IsMovable],{scriptClass:"mstrmojo.Refine.RefineExtractDialog",markupString:'<div id="{@id}" class="refine-extract-dialog"><div class="refine-extract-dialog-header">'+mstrmojo.desc(14184,"Extract History Script")+'</div><div class="refine-extract-dialog-body"><div class="refine-extract-dialog-left"><div class="refine-extract-dialog-entries"></div></div><div class="refine-extract-dialog-input"></div></div><div class="refine-extract-dialog-footer"><div class="refine-extract-dialog-close"></div><div class="refine-extract-dialog-save"></div><div class="refine-clustering-dialog-selectall"></div><div class="refine-clustering-dialog-unselectall"></div></div></div>',markupSlots:{editorNode:function(){return this.domNode;},headerNode:function(){return this.domNode.firstChild;},entriesNode:function(){return this.domNode.children[1].children[0].children[0];},inputNode:function(){return this.domNode.children[1].children[1];},closeNode:function(){return this.domNode.children[2].children[0];},saveNode:function(){return this.domNode.children[2].children[1];},selectAllNode:function(){return this.domNode.children[2].children[2];},unselectAllNode:function(){return this.domNode.children[2].children[3];}},markupMethods:{onzIndexChange:function(){this.domNode.style.zIndex=this.zIndex;}},getMovingHandle:function getMovingHandle(){return this.headerNode;},getMovingTarget:function getMovingTarget(){return this.editorNode;},preBuildRendering:function preBuildRendering(){this.placeholder=document.body.appendChild(document.createElement("div"));return this._super();},postBuildRendering:function postBuildRendering(){this.operations=this.controller.model.getCurrentOperations();this.entriesTable.populateData(this.operations);this.updateJson(this.operations);return this._super();},updateJson:function updateJson(json){var a=[];for(var i=0;i<json.entries.length;i++){var entry=json.entries[i];if("operation" in entry&&entry.selected){a.push(entry.operation);}}this.textArea.set("value",JSON.stringify(a,null,2));},children:[{scriptClass:"mstrmojo.Table",slot:"entriesNode",alias:"entriesTable",populateData:function(operations){if(!operations.entries.length){return ;}this.removeChildren();this.unrender();this.rows=operations.entries.length;this.cols=2;var i;var checkNode={scriptClass:"mstrmojo.CheckBox",oncheckedChange:function(){this.entry.selected=this.checked;this.parent.parent.updateJson(operations);}};var textNode={scriptClass:"mstrmojo.Label"};for(i=0;i<this.rows;i++){var entry=operations.entries[i];checkNode.slot=i+",0";checkNode.entry=entry;checkNode.checked=entry.selected;this.addChildren(checkNode);textNode.slot=i+",1";textNode.text=entry.description;this.addChildren(textNode);}this.render();this.updateCellClass();},updateCellClass:function(){var rows=this.domNode.firstChild.children;var row=rows[0];var cells=row.children;cells[0].className="refine-extract-checkbox";cells[1].className="refine-extract-text";}},{scriptClass:"mstrmojo.TextArea",slot:"inputNode",alias:"textArea",maxLength:undefined},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",alias:"close",slot:"closeNode",text:mstrmojo.desc(2177,"Close"),onclick:function(){this.parent.destroy();}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton hot",alias:"save",slot:"saveNode",text:mstrmojo.desc(2400,"Save"),bindings:{visible:function(){return mstrApp.isSingleTier||!mstrmojo.dom.isSafari;}},onclick:function(){if(mstrApp.isSingleTier){window.FormWrapper.saveDWHistoryList(this.parent.textArea.value);}else{mstrmojo.Refine.FileSaver.saveTextAs(this.parent.textArea.value,"Data Wrangling Script.txt");}}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",alias:"selectAll",slot:"selectAllNode",visible:false,text:mstrmojo.desc(3474,"Select All"),onclick:function(){var operations=this.parent.operations;for(var i=0;i<operations.entries.length;i++){var entry=operations.entries[i];entry.selected=true;}this.parent.entriesTable.populateData(operations);this.parent.updateJson(operations);}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",alias:"unselectAll",slot:"unselectAllNode",visible:false,text:mstrmojo.desc(14243,"Unselect All"),onclick:function(){var operations=this.parent.operations;for(var i=0;i<operations.entries.length;i++){var entry=operations.entries[i];entry.selected=false;}this.parent.entriesTable.populateData(operations);this.parent.updateJson(operations);}}]});}());