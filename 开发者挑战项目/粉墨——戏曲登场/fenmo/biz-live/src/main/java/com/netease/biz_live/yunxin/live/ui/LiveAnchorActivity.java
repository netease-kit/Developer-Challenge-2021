package com.netease.biz_live.yunxin.live.ui;

import android.content.Context;
import android.content.Intent;
import android.hardware.Camera;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;

import com.netease.biz_live.R;
import com.netease.biz_live.yunxin.live.audience.utils.InputUtils;
import com.netease.biz_live.yunxin.live.audience.utils.StringUtils;
import com.netease.biz_live.yunxin.live.chatroom.control.Anchor;
import com.netease.biz_live.yunxin.live.chatroom.control.ChatRoomNotify;
import com.netease.biz_live.yunxin.live.chatroom.control.SkeletonChatRoomNotify;
import com.netease.biz_live.yunxin.live.chatroom.custom.AnchorCoinChangedAttachment;
import com.netease.biz_live.yunxin.live.chatroom.custom.PKStatusAttachment;
import com.netease.biz_live.yunxin.live.chatroom.custom.PunishmentStatusAttachment;
import com.netease.biz_live.yunxin.live.chatroom.model.AudienceInfo;
import com.netease.biz_live.yunxin.live.chatroom.model.LiveChatRoomInfo;
import com.netease.biz_live.yunxin.live.chatroom.model.RewardGiftInfo;
import com.netease.biz_live.yunxin.live.chatroom.model.RoomMsg;
import com.netease.biz_live.yunxin.live.constant.LiveTimeDef;
import com.netease.biz_live.yunxin.live.dialog.AnchorListDialog;
import com.netease.biz_live.yunxin.live.dialog.AnchorMoreDialog;
import com.netease.biz_live.yunxin.live.dialog.ChoiceDialog;
import com.netease.biz_live.yunxin.live.dialog.LiveSettingDialog;
import com.netease.biz_live.yunxin.live.liveroom.model.ErrorCode;
import com.netease.biz_live.yunxin.live.liveroom.model.LiveRoomCallBack;
import com.netease.biz_live.yunxin.live.liveroom.model.NERTCLiveRoom;
import com.netease.biz_live.yunxin.live.liveroom.model.NERTCLiveRoomDelegate;
import com.netease.biz_live.yunxin.live.liveroom.model.state.LiveState;
import com.netease.biz_live.yunxin.live.liveroom.msg.PkInfo;
import com.netease.biz_live.yunxin.live.model.JoinInfo;
import com.netease.biz_live.yunxin.live.model.LiveInfo;
import com.netease.biz_live.yunxin.live.model.message.MsgPKStart;
import com.netease.biz_live.yunxin.live.model.message.MsgPunishStart;
import com.netease.biz_live.yunxin.live.model.message.MsgReward;
import com.netease.biz_live.yunxin.live.network.LiveInteraction;
import com.netease.biz_live.yunxin.live.ui.widget.AudiencePortraitRecyclerView;
import com.netease.biz_live.yunxin.live.ui.widget.ChatRoomMsgRecyclerView;
import com.netease.biz_live.yunxin.live.ui.widget.PKControlView;
import com.netease.biz_live.yunxin.live.ui.widget.PKVideoView;
import com.netease.lava.nertc.sdk.NERtc;
import com.netease.lava.nertc.sdk.NERtcConstants;
import com.netease.lava.nertc.sdk.NERtcOption;
import com.netease.lava.nertc.sdk.video.NERtcVideoConfig;
import com.netease.lava.nertc.sdk.video.NERtcVideoView;
import com.netease.nimlib.sdk.RequestCallback;
import com.netease.nimlib.sdk.ResponseCode;
import com.netease.nimlib.sdk.avsignalling.builder.InviteParamBuilder;
import com.netease.nimlib.sdk.avsignalling.event.InvitedEvent;
import com.netease.yunxin.android.lib.historian.Historian;
import com.netease.yunxin.android.lib.network.common.BaseResponse;
import com.netease.yunxin.android.lib.picture.ImageLoader;
import com.blankj.utilcode.util.PermissionUtils;
import com.blankj.utilcode.util.ToastUtils;
import com.netease.yunxin.nertc.demo.basic.BaseActivity;
import com.netease.yunxin.nertc.demo.basic.BuildConfig;
import com.netease.yunxin.nertc.demo.basic.StatusBarConfig;
import com.netease.yunxin.nertc.demo.user.UserCenterService;
import com.netease.yunxin.nertc.demo.utils.SpUtils;
import com.netease.yunxin.nertc.demo.utils.ViewUtils;
import com.netease.yunxin.nertc.module.base.ModuleServiceMgr;

import java.util.List;

import io.reactivex.observers.ResourceSingleObserver;

/**
 * ??????????????????
 */
public class LiveAnchorActivity extends BaseActivity implements NERTCLiveRoomDelegate {

    private static final String LOG_TAG = "NERTCLiveRoomImpl";

    private NERtcVideoView videoView;

