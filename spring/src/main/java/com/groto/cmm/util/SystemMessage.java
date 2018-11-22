package com.groto.cmm.util;


import java.util.Locale;

import org.springframework.context.support.MessageSourceAccessor;

/**
 *  Class Name  :  SystemMessage
 *  Description :  property 메세지 처리 
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
 
public class SystemMessage{
	private static MessageSourceAccessor msAcc;

    @SuppressWarnings("static-access")
	public void setMessageSourceAccessor(MessageSourceAccessor msAcc) {
        this.msAcc = msAcc;
    }
    
    public MessageSourceAccessor getMessageSourceAccessor() {
        return msAcc;
    }
    
    public static String getMessage(String key, Object[] objs){
        return msAcc.getMessage(key, objs, Locale.KOREAN);
    }

    public static String getMessage(String key){
        return msAcc.getMessage(key);
    }
    
    public static String getMessage(String key, String defaultMessage){
        String message = "";
        message = msAcc.getMessage(key);
        return message;
    }    

}
