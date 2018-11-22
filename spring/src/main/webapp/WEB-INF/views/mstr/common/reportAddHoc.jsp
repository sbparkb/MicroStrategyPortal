<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%--@ page import="com.groto.cmm.util.Tool" --%>
<%@ page import="javax.servlet.http.HttpSession" %>
<%@ page import="java.util.Locale" %>

<%@ page import="com.mstr.business.model.*" %>
<%@ page import="com.groto.cmm.util.SystemMessage" %>
<%@ page import="com.groto.cmm.util.StringUtil" %>
<%@ page import="java.util.List" %>
<%@ taglib prefix="sep" uri="/sepMstrTL.tld"%>
<%
	String contextRoot = request.getContextPath();
	String contextDoc = contextRoot + "/resource";
 
 
	String context 				= request.getContextPath();
 
	String sessionid			= (String) request.getParameter("usrSmgr") ;//(String) request.getSession().getAttribute( "usrSmgr" );
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<jsp:include page="/WEB-INF/views/mstr/common/common.jsp" />
<style type="text/css">
#container #content-area { padding:0; }

.mstrToolbarButton span {
background-image: url(../style/mstr/images/toolbar.png)  left top no-repeat; 
    border: 0;
    float: right;
    height: 20px;
    padding-left: 0;
    padding-right: 0;
    width: 20px;

}

#tbPrint, #tbPrintDHTML, #tbPrintHTML {
    background-position: -160px -220px;
}

</style>

<link rel="stylesheet" type="text/css" href="<%=contextDoc %>/css/top_style.css" />

<link rel="stylesheet" type="text/css" href="../css/style.css" /> 

<script type="text/javascript">
 
var execucheck = false;
$(document).ready(function(){
	//$("#viewTitle").text("${path}");
	// 리포트 조회 화면시 리포트영역 최대 크기로 변경 처리
	//$("#report").css("height", $("#reportArea").css("height"));
	$("#container").css("width", "100%");
	$("#container").css("height", "100%");
	// 프롬프트 영역 숨김처리 버튼 중앙 위치 설정
	//$("#verticalBtnDiv").css("width", $("#toggleBtn").css("width"));
	//$("#verticalBtnDiv").css("margin", "0 auto");
	//fncPromptDivHide();
	
});


//프롬프트 영역 숨김/보임 처리
var fncPromptDivHide			= function(){
	//var img			= $("#toggleBtn").find("img");
	if($(".form-area").is(":hidden")){
		$(".form-area").show();
		$('.open-form').addClass("active");
	}else{
		$(".form-area").hide();
		$('.open-form').removeClass("active");
	}
}


function executeReportPop(){
	
	if(execucheck == false){
		alert("리포트를 먼저 실행 하세요!!!");
		return;
    }
	result=popSessionCheck();
	
	if(!result){
		//location.href =URL_WEB_SERVER+"/login/login.do";
		window.top.location.replace(URL_WEB_SERVER+"/login/login.do");
	}else{
		reportExecutionPop();
	}

}


function reportExecutionPop() {
    
	var form		= $("<form></form>");
	window.open("" ,"popReport", "toolbar=no, width=1290, height=797, directories=no, status=no,    scrollbars=yes, resizable=yes");
	form.attr("action", "<spring:message code='URL.WEB.SERVER' />/servlet/mstrWeb?evt=3005&src=mstrWeb.3005&reportDesignMode=1&reportID=05B202B9999F4C1AB960DA6208CADF3D");
	form.attr("method", "post");
	form.attr("target", "popReport");
	$("body").append(form);
	form.submit();
}

function jsDelayStart(){
	execucheck = true;
 
	result=popSessionCheck();
 
	if(!result){
 	    
	    alert('세션 로그아웃 되었읍니다.');
	    window.top.location.replace(URL_WEB_SERVER+"/login/login.do");
	}else{
		reportExecution();
	}
}

// 실제 처리 되는 fn
function reportExecution() {
	
	$("#loadingDiv").show();
	
	fncPromptDivHide();
	jQuery("#mstrPromptForm").attr("method", "POST");
	jQuery("#mstrPromptForm").attr("action", "<spring:message code='URL.WEB.SERVER' />/servlet/mstrWeb?evt=3005&src=mstrWeb.3005&reportDesignMode=1&reportID=05B202B9999F4C1AB960DA6208CADF3D");
	jQuery("#mstrPromptForm").append("<input type='hidden' name='hiddenSections' id='hiddenSections' value='path,header' />");

	jQuery("#mstrPromptForm").append("<input type='hidden' name='usrSmgr'  id='usrSmgr'  value='<%=sessionid%>' />");
	jQuery("#mstrPromptForm").attr("target", "report");
	jQuery("#mstrPromptForm").submit();
	
 
	iFrameHeight();
	
	$("#reportArea").show();
	//report iframe이 로드가 완료 된 후 해당 iframe 각 요소 컨트롤 추가
	$("#report").load(function(){
		$("#loadingDiv").hide();
	});
}
 
