(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo.fx","mstrmojo.locales","mstrmojo.expr","mstrmojo.date","mstrmojo.string","mstrmojo.css");var $C=mstrmojo.css,$D=mstrmojo.dom,$E=mstrmojo.expr,DTP=$E.DTP,$P=mstrmojo.date,$H=mstrmojo.hash,$A=mstrmojo.array,$S=mstrmojo.string,$RMV=$A.removeIndices;var _pre_table='<table style="width: 200px; table-layout: fixed">',_post_table="</table>";var _daysPerWeek=7;function _getLeadingBlanks(y,m,fdw){var fd=$P.getFirstDateOfMonth(y,m);return(fd.getDay()-fdw+8)%_daysPerWeek;}function isDateDisabled(day,month,year,min,max){var currentDate=$P.getDateJson(new Date(month+"/"+day+"/"+year));return($P.compareDate(currentDate,max)>0);}function isDateSelected(selectedDates,day,month,year){if(selectedDates&&selectedDates.day===day&&selectedDates.month===month&&selectedDates.year===year){return 0;}return -1;}function isDateBetween(selectedDates,fromDate,day,month,year){var currentDate=$P.getDateJson(new Date(month+"/"+day+"/"+year));if(fromDate.day.toString()==="NaN"){return -1;}else{if(selectedDates&&fromDate&&$P.compareDate(selectedDates,fromDate)<=0&&$P.compareDate(selectedDates,currentDate)<=0&&$P.compareDate(fromDate,currentDate)>=0){return 0;}}return -1;}function updateTraversalIcons(widget,prev,next){var db=widget.decreaseButton,ib=widget.increaseButton,cssPrefix="mstrmojo-Calendar",updateCSS=function(node,className,date){node.className=(cssPrefix+className)+((isDateDisabled(date.d,date.m,date.y,widget.min,widget.max))?" disabled":"");};updateCSS(db,"-decrease",prev);updateCSS(ib,"-increase",next);}function parseDateAndTimeToJSON(value){var dt=$P.parseDateAndOrTime(value),d,t,r;if(dt){r={};d=dt.date;t=dt.time;if(d){$H.copy(d,r);}if(t){$H.copy(t,r);}}return r;}function updateCalendarView(view,year,month,yrs,thisCalendar,theOtherCalendar,action){var next,y,direction;switch(view){case"day":next=(action==="decrease")?$P.getPreMonth(year,month):$P.getNextMonth(year,month);thisCalendar.set("browseMonth",next.m);thisCalendar.set("browseYear",next.y);theOtherCalendar.set("browseMonth",month);theOtherCalendar.set("browseYear",year);break;case"month":y=(action==="decrease")?year-1:year+1;thisCalendar.set("browseYear",y);theOtherCalendar.set("browseYear",year);break;case"year":y=(action==="decrease")?yrs-25:yrs+25;thisCalendar.yearRangStart=y;theOtherCalendar.yearRangStart=yrs;break;}direction=(action==="decrease")?"left":"right";thisCalendar.switchViewTo(view,direction);theOtherCalendar.switchViewTo(view,direction);}mstrmojo.DI.DICalendar=mstrmojo.declare(mstrmojo.Calendar,null,{cssClass:"mstrmojo-di-calendar",max:$P.getDateJson(new Date()),markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";},onbrowseMonthChange:function(){this.monthLabel.innerHTML=this.monthNames(this.browseMonth-1);},onbrowseYearChange:function(){this.yearLabel.innerHTML=this.browseYear;},ondtpChange:function(){this.timePart.style.display=(this.dtp===DTP.TIMESTAMP||this.dtp===DTP.TIME)?"block":"none";},onvalueChange:function(){this.updateSelectedDate();},onchangeValueOnOKChange:function(){if(this.tools){this.tools.style.display=(this.changeValueOnOK?"block":"none");}this.buttonsNode.style.display=(this.wasAdvanced||this.changeValueOnOK||(this.showAdvanced&&this.isAdvanced)?"block":"none");this.advancedNode.style.display=this.showAdvanced?"block":"none";}},dayNames:function(i){var dayShortNames=["Su","M","Tu","W","Th","F","Sa"];return dayShortNames[i];},decrease:function(){var rightCalendar=this.parent.getRightCalendar();updateCalendarView(this.currentView,this.browseYear,this.browseMonth,this.yearRangStart,this,rightCalendar,"decrease");},increase:function(){var leftCalendar=this.parent.getLeftCalendar();updateCalendarView(this.currentView,this.browseYear,this.browseMonth,this.yearRangStart,this,leftCalendar,"increase");},updateSelectedDate:function updateSelectedDate(){var value=this.value,selectedDates=this.selectedDates,jsonValue;if(value){jsonValue=parseDateAndTimeToJSON(value);}if(!jsonValue){jsonValue=$P.getDateJson(new Date());}if(isDateDisabled(jsonValue.day,jsonValue.month,jsonValue.year,this.min,this.max)){if(this.min&&$P.compareDate(jsonValue,this.min)<0){jsonValue=parseDateAndTimeToJSON(this.min);}else{if(this.max&&$P.compareDate(jsonValue,this.max)>0){jsonValue=parseDateAndTimeToJSON(this.max);}}}if(this.alias==="leftCal"&&jsonValue.month!==1){jsonValue.month=jsonValue.month-1;}else{if(this.alias==="rightCal"&&jsonValue.month===1){jsonValue.month=jsonValue.month+1;}else{if(this.parent.parent.alias==="fromDate"){selectedDates.push(jsonValue);}}}this.set("browseMonth",jsonValue.month);this.set("browseYear",jsonValue.year);this.updateView(this.currentView);},onValueUpdate:function(){var op=this.parent&&this.parent.opener;if(op){var v=op.value,ls=(window.mstrConfig&&window.mstrConfig.listSep)||";";if(op.isList&&!$S.isEmpty(v)){op.set("value",op.value+ls+this.value);}else{op.set("value",this.value);}op.closePopup();}},processEvent:function(evt){var selectedDates=this.selectedDates,day,ma;if(evt===this.monthLabel){return true;}if(evt===this.yearLabel){return true;}if($D.contains(this.dayView,evt,false,this.domNode)){var by=this.browseYear,bm=this.browseMonth,pnm;day=parseInt(evt.innerHTML,10);ma=parseInt(evt.getAttribute("m"),10);if(!isNaN(day)&&!isNaN(ma)){pnm=(ma===0)?{y:by,m:bm}:(ma===1?$P.getNextMonth(by,bm):$P.getPreMonth(by,bm));if(isDateDisabled(day,pnm.m,pnm.y,this.min,this.max)){return true;}var selIndex=isDateSelected(selectedDates,day,bm,by);if(selIndex===-1){this.parent.removeSelection(0);$C.addClass(evt,["selected"]);selectedDates.push({day:day,month:pnm.m,year:pnm.y});}else{this.parent.removeSelection(selIndex);}if(ma===1){this.increase();}else{if(ma===-1){this.decrease();}}if(!this.changeValueOnOK){this.updateValue();}}}else{this._super(evt);}return true;},dayViewHTML:function(){var y=this.browseYear,m=this.browseMonth,dm=$P.getDaysOfMonth(y,m),pm=$P.getPreMonth(y,m),dpm=$P.getDaysOfMonth(pm.y,pm.m),nm=$P.getNextMonth(y,m),lb=_getLeadingBlanks(y,m,this.firstDayOfWeek),html=[],c=0,fd=this.parent.parent.fromDate.value||this.parent.parent.fromDate,td=this.parent.parent.toDate.value||this.parent.parent.toDate,min=this.min,max=this.max,date,status,i;var theOtherCalendar=(this.alias==="leftCal")?this.parent.getRightCalendar():this.parent.getLeftCalendar();var sd=(this.selectedDates.length===0)?theOtherCalendar.selectedDates:this.selectedDates;var fromDate=$P.getDateJson(new Date(fd));var toDate=$P.getDateJson(new Date(td));updateTraversalIcons(this,{d:dpm,m:pm.m,y:pm.y},{d:1,m:nm.m,y:nm.y});html.push(_pre_table);html.push(this._dayViewTHead());html.push("<tr>");for(i=0;i<lb;i++){status=(isDateDisabled(date,pm.m,pm.y,min,max))?"disabled":"";html.push('<td><div m="-1">');html.push("");html.push("</div></td>");c++;}for(i=0;i<dm;i++){date=i+1;status=(isDateDisabled(date,m,y,min,max))?" disabled":"";if(this.parent.parent.alias==="fromDate"){if(toDate.day.toString()==="NaN"&&fromDate.day.toString()==="NaN"){html.push('<td><div class="mstrmojo-Calendar-day-cur'+((isDateSelected(sd[0],date,m,y)!==-1)?" selected":"")+status+'" m="0">');}else{if(toDate.day.toString()==="NaN"){html.push('<td><div class="mstrmojo-Calendar-day-cur'+((isDateSelected(fromDate,date,m,y)!==-1)?" selected":"")+status+'" m="0">');}else{html.push('<td><div class="mstrmojo-Calendar-day-cur'+((isDateBetween(fromDate,toDate,date,m,y)!==-1)?" selected":"")+status+'" m="0">');}}}else{if(toDate.day.toString()==="NaN"){html.push('<td><div class="mstrmojo-Calendar-day-cur'+((isDateSelected(fromDate,date,m,y)!==-1)?" selected":"")+status+'" m="0">');}else{html.push('<td><div class="mstrmojo-Calendar-day-cur'+((isDateBetween(fromDate,toDate,date,m,y)!==-1)?" selected":"")+status+'" m="0">');}}html.push(i+1);html.push("</div></td>");if((++c)%_daysPerWeek===0){html.push("</tr><tr>");}}html.push("</tr>");html.push(_post_table);return html.join("");},_dayViewTHead:function(){var html=[],pre='<thead><tr class="mstrmojo-di-Calendar-thead">',post="</tr></thead>",fd=this.firstDayOfWeek===1?0:1,dayNames=this.dayNames,i;html.push(pre);for(i=fd;i<_daysPerWeek;i++){html.push("<td>");html.push(dayNames(i));html.push("</td>");}if(fd===1){html.push(dayNames(0));}html.push(post);return html.join("");}});}());