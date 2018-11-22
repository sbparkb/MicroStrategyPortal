package com.groto.web.cmm.service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.service.AbstractSessionUserService;
import com.groto.service.InstanceCreation;
import com.groto.session.MSTRSessionUserImpl;
import com.microstrategy.web.objects.WebFolder;
import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectInfo;
import com.microstrategy.web.objects.WebObjectSource;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebObjectsFactory;
import com.microstrategy.web.objects.WebShortcut;
import com.microstrategy.webapi.EnumDSSXMLFolderNames;
import com.microstrategy.webapi.EnumDSSXMLObjectTypes;
import com.mstr.business.model.TreeBean;
import com.shinsegae_inc.ssgdf.http.HttpSessionUtils;

/**
 *  Class Name  :  MenuService
 *  Description :  메뉴 생성 및 MSTR 메뉴 조회 서비스
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2016. 1. 21.  lastpice Generation
 *
 * @author : lastpice@separtners.co.kr
 * @date : 2016. 1. 21. 오후 2:42:12
 * @version : 
 */ 

@Service
public class MenuService extends AbstractSessionUserService implements Serializable{

  private static final long serialVersionUID = -7515981168775204171L;
  private transient final Logger LOGGER = LoggerFactory.getLogger(getClass());
  private int childNum;
  private final transient String excludeFolder = SystemMessage.getMessage("mstr.config.folder.exclude-folder-ids");
  private final transient String folderSort = SystemMessage.getMessage("mstr.default.folder.sort").toLowerCase();
  
