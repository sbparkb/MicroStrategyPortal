
/**
 * @param ajaxurl url
 * @param isAsync 비동기/동기
 * @param dataType 리스폰스 데이터 타입(html, xml, json, text)
 * @param callbackFnc 콜백펑션
 * @param failCallbackFnc 실패시 콜백펑션
 */
function ajaxGetCallback(ajaxurl, isAsync, dataType, callbackFnc, failCallbackFnc, completeCallbackFnc, cacheable) {
	$.ajax({
		url : ajaxurl,
		type : 'GET',
		async: isAsync,
		cache: (typeof cacheable!=='undefined'?cacheable:true),
		dataType : dataType,
		error : function(xhr, status, error) {
			if (typeof failCallbackFnc==='function') {
				failCallbackFnc(xhr,error);
			} else {
				//alert(error);
				return;
			}
		},
		success : function(msg) {
			callbackFnc(msg);
		},
		complete : function(result){
			if (typeof failCallbackFnc==='function') {
				completeCallbackFnc();
			}
		}
	});
}

/**
 * @param ajaxurl url
 * @param isAsync 비동기/동기
 * @param dataType 리스폰스 데이터 타입(html, xml, json, text)
 * @param formObj 폼 오브젝트
 * @param callbackFnc 콜백펑션
 * @param failCallbackFnc 실패시 콜백펑션
 */
function ajaxPostDataCallback(url, isAsync, dataType, data, callbackFnc, failCallbackFnc){
	$.ajax({
		url : url,
		type : 'POST',
		async: isAsync,
		cache: false,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		data: data,
		dataType: dataType,
		error: function(xhr, status, error) {
			if (failCallbackFnc) {
				failCallbackFnc(xhr,error);
			} else {
				alert(error);
			}
		},
		success: function(msg) {
			callbackFnc(msg);
		}
	});
}
/**
 * @param ajaxurl url
 * @param isAsync 비동기/동기
 * @param dataType 리스폰스 데이터 타입(html, xml, json, text)
 * @param formObj 폼 오브젝트
 * @param callbackFnc 콜백펑션
 * @param failCallbackFnc 실패시 콜백펑션
 */
function ajaxPostFormCallback(url, isAsync, dataType, formObj, callbackFnc, failCallbackFnc){
	$.ajax({
		url : url,
		type : 'POST',
		async: isAsync,
		cache: false,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		data: $(formObj).serialize(),
		dataType: dataType,
		error: function(xhr, status, error) {
			if (failCallbackFnc) {
				failCallbackFnc(xhr,error);
			} else {
				alert(error);
			}
		},
		success: function(msg) {
			callbackFnc(msg);
		}
	});
}


/**
 * @param ajaxurl url
 * @param isAsync 비동기/동기
 * @param dataType 리스폰스 데이터 타입(html, xml, json, text)
 * @param Param param값
 * @param callbackFnc 콜백펑션
 * @param failCallbackFnc 실패시 콜백펑션
 */
function ajaxPostParamCallback(url, isAsync, dataType, params, callbackFnc, failCallbackFnc){

	var form = $("<form></form>");

	if(params){
		for(var i in params){
			form.append("<input type='hidden' name='"+i+"' value='"+params[i]+"' />");
		}
	}
	
	$("body").append(form);
	$.ajax({
		url : url,
		type : 'POST',
		async: isAsync,
		cache: false,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		data: form.serialize(),
		dataType: dataType,
		error: function(xhr, status, error) {
			if (failCallbackFnc) {
				failCallbackFnc(error);
			} else {
				alert(error);
			}
		},
		success: function(msg) {
			callbackFnc(msg);
		}
	});
}

