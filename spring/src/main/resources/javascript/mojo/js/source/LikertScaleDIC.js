(function(){mstrmojo.requiresCls("mstrmojo.TableLayoutList","mstrmojo._IsTableLayoutListDIC","mstrmojo._IsInputControl","mstrmojo.css");function getTitleItems(items){var arr=[];mstrmojo.array.forEach(items,function(v){arr.push(v.n);});return arr;}var $C=mstrmojo.css;mstrmojo.LikertScaleDIC=mstrmojo.declare(mstrmojo.TableLayoutList,[mstrmojo._IsTableLayoutListDIC,mstrmojo._IsInputControl],{scriptClass:"mstrmojo.LikertScaleDIC",styleCssClass:"scale",init:function(props){this._super(props);this.items=this.getItems();this.titleItems=getTitleItems(this.items);},getDisplayValue:function getDisplayValue(){return(this.selectedIndex>=0)?this.items[this.selectedIndex].n:this.dv;},getLeftEndTitle:function getLeftEndTitle(idx){return idx>=0?(this.dic.mint||""):"";},getRightEndTitle:function(idx){return idx>=0?(this.dic.maxt||""):"";},postBuildRendering:function(){this._super();if(!mstrmojo.isDescendant(this.owner,this)&&this.showByDefault){this.set("height",(this.openerStyle.ih||0)+"px");this.set("width",(this.openerStyle.iw||0)+"px");}$C.toggleClass(this.domNode,"disabled",!this.enabled);}});}());