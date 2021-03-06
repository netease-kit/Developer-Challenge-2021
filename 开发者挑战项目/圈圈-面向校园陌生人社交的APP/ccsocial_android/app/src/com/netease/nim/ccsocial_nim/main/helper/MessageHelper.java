package com.netease.nim.ccsocial_nim.main.helper;

import android.text.TextUtils;

import com.netease.nim.ccsocial_nim.DemoCache;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.session.extension.MultiRetweetAttachment;
import com.netease.nim.uikit.api.NimUIKit;
import com.netease.nim.uikit.api.model.CreateMessageCallback;
import com.netease.nim.uikit.business.session.actions.PickImageAction;
import com.netease.nim.uikit.business.team.helper.SuperTeamHelper;
import com.netease.nim.uikit.business.team.helper.TeamHelper;
import com.netease.nim.uikit.business.uinfo.UserInfoHelper;
import com.netease.nim.uikit.common.util.log.sdk.wrapper.NimLog;
import com.netease.nim.uikit.common.util.storage.StorageType;
import com.netease.nim.uikit.common.util.storage.StorageUtil;
import com.netease.nim.uikit.common.util.string.MD5;
import com.netease.nimlib.sdk.NIMClient;
import com.netease.nimlib.sdk.RequestCallback;
import com.netease.nimlib.sdk.friend.model.AddFriendNotify;
import com.netease.nimlib.sdk.msg.MessageBuilder;
import com.netease.nimlib.sdk.msg.constant.MsgTypeEnum;
import com.netease.nimlib.sdk.msg.constant.SessionTypeEnum;
import com.netease.nimlib.sdk.msg.constant.SystemMessageStatus;
import com.netease.nimlib.sdk.msg.constant.SystemMessageType;
import com.netease.nimlib.sdk.msg.model.IMMessage;
import com.netease.nimlib.sdk.msg.model.SystemMessage;
import com.netease.nimlib.sdk.nos.NosService;
import com.netease.nimlib.sdk.superteam.SuperTeam;
import com.netease.nimlib.sdk.team.model.Team;
import com.netease.nimlib.sdk.uinfo.UserService;
import com.netease.nimlib.sdk.uinfo.model.NimUserInfo;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

/**
 * Created by huangjun on 2015/4/9.
 */
public class MessageHelper {
    public static String TAG = "MessageHelper";

    public static String getName(String account, SessionTypeEnum sessionType) {
        if (sessionType == SessionTypeEnum.P2P) {
            return UserInfoHelper.getUserDisplayName(account);
        } else if (sessionType == SessionTypeEnum.Team) {
            return TeamHelper.getTeamName(account);
        } else if (sessionType == SessionTypeEnum.SUPER_TEAM) {
            return SuperTeamHelper.getTeamName(account);
        }
        return account;
    }

