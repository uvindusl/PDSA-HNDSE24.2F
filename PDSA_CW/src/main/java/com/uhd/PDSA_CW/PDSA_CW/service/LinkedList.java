package com.uhd.PDSA_CW.PDSA_CW.service;

import java.util.Date;

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
        // Case 1: Empty list or null node
        if(head == null || recivedNode == null)
            return;

        // Case 2: head itself is the node to delete
        if(head == recivedNode){
            head = head.nextNode;
            return;
        }

        // Case 3: Traverse to find the previous node
        Node currentNode = head;
        while (currentNode.nextNode != null && currentNode.nextNode != recivedNode){
            currentNode = currentNode.nextNode;
        }

        // If found, bypass the recivedNode
        if(currentNode.nextNode == recivedNode){
            currentNode.nextNode = recivedNode.nextNode;
        }



    }
    public Node findByName(String name) {
        Node currentNode = head;

        while (currentNode != null) {
            if (currentNode.itemName.equalsIgnoreCase(name)) { // case-insensitive match
                return currentNode;
            }
            currentNode = currentNode.nextNode;
        }

        return null; // not found
    }

    public void deleteByName(String name) {
        if (head == null) return;

        // Case 1: head itself is the node to delete
        if (head.itemName.equalsIgnoreCase(name)) {
            head = head.nextNode;
            return;
        }

        // Case 2: traverse list to find the node
        Node currentNode = head;
        while (currentNode.nextNode != null &&
                !currentNode.nextNode.itemName.equalsIgnoreCase(name)) {
            currentNode = currentNode.nextNode;
        }

        // If found, unlink it
        if (currentNode.nextNode != null) {
            currentNode.nextNode = currentNode.nextNode.nextNode;
        }
    }

}
