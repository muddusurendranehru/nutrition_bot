# 🔗 COMPLETE ALIGNMENT CHECK - Database → Backend → Frontend

This document verifies that **ALL layers** are perfectly aligned.

---

## ✅ LAYER 1: DATABASE SCHEMA (Neon PostgreSQL)

### Table 1: `customers`
```sql
id              SERIAL PRIMARY KEY      -- INTEGER (1, 2, 3...)
email           VARCHAR(255) UNIQUE
password        VARCHAR(255)            -- Stores hashed password
created_at      TIMESTAMP
```

### Table 2: `fruits`
```sql
id              SERIAL PRIMARY KEY      -- INTEGER (1, 2, 3...)
customer_id     INTEGER                 -- FK → customers.id
fruit_name      VARCHAR(255)
calories        INTEGER
carbs           DECIMAL(10,2)
proteins        DECIMAL(10,2)
glycemic_index  INTEGER
created_at      TIMESTAMP
```

**Key Points:**
- Primary keys: INTEGER (SERIAL auto-increment)
- Foreign key: `fruits.customer_id` → `customers.id`
- Password column: `password` (not password_hash)

---

## ✅ LAYER 2: BACKEND ROUTES

### Authentication Routes (`backend/routes/auth.js`)

#### Signup Endpoint: `POST /api/auth/signup`
```javascript
// Request body
{
  email: "user@example.com",
  password: "password123",
  confirmPassword: "password123"
}

// Database INSERT
INSERT INTO customers (email, password) 
VALUES ($1, $2)

// JWT Token payload
{
  customerId: 1,          // ✅ INTEGER ID
  email: "user@example.com"
}

// Response
{
  message: "Customer registered successfully",
  customer: {
    id: 1,                // ✅ INTEGER
    email: "user@example.com",
    created_at: "2024-..."
  },
  token: "eyJhbGc..."
}
```

#### Login Endpoint: `POST /api/auth/login`
```javascript
// Request body
{
  email: "user@example.com",
  password: "password123"
}

// Database query
SELECT id, email, password, created_at 
FROM customers 
WHERE email = $1

// JWT Token payload
{
  customerId: 1,          // ✅ INTEGER ID
  email: "user@example.com"
}

// Response
{
  message: "Login successful",
  customer: {
    id: 1,                // ✅ INTEGER
    email: "user@example.com",
    created_at: "2024-..."
  },
  token: "eyJhbGc..."
}
```

#### Logout Endpoint: `POST /api/auth/logout`
```javascript
// Response
{
  message: "Logout successful"
}
```

---

### Data Routes (`backend/routes/data.js`)

#### Insert Fruit: `POST /api/data`
```javascript
// Request body
{
  fruit_name: "Orange",
  calories: 47,
  carbs: 12,
  proteins: 0.9,
  glycemic_index: 43
}

// Middleware extracts
req.customer.customerId    // ✅ INTEGER from JWT

// Database INSERT
INSERT INTO fruits (customer_id, fruit_name, calories, carbs, proteins, glycemic_index)
VALUES ($1, $2, $3, $4, $5, $6)

// Response
{
  message: "Fruit entry added successfully",
  data: {
    id: 1,                    // ✅ INTEGER
    customer_id: 1,           // ✅ INTEGER
    fruit_name: "Orange",
    calories: 47,
    carbs: 12,
    proteins: 0.9,
    glycemic_index: 43,
    created_at: "2024-..."
  }
}
```

#### Fetch Fruits: `GET /api/data`
```javascript
// Middleware extracts
req.customer.customerId    // ✅ INTEGER from JWT

// Database query
SELECT id, customer_id, fruit_name, calories, carbs, proteins, glycemic_index, created_at
FROM fruits
WHERE customer_id = $1

// Response
{
  count: 2,
  data: [
    {
      id: 1,                    // ✅ INTEGER
      customer_id: 1,           // ✅ INTEGER
      fruit_name: "Orange",
      calories: 47,
      carbs: 12,
      proteins: 0.9,
      glycemic_index: 43,
      created_at: "2024-..."
    },
    {
      id: 2,                    // ✅ INTEGER
      customer_id: 1,           // ✅ INTEGER
      fruit_name: "Apple",
      calories: 52,
      carbs: 14,
      proteins: 0.3,
      glycemic_index: 36,
      created_at: "2024-..."
    }
  ]
}
```

#### Fetch Customers: `GET /api/data/customers`
```javascript
// Database query
SELECT id, email, created_at 
FROM customers

// Response
{
  count: 3,
  data: [
    {
      id: 1,                    // ✅ INTEGER
      email: "user1@example.com",
      created_at: "2024-..."
    },
    {
      id: 2,                    // ✅ INTEGER
      email: "user2@example.com",
      created_at: "2024-..."
    }
  ]
}
```

---

## ✅ LAYER 3: MIDDLEWARE

### Authentication Middleware (`backend/middleware/auth.js`)

