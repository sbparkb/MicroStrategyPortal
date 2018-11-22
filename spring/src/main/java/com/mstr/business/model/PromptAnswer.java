package com.mstr.business.model;

import java.io.Serializable;
import java.util.List;

import com.microstrategy.web.objects.WebElement;

public class PromptAnswer implements Serializable {

	private static final long serialVersionUID = -5470149475210748513L;

	private String objectID;

	private int objectType;
	
	@Override
	public String toString() {
		return "\nPromptAnswer [objectID=" + objectID + ", objectType="
				+ objectType + ", elementID=" + elementID + ", elementType="
				+ elementType + ", displayName=" + displayName
				+ ", displayUnitType=" + displayUnitType + ", defaultAnswer="
				+ defaultAnswer + ", dimensionName=" + dimensionName
				+ ", parentName=" + parentName + ", customAnswer="
				+ customAnswer + ", element=" + element + ", paramValue="
				+ paramValue + ", expElementList=" + expElementList + "]";
	}

	@Deprecated
	private String elementID;

	@Deprecated
	private int elementType;

	private String displayName;

	private int displayUnitType;

	private boolean defaultAnswer;
	
	private String dimensionName;
	
	private String parentName;
	
	private boolean customAnswer;
	
	private WebElement element;
	
	private String exceedLimitYn;
	
	public String getExceedLimitYn() {
		return exceedLimitYn;
	}

	public void setExceedLimitYn(String exceedLimitYn) {
		this.exceedLimitYn = exceedLimitYn;
	}

	@Deprecated
	private String paramValue;
	
	private List<PromptAnswer> expElementList;
	
	/**
	 * @return the objectID
	 */
	public String getObjectID() {
		return objectID;
	}

	/**
	 * @param objectID
	 *        the objectID to set
	 */
	public void setObjectID(String objectID) {
		this.objectID = objectID;
	}

	/**
	 * @return the elementID
	 */
	@Deprecated
	public String getElementID() {
		return elementID;
	}

	/**
	 * @param elementID
	 *        the elementID to set
	 */
	@Deprecated
	public void setElementID(String elementID) {
		this.elementID = elementID;
	}

	/**
	 * @return the elementType
	 */
	@Deprecated
	public int getElementType() {
		return elementType;
	}

	/**
	 * @param elementType
	 *        the elementType to set
	 */
	@Deprecated
	public void setElementType(int elementType) {
		this.elementType = elementType;
	}

	/**
	 * @return the displayName
	 */
	public String getDisplayName() {
		return displayName;
	}

	/**
	 * @param displayName
	 *        the displayName to set
	 */
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	/**
	 * @return the displayUnitType
	 */
	public int getDisplayUnitType() {
		return displayUnitType;
	}

	/**
	 * @param displayUnitType
	 *        the displayUnitType to set
	 */
	public void setDisplayUnitType(int displayUnitType) {
		this.displayUnitType = displayUnitType;
	}

	/**
	 * @return the defaultAnswer
	 */
	public boolean isDefaultAnswer() {
		return defaultAnswer;
	}

	/**
	 * @param defaultAnswer
	 *        the defaultAnswer to set
	 */
	public void setDefaultAnswer(boolean defaultAnswer) {
		this.defaultAnswer = defaultAnswer;
	}

	
	/**
	 * @return the paramValue
	 */
	@Deprecated
	public String getParamValue() {
		return paramValue;
	}

	
	/**
	 * @param paramValue the paramValue to set
	 */
	@Deprecated
	public void setParamValue(String paramValue) {
		this.paramValue = paramValue;
	}

	
	/**
	 * @return the objectType
	 */
	public int getObjectType() {
		return objectType;
	}

	
	/**
	 * @param objectType the objectType to set
	 */
	public void setObjectType(int objectType) {
		this.objectType = objectType;
	}

	
	/**
	 * @return the expElementList
	 */
	public List<PromptAnswer> getExpElementList() {
		return expElementList;
	}

	
	/**
	 * @param expElementList the expElementList to set
	 */
	public void setExpElementList(List<PromptAnswer> expElementList) {
		this.expElementList = expElementList;
	}

	
	/**
	 * @return the customAnswer
	 */
	public boolean isCustomAnswer() {
		return customAnswer;
	}

	
	/**
	 * @param customAnswer the customAnswer to set
	 */
	public void setCustomAnswer(boolean customAnswer) {
		this.customAnswer = customAnswer;
	}

	public String getDimensionName() {
		return dimensionName;
	}

	public void setDimensionName(String dimensionName) {
		this.dimensionName = dimensionName;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public WebElement getElement() {
		return element;
	}

	public void setElement(WebElement element) {
		this.element = element;
	}
	
}
