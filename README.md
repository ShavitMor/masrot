# **MASROT**

**MASROT** is a full-stack web application built using React, TypeScript, Node.js, and MongoDB. The application provides users with a calendar interface to track daily expenses and salaries, helping them manage their Maasrot correctly easily :)

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## **Project Overview**

MASROT helps users keep track of their expenses and salaries by selecting dates on a calendar. The users can:

- View a calendar displaying all days of the current month.
- Click on any date to input expenses and salaries for that specific day.
- View total expenses and salaries for the current month.
- Store data securely using a backend server and MongoDB.

## **Features**

- **Interactive Calendar:** A responsive calendar interface for selecting dates and viewing financial data.
- **Expense and Salary Tracking:** Input and track daily expenses and salaries, automatically calculating totals.
- **Data Persistence:** Store user data in a MongoDB database for persistent storage and retrieval.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## **Tech Stack**

- **Frontend:** React, TypeScript, CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB, Mongoose

## **Installation**

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ShavitMor/masrot.git
   cd masrot
   ```

2. **Install dependencies for both client and server:**

   Navigate to the `client` directory and install the dependencies:

   ```bash
   cd client
   npm install
   ```

   Navigate to the `server` directory and install the dependencies:

   ```bash
   cd ../server
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `server` directory with the following variables:

   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

   Replace `your_mongodb_connection_string` with your actual MongoDB URI.

4. **Start the development servers:**

   - **Client:** In the `client` directory, run:

     ```bash
     npm start
     ```

   - **Server:** In the `server` directory, run:

     ```bash
     npm run dev
     ```

   The client will run on `http://localhost:3000` and the server will run on `http://localhost:5000`.

## **Usage**

1. **Open the application** in your browser at `http://localhost:3000`.
2. **Navigate through the calendar** to select a specific date.
3. **Input expenses** and **salaries** for the selected date and save the data.
4. **View monthly totals** below the calendar to keep track of your finances.

## **API Endpoints**

The backend server provides a RESTful API for managing expenses and salaries. Below are the available endpoints:

### **Expenses**

- **Get All Expenses for a Date Range:**
  - **Endpoint:** `GET /api/expenses`
  - **Query Parameters:**
    - `startDate` - Start of the date range (ISO string format).
    - `endDate` - End of the date range (ISO string format).
  - **Example:** `/api/expenses?startDate=2024-08-01&endDate=2024-08-31`
  - **Description:** Returns all expenses within the specified date range.

- **Get Expenses for a Specific Date:**
  - **Endpoint:** `GET /api/expenses/:date`
  - **Parameters:** `date` - The specific date (ISO string format).
  - **Example:** `/api/expenses/2024-08-16`
  - **Description:** Returns expenses for the specified date.

- **Add a New Expense:**
  - **Endpoint:** `POST /api/expenses`
  - **Body:** `{ "date": "2024-08-16", "items": [{ "name": "Groceries", "amount": 50 }] }`
  - **Description:** Adds a new expense entry for the specified date.

### **Salaries**

- **Get All Salaries for a Date Range:**
  - **Endpoint:** `GET /api/salaries`
  - **Query Parameters:**
    - `startDate` - Start of the date range (ISO string format).
    - `endDate` - End of the date range (ISO string format).
  - **Example:** `/api/salaries?startDate=2024-08-01&endDate=2024-08-31`
  - **Description:** Returns all salaries within the specified date range.

- **Get Salaries for a Specific Date:**
  - **Endpoint:** `GET /api/salaries/:date`
  - **Parameters:** `date` - The specific date (ISO string format).
  - **Example:** `/api/salaries/2024-08-16`
  - **Description:** Returns salaries for the specified date.

- **Add a New Salary:**
  - **Endpoint:** `POST /api/salaries`
  - **Body:** `{ "date": "2024-08-16", "amount": 2000 }`
  - **Description:** Adds a new salary entry for the specified date.

## **Folder Structure**

```
masrot/
├── client/              # React front-end
│   ├── public/          # Public assets
│   ├── src/             # Source files
│   ├── .gitignore       # Git ignore file for client
│   └── package.json     # Client dependencies and scripts
│
├── server/              # Node.js back-end
│   ├── src/             # Source files (controllers, models, routes)
│   ├── .env             # Environment variables
│   ├── .gitignore       # Git ignore file for server
│   └── package.json     # Server dependencies and scripts
│
└── README.md            # Project documentation
```

## **Contributing**

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
