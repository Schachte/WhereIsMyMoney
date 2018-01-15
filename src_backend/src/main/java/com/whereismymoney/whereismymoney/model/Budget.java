package com.whereismymoney.whereismymoney.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String budgetName;
    Double budgetCost;
    int budgetDate;

    public Budget() {}

    public Budget(Long id, String budgetName, Double budgetCost, int budgetDate, Date nextNotification) {
        this.id = id;
        this.budgetName = budgetName;
        this.budgetCost = budgetCost;
        this.budgetDate = budgetDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBudgetName() {
        return budgetName;
    }

    public void setBudgetName(String budgetName) {
        this.budgetName = budgetName;
    }

    public Double getBudgetCost() {
        return budgetCost;
    }

    public void setBudgetCost(Double budgetCost) {
        this.budgetCost = budgetCost;
    }

    public int getBudgetDate() {
        return budgetDate;
    }

    public void setBudgetDate(int budgetDate) {
        this.budgetDate = budgetDate;
    }
}
