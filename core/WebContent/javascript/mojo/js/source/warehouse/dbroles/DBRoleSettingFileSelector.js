(function(){mstrmojo.requiresCls("mstrmojo.Box","mstrmojo.dom","mstrmojo.Label","mstrmojo.TextBox");mstrmojo.requiresDescs(7564);var widget,$S=mstrmojo.string,STR_SELECT=mstrmojo.desc(7564,"Select...");mstrmojo.warehouse.dbroles.DBRoleSettingFileSelector=mstrmojo.declare(mstrmojo.Box,null,{scriptClass:"mstrmojo.warehouse.dbroles.DBRoleSettingFileSelector",cssClass:"mstrmojo-wh-DBRoleSettingFileSelector",postBuildRendering:function postBuildRendering(){if(this._super){this._super();}this.infobox.captionlbl.set("text",this.caption);},caption:"",text:"",infobox:undefined,captionlbl:undefined,ontextChange:function ontextChange(){this.infobox.txt.set("value",this.text);},isRequired:false,enabled:true,field:undefined,selectorOption:0,parentRBAlias:"",focus:function focus(){this.infobox.txt.focus();},getValue:function getValue(){return this.text;},setValue:function setValue(val){this.set("text",val);this.set("value",val);},onenabledChange:function onenabledChange(){this.infobox.captionlbl.set("enabled",this.enabled);this.infobox.txt.set("enabled",this.enabled);},isValid:function isValid(){var value=$S.trim(this.getValue()),retVal={val:true,msg:""};if(!this.enabled){return retVal;}if(!this.isRequired&&value===""){return retVal;}if(this.isRequired&&value===""){retVal.val=false;retVal.msg=mstrmojo.desc(12937,"Value for '##' cannot be empty").replace("##",this.caption);return retVal;}return retVal;},children:[{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-wh-DBRoleSettingFileSelector-InfoBox",alias:"infobox",children:[{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-wh-DBRoleSettingFileSelector-Label",alias:"captionlbl"},{scriptClass:"mstrmojo.TextBox",cssClass:"mstrmojo-wh-DBRoleSettingFileSelector-Info",alias:"txt",onEnter:function onEnter(){var p=this.parent.parent;if(p.onEnter){p.onEnter(p.parent.parent);}},onvalueChange:function onvalueChange(evt){this.parent.parent.setValue(evt.value);}},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-wh-DBRoleSettingFileSelector-Select",alias:"fileSelector",text:STR_SELECT,bindings:{visible:function(){var option=this.parent.parent.selectorOption,st=!!(mstrApp.isSingleTier),win=(navigator.platform.indexOf("Win")!==-1),mac=!win;if(((option&1)===1)&&!st){return true;}if(((option&2)===2)&&st&&win){return true;}if(((option&4)===4)&&st&&mac){return true;}return false;}},onclick:function onclick(){widget=this.parent;mstrApp.rootController.launchOneTierAccessFileBrowser("mstrmojo.warehouse.dbroles.DBRoleSettingFileSelector.oneTierFileSelector");}}]}]});mstrmojo.warehouse.dbroles.DBRoleSettingFileSelector.oneTierFileSelector=function(file){widget.txt.set("value",file);};}());