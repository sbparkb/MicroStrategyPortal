(function(){mstrmojo.requiresCls("mstrmojo.Box","mstrmojo._HasPopup","mstrmojo.HBox","mstrmojo.TextBox","mstrmojo.Label","mstrmojo._IsPopup","mstrmojo._CanAutoClose","mstrmojo.ui.SimpleTree","mstrmojo.warehouse.EnumObjectTypes","mstrmojo.array","mstrmojo.css");var $ARR=mstrmojo.array,$CSS=mstrmojo.css;var $ENUM_OT=mstrmojo.warehouse.EnumObjectTypes,ENUM_OT_ATTRIBUTE=$ENUM_OT.ATTRIBUTE,ENUM_OT_METRIC=$ENUM_OT.METRIC,ENUM_OT_TABLE=$ENUM_OT.TABLE;mstrmojo.DI.DISearchTableBox=mstrmojo.declare(mstrmojo.Box,[mstrmojo._HasPopup],{scriptClass:"mstrmojo.DI.DISearchTableBox",cssClass:"mstrmojo-di-DISearchTableBox",children:[{scriptClass:"mstrmojo.HBox",cssClass:"",alias:"tableBox",children:[{scriptClass:"mstrmojo.TextBox",cssClass:"mstrmojo-di-tb-inputBox mstrmojo-wh-sb-input",alias:"inputBox",oldText:"",onkeydown:function onkeydown(){this.oldText=this.value;},onkeyup:function onkeyup(){var $this=this,input=this.value,clearBtn=this.parent.clearBtn,hasText=this._hasText=input.length>0;if(this.oldText!==input){$CSS.toggleClass(clearBtn.domNode,["clear"],hasText);$this.parent.parent.searchTableTree.searchTables(mstrmojo.string.trim(input));}},onclick:function onclick(evt){var searchTableBox=this.parent.parent,searchTableTree=searchTableBox.searchTableTree;if(!searchTableTree.visible){searchTableTree.searchTables(mstrmojo.string.trim(this.value));searchTableBox.openPopup("searchTableTree",{});}}},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-di-tb-clearBtn mstrmojo-wh-sb-btn",alias:"clearBtn",onclick:function onclick(){var p=this.parent,inputBox=p.inputBox,searchTableTree=p.parent.searchTableTree;if(inputBox._hasText){inputBox.set("value","");inputBox._hasText=false;$CSS.removeClass(this.domNode,["clear"]);searchTableTree.searchTables();}else{searchTableTree.searchTables();}}}]}],initChildren:function initChildren(){this.children.push({scriptClass:"mstrmojo.DI.DISearchTableTree",alias:"searchTableTree",cssClass:"mstrmojo-di-searchTableTree mstrmojo-wh-AvailableTablesTree mstrmojo-wh-TablesTree",visible:false,locksHover:true});this._super();},getPopupWidget:function getPopupWidget(){return this.searchTableTree;},getPopupHostNode:function getPopupHostNode(){return this.domNode;},getPopupConfig:function getPopupConfig(){var HOSTED_CSS_CLASS="mstrmojo-popup-widget-hosted",css=[HOSTED_CSS_CLASS],configCss=this.hostedCSSClass;if(configCss){css.push(configCss);}return new mstrmojo.ui.PopupConfig({hostId:this.id,hostElement:this.getPopupHostNode(),anchorElement:this[this.anchorSlot],isHostedWithin:this.isHostedWithin,hostProxyCssClass:css.join(" ")});},postBuildRendering:function postBuildRendering(){var popupWidget=this.getPopupWidget();if(popupWidget){var popupCfg=this.getPopupConfig();popupWidget.popupConfig=popupWidget.addDisposable(popupCfg);}return this._super();},openPopup:function(ref,config){var zIndex,style;this._super(ref,config);zIndex=mstrApp.getRootController().getDialogController().getCurrentZIndex()+10;style=this.domNode.style;if(zIndex!==style.zIndex){style.zIndex=zIndex;}},anchorSlot:"domNode",isHostedWithin:true,hostedCSSClass:""});mstrmojo.DI.DISearchTableTree=mstrmojo.declare(mstrmojo.ui.SimpleTree,[mstrmojo._IsPopup,mstrmojo._CanAutoClose],{scriptClass:"mstrmojo.DI.DISearchTableTree",cssClass:"mstrmojo-di-searchTableTree",getItemMarkup:function getItemMarkup(){return'<div class="{@cls}" title="{@ttp}"><span class=item-n>{@n}</span></div>';},getItemProps:function getItemProps(item,level,index){var rawName=item.n,name=mstrmojo.string.encodeHtmlString((rawName&&(rawName+""))||"");return{tag:"div",cls:"item "+(item.tp?("tp"+item.tp):""),n:name,idx:index};},searchTables:function searchTables(searchText){var controller=mstrApp.getRootController(),sources=controller.model.importSources,k,item,items=[],source,upperSearchText,matchedTables=[],matchedMaps=[],attrsMetrsArray,curMap,MAPPING_TYPES=[ENUM_OT_ATTRIBUTE,ENUM_OT_METRIC],matchedMappingItems=[],i,itemNum,itemNodes;searchText=searchText||"";upperSearchText=searchText.toUpperCase();for(k in sources){if(sources.hasOwnProperty(k)){source=sources[k];item={id:source.tableID,did:source.tableID,n:source.sourceInfo.name,tp:ENUM_OT_TABLE,isLeaf:true};if(!upperSearchText||item.n.toUpperCase().indexOf(upperSearchText)!==-1){matchedTables.push(item);}attrsMetrsArray=controller.getAttributesAndMetrics(source.tableID,upperSearchText);$ARR.forEach(attrsMetrsArray,function(mappings,i){if(!matchedMaps[i]){matchedMaps[i]={};}curMap=matchedMaps[i];$ARR.forEach(mappings,function(mapping){if(!curMap[mapping.alias]){curMap[mapping.alias]=[];}curMap[mapping.alias].push(source.tableID);});});}}$ARR.forEach(matchedMaps,function(curMap,i){var k;matchedMappingItems[i]=[];for(k in curMap){if(curMap.hasOwnProperty(k)){item={n:k,tp:MAPPING_TYPES[i],tableIds:curMap[k]};matchedMappingItems[i].push(item);}}});$ARR.forEach([matchedTables].concat(matchedMappingItems),function(items){items.sort(function(item1,item2){var name1=item1.n.toUpperCase(),name2=item2.n.toUpperCase();return(name1<name2)?-1:((name1===name2)?0:1);});});items=matchedTables;$ARR.forEach(matchedMappingItems,function(mappingItems){items=items.concat(mappingItems);});this.expandedIndices={};this.set("items",items);itemNum=items.length;if(!itemNum){return ;}itemNodes=this.domNode.firstChild.children;for(i=matchedTables.length;i<itemNum;i++){this.expandedIndices[i]=true;this.itemRenderer.expand(itemNodes[i],this.items[i],0,i,this);}},init:function init(props){if(this._super){this._super(props);}this.dataHelper={fetch:function fetch(item,callback){var subItems=[],subItem,controller=mstrApp.getRootController(),sources=controller.model.importSources;if(item.tp===ENUM_OT_ATTRIBUTE||item.tp===ENUM_OT_METRIC){$ARR.forEach(item.tableIds,function(tableId){if(sources.hasOwnProperty(tableId)&&sources[tableId]){subItem={id:tableId,did:tableId,n:sources[tableId].sourceInfo.name,tp:ENUM_OT_TABLE,isLeaf:true};subItems.push(subItem);}});}callback.success({items:subItems});if(callback.complete){callback.complete();}}};},treeHooks:{select:function select(el,item,level,idx){var i,selIndices=this.userSelections,tableId=item.id,controller,model;if(item.tp!==ENUM_OT_TABLE){this.selectedIndices={};return true;}for(i in selIndices){if(selIndices.hasOwnProperty(i)&&selIndices[i]){this.toggleChildSelection(i,false);}}this.selectedIndices={};this.userSelections={};this.userSelections[idx]=true;$CSS.toggleClass(el,"selected",true);controller=mstrApp.getRootController();model=controller.getModel();if(model.currentSource&&model.currentSource.tableID===tableId){return true;}controller.selectSourceTable(tableId,true);return true;}}});}());