package com.uhd.PDSA_CW.PDSA_CW;

public class LinkedList {
    Node head;

    public void insertBeg(int data){
        if(head==null){
            head = new Node(data);
        }else{
            Node node = new Node(data);
            node.nextNode = head;
            head = node;
        }
    }

    public void insertEnd(int data){
        if(head==null){
            head = new Node(data);
        }else{
            Node node = new Node(data);
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
            System.out.println("Data " + node.data);
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

    public  void insertMiddle(Node recivedNode,int value){
        Node node = new Node(value);
        node.nextNode = recivedNode.nextNode;
        recivedNode.nextNode = node;
    }

    public void deleteMiddle(Node recivedNode){
        recivedNode.nextNode = recivedNode.nextNode.nextNode;
        // this will delete the next value
    }
}
