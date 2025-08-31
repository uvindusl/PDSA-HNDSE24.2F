package com.uhd.PDSA_CW.PDSA_CW.service;

import java.util.Date;

public class Node {
    String itemName;
    int itemQuantity;
    Date itemExpDate;
    Node nextNode;

    public Node(String name, int quantity, Date expDate){
        itemName = name;
        itemQuantity = quantity;
        itemExpDate = expDate;
        nextNode = null;
    }

    public String getItemName() {
        return itemName;
    }
    public Date getItemExpDate() {
        return itemExpDate;
    }
    public int getItemQuantity(){
        return itemQuantity;
    }
    public Node getNextNode() {
        return nextNode;
    }
}
