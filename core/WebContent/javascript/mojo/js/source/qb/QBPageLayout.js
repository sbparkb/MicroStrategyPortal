(function(){mstrmojo.requiresCls("mstrmojo.ui.Splitter","mstrmojo.qb.QBMappings");mstrmojo.requiresDescs(12735);var FIRST_ITEM_SLOT="firstSplitNode",SECOND_ITEM_SLOT="secondSplitNode";mstrmojo.qb.QBPageLayout=mstrmojo.declare(mstrmojo.ui.Splitter,null,{cssClass:"mstrmojo-qb-whole-panel",config:{firstSplit:{v:"20%",min:"150px",max:undefined},secondSplit:{v:"80%",min:"300px",max:undefined},resizeHandle:{v:"2px"}},getLayoutOffsets:function getLayoutOffsets(){return{w:36,h:0};},toggleDatabaseView:function toggleDatabaseView(show){this.toggleFirstItemVisibility(show);},toggleDataPreview:function toggleDataPreview(show){this.workPanel.toggleSecondItemVisibility(show);},children:[{scriptClass:"mstrmojo.warehouse.WHPanel",slot:FIRST_ITEM_SLOT,config:{firstSplit:{v:"40%",min:"100px"},secondSplit:{v:"60%",min:"100px"},resizeHandle:{v:"2px"}}},{scriptClass:"mstrmojo.ui.Splitter",cssClass:"mstrmojo-qb-main-panel",alias:"workPanel",slot:SECOND_ITEM_SLOT,orientation:mstrmojo.ui.Splitter.ENUM_OR.VERTICAL,getLayoutOffsets:function getLayoutOffsets(){return{h:0,w:12};},children:[{scriptClass:"mstrmojo.qb.QBPanel",slot:FIRST_ITEM_SLOT},{scriptClass:"mstrmojo.qb.QBMappings",alias:"mappingPanel",slot:SECOND_ITEM_SLOT}],config:{firstSplit:{v:"50%",min:"150px",max:undefined},secondSplit:{v:"50%",min:"150px",max:undefined},resizeHandle:{v:"5px"}}}]});}());