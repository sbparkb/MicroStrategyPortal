(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.ui.Checkbox","mstrmojo.dom");mstrmojo.requiresDescs(13189,2968,1095,11841,221,3474,14230,14231,14232,14233,14234,14235,11656,14236,14237,14238,14239,14240,14241,14242,14243);var _D=mstrmojo.dom;mstrmojo.Refine.RefineClusteringDialog=mstrmojo.declare(mstrmojo.Container,[mstrmojo._IsPopup,mstrmojo._IsMovable],{scriptClass:"mstrmojo.Refine.RefineClusteringDialog",method:"binning",algorithm:"fingerprint",facets:[],columnName:"",markupString:'<div id="{@id}" class="refine-clustering-dialog mojo-theme-light"><div class="refine-clustering-dialog-header"></div><div class="refine-clustering-dialog-body"><div class="refine-clustering-dialog-info"><div class="refine-clustering-dialog-algorithm"></div><div class="refine-clustering-dialog-count"></div></div><div class="refine-clustering-dialog-table"></div></div><div class="refine-clustering-dialog-footer"><div class="refine-clustering-dialog-cancel"></div><div class="refine-clustering-dialog-merge"></div><div class="refine-clustering-dialog-mergeandredo"></div><div class="refine-clustering-dialog-selectall"></div><div class="refine-clustering-dialog-unselectall"></div></div><div class="refine-clustering-dialog-overlay"></div></div>',markupSlots:{editorNode:function(){return this.domNode;},headerNode:function(){return this.domNode.firstChild;},algorithmNode:function(){return this.domNode.children[1].children[0].children[0];},countNode:function(){return this.domNode.children[1].children[0].children[1];},tableNode:function(){return this.domNode.children[1].children[1];},cancelNode:function(){return this.domNode.children[2].children[0];},mergeNode:function(){return this.domNode.children[2].children[1];},mergeandredoNode:function(){return this.domNode.children[2].children[2];},selectAllNode:function(){return this.domNode.children[2].children[3];},unselectAllNode:function(){return this.domNode.children[2].children[4];}},markupMethods:{onzIndexChange:function(){this.domNode.style.zIndex=this.zIndex;}},getMovingHandle:function getMovingHandle(){return this.headerNode;},getMovingTarget:function getMovingTarget(){return this.editorNode;},preBuildRendering:function preBuildRendering(){this.placeholder=document.body.appendChild(document.createElement("div"));return this._super();},postBuildRendering:function postBuildRendering(){this.cluster();return this._super();},cluster:function(){var postParams={engine:this.controller.model.engine,clusterer:JSON.stringify({type:this.method,"function":this.algorithm,column:this.columnName,params:{}})};this.controller.computeClusters(postParams);this.clustering.set("visible",true);this.noCluster.set("visible",false);this.clusterTable.set("visible",false);},handleClustersFetched:function(event){this.updateData(event.clusters);this.countNode.innerHTML=mstrmojo.desc(14234,"#### cluster(s) found").replace("####",this.clusters.length);},updateData:function(data){var clusters=[];var i,j;for(i=0;i<data.length;i++){var me=data[i];var cluster={edit:false,choices:me,value:me[0].v,size:me.length};var sum=0;var sumSquared=0;var rowCount=0;for(j=0;j<cluster.choices.length;j++){var choice=cluster.choices[j];rowCount+=choice.c;var l=choice.v.length;sum+=l;sumSquared+=l*l;}cluster.rowCount=rowCount;cluster.avg=sum/cluster.choices.length;cluster.variance=Math.sqrt(sumSquared/cluster.choices.length-cluster.avg*cluster.avg);clusters.push(cluster);}this.clusters=clusters;this.updateAll();},updateAll:function(){this.renderTable(this.clusters);},renderTable:function(clusters){this.clustering.set("visible",false);if(clusters.length>0){this.clusterTable.populateData(clusters);this.clusterTable.set("visible",true);}else{this.noCluster.set("visible",true);}},apply:function(onDone){var clusters=this.clusters;var edits=[],i,j;for(i=0;i<clusters.length;i++){var cluster=clusters[i];if(cluster.edit){var values=[];for(j=0;j<cluster.choices.length;j++){values.push(cluster.choices[j].v);}edits.push({from:values,to:cluster.value});}}if(edits.length>0){this.controller.MergeCluster({columnName:this.columnName,expression:"value",description:mstrmojo.desc(14279,"Edit Cell")+" ["+this.columnName+"] (#### "+mstrmojo.desc(2968,"Rows")+")",edits:JSON.stringify(edits)},onDone);}else{mstrmojo.alert(mstrmojo.desc(13189,"You must check some checkboxes for your merges to be applied."));}},children:[{scriptClass:"mstrmojo.Box",slot:"headerNode",alias:"header",children:[{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-refine-title",alias:"title",bindings:{text:function(){return mstrmojo.desc(14230,'Cluster & Edit column "####"').replace("####",this.parent.parent.columnName);}}},{scriptClass:"mstrmojo.Button",iconClass:"mstrmojo-refine-close",onclick:function(){this.parent.parent.cancel.onclick();}}]},{scriptClass:"mstrmojo.HBox",slot:"algorithmNode",alias:"algorithmBox",children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(14231,"Algorithm")+": "},{scriptClass:"mstrmojo.ui.Pulldown",cssClass:"refine-pulldown",alias:"algorithm",items:[{n:mstrmojo.desc(14232,"Fingerprint"),algo:"fingerprint"},{n:mstrmojo.desc(14233,"Phonetic"),algo:"metaphone3"}],selectedIndex:0,onitemSelected:function(item){if(this.parent.parent.algorithm!==item.algo){this.parent.parent.algorithm=item.algo;this.parent.parent.cluster();}}}]},{scriptClass:"mstrmojo.Table",slot:"tableNode",cellCssClass:"refine-clustering-cell",alias:"clusterTable",populateData:function(clusters){this.removeChildren();this.unrender();this.rows=clusters.length+1;this.cols=5;var i=0,j;var headerText=[mstrmojo.desc(1095,"Merge")+"?",mstrmojo.desc(14235,"Cluster Size"),mstrmojo.desc(11656,"Row Count"),mstrmojo.desc(14236,"Values in Cluster"),mstrmojo.desc(14237,"New Cell Value")];var textNode={scriptClass:"mstrmojo.Label",cssClass:"refine-label"};for(j=0;j<this.cols;j++){textNode.slot=i+","+j;textNode.text=headerText[j];this.addChildren(textNode);}var checkNode={scriptClass:"mstrmojo.ui.Checkbox",oncheckedChange:function(){this.cluster.edit=this.checked;}};var inputNode={scriptClass:"mstrmojo.TextBox",onvalueChange:function(){this.cluster.value=this.value;}};var clusterNode={scriptClass:"mstrmojo.Container",markupString:"<ul></ul>",markupSlots:{containerNode:function(){return this.domNode;}}};var liNode={scriptClass:"mstrmojo.Container",markupString:'<li><a title="'+mstrmojo.desc(14238,"Use this value")+'" mstrAttach:click>{@Text}</a><span class="refine-clustering-cell-rows">({@Count} '+mstrmojo.desc(2968,"Rows")+")</span></li>",markupSlots:{textNode:function(){return this.domNode.children[0];}},onclick:function(){var mergeIdx=this.parent.row*5;var newCellIdx=this.parent.row*5+4;this.parent.parent.children[mergeIdx].set("checked",true);this.parent.parent.children[newCellIdx].set("value",this.textNode.innerHTML);}};for(i=1;i<this.rows;i++){var cluster=clusters[i-1];checkNode.slot=i+",0";checkNode.cluster=cluster;this.addChildren(checkNode);textNode.slot=i+",1";textNode.text=cluster.choices.length;this.addChildren(textNode);textNode.slot=i+",2";textNode.text=cluster.rowCount;this.addChildren(textNode);clusterNode.slot=i+",3";clusterNode.row=i;var clusterCell=new mstrmojo.Container(clusterNode);var c;for(c=0;c<cluster.choices.length;c++){var choice=cluster.choices[c];liNode.slot="containerNode";liNode.Text=choice.v;liNode.Count=choice.c;clusterCell.addChildren(liNode);}this.addChildren(clusterCell);inputNode.slot=i+",4";inputNode.value=cluster.value;inputNode.cluster=cluster;this.addChildren(inputNode);}this.render();this.updateCellClass();},updateCellClass:function(){var j;var rows=this.domNode.firstChild.children;var row=rows[0];var cells=row.children;for(j=0;j<5;j++){cells[j].className="refine-clustering-header";}}},{scriptClass:"mstrmojo.Widget",alias:"noCluster",slot:"tableNode",markupString:'<div style="padding: 10px;"><div style="font-size: 130%; color: #333;">'+mstrmojo.desc(14239,"No clusters were found with the selected method")+'</div><div style="padding-top: 1em; font-size: 110%; color: #888;">'+mstrmojo.desc(14240,"Try selecting another method above or changing its parameters")+"</div></div>",markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}}},{scriptClass:"mstrmojo.Widget",slot:"tableNode",alias:"clustering",markupString:'<div style="padding: 10px; font-size: 130%; color: #888;">'+mstrmojo.desc(11841,"Clustering")+'... <img src="../javascript/mojo/css/images/Refine/small-spinner.gif"></div>',markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",alias:"cancel",slot:"cancelNode",text:mstrmojo.desc(221,"Cancel"),onclick:function(){this.parent.destroy();}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton hot",alias:"merge",slot:"mergeNode",text:mstrmojo.desc(14241,"Merge and Close"),onclick:function(){var dialog=this.parent;var onDone=function(){dialog.destroy();};this.parent.apply(onDone);}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton hot",alias:"mergeandredo",slot:"mergeandredoNode",text:mstrmojo.desc(14242,"Merge and Recluster"),onclick:function(){var dialog=this.parent;var onDone=function(){dialog.cluster();};this.parent.apply(onDone);}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",alias:"selectAll",slot:"selectAllNode",text:mstrmojo.desc(3474,"Select All"),onclick:function(){var table=this.parent.clusterTable;var length=table.children.length;var i;for(i=5;i<length;i+=5){table.children[i].set("checked",true);}}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",alias:"unselectAll",slot:"unselectAllNode",text:mstrmojo.desc(14243,"Unselect All"),onclick:function(){var table=this.parent.clusterTable;var length=table.children.length;var i;for(i=5;i<length;i+=5){table.children[i].set("checked",false);}}}]});}());