  /**
   * <pre>
   *  메뉴 리스트 조회
   * </pre>
   *
   * @param request
   * @param response
   * @param userInfo
   * @return
   *
   */
  public Map<String, Object> lnbMenuList(HttpServletRequest request, HttpServletResponse response, MSTRSessionUserImpl userInfo) {

    Map<String, Object> result = new HashMap<String, Object>();
    WebObjectsFactory factory = WebObjectsFactory.getInstance();
    WebIServerSession serverSession = factory.getIServerSession();

    try {
      MSTRSessionUserImpl user = (MSTRSessionUserImpl) ((HttpServletRequest) request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);

      ArrayList<Object> menuList  = new ArrayList<Object>();
      String folderId = userInfo.getGnbMenuId();

      if (userInfo.getGnbMenuId() == null || "".equals(userInfo.getGnbMenuId())) {
        folderId = SystemMessage.getMessage("mstr.config.default.folderId");
      } else {
        folderId = userInfo.getGnbMenuId();
      }

      serverSession = getServerSession();
      if (folderId == null || "".equals(folderId)) {
        folderId = serverSession.getFactory().getObjectSource().getFolderID(EnumDSSXMLFolderNames.DssXmlFolderNamePublicReports); 
      }

      WebObjectSource wos = serverSession.getFactory().getObjectSource();
      WebObjectInfo objInfo = wos.getObject(folderId, EnumDSSXMLObjectTypes.DssXmlTypeFolder, true);

      int objTypes1[] =
        {EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition, EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition,
          EnumDSSXMLObjectTypes.DssXmlTypeShortcut, EnumDSSXMLObjectTypes.DssXmlTypeFolder};
      WebFolder folderToSearch1 = (WebFolder) objInfo;

      result.put("folderName1", objInfo.getDisplayName().substring(objInfo.getDisplayName().indexOf(".") + 1));
      
      HttpSessionUtils.setAttribute(request.getSession(), "folderName1", objInfo.getDisplayName().substring(objInfo.getDisplayName().indexOf(".") + 1));
      
      WebFolder subObj2 = folderToSearch1.findTypedObjects(objTypes1);

      List<WebObjectInfo> enuList = new ArrayList<WebObjectInfo>();

      if ("report".equals(folderSort)) { // 레포트 우선이면
        enuList = this.setFolderData(enuList, subObj2, "report");
        enuList = this.setFolderData(enuList, subObj2, "folder");
      } else {
        enuList = this.setFolderData(enuList, subObj2, "all");
      }

      enuList(enuList, wos, menuList);

      result.put("params", user);
      result.put("lnbMenuList", menuList);
      result.put("forderId1", folderId);
      
      HttpSessionUtils.setAttribute(request.getSession(), "lnbMenuParam", result);

    } catch (WebObjectsException ex) {
      LOGGER.error("[ " + this.getClass().getName().replaceAll("[\r\n]","") + " , ERROR METHOD : " + ex.getStackTrace()[1].getMethodName().replaceAll("[\r\n]","") + " ]");
      LOGGER.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(ex) + " ]");
      result.put("result", "fail");
      result.put("message", "서브 메뉴 조회에 실패 하였습니다.");
    } finally {
      closeServerSession();
    }
    return result;
  }
  
  private ArrayList<Object> enuList(List<WebObjectInfo> enuList, WebObjectSource wos,  ArrayList<Object> menuList) throws WebObjectsException, IllegalArgumentException{
    
    WebObjectInfo oInfo;
    TreeBean tb;
    
    for (int i = 0; i < enuList.size(); i++) {

      oInfo = (WebObjectInfo) enuList.get(i);
      tb = InstanceCreation.cTreeBean();

      childNum++;
      tb.setChildNum(childNum);
      tb.setParentsNum(0);
      tb.setAncester(oInfo.getAncestors());

      if (oInfo.getType() == EnumDSSXMLObjectTypes.DssXmlTypeShortcut) {
        WebObjectInfo oInfo2;
        tb.setFolderId(oInfo.getID());
        tb.setId(oInfo.getID());
        tb.setType(oInfo.getType());
        tb.setSubType(oInfo.getSubType());
        tb.setShortcut(true);

        WebShortcut nodeShortcutNode = (WebShortcut) wos.getObject(oInfo.getID(), EnumDSSXMLObjectTypes.DssXmlTypeShortcut, true);
        oInfo2 = nodeShortcutNode.getTarget();
        tb.setTargetId(oInfo2.getID());
        tb.setTargetType(oInfo2.getType());
        tb.setTargetSubType(oInfo2.getSubType());
        tb.setDescription(oInfo2.getDescription());
        tb.setComment(oInfo2.getComments());
      } else {
        tb.setFolderId(oInfo.getID());
        tb.setId(oInfo.getID());
        tb.setType(oInfo.getType());
        tb.setSubType(oInfo.getSubType());
        tb.setDescription(oInfo.getDescription());
        tb.setComment(oInfo.getComments());
      }
      // 명칭을 앞에서부터 "." 을 찾아서 그뒤로 자른다.
      tb.setMenuName(oInfo.getDisplayName().substring(oInfo.getDisplayName().indexOf(".") + 1));

      // GNB에 해당하는 메뉴 중
      if (tb.getType() == EnumDSSXMLObjectTypes.DssXmlTypeFolder) {
        getSubMenuByMenuId(wos, oInfo, childNum, tb);
      }
      menuList.add(tb);
    }
    
    return menuList;
  }

  // 쏘트 변경 시킴
  protected List<WebObjectInfo> setFolderData(List<WebObjectInfo> enuList, WebFolder subObj, String dataKind) {

    // dataKind : folder, report, all
    // List<String> excludeFolderList =
    // ConfigUtil.getListFromObject("mstr.config.folder.exclude-folder-ids", null); // 예외폴더
    // 일반 화일 처리
    for (java.util.Enumeration e = subObj.elements(); e.hasMoreElements();) {
      WebObjectInfo woInfo = (WebObjectInfo) e.nextElement();

      if ("folder".equals(dataKind)) {
        if (woInfo.getType() == EnumDSSXMLObjectTypes.DssXmlTypeFolder
            && !excludeFolder.contains(woInfo.getID()) ) {
            enuList.add(woInfo);
        }
      } else if ("report".equals(dataKind)) {
        if (woInfo.getType() != EnumDSSXMLObjectTypes.DssXmlTypeFolder) {  
          enuList.add(woInfo);
        }
      } else {
        if (woInfo.getType() == EnumDSSXMLObjectTypes.DssXmlTypeFolder) {
          // 예외 폴더 exclude
          if (!excludeFolder.contains(woInfo.getID())) {
            enuList.add(woInfo);
          }
        } else {
          enuList.add(woInfo);
        }
      }
    }

    return enuList;
  }
    
  /**
   * 
   * SUB MENU 리스트 생성
   * 
   * @param wos
   * @param oInfo
   * @param parentNum
   * @param parent - 부모 TreeBean 객체 ( 부모 객체에 자식 객체를 리스트로 담아 주기위해 )
   */
  public void getSubMenuByMenuId(WebObjectSource wos, WebObjectInfo oInfo, int parentNum, TreeBean parent) {
    WebObjectInfo objInfo;

    ArrayList<TreeBean> sub = new ArrayList<TreeBean>();
    try {
      objInfo = wos.getObject(oInfo.getID(), EnumDSSXMLObjectTypes.DssXmlTypeFolder, true);
      int objTypes[] =
          {EnumDSSXMLObjectTypes.DssXmlTypeFolder, EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition,
              EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition};

      WebFolder folderToSearch = (WebFolder) objInfo;
      WebFolder subObj1 = folderToSearch.findTypedObjects(objTypes);

      List<WebObjectInfo> enuList = new ArrayList<WebObjectInfo>();

      if ("report".equals(folderSort)) {
        enuList = this.setFolderData(enuList, subObj1, "rep");
        enuList = this.setFolderData(enuList, subObj1, "folder");
      } else {
        enuList = this.setFolderData(enuList, subObj1, "all");
      }

      TreeBean tb = null;
      
      for (int i = 0; i < enuList.size(); i++) {

        WebObjectInfo oInfo1 = (WebObjectInfo) enuList.get(i);
        tb = InstanceCreation.cTreeBean();

        childNum++;
        tb.setChildNum(childNum);
        tb.setParentsNum(parentNum);
        tb.setAncester(oInfo1.getAncestors());

        if (oInfo1.getType() == EnumDSSXMLObjectTypes.DssXmlTypeShortcut) {
          WebObjectInfo oInfo2;
          tb.setFolderId(oInfo1.getID());
          tb.setId(oInfo1.getID());
          tb.setType(oInfo1.getType());
          tb.setSubType(oInfo1.getSubType());
          tb.setShortcut(true);
          WebShortcut nodeShortcutNode = (WebShortcut) wos.getObject(oInfo1.getID(), EnumDSSXMLObjectTypes.DssXmlTypeShortcut, true);
          oInfo2 = nodeShortcutNode.getTarget();
          tb.setTargetId(oInfo2.getID());
          tb.setTargetType(oInfo2.getType());
          tb.setTargetSubType(oInfo2.getSubType());
          tb.setDescription(oInfo2.getDescription());
          tb.setComment(oInfo2.getComments());
        } else {
          tb.setFolderId(oInfo1.getID());
          tb.setId(oInfo1.getID());
          tb.setType(oInfo1.getType());
          tb.setSubType(oInfo1.getSubType());
          tb.setDescription(oInfo1.getDescription());
          tb.setComment(oInfo1.getComments());
        }
        // 명칭을 앞에서부터 "." 을 찾아서 그뒤로 자른다.
        tb.setMenuName(oInfo1.getDisplayName().substring(oInfo1.getDisplayName().indexOf(".") + 1));
        if (parent.getChildMenu() != null && parent.getChildMenu().size() > 0) {
          sub = parent.getChildMenu();
          sub.add(tb);
          parent.setChildMenu(sub);
        } else {
          sub.clear();
          sub.add(tb);
          parent.setChildMenu(sub);
        }
        if (oInfo1.getType() == EnumDSSXMLObjectTypes.DssXmlTypeFolder) {
          this.getSubMenuByMenuId(wos, oInfo1, childNum, tb);
        }
      }

    } catch (WebObjectsException e1) {
      LOGGER.error(CmmUtil.exMessage(e1));
    } catch (IllegalArgumentException e1) {
      LOGGER.error(CmmUtil.exMessage(e1));
    }
  }

    public int getChildNum() {
      return childNum;
    }

    public void setChildNum(int childNum) {
      this.childNum = childNum;
    }

}
