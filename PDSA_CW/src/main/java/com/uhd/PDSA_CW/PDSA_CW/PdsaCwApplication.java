package com.uhd.PDSA_CW.PDSA_CW;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;


@SpringBootApplication
public class PdsaCwApplication {

	public static Date toDate(int year, int month, int day) {
		return Date.from(LocalDate.of(year, month, day)
				.atStartOfDay(ZoneId.systemDefault()).toInstant());
	}

	public static void main(String[] args) {
		SpringApplication.run(PdsaCwApplication.class, args);
		LinkedList list1 = new LinkedList();
//		list1.insertBeg(10);
//		list1.insertBeg(20);
//		list1.insertBeg(30);
//		list1.insertEnd("Milk", 12, toDate(2034, 4, 4));
//        list1.insertEnd("Gaslabu",23,toDate(2067, 8, 9));
//        list1.insertEnd("apple",45,toDate(2034, 4, 4));
		list1.insertByDate("Milk", 10, toDate(2090, 4, 4));
		list1.insertByDate("orange",93,toDate(2070, 8, 9));
		list1.insertByDate("apple",5,toDate(2000, 4, 1));
//        list1.insertMiddle(list1.head,100);
//        list1.insertMiddle(list1.head.nextNode,100);
//        list1.displayValues();
//        list1.deleteEnd();
//		list1.deleteMiddle(list1.head.nextNode);
		list1.displayValues();

	}

}
