package com.netease.biz_live.yunxin.live.liveroom.model.impl;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Rect;
import android.os.CountDownTimer;
import android.text.TextUtils;

import com.google.gson.JsonObject;
import com.netease.biz_live.yunxin.live.constant.LiveParams;
import com.netease.biz_live.yunxin.live.liveroom.model.ControlInfo;
import com.netease.biz_live.yunxin.live.liveroom.model.ErrorCode;
import com.netease.biz_live.yunxin.live.liveroom.model.LiveRoomCallBack;
import com.netease.biz_live.yunxin.live.liveroom.model.NERTCLiveRoom;
import com.netease.biz_live.yunxin.live.liveroom.model.NERTCLiveRoomDelegate;
import com.netease.biz_live.yunxin.live.liveroom.model.state.AcceptState;
import com.netease.biz_live.yunxin.live.liveroom.model.state.CalloutState;
import com.netease.biz_live.yunxin.live.liveroom.model.state.IdleLiveState;
import com.netease.biz_live.yunxin.live.liveroom.model.state.InvitedState;
import com.netease.biz_live.yunxin.live.liveroom.model.state.LiveState;
import com.netease.biz_live.yunxin.live.liveroom.model.state.OffState;
import com.netease.biz_live.yunxin.live.liveroom.model.state.PkingState;
import com.netease.biz_live.yunxin.live.liveroom.msg.PkInfo;
import com.netease.biz_live.yunxin.live.model.LiveInfo;
import com.netease.biz_live.yunxin.live.model.message.MsgPKEnd;
import com.netease.biz_live.yunxin.live.model.message.MsgPKStart;
import com.netease.biz_live.yunxin.live.model.message.MsgPunishStart;
import com.netease.biz_live.yunxin.live.model.message.MsgReward;
import com.netease.biz_live.yunxin.live.model.message.NotificationMessage;
import com.netease.lava.nertc.impl.RtcCode;
import com.netease.lava.nertc.sdk.NERtcCallback;
import com.netease.lava.nertc.sdk.NERtcCallbackEx;
import com.netease.lava.nertc.sdk.NERtcConstants;
import com.netease.lava.nertc.sdk.NERtcEx;
import com.netease.lava.nertc.sdk.NERtcOption;
import com.netease.lava.nertc.sdk.NERtcParameters;
import com.netease.lava.nertc.sdk.audio.NERtcCreateAudioEffectOption;
import com.netease.lava.nertc.sdk.audio.NERtcCreateAudioMixingOption;
import com.netease.lava.nertc.sdk.live.DeleteLiveTaskCallback;
import com.netease.lava.nertc.sdk.live.NERtcLiveStreamLayout;
import com.netease.lava.nertc.sdk.live.NERtcLiveStreamTaskInfo;
import com.netease.lava.nertc.sdk.live.NERtcLiveStreamUserTranscoding;
import com.netease.lava.nertc.sdk.stats.NERtcAudioRecvStats;
import com.netease.lava.nertc.sdk.stats.NERtcAudioSendStats;
import com.netease.lava.nertc.sdk.stats.NERtcAudioVolumeInfo;
import com.netease.lava.nertc.sdk.stats.NERtcNetworkQualityInfo;
import com.netease.lava.nertc.sdk.stats.NERtcStats;
import com.netease.lava.nertc.sdk.stats.NERtcStatsObserver;
import com.netease.lava.nertc.sdk.stats.NERtcVideoRecvStats;
import com.netease.lava.nertc.sdk.stats.NERtcVideoSendStats;
import com.netease.lava.nertc.sdk.video.NERtcRemoteVideoStreamType;
import com.netease.lava.nertc.sdk.video.NERtcVideoCallback;
import com.netease.lava.nertc.sdk.video.NERtcVideoConfig;
import com.netease.lava.nertc.sdk.video.NERtcVideoView;
import com.netease.nimlib.sdk.NIMClient;
import com.netease.nimlib.sdk.Observer;
import com.netease.nimlib.sdk.RequestCallback;
import com.netease.nimlib.sdk.RequestCallbackWrapper;
import com.netease.nimlib.sdk.ResponseCode;
import com.netease.nimlib.sdk.avsignalling.SignallingService;
import com.netease.nimlib.sdk.avsignalling.SignallingServiceObserver;
import com.netease.nimlib.sdk.avsignalling.builder.CallParamBuilder;
import com.netease.nimlib.sdk.avsignalling.builder.InviteParamBuilder;
import com.netease.nimlib.sdk.avsignalling.constant.ChannelType;
import com.netease.nimlib.sdk.avsignalling.constant.SignallingEventType;
import com.netease.nimlib.sdk.avsignalling.event.CanceledInviteEvent;
import com.netease.nimlib.sdk.avsignalling.event.ChannelCloseEvent;
import com.netease.nimlib.sdk.avsignalling.event.ChannelCommonEvent;
import com.netease.nimlib.sdk.avsignalling.event.ControlEvent;
import com.netease.nimlib.sdk.avsignalling.event.InviteAckEvent;
import com.netease.nimlib.sdk.avsignalling.event.InvitedEvent;
import com.netease.nimlib.sdk.avsignalling.event.UserJoinEvent;
import com.netease.nimlib.sdk.avsignalling.event.UserLeaveEvent;
import com.netease.nimlib.sdk.avsignalling.model.ChannelFullInfo;
import com.netease.nimlib.sdk.avsignalling.model.MemberInfo;
import com.netease.nimlib.sdk.passthrough.PassthroughServiceObserve;
import com.netease.nimlib.sdk.passthrough.model.PassthroughNotifyData;
import com.netease.yunxin.android.lib.historian.Historian;
import com.blankj.utilcode.util.GsonUtils;
import com.blankj.utilcode.util.ToastUtils;
import com.netease.yunxin.android.lib.network.common.NetworkClient;

