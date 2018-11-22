(function(){mstrmojo.requiresCls("mstrmojo.Label","mstrmojo.Pulldown","mstrmojo.ME.ObjectInputBox","mstrmojo.ME.MetricDataService","mstrmojo.ME.Enum");mstrmojo.requiresDescs(1107,12178);var E=mstrmojo.expr,DYNAMIC_DIMTY=mstrmojo.ME.Enum.DYNAMIC_DIMTY;mstrmojo.ME.LevelInputBox=mstrmojo.declare(mstrmojo.ME.ObjectInputBox,null,{cssClass:"mstrmojo-ME-ObjectInputBox-level",oncandidatesChange:function _set_candidates(evt){this.candidates.items=DYNAMIC_DIMTY.getItems("level").concat(this.candidates.items);},hidePulldownButton:function(){return !this.isDME;},hideItemWidgetBrowseButton:function(){return this.isDME;},folderLinksContextId:16,browsableTypes:[E.TP.FOLDER,E.TP.ATTR,E.TP.DIM].join(","),getCandidatesThroughTaskCall:function getCandidatesThroughTaskCall(params,callbacks){params.rootFolderType=39;params.blockCount=this.blockCount;mstrmojo.ME.MetricDataService.getAttributes(params,callbacks);},itemFunction:function itemFunction(item,idx,w){item.filtering=item.filtering||1;item.grouping=item.grouping||1;var c=this._super(item,idx,w,mstrmojo.ME.LevelObjectItem);c.optionButtonVisible=true;return c;},updateSuggestion:function updateSuggestion(its){its=[{n:this.isDME?mstrmojo.desc(12178,"Visualization level"):mstrmojo.desc(1107,"Report Level"),did:-1,t:-1,state:0}].concat(its);if(this._super){this._super(its);}},add:function add(arr,at){var toAdd=true,items=this.items;mstrmojo.array.forEach(arr,function(oi){mstrmojo.array.forEach(items,function(item){if(item.did&&item.did===oi.did){toAdd=false;return false;}});});if(toAdd){this._super(arr,at);}}});mstrmojo.ME.LevelObjectItem=mstrmojo.declare(mstrmojo.ME.ObjectItem,[mstrmojo._HasPopup],{optsRef:{scriptClass:"mstrmojo.Editor",title:mstrmojo.desc(9598,"Level Options"),cssText:"width: 450px;",onOpen:function onOpen(){var d=this.opener.data;this.filterOption.set("value",d.filtering);this.groupOption.set("value",d.grouping);},children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(9599,"Relationship with Report Filter:")},{scriptClass:"mstrmojo.Pulldown",alias:"filterOption",itemField:"n",itemIdField:"did",items:[{n:mstrmojo.desc(9600,"Standard - Metric calculates only for elements found in the filter"),did:1},{n:mstrmojo.desc(9601,"Absolute - Raises the calculation to the selected level, if possible"),did:2},{n:mstrmojo.desc(9602,"Ignore - Omit filtering criteria based on selected level and its related attributes"),did:3},{n:mstrmojo.desc(9603,"None - Unspecified - the selected level and group components define the filter"),did:4}]},{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(9604,"Metric Aggregations:")},{scriptClass:"mstrmojo.Pulldown",alias:"groupOption",itemField:"n",itemIdField:"did",items:[{n:mstrmojo.desc(9605,"Standard - Metric calculates at the selected level, if possible"),did:1},{n:mstrmojo.desc(9606,"None - Exclude the selected level and children from the GROUP BY clause in the SQL"),did:2},{n:mstrmojo.desc(9607,"Beginning lookup - Use the first value of the lookup table"),did:3},{n:mstrmojo.desc(9608,"Ending lookup - Use the last value of the lookup table"),did:4},{n:mstrmojo.desc(9609,"Beginning fact - Use the first value of the fact table"),did:5},{n:mstrmojo.desc(9610,"Ending fact - Use the last value of the fact table"),did:6}]},{scriptClass:"mstrmojo.HBox",slot:"buttonNode",cssText:"float:right;margin: 5px 0px;",children:[{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",text:mstrmojo.desc(1442,"OK"),onclick:function(){var e=this.parent.parent,o=e.opener;if(o.saveOnClose){o.saveOnClose(e.filterOption.value,e.groupOption.value);}e.close();}},{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",text:mstrmojo.desc(221,"Cancel"),onclick:function(){var e=this.parent.parent;e.close();}}]}]},saveOnClose:function saveOnClose(fv,gv){var d=this.data;d.filtering=fv;d.grouping=gv;if(this.parent.onSaveOnClose){this.parent.onSaveOnClose();}},options:function options(){this.openPopup("optsRef",{title:'"'+this.data[this.itemField]+'" '+mstrmojo.desc(9598,"Level Options"),zIndex:40});}});}());