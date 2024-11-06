import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import { useNavigate } from 'react-router-dom';
import '../styles/CalendarComponent.css';

const CalendarComponent = () => {
  const [value, setValue] = useState<Value>(new Date());
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSalaries, setTotalSalaries] = useState(0);
  const [expenses, setExpenses] = useState<{ _id: string; description: string; cost: number; date: string }[]>([]); // Store individual expenses
  const [salaries, setSalaries] = useState<{ _id: string; source: string; amount: number; date: string }[]>([]); // Store individual salaries
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const currentMonth = activeStartDate.getMonth();
      const startDate = new Date(activeStartDate.getFullYear(), currentMonth, 2).toISOString().split('T')[0];
      const endDate = new Date(activeStartDate.getFullYear(), currentMonth , 31).toISOString().split('T')[0];

      setLoading(true);

      try {
        const expensesResponse = await fetch(`${process.env.REACT_APP_API_URL}/expenses/range?startDate=${startDate}&endDate=${endDate}`);
        const monthlyExpenses = await expensesResponse.json();
        console.log(startDate, endDate, monthlyExpenses);
        setExpenses(monthlyExpenses); // Store expenses data for listing
        setTotalExpenses(monthlyExpenses.reduce((sum: number, expense: any) => sum + expense.cost, 0));

        const salariesResponse = await fetch(`${process.env.REACT_APP_API_URL}/salaries/range?startDate=${startDate}&endDate=${endDate}`);
        const monthlySalaries = await salariesResponse.json();
        console.log(startDate, endDate, monthlySalaries);
        setSalaries(monthlySalaries); // Store salaries data for listing
        setTotalSalaries(monthlySalaries.reduce((sum: number, salary: any) => sum + salary.amount, 0));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, [activeStartDate]);

  const handleDateChange = (value: Value) => {
    setValue(value);
    if (value instanceof Date) {
      const fixedDate = new Date(value.setHours(0, 0, 0, 0));
      const selectedDate = fixedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD format
      navigate(`/expenses/${selectedDate}`);
    }
  };

  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      console.log('New activeStartDate:', activeStartDate);
      setActiveStartDate(activeStartDate);
    }
  };

  return (
    <div className="calendar-wrapper">
      <nav className="navbar">
        <h1>Expense Tracker</h1>
        <ul>
          <li><a href="/">Home</a></li>
        </ul>
      </nav>
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <Calendar
            value={value}
            onChange={handleDateChange}
            onActiveStartDateChange={handleActiveStartDateChange}
            view="month"
            activeStartDate={activeStartDate}
          />
          
          <div className="monthly-totals">
            <h2>Current Month Totals</h2>
            <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
            <p>Total Income: ${totalSalaries.toFixed(2)}</p>
            <p>The Ma'asrot: ${(totalSalaries / 10 - totalExpenses).toFixed(2)}</p>
          </div>

          {/* Display list of expenses */}
          <div className="expenses-list">
            <h3>Monthly Expenses</h3>
            {expenses.length > 0 ? (
              <ul>
                {expenses.map(expense => (
                  <li key={expense._id}>
                    {expense.description}: ${expense.cost.toFixed(2)} ב- {new Date(expense.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No expenses recorded for this month.</p>
            )}
          </div>

          {/* Display list of salaries */}
          <div className="salaries-list">
            <h3>Monthly Salaries</h3>
            {salaries.length > 0 ? (
              <ul>
                {salaries.map(salary => (
                  <li key={salary._id}>
                    {salary.source}: ${salary.amount.toFixed(2)} ב- {new Date(salary.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No salaries recorded for this month.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarComponent;