function ajaxPostSingleFileUploadCallback(url, isAsync, dataType, obj, callbackFnc, failCallbackFnc, completeCallbackFnc) {
	var _formData = new FormData();
	$(_formData).prop('enctype', 'multipart/form-data');
	$(_formData).prop('encoding', 'multipart/form-data');
	_formData.append('uploadFile', obj.files[0]);
	 $.ajax({
		url : url,
		type : 'POST',
		cache : false,
		data : _formData,
		processData : false,
		dataType : dataType,
		contentType : false,
		error: function(xhr, status, error) {
			if (failCallbackFnc) {
				failCallbackFnc(error);
			} else {
				alert(error);
			}
		},
		success: function(msg) {
			callbackFnc(msg);
		},
		complete : function(result){
			if (completeCallbackFnc) {
				completeCallbackFnc();
			}
		}
	});
}

function fncMouseClick_SessionPop(){
	var flg=event.button;
    if(flg==0){
    	window.focus;
    	sessionCheck();
		
    }
}

function sessionCheck(){
	var result=true;
	if ( typeof(opener) != 'undefined' & typeof(opener) != 'unknown' & nullCheck(opener)!="")
	{
	    if ( typeof(opener.opener) != 'undefined'  & typeof(opener.opener) != 'unknown' & nullCheck(opener.opener)!="")
	    {	result=popSessionCheck();
	    	if(!result){
	    		window.close();
	    		opener.opener.location.href =URL_WEB_SERVER+"/login/login.do";
	    		
	    	}
	    } else {
	    	result=popSessionCheck();
	    	if(!result){
	    		window.close();	
	    		opener.location.href =URL_WEB_SERVER+"/login/login.do";
	    	}
	    }
	}
}


function popSessionCheck(){
	var result=true;
	$.ajax({
		url : URL_WEB_SERVER + "/login/popSessionCheck.ajax",
		type : 'post',
		async: false,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType : 'json',
		error : function(xhr, status, error) {
			if ( typeof(opener) != 'undefined' & typeof(opener) != 'unknown' & nullCheck(opener)!="")
			{
			    if ( typeof(opener.opener) != 'undefined'  & typeof(opener.opener) != 'unknown' & nullCheck(opener.opener)!="")
			    {	
			    		opener.location.href =URL_WEB_SERVER+"/error/exception.do";
			    		window.close();
			    } else {
			    		opener.location.href =URL_WEB_SERVER+"/error/exception.do";
			    		window.close();	
			    }
			} 
			
		},
		success : function(item) {
			result=item.sessionresult;
		}});	
	return result;
}
 
/**
 * 설명 :
 * Method : comboList
 * @param ajaxdata
 * @param groupCode
 * @param name
 * @param flag 구분(셀렉트,라디오)
 * targetid 
 * firstname  셀렉트문에 처음나오는 문구
 * orderby 역순정렬 "Y" selectbox만 적용함.
 * @returns
 */
function comboList(groupCode,name,flag,targetid,firstname,orderby, defaultVal){
	var result;
	$.ajax({
		url : URL_WEB_SERVER+"/service/cmm/comboList.ajax",
		type : 'post',
		async: false,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		data : 'lclasCode='+groupCode+'&name='+name,
		dataType : 'json',
		error : function(xhr, status, error) {
			if(opener){
				window.close();
				opener.location.href =URL_WEB_SERVER+"/error/exception.do";
			}else{
				location.href =URL_WEB_SERVER+"/error/exception.do";
			}
		},
		success : function(item) {
			if(item.comboList.length>0){
				if(flag=="S"){
					if(orderby=="Y"){
						result=selectComboOrderBy(item,firstname, defaultVal);
					}else{
						result=selectCombo(item,firstname, defaultVal);
					}
				}
				if(flag=="C"){
					result=checkCombo(item);
				}
				if(flag=="R"){
					result=radioCombo(item,firstname);
				}
				$("#"+targetid).html(result);
			}else{
				var str ="";
				str+='<option value="" selected>'+firstname+'</option>';
				$("#"+targetid).html(str);
			}
			
			$(".select_box").selectbox();
		}});	
}


/**
 * 설명 : 셀렉트박스 멀티선택용
 * Method : comboList
 * @param ajaxdata
 * @param groupCode
 * @param name
 * @param targetid 
 * @param allYn : 전체선택 여부
 * @returns
 */
