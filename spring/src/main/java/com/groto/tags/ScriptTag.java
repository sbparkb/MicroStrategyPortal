package com.groto.tags;

import java.io.IOException;
import java.io.Serializable;

import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyTagSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.SystemMessage;

/**
 * Class Name : ScriptTag Description : 공통 스크립트 구성 태그 
 * 
 * Modification Information
 * 
 * Mod Date Modifier Description ----------- --------
 * --------------------------- 2015. 9. 23. lastpice Generation
 * 
 * @author lastpice
 * @since 2015. 9. 23. 오후 1:33:07
 * @version 1.0
 */

@Repository
public class ScriptTag extends BodyTagSupport implements Serializable {

	private static final long serialVersionUID = 3800946314907421924L;

	private transient final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 리포트 ObjectID(required)
	 */
	private String objectID = "";

	/**
	 * 리포트 displayUnitType(required)
	 */

	private final transient String url = SystemMessage.getMessage("URL.WEB.SERVER");
	private final transient String imgUrl = SystemMessage.getMessage("URL.IMG.SERVER");
	private final transient String mstrCtx = SystemMessage.getMessage("URL.MSTR.CONTEXT");
	
	private String message = "";

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getUrl() {
		return url;
	}

	/**
	 * @return the objectID
	 */
	public String getObjectID() {
		return objectID;
	}

	/**
	 * @param objectID the objectID to set
	 */
	public void setObjectID(String objectID) {
		this.objectID = objectID;
	}		

	public String getImgUrl() {
		return imgUrl;
	}		

	public String getMstrCtx() {
		return mstrCtx;
	}

	public int doStartTag() throws JspTagException {

		JspWriter writer = this.pageContext.getOut();
		StringBuffer script = new StringBuffer(1000);		
		
		script.append("<script> var URL_WEB_SERVER = '").append(this.getUrl())
		.append("'; var MESSAGE = '").append(this.getMessage()).append("'; var URL_IMG_SERVER = '")
		.append(this.imgUrl).append("'; var URL_MSTR_SERVER = '").append(this.getMstrCtx())
		.append("'; </script>");		

		try {
			writer.print(script.toString());
		} catch (IOException e) {
			logger.error(CmmUtil.exMessage(e));
		}

		return EVAL_PAGE;
	}

}//end of class