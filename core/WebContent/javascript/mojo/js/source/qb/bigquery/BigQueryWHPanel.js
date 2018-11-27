(function(){mstrmojo.requiresCls("mstrmojo.Box","mstrmojo.Label","mstrmojo.warehouse.DBRoleSelector","mstrmojo.warehouse.WHPanel","mstrmojo.warehouse.ui.AvailableTablesPanel");var $DOM=mstrmojo.dom,$CSS=mstrmojo.css,$ENUM_DATA_CHANGE_EVENTS=mstrmojo.warehouse.EnumDataChangeEvents;function updateLogoutIframe(src){var ifmID="mstr-qb-oAuthSourcelogout",ifm=document.getElementById(ifmID),model=mstrApp.getRootController().model,tableID=model.tableID,dataService=mstrApp.getRootController().getDataService();if(!ifm){ifm=document.createElement("IFRAME");ifm.id=ifmID;document.body.appendChild(ifm);ifm.style.display="none";$DOM.attachEvent(ifm,"load",function(evt){var params={};var signOutOAuthSource=function signOutOAuthSource(){dataService.signOutOAuthSource({success:function success(){mstrApp.getRootController().handleLogout();}},params);};params.dbRoleID=mstrApp.dbrid;if(mstrApp.said){params.sourceAccountID=mstrApp.said;}if(model.isNew&&tableID){dataService.removeEmmaTable({success:signOutOAuthSource},{did:tableID});}else{signOutOAuthSource();}});}ifm.src=src;}mstrmojo.qb.bigquery.BigQuerySignOut=mstrmojo.declare(mstrmojo.Box,null,{scriptClass:"mstrmojo.qb.bigquery.BigQuerySignOut",cssClass:"mstrmojo-qb-bigquery-signout",bindings:{visible:function(){var QB_APP_TYPE=mstrmojo.qb.EnumQBAppType,type=mstrApp.type;return type===QB_APP_TYPE.BigQuery||type===QB_APP_TYPE.BigQueryFFSQL||type===QB_APP_TYPE.BigQuerySingleTable;}},children:[{scriptClass:"mstrmojo.Label",cssClass:"username",postCreate:function postCreate(){if(this._super){this._super();}this.set("text",mstrApp.userEmail||"");}},{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(12735,"Sign Off..."),cssClass:"signout",onclick:function onclick(){updateLogoutIframe("https://www.google.com/accounts/logout");}}]});mstrmojo.qb.bigquery.DBRoleSelector=mstrmojo.declare(mstrmojo.Box,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.qb.bigquery.DBRoleSelector",markupString:'<div id="{@id}" class="mstrmojo-Box {@cssClass}" style="{@cssText}"><div></div><div></div></div>',markupSlots:{bqSignOutNode:function(){return this.domNode.children[0];},dbSelectorNode:function(){return this.domNode.children[1];}},slot:"firstSplitNode",alias:"topPanel",children:[{scriptClass:"mstrmojo.qb.bigquery.BigQuerySignOut",alias:"bqSignOut",slot:"bqSignOutNode"},{scriptClass:"mstrmojo.warehouse.DBRoleSelector",alias:"dbSelector",slot:"dbSelectorNode"}],init:function init(props){if(this._super){this._super(props);}var dbConnections=this.dbSelector.dbConnections;dbConnections.onclick=function(evt){try{var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),item=$DOM.findAncestorByAttr(target,"idx",true,this.domNode),idx=item&&parseInt(item.value,10);if(target.className==="item-mn"&&idx!==null&&!isNaN(idx)){return false;}if(idx!==null){mstrmojo.warehouse.ui.DBConnectionsList.prototype.onclick.call(dbConnections,evt);}}catch(ex){throw ex;}};},setDimensions:function setDimensions(h,w){var height=parseInt(h,10);var width=parseInt(w,10),config;if(!this.layoutConfig){this.layoutConfig={h:{},w:{}};}config=this.layoutConfig;if(this.bqSignOut.visible){config.h.bqSignOutNode="38px";config.h.dbSelectorNode=(height-38)+"px";}else{config.h.dbSelectorNode=height+"px";}config.w.bqSignOutNode=width+"px";config.w.dbSelectorNode=width+"px";if(this._super){this._super(height+"px",w);}}});mstrmojo.qb.bigquery.BigQueryWHPanel=mstrmojo.declare(mstrmojo.warehouse.WHPanel,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.qb.bigquery.BigQueryWHPanel",cssClass:"mstrmojo-qb-whpanel",children:[{scriptClass:"mstrmojo.qb.bigquery.DBRoleSelector",slot:"firstSplitNode",alias:"topPanel"},{scriptClass:"mstrmojo.warehouse.ui.AvailableTablesPanel",slot:"secondSplitNode",alias:"bottomPanel"}],init:function init(props){if(this._super){this._super(props);}var evtConfig={},listConfig,tablesPanel;listConfig=evtConfig[this.id]={};tablesPanel=this.bottomPanel;listConfig[$ENUM_DATA_CHANGE_EVENTS.DBROLE_SELECTION]=function(evt){if(tablesPanel.refreshBtn){$CSS.toggleClass(tablesPanel.refreshBtn.domNode,"hidden",false);}};mstrApp.getRootController().attachDataChangeListeners(evtConfig);},preBuildRendering:function preBuildRendering(){if(this._super){this._super();}var dbroleSelector,tablesPanel;dbroleSelector=this.topPanel.dbSelector;tablesPanel=this.bottomPanel;dbroleSelector.title=mstrmojo.desc(37,"Projects");dbroleSelector.cssClass="bigquery-projects";tablesPanel.title=mstrmojo.desc(12569,"Available Datasets");tablesPanel.cssClass="AvailableTables bigquery-datasets";}});}());