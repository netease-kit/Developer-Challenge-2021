package cn.ccsocial;


import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import cn.ccsocial.controller.UserController;

@RunWith(SpringRunner.class)  //底层用junit  SpringJUnit4ClassRunner
@SpringBootTest(classes={CcsocialApplication.class})//启动整个springboot工程
public class UserTest {

    @Autowired
    private UserController userController;
//    @Test
//    public void loginTest(){
//
//        User user = new User();
//        user.setUser_phone("jack");
//        user.setUser_password("1234");
//
//        JsonData jsonData  = loginController.login(user);
//
//        System.out.println(jsonData.toString());
//
//        TestCase.assertEquals(0,jsonData.getCode());
//
//    }
}
