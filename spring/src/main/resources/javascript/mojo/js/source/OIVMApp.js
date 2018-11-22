(function(){mstrmojo.requiresCls("mstrmojo.Doc","mstrmojo.dom","mstrmojo.array","mstrmojo.ExpressDocBuilder","mstrmojo.ToolBar","mstrmojo.OIVMPage","mstrmojo.ToolBarBuilder","mstrmojo.TabContainer","mstrmojo.ScrollingTabStrip","mstrmojo.ToolBarModel","mstrmojo.OIVMDocController","mstrmojo._IsWebApp","mstrmojo.DocModel");var $ARR=mstrmojo.array;var DOM=mstrmojo.dom;function setupBackspaceHandler(){DOM.attachEvent(window,"keydown",function(e){var isBackspace=e.keyCode===8;e=e||window.event;if(isBackspace&&mstrApp.ignoreBackSpace){DOM.preventDefault(window,e);}});}function getBackButtonItems(){var toolbarWidget=mstrmojo.all[this.tbId],toolbarChildren=toolbarWidget&&toolbarWidget.children;var idx=$ARR.find(toolbarChildren,"iconClass","tbBackPicker"),items=[];if(idx>0){var backButton=toolbarChildren[idx];items=backButton.items;backButton.selectedIndex=0;}return items;}function getThemeCssClass(themeID){return(themeID==="F1FED8AC42B57AC1B0E9518FED0F89D6")?"mojo-theme-dark":"mojo-theme-light";}mstrmojo.OIVMApp=mstrmojo.declare(mstrmojo.Obj,[mstrmojo._IsWebApp],{scriptClass:"mstrmojo.OIVMApp",enableWaitBox:true,start:function start(){var doc=new mstrmojo.Doc({slot:"stack"});doc.builder=new mstrmojo.ExpressDocBuilder({parent:doc});this.docId=doc.id;mstrApp.pathInfo.tbModelData=this.tbModelData;var pb=new mstrmojo.ui.pathbar.PathBar({slot:"pathbarNode",alias:"pathbar",pathInfo:mstrApp.pathInfo});var view=new mstrmojo.OIVMPage({placeholder:this.placeholder,themeClassName:getThemeCssClass(this.docModelData&&this.docModelData.thm.id),error:this.error,children:(pb.visible?[pb]:[]).concat([new mstrmojo.TabContainer({slot:"layout",layoutConfig:{h:{top:"auto",stack:"100%"},w:{top:"100%",stack:"100%"}},children:[new mstrmojo.ScrollingTabStrip({slot:"top",cssClass:"mstrmojo-layout-tabs",visible:false,bindings:{width:"this.parent.width"}}),doc]})])});if(this.hasHiddenSections){view.layoutConfig.h.toolbar="0px";}if(!pb.visible){view.layoutConfig.h.pathbarNode="0px";}view.render();var docModelData=this.docModelData;if(docModelData&&docModelData.mstrerr){mstrmojo.err(docModelData.mstrerr);}else{if(!this.error){var docModel=doc.model=new mstrmojo.DocModel(docModelData),dc=doc.controller=docModel.controller=new mstrmojo.OIVMDocController({view:doc});dc.set("model",docModel);dc.start();if(docModel.zt===1||docModel.zt===2){view.browserResized(view.getBrowserDimensions(),true);}if(pb.visible){pb.dc=dc;}mstrApp.docModel=docModel;mstrmojo.locales.load(function(){doc.buildChildren();if(mstrApp!==undefined){mstrLocalStorage.addScreenshot(mstrApp.getLastMsgRecoveryInfo(),view.layout);}});if(mstrApp.pendingMojoEditor&&mstrApp.pendingMojoEditor!==""){doc["show"+mstrApp.pendingMojoEditor]();delete mstrApp.pendingMojoEditor;}var rf=doc.model.rf;if(rf>0){doc.model.controller.startAutoRefresh();}this.startSessionManager();if(docModel.isHTML5VI){mstrmojo.css.addClass(document.body,["html5vi"]);}}}setupBackspaceHandler.call(this);},getVersion:function getVersion(){return(this.buildVersion?"v="+this.buildVersion:"")+(this.appVersion?"&apv="+this.appVersion:"");},addBackButtonItem:function addBackButtonItem(item){getBackButtonItems.call(this).unshift(item);},removeBackButtonItems:function removeBackButtonItem(count){getBackButtonItems.call(this).splice(0,count);}});}());