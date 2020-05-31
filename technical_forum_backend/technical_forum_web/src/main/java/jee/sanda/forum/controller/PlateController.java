package jee.sanda.forum.controller;

import jee.sanda.forum.entity.Plate;
import jee.sanda.forum.service.PlateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/plate")
public class PlateController {

    @Autowired
    private PlateService plateService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Plate>> findAll(){
        return ResponseEntity.ok(plateService.findAll());
    }
}
