function updateParentWindow(rbName, rbNewState) {
    if (window.opener) {
	var sLocation;
	sLocation = window.opener.location.toString();
	if (sLocation.indexOf("?") != -1) {
	    sLocation = sLocation.substring(0, sLocation.indexOf("?"));
	}
	if (showReportEvent) {
	    sLocation += showReportEvent;
	}
	sLocation = replaceURLParameter(sLocation, rbName, rbNewState);
	try {
	    window.opener.document.readyState = "incomplete";
	} catch (localerr) {
	}
	window.opener.location = sLocation;
	checkPageReady("submitFormByName('printForm');");
	return;
    } else {
	submitFormByName("printForm");
    }
}
function checkPageReady(readyEval) {
    if ((typeof (window.opener.document.readyState) != "undefined")
	    && (window.opener.document.readyState == "complete")) {
	eval(readyEval);
    } else {
	window.setTimeout('checkPageReady("' + readyEval + '")', 100);
    }
}
function updateParentPageState(rbName, rbNewState_URL, rbNewState_Form, stateID) {
    if (window.opener) {
	pageState = window.opener.pageState;
	window.opener.pageState = replaceURLParameter(pageState, rbName,
		rbNewState_URL);
	var stateForm = window.opener.getObj("pageStateForm");
	if (stateForm) {
	    var aInputs = null;
	    var aOriginalInputs = null;
	    var i;
	    var j;
	    var oNewItem;
	    var found;
	    aInputs = stateForm.getElementsByTagName("INPUT");
	    for (i = 0; i < aInputs.length; i++) {
		found = (aInputs[i].name == rbName);
		if (found) {
		    break;
		}
	    }
	    if (found) {
		aInputs[i].value = rbNewState_Form;
	    }
	    var gridBone = window.opener.mstr.$obj("UniqueReportID");
	    if (gridBone) {
		gridBone.addRefreshEvent();
		if (stateID) {
		    gridBone.stateID = stateID;
		}
	    }
	}
    }
    submitFormByName("printForm");
}
function submitFormByName(formName) {
    var oForm = getObj(formName);
    if (oForm) {
	window.setTimeout(function() {
	    //alert( encodeURI(oForm.action));   /* bae 2017-09-29 add */
	    oForm.action = encodeURI(oForm.action);
	    oForm.submit();
	}, 200);
    }
}
function showHideAdvancedOptions(bShowAdvancedOptions, buttonName, divName,
	descHide, descShow) {
    var oButton = getObj(buttonName);
    var oDiv = getObj(divName);
    if (bShowAdvancedOptions) {
	if (oDiv) {
	    displayObj(oDiv);
	}
	if (oButton) {
	    oButton.value = descHide;
	}
    } else {
	if (oDiv) {
	    removeObj(oDiv);
	}
	if (oButton) {
	    oButton.value = descShow;
	}
    }
}
function selectAdjustFont(scalingOption) {
    var oOption = document.getElementsByName(scalingOption);
    if (oOption && oOption[0]) {
	oOption[0].checked = true;
    }
}
function selectFitToPage(scalingOption, rowsOption, colsOption) {
    var oOption = document.getElementsByName(scalingOption);
    var i = 0;
    if (oOption) {
	if ((rowsOption.length > 0) && (colsOption.length > 0)) {
	    var oRows = getObj(rowsOption);
	    var oCols = getObj(colsOption);
	    if (oRows) {
		for (i = 0; i < oRows.length; i++) {
		    if (oRows.item(i).type == "checkbox") {
			var oRowsCheck = oRows.item(i);
		    }
		}
	    }
	    if (oCols) {
		for (i = 0; i < oCols.length; i++) {
		    if (oCols.item(i).type == "checkbox") {
			var oColsCheck = oCols.item(i);
		    }
		}
	    }
	    if ((oRowsCheck) && (oColsCheck)) {
		if (oRowsCheck.checked || oColsCheck.checked && oOption[1]) {
		    oOption[1].checked = true;
		} else {
		    selectAdjustFont(oOption);
		}
	    }
	} else {
	    if (oOption[1]) {
		oOption[1].checked = true;
	    }
	}
    }
}
function showHideDraftQualityGraphs(UseBMPGraphs, DraftQualityGraphs) {
    var checkDraftQualityGraphs = document.getElementById(DraftQualityGraphs);
    var checkUseBMPGraphs = document.getElementById(UseBMPGraphs);
    if (checkDraftQualityGraphs && checkUseBMPGraphs) {
	if (checkUseBMPGraphs.checked) {
	    checkDraftQualityGraphs.disabled = false;
	    checkDraftQualityGraphs.className = "prefs-content-text";
	} else {
	    checkDraftQualityGraphs.disabled = true;
	    checkDraftQualityGraphs.className = "prefs-disabledLabel";
	}
    }
}
function addMacro(prefix, suffix) {
    var macroPulldown = getObj("macroName");
    if (!macroPulldown || !oPanel) {
	return false;
    }
    for ( var i = 0; i < macroPulldown.length; i++) {
	var option = macroPulldown[i];
	if (option.selected) {
	    if (option.value != "--") {
		oPanel.value += prefix + option.value + suffix;
		macroPulldown.selectedIndex = 0;
	    }
	    break;
	}
    }
    return false;
}
function disableButtonAndSubmit(button, formName) {
    if (typeof (button) == "string") {
	button = document.getElementById(button);
    }
    button.disabled = "true";
    var oForm = document.getElementById(formName);
    createHiddenInput(oForm, button.name, button.value);
    oForm.submit();
}