    private NERTCLiveRoom liveRoom;

    //*******************????????????*******************
    private int videoProfile = NERtcConstants.VideoProfile.HD720P;//???????????????

    private NERtcVideoConfig.NERtcVideoFrameRate frameRate = NERtcVideoConfig.NERtcVideoFrameRate.FRAME_RATE_FPS_30;//??????

    private int audioScenario = NERtcConstants.AudioScenario.MUSIC;//????????????

    //*******************??????UI*********************
    private ConstraintLayout clyCreateLive;
    //?????????????????????
    private ImageView ivSwitchCamera;
    //??????
    private LinearLayout llyBeauty;
    //??????
    private LinearLayout llySetting;
    //??????
    private LinearLayout llyFilter;

    private EditText edtTopic;

    private BeautyControl beautyControl;

    private Button btnLiveCreate;//????????????
    //??????
    private ImageView ivClose;
    //??????
    private ImageView ivCover;
    //??????topic
    private ImageView ivRandom;

    private ImageView ivRefreshPic;

    //*****************??????UI end********************
    private boolean isReceiver;//?????????PK?????????

    /**
     * ?????????????????????
     */
    private LiveInfo liveInfo;

    /**
     * pk????????????
     */
    private LiveInfo pkLiveInfo;

    private int cameraFacing = Camera.CameraInfo.CAMERA_FACING_FRONT;//?????????FACE_BACK = 0, FACE_FRONT = 1
    //***************************?????????UI**********************

    private ConstraintLayout clyLivingView;

    /**
     * ?????????????????????
     */
    private ChatRoomMsgRecyclerView roomMsgView;
    /**
     * ??????????????????
     */
    private AudiencePortraitRecyclerView audiencePortraitView;
    /**
     * ????????????
     */
    private TextView tvAudienceCount;

    /**
     * ????????????
     */
    private TextView tvCoinCount;

    private TextView tvNickName;//????????????

    private ImageView ivPortrait;//????????????

    private EditText edtInput;

    private TextView tvInput;

    private ImageView ivBeauty;

    private ImageView ivFilter;

    private ImageView ivMusic;

    private ImageView ivMore;

    private ImageView ivPkRequest;

    private PKControlView pkControlView;

    //***************************?????????UI end**********************

    //************************PK ??????UI*********************
    private LinearLayout llyRequest;

    private TextView tvRequestContent;

    private TextView tvCancel;

    private ChoiceDialog pkRequestDialog;

    private ChoiceDialog pkInviteedDialog;

    private ChoiceDialog stopPkDialog;

    private AnchorListDialog anchorListDialog;

    private LinearLayout llyPkProgress;

    //????????????
    private AudioControl audioControl;

    /**
     * ?????????
     */
    private Anchor anchor = Anchor.getInstance();

    private PKControlView.WrapperCountDownTimer countDownTimer;

    private String liveCoverPic;

    private PKVideoView pkVideoView;

    private boolean isLiveStart = false;

    /**
     * ?????????????????????
     */
    private ChatRoomNotify chatRoomNotify = new SkeletonChatRoomNotify() {

        @Override
        public void onJoinRoom(boolean success, int code) {
            if (success) {
                startLiveRoom(liveInfo);
            } else {
                ToastUtils.showLong("????????????????????? code = " + code);
                finish();
            }
        }

        @Override
        public void onMsgArrived(RoomMsg msg) {
            roomMsgView.appendItem(msg.message);
        }

        @Override
        public void onUserCountChanged(int count) {
            super.onUserCountChanged(count);
            tvAudienceCount.setText(StringUtils.getAudienceCount(count));
        }

        @Override
        public void onAudienceChanged(List<AudienceInfo> infoList) {
            audiencePortraitView.updateAll(infoList);
        }
    };

    public static void startAnchorActivity(Context context) {
        context.startActivity(new Intent(context, LiveAnchorActivity.class));
    }

    @Override
    protected void onResume() {
        super.onResume();
        /**
         * fixme ???????????????????????????????????????????????????????????????SDK???????????????
         */
        if (AnchorMoreDialog.itemList.get(0).enable) {
            if (liveRoom != null) {
                liveRoom.enableLocalVideo(false);
                liveRoom.enableLocalVideo(true);
            }
        }
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // ?????????????????????????????????????????????
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        setContentView(R.layout.live_anchor_layout);
        // ??????????????????
        paddingStatusBarHeight(findViewById(R.id.cly_live_create));
        paddingStatusBarHeight(findViewById(R.id.cly_anchor_info));

        requestPermissionsIfNeeded();
        //???????????????
        audioControl = new AudioControl(this);
        audioControl.initMusicAndEffect();
    }

    /**
     * ????????????
     */
    private void requestPermissionsIfNeeded() {
        final List<String> missedPermissions = NERtc.checkPermission(this);
        if (missedPermissions.size() > 0) {
            PermissionUtils.permission(missedPermissions.toArray(new String[0])).callback(new PermissionUtils.FullCallback() {
                @Override
                public void onGranted(@NonNull List<String> granted) {
                    if (isStringListEquals(granted, missedPermissions)) {
                        initView();
                    }
                }

                @Override
                public void onDenied(@NonNull List<String> deniedForever, @NonNull List<String> denied) {
                    ToastUtils.showShort("????????????");
                    finish();
                }
            }).request();
        } else {
            initView();
        }
    }

