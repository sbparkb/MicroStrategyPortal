<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.servlet.http.HttpSession" %>
<%@ page import="com.microstrategy.web.objects.rw.EnumRWExecutionModes"%>
<%@ page import="java.util.Locale" %>
<%@ page import="java.util.Map"%>
<%@ page import="com.mstr.business.model.*" %>
<%@ page import="com.groto.cmm.util.SystemMessage" %>
<%@ page import="com.groto.cmm.util.StringUtil" %>
<%@ page import="java.util.List" %>
<%@ taglib prefix="sep" uri="/sepMstrTL.tld"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String contextRoot = request.getContextPath();
	String contextDoc = contextRoot + "/resource";
	Locale locale = (Locale) request.getAttribute("locale");
	String context = request.getContextPath();
	String objectID = StringUtil.escapeHtmlString( (String) request.getParameter( "objectID" ) );
	String subType = StringUtil.escapeHtmlString( (String) request.getParameter( "subType" ) );
	String execType = StringUtil.escapeHtmlString( (String) request.getParameter( "execType" ) );
	String isShortcut = StringUtil.escapeHtmlString( (String) request.getParameter( "isShortcut" ) );
	String sessionid = (String) request.getSession().getAttribute( "usrSmgr" );
	int displayUnitType= 0;
	
	try{
	  
		if("true".equals(isShortcut)){
			objectID = StringUtil.escapeHtmlString( (String) request.getParameter( "targetId" ) );
			subType = StringUtil.escapeHtmlString( (String) request.getParameter( "targetsubType" ) );
			displayUnitType = Integer.parseInt((String) request.getParameter( "targetType" ));
		}else{
			displayUnitType = Integer.parseInt((String) request.getParameter( "displayUnitType" ));
		}
 
	}catch(Exception e){
		e.printStackTrace();
	}
	
	String txtCheckAll		= "CheckAll";
	String txtUncheckAll	= "UncheckAll";
	String txtNoneSelected = "Select options";
	String txtSearch		= "search";
	String txtSelected     = "# selected";
	
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge"></meta>
<link rel="stylesheet" type="text/css" href="../df/css/styles.css" />
<jsp:include page="/WEB-INF/views/mstr/common/common_df.jsp" />
<script type="text/javascript" src="../df/js/common.js"></script>

<script type="text/javascript">
 
var execucheck = false;

var executeUrl = '${executeUrl}';

var fncPromptSetting	= function(){
	var prevElem		= null;
	var prevWidth		= 0;
	$("#mstrPromptForm").find("dl").each(function(idx, data){
		var width		= $(this).find("dt").width() + $(this).find("dd").width();
		var parentW		= $(this).parents("div:first").width();
		if(idx == 0){
			prevElem	= $(this);
			prevWidth	= width;
		}else{
			
		}
	});
	
	var srchDiv 			= $("div.search-area");
	var srchForm			= $("div.form-area").find("ul").first();
	var srchDivHeight		= Number(srchDiv.height());
	var srchFormHeight		= Number(srchForm.height());
	// Prompt영역에 toggle 기능의 프롬프트가 search_area 영역보다 큰경우 토글 프롬프트를 한줄에 2개씩 뿌리기 위한 처리
// 	if(srchFormHeight > srchDivHeight){
	var dlObject		= new Array();
	var dlDoms			= $("#mstrPromptForm").find("dl");
	dlDoms.each(function(cnt, data){
		if((cnt % 2 ) == 1){
			dlObject.push($(this));
			$(this).remove();
		}
	});
	var dlDoms			= $("#mstrPromptForm").find("dl");
	dlDoms.each(function(cnt, data){
		var dlDom		= dlObject[cnt];
		dlChild			= $(dlDom).children();
		if(dlChild.find("input[id*=datepicker]").size() > 0){
			dlChild.find("input[id*=datepicker]").removeClass("hasDatepicker");
			dlChild.find("input[id*=datepicker]").next().remove();
		}
		$(this).append(dlChild);
	});
	
	fncDatepickerSetting();
	$("input[type=text]").setMask();
}
 

function jsDelayStart(){
	execucheck = true;
	result=popSessionCheck();
	
	if(!result){
	    alert('세션 로그아웃 되었읍니다.');
	    window.top.location.replace(URL_WEB_SERVER+"/login/login.do");
	}else{
		//프롬프트 팝업 선택 시 조회 버튼을 누르면 검색어로 입력한 텍스트를 선택한 값으로 초기화해준다.
		$('#mstrPromptForm input[data-select=true]').each(function(){
			var data = $(this).attr('data-list');
			$(this).val(data);
		});	
	
		reportExecution();					
	}
}

//기본 mstr 프롬프트 실행 시 프롬프트 입력 취소하고 프롬프트 재 조회 작업
function reportFormRetry(){
	$('#loadingDiv').show();

	jQuery("#mstrPromptForm").attr("method", "POST");	    
	jQuery("#mstrPromptForm").attr("action", "${executeUrl}");
	jQuery("#mstrPromptForm").attr("target", "report_<%=objectID%>");
	jQuery("#mstrPromptForm").submit();		
}

// 실제 처리 되는 fn
function reportExecution() {
	
	if(typeof checkPrompt != "undefined"){
		if(!checkPrompt()) return;
	}
	$("#mstrPromptForm").find("input[type=text][id*=datepicker]").each(function(){
		var mstrType				= $(this).attr("mstrtype");
		if(mstrType != null){
			$(this).val($(this).val().replace(/-/gi, ""));
		}
	});
	if(!fncCheckValidation()){
		$("#mstrPromptForm").find("input[type=text][id*=datepicker]").each(function(){
			var mstrType				= $(this).attr("mstrtype");
			if(mstrType != null && !$(this).val().contains("-")){
				var dateVal				= $(this).val();
				var year				= dateVal.substring(0, 4);
				var month				= (dateVal.substring(4,6).length < 2 ? "0" + dateVal.substring(4,6) : dateVal.substring(4,6));
				var day					= (dateVal.substring(6,8).length < 2 ? "0" + dateVal.substring(6,8) : dateVal.substring(6,8));
				$(this).val(year + "-" + month + "-" + day);
			}
		});
		return;
	}
	$("#mstrPromptForm").find("input[type=text][id*=datepicker]").each(function(){
		var mstrType				= $(this).attr("mstrtype");
		if(mstrType != null && mstrType == "date"){
			var dateVal				= $(this).val();
			var year				= dateVal.substring(0, 4);
			var month				= (dateVal.substring(4,6).length < 2 ? "0" + dateVal.substring(4,6) : dateVal.substring(4,6));
			var day					= (dateVal.substring(6,8).length < 2 ? "0" + dateVal.substring(6,8) : dateVal.substring(6,8));
			$(this).val(year + "-" + month + "-" + day);
		}
	});
	$("#loadingDiv").show();
	fncOpenForm();
	jQuery("#mstrPromptForm").attr("method", "POST");	    
	jQuery("#mstrPromptForm").attr("action", "${executeUrl}");	
	jQuery("#mstrPromptForm").attr("target", "report_<%=objectID%>");
	jQuery("#mstrPromptForm").submit();
	
	$("#mstrPromptForm").find("input[type=text][id*=datepicker]").each(function(){
		var mstrType				= $(this).attr("mstrtype");
		if(mstrType != null && mstrType != "date"){
			var dateVal				= $(this).val();
			var year				= dateVal.substring(0, 4);
			var month				= (dateVal.substring(4,6).length < 2 ? "0" + dateVal.substring(4,6) : dateVal.substring(4,6));
			var day					= (dateVal.substring(6,8).length < 2 ? "0" + dateVal.substring(6,8) : dateVal.substring(6,8));
			$(this).val(year + "-" + month + "-" + day);
		}
	});
	
	//iFrameHeight();
	
	$("#reportArea").show();
	//report iframe이 로드가 완료 된 후 해당 iframe 각 요소 컨트롤 추가
	$("#report").load(function(){			
		$("#loadingDiv").hide();
		$("#report").contents().find("input[value='취소'").hide();  //취소버튼은 상단 돌아가기 버튼으로 대체. 원래 기존 취소버튼 show off
		$("#report").contents().find("div[class*=OIVMPage-pathbar]").hide();
	});
}
 
