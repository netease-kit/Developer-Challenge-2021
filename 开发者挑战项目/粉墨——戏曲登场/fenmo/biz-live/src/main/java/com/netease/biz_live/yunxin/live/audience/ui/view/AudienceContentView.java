package com.netease.biz_live.yunxin.live.audience.ui.view;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.PointF;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.TextureView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.Group;
import androidx.recyclerview.widget.RecyclerView;

import com.netease.biz_live.R;
import com.netease.biz_live.yunxin.live.audience.ui.dialog.GiftDialog;
import com.netease.biz_live.yunxin.live.audience.utils.DialogHelperActivity;
import com.netease.biz_live.yunxin.live.audience.utils.InputUtils;
import com.netease.biz_live.yunxin.live.audience.utils.PlayerControl;
import com.netease.biz_live.yunxin.live.audience.utils.PlayerVideoSizeUtils;
import com.netease.biz_live.yunxin.live.audience.utils.StringUtils;
import com.netease.biz_live.yunxin.live.audience.utils.TimeUtils;
import com.netease.biz_live.yunxin.live.chatroom.control.Audience;
import com.netease.biz_live.yunxin.live.chatroom.control.ChatRoomNotify;
import com.netease.biz_live.yunxin.live.chatroom.control.SkeletonChatRoomNotify;
import com.netease.biz_live.yunxin.live.chatroom.custom.AnchorCoinChangedAttachment;
import com.netease.biz_live.yunxin.live.chatroom.custom.PKStatusAttachment;
import com.netease.biz_live.yunxin.live.chatroom.custom.PunishmentStatusAttachment;
import com.netease.biz_live.yunxin.live.chatroom.model.AudienceInfo;
import com.netease.biz_live.yunxin.live.chatroom.model.LiveChatRoomInfo;
import com.netease.biz_live.yunxin.live.chatroom.model.RewardGiftInfo;
import com.netease.biz_live.yunxin.live.chatroom.model.RoomMsg;
import com.netease.biz_live.yunxin.live.constant.LiveParams;
import com.netease.biz_live.yunxin.live.constant.LiveStatus;
import com.netease.biz_live.yunxin.live.constant.LiveTimeDef;
import com.netease.biz_live.yunxin.live.constant.LiveType;
import com.netease.biz_live.yunxin.live.gift.GiftCache;
import com.netease.biz_live.yunxin.live.gift.GiftRender;
import com.netease.biz_live.yunxin.live.gift.ui.GifAnimationView;
import com.netease.biz_live.yunxin.live.model.LiveInfo;
import com.netease.biz_live.yunxin.live.model.response.AnchorMemberInfo;
import com.netease.biz_live.yunxin.live.model.response.AnchorQueryInfo;
import com.netease.biz_live.yunxin.live.model.response.PkLiveContributeTotal;
import com.netease.biz_live.yunxin.live.model.response.PkRecord;
import com.netease.biz_live.yunxin.live.network.LiveInteraction;
import com.netease.biz_live.yunxin.live.network.LiveServerApi;
import com.netease.biz_live.yunxin.live.ui.widget.AudiencePortraitRecyclerView;
import com.netease.biz_live.yunxin.live.ui.widget.ChatRoomMsgRecyclerView;
import com.netease.biz_live.yunxin.live.ui.widget.PKControlView;
import com.netease.yunxin.android.lib.historian.Historian;
import com.netease.yunxin.android.lib.network.common.BaseResponse;
import com.netease.yunxin.android.lib.picture.ImageLoader;
import com.blankj.utilcode.util.ToastUtils;
import com.netease.yunxin.nertc.demo.basic.BaseActivity;
import com.netease.yunxin.nertc.demo.basic.StatusBarConfig;
import com.netease.yunxin.nertc.demo.user.UserCenterService;
import com.netease.yunxin.nertc.demo.user.UserModel;
import com.netease.yunxin.nertc.demo.utils.SpUtils;
import com.netease.yunxin.nertc.demo.utils.ViewUtils;
import com.netease.yunxin.nertc.module.base.ModuleServiceMgr;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import io.reactivex.Single;
import io.reactivex.observers.ResourceSingleObserver;

