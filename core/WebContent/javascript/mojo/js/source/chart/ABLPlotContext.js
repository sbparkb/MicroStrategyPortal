(function(){mstrmojo.requiresCls("mstrmojo.Base","mstrmojo.chart.ABLOptions");var $C=mstrmojo.chart;mstrmojo.chart.ABLPlotContext=mstrmojo.declare(mstrmojo.Base,null,{scriptClass:"mstrmojo.chart.ABLPlotContext",mSeriesOptions:null,mABLOptions:null,mValueAxis:null,mCategoryAxisPtr:null,init:function init(props){this._super(props);this.mSeriesOptions=[];this.mValueAxis=[];this.mABLOptions=new $C.ABLOptions({});}});}());