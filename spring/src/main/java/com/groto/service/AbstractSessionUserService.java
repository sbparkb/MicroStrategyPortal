package com.groto.service;

import java.io.Serializable;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.StringUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.session.MSTRSessionUser;
import com.microstrategy.utils.serialization.EnumWebPersistableState;
import com.microstrategy.web.beans.UserBean;
import com.microstrategy.web.beans.UserEntitiesBean;
import com.microstrategy.web.beans.UserEntityBean;
import com.microstrategy.web.beans.UserGroupBean;
import com.microstrategy.web.beans.UserSearchBean;
import com.microstrategy.web.beans.WebBeanException;
import com.microstrategy.web.beans.WebBeanFactory;
import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebObjectsFactory;
import com.microstrategy.web.objects.WebSearch;
import com.microstrategy.web.objects.admin.users.WebStandardLoginInfo;
import com.microstrategy.web.objects.admin.users.WebUser;
import com.microstrategy.web.objects.admin.users.WebUserSearch;
import com.microstrategy.webapi.EnumDSSXMLApplicationType;
import com.microstrategy.webapi.EnumDSSXMLObjectTypes;
import com.mstr.business.model.PromptInfo;

/**
 *  Class Name : AbstractSessionUserService.java 
 * 
 *  Modification Information
 * 
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2012. 6. 18.  jju      Generation
 *
 *  @author jju
 *  @since 2012. 6. 18.
 *  @version 1.0
 */
//@Service
public abstract class AbstractSessionUserService implements BaseSessionService, Serializable {

  private static final long serialVersionUID = 855375638178202020L;

  private static Logger logger = Logger.getLogger(AbstractSessionUserService.class);

  public int createServerSession() throws Exception {

    int returnCode = 0;
    return returnCode;
  }

  public void closeServerSession() {
    try {
      MSTRSessionUser mstrSessionUser = getMstrSessionUser();
      WebIServerSession serverSession = null;
      if (mstrSessionUser != null && StringUtil.isNotEmpty(mstrSessionUser.getMstrSessionState())) {
        serverSession = getServerSession();
        if (serverSession != null) {
          serverSession.closeSession();
        }
      }
      if(mstrSessionUser != null){
        mstrSessionUser.setMstrSessionState(null);
      }
      
      setMstrSessionUser(mstrSessionUser);
    } catch (WebObjectsException e) {
      logger.info("closeServerSession:" + CmmUtil.exMessage(e));
    }
  }

  protected WebIServerSession getServerSession() throws WebObjectsException  {
    MSTRSessionUser localMSTRSessionUser = getMstrSessionUser();
    WebIServerSession localWebIServerSession = null;
    if (localMSTRSessionUser != null) {
      localWebIServerSession = createIServerSession(localMSTRSessionUser);
    }
    return localWebIServerSession;
  }


  // =========================================================================
  // private method
  // =========================================================================

