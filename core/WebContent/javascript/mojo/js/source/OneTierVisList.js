(function(){mstrmojo.requiresCls("mstrmojo.DynamicClassFactory","mstrmojo._CanSupportTransaction","mstrmojo._IsEditableXtab","mstrmojo.heatmap.vi.VisHeatMap","mstrmojo.gm.VisGraphMatrix","mstrmojo.esrimap.ESRIMapOIVM","mstrmojo.netviz.VisNetwork","mstrmojo.VisTimeline","mstrmojo.SurveyVis","mstrmojo.VisDateSelection");var VIS_LIST={NetworkVisualizationStyle:{vib:"vi-network.js",oivmb:"oivm-network.js",b:"vi-network.js",s:"VisualizationServerJsonDataStyle",c:"netviz.VisNetwork"},GraphMatrixVisualizationStyle:{vib:"vi-gm.js",oivmb:"oivm-gm.js",b:"vi-gm.js",s:"VisualizationServerJsonDataStyle",c:"gm.VisGraphMatrix"},SurveyVisualizationStyle:{s:"VisualizationDataStyle",c:"SurveyVis"},ReportTimelineAjaxVisualizationStyle:{s:"TimelineMojoVisualizationDataStyle",c:"VisTimeline"},VIHeatMapVisualizationStyle:{vib:"vi-heatmap.js",oivmb:"oivm-heatmap.js",b:"vi-heatmap.js",s:"VisualizationServerJsonDataStyle",c:"heatmap.vi.VisHeatMap"},visAjaxDatePicker:{s:"AjaxDatePickerReportStyle",c:"VisDateSelection"},ESRIMapVisualizationStyle:{b:"mojo-map.js",s:"MojoXtabMapStyle",c:"esrimap.ESRIMapOIVM"}};mstrmojo.OneTierVisList=mstrmojo.provide("mstrmojo.OneTierVisList",{getVis:function getVis(styleName){return VIS_LIST[styleName]||(mstrConfig&&mstrConfig.pluginsVisList&&mstrConfig.pluginsVisList[styleName])||null;},getVisClass:function getVisClass(cls,defn){if(defn.txi&&defn.t===115){cls=mstrmojo.DynamicClassFactory.newComponent(cls,[mstrmojo._CanSupportTransaction,mstrmojo._IsEditableXtab]);}return cls;}});}());