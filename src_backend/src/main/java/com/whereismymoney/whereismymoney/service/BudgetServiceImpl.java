package com.whereismymoney.whereismymoney.service;

import com.whereismymoney.whereismymoney.model.Budget;
import com.whereismymoney.whereismymoney.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetServiceImpl implements BudgetService{

    @Autowired
    private BudgetRepository budgetRepository;

    public BudgetServiceImpl(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    @Override
    public List<Budget> getAllBudgets() {
        return null;
    }

    @Override
    public Budget getBudgetById(Long id) {
        return null;
    }

    @Override
    public String saveBudget(Budget budget) {
        budgetRepository.save(budget);
        return "Saved successfully!";
    }

    @Override
    public Budget updateBudget(Long id) {
        return null;
    }

    @Override
    public Budget deleteById(Long id) {
        return null;
    }
}
