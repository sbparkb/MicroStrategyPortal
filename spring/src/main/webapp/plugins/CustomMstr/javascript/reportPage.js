/* custom prompt popoup add bae */
/* Custom Prompt Link add bae */

mstr.utils.UpdateManagerHelper = (function() {
    var UMH = {};
    UMH.addPromptEvent = function UMH_addPromptEvent(elem, id, beanPath, argID,
	    newArgs, oldArgs, cachedArray, argKey) {
	if ((argKey != null) && (argKey != "0")) {
	    microstrategy.updateManager.add([ microstrategy.updateManager
		    .createActionObject(elem, id, beanPath, argID, newArgs,
			    oldArgs, cachedArray, argKey) ]);
	} else {
	    microstrategy.updateManager.add([ microstrategy.updateManager
		    .createActionObject(elem, id, beanPath, argID, newArgs,
			    oldArgs, cachedArray) ]);
	}
    };
    UMH.submitFormToUpdateManager = function UMH_submitFormToUM(oForm,
	    needPageSize) {
	if (!oForm) {
	    oForm = this.createDynamicFormForPrompts();
	}
	mstr.utils.Dom.addFormHiddenInput(oForm, "promptLoaded", "true");
	if (needPageSize) {
	    UpdateHelper.appendPageSizeToParams(oForm);
	}
	microstrategy.showWait(true);
	submitForm(oForm);
    };
    UMH.createDynamicFormForPrompts = function UMH_createDynFormForPrompts() {
	var sAction = microstrategy.updateManager.getFormAction();
	var el = self.document.createElement("form");
	sAction = microstrategy.addJSessionID(sAction);
	el.action = sAction;
	el.method = "POST";

	if (self.document.body) {
	    self.document.body.appendChild(el);
	}
	
	// bae edit
//	alert("AAAAA");
	try {
	    popup_prompt(el);
	} catch(err) {
	    
	}
	return el;
    };
    UMH.getSaveEventCodeForBeanType = function UMH_getSaveEvent(beanType) {
	switch (parseInt(beanType)) {
	case mstr.Enum.BEANTYPE.REPORT:
	case mstr.Enum.BEANTYPE.HTMLDOC:
	    return mstrUpdateManager.WebEventSaveAs;
	case mstr.Enum.BEANTYPE.RW:
	    return mstrUpdateManager.WebEventRWSaveAs;
	}
	return null;
    };
    UMH.getCancelEventCodeForBeanType = function UMH_getCancelEvent(beanType,
	    isReprompt) {
	switch (parseInt(beanType)) {
	case mstr.Enum.BEANTYPE.REPORT:
	    return (isReprompt) ? mstrUpdateManager.REPORT_EVENT_CANCEL_REPROMPT_REQUEST
		    : mstrUpdateManager.REPORT_EVENT_CANCEL_REQUEST;
	case mstr.Enum.BEANTYPE.HTMLDOC:
	    return (isReprompt) ? mstrUpdateManager.DOCUMENT_EVENT_CANCEL_REPROMPT_REQUEST
		    : mstrUpdateManager.DOCUMENT_EVENT_CANCEL_REQUEST;
	case mstr.Enum.BEANTYPE.RW:
	    return (isReprompt) ? mstrUpdateManager.REPORT_WRITER_EVENT_CANCEL_REPROMPT_REQUEST
		    : mstrUpdateManager.REPORT_WRITER_EVENT_CANCEL_REQUEST;
	case mstr.Enum.BEANTYPE.SUBS:
	    return mstrUpdateManager.SUBSCRIPTION_EVENT_CANCEL;
	case mstr.Enum.BEANTYPE.SCHED:
	    return mstrUpdateManager.SCHEDULE_EVENT_CANCEL;
	}
	return null;
    };
    UMH.serializeObjectList = function UMH_serializeObjectList(items) {
	var len = mstr.$A.len(items);
	if (!len) {
	    return "";
	}
	var DELIM_ANSWERS = (typeof (ANSWER_SEPARATOR) == "undefined") ? String
		.fromCharCode(27) : ANSWER_SEPARATOR;
	var DELIM_ITEMS = (typeof (ITEM_SEPARATOR) == "undefined") ? String
		.fromCharCode(126) : ITEM_SEPARATOR;
	var answers = new Array(len), item;
	for ( var i = 0; i < len; i++) {
	    item = items[i];
	    if (item.tp == mstr.Enum.MSTRFolderItem.TYPE.DIMTYUNIT
		    || item.tp == mstr.Enum.MSTRFolderItem.TYPE.DIMTYUNITATTRIBUTE
		    || item.tp == mstr.Enum.MSTRFolderItem.TYPE.DIMTYUNITDIMENSION) {
		answers[i] = [ item.dssid, item.tp, item.n, item.agg, item.flt,
			item.gb, item.rps ].join(DELIM_ITEMS);
	    } else {
		var tp = item.tp;
		answers[i] = [ item.dssid, tp || "0", item.n ]
			.join(DELIM_ITEMS);
	    }
	}
	return answers.join(DELIM_ANSWERS);
    };
    UMH.serializeExpression = function UMH_serializeExpression(
	    exprPromptAnswer, exprRootNode, exprModelType, bNullRootIsEmpty) {
	var xmlNode = mstr.xml
		&& mstr.xml.Builder
		&& mstr.xml.Builder.buildResolution(exprPromptAnswer,
			exprRootNode, exprModelType, bNullRootIsEmpty);
	return (xmlNode && xmlNode.buildXMLString && xmlNode.buildXMLString())
		|| "";
    };
    return UMH;
})();


/* bae make 2018-10-26 */
UpdateHelper.createFormFromParams = function(A) {
    var C = document.createElement("FORM");
    C.name = "dynamic_form";
    C.method = A.method;
    delete A.method;
    C.action = A.action;
    delete A.action;
    if (typeof A.target != "undefined") {
	C.target = A.target;
	delete A.target;
    }
    C.setAttribute("hasUpdateChanges", A.hasUpdateChanges == "true");
    for ( var D in A) {
	if (A[D]) {
	    
	    //alert(D + "," + A[D]);
	    if (typeof A[D] == "object") {
		
		for ( var B = 0; B < A[D].length; B++) {
		    if (A[D][B]) {
			if(D == 'hiddenSections') A[D][B] = A[D][B].replace("dockTop", "A");
			createHiddenInput(C, D, A[D][B]);
		    }
		}
	    } else {
		if(D == 'hiddenSections') { 
		    //alert(D + " : " + A[D]);
		    A[D] = A[D].replace("dockTop", "A");
		}
		createHiddenInput(C, D, A[D]);
	    }
	}
    }
    document.body.insertAdjacentElement("beforeEnd", C);
    return C;
};

