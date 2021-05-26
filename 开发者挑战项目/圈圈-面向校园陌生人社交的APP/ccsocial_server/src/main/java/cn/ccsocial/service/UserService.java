package cn.ccsocial.service;

import cn.ccsocial.model.EducationalAccount;
import cn.ccsocial.model.User;
import cn.ccsocial.utils.JsonData;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface UserService {

//    public User login(String username, String pwd);

    /**
     * 获取用户列表
     * @return
     */
    List<User> getUserList();

    /**
     * 注册用户
     * @param userInfo
     * @return accid
     * @throws Exception
     */
    String registerUser(User userInfo) throws Exception;

    /**
     * 发送验证码
     * @param mobile
     * @return
     * @throws Exception
     */
    String sendVerificationCode(String mobile) throws Exception;

    /**
     * 验证验证码是否正确
     * @param userPhone
     * @param code
     * @return ture：验证码正确 false：验证码错误
     */
    Boolean verificationCodeIsTure(String userPhone,String code)throws Exception;

    /**
     * 用户登录
     * @param userPhone
     * @param password
     * @return
     */
    User userLogin(String userPhone,String password)throws Exception;

    /**
     * 用户手机号登录
     * @param userPhone
     * @param code
     * @return User
     * @throws Exception
     */
    User loginByPhone(String userPhone,String code)throws Exception;

    /**
     * 用户手机号注册
     * @param userPhone
     * @return
     * @throws Exception
     */
    User registerByPhone(String userPhone)throws Exception;

    /**
     * 根据ccid获取用户对象
     * @param ccid
     * @return
     */
    User getUserByCcid(String ccid);

    /**
     * 手机号是否已注册
     * @param userPhone
     * @return 1：已注册 -1：未注册
     * @throws Exception
     */
    boolean phoneIsRegister(String userPhone);



    /**
     * 设置用户密码
     * @param userCcid
     * @param userPassword
     * @return 是否成功插入
     */
    int setUserPassword(String userCcid,String userPassword);

    /**
     * 添加用户兴趣标签
     * @param userCcid 用户主键
     * @param labels 拼接标签字符串
     * @return 成功插入的标签数量
     */
    int addUserHobbies(String userCcid,String labels);

    /**
     * 头像上传
     * @param imgFile
     * @param userCcid 0：数据库保存失败 1：上传成功 -1：其他错误
     * @return
     */
    int uploadAvatar(MultipartFile imgFile, String userCcid);

    /**
     * 绑定教务
     * @param educationalAccount
     * @return 2：更新绑定成功 1：绑定成功 -1：账号密码错误 -2：其他错误
     */
    int bindEducationalAccount(EducationalAccount educationalAccount);
}