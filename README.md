
# Zero-Waste Kitchen Assistant

People often forget expiry dates of food items they purchased and, in the meantime, purchasing unnecessary items, leading food waste to be a significant issue in householdings. Hence Zero-waste kitchen assistant is introduced for tracking pantry items’ expiry dates, not only to reduce food waste but also save money and improve household efficiency.


##  Functional Requirements 

### Input Requirements 

1.	Pantry items (name, quantity, expiry date). 
2.	Grocery item details: (name, quantity).
3.	Recipe database with ingredients. 

### Process Requirements 

1.	Items can be added to the linked list. (Sorted according to their expiry data.)
2.	Items can be removed from linked list.
3.	Check the items close to the expiration date.
4.	Remove expired items from linked list and enqueue to grocery list.
5.	Match pantry items with recipes and suggest suitable recipes. Display missing items and available items for the suggested recipes.
6.	Items can be added to the grocery queue in FIFO order.
7.	Item can be removed from grocery list after bought as FIFO order.
8.	If any ingredient is missing from a suggested recipe, it can be added to the grocery. 
9.	remove duplicates and create optimized grocery lists.
10.	reduce item quantity when an item is used from the pantry list.

### Output Requirements 

1.	Pantry list displayed in expiry order
2.	Expired items listed and moved to grocery list
3.	Display items that expire within ten 10 days. 
4.	Recipe Suggestions
5.	Grocery list displayed in FIFO order
6.	Optimized grocery list without duplicates
7.	Give reminders for upcoming expiry items.

## Data Structure Used and Justification

•	Linked List → Stores pantry items sorted by expiry date. Supports efficient insert, delete, and traversal.

•	Queue (FIFO) → Manages grocery items. Expired items and recipe-suggested items are enqueued here.

•	Array (inside queue) → Used for internal queue implementation with front and rear pointers.

#### Algorithms:
    
•	Sorted Insertion (Linked List) → Keeps pantry always in expiry order.

•	Date Comparison → Identifies expired/near-expiry items.

•	FIFO Operations (Queue) → Manages grocery add/remove in purchase order.

•	Duplicate Removal / Aggregation → Optimizes grocery list using hashing (Linked HashMap).

•	Recipe Matching → Suggests recipes using pantry items, and missing ingredients are pushed to grocery queue.
