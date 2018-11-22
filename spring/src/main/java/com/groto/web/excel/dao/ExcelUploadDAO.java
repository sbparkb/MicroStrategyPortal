package com.groto.web.excel.dao;

import java.sql.SQLException;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

/**
 * Class Name : ExcelUploadDAO Description : 엑셀 업로드 DAO
 * 
 * Modification Information
 * 
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 12. 23. bae      Generation
 * 
 * @author : bae
 * @date : 2015. 12. 23. 오후 2:35:26
 * @version :
 */

@Repository
public class ExcelUploadDAO extends SqlSessionDaoSupport {

  public int mergeExcel01(Map<String, Object> params) throws SQLException {
    return (Integer) getSqlSession().insert("excel.mergeExcel01", params);
  }

  public int deleteExcel01(Map<String, Object> params) throws SQLException {
    return (Integer) getSqlSession().delete("excel.deleteExcel01", params);
  }

  public int insertExcel01(Map<String, Object> params) throws SQLException {
    return (Integer) getSqlSession().insert("excel.insertExcel01", params);
  }

  public int deleteExcel02(Map<String, Object> params) throws SQLException {
    return (Integer) getSqlSession().delete("excel.deleteExcel02", params);
  }

  public int insertExcel02(Map<String, Object> params) throws SQLException {
    return (Integer) getSqlSession().insert("excel.insertExcel02", params);
  }

  public int deleteExcel03(Map<String, Object> params) throws SQLException {
    return (Integer) getSqlSession().delete("excel.deleteExcel03", params);
  }

  public int insertExcel03(Map<String, Object> params) throws SQLException {
    return (Integer) getSqlSession().insert("excel.insertExcel03", params);
  }

  public int deleteExcel04(Map<String, Object> params) throws SQLException {
    return (Integer) getSqlSession().delete("excel.deleteExcel04", params);
  }

  public int insertExcel04(Map<String, Object> params) throws SQLException {
    return (Integer) getSqlSession().insert("excel.insertExcel04", params);
  }
  
  public int deleteExcel05(Map<String, Object> params) throws SQLException {
    return (Integer) getSqlSession().delete("excel.deleteExcel05", params);
  }

  public int insertExcel05(Map<String, Object> params) throws SQLException {
    return (Integer) getSqlSession().insert("excel.insertExcel05", params);
  }
}
