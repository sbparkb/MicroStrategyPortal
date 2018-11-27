<%
/*
 * Print_Content.jsp
 * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
 */
%>

<%@ page errorPage="Error_Content.jsp" %>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>

<style type="text/css">
	.mstr, .mstr input, .mstr select, .mstr textarea {
		font-family: <web:beanValue property="fontName"/>;
		font-size: 7.5pt;
	}
    .print-text {
        font-family: <web:beanValue property="fontName"/>;
        font-size: <web:beanValue property="fontSize"/>pt;
        color: #000000;
    }
    .print-pageby-title {
        font-family: <web:beanValue property="fontName"/>;
        font-size: <web:beanValue property="fontSize"/>pt;
        color: #000000;
        font-weight: bold;
    }
    .print-pageby-text {
        font-family: <web:beanValue property="fontName"/>;
        font-size: <web:beanValue property="fontSize"/>pt;
        color: #000000;
    }
</style>
<%-- Render the print bean. --%>
<web:displayBean bean="pb" />