    private void initView() {
        videoView = findViewById(R.id.videoView);
        clyCreateLive = findViewById(R.id.cly_live_create);
        ivSwitchCamera = findViewById(R.id.iv_camera_switch);
        llyBeauty = findViewById(R.id.lly_beauty);
        llySetting = findViewById(R.id.lly_setting);
        llyFilter = findViewById(R.id.lly_filter);
        edtTopic = findViewById(R.id.edt_live_title);
        btnLiveCreate = findViewById(R.id.btn_start_live);
        clyLivingView = findViewById(R.id.cly_anchor_info);
        audiencePortraitView = findViewById(R.id.rv_anchor_portrait_list);
        tvAudienceCount = findViewById(R.id.tv_audience_count);
        tvNickName = findViewById(R.id.tv_anchor_nickname);
        roomMsgView = findViewById(R.id.crv_msg_list);
        ivClose = findViewById(R.id.iv_back);
        ivCover = findViewById(R.id.iv_cover);
        ivRandom = findViewById(R.id.iv_dice);
        ivRefreshPic = findViewById(R.id.iv_refresh_pic);
        // ????????????
        ivPortrait = findViewById(R.id.iv_anchor_portrait);
        // ??????????????????
        tvCoinCount = findViewById(R.id.tv_anchor_coin_count);
        tvInput = findViewById(R.id.tv_room_msg_input);
        edtInput = findViewById(R.id.et_room_msg_input);
        ivBeauty = findViewById(R.id.iv_beauty);
        ivFilter = findViewById(R.id.iv_filter);
        ivMusic = findViewById(R.id.iv_music);
        ivMore = findViewById(R.id.iv_more);
        ivPkRequest = findViewById(R.id.iv_request_pk);

        llyRequest = findViewById(R.id.lly_request);
        tvRequestContent = findViewById(R.id.tv_request);
        tvCancel = findViewById(R.id.tv_cancel);

        llyPkProgress = findViewById(R.id.lly_pk_progress);

        tvCancel.setOnClickListener(v -> cancelRequest());

        pkControlView = findViewById(R.id.pk_control_view);

        clyLivingView.post(() ->
                InputUtils.registerSoftInputListener(LiveAnchorActivity.this, new InputUtils.InputParamHelper() {
                    @Override
                    public int getHeight() {
                        return clyLivingView.getHeight();
                    }

                    @Override
                    public EditText getInputView() {
                        return edtInput;
                    }
                }));

        ivPkRequest.setOnClickListener(v -> {
            if (liveRoom.getLiveCurrentState().getStatus() == LiveState.STATE_LIVE_ON) {
                showAnchorListDialog();
            } else if (liveRoom.getLiveCurrentState().getStatus() == LiveState.STATE_PKING) {
                showStopPkDialog();
            } else {
                ToastUtils.showShort("????????????????????????????????????");
                Historian.d(LOG_TAG, "state error status = " + liveRoom.getLiveCurrentState().getStatus());
            }
        });

        ivRefreshPic.setOnClickListener(v -> getRandomCover());

        ivMusic.setOnClickListener(v -> showAudioControlDialog());

        ivBeauty.setOnClickListener(view -> showBeautyDialog());

        ivFilter.setOnClickListener(view -> showFilterDialog());

        tvInput.setOnClickListener(view -> InputUtils.showSoftInput(edtInput));

        btnLiveCreate.setOnClickListener(view -> createLiveRoom(false, null, null));

        llyBeauty.setOnClickListener(v -> showBeautyDialog());

        llyFilter.setOnClickListener(view -> showFilterDialog());

        llySetting.setOnClickListener(view -> showSettingDialog());

        ivRandom.setOnClickListener(v -> getRandomTopic());

        ivClose.setOnClickListener(v -> onBackPressed());

        ivSwitchCamera.setOnClickListener(v -> switchCamera());

        ivMore.setOnClickListener(v -> showLiveMoreDialog());

        edtInput.setOnEditorActionListener((v, actionId, event) -> {
            if (v == edtInput) {
                String input = edtInput.getText().toString();
                InputUtils.hideSoftInput(edtInput);
                anchor.sendTextMsg(input);
                return true;
            }
            return false;
        });
        initData();
    }

    private void initData() {
        initLiveRoom(null);
        liveRoom.setDelegate(this);
        beautyControl = new BeautyControl(this, liveRoom);
        beautyControl.initFaceUI();
        startPreview();
        //????????????
        beautyControl.openBeauty();
        getRandomCover();
        getRandomTopic();
    }

