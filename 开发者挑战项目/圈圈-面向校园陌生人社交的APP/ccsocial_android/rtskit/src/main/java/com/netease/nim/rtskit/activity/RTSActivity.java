package com.netease.nim.rtskit.activity;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Rect;
import android.os.Bundle;
import android.os.Handler;
import android.os.HandlerThread;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.netease.nim.rtskit.R;
import com.netease.nim.rtskit.RTSKit;
import com.netease.nim.rtskit.common.activity.NimToolBarOptions;
import com.netease.nim.rtskit.common.activity.ToolBarOptions;
import com.netease.nim.rtskit.common.activity.UI;
import com.netease.nim.rtskit.common.dialog.EasyAlertDialog;
import com.netease.nim.rtskit.common.dialog.EasyAlertDialogHelper;
import com.netease.nim.rtskit.common.imageview.HeadImageView;
import com.netease.nim.rtskit.common.util.ScreenUtil;
import com.netease.nim.rtskit.doodle.DoodleView;
import com.netease.nim.rtskit.doodle.SupportActionType;
import com.netease.nim.rtskit.doodle.Transaction;
import com.netease.nim.rtskit.doodle.TransactionCenter;
import com.netease.nim.rtskit.doodle.action.MyPath;
import com.netease.nim.rtskit.doodle.constant.ActionTypeEnum;
import com.netease.nimlib.sdk.NIMClient;
import com.netease.nimlib.sdk.Observer;
import com.netease.nimlib.sdk.StatusCode;
import com.netease.nimlib.sdk.auth.AuthServiceObserver;
import com.netease.nimlib.sdk.auth.ClientType;
import com.netease.nimlib.sdk.rts.RTSCallback;
import com.netease.nimlib.sdk.rts.RTSChannelStateObserver;
import com.netease.nimlib.sdk.rts.RTSManager;
import com.netease.nimlib.sdk.rts.constant.RTSEventType;
import com.netease.nimlib.sdk.rts.constant.RTSTimeOutEvent;
import com.netease.nimlib.sdk.rts.constant.RTSTunnelType;
import com.netease.nimlib.sdk.rts.model.RTSCalleeAckEvent;
import com.netease.nimlib.sdk.rts.model.RTSCommonEvent;
import com.netease.nimlib.sdk.rts.model.RTSControlEvent;
import com.netease.nimlib.sdk.rts.model.RTSData;
import com.netease.nimlib.sdk.rts.model.RTSNetworkProxy;
import com.netease.nimlib.sdk.rts.model.RTSNotifyOption;
import com.netease.nimlib.sdk.rts.model.RTSOnlineAckEvent;
import com.netease.nimlib.sdk.rts.model.RTSOptions;
import com.netease.nimlib.sdk.rts.model.RTSTunData;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * ??????/??????????????????
 * <p/>
 * Created by huangjun on 2015/7/27.
 */
public class RTSActivity extends UI implements View.OnClickListener {

    public static final int FROM_BROADCAST_RECEIVER = 0; // ????????????
    public static final int FROM_INTERNAL = 1; // ???????????????
    private static final String KEY_RTS_DATA = "KEY_RTS_DATA";
    private static final String KEY_INCOMING = "KEY_INCOMING";
    private static final String KEY_SOURCE = "KEY_SOURCE";
    private static final String KEY_UID = "KEY_UID";

    // data
    private boolean isIncoming = false;
    private String account;      // ????????????
    private String sessionId;    // ?????????????????????
    private RTSData sessionInfo; // ?????????????????????
    private boolean audioOpen = false; // ????????????
    private boolean finishFlag = false; // ?????????????????????????????????onFinish
    private static boolean needFinish = true; // Activity?????????????????????????????????????????????finish

    private static boolean isBusy = false;

    // ??????????????????
    private View startSessionLayout;
    private TextView sessionStepText;
    private HeadImageView headImage;
    private TextView nameText;
    private View calleeAckLayout;
    private Button acceptBtn;
    private Button rejectBtn;
    private Button endSessionBtn;
    private Button audioSwitchBtn;

    // ????????????
    private View sessionLayout;
    private DoodleView doodleView;
    private Button backBtn;
    private Button clearBtn;

