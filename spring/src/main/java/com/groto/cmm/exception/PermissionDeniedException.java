package com.groto.cmm.exception;

/**
 *  Class Name  :  PermissionDeniedException
 *  Description :  권한 없음 Exception
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
 
public class PermissionDeniedException extends RuntimeException {
   
    private static final long serialVersionUID = 8062529945320248542L;
    
    private transient String message;
    
    public PermissionDeniedException(){
    	super();
    } 
    
    public PermissionDeniedException(String message){        
    	super(message);
    	this.message = message;
    }       
	
	@Override
    public String getMessage(){
        return message;
    }
       
}