function comboMultiList(groupCode,name,targetid,allYn){
	var result;
	$.ajax({
		url : "/cmm/combo/comboList.ajax",
		type : 'post',
		async: false,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		data : 'groupCode='+groupCode+'&name='+name,
		dataType : 'json',
		success : function(item) {
			if(item.comboList.length>0){
				$('#'+targetid).attr("multiple","");	//multiple 옵션 해제
				for(var i=0; i<item.comboList.length; i++){
					if(allYn == "Y"){
						result+='<option value="'+item.comboList[i].cmmnCode+'" selected>'+item.comboList[i].codeLang+'</option>';
					}else{
						result+='<option value="'+item.comboList[i].cmmnCode+'">'+item.comboList[i].codeLang+'</option>';
					}
				}
				$("#"+targetid).html(result);
			}else{
				$("#"+targetid).html("");
			}
		}});	
}

/**
 * 설명 :
 * Method : comboList
 * @param ajaxdata
 * @param groupCode
 * @param name
 * @param flag 구분(셀렉트,라디오)
 * targetid 
 * firstname  셀렉트문에 처음나오는 문구
 * orderby 역순정렬 "Y" selectbox만 적용함.
 * @returns
 */
function comboListByUpperCd(upperCode,name,flag,targetid,firstname,orderby){
	var result;
	$.ajax({
		url : "/cmm/combo/cmmCdByUpper.ajax",
		type : 'post',
		async: false,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		data : 'upperCode='+upperCode+'&name='+name,
		dataType : 'json',
		error : function(xhr, status, error) {
			if(opener){
				window.close();
				opener.location.href =URL_WEB_SERVER+"/error/exception.do";
			}else{
				location.href =URL_WEB_SERVER+"/error/exception.do";
			}
		},
		success : function(item) {
			if(item.comboList.length>0){
				if(flag=="S"){
					if(orderby=="Y"){
						result=selectComboOrderBy(item,firstname);
					}else{
						result=selectCombo(item,firstname);
					}
				}
				if(flag=="C"){
					result=checkCombo(item);
				}
				if(flag=="R"){
					result=radioCombo(item,firstname);
				}
				$("#"+targetid).html(result);
			}else{
				var str ="";
				str+='<option value="" selected>'+firstname+'</option>';
				$("#"+targetid).html(str);
			}
		}});	
}


/**
 * 설명 :
 * Method : dynamicComboList
 * @param groupCode
 * @param name
 * @param flag
 * @param targetid
 * @param firstnamem
 * @param level
 * @param parentKey
 */
function dynamicComboList(groupCode,name,flag,targetid,firstname,level,parentKey){
	var result;
	$.ajax({
		url : "/cmm/combo/dynamicComboList.ajax",
		type : 'post',
		async: false,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",  
		data : 'groupCode='+groupCode+'&name='+name+'&level='+level+'&parentKey='+parentKey,
		dataType : 'json',
		error : function(xhr, status, error) {
			if(opener){
				window.close();
				opener.location.href =URL_WEB_SERVER+"/error/exception.do";
			}else{
				location.href =URL_WEB_SERVER+"/error/exception.do";
			}
		},
		success : function(item) {
			if(item.comboList.length>0){
				if(flag=="S"){
					result=selectCombo(item,firstname);
				}
				if(flag=="C"){
					result=checkCombo(item);
				}
				if(flag=="R"){
					result=radioCombo(item,firstname);
				}
				
				$("#"+targetid).html(result);
			}else{
				var str ="";
				str+='<option value="" selected>'+firstname+'</option>';
				$("#"+targetid).html(str);
			}
		}});	 
}


