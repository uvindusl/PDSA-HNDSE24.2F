package com.uhd.PDSA_CW.PDSA_CW.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class Services {

    private LinkedList list1;

    public Services() {
        this.list1 = new LinkedList();
        list1.insertByDate("Milk", 10, toDate(2090, 4, 4));
        list1.insertByDate("Gaslabu", 93, toDate(2070, 8, 9));
        list1.insertByDate("apple", 5, toDate(2025, 8, 30));
        list1.displayValues();
    }

    public static Date toDate(int year, int month, int day) {
        return Date.from(LocalDate.of(year, month, day)
                .atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

//    public List<String> getItemsCloseToExpire(){
//        return list1.getCloseToExpireItems();
//    }
}