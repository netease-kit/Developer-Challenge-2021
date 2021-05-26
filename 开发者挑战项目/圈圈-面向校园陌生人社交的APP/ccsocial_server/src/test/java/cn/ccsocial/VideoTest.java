package cn.ccsocial;


import junit.framework.TestCase;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)  //底层用junit  SpringJUnit4ClassRunner
@SpringBootTest(classes={CcsocialApplication.class})//启动整个springboot工程
public class VideoTest {


   

    @Before
    public void testOne(){

        System.out.println("这个是测试 before");
    }





    @Test
    public void testTwo1(){

        System.out.println("这个是测试 test1");

        TestCase.assertEquals(1,3);

    }



    @Test
    public void testTwo2(){

        System.out.println("这个是测试 test2");
    }


    @After
    public void testThree(){

        System.out.println("这个是测试 after");
    }





}
