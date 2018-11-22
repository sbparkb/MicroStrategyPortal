package com.groto.cmm.exception;

/**
 *  Class Name  :  PageNotFoundException
 *  Description :  페이지 없음 Exception
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
 
public class PageNotFoundException extends RuntimeException {
   
    private static final long serialVersionUID = -3289357414309294709L;
    
    private transient String message;
    
    public PageNotFoundException(){
    	super();
    } 
    
    public PageNotFoundException(String message){        
    	super(message);
    	this.message = message;
    }       
	
	@Override
    public String getMessage(){
        return message;
    }
       
}
