package cn.ccsocial.utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Repository
public class RedisAPI {

    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired(required = false)
    public void setRedisTemplate(RedisTemplate redisTemplate) {
        RedisSerializer stringSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(stringSerializer);
        redisTemplate.setValueSerializer(stringSerializer);
        redisTemplate.setHashKeySerializer(stringSerializer);
        redisTemplate.setHashValueSerializer(stringSerializer);
        this.redisTemplate = redisTemplate;
    }

    public String get(String key){
        if(redisTemplate.opsForValue().get(key)!=null) {
            String value = redisTemplate.opsForValue().get(key).toString();
            return value;
        }else{
            return " ";
        }
    }

    public void set(String key,String value){
        redisTemplate.opsForValue().set(key,value);
    }

    /**
     * 保存：设置过期时间的重载方法
     * @param key
     * @param value
     * @param seconds
     */
    public void set(String key,String value,int seconds){
        redisTemplate.opsForValue().set(key, value, seconds, TimeUnit.SECONDS);
    }

    public boolean exists(String key){
        String result =  redisTemplate.boundValueOps(key).get().toString();
        boolean isExist;
        if(result!=null){
            isExist=true;
        }else{
            isExist=false;
        }
        return isExist;
    }
}