function groupList(groupCode,targetid,firstname,treecode,language){
	var result;
	$.ajax({
		url : "/member/application/get-list",
		type : 'post',
		async: false,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		data : 'groupCode='+groupCode+'&treecode='+treecode+'&language='+language,
		dataType : 'json',
		error : function(xhr, status, error) {
			if(opener){
				window.close();
				opener.location.href =URL_WEB_SERVER+"/error/exception.do";
			}else{
				location.href =URL_WEB_SERVER+"/error/exception.do";
			}
		},
		success : function(item) {
			result = item;
			if(item.list.length>0){
				var list;
				if("false" != treecode){
					if(item.tree.length == 0){ // 트리코드가 없을때
						list = selectComboGroup(item,firstname,1,0);
						$("#"+targetid[0]).html(list);
						
						var className = "w250";
						if(item.tree.length > 4){
					    	className = "w150";
					    }else if(item.tree.length > 3){
					    	className = "w200";
					    }
						$("#"+targetid[0]).attr("class",className);
						$("#"+targetid[0]).show();
					}else{
						for(var i=0; i < item.tree.length ; i++){
							list = selectComboGroup(item,firstname,i+1,item.tree[i].parentCodeKey);
							$("#"+targetid[i]).html(list);
							$("#"+targetid[i]).val(item.tree[i].codeKey).attr("selected", "selected");
							
							var className = "w250";
							if(item.tree.length > 4){
						    	className = "w150";
						    }else if(item.tree.length > 3){
						    	className = "w200";
						    }

							$("#"+targetid[i]).attr("class",className);
						}
					}
					
				}else{
					list = selectComboGroup(item,firstname,1,0);
					$("#"+targetid[0]).html(list);
				}
			}
		}});
	
	return result;
}

function selectComboGroup(item ,firstname,level,parent) {
	var str ="";
	str+='<option value="0" selected>'+firstname+'</option>';
	for(var i=0; i<item.list.length; i++){
		if(item.list[i].codeLevel == level && parent == item.list[i].parentCodeKey){
			str+='<option value="'+item.list[i].codeKey+'">'+item.list[i].CODENM+'</option>';
		}
	}

	return str; 
}

function changeGroup(getlist,level, targetid, value ){
	var list;
	var className = "w250";
	var showDivCnt = level;
	
    for(var i=level; i < targetid.length; i++){
        list =selectComboGroup(getlist,'Select',i+1,value);
        $("#"+targetid[i]).html(list);
        $("#"+targetid[i]).hide();
    }

    if(value > 0 && $("#"+targetid[level]+" option").size() > 1){
       $("#"+targetid[level]).show();
       showDivCnt++;
    }

    if(showDivCnt > 4){
    	className = "w150";
    }else if(showDivCnt > 3){
    	className = "w200";
    }
    
    for(var i=0; i < targetid.length; i++){
    	 $("#"+targetid[i]).attr("class",className);
    }
}


function selectCombo(item ,firstname, defaultVal) {
	var str ="";
	if(firstname != ""){
		str+='<option value="" selected>'+firstname+'</option>';
	}
	for(var i=0; i<item.comboList.length; i++){
		if(item.comboList[i].cmmnCode == defaultVal){
			str+='<option selected="selected" value="'+item.comboList[i].cmmnCode+'">'+item.comboList[i].codeLang+'</option>';
		}else{
			str+='<option value="'+item.comboList[i].cmmnCode+'">'+item.comboList[i].codeLang+'</option>';
		}
	}
	return str; 
}

function selectComboOrderBy(item ,firstname, defaultVal) {
	var str ="";
	str+='<option value="" selected>'+firstname+'</option>';
	for(var i=item.comboList.length; i>0; i--){
		if(item.comboList[i-1].cmmnCode == defaultVal){
			str+='<option selected="selected" value="'+item.comboList[i-1].cmmnCode+'">'+item.comboList[i-1].codeLang+'</option>';
		}else{
			str+='<option value="'+item.comboList[i-1].cmmnCode+'">'+item.comboList[i-1].codeLang+'</option>';
			
		}
	}

	return str; 
}


function checkCombo(item) {
	var str ="";
	for(var i=0; i<item.comboList.length; i++){
		str+='&nbsp;&nbsp;<input name="typecheck" type="checkbox" value="'+item.comboList[i].cmmnCode+'" id="Datesel'+(i+5)+'"/>';
		str+='&nbsp;'+item.comboList[i].codeLang;
	}
	return str;
}