    private boolean isStringListEquals(List<String> resource, List<String> target) {
        if (resource == target) {
            return true;
        }

        if (resource == null || target == null) {
            return false;
        }
        if (resource.size() != target.size()) {
            return false;
        }

        int len = resource.size();
        if (len == 0) return true;

        for (int i = 0; i < len; i++) {
            if (!TextUtils.equals(resource.get(i), target.get(i))) {
                return false;
            }
        }
        return true;
    }

    /**
     * ????????????
     */
    private void cancelRequest() {
        liveRoom.cancelPkRequest(new RequestCallback<Void>() {
            @Override
            public void onSuccess(Void param) {
                cancelSuccess();
            }

            @Override
            public void onFailed(int code) {
                if (code != ResponseCode.RES_INVITE_HAS_ACCEPT) {
                    cancelSuccess();
                } else {
                    ToastUtils.showShort("??????????????????????????????");
                }
            }

            @Override
            public void onException(Throwable exception) {
                cancelSuccess();
            }
        }, true);
    }

    /**
     * ????????????
     */
    private void cancelSuccess() {
        llyRequest.setVisibility(View.GONE);
        if (pkRequestDialog != null && pkRequestDialog.isShowing()) {
            pkRequestDialog.dismiss();
        }
    }

    /**
     * ???????????????
     */
    private void switchCamera() {
        liveRoom.switchCamera();
        if (cameraFacing == Camera.CameraInfo.CAMERA_FACING_FRONT) {
            cameraFacing = Camera.CameraInfo.CAMERA_FACING_BACK;
        } else {
            cameraFacing = Camera.CameraInfo.CAMERA_FACING_FRONT;
        }
        beautyControl.switchCamera(cameraFacing);
    }

    /**
     * ??????????????????
     */
    private void getRandomCover() {
        LiveInteraction.getCover().subscribe(new ResourceSingleObserver<BaseResponse<String>>() {
            @Override
            public void onSuccess(BaseResponse<String> stringBaseResponse) {
                if (stringBaseResponse.code == 200) {
                    liveCoverPic = stringBaseResponse.data;
                    ImageLoader.with(LiveAnchorActivity.this).roundedCorner(stringBaseResponse.data, SpUtils.dp2pix(LiveAnchorActivity.this, 4), ivCover);
                }
            }

            @Override
            public void onError(Throwable e) {

            }
        });
    }

    private void getRandomTopic() {
        LiveInteraction.getTopic().subscribe(new ResourceSingleObserver<BaseResponse<String>>() {
            @Override
            public void onSuccess(BaseResponse<String> stringBaseResponse) {
                if (stringBaseResponse.code == 200) {
                    edtTopic.setText(stringBaseResponse.data);
                }
            }

            @Override
            public void onError(Throwable e) {

            }
        });
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        int x = (int) ev.getRawX();
        int y = (int) ev.getRawY();
        // ?????????????????????????????????
        if (!ViewUtils.isInView(edtInput, x, y) && isLiveStart) {
            InputUtils.hideSoftInput(edtInput);
        }
        return super.dispatchTouchEvent(ev);
    }

    /**
     * ??????
     */
    private void startPreview() {
        liveRoom.startVideoPreview();
    }

    private void initLiveRoom(NERtcOption option) {
        liveRoom = NERTCLiveRoom.sharedInstance();
        liveRoom.init(this, BuildConfig.APP_KEY, option);
        liveRoom.enableLocalVideo(true);
        liveRoom.setupLocalView(videoView);
    }

    private void createLiveRoom(boolean isPk, String requestAccId, String requestNickname) {
        btnLiveCreate.setEnabled(false);
        String accId = ModuleServiceMgr.getInstance().getService(UserCenterService.class).getCurrentUser().accountId;
        String topic = isPk ? "" : edtTopic.getText().toString().trim();
        int type = isPk ? 3 : 2;
        String parentLiveCid = isPk ? liveInfo.liveCid : "";
        LiveInteraction.createLiveRoom(accId, topic, parentLiveCid, liveCoverPic, type).subscribe(new ResourceSingleObserver<BaseResponse<LiveInfo>>() {
            @Override
            public void onSuccess(BaseResponse<LiveInfo> response) {
                if (response.code == 200) {
                    if (isPk) {
                        pkLiveInfo = response.data;
                        Historian.i(LOG_TAG, "pk liveCid = " + pkLiveInfo.liveCid);
                        startPkLive(requestAccId, requestNickname);
                    } else {
                        liveInfo = response.data;
                        Historian.i(LOG_TAG, "single liveCid = " + liveInfo.liveCid);
                        joinChatRoom(liveInfo);
                    }
                } else {
                    ToastUtils.showShort("??????????????? " + response.msg);
                }

            }

            @Override
            public void onError(Throwable e) {
                ToastUtils.showShort("????????????");
            }
        });
    }

