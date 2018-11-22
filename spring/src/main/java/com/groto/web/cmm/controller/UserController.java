package com.groto.web.cmm.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.session.MSTRSessionUserImpl;
import com.groto.web.cmm.service.UserService;
import com.groto.web.login.service.LoginCheckService;


/**
 *  Class Name  :  UserController
 *  Description :  사용자  컨트롤러
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 12. 14. lastpice Generation
 *
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 12. 14. 오후 3:48:39
 * @version : 
 */ 
  
@Controller
@RequestMapping("/service/usr")
public class UserController {
	
	@Autowired
	private UserService userService;

  @Autowired
  private LoginCheckService loginCheckService;   // login 관련 
  
  protected static final Logger LOGGER = Logger.getLogger(UserController.class);
  
	/**
	 * <pre>
	 * MY 패스워드 변경 팝업 호출
	 * </pre>
	 *
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 *
	 */
	@RequestMapping(value="/passModPop", method =  RequestMethod.GET )
	public ModelAndView passModPopGet(
			HttpServletRequest request
			, HttpServletResponse response
			, Model model
			){
	  return passModPopPost(request ,  response ,  model);
	}
	
  @RequestMapping(value="/passModPop", method =   RequestMethod.POST)
  public ModelAndView passModPopPost(
      HttpServletRequest request
      , HttpServletResponse response
      , Model model
      ){

    ModelAndView mav      = new ModelAndView();
    mav.setViewName("/mstr/common/passChn");
    return mav;
  }
  
	/**
	 * <pre>
	 * 현재 MY 패스워드 체크
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
      , @RequestParam(value="nowPass", required=true) String pNowPass
      ){
      return passCheckPost(request, response, model, pNowPass);
  }
  
	@RequestMapping(value="/passCheck", method = {RequestMethod.POST})
	@ResponseBody
	public Object passCheckPost(
			HttpServletRequest request
			, HttpServletResponse response
			, Model model
			, @RequestParam(value="nowPass", required=true) String pNowPass
			){
	  
	  String nowPass = pNowPass;
    Map<String, Object> rtn    = new HashMap<String, Object>();	  
    
    try {	  
      
      MSTRSessionUserImpl user    = (MSTRSessionUserImpl)((HttpServletRequest)request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
      
      String adminId = SystemMessage.getMessage("mstr.admin.id");
      
      if(adminId.equals(user.getMstrUserID())) {   // 예외 어드민 접속 
        rtn.put("result", "fail");
        rtn.put("message", "변경 할수 없는 계정 입니다.");
        return rtn;
      }
      
      String loginType = System.getProperty("login");
      if("erp".equals(loginType)) {   // erp 연동일경우 
         String encPasswd = loginCheckService.selectEncPasswd(nowPass);  // 암호화 확인 
         nowPass = encPasswd;
      }

      Map loginDwUserInfo = loginCheckService.selectDwUser(user.getMstrUserID(), nowPass);   // DW 사용자 존재 체크 
      if(loginDwUserInfo == null ) {
        rtn.put("result", "fail");
        rtn.put("message", "현재 비밀번호를 확인해 주세요.");
        return rtn;
      }
      
      rtn = userService.userPassCheck(request, response, nowPass);  //mstr 체크 
      
    } catch (SQLException e) {
      LOGGER.error(CmmUtil.exMessage(e));
      rtn.put("result", "fail");
      rtn.put("message", "현재 비밀번호를 확인해 주세요.");
    }
		return rtn;
	}
	
	
	/**
	 * <pre>
	 * MY 비밀번호 변경 처리
	 * </pre>
	 *
	 * @param request
	 * @param response
	 * @param model
	 * @param nowPass
	 * @return
	 *
	 */
	 @RequestMapping(value="/passChangePrc", method = {RequestMethod.GET})
	  @ResponseBody
	  public Object passChangePrcGet(
	      HttpServletRequest request
	      , HttpServletResponse response
	      , Model model
	      , @RequestParam(value="newPass", required=true) String pNewPass
	      ){
	   return passChangePrcPost(request, response, model, pNewPass);
	 }
	 
	@RequestMapping(value="/passChangePrc", method = {RequestMethod.POST})
	@ResponseBody
	public Object passChangePrcPost(
	    HttpServletRequest request
	    , HttpServletResponse response
	    , Model model
	    , @RequestParam(value="newPass", required=true) String pNewPass
	    ){

	  String newPass = pNewPass;
	  Map<String, Object> rtn    = new HashMap<String, Object>();   

	  try {   
	    String loginType = System.getProperty("login");
	    if("erp".equals(loginType)) {   // erp 연동일경우 

	      MSTRSessionUserImpl user = (MSTRSessionUserImpl)((HttpServletRequest)request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);

	      String encPasswd = loginCheckService.selectEncPasswd(newPass);

	      int isOld = loginCheckService.isOldErpPwdHis(user.getMstrUserID(), encPasswd);
	      if( isOld != 0 ) {
	        rtn.put("result", "fail");
	        rtn.put("message", "새 비밀번호를 확인해 주세요.");
	        return rtn;
	      }

	      int ret = loginCheckService.updateUserToErp(user.getMstrUserID(), newPass, encPasswd);  //erp
	      LOGGER.debug("updateUserToErp - return code:" + ret );

	      loginCheckService.updateUserToDwAndBi(user.getMstrUserID(), newPass, encPasswd);  
	      ret = loginCheckService.updateUserErrInit(user.getMstrUserID());   // 오류 내역 초기      
	      newPass = encPasswd;
	    }
	    rtn = userService.userPassUpdate(request, response, newPass);  //mstr

	  } catch (SQLException e) {
	    rtn.put("result", "fail");
	    rtn.put("message", "비밀번호를 확인해 주세요.");
	  }
	  return rtn;
	}
}//end of class