function radioCombo(item,firstname) {
	var str =""; 
	for(var i=0; i<item.comboList.length; i++){
		if(i==0){
		str+='<input name="'+firstname+'"  type="radio" value="'+item.comboList[i].cmmnCode+'" id="radio'+"00"+(i)+'" checked="checked"/>';
		}else{
			str+='<input name="'+firstname+'"  type="radio" value="'+item.comboList[i].cmmnCode+'" id="radio'+"00"+(i)+'" />';
		}
		str+='<label for="radio'+"00"+(i)+'">'+item.comboList[i].codeLang+'</label>';
	}
	return str;
}

function radioCombo2(item,firstname) {
	var str =""; 
	for(var i=0; i<item.comboList.length; i++){
		str+='<span class="wrap">';
		str+='&nbsp;&nbsp;<input name="'+firstname+'" type="radio" value="'+item.comboList[i].cmmnCode+'" id="Datesel'+(i+5)+'" />';
		str+='&nbsp;&nbsp;<label for="Datesel'+(i+5)+'">'+item.comboList[i].codeLang+'</label>';
		str+='</span>';
	}
	return str;
}


/*
 *form: formId, clsCode : 대분류코드, lvlNo : 현재 레벨(초기 호출시만 설정), AttId : 현재 attributeId, nextAttId : 다음 attributeId ,firsttitle:첫번째 타이틀 1번,1번선택시 2번타이틀,2번선택은 3번타이틀
 *select : 선택 영역 추가함.
 */
function getMultiComboList(form,clsCode, lvlNo, AttId, nextAttId,firsttitle,select){
	var attIdVal=$('#'+AttId).val();
	if(attIdVal==null || typeof attIdVal== "unundefined" ){
		attIdVal="";
	}
	$.ajax({
		url:"/cmm/combo/multiComboList.ajax"
		, type : "POST"
		,async: false
		, data:{code:attIdVal, clsCode:clsCode, lvlNo:lvlNo }
		,dataType : 'json'
		, success:function(data){
			
			// 검색 된 하위 코드 목록을 Selectbox 내에 추가한다.
			if(data.comboList.length>0){
				
				var codeList = data.comboList;
				
				if($('#'+AttId).val() != ''){
				
					$('#'+nextAttId).html("");
					$('#'+nextAttId).append("<option value=''>"+firsttitle+"</option>");//선택
					for(var i = 0; i < codeList.length;i++){
						if(codeList[i].cmmnCode==select){
							$('#'+nextAttId).append("<option value='"+codeList[i].cmmnCode+"' selected='selected'>"+codeList[i].codeLang+"</option>");
						}else{
							$('#'+nextAttId).append("<option value='"+codeList[i].cmmnCode+"'>"+codeList[i].codeLang+"</option>");
						}
					}
					if(codeList.length<=0){
						$('#'+nextAttId).append("<option value=''>" + AJAX_COMMON_TXT_001 + "</option>"); //없음
					}
				}else{
					$('#'+AttId).html("");
					$('#'+AttId).append("<option value=''>"+firsttitle+"</option>");
					for(var i = 0; i < codeList.length;i++){
						if(codeList[i].cmmnCode==select){
			
							$('#'+AttId).append("<option value='"+codeList[i].cmmnCode+"' selected='selected'>"+codeList[i].codeLang+"</option>");
						}else{
							$('#'+AttId).append("<option value='"+codeList[i].cmmnCode+"' >"+codeList[i].codeLang+"</option>");
						}
					}
					if(codeList.length<=0){
						$('#'+nextAttId).append("<option value=''>" + AJAX_COMMON_TXT_001 + "</option>"); //없음
					} 
				}
				
			
			}
			
		}
	});
};


/*
 *form: formId, clsCode : 대분류코드, lvlNo : 현재 레벨(초기 호출시만 설정), AttId : 현재 attributeId, nextAttId : 다음 attributeId ,firsttitle:첫번째 타이틀 1번,1번선택시 2번타이틀,2번선택은 3번타이틀
 */