import java.util.ArrayList;

public class NERTCLiveRoomImpl extends NERTCLiveRoom {
    private static final String LOG_TAG = NERTCLiveRoomImpl.class.getSimpleName();

    private static NERTCLiveRoomImpl instance;

    private NERTCLiveRoomDelegate roomDelegate;

    //****************??????????????????start***********************
    private OffState offState;

    private IdleLiveState idleState;

    private CalloutState callOutState;

    private InvitedState invitedState;

    private AcceptState acceptState;

    private PkingState pkingState;

    private LiveState currentState;

    //****************??????????????????end***********************

    //****************?????????????????????start*******************

    private boolean isReceive;//??????????????????
    //????????????
    private boolean haveReceiveImNot;//????????????IM????????????
    private boolean joinedChannel;//????????????rtc ??????
    private boolean pushPkStream;//???PK??????

    private InviteParamBuilder invitedRecord;//????????????????????????????????????

    private String pkChannelId;//IM?????????

    private LiveInfo singleLiveInfo;//?????????????????????

    private long pkSelfUid;//pk????????????uid
    private String pkChannelName;//?????????
    private String pkCheckSum;//check sum
    private String pkSelfAccid;//pk?????????IM accid
    private long pKOtherUid;//pk????????????UID
    private String pkOtherAccid;//pk?????????IM accid
    private String pkLiveCid;//pk??????CId
    private String roomCid;//????????????????????????????????????

    private LiveStreamTaskRecorder singleHostLiveRecoder;

    private LiveStreamTaskRecorder pkLiveRecoder;

    NERtcEx neRtcEx;

    MsgPKEnd pkEnd;

    //****************?????????????????????end*******************

    //************************????????????start********************
    private static final int TIME_OUT_LIMITED = 25 * 1000;//??????????????????

    private int timeOut = TIME_OUT_LIMITED;//?????????????????????2??????

    private CountDownTimer timer;//???????????????
    //************************????????????end********************

    private static final String BUSY_LINE = "busy_now";

    private static final String TIME_OUT_CANCEL = "time_out_cancel";

    /**
     * ????????????{@link NERtcConstants.AudioDevice }
     */
    private int audioDevice;

    /**
     * ???????????????????????????
     */
    private Observer<ChannelCommonEvent> nimOnlineObserver = new Observer<ChannelCommonEvent>() {
        @Override
        public void onEvent(ChannelCommonEvent event) {

            SignallingEventType eventType = event.getEventType();
            Historian.i(LOG_TAG, "receive event = " + eventType);
            switch (eventType) {
                case CLOSE:
                    //??????channel?????????
                    ChannelCloseEvent channelCloseEvent = (ChannelCloseEvent) event;

                    break;
                case JOIN:
                    UserJoinEvent userJoinEvent = (UserJoinEvent) event;

                    break;
                case INVITE:
                    InvitedEvent invitedEvent = (InvitedEvent) event;
                    Historian.i(LOG_TAG, "receive invite signaling request Id = " + invitedEvent.getRequestId() + " status = " + currentState.getStatus());
                    if (currentState.getStatus() != LiveState.STATE_LIVE_ON) {
                        InviteParamBuilder paramBuilder = new InviteParamBuilder(invitedEvent.getChannelBaseInfo().getChannelId(),
                                invitedEvent.getFromAccountId(), invitedEvent.getRequestId());
                        paramBuilder.customInfo(BUSY_LINE);
                        reject(paramBuilder, false, null);
                        break;
                    }
                    pkChannelId = invitedEvent.getChannelBaseInfo().getChannelId();
                    PkInfo pkInfo = GsonUtils.fromJson(invitedEvent.getCustomInfo(), PkInfo.class);
                    if (roomDelegate != null && pkInfo != null) {
                        currentState.invited();
                        startCount(currentState);
                        roomDelegate.receivePKRequest(invitedEvent, pkInfo);
                    }
                    break;
                case CANCEL_INVITE:
                    CanceledInviteEvent canceledInviteEvent = (CanceledInviteEvent) event;
                    Historian.i(LOG_TAG, "receive cancel signaling request Id = " + canceledInviteEvent.getRequestId());
                    if (roomDelegate != null) {
                        roomDelegate.onPkRequestCancel(!TextUtils.equals(canceledInviteEvent.getCustomInfo(), TIME_OUT_CANCEL));
                    }
                    currentState.release();
                    break;
                case REJECT:
                    InviteAckEvent rejectEvent = (InviteAckEvent) event;
                    Historian.i(LOG_TAG, "receive reject signaling request Id = " + rejectEvent.getRequestId());
                    currentState.release();
                    if (roomDelegate != null) {
                        if (TextUtils.equals(rejectEvent.getCustomInfo(), BUSY_LINE)) {
                            roomDelegate.onUserBusy(rejectEvent.getFromAccountId());
                        } else {
                            roomDelegate.pkRequestRejected(rejectEvent.getFromAccountId());
                        }
                    }
                    break;
                case ACCEPT:
                    handleAccept();
                    break;
                case LEAVE:
                    UserLeaveEvent userLeaveEvent = (UserLeaveEvent) event;
                    break;
                case CONTROL:
                    ControlEvent controlEvent = (ControlEvent) event;
                    ControlInfo controlInfo = GsonUtils.fromJson(controlEvent.getCustomInfo(), ControlInfo.class);
                    if (controlInfo != null && controlInfo.cid == 1) {
                        startJoinPkRoom();
                    }
                    break;
            }
        }
    };

