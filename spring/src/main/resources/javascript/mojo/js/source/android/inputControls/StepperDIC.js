(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.css","mstrmojo.Container","mstrmojo.num","mstrmojo.HBox","mstrmojo._IsInputControl","mstrmojo._TouchGestures");var $D=mstrmojo.dom,$DAE=$D.attachEvent,$DDE=$D.detachEvent,$C=mstrmojo.css,_DTP=mstrmojo.expr.DTP,_BTN="mstrmojo.Button",_N=mstrmojo.num,_TR=mstrmojo.validation.TRIGGER,HOLD_INTERVAL=50,HOLD_THRESHOLD=500,DECIMAL_NUM=10;function attachWinEvts(){var me=this;$DAE(window,$D.TOUCHSTART,me._evtHandler,true);me.isActive=true;}function detachWinEvts(){var me=this;$DDE(window,$D.TOUCHSTART,me._evtHandler,true);me.isActive=false;}function decimalFormat(v){return v?parseFloat(v.toFixed(DECIMAL_NUM)):v;}function minusCalc(){var v=this.numericValue,max=this.max,min=this.min,itv=this.itv;if(!isNaN(v)){if(max!==undefined&&v-itv>max){this.set("numericValue",max);}else{if(min===undefined||v-itv>=min){this.set("numericValue",decimalFormat(v-itv));}else{if(v>min&&v-itv<min){this.set("numericValue",min);}}}}}function plusCalc(){var v=this.numericValue,max=this.max,min=this.min,itv=this.itv;if(!isNaN(v)){if(min!==undefined&&v+itv<min){this.set("numericValue",min);}else{if(max===undefined||v+itv<=max){this.set("numericValue",decimalFormat(v+itv));}else{if(v<max&&v+itv>max){this.set("numericValue",max);}}}}}function processEvent(isPlus){if(isPlus){plusCalc.call(this);}else{minusCalc.call(this);}}function startStepperInterval(isPlus){var me=this;this._holdTimer=setInterval(function(){processEvent.call(me,isPlus);},HOLD_INTERVAL);}function stopStepperInterval(){if(this._holdTimer){clearInterval(this._holdTimer);delete this._holdTimer;}}function startStepperTimeout(isPlus){var me=this;if(!this._holdTimer&&!this._startHoldTimer){this._startHoldTimer=setTimeout(function(){delete me._startHoldTimer;startStepperInterval.call(me,isPlus);},HOLD_THRESHOLD);}}function stopStepperTimeout(){if(this._startHoldTimer){clearTimeout(this._startHoldTimer);delete this._startHoldTimer;}stopStepperInterval.call(this);}function isTapOnPlus(evt){var v=evt.target;return(this.plusNode&&this.plusNode==v);}function isTapOnMinus(evt){var v=evt.target;return(this.minusNode&&this.minusNode==v);}function applayChange(){var v=this.numericValue;if(!isNaN(v)&&v>=this.min&&v<=this.max&&v!=this.value){this.set("value",v);}}function addTouchedClass(el){$C.addClass(el,"touched");}function createDICWidget(dic){var max=dic.max,min=dic.min,itv=dic.itv;return{scriptClass:"mstrmojo.HBox",alias:"hBox",cssText:"margin:auto",children:[{scriptClass:_BTN,alias:"minus",cssClass:"mstrmojo-StepperDIC-Operator minus",bindings:{enabled:function(){return this.parent.parent.numericValue>min;}}},{scriptClass:"mstrmojo.ValidationTextBox",cssClass:"mstrmojo-DataInputControl",dtp:_DTP.DOUBLE,required:true,alias:"textInput",constraints:{trigger:_TR.ONKEYUP|_TR.ONBLUR,max:max,min:min},bindings:{value:"this.parent.parent.numericValue"},onblur:function onblur(evt){var di=this.parent.parent,value=_N.parseNumeric(this.value);if(!di.isActive){applayChange.call(this.parent.parent);}this._super&&this._super(evt);},onValid:function(){this.parent.parent.set("numericValue",parseFloat(this.value));}},{scriptClass:_BTN,alias:"plus",cssClass:"mstrmojo-StepperDIC-Operator plus",bindings:{enabled:function(){return this.parent.parent.numericValue<max;}}}]};}mstrmojo.android.inputControls.StepperDIC=mstrmojo.declare(mstrmojo.Container,[mstrmojo._IsInputControl,mstrmojo._TouchGestures],{scriptClass:"mstrmojo.android.inputControls.StepperDIC",cssClass:"mstrmojo-StepperDIC",isActive:false,markupString:'<div id="{@id}" class="{@cssClass}" style="{@cssText}"></div>',markupSlots:{containerNode:function(){return this.domNode;}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},init:function init(props){this._super&&this._super(props);this.max=this.dic.max;this.min=this.dic.min;this.itv=this.dic.itv;var _v=parseFloat(this.value);this.set("numericValue",isNaN(_v)?(this.min||0):_v);this.set("children",createDICWidget(this.dic));this.plus=this.hBox&&this.hBox.plus;this.minus=this.hBox&&this.hBox.minus;var me=this;this._evtHandler=this._evtHandler||function(evt){var t=evt.target;if(!$D.contains(me.domNode,t)){$D.stopPropogation(evt.view,evt);detachWinEvts.call(me);applayChange.call(me);}};},postBuildRendering:function postBuildRendering(){this._super();this.plusNode=this.plus&&this.plus.domNode;this.minusNode=this.minus&&this.minus.domNode;},touchTap:function(touch){if(!this.isActive){attachWinEvts.call(this);}if(isTapOnPlus.call(this,touch)){addTouchedClass(this.plusNode);processEvent.call(this,true);}else{if(isTapOnMinus.call(this,touch)){addTouchedClass(this.minusNode);processEvent.call(this,false);}}},touchBegin:function touchBegin(touch){if(!this.isActive){attachWinEvts.call(this);}if(isTapOnPlus.call(this,touch)){addTouchedClass(this.plusNode);startStepperTimeout.call(this,true);}else{if(isTapOnMinus.call(this,touch)){addTouchedClass(this.minusNode);startStepperTimeout.call(this,false);}}},touchEnd:function touchEnd(touch){stopStepperTimeout.call(this);},unrender:function unrender(ignoreDom){if(this.isActive){detachWinEvts.call(this);}stopStepperTimeout.call(this);this._super(ignoreDom);},setDirtyFlag:function setDirtyFlag(c,d){mstrmojo.css.addClass(this.domNode.firstChild||d,"tx-active");}});}());