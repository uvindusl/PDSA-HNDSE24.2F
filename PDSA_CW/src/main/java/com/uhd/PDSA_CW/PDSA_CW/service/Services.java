package com.uhd.PDSA_CW.PDSA_CW.service;

import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.opencsv.CSVReader;

import com.opencsv.exceptions.CsvValidationException;
import org.springframework.stereotype.Service;


@Service
public class Services {

    private LinkedList list1;
    private Queue queue;
     //private String csvFilePath = "C:\\Users\\USER\\Documents\\Campus Documents\\HNDSE\\PDSA\\CW\\PDSA-HNDSE24.2F\\PDSA_CW\\src\\main\\java\\com\\uhd\\PDSA_CW\\PDSA_CW\\Datasets\\realistic_recipes_final.csv";
    private String csvFilePath = "/home/uvindu/Documents/PDSA/CW/PDSA-HNDSE24.2F/PDSA_CW/src/main/java/com/uhd/PDSA_CW/PDSA_CW/Datasets/realistic_recipes_final.csv";
    // private String csvFilePath = "src/main/java/com/uhd/PDSA_CW/PDSA_CW/Datasets/realistic_recipes_final.csv";

    public Services() {
        this.list1 = new LinkedList();
        this.queue = new Queue();
        list1.insertByDate("beef sirloin", 10, toDate(2025, 9, 04));
        list1.insertByDate("onion", 93, toDate(2025, 9, 05));
        list1.insertByDate("sour cream", 5, toDate(2025, 9, 06));
//        list1.deleteMiddle(list1.head.nextNode);
        list1.displayValues();
        addItemToGroceryList("milk", 2);
        addItemToGroceryList("nice", 3);



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
                    expiringItems.add(current.getItemName());
                }
            }
            current = current.getNextNode();
        }
        return expiringItems;
    }

    public List<String> getItemsCloseToExpire() {
        return getCloseToExpireItems(list1);
    }

    public void addItemToGroceryList(String item, int qty) {
        GroceryItem groceryItem = new GroceryItem(item, qty);
        queue.enqueue(groceryItem);
    }

    public List<String> displayPantryList() {
        List<String> items = new ArrayList<>();
        Node node = list1.head;
        while(node!=null){
            items.add("Item: " + node.itemName + ", Quantity: " + node.itemQuantity + " ,Exp-Date:"+ node.itemExpDate);
            node = node.nextNode;
        }

        return items;
    }

    public List<String> displayGrocery() {
        List<String> items = new ArrayList<>();
        for(int i = queue.front+1;i<= queue.rear;i++){
            GroceryItem item = queue.x[i];
            items.add("Item: " + item.getName() + ", Quantity: " + Integer.toString(item.getQty()));
        }

        return items;
    }

    public List<String> displayOptimizedGrocery() {
        // Use LinkedHashMap to keep insertion order
        java.util.Map<String, Integer> aggregated = new java.util.LinkedHashMap<>();

        // Loop through queue
        for (int i = queue.front + 1; i <= queue.rear; i++) {
            GroceryItem item = queue.getElementAt(i);
            if (item == null) continue;

            // Normalize: ignore case + trim spaces
            String key = item.getName().trim().toLowerCase();

            // Add quantity (aggregate duplicates)
            aggregated.put(key, aggregated.getOrDefault(key, 0) + item.getQty());
        }

        // Convert back into display list
        List<String> items = new ArrayList<>();
        for (java.util.Map.Entry<String, Integer> entry : aggregated.entrySet()) {
            String displayName = toTitleCase(entry.getKey());
            items.add("Item: " + displayName + ", Quantity: " + entry.getValue());
        }

        return items;
    }

    // helper to make names look nicer: "apple juice" -> "Apple Juice"
    private String toTitleCase(String s) {
        if (s == null || s.isEmpty()) return s;
        String[] parts = s.split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (String part : parts) {
            if (part.isEmpty()) continue;
            sb.append(Character.toUpperCase(part.charAt(0)));
            if (part.length() > 1) sb.append(part.substring(1).toLowerCase());
            sb.append(' ');
        }
        return sb.toString().trim();
    }


    public String removeExpiredItems(LinkedList list) {

        Node current = list.head;
        Date today = new Date();


        while (current != null) {
            if (current.getItemExpDate().before(today)) {
                list1.deleteBeg();
                System.out.println("After deleting");

                String itemName = current.getItemName();

                return itemName + "   deleted";

            }else{
                System.out.println("no data deleted");
            }
            current = current.getNextNode();
            return null;



        }
        return null;
    }
    public String removeExpiredItemsHandler() {
        return removeExpiredItems(list1);
    }


    public Node insertByDate(Node node) {
        list1.insertByDate(node.getItemName(), node.getItemQuantity(), node.getItemExpDate());
        return node;
    }

    public Node deleteMiddle(Node recivedNode){
        list1.deleteMiddle(recivedNode);
        return recivedNode;
    }

    public List<ReciepeCard> matchItemsWithReciepe(List<String> closeToExpireEngridients){

        System.out.println(closeToExpireEngridients);
        List<ReciepeCard> matchedDishes = new ArrayList<>();
        try(CSVReader reader = new CSVReader(new FileReader(csvFilePath))){
            String[] line;
            boolean firstRow = true;
            while((line = reader.readNext()) != null){
                if(firstRow){
                    firstRow = false;
                    continue;
                }

                String dishName = line[0];
                String ingredients = line[1].toLowerCase();
                String timeWillTake = line[2];
                String difficultyLevel = line[3];

                String[] ingredientsArray = ingredients.split(",");

                // Convert array to List<String>
                List<String> ingredientsList = new ArrayList<>(Arrays.asList(ingredientsArray));

                //remove leading/trailing spaces from each ingredient
                for (int i = 0; i < ingredientsList.size(); i++) {
                    ingredientsList.set(i, ingredientsList.get(i).trim());
                }



                boolean allmatch = closeToExpireEngridients.stream()
                        .allMatch(ingredients::contains);

                if(allmatch){
                    List<String> pantryList = pantryList();
                    List<String> difference = new ArrayList<>(ingredientsList); // copy list2
                    difference.removeAll(pantryList);


                    matchedDishes.add(new ReciepeCard(dishName, difficultyLevel, ingredients, timeWillTake, difference));

                }

            }
        }catch (IOException | CsvValidationException e){
            e.printStackTrace();
        }
        if (matchedDishes.isEmpty()){
            System.out.println("No dishes");
        }else{
            System.out.println("Mtching dishes");
            return matchedDishes;
        }


        return null;
    }
    public List<ReciepeCard> matchDishesHandler(){
        return matchItemsWithReciepe(getItemsCloseToExpire());
    }

    public List<String> pantryList() {
        List<String> items = new ArrayList<>();
        Node node = list1.head;
        while(node!=null){
            items.add(node.itemName);
            node = node.nextNode;
        }

        return items;
    }



    public List<String> displayExpiredItems() {
        List<String> expiredItems = new ArrayList<>();
        Node current = list1.head;
        Date today = new Date();

        while (current != null) {
            if (current.getItemExpDate().before(today)) {
                // Add to result
                expiredItems.add("Expired Item: " + current.getItemName() +
                        ", Quantity: " + current.getItemQuantity() +
                        " , Exp-Date: " + current.getItemExpDate());

                // Also log into queue for record
                queue.enqueue(new GroceryItem(current.getItemName(), current.getItemQuantity()));
            }
            current = current.getNextNode();
        }

        return expiredItems;
    }

    public void reduceQuantity(String itemName){
        Node current = list1.findByName(itemName);
        current.itemQuantity = current.itemQuantity - 1;
    }

    public void removeFromGrocerryList(){
        queue.dequeue();
    }

    public void deleteByName(String name){
        list1.deleteByName(name);
    }
}