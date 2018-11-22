(function(){mstrmojo.requiresCls("mstrmojo.TextArea","mstrmojo._IsInputControl","mstrmojo.android._HasPreviewButton","mstrmojo.dom","mstrmojo.css");var $DOM=mstrmojo.dom,$C=mstrmojo.css,BASEFORM_URL=5,BASEFORM_EMAIL=6,INTEGER=1,FLOAT=7,BIGDECIMAL=30;function reApplyWebkitTransform(dom){if(dom.style){var trans=mstrmojo.css.getStyleValue(dom,$DOM.CSS3_TRANSFORM);if(trans!=="none"){dom.style[$DOM.CSS3_TRANSFORM]=trans;}}}function convert3dTransform(dom){var i,len=dom.childNodes.length;for(i=0;i<len;i++){var c=dom.childNodes[i];convert3dTransform(c);reApplyWebkitTransform(c);}}mstrmojo.android.inputControls.TextAreaDIC=mstrmojo.declare(mstrmojo.TextArea,[mstrmojo._IsInputControl,mstrmojo.android._HasPreviewButton],{scriptClass:"mstrmojo.android.inputControls.TextAreaDIC",cssDisplay:"block",init:function init(props){this._super(props);this.maxLength=this.dic.ml;if(!this.showByDefault){this.cssClass="mstrmojo-TextAreaDIC-Popup";this.rows=7;}},focus:function focus(){$DOM.setCaret(this.domNode,(this.value!=null&&String(this.value).length)||0);},onfocus:function onfocus(){window.setTimeout(function(){mstrMobileApp.forceRepaint();},0);},onvalueChange:function onvalueChange(){if(!this.showByDefault){this._super();}},onblur:function onblur(){if(this.showByDefault){this.applyChanges();}},applyChanges:function applyChanges(){if(!!this.domNode){this.domNode.blur();}var dt=parseInt(this.dic.dt,10);if((dt>=INTEGER&&dt<=FLOAT)||dt===BIGDECIMAL){this.value=parseFloat(this.value);}this._super();},cancelChanges:function cancelChanges(){this.domNode.blur();this._super();},postBuildRendering:function postBuildRendering(){this._super();if(this.showByDefault){this.domNode.style.width="100%";this.domNode.style.height="100%";if(!mstrApp.isTablet()){$DOM.attachEvent(this.domNode,"click",function(){convert3dTransform(document.body);},false);}var me=this;$DOM.attachEvent(this.domNode,"blur",function(){var d=me.domNode;while(d!=null){if(d.scrollTop>0){d.scrollTop=0;break;}d=d.parentNode;}},false);}},renderPreview:function renderPreview(){var dic=this.dic,dv=(this.dv==null)?"":String(this.dv);if(!this.dicChanged){if(!dv||!dic.sp){dv=dic.siwc?"&nbsp;":(dv||"&nbsp;");}else{dv=this._getPreviewValue();}this.dv=dv;}this.renderPreviewButton(this.openerNode,this.dv);$C.toggleClass(this.openerNode.firstChild,"filled",!this.dicChanged&&this.value!=null&&String(this.value).length>0);},getDisplayValue:function getDisplayValue(){var dic=this.dic,v=this.value,dv=(v==null)?"":String(v);if(!dv||!dic.sp){dv=dic.siwc?"&nbsp;":(mstrmojo.string.encodeHtmlString(dv)||"&nbsp;");}else{dv=this._getPreviewValue();}return dv;},_getPreviewValue:function _getPreviewValue(){var dic=this.dic,v=this.value,dv=(v==null)?"":String(v),prefix="",reg4URL=/(.*href=['"])(.*)(['"].*>)(.*)(<.*)/i,template='<a href="mailto:"></a>';var isCutOff=v.length>dic.pl;v=isCutOff?v.substring(0,dic.pl):v;switch(this.ts){case BASEFORM_EMAIL:prefix="mailto:";case BASEFORM_URL:var url=mstrmojo.string.encodeHtmlString(this.value.replace(/\$/g,"$$$$")),urlText=mstrmojo.string.encodeHtmlString(v.replace(/\$/g,"$$$$"));urlText=isCutOff?urlText+"&hellip;":urlText;dv=template.replace(reg4URL,"$1"+prefix+url+"$3"+urlText+"$5");break;default:if(!this.dicChanged){dv=this.dv;}if(dv.length>dic.pl){dv=this.dicChanged?mstrmojo.string.encodeHtmlString(dv.substring(0,dic.pl))+"&hellip;":dv.substring(0,dic.pl)+"&hellip;";}else{dv=this.dicChanged?mstrmojo.string.encodeHtmlString(dv):dv;}}return dv;}});}());