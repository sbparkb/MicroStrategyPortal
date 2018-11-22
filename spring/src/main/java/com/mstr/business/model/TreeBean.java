package com.mstr.business.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;

import com.microstrategy.web.objects.SimpleList;

public class TreeBean implements Serializable {

  private static final long serialVersionUID = 3853838213578034367L;
  
  private int parentsNum;
  private int childNum;
  private String menuName;
  private String folderId;

  private String description;
  private String displayName;
  private SimpleList ancester;
  private String id;
  private String name;
  private String parentId;
  private String parentName;
  private transient boolean isShortcut;
  private String targetId;
  private int targetType;
  private int targetSubType;
  private String[] comment;

  private ArrayList<TreeBean> childMenu;

  public String getTargetId() {
    return targetId;
  }


  public void setTargetId(String targetId) {
    this.targetId = targetId;
  }


  public int getTargetType() {
    return targetType;
  }


  public void setTargetType(int targetType) {
    this.targetType = targetType;
  }


  public int getTargetSubType() {
    return targetSubType;
  }


  public void setTargetSubType(int targetSubType) {
    this.targetSubType = targetSubType;
  }


  public boolean isShortcut() {
    return isShortcut;
  }


  public void setShortcut(boolean isShortcut) {
    this.isShortcut = isShortcut;
  }


  public String getParentId() {
    return parentId;
  }


  public void setParentId(String parentId) {
    this.parentId = parentId;
  }


  public String getParentName() {
    return parentName;
  }


  public void setParentName(String parentName) {
    this.parentName = parentName;
  }


  private int type;
  private int subType;
  private int childCnt;

  public int getChildCnt() {
    return childCnt;
  }


  public void setChildCnt(int childCnt) {
    this.childCnt = childCnt;
  }


  public int getSubType() {
    return subType;
  }


  public void setSubType(int subType) {
    this.subType = subType;
  }


  public int getParentsNum() {
    return parentsNum;
  }


  public void setParentsNum(int parentsNum) {
    this.parentsNum = parentsNum;
  }


  public int getChildNum() {
    return childNum;
  }


  public void setChildNum(int childNum) {
    this.childNum = childNum;
  }


  public String getMenuName() {
    return menuName;
  }


  public void setMenuName(String menuName) {
    this.menuName = menuName;
  }


  public String getFolderId() {
    return folderId;
  }


  public void setFolderId(String folderId) {
    this.folderId = folderId;
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


  public SimpleList getAncester() {
    return ancester;
  }


  public void setAncester(SimpleList ancester) {
    this.ancester = ancester;
  }


  public String getId() {
    return id;
  }


  public void setId(String id) {
    this.id = id;
  }


  public String getName() {
    return name;
  }


  public void setName(String name) {
    this.name = name;
  }


  public int getType() {
    return type;
  }


  public void setType(int type) {
    this.type = type;
  }


  public ArrayList<TreeBean> getChildMenu() {
    return childMenu;
  }


  public void setChildMenu(ArrayList<TreeBean> childMenu) {
    this.childMenu = childMenu;
  }

  public String[] getComment() {
    String [] rtnComment= Arrays.copyOf(comment, comment.length);
    return rtnComment;
  }

  public void setComment(String[] comment) {
    
    // 배열 복사하여 저장 (PMD)
    if (comment == null) {
        this.comment = null;
    } else {
        this.comment = new String[comment.length];
        System.arraycopy(comment, 0, this.comment, 0,comment.length);
    }
  }

  public String toString() {
    return childNum + " :: " + parentsNum + " :: " + menuName + " :: " + folderId + " :: " + description + " :: " + displayName + " :: "
        + ancester + " :: " + id + " :: " + name + " :: " + type;
  }

  public void clear() {
    this.parentsNum = 0;
    this.childNum = 0;
    this.menuName = null;
    this.folderId = null;
    this.description = null;
    this.displayName = null;
    this.ancester = null;
    this.id = null;
    this.name = null;
    this.parentId = null;
    this.parentName = null;
    this.isShortcut = false;
    this.targetId = null;
    this.targetType = 0;
    this.targetSubType = 0;
    this.comment = null;
    this.childMenu = null;
    this.type = 0;
    this.subType = 0;
    this.childCnt = 0;
  }
  
}