// 리포트 프롬프트 관련 유효성 체크 처리
var fncCheckValidation				= function(){
	
	var isOkay						= true;
	$("#mstrPromptForm").find("dd").each(function(){
		var input					= $(this).find("input[id*=datepicker]").first();
		// 시작일/종료일 유효성 체크
		if(input.attr("mstrtype") != null && input.attr("mstrtype") != ""){
			
			if(input.attr("datetype") != null && input.attr("datetype") != ""){
				var from				= $(this).find("input[id*=datepicker]").first();
				var to					= $(this).find("input[id*=datepicker]").last();
				if(!isNumber(from.val())){
					alert("시작일은 숫자만 입력할 수 있습니다.");
					from.focus();
					isOkay		= false;
					return false;
				}
				
				if(Number(from.val()) > Number(to.val())){
					alert("시작일이 종료일보다 미래 입니다.\n확인 후 다시 입력해 주세요.");
					from.focus();
					isOkay		= false;
					return false;
				}
			}
			// text박스 입력 프롬프트의 경우 2월 29일 이상입력 한경우 처리
			$(this).find("input[id*=datepicker]").each(function(){
				
				var date				= $(this).val();
				if(date.length == 8){
					
					var year			= date.substring(0, 4);
					var month			= date.substring(4, 6);
					var day				= date.substring(6, 8);
					
					if(Number(month) == 2){
						
						if(Number(day) > 29){
							alert("2월은 29일 이상 입력할 수 없습니다.");
							$(this).val(year + "-" + month + "-" + "29");
							$(this).focus();
							isOkay		= false;
							return false;
						}
					}
				}
			
			});
		}
		
		
		// Select박스 시작/종료 년월 프롬프트 유효성 체크
		$(this).find("select").each(function(){
			if($(this).attr("datetype") != null && $(this).attr("datetype").indexOf("from") >= 0){
				
				var fromSel			= $(this);
				var toSel			= $(this).next();
				
				var fromVal			= Number(fromSel.find("option:selected").val().split(":")[1]);
				var toVal			= Number(toSel.find("option:selected").val().split(":")[1]);
				
				
				if(fromVal > toVal){
					alert("시작월이 종료일 보다 미래입니다.\n확인 후 다시 선택해 주세요.");
					fromSel.focus();
					isOkay			= false;
					return false;
				}
				
			}
		});
		
	});
	
	var objId = $("#objectID").val();
	if(objId  == "BC915248435B81882DD390954A55B5A5"){
		
		var fromVal					= "";
		var toVal					= "";
		$("#mstrPromptForm").find("input[id*=datepicker]").each(function(){
			
			if($(this).attr("datetype") != null && $(this).attr("datetype") == "from"){
				if(fromVal == ""){
					fromVal				= $(this).val();
				}else{
					if(fromVal == $(this).val()){
						alert("조회 시작일자가 같을 수 없습니다.");
						isOkay			= false;
						return false;
					}else{
						fromVal			= $(this).val();
					}
				}
				
			}
			
			if($(this).attr("datetype") != null && $(this).attr("datetype") == "to"){
				if(toVal == ""){
					toVal				= $(this).val();
				}else{
					if(toVal == $(this).val()){
						alert("조회 종료일자가 같을 수 없습니다.");
						isOkay			= false;
						return false;
					}else{
						toVal			= $(this).val();
					}
				}
				
			}
		});
		
	}
	
	
	return isOkay;
};

 
function exportReportExcel(){
	if(execucheck == false){
		alert("리포트를 먼저 실행 후 다운로드 받으세요!!!");
		return;
	}
	
	if( $("#report").contents().find("#tbExport").length) {
		$("#report").contents().find("#tbExport").click();
	} else {
		var $div = $("#report").contents().find("div.mstrListBlockToolbarItem:first");
		$("td.mstrListBlockToolbarItemName", $div).mousedown();
		alert('다시 클릭해주세요');
	}
}

function exportReportPdf(){
	if(execucheck == false){
		alert("리포트를 먼저 실행 후 다운로드 받으세요!!!");
		return;
	}
 
	if( $("#report").contents().find("#tbPDF").length) {
		$("#report").contents().find("#tbPDF").click();
	} else {
		var $div = $("#report").contents().find("div.mstrListBlockToolbarItem:first");
		$("td.mstrListBlockToolbarItemName", $div).mousedown();
		alert('다시 클릭해주세요');
	} 	
}

function executeReportPop(){
		
	if(execucheck == false){
		alert("리포트를 먼저 실행 하세요!!!");
		return;
    }
	
	if(executeUrl == 'reportRun.do'){
		var id = $("#report").contents().find("input[value='리포트 실행'").attr('id');
		if(id != undefined && id != '' && id != null){
			alert("리포트를 먼저 실행 하세요!!!");
			return;
		}
	}
	
	result=popSessionCheck();
	
	if(!result){
		window.top.location.replace(URL_WEB_SERVER+"/login/login.do");
	}else{
		reportExecutionPop();
	}

}
function exportDocument(type){

	result=popSessionCheck();
	
	if(!result){
		window.top.location.replace(URL_WEB_SERVER+"/login/login.do");
	}else{
		exportExecuteDocument(type);
	}
}

