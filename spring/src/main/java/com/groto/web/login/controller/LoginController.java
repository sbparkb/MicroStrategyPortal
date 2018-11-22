package com.groto.web.login.controller;

import java.sql.SQLException;
import java.sql.SQLTimeoutException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.StringUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.service.AbstractSessionUserService;
import com.groto.session.MSTRSessionUser;
import com.groto.session.MSTRSessionUserImpl;
import com.groto.web.cmm.service.MenuService;
import com.groto.web.cmm.service.UserService;
import com.groto.web.login.service.LoginCheckService;
import com.groto.web.login.service.LoginService;
import com.microstrategy.web.beans.UserEntityBean;
import com.microstrategy.web.beans.WebBeanException;
import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectsException;
import com.shinsegae_inc.ssgdf.http.HttpSessionUtils;

/**
 *  Class Name  :  LoginController
 *  Description :  사용자 로그인 관리 컨트롤러
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 11. 10. lastpice Generation
 *
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 11. 10. 오후 3:25:36
 * @version : 
 */ 
 
 
@Controller
@RequestMapping(value="/login")
public class LoginController extends AbstractSessionUserService{
  
  /**
   * 
   */
  private static final long serialVersionUID = 1L;

  @Autowired
  private MenuService menuService;
  
  @Autowired
  private LoginService loginService;
  
  @Autowired
  private UserService userService;
  
  @Autowired
  private LoginCheckService loginCheckService;   // login 관련 
  
  private static Logger logger = LoggerFactory.getLogger("LoginController");
  
  /**
   * <pre>
   * 로그인 페이지 이동
   * </pre>
   *
   * @param request
   * @param response
   * @param model
   * @return
   *
   */
  @RequestMapping(value="/login", method = RequestMethod.GET)
  public ModelAndView moveLoginPage(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      , @RequestParam(value="portalid", required=false) String portalId
      , @RequestParam(value="pw", required=false) String pw
      ){
    ModelAndView mav        = new ModelAndView();
    
    if(pw != null && !"".equals(pw)){
      mav.setViewName("/mstr/loginPrc");
    }else{
      mav.setViewName("/mstr/login");
    }
        
    model.addAttribute("portalId", portalId);
    model.addAttribute("pw", pw);
    return mav;
    
  }
  
  @RequestMapping(value="/loginEm", method = RequestMethod.GET)
  public ModelAndView em(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      ){
    ModelAndView mav        = new ModelAndView();
    mav.setViewName("redirect:/servlet/mstrWeb?em=Y");
    return mav;
  }
  
  
  /**
   * <pre>
   * 사용자 로그인 처리 
   * loginUser URL 로직이 제대로 되지 않음 - 새로운 URL 추가하여 로직 변경
   * </pre>
   *
   * @param request
   * @param response
   * @param model
   * @param userInfo
   * @param ra
   * @return
   *
   */
  @RequestMapping(value="loginPrc", method = {RequestMethod.GET})
  public ModelAndView loginPrcGet(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      , MSTRSessionUserImpl userInfo
      , RedirectAttributes ra
      ){
    return loginPrcPost(request, response, model, userInfo, ra);
  }
    
  @RequestMapping(value="loginPrc", method = {RequestMethod.POST})
  public ModelAndView loginPrcPost(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      , MSTRSessionUserImpl userInfo
      , RedirectAttributes ra
      ){
    
    ModelAndView mav      = new ModelAndView();
 
    try{
      String loginType = System.getProperty("login");
      
      String envPass = System.getenv("ENV_PASS"); 
      String adminId = CmmUtil.decEncData(envPass, SystemMessage.getMessage("mstr.admin.id"));
      
      if(userInfo != null && adminId.equals(userInfo.getMstrUserID())) {   // 예외 어드민 접속 
        mav.setViewName("forward:/login/loginPrcBi.do");   // 순수 로그인 처리 
        return mav;
      }  

      if("erp".equals(loginType)) {   // erp 연동일경우 
        
        boolean isErpTrou =  loginCheckService.isErpTrou();
        boolean isErpUsable = erpConnCheck(); //erp db의 타임아웃이나 접속불가 상태를 파악 false 이면 사용불가 상태임 
        
        logger.info("loginType:" + loginType);
        logger.info("ERP장애여부 설정값:" + isErpTrou);
        logger.info("ERP정상작동 상태값:" + isErpUsable);
        
        /**  
         * erp 장애여부를 Y로 세팅했거나, erp db의 상태가 사용불가인 경우
         */
        if(isErpTrou || !isErpUsable) {  
          // 1. bi 사용자 추가(수정)        
          mav.setViewName("forward:/login/loginPrcDw.do");
        } else {
          // 1. erp 정보 확인
          // 2. dw 사용자 추가 
          // 3. bi 사용자 추가(수정)
          mav.setViewName("forward:/login/loginPrcErp.do");
        }
         
      } else {
          mav.setViewName("forward:/login/loginPrcBi.do"); //erp와 관계 없이 mstr 메타로만 로그인을 처리하는 경우
      }
 
    }catch(SQLException e){ 
      logger.error(CmmUtil.exMessage(e));
      mav = loginErrorMsg(ra, mav); 
    }
 
    return mav;
  }
  