    // ?????????????????? ??????????????????????????????????????????????????? ??? ???sdk ??????
    private HandlerThread receiveThread;
    private Handler receiveDataHandler;

    public static void incomingSession(Context context, RTSData data, int source) {

        if (isBusy) {
            RTSManager.getInstance().close(data.getLocalSessionId(), null);
            Toast.makeText(context, "close session", Toast.LENGTH_SHORT).show();
            return;
        }

        needFinish = false;
        Intent intent = new Intent();
        intent.setClass(context, RTSActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.putExtra(KEY_RTS_DATA, data);
        intent.putExtra(KEY_INCOMING, true);
        intent.putExtra(KEY_SOURCE, source);
        context.startActivity(intent);
    }

    public static void startSession(Context context, String account, int source) {
        needFinish = false;
        Intent intent = new Intent();
        intent.setClass(context, RTSActivity.class);
        intent.putExtra(KEY_UID, account);
        intent.putExtra(KEY_INCOMING, false);
        intent.putExtra(KEY_SOURCE, source);
        context.startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (needFinish) {
            finish();
            return;
        }

        isBusy = true;
        dismissKeyguard();
        setContentView(R.layout.rts_activity);

        ToolBarOptions options = new NimToolBarOptions();
        options.isNeedNavigate = false;
        setToolBar(R.id.toolbar, options);

        isIncoming = getIntent().getBooleanExtra(KEY_INCOMING, false);
        findViews();
        initActionBarButton();

        receiveThread = new HandlerThread("receive_data_thread");
        receiveThread.start();
        receiveDataHandler = new Handler(receiveThread.getLooper());

        if (isIncoming) {
            incoming();
            registerInComingObserver(true);
        } else {
            outgoing();
            registerOutgoingObserver(true);
        }

        initAudioSwitch();
        registerCommonObserver(true);

        //????????????UI?????????????????????????????????UI??????onKickOut??????
        NIMClient.getService(AuthServiceObserver.class).observeOnlineStatus(userStatusObserver, true);
    }

    private void initActionBarButton() {
        TextView closeSessionBtn = findView(R.id.action_bar_right_clickable_textview);
        closeSessionBtn.setText(R.string.close);
        closeSessionBtn.setBackgroundResource(R.drawable.nim_message_button_bottom_send_selector);
        closeSessionBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EasyAlertDialogHelper.OnDialogActionListener listener = new EasyAlertDialogHelper.OnDialogActionListener() {

                    @Override
                    public void doCancelAction() {
                    }

                    @Override
                    public void doOkAction() {
                        endSession(); // ??????
                    }
                };
                final EasyAlertDialog dialog = EasyAlertDialogHelper.createOkCancelDiolag(RTSActivity.this,
                        getString(R.string.end_session_tip_head),
                        getString(R.string.end_session_tip_content),
                        getString(R.string.ok), getString(R.string.cancel), true, listener);
                dialog.show();
            }
        });
    }

    @Override
    public void onBackPressed() {
    }

    @Override
    protected boolean displayHomeAsUpEnabled() {
        return false;
    }

    @Override
    protected void onPostResume() {
        super.onPostResume();

        // ??????????????????
        doodleView.onResume();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (doodleView != null) {
            doodleView.end();
        }
        if (receiveThread != null) {
            receiveThread.quit();
            receiveThread = null;
        }

        if (needFinish) {
            return;
        }
        NIMClient.getService(AuthServiceObserver.class).observeOnlineStatus(userStatusObserver, false);
        registerInComingObserver(false);
        registerOutgoingObserver(false);
        registerCommonObserver(false);
        needFinish = true;
        isBusy = false;
    }

    Observer<StatusCode> userStatusObserver = new Observer<StatusCode>() {

        @Override
        public void onEvent(StatusCode code) {
            if (code.wontAutoLogin()) {
                RTSKit.getRtsOptions().logout(RTSActivity.this);
                finish();
            }
        }
    };

    // ????????????flag?????????????????????/????????????????????????
    private void dismissKeyguard() {
        getWindow().addFlags(
                WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED |
                        WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD |
                        WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON |
                        WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
        );
    }

    private void findViews() {
        startSessionLayout = findViewById(R.id.start_session_layout);
        sessionLayout = findViewById(R.id.session_layout);

        headImage = findViewById(R.id.head_image);
        sessionStepText = findViewById(R.id.session_step_text);
        nameText = findViewById(R.id.name);
        calleeAckLayout = findViewById(R.id.callee_ack_layout);
        acceptBtn = findViewById(R.id.accept);
        rejectBtn = findViewById(R.id.reject);
        endSessionBtn = findViewById(R.id.end_session);
        doodleView = findViewById(R.id.doodle_view);
        backBtn = findViewById(R.id.doodle_back);
        clearBtn = findViewById(R.id.doodle_clear);
        audioSwitchBtn = findViewById(R.id.audio_switch);

        acceptBtn.setOnClickListener(this);
        rejectBtn.setOnClickListener(this);
        endSessionBtn.setOnClickListener(this);
        audioSwitchBtn.setOnClickListener(this);
        backBtn.setOnClickListener(this);
        clearBtn.setOnClickListener(this);

        float screenWidth = ScreenUtil.screenWidth * 1.0f;
        ViewGroup.LayoutParams params = doodleView.getLayoutParams();
        params.width = ((int) (screenWidth / 100)) * 100; // ???????????????100?????????
        params.height = params.width; // ??????????????????1:1
        doodleView.setLayoutParams(params);
    }

    private void incoming() {
        sessionInfo = (RTSData) getIntent().getSerializableExtra(KEY_RTS_DATA);
        account = sessionInfo.getAccount();
        sessionId = sessionInfo.getLocalSessionId();

        Toast.makeText(RTSActivity.this, "incoming session, extra=" + sessionInfo.getExtra(),
                Toast.LENGTH_SHORT)
                .show();
        initIncomingSessionViews();
    }

    private void outgoing() {
        account = getIntent().getStringExtra(KEY_UID);

        initStartSessionViews();
        startSession();
    }

    private void initStartSessionViews() {
        initAccountInfoView();
        sessionStepText.setText(R.string.start_session);
        calleeAckLayout.setVisibility(View.GONE);
        endSessionBtn.setVisibility(View.VISIBLE);
        startSessionLayout.setVisibility(View.VISIBLE);
    }

    private void initIncomingSessionViews() {
        initAccountInfoView();
        sessionStepText.setText(R.string.receive_session);
        calleeAckLayout.setVisibility(View.VISIBLE);
        endSessionBtn.setVisibility(View.GONE);
        startSessionLayout.setVisibility(View.VISIBLE);
    }

    private void initAccountInfoView() {
        nameText.setText(RTSKit.getUserInfoProvider().getUserDisplayName(account));
        headImage.loadBuddyAvatar(account);
    }

    private void registerOutgoingObserver(boolean register) {
        RTSManager.getInstance().observeCalleeAckNotification(sessionId, calleeAckEventObserver, register);
    }

    private void registerInComingObserver(boolean register) {
        RTSManager.getInstance().observeOnlineAckNotification(sessionId, onlineAckObserver, register);
    }

    private void registerCommonObserver(boolean register) {
        RTSManager.getInstance().observeChannelState(sessionId, channelStateObserver, register);
        RTSManager.getInstance().observeHangUpNotification(sessionId, endSessionObserver, register);
        RTSManager.getInstance().observeReceiveData(sessionId, receiveDataObserver, register);
        RTSManager.getInstance().observeTimeoutNotification(sessionId, timeoutObserver, register);
        RTSManager.getInstance().observeControlNotification(sessionId, controlObserver, register);
    }

    /**
     * ?????????????????????????????????or?????????????????????
     */
    private Observer<RTSCalleeAckEvent> calleeAckEventObserver = new Observer<RTSCalleeAckEvent>() {
        @Override
        public void onEvent(RTSCalleeAckEvent rtsCalleeAckEvent) {
            if (rtsCalleeAckEvent.getEvent() == RTSEventType.CALLEE_ACK_AGREE) {
                // ??????SDK??????????????????????????????
                if (!rtsCalleeAckEvent.isTunReady()) {
                    Toast.makeText(RTSActivity.this, "??????????????????!?????????LOG", Toast.LENGTH_SHORT).show();
                    return;
                }
                acceptView(); // ??????????????????
            } else if (rtsCalleeAckEvent.getEvent() == RTSEventType.CALLEE_ACK_REJECT) {
                Toast.makeText(RTSActivity.this, R.string.callee_reject, Toast.LENGTH_SHORT).show();
                onFinish(false);
            }
        }
    };

    /**
     * ??????????????????
     */
    private Observer<RTSCommonEvent> endSessionObserver = new Observer<RTSCommonEvent>() {
        @Override
        public void onEvent(RTSCommonEvent rtsCommonEvent) {
            Toast.makeText(RTSActivity.this, R.string.target_has_end_session, Toast.LENGTH_SHORT).show();
            onFinish(false);
        }
    };


    /**
     * ???????????????????????????????????????
     */
    private Observer<RTSTunData> receiveDataObserver = new Observer<RTSTunData>() {
        @Override
        public void onEvent(final RTSTunData rtsTunData) {
            // ??????????????????????????????????????????????????? ??? ???sdk ??????
            String data = "[parse bytes error] , thread = " + Thread.currentThread().getName();
            try {
                data = new String(rtsTunData.getData(), 0, rtsTunData.getLength(), "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            final List<Transaction> trans = TransactionCenter.getInstance().unpack(data);
            if (trans == null || trans.size() == 0) {
                return;
            }
            // ???????????????????????????????????????remove ?????? ????????????????????????
            if (trans.get(0).isClearSelf()) {
                Log.i("RTSActivity","clear self");
                receiveDataHandler.removeCallbacks(null);
            }

            receiveDataHandler.post(new Runnable() {
                @Override
                public void run() {
                    TransactionCenter.getInstance().onReceive(sessionId, trans);
                }
            });

        }
    };

    /**
     * ?????????????????????????????????????????????
     */
    private Observer<RTSOnlineAckEvent> onlineAckObserver = new Observer<RTSOnlineAckEvent>() {
        @Override
        public void onEvent(RTSOnlineAckEvent rtsOnlineAckEvent) {
            if (rtsOnlineAckEvent.getClientType() != ClientType.Android) {
                String client = null;
                switch (rtsOnlineAckEvent.getClientType()) {
                    case ClientType.Web:
                        client = "Web";
                        break;
                    case ClientType.Windows:
                        client = "Windows";
                        break;
                    case ClientType.MAC:
                        client = "Mac";
                        break;
                    default:
                        break;
                }
                if (client != null) {
                    String option = rtsOnlineAckEvent.getEvent() == RTSEventType.CALLEE_ONLINE_CLIENT_ACK_AGREE ?
                            "??????" : "??????";
                    Toast.makeText(RTSActivity.this, "??????????????????" + client + "??????" + option, Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(RTSActivity.this, "?????????????????????????????????", Toast.LENGTH_SHORT).show();
                }
                onFinish();
            }
        }
    };

    /**
     * ??????????????????
     */
    private Observer<RTSControlEvent> controlObserver = new Observer<RTSControlEvent>() {
        @Override
        public void onEvent(RTSControlEvent rtsControlEvent) {
            Toast.makeText(RTSActivity.this, rtsControlEvent.getCommandInfo(), Toast.LENGTH_SHORT).show();
        }
    };

    /**
     * ???????????????????????????
     */
    private RTSChannelStateObserver channelStateObserver = new RTSChannelStateObserver() {

        @Override
        public void onConnectResult(String sessionId, RTSTunnelType tunType, long channelId, int code, String file) {
            try {
                Toast.makeText(RTSActivity.this, "onConnectResult, tunType=" + tunType.toString() +
                        ", channelId=" + channelId +
                        ", code=" + code + ", file=" + file, Toast.LENGTH_SHORT).show();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }


        @Override
        public void onChannelEstablished(String sessionId, RTSTunnelType tunType) {
            try {
                Toast.makeText(RTSActivity.this, "onCallEstablished,tunType=" + tunType.toString(), Toast.LENGTH_SHORT).show();
            } catch (Exception e) {
                e.printStackTrace();
            }

            if (tunType == RTSTunnelType.AUDIO) {
                RTSManager.getInstance().setSpeaker(sessionId, true); // ?????????????????????
            }
        }

        @Override
        public void onUserJoin(String sessionId, RTSTunnelType tunType, String account) {

        }

        @Override
        public void onUserLeave(String sessionId, RTSTunnelType tunType, String account, int event) {
            //????????????????????????
            endSession();
        }

        @Override
        public void onDisconnectServer(String sessionId, RTSTunnelType tunType) {
            Toast.makeText(RTSActivity.this, "onDisconnectServer, tunType=" + tunType.toString(), Toast
                    .LENGTH_SHORT).show();
            if (tunType == RTSTunnelType.DATA) {
                // ?????????????????????????????????????????????
                Toast.makeText(RTSActivity.this, "TCP?????????????????????????????????", Toast.LENGTH_SHORT).show();
                endSession();
            } else if (tunType == RTSTunnelType.AUDIO) {
                // ?????????????????????????????????UI??????
                if (audioOpen) {
                    audioSwitch();
                }
            }
        }

        @Override
        public void onError(String sessionId, RTSTunnelType tunType, int code) {
            Toast.makeText(RTSActivity.this, "onError, tunType=" + tunType.toString() + ", error=" + code,
                    Toast.LENGTH_LONG).show();
            endSession();
        }

        @Override
        public void onNetworkStatusChange(String sessionId, RTSTunnelType tunType, int value) {
            // ??????????????????
        }
    };

    private Observer<RTSTimeOutEvent> timeoutObserver = new Observer<RTSTimeOutEvent>() {
        @Override
        public void onEvent(RTSTimeOutEvent rtsTimeOutEvent) {
            Toast.makeText(RTSActivity.this,
                    (rtsTimeOutEvent == RTSTimeOutEvent.OUTGOING_TIMEOUT) ? getString(R.string.callee_ack_timeout) :
                            "??????????????????????????????", Toast.LENGTH_SHORT).show();
            onFinish();
        }
    };

    private void startSession() {
        List<RTSTunnelType> types = new ArrayList<>(1);
        types.add(RTSTunnelType.AUDIO);
        types.add(RTSTunnelType.DATA);

        String pushContent = account + "??????????????????";
        String extra = "extra_data";
        RTSOptions options = new RTSOptions().setRecordAudioTun(false)
                .setRecordDataTun(true);
        RTSNotifyOption notifyOption = new RTSNotifyOption();
        notifyOption.apnsContent = pushContent;
        notifyOption.extendMessage = extra;
        //????????????
//        RTSNetworkProxy networkProxy = new RTSNetworkProxy();
//        networkProxy.host = "10.234.1.23";
//        networkProxy.port = 8080;
//        networkProxy.userName = "test";
//        networkProxy.userPassword = "testPwd";
//        RTSManager.getInstance().setNetworkProxy(networkProxy);

        sessionId = RTSManager.getInstance().start(account, types, options, notifyOption, new RTSCallback<RTSData>() {
            @Override
            public void onSuccess(RTSData rtsData) {
                RTSKit.getRTSEventListener().onRTSStartSuccess(account);
            }

            @Override
            public void onFailed(int code) {
                if (code == 11001) {
                    Toast.makeText(RTSActivity.this, "????????????????????????", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(RTSActivity.this, "??????????????????,code=" + code, Toast.LENGTH_SHORT).show();
                }
                onFinish();
            }

            @Override
            public void onException(Throwable exception) {
                Toast.makeText(RTSActivity.this, "??????????????????,e=" + exception.toString(), Toast.LENGTH_SHORT).show();
                onFinish();
            }
        });

        if (sessionId == null) {
            Toast.makeText(RTSActivity.this, "??????????????????!", Toast.LENGTH_SHORT).show();
            onFinish();
        }
    }

    @Override
    public void onClick(View v) {
        int i = v.getId();
        if (i == R.id.accept) {
            acceptSession();

        } else if (i == R.id.reject) {
            endSession();

        } else if (i == R.id.end_session) {
            endSession();

        } else if (i == R.id.doodle_back) {
            doodleBack();

        } else if (i == R.id.doodle_clear) {
            clear();

        } else if (i == R.id.audio_switch) {
            audioSwitch();

        } else {
        }
    }

    private void acceptSession() {
        RTSOptions options = new RTSOptions().setRecordAudioTun(false).setRecordDataTun(true);
        RTSManager.getInstance().accept(sessionId, options, new RTSCallback<Boolean>() {
            @Override
            public void onSuccess(Boolean success) {
                // ??????????????????????????????
                if (success) {
                    acceptView();
                } else {
                    Toast.makeText(RTSActivity.this, "??????????????????!?????????LOG", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailed(int code) {
                if (code == -1) {
                    Toast.makeText(RTSActivity.this, "??????????????????,?????????????????????????????????????????????", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(RTSActivity.this, "??????????????????, code=" + code, Toast.LENGTH_SHORT).show();
                }
                onFinish();
            }

            @Override
            public void onException(Throwable exception) {
                Toast.makeText(RTSActivity.this, "??????????????????, e=" + exception.toString(), Toast.LENGTH_SHORT).show();
                onFinish();
            }
        });
    }

    private void acceptView() {
        startSessionLayout.setVisibility(View.GONE);
        sessionLayout.setVisibility(View.VISIBLE);
        initDoodleView();


    }

    private void endSession() {
        RTSManager.getInstance().close(sessionId, new RTSCallback<Void>() {
            @Override
            public void onSuccess(Void aVoid) {

            }

            @Override
            public void onFailed(int code) {
                Toast.makeText(RTSActivity.this, "?????????????????????code???" + code, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onException(Throwable exception) {

            }
        });

        onFinish();
    }

    private void onFinish() {
        onFinish(true);
    }

    private void onFinish(boolean selfFinish) {
        if (finishFlag) {
            return;
        }
        finishFlag = true;

        RTSKit.getRTSEventListener().onRTSFinish(account, selfFinish);

        finish();
    }

    /**
     * ***************************** ?????? ***********************************
     */
    private void initDoodleView() {
        // add support ActionType
        SupportActionType.getInstance().addSupportActionType(ActionTypeEnum.Path.getValue(), MyPath.class);

        doodleView.init(sessionId, account, DoodleView.Mode.BOTH, Color.WHITE, this);

        doodleView.setPaintSize(10);
        doodleView.setPaintType(ActionTypeEnum.Path.getValue());

        // adjust paint offset
        new Handler(getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                Rect frame = new Rect();
                getWindow().getDecorView().getWindowVisibleDisplayFrame(frame);
                int statusBarHeight = frame.top;
                Log.i("Doodle", "statusBarHeight =" + statusBarHeight);

                int marginTop = doodleView.getTop();
                Log.i("Doodle", "doodleView marginTop =" + marginTop);

                int marginLeft = doodleView.getLeft();
                Log.i("Doodle", "doodleView marginLeft =" + marginLeft);

                float offsetX = marginLeft;
                float offsetY = statusBarHeight + marginTop;

                doodleView.setPaintOffset(offsetX, offsetY);
                Log.i("Doodle", "client1 offsetX = " + offsetX + ", offsetY = " + offsetY);
            }
        }, 50);
    }

    /**
     * ????????????
     */
    private void doodleBack() {
        doodleView.paintBack();
    }

    /**
     * ??????
     */
    private void clear() {
        doodleView.clear();
    }

    /**
     * ????????????
     */
    private void audioSwitch() {
        audioOpen = !audioOpen;
        RTSManager.getInstance().setMute(sessionId, !audioOpen);
        audioSwitchBtn.setBackgroundResource(audioOpen ? R.drawable.icon_audio_open : R.drawable.icon_audio_close);

        // ??????????????????????????????
        String content = "????????????" + (audioOpen ? "??????" : "??????");
        RTSManager.getInstance().sendControlCommand(sessionId, content, new RTSCallback<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                String tip = "??????" + (audioOpen ? "??????" : "??????");
                Toast.makeText(RTSActivity.this, tip, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onFailed(int code) {
                Toast.makeText(RTSActivity.this, "????????????????????????, code =" + code, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onException(Throwable exception) {
                Toast.makeText(RTSActivity.this, "????????????????????????, e=" + exception.toString(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    /**
     * ?????????????????????(????????????)
     */
    private void initAudioSwitch() {
        RTSManager.getInstance().setMute(sessionId, true);
        audioSwitchBtn.setBackgroundResource(R.drawable.icon_audio_close);
    }
}
