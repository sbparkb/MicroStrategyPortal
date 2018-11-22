package com.groto.cmm.exception;

/**
 *  Class Name  :  AccessDeniedException
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

public class AccessDeniedException extends RuntimeException {

	private static final long serialVersionUID = -1764604603675857685L;

	public AccessDeniedException() {
	}

	public AccessDeniedException(String message) {
		super(message);
	}

	public AccessDeniedException(String message, Throwable cause) {
		super(message, cause);
	}

	public AccessDeniedException(Throwable cause) {
		super(cause);
	}
}