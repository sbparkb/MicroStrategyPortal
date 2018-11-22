package com.groto.web.excel.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.groto.cmm.util.CmmUtil;
import com.groto.web.excel.dao.ExcelUploadDAO;

/**
 * Class Name : ExcelUploadService Description : 엑셀 업로드 서비스
 * 
 * Modification Information
 * 
 * Mod Date Modifier Description ----------- -------- --------------------------- 2015. 12. 23. bae
 * Generation
 * 
 * @author : bae
 * @date : 2015. 12. 23. 오후 2:35:26
 * @version :
 */


@Service
@Transactional
public class ExcelUploadService {

  private transient final Logger logger = LoggerFactory.getLogger(getClass());

  @Autowired
  private ExcelUploadDAO excelDAO;

  @Resource(name = "txManager")
  private DataSourceTransactionManager txManager;

  /**
   * <pre>
   * 엑셀추가 수행
   * </pre>
   * 
   * @param param
   * @param request
   * @param response
   * @return
   * 
   */
  public Map<String, Object> insertExcel01(List<HashMap<String, Object>> list, HttpServletRequest request, HttpServletResponse response) throws SQLException {

    Map<String, Object> params = new HashMap<String, Object>();

    DefaultTransactionDefinition def = new DefaultTransactionDefinition();
    def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    TransactionStatus status = txManager.getTransaction(def);
    try {

      for (int i = 0; i < list.size(); i++) {
        excelDAO.deleteExcel01((HashMap<String, Object>) list.get(i));
      }

      for (int i = 0; i < list.size(); i++) {
        excelDAO.insertExcel01((HashMap<String, Object>) list.get(i));
      }

      txManager.commit(status);
    } catch (SQLException e) {
      txManager.rollback(status);
      logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
      params.put("result", "fail");
      throw e;
    }

    return params;
  }


  public Map<String, Object> insertExcel02(List<HashMap<String, Object>> list, HttpServletRequest request, HttpServletResponse response) throws SQLException {
    Map<String, Object> params = new HashMap<String, Object>();

    DefaultTransactionDefinition def = new DefaultTransactionDefinition();

    def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);

    TransactionStatus status = txManager.getTransaction(def);

    try {
      for (int i = 0; i < list.size(); i++) {
        excelDAO.deleteExcel02((HashMap<String, Object>) list.get(i));
      }

      for (int i = 0; i < list.size(); i++) {
        excelDAO.insertExcel02((HashMap<String, Object>) list.get(i));
      }

      txManager.commit(status);

      params.put("result", "success");
    } catch (SQLException e) {
      txManager.rollback(status);
      params.put("result", "fail");
      logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
      throw e;
    }

    return params;
  }

  public Map<String, Object> insertExcel03(List<HashMap<String, Object>> list, HttpServletRequest request, HttpServletResponse response) throws SQLException {
    Map<String, Object> params = new HashMap<String, Object>();

    DefaultTransactionDefinition def = new DefaultTransactionDefinition();

    def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);

    TransactionStatus status = txManager.getTransaction(def);

    try {
      for (int i = 0; i < list.size(); i++) {
        excelDAO.deleteExcel03((HashMap<String, Object>) list.get(i));        
      }

      for (int i = 0; i < list.size(); i++) {
        excelDAO.insertExcel03((HashMap<String, Object>) list.get(i));
      }

      txManager.commit(status);

    } catch (SQLException e) {
      txManager.rollback(status);
      logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
      params.put("result", "fail");

      throw e;
    }

    return params;
  }

  public Map<String, Object> insertExcel04(List<HashMap<String, Object>> list, HttpServletRequest request, HttpServletResponse response) throws SQLException {
    
    Map<String, Object> params = new HashMap<String, Object>();

    DefaultTransactionDefinition def = new DefaultTransactionDefinition();

    def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);

    TransactionStatus status = txManager.getTransaction(def);

    try {
      for (int i = 0; i < list.size(); i++) {
        excelDAO.deleteExcel04((HashMap<String, Object>) list.get(i));                
      }

      for (int i = 0; i < list.size(); i++) {
        excelDAO.insertExcel04((HashMap<String, Object>) list.get(i));        
      }

      txManager.commit(status);

    } catch (SQLException e) {
      txManager.rollback(status);
      logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
      params.put("result", "fail");
      throw e;
    }

    return params;
  }

  public Map<String, Object> insertExcel05(List<HashMap<String, Object>> list, HttpServletRequest request, HttpServletResponse response) throws SQLException {

    Map<String, Object> params = new HashMap<String, Object>();

    DefaultTransactionDefinition def = new DefaultTransactionDefinition();

    def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);

    TransactionStatus status = txManager.getTransaction(def);

    try {

      for (int i = 0; i < list.size(); i++) {
        excelDAO.deleteExcel05((HashMap<String, Object>) list.get(i));
      }
      for (int i = 0; i < list.size(); i++) {
        excelDAO.insertExcel05((HashMap<String, Object>) list.get(i));
      }

      txManager.commit(status);

    } catch (SQLException e) {
      txManager.rollback(status);
      params.put("result", "fail");
      logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
      throw e;
    }

    return params;
  }

}// end of class
