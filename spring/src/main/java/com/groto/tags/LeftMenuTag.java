package com.groto.tags;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyTagSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.SystemMessage;
import com.microstrategy.webapi.EnumDSSXMLObjectTypes;
import com.mstr.business.model.TreeBean;

/**
 * Class Name : LeftMenuTag Description : 좌측 메뉴 
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
public class LeftMenuTag extends BodyTagSupport implements Serializable {

	private static final long serialVersionUID = 3800946314907421924L;

	private transient final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 리포트 ObjectID(required)
	 */
	private String objectID = "";

	private String sideMenuHtml = "";

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

	public String getSideMenuHtml() {
		return sideMenuHtml;
	}

	public void setSideMenuHtml(String sideMenuHtml) {
		this.sideMenuHtml = sideMenuHtml;
	}

	@SuppressWarnings("unchecked")
	public int doStartTag() throws JspTagException {
		
		JspWriter writer = this.pageContext.getOut();
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		
		if(request.getSession().getAttribute("lnbMenuParam") != null){
			ArrayList<TreeBean> list = (ArrayList<TreeBean>)(((Map<String, Object>)request.getSession().getAttribute("lnbMenuParam")).get("lnbMenuList"));
			String folderId = (String)(((Map<String, Object>)request.getSession().getAttribute("lnbMenuParam")).get("forderId"));
			this.sideMenuHtml = "";
		 
			if(list != null && list.size() > 0){
				folderId = list.get(0).getFolderId();
				makeSideMenu(list, folderId, objectID);
		 	}
		}

		try {
			writer.print(this.sideMenuHtml);
		} catch (IOException e) {
			logger.error(CmmUtil.exMessage(e));
		}

		return EVAL_PAGE;
	}
	
	private void makeSideMenu(ArrayList<TreeBean> list, String folderId, String objectID){
		
		for(TreeBean tb : list){
 
			this.sideMenuHtml += "<li id='" + tb.getId() + "'>";  
 
			if(tb.getChildMenu() != null && tb.getChildMenu().size() > 0){  // 하위 폴더가 있으면 
				this.sideMenuHtml += " <a href='#' ";
				if(folderId.equals(tb.getId()))   this.sideMenuHtml  += " class='on' ";    // 첫번째 폴더 open 
				this.sideMenuHtml += "   >"  +  tb.getMenuName()+"</a>";
				this.sideMenuHtml += "<ul >";
				makeSideMenu(tb.getChildMenu(), folderId, objectID);
				this.sideMenuHtml += "</ul>";
			}else{
				if(tb.getType() == EnumDSSXMLObjectTypes.DssXmlTypeFolder){ 
					this.sideMenuHtml += " <a href=\"#\"  >" + tb.getMenuName()+"</a><ul ></ul>";
				}else{
					this.sideMenuHtml += "<a href='javascript:ftn_linkReport2(\""+tb.getId().replaceAll(" ", "")+ "\", \""+tb.getType()+"\", \""+tb.getSubType()+"\", \"" + tb.isShortcut() + "\",";
					this.sideMenuHtml += " \"" + tb.getTargetId() + "\", \"" + tb.getTargetType() + "\", \"" + tb.getTargetSubType() + "\", \"" + tb.getMenuName();
					if(tb.getDescription().contains(SystemMessage.getMessage("mstr.config.execTypeTxt"))) {
						this.sideMenuHtml += "\", \"portal\"";
					}else {
						this.sideMenuHtml += "\", \"mstr\"";
					}
					this.sideMenuHtml += ")' ";
					this.sideMenuHtml += " class='report' title='"+tb.getMenuName()+"'>" +  CmmUtil.shortCutString(tb.getMenuName(), 25) + "</a>";					
				}
			}
			this.sideMenuHtml += "</li>";
			
		}
	}

}