```javascript
export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  
  // JWT Verify extracts payload
  jwt.verify(token, process.env.JWT_SECRET, (err, customer) => {
    // customer = { customerId: 1, email: "user@example.com" }
    
    req.customer = customer;    // ✅ Attaches to request
    // req.customer.customerId   // ✅ INTEGER ID available
    // req.customer.email        // ✅ Email available
    next();
  });
};
```

**Usage in Routes:**
```javascript
router.use(authenticateToken);

router.post('/', async (req, res) => {
  const customerId = req.customer.customerId;  // ✅ INTEGER from middleware
  // Use customerId in database queries
});
```

---

## ✅ LAYER 4: FRONTEND

### Sign Up Page (`frontend/src/pages/SignUp.jsx`)

```javascript
// Form state
const [formData, setFormData] = useState({
  email: '',
  password: '',
  confirmPassword: ''    // ✅ Matches backend validation
});

// API call
const result = await signup(
  formData.email,
  formData.password,
  formData.confirmPassword
);

// Response
{
  customer: { id: 1, email: "...", created_at: "..." },
  token: "eyJhbGc..."
}

// Store token
setToken(result.token);

// Redirect
navigate('/dashboard');
```

---

### Login Page (`frontend/src/pages/Login.jsx`)

```javascript
// Form state
const [formData, setFormData] = useState({
  email: '',
  password: ''           // ✅ Matches backend
});

// API call
const result = await login(formData.email, formData.password);

// Response
{
  customer: { id: 1, email: "...", created_at: "..." },
  token: "eyJhbGc..."
}

// Store token
setToken(result.token);

// Redirect
navigate('/dashboard');
```

---

### Dashboard Page (`frontend/src/pages/Dashboard.jsx`)

#### Add Fruit Form State:
```javascript
const [formData, setFormData] = useState({
  fruit_name: '',          // ✅ Matches backend field
  calories: '',            // ✅ Matches backend field
  carbs: '',               // ✅ Matches backend field
  proteins: '',            // ✅ Matches backend field
  glycemic_index: ''       // ✅ Matches backend field
});
```

#### Insert Fruit API Call:
```javascript
await insertFruitEntry(formData);

// Sends to: POST /api/data
// Body: { fruit_name, calories, carbs, proteins, glycemic_index }
```

#### Fetch Fruits API Call:
```javascript
const fruitsResult = await fetchFruitEntries();

// Calls: GET /api/data
// Response: { count: 2, data: [...] }

setFruitsData(fruitsResult.data);

// fruitsResult.data = [
//   { id: 1, customer_id: 1, fruit_name: "Orange", ... }
// ]
```

#### Display Fruits Table:
```javascript
{fruitsData.map((fruit) => (
  <tr key={fruit.id}>
    <td>{fruit.id}</td>                    // ✅ INTEGER ID
    <td>{fruit.fruit_name}</td>            // ✅ Matches DB column
    <td>{fruit.calories}</td>              // ✅ Matches DB column
    <td>{fruit.carbs}g</td>                // ✅ Matches DB column
    <td>{fruit.proteins}g</td>             // ✅ Matches DB column
    <td>{fruit.glycemic_index}</td>        // ✅ Matches DB column
  </tr>
))}
```

#### Fetch Customers API Call:
```javascript
const customersResult = await fetchCustomers();

// Calls: GET /api/data/customers
// Response: { count: 3, data: [...] }

setCustomersData(customersResult.data);

// customersResult.data = [
//   { id: 1, email: "user@example.com", created_at: "..." }
// ]
```

#### Display Customers Table:
```javascript
{customersData.map((customer) => (
  <tr key={customer.id}>
    <td>{customer.id}</td>                 // ✅ INTEGER ID
    <td>{customer.email}</td>              // ✅ Matches DB column
    <td>{customer.created_at}</td>         // ✅ Matches DB column
  </tr>
))}
```

---

## ✅ LAYER 5: API UTILITIES (`frontend/src/utils/api.js`)

```javascript
// Signup
export const signup = async (email, password, confirmPassword) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
    email,                    // ✅ Matches backend
    password,                 // ✅ Matches backend
    confirmPassword           // ✅ Matches backend
  });
  return response.data;
};

// Login
export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,                    // ✅ Matches backend
    password                  // ✅ Matches backend
  });
  return response.data;
};

// Insert Fruit
export const insertFruitEntry = async (data) => {
  // data = { fruit_name, calories, carbs, proteins, glycemic_index }
  const response = await api.post('/data', data);
  return response.data;
};

// Fetch Fruits
export const fetchFruitEntries = async () => {
  const response = await api.get('/data');
  return response.data;  // { count, data: [...] }
};

// Fetch Customers
export const fetchCustomers = async () => {
  const response = await api.get('/data/customers');
  return response.data;  // { count, data: [...] }
};
```

---

## ✅ COMPLETE DATA FLOW EXAMPLE

### Scenario: User signs up, logs in, adds an orange

#### 1. Sign Up
```
Frontend Form:
  email: "john@example.com"
  password: "pass123"
  confirmPassword: "pass123"
  ↓
API Call: POST /api/auth/signup
  ↓
Backend: INSERT INTO customers (email, password) VALUES (...)
  ↓
Response: { customer: { id: 1, email: "john@example.com" }, token: "..." }
  ↓
Frontend: Store token, redirect to /dashboard
```