    public static String getVerifyNotificationText(SystemMessage message) {
        StringBuilder sb = new StringBuilder();
        String fromAccount = UserInfoHelper.getUserDisplayNameEx(message.getFromAccount(), "???");
        String teamName;
        switch (message.getType()) {
            case TeamInvite:
            case DeclineTeamInvite:
            case ApplyJoinTeam:
            case RejectTeamApply:
            case AddFriend:
                Team team = NimUIKit.getTeamProvider().getTeamById(message.getTargetId());
                if (team == null && message.getAttachObject() instanceof Team) {
                    team = (Team) message.getAttachObject();
                }
                teamName = team == null ? message.getTargetId() : team.getName();
                break;
            case SuperTeamInvite:
            case SuperTeamInviteReject:
            case SuperTeamApply:
            case SuperTeamApplyReject:
                SuperTeam superTeam = NimUIKit.getSuperTeamProvider().getTeamById(message.getTargetId());
                if (superTeam == null && message.getAttachObject() instanceof SuperTeam) {
                    superTeam = (SuperTeam) message.getAttachObject();
                }
                teamName = superTeam == null ? message.getTargetId() : superTeam.getName();
                break;
            default:
                teamName = message.getTargetId();
        }

        if (message.getType() == SystemMessageType.TeamInvite || message.getType() == SystemMessageType.SuperTeamInvite) {
            sb.append("??????").append("???").append("????????? ").append(teamName);
        } else if (message.getType() == SystemMessageType.DeclineTeamInvite || message.getType() == SystemMessageType.SuperTeamInviteReject) {
            sb.append(fromAccount).append("???????????? ").append(teamName).append(" ??????");
        } else if (message.getType() == SystemMessageType.ApplyJoinTeam || message.getType() == SystemMessageType.SuperTeamApply) {
            sb.append("??????????????? ").append(teamName);
        } else if (message.getType() == SystemMessageType.RejectTeamApply || message.getType() == SystemMessageType.SuperTeamApplyReject) {
            sb.append(fromAccount).append("????????????????????? ").append(teamName).append("?????????");
        } else if (message.getType() == SystemMessageType.AddFriend) {
            AddFriendNotify attachData = (AddFriendNotify) message.getAttachObject();
            if (attachData != null) {
                if (attachData.getEvent() == AddFriendNotify.Event.RECV_ADD_FRIEND_DIRECT) {
                    sb.append("?????????????????????");
                } else if (attachData.getEvent() == AddFriendNotify.Event.RECV_AGREE_ADD_FRIEND) {
                    sb.append("???????????????????????????");
                } else if (attachData.getEvent() == AddFriendNotify.Event.RECV_REJECT_ADD_FRIEND) {
                    sb.append("???????????????????????????");
                } else if (attachData.getEvent() == AddFriendNotify.Event.RECV_ADD_FRIEND_VERIFY_REQUEST) {
                    sb.append("??????????????????" + (TextUtils.isEmpty(message.getContent()) ? "" : "???" + message.getContent()));
                }
            }
        }

        return sb.toString();
    }

