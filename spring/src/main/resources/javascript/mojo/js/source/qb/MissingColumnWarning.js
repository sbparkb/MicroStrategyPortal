(function(){mstrmojo.requiresCls("mstrmojo.List","mstrmojo.Editor","mstrmojo.Label","mstrmojo.HBox");mstrmojo.requiresDescs(218,219,3610,9161,10040,10041,13318,13073,13074,13075,13076,13077,13078,13079,13080,13081);var personalAttributeLabel=[mstrmojo.desc(13073,"The following attribute, which is currently used to personalize the dashboard, is missing. ")+'<span style="color:red;"><u>'+mstrmojo.desc(13074,"If you do not include it, personalization will not be applied")+"</u></span>"+mstrmojo.desc(13075," and users could have access to more data than they are currently allowed to view."),mstrmojo.desc(13076,"The following attributes, which are currently used to personalize the dashboard, are missing. ")+'<span style="color:red;"><u>'+mstrmojo.desc(13077,"If you do not include them, personalization will not be applied")+"</u></span>"+mstrmojo.desc(13075," and users could have access to more data than they are currently allowed to view.")],personalAttributeInstruction=[mstrmojo.desc(13078,"If you still want to make this change please unmap the attributes by going to Share>Personalize."),mstrmojo.desc(13079,"If you still want to make this change please unmap the attribute from your Recipient List by going to Share>Deliver.")],missingObjectsWarning=[mstrmojo.desc(13080,"The following object is missing which could affect your dashboard definition."),mstrmojo.desc(13081,"The following objects are missing which could affect your dashboard definition.")];mstrmojo.qb.MissingColumnWarning=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.qb.MissingColumnWarning",cssClass:"",title:mstrmojo.desc(3610),hasPT:false,isCube:true,warning:mstrmojo.desc(10040,"Some of the previously uploaded columns are missing"),details:mstrmojo.desc(10041,"If you do not import previously used columns, existing reports, documents and analyses might be affected. Do you still want to continue?"),onOpen:function(){var items=this.mappings,hasPersonalAttribute=this.hasPT,buttonBox=this.buttonBox,index=(items.length>1)?1:0;this.set("title",mstrApp.isCloudPro?(hasPersonalAttribute?mstrmojo.desc(9161,"Oops!"):mstrmojo.desc(13318,"Just Checking")):mstrmojo.desc(3610));this.list.set("items",items);this.warningLabel.set("text",hasPersonalAttribute?personalAttributeLabel[index]:(mstrApp.isCloudPro?missingObjectsWarning[index]:this.warning));this.detailLabel.set("text",hasPersonalAttribute?personalAttributeInstruction[this.isCube?0:1]:this.details);buttonBox.YesButton.set("visible",!hasPersonalAttribute);buttonBox.NoButton.set("visible",!hasPersonalAttribute);buttonBox.OKButton.set("visible",hasPersonalAttribute);},cssText:"width: 400px",children:[{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-qb-MissingColumns-title",alias:"warningLabel"},{scriptClass:"mstrmojo.List",alias:"list",cssClass:"mstrmojo-qb-MissingColumns-list",itemIdField:"did",itemMarkupFunction:function(evt,data,info){var s='<div class="mstrmojo-qb-MissingColumns-bullet mstrmojo-qb-MissingColumns-Icon t'+evt.tp+'">'+evt.n+"</div>";return s;}},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-qb-MissingColumns-instruction",alias:"detailLabel"},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-qb-MissingColumns-buttonBox",slot:"buttonNode",alias:"buttonBox",cssText:"float:right;background:transparent;height:45px;",children:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-Editor-button mstrmojo-Editor-button-Yes",text:mstrmojo.desc(219,"Yes"),alias:"YesButton",onclick:function(evt){var e=this.parent.parent;var ret=true;if(e.onOK){ret=e.onOK();}if(ret){e.close();}}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-Editor-button mstrmojo-Editor-button-No",text:mstrmojo.desc(218,"No"),alias:"NoButton",onclick:function(evt){var e=this.parent.parent;if(e.onCancel){e.onCancel();}e.close();}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-Editor-button mstrmojo-Editor-button-OK",alias:"OKButton",onclick:function(evt){this.parent.parent.close();}}]}],onRender:function(){this.helpNode&&(this.helpNode.style.display="none");this.closeNode&&(this.closeNode.style.display="none");}});})();