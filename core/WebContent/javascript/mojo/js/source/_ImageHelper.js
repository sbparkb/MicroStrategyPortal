(function(){function decodeXmlSpecialChars(str){return str.replace(/&apos;/g,"'").replace(/&quot;/g,'"').replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");}mstrmojo._ImageHelper=mstrmojo.provide("mstrmojo._ImageHelper",{getImage:function getImage(url){var app=mstrApp,config=app.getConfiguration();if(url){if(url.indexOf("\\")>=0){url=url.replace(/\\/g,"/");}url=decodeXmlSpecialChars(url);if(url===decodeURI(url)){url=encodeURI(url);}}if(config&&url&&url.indexOf("://")===-1){url=config.getHostUrlByProject(app.getCurrentProjectId())+url;}return(mstrApp.useBinaryFormat)?String(mstrMobileApp.getImage(url)):url;}});}());