mstrRelatedReportsImplScript=true;mstrRelatedReportsImpl.prototype=new mstrBoneImpl();mstrRelatedReportsImpl.prototype.onload=function(){try{mstrBoneImpl.prototype.onload.call(this);var closeBtn=document.getElementById("btnDockLeft");if(closeBtn){closeBtn.onmousedown=new Function("e","microstrategy.bone('"+this.id+"').close(); return false;");}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrRelatedReportsImpl.prototype.close=function(){try{removeObj(this.elem);this.elem.setAttribute("hidden","1");var parent=this.elem.parentNode;while(parent!=null){if(parent.nodeName=="DIV"&&parent.className=="mstrDockLeft"){parent.style.display="none";}if(parent.nodeName=="TD"&&parent.className=="tdDockLeft"){parent.style.width="0px";break;}parent=parent.parentNode;}microstrategy.updateBrowserSetting("lTbar","0");microstrategy.unRegisterBone(this.id);if(microstrategy.eventManager){microstrategy.eventManager.ondialogresize();microstrategy.eventManager.onforcerepaint();}if(microstrategy.mstrwid!=""&&microstrategy.updateManager){microstrategy.updateManager.flushAndSubmitChanges();}}catch(err){microstrategy.errors.log(err);return false;}};function mstrRelatedReportsImpl(id){this.inherits=mstrBoneImpl;this.inherits(id);delete this.inherits;return this;}