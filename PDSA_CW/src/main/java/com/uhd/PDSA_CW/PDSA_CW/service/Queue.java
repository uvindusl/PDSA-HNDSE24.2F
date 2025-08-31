package com.uhd.PDSA_CW.PDSA_CW.service;

public class Queue {

    // Attributes
    GroceryItem[] x;
    int front;
    int rear;

    // Constructor
    public Queue () {
        x = new GroceryItem[100];
        front = -1;
        rear = -1;
    }

    public void enqueue(GroceryItem data) {
        if(isFull()){
            System.out.println("Queue is Full.");
        }else {
            x[++rear] = data;
        }
    }

    public GroceryItem dequeue() {
        if(isEmpty()){
            return null;
        }else {
            return x[++front];
        }
    }

    public boolean isEmpty() {
        return front == rear;
    }

    public boolean isFull() {
        return rear == x.length - 1;
    }

    public GroceryItem peek() {
        return x[front+1];
    }

    public void display() {
        for(int i = front+1;i<= rear;i++){
            System.out.println(x[i]);
        }
    }

    public GroceryItem getElementAt(int index) {
        return x[index];
    }

}
