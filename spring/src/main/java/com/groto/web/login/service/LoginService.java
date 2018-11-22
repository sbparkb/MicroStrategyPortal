package com.groto.web.login.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.service.AbstractSessionUserService;
import com.groto.session.MSTRSessionUserImpl;
import com.microstrategy.web.beans.UserEntityBean;
import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebObjectsFactory;
import com.microstrategy.webapi.EnumDSSXMLAuthModes;

/**
 *  Class Name  :  LoginService
 *  Description :  로그인 서비스 
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 11. 9.  lastpice Generation
 *
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 11. 9. 오후 3:00:28
 * @version : 
 */ 

@Service
public class LoginService extends AbstractSessionUserService{
	
	/**
   * 
   */
  private static final long serialVersionUID = -5164954128413428542L;
  static Logger logger = Logger.getLogger(LoginService.class);

	/**
	 * <pre>
	 * 로그인 사용자 유효한지 확인 정상 사용자로서 session이 생성되고, 아이디가 조회가 가능하면 로그인 완료 처리
	 * </pre>
	 *
	 * @param request
	 * @param response
	 * @param user
	 * @return
	 *
	 */
	public int isValidUser(
			HttpServletRequest request
			, HttpServletResponse response
			, MSTRSessionUserImpl user
			){
	  
		String serverName = SystemMessage.getMessage("mstr.config.default.server-name");
		String projectName = SystemMessage.getMessage("mstr.config.default.project-name");
		WebIServerSession sessionInfo = getServerSession(serverName, projectName, user.getMstrUserID(), user.getMstrUserPW());

		// 사용자에 해당하는 SESSION 정보 조회
			if(sessionInfo == null){				
				return 1;
			}
			
			// 사용자 아이디 조회
			UserEntityBean mstrUser = getUser(sessionInfo, user.getMstrUserID(), "");
			if(mstrUser == null){
				if(sessionInfo.getOrgID().equals("NEWPWD")){
					return 2;
				} else if ( "Login Error".equals(sessionInfo.getOrgID()) ) {
					return 3;
				} else{
					return 1;
				}
			}
			
		return 0;
	}
	/**
	 * <pre>
	 * 로그인 사용자 유효한지 확인 정상 사용자로서 session이 생성되고, 아이디가 조회가 가능하면 로그인 완료 처리
	 * </pre>
	 *
	 * @param request
	 * @param response
	 * @param user
	 * @return
	 *
	 */
  public boolean isValidUserState(HttpServletRequest request, HttpServletResponse response, MSTRSessionUserImpl user) {

    String serverName = SystemMessage.getMessage("mstr.config.default.server-name");
    String projectName = SystemMessage.getMessage("mstr.config.default.project-name");
    WebIServerSession sessionInfo = null;
    
    // 사용자에 해당하는 SESSION 정보 조회
    sessionInfo = getServerSession(serverName, projectName, user.getMstrUserID(), user.getMstrUserPW());
    if (sessionInfo == null) {
      return false;
    }

    // 사용자 아이디 조회
    UserEntityBean mstrUser = getUser(sessionInfo, user.getMstrUserID(), "");
    if (mstrUser == null) {
      try {
        sessionInfo.closeSession();
      } catch (WebObjectsException e) {
        logger.error(CmmUtil.exMessage(e));
      }
      return false;
    }

    return true;
  }
	/**
	 * <pre>
	 * 사용자에 해당하는 MSTR I SERVER SESSION 객체를 리턴한다.
	 * </pre>
	 *
	 * @param request
	 * @param response
	 * @param user
	 * @return
	 *
	 */
  public WebIServerSession getIServerSession(HttpServletRequest request, HttpServletResponse response, MSTRSessionUserImpl user) {
    
    WebObjectsFactory factory = WebObjectsFactory.getInstance();
    WebIServerSession serverSession = factory.getIServerSession();
    String sessionId = (String) request.getSession().getAttribute("usrSmgr1");
    serverSession.setServerName(SystemMessage.getMessage("mstr.config.default.server-name"));
    serverSession.setServerPort(0);
    serverSession.setProjectName(SystemMessage.getMessage("mstr.config.default.project-name"));
    serverSession.setLogin(user.getMstrUserID());
    serverSession.setPassword(user.getMstrUserPW());
    serverSession.setApplicationType(com.microstrategy.webapi.EnumDSSXMLApplicationType.DssXmlApplicationCustomApp);
    serverSession.setAuthMode(EnumDSSXMLAuthModes.DssXmlAuthStandard);
    serverSession.restoreState(sessionId);
    
    try {
      serverSession.closeSession();
    } catch (WebObjectsException e1) {
      logger.error(e1.getMessage().replaceAll("[\r\n]", ""));
    }

    return serverSession;
  }
	
	/**
	 * <pre>
	 * 사용자 세션의 IServer Session 값을 가지고 서버 세션을 Restore 시킨 IServer 객체를 리턴한다.
	 * </pre>
	 *
	 * @param request
	 * @param response
	 * @param user
	 * @param usrSmgr
	 * @return
	 *
	 */
	public WebIServerSession getRestoreIServerSession(
	    HttpServletRequest request
	    , HttpServletResponse response
	    , MSTRSessionUserImpl user
	    , String usrSmgr1
	    ){

	  WebObjectsFactory factory = null;
	  WebIServerSession serverSession = null;

	  factory = WebObjectsFactory.getInstance();
	  serverSession = factory.getIServerSession();
	  serverSession.setServerName(SystemMessage.getMessage("mstr.config.default.server-name"));
	  serverSession.setServerPort(0);
	  serverSession.setProjectName(SystemMessage.getMessage("mstr.config.default.project-name"));
	  serverSession.setLogin(user.getMstrUserID());
	  serverSession.setPassword(user.getMstrUserPW());
	  serverSession.setApplicationType(com.microstrategy.webapi.EnumDSSXMLApplicationType.DssXmlApplicationCustomApp);
	  serverSession.setAuthMode(1);
	  serverSession.restoreState(usrSmgr1);
	  return serverSession;
	}
	
}//end of class