    /**
     * ????????????
     */
    private void handleAccept() {
        Historian.i(LOG_TAG, "handle accept status = " + currentState.getStatus());
        if (currentState.getStatus() == LiveState.STATE_CALL_OUT && roomDelegate != null) {
            roomDelegate.onAccept();
        }
        currentState.accept();
        startCount(currentState);
        isReceive = false;
    }


    /**
     * rtc ????????????
     */
    private NERtcStatsObserver statsObserver = new NERtcStatsObserverTemp() {

        boolean showErrorNetWork = false;

        @Override
        public void onNetworkQuality(NERtcNetworkQualityInfo[] stats) {
            /**
             *             0	??????????????????
             *             1	??????????????????
             *             2	?????????????????????????????????????????????????????????????????????
             *             3	?????????????????????
             *             4	???????????????
             *             5	??????????????????
             */
            if (stats == null || stats.length == 0) {
                return;
            }

            for (NERtcNetworkQualityInfo networkQualityInfo : stats) {
                if (currentState.getStatus() == LiveState.STATE_PKING &&
                        networkQualityInfo.userId != pkSelfUid) {
                    Historian.i(LOG_TAG, "network state is " + networkQualityInfo.upStatus);
                    if (networkQualityInfo.upStatus >= 4) {
                        ToastUtils.showShort("????????????????????????");
                    } else if (networkQualityInfo.upStatus == 0) {
                        if (showErrorNetWork) {
                            ToastUtils.showShort("??????????????????????????????");
                        }
                    }
                    showErrorNetWork = true;
                }
            }
        }
    };

    /**
     * Nertc?????????
     */
    private NERtcCallback rtcCallback = new NERtcCallbackExTemp() {

        @Override
        public void onAudioDeviceChanged(int i) {
            Historian.i(LOG_TAG, "onAudioDeviceChanged i " + i);
            audioDevice = i;
        }

        @Override
        public void onAudioMixingStateChanged(int i) {
            if(roomDelegate != null){
                roomDelegate.onAudioMixingFinished();
            }
        }

        @Override
        public void onAudioEffectFinished(int effectId) {
            if (roomDelegate != null) {
                roomDelegate.onAudioEffectFinished(effectId);
            }
        }

        @Override
        public void onJoinChannel(int i, long l, long l1) {
            Historian.i(LOG_TAG, "onJoinChannel state = " + currentState.getStatus());
            if (currentState.getStatus() == LiveState.STATE_ACCEPTED && isReceive) { //??????????????????????????????
                sendControlEvent(pkChannelId, pkOtherAccid, new ControlInfo(1));
            } else if (haveReceiveImNot) {
                Historian.i(LOG_TAG, "onJoinChannel push Stream ");
                startLiveStreamTask();
            }
            joinedChannel = true;

        }

        @Override
        public void onLeaveChannel(int i) {
            Historian.i(LOG_TAG, "onLeaveChannel state = " + currentState.getStatus());
            if (currentState.getStatus() == LiveState.STATE_ACCEPTED) {
                joinChannel(pkCheckSum, pkChannelName, pkSelfUid);
            } else if (currentState.getStatus() == LiveState.STATE_PKING) {
                joinChannel(singleLiveInfo.avRoomCheckSum, singleLiveInfo.avRoomCName, singleLiveInfo.avRoomUid);
            }
            haveReceiveImNot = false;
            joinedChannel = false;
        }

        @Override
        public void onUserJoined(long userId) {
            pKOtherUid = userId;
        }


        @Override
        public void onUserAudioStart(long l) {
            NERtcEx.getInstance().subscribeRemoteAudioStream(l, true);
        }

        @Override
        public void onUserVideoStart(long l, int i) {
            NERtcEx.getInstance().subscribeRemoteVideoStream(l, NERtcRemoteVideoStreamType.kNERtcRemoteVideoStreamTypeHigh, true);

        }


        @Override
        public void onDisconnect(int i) {
            currentState.offLive();
            if (roomDelegate != null) {
                roomDelegate.onError(true, ErrorCode.ERROR_CODE_DISCONNECT, "??????????????????");
            }
        }
    };

