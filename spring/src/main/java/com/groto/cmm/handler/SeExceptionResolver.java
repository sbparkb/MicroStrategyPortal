package com.groto.cmm.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

import com.groto.cmm.exception.LoginRuntimeException;
import com.groto.cmm.exception.PageNotFoundException;
import com.groto.cmm.exception.PermissionDeniedException;
import com.groto.cmm.exception.SystemException;
import com.groto.cmm.util.CmmUtil;

/**
 *  Class Name  :  SeExceptionResolver
 *  Description :  전체 Exception 처리
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
 
public class SeExceptionResolver extends SimpleMappingExceptionResolver {

    private static Logger logger = LoggerFactory.getLogger(SeExceptionResolver.class);

    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        if (ex instanceof LoginRuntimeException) {

            logger.info("### LoginRuntimeException : " + CmmUtil.exMessage(ex));
            
        } else if (ex instanceof PermissionDeniedException) {
            
            logger.info("### PermissionDeniedException : " + CmmUtil.exMessage(ex));
            
        } else if (ex instanceof PageNotFoundException) { 
            logger.info("### PageNotFoundException : " + CmmUtil.exMessage(ex));
            
        } else if (ex instanceof SystemException) {
            
            logger.info("### SystemException : " + CmmUtil.exMessage(ex));
            
        } else {
          logger.info("### SystemException_else : " + CmmUtil.exMessage(ex));          
        }        

        return super.resolveException(request, response, handler, ex);
    }

}