  // erp 로그인 처리
   @RequestMapping(value="loginPrcErp", method = {RequestMethod.GET})
    public ModelAndView loginPrcErpGet(
        HttpServletRequest request
        , HttpServletResponse response
        , Model model
        , MSTRSessionUserImpl userInfo
        , RedirectAttributes ra
        ){
     return loginPrcErpPost(request, response, model, userInfo, ra);
   }
   
  @RequestMapping(value="loginPrcErp", method = {RequestMethod.POST})
  public ModelAndView loginPrcErpPost(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      , MSTRSessionUserImpl userInfo
      , RedirectAttributes ra
      ){
    ModelAndView mav      = new ModelAndView();
 
    StringBuffer redirectName = new StringBuffer("redirect:/login/login.do");
    
    if(userInfo == null) return loginErrorMsg(ra, mav);
    
    if(userInfo.getPortalId() != null && !"".equals(userInfo.getPortalId())){
      redirectName.append("?portalId=").append(userInfo.getPortalId());
    }

    try{
      Map<String, Object> loginErpUserInfo = loginCheckService.selectErpUser(userInfo);   // 사용자 존재 체크 
      if(loginErpUserInfo == null ) {
    	  logger.error("No user Info.");
        return loginErrorMsg(ra, mav);
      }
      
      Map<String, Object> loginCheck = loginCheckService.selectIdDwCheck(userInfo.getMstrUserID());
      
      if(loginCheck == null  ) {   // DW login 정보가 없으면 
        // DW 사용자 테이블에 ERP 정보 추가 
        int ret = loginCheckService.insertErpToDwUser(loginErpUserInfo);
        logger.debug(String.valueOf(ret));
      } else {
        // DW 사용자 테이블에 있는 ERP 사용자 정보 수정
        int ret = loginCheckService.updateErpToDwUser(loginErpUserInfo);
        logger.debug(String.valueOf(ret));
      }

      mav.setViewName("forward:/login/loginPrcDw.do");
    }catch(SQLException e){ 
        logger.error(CmmUtil.exMessage(e));
        mav = loginErrorMsg(ra, mav);
    }
 
    return mav;
  }
  
//erp 로그인 처리
   @RequestMapping(value="loginPrcDw", method = {RequestMethod.GET})
   public ModelAndView loginPrcDwGet(
       HttpServletRequest request
       , HttpServletResponse response
       , Model model
       , MSTRSessionUserImpl userInfo
       , RedirectAttributes ra
       ){
     return loginPrcDwPost(request, response, model, userInfo, ra);
   }
   