    /**
     * ????????????
     */
    private void stopLive() {
        if (isLiveStart && liveRoom != null) {
            String liveCid = liveInfo.liveCid;
            LiveInteraction.stopLive(liveCid).subscribe(new ResourceSingleObserver<BaseResponse<Boolean>>() {
                @Override
                public void onSuccess(BaseResponse<Boolean> booleanBaseResponse) {
                    //do nothing
                    isLiveStart = false;
                }

                @Override
                public void onError(Throwable e) {

                }
            });
        }
        //?????????
        if (anchor != null && chatRoomNotify != null) {
            anchor.registerNotify(chatRoomNotify, false);
        }

        if (liveRoom != null) {
            liveRoom.stopLive();
            liveRoom = null;
        }

    }

    private void startPkLive(String requestAccid, String requestNickname) {
        if (pkLiveInfo == null) {
            return;
        }
        if (pkRequestDialog == null) {
            pkRequestDialog = new ChoiceDialog(this)
                    .setTitle("??????PK")
                    .setNegative("??????", null);
            pkRequestDialog.setCancelable(false);
        }
        pkRequestDialog.setContent("????????????" + "???" + requestNickname + "???" + "??????PK???")
                .setPositive("??????", v -> {
                    isReceiver = false;
                    liveRoom.requestPK(pkLiveInfo.imAccid, requestAccid, pkLiveInfo.liveCid, pkLiveInfo.liveConfig.pushUrl, pkLiveInfo.nickname, new LiveRoomCallBack() {
                        @Override
                        public void onSuccess() {
                            llyRequest.setVisibility(View.VISIBLE);
                            tvRequestContent.setText("?????????" + requestNickname + "???PK????????????");
                        }

                        @Override
                        public void onError(int code, String msg) {
                            ToastUtils.showShort("???????????? code???" + code);
                        }
                    });
                });
        if (!pkRequestDialog.isShowing()) {
            pkRequestDialog.show();
        }
    }

    /**
     * ???????????????
     *
     * @param liveInfo
     */
    private void joinChatRoom(LiveInfo liveInfo) {
        LiveChatRoomInfo liveChatRoomInfo = new LiveChatRoomInfo(liveInfo.chatRoomId, liveInfo.accountId, String.valueOf(liveInfo.avRoomUid));
        anchor.joinRoom(liveChatRoomInfo);
        anchor.registerNotify(chatRoomNotify, true);
    }

    /**
     * ???????????????
     *
     * @param liveInfo
     */
    private void startLiveRoom(LiveInfo liveInfo) {
        liveRoom.stopVideoPreview();
        liveRoom.createRoom(liveInfo, videoProfile, frameRate, audioScenario, cameraFacing == Camera.CameraInfo.CAMERA_FACING_FRONT, new LiveRoomCallBack() {
            @Override
            public void onSuccess() {

            }

            @Override
            public void onError(int code, String msg) {

            }
        });
    }

    /**
     * ????????????
     */
    private void acceptPKRequest(InvitedEvent invitedEvent, PkInfo pkInfo) {
        liveRoom.acceptPk(pkInfo.pkLiveCid, invitedEvent.getFromAccountId(), invitedEvent.getRequestId(),
                invitedEvent.getToAccountId(), new LiveRoomCallBack() {
                    @Override
                    public void onSuccess() {
                        llyPkProgress.setVisibility(View.VISIBLE);
                    }

                    @Override
                    public void onError(int code, String msg) {

                    }
                });
    }

    /**
     * ????????????
     *
     * @param invitedEvent
     */
    private void rejectPkRequest(InvitedEvent invitedEvent) {
        InviteParamBuilder paramBuilder = new InviteParamBuilder(invitedEvent.getChannelBaseInfo().getChannelId(),
                invitedEvent.getFromAccountId(), invitedEvent.getRequestId());
        liveRoom.rejectPkRequest(paramBuilder, new LiveRoomCallBack() {
            @Override
            public void onSuccess() {

            }

            @Override
            public void onError(int code, String msg) {

            }
        });
    }

    private void stopPk() {
        LiveInteraction.stopPk(liveInfo.liveCid).subscribe(new ResourceSingleObserver<BaseResponse<Boolean>>() {
            @Override
            public void onSuccess(BaseResponse<Boolean> booleanBaseResponse) {
                if (booleanBaseResponse.code != 200) {
                    ToastUtils.showShort("???????????? code = " + booleanBaseResponse.code);
                }
            }

            @Override
            public void onError(Throwable e) {
                ToastUtils.showShort("stop pk error");
            }
        });
    }

    /**
     * ??????PK dialog
     */
    private void showStopPkDialog() {
        if (stopPkDialog == null) {
            stopPkDialog = new ChoiceDialog(this);
            stopPkDialog.setTitle("??????PK");
            stopPkDialog.setContent("PK?????????????????????????????????????????????????????????");
            stopPkDialog.setPositive("????????????", v -> stopPk());
            stopPkDialog.setNegative("??????", null);
        }

        stopPkDialog.show();
    }

    /**
     * ???????????????????????????
     */
    private void showAnchorListDialog() {
        if (anchorListDialog != null && anchorListDialog.isVisible()) {
            return;
        }
        if (anchorListDialog == null) {
            anchorListDialog = new AnchorListDialog();
        }
        anchorListDialog.setSelectAnchorListener(liveInfo -> {
            isReceiver = false;
            createLiveRoom(true, liveInfo.imAccid, liveInfo.nickname);
        });
        anchorListDialog.show(getSupportFragmentManager(), "anchorListDialog");
    }

