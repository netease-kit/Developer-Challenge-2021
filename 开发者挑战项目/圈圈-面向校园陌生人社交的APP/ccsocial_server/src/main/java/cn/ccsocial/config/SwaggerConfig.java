package cn.ccsocial.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket createRestApi() {

        return new Docket(DocumentationType.SWAGGER_2)
                .pathMapping("/")
                .select()
                //扫描那个接口的包
                .apis(RequestHandlerSelectors.basePackage("cn.ccsocial.controller"))
                .paths(PathSelectors.any())
                .build().apiInfo(new ApiInfoBuilder()
                        .title("CCSoical")
                        .description("站在巨人的肩膀上")
                        .version("1.0")
                        .contact(new Contact("TonyWang","http://www.tonywang972.xyz","710093245@qq.com"))
                        .license("The CCSocial License")
                        .licenseUrl("http://www.ccsocial.cn")
                        .build());
    }
}