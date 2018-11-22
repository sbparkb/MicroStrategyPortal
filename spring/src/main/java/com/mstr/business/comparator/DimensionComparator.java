package com.mstr.business.comparator;

import java.util.Comparator;

import com.microstrategy.web.objects.WebDimensionAttribute;

public class DimensionComparator implements Comparator<WebDimensionAttribute> {
	
	public int compare(WebDimensionAttribute w1, WebDimensionAttribute w2) {
		if(w1.getParents().isEmpty()) {
			return -1;
		} else if(w1.getChildren().isEmpty()) {
			return 1;
		} else {
			return compare(w1, w2, true);
		}
	}
	
	private int compare(WebDimensionAttribute w1, WebDimensionAttribute w2, boolean isParent) {
		if(w1 != null && w2 != null) {
			if(isParent) {
			  return parentCompare(w1, w2, isParent);
			} else {
			  return notParentCompare(w1, w2, isParent);
			}
		}
		return 0;
	}
	
	private int parentCompare(WebDimensionAttribute p1, WebDimensionAttribute p2, boolean isParent){

	  WebDimensionAttribute w1 = p1;
	  WebDimensionAttribute w2 = p2;
	   WebDimensionAttribute w3 = null;
	  
    if(w1.getParents().item(0).equals(w2)) {
      return 1;
    } else {
      if(w2.getParents().isEmpty() || w1.equals(w2)) {
        return compare(w1, w2, !isParent);
      } else {
        w3 = (WebDimensionAttribute)w2.getParents().item(0);
        return compare(w1, w3, isParent);
      }
    }
	}
	
	private int notParentCompare(WebDimensionAttribute p1, WebDimensionAttribute p2, boolean isParent){
	  
	  WebDimensionAttribute w1 = p1;
	  WebDimensionAttribute w2 = p2;
	  WebDimensionAttribute w3 = null;

    if(isParent) {
      return parentCompare(w1, w2, isParent);
    } else {
      if(w1.getChildren().item(0).equals(w2)) {
        return -1;
      } else {
        if(w2.getChildren().isEmpty() || w1.equals(w2)) {
          return 0;
        } else {
          w3 = (WebDimensionAttribute)w2.getChildren().item(0);
          return compare(w1, w3, isParent);
        }
      }
    }
	}
	
}