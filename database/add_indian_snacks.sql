-- ============================================
-- ADD 100 INDIAN EVENING SNACKS TO FOOD_NUTRITION TABLE
-- English Names + Telugu Names
-- Evening Snacks, Savories, Sweets, Fritters
-- ============================================
-- 
-- Format: English Name (Telugu Name)
-- Examples: Kova Bun, Boondi, Mirchi Bajji, Samosa, 
--           Corn Samosa, Onion Pakoda, Rava Laddu,
--           Usirikaya Bread Pakoda (Gooseberry Bread Pakoda)
--
-- Usage: Copy this entire file and paste into Neon SQL Editor, then Execute
-- ============================================

-- SAMOSAS & STUFFED SNACKS
-- ============================================

INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Samosa (1 piece)', 'samosa (1 piece)', 262, 3.8, 17.2, 22.1, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 45, '{Samosa,సమోసా,Samosa}'::text[]),
('Corn Samosa (1 piece)', 'corn samosa (1 piece)', 285, 4.2, 18.5, 24.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 42, '{Corn Samosa,కార్న్ సమోసా,Makkai Samosa}'::text[]),
('Potato Samosa (1 piece)', 'potato samosa (1 piece)', 270, 3.5, 18.0, 23.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 40, '{Potato Samosa,బంగాళాదుంప సమోసా,Aloo Samosa}'::text[]),
('Chicken Samosa (1 piece)', 'chicken samosa (1 piece)', 310, 12.5, 20.0, 22.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 35, '{Chicken Samosa,చికెన్ సమోసా,Murgh Samosa}'::text[]),
('Paneer Samosa (1 piece)', 'paneer samosa (1 piece)', 295, 8.5, 19.5, 23.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 50, '{Paneer Samosa,పనీర్ సమోసా,Cheese Samosa}'::text[]),
('Onion Samosa (1 piece)', 'onion samosa (1 piece)', 280, 3.8, 18.5, 24.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 45, '{Onion Samosa,ఉల్లిపాయి సమోసా,Pyaz Samosa}'::text[]),
('Sweet Samosa (1 piece)', 'sweet samosa (1 piece)', 320, 4.0, 16.0, 38.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 30, '{Sweet Samosa,స్వీట్ సమోసా,Meetha Samosa}'::text[]),
('Kachori (1 piece)', 'kachori (1 piece)', 245, 4.5, 15.8, 21.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 48, '{Kachori,కచోరి,Kachori}'::text[]),
('Dal Kachori (1 piece)', 'dal kachori (1 piece)', 260, 6.2, 16.5, 22.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 52, '{Dal Kachori,దాల్ కచోరి,Daal Kachori}'::text[]),
('Pyaz Kachori (1 piece)', 'pyaz kachori (1 piece)', 275, 4.8, 17.8, 23.8, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 45, '{Pyaz Kachori,ప్యాజ్ కచోరి,Onion Kachori}'::text[]);

-- PAKODAS & FRITTERS
-- ============================================

INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Onion Pakoda (1 serving)', 'onion pakoda (1 serving)', 285, 4.5, 18.5, 26.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 42, '{Onion Pakoda,ఉల్లిపాయి పకోడా,Pyaz Pakoda}'::text[]),
('Mirchi Bajji (1 piece)', 'mirchi bajji (1 piece)', 145, 2.8, 8.5, 15.2, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 55, '{Mirchi Bajji,మిర్చి బజ్జి,Chili Bajji}'::text[]),
('Potato Bajji (1 piece)', 'potato bajji (1 piece)', 165, 2.2, 9.5, 17.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 52, '{Potato Bajji,బంగాళాదుంప బజ్జి,Aloo Bajji}'::text[]),
('Raw Banana Bajji (1 piece)', 'raw banana bajji (1 piece)', 155, 1.8, 8.8, 17.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 54, '{Raw Banana Bajji,అరటి కాయ బజ్జి,Kaccha Kela Bajji}'::text[]),
('Brinjal Bajji (1 piece)', 'brinjal bajji (1 piece)', 140, 2.0, 8.0, 15.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 56, '{Brinjal Bajji,వంకాయ బజ్జి,Baingan Bajji}'::text[]),
('Bread Pakoda (1 piece)', 'bread pakoda (1 piece)', 220, 5.5, 12.5, 22.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 48, '{Bread Pakoda,బ్రెడ్ పకోడా,Double Roti Pakoda}'::text[]),
('Usirikaya Bread Pakoda (1 piece)', 'usirikaya bread pakoda (1 piece)', 230, 5.8, 13.0, 23.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 50, '{Usirikaya Bread Pakoda,ఉసిరికాయ బ్రెడ్ పకోడా,Gooseberry Bread Pakoda}'::text[]),
('Mix Pakoda (1 serving)', 'mix pakoda (1 serving)', 310, 5.2, 19.5, 28.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 40, '{Mix Pakoda,మిక్స్ పకోడా,Assorted Pakoda}'::text[]),
('Paneer Pakoda (1 piece)', 'paneer pakoda (1 piece)', 195, 8.5, 12.0, 15.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 58, '{Paneer Pakoda,పనీర్ పకోడా,Cheese Pakoda}'::text[]),
('Cauliflower Pakoda (1 piece)', 'cauliflower pakoda (1 piece)', 125, 2.5, 7.5, 13.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 60, '{Cauliflower Pakoda,గోబీ పకోడా,Gobi Pakoda}'::text[]),
('Spinach Pakoda (1 piece)', 'spinach pakoda (1 piece)', 115, 3.0, 7.0, 12.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 62, '{Spinach Pakoda,పాలకూర పకోడా,Palak Pakoda}'::text[]),
('Corn Pakoda (1 serving)', 'corn pakoda (1 serving)', 295, 5.5, 18.2, 27.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 43, '{Corn Pakoda,కార్న్ పకోడా,Makkai Pakoda}'::text[]);

-- VADAS & BONDAS
-- ============================================

INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Medu Vada (1 piece)', 'medu vada (1 piece)', 165, 4.5, 8.5, 18.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 58, '{Medu Vada,మెడు వడ,Ulundhu Vada}'::text[]),
('Rava Vada (1 piece)', 'rava vada (1 piece)', 185, 3.8, 10.2, 21.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 50, '{Rava Vada,రవ్వ వడ,Suji Vada}'::text[]),
('Potato Vada (1 piece)', 'potato vada (1 piece)', 175, 2.5, 9.8, 19.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 54, '{Potato Vada,బంగాళాదుంప వడ,Aloo Vada}'::text[]),
('Onion Vada (1 piece)', 'onion vada (1 piece)', 195, 3.5, 11.5, 21.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 48, '{Onion Vada,ఉల్లిపాయి వడ,Pyaz Vada}'::text[]),
('Masala Vada (1 piece)', 'masala vada (1 piece)', 170, 5.2, 9.2, 18.8, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 56, '{Masala Vada,మసాలా వడ,Paruppu Vada}'::text[]),
('Bonda (Potato Bonda) (1 piece)', 'bonda (potato bonda) (1 piece)', 210, 4.2, 12.5, 22.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 46, '{Bonda,బొండ,Aloo Bonda}'::text[]),
('Rava Bonda (1 piece)', 'rava bonda (1 piece)', 225, 3.5, 13.8, 24.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 44, '{Rava Bonda,రవ్వ బొండ,Suji Bonda}'::text[]),
('Sweet Bonda (1 piece)', 'sweet bonda (1 piece)', 245, 3.8, 14.5, 28.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 38, '{Sweet Bonda,స్వీట్ బొండ,Meetha Bonda}'::text[]);

-- SWEETS & LADDUS
-- ============================================

INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Rava Laddu (1 piece)', 'rava laddu (1 piece)', 185, 2.8, 8.5, 25.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 35, '{Rava Laddu,రవ్వ లడ్డు,Suji Laddu}'::text[]),
('Besan Laddu (1 piece)', 'besan laddu (1 piece)', 220, 5.5, 10.5, 28.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 32, '{Besan Laddu,బెసన్ లడ్డు,Chickpea Flour Laddu}'::text[]),
('Boora Laddu (1 piece)', 'boora laddu (1 piece)', 195, 1.5, 7.8, 32.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 28, '{Boora Laddu,బూర లడ్డు,Sugar Laddu}'::text[]),
('Coconut Laddu (1 piece)', 'coconut laddu (1 piece)', 210, 2.2, 11.5, 26.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 30, '{Coconut Laddu,కొబ్బరి లడ్డు,Kobbari Laddu}'::text[]),
('Motichoor Laddu (1 piece)', 'motichoor laddu (1 piece)', 175, 2.5, 7.5, 26.8, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 33, '{Motichoor Laddu,మోతిచూర్ లడ్డు,Boondi Laddu}'::text[]),
('Til Laddu (1 piece)', 'til laddu (1 piece)', 255, 5.8, 14.5, 28.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 50, '{Til Laddu,తిల్ లడ్డు,Sesame Laddu}'::text[]),
('Gulab Jamun (1 piece)', 'gulab jamun (1 piece)', 165, 2.2, 6.8, 25.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 25, '{Gulab Jamun,గులాబ్ జామున్,Gulab Jamun}'::text[]),
('Jalebi (1 piece)', 'jalebi (1 piece)', 155, 1.8, 5.5, 27.2, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 22, '{Jalebi,జలేబి,Jalebi}'::text[]),
('Imarti (1 piece)', 'imarti (1 piece)', 170, 3.2, 6.8, 26.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 28, '{Imarti,ఇమర్తి,Jhajari}'::text[]),
('Kova Bun (1 piece)', 'kova bun (1 piece)', 285, 6.5, 12.8, 38.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 35, '{Kova Bun,కోవ బన్,Khoya Bun}'::text[]);

-- BOONDI & MIXTURES
-- ============================================

INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Boondi (1 serving)', 'boondi (1 serving)', 245, 4.2, 12.5, 28.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 40, '{Boondi,బూంది,Boondi}'::text[]),
('Namkeen Boondi (1 serving)', 'namkeen boondi (1 serving)', 260, 4.5, 13.8, 29.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 38, '{Namkeen Boondi,నమకీన్ బూంది,Salted Boondi}'::text[]),
('Sweet Boondi (1 serving)', 'sweet boondi (1 serving)', 275, 4.0, 14.5, 32.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 32, '{Sweet Boondi,స్వీట్ బూంది,Meethi Boondi}'::text[]),
('Mixture (1 serving)', 'mixture (1 serving)', 485, 12.5, 28.5, 45.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 35, '{Mixture,మిక్స్చర్,Namkeen}'::text[]),
('Chivda (1 serving)', 'chivda (1 serving)', 420, 8.5, 22.5, 48.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 38, '{Chivda,చివ్డా,Chiwda}'::text[]),
('Bhujia (1 serving)', 'bhujia (1 serving)', 445, 11.5, 25.5, 42.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 36, '{Bhujia,భుజియా,Bhujia}'::text[]),
('Chana Chur (1 serving)', 'chana chur (1 serving)', 395, 14.5, 18.5, 46.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 45, '{Chana Chur,చన చూర్,Chana Chaat}'::text[]),
('Kara Boondi (1 serving)', 'kara boondi (1 serving)', 255, 4.8, 13.2, 29.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 42, '{Kara Boondi,కర బూంది,Spicy Boondi}'::text[]);

-- CHAATS & STREET FOOD
-- ============================================

INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Pani Puri (1 piece)', 'pani puri (1 piece)', 42, 0.8, 1.2, 7.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 60, '{Pani Puri,పానీ పూరి,Golgappa}'::text[]),
('Bhel Puri (1 serving)', 'bhel puri (1 serving)', 185, 4.5, 8.5, 24.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 58, '{Bhel Puri,భేల్ పూరి,Bhel}'::text[]),
('Sev Puri (1 plate)', 'sev puri (1 plate)', 295, 6.5, 14.5, 35.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 45, '{Sev Puri,సేవ్ పూరి,Sev Puri}'::text[]),
('Dahi Puri (1 plate)', 'dahi puri (1 plate)', 245, 6.8, 10.5, 32.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 52, '{Dahi Puri,దహి పూరి,Curd Puri}'::text[]),
('Pav Bhaji (1 serving)', 'pav bhaji (1 serving)', 385, 12.5, 18.5, 42.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 55, '{Pav Bhaji,పావ్ భాజి,Pav Bhaji}'::text[]),
('Vada Pav (1 piece)', 'vada pav (1 piece)', 295, 8.5, 14.5, 32.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 48, '{Vada Pav,వడ పావ్,Vada Pao}'::text[]),
('Dahi Vada (2 pieces)', 'dahi vada (2 pieces)', 245, 8.5, 10.5, 28.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 58, '{Dahi Vada,దహి వడ,Curd Vada}'::text[]),
('Ragda Pattice (1 plate)', 'ragda pattice (1 plate)', 425, 15.5, 22.5, 38.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 50, '{Ragda Pattice,రగ్డా పట్టీస్,Aloo Tikki}'::text[]);

-- SAVORY ITEMS & FARSAN
-- ============================================

INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Kachori Chaat (1 plate)', 'kachori chaat (1 plate)', 325, 7.5, 18.5, 32.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 42, '{Kachori Chaat,కచోరి చాట్,Kachori Chaat}'::text[]),
('Samosa Chaat (1 plate)', 'samosa chaat (1 plate)', 345, 8.2, 20.5, 35.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 40, '{Samosa Chaat,సమోసా చాట్,Samosa Chaat}'::text[]),
('Aloo Tikki (1 piece)', 'aloo tikki (1 piece)', 185, 3.5, 10.5, 20.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 54, '{Aloo Tikki,అలూటిక్కి,Potato Cutlet}'::text[]),
('Dhokla (2 pieces)', 'dhokla (2 pieces)', 145, 5.5, 4.5, 22.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'green', 72, '{Dhokla,ధోక్లా,Dhokla}'::text[]),
('Khaman Dhokla (2 pieces)', 'khaman dhokla (2 pieces)', 165, 6.5, 5.5, 24.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'green', 70, '{Khaman Dhokla,ఖమాన్ ధోక్లా,Spongy Dhokla}'::text[]),
('Khandvi (4 pieces)', 'khandvi (4 pieces)', 195, 8.5, 8.5, 22.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'green', 68, '{Khandvi,ఖాండ్వి,Patodi}'::text[]),
('Fafda (2 pieces)', 'fafda (2 pieces)', 225, 4.5, 12.5, 26.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 48, '{Fafda,ఫాఫ్డా,Fafda}'::text[]),
('Jalebi Fafda (1 serving)', 'jalebi fafda (1 serving)', 380, 6.2, 18.5, 48.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 35, '{Jalebi Fafda,జలేబి ఫాఫ్డా,Jalebi Fafda}'::text[]);

-- FRIED RICE ITEMS & UPMA VARIETIES
-- ============================================

INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Vegetable Upma (1 serving)', 'vegetable upma (1 serving)', 255, 6.5, 9.5, 38.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 62, '{Vegetable Upma,కూరగాయల ఉప్మా,Upma}'::text[]),
('Rava Upma (1 serving)', 'rava upma (1 serving)', 265, 5.8, 10.2, 40.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 60, '{Rava Upma,రవ్వ ఉప్మా,Suji Upma}'::text[]),
('Bombay Upma (1 serving)', 'bombay upma (1 serving)', 285, 7.2, 11.5, 42.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 58, '{Bombay Upma,బాంబే ఉప్మా,Usal Upma}'::text[]),
('Poha (1 serving)', 'poha (1 serving)', 225, 5.5, 8.8, 35.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 65, '{Poha,పోహా,Flattened Rice}'::text[]),
('Batata Poha (1 serving)', 'batata poha (1 serving)', 245, 6.0, 9.5, 38.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 63, '{Batata Poha,బటాటా పోహా,Potato Poha}'::text[]),
('Sabudana Vada (1 piece)', 'sabudana vada (1 piece)', 195, 2.5, 10.5, 23.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 48, '{Sabudana Vada,సాబుదాన వడ,Sago Vada}'::text[]),
('Sabudana Khichdi (1 serving)', 'sabudana khichdi (1 serving)', 315, 3.5, 12.5, 48.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 42, '{Sabudana Khichdi,సాబుదాన ఖిచ్డి,Sago Khichdi}'::text[]);

