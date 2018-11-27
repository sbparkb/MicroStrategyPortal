(function(){mstrmojo.requiresCls("mstrmojo.registry","mstrmojo.array","mstrmojo.publisher");var $REG=mstrmojo.registry,$ARR=mstrmojo.array,$PUB=mstrmojo.publisher;function preAddChild(p,c){if(c){c.parent=p;var inst=$REG.ref(c);if(c!==inst){delete c.parent;}return inst;}return null;}function postAddChild(p,c){var alias=c.alias;if(alias!==null&&alias!==""){p[alias]=c;}}function postRemoveChild(p,c){var alias=c.alias;if(c.parent===p){delete c.parent;}if((alias!==null&&alias!=="")&&(p[alias]===c)){delete p[alias];}}function makeCh(p,refs){var len=refs&&refs.length,ch,i;if(len){ch=[];for(i=0;i<len;i++){var c=preAddChild(p,refs[i]);if(!c){continue;}ch.push(c);postAddChild(p,c);}}return ch;}mstrmojo._HasChildren=mstrmojo.provide("mstrmojo._HasChildren",{_meta_usesSuper:false,children:null,postCreateChildren:mstrmojo.emptyFn,onaddChild:null,onremoveChild:null,initChildren:function initChildren(){var propertyName="children",children=this[propertyName];if(!children){return ;}this[propertyName]=null;this._set_children(propertyName,children,true);this.postCreateChildren();},_set_children:function _set_children(n,v,silent){var ch=this.children;if(v!==ch){if(ch){this.removeChildren(null,silent);}this.addChildren(v,0,silent);}return false;},destroyChildren:function destroyChildren(meDestroying){var ch=this.children,len=(ch&&ch.length)||0,i;if(len){for(i=len-1;i>-1;i--){var c=ch[i];if(c&&c.destroy){c.destroy(meDestroying);if(!meDestroying){postRemoveChild(this,c);}}}if(!meDestroying){ch.length=0;}}},invalidateChildren:function invalidateChildren(){mstrmojo.array.forEach(this.children,function(child){child.invalidate();});},invalidate:function invalidate(){this.invalidateChildren();},addChildren:function addChildren(c,idx,silent){if(!c){return c;}var isArr=c.constructor===Array,arr=makeCh(this,isArr?c:[c]);if(arr&&arr.length){var ch=this.children||[];if(idx===null||idx===undefined){idx=ch.length;}this.children=$ARR.insert(ch,idx,arr);if(!silent&&(this.onaddChild||$PUB.hasSubs(this.id,"addChild"))){this.raiseEvent({name:"addChild",value:arr,index:idx});}}return isArr?arr:(arr&&arr[0]);},removeChildren:function removeChildren(c,silent){var ch=this.children,c2r=c?[c]:(this.children||[]).concat(),len=c2r.length,idx=-1,i;if(len){for(i=len-1;i>-1;i--){postRemoveChild(this,c2r[i]);}if(c){idx=$ARR.removeItem(ch,c);}else{if(ch){ch.length=0;idx=0;}}if(!silent&&(this.onremoveChild||$PUB.hasSubs(this.id,"removeChild"))){this.raiseEvent({name:"removeChild",value:c2r,index:idx});}}return idx;},removeAndDestroyChild:function removeAndDestroyChild(child,silent,ignoreDOM){if(child){if(child.parent!==this){throw"Unable to remove an object that is not in the children collection.";}this.removeChildren(child,silent);child.destroy(ignoreDOM);}}});}());