    /**
     * ???????????????
     */
    private Observer<PassthroughNotifyData> p2pMsg = (Observer<PassthroughNotifyData>) eventData -> {
        Historian.i(LOG_TAG, "IM MSG receive = " + eventData.getBody() + " \n state = " + currentState.getStatus()
                + " roomCid = " + roomCid);
        if (neRtcEx == null) {
            currentState.offLive();
            if (roomDelegate != null) {
                roomDelegate.onError(true, ErrorCode.ERROR_CODE_ENGINE_NULL, "rtc have released");
            }
        }
        if(singleLiveInfo == null){//??????????????????????????????case
            return;
        }
        JsonObject jsonObject = GsonUtils.fromJson(eventData.getBody(), JsonObject.class);
        String type = jsonObject.get("type").toString();
        switch (type) {
            case NotificationMessage.TYPE_LIVE_START:
                if (roomDelegate != null) {
                    if (currentState.getStatus() == LiveState.STATE_PKING) {
                        roomDelegate.onPKEnd(!pkEnd.data.countdownEnd, pkEnd.data.closedNickname);
                        pkEnd = null;
                    } else if (currentState.getStatus() == LiveState.STATE_LIVE_OFF) {
                        roomDelegate.onRoomLiveStart();
                    }
                }
                currentState.release();
                haveReceiveImNot = true;
                pushPkStream = false;
                if (joinedChannel) {
                    startLiveStreamTask();
                }
                break;
            case NotificationMessage.TYPE_AUDIENCE_REWARD:
                MsgReward rewardNotification = GsonUtils.fromJson(eventData.getBody(), MsgReward.class);
                if (roomDelegate != null) {
                    roomDelegate.onUserReward(rewardNotification.data);
                }
                break;
            case NotificationMessage.TYPE_PK_START:
                MsgPKStart pkStart = GsonUtils.fromJson(eventData.getBody(), MsgPKStart.class);
                //????????????uid
                if(currentState.getStatus() != LiveState.STATE_ACCEPTED){
                    break;
                }
                if (isReceive) {
                    pKOtherUid = pkStart.data.inviterRoomUid;
                } else {
                    pKOtherUid = pkStart.data.inviteeRoomUid;
                }
                currentState.startPk();
                haveReceiveImNot = true;
                pushPkStream = true;
                if (roomDelegate != null) {
                    roomDelegate.onPkStart(pkStart.data);
                }
                if (joinedChannel) {
                    startLiveStreamTask();
                }
                break;
            case NotificationMessage.TYPE_PUNISH_START:
                MsgPunishStart punishStart = GsonUtils.fromJson(eventData.getBody(), MsgPunishStart.class);
                if (punishStart == null || punishStart.data == null || !TextUtils.equals(punishStart.data.roomCid, roomCid)) {
                    break;
                }
                if (roomDelegate != null) {
                    roomDelegate.onPunishStart(punishStart.data);
                }
                break;
            case NotificationMessage.TYPE_PK_END:
                if (currentState.getStatus() != LiveState.STATE_PKING) {
                    break;
                }
                MsgPKEnd msgPKEnd = GsonUtils.fromJson(eventData.getBody(), MsgPKEnd.class);
                if (msgPKEnd == null || msgPKEnd.data == null || !TextUtils.equals(msgPKEnd.data.roomCid, roomCid)) {
                    break;
                }
                pkEnd = msgPKEnd;
                if (roomDelegate != null) {
                    roomDelegate.preJoinRoom(singleLiveInfo.liveCid, false, null);
                }
                break;
        }
    };


    public static synchronized NERTCLiveRoomImpl sharedInstance() {
        if (instance == null) {
            instance = new NERTCLiveRoomImpl();
        }
        return instance;
    }

    @Override
    public void setDelegate(NERTCLiveRoomDelegate delegate) {
        roomDelegate = delegate;
    }

    public static synchronized void destroySharedInstance() {
        if (instance != null) {
            instance.destroy();
            instance = null;
        }
    }

    private NERTCLiveRoomImpl() {

    }

    private void destroy() {
        if(neRtcEx != null){
            neRtcEx.release();
        }

    }

    public OffState getOffState() {
        return offState;
    }

    public IdleLiveState getIdleState() {
        return idleState;
    }

    public InvitedState getInvitedState() {
        return invitedState;
    }

    public AcceptState getAcceptState() {
        return acceptState;
    }

    public PkingState getPkingState() {
        return pkingState;
    }

    public CalloutState getCallOutState() {
        return callOutState;
    }

    public LiveState getCurrentState() {
        return currentState;
    }

    public void setState(LiveState liveState) {
        this.currentState = liveState;
    }

    @Override
    public void init(Context context, String appKey,
                     NERtcOption option) {
        if (neRtcEx != null) {
            neRtcEx.release();
        }

        neRtcEx = NERtcEx.getInstance();
        NERtcVideoConfig videoConfig = new NERtcVideoConfig();
        videoConfig.frontCamera = true;//????????????????????????
        neRtcEx.setLocalVideoConfig(videoConfig);

        try {
            neRtcEx.init(context, appKey, rtcCallback, option);
        } catch (Exception e) {
            Historian.i(LOG_TAG, "nertc init failed exception", e);
            ToastUtils.showLong("SDK ???????????????");
            return;
        }
        neRtcEx.setStatsObserver(statsObserver);
        initState();
        NIMClient.getService(SignallingServiceObserver.class).observeOnlineNotification(nimOnlineObserver, true);
        NIMClient.getService(PassthroughServiceObserve.class).observePassthroughNotify(p2pMsg, true);
    }

    private void initState() {
        offState = new OffState(this);
        idleState = new IdleLiveState(this);
        callOutState = new CalloutState(this);
        invitedState = new InvitedState(this);
        pkingState = new PkingState(this);
        acceptState = new AcceptState(this);
        currentState = offState;
    }