-- SWEET ITEMS & HALWAS
-- ============================================

INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Halwa (1 serving)', 'halwa (1 serving)', 385, 4.5, 18.5, 52.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 28, '{Halwa,హల్వా,Halwa}'::text[]),
('Carrot Halwa (1 serving)', 'carrot halwa (1 serving)', 345, 3.5, 16.5, 48.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 32, '{Carrot Halwa,క్యారెట్ హల్వా,Gajar Halwa}'::text[]),
('Rava Halwa (1 serving)', 'rava halwa (1 serving)', 395, 4.2, 19.5, 54.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 26, '{Rava Halwa,రవ్వ హల్వా,Suji Halwa}'::text[]),
('Besan Halwa (1 serving)', 'besan halwa (1 serving)', 425, 8.5, 22.5, 48.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 30, '{Besan Halwa,బెసన్ హల్వా,Chickpea Flour Halwa}'::text[]),
('Badam Halwa (1 serving)', 'badam halwa (1 serving)', 485, 12.5, 28.5, 45.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 45, '{Badam Halwa,బాదం హల్వా,Almond Halwa}'::text[]),
('Sooji Halwa (1 serving)', 'sooji halwa (1 serving)', 405, 4.5, 20.0, 55.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 24, '{Sooji Halwa,సూజీ హల్వా,Rava Halwa}'::text[]),
('Kesar Halwa (1 serving)', 'kesar halwa (1 serving)', 415, 4.8, 21.5, 53.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 28, '{Kesar Halwa,కేసర్ హల్వా,Saffron Halwa}'::text[]);

-- BISCUITS & COOKIES (INDIAN STYLE)
-- ============================================

INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Namkeen Biscuit (1 piece)', 'namkeen biscuit (1 piece)', 65, 1.5, 3.5, 8.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 58, '{Namkeen Biscuit,నమకీన్ బిస్కెట్,Salted Biscuit}'::text[]),
('Mathri (1 piece)', 'mathri (1 piece)', 125, 2.5, 6.5, 14.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 48, '{Mathri,మత్రి,Mathri}'::text[]),
('Nankhatai (1 piece)', 'nankhatai (1 piece)', 85, 1.8, 4.5, 10.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 42, '{Nankhatai,నాన్ఖటై,Nankhatai}'::text[]),
('Khari Biscuit (1 piece)', 'khari biscuit (1 piece)', 72, 1.8, 3.8, 8.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 56, '{Khari Biscuit,ఖారి బిస్కెట్,Puff Pastry}'::text[]),
('Samosa Biscuit (1 piece)', 'samosa biscuit (1 piece)', 95, 2.2, 5.2, 11.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 54, '{Samosa Biscuit,సమోసా బిస్కెట్,Samosa Biscuit}'::text[]);

-- DRY FRUITS & NUTS (SNACK STYLE)
-- ============================================

INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Roasted Peanuts (1 serving)', 'roasted peanuts (1 serving)', 285, 13.0, 26.0, 8.3, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 65, '{Roasted Peanuts,వేపిన చెనక్కాయ,Moongphali}'::text[]),
('Roasted Gram (1 serving)', 'roasted gram (1 serving)', 325, 18.5, 8.5, 45.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'green', 72, '{Roasted Gram,వేపిన బట్టాని,Chana}'::text[]),
('Masala Peanuts (1 serving)', 'masala peanuts (1 serving)', 295, 13.5, 27.5, 9.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 62, '{Masala Peanuts,మసాలా చెనక్కాయ,Spiced Peanuts}'::text[]),
('Salted Peanuts (1 serving)', 'salted peanuts (1 serving)', 290, 13.2, 26.5, 8.8, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 64, '{Salted Peanuts,ఉప్పు చెనక్కాయ,Namkeen Moongphali}'::text[]);