 @RequestMapping(value="loginPrcDw", method = {RequestMethod.POST})
 public ModelAndView loginPrcDwPost(
     HttpServletRequest request
     , HttpServletResponse response
     , Model model
     , MSTRSessionUserImpl userInfo
     , RedirectAttributes ra
     ){
   ModelAndView mav      = new ModelAndView();

   String encPasswd = "";
   StringBuffer redirectName = new StringBuffer("redirect:/login/login.do");
   
   if(userInfo != null && userInfo.getPortalId() != null && !"".equals(userInfo.getPortalId())){
     redirectName.append("?portalId=").append(userInfo.getPortalId());
   }

   try{
 
     Map loginDwUserInfo = null;
     if(userInfo != null){
       loginDwUserInfo = loginCheckService.selectDwUser(userInfo.getMstrUserID());   // DW 사용자 존재 체크
       if(loginDwUserInfo == null ) {
    	 logger.error("loginPrcDw");
         return loginErrorMsg(ra, mav);
       }
    
       Map loginCheck = loginCheckService.selectIdCheck(userInfo.getMstrUserID());   // DW(SYS_USER - US_BI계정) 사용자 존재 체크 
       
       if(loginCheck == null  ) { 
         // DW(SYS_USER - US_BI계정) 사용자 테이블에 ERP 사용자 정보 추가 - DW사용자 정보가 존재하는 경우에만 이 블럭으로 넘어오므로 여기에서 DW사용자 정보를 추가할 필요는 없음.
         int ret = loginCheckService.insertErpUser(loginDwUserInfo);
         logger.debug(String.valueOf(ret));
       } else {
         // DW(SYS_USER - US_BI계정) 사용자 테이블에 있는 ERP 사용자 정보 수정 - DW사용자 정보가 기준의 로그인이므로 DW사용자 정보를 수정할 필요도 없음.
         int ret = loginCheckService.updateErpUser(loginDwUserInfo);
         logger.debug(String.valueOf(ret));
       }    
       
       //MSTR 계정 추가/수정 
       userService.erpUserToMstrUpdate(request, response, loginDwUserInfo);
       encPasswd = loginCheckService.selectEncPasswd(userInfo.getMstrUserPW());
       
       if(!encPasswd.equals(loginDwUserInfo.get("PWD"))) {
         int ret = loginCheckService.updateLoginErrorCnt(userInfo.getMstrUserID());
         logger.debug(String.valueOf(ret));
         return loginErrorMsg(ra, mav);
       }  
       mav.setViewName("forward:/login/loginPrcBi.do");
     }
 
   }catch(SQLException e){ 
       logger.error(CmmUtil.exMessage(e));
       mav = loginErrorMsg(ra, mav);
   }

   return mav;
 }
 
 @RequestMapping(value="loginPrcBi", method = {RequestMethod.GET})
 public ModelAndView loginPrcBiGet(HttpServletRequest request, HttpServletResponse response, Model model, MSTRSessionUserImpl userInfo, RedirectAttributes ra){
   return loginPrcBiPost(request, response, model, userInfo, ra);
 }
  
  @RequestMapping(value="loginPrcBi", method = {RequestMethod.POST})
  public ModelAndView loginPrcBiPost(HttpServletRequest request, HttpServletResponse response, Model model, MSTRSessionUserImpl userInfo, RedirectAttributes ra){
    
    ModelAndView mav      = new ModelAndView();
    Map<String, Object> result  = new HashMap<String, Object>();
    String encPasswd = "";
    
    if(userInfo == null) return loginErrorMsg(ra, mav);    
    
    /**
     * MSTR 웹세션이 끊어져서 포털 세션이 끊어진 경우 브라우저를 종료하지 않고,다시 로그인하면 포탈 세션은 아직 완전히 클리어되지 않았기 때문에, 
     * MSTR세션이 존재하는 것으로 판단해서 MSTR세션을 새로 생성하지 않는 문제가 발생하므로 로그인 할 때 마다 포탈 세션을 완전히 끊어주는 작업을 해야 포탈과 MSTR세션의 싱크가 맞는다. 
     * 2018.10.18 박성범   
     */
    request.getSession().invalidate();

    int loginstat = 1;
    try{
       
      String loginType = System.getProperty("login");
      String envPass = System.getenv("ENV_PASS"); 
      String adminId = CmmUtil.decEncData(envPass, SystemMessage.getMessage("mstr.admin.id"));
      if(!adminId.equals(userInfo.getMstrUserID()) && "erp".equals(loginType)) {   // admin아니고 erp 연동일경우 
        
        encPasswd = loginCheckService.selectEncPasswd(userInfo.getMstrUserPW());
        userInfo.setMstrUserPW(encPasswd);
        
        if(loginErrCnt(mav, ra, userInfo) != null){
           return mav;
        }
      }  
      
      loginstat = loginService.isValidUser(request, response, userInfo);  // mstr 사용자 존재여부

      if(loginstat == 0){
            mav = loginSuccess(request, response, mav, userInfo, adminId, loginType, ra);
        }else{
          result.put("message", "아이디 또는 패스워드가 일치하지 않습니다.");
          result.put("result", "1");
 
          result.put("portalId", userInfo.getMstrUserID());
          ra.addFlashAttribute("params", result);
          mav.setViewName("redirect:/login/login.do");
        }
    }catch(SQLException e){
      logger.error(CmmUtil.exMessage(e));
      mav = loginErrorMsg(ra, mav);
    }
 
    return mav;
  }
  
