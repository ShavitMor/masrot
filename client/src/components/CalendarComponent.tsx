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
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const currentMonth = activeStartDate.getMonth();
      const startDate = new Date(activeStartDate.getFullYear(), currentMonth, 1).toISOString().split('T')[0];
      const endDate = new Date(activeStartDate.getFullYear(), currentMonth + 1, 0).toISOString().split('T')[0];

      setLoading(true);

      try {
        const expensesResponse = await fetch(`https://localhost:5000/expenses/range?startDate=${startDate}&endDate=${endDate}`);
        const monthlyExpenses = await expensesResponse.json();
        setTotalExpenses(monthlyExpenses.reduce((sum: number, expense: any) => sum + expense.cost, 0));

        const salariesResponse = await fetch(`https://localhost:5000/salaries/range?startDate=${startDate}&endDate=${endDate}`);
        const monthlySalaries = await salariesResponse.json();
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
          {/* <li><a href="/reports">Reports</a></li>
          <li><a href="/settings">Settings</a></li> */}
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
            // Ensure `activeStartDate` is properly set in the Calendar
            activeStartDate={activeStartDate}
          />
          <div className="monthly-totals">
            <h2>Current Month Totals</h2>
            <p>Total Expenses: ${totalExpenses}</p>
            <p>Total Income: ${totalSalaries}</p>
            <p>The Ma'asrot: ${totalSalaries / 10 - totalExpenses}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarComponent;

