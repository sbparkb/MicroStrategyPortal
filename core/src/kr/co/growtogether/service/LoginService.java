package kr.co.growtogether.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectsFactory;
import com.microstrategy.webapi.*;

public class LoginService {

	public String getServerSession(HttpServletRequest request,
			HttpServletResponse response,
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
	    String usrSmgr = serverSession.saveState();
	    return usrSmgr;
	}
}
