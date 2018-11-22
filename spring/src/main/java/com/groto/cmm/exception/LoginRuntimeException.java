package com.groto.cmm.exception;

/**
 *  Class Name  : LoginRuntimeException
 *  Description : 로그인 에러 Exception
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
public class LoginRuntimeException extends RuntimeException {
   
    private static final long serialVersionUID = -3289357414309294709L;
    
    private transient String message;
    
    public LoginRuntimeException(){
    	super();
    } 
    
    public LoginRuntimeException(String message){        
    	super(message);
    	this.message = message;
    }       
	
	@Override
    public String getMessage(){
        return message;
    }
       
}
