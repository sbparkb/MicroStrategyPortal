(function(){mstrmojo.requiresCls("mstrmojo.XMLParser","mstrmojo.array");var $ARR=mstrmojo.array;mstrmojo.customVisLoader=mstrmojo.provide("mstrmojo.customVisLoader",{loadVisualizations:function(pluginNames,isVisBuilderApp){var parser=new mstrmojo.XMLParser(),visualizations,styleCatalog,plugins={};pluginNames.forEach(function(pluginName){visualizations=parser.file2Object("../plugins/"+pluginName+"/WEB-INF/xml/config/visualizations.xml");styleCatalog=parser.file2Object("../plugins/"+pluginName+"/WEB-INF/xml/styleCatalog.xml");if(visualizations&&styleCatalog){visualizations["visualization-list"].forEach(function(visList){visList.visualization.forEach(function(item){if(!isVisBuilderApp&&(item.scope&16)===0){pluginNames[pluginName]="nonDashboard";return ;}var styleName=item["style-name"],id=styleName,requirement,dropZones,editorModel,widgetType,style;plugins[id]={};plugins[id].pn=pluginName;plugins[id].d=item.desc;plugins[id].s=item["style-name"];widgetType=item["widget-type"];if(widgetType){plugins[id].wtp=widgetType;}if(isVisBuilderApp){requirement=item.scope;if(requirement){plugins[id].scp=requirement;}}requirement=item["attribute-minimum"];if(requirement){plugins[id].ma=requirement;}requirement=item["metric-minimum"];if(requirement){plugins[id].mm=requirement;}dropZones=item["drop-zones"];if(dropZones){plugins[id].dz=dropZones;}editorModel=item["editor-model"];if(editorModel){plugins[id].em=editorModel;}style=$ARR.filterOne(styleCatalog.Styles[0].Style,function(elem){return elem.name===item["style-name"];});if(style){var className=$ARR.filterOne(style.ActualParameters[0].ActualParameter,function(elem){return elem.name==="mojoClassName";});if(className){plugins[id].c=className.value;}}});});}});return plugins;}});}());