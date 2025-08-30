package com.uhd.PDSA_CW.PDSA_CW.service;

public class Queue {

    // Attributes
    String[] x;
    int front;
    int rear;

    // Constructor
    public Queue () {
        x = new String[100];
        front = -1;
        rear = -1;
    }

    public void enqueue(String data) {
        if(isFull()){
            System.out.println("Queue is Full.");
        }else {
            x[++rear] = data;
        }
    }

    public String dequeue() {
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

    public String peek() {
        return x[front+1];
    }

    public void display() {
        for(int i = front+1;i<= rear;i++){
            System.out.println(x[i]);
        }
    }

    public String getElementAt(int index) {
        return x[index];
    }

}