  private ModelAndView loginSuccess(HttpServletRequest request, HttpServletResponse response, ModelAndView pMav, MSTRSessionUserImpl userInfo, String adminId, String loginType, RedirectAttributes ra){
    
    ModelAndView mav = pMav;
    
    MSTRSessionUserImpl user = new MSTRSessionUserImpl();
    user.setMstrUserID(userInfo.getMstrUserID());
    user.setMstrUserPW(userInfo.getMstrUserPW());
    user.setPortalId(userInfo.getPortalId());
    
    WebIServerSession server  = loginService.getIServerSession(request, response, user);
    UserEntityBean userBean   = loginService.getUser(server, user.getMstrUserID(), user.getMstrUserPW());
    String ub= "";
    
    try {
      ub = loginService.getUserGroups(server, userBean);
      user.setMstrGroupId(ub);
 
      if(ub.contains(SystemMessage.getMessage("mstr.admin.group"))){
        user.setWebAdminGrp(SystemMessage.getMessage("mstr.admin.group"));
      }else{
        user.setWebAdminGrp("NOMAL");
      }

      user.setUserName(userBean.getDisplayName());  //user name bae 2017-08-28
      user.setExcelAuth(loginCheckService.isExcelAuth(user.getMstrGroupId())); 

      if(!adminId.equals(userInfo.getMstrUserID()) && "erp".equals(loginType)) {   // admin아니고 erp 연동일경우 
        // : 로그인시간 저장
        int ret = loginCheckService.updateLastLoginDate(userInfo.getMstrUserID());
        logger.debug(String.valueOf(ret));
      }

      HttpSessionUtils.setAttribute(request.getSession(), MSTRSessionUserImpl.ATTRIBUTE_NAME, user);

      server.closeSession();
      mav.setViewName("redirect:/login/main.do");
    } catch (WebBeanException e) {
      mav = loginErrorMsg(ra, mav);
      return mav;
    } catch (WebObjectsException e) {
      mav = loginErrorMsg(ra, mav);
      return mav;
    } catch (SQLException e) {
      mav = loginErrorMsg(ra, mav);
      return mav; 
    }

    return mav;
  }
  
  private ModelAndView loginErrCnt(ModelAndView mav, RedirectAttributes ra, MSTRSessionUserImpl userInfo) throws SQLException{
    
    Map loginDwInfo  = loginCheckService.selectDwUser(userInfo);   // DW
    
    if(loginDwInfo == null || loginDwInfo.isEmpty() ){
      int ret = loginCheckService.updateLoginErrorCnt(userInfo.getMstrUserID());  // error count
      logger.error(String.valueOf(ret));
      return loginErrorMsg(ra, mav);
    }
    
    Map loginInfo  = loginCheckService.selectLoginCheck(userInfo);   //BI
    
    if(loginInfo == null || loginInfo.isEmpty() ){
       loginCheckService.updateLoginErrorCnt(userInfo.getMstrUserID());
      return loginErrorMsg(ra, mav);
    }
    
    int loginErrorCnt = Integer.parseInt(String.valueOf(loginInfo.get("LGIN_ERR_CNT")));
    String isPwdChgOver = (String)loginInfo.get("IS_PWD_CHG_OVER");
    String isLoginOver = (String)loginInfo.get("IS_LOGIN_OVER");
    
    int loginErrCnt = Integer.parseInt(StringUtil.defaultString(SystemMessage.getMessage("mstr.login.loginErrCnt"), "5"));
    
    if(loginErrorCnt > loginErrCnt) {
        return loginErrorMsg(ra, mav);
    } else if("Y".equals(isPwdChgOver) || "Y".equals(isLoginOver)) {        
        return loginErrorMsg(ra, mav);
    }
    
    return null;
  }
  
