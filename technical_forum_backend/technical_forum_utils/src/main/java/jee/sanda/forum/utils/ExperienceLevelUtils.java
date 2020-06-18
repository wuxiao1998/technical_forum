package jee.sanda.forum.utils;

public class ExperienceLevelUtils {
    /**
     * 根据经验值返回等级
     * @param experience
     * @return
     */
    public static Integer judgeLevel(Integer experience){
        if(experience>=0&&experience<10){
            return 1;
        }
        else if(experience>=10&&experience<40){
            return 2;
        }
        else if (experience>=40&&experience<90){
            return 3;
        }
        else if (experience>=90&&experience<160){
            return 4;
        }
        else if (experience>=160&&experience<250){
            return 5;
        }
        else if (experience>=250&&experience<360){
            return 6;
        }
        else if (experience>=360&&experience<490){
            return 7;
        }
        else if (experience>=490&&experience<640){
            return 8;
        }
        else if (experience>=640&&experience<810){
            return 9;
        }
        else
        {
            return 10;
        }
    }

    /**
     * 根据等级返回称号
     * @param level
     * @return
     */
    public static String judgeDesignation(Integer level){
        if(level==1){
            return "萌新上路";
        }
        else if(level==2){
            return "见习写手";
        }
        else if(level==3){
            return "正式写手";
        }
        else if(level==4){
            return "专业写手";
        }
        else if(level==5){
            return "黄金版主";
        }
        else if(level==6){
            return "白金版主";
        }
        else if(level==7){
            return "荣誉版主";
        }
        else if(level==8){
            return "论坛精英";
        }
        else if(level==9){
            return "论坛支柱";
        }
        else{
            return "论坛元老";
        }
    }
}
