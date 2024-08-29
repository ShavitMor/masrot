import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Expense {
  description: string;
  amount: number;
  date: string;
}

interface Salary {
  source: string;
  amount: number;
  date: string;
}

const ExpenseEntryPage = () => {
  const { date } = useParams<{ date: string }>();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState<number | ''>('');
  const [salarySource, setSalarySource] = useState('');
  const [salaryAmount, setSalaryAmount] = useState<number | ''>('');

  useEffect(() => {
    if (date) {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/expenses?date=${date}`);
        const allExpenses = await response.json();
        setExpenses(allExpenses);

        const salariesResponse = await fetch(`http://localhost:5000/salaries?date=${date}`);
        const allSalaries = await salariesResponse.json();
        setSalaries(allSalaries);
      };

      fetchData();
    }
  }, [date]);

  const addExpense = async () => {
    if (expenseDescription && expenseAmount) {
      const newExpense = { description: expenseDescription, amount: Number(expenseAmount), date: date! };

      await fetch('http://localhost:5000/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense),
      });

      setExpenses((prev) => [...prev, newExpense]);
      setExpenseDescription('');
      setExpenseAmount('');
    }
  };

  const addSalary = async () => {
    if (salarySource && salaryAmount) {
      const newSalary = { source: salarySource, amount: Number(salaryAmount), date: date! };

      await fetch('http://localhost:5000/salaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSalary),
      });

      setSalaries((prev) => [...prev, newSalary]);
      setSalarySource('');
      setSalaryAmount('');
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalSalaries = salaries.reduce((sum, salary) => sum + salary.amount, 0);

  return (
    <div className="expense-entry-page">
      <h2>Expenses for {date}</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Item description"
          value={expenseDescription}
          onChange={(e) => setExpenseDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value === '' ? '' : Number(e.target.value))}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>{expense.description}: ${expense.amount}</li>
        ))}
      </ul>
      <h2>Total Expenses: ${totalExpenses}</h2>

      <h2>Salary for {date}</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Salary source"
          value={salarySource}
          onChange={(e) => setSalarySource(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={salaryAmount}
          onChange={(e) => setSalaryAmount(e.target.value === '' ? '' : Number(e.target.value))}
        />
        <button onClick={addSalary}>Add Salary</button>
      </div>
      <ul>
        {salaries.map((salary, index) => (
          <li key={index}>{salary.source}: ${salary.amount}</li>
        ))}
      </ul>
      <h2>Total Salary: ${totalSalaries}</h2>

      <button onClick={() => window.history.back()}>Back to Calendar</button>
    </div>
  );
};

export default ExpenseEntryPage;
