# 🗄️ Neon Setup — `nutri_bot` Database (2 UUID Tables)

Follow these steps to rebuild your Neon database so it matches the new typed backend.

---

## ✅ Architecture Checklist

- **Database name:** `nutri_bot`
- **Tables (exactly two):**
  - `users` – authentication (UUID primary key)
  - `food_nutrition` – food catalog (UUID primary key)
- **Extensions:** `pgcrypto` (for `gen_random_uuid()`)
- **Search ready:** indexes on food name, category, country, diabetic rating

---

## ⚙️ Step 1 — Run the Schema Script

1. Open the Neon console → choose the `nutri_bot` database (create it if needed).
2. Open the **SQL Editor**.
3. Copy everything from `database/schema.sql` in this repo and paste it into the editor.
4. Click **Run**.

The script will:
- Drop any legacy tables (`customers`, `nutrition_database`, etc.).
- Create `users` and `food_nutrition` with UUID primary keys.
- Add all required indexes and constraints.

---

## 🔍 Step 2 — Verify the Tables

Run these quick checks in the SQL editor:

```sql
-- Confirm exactly two tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Preview empty tables
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM food_nutrition;
```

You should see:
- Tables: `food_nutrition`, `users`
- Counts: both `0` right after setup

---

## 🍽️ Step 3 — Load Your Food Data

You can paste any of the curated SQL packs into the Neon editor:

- `database/add_scotch_whiskeys.sql` – 105 scotch entries
- `database/add_asian_foods_FIXED.sql` – 101 Asian foods with local names
- `database/add_indian_snacks.sql` – 102 Indian evening snacks (English + Telugu)

Each script uses the new column list (`food_name`, `food_name_lower`, `regional_names`, etc.) so they will insert cleanly.

> 💡 Tip: run one file at a time and wait for the success message before moving on.

---

## 👤 Step 4 — Create a Test User (Optional)

```sql
INSERT INTO users (email, password_hash, name, phone)
VALUES (
  'admin@example.com',
  '$2b$10$abcdefghijklmnopqrstuv', -- bcrypt hash placeholder
  'Admin User',
  '+919876543210'
)
RETURNING id, email, created_at;
```

You can also register from the frontend once the backend is running.

---

## 🔐 Step 5 — Update Backend Environment Variables

Create or update `backend/.env`:

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST/neon.tech/nutri_bot?sslmode=require
JWT_SECRET=replace-with-strong-secret
PORT=3031
FRONTEND_URL=https://your-frontend-domain.com
OPENAI_API_KEY=sk-... (optional)
```

> Remember to restart the backend after changing `.env`.

---

## 🧪 Step 6 — Smoke Test the Backend

With the new TypeScript backend:

```bash
cd backend
npm run build
npm start
```

Check endpoints:
- `GET /api/health` → should show “Connected”
- `POST /api/auth/signup` → creates a user in `users`
- `GET /api/data` → returns rows from `food_nutrition`
- `POST /api/data` → inserts an AI result (requires JWT)

---

## 📊 Step 7 — Confirm Data Counts

```sql
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM food_nutrition;

SELECT diabetic_rating, COUNT(*)
FROM food_nutrition
GROUP BY diabetic_rating
ORDER BY diabetic_rating;
```

Run additional queries to verify regional names or specific categories once the datasets are loaded.

---

## 🚀 Ready for Render Deployment

After the database is populated:

1. Push the updated backend (TypeScript + lint + tests) to GitHub.
2. Redeploy the Render backend service.
3. Confirm the Render environment variables match the `.env` values above.
4. Trigger a fresh build of the frontend to consume the new API.

Everything is now aligned: **Neon (`nutri_bot`) → Typed Backend → Frontend Dashboard**.

If you need more SQL packs or help importing CSV data, let me know! 🍎

