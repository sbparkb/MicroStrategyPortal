<%
    /*
     * Admin_Help_Section.jsp
     * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
     */
%>
<%--
 Display the Help secion in a panel. The panel will allow us to show and
 hide the links to the Online Help.
--%>
<a <web:value type="helpAdmin" attribute="href" name="Manage_system_from_Web.htm"/> target="_new">
  <web:descriptor key="mstrWeb.555" desc="NEED HELP?"/>
</a>
