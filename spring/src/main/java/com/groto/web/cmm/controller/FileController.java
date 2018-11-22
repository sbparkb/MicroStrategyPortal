package com.groto.web.cmm.controller;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.DateUtil;
import com.groto.cmm.util.FileUtil;
import com.groto.cmm.util.SystemMessage;

/**
 *  Class Name  :  FileController
 *  Description :  화일 처리 
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 12. 15. lastpice Generation
 *
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 12. 15. 오전 9:13:45
 * @version :
 */ 
 

@Controller
@RequestMapping(value = "/file")
public class FileController {

	  protected static final Logger LOGGER = Logger.getLogger(FileController.class);
	  
    String uploadFileName="";
    String fileName="";
    String fileExt="";
    String tempPath ="";

    /**
     * <pre>
     * 임시파일 저장
     * </pre>
     *
     * @param request
     * @param response
     * @param myfile
     * @param model
     * @return
     *
     */
  @RequestMapping(value = "/filetempsave", method = RequestMethod.POST)
  public String filetempsave(HttpServletRequest request, HttpServletResponse response, MultipartFile myfile, Model model) {

    if (myfile == null)
      return "";

    String responseCode = "500"; // 성공시 200, 업로드 작업 실패시 500, 인증 실패시 401, 용량초과시 413
    File uploadedFile = null;

    // 파일 체크
    boolean isUploadableFile = true;
    MultipartFile formFile = myfile;

    try {

      String eachFileSizeInByte = SystemMessage.getMessage("CKEDIT.EACHFILESIZEINBYTE"); // ConfigUtil.getInt("attachment.file-check.eachFileSizeInByte");

      String allowFileExtensions = SystemMessage.getMessage("ALLOW.FILE.EXTENSION"); // SystemMessage.getMessage("attachment.file-check.allowFileExtensions");
      String disallowFileExtensions = SystemMessage.getMessage("DISALLOW.FILE.EXTENSIONS"); // SystemMessage.getMessage("attachment.file-check.disallowFileExtensions");

      // 확장자 : 확장자가 없는 경우 "null" 반환
      fileExt = CmmUtil.nvl(FileUtil.getExtension(formFile.getOriginalFilename()), "null");

      // 확장자를 배제한 파일명
      fileName = FileUtil.getFileWithNoExtension(formFile.getOriginalFilename());
      fileName = formFile.getOriginalFilename().substring(0, formFile.getOriginalFilename().lastIndexOf("."));
      
      responseCode = getResponseCode(formFile, eachFileSizeInByte, allowFileExtensions, disallowFileExtensions);
     
      if(!"".equals(responseCode)){
        isUploadableFile = false;
      }

      if (isUploadableFile) {
        // 디렉토리
        tempPath = SystemMessage.getMessage("URL.UPLOAD.TEMP.FILE"); // environment.getProperty("URL.DOWNLOAD.CKEDITORIMAG");
        LOGGER.debug(this.getClass().toString().replaceAll("[\r\n]", "") + ":tempPath = " + tempPath.replaceAll("[\r\n]", ""));
        tempPath = tempPath + "/" + DateUtil.getDate();
        File tempDirectory = FileUtils.getFile(tempPath);
        
        if (!tempDirectory.exists()) {
          boolean tf = tempDirectory.mkdirs();
          LOGGER.debug(tf);
        }

        // 업로드
        uploadFileName = "se_tempfile_" + UUID.randomUUID().toString() + "." + FileUtil.getExtension(formFile.getOriginalFilename());
        uploadedFile = FileUtils.getFile(tempPath + "/" + uploadFileName);
        formFile.transferTo(uploadedFile);
        responseCode = "200";

        if (LOGGER.isDebugEnabled()) {
          LOGGER.debug("tempDirectory : " + tempDirectory.toString().replaceAll("[\r\n]", ""));
          LOGGER.debug("uploadedFile.getName() : " + uploadedFile.getName().replaceAll("[\r\n]", ""));
        }

      }
      model.addAttribute("tempPath", tempPath);
      model.addAttribute("fileName", uploadFileName);// 임시 파일명
      model.addAttribute("dsplyName", fileName); //
      model.addAttribute("fileExt", fileExt);
      model.addAttribute("size", formFile.getSize());
      model.addAttribute("responseCode", responseCode);
    } catch (IOException e) {
      LOGGER.error(this.getClass().getName() + " , " + this.getClass().getSimpleName().replaceAll("[\r\n]", "") + "[ "+ CmmUtil.exMessage(e) + " ]");
      responseCode = "500";
      model.addAttribute("responseCode", responseCode);
    } catch (IllegalStateException e) {
      LOGGER.error(this.getClass().getName() + " , " + this.getClass().getSimpleName().replaceAll("[\r\n]", "") + "[ " + CmmUtil.exMessage(e) + " ]");
      responseCode = "500";
      model.addAttribute("responseCode", responseCode);
    }

    return "textJsonView";
  }
  
