package com.uhd.PDSA_CW.PDSA_CW.controller;

import java.util.List;

import com.uhd.PDSA_CW.PDSA_CW.service.GroceryItem;
import com.uhd.PDSA_CW.PDSA_CW.service.Node;
import com.uhd.PDSA_CW.PDSA_CW.service.ReciepeCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return services.displayOptimizedGrocery();
    }


    @DeleteMapping("/removeexpireditems")
    public String removeExpiredItems(){return services.removeExpiredItemsHandler();}

    @GetMapping("/pantrylists")
    public List<String> displayPantryList() {
        return services.displayPantryList();
    }

    @PostMapping("/insertlists")
    public Node insertByDate(@RequestBody Node node) {return  services.insertByDate(node);}

    //@DeleteMapping("/deletelistsmid")
    //public Node deleteMiddle(@PathVariable Node recivedNode) {return services.deleteMiddle(recivedNode);}


    @GetMapping("/recipes")
    public List<ReciepeCard> matchDishes(){return services.matchDishesHandler();}

  
    @PostMapping("/addgrocery")
    public ResponseEntity<String> addGroceryItem(@RequestBody GroceryItem groceryItem) {
        services.addItemToGroceryList(groceryItem.getName(), groceryItem.getQty());
        return ResponseEntity.ok("Added grocery item: " + groceryItem.getName()
                + " (Qty: " + groceryItem.getQty() + ")");
    }

    @GetMapping("/expireditems")
    public List<String> displayExpiredItems() {
        return services.displayExpiredItems();
    }

    @PutMapping("/reducequantity")
    public void reduceQuantity(@RequestParam String itemName){
        services.reduceQuantity(itemName);
    }

    @DeleteMapping("/removegrocerry")
    public void removeFromGrocerryList(){
        services.removeFromGrocerryList();
    }

    @DeleteMapping("/delspeci/{name}")
    public void deleteByName(@PathVariable String name){services.deleteByName(name);}
}
