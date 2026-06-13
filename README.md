# Employee Directory Application
**Course:** CPAD (Semester 4)  
**Deliverable:** Individual Assignment — Three-Tier CRUD Application  

---

## 👤 Student Information
* **Name:** KUGAANN A/L [Your Last Name]
* **Matric Number:** [Your Matric Number here, e.g., A21CSXXXX]

---

## 🚀 Setup & Installation Instructions

Follow these exact steps to deploy, run, and evaluate the application locally.

### 1. Database Initialization (Laragon / MySQL)
1. Launch **Laragon** and verify that the **MySQL** service is started (green light status indication).
2. Open your database management tool (such as **HeidiSQL**) and connect to your local host instance.
3. Locate the verified deployment script inside your project workspace at: `/sql/schema.sql`.
4. Open and execute this entire script file inside a query tab to automatically create the `employee_directory` catalog database schema, provision structure layouts, and inject the 7 sample employee record rows.

### 2. Backend API Runtime Configuration
1. Open a system terminal window and navigate directly into your server directory path:
   ```bash
   cd server
2.Install the production and testing dependencies:
npm install

3.Boot up the Express REST API backend server workspace engine (pre-configured to serve data on port 3001)
npm run server


### 3. Frontend Client Layout Deployment
Open a second, independent system terminal window and change directory into the root project directory folder.

1.Install the necessary Node application modules and UI packages:

npm install

2.Run the compilation scripts to spin up the Vite development server engine (hard-coded via vite.config.js to run on port 5174):

npm run dev


3.Once running, open your web browser and load up the client dashboard panel layout using this address: http://localhost:5174


## 📱 Core Application Features

### 1. Register New Employee / Add Employee
* **Dual-Mode Data Orchestration:** The input layout dynamically adapts between "Register New Employee" (creation mode) and "Update Employee Profile" (modification mode) based on parent-emitted state flags.
* **Proactive Client-Side Form Validation:** Prevents data corruption on the wire by enforcing strict business rules before submission:
  * Automatically blocks future dates for the `hireDate` input field.
  * Restricts numeric inputs to match corporate payroll parameters (e.g., Min: RM 1,500 / Max: RM 50,000).
* **ID Input Lock:** During edit mode, the primary alphanumeric tracking key (`empId`) automatically becomes read-only (`:disabled="isEditing"`), preserving underlying MySQL relational integrity.

### 2. Live Employee List Grid
* **Localized Financial Output Formatting:** Raw decimal values fetched from the database are processed through a reactive presentation filter to standardize output strings with clean Malaysian Ringgit prefixes (e.g., `5200` renders as `RM 5,200.00`).
* **Visual Status Badges:** Database booleans (`1` / `0`) are translated on-the-fly into highly scannable, color-coded conditional badges (**Active** in green / **Inactive** in red).
* **Graceful Empty State Layouts:** If a data filter yields zero hits or an operative row is deleted, the table collapses clean and safely swaps in an intuitive fallback notice block instead of throwing runtime layout crashes.

### 3. Server-Driven Real-Time Search & Sort Filter Module
* **Instant Reactive Listening:** Monitors inputs via a multi-variable Vue `watch()` handler array. As users type into the query box, the keyword token is instantly intercepted and evaluated across three key database attributes (`name`, `empId`, and `email`) with zero delay.
* **No-Click Sorting Matrix:** Empowers administrators to dynamically organize their viewport data grid by choosing a target column attribute (Name, Hire Date, or Salary) along with a target order switch (Ascending or Descending).
* **On-The-Fly Query Resolution:** Avoids bulky "Submit Search" button layers. All query configurations are piped through Axios and handled server-side directly inside the MySQL `WHERE` and `ORDER BY` syntax blocks, maintaining top performance.