function exportExecuteDocument(type){
	var $f = $('#report');
	var docuId = $('#objectID').val();
	
	var messageID = '';
	var displayType = '';
	try{
		messageID = $f.get(0).contentWindow.mstrApp.getMsgID();
		displayType = $f.get(0).contentWindow.mstrApp.pageName;
	}catch(err){
		alert("리포트를 먼저 실행 후 다운로드 받으세요!!!");
		return;
	}	
	
	if(displayType == "report"){
		var form = $("<form name='t"+docuId+"'></form>");
		form.attr("action",URL_WEB_SERVER + "/servlet/mstrWeb");
		form.attr("method","post");
		form.attr("target","ExportDocument");
		
		if(type=="PDF"){
			form.append("<input type='hidden' name='executionMode' value='<%=EnumRWExecutionModes.RW_MODE_PDF %>' />");
			form.append("<input type='hidden' name='evt' value='3062' />");
			form.append("<input type='hidden' name='src' value='mstrWeb.3062'/>");	
		}else{
			form.append("<input type='hidden' name='executionMode' value='<%=EnumRWExecutionModes.RW_MODE_EXCEL %>' />");
			form.append("<input type='hidden' name='evt' value='3068' />");
			form.append("<input type='hidden' name='src' value='mstrWeb.3068'/>");				
		}
		
		form.append("<input type='hidden' name='group' value='export' />");		
		form.append("<input type='hidden' name='reportID' value='"+docuId+"' />");
		form.append("<input type='hidden' name='messageID' value='"+messageID+"' />");
		
		$('body').append(form);
		window.open("" ,"ExportDocument", "toolbar=no, width=1290, height=797, directories=no, status=no, scrollbars=no, resizable=yes");
		form.submit();
		$("<form name='t"+docuId+"'></form>").remove();
	}else{
		var form = $("<form name='t"+docuId+"'></form>");
		form.attr("action",URL_WEB_SERVER + "/servlet/mstrWeb");
		form.attr("method","post");
		form.attr("target","ExportDocument");
		
		if(type=="PDF"){
			form.append("<input type='hidden' name='executionMode' value='<%=EnumRWExecutionModes.RW_MODE_PDF %>' />");
		}else{
			form.append("<input type='hidden' name='executionMode' value='<%=EnumRWExecutionModes.RW_MODE_EXCEL %>' />");
		}
		
		form.append("<input type='hidden' name='evt' value='3069' />");
		form.append("<input type='hidden' name='src' value='mstrWeb.3069'/>");
		form.append("<input type='hidden' name='documentID' value='"+docuId+"' />");
		form.append("<input type='hidden' name='messageID' value='"+messageID+"' />");
		
		$('body').append(form);
		window.open("" ,"ExportDocument", "toolbar=no, width=1290, height=797, directories=no, status=no, scrollbars=no, resizable=yes");
		form.submit();
		$("<form name='t"+docuId+"'></form>").remove();
	}
}

function reportExecutionPop() {
	
	if(typeof checkPrompt != "undefined"){
		if(!checkPrompt()) return;
	}
	$("#mstrPromptForm").find("input[type=text][id*=datepicker]").each(function(){
		var mstrType				= $(this).attr("mstrtype");
		if(mstrType != null){
			$(this).val($(this).val().replace(/-/gi, ""));
		}
	});
	if(!fncCheckValidation()){
		$("#mstrPromptForm").find("input[type=text][id*=datepicker]").each(function(){
			var mstrType				= $(this).attr("mstrtype");
			if(mstrType != null && !$(this).val().contains("-")){
				var dateVal				= $(this).val();
				var year				= dateVal.substring(0, 4);
				var month				= (dateVal.substring(4,6).length < 2 ? "0" + dateVal.substring(4,6) : dateVal.substring(4,6));
				var day					= (dateVal.substring(6,8).length < 2 ? "0" + dateVal.substring(6,8) : dateVal.substring(6,8));
				$(this).val(year + "-" + month + "-" + day);
			}
		});
		return;
	}
	$("#mstrPromptForm").find("input[type=text][id*=datepicker]").each(function(){
		var mstrType				= $(this).attr("mstrtype");
		if(mstrType != null && mstrType == "date"){
			var dateVal				= $(this).val();
			var year				= dateVal.substring(0, 4);
			var month				= (dateVal.substring(4,6).length < 2 ? "0" + dateVal.substring(4,6) : dateVal.substring(4,6));
			var day					= (dateVal.substring(6,8).length < 2 ? "0" + dateVal.substring(6,8) : dateVal.substring(6,8));
			$(this).val(year + "-" + month + "-" + day);
		}
	});	
	jQuery("#mstrPromptForm").attr("method", "POST");	
	var pop = window.open("reportExecution.do?pop=Y&"+ jQuery("#mstrPromptForm").serialize(), "reportPop", "toolbar=no,scrollbars=yes,resizable=yes,top=200,left=300,width=1290,height=797");
	pop.focus();
}

//상단 검색

var errCnt = 0;

var fncOpenForm	 = function(){
	
     try {
		jQuery("div.search a.updownBtn").parent().toggleClass("on");
		iFrameHeight();
		errCnt = 0;
    } catch(err) {
		errCnt++;
		loadJS("<%=contextDoc %>/javascript/jquery.min.js");
		return false;
	}
	return false;
};	

function loadJS(file) {
    // DOM: Create the script element
    var jsElm = document.createElement("script");
    // set the type attribute
    jsElm.type = "application/javascript";
    // make the script element load file
    jsElm.src = file;
    
    jsElm.onload = function(){
        //여기에 jquery를 이용한 스크립트를 입력하면 됩니다.
		fncOpenForm();
    };

    if(errCnt > 3) {
		alert('javascript 오류가 발생했습니다. 재조회 후 선택하세요');
    } else { 
	    // finally insert the element to the body element in order to load the script
	    document.body.appendChild(jsElm);
    }
}

function loadJS2() {
 
    setTimeout(function() {
	
	    // DOM: Create the script element
	    var jsElm = document.createElement("script");
	    // set the type attribute
	    jsElm.type = "application/javascript";
	    // make the script element load file
	    jsElm.src = "<%=contextDoc %>/javascript/jquery.min.js";
	    // finally insert the element to the body element in order to load the script
	    document.body.appendChild(jsElm);
		iFrameResize();
	}, 100);
}

function iFrameResize() {
    var iframeWin = document.getElementById('report').contentWindow;
    $(iframeWin).trigger('resize');
}

function txtCopy(paramId){
	$('.cover.multi input[name=searchKey]').val($('#' + paramId).val());
}

