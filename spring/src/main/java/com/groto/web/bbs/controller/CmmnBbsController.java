package com.groto.web.bbs.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.groto.web.bbs.service.CmmnBbsService;
import com.groto.web.bbs.vo.CmmnBbsVO;

/**
 *  Class Name  :  CmmnBbsController
 *  Description :  게시글 관리 컨트롤러
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
 
@Controller
@RequestMapping(value = "/service/bbs")
public class CmmnBbsController {
	
	@Autowired
	private CmmnBbsService cmmnBbsService;
	/**
	 * <pre>
	 * URL PathVariable로 들어온 값으로 페이지 이동 수행
	 * </pre>
	 *
	 * @param pageReturnParam
	 * @param request
	 * @param response
	 * @return
	 *
	 */
  @RequestMapping(value = "/bbsList", method = {RequestMethod.GET})
  public String bbsListPageGet(
      HttpServletRequest request
      , HttpServletResponse response
      , CmmnBbsVO param
      , Model model
      , @RequestParam(value="bbsId") String bbsId
      ) {
    return bbsListPagePost(request, response, param, model, bbsId);
  }
  
	@RequestMapping(value = "/bbsList", method = {RequestMethod.POST})
	public String bbsListPagePost(
			HttpServletRequest request
			, HttpServletResponse response
			, CmmnBbsVO param
			, Model model
			, @RequestParam(value="bbsId") String bbsId
			) {
		
	  
		
	  model.addAllAttributes(cmmnBbsService.selectListPageBbs(param, request, bbsId));	  
	  return "mstr/bbs/bbsList";
		
	}
	
	/**
	 * <pre>
	 * 게시판 등록 페이지 이동
	 * </pre>
	 *
	 * @param request
	 * @param response
	 * @param param
	 * @param model
	 * @return
	 *
	 */
	 @RequestMapping(value="/bbsReg", method = {RequestMethod.GET})
	  public ModelAndView bbsRegPageGet(
	      HttpServletRequest request
	      , HttpServletResponse response
	      , CmmnBbsVO param
	      , Model model
	      ){
	   return bbsRegPagePost(request, response, param, model); 
	 }
	 
	@RequestMapping(value="/bbsReg", method = {RequestMethod.POST})
	public ModelAndView bbsRegPagePost(
			HttpServletRequest request
			, HttpServletResponse response
			, CmmnBbsVO param
			, Model model
			){
		ModelAndView mav = new ModelAndView();
		
		model.addAttribute("board", cmmnBbsService.selectBoardInfo(param));
		
		mav.setViewName("mstr/bbs/bbsReg");
		
		return mav;
	}
	
	
	/**
	 * <pre>
	 * 게시글 조회 수행
	 * </pre>
	 *
	 * @param request
	 * @param response
	 * @param param
	 * @param model
	 * @return
	 *
	 */
	@RequestMapping(value="/bbsDet", method = {RequestMethod.GET})
  public ModelAndView selectBbsInfoGet(
      HttpServletRequest request
      , HttpServletResponse response
      , CmmnBbsVO param
      , Model model
      ){
	  return selectBbsInfoPost(request, response, param, model);
	}
	
	@RequestMapping(value="/bbsDet", method =  {RequestMethod.POST})
	public ModelAndView selectBbsInfoPost(
			HttpServletRequest request
			, HttpServletResponse response
			, CmmnBbsVO param
			, Model model
			){
		ModelAndView mav 		= new ModelAndView();
		
		model.addAllAttributes(cmmnBbsService.selectCmmnBbs(param, request));
		
		mav.setViewName("mstr/bbs/bbsDet");
		
		return mav;
	}
	

	/**
	 * <pre>
	 * 게시글 조회 수행
	 * </pre>
	 *
	 * @param request
	 * @param response
	 * @param param
	 * @param model
	 * @return
	 *
	 */
