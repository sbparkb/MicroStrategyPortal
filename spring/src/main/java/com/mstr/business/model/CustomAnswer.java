package com.mstr.business.model;

import java.io.Serializable;

public class CustomAnswer implements Serializable {

	private static final long serialVersionUID = 6827270629438053587L;

	/**
	 * CustomAnswer Key
	 */
	private String key;

	/**
	 * CustomAnswer Value
	 */
	private String value;

	/**
	 * error key
	 */
	private String errorKey;

	/**
	 * error value
	 */
	private String errorValue;

	public CustomAnswer() {
		
	}
	
	public CustomAnswer(String key, String value) {
		this.key = key;
		this.value = value;
	}
	
	public CustomAnswer(String key, String value, String errorKey, String errorValue) {
		this.key = key;
		this.value = value;
		this.errorKey = errorKey;
		this.errorValue = errorValue;
	}
	
	/**
	 * @return the key
	 */
	public String getKey() {
		return key;
	}

	/**
	 * @param key
	 *        the key to set
	 */
	public void setKey(String key) {
		this.key = key;
	}

	/**
	 * @return the value
	 */
	public String getValue() {
		return value;
	}

	/**
	 * @param value
	 *        the value to set
	 */
	public void setValue(String value) {
		this.value = value;
	}

	/**
	 * @return the errorKey
	 */
	public String getErrorKey() {
		return errorKey;
	}

	/**
	 * @param errorKey
	 *        the errorKey to set
	 */
	public void setErrorKey(String errorKey) {
		this.errorKey = errorKey;
	}

	/**
	 * @return the errorValue
	 */
	public String getErrorValue() {
		return errorValue;
	}

	/**
	 * @param errorValue
	 *        the errorValue to set
	 */
	public void setErrorValue(String errorValue) {
		this.errorValue = errorValue;
	}

}
