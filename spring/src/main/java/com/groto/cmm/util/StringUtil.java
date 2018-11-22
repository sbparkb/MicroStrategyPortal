package com.groto.cmm.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.StringTokenizer;

import com.microstrategy.utils.StringUtils;

/**
 *  Class Name  :  StringUtil
 *  Description :  문자 처리 유틸 
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

public class StringUtil extends StringUtils {
	/**
     * 빈<code>String</code>형 배열.
     */
    public static final String[] EMPTY_STRING_ARRAY = new String[0];

    /**
     * 빈 문자열<code>""</code>.
     */
    public static final String EMPTY = "";
    
    // Empty checks
    // -----------------------------------------------------------------------
    /**
     * 주어진 문자열이 빈문자열("")인지 null인지를 검사한다.<br>
     * <ul>
     * <li>StringUtils.isEmpty(null) = true
     * <li>StringUtils.isEmpty(&quot;&quot;) = true
     * <li>StringUtils.isEmpty(&quot; &quot;) = false
     * <li>StringUtils.isEmpty(&quot;bob&quot;) = false
     * <li>StringUtils.isEmpty(&quot; bob &quot;) = false
     * </ul>
     * <p>
     * NOTE: 가능하면 동일한 기능을 하는 isBlank()메소드를 사용하기를 권장한다.<br>
     * </p>
     *
     * @param str
     *            체크하려는 문자열
     * @return
     */
    public static boolean isEmpty(String str) {
        return str == null || str.length() == 0;
    }

    /**
     * 주어진 문자열이 빈문자열("") 또는null값이 아닌지를 검사한다.<br>
     * <ul>
     * <li>StringUtils.isNotEmpty(null) = false
     * <li>StringUtils.isNotEmpty(&quot;&quot;) = false
     * <li>StringUtils.isNotEmpty(&quot; &quot;) = true
     * <li>StringUtils.isNotEmpty(&quot;bob&quot;) = true
     * <li>StringUtils.isNotEmpty(&quot; bob &quot;) = true
     * </ul>
     *
     * @param str
     *            체크하려는 문자열
     * @return
     */
    public static boolean isNotEmpty(String str) {
        return str != null && str.length() > 0;
    }

    /**
     * 체크하려는 문자열이 공백문자("")이거나 아무문자도 없는 Whitespace 또는 null인지를 검사한다.
     * <ul>
     * <li>StringUtils.isBlank(null) = true
     * <li>StringUtils.isBlank(&quot;&quot;) = true
     * <li>StringUtils.isBlank(&quot; &quot;) = true
     * <li>StringUtils.isBlank(&quot;bob&quot;) = false
     * <li>StringUtils.isBlank(&quot; bob &quot;) = false
     * </ul>
     *
     * @param str
     *            검사하려는 문자열
     * @return
     */
    public static boolean isBlank(String paramStr) {
        int strLen;
        String str = NVL(paramStr);
        strLen= str.length();
        if (str == null || strLen == 0) {
            return true;
        }
        for (int i = 0; i < strLen; i++) {
            if (!Character.isWhitespace(str.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    /**
     * 체크하려는 문자열이 공백문자("")이거나 아무문자도 없는 Whitespace 또는 null이 아닌지를 검사한다.<br>
     * <ul>
     * <li>StringUtils.isNotBlank(null) = false
     * <li>StringUtils.isNotBlank(&quot;&quot;) = false
     * <li>StringUtils.isNotBlank(&quot; &quot;) = false
     * <li>StringUtils.isNotBlank(&quot;bob&quot;) = true
     * <li>StringUtils.isNotBlank(&quot; bob &quot;) = true
     * </ul>
     *
     * @param str
     *            검사하려는 문자열
     * @return
     */
    public static boolean isNotBlank(String paramStr) {
        int strLen;
        String str = NVL(paramStr);
        strLen = str.length();
        if (str == null || strLen == 0) {
            return false;
        }
        for (int i = 0; i < strLen; i++) {
            if (!Character.isWhitespace(str.charAt(i))) {
                return true;
            }
        }
        return false;
    }

    // Defaults
    // -----------------------------------------------------------------------
    /**
     * 체크하려는 문자열이 null인경우 기본 문자("")를 반환 하며, null이 아닌경우 원 값을 다시 반환한다.<br>
     * <ul>
     * <li>StringUtils.defaultString(null) = &quot;&quot;
     * <li>StringUtils.defaultString(&quot;&quot;) = &quot;&quot;
     * <li>StringUtils.defaultString(&quot;bat&quot;) = &quot;bat&quot;
     * </ul>
     *
     * @see String#valueOf(Object)
     * @param str
     *            체크하려는 문자열
     * @return
     */
    public static String defaultString(String str) {
        return str == null ? EMPTY : str;
    }

    /**
     * 체크하려는 문자열이 null인경우 기본 문자(<code>defaultStr</code>)를 반환 하며, null이 아닌경우
     * 원 값을 다시 반환한다.<br>
     * <ul>
     * <li>StringUtils.defaultString(null, &quot;NULL&quot;) = &quot;NULL&quot;
     * <li>StringUtils.defaultString(&quot;&quot;, &quot;NULL&quot;) =
     * &quot;&quot;
     * <li>StringUtils.defaultString(&quot;bat&quot;, &quot;NULL&quot;) =
     * &quot;bat&quot;
     * </ul>
     *
     * @see String#valueOf(Object)
     * @param str
     *            체크하려는 문자열
     * @param defaultStr
     *            기본 문자열 지정, 만일 입력값이<code>null</code>인경우 null을 반환할것이다.
     * @return
     */
    public static String defaultString(String str, String defaultStr) {
        return str == null ? defaultStr : str;
    }

    /**
     * 체크하려는 문자열이 빈문자열이거나<code>null</code>인경우 지정된 <code>defaultStr</code>값을
     * 반환하며 아닌경우 본 문자열을 반환한다.<br>
     * <ul>
     * <li>StringUtils.defaultIfEmpty(null, &quot;NULL&quot;) =
     * &quot;NULL&quot;
     * <li>StringUtils.defaultIfEmpty(&quot;&quot;, &quot;NULL&quot;) =
     * &quot;NULL&quot;
     * <li>StringUtils.defaultIfEmpty(&quot;bat&quot;, &quot;NULL&quot;) =
     * &quot;bat&quot;
     * </ul>
     *
     * @see StringUtils#defaultString(String, String)
     * @param str
     *            체크하려는 문자열
     * @param defaultStr
     *            기본 문자열 지정, 기본 지정 문자열이 빈문자이거나("") <code>null</code>인경우
     *            null값을 반환할것이다.
     * @return
     */
    public static String defaultIfEmpty(String str, String defaultStr) {
        return isEmpty(str) ? defaultStr : str;
    }

    public static String NVL(String paramString) {
		if (paramString == null) return "";
		return paramString;
	}

	public static String NVL(String paramString1, String paramString2) {
		if (paramString1 == null || paramString1.length() <= 0) return paramString2;
		return paramString1;
	}

	public static String escapeHtmlString(String text) {

		if (text == null || text.equals(""))
			return "";

		StringBuffer sb = new StringBuffer(text);
		sb = escapeHtmlString1(sb);
		sb = escapeHtmlString2(sb);
		
		return sb.toString();
	}	
	
	/**
	 * PMD 높은 복잡도 문제로 인해 2개로 분리 
	 * */
	private static StringBuffer escapeHtmlString1(StringBuffer sb){
	  char ch;
	  for (int i = 0; i < sb.length(); i++) {
      ch = sb.charAt(i);
      if (ch == '<') {
        sb.replace(i, i + 1, "&lt;");
        i += 3;
      } else if (ch == '>') {
        sb.replace(i, i + 1, "&gt;");
        i += 3;
      } else if (ch == '&') {
        sb.replace(i, i + 1, "&amp;");
        i += 4;
      } else if (ch == '\'') {
        sb.replace(i, i + 1, "&#39;");
        i += 4;
      }
	  }
	  return sb;
	}
  
  /**
   * PMD 높은 복잡도 문제로 인해 2개로 분리 
   * */
  private static StringBuffer escapeHtmlString2(StringBuffer sb){
    char ch;
    for (int i = 0; i < sb.length(); i++) {
      ch = sb.charAt(i);
      if (ch == '"') {
        sb.replace(i, i + 1, "&quot;");
        i += 5;
      }else if (ch == ' ') {
        sb.replace(i, i + 1, "&nbsp;");
        i += 5;
      }  else if (ch == '\r' && sb.charAt(i + 1) == '\n') {
        sb.replace(i, i + 2, "<BR>");
        i += 3;
      }else if (ch == '\n') {
        sb.replace(i, i + 1, "<BR>");
        i += 3;
      }
    }
    return sb;
  }
	
	 public static Locale parseLocaleString(String localeString) {
	    String[] parts = tokenizeToStringArray(localeString, "_ ", false, false);
	    String language = parts.length > 0 ? parts[0] : "";
	    String country = parts.length > 1 ? parts[1] : "";
	    String variant = parts.length > 2 ? parts[2] : "";
	    return language.length() > 0 ? new Locale(language, country, variant) : null;
	  }

	 public static String[] tokenizeToStringArray(String str, String delimiters) {
	    return tokenizeToStringArray(str, delimiters, true, true);
	  }

	  public static String[] tokenizeToStringArray(String str, String delimiters, boolean trimTokens, boolean ignoreEmptyTokens) {
	    StringTokenizer st = new StringTokenizer(str, delimiters);
	    List<String> tokens = new ArrayList<String>();
	    while (st.hasMoreTokens()) {
	      String token = st.nextToken();
	      if (trimTokens) {
	        token = token.trim();
	      }
	      if (!(ignoreEmptyTokens) || token.length() > 0) {
	        tokens.add(token);
	      }
	    }
	    return (String[]) (String[]) tokens.toArray(new String[tokens.size()]);
	  }


}