  public WebIServerSession createIServerSession(MSTRSessionUser mstrSessionUser) throws WebObjectsException{

    WebIServerSession serverSession = null;

    try {
      String mstrDefaultServerName = mstrSessionUser.getMstrServerName();
      String mstrDefaultProjectName = mstrSessionUser.getMstrProjectName();
      String mstrDefaultLocale = SystemMessage.getMessage("mstr.config.default.locale");

      // session �젙蹂댁뿉 server, project �젙蹂닿� �뾾�쓣 寃쎌슦 default �젙蹂대줈 �꽕�젙
      if (StringUtil.isEmpty(mstrDefaultServerName) || StringUtil.isEmpty(mstrDefaultProjectName)) {
        mstrDefaultServerName = SystemMessage.getMessage("mstr.config.default.server-name");
        mstrDefaultProjectName = SystemMessage.getMessage("mstr.config.default.project-name");
      }

      String mstrUserID = mstrSessionUser.getMstrUserID();
      String mstrUserPW = mstrSessionUser.getMstrUserPW();
      String sessionState = mstrSessionUser.getMstrSessionState();

      serverSession = WebObjectsFactory.getInstance().getIServerSession();

      if (StringUtil.isEmpty(sessionState)) {
        serverSession.setServerName(mstrDefaultServerName);
        serverSession.setProjectName(mstrDefaultProjectName);
        serverSession.setLocale(StringUtil.parseLocaleString(mstrDefaultLocale));
        serverSession.setServerPort(0);
        serverSession.setLogin(mstrUserID);
        serverSession.setPassword(mstrUserPW);
        serverSession.setApplicationType(com.microstrategy.webapi.EnumDSSXMLApplicationType.DssXmlApplicationCustomApp);
        serverSession.getSessionID();

        mstrSessionUser.setMstrSessionState(serverSession.saveState(EnumWebPersistableState.MAXIMAL_STATE_INFO));
        setMstrSessionUser(mstrSessionUser);

      } else {
        serverSession.restoreState(mstrSessionUser.getMstrSessionState());
    
        if (!serverSession.isAlive()) {
    
          serverSession.reconnect();
          mstrSessionUser.setMstrSessionState(serverSession.saveState(EnumWebPersistableState.MAXIMAL_STATE_INFO));
          setMstrSessionUser(mstrSessionUser);
        }
      }

    } catch (WebObjectsException ex) {
      logger.info("Error create session : " + ex.getErrorCode() + " : " + CmmUtil.exMessage(ex));
      throw ex;
    }

    return serverSession;
  }

  public MSTRSessionUser getMstrSessionUser() {

    HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    MSTRSessionUser mstrSessionUser = null;

    if (request != null) {
      mstrSessionUser = (MSTRSessionUser) request.getSession().getAttribute(MSTRSessionUser.ATTRIBUTE_NAME);
    }

    return mstrSessionUser;
  }

  public void setMstrSessionUser(MSTRSessionUser mstrSessionUser){

    HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    if (request != null) {                  
      request.setAttribute(MSTRSessionUser.ATTRIBUTE_NAME, mstrSessionUser);
    }

  }

  /**
   * Creates a new session with the Intelligence Server.
   * 
   * @param serverName String - Name of the Intelligence Server
   * @param project String - Project Name where the session should be created
   * @param loginNamge String -
   * @param password String
   * @return WebIServerSession
   */
  public static WebIServerSession getServerSession(String serverName, String project, String loginNamge, String password) {
    WebIServerSession sessionInfo = null;
    WebObjectsFactory woFact = WebObjectsFactory.getInstance();
    sessionInfo = woFact.getIServerSession();

    sessionInfo.setServerName(serverName);
    sessionInfo.setProjectName(project);
    sessionInfo.setLogin(loginNamge);
    sessionInfo.setPassword(password);

    sessionInfo.setApplicationType(EnumDSSXMLApplicationType.DssXmlApplicationCustomApp);

    return sessionInfo;
  }

  public UserEntityBean getUser(WebIServerSession sessionInfo, String searchID, String searchName) {
    UserEntityBean ua = null;
    UserEntityBean uaTmp = null;
    try {
      UserSearchBean searchBean = WebBeanFactory.getInstance().newUserSearchBean();
      searchBean.setSessionInfo(sessionInfo);
      WebUserSearch uSearch = searchBean.getSearchObject();

      uSearch.getSearchObject().setAbbreviationPattern(searchID);
      WebSearch search = uSearch.getSearchObject();
      search.types().add(new Integer(EnumDSSXMLObjectTypes.DssXmlTypeUser));
      searchBean.collectData();
      UserEntitiesBean bBean = searchBean.getResult();
      WebUser wu = null;
      
      for (int k = 0; k < bBean.size(); k++) {
        uaTmp = bBean.get(k);
        if (uaTmp != null) {
          wu = (WebUser) uaTmp.getUserEntityObject();
          wu.populate();
          ua = uaTmp;
          break;
        }
      }
    } catch (WebObjectsException e) {
      logger.info("WebObjectsException closeServerSession:" + CmmUtil.exMessage(e));
      loginExceptionHandle(sessionInfo, e);      
      return null;
    } catch (WebBeanException e) {
      logger.info("WebBeanException closeServerSession:" + CmmUtil.exMessage(e));
      loginExceptionHandle(sessionInfo, e);
      return null;
    }
    return ua;
  }
  