/**
 * Created by luc on 2020/11/19.
 * <p>
 * ?????????????????????????????????{@link FrameLayout} ????????? {@link TextureView} ?????? {@link ExtraTransparentView} ????????????????????????
 * <p>
 * TextureView ???????????????????????????
 * <p>
 * ExtraTransparentView ??????????????????????????????????????????????????????????????????????????????view ????????? {@link RecyclerView} ?????????????????????????????????
 * ????????????????????? {@link #infoContentView}.
 *
 * <p>
 * ?????? {@link #prepare(),#release()} ???????????????recyclerView ??? view ??? {@link androidx.recyclerview.widget.RecyclerView#onChildAttachedToWindow(View)},
 * {@link androidx.recyclerview.widget.RecyclerView#onChildDetachedFromWindow(View)} ?????????
 * ?????????{@link #renderData(LiveInfo)} ????????? {@link androidx.recyclerview.widget.RecyclerView.Adapter#onBindViewHolder(RecyclerView.ViewHolder, int)}
 * ???????????? {@link androidx.recyclerview.widget.LinearLayoutManager} ??????????????????????????? renderData ?????????????????? prepare ?????????
 */
@SuppressLint("ViewConstructor")
public class AudienceContentView extends FrameLayout {
    private static final String TAG = AudienceContentView.class.getSimpleName();
    /**
     * ????????????
     */
    private final UserCenterService userCenterService = ModuleServiceMgr.getInstance().getService(UserCenterService.class);
    /**
     * ?????? View ?????? activity
     */
    private final BaseActivity activity;
    /**
     * ??????????????????????????????
     */
    private final Audience audienceControl = Audience.getInstance();

    /**
     * ???????????????????????????????????????????????????????????????????????????
     */
    private final GiftRender giftRender = new GiftRender();
    /**
     * ????????????View
     */
    private TextureView videoView;

    /**
     * ????????????????????????
     */
    private ExtraTransparentView horSwitchView;
    /**
     * ?????????????????????
     */
    private View infoContentView;

    /**
     * ?????????????????????
     */
    private LiveInfo liveInfo;

    /**
     * ?????????????????????????????? TextureView ???????????????????????????
     */
    private PlayerControl playerControl;

    /**
     * ?????????????????????
     */
    private ChatRoomMsgRecyclerView roomMsgView;

    /**
     * ???????????????????????????
     */
    private AudiencePortraitRecyclerView audiencePortraitView;

    /**
     * pk ??????????????????
     */
    private PKControlView pkControlView;

    /**
     * ???????????????
     */
    private EditText etInputView;

    /**
     * ??????????????????
     */
    private TextView tvAudienceCount;

    /**
     * ???????????????????????????
     */
    private TextView tvCoinCount;

    /**
     * ????????????????????????????????????????????????
     */
    private AudienceErrorStateView errorStateView;

    /**
     * ????????????????????????
     */
    private Group gpNormalState;

    /**
     * pk ???????????????
     */
    private PKControlView.WrapperCountDownTimer countDownTimer;

    /**
     * ????????????
     */
    private GiftDialog giftDialog;

    /**
     * ????????????????????????{@link #prepare()} ??????????????? true???
     * {@link #release()} ??????????????? false;
     */
    private boolean canRender;

