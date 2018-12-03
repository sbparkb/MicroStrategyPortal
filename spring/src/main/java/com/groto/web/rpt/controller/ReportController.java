package com.groto.web.rpt.controller;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.StringUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.service.AbstractReportService;
import com.groto.session.MSTRSessionUserImpl;
import com.groto.web.cmm.service.CommonService;
import com.groto.web.rpt.service.ReportWebService;
import com.groto.web.rpt.vo.MstrParam;
import com.microstrategy.web.objects.WebObjectsException;
import com.mstr.business.model.ReportInfo;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping({"/service"})
public class ReportController
  extends AbstractReportService
{
  private static final Logger LOGGER = LoggerFactory.getLogger(ReportController.class);
  

  private static final long serialVersionUID = 5406265113243888227L;
  

  @Autowired
  ReportWebService reportService;
  


  @Autowired
  CommonService commonService;
  


  @Autowired
  MessageSource messageSource;
  


  public ReportController() {}
  


  @RequestMapping(value={"/reportMain"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public ModelAndView reportMainPageGet(HttpServletRequest request, HttpServletResponse response, @RequestParam(value="objectID", required=false) String objectId, @RequestParam(value="displayUnitType", required=false) int displayUnitType)
  {
    return reportMainPagePost(request, response, objectId, displayUnitType);
  }
  

  @RequestMapping(value={"/reportMain"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  public ModelAndView reportMainPagePost(HttpServletRequest request, HttpServletResponse response, @RequestParam(value="objectID", required=false) String objectId, @RequestParam(value="displayUnitType", required=false) int displayUnitType)
  {
    response.setHeader("P3P", "CP='CAO PSA CONi OTR OUR DEM ONL'");
    request.setAttribute("isBiWeb", "Y");
        
    MSTRSessionUserImpl user = (MSTRSessionUserImpl)request.getSession().getAttribute("MSTRSessionUser");    
    request.setAttribute("user", user);
    
    ModelAndView mav = new ModelAndView();
    mav.setViewName("/mstr/common/reportMain_df");
    return mav;
  }
  

  @RequestMapping(value={"/reportDetail_df"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public ModelAndView reportViewPageDetailGet(HttpServletRequest request, HttpServletResponse response, Model model, @RequestParam(value="objectID", required=false) String objectId, @RequestParam(value="displayUnitType", required=false) int displayUnitType, @RequestParam(value="execType", required=false) String execType, @RequestParam(value="path", required=false) String path)
  {
    return reportViewPageDetailPost(request, response, model, objectId, displayUnitType, execType, path);
  }
  

  @RequestMapping(value={"/reportDetail_df"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  public ModelAndView reportViewPageDetailPost(HttpServletRequest request, HttpServletResponse response, Model model, @RequestParam(value="objectID", required=false) String objectId, @RequestParam(value="displayUnitType", required=false) int displayUnitType, @RequestParam(value="execType", required=false) String execType, @RequestParam(value="path", required=false) String path)
  {
    ModelAndView mav = new ModelAndView();
    
    if ("portal".equals(execType)) {
      model.addAttribute("executeUrl", "reportExecution.do");
    } else {
      model.addAttribute("executeUrl", "reportRun.do");
    }
    
    model.addAttribute("path", path);
    
    mav.setViewName("/mstr/common/reportDetail_df");
    
    return mav;
  }
  

  @RequestMapping(value={"/reportAddHoc"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public ModelAndView reportAddHocGet(HttpServletRequest request, HttpServletResponse response, Model model)
  {
    return reportAddHocPost(request, response, model);
  }
  

  @RequestMapping(value={"/reportAddHoc"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  public ModelAndView reportAddHocPost(HttpServletRequest request, HttpServletResponse response, Model model)
  {
    ModelAndView mav = new ModelAndView();
    mav.setViewName("/mstr/common/reportAddHoc");
    return mav;
  }
  

  @RequestMapping(value={"/reportExecution1"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public ModelAndView reportExcutionGet(HttpServletRequest request, HttpServletResponse response, @ModelAttribute("mstrParam") MstrParam param, @RequestParam(value="objectID", required=true) String objectID, @RequestParam(value="displayUnitType", required=true) int displayUnitType, @RequestParam(value="isShortcut", required=false) String isShortcut, @RequestParam(value="pop", required=false) String popYn, @RequestParam(value="newWeb", required=false) String newWeb, @RequestParam(value="targetID", required=false) String targetID, @RequestParam(value="targetType", required=false) String targetType, @RequestParam(value="execType", required=false) String execType)
    throws UnsupportedEncodingException
  {
    return reportExcutionPost(request, response, param, objectID, displayUnitType, isShortcut, popYn, newWeb, targetID, targetType, execType);
  }
  
  
  @RequestMapping(value={"/reportExecution1"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  public ModelAndView reportExcutionPost(HttpServletRequest request, HttpServletResponse response, @ModelAttribute("mstrParam") MstrParam param, @RequestParam(value="objectID", required=true) String pObjectID, @RequestParam(value="displayUnitType", required=true) int pDisplayUnitType, @RequestParam(value="isShortcut", required=false) String isShortcut, @RequestParam(value="pop", required=false) String popYn, @RequestParam(value="newWeb", required=false) String newWeb, @RequestParam(value="targetID", required=false) String targetID, @RequestParam(value="targetType", required=false) String targetType, @RequestParam(value="execType", required=false) String execType)
    throws UnsupportedEncodingException
  {
    request.setAttribute("mstrParam", param);
    response.setHeader("P3P", "CP='CAO PSA CONi OTR OUR DEM ONL'");
    response.setCharacterEncoding("UTF-8");
    request.setCharacterEncoding("UTF-8");
    String strPromptXML = (String)request.getSession().getAttribute("strPromptXML");
    
    if ((null != strPromptXML) && (!"".equals(strPromptXML))) {
      strPromptXML = strPromptXML.replaceAll("&", "&amp;");
      strPromptXML = strPromptXML.replaceAll("\"", "'");
    }
    
    String objectID = pObjectID;
    int displayUnitType = pDisplayUnitType;
    
    if ("true".equals(isShortcut)) {
      objectID = StringUtil.escapeHtmlString(targetID);
      displayUnitType = Integer.parseInt(targetType);
    }
    
    String newWebReq = (String)request.getAttribute("newWeb");
    
    if (!"Y".equals(newWebReq)) {
      request.setAttribute("newWeb", newWeb);
    }
    executionTask(request, displayUnitType, objectID, strPromptXML, popYn, execType);
    
    ModelAndView mav = new ModelAndView();
    mav.setViewName("/mstr/common/docExecution");
    mav.addAllObjects(reportService.reportExcution(request, response, objectID, displayUnitType));
    return mav;
  }
  
  private void executionTask(HttpServletRequest request, int displayUnitType, String objectID, String strPromptXML, String popYn, String execType)
  {
    String objectName = "";
    String evt = "";
    String src = "";
    
    String strVi = (String)request.getAttribute("VI_DASHBOARD");
    
    if (displayUnitType == 55) {
      objectName = "documentID";
      if ("true".equals(strVi)) {
        evt = "3140";
        src = "mstrWeb.3140";
      } else {
        evt = "2048001";
        src = "mstrWeb.2048001";
      }
    } else {
      objectName = "reportID";
      evt = "4001";
      src = "mstrWeb.4001";
    }
    
    String repUrl = "/servlet/mstrWeb?Server=" + SystemMessage.getMessage("mstr.config.default.server-name") + "&Project=" + SystemMessage.getMessage("mstr.config.default.project-name");
    
    String sessionId = (String)request.getAttribute("sessionId");
    String newUsrSmgr = (String)request.getSession().getAttribute("usrSmgr1");
    String usrSmgr1 = newUsrSmgr;
    
    if ((newUsrSmgr == null) || ("".equals(newUsrSmgr))) {
      usrSmgr1 = sessionId;
    }
    
    request.setAttribute("objectID", objectID);
    request.setAttribute("objectName", objectName);
    request.setAttribute("evt", evt);
    request.setAttribute("src", src);
    request.setAttribute("repUrl", repUrl);
    request.setAttribute("strPromptXML", strPromptXML);
    request.setAttribute("usrSmgr1", usrSmgr1);
    request.setAttribute("popYn", popYn);
    request.setAttribute("execType", execType);
    request.setAttribute("displayUnitType", Integer.valueOf(displayUnitType));
  }


  @RequestMapping(value={"/reportExecution"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  public ModelAndView reportRunPost(HttpServletRequest request, HttpServletResponse response, @ModelAttribute("mstrParam") MstrParam param, @RequestParam(value="objectID", required=true) String pObjectID, @RequestParam(value="displayUnitType", required=true) int pDisplayUnitType, @RequestParam(value="isShortcut", required=false) String isShortcut, @RequestParam(value="pop", required=false) String popYn, @RequestParam(value="newWeb", required=false) String newWeb, @RequestParam(value="targetID", required=false) String targetID, @RequestParam(value="targetType", required=false) String targetType, @RequestParam(value="execType", required=false) String execType)
    throws UnsupportedEncodingException
  {
    request.setAttribute("mstrParam", param);
    response.setHeader("P3P", "CP='CAO PSA CONi OTR OUR DEM ONL'");
    response.setCharacterEncoding("UTF-8");
    request.setCharacterEncoding("UTF-8");
    
    String objectID = pObjectID;
    int displayUnitType = pDisplayUnitType;
    
    if ("true".equals(isShortcut)) {
      objectID = StringUtil.escapeHtmlString(targetID);
      displayUnitType = Integer.parseInt(targetType);
    }
    
    String newWebReq = (String)request.getAttribute("newWeb");
    
    if (!"Y".equals(newWebReq)) {
      request.setAttribute("newWeb", newWeb);
    }
    
    String objectName = "";
    String evt = "";
    String src = "";
    
    String strVi = (String)request.getAttribute("VI_DASHBOARD");
    
    if (displayUnitType == 55) {
      objectName = "documentID";
      if ("true".equals(strVi)) {
        evt = "3140";
        src = "mstrWeb.3140";
      } else {
        evt = "2048001";
        src = "mstrWeb.2048001";
      }
    } else {
      objectName = "reportID";
      evt = "4001";
      src = "mstrWeb.4001";
    }
    
    String repUrl = "/servlet/mstrWeb?Server=" + SystemMessage.getMessage("mstr.config.default.server-name") + "&Project=" + SystemMessage.getMessage("mstr.config.default.project-name");
    
    String sessionId = (String)request.getAttribute("sessionId");
    String newUsrSmgr = (String)request.getSession().getAttribute("usrSmgr1");
    String usrSmgr1 = newUsrSmgr;
    
    if ((newUsrSmgr == null) || ("".equals(newUsrSmgr))) {
      usrSmgr1 = sessionId;
    }
    
    request.setAttribute("objectID", objectID);
    request.setAttribute("objectName", objectName);
    request.setAttribute("evt", evt);
    request.setAttribute("src", src);
    request.setAttribute("repUrl", repUrl);
    request.setAttribute("strPromptXML", "");
    request.setAttribute("usrSmgr1", usrSmgr1);
    request.setAttribute("popYn", popYn);
    request.setAttribute("execType", execType);
    request.setAttribute("displayUnitType", Integer.valueOf(displayUnitType));
    
    ModelAndView mav = new ModelAndView();
    mav.setViewName("/mstr/common/docExecution");
    return mav;
  }

  @RequestMapping(value={"/childElementList"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  @ResponseBody
  public Object childElementListGet(HttpServletRequest request, HttpServletResponse response, Model model, @RequestParam Map<String, String> map)
    throws WebObjectsException
  {
    return childElementListPost(request, response, model, map);
  }
  

  @RequestMapping(value={"/childElementList"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  @ResponseBody
  public Object childElementListPost(HttpServletRequest request, HttpServletResponse response, Model model, @RequestParam Map<String, String> map)
    throws WebObjectsException
  {
    return getPromptChildElementList(map);
  }
  

  @RequestMapping(value={"/elementList"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  @ResponseBody
  public Object elementListGet(HttpServletRequest request, HttpServletResponse response, Model model, @RequestParam Map<String, String> map)
    throws WebObjectsException
  {
    return elementListPost(request, response, model, map);
  }
  

  @RequestMapping(value={"/elementList"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  @ResponseBody
  public Object elementListPost(HttpServletRequest request, HttpServletResponse response, Model model, @RequestParam Map<String, String> map)
    throws WebObjectsException
  {
    return getPromptElementList(map);
  }
  


  @RequestMapping(value={"/searchReportList"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public ModelAndView searchReportListGet(HttpServletRequest request, HttpServletResponse response, Model model, @RequestParam(value="searchText", required=true) String searchText)
  {
    return searchReportListPost(request, response, model, searchText);
  }
  

  @RequestMapping(value={"/searchReportList"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  public ModelAndView searchReportListPost(HttpServletRequest request, HttpServletResponse response, Model model, @RequestParam(value="searchText", required=true) String searchText)
  {
    List<ReportInfo> list = null;
    try {
      list = searchReportList(searchText);
    } catch (WebObjectsException e) {
      LOGGER.error(CmmUtil.exMessage(e));
    }
    ModelAndView mav = new ModelAndView();
    model.addAttribute("list", list);
    mav.setViewName("/mstr/common/searchReportList");
    return mav;
  }
  

  @RequestMapping(value={"/blank"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public ModelAndView blankGet(HttpServletRequest request, HttpServletResponse response, Model model)
  {
    return blankPost(request, response, model);
  }
  

  @RequestMapping(value={"/blank"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  public ModelAndView blankPost(HttpServletRequest request, HttpServletResponse response, Model model)
  {
    ModelAndView mav = new ModelAndView();
    mav.setViewName("/mstr/blank");
    return mav;
  }
}
