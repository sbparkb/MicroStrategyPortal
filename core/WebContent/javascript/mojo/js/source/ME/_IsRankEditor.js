(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.ME.RepeatPulldownList","mstrmojo.ME.DerivedFunctionWizard","mstrmojo.ME._DerivedMetricEditorHelper","mstrmojo.RadioList");mstrmojo.requiresDescs(518,959,1885,1886,2789,11569,12170,12171,12172,12173,12176,12177,12179);var DESC=mstrmojo.desc;var _setDirty=function(w){if(w.onmetricModify){w.onmetricModify();}};var _PROPFunction=function(d){var n={ValueList:DESC(2789,"Rank"),ASC:DESC(12170,"Rank Order"),ByValue:DESC(12171,"Display As"),NullInclude:DESC(12172,"Treat Null Value As"),BreakBy:DESC(12173,"Break By")}[d.n];return{scriptClass:"mstrmojo.Label",markupString:'<div id="{@id}" class="mstrmojo-DataRow-text"title="'+(d.desc||"")+'"></div>',alias:"labelWidget",text:n+(d.isParam?"*":"")+":"};};mstrmojo.ME._IsRankEditor=mstrmojo.provide("mstrmojo.ME._IsRankEditor",{fctArgsDataGridCssClass:"functionArgs rank",getPROPBuilder:function getDTPBuilder(){return _PROPFunction;},getDTPBuilder:function getDTPBuilder(){var editor=this;return function(d){var w=null;if(d.isParam){w=editor.getParamWidget(d);}else{switch(d&&d.dtp){case 11:case 3:switch(d.n){case"ASC":w={scriptClass:"mstrmojo.Pulldown",cssClass:"asc mstrmojo-ME-Pulldown",popupCssClass:"mstrmojo-ME-Pulldown-Popup",items:[{n:DESC(1885,"Ascending"),did:-1},{n:DESC(1886,"Descending"),did:0}],popupToBody:true,itemIdField:"did",postCreate:function(){var d=this.data;this.value=!!d.v?(d.v==="False"?0:-1):(d.dfv||0);},getTokens:function(){var d=this.data;if(this.value!==d.dfv){return[{v:d.n},{v:"=",isDelimiter:true},{v:this.value===-1?"True":"False"}];}return[];},onvalueChange:function(){_setDirty(this.parent.dataGrid.parent);}};break;case"ByValue":w={scriptClass:"mstrmojo.RadioListHoriz",itemIdField:"did",items:[{n:DESC(13536,"Number (1,2,3)"),did:-1},{n:DESC(12175,"Percentage (10%,50%,100%)"),did:0}],postCreate:function(){var d=this.data;var v=!!d.v?(d.v==="False"||parseInt(d.v,10)===0?0:-1):(d.dfv||0);this.set("selectedIndex",mstrmojo.array.find(this.items,this.itemIdField,v));},onselectionChange:function(evt){if(evt.removed.length===1){_setDirty(this.parent.dataGrid.parent);}},getTokens:function(){var d=this.data,v=this.selectedItem[this.itemIdField];if(v!==d.dfv){return[{v:d.n},{v:"=",isDelimiter:true},{v:v===-1?"True":"False"}];}return[];}};break;case"NullInclude":w={scriptClass:"mstrmojo.Pulldown",cssClass:"mstrmojo-ME-Pulldown",popupCssClass:"mstrmojo-ME-Pulldown-Popup",items:[{n:DESC(959,"Default"),did:0},{n:DESC(12176,"First in rank"),did:-1},{n:DESC(12177,"Last in rank"),did:1}],itemIdField:"did",postCreate:function(){var d=this.data;this.value=d.v||d.dfv;},getTokens:function(){var d=this.data;if(this.value!==d.dfv){return[{v:d.n},{v:"=",isDelimiter:true},{v:this.value}];}return[];},onvalueChange:function(){_setDirty(this.parent.dataGrid.parent);}};break;}break;case -2:w=editor.getBreakByWidget(d);break;}}w.alias="inputWidget";return w;};}});}());