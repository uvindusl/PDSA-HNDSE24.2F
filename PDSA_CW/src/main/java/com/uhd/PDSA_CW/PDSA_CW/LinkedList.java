package com.uhd.PDSA_CW.PDSA_CW;

import java.util.Date;

public class LinkedList {
    Node head;

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
}
