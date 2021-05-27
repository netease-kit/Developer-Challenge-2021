package cn.ccsocial.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.io.Serializable;

@Configuration
@PropertySource(value="classpath:yunxin.properties")
public class YunxinConfig implements Serializable {

    @Value("${yunxin.appKey}")
    private String appKey;

    @Value("${yunxin.appSecret}")
    private String appSecret;

    @Value("${yunxin.nonce}")
    private String nonce;

    public String getAppKey() {
        return appKey;
    }

    public void setAppKey(String appKey) {
        this.appKey = appKey;
    }

    public String getAppSecret() {
        return appSecret;
    }

    public void setAppSecret(String appSecret) {
        this.appSecret = appSecret;
    }

    public String getNonce() {
        return nonce;
    }

    public void setNonce(String nonce) {
        this.nonce = nonce;
    }
}
