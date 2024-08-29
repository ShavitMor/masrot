import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import CalendarComponent from './components/CalendarComponent';
import NavbarComponent from './components/NavbarComponent';
import ExpenseEntryPage from './components/ExpenseEntryPage'; // Page for entering expenses and salaries

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<CalendarComponent />} />
          <Route path="/expenses/:date" element={<ExpenseEntryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
