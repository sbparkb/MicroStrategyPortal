(function(){mstrmojo.requiresCls("mstrmojo.array");var $ARR=mstrmojo.array;function _registerEllipsize(widget){if(widget.parent){if(widget.parent.shouldEllipsizeChildren===undefined){mstrmojo.mixin(mstrmojo._HasEllipsis,widget.parent);}widget.parent.set("shouldEllipsizeChildren",true);}}mstrmojo._HasEllipsis=mstrmojo.provide("mstrmojo._HasEllipsis",{shouldEllipsize:false,shouldEllipsizeChildren:false,doEllipsize:function(){if(this.shouldEllipsizeChildren){$ARR.forEach(this.children,function(ch,idx){if(ch.hasRendered&&ch.doEllipsize){ch.doEllipsize();}});}},onshouldEllipsizeChange:function(){this._onEllipsizeFlagChange(this.shouldEllipsize,this.shouldEllipsizeChildren);},onshouldEllipsizeChildrenChange:function(){this._onEllipsizeFlagChange(this.shouldEllipsizeChildren,this.shouldEllipsize);},_onEllipsizeFlagChange:function(flag1,flag2){if(flag1&&!flag2){_registerEllipsize(this);this.markupMethods=mstrmojo.mixin({onvisibleChange:function(){if(this._super){this._super();}if(this.visible&&this.hasRendered){this.doEllipsize();}}},mstrmojo.hash.copy(this.markupMethods));}}});}());