  /**
   * PDM 대응 - 메소드 복잡도 가소를 위한 조치
   * @return
   */
  private String getResponseCode(MultipartFile formFile, String eachFileSizeInByte, String allowFileExtensions, String disallowFileExtensions){
    
    fileName = FileUtil.getFileWithNoExtension(formFile.getOriginalFilename());
    fileName = formFile.getOriginalFilename().substring(0, formFile.getOriginalFilename().lastIndexOf("."));
    if (formFile.getSize() > Integer.parseInt(eachFileSizeInByte)) { // 사이즈 제한
      return "413";
    } else if (!allowFileExtensions.equals("") && (allowFileExtensions.toUpperCase()).indexOf(fileExt.toUpperCase()) < 0) { // 허용
      return "403";
    } else if (!disallowFileExtensions.equals("") && (disallowFileExtensions.toUpperCase()).indexOf(fileExt.toUpperCase()) > -1) { // 제한
      return "403";
    }
    
    return "";
  }

    /**
     * <pre>
     * 임시파일 삭제
     * </pre>
     *
     * @param request
     * @param response
     * @param filedelNamedata
     * @param tempdelPath
     * @param model
     * @return
     *
     */
    @RequestMapping(value = "/delfile", method = RequestMethod.POST)
    public String delfile(
    		HttpServletRequest request
    		,HttpServletResponse response
    		  ,@RequestParam(value = "filedelNamedata", required = true) String filedelNamedata
    		  ,@RequestParam(value = "tempdelPath", required = true) String tempdelPath
    		,Model model) {
    	
    	try {
    	     if (LOGGER.isDebugEnabled()) {
                 LOGGER.debug("========== AttachmentAction File Upload [[ ==========");
                 LOGGER.debug("filedelNamedata : " + filedelNamedata.replaceAll("[\r\n]",""));
                 LOGGER.debug("tempdelPath : " + tempdelPath.replaceAll("[\r\n]",""));
             }
//    	     File file = new File(tempdelPath+"/"+filedelNamedata.replaceAll("[\r\n]",""));
    	     File file = FileUtils.getFile(tempdelPath+"/"+ filedelNamedata.replaceAll("[\r\n]", ""));
    	     file.delete();
		} catch (SecurityException e) {
			LOGGER.error(this.getClass().getName()+" , "+this.getClass().getSimpleName().replaceAll("[\r\n]","")+"[ " + CmmUtil.exMessage(e) + " ]");
		}
    	model.addAttribute("fileName", filedelNamedata);//임시 파일명
    	return  "textJsonView";
    }    
    
    public String getUploadFileName() {
      return uploadFileName;
    }

    public void setUploadFileName(String uploadFileName) {
      this.uploadFileName = uploadFileName;
    }

    public String getFileName() {
      return fileName;
    }

    public void setFileName(String fileName) {
      this.fileName = fileName;
    }

    public String getFileExt() {
      return fileExt;
    }

    public void setFileExt(String fileExt) {
      this.fileExt = fileExt;
    }

    public String getTempPath() {
      return tempPath;
    }

    public void setTempPath(String tempPath) {
      this.tempPath = tempPath;
    }

}