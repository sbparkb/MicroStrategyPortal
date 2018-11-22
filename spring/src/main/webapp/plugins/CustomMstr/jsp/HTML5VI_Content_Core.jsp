<%@include file="/jsp/HTML5VI_Content_Core.jsp"%>

<!--  2017-08-02 custom bae vi menu bar hide -->
<style>
.none {	display: none!important;  }
</style>

<script>
var BROWSER_TITLE			= "<%=com.groto.cmm.util.SystemMessage.getMessage("BROWSER.TITLE")%>";
var txt = top.document.title;
//alert("1" + txt);

if( opener == null && txt == BROWSER_TITLE) {  // popup open null
    //if(txt == BROWSER_TITLE) {   // css setting..
    //alert("1" + txt);
		$(".mstrmojo-RootView-menutoolbar").addClass("none");
    //}
}  
</script>
