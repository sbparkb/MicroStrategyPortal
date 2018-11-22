package com.groto.web.rpt.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.groto.cmm.exception.ReportRuntimeException;
import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.service.AbstractSessionUserService;
import com.groto.service.ReportServiceImpl;
import com.microstrategy.utils.StringUtils;
import com.microstrategy.web.objects.SimpleList;
import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectInfo;
import com.microstrategy.web.objects.WebObjectSource;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebObjectsFactory;
import com.microstrategy.webapi.EnumDSSXMLObjectTypes;


/**
 * Class Name : ReportService Description : 리포트 관리 서비스
 * 
 * Modification Information
 * 
 * Mod Date Modifier Description ----------- -------- --------------------------- 2015. 12. 3.
 * lastpice Generation
 * 
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 12. 3. 오후 3:42:53
 * @version :
 */

@Service
public class ReportWebService extends AbstractSessionUserService {

  private static final long serialVersionUID = -3815735161287039730L;
  static Logger logger = Logger.getLogger(ReportWebService.class);

  @Autowired
  ReportServiceImpl reportService;

  public Map<String, Object> reportExcution(HttpServletRequest request, HttpServletResponse response, String objectID, int displayUnitType) {

    Map<String, Object> result = new HashMap<String, Object>();

    try {

      String strPromptXML = "";
      String sessionId = (String) request.getSession().getAttribute("usrSmgr1");

      if (StringUtils.isEmpty(objectID)) {
        logger.error("[ReportExecutionAction] objectID is null");
        throw new ReportRuntimeException();
      } else {
        strPromptXML = reportService.reportExecution(sessionId, objectID, displayUnitType);
      }

      request.setAttribute("displayUnitType", String.valueOf(displayUnitType));
      request.setAttribute("objectID", objectID);
      request.setAttribute("strPromptXML", strPromptXML);
      request.setAttribute("sessionId", sessionId);

     } catch (WebObjectsException ex) {
      result.put("result", "fail");
      logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(ex) + " ]");
    }
    result.put("result", "success");

    return result;
  }
  
  /**
   * <pre>
   * 해당 오브젝트 아이디에 해당하는 경로를 생성 한다.
   * </pre>
   * 
   * @param request
   * @param response
   * @param objectId
   * @return
   * 
   */
  public Map<String, Object> selectMenuNameList(HttpServletRequest request, HttpServletResponse response, String objectId,
      int displayUnitType) {
 
    Map<String, Object> result = new HashMap<String, Object>();
    WebObjectsFactory factory = WebObjectsFactory.getInstance();
    WebIServerSession serverSession = factory.getIServerSession();
    StringBuffer path = new StringBuffer();
    WebObjectInfo objInfo = null;
    StringBuffer objids = new StringBuffer();
    
    try {
      serverSession = getServerSession();
      WebObjectSource wos = serverSession.getFactory().getObjectSource();
      if (displayUnitType == EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition) {
        objInfo = wos.getObject(objectId, EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition, true);
      } else if (displayUnitType == EnumDSSXMLObjectTypes.DssXmlTypeShortcut) {
        objInfo = wos.getObject(objectId, EnumDSSXMLObjectTypes.DssXmlTypeShortcut, true);
      } else {
        objInfo = wos.getObject(objectId, EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition, true);
      }

      SimpleList parentList = objInfo.getAncestors();
            
      boolean isReportFolder = false;
      String folderId = SystemMessage.getMessage("mstr.config.default.folderId");

      for (int i = 0; i < parentList.size(); i++) {

        WebObjectInfo parent = (WebObjectInfo) parentList.item(i);
        if (parent.getDisplayName().contains(".") || isReportFolder) {
          if ("".equals(path.toString())) {
            path.append(parent.getDisplayName().substring(parent.getDisplayName().indexOf(".") + 1));
            objids.append(parent.getID());
            } else {
            path.append(" > ").append(parent.getDisplayName().substring(parent.getDisplayName().indexOf(".") + 1));
            objids.append('|').append(parent.getID());
          }
        }
        if (folderId.equals(parent.getID()))
          isReportFolder = true;
      }

      path.append(" > ").append(objInfo.getDisplayName().substring(objInfo.getDisplayName().indexOf(".") + 1));
      result.put("path", path);
      result.put("objids", objids);

    } catch (WebObjectsException e) {
      logger.error("[ " + this.getClass().getName() + " , ERROR METHOD : " + e.getStackTrace()[1].getMethodName().replaceAll("[\r\n]", "")+ " ]");
      logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
      result.put("result", "fail");
      closeServerSession();      
    } finally {
        closeServerSession();
    }

    return result;
  }  

}///end of class