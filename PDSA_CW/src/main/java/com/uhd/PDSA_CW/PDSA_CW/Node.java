package com.uhd.PDSA_CW.PDSA_CW;

import java.util.Date;

public class Node {
    String itemName;
    int itemquantity;
    Date itemExpDate;
    Node nextNode;

    public Node(String name, int quantity, Date expDate){
        itemName = name;
        itemquantity = quantity;
        itemExpDate = expDate;
        nextNode = null;
    }
}
