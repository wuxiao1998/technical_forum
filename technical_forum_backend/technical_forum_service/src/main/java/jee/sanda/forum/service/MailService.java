package jee.sanda.forum.service;

public interface MailService {

    /***
     * 注册时发送邮箱验证码
     * @param email
     * @return
     */
    String sendSimpleMail(String email,String info);

    /**
     * 重置新密码时向邮箱发送验证码
     * @param email
     * @return
     */
    String sendVerificationCode(String email);
    /***
     * 验证码校验
     * @param uuidCode
     * @param Code
     * @return
     */
    boolean validateCode(String uuidCode, String Code);
}
