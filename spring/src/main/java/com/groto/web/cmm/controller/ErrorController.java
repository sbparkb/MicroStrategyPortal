package com.groto.web.cmm.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Class Name : ErrorController Description : Exception 및 Error 처리 페이지 이동 컨트롤러
 *
 * Modification Information
 *
 * Mod Date Modifier Description ----------- --------
 * --------------------------- 2015. 12. 15. lastpice Generation
 *
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 12. 15. 오전 9:13:45
 * @version :
 */

@Controller
@RequestMapping(value = "/error")
public class ErrorController {

	/**
	 * <pre>
	 * 권한 에러 페이지 이동
	 * </pre>
	 *
	 * @return
	 *
	 */
	@RequestMapping(value = "/permission.do", method = { RequestMethod.GET })
	public ModelAndView permissionPageGet(HttpServletResponse response) {
		return permissionPagePost(response);
	}

	@RequestMapping(value = "/permission.do", method = { RequestMethod.POST })
	public ModelAndView permissionPagePost(HttpServletResponse response) {
		
		response.setHeader("P3P", "CP='CAO PSA CONi OTR OUR DEM ONL'");

		ModelAndView mav = new ModelAndView();
		mav.setViewName("/mstr/common/error/permission");
		return mav;
	}

	/**
	 * <pre>
	 * 404 에러 페이지 이동
	 * </pre>
	 *
	 * @return
	 *
	 */
	@RequestMapping(value = "/404", method = { RequestMethod.GET })
	public ModelAndView pageNotFoundPageGet(HttpServletResponse response) {
		return pageNotFoundPagePost(response);
	}

	@RequestMapping(value = "/404", method = { RequestMethod.POST })
	public ModelAndView pageNotFoundPagePost(HttpServletResponse response) {
		
		response.setHeader("P3P", "CP='CAO PSA CONi OTR OUR DEM ONL'");

		ModelAndView mav = new ModelAndView();
		mav.setViewName("/mstr/common/error/404");
		return mav;
	}

	/**
	 * <pre>
	 * 내부 에러 페이지 이동
	 * </pre>
	 *
	 * @return
	 *
	 */
	@RequestMapping(value = "/500", method = { RequestMethod.GET })
	public ModelAndView internalErrorPageGet(HttpServletResponse response) {
		return internalErrorPagePost(response);
	}

	@RequestMapping(value = "/500", method = { RequestMethod.POST })
	public ModelAndView internalErrorPagePost(HttpServletResponse response) {

		response.setHeader("P3P", "CP='CAO PSA CONi OTR OUR DEM ONL'");

		ModelAndView mav = new ModelAndView();
		mav.setViewName("/mstr/common/error/500");
		return mav;
	}

	/**
	 * <pre>
	 * 에러 페이지 이동
	 * </pre>
	 *
	 * @return
	 *
	 */
	@RequestMapping(value = "/error", method = { RequestMethod.GET })
	public ModelAndView errorPageGet(HttpServletResponse response){
		return errorPagePost(response);
	}

	@RequestMapping(value = "/error", method = { RequestMethod.POST })
	public ModelAndView errorPagePost(HttpServletResponse response){
		
		response.setHeader("P3P", "CP='CAO PSA CONi OTR OUR DEM ONL'");

		ModelAndView mav = new ModelAndView();
		mav.setViewName("/mstr/common/error/error");
		return mav;
	}

	/**
	 * <pre>
	 * Exception 발생 페이지 이동
	 * </pre>
	 *
	 * @return
	 *
	 */
	@RequestMapping(value = "/exception", method = { RequestMethod.GET })
	public ModelAndView exceptionPageGet(HttpServletResponse response){
		return exceptionPagePost(response);
	}

	@RequestMapping(value = "/exception", method = { RequestMethod.POST })
	public ModelAndView exceptionPagePost(HttpServletResponse response){
		
		response.setHeader("P3P", "CP='CAO PSA CONi OTR OUR DEM ONL'");

		ModelAndView mav = new ModelAndView();
		mav.setViewName("/mstr/common/error/exception");
		return mav;
	}

}
