package com.netease.nim.ccsocial_nim.session.activity;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.main.helper.MessageHelper;
import com.netease.nim.ccsocial_nim.session.adapter.MultiRetweetAdapter;
import com.netease.nim.ccsocial_nim.session.extension.MultiRetweetAttachment;
import com.netease.nim.uikit.api.NimUIKit;
import com.netease.nim.uikit.business.contact.selector.activity.ContactSelectActivity;
import com.netease.nim.uikit.business.session.constant.Extras;
import com.netease.nim.uikit.business.session.module.list.MessageListPanelEx;
import com.netease.nim.uikit.common.ToastHelper;
import com.netease.nim.uikit.common.activity.UI;
import com.netease.nim.uikit.common.ui.dialog.CustomAlertDialog;
import com.netease.nim.uikit.common.util.log.sdk.wrapper.NimLog;
import com.netease.nim.uikit.common.util.storage.StorageType;
import com.netease.nim.uikit.common.util.storage.StorageUtil;
import com.netease.nim.uikit.common.util.string.MD5;
import com.netease.nimlib.sdk.NIMClient;
import com.netease.nimlib.sdk.RequestCallback;
import com.netease.nimlib.sdk.msg.MessageBuilder;
import com.netease.nimlib.sdk.msg.constant.MsgDirectionEnum;
import com.netease.nimlib.sdk.msg.constant.SessionTypeEnum;
import com.netease.nimlib.sdk.msg.model.IMMessage;
import com.netease.nimlib.sdk.nos.NosService;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class WatchMultiRetweetActivity extends UI {

    private static final String TAG = "WatchMultiRetweetActivity";

    /** ???????????? */
    private static final String INTENT_EXTRA_DATA = Extras.EXTRA_DATA;

    /** ?????????????????? */
    private IMMessage mMessage;

    /** ????????????????????????????????? */
    private List<IMMessage> mItems;

    /** ???????????????????????? */
    private boolean mCanForward;

    /** ????????????????????? */
    private RecyclerView mMsgListRV;

    /** ???????????? */
    private TextView mForwardTV;

    /** ???????????? */
    private ImageButton mBackBtn;

    /** ?????????????????????????????????????????? */
    private TextView mTitleTV;

    /**
     * ?????????????????????????????????
     *
     * @param reqCode  ?????????
     * @param activity ??????Activity
     * @param message  ????????????
     */
    public static void startForResult(int reqCode, Activity activity, IMMessage message) {
        Intent intent = new Intent();
        intent.putExtra(INTENT_EXTRA_DATA, message);
        intent.putExtra(Extras.EXTRA_FORWARD, true);
        intent.setClass(activity, WatchMultiRetweetActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        activity.startActivityForResult(intent, reqCode);
    }

    /**
     * ????????????????????????????????????
     *
     * @param activity ??????Activity
     * @param message  ????????????
     */
    public static void start(Activity activity, IMMessage message) {
        Intent intent = new Intent();
        intent.putExtra(INTENT_EXTRA_DATA, message);
        intent.putExtra(Extras.EXTRA_FORWARD, false);
        intent.setClass(activity, WatchMultiRetweetActivity.class);
        activity.startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.nim_watch_multi_retweet_activity);
        onParseIntent();
        initViews();

        //????????????
        mItems = new ArrayList<>(0);
        queryFileBackground(mMessage, new QueryFileCallbackImp() {
            @Override
            public void onFinished(ArrayList<IMMessage> msgList) {
                mItems = msgList;
                runOnUiThread(() -> {
                    setMessageListAdapter();
                });
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case MessageListPanelEx.REQUEST_CODE_FORWARD_PERSON:
            case MessageListPanelEx.REQUEST_CODE_FORWARD_TEAM:
                onSelectSessionResult(requestCode, resultCode, data);
                break;
            default:
                break;
        }
    }

    /**
     * ?????????????????????????????????
     */
    private void onSelectSessionResult(int requestCode, int resultCode, @Nullable Intent data) {
        if (resultCode != Activity.RESULT_OK || data == null) {
            return;
        }

        AlertDialog.Builder dialogBuilder = new AlertDialog.Builder(this);
        dialogBuilder.setTitle(R.string.confirm_forwarded)
                .setMessage(getString(R.string.confirm_forwarded_to) + data.getStringArrayListExtra(Extras.RESULT_NAME).get(0) + "?")
                .setPositiveButton(getString(R.string.ok), new DialogInterface.OnClickListener() {
                    private void sendMsg(SessionTypeEnum sessionType, IMMessage packedMsg) {
                        data.putExtra(Extras.EXTRA_DATA, packedMsg);
                        data.putExtra(Extras.EXTRA_TYPE, sessionType.getValue());
                        setResult(Activity.RESULT_OK, data);
                        finish();
                    }

                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        SessionTypeEnum type;
                        switch (requestCode) {
                            //???????????????
                            case MessageListPanelEx.REQUEST_CODE_FORWARD_PERSON:
                                type = SessionTypeEnum.P2P;
                                break;
                            //???????????????
                            case MessageListPanelEx.REQUEST_CODE_FORWARD_TEAM:
                                type = SessionTypeEnum.Team;
                                break;
                            default:
                                return;
                        }
                        sendMsg(type, mMessage);
                    }
                })
                .setNegativeButton(getString(R.string.cancel), (dialog, which) -> {
                    setResult(Activity.RESULT_CANCELED);
                    finish();
                })
                .setOnCancelListener(dialog -> {
                    setResult(Activity.RESULT_CANCELED);
                    finish();
                });
        dialogBuilder.create().show();
    }

    /**
     * ?????????????????????
     */
    private void setMessageListAdapter() {
        mMsgListRV.setLayoutManager(new LinearLayoutManager(getApplicationContext(), RecyclerView.VERTICAL, false));
        MultiRetweetAdapter adapter = new MultiRetweetAdapter(mMsgListRV, mItems, this);
        mMsgListRV.setAdapter(adapter);
        adapter.notifyDataSetChanged();
    }


    /**
     * ???Intent????????????
     */
    private void onParseIntent() {
        this.mMessage = (IMMessage) getIntent().getSerializableExtra(INTENT_EXTRA_DATA);
        this.mCanForward = getIntent().getBooleanExtra(Extras.EXTRA_FORWARD, false);
    }

    /**
     * ???????????????
     */
    private void initViews() {
        //????????????
        mMsgListRV = findViewById(R.id.rv_msg_history);

        //????????????
        mForwardTV = findViewById(R.id.tv_forward);
        mForwardTV.setOnClickListener((v) -> {
            showTransFormTypeDialog();
        });
        mForwardTV.setVisibility(mCanForward ? View.VISIBLE : View.INVISIBLE);

        //????????????
        mBackBtn = findViewById(R.id.ib_back);
        mBackBtn.setOnClickListener(v -> {
            WatchMultiRetweetActivity.this.finish();
        });

        //???????????????????????????
        mTitleTV = findViewById(R.id.tv_session_name);
        String sessionName = "";
        if (MessageHelper.isMultiRetweet(mMessage)) {
            MultiRetweetAttachment attachment = (MultiRetweetAttachment) mMessage.getAttachment();
            sessionName = attachment.getSessionName();
        }
        mTitleTV.setText(sessionName == null ? "" : sessionName);
    }


    /**
     * ????????????????????????????????????
     */
    private void showTransFormTypeDialog() {
        CustomAlertDialog alertDialog = new CustomAlertDialog(this);
        alertDialog.setCancelable(true);
        alertDialog.setCanceledOnTouchOutside(true);
        addForwardToPersonItem(alertDialog);
        addForwardToTeamItem(alertDialog);
        alertDialog.show();
    }

    /**
     * ???????????????????????????
     *
     * @param alertDialog ???????????????
     */
    private void addForwardToPersonItem(CustomAlertDialog alertDialog) {
        alertDialog.addItem(getString(R.string.forward_to_person), () -> {
            ContactSelectActivity.Option option = new ContactSelectActivity.Option();
            option.title = "??????";
            option.type = ContactSelectActivity.ContactSelectType.BUDDY;
            option.multi = false;
            option.maxSelectNum = 1;
            NimUIKit.startContactSelector(WatchMultiRetweetActivity.this, option, MessageListPanelEx.REQUEST_CODE_FORWARD_PERSON);
        });
    }

    /**
     * ???????????????????????????
     *
     * @param alertDialog ???????????????
     */
    private void addForwardToTeamItem(CustomAlertDialog alertDialog) {
        alertDialog.addItem(getString(R.string.forward_to_team), () -> {
            ContactSelectActivity.Option option = new ContactSelectActivity.Option();
            option.title = "??????";
            option.type = ContactSelectActivity.ContactSelectType.TEAM;
            option.multi = false;
            option.maxSelectNum = 1;
            NimUIKit.startContactSelector(WatchMultiRetweetActivity.this, option, MessageListPanelEx.REQUEST_CODE_FORWARD_TEAM);
        });
    }

    /**
     * ?????????????????????Nos??????????????????
     * ?????????1. ???????????????????????????URL(???????????????); 2. ????????????; 3. ??????; 4. ??????(demo?????????????????????????????????); 5. ?????????????????????????????????
     *
     * @param callback ????????????
     */
    private void queryFileBackground(IMMessage multiRetweetMsg, IQueryFileCallback callback) {
        //?????????????????????
        if (!MessageHelper.isMultiRetweet(multiRetweetMsg)) {
            callback.onFailed("message is not a multi retweet message");
            return;
        }

        // ?????????????????????????????????????????????????????????return
        final MultiRetweetAttachment attachment = (MultiRetweetAttachment) multiRetweetMsg.getAttachment();
        //???????????????
        NIMClient.getService(NosService.class).getOriginUrlFromShortUrl(attachment.getUrl()).setCallback(new RequestCallback<String>() {
            @Override
            public void onSuccess(String param) {
                callback.onProgress(0);
                //???????????????????????????????????????
                onObtainedOriginFileUrl(param, attachment, callback);
            }

            @Override
            public void onFailed(int code) {
                callback.onFailed("failed to get origin url from short url, code=" + code);
            }

            @Override
            public void onException(Throwable exception) {
                callback.onException(exception);
            }
        });
    }

    /**
     * ?????????????????????URL?????????????????????
     *
     * @param originUrl  ???????????????????????????null???""????????????????????????url
     * @param attachment ????????????
     * @param callback   ????????????
     */
    private void onObtainedOriginFileUrl(final String originUrl, final MultiRetweetAttachment attachment, final IQueryFileCallback callback) {
        // ?????????????????????
        final String downloadUrl = TextUtils.isEmpty(originUrl) ? attachment.getUrl() : originUrl;
        if (TextUtils.isEmpty(downloadUrl)) {
            callback.onFailed("empty url");
            return;
        }
        // ??????????????????
        final String storedPath = StorageUtil.getWritePath(TAG + "Attachment" + System.currentTimeMillis(), StorageType.TYPE_FILE);
        NIMClient.getService(NosService.class).download(downloadUrl, null, storedPath).setCallback(new RequestCallback<Void>() {
            @Override
            public void onSuccess(Void param) {
                callback.onProgress(35);
                File attachmentFile = new File(storedPath);
                // ????????????
                if (!attachmentFile.isFile() || !attachmentFile.exists()) {
                    callback.onFailed("obtained empty file");
                    return;
                }
                try {
                    // ???????????????
                    byte[] src = readFromInputStream(new FileInputStream(attachmentFile));
                    // ????????????
                    attachmentFile.delete();
                    onObtainedFileSrc(src, attachment, callback);
                } catch (Throwable e) {
                    e.printStackTrace();
                    callback.onException(e);
                }
            }

            @Override
            public void onFailed(int code) {
                callback.onFailed("failed to download the attachment file, code=" + code);
            }

            @Override
            public void onException(Throwable exception) {
                callback.onException(exception);
            }
        });
    }

    /**
     * ????????????nos????????????????????????????????????????????????
     *
     * @param src        ???????????????????????????
     * @param attachment ????????????
     * @param callback   ????????????
     */
    private void onObtainedFileSrc(byte[] src, MultiRetweetAttachment attachment, IQueryFileCallback callback) {

        final String attaMd5 = attachment.getMd5();
        final boolean attaEncrypted = attachment.isEncrypted();
        final String attaPassword = attachment.getPassword();
        // demo???????????????????????????
        final boolean attaCompressed = attachment.isCompressed();

        try {

            //??????MD5
            String fileMd5 = MD5.getMD5(src).toUpperCase();
            String recordedMd5 = attaMd5.toUpperCase();
            if (!fileMd5.equals(recordedMd5)) {
                //MD5??????????????????return??????IOS??????
                NimLog.d(TAG, "MD5 check failed, fileMD5=" + fileMd5 + "; record = " + recordedMd5);
            }
            callback.onProgress(40);

            //??????
            if (attaEncrypted) {
                byte[] key = attaPassword.getBytes();
                src = MessageHelper.decryptByRC4(src, key);
            }
            callback.onProgress(45);

            if (attaCompressed) {
                //demo?????????????????????????????????
            }
            callback.onProgress(50);

            //??????
            String[] blocks = new String(src).split("\n");
            int count = getMsgCount(blocks[0]);
            final ArrayList<IMMessage> msgList = new ArrayList<>(count);
            for (int i = 1; i <= count; ++i) {
                final IMMessage msg = MessageBuilder.createFromJson((blocks[i]));
                double progressUnit = 40.0 / count;
                if (msg == null) {
                    continue;
                }
                msg.setDirect(MsgDirectionEnum.In);
                msgList.add(msg);
                callback.onProgress(50 + (int) (progressUnit * i));
            }

            //????????????
            Collections.sort(msgList, (o1, o2) -> Long.compare(o1.getTime(), o2.getTime()));

            callback.onProgress(100);
            callback.onFinished(msgList);
        } catch (Exception e) {
            e.printStackTrace();
            callback.onException(e);
        }
    }

    private byte[] readFromInputStream(InputStream inputStream) throws IOException {
        LinkedList<Byte> fileByteList = new LinkedList<>();
        int newByte;
        while ((newByte = inputStream.read()) != -1) {
            fileByteList.add((byte) newByte);
        }
        byte[] fileBytes = new byte[fileByteList.size()];
        int index = 0;
        for (byte b : fileByteList) {
            fileBytes[index++] = b;
        }
        return fileBytes;
    }

    private int getMsgCount(String firstLine) {
        try {
            JSONObject object = new JSONObject(firstLine);
            return object.getInt("message_count");
        } catch (JSONException e) {
            e.printStackTrace();
            return 0;
        }
    }

    interface IQueryFileCallback {

        /**
         * ????????????????????????
         *
         * @param percent ???????????????
         */
        void onProgress(int percent);

        /**
         * ????????????
         *
         * @param msgList ??????????????????????????????
         */
        void onFinished(ArrayList<IMMessage> msgList);

        /**
         * ????????????
         *
         * @param msg ????????????
         */
        void onFailed(String msg);

        /**
         * ?????????????????????
         *
         * @param e ??????
         */
        void onException(Throwable e);
    }

    class QueryFileCallbackImp implements IQueryFileCallback {

        @Override
        public void onProgress(int percent) {
            NimLog.d(TAG, "query file on progress: " + percent + "%");
            runOnUiThread(() -> {
                ToastHelper.showToast(WatchMultiRetweetActivity.this, percent + "%");
            });
        }

        @Override
        public void onFinished(ArrayList<IMMessage> msgList) {
            NimLog.d(TAG, "query file succeed");
        }

        @Override
        public void onFailed(String msg) {
            final String briefMsg = "query file failed";
            NimLog.d(TAG, briefMsg + ", msg=" + msg);
            runOnUiThread(() -> {
                ToastHelper.showToast(WatchMultiRetweetActivity.this, briefMsg);
            });
        }

        @Override
        public void onException(Throwable e) {
            final String briefMsg = "query file failed";
            NimLog.d(TAG, briefMsg + ", msg=" + e.getMessage());
            runOnUiThread(() -> {
                ToastHelper.showToast(WatchMultiRetweetActivity.this, briefMsg);
            });
        }
    }
}
