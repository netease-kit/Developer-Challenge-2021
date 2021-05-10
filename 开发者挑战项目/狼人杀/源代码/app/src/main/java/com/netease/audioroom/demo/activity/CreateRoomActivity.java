package com.netease.audioroom.demo.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

import com.gyf.immersionbar.ImmersionBar;
import com.netease.audioroom.demo.R;
import com.netease.audioroom.demo.cache.DemoCache;
import com.netease.audioroom.demo.constant.Extras;
import com.netease.audioroom.demo.dialog.RoomTypeChooserDialog;
import com.netease.audioroom.demo.http.ChatRoomHttpClient;
import com.netease.audioroom.demo.http.ChatRoomNetConstants;
import com.netease.audioroom.demo.util.NetworkUtils;
import com.netease.audioroom.demo.util.ToastHelper;
import com.netease.yunxin.nertc.nertcvoiceroom.model.VoiceRoomInfo;

import static com.netease.yunxin.nertc.nertcvoiceroom.model.NERtcVoiceRoomDef.RoomAudioQuality.DEFAULT_QUALITY;
import static com.netease.yunxin.nertc.nertcvoiceroom.model.NERtcVoiceRoomDef.RoomAudioQuality.MUSIC_QUALITY;

public class CreateRoomActivity extends AppCompatActivity {

    public static final int MAX_ROOM_NAME_LENGTH = 20;

    private EditText tvRoomName;


    private View iconKTV;


    private View root;

    private View createRoom;

    private int currentType = ChatRoomNetConstants.ROOM_TYPE_CHAT;

    public static void start(Context context, int type) {
        Intent intent = new Intent(context, CreateRoomActivity.class);
        if (!(context instanceof Activity)) {
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        }
        intent.putExtra(Extras.ROOM_TYPE, type);
        context.startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_creat_room);
        ImmersionBar.with(this).statusBarDarkFont(false).init();
        root = findViewById(R.id.cl_root);
        int barHeight = ImmersionBar.getStatusBarHeight(this);
        root.setPadding(root.getPaddingLeft(), root.getPaddingTop() + barHeight, root.getPaddingRight(),
                        root.getPaddingBottom());
        currentType = getIntent().getIntExtra(Extras.ROOM_TYPE, ChatRoomNetConstants.ROOM_TYPE_CHAT);
        initViews();
    }

    private void initViews() {
        View back = findViewById(R.id.iv_back);
        back.setOnClickListener(v -> finish());
        View random = findViewById(R.id.iv_random);
        random.setOnClickListener(v -> randomName());
        tvRoomName = findViewById(R.id.et_room_name);
        createRoom = findViewById(R.id.tv_create_room);
        updateUI();
        randomName();
        createRoom.setOnClickListener(v -> {
            String roomName = tvRoomName.getText().toString().trim();
//            if (TextUtils.isEmpty(roomName)) {
//                ToastHelper.showToast(getString(R.string.room_name_empty));
//                return;
//            }
//            if (currentType == ChatRoomNetConstants.ROOM_TYPE_CHAT) {
//                new RoomTypeChooserDialog(CreateRoomActivity.this,
//                                          (context, type) -> createRoom(roomName, ChatRoomNetConstants.ROOM_TYPE_CHAT,
//                                                                        type)).show();
//            } else {
//                createRoom(roomName, ChatRoomNetConstants.ROOM_TYPE_KTV, ChatRoomNetConstants.PUSH_TYPE_RTC);
//            }
            AudienceActivity.start(CreateRoomActivity.this, new VoiceRoomInfo("366631370", "155568696279296", roomName,
                    "http://nim.nos.netease.com/0f4c0b4c5b1a4d65909f5b17a9493aba02.png", 4, 0, "玩家1"));
        });
    }

    private void updateUI() {
        boolean chatType = currentType == ChatRoomNetConstants.ROOM_TYPE_CHAT;
        root.setBackgroundResource(
                chatType ? R.drawable.icon_create_room_chat_room_bg : R.drawable.icon_create_room_ktv_bg);
        createRoom.setBackgroundResource(
                chatType ? R.drawable.shape_create_room_btn_chat_room_bg : R.drawable.shape_create_room_btn_ktv_bg);
    }

    private void randomName() {
        ChatRoomHttpClient.getInstance().getRandomTopic(new ChatRoomHttpClient.ChatRoomHttpCallback<String>() {

            @Override
            public void onSuccess(String s) {
                if (s != null) {
                    tvRoomName.setText(s.length() > MAX_ROOM_NAME_LENGTH ? s.substring(0, MAX_ROOM_NAME_LENGTH) : s);
                }
            }

            @Override
            public void onFailed(int code, String errorMsg) {
                // 获取随机名称失败；
            }
        });

    }

    private void createRoom(String roomName, int roomType, int pushType) {
        createRoom.setEnabled(false);
        ChatRoomHttpClient.getInstance().createRoom(DemoCache.getAccountId(), roomName, pushType, roomType,
                                                    new ChatRoomHttpClient.ChatRoomHttpCallback<VoiceRoomInfo>() {

                                                        @Override
                                                        public void onSuccess(VoiceRoomInfo roomInfo) {
                                                            createRoom.setEnabled(true);
                                                            if (roomInfo != null) {
                                                                if (roomInfo.getRoomType() == ChatRoomNetConstants.ROOM_TYPE_CHAT) {
                                                                    roomInfo.setAudioQuality(DEFAULT_QUALITY);
                                                                } else if (roomInfo.getRoomType() == ChatRoomNetConstants.ROOM_TYPE_KTV) {
                                                                    roomInfo.setAudioQuality(MUSIC_QUALITY);
                                                                }

                                                                AnchorActivity.start(CreateRoomActivity.this, roomInfo);
                                                                finish();
                                                            } else {
                                                                ToastHelper.showToast(
                                                                        getString(R.string.crate_room_error));
                                                            }
                                                        }

                                                        @Override
                                                        public void onFailed(int code, String errorMsg) {
                                                            createRoom.setEnabled(true);
                                                            if (TextUtils.isEmpty(errorMsg)) {
                                                                errorMsg = getString(R.string.params_error);
                                                            } else {
                                                                errorMsg = "服务器失败";
                                                            }
                                                            ToastHelper.showToast(
                                                                    "创建失败:" + (!NetworkUtils.isNetworkConnected(
                                                                            CreateRoomActivity.this) ? "网络错误" : errorMsg));
                                                        }
                                                    });
    }
}