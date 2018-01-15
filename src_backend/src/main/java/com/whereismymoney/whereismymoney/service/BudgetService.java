package com.whereismymoney.whereismymoney.service;

import com.whereismymoney.whereismymoney.model.Budget;

import java.util.List;

public interface BudgetService {

    // Get a list of all budgets that are stored
    List<Budget> getAllBudgets();

    // Get a particular budget by its associated ID
    Budget getBudgetById(Long id);

    // Save a new budget from the API
    String saveBudget(Budget budget);

    // Update a particular budget giving its ID
    Budget updateBudget(Long id);

    // Remove a budget from the database
    Budget deleteById(Long id);
}
