package jee.sanda.forum.service;

public interface MailService {

    /***
     * 注册时发送邮箱验证码
     * @param email
     * @return
     */
    String sendSimpleMail(String email,String info);

    /***
     * 验证码校验
     * @param uuidCode
     * @param Code
     * @return
     */
    boolean validateCode(String uuidCode, String Code);
}
