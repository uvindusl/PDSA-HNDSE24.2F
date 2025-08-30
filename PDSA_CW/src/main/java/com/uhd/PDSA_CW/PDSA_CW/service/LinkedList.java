package com.uhd.PDSA_CW.PDSA_CW.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class LinkedList {
    Node head;


    public Node getHead() {
        return head;
    }

    public void insertByDate(String name, int quantity, Date expDate) {
        Node node = new Node(name, quantity, expDate);

        // Case 1: Empty list or new node expires before head
        if (head == null || head.itemExpDate.compareTo(expDate) > 0) {
            node.nextNode = head;
            head = node;
            return;
        }

        // Case 2: Traverse to find correct position
        Node currentNode = head;
        while (currentNode.nextNode != null && currentNode.nextNode.itemExpDate.compareTo(expDate) <= 0) {
            currentNode = currentNode.nextNode;
        }

        node.nextNode = currentNode.nextNode;
        currentNode.nextNode = node;
    }



    public void insertBeg(String name, int quantity, Date expDate){
        if(head==null){
            head = new Node(name,quantity,expDate);
        }else{
            Node node = new Node(name,quantity,expDate);
            node.nextNode = head;
            head = node;
        }
    }

    public void insertEnd(String name,int quantity, Date expDate){
        if(head==null){
            head = new Node(name,quantity,expDate);
        }else{
            Node node = new Node(name,quantity,expDate);
            Node currentNode = head;
            while (currentNode.nextNode!=null){
                currentNode = currentNode.nextNode;
            }
            currentNode.nextNode = node;
        }
    }

    public void displayValues(){
        Node node = head;
        while(node!=null){
            System.out.println("Item: " + node.itemName + ", Quantity: " + node.itemQuantity + " ,Exp-Date:"+ node.itemExpDate);
            node = node.nextNode;
        }
    }

    public void deleteBeg(){
        head = head.nextNode;
    }

    public void deleteEnd(){
        Node currentNode = head;
        while (currentNode.nextNode.nextNode!=null){
            currentNode = currentNode.nextNode;
        }
        currentNode.nextNode= null;
    }

    public  void insertMiddle(Node recivedNode,String name,int quantity,Date expDate){
        Node node = new Node(name,quantity,expDate);
        node.nextNode = recivedNode.nextNode;
        recivedNode.nextNode = node;
    }

    public void deleteMiddle(Node recivedNode){
        recivedNode.nextNode = recivedNode.nextNode.nextNode;
        // this will delete the next value
    }

    public List<String> getCloseToExpireItems() {
        List<String> expiringItems = new ArrayList<>();
        Node current = this.getHead();
        Date today = new Date();

        while (current != null) {
            if (current.getItemExpDate().after(today)) {
                long milliseconds = current.getItemExpDate().getTime() - today.getTime();
                long daysToExpiry = TimeUnit.DAYS.convert(milliseconds, TimeUnit.MILLISECONDS);

                if (daysToExpiry <= 10) {
                    expiringItems.add(current.getItemName() + " is expiring in " + daysToExpiry + 1 + " days.");
                }
            }
            current = current.getNextNode();
        }
        return expiringItems;
    }
}
