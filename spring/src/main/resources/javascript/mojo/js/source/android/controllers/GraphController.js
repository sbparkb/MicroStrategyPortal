(function(){mstrmojo.requiresCls("mstrmojo.android.controllers.ResultSetController","mstrmojo.android.controllers._IsReportController","mstrmojo.android.EnumMenuOptions");var MENUS=mstrmojo.android.EnumMenuOptions,MNU_SHARE=MENUS.SHARE,MNU_ANNOTATION=MENUS.ANNOTATION;mstrmojo.android.controllers.GraphController=mstrmojo.declare(mstrmojo.android.controllers.ResultSetController,[mstrmojo.android.controllers._IsReportController],{scriptClass:"mstrmojo.android.controllers.GraphController",initModel:function initModel(){return mstrApp.modelFactory.newModel("Graph",{controller:this});},createView:function createView(res,params){var graph=this.view=this.newView("Graph",params);graph.setModel(this.model);return graph;},hasPageBy:function hasPageBy(){var modelData=this.model&&this.model.data;return !!(modelData&&modelData.gd&&modelData.gd.pb);},reprompt:function reprompt(){this.repromptOrientation=mstrMobileApp.getOrientation();this._super();},afterReprompt:function afterReprompt(response){this.view.setGraphData(response);this._super(response);},onPageBy:function onPageBy(pageByKeys){var graph=this.view;this.model.pageBy(pageByKeys,{success:function(){graph.refresh();},failure:function(res){mstrApp.onerror(res);}});},setData:function setData(res){this.model.setData(res);this.view.refresh();},beforeViewVisible:function beforeViewVisible(isBackOperation){if(this.repromptFlag&&(this.repromptOrientation!==mstrMobileApp.getOrientation())&&isBackOperation){delete this.repromptFlag;delete this.repromptOrientation;this.refresh();}},beforeViewHidden:function beforeViewHidden(isBackOperation){mstrmojo.GraphBase.hideTooltips();},handleMenuItem:function handleMenuItem(group,cmdId){if(group!==MNU_SHARE&&group!==MNU_ANNOTATION){this.view.syncTooltips(0,0);}this._super(group,cmdId);}});}());