    /**
     * ????????????dailog
     */
    private void showAudioControlDialog() {
        if (audioControl != null) {
            audioControl.setLiveRoom(liveRoom);
            audioControl.showAudioControlDialog();
        }

    }

    /**
     * ????????????dialog
     */
    private void showBeautyDialog() {
        beautyControl.showBeautyDialog();
    }

    private void showFilterDialog() {
        beautyControl.showFilterDialog();
    }

    private void showSettingDialog() {
        LiveSettingDialog liveSettingDialog = new LiveSettingDialog();
        liveSettingDialog.setLiveSetting(videoProfile, frameRate, audioScenario);
        liveSettingDialog.setValueChangeListener(new LiveSettingDialog.LiveSettingChangeListener() {
            @Override
            public void videoProfileChange(int newValue) {
                videoProfile = newValue;
            }

            @Override
            public void frameRateChange(NERtcVideoConfig.NERtcVideoFrameRate frameRate) {
                LiveAnchorActivity.this.frameRate = frameRate;
            }

            @Override
            public void audioScenarioChange(int audioScenario) {
                LiveAnchorActivity.this.audioScenario = audioScenario;
            }
        });
        liveSettingDialog.show(getSupportFragmentManager(), "liveSettingDialog");
    }

    /**
     * ????????????????????????
     */
    private void showLiveMoreDialog() {
        AnchorMoreDialog anchorMoreDialog = new AnchorMoreDialog(this);
        anchorMoreDialog.registerOnItemClickListener((itemView, item) -> {
            switch (item.id) {
                case AnchorMoreDialog.ITEM_CAMERA:
                    return liveRoom.enableLocalVideo(!item.enable);
                case AnchorMoreDialog.ITEM_MUTE:
                    return liveRoom.muteLocalAudio(item.enable);
                case AnchorMoreDialog.ITEM_RETURN:
                    return liveRoom.enableEarback(!item.enable, 100);
                case AnchorMoreDialog.ITEM_CAMERA_SWITCH:
                    switchCamera();
                    break;
                case AnchorMoreDialog.ITEM_SETTING:
                    ToastUtils.showShort("?????????????????????");
                    break;
                case AnchorMoreDialog.ITEM_DATA:
                    ToastUtils.showShort("???????????????????????????");
                    break;
                case AnchorMoreDialog.ITEM_FINISH:
                    onBackPressed();
                    break;
            }
            return true;
        });
        anchorMoreDialog.show();
    }

    @Override
    public void onRoomLiveStart() {
        clyCreateLive.setVisibility(View.GONE);
        clyLivingView.setVisibility(View.VISIBLE);
        tvNickName.setText(liveInfo.nickname);
        ImageLoader.with(getApplicationContext()).circleLoad(liveInfo.avatar, ivPortrait);
        tvCoinCount.setText("0??????");
        isLiveStart = true;
    }

    @Override
    public void onPkStart(MsgPKStart.StartPKBody startPKBody) {
        llyPkProgress.setVisibility(View.GONE);
        String otherNickname;
        String otherAvatar;
        long otherUid;
        if (isReceiver) {
            otherAvatar = startPKBody.inviterAvatar;
            otherNickname = startPKBody.inviterNickname;
            otherUid = startPKBody.inviterRoomUid;
        } else {
            otherAvatar = startPKBody.inviteeAvatar;
            otherNickname = startPKBody.inviteeNickname;
            otherUid = startPKBody.inviteeRoomUid;
        }
        PKStatusAttachment attachment = new PKStatusAttachment(startPKBody.pkStartTime, startPKBody.currentTime, otherNickname, otherAvatar);
        anchor.notifyPKStatus(attachment);


        ImageLoader.with(this).circleLoad(R.drawable.icon_stop_pk, ivPkRequest);
        if (pkVideoView == null) {
            pkVideoView = new PKVideoView(this);
            pkControlView.getVideoContainer().addView(pkVideoView);
        }
        liveRoom.setupLocalView(pkVideoView.getLocalVideo());
        liveRoom.setupRemoteView(pkVideoView.getRemoteVideo(), otherUid);
        pkVideoView.getRemoteVideo().setMirror(true);
        videoView.setVisibility(View.GONE);
        pkControlView.setVisibility(View.VISIBLE);
        // pk ??????????????????
        pkControlView.reset();

        // ????????????????????????
        pkControlView.updatePkAnchorInfo(otherNickname, otherAvatar);
        // ???????????????
        if (countDownTimer != null) {
            countDownTimer.stop();
        }
        countDownTimer = pkControlView.createCountDownTimer(LiveTimeDef.TYPE_PK,attachment.getLeftTime(LiveTimeDef.TOTAL_TIME_PK, 0));
        countDownTimer.start();
    }


