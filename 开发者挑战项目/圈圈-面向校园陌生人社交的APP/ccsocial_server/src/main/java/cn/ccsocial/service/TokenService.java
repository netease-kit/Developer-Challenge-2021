package cn.ccsocial.service;

import cn.ccsocial.model.User;

public interface TokenService {

    //Register生成token
    public String generateTokenByRegister(String accid) throws Exception;

    //Login生成token
    public String generateTokenByLogin(String accid) throws Exception;

    //生成token
    public String generateToken(User user) throws Exception;

    //生成save
    public void save(String accid,String token) throws Exception;

    public boolean validate(String userAgent,String token) throws Exception;}