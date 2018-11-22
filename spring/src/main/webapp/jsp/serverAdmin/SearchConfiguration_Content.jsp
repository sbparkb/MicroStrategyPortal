<%
 /*
  * Search_Content.jsp
  * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
  */
%>

<%@ page errorPage="Error_Content.jsp"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>

<web:ifFeature name="dhtml;quick-search-enabled">
<web:then>
<%--
<web:displayBean bean="sb" styleName="ServerSearchSuggestStyle"/>
 --%>


<web:clientSideDescriptor IDs="1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,3852,3853,3854,3855,3856,3857,3858,3859,3860,3861,3862,3863"/>

<div id="folderSearchResults" scriptclass="mstrFolderSearchImpl"></div>

<!-- wrapper DIV to create bone instance -->
<div id="mstrSearchSuggest" class="mstrSearchSuggestSections" scriptclass="mstrSearch" n="mstrSearchSuggest">

    <jsp:include page='/jsp/SearchSuggest_Content.jsp' flush="true" />

     <script language=javascript>
           var searchProps = <web:displayBean bean="ssb" styleName="ServerSearchSuggestStyle"/>;
          
            if (typeof(microstrategy) != 'undefined') { 
               microstrategy.bonesToRegister.push(
                       {
                           id : "mstrSearchSuggest",  //this should be the id of the wrapper DIV to create bone instance 
                           loadCondition : "true",  //,
                           properties : {
                                  enableSuggestion: false,
                                  showAsPopup: false,
                                  searchPattern: searchProps.searchPattern,
                                  objectType: '8704,8705', //,44',
                                  rootFolderType: 39,
                                  styleName: 'FolderConfigurationQuickSearchListStyle',
                                  searchDomain: 3 //3 - Reporsitory domain; 4 - Configuration domain
                           }
                           //,
                           //properteis: searchProps 
                       },
                       {
                           id : "folderSearchResults", 
                           loadCondition : "true"
                       }
                   );
           }
    </script>

</div>


</web:then>
<web:else>

<TABLE BORDER="0" CELLSPACING="0" CELLPADDING="0" >
    <TR>
        <%-- Render the search page.--%>
        <TD COLSPAN="2">
            <web:ifBeanValue bean="sb" property="isAdvanced">
                <web:then>
                   <web:displayBean bean="sb" styleName="AdvancedConfigurationSearchStyle"/>
                </web:then>
                <web:else>
                   <web:displayBean bean="sb" styleName="QuickConfigurationSearchStyle"/>
                </web:else>
            </web:ifBeanValue>
        </TD>
    </TR>
    <%-- If the results are ready for the current search, display the results. --%>
    <web:ifBeanValue bean="sb" property="showResults">
        <web:then>
            <TR>
                <TD COLSPAN="2">
                    <BR /><HR /><BR />
                    <web:displayBean bean="sb.results" styleName="FolderConfigurationSearchResults" />
                </TD>
            </TR>
        </web:then>
    </web:ifBeanValue>
</TABLE>
</web:else>
</web:ifFeature>