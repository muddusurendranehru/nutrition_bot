-- ⚠️ IMPORTANT: Drop old UUID tables before creating new INTEGER tables
-- Run this in Neon SQL Editor if you already have the old tables

-- Drop old tables (if they exist)
DROP TABLE IF EXISTS nutrition_entries CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ✅ Now the database is clean and ready for the new INTEGER schema
-- Next: Run database/schema.sql to create the new tables

