package com.groto.cmm.util;

import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *  Class Name  :  XSSUtil
 *  Description :  Xss 공격 관련 필터
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 9. 23.  lastpice Generation
 *
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 9. 23. 오후 1:40:28
 * @version : 
 */

public class XSSUtil {
	
	// XSS filter pattern compile
  private static Pattern pattern1 = Pattern.compile("<([^>]*) on([A-Z]+)[\t\n\r ]*=([^>]*)>", Pattern.CASE_INSENSITIVE);	
  private static Pattern pattern2 = Pattern.compile("<([^>]*)(?:/\\*(?:.|\\s)*?\\*/)([^>]*)>", Pattern.CASE_INSENSITIVE);
  private static Pattern pattern3 = Pattern.compile("<([^>]*)(?:/\\*(?:.|\\s)*?\\*/)([^>]*)>", Pattern.CASE_INSENSITIVE);
  private static Pattern pattern4 = Pattern.compile("<([^>]*) style[\t\n\r ]*=[\'\"xss: ]*expression[\'\" ]*([^>]*)>", Pattern.CASE_INSENSITIVE);
  private static Pattern pattern5 = Pattern.compile("<[\t\n\r ]*/?[\t\n\r ]*SCRIPT[\t\n\r ]*[^>]*>", Pattern.CASE_INSENSITIVE);
  private static Pattern pattern6 = Pattern.compile("<[^>]+((j|&#(106|x6A)[;]*)[\t\n\r]*(a|&#(97|x61)[;]*)[\t\n\r ]*(v|&#(118|x76)[;]*)[\t\n\r]*(a|&#(97|x61)[;]*)|v[\t\n\r]*b)[\t\n\r]*(s|&#(115|x73)[;]*)[\t\n\r]*(c|&#(99|x63)[;]*)[\t\n\r]*(r|&#(114|x72)[;]*)[\t\n\r]*(i|&#(105|x69)[;]*)[\t\n\r]*(p|&#(112|x70)[;]*)[\t\n\r]*(t|&#(116|x74)[;]*)[\t\n\r]*(:|&#(58|x3A)[;]*)[^>]+>", Pattern.CASE_INSENSITIVE);
  private static Pattern pattern7 = Pattern.compile("<[\t\n\r ]*META[^>]*>", Pattern.CASE_INSENSITIVE);
  private static Pattern pattern8 = Pattern.compile("<[\t\n\r ]*/?[\t\n\r ]*IFRAME[^>]*>",  Pattern.CASE_INSENSITIVE);
  private static Pattern pattern9 = Pattern.compile("<[\t\n\r ]*LINK[^>]*>", Pattern.CASE_INSENSITIVE);
  private static Pattern pattern10=Pattern.compile("<[\t\n\r ]*/?[\t\n\r ]*FORM[^>]*>", Pattern.CASE_INSENSITIVE);
  private static Pattern pattern11=Pattern.compile("<([^>]*) TYPE[\t\n\r ]*=[\'\" ]*text/x-scriptlet[\'\" ]*([^>]*)>",Pattern.CASE_INSENSITIVE);    
  private static Pattern pattern12=Pattern.compile("<([^>]*) name[\t\n\r ]*=[\'\" ]*AllowScriptAccess[\'\" ]* value[\t\n\r ]*=[\'\" ]*always[\'\" ]*([^>]*)>", Pattern.CASE_INSENSITIVE);
  private static Pattern pattern13=Pattern.compile("<([^>]*) AllowScriptAccess[\t\n\r ]*=[\'\" ]*always[\'\" ]*([^>]*)>", Pattern.CASE_INSENSITIVE);
  
  private static final Logger LOGGER = LoggerFactory.getLogger(XSSUtil.class); 
	
	public static String replaceHtmlTag(String paramStr){

	     String str = paramStr;
  		 String strLow = "";
  		 str = str.replaceAll("<","&lt;");
       str = str.replaceAll(">","&gt;");
         
        // 특수 문자 제거
        str = str.replaceAll("\"","&gt;");
        str = str.replaceAll("&", "&amp;");
        str = str.replaceAll("%00", null);
        str = str.replaceAll("\"", "&#34;");
        str = str.replaceAll("\'", "&#39;");
        str = str.replaceAll("%", "&#37;");    
        str = str.replaceAll("../", "");
        str = str.replaceAll("..\\\\", "");
        str = str.replaceAll("./", "");
        str = str.replaceAll("%2F", "");
        // 허용할 HTML tag만 변경
        str = str.replaceAll("&lt;p&gt;", "<p>");
        str = str.replaceAll("&lt;P&gt;", "<P>");
        str = str.replaceAll("&lt;br&gt;", "<br>");
        str = str.replaceAll("&lt;BR&gt;", "<BR>");
        strLow= str.toLowerCase();
        str = strLow;
        
        str = str.replaceAll("javascript", "x-javascript");
        str = str.replaceAll("script", "x-script");
        str = str.replaceAll("iframe", "x-iframe");
        str = str.replaceAll("document", "x-document");
        str = str.replaceAll("vbscript", "x-vbscript");
        str = str.replaceAll("applet", "x-applet");
        str = str.replaceAll("embed", "x-embed");
        str = str.replaceAll("object", "x-object");
        str = str.replaceAll("frame", "x-frame");    
        str = str.replaceAll("grameset", "x-grameset");
        str = str.replaceAll("layer", "x-layer");
        str = str.replaceAll("bgsound", "x-bgsound");
        str = str.replaceAll("alert", "x-alert");
        str = str.replaceAll("onblur", "x-onblur");
        str = str.replaceAll("onchange", "x-onchange"); 
        str = str.replaceAll("onclick", "x-onclick");
        str = str.replaceAll("ondblclick","x-ondblclick");
        str = str.replaceAll("enerror", "x-enerror");
        str = str.replaceAll("onfocus", "x-onfocus");
        str = str.replaceAll("onload", "x-onload");
        str = str.replaceAll("onmouse", "x-onmouse");
        str = str.replaceAll("onscroll", "x-onscroll");
        str = str.replaceAll("onsubmit", "x-onsubmit");
        str = str.replaceAll("onunload", "x-onunload");
         
        String temp = str;
        return temp;
	}
	
