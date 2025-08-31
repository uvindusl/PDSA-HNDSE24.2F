package com.uhd.PDSA_CW.PDSA_CW.controller;

import java.util.List;

import com.uhd.PDSA_CW.PDSA_CW.service.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.uhd.PDSA_CW.PDSA_CW.service.Services;


@CrossOrigin(origins = "http://localhost:5173/")
@RestController
public class controller {

    @Autowired
    private Services services;

    @GetMapping("/expiringitems")
    public List<String> getItemsCloseToExpire() {
        return services.getItemsCloseToExpire();
    }

    @GetMapping("/grocerylists")
    public List<String> displayGroceryList(){
        return services.displayGrocery();
    }


    @DeleteMapping("/removeexpireditems")
    public String removeExpiredItems(){return services.removeExpiredItemsHandler();}

    @GetMapping("/pantrylists")
    public List<String> displayPantryList() {
        return services.displayPantryList();
    }

    @PostMapping("/insertlists")
    public Node insertByDate(@RequestBody Node node) {return  services.insertByDate(node);}


}
