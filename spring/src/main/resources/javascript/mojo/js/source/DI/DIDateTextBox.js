(function(){mstrmojo.requiresCls("mstrmojo.DateTextBox","mstrmojo.Calendar","mstrmojo.Popup","mstrmojo._HasPopup","mstrmojo.DI.DICalendar","mstrmojo.css");mstrmojo.requiresDescs(13128,13129,13130);var $CSS=mstrmojo.css,$P=mstrmojo.date,$A=mstrmojo.array,$RMV=$A.removeIndices,_daysPerWeek=7;var acceptedDateInput=["MM/DD/YYYY","today","yesterday"],regDaysAgo=/^\d+daysAgo$/;function updateCalendar(){var p=this._lastOpened;if(p&&p.visible){var leftC=this.calendar.leftCal;var rightC=this.calendar.rightCal;leftC.updateView(leftC.currentView);rightC.updateView(rightC.currentView);}}function _getLeadingBlanks(y,m,fdw){var fd=$P.getFirstDateOfMonth(y,m);return(fd.getDay()-fdw+8)%_daysPerWeek;}function isDateDisabled(date,max){return($P.compareDate(date,max)>0);}var defaultFormat="MM/DD/YYYY";mstrmojo.DI.DIDateTextBox=mstrmojo.declare(mstrmojo.DateTextBox,null,{scriptClass:"mstrmojo.DI.DIDateTextBox",fromDate:"",toDate:"",disabled:false,cssClass:"mstrmjo-di-DateTextBox",calendar:{scriptClass:"mstrmojo.Popup",cssClass:"mstrmojo-DateTextBox-calendar",locksHover:true,max:$P.getDateJson(new Date()),slot:"popupNode",onOpen:function(){var o=this.opener,z=o&&o.calendarZIndex,leftCal=this.leftCal,rightCal=this.rightCal,cfg=o&&o.calConfig,k;if(z){this.domNode.style.zIndex=z;}for(k in cfg){leftCal.set(k,cfg[k]);rightCal.set(k,cfg[k]);}},onvisibleChange:function(){var visible=this.visible,iconNode=this.opener.iconNode,inputNode=this.opener.inputNode,cssSelectedClass=" selected";iconNode.className="mstrmojo-DateTextBox-icon";inputNode.className="mstrmojo-DateTextBox-input";$CSS.toggleClass(iconNode,cssSelectedClass,visible);$CSS.toggleClass(inputNode,cssSelectedClass,visible);},getLeftCalendar:function(){return this.children[0];},getRightCalendar:function(){return this.children[1];},removeSelection:function(index){var widget=this.leftCal.selectedDates.length>0?this.leftCal:this.rightCal;if(widget.selectedDates.length>0){var divs=widget.dayView.getElementsByTagName("div"),sd=widget.selectedDates,date=sd[index],lb=_getLeadingBlanks(date.year,date.month,widget.firstDayOfWeek);$CSS.removeClass(divs[lb+date.day-1],["selected"]);$RMV(sd,index,1);}},children:[{scriptClass:"mstrmojo.DI.DICalendar",cssClass:"mstrmojo-di-calendar mstrmojo-Calendar-left",alias:"leftCal",bindings:{dtp:"this.parent.opener.dtp",value:"this.parent.opener.value",changeValueOnOK:function(){var dtp=this.parent.opener.dtp,cv=this.parent.opener.changeValueOnOK;return dtp===15||dtp===16||cv;}}},{scriptClass:"mstrmojo.DI.DICalendar",cssClass:"mstrmojo-di-calendar mstrmojo-Calendar-right",alias:"rightCal",bindings:{dtp:"this.parent.opener.dtp",value:"this.parent.opener.value",changeValueOnOK:function(){var dtp=this.parent.opener.dtp,cv=this.parent.opener.changeValueOnOK;return dtp===15||dtp===16||cv;}}}]},onclick:function(){this.calendarHandler();},onfocus:function(){this.calendarHandler();},onblur:function(){if(!this.disabled){var p=this._lastOpened,c=this._calendarConfig;if(this.value===""){this.set("value",defaultFormat);}if(this.value.indexOf("-")!==-1){this.value=mstrmojo.string.multiReplace(this.value,{"-":"/"});}var dateObj=mstrmojo.date.getDateJson(new Date(this.value));if(mstrmojo.array.indexOf(acceptedDateInput,this.value)!==-1||regDaysAgo.test(this.value)){return ;}else{if(isDateDisabled(dateObj,this.calendar.max)){var date=new Date();this.set("value",date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear());}else{if(!mstrmojo.date.doesDateExist(dateObj.month,dateObj.day,dateObj.year)){mstrApp.getRootController().displayError(mstrmojo.desc(13128,"Requests can only specify a date formatted as YYYY-MM-DD, ")+mstrmojo.desc(13129,"or as a relative date (e.g., today, yesterday, or NdaysAgo where N is a positive integer). ")+mstrmojo.desc(13130,"Please change your input into any of the aforementioned formats."),false);}else{this.set("value",dateObj.month+"/"+dateObj.day+"/"+dateObj.year);}}}}},onkeyup:function onkeyup(evt){evt.e.which=evt.e.which||evt.e.keyCode;if(evt.e.which===13){this.inputNode.blur();}},calendarHandler:function(){if(!this.disabled){if(this.value===defaultFormat){this.set("value","");}var p=this._lastOpened,c=this._calendarConfig;this.fromDate=this.parent.fromDate;this.toDate=this.parent.toDate;if(!c){c={};if(this.calendarToBody){delete this.calendar.slot;c.placeholder=document.body.appendChild(document.createElement("div"));c.nudge=function(){var op=this.opener;if(op){var p=mstrmojo.dom.position(op.popupNode,true),s=this.domNode.style;s.left=p.x+"px";s.top=p.y+"px";}};}this._calendarConfig=c;}if(p&&p.visible){this.closePopup();}else{this.openPopup("calendar",c);}}},onfromDateChange:function(){updateCalendar.call(this);},ontoDateChange:function(){updateCalendar.call(this);},onvalueChange:function(){updateCalendar.call(this.parent.fromDate);updateCalendar.call(this.parent.toDate);},ondisabledChange:function(evt){this.inputNode.disabled=evt.value;if(evt.value===true&&this.inputNode.value!==""){this.set("value","MM/DD/YYYY");}},postBuildRendering:function(){if(this._super){this._super();}if(mstrmojo.dom.isIE){this.inputNode.style.lineHeight="23px";}this.inputNode.disabled=this.disabled;}});}());