package com.groto.web.excel.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.DateUtil;
import com.groto.cmm.util.FileUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.service.InstanceCreation;
import com.groto.session.MSTRSessionUserImpl;
import com.groto.web.excel.service.ExcelUploadService;
import com.groto.web.login.service.LoginCheckService;

/**
 * Class Name : UploadController Description : 엑셀 업로드 컨트롤
 * 
 * Modification Information
 * 
 * Mod Date Modifier Description ----------- -------- --------------------------- 2015. 12. 23. bae
 * Generation
 * 
 * @author : bae
 * @date : 2015. 12. 23. 오후 2:35:26
 * @version :
 */

@Controller
@RequestMapping(value = "/upload")
public class UploadController {

  protected static final Logger LOGGER = Logger.getLogger(UploadController.class);

  @Autowired
  private ExcelUploadService excelService;

  @Autowired
  private LoginCheckService listService;

  @RequestMapping(value = "/excelList", method = RequestMethod.POST)
  public ModelAndView excelList(HttpServletRequest request, HttpServletResponse response, Model model) {

    ModelAndView mav = new ModelAndView();

    HttpSession session = request.getSession();
    MSTRSessionUserImpl userInfo = (MSTRSessionUserImpl) session.getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);

    try {
      model.addAttribute("list", listService.selectExcelAuthList(userInfo.getMstrGroupId()));
    } catch (SQLException e) {
      LOGGER.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
    }

    mav.setViewName("/mstr/upload/excelList");