  /**
   * <pre>
   * 로그아웃 처리
   * </pre>
   *
   * @param request
   * @param response
   * @param userInfo
   * @return
   *
   */
  @RequestMapping(value="/logout", method = {RequestMethod.GET})
  public ModelAndView logoutGet(
      HttpServletRequest request
      , HttpServletResponse response
      , MSTRSessionUserImpl userInfo
      ){
    return logoutPost(request, response, userInfo);
  }
  
  @RequestMapping(value="/logout", method = {RequestMethod.POST})
  public ModelAndView logoutPost(
      HttpServletRequest request
      , HttpServletResponse response
      , MSTRSessionUserImpl userInfo
      ){
    ModelAndView mav      = new ModelAndView();
    HttpSession session     = request.getSession();

    if (session!=null) {
      synchronized (session) {
        closeServerSession();
        session.removeAttribute(MSTRSessionUser.ATTRIBUTE_NAME);
        session.invalidate();
      }
    }

    mav.setViewName("redirect:/login/login.do");

    return mav;
  }
  
  /**
   * <pre>
   * 팝업 세션 체크
   * </pre>
   *
   * @param session
   * @param request
   * @param response
   * @param model
   * @return
   */
  @RequestMapping(value = "/popSessionCheck" , method = {RequestMethod.GET})
  @ResponseBody
  public Object popSessionCheckGet(
              HttpSession session 
              , HttpServletRequest request
              ,HttpServletResponse response
              ,Model model) {   
    return popSessionCheckPost(session, request, response, model);
  }
  
  @RequestMapping(value = "/popSessionCheck" , method = {RequestMethod.POST})
  @ResponseBody
  public Object popSessionCheckPost(
      HttpSession session 
      , HttpServletRequest request
      ,HttpServletResponse response
      ,Model model) {   

    Map<String, Object> result        = new HashMap<String, Object>();

    MSTRSessionUserImpl member = (MSTRSessionUserImpl)session.getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
    boolean sessionresult=true;
    //로그인 세션 정보가 존재 하는 경우
    if(member ==  null){
      sessionresult=false;
    }
    if (member != null && "".equals(member.getUserId())) {
      sessionresult=false;
    }
    result.put("sessionresult", sessionresult);
    return result;
  }

 
  /**
   * <pre>
   * 패스워드 변경(초기화)호출
   * </pre>
   *
   * @param request
   * @param response
   * @param model
   * @return
   *
   */
  @RequestMapping(value="/passOtpPop", method = {RequestMethod.GET})
  public ModelAndView passOtpPopGet(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      ){
    return passOtpPopPost(request, response, model);
  }
  
  @RequestMapping(value="/passOtpPop", method = {RequestMethod.POST})
  public ModelAndView passOtpPopPost(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      ){
    ModelAndView mav      = new ModelAndView();
    mav.setViewName("/mstr/common/passOtpPop");
    return mav;
  }
  
  /**
   * <pre>
   * 현재 패스워드 체크
   * </pre>
   *
   * @param request
   * @param response
   * @param model
   * @param nowPass
   * @return
   *
   */
  @RequestMapping(value="/passCheck", method = {RequestMethod.GET})
  @ResponseBody
  public Object passCheckGet(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      , @RequestParam(value="nowPass", required=true)String nowPass
      , @RequestParam(value="portalId", required=true)String portalId
      ){
    return passCheckPost(request, response, model, nowPass, portalId);
  }
  
  @RequestMapping(value="/passCheck", method = { RequestMethod.POST})
  @ResponseBody
  public Object passCheckPost(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      , @RequestParam(value="nowPass", required=true)String nowPass
      , @RequestParam(value="portalId", required=true)String portalId
      ){
    MSTRSessionUserImpl user;
    user = new MSTRSessionUserImpl();
    user.setMstrUserID(portalId);
    user.setPortalId(portalId);
      
    HttpSessionUtils.setAttribute(request.getSession(), MSTRSessionUserImpl.ATTRIBUTE_NAME, user);
    return userService.userPassCheck(request, response, nowPass);
  }
  
  
  /**
   * <pre>
   * OTP SMS Send
   * </pre>
   *
   * @param request
   * @param response
   * @param model
   * @param nowPass
   * @return
   *
   */
  @RequestMapping(value="/passSendOtpSms", method ={RequestMethod.GET})
  @ResponseBody
  public Object passSendOtpSmsGet(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      , @RequestParam(value="portalId", required=true) String portalId
      ){
    return passSendOtpSmsPost(request, response, model, portalId);
  }
  