</script>
<body style="zoom: 1;">
	<div style="width:100%; height:99%; overflow:hidden;">
 	<!-- container -->
 	<!-- min-height: 840px; -->
	<div id="container" style="width:99%;height:99%;margin-top:20px;background:#ffffff;">
		<div id="content-area" style="padding-right: 10px;background-color: #ffffff;height:99%;">

 <h1  style="position:static;top: 22px;left: 10px;" >		
 <!-- 
 			<img src="../images/pageTitle_blt.gif"	style="vertical-align: text-bottom;" /> 
 -->	
 			&nbsp;&nbsp;비정형분석
 			<a href="javascript:executeReportPop()" class="new-layer" style="vertical-align: text-bottom;"></a>
 

</h1> 				 

			<!-- search-wrap -->
			<div class="search-wrap" style="margin-top:10px; left:10px; right:5px; position:static;">
				<div class="form-area">
					<div class="form-field">
					<form id="mstrPromptForm" name="mstrPromptForm">
 
 				    </form>
				    </div>
				    <div class="form-fixed"   style="height:100%;"><input class="btn-search"  style="background:#000;" type="button" value="조회" onclick="javascript:jsDelayStart();return false;"/></div>
			    </div>
			    
				<a href="#" class="open-form active" onclick="return fncOpenForm();">search-open</a>
				
			</div>
			<!-- //search-wrap -->
			<div id="loadingDiv" style="position: absolute; z-index:20;display: none; text-align: center; margin-top: 20%; margin-left: 49%;">
							<img src="<spring:message code='URL.IMG.SERVER'/>images/loader.gif" />
			</div>
			
			<!-- min-height: 700px;  -->
			<div id="reportArea" class="content cont_shadow" style="border:0; display:none; position:fixed; bottom:20px; left:10px; right:6px; top:60px;">
			<!-- min-height: 700px;  -->
				<iframe id="report" name='report' src="" style="width: 100%; height:100%; border:0;"></iframe>
			</div>
			 	
			<!-- //content -->	
			

		</div>	
					
	</div>
	<!-- //container -->
<%--jsp:include page="/WEB-INF/views/mstr/common/footer.jsp" --%>
	
</div>
<script>
	$(document).ready(function(){
		$('.form-area').show();
		//alert("dddd");
// 프롬프트 select box 변경 

 		$("#ui-datepicker-div").on("blur", function(e) { $(this).datepicker("hide"); });
		if($("#mstrPromptForm").find("#paramCnt").size() < 1 ||  $("#mstrPromptForm").find("#paramCnt").val() == 0 ){
		    // prompt data not found 
			jsDelayStart();
		}
		
 
		var shbtnH = ($(".form-area").height()-16);
		//var iHeight = 790 - ( $(".open-form").offset().top +  $(".open-form").height() + 20);
		if(shbtnH < 24 ) shbtnH = 24;
		if(shbtnH > 112 )  shbtnH = 112;
		//console.log(shbtnH + "," + iHeight);
		$(".btn-search").css('height',(shbtnH));
 
	});
	 
	/* iframe height 수정 */
	function iFrameHeight(){
 
//		$("#reportArea").css('height',(iHeight+3));
		$("#reportArea").css('top',($(".open-form").offset().top + $(".open-form").height() ));
		//$("#report").css('height',(iHeight));
	}
 
 
	 
	
	var errCnt = 0;
	
	var fncOpenForm	 = function(){
	    try {
			$('.form-area').slideToggle('10', function() {
			    iFrameHeight();
			});
			//var shbtnH = ($(".form-area").height()-16);
			//$('.btn-search').animate({height:shbtnH}, 400);
			$('.open-form').toggleClass("active");

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
	    }
 
	    if(errCnt > 3) {
			alert('javascript 오류가 발생했습니다. 재조회 후 선택하세요');
	    } else { 
		    // finally insert the element to the body element in order to load the script
		    document.body.appendChild(jsElm);
	    }
	}
</script>
</body>
</html>