	/**
	 * 파라미터로 받은 String변수의 Html및 스크립트를 변환 수행
	 * @param contents			- String
	 * @return
	 */
	public static String xssFilter(String paramContents) {
	    String contents = paramContents;
	  
       try {
                     
            // 태그내(<>)에 on으로 시작하는 함수명 앞에 no-를 추가
            // before : <tr onmouseover="alert('test')">
            // after : <tr no-onmouseover="alert('test')">
            contents = pattern1.matcher(contents).replaceAll("<$1 no-on$2=$3>");

            // 태그내 /* */주석 제거
            while( pattern2.matcher(contents).find()){
                contents = pattern3.matcher(contents).replaceAll("<$1$2>");
            }

            // 태그내(<>)에 style속성내에 expression이후 속성을 제거
            // befor : <IMG STYLE="xss:e/*XSS*/xpression(alert('XSS'))">
            // after : <IMG no-style>
            contents = pattern4.matcher(contents)
                    .replaceAll("<$1>");
                        
            // script  태그를 주석처리함.
            // before : <SCRIPT/XSS SRC="http://xxxx/xss.js"></SCRIPT>
            // after : <no-script></no-script>
            contents = pattern5.matcher(contents).replaceAll("<!--<script>-->");
            
            // 태그내(<>) javascript문자열 또는 unicode로 변환된 javascript가 들어 있는 태그를 주석처리함.
            // before : <LINK REL="stylesheet" HREF="javascript:alert('XSS');">
            // after : <no-javascript>
            // before :<IMG SRC=&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;>
            // after : <no-javascript>
            contents = pattern6.matcher(contents)
                    .replaceAll("<!--<javascript>-->");
            
            
            // meta 태그를 주석처리함
            // before : <META HTTP-EQUIV="refresh" CONTENT="0;url=data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K">
            // after : <!--<meta>-->
            contents = pattern7.matcher(contents).replaceAll("<!--<meta>-->");

            // iframe 태그를 주석처리함
            // before : <IFRAME SRC=http://ha.ckers.org/scriptlet.html/>
            // after : <!--<iframe>-->
            contents = pattern8 .matcher(contents).replaceAll("<!--<iframe>-->");
            

            // link 태그를 주석처리함
            // before : <LINK REL="stylesheet" HREF="http://ha.ckers.org/xss.css">
            // after : <!--<link>-->
            contents = pattern9
                    .matcher(contents).replaceAll("<!--<link>-->");
            
            // form 태그를 주석처리함   
            // before : <form name=\"formName\" action=\xss.php\">
            // after : <!--<form>-->            
            contents =pattern10
                    .matcher(contents).replaceAll("<!--<form>-->");


            // 태그내에 text/x-scriptlet을 text/plain으로 변경
            // before : <OBJECT TYPE="text/x-scriptlet" DATA="http://ha.ckers.org/scriptlet.html">
            // after : <OBJECT TYPE="text/plain" DATA="http://ha.ckers.org/scriptlet.html"/>        
            contents = pattern11.matcher(contents)
                    .replaceAll("<$1 TYPE=\"text/plain\" $2>");
            
            // 태그내에 name="AllowScriptAccess" value="always" 를 name="AllowScriptAccess" value="naver" 변경.
            // before: <object width="480" height="385">
            //               <param name="movie" value="http://www.youtube.com/v/nhcdFSUA4TI?fs=1&amp;hl=ko_KR"></param>
            //               <param name="allowFullScreen" value="true"></param>
            //               <param name="allowScriptAccess" value="always"></param>
            //               <embed src="http://www.youtube.com/v/nhcdFSUA4TI?fs=1&amp;hl=ko_KR" type="application/x-shockwave-flash" allowScriptAccess="allways" allowfullscreen="true" width="480" height="385"></embed>
            //            </object>
            // after: <object width="480" height="385">
            //               <param name="movie" value="http://www.youtube.com/v/nhcdFSUA4TI?fs=1&amp;hl=ko_KR"></param>
            //               <param name="allowFullScreen" value="true"></param>
            //               <param name="allowScriptAccess" value="never"></param>
            //               <embed src="http://www.youtube.com/v/nhcdFSUA4TI?fs=1&amp;hl=ko_KR" type="application/x-shockwave-flash" allowScriptAccess="never" allowfullscreen="true" width="480" height="385"></embed>
            //            </object>
            contents = pattern12.matcher(contents)
                    .replaceAll("<$1 name=\"allowScriptAccess\" value=\"never\" $2>");
            
//            contents = contents.replaceAll("\'", "&#39;");
//            contents = contents.replaceAll("\"", "&#34;");
            // 태그내에 AllowScriptAccess=always를 never로 변경.
            // before : <EMBED SRC="http://ha.ckers.org/xss.swf" AllowScriptAccess="always">
            // after : <EMBED SRC="http://ha.ckers.org/xss.swf" AllowScriptAccess="never" >
            contents =pattern13.matcher(contents)
                    .replaceAll("<$1 allowScriptAccess=\"never\" $2>");
            
        } catch (PatternSyntaxException e) {
          LOGGER.error(CmmUtil.exMessage(e));
        }
        return contents;
    }

}
