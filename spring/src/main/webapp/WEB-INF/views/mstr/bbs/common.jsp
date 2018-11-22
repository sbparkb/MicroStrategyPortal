<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt"       uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn"        uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>
<%
	response.setHeader("P3P", "CP='CAO PSA CONi OTR OUR DEM ONL'");
	String contextRoot = request.getContextPath();
	String contextDoc = contextRoot + "/resource";

	request.setAttribute("isBiWeb", "Y");		
%>
<head>
<meta charset="utf-8">
<link rel="shortcut icon" href="/favicon/favicon.ico">
<meta http-equiv="imagetoolbar" content="no">
<meta name='viewport' content='width=device-width, initial-scale=1'>
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<link rel="stylesheet" type="text/css" href="<%=contextDoc %>/css/style.css" />
<link rel="stylesheet" type="text/css" href="<%=contextDoc %>/css/upload/uploadfile.css" />
<script>
var URL_WEB_SERVER			= "<spring:message code='URL.WEB.SERVER' />";
var URL_IMG_SERVER 			= 	"<spring:message code='URL.IMG.SERVER'/>";

//쿠키에 id를 저장.
function setCookie(name, value, expiredays) {
  var today = new Date();
  today.setDate(today.getDate() + expiredays);
  document.cookie = name + "=" + escape(value) + "; path=/; expires="+ today.toGMTString() + ";";  
}

function getCookie(name){
	var cook = document.cookie + ";";
	var idx = cook.indexOf(name, 0);
	var val = "";
	if (idx != -1) {
	    cook = cook.substring(idx, cook.length);
	    begin = cook.indexOf("=", 0) + 1;
	    end = cook.indexOf(";", begin);
	    val = unescape(cook.substring(begin, end));
	}
  return val;
}
</script>
<script type="text/javascript" src="<%=contextDoc %>/javascript/jquery.min.js"></script>
	<script type="text/javascript" src="<%=contextDoc %>/javascript/jquery-ui.js"></script>
	<script type="text/javascript" src="<%=contextDoc %>/javascript/jquery.sumoselect.js"></script>
	<script type="text/javascript" src="<%=contextDoc %>/javascript/common.js"></script>
	<script type="text/javascript" src="<%=contextDoc %>/javascript/multimenu.js"></script>
<script src="<%=contextDoc %>/javascript/jquery-ui-1.9.2.custom.min.js"></script>
<script src="<%=contextDoc %>/javascript/multiselect/multiple-select.js"></script>
<script type="text/javascript" src="<spring:message code="URL.IMG.SERVER"/>javascript/jquery.meio.mask.js"></script>
<script type="text/javascript" src="<spring:message code="URL.IMG.SERVER"/>javascript/jquery.validate.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/javascript/mstr/core.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/javascript/microstrategy.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/javascript/DHTML.js"></script>
<script src="<%=contextDoc %>/javascript/json2.js"></script>
<script src="<%=contextDoc %>/javascript/html2canvas.js"></script>
<script type="text/javascript" src="<%=contextDoc %>/javascript/html2canvas.svg.js"></script>
<script src="<%=contextDoc %>/javascript/common/ajaxcommon.js"></script>
<script src="<%=contextDoc %>/javascript/common/popuplink.js"></script>
<script src="<%=contextDoc %>/javascript/common/util.js"></script>
<script type="text/javascript" src="<spring:message code="URL.IMG.SERVER"/>editor/js/HuskyEZCreator.js"></script>
<script type="text/javascript" src="<spring:message code="URL.IMG.SERVER"/>javascript/jquery.form.js"></script>
<script src="<%=contextDoc %>/javascript/jquery.uploadfile.js"></script>
<title><spring:message code='BROWSER.TITLE' /></title>
<script>
var lnbHtml				= ""; 
var noFabric = true;
//AJAX Deferred 사용하여 AJAX 호출
function callAjax(ajaxInfo){
	var dfd = $.Deferred();
	$.ajax(ajaxInfo).done(function(data){
		dfd.resolve(data);
	}).error(function(xhr, status, error){
		dfd.reject(xhr);
		fncfail(xhr);
	});
	
	return dfd.promise();
}

var fncfail=function(xhr) {

	if(opener){
		window.close();
		if(xhr.status==404){
			opener.location.href ="<spring:message code="URL.WEB.SERVER"/>/error/404.do";
		}else if(xhr.status==500){
			opener.location.href ="<spring:message code="URL.WEB.SERVER"/>/error/500.do";
		}else{
			opener.location.href ="<spring:message code="URL.WEB.SERVER"/>/error/exception.do";
		}
	}else{
		if(xhr.status==404){
			top.location.href ="<spring:message code="URL.WEB.SERVER"/>/error/404.do";
		}else if(xhr.status==500){
			top.location.href ="<spring:message code="URL.WEB.SERVER"/>/error/500.do";
		}else{
			top.location.href ="<spring:message code="URL.WEB.SERVER"/>/error/exception.do";
		}
		
	}
};

$(document).ready(function(){
	
	
	if("${message}" != null && "${message}" != ""){
		alert("${message}");
	}
	
	$(".slidebtn a").on("click", function(e){
	    e.preventDefault();
	    var hrefval = $(this).attr("href");
	    
	    if(hrefval == "#cf-side-wrap") {
	      var distance = $('#cf-container').css('left');
	      
	      if(!$(this).hasClass("open")) {
	        $(this).addClass("open");
	        openSidepage();
	      } else {
	        closeSidepage();
	      }
	    }
	  }); // end click event handler
	  
	  $("#closebtn").on("click", function(e){
	    e.preventDefault();
	    closeSidepage();
	  }); // end close button event handler

	$("input[type=text][id*=Date]").on("click", function(){
		$(this).next().click();
	});
	  
	  $("#cf-side-wrap").hide();
	  fncDatepickerSetting();
	//$("input").setMask();
	 
});

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
			    yearRange: '1940:c+50', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.		
				
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
		//alert("monthly");
		
		if(!$(this).hasClass("hasDatepicker")){
			$(this).datepicker({
				showOn: "button",
				buttonImage: URL_IMG_SERVER + "./images/icon_calendar.png",
				buttonImageOnly: true,
				changeYear: true,
				changeMonth: true,
				dateFormat : "yymm",
				showButtonPanel: true,
				currentText: '오늘',
				//minDate: '-20y', 	// 현재날짜로부터 20년이전까지 년을 표시한다.
			    yearRange: '1940:c+50', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.		
			    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			    dayNames: ['일','월','화','수','목','금','토'],
			    dayNamesShort: ['일','월','화','수','목','금','토'],
			    dayNamesMin: ['일','월','화','수','목','금','토'],
			    closeText : "닫기",
			    onClose: function(dateText, inst) {
		            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
		            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
		            $(this).val($.datepicker.formatDate('yymm', new Date(year, month, 1)));
		        }

			});  
			$(this).focus(function () {
		        $(".ui-datepicker-calendar").hide();
		        $(".ui-datepicker-current").hide();
		        $("#ui-datepicker-div").position({
		            my: "center top",
		            at: "center bottom",
		            of: $(this)
		        });
		    });

			$(this).on("click", function(){
				$(this).next().click();
			});
			

		}
	});
}

function openSidepage() {
    $('#slidebtn').animate({
      left: '249px'
    }, 400, 'easeOutBack'); 
    $("#cf-side-wrap").show();
}
  
function closeSidepage(){
  $(".slidebtn a").removeClass("open");
  $('#slidebtn').animate({
    left: '0px'
  }, 400, 'easeOutQuint');
  $("#cf-side-wrap").hide();
}
</script>
</head>