(function(){mstrmojo.requiresCls("mstrmojo.Button","mstrmojo.HBox","mstrmojo.CheckBox");mstrmojo.requiresDescs(1143);var $DBHLP=mstrmojo.warehouse.dbroles.DBRoleHelper;mstrmojo.warehouse.dbroles.DBRoleSettingCheckbox=mstrmojo.declare(mstrmojo.HBox,null,{scriptClass:"mstrmojo.warehouse.dbroles.DBRoleSettingCheckbox",cssClass:"mstrmojo-wh-DBRoleCheckBox",postBuildRendering:function postBuildRendering(){if(this._super){this._super();}this.checkbox.set("label",this.label);this.helpBtn.set("visible",!!(this.helpLink));},children:[{scriptClass:"mstrmojo.CheckBox",alias:"checkbox",oncheckedChange:function oncheckedChange(){if(this._super){this._super();}this.parent.checked=this.checked;this.parent.oncheckedChange();}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-wh-DBRoleCheckBox-help",alias:"helpBtn",visible:false,title:mstrmojo.desc(1143,"help"),onclick:function onclick(){$DBHLP.showHelp(this.parent.helpLink);}}],checkbox:undefined,helpBtn:undefined,onlabelChange:function onlabelChange(){this.checkbox.set("label",this.label);},helpLink:undefined,enabled:true,onenabledChange:function onenabledChange(){this.checkbox.set("enabled",this.enabled);},isNumeric:false,getValue:function getValue(){if(this.isNumeric){return(this.checkbox.checked?"1":"0");}return(this.checkbox.checked?"true":"false");},setValue:function setValue(val){this.checkbox.set("checked",((val==="true")||(val===true)||(val==="1")));},isValid:function isValid(){return{val:true,msg:""};}});}());