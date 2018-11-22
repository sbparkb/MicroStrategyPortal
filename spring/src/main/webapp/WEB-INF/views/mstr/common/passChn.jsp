<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="com.mstr.business.model.*" %>
<%@ page import="com.groto.cmm.util.StringUtil" %>
<%@ taglib prefix="sep" uri="/sepMstrTL.tld"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
String contextRoot = request.getContextPath();
String contextDoc = contextRoot + "/resource";
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Cache-Control" content="No-Cache"/>
<meta charset="utf-8">
<meta http-equiv="imagetoolbar" content="no">
<meta name='viewport' content='width=device-width, initial-scale=1'>
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<!--[if lt IE 9]>
	<script src="<%=contextDoc %>/javascript/html5shiv.js"></script>
<![endif]-->
<script type="text/javascript" src="<%=contextDoc %>/javascript/jquery.min.js"></script>
	<script type="text/javascript" src="<%=contextDoc %>/javascript/jquery-ui.js"></script>
<script src="<%=contextDoc %>/javascript/jquery-ui-1.9.2.custom.min.js"></script>
<title><spring:message code='BROWSER.TITLE' /></title>
<style>
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center,
dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {margin:0; border:0; padding:0;}
body { font-family:'Malgun Gothic','돋움',Dotum; line-height:18px; font-size:13px; color:#333; word-break:break-all; }
ol, ul { list-style:none; }
button { }
.hidden, legend, caption { width:0; height:0; line-height:0; font-size:0px; float:left; position:absolute; visibility:hidden; overflow:hidden; display:none; }
p { }
strong{ font-weight:bold; }
address { font-style:normal; }
img { vertical-align:middle; }

html, body { height:100%; min-height:100%; }

#wrap { height:auto; position:relative; *zoom:1; }
#wrap:after { content:""; display:block; clear:both; }
#passchg-wrap { position:absolute; margin: 0px 100px;  top:0; width:362px; background:#fff; }

#chg-form { width:354px; margin: 100px auto; letf:140px; top:100px; right:140px;}
.login-box {  }
.login-box input { border:0; margin:2px 0; }
.login-box input[type="text"] { width:286px; height:50px; padding-left:68px; background:url(<%=contextDoc%>/images/login/login_idbg.png) left top no-repeat; }
.login-box input[type="password"] { width:286px; height:50px; padding-left:68px; background:url(<%=contextDoc%>/images/login/login_pwbg.png) left top no-repeat; }
.login-box input[type="submit"] { margin-top:10px; cursor:pointer; width:354px; height:60px; font-size:0; background:url(<%=contextDoc%>/images/login/btn_login.png) left top no-repeat; }
.login-box .btn-pwreset { text-align:right; margin-top:8px; }

.login-txt { position:absolute; left:34px; bottom:24px; }
.login-txt p { font-size:11px; color:#a0a0a0; line-height:24px; }
	.login-box .btn-area { position:absolute; left:31px;top:380px; bottom:30px; margin:0 auto; }
	.login-box .btn-area .btn-complete { width:134px; height:30px; line-height:30px; color:#fff; border:0; font-size:12px; cursor:pointer; background:#3b3b3b; -webkit-border-radius:6px; -moz-border-radius:6px; border-radius:6px; }
	.login-box .btn-area .btn-cancel { width:134px; height:30px; line-height:30px; color:#fff; border:0; font-size:12px; cursor:pointer; background:#3b3b3b; -webkit-border-radius:6px; -moz-border-radius:6px; border-radius:6px; }
#copy { width:100%; position:absolute; left:0; top:32px; text-align:center; color:#6a6a6a; }
#copy .copyright { margin-top:4px; font-size:11px; color:#999; }
#copy .copyright span { color:#e2231a; }
	
</style>
<style type="text/css">
html {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
<script type="text/javascript">
$(document).ready(function(){
	$("html").css("min-width", 300);
	$("#container").css("width", 300);
});

var fncNowPassChk		= function(){
	var nowPass			= $("#nowPass").val();
	var newPass			= $("#newPass").val();
	var newPassChk		= $("#newPassChk").val();
	if(nowPass == null || nowPass == ""){
		alert("현재 비밀번호를 입력해 주세요.");
		$("#nowPass").focus();
		return;
	}
	
	if(newPass.length < 10){
		alert("비밀번호는 10자리 이상 입력 되어야 합니다.");
		$("#newPass").focus();
		return;
	}
	
	if(newPass == null || newPass == ""){
		alert("새 비밀번호를 입력해 주세요.");
		$("#newPass").focus();
		return;
	}
	
	if(newPassChk == null || newPassChk == ""){
		alert("비밀번호 확인을 입력해 주세요.");
		$("#newPassChk").focus();
		return;
	}
	
	if(newPass != newPassChk){
		alert("새 비밀번호가 다릅니다.");
		$("#newPassChk").focus();
		return;
	}
	
	if(newPass == nowPass){
		alert("기존의 비밀번호와 다른 비밀번호를 입력하세요.");
		$("#newPass").val("");
		$("#newPassChk").val("");
		$("#newPass").focus();
		return;
	}
	
	if(!isValidFormPassword(newPass)){
		//alert("비밀번호는 영문, 숫자, 특수문자가 포함 되어야 합니다.");
		$("#newPass").focus();
		return;
	}

	if(isContinuedValue(newPass)){
	         //alert("비밀번호에 3자 이상의 연속 또는 반복 문자(숫자)를 사용하실 수 없습니다."); 
	         $("#newPass").focus();
	         return;
	}
 	
	var ajaxInfo		= {
			"url"		: "<spring:message code='URL.WEB.SERVER' />/service/usr/passCheck.do"
			, "dataType": "json"
			, "data"	: {
				"nowPass" : nowPass
			}
	}
	//var ajax			= callAjax(ajaxInfo);
	$.ajax(ajaxInfo).done(function(data){
		if(data.result == "success"){
			var ajaxInfo1		= {
					"url"		: "<spring:message code='URL.WEB.SERVER' />/service/usr/passChangePrc.do"
					, "dataType": "json"
					, "data"	: {
						"newPass" : newPass
					}
			}
			
			//var ajax1			= callAjax(ajaxInfo1);
			$.ajax(ajaxInfo1).done(function(data){
				if(data.result == "success"){
					alert("비밀번호가 정상적으로 변경 되었습니다.");
					window.close();
					window.parent.parent.dialogClose();
				}else{
					alert(data.message);
				}
			});
		}else{
			alert(data.message);
			return;
		}
	});
}


/**
 * 비밀번호 유효성 체크 숫자, 영문 포함 여부 검사
 *
 * @param	pass
 * @return	boolean
 */
 function isValidFormPassword(newPassword1) {
 
	// 영문(대/소), 숫자, 특수문자 3종 이상 혼용
	 var chk = 0;
	 if(newPassword1.search(/[0-9]/g) != -1 ) {  chk ++; }
	 if(newPassword1.search(/[a-z]/g) != -1 ) {  chk ++; }
	 if(newPassword1.search(/[A-Z]/g) != -1 ) {  chk ++; }
	 if(newPassword1.search(/[!@#$%^&*()?_~]/g)  != -1  ) {  chk ++; }
 	 
	 if(chk < 3)
	 { 
	  alert("비밀번호는 숫자, 영문(대/소), 특수문자를 세가지이상 혼용하여야 합니다."); 
	  return false;
	 }
	  
	 // 동일한 문자/숫자 4이상, 연속된 문자
	 if(/(\w)\1\1\1/.test(newPassword1) || isContinuedValue(newPassword1))
	 {
	  alert("비밀번호에 4자 이상의 연속 또는 반복 문자 및 숫자를 사용하실 수 없습니다."); 
	  return false;
	 }

	 return true;
	 
	}


 /*
  *   같은 문자(숫자),이어지는 문자(숫자) 체크 
  */
function isContinuedValue(value) {
	var intCnt1 = 0;
	var intCnt2 = 0;
	var temp0 = "";
	var temp1 = "";
	var temp2 = "";
	var temp3 = "";
	var return_val = "";
	
	for (var i = 0; i < value.length-3; i++){
	  
		temp0 = value.toUpperCase().charAt(i);
		temp1 = value.toUpperCase().charAt(i + 1);
		temp2 = value.toUpperCase().charAt(i + 2);
    	temp3 = value.toUpperCase().charAt(i + 3);
		
		
		if (temp0.charCodeAt(0) - temp1.charCodeAt(0) == 1
		 && temp1.charCodeAt(0) - temp2.charCodeAt(0) == 1
		 && temp2.charCodeAt(0) - temp3.charCodeAt(0) == 1) {
		  intCnt1 = intCnt1 + 1;
		}
		
		if (temp0.charCodeAt(0) - temp1.charCodeAt(0) == -1
		 && temp1.charCodeAt(0) - temp2.charCodeAt(0) == -1
		 && temp2.charCodeAt(0) - temp3.charCodeAt(0) == -1) {
		  intCnt2 = intCnt2 + 1;
		}

	}
	
	return ( intCnt1 > 0 || intCnt2 > 0 );
}

</script>
</head>
<body>
<div id="wrap">
	<div id="passchg-wrap">
	
		<div id="chg-form">
		<div id="copy">
			<p>영문(대/소) 숫자 특수 문자 조합 10자 이상 사용해야 합니다 .</p>
		</div>	
			<div class="login-box">
				<form id="cssModForm" method="post" action="<spring:message code='URL.WEB.SERVER' />/service/portal/cssModPrc.do">
					<dl>
						<dt>현재 비밀번호</dt>
						<dd><input type="password" name="nowPass" id="nowPass" value="" /></dd>
	
						<dt>새 비밀번호</dt>
						<dd><input type="password" name="newPass" id="newPass" value="" /></dd>
						
						<dt>비밀번호 확인</dt>
						<dd><input type="password" name="newPassChk" id="newPassChk" value="" /></dd>
					</dl>
				</form>
				<div class="btn-area" style="bottom:15px;">
					<button id="okay" class="btn-cancel" onclick="javascript:fncNowPassChk();" >확인</button>
					<button id="cancle" class="btn-cancel" onclick="javascript:window.close();window.parent.parent.dialogClose();">취소</button>
			     </div>
			</div>
		</div>
		
		
	</div>
	
</div>
</body>
</html>