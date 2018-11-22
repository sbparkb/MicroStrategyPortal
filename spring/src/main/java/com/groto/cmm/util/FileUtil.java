package com.groto.cmm.util;

import org.apache.log4j.Logger;


/**
 *  Class Name  :  FileUtil
 *  Description :  화일 처리 유틸
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

public class FileUtil
{
	
	  protected static final Logger LOGGER = Logger.getLogger(FileUtil.class);
  /**
   * path에서 file name 부분을 구한다.
   * <p>
   * 예) FileUtil.getFileName("c:/temp/html.txt"); 의 출력은 <br>
   * <strong>html.txt </strong>이다.
   */
  public static String getFileName(String path)
  {
    if (path == null)
      return null;

    int index = path.lastIndexOf('/');

    if (index < 0)
      return path;

    return path.substring(index + 1);
  }

  /**
   * file 확장자를 구한다.
   * <p>
   * 예) FileUtil.getExtension("c:/temp/html.txt"); 의 출력은
   * <br>
   * <strong>txt </strong>이다.
   */
  public static String getExtension(String fileName)
  {
    if (fileName == null)
      return null;

    int index = fileName.lastIndexOf('.') + 1;

    if (index > 0 && index < fileName.length())
    {
      return fileName.substring(index);
    }

    return null;
  }

  /**
   * 확장자를 없애고 파일명을 구한다.
   * <p>
   * 예) FileUtil.getFileWithNoExtension("c:/temp/html.txt");
   * 의 출력은 <br>
   * <strong>c:/temp/html </strong>이다.
   */
  public static String getFileWithNoExtension(String fileName)
  {
    if (fileName == null)
      return null;

    int index = fileName.lastIndexOf('.');

    if (index >= 0 && index < fileName.length())
    {
      return fileName.substring(0, index);
    }

    return fileName;
  }

  
	/**
 	 * 업로드 가능한 확장자 검사
 	 * @param allowedFileExt
 	 * @param fileExt
 	 * @return
 	 */
 	public static boolean allowedExt(String allowedFileExt[], String fileExt){
    boolean isAllowed = false;
    for (String allowed : allowedFileExt) {
      if (allowed.equals(fileExt)) {
        isAllowed = true;
        break;
      }
    }
    return isAllowed;
 	}
 	
}//end of class