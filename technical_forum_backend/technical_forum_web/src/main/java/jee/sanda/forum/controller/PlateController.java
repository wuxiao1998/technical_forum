package jee.sanda.forum.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jee.sanda.forum.entity.Plate;
import jee.sanda.forum.service.PlateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/***
 * 板块接口
 */
@RestController
@RequestMapping("/plate")
@Api(value="板块controller",tags={"板块服务接口"})
public class PlateController {

    @Autowired
    private PlateService plateService;

    /***
     * 查询所有板块信息
     * @return
     */
    @ApiOperation("查询所有板块")
    @GetMapping("/findAll")
    public ResponseEntity<List<Plate>> findAll() {
        return ResponseEntity.ok(plateService.findAll());
    }
}
