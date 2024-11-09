import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ExpenseEntryPage.css'; // Ensure this file is properly linked

interface Expense {
  _id: string;  // Assuming MongoDB's default ObjectId
  description: string;
  amount: number;  // Quantity of the item
  price: number;   // Price per unit of the item
  cost: number;    // Calculated cost = amount * price
  date: string;
}

interface Salary {
  _id: string;  // Assuming MongoDB's default ObjectId
  source: string;
  amount: number;
  date: string;
}

const ExpenseEntryPage = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState<number | ''>('');
  const [expensePrice, setExpensePrice] = useState<number | ''>('');
  const [salarySource, setSalarySource] = useState('');
  const [salaryAmount, setSalaryAmount] = useState<number | ''>('');

  useEffect(() => {
    if (date) {
      const fetchData = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/expenses?date=${date}`);
        const allExpenses = await response.json();
        setExpenses(allExpenses);

        const salariesResponse = await fetch(`${process.env.REACT_APP_API_URL}/salaries?date=${date}`);
        const allSalaries = await salariesResponse.json();
        setSalaries(allSalaries);
      };

      fetchData();
    }
  }, [date]);

  const addExpense = async () => {
    if (expenseDescription && expenseAmount && expensePrice) {
      const newExpense = { 
        description: expenseDescription, 
        amount: Number(expenseAmount), 
        price: Number(expensePrice), 
        cost: Number(expenseAmount) * Number(expensePrice), 
        date: date! 
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense),
      });

      const savedExpense = await response.json();
      setExpenses((prev) => [...prev, savedExpense]);
      setExpenseDescription('');
      setExpenseAmount('');
      setExpensePrice('');
    }
  };

  const addSalary = async () => {
    if (salarySource && salaryAmount) {
      const newSalary = { source: salarySource, amount: Number(salaryAmount), date: date! };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/salaries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSalary),
      });

      const savedSalary = await response.json();
      setSalaries((prev) => [...prev, savedSalary]);
      setSalarySource('');
      setSalaryAmount('');
    }
  };

  const deleteExpense = async (id: string) => {
    await fetch(`${process.env.REACT_APP_API_URL}/expenses/${id}`, {
      method: 'DELETE',
    });

    setExpenses((prev) => prev.filter((expense) => expense._id !== id));
  };

  const deleteSalary = async (id: string) => {
    await fetch(`${process.env.REACT_APP_API_URL}/salaries/${id}`, {
      method: 'DELETE',
    });

    setSalaries((prev) => prev.filter((salary) => salary._id !== id));
  };

  // Update to calculate total expenses based on cost
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.cost, 0);
  const totalSalaries = salaries.reduce((sum, salary) => sum + salary.amount, 0);

  return (
    <div className="expense-entry-page">
      <h2 className="section-title">Expenses for {date}</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Item description"
          value={expenseDescription}
          onChange={(e) => setExpenseDescription(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value === '' ? '' : Number(e.target.value))}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Price"
          value={expensePrice}
          onChange={(e) => setExpensePrice(e.target.value === '' ? '' : Number(e.target.value))}
          className="input-field"
        />
        <button onClick={addExpense} className="add-button">Add Expense</button>
      </div>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense._id} className="expense-item">
            <span>{expense.description} (x{expense.amount} @ ${expense.price}/unit): ${expense.cost}</span>
            <button onClick={() => deleteExpense(expense._id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
      <h2 className="total-amount">Total Expenses: ${totalExpenses}</h2>

      <h2 className="section-title">Salary for {date}</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Salary source"
          value={salarySource}
          onChange={(e) => setSalarySource(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Amount"
          value={salaryAmount}
          onChange={(e) => setSalaryAmount(e.target.value === '' ? '' : Number(e.target.value))}
          className="input-field"
        />
        <button onClick={addSalary} className="add-button">Add Salary</button>
      </div>
      <ul className="salary-list">
        {salaries.map((salary) => (
          <li key={salary._id} className="salary-item">
            <span>{salary.source}: ${salary.amount}</span>
            <button onClick={() => deleteSalary(salary._id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
      <h2 className="total-amount">Total Salary: ${totalSalaries}</h2>

      <button onClick={() => navigate(-1)} className="back-button">Back to Calendar</button>
    </div>
  );
};

export default ExpenseEntryPage;
