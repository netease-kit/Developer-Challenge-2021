package com.netease.nim.uikit.common.ui.imageview;

import android.content.Context;
import android.text.TextUtils;
import android.util.AttributeSet;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.netease.nim.uikit.R;
import com.netease.nim.uikit.api.NimUIKit;
import com.netease.nimlib.sdk.NIMClient;
import com.netease.nimlib.sdk.RequestCallbackWrapper;
import com.netease.nimlib.sdk.msg.constant.MsgTypeEnum;
import com.netease.nimlib.sdk.msg.model.IMMessage;
import com.netease.nimlib.sdk.nos.NosService;
import com.netease.nimlib.sdk.nos.model.NosThumbParam;
import com.netease.nimlib.sdk.nos.util.NosThumbImageUtil;
import com.netease.nimlib.sdk.robot.model.RobotAttachment;
import com.netease.nimlib.sdk.superteam.SuperTeam;
import com.netease.nimlib.sdk.team.model.Team;
import com.netease.nimlib.sdk.uinfo.model.UserInfo;

/**
 * Created by huangjun on 2015/11/13.
 */
public class HeadImageView extends CircleImageView {

    public static final int DEFAULT_AVATAR_THUMB_SIZE = (int) NimUIKit.getContext().getResources()
                                                                      .getDimension(
                                                                              R.dimen.avatar_max_size);

    public static final int DEFAULT_AVATAR_NOTIFICATION_ICON_SIZE = (int) NimUIKit.getContext()
                                                                                  .getResources()
                                                                                  .getDimension(
                                                                                          R.dimen.avatar_notification_size);

    private static final int DEFAULT_AVATAR_RES_ID = R.drawable.nim_avatar_default;

    public HeadImageView(Context context) {
        super(context);
    }

    public HeadImageView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public HeadImageView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    /**
     * ????????????????????????????????????????????????
     *
     * @param url ????????????
     */
    public void loadAvatar(final String url) {
        changeUrlBeforeLoad(null, url, DEFAULT_AVATAR_RES_ID, DEFAULT_AVATAR_THUMB_SIZE);
    }

    /**
     * ????????????????????????????????????????????????
     *
     * @param url ????????????
     */
    public void loadAvatar(String roomId, final String url) {
        changeUrlBeforeLoad(roomId, url, DEFAULT_AVATAR_RES_ID, DEFAULT_AVATAR_THUMB_SIZE);
    }

    /**
     * ????????????????????????????????????????????????
     *
     * @param account ????????????
     */
    public void loadBuddyAvatar(String account) {
        final UserInfo userInfo = NimUIKit.getUserInfoProvider().getUserInfo(account);
        changeUrlBeforeLoad(null, userInfo != null ? userInfo.getAvatar() : null,
                            DEFAULT_AVATAR_RES_ID, DEFAULT_AVATAR_THUMB_SIZE);
    }

    /**
     * ????????????????????????????????????????????????
     *
     * @param message ??????
     */
    public void loadBuddyAvatar(IMMessage message) {
        String account = message.getFromAccount();
        if (message.getMsgType() == MsgTypeEnum.robot) {
            RobotAttachment attachment = (RobotAttachment) message.getAttachment();
            if (attachment.isRobotSend()) {
                account = attachment.getFromRobotAccount();
            }
        }
        loadBuddyAvatar(account);
    }

    /**
     * ?????????????????????????????????????????????
     *
     * @param team ???
     */
    public void loadTeamIconByTeam(final Team team) {
        changeUrlBeforeLoad(null, team != null ? team.getIcon() : null, R.drawable.nim_avatar_group,
                            DEFAULT_AVATAR_THUMB_SIZE);
    }

    /**
     * ?????????????????????????????????????????????
     *
     * @param team ???
     */
    public void loadSuperTeamIconByTeam(final SuperTeam team) {
        changeUrlBeforeLoad(null, team != null ? team.getIcon() : null, R.drawable.nim_avatar_group,
                            DEFAULT_AVATAR_THUMB_SIZE);
    }


    /**
     * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ??????????????????????????????????????????????????????????????????????????????
     */
    private void changeUrlBeforeLoad(String roomId, final String url, final int defaultResId,
                                     final int thumbSize) {
        if (TextUtils.isEmpty(url)) {
            // avoid useless call
            loadImage(url, defaultResId, thumbSize);
        } else {
            /*
             * ?????????????????????????????????????????????????????????????????????????????????????????????URL
             * ???????????????????????????????????????????????????????????????NosThumbImageUtil
             */
            NIMClient.getService(NosService.class).getOriginUrlFromShortUrl(url).setCallback(
                    new RequestCallbackWrapper<String>() {

                        @Override
                        public void onResult(int code, String result, Throwable exception) {
                            if (TextUtils.isEmpty(result)) {
                                result = url;
                            }
                            final String thumbUrl = makeAvatarThumbNosUrl(result, thumbSize);
                            loadImage(thumbUrl, defaultResId, thumbSize);
                        }
                    });
        }
    }

    /**
     * ImageLoader????????????
     */
    private void loadImage(final String url, final int defaultResId, final int thumbSize) {
        RequestOptions requestOptions = new RequestOptions().centerCrop().placeholder(defaultResId)
                                                            .error(defaultResId).override(thumbSize,
                                                                                          thumbSize);
        Glide.with(getContext().getApplicationContext()).asBitmap().load(url).apply(requestOptions)
             .into(this);
    }

    /**
     * ??????ViewHolder????????????
     */
    public void resetImageView() {
        setImageBitmap(null);
    }

    /**
     * ?????????????????????NOS URL???????????????ImageLoader?????????key???
     */
    private static String makeAvatarThumbNosUrl(final String url, final int thumbSize) {
        if (TextUtils.isEmpty(url)) {
            return url;
        }
        return thumbSize > 0 ? NosThumbImageUtil.makeImageThumbUrl(url,
                                                                   NosThumbParam.ThumbType.Crop,
                                                                   thumbSize, thumbSize) : url;
    }

    public static String getAvatarCacheKey(final String url) {
        return makeAvatarThumbNosUrl(url, DEFAULT_AVATAR_THUMB_SIZE);
    }
}