#### 2. Login
```
Frontend Form:
  email: "john@example.com"
  password: "pass123"
  ↓
API Call: POST /api/auth/login
  ↓
Backend: SELECT * FROM customers WHERE email = "john@example.com"
Backend: Verify password with bcrypt
Backend: Generate JWT with { customerId: 1, email: "john@example.com" }
  ↓
Response: { customer: { id: 1, email: "john@example.com" }, token: "..." }
  ↓
Frontend: Store token, redirect to /dashboard
```

#### 3. Add Orange
```
Frontend Form:
  fruit_name: "Orange"
  calories: 47
  carbs: 12
  proteins: 0.9
  glycemic_index: 43
  ↓
API Call: POST /api/data
Headers: { Authorization: "Bearer eyJhbGc..." }
  ↓
Middleware: Extract JWT → req.customer = { customerId: 1, email: "john@example.com" }
  ↓
Backend: INSERT INTO fruits (customer_id, fruit_name, calories, carbs, proteins, glycemic_index)
         VALUES (1, 'Orange', 47, 12, 0.9, 43)
  ↓
Response: { message: "Fruit entry added successfully", data: { id: 1, customer_id: 1, fruit_name: "Orange", ... } }
  ↓
Frontend: Show success message, refresh table
```

#### 4. View Fruits
```
Frontend loads dashboard
  ↓
API Call: GET /api/data
Headers: { Authorization: "Bearer eyJhbGc..." }
  ↓
Middleware: Extract JWT → req.customer.customerId = 1
  ↓
Backend: SELECT * FROM fruits WHERE customer_id = 1
  ↓
Response: { count: 1, data: [{ id: 1, customer_id: 1, fruit_name: "Orange", calories: 47, carbs: 12, proteins: 0.9, glycemic_index: 43 }] }
  ↓
Frontend: Display in table with green glycemic index (43 ≤ 55)
```

---

## ✅ ALIGNMENT CHECKLIST

### Database → Backend
- [x] Table name: `customers` ✅ Backend uses: `customers`
- [x] Table name: `fruits` ✅ Backend uses: `fruits`
- [x] Primary key type: INTEGER ✅ Backend handles: INTEGER
- [x] Column: `customer_id` ✅ Backend uses: `customer_id`
- [x] Column: `fruit_name` ✅ Backend uses: `fruit_name`
- [x] Column: `calories` ✅ Backend uses: `calories`
- [x] Column: `carbs` ✅ Backend uses: `carbs`
- [x] Column: `proteins` ✅ Backend uses: `proteins`
- [x] Column: `glycemic_index` ✅ Backend uses: `glycemic_index`
- [x] Password column: `password` ✅ Backend uses: `password`

### Backend → Middleware
- [x] JWT payload: `customerId` ✅ Middleware uses: `req.customer.customerId`
- [x] JWT payload: `email` ✅ Middleware uses: `req.customer.email`
- [x] Token attached to: `req.customer` ✅ Routes access: `req.customer`

### Backend → Frontend
- [x] Signup fields: email, password, confirmPassword ✅ Match
- [x] Login fields: email, password ✅ Match
- [x] Insert fields: fruit_name, calories, carbs, proteins, glycemic_index ✅ Match
- [x] Response field: `customer` ✅ Frontend uses: `customer`
- [x] Response field: `data` (array) ✅ Frontend uses: `data`
- [x] Integer IDs returned ✅ Frontend displays integers

### Frontend Field Names
- [x] `fruit_name` (not `food_name`) ✅
- [x] `proteins` (not `protein`) ✅
- [x] `carbs` (not `carbohydrates`) ✅
- [x] `glycemic_index` (not `gi`) ✅
- [x] `customer_id` (not `user_id`) ✅

---

## ✅ SUMMARY: PERFECT ALIGNMENT

**Database Schema:**
- Tables: `customers`, `fruits`
- IDs: INTEGER (SERIAL)
- Foreign key: `fruits.customer_id` → `customers.id`

**Backend:**
- Routes use `customers` and `fruits` tables
- JWT contains `customerId` (INTEGER)
- All column names match database exactly

**Middleware:**
- Extracts `customerId` from JWT
- Attaches to `req.customer`
- Used in all protected routes

**Frontend:**
- Form fields match backend request bodies
- API responses match backend responses
- Table displays match database structure
- All field names align perfectly

**Result:** ✅ **100% ALIGNED** - Database → Backend → Middleware → Frontend

---

## 🎯 Quick Reference

| Layer | Key Names | Type |
|-------|-----------|------|
| **Database** | `customers.id`, `fruits.customer_id` | INTEGER |
| **Backend JWT** | `customerId`, `email` | INTEGER, string |
| **Middleware** | `req.customer.customerId` | INTEGER |
| **Frontend Form** | `fruit_name`, `carbs`, `proteins`, `glycemic_index` | strings |
| **API Response** | `customer`, `data`, `count` | objects/arrays |

**Everything matches perfectly!** 🎉