    @Override
    public void createRoom(LiveInfo liveInfo,
                           int profile, NERtcVideoConfig.NERtcVideoFrameRate frameRate,
                           int mAudioScenario, boolean isFrontCam,
                           LiveRoomCallBack callBack) {
        Historian.i(LOG_TAG, "createRoom: liveCid = " + liveInfo.liveCid);
        singleLiveInfo = liveInfo;
        NERtcVideoConfig videoConfig = new NERtcVideoConfig();
        videoConfig.videoProfile = profile;
        videoConfig.frameRate = frameRate;
        videoConfig.frontCamera = isFrontCam;
        neRtcEx.setLocalVideoConfig(videoConfig);
        if (mAudioScenario == NERtcConstants.AudioScenario.MUSIC) {
            neRtcEx.setAudioProfile(NERtcConstants.AudioProfile.HIGH_QUALITY_STEREO, mAudioScenario);
        } else {
            neRtcEx.setAudioProfile(NERtcConstants.AudioProfile.DEFAULT, mAudioScenario);
        }
        neRtcEx.setChannelProfile(NERtcConstants.RTCChannelProfile.LIVE_BROADCASTING);
        neRtcEx.setClientRole(NERtcConstants.UserRole.CLIENT_ROLE_BROADCASTER);
        NERtcParameters parameters = new NERtcParameters();
        parameters.set(NERtcParameters.KEY_PUBLISH_SELF_STREAM, true);
        neRtcEx.setParameters(parameters);
        startSignalLive(liveInfo.liveConfig.pushUrl, callBack);
    }

    @Override
    public void requestPK(String selfAccid, String accountId, String pkLiveCid, String cdnURL, String selfNickname, LiveRoomCallBack pkRequestCallback) {
        pkSelfAccid = selfAccid;
        this.pkLiveCid = pkLiveCid;
        currentState.callPk();
        startCount(currentState);//???????????????
        callOtherPk(ChannelType.CUSTOM, accountId, selfNickname, pkLiveCid, pkRequestCallback);
    }

    /**
     * ??????PK???????????????
     */
    private void startJoinPkRoom() {
        Historian.i(LOG_TAG, "startJoinPkRoom");
        if (roomDelegate != null) {
            roomDelegate.preJoinRoom(pkLiveCid, true, singleLiveInfo.liveCid);
        }
    }

    /**
     * ??????????????????
     *
     * @param controlInfo
     */
    private void sendControlEvent(String channelId, String accountId, ControlInfo controlInfo) {
        NIMClient.getService(SignallingService.class).sendControl(channelId, accountId, GsonUtils.toJson(controlInfo));
    }

    /**
     * ???????????????
     *
     * @param cdnURL
     * @param callBack
     */
    private void startSignalLive(String cdnURL, LiveRoomCallBack callBack) {
        int rtcResult = -1;
        Historian.i(LOG_TAG, "startSignalLive");
        rtcResult = joinChannel(singleLiveInfo.avRoomCheckSum, singleLiveInfo.avRoomCName, singleLiveInfo.avRoomUid);
        if (rtcResult == 0) {
            callBack.onSuccess();
        } else {
            callBack.onError(rtcResult, "join rtcChannel failed!");
        }
    }

    /**
     * ??????rtc?????????
     *
     * @param token
     * @param channelName
     * @param channelUid
     * @return
     */
    private int joinChannel(String token, String channelName, long channelUid) {
        Historian.i(LOG_TAG, "joinChannel channelName = " + channelName + " uid = " + channelUid);
        if (channelUid != 0) {
            return NERtcEx.getInstance().joinChannel(token, channelName, channelUid);
        }
        return -1;
    }

    /**
     * ????????????
     */
    private void startLiveStreamTask() {
        Historian.i(LOG_TAG, "startLiveStreamTask isPk  = " + pushPkStream);
        haveReceiveImNot = false;
        if (!pushPkStream) {
            //???????????????????????????
            singleHostLiveRecoder = new LiveStreamTaskRecorder(singleLiveInfo.liveConfig.pushUrl, singleLiveInfo.avRoomUid);
            int streamResult = addLiveStreamTask(singleHostLiveRecoder);
            if (streamResult != 0) {
                //todo error
                Historian.i(LOG_TAG, "single task failed result = " + streamResult);
            }
        } else {
            pkLiveRecoder = new LiveStreamTaskRecorder(singleLiveInfo.liveConfig.pushUrl, true, pkSelfUid, pKOtherUid);
            int result = addLiveStreamTask(pkLiveRecoder);
            if (result != 0) {
                //todo error
                Historian.i(LOG_TAG, "pk task failed result = " + result);
            }
        }
    }

