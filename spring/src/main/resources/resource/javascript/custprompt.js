
//**********************************************
// Custom Functions for DropDown
//**********************************************

	function selectAll(list, selectAll) {
		// have we been passed an ID
		if (typeof list == "string") {
			list = document.getElementById(list);
		}
		if (list.type == "select-multiple") {
			for (var i = 0; i < list.options.length; i++) {
				list.options[i].selected = selectAll;
			}
		}
	}

	function selectItemFromList(item, list){
		// have we been passed an ID
		if (typeof list == "string") {
			list = document.getElementById(list);
		}
		if(item == "All"){
			selectAll(list, true);
		}
		else{
			var i=0;
			var found=false;
			while (i < list.options.length && !found) {
				if(list.options[i].value == item){
					list.options[i].selected = true;
					found = true;
				}
				i++;
			}
		}
	}
	
	function addArrayToList(array, list) {
		// have we been passed an ID
		//alert(array);		
		var thisArray = new Array();
		if (array != null) {
			thisArray = array;
		} 
		if (typeof list == "string") {
			list = document.getElementById(list);
		}
		if (list.type == "select-multiple") {
			for (var i = 0; i < list.options.length; i++) {
				list.options[i].selected = selectAll;
			}
		}
		var selectAllText = list.options[0].text;
		var selectAllValue = list.options[0].value;
		list.options.length=0;
		var i=0;
		list.options[i] = new Option(selectAllText, selectAllValue);
		while (i < thisArray.length) {
			list.options[i+1] = new Option(thisArray[i]['text'], thisArray[i]['value']);
			i++;
		}
	}
	
	
	
	
	function setSelectedFromList(fromList, toList){
		// have we been passed an ID
		if (typeof fromList == "string") {
			fromList = document.getElementById(fromList);
		}
		// have we been passed an ID
		if (typeof toList == "string") {
			toList= document.getElementById(toList);
		}
		var i=0;
		var numFound=0;
		var lastIndexFound=0;
		while (i < toList.options.length) {
			var j=0;
			while (j < fromList.options.length) {
				if(toList.options[i].value == fromList.options[j].value) {
					numFound++;
					lastIndexFound = i;
				}
				j++;
			}
			i++;
		}
		if (numFound == 1){
			toList.options[lastIndexFound].selected = true;
		}

	}
	
	function getSelectedTextFromList(list) {
		if (typeof list == "string") {
			list = document.getElementById(list);
		}
		var i=0;
		var chosen = "none";
		var found = false;
		while (i < list.options.length && !found) {
			if (list.options[i].selected) {
				chosen = list.options[i].text;
				found = true;
			} 
			i++;
		}
		return chosen;
	} 
	
	function getSelectedValueFromList(list) { 
		if (typeof list == "string") {
			list = document.getElementById(list);
		}
		var i=0;
		var chosen = "none";
		var found = false;
		while (i < list.options.length && !found) {
			if (list.options[i].selected) {
				chosen = list.options[i].value;
				found = true;
			} 
			i++;
		}
	   // alert(chosen);
		return chosen;
	}
	
	function cloneList(list) {
		if (typeof list == "string") {
			list = document.getElementById(list);
		}
		var invisibleSelects;
		if(document.getElementById('invisibleSelects')) {
			invisibleSelects = document.getElementById('invisibleSelects');
		}else {
			invisibleSelects = document.createElement("div");
			invisibleSelects.id="invisibleSelects";
			document.getElementById('PromptForm').appendChild(invisibleSelects);
			invisibleSelects = document.getElementById(invisibleSelects.id);
			invisibleSelects.style.display = "none";
		}
		var newList;
		if(document.getElementById(list.id + "_new")) {
			newList = document.getElementById(list.id + "_new");
		}else {
			newList = document.createElement("select");
			newList.id = list.id + "_new";
			newList.name = list.name + "_new";
			invisibleSelects.appendChild(newList);
			newList = document.getElementById(newList.id);
		}
		var i=0;
		while (i < list.options.length) {
			if(list.options[i].selected) {
				newList.options[i] = new Option(list.options[i].text, list.options[i].value);
				newList.options[i].selected = true;
			}
			i++;
		}
		return newList.id;
	}
	
	
	