  @RequestMapping(value="/passSendOtpSms", method ={RequestMethod.POST})
  @ResponseBody
  public Object passSendOtpSmsPost(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      , @RequestParam(value="portalId", required=true) String portalId
      ){
    
    Map<String, Object> rtn    = new HashMap<String, Object>(); 
    try {  
      
      Map<String, Object> rtnSms = loginCheckService.callSms(portalId);
      
      if( rtnSms == null) {
        rtn.put("result", "fail");
        rtn.put("message", "인증번호 발송 실패했습니다.");     
      } else {
         rtn.put("result", "success");
         HttpSessionUtils.setAttribute(request.getSession(), "encOtp", rtnSms.get("EncOtp"));
         HttpSessionUtils.setAttribute(request.getSession(), "startTime", System.currentTimeMillis());         
      }
    } catch (SQLException e) {
      logger.error(CmmUtil.exMessage(e));
      rtn.put("result", "fail");
      rtn.put("message", "인증번호 발송 실패했습니다.");
    }
    
    return rtn;
   }
  
  @RequestMapping(value="/passOtpCheck", method = {RequestMethod.GET})
  public ModelAndView passOtpCheckGet(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      , @RequestParam(value="portalId", required=false) String portalId
      , @RequestParam(value="checkNo", required=false) String checkNo
      ){
    return passOtpCheckPost(request, response, model, portalId, checkNo);
  }
  
  @RequestMapping(value="/passOtpCheck", method = {RequestMethod.POST})
  public ModelAndView passOtpCheckPost(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      , @RequestParam(value="portalId", required=false) String portalId
      , @RequestParam(value="checkNo", required=false) String checkNo
      ){
      ModelAndView mav      = new ModelAndView();

      Map<String, Object> rtn    = new HashMap<String, Object>(); 
      try {  
        Object encOtp = request.getSession().getAttribute("encOtp");
        if(encOtp == null){
          mav.addObject("msg","인증실패했습니다."); 
          mav.setViewName("/mstr/common/msgBox");
          return mav;
        }
        Object stObj = request.getSession().getAttribute("startTime");
     //   long  startTime = 0;
        String stringToConvert = String.valueOf(stObj);
        Long startTime = Long.parseLong(stringToConvert);
        if((System.currentTimeMillis() - 180000) > startTime){
          mav.addObject("msg","인증실패했습니다."); 
          mav.setViewName("/mstr/common/msgBox");
          return mav;
        }
        rtn = loginCheckService.selectCheckSms(portalId, checkNo,encOtp.toString());
        
        if(rtn.get("UIDD") == null) {
          mav.addObject("msg","인증실패했습니다."); 
          mav.setViewName("/mstr/common/msgBox");
          return mav;
        }
        
        mav.setViewName("/mstr/common/passOtpCheck");
        
      } catch (SQLException e) {
        logger.error("passOtpCheck ->" + CmmUtil.exMessage(e));
        mav.addObject("msg","인증실패했습니다."); 
        mav.setViewName("/mstr/common/msgBox");
      }
       return mav;
    }
  
  /**
   * <pre>
   * 비밀번호 변경 처리
   * </pre>
   *
   * @param request
   * @param response
   * @param model
   * @param nowPass
   * @return
   *
   */
  @RequestMapping(value = "/passChangePrc", method = {RequestMethod.GET})
  @ResponseBody
  public Object passChangePrcGet(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      , @RequestParam(value="newPass", required=true)String newPass
      , @RequestParam(value="mstrUserID", required=true)String mstrUserID
      ){
      return passChangePrcPost(request, response, model, newPass, mstrUserID);
  }
  