    @Override
    public void onPunishStart(MsgPunishStart.PunishBody punishBody) {
        // ?????? pk ????????????
        int anchorWin;// ?????????????????? pk ??????
        if(punishBody.inviteeRewards == punishBody.inviterRewards){
            anchorWin = 0;
        } else if (isReceiver) {
            anchorWin = punishBody.inviteeRewards > punishBody.inviterRewards?1:-1;
        } else {
            anchorWin = punishBody.inviteeRewards < punishBody.inviterRewards?1:-1;
        }
        // ??????pk??????
        pkControlView.handleResultFlag(true, anchorWin);

        anchor.notifyPKStatus(new PKStatusAttachment(anchorWin));
        // ?????? ??????????????????
        PunishmentStatusAttachment attachment1 = new PunishmentStatusAttachment(punishBody.pkPulishmentTime, punishBody.currentTime,anchorWin);
        anchor.notifyPunishmentStatus(attachment1);
        // ?????????????????????
        if (countDownTimer != null) {
            countDownTimer.stop();
        }
        if(anchorWin != 0) {
            countDownTimer = pkControlView.createCountDownTimer(LiveTimeDef.TYPE_PUNISHMENT, attachment1.getLeftTime(LiveTimeDef.TOTAL_TIME_PUNISHMENT, 0));
            countDownTimer.start();
        }
    }

    @Override
    public void onPKEnd(boolean isFromUser, String nickname) {
        anchor.notifyPunishmentStatus(new PunishmentStatusAttachment());
        if (countDownTimer != null) {
            countDownTimer.stop();
        }
        ImageLoader.with(this).circleLoad(R.drawable.icon_pk, ivPkRequest);
        pkControlView.setVisibility(View.INVISIBLE);
        videoView.setVisibility(View.VISIBLE);
        liveRoom.setupLocalView(videoView);
        if (isFromUser && (pkLiveInfo == null || !TextUtils.equals(nickname, pkLiveInfo.nickname))) {
            ToastUtils.showShort("???" + nickname + "????????????PK");
        }
        if (stopPkDialog != null && stopPkDialog.isShowing()) {
            stopPkDialog.dismiss();
        }
    }

    @Override
    public void onPkRequestCancel(boolean byUser) {
        if (pkInviteedDialog != null && pkInviteedDialog.isShowing()) {
            pkInviteedDialog.dismiss();
            if (byUser) {
                ToastUtils.showShort("??????????????????");
            } else {
                ToastUtils.showShort("????????????");
            }
        }
    }

    @Override
    public void receivePKRequest(InvitedEvent invitedEvent, PkInfo pkInfo) {
        isReceiver = true;
        if (pkLiveInfo == null) {
            pkLiveInfo = new LiveInfo();
        }
        pkLiveInfo.liveCid = pkInfo.pkLiveCid;
        if (pkInviteedDialog == null) {
            pkInviteedDialog = new ChoiceDialog(this)
                    .setTitle("??????PK");
            pkInviteedDialog.setCancelable(false);
        }
        pkInviteedDialog.setContent("???" + pkInfo.inviterNickname + "???" + "???????????????PK??????????????????")
                .setPositive("??????", v -> acceptPKRequest(invitedEvent, pkInfo))
                .setNegative("??????", v -> rejectPkRequest(invitedEvent));
        if (!pkInviteedDialog.isShowing()) {
            pkInviteedDialog.show();
        }
        if (anchorListDialog != null && anchorListDialog.isVisible()) {
            anchorListDialog.dismiss();
        }
        if (pkRequestDialog != null && pkRequestDialog.isShowing()) {
            pkRequestDialog.dismiss();
        }
    }

    @Override
    public void pkRequestRejected(String userId) {
        ToastUtils.showShort("?????????????????????PK??????");
        llyRequest.setVisibility(View.GONE);
    }

    @Override
    public void onAccept() {
        llyRequest.setVisibility(View.GONE);
        llyPkProgress.setVisibility(View.VISIBLE);
    }


    @Override
    public void onUserReward(MsgReward.RewardBody reward) {
        if (liveRoom.getLiveCurrentState().getStatus() == LiveState.STATE_PKING) {
            long selfPkCoinCount;
            long otherPkCoinCount;
            long rewardCoinTotal;
            List<AudienceInfo> selfRewardPkList;
            List<AudienceInfo> otherRewardPkList;
            if (isReceiver) {
                selfPkCoinCount = reward.inviteeRewardPKCoinTotal;
                otherPkCoinCount = reward.inviterRewardPKCoinTotal;
                rewardCoinTotal = reward.inviteeRewardCoinTotal;
                selfRewardPkList = reward.inviteeRewardPkList;
                otherRewardPkList = reward.rewardPkList;
            } else {
                selfPkCoinCount = reward.inviterRewardPKCoinTotal;
                otherPkCoinCount = reward.inviteeRewardPKCoinTotal;
                rewardCoinTotal = reward.rewardCoinTotal;
                selfRewardPkList = reward.rewardPkList;
                otherRewardPkList = reward.inviteeRewardPkList;
            }
            // pk ???????????????????????????
            AnchorCoinChangedAttachment attachment2 = new AnchorCoinChangedAttachment(
                    reward.fromUserAvRoomUid,
                    rewardCoinTotal,
                    new RewardGiftInfo((int) reward.giftId, reward.nickname), selfPkCoinCount,
                    otherPkCoinCount, selfRewardPkList, otherRewardPkList);
            anchor.notifyCoinChanged(attachment2);

            pkControlView.updateScore(selfPkCoinCount, otherPkCoinCount);
            pkControlView.updateRanking(selfRewardPkList, otherRewardPkList);
            tvCoinCount.setText(StringUtils.getCoinCount(rewardCoinTotal));
        } else {
            // ???????????????????????????????????????
            anchor.notifyCoinChanged(new AnchorCoinChangedAttachment(reward.fromUserAvRoomUid,
                    reward.rewardCoinTotal, new RewardGiftInfo((int) reward.giftId, reward.nickname)));
            tvCoinCount.setText(StringUtils.getCoinCount(reward.rewardCoinTotal));
        }
    }

