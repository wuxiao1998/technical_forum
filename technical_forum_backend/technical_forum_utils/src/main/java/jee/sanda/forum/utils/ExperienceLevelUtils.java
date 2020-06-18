package jee.sanda.forum.utils;

public class ExperienceLevelUtils {
    public static Integer judgeLevel(Integer experience){
        if(experience>=0&&experience<10){
            return 0;
        }
        else if(experience>=10&&experience<40){
            return 1;
        }
        else if (experience>=40&&experience<90){
            return 2;
        }
        else if (experience>=90&&experience<160){
            return 3;
        }
        else if (experience>=160&&experience<250){
            return 4;
        }
        else if (experience>=250&&experience<360){
            return 5;
        }
        else if (experience>=360&&experience<490){
            return 6;
        }
        else if (experience>=490&&experience<640){
            return 7;
        }
        else if (experience>=640&&experience<810){
            return 8;
        }
        else if (experience>=810&&experience<1000){
            return 9;
        }
        else{
            return 10;
        }
    }
}
