(function(){mstrmojo.requiresCls("mstrmojo.Box");var $A=mstrmojo.array;mstrmojo.warehouse.dbroles.DBRoleSettingGroupBox=mstrmojo.declare(mstrmojo.Box,null,{scriptClass:"mstrmojo.warehouse.dbroles.DBRoleSettingGroupBox",cssClass:"mstrmojo-wh-DBRoleSettingGroupBox",groupbox:undefined,isRequired:false,isGroupSetting:true,enabled:true,onenabledChange:function onenabledChange(){var enabled=this.enabled;$A.forEach(this.children,function(child){child.set("enabled",enabled);});},getValue:function getValue(){return"";},setValue:function setValue(val){},isValid:function isValid(){return{val:true,msg:""};},children:[{scriptClass:"mstrmojo.Box",alias:"groupbox",children:[]}]});}());