-- MORE FRIED SNACKS
-- ============================================

INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Cheese Pakoda (1 piece)', 'cheese pakoda (1 piece)', 215, 9.5, 13.5, 16.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 56, '{Cheese Pakoda,చీస్ పకోడా,Paneer Pakoda}'::text[]),
('Mushroom Pakoda (1 piece)', 'mushroom pakoda (1 piece)', 145, 4.5, 8.5, 14.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 60, '{Mushroom Pakoda,మశ్రూమ్ పకోడా,Kukurmutta Pakoda}'::text[]),
('Chicken Pakoda (1 piece)', 'chicken pakoda (1 piece)', 265, 18.5, 16.5, 12.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 52, '{Chicken Pakoda,చికెన్ పకోడా,Murgh Pakoda}'::text[]),
('Fish Pakoda (1 piece)', 'fish pakoda (1 piece)', 195, 12.5, 11.5, 10.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 58, '{Fish Pakoda,ఫిష్ పకోడా,Meen Pakoda}'::text[]),
('Prawn Pakoda (1 piece)', 'prawn pakoda (1 piece)', 175, 14.5, 9.5, 9.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 60, '{Prawn Pakoda,ప్రావన్ పకోడా,Chemeen Pakoda}'::text[]),
('Egg Pakoda (1 piece)', 'egg pakoda (1 piece)', 155, 7.5, 10.5, 8.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 62, '{Egg Pakoda,ఎగ్ పకోడా,Anda Pakoda}'::text[]);

-- SPECIAL REGIONAL SNACKS
-- ============================================

INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Murukku (1 piece)', 'murukku (1 piece)', 85, 2.5, 4.5, 10.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 58, '{Murukku,మురుక్కు,Chakli}'::text[]),
('Thattai (1 piece)', 'thattai (1 piece)', 75, 2.0, 3.8, 9.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 60, '{Thattai,తత్తై,Nippattu}'::text[]),
('Kara Sev (1 serving)', 'kara sev (1 serving)', 485, 11.5, 28.5, 48.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 38, '{Kara Sev,కర సేవ్,Spicy Sev}'::text[]),
('Nimki (1 serving)', 'nimki (1 serving)', 425, 8.5, 22.5, 48.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 40, '{Nimki,నింకి,Nimki}'::text[]),
('Papdi (1 piece)', 'papdi (1 piece)', 25, 0.8, 1.2, 3.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 62, '{Papdi,పప్డి,Papad}'::text[]),
('Khari Puff (1 piece)', 'khari puff (1 piece)', 185, 4.5, 12.5, 18.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 46, '{Khari Puff,ఖారి పఫ్,Puff Pastry}'::text[]),
('Vegetable Puff (1 piece)', 'vegetable puff (1 piece)', 225, 5.5, 14.5, 22.0, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 44, '{Vegetable Puff,కూరగాయల పఫ్,Aloo Puff}'::text[]),
('Paneer Puff (1 piece)', 'paneer puff (1 piece)', 245, 8.5, 15.5, 23.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'yellow', 48, '{Paneer Puff,పనీర్ పఫ్,Cheese Puff}'::text[]),
('Chicken Puff (1 piece)', 'chicken puff (1 piece)', 285, 14.5, 18.5, 20.5, 'Indian Snacks Database', 'Snacks', 'India', 'Indian', 'red', 42, '{Chicken Puff,చికెన్ పఫ్,Murgh Puff}'::text[]);

-- VERIFICATION QUERY (run this after inserting to check results)
-- SELECT COUNT(*) as total_indian_snacks FROM food_nutrition WHERE data_source = 'Indian Snacks Database';
-- SELECT food_name, regional_names, calories, diabetic_rating FROM food_nutrition WHERE data_source = 'Indian Snacks Database' ORDER BY food_name LIMIT 20;

