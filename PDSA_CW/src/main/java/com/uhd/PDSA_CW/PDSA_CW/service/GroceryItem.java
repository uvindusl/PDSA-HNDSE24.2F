package com.uhd.PDSA_CW.PDSA_CW.service;

public class GroceryItem {
    private String name;
    private int qty;

    public GroceryItem(String name, int qty){
        this.name = name;
        this.qty = qty;
    }

    public String getName() {
        return name;
    }

    public int getQty() {
        return qty;
    }

    @Override
    public String toString() {
        return "Item" + name + ", Quantity: " + Integer.toString(qty);
    }

}
