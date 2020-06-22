package jee.sanda.forum.service;


import jee.sanda.forum.entity.UserPlate;

import java.util.List;

public interface UserPlateService {

    /**
     * 查找用户所对应的版主权限
     * @param userId
     * @return
     */
    List<UserPlate> findByUserId(Long userId);
}