function openCssSearchDiv(paramId, pageNum){
	
	var result=popSessionCheck();
	if(!result){
		window.top.location.replace(URL_WEB_SERVER+"/login/login.do");
		return false;
	}
	
	var mstrParamID = paramId;
	var objectID = $('#'+mstrParamID).attr('reportId');		
	if($('#'+mstrParamID).attr('data-css') == undefined || $('#'+mstrParamID).attr('data-css') == ''){
		openSearchDiv(paramId, pageNum);	
		return false;
	}
	
	var multiElementID = '';
	
	$('select[nextid='+mstrParamID+'] option').each(function(){		
		if($(this).prop('selected')){
			if (multiElementID != '') {
				multiElementID += ',' + $(this).val();
			} else {
				multiElementID += $(this).val();
			}
		}
	});
	
	if (multiElementID == '' || multiElementID.length <= 0) {
		alert('상위 조건 선택 후 검색하십시오.');	
		return false;
	}
	
	$('.cover.single').hide();
			
	if(pageNum == '1'){
		$('.cover.multi .contBlock .listBlock ul').empty();
	}

	if($('.cover.multi').css('display') != 'block'){		
		$('.cover.multi input[name=searchKey]').val( $('#'+mstrParamID).val());
		$('.cover.multi').fadeIn(1000);	
	}
	
	$('.cover.multi input[name=searchKey]').attr('data-id',mstrParamID);
	
	var searchTxt = $('.cover.multi input[name=searchKey]').val();
	
	$('.grid_loading').show();
	
 	$.getJSON('/service/childElementList.do', {
		objectID: objectID,
		elementID: '',
		multiElementID: multiElementID,
		mstrParamID: $('select[nextid='+mstrParamID+']').attr('id'),
		displayUnitType: $('#displayUnitType').val(),
		scrollPage: pageNum,
		searchTxt: searchTxt
	}, function (data) {				
		$('.cover.multi .contBlock .listBlock .more').remove();	
		
		if(data != null && data.length > 0){
			for (var i = 0; i < data.length; i++) {
				var li = '<li><a href="#" displaytype="multi" onclick=addList(this) id="'+data[i].objectID +'">'+data[i].displayName+'</a></li>'; 
				$('.cover.multi .contBlock .listBlock ul').append(li);	
			}			
		}
		
		$('.grid_loading').hide();
		
		if(Number(pageNum) < Number(data[0].totalPage)){
			var more = '<li class="more"><a href="#" onclick=openCssSearchDiv("' + mstrParamID + '","'+ (Number(pageNum) + 1) +'")>더보기</a></li>';
			$('.cover.multi .contBlock .listBlock ul').append(more);
		}else{
			var more = '<li class="more"><a href="#">&nbsp;</a></li>';
			$('.cover.multi .contBlock .listBlock ul').append(more);
		}
		
	});
}

function openCssSingleSearchDiv(paramId, pageNum){
	
	var result=popSessionCheck();
	if(!result){
		window.top.location.replace(URL_WEB_SERVER+"/login/login.do");
		return false;
	}
	
	var mstrParamID = paramId;
	var objectID = $('#'+mstrParamID).attr('reportId');	
	
	if($('#'+mstrParamID).attr('data-css') == undefined || $('#'+mstrParamID).attr('data-css') == ''){
		openSingleSearchDiv(paramId, pageNum);	
		return false; 
	}
	
	var elementID = $('select[nextid='+mstrParamID+'] option:selected').val();		

	if (elementID == '') {
		alert('상위 조건 선택 후 검색하십시오.');	
		return false;
	}
	
	$('.cover.multi').hide();
	
	if(pageNum == '1'){
		$('.cover.single .contBlock .listBlock ul').empty();
	}
	
	if($('.cover.single').css('display') != 'block'){		
		$('.cover.single input[name=searchKey]').val( $('#'+mstrParamID).val());
		$('.cover.single').fadeIn(1000);	
	}
	
	$('.cover.single input[name=searchKey]').attr('data-id',mstrParamID);
	
	var searchTxt = $('.cover.single input[name=searchKey]').val();
	
	$('.grid_loading').show();
	
 	$.getJSON('/service/childElementList.do', {
		objectID: objectID,
		elementID: elementID,
		multiElementID: '',
		mstrParamID: $('select[nextid='+mstrParamID+']').attr('id'),
		displayUnitType: $('#displayUnitType').val(),
		scrollPage: pageNum,
		searchTxt: searchTxt
	}, function (data) {				
		$('.cover.single .contBlock .listBlock .more').remove();	
		
		if(data != null && data.length > 0){
			for (var i = 0; i < data.length; i++) {
				var li = '<li><a href="#" displaytype="single" onclick=selectList(this) id="'+data[i].objectID +'">'+data[i].displayName+'</a></li>'; 
				$('.cover.single .contBlock .listBlock ul').append(li);	
			}			
		}
		
		$('.grid_loading').hide();
		
		if(Number(pageNum) < Number(data[0].totalPage)){
			var more = '<li class="more"><a href="#" onclick=openCssSingleSearchDiv("' + mstrParamID + '","'+ (Number(pageNum) + 1) +'")>더보기</a></li>';
			$('.cover.single .contBlock .listBlock ul').append(more);
		}else{
			var more = '<li class="more"><a href="#">&nbsp;</a></li>';
			$('.cover.single .contBlock .listBlock ul').append(more);
		}
		
	});
}

function openSingleSearchDiv(paramId, pageNum){

	var result=popSessionCheck();
	if(!result){
		window.top.location.replace(URL_WEB_SERVER+"/login/login.do");
		return false;
	}
	
	$('.cover.multi').hide();
	
	var mstrParamID = paramId;
	var objectID = $('#'+mstrParamID).attr('reportId');
	var pin = $('#'+mstrParamID).attr('data-pin');
	
	if(pageNum == '1'){
		$('.cover.single .contBlock .listBlock ul').empty();
	}
	
	if($('.cover.single').css('display') != 'block'){		
		$('.cover.single input[name=searchKey]').val( $('#'+mstrParamID).val());
		$('.cover.single').fadeIn(1000);	
	}
	
	$('.cover.single input[name=searchKey]').attr('data-id',mstrParamID);
	
	var searchTxt = $('.cover.single input[name=searchKey]').val();
	
	$('.grid_loading').show();
	
 	$.getJSON('/service/elementList.do', {
		objectID: objectID,
		pin: pin,
		displayUnitType: $('#displayUnitType').val(),
		scrollPage: pageNum,
		searchTxt: searchTxt
	}, function (data) {				
		$('.cover.single .contBlock .listBlock .more').remove();	
		
		if(data != null && data.length > 0){
			for (var i = 0; i < data.length; i++) {
				var li = '<li><a href="#" displaytype="single" onclick=selectList(this) id="'+data[i].objectID +'">'+data[i].displayName+'</a></li>'; 
				$('.cover.single .contBlock .listBlock ul').append(li);	
			}			
		}
		
		$('.grid_loading').hide();
		
		if(Number(pageNum) < Number(data[0].totalPage)){
			var more = '<li class="more"><a href="#" onclick=openSingleSearchDiv("' + mstrParamID + '","'+ (Number(pageNum) + 1) +'")>더보기</a></li>';
			$('.cover.single .contBlock .listBlock ul').append(more);
		}else{
			var more = '<li class="more"><a href="#">&nbsp;</a></li>';
			$('.cover.single .contBlock .listBlock ul').append(more);
		}
		
	});
}

