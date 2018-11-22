package com.mstr.business.model;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

import com.microstrategy.web.objects.WebConstantPrompt;
import com.microstrategy.web.objects.WebDisplayUnits;

public class PromptInfo implements Serializable {

  private static final long serialVersionUID = 8851928325575873589L;

  private int pin;
  private String name;
  private String title;
  private String meaning;
  private boolean closed;
  private boolean used;
  private boolean required;
  private String min;
  private String max;
  private boolean originalAnswer;
  private boolean defaultAnswer;
  private String reportID;
  private int orgPIN;
  private transient boolean isCustTag;
  private WebDisplayUnits childUnits;
  private String description;
  private String displayName;
  private int displayUnitType;
  private String id;
  private int promptType;
  private int type;
  private int childUnitCnt;

  private WebConstantPrompt webConPrompt;

  /**
   * displayStyle 1 : Text box 2 : Option button 3 : CheckBox 4 : List 5 : Pull down 6 : Cart 7 :
   * Tree
   */
  private int displayStyleValue;

  private List<PromptAnswer> promptAnswerList;

  private String[] mstrParamValues;

  private String[] mstrInputParamValues;

  /**
   * @return the name
   */
  public String getName() {
    return name;
  }

  /**
   * @param name the name to set
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * @return the title
   */
  public String getTitle() {
    return title;
  }

  /**
   * @param title the title to set
   */
  public void setTitle(String title) {
    this.title = title;
  }

  /**
   * @return the meaning
   */
  public String getMeaning() {
    return meaning;
  }

  /**
   * @param meaning the meaning to set
   */
  public void setMeaning(String meaning) {
    this.meaning = meaning;
  }

  /**
   * @return the closed
   */
  public boolean isClosed() {
    return closed;
  }

  /**
   * @param closed the closed to set
   */
  public void setClosed(boolean closed) {
    this.closed = closed;
  }

  /**
   * @return the used
   */
  public boolean isUsed() {
    return used;
  }

  /**
   * @param used the used to set
   */
  public void setUsed(boolean used) {
    this.used = used;
  }

  /**
   * @return the required
   */
  public boolean isRequired() {
    return required;
  }

  /**
   * @param required the required to set
   */
  public void setRequired(boolean required) {
    this.required = required;
  }

  /**
   * @return the min
   */
  public String getMin() {
    return min;
  }

  /**
   * @param min the min to set
   */
  public void setMin(String min) {
    this.min = min;
  }

  /**
   * @return the max
   */
  public String getMax() {
    return max;
  }

  /**
   * @param max the max to set
   */
  public void setMax(String max) {
    this.max = max;
  }

  /**
   * @return the originalAnswer
   */
  public boolean isOriginalAnswer() {
    return originalAnswer;
  }

  /**
   * @param originalAnswer the originalAnswer to set
   */
  public void setOriginalAnswer(boolean originalAnswer) {
    this.originalAnswer = originalAnswer;
  }

  /**
   * @return the defaultAnswer
   */
  public boolean isDefaultAnswer() {
    return defaultAnswer;
  }

  /**
   * @param defaultAnswer the defaultAnswer to set
   */
  public void setDefaultAnswer(boolean defaultAnswer) {
    this.defaultAnswer = defaultAnswer;
  }

  /**
   * @return the promptAnswerList
   */
  public List<PromptAnswer> getPromptAnswerList() {
    return promptAnswerList;
  }

  /**
   * @param promptAnswerList the promptAnswerList to set
   */
  public void setPromptAnswerList(List<PromptAnswer> promptAnswerList) {
    this.promptAnswerList = promptAnswerList;
  }

  /**
   * @return the mstrParamValues
   */
  public String[] getMstrParamValues() {
    if(mstrParamValues == null) return null;
    String [] retMstrParamValues = Arrays.copyOf(mstrParamValues, mstrParamValues.length);
    return retMstrParamValues;
  }

