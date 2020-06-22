package jee.sanda.forum.test.usertest;

import jee.sanda.forum.boot.TechnicalForumApplication;
import jee.sanda.forum.entity.ApplyInfo;
import jee.sanda.forum.service.ApplyInfoService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest(classes = TechnicalForumApplication.class)
@Slf4j
@RunWith(SpringRunner.class)
public class ApplyInfoTest {
    @Autowired
    private ApplyInfoService applyInfoService;

    /**
     * 测试显示申请
     */
    @Test
    public void testShowApplyInfo(){
        Page<ApplyInfo>applyInfos=applyInfoService.showApplyInfo(1,3);
        System.out.println(applyInfos);
    }

}
