(function(){mstrmojo.requiresCls("mstrmojo.architect.ui.ProjectTablesPanel","mstrmojo.architect.ui.RelationPanel","mstrmojo.architect.ui.factories.ViewFactory","mstrmojo.architect.ui.panels.LayerListPanel","mstrmojo.architect.ui.panels.LayerPanel");mstrmojo.architect.ui.factories.LayerViewFactory=mstrmojo.declare(mstrmojo.architect.ui.factories.ViewFactory,null,{scriptClass:"mstrmojo.architect.ui.factories.LayerViewFactory",newLeftNavigationPanel:function newLeftNavigationPanel(params){return new mstrmojo.architect.ui.ProjectTablesPanel(params);},newTopEditorPanel:function newTopEditorPanel(params){return new mstrmojo.architect.ui.panels.LayerPanel(params);},newBottomEditorPanel:function newBottomEditorPanel(params){return new mstrmojo.architect.ui.RelationPanel(params);},newRightItemsPanel:function newRightItemsPanel(params){return new mstrmojo.architect.ui.panels.LayerListPanel(params);},closeObject:function closeObject(){if(this.views.editorTop){this.views.editorTop.closeObject();}},beforeLeave:function beforeLeave(){if(this.views.editorTop){this.views.editorTop.beforeLeave();}}});}());