function getDeptComboList(form, clsCode, lvlNo, AttId, nextAttId, firsttitle){
	var attIdVal= $('#'+AttId).val();
	
	if(attIdVal==null || typeof attIdVal== "unundefined" ){
		attIdVal="";
	}
	$.ajax({
		url:"/cmm/combo/deptComboList.ajax"
		, type : "POST"
		,async: false
		, data:{code:attIdVal, clsCode:clsCode, lvlNo:lvlNo }
		,dataType : 'json'
		, success:function(data){ 
			// 검색 된 하위 코드 목록을 Selectbox 내에 추가한다.
			if(data.comboList.length>0){
				
				var codeList = data.comboList;
				
				if($('#'+AttId).val() != ''){
					$('#'+nextAttId).html("");
					$('#'+nextAttId).append("<option value=''>"+firsttitle+"</option>");//선택
					for(var i = 0; i < codeList.length;i++){
						$('#'+nextAttId).append("<option value='"+codeList[i].cmmnCode+"'>"+codeList[i].codeLang+"</option>");
					}
				}else{
					$('#'+AttId).html("");
					$('#'+AttId).append("<option value=''>"+firsttitle+"</option>");
					for(var i = 0; i < codeList.length;i++){
						$('#'+AttId).append("<option value='"+codeList[i].cmmnCode+"'>"+codeList[i].codeLang+"</option>");
					}
				}
			}
		}
	});
};


/*
 *form: formId, clsCode : 대분류코드, lvlNo : 현재 레벨(초기 호출시만 설정), AttId : 현재 attributeId, nextAttId : 다음 attributeId ,firsttitle:첫번째 타이틀 1번,1번선택시 2번타이틀,2번선택은 3번타이틀
 */
function getDeptAllComboList(form, clsCode, lvlNo, AttId, nextAttId, firsttitle){
	var attIdVal= $('#'+AttId).val();
	
	if(attIdVal==null || typeof attIdVal== "unundefined" ){
		attIdVal="";
	}
	$.ajax({
		url:"/cmm/combo/deptAllComboList.ajax"
		, type : "POST"
		,async: false
		, data:{code:attIdVal, clsCode:clsCode, lvlNo:lvlNo }
		,dataType : 'json'
		, success:function(data){ 
			// 검색 된 하위 코드 목록을 Selectbox 내에 추가한다.
			if(data.comboList.length>0){
				
				var codeList = data.comboList;
				
				if($('#'+AttId).val() != ''){
					$('#'+nextAttId).html("");
					$('#'+nextAttId).append("<option value=''>"+firsttitle+"</option>");//선택
					for(var i = 0; i < codeList.length;i++){
						$('#'+nextAttId).append("<option value='"+codeList[i].cmmnCode+"'>"+codeList[i].codeLang+"</option>");
					}
				}else{
					$('#'+AttId).html("");
					$('#'+AttId).append("<option value=''>"+firsttitle+"</option>");
					for(var i = 0; i < codeList.length;i++){
						$('#'+AttId).append("<option value='"+codeList[i].cmmnCode+"'>"+codeList[i].codeLang+"</option>");
					}
				}
			}
		}
	});
};

/*
 *userId: userId, clsCode : 대분류코드, lvlNo : 현재 레벨(초기 호출시만 설정), AttId : 현재 attributeId, nextAttId : 다음 attributeId ,firsttitle:첫번째 타이틀 1번,1번선택시 2번타이틀,2번선택은 3번타이틀
 */
function getDeptComboByIdList(userId, clsCode, lvlNo, AttId, nextAttId, firsttitle){
	var attIdVal= $('#'+AttId).val();
	
	if(attIdVal==null || typeof attIdVal== "unundefined" ){
		attIdVal="";
	}
	$.ajax({
		url:"/cmm/combo/deptComboByIdList.ajax"
		, type : "POST"
		,async: false
		, data:{userId:userId, code:attIdVal, clsCode:clsCode, lvlNo:lvlNo}
		,dataType : 'json'
		, success:function(data){ 
			// 검색 된 하위 코드 목록을 Selectbox 내에 추가한다.
			if(data.comboList.length>0){
				
				var codeList = data.comboList;
				
				if($('#'+AttId).val() != ''){
					$('#'+nextAttId).html("");
					$('#'+nextAttId).append("<option value=''>"+firsttitle+"</option>");//선택
					for(var i = 0; i < codeList.length;i++){
						$('#'+nextAttId).append("<option value='"+codeList[i].cmmnCode+"'>"+codeList[i].codeLang+"</option>");
					}
				}else{
					$('#'+AttId).html("");
					$('#'+AttId).append("<option value=''>"+firsttitle+"</option>");
					for(var i = 0; i < codeList.length;i++){
						$('#'+AttId).append("<option value='"+codeList[i].cmmnCode+"'>"+codeList[i].codeLang+"</option>");
					}
				}
			}
		}
	});
};