    /**
     * ??????????????????
     *
     * @param liveRecoder
     * @return
     */
    private int addLiveStreamTask(LiveStreamTaskRecorder liveRecoder) {
        // ?????????????????????
        NERtcLiveStreamTaskInfo liveTask1 = new NERtcLiveStreamTaskInfo();
        //taskID ?????????????????????????????????????????????64???
        liveTask1.taskId = liveRecoder.taskId;
        // ??????????????????????????????????????????
        liveTask1.url = liveRecoder.pushUlr;
        // ?????????????????????????????????????????????????????????????????????
        liveTask1.serverRecordEnabled = false;
        // ???????????????????????????????????????
        liveTask1.liveMode = NERtcLiveStreamTaskInfo.NERtcLiveStreamMode.kNERtcLsModeVideo;

        //??????????????????
        NERtcLiveStreamLayout layout = new NERtcLiveStreamLayout();
        layout.userTranscodingList = new ArrayList<>();
        if (liveRecoder.isPk) {
            layout.width = LiveParams.SIGNAL_HOST_LIVE_WIDTH;//??????????????????
            layout.height = LiveParams.PK_LIVE_HEIGHT;//??????????????????
        } else {
            layout.width = LiveParams.SIGNAL_HOST_LIVE_WIDTH;//??????????????????
            layout.height = LiveParams.SIGNAL_HOST_LIVE_HEIGHT;//??????????????????
        }
        layout.backgroundColor = Color.parseColor("#000000"); // ???????????????
        liveTask1.layout = layout;

        // ????????????????????????
        if (liveRecoder.uid1 != 0) {
            NERtcLiveStreamUserTranscoding user1 = new NERtcLiveStreamUserTranscoding();
            user1.uid = liveRecoder.uid1; // ??????id
            user1.audioPush = true; // ??????????????????user1 ?????????
            user1.videoPush = true; // ??????????????????user1?????????

            // ?????????????????????????????????????????????????????????
            // user1 ???????????????????????? ????????????NERtcLiveStreamUserTranscoding ???API ??????
            user1.adaption = NERtcLiveStreamUserTranscoding.NERtcLiveStreamVideoScaleMode.kNERtcLsModeVideoScaleCropFill;
            //????????????????????????
            if (liveRecoder.isPk) {
                user1.width = LiveParams.PK_LIVE_WIDTH; // user1 ?????????????????????
                user1.height = LiveParams.PK_LIVE_HEIGHT; //user1 ?????????????????????
            } else {
                user1.width = LiveParams.SIGNAL_HOST_LIVE_WIDTH; // user1 ?????????????????????
                user1.height = LiveParams.SIGNAL_HOST_LIVE_HEIGHT; //user1 ?????????????????????
            }

            layout.userTranscodingList.add(user1);
        }

        if (liveRecoder.isPk && liveRecoder.uid2 != 0) {
            NERtcLiveStreamUserTranscoding user2 = new NERtcLiveStreamUserTranscoding();
            user2.uid = liveRecoder.uid2; // ??????id
            user2.audioPush = true; // ??????????????????user1 ?????????
            user2.videoPush = true; // ??????????????????user1?????????

            // user1 ???????????????????????? ????????????NERtcLiveStreamUserTranscoding ???API ??????
            user2.adaption = NERtcLiveStreamUserTranscoding.NERtcLiveStreamVideoScaleMode.kNERtcLsModeVideoScaleCropFill;
            //????????????????????????
            user2.x = LiveParams.PK_LIVE_WIDTH;
            user2.y = 0;
            user2.width = LiveParams.PK_LIVE_WIDTH; // user1 ?????????????????????
            user2.height = LiveParams.PK_LIVE_HEIGHT; //user1 ?????????????????????

            layout.userTranscodingList.add(user2);
        }

        Historian.i(LOG_TAG, "addLiveStreamTask recoder = " + liveRecoder.toString());

        int ret = neRtcEx.addLiveStreamTask(liveTask1, (s, code) -> {
            if (code == RtcCode.LiveCode.OK) {
                Historian.i(LOG_TAG, "addLiveStream success : taskId " + liveRecoder.taskId);
            } else {
                Historian.i(LOG_TAG, "addLiveStream failed : taskId " + liveRecoder.taskId + " , code : " + code);
            }
        });

        if (ret != 0) {
            Historian.i(LOG_TAG, "addLiveStream failed : taskId " + liveRecoder.taskId + " , ret : " + ret);
        }

        return ret;
    }

    /**
     * ??????????????????
     *
     * @param callback
     * @return
     */
    private int removeLiveTask(LiveStreamTaskRecorder liveRecoder, DeleteLiveTaskCallback callback) {
        if (neRtcEx == null) {
            return -1;
        }
        return neRtcEx.removeLiveStreamTask(liveRecoder.taskId, callback);
    }

    /**
     * ??????IM?????????????????????
     *
     * @param type
     * @param callUserId
     * @param callback
     */
    private void callOtherPk(ChannelType type, String callUserId, String selfNickname, String pkLiveCid, LiveRoomCallBack callback) {
        String requestId = getRequestId();
        CallParamBuilder callParam = new CallParamBuilder(type, callUserId, requestId);
        callParam.offlineEnabled(true);
        String custom = GsonUtils.toJson(new PkInfo(pkLiveCid, selfNickname));
        callParam.customInfo(custom);
        NIMClient.getService(SignallingService.class).call(callParam).setCallback(new RequestCallback<ChannelFullInfo>() {
            @Override
            public void onSuccess(ChannelFullInfo param) {
                //??????????????????????????????
                invitedRecord = new InviteParamBuilder(param.getChannelId(), callUserId, requestId);
                pkChannelId = param.getChannelId();
                callback.onSuccess();
                Historian.i(LOG_TAG, "send pk request success request Id = " + requestId);
            }

            @Override
            public void onFailed(int code) {
                Historian.i(LOG_TAG, "im call failed code = " + code);
                callback.onError(code, "im call failed code");
                currentState.release();
            }

            @Override
            public void onException(Throwable exception) {
                Historian.i(LOG_TAG, "call exception", exception);
                currentState.release();
            }
        });

    }

