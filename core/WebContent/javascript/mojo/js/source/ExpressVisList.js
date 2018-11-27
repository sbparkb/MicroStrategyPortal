(function(){var VIS_LIST={NetworkVisualizationStyle:{vib:"vi-network.js",oivmb:"oivm-network.js",b:"vi-network.js",s:"VisualizationServerJsonDataStyle",c:"netviz.VisNetwork"},GraphMatrixVisualizationStyle:{vib:"vi-gm.js",oivmb:"oivm-gm.js",b:"vi-gm.js",s:"VisualizationServerJsonDataStyle",c:"gm.VisGraphMatrix"},SurveyVisualizationStyle:{s:"VisualizationDataStyle",c:"SurveyVis"},ReportTimelineAjaxVisualizationStyle:{s:"TimelineMojoVisualizationDataStyle",c:"VisTimeline"},VIHeatMapVisualizationStyle:{vib:"vi-heatmap.js",oivmb:"oivm-heatmap.js",b:"vi-heatmap.js",s:"VisualizationServerJsonDataStyle",c:"heatmap.vi.VisHeatMap"},visAjaxDatePicker:{s:"AjaxDatePickerReportStyle",c:"VisDateSelection"},ESRIMapVisualizationStyle:{b:"mojo-map.js",s:"MojoXtabMapStyle",c:"esrimap.ESRIMapOIVM"}};var WIDGET_VIS_MAP={"com.microstrategy.web.vf.viewer.DatePickerApplicationViewer":"visAjaxDatePicker","com.microstrategy.web.vf.viewer.EsriMapApplicationViewer":"ESRIMapVisualizationStyle","com.microstrategy.flex.viewer.NetViz":"NetworkVisualizationStyle","com.microstrategy.flex.viewer.GraphMatrixViewer":"GraphMatrixVisualizationStyle","com.microstrategy.web.vf.viewer.HeatMapApplicationViewer":"VIHeatMapVisualizationStyle"};mstrmojo.ExpressVisList=mstrmojo.provide("mstrmojo.ExpressVisList",{getVis:function getVis(styleName){return VIS_LIST[styleName]||(mstrConfig&&mstrConfig.pluginsVisList&&mstrConfig.pluginsVisList[styleName])||null;},findVisName:function(widgetName){return WIDGET_VIS_MAP[widgetName]||(mstrConfig&&mstrConfig.pluginsWidgetVisMap[widgetName])||null;},findWidgetName:function findWidgetName(visName){var wn;for(var i in WIDGET_VIS_MAP){if(WIDGET_VIS_MAP.hasOwnProperty(i)&&WIDGET_VIS_MAP[i]===visName){wn=i;break;}}if(!wn&&mstrConfig&&mstrConfig.pluginsWidgetVisMap){for(var i in mstrConfig.pluginsWidgetVisMap){if(mstrConfig.pluginsWidgetVisMap.hasOwnProperty(i)&&mstrConfig.pluginsWidgetVisMap[i]===visName){wn=i;break;}}}return wn;},getVisClass:function getVisClass(cls,defn){if(defn.txi&&defn.t===115){cls=mstrmojo.DynamicClassFactory.newComponent(cls,[mstrmojo._CanSupportTransaction,mstrmojo._IsEditableXtab]);}return cls;}});}());