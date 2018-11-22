(function(){mstrmojo.requiresCls("mstrmojo.prompt.WebPrompt","mstrmojo.array","mstrmojo.mstr.EnumDataType","mstrmojo.mstr.WebAttribute","mstrmojo.mstr.WebElements","mstrmojo.mstr.WebAttributeForm","mstrmojo.mstr.WebExpression","mstrmojo.mstr.WebFilter");mstrmojo.requiresDescs(8407,8408,8759);var $ARF=mstrmojo.array.forEach;var promptStyles=mstrmojo.prompt.WebPrompt.STYLES;var geoMapping={0:"country",1:"administrative_area_level_1",2:"locality",3:"postal_code"};function findGeoValue(results,p){results=results||[];var mapping=(p&&p.prs&&p.prs.GeographicMapping)||0,type=geoMapping[mapping],fnd=false,v="";$ARF(results,function(r){$ARF(r.address_components,function(a){$ARF(a.types,function(ti){if(ti===type){v=a.short_name;fnd=true;return false;}});if(fnd){return false;}});if(fnd){return false;}});return v;}var $F=mstrmojo.mstr.EnumFunction,$D_T=mstrmojo.mstr.EnumDataType;function populateElementsFromDateAnswer(callbacks){var dates=this.dateAnswer,len=dates&&dates.length,i=1;if(len){var form=new mstrmojo.mstr.WebAttributeForm({did:this.origin.dateFormID}),expr=new mstrmojo.mstr.WebExpression(),filter=new mstrmojo.mstr.WebFilter({expression:expr}),node=expr.newAQSubExpression(this.origin,form,$F.FunctionIn,$D_T.DataTypeDate,dates[0]);for(i;i<len;i++){expr.createTimeNode(dates[i],node);}var elems=this.origin.getElements({shortFilterXML:filter.getXML(),blockBegin:1,blockCount:-1});var me=this,fnSuccess=callbacks.success;callbacks.success=function(){me.dateAnswer=null;me.answer.set("items",elems.items);if(!elems.items.length&&callbacks.failure){callbacks.failure(mstrmojo.desc(8759,"No data found for the selected date(s)."));}else{fnSuccess();}};elems.getItems(0,callbacks);}else{this.answer.set("items",[]);this.dateAnswer=null;callbacks.success();}}mstrmojo.prompt.WebElementsPrompt=mstrmojo.declare(mstrmojo.prompt.WebPrompt,null,{scriptClass:"mstrmojo.prompt.WebElementsPrompt",answer:"",preAnswer:"",defAnswer:"",suggestion:null,origin:null,filter:null,dateAnswer:null,getStyle:function getStyle(){var style=this._style;if(!style){var promptProperties=this.prs;if(promptProperties.DisplayStyle==="Calendar"&&!!this.origin.dateFormID){style=promptStyles.CALENDAR;}else{style=promptStyles.LIST;}this._style=style;}return parseInt(style,10);},syncDateAnswer:function syncDateAnswer(callbacks){if(this.dateAnswer){populateElementsFromDateAnswer.call(this,callbacks);}else{callbacks.success();}},validate:function validate(v){this._super(v);v=(v===undefined||v===null)?(this.answer&&this.answer.items):v;var cnt=(v&&v.length)||0,min=parseInt(this.min,10),max=parseInt(this.max,10),errText="";if(!isNaN(min)&&cnt<min){errText=mstrmojo.desc(8407,"You have made (#) selections, which is fewer selections than the required (##) for this prompt. Please make more selections.").replace("##",min).replace("#",cnt);}else{if(!isNaN(max)&&cnt>max){errText=mstrmojo.desc(8408,"You have made (#) selections, which is more selections than are allowed (##) for this prompt. Please remove some selections.").replace("##",max).replace("#",cnt);}}if(errText){throw new Error(errText);}},isAnswerEmpty:function isAnswerEmpty(v){v=(v===undefined||v===null)?(this.answer&&this.answer.items):v;return !v||(v.length===0);},getAvailable:function getAvailable(){var res;if(this.suggestion&&this.suggestion.items.length>0){res=this.suggestion;}else{res=this.origin.getElements();}return res;},canSearch:function canSearch(){return !(this.suggestion&&this.suggestion.items.length>0);},getDisplayValue:function getDisplayValue(){if(this.getStyle()===promptStyles.CALENDAR&&this.dateAnswer){return this.dateAnswer.join(",");}var answer=this.answer,items=(answer&&answer.items)||[],i=0,len=items.length,value=[];for(i;i<len;i++){value.push(items[i].n);}return value.join(", ");},getAnswerAsDateArray:function(){var dateUtil=mstrmojo.date,dates=[],i,dateObj,dateAnswer=this.dateAnswer,answer=this.answer&&this.answer.items;if(this.getStyle()===promptStyles.CALENDAR){if(dateAnswer){for(i=0;i<dateAnswer.length;i++){dateObj=dateUtil.parseDate(dateAnswer[i]);dateObj.n=dateObj.match;dates.push(dateObj);}}else{if(answer){for(i=0;i<answer.length;i++){dateObj=dateUtil.parseDate(answer[i].n);dateObj.n=dateObj.match;dates.push(dateObj);}}}}return dates;},getSearch:function getSearch(searchPattern,matchCase,onTarget){var cfg={searchPattern:searchPattern,matchCase:matchCase};if(onTarget){cfg.searchTarget=this.searchTarget;}return this.origin.getElements(cfg);},populate:function populate(props){this._super(props);var ans=(props&&props.ans&&props.ans.elms)||[];this.answer=new mstrmojo.mstr.WebElements({items:ans,totalSize:ans.length,blockBegin:1,blockCount:-1});var org=props&&props.orgn;if(org){this.origin=new mstrmojo.mstr.WebAttribute(org);if(this.dataSourcesXML){this.origin.browseConfig.dataSources=this.dataSourcesXML;}var prs=this.prs;if(prs&&prs.DisplayStyle==="GeoLocation"&&prs.LookupForm){var att=prs.LookupForm.split("~");this.searchTarget=new mstrmojo.mstr.WebAttribute({did:att[0],t:att[1],st:att[3],n:att[2]});}this.answer.source=this.origin;}var suggest=props&&props.suggest;if(suggest){var suggestion=this.suggestion=new mstrmojo.mstr.WebElements({items:suggest});}var fil=props&&props.fres;if(fil){this.filter=new mstrmojo.mstr.WebOI(fil);if(org){this.origin.browseConfig.filter=this.filter;}}},populateAnswer:function(answer){this.answer.items=mstrmojo.hash.cloneArray(answer.ans.elms);},buildAnswerObject:function buildAnswerObject(){var ob=this._super();ob.ans={elms:mstrmojo.hash.cloneArray(this.answer.items)};return ob;},prepareAnswer:function prepareAnswer(callbacks){this.syncDateAnswer(callbacks);},setAnswerValue:function setAnswerValue(v){this.validate(v);if(this.getStyle()===promptStyles.CALENDAR){this.set("dateAnswer",v);}else{this.answer.set("items",v);}},getAnswersCount:function getAnswersCount(){if(this.dateAnswer){return this.dateAnswer.length;}if(this.answer){return this.answer.items.length;}return 0;},buildShortAnswerXML:function buildShortAnswerXML(builder){if(this.dateAnswer){alert("need to sync date answers first.");}else{if(this.answer){this.answer.buildShortXML(builder);}}},getGeoTargetValue:function getGeoTargetValue(callbacks){var me=this;mstrmojo.GeoLocation.getCurrentAddress({success:function(address){var loc=findGeoValue(address,me);if(callbacks&&callbacks.success){callbacks.success(loc);}},failure:function(err){if(callbacks&&callbacks.failure){callbacks.failure(err);}}});}});}());