    /**
     * ??????????????????????????????timeout
     */
    private void startCount(LiveState startState) {
        if (timer != null) {
            timer.cancel();
            timer = null;
        }
        timer = new CountDownTimer(timeOut, 1000) {
            @Override
            public void onTick(long l) {
                if (currentState.getStatus() != startState.getStatus()) {
                    timer.cancel();
                }
            }

            @Override
            public void onFinish() {
                Historian.i(LOG_TAG, "time out status = " + currentState.getStatus());
                int code = 0;
                if (currentState.getStatus() == LiveState.STATE_ACCEPTED) {
                    code = ErrorCode.ERROR_CODE_TIME_OUT_ACCEPTED;
                    currentState.release();
                } else if (currentState.getStatus() == LiveState.STATE_CALL_OUT) {
                    NERTCLiveRoomImpl.this.cancelPkRequest(null, false);
                    code = ErrorCode.ERROR_CODE_TIME_OUT_CALL_OUT;
                } else if (currentState.getStatus() == LiveState.STATE_INVITED) {
                    currentState.release();
                    code = ErrorCode.ERROR_CODE_TIME_OUT_ACCEPT;
                }
                if (roomDelegate != null) {
                    roomDelegate.onTimeOut(code);
                    if(!joinedChannel){
                         roomDelegate.preJoinRoom(singleLiveInfo.liveCid, false, null);
                    }
                }
            }
        };

        timer.start();
    }

    /**
     * ?????????????????????requestID
     *
     * @return
     */
    private String getRequestId() {
        int randomInt = (int) (Math.random() * 100);
        Historian.i(LOG_TAG, "random int = " + randomInt);
        return System.currentTimeMillis() + randomInt + "_id";
    }


    @Override
    public void acceptPk(String pkLiveCid, String imAccid, String requestId, String accId, LiveRoomCallBack pkCallback) {
        this.pkSelfAccid = accId;
        this.pkOtherAccid = imAccid;
        this.pkLiveCid = pkLiveCid;
        if (timer != null) {
            timer.cancel();
        }
        InviteParamBuilder inviteParam = new InviteParamBuilder(pkChannelId, imAccid, requestId);
        NIMClient.getService(SignallingService.class).acceptInviteAndJoin(inviteParam, 0).setCallback(
                new RequestCallbackWrapper<ChannelFullInfo>() {

                    @Override
                    public void onResult(int code, ChannelFullInfo channelFullInfo, Throwable throwable) {
                        if (code == ResponseCode.RES_SUCCESS) {
                            currentState.accept();
                            startCount(currentState);
                            isReceive = true;
                            storeUid(channelFullInfo.getMembers(), accId);
                            startJoinPkRoom();
                            pkCallback.onSuccess();
                            Historian.i(LOG_TAG, "pk accept success");
                        } else {
                            Historian.i(LOG_TAG, "pk accept failed code = " + code);
                            pkCallback.onError(code, "accept pk error");
                        }
                    }
                });
    }

    /**
     * ???????????????rtc channel ??????uid
     *
     * @param memberInfos
     * @param selfAccid
     */
    private void storeUid(ArrayList<MemberInfo> memberInfos, String selfAccid) {
        for (MemberInfo member : memberInfos) {
            if (TextUtils.equals(member.getAccountId(), selfAccid)) {
                pkSelfUid = member.getUid();
            }
        }
    }


    @Override
    public void stopLive() {
        currentState.offLive();
        NIMClient.getService(SignallingServiceObserver.class).observeOnlineNotification(nimOnlineObserver, false);
        NIMClient.getService(PassthroughServiceObserve.class).observePassthroughNotify(p2pMsg, false);
        if (neRtcEx != null) {
            neRtcEx.leaveChannel();
            neRtcEx.release();
            neRtcEx = null;
        }
        if (timer != null) {
            timer.cancel();
            timer = null;
        }
    }

    @Override
    public void setupLocalView(NERtcVideoView videoRender) {
        if (neRtcEx == null) {
            return;
        }
        if (videoRender == null) {
            neRtcEx.setupLocalVideoCanvas(null);
            return;
        }
        neRtcEx.enableLocalAudio(true);
        neRtcEx.enableLocalVideo(true);
        videoRender.setZOrderMediaOverlay(true);
        videoRender.setScalingType(NERtcConstants.VideoScalingType.SCALE_ASPECT_BALANCED);
        int result = neRtcEx.setupLocalVideoCanvas(videoRender);
        Historian.i(LOG_TAG, "setupLocalView result = " + result);
    }

    @Override
    public void setupRemoteView(NERtcVideoView videoRender, long uid) {
        if (neRtcEx == null) {
            return;
        }
        videoRender.setScalingType(NERtcConstants.VideoScalingType.SCALE_ASPECT_BALANCED);
        neRtcEx.setupRemoteVideoCanvas(videoRender, uid);
    }

    @Override
    public void setVideoCallback(NERtcVideoCallback callback, boolean needI420) {
        if (neRtcEx != null) {
            neRtcEx.setVideoCallback(callback, needI420);
        }
    }

    @Override
    public void rejectPkRequest(InviteParamBuilder inviteParam, LiveRoomCallBack callBack) {
        reject(inviteParam, true, callBack);
    }