  private void loginExceptionHandle(WebIServerSession sessionInfo, Exception e){
    
    String message = "";
    
    if(e.getMessage() != null){
      message = e.getMessage();
    }
    
    if (message.toLowerCase().indexOf("login failure") > 0) {
      sessionInfo.setOrgID("Login failure");
    } else if (message.toLowerCase().indexOf("new password") > 0) {
      sessionInfo.setOrgID("NEWPWD");
    } else if (message.indexOf("留뚮즺") > 0) {
      sessionInfo.setOrgID("NEWPWD");
    } else {
      sessionInfo.setOrgID("Login Error");
    }
  }

  // login -> groups info display 
  public String getUserGroups(WebIServerSession sessionInfo, UserEntityBean user) throws WebBeanException {
       
    StringBuffer strGroups = new StringBuffer();
    UserEntitiesBean bBean = user.getParentGroups();
    if (bBean == null || bBean.size() <= 0) {
      return null;
    }

    for (int i = 0; i < bBean.size(); i++) {
      UserEntityBean ub = bBean.get(i);
      if (ub.getObjectInfo() != null && ub.getObjectInfo().getName() != null) {
        if (strGroups.length() == 0) {
          strGroups.append(ub.getObjectInfo().getName().substring(ub.getObjectInfo().getName().indexOf(".") + 1));
        } else {
          strGroups.append('|').append(ub.getObjectInfo().getName().substring(ub.getObjectInfo().getName().indexOf(".") + 1));
        }

      }
    }
    return strGroups.toString();
  }

  /**
   * Attaches a user to a group
   * 
   * @param group UserGroupBean
   * @param user UserBean
   */
  public void attachUserToGroup(UserGroupBean group, UserEntityBean user) {
    try {
      UserEntitiesBean entities = group.getChildren();
      if (entities != null) {
        entities.add(user);
      }
    } catch (WebBeanException ex) {
      logger.info("closeServerSession:" + CmmUtil.exMessage(ex));
    }
  }

  /**
   * Creates a new MicroStrategy User and sets properties for it.
   * 
   * @param sessionInfo WebIServerSession - A valid MicroStrategy Session
   * @param loginName String - Login name for the user
   * @param password String - Password for the user
   * @param fullName String - Full Name to be displayed for the user
   * @param description String - Description for the user
   * @return UserBean
   */
  public UserBean newUser(WebIServerSession sessionInfo, String loginId, String password, String fullName, String description) {
    UserBean user = null;
    try {
      // Instantiate a new user
      user = WebBeanFactory.getInstance().newUserBean();
      user.setSessionInfo(sessionInfo);
      user.InitAsNew();

      // Fetch properties for the user
      WebUser ua = (WebUser) user.getUserEntityObject();
      WebStandardLoginInfo loginInfo = ua.getStandardLoginInfo();

      // Set basic user information
      ua.setLoginName(loginId);
      ua.setFullName(fullName);
      ua.setDescription(description);
      user.getObjectInfo().setDescription(description);
      loginInfo.setPassword(password);

      // Set other properties
      // loginInfo.setPasswordExpirationDate(new Date(2007, 01, 01)); //Password expires on January
      // 1, 2007
      loginInfo.setPasswordExpirationFrequency(90); // 90 days to expire
      loginInfo.setPasswordExpiresAutomatically(false); // If set to false, password never expires
      loginInfo.setStandardAuthAllowed(true); // The user can log in using standard auth

    } catch (WebBeanException ex) {
      logger.info("closeServerSession:" + CmmUtil.exMessage(ex));
    }
    
    return user;
  }