    return mav;
  }

  /**
   * <pre>
   * 엑셀파일 저장
   * </pre>
   * 
   * @param request
   * @param response
   * @param myfile
   * @param model
   * @return
   * 
   */
  @RequestMapping(value = "/excelSave", method = RequestMethod.POST)
  @ResponseBody
  public Object excelFileSave(HttpServletRequest request, HttpServletResponse response, String excelType, MultipartFile myfile, Model model) {

    Map<String, Object> result = new HashMap<String, Object>();
    String responseCode = "500"; // 성공시 200, 업로드 작업 실패시 500, 인증 실패시 401, 용량초과시 413
    File uploadedFile = null;

    // 파일 체크
    MultipartFile formFile = myfile;
    // 확장자 : 확장자가 없는 경우 "null" 반환
    String fileExt = CmmUtil.nvl(FileUtil.getExtension(formFile.getOriginalFilename()), "null");
    // 확장자를 배제한 파일명     
    String fileName = formFile.getOriginalFilename().substring(0, formFile.getOriginalFilename().lastIndexOf("."));

    result = uploadFileCheck(formFile, result, fileExt, fileName); 
    if(result !=null) return result;

    result = new HashMap<String, Object>();

    try {

      // 디렉토리
      StringBuffer tempPath = new StringBuffer();
      tempPath.append(SystemMessage.getMessage("URL.UPLOAD.TEMP.FILE"))
      .append('/').append(DateUtil.getDate());

      File tempDirectory = FileUtils.getFile(tempPath.toString());

      if (!tempDirectory.exists())
        tempDirectory.mkdirs();
      // 업로드
      String uploadFileName = "se_tempfile_" + UUID.randomUUID().toString() + "." + FileUtil.getExtension(formFile.getOriginalFilename());

      StringBuffer newFile = new StringBuffer();
      newFile.append(tempPath).append(File.separator).append(uploadFileName);

      uploadedFile = FileUtils.getFile(newFile.toString());
      formFile.transferTo(uploadedFile); // 화일 만들어짐
      responseCode = "200";

      result = new HashMap<String, Object>(); 
      
      ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
      if ("XLSX".equals(fileExt.toUpperCase())) {
        list = this.getXlsxData(tempPath + "/" + uploadFileName, request, response);
      } else if ("XLS".equals(fileExt.toUpperCase())) {
        list = this.getXlsData(tempPath + "/" + uploadFileName, request, response);
      } else {
        responseCode = "500";
        result.put("responseCode", responseCode);
        result.put("result", "fail");
        result.put("message", "NOT EXCEL..");
        return result;
      }

      result = xlsDataSave(list, result, request, response, excelType);
      
      if(result != null) return result;

      result = new HashMap<String, Object>(); 
      result.put("dsplyName", fileName); 
      result.put("fileExt", fileExt);
      result.put("responseCode", responseCode);
      result.put("result", "sucess");
    } catch (IOException e) {
      LOGGER.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
    } catch (IllegalStateException e) {
      LOGGER.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
    }
    return result;
  }
  
  private Map<String, Object> uploadFileCheck(
      MultipartFile formFile
      , Map<String, Object> result
      , String fileExt
      , String fileName ){
    
    if (formFile != null) {

      String eachFileSizeInByte = SystemMessage.getMessage("CKEDIT.EACHFILESIZEINBYTE");
      String allowedFileExt[] = SystemMessage.getMessage("ALLOW.EXCEL.EXTENSION").split(",");

      if (formFile.getSize() > Integer.parseInt(eachFileSizeInByte)) { // 사이즈 제한
        result.put("result", "fail");
        result.put("message", "파일 사이즈가 허용 수치 보다 큽니다.");
        return result;
      }

      // 파일이 없는 경우 처리
      if (fileName == null || "".equals(fileName)) {
        result.put("result", "fail");
        result.put("message", "파일이 첨부되지 않았습니다.");
        return result;
      }

      boolean isAllowed = false;
      for (String allowed : allowedFileExt) {
        if (allowed.equals(fileExt.toLowerCase())) {
          isAllowed = true;
          break;
        }
      }
      // 허용 되지 않은 확장자 검사
      if (!isAllowed) {
        result.put("result", "fail");
        result.put("message", "EXCEL 파일만 업로드 가능합니다.");
        return result;
      }
    } else {
      result.put("result", "fail");
      result.put("message", "INSERT 에러");
      return result;      
    }

    return null;
  }
  
  private Map<String, Object> xlsDataSave(ArrayList<HashMap<String, Object>> list, Map<String, Object> result, HttpServletRequest request,
      HttpServletResponse response, String excelType) {

    try {
      if (!list.isEmpty()) {
        if ("EXCEL01".equals(excelType)) {
          excelService.insertExcel01(list, request, response);
        } else if ("EXCEL02".equals(excelType)) {
          excelService.insertExcel02(list, request, response);
        } else if ("EXCEL03".equals(excelType)) {
          excelService.insertExcel03(list, request, response);
        } else if ("EXCEL04".equals(excelType)) {
          excelService.insertExcel04(list, request, response);
        } else if ("EXCEL05".equals(excelType)) {
          excelService.insertExcel05(list, request, response);
        }
      } else {
        result.put("responseCode", "500");
        result.put("result", "fail");
        result.put("message", "INSERT 에러");
        return result;
      }
    } catch (SQLException e) {
      result.put("result", "fail");
      if (e.getMessage().indexOf("ORA-00001") >= 0) {
        result.put("message", "INSERT 에러 (중복 오류)");
      } else {
        result.put("message", "INSERT 에러");
      }
      return result;
    }

    return null;
  }

  public ArrayList<HashMap<String, Object>> getXlsxData(String filePath, HttpServletRequest request, HttpServletResponse response) throws IOException {

    HttpSession session = request.getSession();
    MSTRSessionUserImpl userInfo = (MSTRSessionUserImpl) session.getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);

    File realPathFile = FileUtils.getFile(filePath);
    FileInputStream fis = new FileInputStream(realPathFile);
    
    XSSFWorkbook workbook = new XSSFWorkbook(fis);

    FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
    ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
    
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.KOREAN);

    int rowindex = 0;
    int columnindex = 0;
    HashMap<String, Object> param;
    // 시트 수 (첫번째에만 존재하므로 0을 준다)
    // 만약 각 시트를 읽기위해서는 FOR문을 한번더 돌려준다
    XSSFSheet sheet = workbook.getSheetAt(0);
    // 행의 수
    int rows = sheet.getPhysicalNumberOfRows();
    for (rowindex = 1; rowindex < rows; rowindex++) {
      // 행을읽는다
      XSSFRow row = sheet.getRow(rowindex);
      
      if (row != null) {
        param = InstanceCreation.cHashMap();

        // 셀의 수
        int cells = row.getPhysicalNumberOfCells();
        for (columnindex = 0; columnindex <= cells; columnindex++) {
          // 셀값을 읽는다
          XSSFCell cell = row.getCell(columnindex);
          // 셀이 빈값일경우를 위한 널체크
          if (cell == null) {
            continue;
          } else {
            xlsxCellData(param, evaluator, cell, formatter, columnindex);
          }
        }

        if (!param.isEmpty()) {
          param.put("USER_ID", userInfo.getMstrUserID());
          param.put("COL0", "01");
          list.add(param);
        }
      }
    }

    return list;
  }

  private void xlsxCellData(
      HashMap<String, Object> param
      , FormulaEvaluator evaluator
      , XSSFCell cell
      , SimpleDateFormat formatter
      , int columnindex){

    String value = "";
    // 타입별로 내용 읽기
    switch (cell.getCellType()) {
      case XSSFCell.CELL_TYPE_FORMULA:
        if (!"".equals(cell.toString())) {
          value = xlsxFormualcData(cell, evaluator);
          break;
        }
      case XSSFCell.CELL_TYPE_NUMERIC:
          value = xlsxNumericData(cell, formatter);
        break;
      case XSSFCell.CELL_TYPE_STRING:
        value =  String.valueOf(cell.getStringCellValue());
        break;
      case XSSFCell.CELL_TYPE_BLANK:
        value = "";
        break;
      case XSSFCell.CELL_TYPE_ERROR:
        value = String.valueOf(cell.getErrorCellValue());
        break;
       default:
       value = "";
       break;
    }
    
    param.put("COL" + (columnindex + 1), value);
  }
  
  private String xlsxFormualcData( XSSFCell cell, FormulaEvaluator evaluator){
    
    String value = "";
    if (evaluator.evaluateFormulaCell(cell) == 0) {
      double fddata = cell.getNumericCellValue();
      value = String.valueOf(fddata);
    } else if (evaluator.evaluateFormulaCell(cell) == 1) {
      value = cell.getStringCellValue();
    } else if (evaluator.evaluateFormulaCell(cell) == 4) {
      boolean fbdata = cell.getBooleanCellValue();
      value = String.valueOf(fbdata);
    }
    
    return value;
  }
  
  private String xlsxNumericData( XSSFCell cell, SimpleDateFormat formatter){
    
    String value = "";
    
    if (HSSFDateUtil.isCellDateFormatted(cell)) {
      value = formatter.format(cell.getDateCellValue());
      // 날짜부분 '-' 없애기
      value = value.replaceAll("[-]", "");
    } else {
      double ddata = cell.getNumericCellValue();
      value = String.valueOf(ddata);

      if (value.length() - 2 == value.lastIndexOf(".0")) { 
        value = value.substring(0, value.length() - 2);
      }

      if (value.indexOf('E') >= 0) {
        value = InstanceCreation.cBigDecimal(String.valueOf(ddata)).toString();
      }
    }
    
    return value;
  }

  public ArrayList<HashMap<String, Object>> getXlsData(String filePath, HttpServletRequest request, HttpServletResponse response) throws IOException {

    File realPathFile = FileUtils.getFile(filePath);
    FileInputStream inputStream = new FileInputStream(realPathFile);

    POIFSFileSystem fileSystem = new POIFSFileSystem(inputStream);
    HSSFWorkbook workbook = new HSSFWorkbook(fileSystem);

    ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();

    int rowindex = 0;
    int columnindex = 0;
    // 시트 수 (첫번째에만 존재하므로 0을 준다)
    // 만약 각 시트를 읽기위해서는 FOR문을 한번더 돌려준다
    HSSFSheet sheet = workbook.getSheetAt(0);

    // 취득된 sheet에서 rows수 취득
    int rows = sheet.getPhysicalNumberOfRows();

    // 취득된 row에서 취득대상 cell수 취득
    int cells = sheet.getRow(0).getPhysicalNumberOfCells();
    HashMap<String, Object> param;
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.KOREAN);

    for (rowindex = 1; rowindex < rows; rowindex++) {
      HSSFRow row = sheet.getRow(rowindex);
      if (row != null) {
        param = InstanceCreation.cHashMap();
        for (columnindex = 0; columnindex < cells; columnindex++) {
          HSSFCell cell = row.getCell(columnindex);

          if (cell == null) {
            continue;
          } else {
            xlsCellData(param, cell, formatter, columnindex);
          }
          if (!param.isEmpty()) {
            param.put("COL0", "01");
            list.add(param);
          }
        } // for(c)

      }

    }
    return list;
  }

  private void xlsCellData(HashMap<String, Object> param, HSSFCell cell, SimpleDateFormat formatter, int columnindex){

      String value = null;
      switch (cell.getCellType()) {
        case HSSFCell.CELL_TYPE_FORMULA:
          value = cell.getCellFormula();
          break;
        case HSSFCell.CELL_TYPE_NUMERIC:
          if (HSSFDateUtil.isCellDateFormatted(cell)) {
            value = formatter.format(cell.getDateCellValue());

            // 날짜부분 '-' 없애기
            value = value.replaceAll("[-]", "");
          } else {

            double ddata = cell.getNumericCellValue();
            value = String.valueOf(ddata);

            if (value.length() - 2 == value.lastIndexOf(".0")) { // 년도 201709 을 201709.0 으로 인식한다.
              value = value.substring(0, value.length() - 2);
            }

            if (value.indexOf('E') >= 0) {
              value = InstanceCreation.cBigDecimal(String.valueOf(ddata)).toString();
            }
          }
          break;
        case HSSFCell.CELL_TYPE_STRING:
          value = String.valueOf(cell.getStringCellValue());
          break;
        case HSSFCell.CELL_TYPE_BLANK:
          value = "";
          break;
        case HSSFCell.CELL_TYPE_ERROR:
          value =  String.valueOf(cell.getErrorCellValue());
          break;
        default:
          value = "[type?]";
          break;
      }
      param.put("COL" + (columnindex + 1), value);
  }

}