    /**
     * ?????????????????????????????????????????????????????????????????????
     */
    public static boolean isVerifyMessageNeedDeal(SystemMessage message) {
        final SystemMessageType msgType = message.getType();
        if (msgType == SystemMessageType.AddFriend) {
            if (message.getAttachObject() != null) {
                AddFriendNotify attachData = (AddFriendNotify) message.getAttachObject();
                if (attachData.getEvent() == AddFriendNotify.Event.RECV_ADD_FRIEND_DIRECT ||
                        attachData.getEvent() == AddFriendNotify.Event.RECV_AGREE_ADD_FRIEND ||
                        attachData.getEvent() == AddFriendNotify.Event.RECV_REJECT_ADD_FRIEND) {
                    return false; // ?????????????????????????????????????????????????????????????????????????????????????????????
                } else if (attachData.getEvent() == AddFriendNotify.Event.RECV_ADD_FRIEND_VERIFY_REQUEST) {
                    return true; // ??????????????????
                }
            }
            return false;
        } else if (msgType == SystemMessageType.TeamInvite ||
                msgType == SystemMessageType.ApplyJoinTeam ||
                msgType == SystemMessageType.SuperTeamApply ||
                msgType == SystemMessageType.SuperTeamInvite
        ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * ?????????????????????????????????????????????????????????-: 1. ?????????content???????????????; 2. ?????????????????????????????????????????????
     *
     * @return ???: true; ??????: false
     */
    public static boolean hasPostscript(SystemMessage message) {
        final SystemMessageType messageType = message.getType();
        return !TextUtils.isEmpty(message.getContent()) && (SystemMessageType.SuperTeamApply.equals(messageType) ||
                SystemMessageType.SuperTeamApplyReject.equals(messageType) ||
        SystemMessageType.SuperTeamInvite.equals(messageType) ||
                SystemMessageType.SuperTeamInviteReject.equals(messageType));
    }

    public static String getVerifyNotificationDealResult(SystemMessage message) {
        if (message.getStatus() == SystemMessageStatus.passed) {
            return "?????????";
        } else if (message.getStatus() == SystemMessageStatus.declined) {
            return "?????????";
        } else if (message.getStatus() == SystemMessageStatus.ignored) {
            return "?????????";
        } else if (message.getStatus() == SystemMessageStatus.expired) {
            return "?????????";
        } else {
            return "?????????";
        }
    }

    /**
     * ??????????????????????????????ActivityResult???????????????????????? (this->??????Activity->MessageListPanelEx)???????????????????????????
     */
    public static void createMultiRetweet(final List<IMMessage> toBeSent, final boolean shouldEncrypt, final CreateMessageCallback callback) {
        if (toBeSent.isEmpty()) {
            return;
        }

        //??????????????????????????????
        //?????????????????????????????????????????????????????????
        final byte[] fileBytes = MessageBuilder.createForwardMessageListFileDetail(toBeSent).getBytes();
        final byte[] key;
        final byte[] encryptedFileBytes;
        if (shouldEncrypt) {
            //RC4??????
            key = genRC4Key();
            encryptedFileBytes = encryptByRC4(fileBytes, key);
        } else {
            key = new byte[0];
            encryptedFileBytes = fileBytes;
        }
        //encryptedFileBytes???????????????????????????
        final boolean isEncrypted = encryptedFileBytes != fileBytes;
        if (isEncrypted != shouldEncrypt) {
            NimLog.d(TAG, "failed to encrypt file with RC4");
        }
        //???????????????16??????String??????????????????
        final String fileName = TAG + System.currentTimeMillis();
        final File file = new File(StorageUtil.getDirectoryByDirType(StorageType.TYPE_FILE), fileName);
        try {
            if (file.exists() || file.createNewFile()) {
                OutputStream outputStream = new FileOutputStream(file, false);
                outputStream.write(encryptedFileBytes);
                outputStream.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        //??????????????????Nos???????????????????????????????????????????????????
        NIMClient.getService(NosService.class).upload(file, PickImageAction.MIME_JPEG).setCallback(new RequestCallback<String>() {

            @Override
            public void onSuccess(String url) {
                NimLog.d(TAG, "NosService.upload/onSuccess, url=" + url);
                file.delete();
                if (TextUtils.isEmpty(url)) {
                    return;
                }

                final IMMessage firstMsg = toBeSent.get(0);
                final IMMessage secondMsg = toBeSent.size() > 1 ? toBeSent.get(1) : null;
                //??????????????????????????????
                String firstContent = getContent(firstMsg);
                //????????????
                final SessionTypeEnum sessionType = firstMsg.getSessionType();

                //?????????sessionID??????
                final String sessionId = firstMsg.getSessionId();
                String sessionName = null;
                switch (sessionType) {
                    case P2P:
                        sessionName = getStoredNameFromSessionId(NimUIKit.getAccount(), SessionTypeEnum.P2P);
                        break;
                    case Team:
                    case SUPER_TEAM:
                        sessionName = getStoredNameFromSessionId(sessionId, sessionType);
                        break;
                    default:
                        break;
                }
                if (sessionName == null) {
                    sessionName = sessionId;
                }


                String nick1 = getStoredNameFromSessionId(firstMsg.getFromAccount(), SessionTypeEnum.P2P);
                String nick2 = null;
                if (secondMsg != null) {
                    nick2 = getStoredNameFromSessionId(secondMsg.getFromAccount(), SessionTypeEnum.P2P);
                }

                //????????????
                MultiRetweetAttachment attachment = new MultiRetweetAttachment(
                        sessionId, sessionName, url, MD5.getMD5(encryptedFileBytes), false, isEncrypted,
                        new String(key), nick1, firstContent, nick2, getContent(secondMsg)
                );
                String pushContent = DemoCache.getContext().getString(R.string.msg_type_multi_retweet);
                //??????MultiRetweet?????????????????????
                IMMessage packedMsg = MessageBuilder.createCustomMessage(firstMsg.getSessionId(), sessionType, pushContent, attachment);
                packedMsg.setPushContent(pushContent);
                callback.onFinished(packedMsg);
            }

            @Override
            public void onFailed(int code) {
                NimLog.d(TAG, "NosService.upload/onFailed, code=" + code);
                file.delete();
                callback.onFailed(code);
            }

            @Override
            public void onException(Throwable exception) {
                NimLog.d(TAG, "NosService.upload/onException, exception=" + exception.getMessage());
                file.delete();
                callback.onException(exception);
            }
        });
    }

    /**
     * ???????????????????????????????????????????????????????????????????????????????????????????????????
     *
     * @param msg ??????????????????
     * @return true: ???????????????; false: ??????????????????
     */
    public static boolean isMultiRetweet(IMMessage msg) {
        return msg != null && msg.getMsgType() == MsgTypeEnum.custom && msg.getAttachment() instanceof MultiRetweetAttachment;
    }

    /**
     * ??????????????????????????? {@link MsgTypeEnum}
     * txt: ??????content
     * ????????????pushContent????????????????????????????????????content??????????????????????????????"[" + MsgTypeEnum.getSendMessageTip() + "]"
     *
     * @param msg ?????????
     * @return ????????????
     */
    public static String getContent(IMMessage msg) {
        if (msg == null) {
            return "";
        }
        MsgTypeEnum type = msg.getMsgType();
        if (type == MsgTypeEnum.text) {
            return msg.getContent();
        } else {
            String content = msg.getPushContent();
            if (!TextUtils.isEmpty(content)) {
                return content;
            }
            content = msg.getContent();
            if (!TextUtils.isEmpty(content)) {
                return content;
            }
            content = "[" + type.getSendMessageTip() + "]";
            return content;
        }
    }

    /**
     * ??????id???type??????????????????????????????????????????????????????
     *
     * @param id          ???????????????id
     * @param sessionType ????????????
     * @return id???????????????
     */
    public static String getStoredNameFromSessionId(final String id, final SessionTypeEnum sessionType) {
        switch (sessionType) {
            case P2P:
                //????????????????????????
                NimUserInfo userInfo = NIMClient.getService(UserService.class).getUserInfo(id);
                if (userInfo == null) {
                    return null;
                }
                return userInfo.getName();
            case Team:
                //???????????????
                Team team = NimUIKit.getTeamProvider().getTeamById(id);
                if (team == null) {
                    return null;
                }
                return team.getName();
            case SUPER_TEAM:
                //???????????????
                SuperTeam superTeam = NimUIKit.getSuperTeamProvider().getTeamById(id);
                if (superTeam == null) {
                    return null;
                }
                return superTeam.getName();
            default:
                return null;
        }
    }

    /**
     * ???????????????RC4??????????????????
     *
     * @return ??????
     */
    public static byte[] genRC4Key() {
        byte[] selectionList = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};
        int keyLen = 16;
        SecureRandom random = new SecureRandom(SecureRandom.getSeed(32));
        byte[] key = new byte[keyLen];
        random.nextBytes(key);
        for (int i = 0; i < key.length; ++i) {
            key[i] = selectionList[Math.abs(key[i] % selectionList.length)];
        }
        return key;
    }

    /**
     * RC4??????
     *
     * @param src ????????????
     * @param key ??????
     * @return ???????????????
     */
    public static byte[] encryptByRC4(byte[] src, byte[] key) {
        try {
            Cipher cipher = Cipher.getInstance("RC4");
            cipher.init(Cipher.ENCRYPT_MODE, new RC4SecretKey(key));
            return cipher.doFinal(src);
        } catch (NoSuchAlgorithmException |
                NoSuchPaddingException |
                InvalidKeyException |
                BadPaddingException |
                IllegalBlockSizeException e) {
            e.printStackTrace();
        }
        return src;
    }

    /**
     * RC4??????
     *
     * @param src ??????
     * @param key ??????
     * @return ???????????????
     */
    public static byte[] decryptByRC4(byte[] src, byte[] key) {
        try {
            Cipher cipher = Cipher.getInstance("RC4");
            cipher.init(Cipher.DECRYPT_MODE, new RC4SecretKey(key));
            return cipher.doFinal(src);
        } catch (NoSuchAlgorithmException |
                NoSuchPaddingException |
                InvalidKeyException |
                BadPaddingException |
                IllegalBlockSizeException e) {
            e.printStackTrace();
        }
        return null;
    }

    private static class RC4SecretKey implements SecretKey {
        private SecretKeySpec spec;

        private RC4SecretKey(byte[] key) {
            this.spec = new SecretKeySpec(key, "RC4");
        }

        @Override
        public String getAlgorithm() {
            return this.spec.getAlgorithm();
        }

        @Override
        public String getFormat() {
            return spec.getFormat();
        }

        @Override
        public byte[] getEncoded() {
            return spec.getEncoded();
        }
    }
}
