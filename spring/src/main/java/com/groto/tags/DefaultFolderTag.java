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

import com.groto.cmm.util.CmmCode;
import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.session.MSTRSessionUserImpl;
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
public class DefaultFolderTag extends BodyTagSupport implements Serializable {

	private static final long serialVersionUID = 3800946314907421924L;

	private transient final Logger logger = LoggerFactory.getLogger(getClass());
	
	private String notiSeq = "";

	public String getNotiSeq() {
		return notiSeq;
	}

	public void setNotiSeq(String notiSeq) {
		this.notiSeq = notiSeq;
	}

	@SuppressWarnings("unchecked")
	public int doStartTag() throws JspTagException {
		
		JspWriter writer = this.pageContext.getOut();
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		StringBuffer sb = new StringBuffer(1000);
		
		boolean isExcelAuth = ((MSTRSessionUserImpl)request.getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME)).isExcelAuth();
		String sessionid = (String) request.getSession().getAttribute( "usrSmgr1" );
		String mainYn = "N";
		if(request.getRequestURL().toString().contains("main")){
			mainYn = "Y";
		}
		
		String bbsId = CmmCode.BBS_ID_BBS00001.getKey();
		
		sb.append("<script> var isExcelAuth = '").append(isExcelAuth)
		.append("'; var sessionid = '").append(sessionid)
		.append("'; var mainYn = '").append(mainYn)
		.append("'; var bbsId = '").append(bbsId)		
		.append("'; jQuery(document).ready(function($) {");
		
		if(!"".equals(notiSeq)) {
			sb.append("var notiPop = getCookie('noti").append(notiSeq)
			.append("'; if(notiPop != 'N') { window.open('' ,'notiPopWin', 'toolbar=no, width=800, height=480, directories=no, status=no,location=no,  scrollbars=yes, resizable=yes');	var form = $('<form></form>' form.attr('action', '")
			.append(SystemMessage.getMessage("URL.WEB.SERVER")).append("/service/bbs/notiView.do'; form.attr('method', 'post'); form.attr('target', 'notiPopWin'); form.append(\"<input type='hidden' name='bbsSeqNo' value='")
			.append(notiSeq).append("'/>\" form.append(\"<input type='hidden' name='bbsId' value='BBS00001' />\" $('body').append(form) form.submit(); ");		    
		}
		
		String defaultFolderId = SystemMessage.getMessage("mstr.default.start.folder.id");
		TreeBean menuReport = defaultReport( (ArrayList<TreeBean>)(((Map<String, Object>)request.getSession().getAttribute("lnbMenuParam")).get("lnbMenuList")), defaultFolderId);
		
		// 초기 레포트가 있으면 
		if( menuReport != null && menuReport.getType() != 8) {   // 폴더
			sb.append("ftn_linkReport2 ('").append(menuReport.getId()).append("','")
			.append(menuReport.getType()).append("','")
			.append(menuReport.getSubType()).append("','")
			.append(menuReport.isShortcut()).append("','")
			.append(menuReport.getTargetId()).append("','")
			.append(menuReport.getTargetType()).append("','")
			.append(menuReport.getTargetSubType()).append("','")
			.append(menuReport.getMenuName()).append("');");
		}
		
		sb.append("ftn_linkReport_notice(); }); </script>"); // 초기 로딩시 공지사항 오픈
		
		try {
			writer.print(sb.toString());
		} catch (IOException e) {
			logger.error(CmmUtil.exMessage(e));
		}

		return EVAL_PAGE;
	}
	
	private TreeBean defaultReport(ArrayList<TreeBean> list, String folderId){
		 
		TreeBean rtn = null;
		
		for(TreeBean tb : list){
 
			if(folderId.equals(tb.getId()) ) {
 
				if(tb.getChildMenu() != null && tb.getChildMenu().size() > 0){
					rtn = defaultReport(tb.getChildMenu(), tb.getChildMenu().get(0).getId());
				} else {
					rtn = tb;
 				}
				
			}
 
		}
		
		return rtn;	
	}

}