function openSearchDiv(paramId, pageNum){

	var result=popSessionCheck();
	if(!result){
		window.top.location.replace(URL_WEB_SERVER+"/login/login.do");
		return false;
	}
	
	var mstrParamID = paramId;
	var objectID = $('#'+mstrParamID).attr('reportId');	
	var pin = $('#'+mstrParamID).attr('data-pin');	
	
	$('.cover.single').hide();	
		
	if(pageNum == '1'){
		$('.cover.multi .contBlock .listBlock ul').empty();
	}

	if($('.cover.multi').css('display') != 'block'){		
		$('.cover.multi input[name=searchKey]').val( $('#'+mstrParamID).val());
		$('.cover.multi').fadeIn(1000);	
	}
	
	$('.cover.multi input[name=searchKey]').attr('data-id',mstrParamID);
	
	var searchTxt = $('.cover.multi input[name=searchKey]').val();
	
	$('.grid_loading').show();
	
 	$.getJSON('/service/elementList.do', {
		objectID: objectID,
		pin: pin,
		displayUnitType: $('#displayUnitType').val(),
		scrollPage: pageNum,
		searchTxt: searchTxt
	}, function (data) {				
		$('.cover.multi .contBlock .listBlock .more').remove();	
		
		if(data != null && data.length > 0){
			for (var i = 0; i < data.length; i++) {
				var li = '<li><a href="#" displaytype="single" onclick=addList(this) id="'+data[i].objectID +'">'+data[i].displayName+'</a></li>'; 
				$('.cover.multi .contBlock .listBlock ul').append(li);	
			}			
		}
		
		$('.grid_loading').hide();
		
		if(Number(pageNum) < Number(data[0].totalPage)){
			var more = '<li class="more"><a href="#" onclick=openSearchDiv("' + mstrParamID + '","'+ (Number(pageNum) + 1) +'")>더보기</a></li>';
			$('.cover.multi .contBlock .listBlock ul').append(more);
		}else{
			var more = '<li class="more"><a href="#">&nbsp;</a></li>';
			$('.cover.multi .contBlock .listBlock ul').append(more);
		}
		
	});
}

function addList(obj){
	
	if($(obj).hasClass('pressed')){
		$(obj).removeClass('pressed');
	}else{
		$(obj).addClass('pressed');	
	}	
}

function addSel(){
	$('.cover.multi .contBlock .listBlock .pressed').each(function(){
		var id = $(this).attr('id');
		var displayName = $(this).text();
		if($('.cover.multi .contBlock .selectedBlock a[id="'+id+'"]').size() < 1){			
			var li = '<li><a href="#" onclick=rmList(this) id="'+id +'">'+displayName+'</a></li>';
			$('.cover.multi .contBlock .selectedBlock ul').append(li);
		}
	});
}

function addAll(){
	$('.cover.multi .contBlock .listBlock a').each(function(){		
		if($(this).parent().hasClass('more')) return true;		
		var id = $(this).attr('id');
		var displayName = $(this).text();
		if($('.cover.multi .contBlock .selectedBlock a[id="'+id+'"]').size() < 1){			
			var li = '<li><a href="#" onclick=rmList(this) id="'+id +'">'+displayName+'</a></li>';
			$('.cover.multi .contBlock .selectedBlock ul').append(li);
		}
	});	
}

function rmList(obj){
	if($(obj).hasClass('pressed')){
		$(obj).removeClass('pressed');
	}else{
		$(obj).addClass('pressed');	
	}	
}

function rmSel(){
	var dataId = $('.cover.multi .searchBlock span input').attr('data-id');
	var dataName = $('#'+dataId).attr('data-name');

	$('.cover.multi .contBlock .selectedBlock .pressed').each(function(){
		$('#mstrPromptForm select[name="'+dataName+'"] option[value="'+$(this).attr('id')+'"]').remove();
		$(this).parent().remove();
	});
}

function rmAll(){
	var dataId = $('.cover.multi .searchBlock span input').attr('data-id');
	var dataName = $('#'+dataId).attr('data-name');

	$('.cover.multi .contBlock .selectedBlock a').each(function(){
		$('#mstrPromptForm select[name="'+dataName+'"] option[value="'+$(this).attr('id')+'"]').remove();
		$(this).parent().remove();
	});
}

function selectList(obj){
	
	var addedId = $(obj).attr('id');
	var displayType = $(obj).attr('displaytype');	
	var addedNm = $(obj).text();
	var dataId = $('.cover.'+displayType+' .searchBlock span input').attr('data-id');
	var dataName = $('#'+dataId).attr('data-name');
	
	$('#mstrPromptForm select[name="'+dataName+'"]').remove();	
	
	var inputTag = '<select style="display:none;" name="'+dataName+'"><option selected value="'+addedId+'">'+dataName+'</option></select>';
	$('#mstrPromptForm').append(inputTag);	
	
	$('#'+dataId).val(addedNm);
	$('#'+dataId).attr('data-list',addedNm);
	$('#'+dataId).attr('data-select',"true");
	
	$('.cover.'+displayType+' .contBlock .listBlock ul').empty();
	$('.cover.'+displayType+' input[name=searchKey]').attr('data-id','');
	$('.cover.'+displayType+' input[name=searchKey]').val('');
	$('.grid_loading').hide();
	$('.cover.'+displayType+'').fadeOut(500);		
}

function applyValue(applyId){
	
	var submitId = $('.cover.multi input[name=searchKey]').attr('data-id');
	var submitName = $('#' + submitId).attr('data-name');	
	var dispName = '';	
	
	$('.cover.multi .contBlock .selectedBlock li').each(function(){
		var addedId = $(this).children('a').attr('id');
		var addedNm = $(this).children('a').text();
		
		var inputTag = '<option selected value="'+addedId+'"/>';
		if($('#mstrPromptForm select[name="'+submitName+'"] option[value="'+addedId+'"]').size() < 1){
			$('#mstrPromptForm select[name="'+submitName+'"]').append(inputTag);	
		}		
				
		if(dispName == ''){			
			dispName = addedNm;
		}else{
			dispName += ',' + addedNm;					
		}	
		
	});
	
	$('#'+applyId).val(dispName);
	$('#'+applyId).attr('data-list',dispName);
	$('#'+applyId).attr('data-select',"true");
	
	//팝업종료
	$('.cover.multi .contBlock .listBlock ul').empty();
	$('.cover.multi input[name=searchKey]').attr('data-id','');
	$('.grid_loading').hide();
	$('.cover.multi').fadeOut(500);
	$('.cover.multi input[name=searchKey]').val('');
}

function cancelValue(applyId){	
	$('.cover .contBlock .listBlock ul').empty();
	$('.cover .contBlock .selectedBlock ul').empty();	
	$('.cover input[name=searchKey]').attr('data-id','');
	$('.grid_loading').hide();
	$('.cover').fadeOut(500);
	
	//취소했을 때 기존 값 restore
	var dataList = $('#'+applyId).attr('data-list');
	$('#'+applyId).val(dataList);
	$('.cover input[name=searchKey]').val('');
}

function clearTxt(objId){
	
	if(!confirm("선택한 조건을 초기화하시겠습니까?")){
		return false;
	}
	
	$('#'+objId).val('');
	$('#'+objId).attr('data-list','');
	var dataName = $('#'+objId).attr('data-name');
	$('#mstrPromptForm input[name="'+dataName+'"]').remove();
	$('#mstrPromptForm select[name="'+objId+'"]').remove();
}

function clearParam(objId){	
	
	if(!confirm("선택한 조건을 초기화하시겠습니까?")){
		return false;
	}
	
	var nameId = $('#mstrPromptForm input[id='+objId+']').attr('data-name'); 
	$('#mstrPromptForm select[name="'+nameId+'"]:last option').remove();
	$('#mstrPromptForm input[data-name='+nameId+']').val('');
	$('#mstrPromptForm input[data-name='+nameId+']').attr('data-list','');
	$('.cover.multi .selectedBlock ul').empty();	
}