    /**
     * ?????????????????????
     */
    private final ChatRoomNotify roomNotify = new SkeletonChatRoomNotify() {

        @Override
        public void onJoinRoom(boolean success, int code) {
            super.onJoinRoom(success, code);
            Historian.e("=====>", "onJoinRoom " + "success " + success + ", code " + code);
        }

        @Override
        public void onMsgArrived(RoomMsg msg) {
            roomMsgView.appendItem(msg.message);
        }

        @Override
        public void onGiftArrived(RewardGiftInfo giftInfo) {
            giftRender.addGift(GiftCache.getGift(giftInfo.giftId).dynamicIconResId);
        }

        @Override
        public void onUserCountChanged(int count) {
            super.onUserCountChanged(count);
            tvAudienceCount.setText(StringUtils.getAudienceCount(count));
        }

        @Override
        public void onRoomDestroyed(LiveChatRoomInfo roomInfo) {
            if (!canRender) {
                return;
            }
            changeErrorState(true, AudienceErrorStateView.TYPE_FINISHED);
        }

        @Override
        public void onAnchorLeave() {
            if (!canRender) {
                return;
            }
            changeErrorState(true, AudienceErrorStateView.TYPE_FINISHED);
        }

        @Override
        public void onKickedOut() {
            if (!canRender) {
                return;
            }
            if (activity != null) {
                activity.finish();
                getContext().startActivity(new Intent(getContext(), DialogHelperActivity.class));
            }
        }

        @Override
        public void onAnchorCoinChanged(AnchorCoinChangedAttachment attachment) {
            super.onAnchorCoinChanged(attachment);
            tvCoinCount.setText(StringUtils.getCoinCount(attachment.totalCoinCount));
            if (pkControlView.getVisibility() == VISIBLE) {
                pkControlView.updateScore(attachment.PKCoinCount, attachment.otherPKCoinCount);
                pkControlView.updateRanking(attachment.rewardList, attachment.otherRewardList);
            }
        }

        @Override
        public void onPKStatusChanged(PKStatusAttachment pkStatus) {
            if (countDownTimer != null) {
                countDownTimer.stop();
            }
            if (pkStatus.isStartState()) {
                // pk ?????????view??????
                pkControlView.setVisibility(VISIBLE);
                // ??????pk??????view
                pkControlView.reset();
                // ??????pk ????????????/??????
                pkControlView.updatePkAnchorInfo(pkStatus.otherAnchorNickname, pkStatus.otherAnchorAvatar);
                // ????????????????????????
                adjustVideoSizeForPk(true);
                // ??????????????????
                long leftTime = pkStatus.getLeftTime(LiveTimeDef.TOTAL_TIME_PK, 0);
                countDownTimer = pkControlView.createCountDownTimer(LiveTimeDef.TYPE_PK,leftTime);
                countDownTimer.start();
            } else {
                pkControlView.handleResultFlag(true, pkStatus.anchorWin);
            }
        }

        @Override
        public void onPunishmentStatusChanged(PunishmentStatusAttachment punishmentStatus) {
            if (countDownTimer != null) {
                countDownTimer.stop();
            }
            if (punishmentStatus.isStartState()) {
                // ??????????????????
                long leftTime = punishmentStatus.getLeftTime(LiveTimeDef.TOTAL_TIME_PUNISHMENT, 0);
                if(punishmentStatus.anchorWin != 0) {
                    countDownTimer = pkControlView.createCountDownTimer(LiveTimeDef.TYPE_PUNISHMENT, leftTime);
                    countDownTimer.start();
                }
            } else {
                pkControlView.setVisibility(INVISIBLE);
            }
        }

        @Override
        public void onAudienceChanged(List<AudienceInfo> infoList) {
            audiencePortraitView.updateAll(infoList);
        }
    };

    /**
     * ??????????????????????????????
     */
    private final AudienceErrorStateView.ClickButtonListener clickButtonListener = new AudienceErrorStateView.ClickButtonListener() {
        @Override
        public void onBackClick(View view) {
            if (activity != null && !activity.isFinishing()) {
                activity.finish();
            }
        }

        @Override
        public void onRetryClick(View view) {
            if (canRender && liveInfo != null && videoView != null) {
                getPlayerControl().prepareToPlay(liveInfo.liveConfig.rtmpPullUrl, videoView);
                initForLiveType();
            }
        }
    };

