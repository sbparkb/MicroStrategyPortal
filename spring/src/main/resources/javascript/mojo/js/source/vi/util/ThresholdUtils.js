(function(){mstrmojo.requiresCls("mstrmojo.threshold.ThresholdModel","mstrmojo.chart.model.enums.EnumDSSObjectType","mstrmojo.models.FormatModel");var $MOJO=mstrmojo,$DSSOBJ_TYPES=mstrmojo.chart.model.enums.EnumDSSObjectType,THRESHOLD_TYPE_LOWEST_PERCENTAGE=1,BAND_COLORS=["#97D2FC","#62B4EE","#2798EB","#2387CF","#1F77B4"],THRESHOLD_BANDS=[0.2,0.4,0.6,0.8],$FMT_MODEL=$MOJO.models.FormatModel,$FMT_PROPNAMES=$FMT_MODEL.ENUM_PROPERTY_NAMES;function addClearThresholdActions(model,templateThresholds,templateMetric,actions){templateThresholds.reverse().forEach(function(thresholdData){actions.push(model.getClearThresholdAction(templateMetric.did,templateMetric.t||$DSSOBJ_TYPES.DssTypeMetric,thresholdData.tid));});}mstrmojo.vi.util.ThresholdUtils=mstrmojo.provide("mstrmojo.vi.util.ThresholdUtils",{addClearAllThresholdsActions:function addClearAllThresholdsActions(model,node,actions){var gsi=node.data.gsi,metrics=gsi.mx,thresholds=gsi.thresholds,metricThreshold;if(thresholds){metrics.forEach(function(m){metricThreshold=thresholds[m.did];if(metricThreshold){addClearThresholdActions(model,metricThreshold,m,actions);}});gsi.thresholds={};}},addThresholds:function addThresholds(model,host,node,templateMetric,actions,colors,ranges,replaceExistingThreshold){var i,newThresholds=[],tModel=new mstrmojo.threshold.ThresholdModel({data:node.data}),thresholds=tModel.data.gsi.thresholds,existingThresholdsForMetric=thresholds&&thresholds[templateMetric.did];actions=actions||[];if(!existingThresholdsForMetric||replaceExistingThreshold){colors=colors||BAND_COLORS;ranges=ranges||THRESHOLD_BANDS;for(i=0;i<colors.length;i++){var t={};t.fmt=$FMT_MODEL.getFormatUpdate($FMT_PROPNAMES.BACKGROUND_COLOR,colors[i]);$FMT_MODEL.getFormatUpdate($FMT_PROPNAMES.FILL_STYLE,0,t.fmt);if(i>0){t.flr=tModel.getRealValue(ranges[i-1],THRESHOLD_TYPE_LOWEST_PERCENTAGE);}if(i<ranges.length){t.ceil=tModel.getRealValue(ranges[i],THRESHOLD_TYPE_LOWEST_PERCENTAGE);}newThresholds.push(t);}if(existingThresholdsForMetric){addClearThresholdActions(model,existingThresholdsForMetric,templateMetric,actions);}actions.push(model.getCreateSimpleThresholdAction(newThresholds,host.k,templateMetric.did,THRESHOLD_TYPE_LOWEST_PERCENTAGE,null,4));}tModel.destroy();return actions;}});}());