/*
 *form: formId, clsCode : 대분류코드, lvlNo : 현재 레벨(초기 호출시만 설정), AttId : 현재 attributeId, nextAttId : 다음 attributeId ,firsttitle:첫번째 타이틀 1번,1번선택시 2번타이틀,2번선택은 3번타이틀
 */
function getDeptMultiComboList(form, clsCode, lvlNo, AttId, nextAttId, firsttitle){
	var attIdVal= $('#'+AttId).val();
	if(attIdVal){
	attIdVal = attIdVal.toString().replace(/[,]/g, '|');
	}
	if(attIdVal==null || typeof attIdVal== "unundefined" ){
		attIdVal="";
	}
	$.ajax({
		url:"/cmm/combo/multiDeptComboList.ajax"
		, type : "POST"
		,async: false
		, data:{codes:attIdVal, clsCode:clsCode, lvlNo:lvlNo }
		,dataType : 'json'
		, success:function(data){ 
			
			// 검색 된 하위 코드 목록을 Selectbox 내에 추가한다.
			if(data.comboList.length>0){
				
				var codeList = data.comboList;
				if($('#'+AttId).val() != ''){
					$('#'+nextAttId).html("");
					for(var i = 0; i < codeList.length;i++){
						$('#'+nextAttId).append("<option value='"+codeList[i].cmmnCode+"' selected>"+codeList[i].codeLang+"</option>");
					}
					
				}else{
					// TODO 전체 선택 해야함
					$('#'+AttId).html("");
					$('#'+AttId).attr("multiple","");	//multiple 옵션 해제
					//$('#'+AttId).append("<option value=''>"+firsttitle+"</option>");
					for(var i = 0; i < codeList.length;i++){
						$('#'+AttId).append("<option value='"+codeList[i].cmmnCode+"' selected>"+codeList[i].codeLang+"</option>");
					}
				}
			}
			$('#'+AttId).multipleSelect();
			$('#'+nextAttId).multipleSelect();
		}
	});
};

/*
 *form: formId, lvlNo : 현재 레벨(초기 호출시만 설정), AttId : 현재 attributeId, nextAttId : 다음 attributeId ,firsttitle:첫번째 타이틀 1번,1번선택시 2번타이틀,2번선택은 3번타이틀
 */
function getCarComboList(form, lvlNo, AttId, nextAttId, firsttitle){
	$.ajax({
		url:"/cmm/combo/multiCarClsfComboList.ajax"
		, type : "POST"
		,async: false
		, data:{code:$('#'+AttId).val(), lvlNo:lvlNo }
		,dataType : 'json'
		, success:function(data){ 
			// 검색 된 하위 코드 목록을 Selectbox 내에 추가한다.
			if(data.comboList.length>0){
				
				var codeList = data.comboList;
				
				if($('#'+AttId).val() != ''){
				
					$('#'+nextAttId).html("");
					$('#'+nextAttId).append("<option value=''>"+firsttitle+"</option>");//선택
					for(var i = 0; i < codeList.length;i++){
						$('#'+nextAttId).append("<option value='"+codeList[i].cmmnCode+"'>"+codeList[i].codeLang+"</option>");
					}
				}else{
					$('#'+AttId).html("");
					$('#'+AttId).append("<option value=''>"+firsttitle+"</option>");
					for(var i = 0; i < codeList.length;i++){
						$('#'+AttId).append("<option value='"+codeList[i].cmmnCode+"'>"+codeList[i].codeLang+"</option>");
					}
				}
				
			
			}
			
		}
	});
}

