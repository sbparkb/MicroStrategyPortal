package com.groto.cmm.exception;
/**
 *  Class Name  :  ReportRuntimeException
 *  Description :  레포트 Exception
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

public class ReportRuntimeException extends RuntimeException {

	private static final long serialVersionUID = 7797412350878380593L;

	public ReportRuntimeException() {
	}

	public ReportRuntimeException(String message) {
		super(message);
	}

	public ReportRuntimeException(String message, Throwable cause) {
		super(message, cause);
	}

	public ReportRuntimeException(Throwable cause) {
		super(cause);
	}
}