mstrProjectBrowserImplScript=true;mstrProjectBrowserImpl.prototype=new mstrReportObjectsImpl();mstrProjectBrowserImpl.prototype.onload=function(e){try{mstrReportObjectsImpl.prototype.onload.call(this,e);delete this.selections;this.selections=new mstrProjectBrowserSelectionsImpl();this.selections.parentBone=this;this.selections.path="microstrategy.bone('"+this.id+"').selections";if(this.files){this.files.onmousedown=new Function("e","return microstrategy.bone('"+this.id+"').onmousedown(e);");this.files.ondblclick=new Function("e","return microstrategy.bone('"+this.id+"').ondblclick(e);");}}catch(err){microstrategy.errors.log(err);return false;}};mstrProjectBrowserImpl.prototype.getTabContainer=function(){return microstrategy.findAncestorWithAtt(this.elem,microstrategy.HTMLATTR_SUBOBJTYPE,microstrategy.SUBOBJTYPE_TAB_CONTAINER);};function mstrProjectBrowserImpl(id){this.inherits=mstrReportObjectsImpl;this.inherits(id);delete this.inherits;return this;}mstrProjectBrowserSelectionsImplScript=true;mstrProjectBrowserSelectionsImpl.prototype=new mstrReportObjSelectionsImpl();mstrProjectBrowserSelectionsImpl.prototype.onmousedown=function(e){try{var mstrSrc=microstrategy.eventManager.getSource(e);if(microstrategy.checkACL(this.clickedSrc,[microstrategy.ACL_EXECUTE,microstrategy.ACL_USE])){mstrSelectionsImpl.prototype.onmousedown.call(this,e);var verifiedPath=microstrategy.getEventHandlerString(this.path);if(typeof (mstr)!="undefined"){this.parentBone.attachWinListener(this,"mousemove","ondragstart");this.parentBone.attachWinListener(this,"mouseup","onmouseup",false);}else{document.onmousemove=new Function("e",verifiedPath+" { return "+this.path+".ondragstart(e); }");if(document.onmouseup==null){document.onmouseup=new Function("e",verifiedPath+" { return "+this.path+".onmouseup(e); }");}}}return false;}catch(err){microstrategy.errors.log(err);}return false;};function mstrProjectBrowserSelectionsImpl(){this.inherits=mstrReportObjSelectionsImpl;this.inherits();delete this.inherits;return this;}