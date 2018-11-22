<%@ page errorPage="JSP_Error.jsp"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web" %>

<script type="text/javascript" >
    var isQuickSearchEnabled = <web:ifFeature name="quick-search-enabled" ><web:then>true</web:then><web:else>false</web:else></web:ifFeature>;

    // Set common config properties for most applications
    mstrConfig = {
        taskURL: '<web:taskProcessorName />',
        thousandsSep: '<web:value type="misc" name="thousandSeparator"/>',
        decimalSep: '<web:value type="misc" name="decimalSeparator"/>',
        listSep: '<web:value type="misc" name="listSeparator"/>',
        onMobileDevice: false,
        webVersion: '<web:value type="misc" name="webVersion"/>',
        <web:ifFeature type="preference" name="enableUsherAuthenticationOption"><web:then>
        isUsherAuthVisible: true, </web:then>
        <web:else>isUsherAuthVisible: false,</web:else></web:ifFeature>
        isEdgeModeEnabled: '<web:value type="systemPreference" name="useIEEdgeMode" encode="true" />' == '1',
        isLinkJSEnabled: '<web:value type="systemPreference" name="allowRSDHyperlinkJavaScript"/>' == '1',
        serverName: '<web:connectionValue property="serverName"/>',
        projectName: '<web:connectionValue property="projectName"/>',
        serverPort: '<web:connectionValue property="serverPort"/>',
        authMode: '<web:connectionValue property="authenticationMode"/>',
        features: {
            <web:value type="features" name="is-two-step-verification-required, create-object"/>
        },
        lastMsgKey: '<web:beanValue property="lastMessageKey"/>',
        isQuickSearchEngineEnabled: isQuickSearchEnabled,
        enableQuickSearchPref: isQuickSearchEnabled && '<web:value type="preference" name="enableQuickSearch" />' == '1',
        enableSearchAutoComplete: '<web:value type="preference" name="enableSearchAutoComplete" />' == '1',
        searchAutoCompleteDelay: '<web:value type="preference" name="searchAutoCompleteDelay" />' || 200,
        addTimeStampToPreventCaching: '<web:value type="systemPreference" name="addTimeStampToPreventCaching"/>' == '1',
        <web:ifFeature type="preference" name="showPreviews"><web:then>
			showPreviews: '<web:value type="preference" name="showPreviews" />' == '1',
		</web:then><web:else>
			showPreviews: false,
		</web:else></web:ifFeature>
    };

    <web:ifConnectionValue>
        <web:then>
        <%--//Search related settings:--%>
            mstrConfig.searchProps = {
                rootFolderType: 39, <%-- Default: Project root --%>
                isMiniSearchBox: false,
                showAsPopup: false,
                maxSearchResults: <web:value type="preference" name="maxSearchResults"/> || 50,
                allowedObjectTypesData: [].concat(<web:value type="misc" name="searchObjectTypes" />)
            };

        </web:then>
    </web:ifConnectionValue>
</script>