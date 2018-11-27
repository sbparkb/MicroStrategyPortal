<%
  /*
   * About_Content.jsp
   * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
   */
%>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
<BR /><div class="cntnr"></div><BR />
<SPAN class="mstrVersionInfo">
	<web:ifFeature type="systemPreference" name="showAboutPageInfo"><web:then>
	    <SPAN><p>JSP version:</P></SPAN>&nbsp;<div style="display:inline"  id="jspversion"><mstrversion>10.4.0026.0049</mstrversion></div><BR /><BR />
	    <SPAN><p><web:descriptor key="mstrWeb.792" desc="XML API version:" /></P></SPAN>&nbsp;<div style="display:inline"  id="xmlversion"><web:connectionValue property="xmlAPIVersion"/></div><BR /><BR />
	    <SPAN><p>Java Virtual Machine:</P></SPAN>&nbsp;<div style="display:inline"   id="jvmversion">(<web:connectionValue property="JVMVendor"/>&nbsp;<web:connectionValue property="JVMVersion"/>)</div><BR /><BR />
	<%--
	 If there is a session and the server versio can be accessed,
	 display the Intelligent Server version number.
	--%>
	    <web:ifConnectionValue property="serverVersion">
	        <web:then>
	            <SPAN><p><web:descriptor key="mstrWeb.795" desc="Server version:" /></P></SPAN>&nbsp;<div style="display:inline"   id="serverversion"><web:connectionValue property="serverVersion"/></div><BR /><BR />
	        </web:then>
	    </web:ifConnectionValue>
    </web:then></web:ifFeature>
    <SPAN><p><web:descriptor key="mstrWeb.793" desc="Browser version:" /></P></SPAN>&nbsp;<div style="display:inline"   id="browserversion"><web:value type="misc" name="userAgent"/></div> <BR /><BR />
</SPAN>
<!-- Locales
<web:descriptor key="mstrWeb.1341" desc="Language:"/><web:connectionValue property="displayLocale"/>
<web:descriptor key="mstrWeb.2444" desc="Number and Date Format:"/><web:connectionValue property="serverLocale"/>
<web:descriptor key="mstrWeb.5154" desc="Metadata"/>:<web:connectionValue property="metadataLocale"/>
<web:descriptor key="mstrWeb.1765" desc="Data Warehouse:"/><web:connectionValue property="warehouseLocale"/>
<web:descriptor key="mstrWeb.874" desc="Messages"/>:<web:connectionValue property="messagesLocale"/>
-->
<%--
 This tag displays all the cookies currently defined on the
 client's browser by the application.
--%>
<web:displayCookies/>

<web:resource type="style" name="mstr/team.css"/>
<web:resource type="javascript" name="team.js" />
