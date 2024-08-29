import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import { useNavigate } from 'react-router-dom';

const CalendarComponent = () => {
  const [value, setValue] = useState<Value>(new Date());
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSalaries, setTotalSalaries] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const startDate = new Date(currentDate.getFullYear(), currentMonth, 1).toISOString().split('T')[0];
      const endDate = new Date(currentDate.getFullYear(), currentMonth, 31).toISOString().split('T')[0];

       const expensesResponse = await fetch(`http://localhost:5000/expenses/range?startDate=${startDate}&endDate=${endDate}`);
      const monthlyExpenses = await expensesResponse.json();
      setTotalExpenses(monthlyExpenses.reduce((sum: number, expense: any) => sum + expense.amount, 0));

      const salariesResponse = await fetch(`http://localhost:5000/salaries/range?startDate=${startDate}&endDate=${endDate}`);
      const monthlySalaries = await salariesResponse.json();
      setTotalSalaries(monthlySalaries.reduce((sum: number, salary: any) => sum + salary.amount, 0));
     };

    fetchMonthlyData();
  }, [value]);

  const handleDateChange = (value: Value) => {
    setValue(value);
    if (value instanceof Date) {
           // Set the time to midnight to avoid time zone issues
      const fixedDate = new Date(value.setHours(0, 0, 0, 0));
      const selectedDate = fixedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD format
            navigate(`/expenses/${selectedDate}`);

    }
  };

  return (
    <div className="calendar-wrapper">
      <Calendar value={value} onChange={handleDateChange} />
      <div className="monthly-totals">
        <h2>Current Month Totals</h2>
        <p>Total Expenses: ${totalExpenses}</p>
        <p>Total Income: ${totalSalaries}</p>
        <p>The Ma'asrot ${totalSalaries/10  - totalExpenses}</p>
      </div>
    </div>
  );
};

export default CalendarComponent;
