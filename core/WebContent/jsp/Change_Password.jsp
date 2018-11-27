<%
    /*
     * Change_Password.jsp
     * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
     */
%><%@ page errorPage="Error_Content.jsp"
%><%@ page contentType="text/html; charset=UTF-8"
%><%@ taglib uri="/webUtilTL.tld" prefix="web"
%>
<!-- <web:ifBeanValue property="getName" value="prefChPwd"
    ><web:then
        ><div><web:returnToPath/></div>
    </web:then>
</web:ifBeanValue> -->
<%--
 Display the contents of the "changePassword" bean.
--%>
<web:displayBean bean="changePassword" />
