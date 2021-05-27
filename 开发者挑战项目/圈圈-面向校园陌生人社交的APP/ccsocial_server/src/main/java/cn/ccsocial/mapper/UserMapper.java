package cn.ccsocial.mapper;

import cn.ccsocial.model.EducationalAccount;
import cn.ccsocial.model.Friend;
import cn.ccsocial.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

public interface UserMapper {

    /**
     * 根据ccid查找用户
     * @param ccid
     * @return User
     */
    User selectByCcid(String ccid);

    /**
     * 获取用户列表
     * @return User
     */
    List<User> getUserList();

    /**
     * 获取好友用户列表
     * @return User
     */
    List<User> selectByFaccids(List<Friend> friendList);

    /**
     *  注册用户
     * @param user
     * @return
     */
    int registerUser(User user);

    /**
     * 根据电话查询用户信息
     * @param phone
     * @return
     */
    User selectByPhone(String phone);

    /**
     * 根据ccid查询存在数量
     * @param ccid
     * @return
     */
    int countByCcid(String ccid);

    /**
     * 设置用户密码
     * @param userCcid
     * @param userPassword 用户密码
     * @return 是否成功插入
     */
    int setUserPassword(String userCcid ,String userPassword);

    /**
     * 添加用户拼接标签字符串
     * @param userCcid
     * @param labels 拼接标签字符串
     * @return
     */
    int addUserHobbie(String userCcid , String labels);

    /**
     * 头像上传
     * @param userCcid
     * @param avatarPath
     * @return
     */
    int uploadAvatar(String userCcid,String avatarPath);

    /**
     * 绑定教务
     * @param educationalAccount
     * @return
     */
    int bindEducationalAccount(EducationalAccount educationalAccount);

    /**
     * 根据ccid查找用户兴趣爱好
     * @param userCcid
     * @return String labels拼接标签字符串
     */
    String selectHobbieByCcid(String userCcid);

    /**
     * 根据ccid查找accid
     * @param userCcid
     * @return String accid
     */
    String selectAccidByCcid(String userCcid);
}
