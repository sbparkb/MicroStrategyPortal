(function(){mstrmojo._HasRelativeUrls=mstrmojo.provide("mstrmojo._HasRelativeUrls",{_mixinName:"mstrmojo._HasRelativeUrls",relativeUrls:[],update:function update(node){this._super(node);var me=this,hostUrl=mstrApp.getConfiguration().getHostUrlByProject(mstrApp.getCurrentProjectId());mstrmojo.array.forEach(this.relativeUrls,function(p){var url=me[p];if(url&&(url.indexOf("://")===-1&&url.indexOf("data:")!==0)){me[p]=hostUrl+url;}});}});}());