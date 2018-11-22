package com.groto.web.login.vo;

import com.microstrategy.web.beans.GenericRequestKeys;
 
/**
 *  Class Name  :  UserManagerRequestVO
 *  Description :  유저 정보 VO
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2014. 10. 28. jjangacejoy Generation
 *
 * @author : 장창용(jjangacejoy@netville.co.kr)
 * @date : 2014. 10. 28. 오후 1:50:03
 * @version : 1.0
 */ 

public class UserManagerRequestVO extends GenericRequestKeys {
   protected void initializeRequestKeys() {
     /**
      * 구현 안한 추상 메소드
      */
   }

   public String add(String name, String value) {
       return super.add(name, value);
   }

}
