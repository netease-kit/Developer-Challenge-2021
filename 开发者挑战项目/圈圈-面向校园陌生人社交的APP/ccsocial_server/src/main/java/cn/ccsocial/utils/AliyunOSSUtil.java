package cn.ccsocial.utils;

import cn.ccsocial.config.AliyunOSSConfig;
import cn.ccsocial.config.YunxinConfig;
import com.aliyun.oss.*;
import com.aliyun.oss.model.CannedAccessControlList;
import com.aliyun.oss.model.CreateBucketRequest;
import com.aliyun.oss.model.PutObjectRequest;
import com.aliyun.oss.model.PutObjectResult;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.oxm.config.OxmNamespaceHandler;
import org.springframework.stereotype.Service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Service
public class AliyunOSSUtil {

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(AliyunOSSUtil.class);
    @Autowired
    AliyunOSSConfig aliyunOSSConfig = new AliyunOSSConfig();
    String endpoint = "http://oss-cn-hangzhou.aliyuncs.com";
    String bucketName = "ccsocial";
    String accessKeyId = "LTAI4GFvF76yAPaodTiPKHKx";
    String accessKeySecret = "kMN5n1WLzeLK4YOpZI5pXSYM72T6FV";
    String ossPath = "http://oss.ccsocial.cn/";

    public String uploadFile(String userCcid,File file,String path) {
        logger.info("=========>OSS头像上传开始：" + file.getName());
//      String test=yunxinConfig.getAppKey();
//      String endpoint=aliyunOSSConfig.getEndpoint();
//      String accessKeyId= aliyunOSSConfig.getAccessKeyId();
//      String accessKeySecret=aliyunOSSConfig.getAccessKeySecret();
//      String bucketName=aliyunOSSConfig.getBucketName();
//      String picLocation=aliyunOSSConfig.getPicLocation();

        //      String picLocation = "imgs/avatar/";
        String picLocation = path;
//        System.out.println("endpoint:" + endpoint + "accessKeyId:" + accessKeyId
//                + "accessKeySecret:" + accessKeySecret + "bucketName:" + bucketName
//                + "picLocation:" + picLocation);

        if (null == file) {
            return null;
        }

        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        try {
            //容器不存在，就创建
            if (!ossClient.doesBucketExist(bucketName)) {
                ossClient.createBucket(bucketName);
                CreateBucketRequest createBucketRequest = new CreateBucketRequest(bucketName);
                createBucketRequest.setCannedACL(CannedAccessControlList.PublicRead);
                ossClient.createBucket(createBucketRequest);
            }
            //创建文件路径
            String fileName = userCcid+UUID.randomUUID().toString().replace("-", "") + "-" + file.getName();
            String fileUrl = picLocation + fileName;
            //上传文件
            PutObjectResult result = ossClient.putObject(new PutObjectRequest(bucketName, fileUrl, file));
            //设置权限 这里是公开读
            ossClient.setBucketAcl(bucketName, CannedAccessControlList.PublicRead);
            ossClient.shutdown();
            if (null != result) {
                logger.info("==========>OSS头像上传成功,文件名：" + fileName);
                return fileName;
            }
        } catch (OSSException oe) {
            logger.error(oe.getMessage());
        } catch (ClientException ce) {
            logger.error(ce.getMessage());
        } finally {
            //关闭
            ossClient.shutdown();
        }
        return null;
    }

    public String deleteFile(String filePath) {
        //建议在方法中创建OSSClient 而不是使用@Bean注入，不然容易出现Connection pool shut down
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        //删除目录中的文件，如果是最后一个文件fileoath目录会被删除。
        ossClient.deleteObject(bucketName,filePath);
        logger.info(ossPath + "/" + filePath);
        // 创建OSSClient实例。
        try {
        } finally {
            ossClient.shutdown();
        }
        return  "success";
    }

    public String getPicPath(String fileName){
        if(fileName!=null){
            String absolutePath = ossPath+fileName;
            return absolutePath;
        }else{
            return null;
        }

    }
}