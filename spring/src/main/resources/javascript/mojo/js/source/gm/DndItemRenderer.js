(function(){mstrmojo.requiresCls("mstrmojo.vi.ui.VisualizationEditorUnitList");mstrmojo.gm.DndItemRenderer=mstrmojo.declare(mstrmojo.vi.ui.VisualizationEditorUnitList,null,{scriptClass:"mstrmojo.gm.DndItemRenderer",renderItem:function renderItem(item,idx){var ir=this.itemRenderer,fn=ir&&ir.render,node=document.createElement("div");node.innerHTML=fn(item,idx,this);return node.firstChild;}});}());