<%@ page language ="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>


<%
	request.setCharacterEncoding("UTF-8");
	response.setCharacterEncoding("UTF-8");

 
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTDHTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
<html>
<head>
<title>사용자 등록</title>
<link rel="stylesheet" href="/resource/common/css/style.css" type="text/css">
<link rel="stylesheet" href="/resource/common/css/board.css" type="text/css">
 

<script>
function f_GoList(){
	//목록으로 복귀
    window.close(); 
}
function f_Save(){	
	//사용자등록 
    var frm = document.user;

    if(frm.loginNm.value == ""){
        alert("사용자명을 입력하세요");
        return;
    }
    
    if(frm.loginId.value == ""){
        alert("아이디를 입력하세요");
        return;
    }
    
    if(frm.loginPw.value == ""){
        alert("비밀번호를 입력하세요");
        return;
    }
      	
    //frm.compCd.value = "U";
    frm.action = "userReg.do";
    frm.submit();
}
function searchWindow(){
	var frm = document.user;
	var nm = encodeURIComponent(frm.username.value);
	//사용자 검색 모달창 호출 
	window.showModalDialog("user_search.jsp?userNm="+nm,self, "dialogHeight: 1280px; dialogWidth: 1024px; dialogTop: px; dialogLeft: px; edge:Sunken; center:Yes; help:No; resizable:No; status:No; scroll:no");
}
function keyDown(e){
	//key down 엔터 입력 시 조회 
	var keynum = "";

	if(window.event) {
		// IE8 and earlier
		keynum = e.keyCode;
	}else if(e.which) {
		// IE9/Firefox/Chrome/Opera/Safari
		keynum = e.which;
	}
	
	if(keynum == 13) searchWindow(); 
}
</script>
</head>
<form name="user" method="post">
<input name="compCd" type="radio"   value="I" checked="checked" /> insert &nbsp;&nbsp;&nbsp;<input type="radio" name="compCd"   value="U" /> update &nbsp;&nbsp;&nbsp;<input type="radio" name="compCd"   value="D" /> delete
<input type="hidden" name="compCd1">
<input type="hidden" name="userID" value="<%=(String)session.getAttribute("user_id")%>">
<!--Table Start-->
<div id="Table" style="width: 340px;">

	<!--blockContainer Start-->
	<div id="Table_blockContainer">
				<h1 class="none">컨텐츠영역</h1>
				
				<!--pageTitle Start-->
				<div id="pageTitle">
					<h2><p>사용자 등록</p></h2>
				</div>
				<!--//pageTitle End-->
					
				<!--blockDetail Start-->
				<div class="blockDetail">
					<table summary="사용자 등록">
						<caption></caption>						
						<tbody>
							<tr>
								<th scope="row">아이디</th>
								<td><input name="loginId" title="아이디" class="inputbox w95" type="text" value="" /></td>
							</tr>
							<tr>
								<th scope="row">사용자명</th>
								<td><input name="loginNm" title="사용자명" class="inputbox w60" type="text" value="" onkeydown="keyDown(event)"/><!-- <a class="button" href="javascript:searchWindow();" ><span>조회</span></a></td> -->
							</tr>	
							<tr>	
								<th scope="row">비밀번호</th>
								<td><input name="loginPw" title="비밀번호" class="inputbox w95" type="password" value=""/></td>								
							</tr>
							<tr>
							  <th scope="row">설명</th>
								<td><input name="syEmail" title="이름" class="inputbox w95" type="text" value=""/></td>
							</tr>
							<tr>
							  <th scope="row">사용여부</th>
								<td><input name="useYn" type="radio" id="radio" value="Y" checked="checked" /> 예 &nbsp;&nbsp;&nbsp;<input type="radio" name="useyn" id="radio" value="N" /> 아니오</td>
							</tr>							
						</tbody>
					</table>
				</div>
				<!--//blockDetail End-->
									
				<!--blockButton Start-->
				<div class="blockButton"> 
					<ul>
						<li><a class="button" href="javascript:f_Save();"><span>저장</span></a></li>
						<li><a class="button" href="javascript:f_GoList();"><span>취소</span></a></li>
				  </ul>
				</div>
				<!--//blockButton End-->										
																	
			</div>
			<!--//mainContents End-->
			<div class="clear"></div>
		
</div>
<!--//wrapper End-->
</form>
</body>
</html>