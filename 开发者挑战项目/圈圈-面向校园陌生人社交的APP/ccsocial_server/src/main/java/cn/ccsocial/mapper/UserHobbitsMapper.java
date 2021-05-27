package cn.ccsocial.mapper;

import cn.ccsocial.model.FriendRelationship;

import java.util.List;

public interface UserHobbitsMapper {

    /**
     * 用户兴趣添加
     * @param userCcid
     * @param labelId
     * @return
     */
    int userHobbitsAdd(String userCcid, String labelId);

    /**
     * 获取兴趣喜好度
     * @param friendCcid
     * @return
     */
    int getHobbitsValueByCcid(String friendCcid);
}