  /**
   * Update MicroStrategy User and sets properties for it.
   * 
   * @param sessionInfo WebIServerSession - A valid MicroStrategy Session
   * @param loginName String - Login name for the user
   * @param password String - Password for the user
   * @param fullName String - Full Name to be displayed for the user
   * @param description String - Description for the user
   * @return UserBean
   */
  public int updateUser(WebIServerSession sessionInfo, String loginId, String password, String fullName, String description) {
    UserEntityBean user = null;
    int ret = 0;
    try {
      // Instantiate a new user
      user = getUser(sessionInfo, loginId, fullName);


      user.setSessionInfo(sessionInfo);

      // Fetch properties for the user
      WebUser ua = (WebUser) user.getUserEntityObject(); 
      WebStandardLoginInfo loginInfo = ua.getStandardLoginInfo();

      // Set basic user information
      ua.setLoginName(loginId);
      ua.setFullName(fullName);
      user.getObjectInfo().setDescription(description);
      ua.getStandardLoginInfo().setPassword(password);
 
      if(loginInfo.getPasswordExpiresAutomatically()) {  // 留뚮즺�씪�씠 議댁옱�븯硫� 
        
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE,  loginInfo.getPasswordExpirationFrequency());
        java.util.Date today = cal.getTime();
        loginInfo.setPasswordExpirationDate(today);
          
      }

      user.save();

    } catch (WebBeanException ex) {
      logger.info("closeServerSession:" + CmmUtil.exMessage(ex));
      if (ex.getMessage().indexOf("previous passwords") > 0) {
        ret = 2;
      } else {
        ret = 1;
      }
    }
      return ret;
  }

  protected String createFromToTagStart(PromptInfo promptInfo, String mean , String nextMean , String prevmeaning) {

    StringBuffer promptTag = new StringBuffer();
    
    if(mean.toLowerCase().contains("from") ) {
      
      promptTag.append( "<th scope='row' ");
      if (promptInfo.isRequired()) {
        promptTag.append(" style='color:red;' ");
      } 
      promptTag.append( '>')
      .append(promptInfo.getTitle().split("\\(")[0])
      .append("</th>");
      
      if(nextMean.toLowerCase().contains("to") ) {  
        promptTag.append("<td colspan='3'>");
      } else {
        promptTag.append("<td>");
      }
      
    } else if(!(mean.toLowerCase().contains("to") && prevmeaning.toLowerCase().contains("from")) ) {
        promptTag.append("<th scope='row' ");
        if (promptInfo.isRequired()) {
          promptTag.append(" style='color:red;' ");
        } 
        promptTag.append('>')
        .append(promptInfo.getTitle().split("\\(")[0])
        .append("</th><td>");
    }
    
    return promptTag.toString();
    
  }
  
  
  protected String createFromToTagEnd(String mean , String nextMean) {
    StringBuffer promptTag = new StringBuffer();
    
    if(mean.toLowerCase().contains("from") && nextMean.toLowerCase().contains("to")  ) {
      promptTag.append("&nbsp;&nbsp;~&nbsp;&nbsp;");
    } else { 
      promptTag.append("</td>");
    }
    
    return promptTag.toString();
  }

  // 로그인 에러 메세지  
  protected ModelAndView loginErrorMsg(RedirectAttributes ra, ModelAndView mav) {
      Map<String, Object> result  = new HashMap<String, Object>();
      result.put("result", "1");
      result.put("message", "아이디 또는 패스워드가 일치하지 않습니다.");
      ra.addFlashAttribute("params", result);
      mav.setViewName("redirect:/login/login.do");
      return mav;
  }
  
  // 로그인 에러 메세지 
  protected ModelAndView loginErrorMsg(RedirectAttributes ra, ModelAndView mav, String msg) {
      Map<String, Object> result  = new HashMap<String, Object>();
      result.put("result", "1");
      result.put("message", msg);
      ra.addFlashAttribute("params", result);
      mav.setViewName("redirect:/login/login.do");
      return mav;
  }
  
}
