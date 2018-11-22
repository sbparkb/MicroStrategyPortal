package com.groto.cmm.base;

import javax.annotation.Resource;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.support.DaoSupport;
import org.springframework.util.Assert;

public abstract class SqlSessionDaoSupportERP extends DaoSupport {
	
	@Autowired
	@Resource(name="sqlSessionTemplate2")
	private SqlSession sqlSession;
	
	private transient boolean externalSqlSession;
 

	public final void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory2) {
      if(!this.externalSqlSession) {
         this.sqlSession = new SqlSessionTemplate(sqlSessionFactory2);
      }

	}
 
	public final void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate2) {
      this.sqlSession = sqlSessionTemplate2;
      this.externalSqlSession = true;
	}

	public final SqlSession getSqlSession() {
       return this.sqlSession;
	}

	protected void checkDaoConfig() {
      Assert.notNull(this.sqlSession, "Property \'sqlSessionFactory\' or \'sqlSessionTemplate\' are required");
	}
}