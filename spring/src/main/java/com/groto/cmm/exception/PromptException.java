package com.groto.cmm.exception;
/**
 *  Class Name  :  PromptException
 *  Description :  프롬프트 Exception
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

public class PromptException extends RuntimeException {

	private static final long serialVersionUID = 4971700325509460619L;

	public PromptException() {
	}

	public PromptException(String message) {
		super(message);
	}

	public PromptException(String message, Throwable cause) {
		super(message, cause);
	}

	public PromptException(Throwable cause) {
		super(cause);
	}
}