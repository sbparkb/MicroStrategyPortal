(function(){var $A=mstrmojo.array,_check=function(newChild,refNode){var pos=-1;if(newChild==null||refNode==null){}else{var chn=this.childNodes;pos=$A.indexOf(chn,refNode);if(pos<0){}}return pos;},_prep=function(newChild){if(newChild.parentNode){newChild.parentNode.removeChild(newChild);}newChild.parentNode=this;};mstrmojo.mstr.WebNode=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.mstr.WebNode",exprType:0,nodeType:0,dataType:-1,dimType:1,childNodes:null,parentNode:null,getChildCount:function getChildCount(){return(this.childNodes&&this.childNodes.length)||0;},insertBefore:function insertBefore(newChild,refNode){var chn=this.childNodes,pos=_check.call(this,newChild,refNode);if(pos<0){_prep.call(this,newChild);$A.insert(chn,pos,newChild);}},insertAfter:function insertAfter(newChild,refNode){var chn=this.childNodes,pos=_check.call(this,newChild,refNode);if(pos<0){_prep.call(this,newChild);$A.insert(chn,pos+1,newChild);}},replaceChild:function replaceChild(newChild,oldChild){var chn=this.childNodes,pos=_check.call(this,newChild);if(pos<0){_prep.call(this,newChild);oldChild.parentNode=null;chn[pos]=newChild;}},removeChild:function removeChild(childNode){childNode.parentNode=null;$A.removeItem(this.childNodes,childNode);},appendChild:function appendChild(newChild){if(newChild){_prep.call(this,newChild);if(!this.childNodes){this.childNodes=[];}this.childNodes.push(newChild);}},buildShortXML:function buildShortXML(builder){builder.addChild("nd").addAttribute("et",this.exprType).addAttribute("nt",this.nodeType).addAttribute("dmt",this.dimType).addAttribute("ddt",this.dataType);var ch=this.childNodes;if(ch&&ch.length){var i;for(i=0;i<ch.length;i++){ch[i].buildShortXML(builder);}}this.buildTypeSpecificShortXML(builder);builder.closeElement();},buildTypeSpecificShortXML:function buildTypeSpecificShortXML(builder){}});}());