    @Override
    public void preJoinRoom(String liveCid, boolean isPk, String parentLiveCid) {
        if (TextUtils.isEmpty(liveCid) || !isPk) {
            liveCid = liveInfo.liveCid;
        }
        Historian.i(LOG_TAG, "preJoinRoom liveCid = " + liveCid + "\n status = " + liveRoom.getLiveCurrentState().getStatus());
        LiveInteraction.joinLiveRoom(liveCid, parentLiveCid, isPk ? 3 : 2).subscribe(new ResourceSingleObserver<BaseResponse<JoinInfo>>() {
            @Override
            public void onSuccess(BaseResponse<JoinInfo> joinInfoBaseResponse) {
                Historian.i(LOG_TAG, "preJoinRoom sucess code = " + joinInfoBaseResponse.code);
                if (joinInfoBaseResponse.code == 200) {
                    JoinInfo joinInfo = joinInfoBaseResponse.data;
                    liveRoom.joinRtcChannel(joinInfo.avRoomCheckSum, joinInfo.avRoomCName, joinInfo.avRoomUid, joinInfo.avRoomCid);
                } else {
                    ToastUtils.showShort("preJoinRoom failed error code =" + joinInfoBaseResponse.code);
                    preJoinError();
                }
            }

            @Override
            public void onError(Throwable e) {
                Historian.i(LOG_TAG, "preJoinRoom error ", e);
                preJoinError();
            }
        });
    }

    /**
     * ???????????????????????????????????????
     */
    private void preJoinError() {
        //??????????????????pk?????????,?????????????????????
        if (liveRoom.getLiveCurrentState().getStatus() != LiveState.STATE_PKING) {
            liveRoom.getLiveCurrentState().release();
            llyPkProgress.setVisibility(View.GONE);
            ToastUtils.showShort("??????PK????????????");
        } else {
            ToastUtils.showShort("???????????????");
            finish();
        }
    }

    @Override
    public void onAudioEffectFinished(int effectId) {
        if (audioControl != null) {
            audioControl.onEffectFinish(effectId);
        }
    }

    @Override
    public void onAudioMixingFinished() {
        if (audioControl != null) {
            audioControl.onMixingFinished();
        }
    }

    @Override
    public void onTimeOut(int code) {
        if (code == ErrorCode.ERROR_CODE_TIME_OUT_ACCEPTED) {
            preJoinError();
            return;
        }
        if (isReceiver) {
            isReceiver = false;
            if (pkInviteedDialog != null && pkInviteedDialog.isShowing()) {
                pkInviteedDialog.dismiss();
                ToastUtils.showShort("???????????????");
            }
        } else {
            llyRequest.setVisibility(View.GONE);
            ToastUtils.showShort("?????????????????????????????????");
        }
    }

    @Override
    public void onUserBusy(String userId) {
        ToastUtils.showShort("??????????????????PK??????????????????");
        llyRequest.setVisibility(View.GONE);
    }

    @Override
    public void onError(boolean serious, int code, String msg) {
        if (serious) {
            ToastUtils.showShort(msg);
            finish();
        }
        Historian.d(LOG_TAG, msg + " code = " + code);
    }

    @Override
    public void onBackPressed() {
        if (isLiveStart) {
            ChoiceDialog closeDialog = new ChoiceDialog(this)
                    .setTitle("????????????")
                    .setContent("???????????????????????????")
                    .setNegative("??????", null)
                    .setPositive("??????", v -> {
                        finish();
                    });
            closeDialog.show();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        stopLive();
        if (liveRoom != null) {
            //????????????
            liveRoom.setVideoCallback(null, true);
        }
        if (beautyControl != null) {
            beautyControl.onDestroy();
            beautyControl = null;
        }
        AnchorMoreDialog.clearItem();
        NERTCLiveRoom.destroySharedInstance();
    }

    @Override
    protected StatusBarConfig provideStatusBarConfig() {
        return new StatusBarConfig.Builder()
                .statusBarDarkFont(false)
                .build();
    }
}