//	@RequestMapping(value="/notiView")
	public ModelAndView selectnotiView(
			HttpServletRequest request
			, HttpServletResponse response
			, CmmnBbsVO param
			, Model model
			){
		ModelAndView mav 		= new ModelAndView();
		
		model.addAllAttributes(cmmnBbsService.selectCmmnBbs(param, request));
		
		mav.setViewName("mstr/bbs/notiView");
		
		return mav;
	}
	
 
	/**
	 * <pre>
	 * 게시판 저장.
	 * </pre>
	 *
	 * @param request
	 * @param cmmnbbsvo
	 * @param commnbbsfilevo
	 * @param model
	 * @return
	 *
	 */
	@RequestMapping(value = "/bbsRegPrc", method = RequestMethod.POST)
	public ModelAndView insertbbs(
			HttpServletRequest request
			,HttpServletResponse response
			,CmmnBbsVO cmmnbbsvo
			, Model model
			, RedirectAttributes ra
			) {

		Map<String, Object> result		= new HashMap<String, Object>();
		result  = cmmnBbsService.insert(cmmnbbsvo, request);
		CmmnBbsVO params = (CmmnBbsVO)result.get("params");
		model.addAttribute("result", "success");
		
		return selectBbsInfoPost(request, response, params, model);		
	}
	
	
	/**
	 * <pre>
	 * 게시글 수정 페이지 이동
	 * </pre>
	 *
	 * @param request
	 * @param response
	 * @param param
	 * @param model
	 * @return
	 *
	 */
  @RequestMapping(value="/bbsMod", method = {RequestMethod.GET})
  public ModelAndView updateBbsPageGet(
      HttpServletRequest request
      , HttpServletResponse response
      , CmmnBbsVO param
      , Model model
      ){
    return updateBbsPagePost(request, response, param, model);
  }
  
	@RequestMapping(value="/bbsMod", method = {RequestMethod.POST})
	public ModelAndView updateBbsPagePost(
			HttpServletRequest request
			, HttpServletResponse response
			, CmmnBbsVO param
			, Model model
			){
		ModelAndView mav				= new ModelAndView();
		
		model.addAllAttributes(cmmnBbsService.selectCmmnBbs(param, request));
		
		mav.setViewName("mstr/bbs/bbsMod");
		
		return mav;
		
	}
	
	/**
	 * <pre>
	 * 게시글 수정 로직 수행
	 * </pre>
	 *
	 * @param request
	 * @param response
	 * @param param
	 * @param file
	 * @param attachFileIds
	 * @param originAttachFileIds
	 * @return
	 *
	 */
	 @RequestMapping(value="/bbsModPrc", method = {RequestMethod.GET})
	  public ModelAndView updateBbsInfoGet(
	      HttpServletRequest request
	      , HttpServletResponse response
	      , CmmnBbsVO param
	      , Model model
	      ){
	   return updateBbsInfoPost(request, response, param, model);
	 }
	 
	@RequestMapping(value="/bbsModPrc", method = {RequestMethod.POST})
	public ModelAndView updateBbsInfoPost(
	    HttpServletRequest request
	    , HttpServletResponse response
	    , CmmnBbsVO params
	    , Model model
	    ){
	  cmmnBbsService.updateCmmnBbs(params, request);
	  return selectBbsInfoPost(request, response, params, model);
	}
	
	
	/**
	 * <pre>
	 * 게시글 데이터 정보 삭제
	 * </pre>
	 *
	 * @param request
	 * @param response
	 * @param param
	 * @return
	 *
	 */
	@RequestMapping(value="/bbsDelPrc", method=RequestMethod.POST)
	@ResponseBody
	public Object deleteBbs(
			HttpServletRequest request
			, HttpServletResponse response
			, CmmnBbsVO param
			){
		
		return cmmnBbsService.deleteCmmnBbsInfo(request, param);
	}	
	
	 @RequestMapping(value="/imageUploader", method = {RequestMethod.GET})
	  public ModelAndView imageUploaderGet(
	      HttpServletRequest request
	      , HttpServletResponse response
	      , Model model
	      ){
	   return imageUploaderPost(request, response, model);
	 }
	
	@RequestMapping(value="/imageUploader", method = {RequestMethod.POST})
	public ModelAndView imageUploaderPost(
			HttpServletRequest request
			, HttpServletResponse response
			, Model model
			){
		
	  ModelAndView mav				= new ModelAndView();				
		mav.setViewName("mstr/bbs/photo_uploader/photo_uploader");
		return mav;
	}

}//end of class