  @RequestMapping(value = "/passChangePrc", method = {RequestMethod.POST})
  @ResponseBody
  public Object passChangePrcPost(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      , @RequestParam(value="newPass", required=true) String pNewPass
      , @RequestParam(value="mstrUserID", required=true) String mstrUserID
      ){
    
    String newPass = pNewPass;
    Map<String, Object> rtn    = new HashMap<String, Object>();   
    
    try {   
      String loginType = System.getProperty("login");
      
      if("erp".equals(loginType)) {   // erp 연동일경우 
 
        String encPasswd = loginCheckService.selectEncPasswd(newPass);
  
        int isOld = loginCheckService.isOldErpPwdHis(mstrUserID, encPasswd);
        if( isOld != 0 ) {
          rtn.put("result", "fail");
          rtn.put("message", "이미 사용한 비밀번호 입니다. 새 비밀번호를 확인해 주세요.");
          return rtn;
        }
        
        int ret = loginCheckService.updateUserToErp(mstrUserID, newPass, encPasswd);  // erp
        // dw  bi  update
        loginCheckService.updateUserToDwAndBi(mstrUserID, newPass, encPasswd);  
        ret = loginCheckService.updateUserErrInit(mstrUserID);   // 오류 내역 초기 화
        logger.error(String.valueOf(ret));
        newPass = encPasswd;

      }
      
      rtn = userService.userPassUpdate(request, response, newPass, mstrUserID);  // mstr 
      
    } catch (SQLException e) {
      rtn.put("result", "fail");
      rtn.put("message", "비밀번호를 확인해 주세요.");
    }
    return rtn;
  }

  /**
   * <pre>
   * 메인 페이지 이동
   * </pre>
   *
   * @param request
   * @param response
   * @param model
   * @param userInfo
   * @return
   *
   */
   @RequestMapping(value="/main", method = {RequestMethod.GET})
    public ModelAndView mainPageGet(
        HttpServletRequest request
        , HttpServletResponse response
        , Model model
        , MSTRSessionUserImpl userInfo
        ){
     return mainPagePost(request, response, model, userInfo);
   }
   
  @RequestMapping(value="/main", method = {RequestMethod.POST})
  public ModelAndView mainPagePost(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      , MSTRSessionUserImpl userInfo
      ){
    
      ModelAndView mav      = new ModelAndView();
      menuService.lnbMenuList(request, response, userInfo);
      mav.setViewName("/mstr/main");
      return mav;
    }
  
  	/**
  	 * ERP 서버 정상 작동 중인지 확인. SQLTimeoutExecption을 통해 타임아웃도 체크한다.
  	 * @return
  	 */
	private boolean erpConnCheck(){

		boolean usableYn = false;
		try {
			loginCheckService.selectTimeoutCheck(1);
			usableYn = true;
		} catch (SQLTimeoutException e) {
			usableYn = false;
		} catch (SQLException e) {
			usableYn = false;
		}
		return usableYn;
	}
  
  /**
   * 테스트 용도 - DB타임아웃 체크
   * @param request
   * @param response
   * @return
   */
  @RequestMapping(value="/erpTimeoutCheck", method = {RequestMethod.GET})
  public ModelAndView erpTimeoutCheck(
      HttpServletRequest request
      , HttpServletResponse response
      ){
      
	  ModelAndView mav = new ModelAndView();
      ///String timeoutCheckSql = "SELECT * FROM TUS_DFS.SY0010M A, TUS_DFS.SY0010M B, TUS_DFS.SY0010M C"; //의도적으로 타임아웃을 유발하기 위한 SQL쿼리. TEST용도. 2018.09.05 
	  
      try {  
        loginCheckService.selectTimeoutCheck(1);
        mav.addObject("msg","성공"); 
        mav.setViewName("/mstr/common/msgBox");
        return mav;        
      } catch (SQLTimeoutException e) {
          mav.addObject("msg","Timeout 발생"); 
          mav.setViewName("/mstr/common/msgBox");
      } catch (SQLException e) {    	
        mav.addObject("msg","오류가 발생했습니다."); 
        mav.setViewName("/mstr/common/msgBox");
      }
      
       return mav;
    }
  
  @RequestMapping(value="/encPass", method = {RequestMethod.GET})
  public ModelAndView encPass(
      HttpServletRequest request
      , HttpServletResponse response
      ){
      
	  ModelAndView mav = new ModelAndView();
	  
      try {  
        String passwd = loginCheckService.selectEncPasswd("admin3397");
        mav.addObject("msg",passwd); 
        mav.setViewName("/mstr/common/msgBox");
        return mav;        
      } catch (SQLTimeoutException e) {
          mav.addObject("msg","Timeout 발생"); 
          mav.setViewName("/mstr/common/msgBox");
      } catch (SQLException e) {    	
        mav.addObject("msg","오류가 발생했습니다."); 
        mav.setViewName("/mstr/common/msgBox");
      }
      
       return mav;
    }
  
}//end of class