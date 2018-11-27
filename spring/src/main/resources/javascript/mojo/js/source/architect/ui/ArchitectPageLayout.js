(function(){mstrmojo.requiresCls("mstrmojo.ui.Splitter","mstrmojo.warehouse.WHPanel","mstrmojo.architect.ui.MainSplitter","mstrmojo.architect.ui._HasSplitterStoredLayout","mstrmojo.hash");var $H=mstrmojo.hash,FIRST_ITEM_SLOT="firstSplitNode",SECOND_ITEM_SLOT="secondSplitNode";function getDefaultConfig(cfg){var firstSplitValue=(cfg&&cfg.fv)||{},secondSplitValue=(cfg&&cfg.sv)||{};return $H.clone({firstSplit:{v:firstSplitValue.v||"230px",min:firstSplitValue.min||"150px"},secondSplit:{v:secondSplitValue.v||"100%",min:secondSplitValue.min||"150px"},resizeHandle:{v:"2px"}});}mstrmojo.architect.ui.ArchitectPageLayout=mstrmojo.declare(mstrmojo.ui.Splitter,[mstrmojo.architect.ui._HasSplitterStoredLayout],{init:function init(props){var wls=window.localStorage,browserSettings=(wls&&wls.getItem("initialSettings"))||null,settings=JSON.parse(browserSettings);this.config=getDefaultConfig({sv:{min:"300px"}});if(settings&&settings.splittersLayouts&&settings.splittersLayouts.layoutWidget){this.config=settings.splittersLayouts.layoutWidget;}else{this.children[1].config=getDefaultConfig({});}this._super(props);},mainSplitter:null,contentSplitter:null,toggleDatabaseView:function toggleDatabaseView(show){this.toggleFirstItemVisibility(show);},toggleProjectTableView:function toggleProjectTableView(show){this.mainSplitter.toggleFirstItemVisibility(show);},switchView:function switchView(newViewType){this.mainSplitter.switchView(newViewType);},closeViewObject:function closeViewObject(){this.mainSplitter.closeViewObject();},updateViewObjectName:function updateViewObjectName(itemID,itemName){this.mainSplitter.updateViewObjectName(itemID,itemName);},toggleViewList:function toggleViewList(){this.mainSplitter.toggleViewList();},children:[{scriptClass:"mstrmojo.warehouse.WHPanel",slot:FIRST_ITEM_SLOT},{scriptClass:"mstrmojo.architect.ui.MainSplitter",cssClass:"paddedPanel",alias:"mainSplitter",slot:SECOND_ITEM_SLOT}]});}());