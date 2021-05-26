package cn.ccsocial.filter;

import cn.ccsocial.model.User;
import cn.ccsocial.service.impl.UserServiceImpl;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = "/api/v1/pri/*", filterName = "loginFilter")
public class LoginFilter implements Filter {

    /**
     * 容器加载的时候
     * @param filterConfig
     * @throws ServletException
     */
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("init LoginFilter======");
    }



    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("doFilter LoginFilter======");
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        HttpServletResponse resp = (HttpServletResponse) servletResponse;
        String token = req.getHeader("token");
        if(StringUtils.isEmpty(token)){
            token = req.getParameter("token");
        }
        if(StringUtils.isEmpty(token)){
            return;
        }else {
            //判断token是否合法 操作redis
        }
    }

    /**
     * 容器销毁的时候
     */
    @Override
    public void destroy() {
        System.out.println("destroy LoginFilter======");
    }
}
