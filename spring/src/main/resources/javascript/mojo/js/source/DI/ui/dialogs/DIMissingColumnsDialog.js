(function(){mstrmojo.requiresCls("mstrmojo.qb.MissingColumnWarning","mstrmojo.Editor","mstrmojo.ui.List","mstrmojo.DI.DIHelpers","mstrmojo.DI.DIConstants");mstrmojo.requiresDescs(122,218,219,221,1761,3415,3610,6724,8708,8973,9161,11581,12598,12609,12771,13164,13447,13448,13449,13450,13451,13452,13453,13454,13455,13456,13464,13465,8973,11581,13984,13985,13986,13987);var $A=mstrmojo.array,$DOM=mstrmojo.dom,$DIHelpers=mstrmojo.DI.DIHelpers;var $DESC_WARNING_100=mstrmojo.desc(13448,"Missing Columns were detected."),$DESC_WARNING_010=mstrmojo.desc(13449,"Mismatched Datatypes were detected."),$DESC_WARNING_001=mstrmojo.desc(13450,"Missing Tables were detected."),$DESC_WARNING_110=mstrmojo.desc(13465,"Missing Columns and Mismatched Datatypes were detected."),$DESC_WARNING_011=mstrmojo.desc(13451,"Mismatched Datatypes and Missing Tables were detected."),$DESC_WARNING_101=mstrmojo.desc(13452,"Missing Columns and Missing Tables were detected."),$DESC_WARNING_111=mstrmojo.desc(13453,"Missing Columns, Mismatched Datatypes and Missing Tables were detected."),$DESC_MSG_MISSING_COLUMNS=mstrmojo.desc(13454,"Missing Columns may cause errors in the dashboards that use them. Before republishing with missing columns, the schema changes must be saved to the cube and the refresh policy must be set to 'Replace Existing Data'."),$DESC_MSG_MISMATCH_DATATYPES=mstrmojo.desc(13455,"Mismatched Datatypes were observed between the new data and the current cube data. If the refresh policy is 'Repalce Existing Data' then the cube datatype is replaced with the new datatype for all the other refresh policies the new data is converted to the cube datatype."),$DESC_MSG_MISSING_TABLES=mstrmojo.desc(13984,"All the columns of the following tables ( ### ) were found to be missing. Incase your aim was to replace a table with a completely different table then please use the edit-dataset workflow to accomplish it."),$DESC_INSTRUCTION_OK_CANCEL=mstrmojo.desc(13985,"Click 'OK' to make changes according to the below details or Click 'Cancel' to try again."),$DESC_INSTRUCTION_CANCEL=mstrmojo.desc(13986,"Please click 'Cancel' to try again."),$DESC_INSTRUCTION_MISSING_TABLES=mstrmojo.desc(13987,"The common reason for this error is because incorrect data was uploaded. Please click 'Cancel' to try again."),$DESC_MISMATCH_DATATYPE_COMMENT=mstrmojo.desc(13464,"### (Cube Datatype: ***)");var $WARNINGS_GROUP={"100":$DESC_WARNING_100,"010":$DESC_WARNING_010,"001":$DESC_WARNING_001,"110":$DESC_WARNING_110,"011":$DESC_WARNING_011,"101":$DESC_WARNING_101,"111":$DESC_WARNING_111};mstrmojo.DI.ui.dialogs.DIMissingColumnsList=mstrmojo.declare(mstrmojo.ui.List,null,{scriptClass:"mstrmojo.DI.ui.dialogs.DIMissingColumnsList",getItemMarkup:function getItemMarkup(){var markup='<div class="MissingColumnList-item {@cls} cf"><div class="MissingColumnList-item-icon tp{@tp}"></div><div class="MissingColumnList-item-text">{@n}</div><div class="MissingColumnList-item-text2">{@name}</div><div class="MissingColumnList-item-text3" itemtooltip="{@comment}">{@comment}</div></div>';return markup;},useRichTooltip:true,showTooltip:function showTooltip(e,win){var me=this,t=$DOM.findAncestorByAttr($DOM.eventTarget(win,e),"itemtooltip",true,this.domNode),content=t&&t.value;if(!me.hasOpenTooltip&&content){var position=$DOM.position(t.node);me.richTooltip={cssClass:"vi-regular vi-tooltip-V",content:content,top:Math.max(position.y,0),left:Math.max(position.x+4,0),posType:mstrmojo.tooltip.POS_BOTTOMLEFT};this._super(e,win);}},getItemProps:function getItemProps(item,idx){var model=mstrApp.getRootController().getModel(),props=this._super(item,idx),source=model.getImportSource(item.tableId);props.tp=item.tp||"";if(item.tableName){props.name=item.tableName;}else{if(source&&source.sourceInfo){props.name=source.sourceInfo.name;}else{props.name="";}}if(item.isHeader){props.name=item.name;props.addCls("header");}props.comment=item.comment||"";return props;}});mstrmojo.DI.ui.dialogs.DIMissingColumnsDialog=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.DI.ui.dialogs.DIMissingColumnsDialog",cssClass:"mstrmojo-MissingColumnWarning",warning:mstrmojo.desc(12598,"The following previously uploaded columns are missing"),details:mstrmojo.desc(13164,"If you publish without these columns, existing reports, documents and analyses based on this cube might be affected. Tables with all missing columns will not be republished. Do you still want to continue?"),children:[{scriptClass:"mstrmojo.Label",cssClass:"cf mstrmojo-MissingColumnWarning-title",alias:"warningLabel"},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-MissingColumnWarning-collapsed",alias:"collapseButton",text:mstrmojo.desc(189,"Details"),onclick:function(){var collapsed=$DIHelpers.expandNode(this.parent.colllapsedBox);mstrmojo.css.toggleClass(this.domNode,"on",collapsed);}},{scriptClass:"mstrmojo.Box",cssClass:"mstrmojo-MissingColumnWarning-collapsedBox",alias:"colllapsedBox",visible:false,children:[{scriptClass:"mstrmojo.DI.ui.dialogs.DIMissingColumnsList",cssClass:"mstrmojo-MissingColumnWarning-list",alias:"list"},{scriptClass:"mstrmojo.Box",alias:"detailMsgBox"}]}],buttons:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton hot",text:mstrmojo.desc(8708,"OK"),alias:"okButton",onclick:function(){var editor=this.parent.parent,ret=true;if(editor.onOK){ret=editor.onOK();}if(ret){editor.close();}}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton",text:mstrmojo.desc(221,"Cancel"),alias:"cancelButton",onclick:function(){var editor=this.parent.parent,ret=true;if(editor.onCancel){ret=editor.onCancel();}if(ret){editor.close();}}}],onOpen:function(){var items=[{isHeader:true,n:mstrmojo.desc(122,"Columns"),name:mstrmojo.desc(1761,"Tables"),comment:mstrmojo.desc(6724,"Comment")}];var model=mstrApp.getRootController().getModel(),results=this.results,detailMsg=[],detailMsgChildren=[],warningIdx=["0","0","0"],warning,instruction,missingTables=[],missingColumnsTables=[],mismatchDataTypeTables=[];this.set("title",mstrApp.isCloudPro?mstrmojo.desc(9161,"Oops!"):mstrmojo.desc(3610));if(!results){return ;}this.btnHbox.okButton.set("visible",true);this.btnHbox.cancelButton.set("visible",true);this.colllapsedBox.list.set("visible",false);if(results.hasError){detailMsg.push("<ul>");warning=mstrmojo.desc(14302,"We encountered some errors while republishing the cube.");$A.forEach(results.errorTableTbids,function(tbid){var source=model.getImportSource(tbid),name=source&&source.sourceInfo&&source.sourceInfo.name,message=$DIHelpers.getBackendErrorStr(results.errorTableErrCode[tbid],source.type);detailMsg.push("<li>");detailMsg.push(name+"<br>"+message);detailMsg.push("</li>");});detailMsg.push("</ul>");this.warningLabel.set("text",warning);if(results.errorTableTbids.length){detailMsgChildren.push(new mstrmojo.Label({allowHTML:true,cssClass:"mstrmojo-MissingColumnWarning-detailMsg",text:detailMsg.join("")}));if(detailMsgChildren.length>0){this.colllapsedBox.detailMsgBox.removeChildren();this.colllapsedBox.detailMsgBox.addChildren(detailMsgChildren);}this.colllapsedBox.set("visible",false);}this.btnHbox.cancelButton.set("text",mstrmojo.desc(8708,"OK"));this.btnHbox.okButton.set("visible",false);return ;}$A.forEach(results.missingTableTbids,function(tbid){var source=model.getImportSource(tbid),name=source&&source.sourceInfo&&source.sourceInfo.name;missingTables.push(name);});$A.forEach(results.missingColumnTbids,function(tbid){var source=model.getImportSource(tbid),name=source&&source.sourceInfo&&source.sourceInfo.name,cols=results.missingColumns[tbid];missingColumnsTables.push(name);$A.forEach(cols,function(col){items.push({n:col.n,tableId:tbid,comment:mstrmojo.desc(13447,"Missing Columns")});});});$A.forEach(results.mismatchedDatatypeTbids,function(tbid){var source=model.getImportSource(tbid),name=source&&source.sourceInfo&&source.sourceInfo.name,cols=results.mismatchedDatatypeColumns[tbid];mismatchDataTypeTables.push(name);$A.forEach(cols,function(col){items.push({n:col.n,tableId:tbid,comment:$DESC_MISMATCH_DATATYPE_COMMENT.replace("###",$DIHelpers.getDataTypeString(col.src.ddt)).replace("***",$DIHelpers.getDataTypeString(col.ddt))});});});if(missingColumnsTables.length>0){warningIdx[0]="1";detailMsg.push($DESC_MSG_MISSING_COLUMNS);instruction=$DESC_INSTRUCTION_OK_CANCEL;}if(mismatchDataTypeTables.length>0){warningIdx[1]="1";detailMsg.push($DESC_MSG_MISMATCH_DATATYPES);instruction=$DESC_INSTRUCTION_OK_CANCEL;}if(missingTables.length>0){warningIdx[2]="1";detailMsg.push($DESC_MSG_MISSING_TABLES.replace("###",missingTables.join(", ")));if(missingColumnsTables.length>0||mismatchDataTypeTables.length>0){instruction=$DESC_INSTRUCTION_CANCEL;}else{instruction=$DESC_INSTRUCTION_MISSING_TABLES;}this.btnHbox.okButton.set("visible",false);}warning=$WARNINGS_GROUP[warningIdx.join("")];this.warningLabel.set("text",warning+" "+instruction);if(items.length>1){this.colllapsedBox.list.set("items",items);this.colllapsedBox.list.set("visible",true);}else{this.colllapsedBox.list.set("items",null);this.colllapsedBox.list.set("visible",false);}$A.forEach(detailMsg,function(msg){detailMsgChildren.push(new mstrmojo.Label({cssClass:"mstrmojo-MissingColumnWarning-detailMsg",text:msg}));});if(detailMsgChildren.length>0){this.colllapsedBox.detailMsgBox.removeChildren();this.colllapsedBox.detailMsgBox.addChildren(detailMsgChildren);}this.colllapsedBox.set("visible",false);},onOK:function(){var controller=mstrApp.getRootController();controller.handleRepublishError(this.results);return true;},onCancel:function(){mstrApp.getRootController().cancelRepublishError(this.results);return true;}});}());