    /**
     * ?????????????????????
     */
    private final PlayerControl.PlayerNotify playerNotify = new PlayerControl.PlayerNotify() {
        @Override
        public void onPreparing() {
            Historian.e(TAG, "player, preparing");

        }

        @Override
        public void onPlaying() {
            changeErrorState(false, AudienceErrorStateView.TYPE_ERROR);
            Historian.e(TAG, "player, playing");
        }

        @Override
        public void onError() {
            changeErrorState(true, AudienceErrorStateView.TYPE_ERROR);
            Historian.e(TAG, "player, error");
        }

        @Override
        public void onVideoSizeChanged(int width, int height) {
            if (height == LiveParams.PK_LIVE_HEIGHT) {
                adjustVideoSizeForPk(false);
            } else {
                adjustVideoSizeForNormal();
            }
            horSwitchView.post(() -> horSwitchView.setBackgroundColor(Color.parseColor("#00000000")));
            Historian.e(TAG, "video size changed, width is " + width + ", height is " + height);
        }
    };

    public AudienceContentView(@NonNull BaseActivity activity) {
        super(activity);
        this.activity = activity;
        initViews();
    }

    /**
     * ??????????????????????????? view
     */
    private void initViews() {
        // ?????? view ????????????
        setBackgroundColor(Color.parseColor("#ff201C23"));

        // ?????????????????? TextureView
        videoView = new TextureView(getContext());
        addView(videoView, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);

        // ?????????????????????
        infoContentView = LayoutInflater.from(getContext()).inflate(R.layout.view_item_audience_live_room_info, null);
        horSwitchView = new ExtraTransparentView(getContext(), infoContentView);
        horSwitchView.setBackgroundColor(Color.parseColor("#ff201C23"));
        // ???????????????????????????????????????????????????
        horSwitchView.registerSelectedRunnable(() -> {
            if (roomMsgView != null) {
                roomMsgView.toLatestMsg();
            }
        });
        addView(horSwitchView, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        // ???????????????????????? status bar ?????????????????????
        StatusBarConfig.paddingStatusBarHeight(activity, horSwitchView);

        // ????????????????????????
        errorStateView = new AudienceErrorStateView(getContext());
        addView(errorStateView);
        errorStateView.setVisibility(GONE);

        // ????????????????????????
        // ?????????????????? view
        GifAnimationView gifAnimationView = new GifAnimationView(getContext());
        int size = SpUtils.getScreenWidth(getContext());
        FrameLayout.LayoutParams layoutParams = generateDefaultLayoutParams();
        layoutParams.width = size;
        layoutParams.height = size;
        layoutParams.gravity = Gravity.BOTTOM;
        layoutParams.bottomMargin = SpUtils.dp2pix(getContext(), 166);
        addView(gifAnimationView, layoutParams);
        gifAnimationView.bringToFront();
        // ?????????????????? view
        giftRender.init(gifAnimationView);

        // ?????????????????????
        InputUtils.registerSoftInputListener(activity, new InputUtils.InputParamHelper() {
            @Override
            public int getHeight() {
                return AudienceContentView.this.getHeight();
            }

            @Override
            public EditText getInputView() {
                return etInputView;
            }
        });
    }

    /**
     * ????????????????????????????????????????????????
     *
     * @param info ???????????????
     */
    public void renderData(LiveInfo info) {
        this.liveInfo = info;
        // ?????????????????????????????????????????????

        errorStateView.renderInfo(info.avatar, info.nickname);

        // ????????????????????????
        gpNormalState = infoContentView.findViewById(R.id.group_normal);
        gpNormalState.setVisibility(VISIBLE);
        // ?????????????????????
        audiencePortraitView = infoContentView.findViewById(R.id.rv_anchor_portrait_list);
        // ??????????????????view
        pkControlView = infoContentView.findViewById(R.id.pkv_control);
        // ?????????????????????
        roomMsgView = infoContentView.findViewById(R.id.crv_msg_list);
        // ???????????????
        etInputView = infoContentView.findViewById(R.id.et_room_msg_input);
        etInputView.setOnEditorActionListener((v, actionId, event) -> {
            String input = etInputView.getText().toString();
            InputUtils.hideSoftInput(etInputView);
            audienceControl.sendTextMsg(input);
            return true;
        });
        etInputView.setVisibility(GONE);
        // ??????????????????
        tvAudienceCount = infoContentView.findViewById(R.id.tv_audience_count);
        tvAudienceCount.setText(StringUtils.getAudienceCount(liveInfo.audienceCount));
        // ???????????????
        tvCoinCount = infoContentView.findViewById(R.id.tv_anchor_coin_count);
        tvCoinCount.setText("");

        // ????????????
        ImageView ivPortrait = infoContentView.findViewById(R.id.iv_anchor_portrait);
        ImageLoader.with(getContext().getApplicationContext()).circleLoad(info.avatar, ivPortrait);

        // ????????????
        TextView tvNickname = infoContentView.findViewById(R.id.tv_anchor_nickname);
        tvNickname.setText(info.nickname);

        // ????????????
        View close = infoContentView.findViewById(R.id.iv_room_close);
        close.setOnClickListener(v -> {
            // ???????????????????????????
            activity.finish();
        });

        // ????????????
        View gift = infoContentView.findViewById(R.id.iv_room_gift);
        gift.setOnClickListener(v -> {
            if (giftDialog == null) {
                giftDialog = new GiftDialog(activity);
            }

            giftDialog.show(giftInfo -> {
                UserModel currentUser = getCurrentUser();
                RewardGiftInfo rewardGiftInfo = new RewardGiftInfo(liveInfo.liveCid, currentUser.accountId, currentUser.nickname, liveInfo.accountId, giftInfo.giftId);
                boolean isPk = pkControlView.getVisibility() == VISIBLE;
                LiveInteraction.rewardAnchor(isPk, rewardGiftInfo).subscribe(new ResourceSingleObserver<Boolean>() {
                    @Override
                    public void onSuccess(@NonNull Boolean aBoolean) {
                        if (!aBoolean) {
                            ToastUtils.showShort("??????????????????");
                        }
                    }

                    @Override
                    public void onError(@NonNull Throwable e) {
                        ToastUtils.showShort("??????????????????");
                    }
                });
            });
        });

        // ?????????????????????
        View input = infoContentView.findViewById(R.id.tv_room_msg_input);
        input.setOnClickListener(v -> InputUtils.showSoftInput(etInputView));
    }

    /**
     * ??????????????????
     */
    public void prepare() {
        changeErrorState(false, -1);
        if (horSwitchView != null) {
            horSwitchView.setBackgroundColor(Color.parseColor("#ff201C23"));
        }
        canRender = true;
        // ???????????????????????????
        horSwitchView.toSelectedPosition();
        // ???????????????????????????
        playerControl = getPlayerControl();
        playerControl.prepareToPlay(liveInfo.liveConfig.rtmpPullUrl, videoView);

        // ?????????????????????????????????????????????
        if (roomMsgView != null) {
            roomMsgView.toLatestMsg();
        }
    }

    /**
     * ????????????
     */
    public void select() {
        // ???????????????
        try {
            audienceControl.joinRoom(new LiveChatRoomInfo(liveInfo.chatRoomId, liveInfo.accountId,
                    String.valueOf(liveInfo.roomUid), liveInfo.audienceCount));
        } catch (Exception e) {
            // ???????????????????????????????????????????????????
            if (activity != null) {
                activity.finish();
            }
        }
        audienceControl.registerNotify(roomNotify, true);
        // ?????????????????????????????????????????????
        initForLiveType();
    }

    /**
     * ??????????????????
     */
    public void release() {
        if (!canRender) {
            return;
        }
        canRender = false;
        // ?????????????????????
        if (playerControl != null) {
            playerControl.release();
            playerControl = null;
        }
        // ??????????????????
        giftRender.release();
        // ??????????????????
        roomMsgView.clearAllInfo();
        // pk ????????????
        pkControlView.setVisibility(INVISIBLE);
    }


    private void changeErrorState(boolean error, int type) {
        if (!canRender) {
            return;
        }
        if (error) {
            getPlayerControl().reset();
            if (type == AudienceErrorStateView.TYPE_FINISHED) {
                release();
            } else {
                getPlayerControl().release();
            }
        }

        if (gpNormalState != null) {
            gpNormalState.setVisibility(error ? GONE : VISIBLE);
        }
        if (errorStateView != null) {
            errorStateView.setVisibility(error ? VISIBLE : GONE);
        }
        if (error && errorStateView != null) {
            errorStateView.updateType(type, clickButtonListener);
        }
    }

    private void initForLiveType() {
        LiveInteraction.queryAnchorRoomInfo(liveInfo.accountId, liveInfo.liveCid)
                .subscribe(new ResourceSingleObserver<BaseResponse<AnchorQueryInfo>>() {
                    @Override
                    public void onSuccess(@NonNull BaseResponse<AnchorQueryInfo> response) {
                        if (!canRender) {
                            return;
                        }
                        if (response.isSuccessful()) {
                            AnchorQueryInfo anchorQueryInfo = response.data;
                            tvCoinCount.setText(StringUtils.getCoinCount(anchorQueryInfo.coinTotal));

                            PkRecord record = anchorQueryInfo.pkRecord;
                            if (record != null && (record.status == LiveStatus.PK_LIVING || record.status == LiveStatus.PK_PUNISHMENT)) {
                                initForPk(anchorQueryInfo);
                            } else {
                                initForNormal();
                            }
                        } else if (response.code == LiveServerApi.ERROR_CODE_ROOM_NOT_EXIST || response.code == LiveServerApi.ERROR_CODE_USER_NOT_IN_ROOM) {
                            changeErrorState(true, AudienceErrorStateView.TYPE_FINISHED);
                        } else {
                            changeErrorState(true, AudienceErrorStateView.TYPE_ERROR);
                            Historian.e(TAG, "?????????????????????????????????????????? " + response);
                        }
                    }

                    @Override
                    public void onError(@NonNull Throwable e) {
                        e.printStackTrace();
                        Historian.e(TAG, "????????????????????????");
                        changeErrorState(true, AudienceErrorStateView.TYPE_ERROR);
                    }
                });
    }

    private void initForPk(AnchorQueryInfo anchorQueryInfo) {
        // ???????????????
        if (countDownTimer != null) {
            countDownTimer.stop();
        }

        PkRecord record = anchorQueryInfo.pkRecord;
        pkControlView.setVisibility(VISIBLE);
        // ????????????
        if (record.inviter.equals(liveInfo.accountId)) {
            pkControlView.updateScore(record.inviterRewards, record.inviteeRewards);
        } else {
            pkControlView.updateScore(record.inviteeRewards, record.inviterRewards);
        }

        // pk ?????????????????????????????????2??????????????????????????????pk??????????????????????????????pk ????????????
        AnchorMemberInfo temp = anchorQueryInfo.members.get(0);
        AnchorMemberInfo temp1 = anchorQueryInfo.members.get(1);
        AnchorMemberInfo pkMemberInfo = liveInfo.accountId.equals(temp.accountId) ? temp1 : temp;
        // ??????pk ?????????????????????
        pkControlView.updatePkAnchorInfo(pkMemberInfo.nickname, pkMemberInfo.avatar);
        // ?????????????????????????????????????????????
        Single<PkLiveContributeTotal> anchorSource =
                LiveInteraction.queryPkLiveContributeTotal(liveInfo.accountId, liveInfo.liveCid, LiveType.PK_LIVING);
        Single<PkLiveContributeTotal> otherAnchorSource =
                LiveInteraction.queryPkLiveContributeTotal(pkMemberInfo.accountId, pkMemberInfo.liveCid, LiveType.PK_LIVING);
        // ??????????????????
        Single.zip(anchorSource, otherAnchorSource,
                (pkLiveContributeTotal, pkLiveContributeTotal2) -> Arrays.asList(pkLiveContributeTotal, pkLiveContributeTotal2))
                .subscribe(new ResourceSingleObserver<List<PkLiveContributeTotal>>() {
                    @Override
                    public void onSuccess(@NonNull List<PkLiveContributeTotal> pkLiveContributeTotals) {
                        if (!canRender) {
                            return;
                        }
                        // ?????????????????????
                        PkLiveContributeTotal contributeTotal = pkLiveContributeTotals.get(0);
                        PkLiveContributeTotal contributeTotal1 = pkLiveContributeTotals.get(1);
                        if (liveInfo.accountId.equals(contributeTotal.accountId)) {
                            pkControlView.updateRanking(contributeTotal.getAudienceInfoList(), contributeTotal1.getAudienceInfoList());
                        } else {
                            pkControlView.updateRanking(contributeTotal1.getAudienceInfoList(), contributeTotal.getAudienceInfoList());
                        }
                    }

                    @Override
                    public void onError(@NonNull Throwable e) {
                        e.printStackTrace();
                        Historian.e(TAG, "???????????????????????????");
                    }
                });

        // ???????????? ?????? pk ?????????????????????????????????
        if (record.status == LiveStatus.PK_PUNISHMENT) {
            int pkResult;
            if(record.inviterRewards == record.inviteeRewards){
                pkResult = 0;
            }else if(record.inviter.equals(liveInfo.accountId)){//??????????????????
                pkResult = record.inviterRewards > record.inviteeRewards?1:-1;
            }else {
                pkResult = record.inviterRewards < record.inviteeRewards?1:-1;
            }
            pkControlView.handleResultFlag(true, pkResult);
            if(pkResult != 0) {
                long leftTime = TimeUtils.getLeftTime(LiveTimeDef.TOTAL_TIME_PUNISHMENT, record.currentTime, record.punishmentStartTime, 0);
                countDownTimer = pkControlView.createCountDownTimer(LiveTimeDef.TYPE_PUNISHMENT, leftTime);
                countDownTimer.start();
            }
        } else { // pk ???????????????pk ?????????
            pkControlView.handleResultFlag(false, 0);
            long leftTime = TimeUtils.getLeftTime(LiveTimeDef.TOTAL_TIME_PK, record.currentTime, record.pkStartTime, 0);
            countDownTimer = pkControlView.createCountDownTimer(LiveTimeDef.TYPE_PK,leftTime);
            countDownTimer.start();
        }
    }

    public void adjustVideoSizeForPk(boolean isPrepared) {
        int width = getWidth();
        int height = (int) (width / LiveParams.WH_RATIO_PK);

        float x = width / 2f;
        float y = StatusBarConfig.getStatusBarHeight(activity) + SpUtils.dp2pix(getContext(), 64) + height / 2f;

        PointF pivot = new PointF(x, y);
        Historian.e("=====>", "pk video view center point is " + pivot);
        if (isPrepared) {
            PlayerVideoSizeUtils.adjustForPreparePk(videoView, pivot);
        } else {
            PlayerVideoSizeUtils.adjustViewSizePosition(videoView, true, pivot);
        }
    }

    private void adjustVideoSizeForNormal() {
        PlayerVideoSizeUtils.adjustViewSizePosition(videoView);
    }

    private void initForNormal() {
        if (countDownTimer != null) {
            countDownTimer.stop();
        }
        pkControlView.setVisibility(INVISIBLE);
        pkControlView.updateRanking(Collections.emptyList(), Collections.emptyList());
        pkControlView.updateScore(0, 0);
    }

    /**
     * ???????????????????????????
     */
    private PlayerControl getPlayerControl() {
        if (playerControl == null || playerControl.isReleased()) {
            playerControl = new PlayerControl(activity, playerNotify);
            return playerControl;
        }
        return playerControl;
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        int x = (int) ev.getRawX();
        int y = (int) ev.getRawY();
        // ?????????????????????????????????
        if (!ViewUtils.isInView(etInputView, x, y)) {
            InputUtils.hideSoftInput(etInputView);
        }
        return super.dispatchTouchEvent(ev);
    }


    /**
     * ??????????????????????????????
     */
    private UserModel getCurrentUser() {
        return userCenterService.getCurrentUser();
    }
}
