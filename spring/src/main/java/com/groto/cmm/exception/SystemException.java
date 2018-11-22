package com.groto.cmm.exception;

/**
 *  Class Name  :  SystemException 
 *  Description :  시스템 Exception
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
 
public class SystemException extends RuntimeException {
   
  private static final long serialVersionUID = 526289934775068535L;
	
  private transient String message;
    
    SystemException(){
    	super();
    } 
    
    public SystemException(String message){        
    	super(message);
    	this.message = message;
    }       
	
	@Override
    public String getMessage(){
        return message;
    }
       
}