  /**
   * @param mstrParamValues the mstrParamValues to set
   */
  public void setMstrParamValues(String[] mstrParamValues) {
    // 배열 복사하여 저장 (PMD)
    if (mstrParamValues == null) {
        this.mstrParamValues = null;
    } else {
        this.mstrParamValues = new String[mstrParamValues.length];
        System.arraycopy(mstrParamValues, 0,  this.mstrParamValues, 0,mstrParamValues.length);
    }
  }

  /**
   * @return the displayStyleValue
   */
  public int getDisplayStyleValue() {
    return displayStyleValue;
  }

  /**
   * @param displayStyleValue the displayStyleValue to set
   */
  public void setDisplayStyleValue(int displayStyleValue) {
    this.displayStyleValue = displayStyleValue;
  }

  public WebDisplayUnits getChildUnits() {
    return childUnits;
  }

  public void setChildUnits(WebDisplayUnits childUnits) {
    this.childUnits = childUnits;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getDisplayName() {
    return displayName;
  }

  public void setDisplayName(String displayName) {
    this.displayName = displayName;
  }

  public int getDisplayUnitType() {
    return displayUnitType;
  }

  public void setDisplayUnitType(int displayUnitType) {
    this.displayUnitType = displayUnitType;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public int getPromptType() {
    return promptType;
  }

  public void setPromptType(int promptType) {
    this.promptType = promptType;
  }

  public int getType() {
    return type;
  }

  public void setType(int type) {
    this.type = type;
  }

  public int getChildUnitCnt() {
    return childUnitCnt;
  }

  public void setChildUnitCnt(int childUnitCnt) {
    this.childUnitCnt = childUnitCnt;
  }

  public String[] getMstrInputParamValues() {
    if(mstrInputParamValues == null) return null;
    String [] retMstrInputParamValues = Arrays.copyOf(mstrInputParamValues, mstrInputParamValues.length);
    return retMstrInputParamValues;
  }

  public void setMstrInputParamValues(String[] mstrInputParamValues) {
    
    // 배열 복사하여 저장 (PMD)
    if (mstrInputParamValues == null) {
        this.mstrInputParamValues = null;
    } else {
        this.mstrInputParamValues = new String[mstrInputParamValues.length];
        System.arraycopy(mstrInputParamValues, 0,  this.mstrInputParamValues, 0,mstrInputParamValues.length);
    }
  }

  public WebConstantPrompt getWebConPrompt() {
    return webConPrompt;
  }

  public void setWebConPrompt(WebConstantPrompt webConPrompt) {
    this.webConPrompt = webConPrompt;
  }

  @Override
  public String toString() {
    return "PromptInfo [PIN=" + pin + ", name=" + name + ", title=" + title + ", meaning=" + meaning + ", closed=" + closed + ", used="
        + used + ", required=" + required + ", min=" + min + ", max=" + max + ", originalAnswer=" + originalAnswer + ", defaultAnswer="
        + defaultAnswer + ", childUnits=" + childUnits + ", description=" + description + ", displayName=" + displayName
        + ", displayUnitType=" + displayUnitType + ", id=" + id + ", promptType=" + promptType + ", type=" + type + ", childUnitCnt="
        + childUnitCnt + ", webConPrompt=" + webConPrompt + ", displayStyleValue=" + displayStyleValue + ", promptAnswerList="
        + promptAnswerList + ", mstrParamValues=" + Arrays.toString(mstrParamValues) + ", mstrInputParamValues="
        + Arrays.toString(mstrInputParamValues) + "]";
  }

  public String getReportID() {
    return reportID;
  }

  public void setReportID(String reportID) {
    this.reportID = reportID;
  }

  public int getOrgPIN() {
    return orgPIN;
  }

  public void setOrgPIN(int orgPIN) {
    this.orgPIN = orgPIN;
  }

  public boolean isCustTag() {
    return isCustTag;
  }

  public void setCustTag(boolean isCustTag) {
    this.isCustTag = isCustTag;
  }

  public int getPin() {
    return pin;
  }

  public void setPin(int pin) {
    this.pin = pin;
  }

}
