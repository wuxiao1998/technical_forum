package jee.sanda.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    HttpServletRequest request;
    //文件上传测试接口
    @PostMapping("/upload")
    public String testUpload(MultipartFile file) throws IOException {

        File upload = new File(ResourceUtils.getURL("classpath:").getPath()+"/upload/");
        if(!upload.exists()){
            upload.mkdirs();
        }
        file.transferTo(new File(upload,file.getOriginalFilename()));
        return "success";
    }
}
