package cn.ccsocial.mapper;

import cn.ccsocial.model.FriendRelationship;

import java.util.List;

public interface FriendMapper {

    /**
     * 根据ccid获取用户好友列表
     * @return User
     */
    List<String> getFriendsList(String ccid);

    /**
     *根据两个ccid获取好友关系对象
     * @return
     */
    FriendRelationship getFriendRelationship(String userCcid,String friendCcid);

    /**
     * 添加好友
     *
     * @return User
     */
    void addFriend(FriendRelationship friendRelationship);


    /**
     * 使用Accid添加好友
     *
     * @return User
     */
    int addFriendByAccid(String userAccid,String friendAccid,String friendCreateTime);

    /**
     * 使用Accid删除好友
     *
     * @return User
     */
    int delFriendByAccid(String userAccid,String friendAccid);

}
