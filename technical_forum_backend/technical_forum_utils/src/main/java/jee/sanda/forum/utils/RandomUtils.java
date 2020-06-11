package jee.sanda.forum.utils;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/***
 * 生成随机验证码
 */
public class RandomUtils {
    public static String getCode() {
        String[] beforeShuffle = new String[]{
                "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                "a", "b", "d", "c", "e", "f", "g", "h", "i", "j",
                "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
                "u", "v", "w", "x", "y", "z"};
        List list = Arrays.asList(beforeShuffle);
        Collections.shuffle(list);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < list.size(); i++) {
            sb.append(list.get(i));
        }
        String afterShuffle = sb.toString();
        String result = afterShuffle.substring(3, 9);
        return result;
    }
}

