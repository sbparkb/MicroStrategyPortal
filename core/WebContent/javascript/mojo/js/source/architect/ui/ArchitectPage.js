(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._FillsBrowser","mstrmojo._HasLayout","mstrmojo.architect.ui.Toolbar","mstrmojo.architect.ui.ArchitectPageLayout");mstrmojo.architect.ui.ArchitectPage=mstrmojo.declare(mstrmojo.Container,[mstrmojo._FillsBrowser,mstrmojo._HasLayout],{scriptClass:"mstrmojo.architect.ui.ArchitectPage",markupString:'<div id="{@id}" class="mstrmojo-architect {@cssClass}" style="{@cssText}"><div class="mstrmojo-architect-toolbar"></div><div class="mstrmojo-architect-layout"></div></div>',markupSlots:{toolbar:function toolbar(){return this.domNode.firstChild;},layout:function layout(){return this.domNode.children[1];}},layoutConfig:{h:{toolbar:"36px",layout:"100%"},w:{toolbar:"all",layout:"100%"},xt:true},layoutWidget:undefined,toggleDatabaseView:function toggleDatabaseView(show){this.layoutWidget.toggleDatabaseView(show);},toggleProjectTableView:function toggleProjectTableView(show){this.layoutWidget.toggleProjectTableView(show);},closeViewObject:function closeViewObject(){this.layoutWidget.closeViewObject();},updateViewObjectName:function updateViewObjectName(itemID,itemName){this.layoutWidget.updateViewObjectName(itemID,itemName);},toggleViewList:function toggleViewList(){this.layoutWidget.toggleViewList();},switchView:function switchView(newViewType){this.layoutWidget.switchView(newViewType);},render:function render(){if(this.error){this.renderPageLoadError();}else{this._super();}},browserResized:function browserResized(size){var newWidth=parseInt(size.w,10)-1+"px",newHeight=parseInt(size.h,10)-45+"px",oldHeight=this.height,oldWidth=this.width;if(oldHeight&&newHeight!==oldHeight){this.set("height",newHeight);}else{this.height=newHeight;}if(oldWidth&&newWidth!==oldWidth){this.set("width",newWidth);}else{this.width=newWidth;}return true;},renderPageLoadError:function renderPageLoadError(){var err=this.error,message=err.message,title=err.title,buttons=err.btns;mstrApp.onerror(err);if(!buttons||!buttons.length){mstrmojo.alert(message,null,title);}else{mstrmojo.confirm(message,null,{buttons:buttons,title:title});}},children:[{scriptClass:"mstrmojo.architect.ui.Toolbar",slot:"toolbar",alias:"toolbarWidget"},{scriptClass:"mstrmojo.architect.ui.ArchitectPageLayout",alias:"layoutWidget",slot:"layout"}]});}());