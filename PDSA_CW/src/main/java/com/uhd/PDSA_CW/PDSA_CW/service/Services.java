package com.uhd.PDSA_CW.PDSA_CW.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

@Service
public class Services {

    private LinkedList list1;
    private Queue queue;

    public Services() {
        this.list1 = new LinkedList();
        this.queue = new Queue();
        list1.insertByDate("Milk", 10, toDate(2090, 4, 4));
        list1.insertByDate("Gaslabu", 93, toDate(2070, 8, 9));
        list1.insertByDate("apple", 5, toDate(2025, 8, 31));
        list1.displayValues();
        addItemToGroceryList("milk");
        addItemToGroceryList("nice");
        queue.display();
    }

    public static Date toDate(int year, int month, int day) {
        return Date.from(LocalDate.of(year, month, day)
                .atStartOfDay(ZoneId.systemDefault()).toInstant());
    }
  
    public List<String> getCloseToExpireItems(LinkedList list) {
        List<String> expiringItems = new ArrayList<>();
        Node current = list.head;
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

    public List<String> getItemsCloseToExpire() {
        return getCloseToExpireItems(list1);
    }

    public void addItemToGroceryList(String item) {
        queue.enqueue(item);
    }

    public List<String> displayGrocery() {
        List<String> items = new ArrayList<>();
        for(int i = queue.front+1;i<= queue.rear;i++){
            items.add(queue.x[i]);
        }

        return items;
    }

    public Node insertByDate(Node node) {
        list1.insertByDate(node.getItemName(), node.getItemQuantity(), node.getItemExpDate());
        return node;
    }

}