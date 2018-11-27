(function(){mstrmojo.requiresCls("mstrmojo.ui.editors.controls.ControlGroup","mstrmojo.ui.editors.controls.TwoColumnContainer","mstrmojo.ui.editors.controls.ColorPickerButton","mstrmojo.ui.editors.controls.ValidationTextBox","mstrmojo.hash","mstrmojo.array","mstrmojo.ValidationTextBox","mstrmojo.expr");var $EF=mstrmojo.emptyFn,$HASH=mstrmojo.hash,$ARR=mstrmojo.array,$DTP=mstrmojo.expr.DTP,EnumFillCompName={FILL_COLOR:"Clr",FILL_TRANSPARENT:"FillTrans"},CTRL_FILL_COLOR=1,CTRL_FILL_TRANSPARENCY=2;function getFillColorCfg(slot,hostedWithin,showGradient,showNoFill,showAutomatic){return{scriptClass:"mstrmojo.ui.editors.controls.ColorPickerButton",alias:"fillColor",slot:slot,showNoFill:showNoFill!==false,showAutomatic:!!showAutomatic,showGradient:showGradient!==false,selectedValue:"#000000",isHostedWithin:hostedWithin||false,postselectedValueChange:function(evt){if(this.propName&&this.parent&&this.parent.parent){this.parent.parent.raiseFormatValueChange(this.propName,evt.value,evt.valueWas);}},postclick:function(evt){this.parent.parent.postclick(evt);}};}function getFillTransCfg(slot){return{scriptClass:"mstrmojo.ui.editors.controls.TwoColumnContainer",alias:"fillAlpha",slot:slot,col1Width:"100%",col2Width:"10px",children:[{scriptClass:"mstrmojo.ui.editors.controls.ValidationTextBox",alias:"fillAlphaText",slot:"col1Node",value:"100",cssText:"text-align:right",dtp:$DTP.INTEGER,required:true,constraints:{min:0,max:100},onvalueChange:function(evt){this.valueWas=evt.valueWas;},onValid:function onValid(){if(this.propName&&this.value!==this.valueWas){this.parent.parent.parent.raiseFormatValueChange(this.propName,this.value,this.valueWas);}},postclick:function(evt){this.parent.parent.parent.postclick(evt);}},{scriptClass:"mstrmojo.Label",slot:"col2Node",text:"%"}]};}mstrmojo.ui.editors.controls.FillConfigGroup=mstrmojo.declare(mstrmojo.ui.editors.controls.ControlGroup,null,{scriptClass:"mstrmojo.ui.editors.controls.FillConfigGroup",propNames:undefined,postclick:$EF,visibleControls:CTRL_FILL_COLOR+CTRL_FILL_TRANSPARENCY,fillColorAndTrans:undefined,init:function init(props){this._super(props);var controls=[],slot="col1Node",colorPickerHostWithin=props&&props.colorPickerHostWithin,showGradient=props&&props.showGradient,showNoFill=props&&props.showNoFill,showAutomatic=props&&props.showAutomaticInColor,ctrlWidthConfig;if((this.visibleControls&CTRL_FILL_COLOR)>0){controls.push(getFillColorCfg(slot,colorPickerHostWithin,showGradient,showNoFill,showAutomatic));slot="col2Node";}if((this.visibleControls&CTRL_FILL_TRANSPARENCY)>0){controls.push(getFillTransCfg(slot));}if(controls.length===1){ctrlWidthConfig={col1Width:"100%",dividerWidth:"0",col2Width:"0"};}this.addChildren([$HASH.copy(ctrlWidthConfig,{scriptClass:"mstrmojo.ui.editors.controls.TwoColumnContainer",alias:"fillColorAndTrans",children:controls})]);},getChildComp:function getChildComp(propName){if(propName.indexOf(EnumFillCompName.FILL_COLOR)!==-1){return this.fillColorAndTrans.fillColor;}if(propName.indexOf(EnumFillCompName.FILL_TRANSPARENT)!==-1){return this.fillColorAndTrans.fillAlpha.fillAlphaText;}return undefined;},iniChildrenComp:function iniChildrenComp(propNames){this.propNames=propNames;$ARR.forEach(propNames,function(propName){var comp=this.getChildComp(propName);if(comp!==undefined){comp.propName=propName;}},this);},setChildValue:function setChildValue(propName,newValue){var comp=this.getChildComp(propName);if(comp===undefined){return false;}switch(comp.alias){case"fillColor":if(newValue!==comp.selectedValue){comp.set("selectedValue",newValue==="undefined"?"conflict":newValue);}break;case"fillAlphaText":if(newValue!==comp.value){comp.set("value",newValue==="undefined"?"":newValue);}break;}},setChildEnable:function setChildEnable(propName,enable){var comp=this.getChildComp(propName);if(comp!==undefined){comp.set("enabled",enable);}},setChildrenValue:function setChildrenValue(propNamesAndValues){propNamesAndValues.forEach(function(item){this.setChildValue(item[0],item[1]);});}});mstrmojo.ui.editors.controls.FillConfigGroup.CTRL_FLAGS={FILL_COLOR:CTRL_FILL_COLOR,FILL_TRANSPARENCY:CTRL_FILL_TRANSPARENCY};}());