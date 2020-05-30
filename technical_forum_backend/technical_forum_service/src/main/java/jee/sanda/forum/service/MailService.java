package jee.sanda.forum.service;

public interface  MailService {

    /***
     * 发送邮箱验证码
     * @param email
     * @return
     */
    String sendSimpleMail(String email);


    /***
     * 邮箱验证码校验,校验成功就修改校验值
     */
    boolean validateCode(String sessionCode,String Code);
}
