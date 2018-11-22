package com.groto.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.groto.service.AbstractExternalPromptTagService;
import com.mstr.business.model.CustomAnswer;

/**
 *  Class Name  :  DefaultExternalPromptTagServiceImpl
 *  Description :  기본 프롬프트 Tag (JSTL) 서비스 
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

@Service
public class DefaultExternalPromptTagServiceImpl extends AbstractExternalPromptTagService {

	private static final long serialVersionUID = 817627585643449124L;

  @Override
  public String getTableLayout() throws Exception {
    return null;
  }

  @Override
  public List<CustomAnswer> getCustomAnswerForTree() throws Exception {
    return null;
  }

}