    @Override
    public void joinRtcChannel(String checkSum, String channelName, long uid, String avRoomCid) {
        Historian.i(LOG_TAG, "joinRtcChannel ");
        if (currentState.getStatus() == LiveState.STATE_ACCEPTED) {
            pkSelfUid = uid;
            pkCheckSum = checkSum;
            pkChannelName = channelName;
        }
        if (currentState == pkingState) {
            singleLiveInfo.avRoomCheckSum = checkSum;
            singleLiveInfo.avRoomUid = uid;
            singleLiveInfo.avRoomCName = channelName;
        }
        roomCid = avRoomCid;
        if (currentState.getStatus() == LiveState.STATE_PKING) {
            removeLiveTask(pkLiveRecoder, (s, code) -> {
                if (code != RtcCode.LiveCode.OK) {
                    Historian.i(LOG_TAG, "remove Live Task failed code = " + code + " s =" + s);
                }
                neRtcEx.leaveChannel();
            });
        } else {
            removeLiveTask(singleHostLiveRecoder, (s, code) -> {
                if (code != RtcCode.LiveCode.OK) {
                    Historian.i(LOG_TAG, "remove Live Task failed code = " + code + " s =" + s);
                }
                neRtcEx.leaveChannel();
            });
        }
    }

    /**
     * ??????
     *
     * @param inviteParam
     * @param byUser
     */
    private void reject(InviteParamBuilder inviteParam, boolean byUser, LiveRoomCallBack callBack) {
        Historian.i(LOG_TAG, "reject by user = " + byUser);
        NIMClient.getService(SignallingService.class).rejectInvite(inviteParam).setCallback(new RequestCallback<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                if (byUser) {
                    currentState.release();
                }
                if (callBack != null) {
                    callBack.onSuccess();
                }
            }

            @Override
            public void onFailed(int i) {
                if (byUser) {
                    currentState.release();
                }
                if (callBack != null) {
                    callBack.onError(i, "reject error");
                }
            }

            @Override
            public void onException(Throwable throwable) {
                if (callBack != null) {
                    callBack.onError(-1, "reject on exception");
                }
                if (byUser) {
                    currentState.release();
                }
            }
        });

    }

    @Override
    public LiveState getLiveCurrentState() {
        return currentState;
    }

    @Override
    public void startVideoPreview() {
        neRtcEx.startVideoPreview();
    }

    @Override
    public void stopVideoPreview() {
        neRtcEx.stopVideoPreview();
    }

    @Override
    public void stopAudioMixing() {
        neRtcEx.stopAudioMixing();
    }

    @Override
    public void setAudioMixingSendVolume(int progress) {
        neRtcEx.setAudioMixingSendVolume(progress);
    }

    @Override
    public void setAudioMixingPlaybackVolume(int progress) {
        neRtcEx.setAudioMixingPlaybackVolume(progress);
    }

    @Override
    public void setEffectSendVolume(int id, int volume) {
        neRtcEx.setEffectSendVolume(id, volume);
    }

    @Override
    public void setEffectPlaybackVolume(int id, int volume) {
        neRtcEx.setEffectPlaybackVolume(id, volume);
    }

    @Override
    public boolean switchCamera() {
        return NERtcEx.getInstance().switchCamera() == 0;
    }

    @Override
    public boolean enableLocalVideo(boolean enable) {
        return NERtcEx.getInstance().enableLocalVideo(enable) == 0;
    }

    @Override
    public boolean muteLocalAudio(boolean isMute) {
        return NERtcEx.getInstance().muteLocalAudioStream(isMute) == 0;
    }

    @Override
    public boolean enableEarback(boolean enable, int volume) {
        if(audioDevice == NERtcConstants.AudioDevice.BLUETOOTH_HEADSET ||
            audioDevice == NERtcConstants.AudioDevice.WIRED_HEADSET){
            return NERtcEx.getInstance().enableEarback(enable, volume) == 0;
        } else {
            ToastUtils.showShort("?????????????????????????????????????????????");
            return false;
        }

    }

    @Override
    public void cancelPkRequest(RequestCallback<Void> callback, boolean byUser) {
        if (invitedRecord != null) {
            invitedRecord.customInfo(byUser ? "" : TIME_OUT_CANCEL);
            NIMClient.getService(SignallingService.class).cancelInvite(invitedRecord).setCallback(new RequestCallback<Void>() {
                @Override
                public void onSuccess(Void param) {
                    if (callback != null) {
                        callback.onSuccess(param);
                    }
                    invitedRecord = null;
                    currentState.release();
                }

                @Override
                public void onFailed(int code) {
                    if (callback != null) {
                        callback.onFailed(code);
                    }
                    if (code != ResponseCode.RES_INVITE_HAS_ACCEPT) {//????????????????????????????????????????????????????????????????????????
                        currentState.release();
                    } else {
                        handleAccept();
                    }
                }

                @Override
                public void onException(Throwable exception) {
                    if (callback != null) {
                        callback.onException(exception);
                    }
                    invitedRecord = null;
                    currentState.release();
                }
            });
        } else {
            if (callback != null) {
                callback.onFailed(-1);
            }
            currentState.release();
        }
    }

    @Override
    public int stopEffect(int id) {
        return neRtcEx.stopEffect(id);
    }

    @Override
    public int playEffect(int id, NERtcCreateAudioEffectOption option) {
        return neRtcEx.playEffect(id, option);
    }

    @Override
    public int startAudioMixing(NERtcCreateAudioMixingOption option) {
        return neRtcEx.startAudioMixing(option);
    }

    @Override
    public void stopAllEffects() {
        neRtcEx.stopAllEffects();
    }

}
