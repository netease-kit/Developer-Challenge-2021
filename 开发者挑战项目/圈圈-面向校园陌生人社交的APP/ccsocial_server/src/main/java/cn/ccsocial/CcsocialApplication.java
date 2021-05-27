package cn.ccsocial;

import org.mybatis.spring.annotation.MapperScan;
import cn.ccsocial.mapper.UserMapper;
import cn.ccsocial.model.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@SpringBootApplication
@MapperScan("cn.ccsocial.mapper")
public class CcsocialApplication {

	public static void main(String[] args) throws IOException {
			SpringApplication.run(CcsocialApplication.class, args);
	}
}