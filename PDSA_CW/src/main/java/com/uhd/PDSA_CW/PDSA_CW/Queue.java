package com.uhd.PDSA_CW.PDSA_CW;

public class Queue {

    // Attributes
    private int[] x;
    private int front;
    private int rear;

    // Constructor
    public Queue () {
        x = new int[20];
        front = -1;
        rear = -1;
    }

    public void enqueue(int data) {
        if(isFull()){
            System.out.println("Queue is Full.");
        }else {
            x[++rear] = data;
        }
    }

    public int dequeue() {
        if(isEmpty()){
            System.out.println("Queue is Empty");
            return 0;
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

    public int peek() {
        return x[front+1];
    }

    public void display() {
        for(int i = front+1;i<= rear;i++){
            System.out.println(x[i]);
        }
    }

    public int getElementAt(int index) {
        return x[index];
    }

}
