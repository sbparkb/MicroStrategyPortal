package com.mstr.business.model;

import java.io.Serializable;

public class ObjectInfo implements Serializable {

	private static final long serialVersionUID = -6100618158277730338L;

	protected String objectID;

	protected String displayName;

	protected String description;

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
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description
	 *        the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

}
