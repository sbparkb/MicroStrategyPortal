(function(){mstrmojo.requiresCls("mstrmojo.mstr.WebOI","mstrmojo.mstr.WebElements");mstrmojo.mstr.WebAttribute=mstrmojo.declare(mstrmojo.mstr.WebOI,null,{scriptClass:"mstrmojo.mstr.WebAttribute",t:12,elemTotalSize:0,browseConfig:null,init:function(props){var bc=this.browseConfig={};if(props){if(props.bb){bc.blockBegin=props.bb;delete props.bb;}if(props.bc){bc.blockCount=props.bc;delete props.bc;}if(props.sz){this.totalSize=props.sz;delete props.sz;}}this.browseConfig={};this._super(props);},getElements:function(config){config=mstrmojo.hash.copy((this.browseConfig||{}),(config||{}));return new mstrmojo.mstr.WebElements({source:this,totalSize:this.totalSize||0,browseConfig:config});}});}());