function getOrgntComboList(clsCode, lvlNo, AttId, nextAttId, firsttitle){
	var attIdVal=$('#'+AttId).val();
	if(attIdVal==null || typeof attIdVal== "unundefined" ){
		attIdVal="";
	}
	$.ajax({
		url:"/cmm/combo/multiOrgntComboList.ajax"
		, type : "POST"
		,async: false
		, data:{code:attIdVal, clsCode:clsCode, lvlNo:lvlNo }
		,dataType : 'json'
		, success:function(data){ 
			// 검색 된 하위 코드 목록을 Selectbox 내에 추가한다.
			if(data.comboList.length>0){
				
				var codeList = data.comboList;
				
				if($('#'+AttId).val() != ''){
				
					$('#'+nextAttId).html("");
					if(firsttitle){
						$('#'+nextAttId).append("<option value=''>"+firsttitle+"</option>");//선택
					}
					for(var i = 0; i < codeList.length;i++){

						$('#'+nextAttId).append("<option value='"+codeList[i].cmmnCode+"'>"+codeList[i].codeLang+"</option>");
					}
				}else{
					$('#'+AttId).html("");
					if(firsttitle){
						$('#'+AttId).append("<option value=''>"+firsttitle+"</option>");
					}
					for(var i = 0; i < codeList.length;i++){
						$('#'+AttId).append("<option value='"+codeList[i].cmmnCode+"'>"+codeList[i].codeLang+"</option>");
					}
				}
				
			
			}
			
		}
	});
};

function getOrgntComboListByLvl(clsCode, lvlNo, AttId, nextAttId, firsttitle){
	var attIdVal=$('#'+AttId).val();
	if(attIdVal==null || typeof attIdVal== "unundefined" ){
		attIdVal="";
	}
	$.ajax({
		url:"/cmm/combo/multiOrgntComboListByLevel.ajax"
		, type : "POST"
		,async: false
		, data:{code:attIdVal, clsCode:clsCode, lvlNo:lvlNo }
		,dataType : 'json'
		, success:function(data){ 
			// 검색 된 하위 코드 목록을 Selectbox 내에 추가한다.
			if(data.comboList.length>0){
				
				var codeList = data.comboList;
				
				if($('#'+AttId).val() != ''){
				
					$('#'+nextAttId).html("");
					$('#'+nextAttId).append("<option value=''>"+firsttitle+"</option>");//선택
					for(var i = 0; i < codeList.length;i++){

						$('#'+nextAttId).append("<option value='"+codeList[i].cmmnCode+"'>"+codeList[i].codeLang+"</option>");
					}
				}else{
					$('#'+AttId).html("");
					$('#'+AttId).append("<option value=''>"+firsttitle+"</option>");
					for(var i = 0; i < codeList.length;i++){
						$('#'+AttId).append("<option value='"+codeList[i].cmmnCode+"'>"+codeList[i].codeLang+"</option>");
					}
				}
				
			
			}
			
		}
	});
};

/*
 *form: formId, provncNm : 상위구역명, targetId : 선택박스ID
 */
function getCityNmList(form, provncNm, targetId, text){
	$.ajax({
		url:"/cmm/combo/cityNmList.ajax"
		, type : "POST"
		, async: false
		, data :{
			provncNm : provncNm
		}
		, dataType: 'json'
		, success :function(data){ 
			
			// 검색 된 하위목록을 Selectbox 내에 추가한다.
			if(data.comboList.length > 0){
				
				var codeList = data.comboList;
				
				$("#"+targetId).html("");
				$('#'+targetId).append("<option value=''>"+text+"</option>");
				
				for(var i = 0; i < codeList.length; i++){
					$('#'+targetId).append("<option value='"+codeList[i].CITYNM+"'>"+codeList[i].CITYNM+"</option>");
				}
			}else{
				$("#"+targetId).html("");
				$('#'+targetId).append("<option value=''>"+text+"</option>");
			}
		}
	});
}
