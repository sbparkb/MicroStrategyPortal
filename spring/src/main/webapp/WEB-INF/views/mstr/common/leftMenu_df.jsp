<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.groto.cmm.util.SystemMessage"%>
<%@ page import="com.groto.cmm.util.CmmUtil"%>
<%@ page import="com.microstrategy.webapi.EnumDSSXMLObjectTypes"%>
<%@ page import="java.util.*" %>
<%@ page import="com.mstr.business.model.*" %>
<%@ page import="com.groto.cmm.util.StringUtil" %>
<%@ page import="com.groto.session.MSTRSessionUserImpl"%>
<%@ page import="com.microstrategy.web.objects.WebObjectInfo"%>
<%@ taglib prefix="fn" uri = "http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sep" uri="/sepMstrTL.tld"%>
<sep:script message=""/>
<sep:def notiSeq="${fn:escapeXml(notiSeq)}"/>
<script src="${fn:escapeXml(pageContext.request.contextPath)}/resource/pmd/common/leftMenu_df.js"></script>
       <div class="fixed_menu_left close">
            <h1><img src="../df/images/DBI_Main_Title_B.png" alt="BI PORTAL"></h1>
			<div class="loginBox"><span class="name">${fn:escapeXml(user.userName)}</span><span class="number">(${fn:escapeXml(user.userId)})</span><a href="../login/logout.do" class="btn">로그아웃</a></div><div class="searchBox">
				<input type="text" name="searchText"  id="searchText" class="" placeholder=""  onkeypress="if(event.keyCode==13) {reportSearch(); return false;}" />
				<a href="javascript:reportSearch()" class="searchBtn">검색</a>
			</div>
			<div class="serviceBox">
				<ul>
                    <li class="li01"><a href="javascript:fncCallMyreportPop();">내폴더</a></li>
                    <li class="li02"><a href="javascript:fncCallAnalysysPop();">비정형분석</a></li>
                    <li class="li03"><a href="javascript:ftn_linkReport_notice();">&nbsp;&nbsp;공지사항</a></li>
                    <li class="li04"><a href="javascript:fncMovDashBoard();">시각화</a></li>
                    <li class="li05"><a href="javascript:fncCallPassModPop();">PW변경</a></li>
					<li class="li06"><a href="<spring:message code='URL.WEB.SERVER' />/df/BI_Manaual.zip" target="_blank">매뉴얼</a></li>
					<li class="li07"><a href="javascript:fncPopUpload();">업로드</a></li>
                </ul>
			</div>
 
			<h2>정형분석</h2>
			<div id="mcs_container">
				<div class="customScrollBox">
					<div class="container">
						<div class="content">
			<div class="lnb">
				<ul>
					<sep:lnb objectID="${fn:escapeXml(param.objectID)}"/>
				</ul>
			</div>
						</div>
					</div>
					<div class="dragger_container">
						<div class="dragger"></div>
					</div>
				</div> 
			</div>			
        </div>
        
<script src="${fn:escapeXml(pageContext.request.contextPath)}/resource/pmd/common/mScroll.js"></script>

<script src="../df/js/jquery.mCustomScrollbar.js"></script>