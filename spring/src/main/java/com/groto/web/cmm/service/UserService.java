package com.groto.web.cmm.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.service.AbstractSessionUserService;
import com.groto.session.MSTRSessionUserImpl;
import com.groto.web.login.service.LoginService;
import com.microstrategy.utils.serialization.EnumWebPersistableState;
import com.microstrategy.web.beans.BeanFactory;
import com.microstrategy.web.beans.UserBean;
import com.microstrategy.web.beans.UserEntityBean;
import com.microstrategy.web.beans.UserGroupBean;
import com.microstrategy.web.beans.WebBeanException;
import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectsException;

/**
 * Class Name : UserService Description : 사용자 패스워드 관리 서비스
 * 
 * Modification Information
 * 
 * Mod Date Modifier Description ----------- -------- --------------------------- 2015. 12. 14.
 * lastpice Generation
 * 
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 12. 14. 오후 2:35:26
 * @version :
 */

@Service
public class UserService extends AbstractSessionUserService {
  /**
   * 
   */
  private static final long serialVersionUID = -2894043583638327534L;
  private transient final Logger logger = LoggerFactory.getLogger(getClass());

  @Autowired
  private LoginService loginService;

  /**
   * <pre>
   * 사용자 패스워드 체크
   * </pre>
   * 
   * @param request
   * @param response
   * @param params
   * @return
   * 
   */
  public Map<String, Object> userPassCheck(HttpServletRequest request, HttpServletResponse response, String nowPass) {

    Map<String, Object> result = new HashMap<String, Object>();
    MSTRSessionUserImpl user =(MSTRSessionUserImpl) ((HttpServletRequest) request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
    
    String envPass = System.getenv("ENV_PASS");    
    String adminId = CmmUtil.decEncData(envPass, SystemMessage.getMessage("mstr.admin.id"));
    String adminPw = CmmUtil.decEncData(envPass, SystemMessage.getMessage("mstr.admin.pw")); 
    String serverName = SystemMessage.getMessage("mstr.config.default.server-name");
    String project = SystemMessage.getMessage("mstr.config.default.project-name");
    WebIServerSession serverInfo = getServerSession(serverName, project, adminId, adminPw);
    MSTRSessionUserImpl isValid = new MSTRSessionUserImpl();
    isValid.setMstrUserID(user.getMstrUserID());
    isValid.setMstrUserPW(nowPass);
    int loginstat = 1;

    loginstat = loginService.isValidUser(request, response, isValid);
    if (loginstat == 1) {
      result.put("result", "fail");
      result.put("message", "현재 비밀번호를 확인해 주세요.");
      return result;
    }

    try {
      serverInfo.closeSession();
    } catch (WebObjectsException e1) {
      logger.error(e1.getMessage().replaceAll("[\r\n]", ""));
    }

    result.put("result", "success");

    return result;
  }

  /**
   * <pre>
   * 사용자 패스워드 변경 처리
   * </pre>
   * 
   * @param request
   * @param response
   * @param nowPass
   * @return
   * @throws WebBeanException
   * 
   */
  public Map<String, Object> userPassUpdate(HttpServletRequest request, HttpServletResponse response, String newPass) {
    
    Map<String, Object> result = new HashMap<String, Object>();
    MSTRSessionUserImpl userA =
        (MSTRSessionUserImpl) ((HttpServletRequest) request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
    String envPass = System.getenv("ENV_PASS");    
    String adminId = CmmUtil.decEncData(envPass, SystemMessage.getMessage("mstr.admin.id"));
    String adminPw = CmmUtil.decEncData(envPass, SystemMessage.getMessage("mstr.admin.pw"));
    String serverName = SystemMessage.getMessage("mstr.config.default.server-name");
    String project = SystemMessage.getMessage("mstr.config.default.project-name");
    int rst = 0;

    WebIServerSession serverInfo = getServerSession(serverName, project, adminId, adminPw);

    String userID = "";
    if (userA == null) {
      userID = (String) request.getAttribute("mstrUserID");
    } else {
      userID = userA.getMstrUserID();
    }

    UserEntityBean userB = (UserEntityBean) getUser(serverInfo, userID, userID);

    try {
      rst = updateUser(serverInfo, userB.getUserEntityObject().getAbbreviation(), newPass, userB.getDisplayName(), null);

      if (rst == 1) {
        result.put("result", "fail");
        result.put("message", "비밀번호 변경에 실패 하였습니다.");
        return result;
      } else if (rst == 2) {
        result.put("result", "fail");
        result.put("message", "이전 2회 이내에 사용된 비밀번호 입니다. 다른 비밀번호를 입력하세요.");
        return result;
      }
    } catch (WebBeanException e) {
      logger.error(CmmUtil.exMessage(e));
      try {
        serverInfo.closeSession();
      } catch (WebObjectsException e1) {
        logger.error(CmmUtil.exMessage(e));
      }
    }

    try {
      if (userA != null) {
        userA.setMstrUserPW(newPass);
        String usgSmgr = serverInfo.saveState(EnumWebPersistableState.MAXIMAL_STATE_INFO);
        userA.setMstrSessionState(usgSmgr);        
        request.setAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME, userA);
      }
      serverInfo.closeSession();
    } catch (WebObjectsException e1) {
      result.put("result", "fail");
      result.put("message", e1.getMessage());
      logger.error(e1.getMessage().replaceAll("[\r\n]", ""));
    }

    result.put("result", "success");

    return result;
  }

  // OTP 이후 처리
  public Map<String, Object> userPassUpdate(HttpServletRequest request, HttpServletResponse response, String newPass, String userID) {
    Map<String, Object> result = new HashMap<String, Object>();

    String envPass = System.getenv("ENV_PASS");    
    String adminId = CmmUtil.decEncData(envPass, SystemMessage.getMessage("mstr.admin.id"));
    String adminPw = CmmUtil.decEncData(envPass, SystemMessage.getMessage("mstr.admin.pw"));
    String serverName = SystemMessage.getMessage("mstr.config.default.server-name");
    String project = SystemMessage.getMessage("mstr.config.default.project-name");
    int rst = 0;

    WebIServerSession serverInfo = getServerSession(serverName, project, adminId, adminPw);
    UserEntityBean userB = (UserEntityBean) getUser(serverInfo, userID, userID);

    try {
      rst = updateUser(serverInfo, userB.getUserEntityObject().getAbbreviation(), newPass, userB.getDisplayName(), null);

      if (rst == 1) {
        result.put("result", "fail");
        result.put("message", "비밀번호 변경에 실패 하였습니다.");
        return result;
      } else if (rst == 2) {
        result.put("result", "fail");
        result.put("message", "이전 2회 이내에 사용된 비밀번호 입니다. 다른 비밀번호를 입력하세요.");
        return result;
      }
    } catch (WebBeanException e) {
      try {
        serverInfo.closeSession();
      } catch (WebObjectsException e1) {
        logger.error(CmmUtil.exMessage(e));
      }
      result.put("result", "fail");
      result.put("message", "비밀번호 변경에 실패 하였습니다.");
    }

    result.put("result", "success");

    return result;
  }

  /**
   * <pre>
   * ERP USER 추가/수정 처리
   * </pre>
   * 
   * @param request
   * @param response
   * @param nowPass
   * @return
   * @throws WebBeanException
   * 
   */
  public Map<String, Object> erpUserToMstrUpdate(HttpServletRequest request, HttpServletResponse response, Map loginErpUserInfo) {
    
	Map<String, Object> result = new HashMap<String, Object>();
    String envPass = System.getenv("ENV_PASS");    
    String adminId = CmmUtil.decEncData(envPass, SystemMessage.getMessage("mstr.admin.id"));
    String adminPw = CmmUtil.decEncData(envPass, SystemMessage.getMessage("mstr.admin.pw"));
    
    String serverName = SystemMessage.getMessage("mstr.config.default.server-name");
    String project = SystemMessage.getMessage("mstr.config.default.project-name");
    int rst = 0;

    WebIServerSession serverInfo = getServerSession(serverName, project, adminId, adminPw);

    try {
      String erpUserId = (String) loginErpUserInfo.get("USR_ID");
      String erpUserPwd = (String) loginErpUserInfo.get("PWD");
      String erpUserName = (String) loginErpUserInfo.get("USR_NM");
      UserEntityBean userB = (UserEntityBean) getUser(serverInfo, erpUserId, erpUserId);

      if (userB == null) { // 신규 사용자
        UserBean addUser = newUser(serverInfo, erpUserId, erpUserPwd, erpUserName, "ERP 연계 계정");

        addUser.save();

        UserGroupBean group = (UserGroupBean) BeanFactory.getInstance().newBean("UserGroupBean");
        group.setObjectID("86F32BA548DD436D540694AEBD0D317F"); // SSGDF WEB(01) 그룹
        group.setSessionInfo(serverInfo);

        attachUserToGroup(group, addUser);
        group.save();
      } else {
        rst = updateUser(serverInfo, erpUserId, erpUserPwd, erpUserName, "ERP 연계 계정");
      }

      if (rst == 1) {
        result.put("result", "fail");
        result.put("message", "비밀번호 변경에 실패 하였습니다.");
        return result;
      } else if (rst == 2) {
        result.put("result", "fail");
        result.put("message", "이전 2회 이내에 사용된 비밀번호 입니다. 다른 비밀번호를 입력하세요.");
        return result;
      }

    } catch (WebBeanException e) {
      logger.error(CmmUtil.exMessage(e));
      try {
        serverInfo.closeSession();
      } catch (WebObjectsException e1) {
        logger.error(CmmUtil.exMessage(e));
      }
      result.put("result", "fail");
      result.put("message", "비밀번호 변경에 실패 하였습니다.");

      return result;
    }finally{
      try {
        serverInfo.closeSession();
      } catch (WebObjectsException e1) {
        result.put("result", "fail");
        result.put("message", e1.getMessage());
      }
    }

    result.put("result", "success");

    return result;
  }
}
