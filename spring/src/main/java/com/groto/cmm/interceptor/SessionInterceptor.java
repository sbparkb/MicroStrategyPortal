package com.groto.cmm.interceptor;

import java.io.IOException;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.StringUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.session.MSTRSessionUserImpl;
import com.microstrategy.utils.serialization.EnumWebPersistableState;
import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectsFactory;

/**
 *  Class Name  :  SessionInterceptor
 *  Description :  세션 로그인 체크 Interceptor
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 9. 23.  lastpice Generation
 *
 *  @author lastpice
 *  @since  2015. 9. 23. 오후 1:33:07
 *  @version 1.0
 */
 
public class SessionInterceptor extends HandlerInterceptorAdapter {

    private static final Logger LOGGER = LoggerFactory.getLogger(SessionInterceptor.class.getName()); // NOPMD by FIC03269 on 17. 7. 19 오후 1:17
   
    private transient Map<String, String> noCheckUri;
    
    public void setNoCheckUri(Map<String, String> noCheckUri) {
        this.noCheckUri = noCheckUri;
    } 
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    	
        String requestURI = request.getRequestURI();        
        
        //=====================================================================
        // 1. 사용자 세션 체크
        //=====================================================================

        try{

          if(!isPatternMatch(noCheckUri, requestURI)) {
	        	
	        	MSTRSessionUserImpl user = (MSTRSessionUserImpl)((HttpServletRequest)request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);	        	
	        	if(user == null || "".equals(user.getUserId())) {        		
	        		((HttpServletResponse)response).sendRedirect("/login/login.do");
	        	  return false;
	          }else{
	            existSessionHandle(request);
	          }
	         }
        }catch(IOException e){
        	LOGGER.error(CmmUtil.exMessage(e));
        }
        //=====================================================================
        // 3. 클릭된 메뉴 URI 체크후 호출될 GNB/LNB 정보 갱신
        //===================================================================== 
        
        return super.preHandle(request, response, handler);
    }
    
    /**
     * 세션 존재할 때 처리 - PMD 검사결과 메소드 복잡도 10을 초과하여 모듈로 분리
     * @param request
     * @param response
     * @return
     * @throws IOException
     */
    private boolean existSessionHandle(HttpServletRequest request){
      
      MSTRSessionUserImpl user = (MSTRSessionUserImpl)((HttpServletRequest)request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
      
      String usrSmgr = user.getMstrSessionState();
      
      if(StringUtil.isBlank(user.getPortalId())){
        user.setUserId(user.getMstrUserID());
      }else{
        user.setUserId(user.getPortalId());
      }
    
      if(usrSmgr == null || "".equals(usrSmgr)){
        WebObjectsFactory factory = WebObjectsFactory.getInstance();
        WebIServerSession serverSession = factory.getIServerSession();
        serverSession.setServerName(SystemMessage.getMessage("mstr.config.default.server-name"));
        serverSession.setServerPort(0);
        serverSession.setProjectName(SystemMessage.getMessage("mstr.config.default.project-name"));
        serverSession.setLogin(user.getMstrUserID());
        serverSession.setPassword(user.getMstrUserPW());
        serverSession.setLocale(StringUtil.parseLocaleString(SystemMessage.getMessage("mstr.config.default.locale")));
        serverSession.setApplicationType(com.microstrategy.webapi.EnumDSSXMLApplicationType.DssXmlApplicationCustomApp);
        serverSession.setAuthMode(1);
        String usrSmgr1 = serverSession.saveState(EnumWebPersistableState.MAXIMAL_STATE_INFO);
        user.setMstrSessionState(usrSmgr1);
        
        request.getSession().setAttribute("usrSmgr1", usrSmgr1);
        request.getSession().setAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME, user);
      }
      return true;
    }      
    
	@Override
	public void postHandle(HttpServletRequest request
	    , HttpServletResponse response
	    , Object handler
	    , ModelAndView modelAndView
	    ) throws Exception {
	    
	    try {
	        response.setHeader("Cache-Control", "max-age=0, private, must-revalidate");
	        response.setHeader("Pragma", "no-cache");
	        response.setHeader("X-XSS-Protection","1; mode=block");
	        response.setHeader("X-Content-Type-Options","nosniff");
	        
	        response.setHeader("X-UA-Compatible","IE=Edge,chrome=1");
	        response.setDateHeader("Expires", 0);

	    	super.postHandle(request, response, handler, modelAndView);

	    } catch(JsonGenerationException e) {
	      LOGGER.error(CmmUtil.exMessage(e));
	    } catch (JsonMappingException e) {
	      LOGGER.error(CmmUtil.exMessage(e));
      } catch (IOException e) {
        LOGGER.error(CmmUtil.exMessage(e));
      }
        
	}
	
	private boolean isPatternMatch(Map<String, String> urlMap, String findString) {
        boolean result = false;
        if(urlMap != null && findString != null) {
            for(String pattern : urlMap.keySet()) {
                Pattern compile = Pattern.compile(pattern);
                Matcher match   = compile.matcher(findString);
                if(match.find()) {
                    result = true;
                }
            }
        }
	    return result;
	}
	
}
