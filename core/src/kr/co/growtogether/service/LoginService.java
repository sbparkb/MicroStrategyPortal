package kr.co.growtogether.service;

import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectsFactory;
import com.microstrategy.webapi.EnumDSSXMLApplicationType;
import com.microstrategy.webapi.EnumDSSXMLAuthModes;

public class LoginService {

	public WebIServerSession getServerSession(
			String serverName, 
			String projectName, 
			String userId,
			String userPw
			) {
	    WebObjectsFactory factory = WebObjectsFactory.getInstance();
	    WebIServerSession serverSession = factory.getIServerSession();	    
	    serverSession.setServerName(serverName);
	    serverSession.setServerPort(0);
	    serverSession.setProjectName(projectName);
	    serverSession.setLogin(userId);
	    serverSession.setPassword(userPw);
	    serverSession.setApplicationType(EnumDSSXMLApplicationType.DssXmlApplicationCustomApp);
	    serverSession.setAuthMode(EnumDSSXMLAuthModes.DssXmlAuthStandard);
	    	    
	    return serverSession;
	}
}
