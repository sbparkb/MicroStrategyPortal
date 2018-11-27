<%
 /****
  * Copyright_Footer.jsp
  * This file displays MicroStrategy's Tagline.
  * It's used as the footer for the Projects and Login pages.
  *
  * Copyright 2004 MicroStrategy Incorporated. All rights reserved.
  * version: 1.2
  * xhtml: true
  ****/
%><%@ page errorPage="JSP_Error.jsp"
%><%@ page contentType="text/html; charset=UTF-8"
%><%@ taglib uri="/webUtilTL.tld" prefix="web" %>

<div class="mstrFooter">
<%--Copyright &#169; 1996-2008 MicroStrategy, Incorporated.--%>
<span class="copyright"><web:descriptor key="mstrWeb.5167" desc="copyright"/></span>

<%--
 The script included in the "JSP" tag will be removed when this
 file gets converted into ASP.Net. Instead, the ASP section will
 be executed.
--%>

<web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenAbout" target="_new" linkAttributes="onclick='window.setTimeout(function(){iframe && iframe.hideWaitPage(true);}, 500);'">
<web:descriptor key="mstrWeb.11280" desc="About Microstrategy"/>
</web:urlEvent>


<web:resource type="helpUser"/>
<%-- CSS Analyzer placeholder --%>
</div>