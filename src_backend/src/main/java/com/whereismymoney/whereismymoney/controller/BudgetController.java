package com.whereismymoney.whereismymoney.controller;

import com.whereismymoney.whereismymoney.model.Budget;
import com.whereismymoney.whereismymoney.repository.BudgetRepository;
import com.whereismymoney.whereismymoney.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/")
public class BudgetController {

    @Autowired
    BudgetService budgetService;

    @RequestMapping(value = "budgets", method= RequestMethod.GET)
    public List<Budget> getAll() {
        return new ArrayList<Budget>(){};
    }

    @RequestMapping(value = "budgets/{id}", method= RequestMethod.GET)
    public Budget get(@PathVariable Long id) {
        return new Budget();
    }

    @RequestMapping(value = "budgets/", method= RequestMethod.POST)
    public String create(@RequestBody Budget budget) {
        budgetService.saveBudget(budget);
        return "Budget created successfully!";
    }

    @RequestMapping(value = "budgets/{id}", method= RequestMethod.PUT)
    public Budget update(@PathVariable Long id) {
        return new Budget();
    }

    @RequestMapping(value = "budgets/{id}", method= RequestMethod.DELETE)
    public Budget delete(@PathVariable Long id) {
        return new Budget();
    }
}
