package jee.sanda.forum.service;

public interface  MailService {

    /***
     * 发送邮箱验证码
     * @param email
     * @return
     */
    String sendSimpleMail(String email);


    /***
     * 验证码校验
     * @param sessionCode
     * @param Code
     * @return
     */
    boolean validateCode(String sessionCode,String Code);
}