</script>
<style>
	input.text-field { height:26px; width:80px; padding:2px 6px; border:1px solid #dcdcdc;   background-color:#fff; }
	input.cal-field { height:26px; width:75px; padding:2px 6px; border:1px solid #dcdcdc; background-color:#fff; }
	th { height: 31px;}
	/* table.ui-datepicker-calendar { display:none; } */
</style>
</head>
<body style="zoom: 1;">
			<!------- //content start  ------->
			<div class="contentwrap" id="contentwrap" style="padding-top:0px;">	 
				
				<div id="title">
					<h3>정형분석<span>${path }</span><a href="javascript:executeReportPop()" class="icon"><img src="../df/images/ico_tl.png" alt=""></a></h3>
					<a href="javascript:exportDocument('EXCEL');" class="iconExcel"><img src="../df/images/ico_excel.png" alt=""></a>
					<c:if test="${executeUrl eq 'reportRun.do' }">
					<a href="javascript:reportFormRetry();" class="iconReturn"><img src="../df/images/ico_return.png" alt=""></a>
					</c:if>					
				</div>
 
 
 			<div id="loadingDiv" style="position: absolute; z-index:20;display: none; text-align: center; margin-top: 20%; margin-left: 49%;">
							<img src="<spring:message code='URL.IMG.SERVER'/>images/loader.gif" />
			</div>
			
				<!-- //검색 -->
				<div class="searchbox">
				
	<form id="mstrPromptForm" name="mstrPromptForm">				
				<div id="searchwrap">
					<div class="search s_type1 on"><!-- 검색이 1단일때 s_type1 / 2단일때 s_type2 / 3단일때 s_type3으로 클래스명 적용 -->						

									<input type="hidden" id="objectID" name="objectID" value="<%=objectID%>"/>
									 
									<input type="hidden" id="displayUnitType" name="displayUnitType" value="<%=displayUnitType %>" />
									 
									<input type="hidden" id="subType" name="subType" value="<%=subType %>" />
									<c:choose>
										<c:when test="${executeUrl eq 'reportExecution.do' }">
											<sep:gbiprompt objectID="<%=objectID%>" displayUnitType="<%=displayUnitType%>" subType="<%=subType %>" locale="" sessionid="<%=sessionid%>" />
											<a href="#" class="updownBtn no_btn" onclick="return fncOpenForm();"></a>
										</c:when>
										<c:otherwise>
											<a href="#" class="updownBtn no_btn retry" onclick="return reportFormRetry();" style="visibility: hidden;"></a>
										</c:otherwise>
									</c:choose>
									
									<input type="hidden" id="goBack" name="goBack" value=""></input>
									<input type="hidden" id="execType" name="execType" value="<%=execType %>" />
					</div>
				 </div>
				 
	</form>
				 </div>  <!-- //검색 -->
 
 				<script>
 					//$('div.s_type1', $('#searchwrap')).removeClass('s_type1').addClass('s_type3');
 				</script>
				    
				 <!-- //컨텐츠 내용 시작 -->
				 <div class="content_box">
				 		
				 </div>
				 
			<!-- min-height: 700px;  -->
			<div id="reportArea" class="content cont_shadow" style="border:0; display:none; position:fixed; bottom:10px; left:10px; right:6px; top:60px;">
			<!-- min-height: 700px;  -->
				<iframe id="report" name="report_<%=objectID %>" src="" style="width: 100%; height:100%; border:0; bottom:0px; " onload="loadJS2();">
				</iframe>
			</div>
			<!-- //content -->	 	
	
				 <!-- 컨텐츠 내용 끝// -->
				 
			</div>
			<!------- content end//  ------->
			
        </div>
        <!------------------------- //contents  --------------------------->

<script type="text/javascript" >

	$(document).ready(function(){
		 		
		var cascadeIndex = 0;
		$("select[onchange*='getChildCustomElementList']").each(function(){
			cascadeIndex++; 
			// 캐스케이딩 된 콤보박스로써 2번재 이상이면 margin-left를 준다. 콤보박스가 붙어있어서 여백을 주기 위한 디자인 처리
			if(cascadeIndex > 1){						
				$(this).css('margin-left','6px');			
			}
		});		
 
		$("#container").css("width", "100%");
		$("#container").css("height", "100%");
	    
	    var jsElm = document.createElement("script");
	    // set the type attribute
	    jsElm.type = "application/javascript";
	    // make the script element load file
	    jsElm.src = "<%=contextDoc %>/javascript/jquery.sumoselect.js";
	 
	    // finally insert the element to the body element in order to load the script
	    document.body.appendChild(jsElm);

	    // 프롬프트 select box 변경 
		$('div.search').toggleClass("on");
	    
	    
		    $('select').each(function() {
			
			
			//alert($('#'+this.id).attr('desc') + "," + $(this).attr("displaytype") + "," + $(this).attr("filter"));
		        
		    	if($(this).attr("displaytype") == "multi"){

		    	    //필터형으로 변환
					if($(this).attr("filter") == "true"){
						$('#'+this.id).SumoSelect(
							{
								placeholder: '전  체',
							    csvDispCount: 3,
							    captionFormat:'{0} Selected', 
							    captionFormatAllSelected:'{0} all selected!',
							    floatWidth: 400,
							    forceCustomRendering: false,
							    nativeOnDevice: ['Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile', 'Silk'],
							    outputAsCSV: false,
							    csvSepChar: ',',
							    okCancelInMulti: true,   /* select box 확인 버튼 */
							    triggerChangeCombined: true, /* 확인 버튼을 누를 때 이벤트가 발생하도록 하는 옵션 */
							    selectAll: true,
							    search: true,
							    searchText: '검  색',
							    noMatch: 'No matches for "{0}"',
							    prefix: '',
							    locale: ['확 인', '취 소', '전 체'],
							    up: false 

							});
					} else {
						
					    //alert($('#'+this.id).attr('desc'));
	 
					    // 멀티 일반형 
					    $('#'+this.id).SumoSelect(
							{
								placeholder: '전 체',
							    csvDispCount: 3,
							    captionFormat:'{0} Selected', 
							    captionFormatAllSelected:'{0} all selected!',
							    floatWidth: 400,
							    forceCustomRendering: false,
							    nativeOnDevice: ['Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile', 'Silk'],
							    outputAsCSV: false,
							    csvSepChar: ',',
							    /* okCancelInMulti: true, */ /* select box 확인 번튼 삭제 */
							    triggerChangeCombined: false,
							    selectAll: true,
							    search: false,
							    searchText: 'Search...',
							    noMatch: 'No matches for "{0}"',
							    prefix: '',
							    locale: ['확 인', '취 소', '전 체'],
							    up: false 
							}	
						);

					}
	 
				}//싱글형 변환
				
				else if($(this).attr("displaytype") == "single"){
				    
				    
	 				if($(this).attr("filter") == "true"){
						$('#'+this.id).SumoSelect(
							{
								placeholder: '전 체',
							    csvDispCount: 3,
							    captionFormat:'{0} Selected', 
							    captionFormatAllSelected:'{0} all selected!',
							    floatWidth: 400,
							    forceCustomRendering: false,
							    nativeOnDevice: ['Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile', 'Silk'],
							    outputAsCSV: false,
							    csvSepChar: ',',
							    okCancelInMulti: false,
							    triggerChangeCombined: false,
							    selectAll: false,
							    search: true,
							    searchText: 'Search...',
							    noMatch: 'No matches for "{0}"',
							    prefix: '',
							    locale: ['확 인', '취 소', '전 체'],
							    up: false 
							}
						);
					}else{
						$('#'+this.id).SumoSelect(
								{
									placeholder: '전 체',
								    csvDispCount: 3,
								    captionFormat:'{0} Selected', 
								    captionFormatAllSelected:'{0} all selected!',
								    floatWidth: 400,
								    forceCustomRendering: false,
								    nativeOnDevice: ['Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile', 'Silk'],
								    outputAsCSV: false,
								    csvSepChar: ',',
								    okCancelInMulti: false,
								    triggerChangeCombined: false,
								    selectAll: false,
								    search: false,
								    searchText: 'Search...',
								    noMatch: 'No matches for "{0}"',
								    prefix: '',
								    locale: ['확 인', '취 소', '전 체'],
								    up: false 
								}
							);
					
					}
				}
				
			});  // selector

 
 		$("#ui-datepicker-div").on("blur", function(e) { $(this).datepicker("hide"); });
		if($("#mstrPromptForm").find("#paramCnt").size() < 1 ||  $("#mstrPromptForm").find("#paramCnt").val() == 0 ){
		    // prompt data not found 
			jsDelayStart();
		}
		
		$("#mstrPromptForm").find("input[id*=datepicker]").each(function(){
			
			$(this).on("keyup", function(e){
				if(e.keyCode == 8){
					return;
				}
			
				var date		= $(this);
				var value		= date.val().replace(/-/gi, "");
				if(value.length > 4){
					if(value.length == 5){
						
						var year	= value.substring(0, 4);
						var month	= value.substring(4);
						if(month > 1){
							month	= "0" + month;
						}
						$(this).val(year + "-"+month);
					}else if(value.length == 6){
						var year	= value.substring(0, 4);
						var month	= value.substring(4, 6);
						if(Number(month) > 12){
							month	= "12";
						}
						
						if(Number(month) == 0){
							month	= "01";
						}
						
						$(this).val(year + "-" + month);
					}else if(value.length == 7){
						var year	= value.substring(0, 4);
						var month	= value.substring(4, 6);
						var day		= value.substring(6);
						
						if(Number(month) > 12){
							month	= "12";
						}
						
						if(day > 3){
							day		= "0" + day;
						}
						
						
						$(this).val(year + "-" + month + "-" + day);
						
					}else if(value.length == 8){
						var year	= value.substring(0, 4);
						var month	= value.substring(4, 6);
						var day		= value.substring(6);
						
						if(Number(month) > 12){
							month	= "12";
						}
						
						if(day > 31){
							day		= "31";
						}
						
						if(Number(day) == 0){
							day		= "01";
						}
						
						$(this).val(year + "-" + month + "-" + day);
					}
				}
				
			});
			
		});  // datepicker
		
		
		$("input[type=text][id*=Date]").on("click", function(){
			$(this).next().click();
		});
			  
		fncDatepickerSetting();		
		
		//팝업 검색 창에서 쉬프트 컨트롤 키 대응 
		$('.cover').click(function(e) {
		    if (e.shiftKey || e.ctrlKey) {
		    	console.log("shift click");
		    	e.preventDefault();
		    } 
		});
 
	}); 
	
	function numbersonly(e){
		var keyValue = e.keyCode;
		if (event.keyCode >= 48 && event.keyCode <= 57){
			return;
		}else{
			alert("숫자만 입력 하세요!!!");
		   return false;		
		}
	}
	
	/* iframe height 수정 */
	function iFrameHeight(){
		var iHeight = $('#contentwrap').height() - ( $(".updownBtn").offset().top +  $(".updownBtn").height()+20) + 20;
		$("#reportArea").css('height',(iHeight+3));   // height 크기 
		$("#reportArea").css('top',$(".updownBtn").offset().top + $(".updownBtn").height() +5 );  // top 위치
	}

	// 프로픔트에서 사용함
	var fncDatepickerSetting		= function(){
		$("input[id*=datepicker]").each(function(){
		
			if(!$(this).hasClass("hasDatepicker")){
				$(this).datepicker({
					showOn: "button",
					buttonImage: URL_IMG_SERVER + "./images/icon_calendar.png",
					buttonImageOnly: true,
					changeYear: true,
					changeMonth: true,
					dateFormat : "yy-mm-dd",
					//minDate: '-20y', 	// 현재날짜로부터 20년이전까지 년을 표시한다.
				    yearRange: '2000:c+5', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.
				    showMonthAfterYear: true, 
				    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
				    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
				    dayNames: ['일','월','화','수','목','금','토'],
				    dayNamesShort: ['일','월','화','수','목','금','토'],
				    dayNamesMin: ['일','월','화','수','목','금','토'],
				}); 
				$(this).on("click", function(){
					$(this).next().click();
				});
			}
		});
		
		$("input[id*=monthpicker]").each(function(){
 			
			if(!$(this).hasClass("hasDatepicker")){
 
			    
				$(this).datepicker({
					showOn: "button",
					buttonImage: URL_IMG_SERVER + "./images/icon_calendar.png",
					buttonImageOnly: true,
					changeYear: true,
					changeMonth: true,
					dateFormat : "yymm",
					showButtonPanel: true,
					showMonthAfterYear: true, 
					yearRange: '2000:c+5', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.		
				    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
				    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
				    closeText : "닫기",
				    onClose: function(dateText, inst) {
			            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
			            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
 			            
			            var d = new Date(year, month, 1);
			            var curr_month = d.getMonth() + 1; //Months are zero based
						var curr_year = d.getFullYear();
			            if(curr_month < 10) curr_month = "0" + curr_month;
 
 			            $(this).val( curr_year.toString() + curr_month.toString()); 			             
			        }

				});  
				
				$("body").append("<style>table.ui-datepicker-calendar { display:none; }</style>");
				$("body").append("<style>button.ui-datepicker-current { display:none; }</style>");
				
				$(this).focus(function () {
			        $(".ui-datepicker-calendar").hide();
			        $(".ui-datepicker-current").hide();
			        $("#ui-datepicker-div").position({
			            my: "center top",
			            at: "center bottom",
			            of: $(this)
			        });
			    });
 
			}
		});
	};
</script>
<style>
.cover {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 1695px;
	height: 960px;
	background-color: #2d2d2d;
	opacity: 0.9;
	display: none;
}

.multi .outline {
	display: block;
	width: 1200px;
	height: 550px;
	position: absolute;
	top: 10%;
	left: 15%;
	border-width: 2px;
	border-color: #caa17c;
	border-style: solid;
	z-index: 99;
	border-radius: 8px;
	background-color: #fff;
	font-size: 1.1em;
}

.single .outline{
	display: block;
	width: 843px;
	height: 560px;
	position: absolute;
	top: 10%;
	left: 23%;
	border-width: 2px;
	border-color: #caa17c;
	border-style: solid;
	z-index: 99;
	border-radius: 8px;
	background-color: #fff;
	font-size: 1.1em;	
}

.outline ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

.pressed{
	background-color: #fdd6b8;
}

.outline .listBlock ul li {
	display: block;
	float: left;
	position: relative;
	width: 100%;
	border-top: 1px solid #fdd6b8;
}

.outline .selectedBlock ul li {
	display: block;
	float: left;
	position: relative;
	width: 100%;
	border-top: 0px solid #fdd6b8;
	border-bottom: 1px solid #fdd6b8;	
}

.outline ul li:hover {
	display: block;
	float: left;
	position: relative;
	width: 100%;
	background-color: #fdd6b8;
}

.outline .listBlock ul li.more {
	display: block;
	float: left;
	position: relative;
	width: 100%;
	border-top: 1px solid #fdd6b8;
	background-color: #fff;
	text-align: center;
	color: navy;	
	cursor: pointer;
}

.outline ul li a {
	float: left;
	white-space: normal;
	width: 100%;
	cursor: pointer;
	display: block;
	font-size: 1em;
	line-height: 1.3;
	padding: 0px 5px 0px 5px;
}

.multi .outline .searchBlock {
	display: block;
	width: 1195px;
	height: 40px;
	border-style: none;
	margin: 10px;
}

.single .outline .searchBlock {
	display: block;
	width: 1200px;
	height: 40px;
	border-style: none;
	margin: 10px;
}

.outline .searchBlock span {
	width: 100%;
	margin-left: 10px;
	margin-top: 10px;
	display: block;
	float: left;
	margin-left: 10px;
}

.outline .searchBlock span input {
	width: 145px;
	height: 25px;
	text-align: center;
	margin-right: 5px;
}

.multi .outline .contBlock {
	width: 1200px;
	height: 550px;
	display: block;
}

.single .outline .contBlock {
	width: 1000px;
	height: 550px;
	display: block;
}

.multi .outline .listBlock {
	margin-left: 20px;
	width: 560px;
	height: 475px;
	display: block;
	float: left;
	border-style: solid;
	border-width: 1px;
	border-color: #ec6900;
	overflow-x: hidden;
	overflow-y: auto;
}

.single .outline .listBlock {
	margin-left: 20px;
	width: 805px;
	height: 475px;
	display: block;
	float: left;
	border-style: solid;
	border-width: 1px;
	border-color: #ec6900;
	overflow-x: hidden;
	overflow-y: auto;
}

.outline .selectedBlock {
	margin-left: 0px;
	width: 560px;
	height: 475px;
	display: block;
	float: left;
	border-style: solid;
	border-width: 1px;
	border-color: #ec6900;
	overflow-x: hidden;
	overflow-y: auto;  
}

.multi .outline .commonBtn {
	display: block;
	border-width: 1px;
	border-style: solid;
	border-color: #56595c78;
	width: 52px;
	height: 22px;
	float: right;
	border-radius: 7px;
	text-align: center;
	line-height: 1.5;
	cursor: pointer;
}

.single .outline .commonBtn {
	display: block;
	border-width: 1px;
	border-style: solid;
	border-color: #56595c78;
	width: 32px;
	height: 22px;
	float: right;
	border-radius: 7px;
	text-align: center;
	line-height: 1.5;
	cursor: pointer;
}

.outline .commonBtn:hover {
	background-color: #f3d7b7;
}

.moveBtn{
	width: 24px;
	height: 25px;
	margin-left: 8px;
}

</style>
	<div class="cover multi">
		<div class="outline">
			<div class="searchBlock">
				<span> <input type="text" data-id="" name="searchKey" onkeydown="if(event.keyCode==13) openCssSearchDiv($(this).attr('data-id'), 1)">
						<img src="/resource/images/btn_search3.png" onclick="openCssSearchDiv($(this).prev().attr('data-id'), 1)">
						<div class="commonBtn" style="margin-right:36px;" onclick="cancelValue($(this).prev().prev().attr('data-id'));">취소</div>
						<div class="commonBtn" style="margin-right:10px;" onclick="applyValue($(this).prev().prev().prev().attr('data-id'));">적용</div>
						</span>						 
			</div>
			<div class="contBlock">
				<div class="listBlock">
					<ul>			
					</ul>
				</div>
				<div style="float: left;display: block; border-width: 0px; border-style: solid; border-color: red; width: 40px; height: 390px;">
				<div style="margin: auto;">
					<table class="moveBtnTbl">
						<tr>
							<td style="height: 110px">&nbsp;</td>
						</tr>					
						<tr>
							<td style="height: 30px"><input type="button" onclick="addSel();" value="&nbsp;&gt;&nbsp;" class="moveBtn"/></td>
						</tr>
						<tr>
							<td style="height: 30px"><input type="button" onclick="addAll()"; value="&gt;&gt;" class="moveBtn"/></td>
						</tr>					
						<tr>
							<td style="height: 20px">&nbsp;</td>
						</tr>						
						<tr>
							<td style="height: 30px"><input type="button" onclick="rmSel();" value="&nbsp;&lt;&nbsp;" class="moveBtn"/></td>
						</tr>
						<tr>
							<td style="height: 30px"><input type="button" onclick="rmAll();" value="&lt;&lt;" class="moveBtn"/></td>
						</tr>
						<tr>
							<td style="height: 140px">&nbsp;</td>
						</tr>																		
					</table>					
				</div>
				</div>
				<div class="grid_loading" style="display: block;position: absolute;top: 165px;left: 120px;width: 50px;height: 50px;opacity: 0.7;">
					<img src="/resource/images/grid_loading.gif" width="330" height="218">
				</div>				
				<div class="selectedBlock">
					<ul>						
					</ul>
				</div>
			</div>
		</div>	
	</div>
	<div class="cover single">
		<div class="outline">
			<div class="searchBlock">
				<span> <input type="text" data-id="" name="searchKey" onkeydown="if(event.keyCode==13) openCssSingleSearchDiv($(this).attr('data-id'), 1)">
						<img src="/resource/images/btn_search3.png" onclick="openCssSingleSearchDiv($(this).prev().attr('data-id'), 1)">
						<div class="commonBtn" style="margin-right:398px;" onclick="cancelValue($(this).prev().prev().attr('data-id'));">취소</div>
						</span>						 
			</div>			
			<div class="contBlock">
				<div class="listBlock">
					<ul>			
					</ul>
				</div>
				<div class="grid_loading" style="display: block;position: absolute;top: 120px;left: 240px;width: 50px;height: 50px;opacity: 0.7;">
					<img src="/resource/images/grid_loading.gif" width="415" height="285">
				</div>				
			</div>
		</div>	
	</div>
</body>
</html>