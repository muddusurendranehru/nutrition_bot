# ✅ SIMPLIFIED SETUP - INTEGER IDs

## What Changed:

❌ **OLD**: UUID primary keys, users & nutrition_entries tables  
✅ **NEW**: INTEGER primary keys (SERIAL), customers & fruits tables

## 🗄️ Database Setup in Neon

### Step 1: Clean Up (If Needed)

If you already created the old tables with UUIDs, run this first:

```sql
DROP TABLE IF EXISTS nutrition_entries CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS fruits CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
```

### Step 2: Create New Tables

Run this in your Neon SQL Editor (database: **nutribot**):

```sql
-- Table 1: customers (Authentication)
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table 2: fruits (Data)
CREATE TABLE fruits (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    fruit_name VARCHAR(255) NOT NULL,
    calories INTEGER,
    carbs DECIMAL(10,2),
    proteins DECIMAL(10,2),
    glycemic_index INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index for better performance
CREATE INDEX idx_fruits_customer_id ON fruits(customer_id);
```

### Step 3: Verify

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Should show:
-- customers
-- fruits
```

---

## 🎯 Application Flow

### Sign Up Page:
- Email (required)
- Password (required)
- Confirm Password (required)

### Login Page:
- Email (required)
- Password (required)
→ Redirects to Dashboard on success

### Dashboard:
1. **Add Fruit Form:**
   - Fruit name (e.g., Orange, Apple, Banana)
   - Calories
   - Carbs (grams)
   - Proteins (grams)
   - Glycemic Index (1-100)

2. **View Your Fruits:**
   - Shows all fruits you added
   - INTEGER ID visible
   - Glycemic index color-coded:
     - 🟢 Green: 1-55 (Low)
     - 🟠 Orange: 56-69 (Medium)
     - 🔴 Red: 70+ (High)

3. **View All Customers:**
   - Shows all registered customers
   - INTEGER IDs
   - Email addresses
   - Registration dates

4. **Logout Button:**
   - Clears token
   - Returns to login page

---

## 🧪 Test Data (Optional)

Want to add sample data? Run this:

```sql
-- Test customer
INSERT INTO customers (email, password) 
VALUES ('test@example.com', '$2b$10$rKvVXhzJQvGZGGhVBq5yQ.X8Z4rY7L9vN3pD2tJ8mN6lK4rV5yQ.q');

-- Get customer ID
SELECT id FROM customers WHERE email = 'test@example.com';

-- Add sample fruits (replace 1 with your customer ID)
INSERT INTO fruits (customer_id, fruit_name, calories, carbs, proteins, glycemic_index) VALUES
(1, 'Orange', 47, 12, 0.9, 43),
(1, 'Apple', 52, 14, 0.3, 36),
(1, 'Banana', 89, 23, 1.1, 51),
(1, 'Watermelon', 30, 8, 0.6, 72);

-- View all data
SELECT * FROM customers;
SELECT * FROM fruits;
```

---

## 📊 Table Schemas

### Table 1: customers

| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL (INTEGER) | PRIMARY KEY |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |
| created_at | TIMESTAMP | DEFAULT NOW() |

### Table 2: fruits

| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL (INTEGER) | PRIMARY KEY |
| customer_id | INTEGER | FK → customers(id) |
| fruit_name | VARCHAR(255) | NOT NULL |
| calories | INTEGER | NULLABLE |
| carbs | DECIMAL(10,2) | NULLABLE |
| proteins | DECIMAL(10,2) | NULLABLE |
| glycemic_index | INTEGER | NULLABLE |
| created_at | TIMESTAMP | DEFAULT NOW() |

---

## 🚀 Next Steps

1. ✅ Create tables in Neon (see Step 2 above)
2. ✅ Get connection string from Neon
3. ✅ Deploy to Netlify or test locally

**Connection String Format:**
```
postgresql://user:password@ep-xxx.region.aws.neon.tech/nutribot?sslmode=require
```

---

## 🎉 Summary

- ✅ Simple INTEGER IDs (1, 2, 3...)
- ✅ 2 tables: customers, fruits
- ✅ Glycemic index tracking
- ✅ Full authentication
- ✅ Dashboard with add/view features

**All done! Your database is ready!** 🍊

