package com.uhd.PDSA_CW.PDSA_CW.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uhd.PDSA_CW.PDSA_CW.service.Services;

@RestController
public class controller {

    @Autowired
    private Services services;

//    @GetMapping("/expiringitems")
//    public List<String> getItemsCloseToExpire() {
//        return services.getItemsCloseToExpire();
//    }
    
}
