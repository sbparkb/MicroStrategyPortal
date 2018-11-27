(function(){mstrmojo.requiresCls("mstrmojo.Editor","mstrmojo.Label","mstrmojo.TextBox","mstrmojo.Table","mstrmojo.HBox","mstrmojo.Button");var $DESC=mstrmojo.desc,$CSS=mstrmojo.css;mstrmojo.requiresDescs(221,1442,13216,13217,13218,13219,13220,13221,13222);function doEscape(st){return st.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");}function doUnescape(st){return st.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,"&");}function constructOA(isOneTier,clientID,clientSecret,clientURL){var escaped_clientID=doEscape(clientID);var escaped_clientSecret=doEscape(clientSecret);var oa_str='<prs><ClientID v="'+escaped_clientID+'"/><ClientSecret v="'+escaped_clientSecret+'"/>';if(!isOneTier){var escaped_clientURL=doEscape(clientURL);oa_str+='<RedirectURL v="'+escaped_clientURL+'"/>';}return oa_str+"</prs>";}function doSave(isDefault){var oapEditor=this;var dbr=oapEditor.oaDBRole;var constants=mstrmojo.DI.DIConstants;var oa;if(isDefault){oa=constants.setDefaultOAuthParamCMD;}else{oa=constructOA(oapEditor.isOneTier,oapEditor.inputPanel.clientID.value,oapEditor.inputPanel.clientSecret.value,oapEditor.inputPanel.callbackURL.value);}dbr.oa=oa;mstrApp.getRootController().getDataService().saveDBRole({errorMsg:$DESC(13216,"Save OAuth parameters failed."),success:mstrmojo.emptyFn,failure:function failure(res){mstrApp.getRootController().displayError(this.errorMsg+res.message);},complete:function complete(){oapEditor.close();}},{dbroleinfo:JSON.stringify(dbr)});}function populateParams(oapEditor){var oa=oapEditor.oaDBRole.oa;if(oa!==""){var p_id=oa.indexOf("ClientID");var p_url=oa.indexOf("RedirectURL");var clientID=oa.substring(p_id+"ClientID".length+4,oa.indexOf('"/>',p_id));var clientURL=oa.substring(p_url+"RedirectURL".length+4,oa.indexOf('"/>',p_url));oapEditor.inputPanel.clientID.set("value",doUnescape(clientID));if(!oapEditor.isOneTier&&p_url>-1){oapEditor.inputPanel.callbackURL.set("value",doUnescape(clientURL));}}}function getDBRole(){var oapEditor=this;mstrApp.getRootController().getDataService().populateDBRoles({errorMsg:$DESC(13217,"Get OAuth information failed."),success:function(res){oapEditor.oaDBRole=res.dbrs[0];populateParams(oapEditor);},failure:function(res){mstrApp.getRootController().displayError(this.errorMsg+res.message);}},{objectID:oapEditor.did});}function changeBtnEnabled(){var inputPanel=this;var oapEditor=inputPanel.parent;var clientURL=inputPanel.callbackURL.value;var clientID=inputPanel.clientID.value;var clientSecret=inputPanel.clientSecret.value;if(clientID&&clientID.length>0&&clientSecret&&clientSecret.length>0){if(oapEditor.isOneTier||(clientURL&&clientURL.length>0)){oapEditor.btns.ok.set("enabled",true);$CSS.addClass(oapEditor.btns.ok.domNode,"hot");}}else{oapEditor.btns.ok.set("enabled",false);$CSS.removeClass(oapEditor.btns.ok.domNode,"hot");}}mstrmojo.DI.DIOAuthParaEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.DI.DIOAuthParaEditor",cssClass:"mstrmojo-di-DIOAuthParaEditor",title:"",sourceName:"",isOneTier:false,did:"",sourceItem:null,oaDBRole:null,children:[{scriptClass:"mstrmojo.Table",cssClass:"mstrmojo-Input-Panel",rows:3,cols:2,alias:"inputPanel",checkValue:function(tb){if(tb.value&&tb.value.length>0){changeBtnEnabled.call(this);}else{this.parent.btns.ok.set("enabled",false);}},children:[{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-OAuthParaEditor-Label",slot:"0,0",alias:"callbackURLLabel",text:$DESC(13218,"Callback URL")},{scriptClass:"mstrmojo.TextBox",cssClass:"mstrmojo-OAuthParaEditor-urlInput",slot:"0,1",alias:"callbackURL",onvalueChange:function(){this.parent.checkValue(this);}},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-OAuthParaEditor-Label",slot:"1,0",text:$DESC(13219,"Client ID")},{scriptClass:"mstrmojo.TextBox",cssClass:"mstrmojo-OAuthParaEditor-textInput",slot:"1,1",alias:"clientID",onvalueChange:function(){this.parent.checkValue(this);}},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-OAuthParaEditor-Label",slot:"2,0",text:$DESC(13220,"Client Secret")},{scriptClass:"mstrmojo.TextBox",cssClass:"mstrmojo-OAuthParaEditor-textInput",slot:"2,1",alias:"clientSecret",type:"password",onvalueChange:function(){this.parent.checkValue(this);}}]},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-OAuthParaEditor-setDefault",alias:"setDefault",text:$DESC(13221,"Reset to Default"),onclick:function(){doSave.call(this.parent,true);}},{scriptClass:"mstrmojo.HBox",alias:"btns",slot:"buttonNode",cssClass:"mstrmojo-Editor-buttonBar",children:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-VIButton mstrmojo-Editor-button",alias:"ok",text:mstrmojo.desc(1442,"OK"),enabled:false,onclick:function(){doSave.call(this.parent.parent,false);}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-VIButton mstrmojo-Editor-button",alias:"cancel",text:mstrmojo.desc(221,"Cancel"),onclick:function(){this.parent.parent.close();}}]}],onOpen:function onOpen(){if(this._super){this._super();}this.set("title",$DESC(13222,"Set OAuth Parameters for ###").replace("###",this.sourceName));this.inputPanel.callbackURL.set("value","");this.inputPanel.clientID.set("value","");this.inputPanel.clientSecret.set("value","");getDBRole.call(this);this.setDefault.set("visible",this.isOneTier);this.inputPanel.callbackURL.set("visible",!this.isOneTier);this.inputPanel.callbackURLLabel.set("visible",!this.isOneTier);},onClose:function onClose(){if(this._super){this._super();}mstrmojo.css.removeClass(this.sourceItem.domNode,"selected");}});}());