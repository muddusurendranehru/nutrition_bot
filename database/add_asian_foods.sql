-- ============================================
-- ADD 100 ASIAN FOODS TO FOOD_NUTRITION TABLE
-- Local Names (Telugu/Regional) + English Names
-- FIXED VERSION - Correct Array Syntax
-- ============================================
-- 
-- Format: English Name (Local Name)
-- Example: Wood Apple (Velakkaya)
--          Jamun (Neredipandu)
--          Jackfruit (Panasapandu)
--          Peanuts (Chenakkaya)
--
-- Usage: Copy this entire file and paste into Neon SQL Editor, then Execute
-- ============================================

-- INDIAN FRUITS (Telugu + English Names)
-- ============================================

INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
-- Wood Apple & Related
('Wood Apple (Velakkaya)', 'wood apple (velakkaya)', 140, 1.8, 0.6, 31.8, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'green', 75, '{Velakkaya,వెలక్కాయ,Bael Fruit}'::text[]),
('Wood Apple Juice (Velakkaya Rasam)', 'wood apple juice (velakkaya rasam)', 60, 0.5, 0.2, 14.2, 'Asian Foods Database', 'Beverages', 'India', 'Indian', 'green', 70, '{Velakkaya Rasam,వెలక్కాయ రసం}'::text[]),
('Dragon Fruit (Kamalam)', 'dragon fruit (kamalam)', 60, 1.2, 0.4, 13.0, 'Asian Foods Database', 'Fruits', 'China', 'Chinese', 'green', 80, '{Kamalam,कमलम,Pitaya}'::text[]),
('Jamun (Neredipandu)', 'jamun (neredipandu)', 62, 0.7, 0.2, 14.0, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'green', 85, '{Neredipandu,నెరెడిపండు,Java Plum,Black Plum}'::text[]),
('Jackfruit (Panasa Pandu)', 'jackfruit (panasa pandu)', 95, 1.5, 0.3, 23.0, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'yellow', 65, '{Panasapandu,పనసపండు,Kathal}'::text[]),
('Peanuts (Chenakkaya)', 'peanuts (chenakkaya)', 567, 25.8, 49.2, 16.1, 'Asian Foods Database', 'Nuts', 'India', 'Indian', 'yellow', 70, '{Chenakkaya,చెనక్కాయ,Groundnut,Mungphali}'::text[]),
('Roasted Peanuts (Vepudu Chenakkaya)', 'roasted peanuts (vepudu chenakkaya)', 600, 26.0, 52.0, 16.5, 'Asian Foods Database', 'Nuts', 'India', 'Indian', 'yellow', 65, '{Vepudu Chenakkaya,వేపుడు చెనక్కాయ}'::text[]),
-- Common Indian Fruits
('Mango (Mamidipandu)', 'mango (mamidipandu)', 60, 0.8, 0.4, 15.0, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'yellow', 70, '{Mamidipandu,మామిడిపండు,Aam}'::text[]),
('Guava (Jama Pandu)', 'guava (jama pandu)', 68, 2.6, 0.9, 14.3, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'green', 85, '{Jama Pandu,జామ పండు,Amrud,Peru}'::text[]),
('Pomegranate (Danimma Pandu)', 'pomegranate (danimma pandu)', 83, 1.7, 1.2, 18.7, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'green', 90, '{Danimma Pandu,దానిమ్మ పండు,Anar}'::text[]),
('Sapota (Chikku)', 'sapota (chikku)', 83, 0.4, 1.1, 19.9, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'yellow', 65, '{Chikku,చిక్కు,Sapodilla}'::text[]),
('Custard Apple (Seethaphal)', 'custard apple (seethaphal)', 94, 1.7, 0.6, 23.6, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'yellow', 70, '{Seethaphal,సీతాఫల్,Sitaphal,Sharifa}'::text[]),
('Papaya (Boppayi)', 'papaya (boppayi)', 43, 0.5, 0.3, 10.8, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'green', 85, '{Boppayi,బొప్పాయి,Papita}'::text[]),
('Banana (Arati Pandu)', 'banana (arati pandu)', 89, 1.1, 0.3, 22.8, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'yellow', 60, '{Arati Pandu,అరటి పండు,Kela}'::text[]),
('Watermelon (Puchakaya)', 'watermelon (puchakaya)', 30, 0.6, 0.2, 7.6, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'green', 90, '{Puchakaya,పుచ్చకాయ,Tarbooz}'::text[]),
('Muskmelon (Kharbooja)', 'muskmelon (kharbooja)', 34, 0.8, 0.2, 8.2, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'green', 85, '{Kharbooja,ఖర్బూజ,Cantaloupe}'::text[]),
('Orange (Kamala Pandu)', 'orange (kamala pandu)', 47, 0.9, 0.1, 11.8, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'green', 80, '{Kamala Pandu,కమల పండు,Santra}'::text[]),
('Sweet Lime (Mosambi)', 'sweet lime (mosambi)', 43, 0.7, 0.2, 10.4, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'green', 80, '{Mosambi,మోసంబి,Mousambi}'::text[]),
('Grapes (Draksha)', 'grapes (draksha)', 69, 0.7, 0.2, 18.0, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'yellow', 70, '{Draksha,ద్రాక్ష,Angur}'::text[]),
('Pineapple (Ananas)', 'pineapple (ananas)', 50, 0.5, 0.1, 13.1, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'yellow', 75, '{Ananas,అననాస్,Anarosh}'::text[]);

-- INDIAN VEGETABLES (Telugu + English Names)
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Drumstick (Munagakaya)', 'drumstick (munagakaya)', 37, 2.1, 0.2, 8.5, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 90, '{Munagakaya,మునగకాయ,Moringa,Sahjan}'::text[]),
('Okra (Bendakaya)', 'okra (bendakaya)', 33, 2.0, 0.2, 7.0, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 85, '{Bendakaya,బెండకాయ,Bhindi,Ladies Finger}'::text[]),
('Brinjal (Vankaya)', 'brinjal (vankaya)', 25, 1.0, 0.2, 5.9, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 80, '{Vankaya,వంకాయ,Baingan,Eggplant}'::text[]),
('Ridge Gourd (Beerakaya)', 'ridge gourd (beerakaya)', 14, 0.5, 0.1, 3.4, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 95, '{Beerakaya,బీరకాయ,Turai,Tori}'::text[]),
('Snake Gourd (Potlakaya)', 'snake gourd (potlakaya)', 17, 0.5, 0.1, 3.9, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 95, '{Potlakaya,పొట్లకాయ,Chichinda,Padwal}'::text[]),
('Bottle Gourd (Sorakaya)', 'bottle gourd (sorakaya)', 15, 0.6, 0.1, 3.4, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 95, '{Sorakaya,సొరకాయ,Lauki,Dudhi}'::text[]),
('Ash Gourd (Boodidha Gummadi)', 'ash gourd (boodidha gummadi)', 13, 0.4, 0.1, 3.0, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 95, '{Boodidha Gummadi,బూడిధ గుమ్మడి,Petha,White Pumpkin}'::text[]),
('Pointed Gourd (Dondakaya)', 'pointed gourd (dondakaya)', 20, 1.2, 0.1, 4.3, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 90, '{Dondakaya,దొండకాయ,Parwal}'::text[]),
('Ivy Gourd (Dondakaya)', 'ivy gourd (dondakaya)', 18, 1.0, 0.1, 4.0, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 90, '{Dondakaya,దొండకాయ,Tindora,Tendli}'::text[]),
('Bitter Gourd (Kakarakaya)', 'bitter gourd (kakarakaya)', 17, 1.0, 0.2, 3.7, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 95, '{Kakarakaya,కాకరకాయ,Karela,Bitter Melon}'::text[]),
('Sponge Gourd (Nethi Beerakaya)', 'sponge gourd (nethi beerakaya)', 20, 0.6, 0.2, 4.4, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 90, '{Nethi Beerakaya,నేతి బీరకాయ,Ghia Tori}'::text[]),
('Tomato (Tamata)', 'tomato (tamata)', 18, 0.9, 0.2, 3.9, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 85, '{Tamata,టమాటా,Tamatar}'::text[]),
('Chili (Mirapakaya)', 'chili (mirapakaya)', 40, 2.0, 0.2, 9.5, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 75, '{Mirapakaya,మిరపకాయ,Mirch}'::text[]),
('Bell Pepper (Capsicum)', 'bell pepper (capsicum)', 31, 1.0, 0.3, 7.0, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 85, '{Capsicum,క్యాప్సికమ్,Shimla Mirch}'::text[]),
('Cucumber (Dosakaya)', 'cucumber (dosakaya)', 16, 0.7, 0.1, 3.6, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 95, '{Dosakaya,దోసకాయ,Kheera,Kakdi}'::text[]),
('Radish (Mullangi)', 'radish (mullangi)', 16, 0.7, 0.1, 3.4, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 90, '{Mullangi,ముల్లంగి,Mooli}'::text[]),
('Carrot (Gajar)', 'carrot (gajar)', 41, 0.9, 0.2, 9.6, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 85, '{Gajar,గజార్,Carrot}'::text[]),
('Cabbage (Cabbage)', 'cabbage (cabbage)', 25, 1.3, 0.1, 5.8, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 90, '{Cabbage,క్యాబేజ్,Band Gobi,Patta Gobi}'::text[]),
('Cauliflower (Gobi)', 'cauliflower (gobi)', 25, 1.9, 0.3, 4.9, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 85, '{Gobi,గోబీ,Phool Gobi}'::text[]),
('Ladies Finger (Bendakaya)', 'ladies finger (bendakaya)', 33, 2.0, 0.2, 7.0, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 85, '{Bendakaya,బెండకాయ,Bhindi}'::text[]),
('Cluster Beans (Goru Chikkudu)', 'cluster beans (goru chikkudu)', 16, 3.0, 0.4, 10.0, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 90, '{Goru Chikkudu,గోరు చిక్కుడు,Gavar}'::text[]),
('French Beans (Chikkudu)', 'french beans (chikkudu)', 31, 1.8, 0.2, 7.0, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 85, '{Chikkudu,చిక్కుడు,Green Beans,Fansi}'::text[]),
('Cowpeas (Alasandalu)', 'cowpeas (alasandalu)', 116, 7.0, 0.5, 20.8, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 80, '{Alasandalu,అలసందలు,Lobia,Black Eyed Peas}'::text[]),
('Yard Long Beans (Chilakada Anapa)', 'yard long beans (chilakada anapa)', 47, 2.8, 0.4, 8.4, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 85, '{Chilakada Anapa,చిలకడ అనప,Asparagus Beans}'::text[]);

-- CHINESE FRUITS & VEGETABLES
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Lychee (Litchi)', 'lychee (litchi)', 66, 0.8, 0.4, 16.5, 'Asian Foods Database', 'Fruits', 'China', 'Chinese', 'yellow', 70, '{Litchi,荔枝,Leechee}'::text[]),
('Longan (Longyan)', 'longan (longyan)', 60, 1.3, 0.1, 15.1, 'Asian Foods Database', 'Fruits', 'China', 'Chinese', 'yellow', 70, '{Longyan,龙眼,Dragon Eye}'::text[]),
('Rambutan', 'rambutan', 82, 0.7, 0.2, 20.9, 'Asian Foods Database', 'Fruits', 'China', 'Chinese', 'yellow', 70, '{Rambutan,红毛丹}'::text[]),
('Mangosteen', 'mangosteen', 73, 0.4, 0.6, 17.9, 'Asian Foods Database', 'Fruits', 'China', 'Chinese', 'green', 75, '{Mangosteen,山竹}'::text[]),
('Star Fruit (Carambola)', 'star fruit (carambola)', 31, 1.0, 0.3, 6.7, 'Asian Foods Database', 'Fruits', 'China', 'Chinese', 'green', 80, '{Carambola,杨桃,Star Apple}'::text[]),
('Persimmon (Sharon Fruit)', 'persimmon (sharon fruit)', 70, 0.6, 0.2, 18.6, 'Asian Foods Database', 'Fruits', 'China', 'Chinese', 'yellow', 70, '{Sharon Fruit,柿子}'::text[]),
('Jujube (Chinese Date)', 'jujube (chinese date)', 79, 1.2, 0.2, 20.2, 'Asian Foods Database', 'Fruits', 'China', 'Chinese', 'yellow', 65, '{Chinese Date,枣,Ber}'::text[]),
('Bok Choy (Pak Choi)', 'bok choy (pak choi)', 13, 1.5, 0.2, 2.2, 'Asian Foods Database', 'Vegetables', 'China', 'Chinese', 'green', 95, '{Pak Choi,白菜,Chinese Cabbage}'::text[]),
('Chinese Cabbage (Napa)', 'chinese cabbage (napa)', 16, 1.2, 0.2, 3.2, 'Asian Foods Database', 'Vegetables', 'China', 'Chinese', 'green', 95, '{Napa,大白菜}'::text[]),
('Chinese Broccoli (Gai Lan)', 'chinese broccoli (gai lan)', 24, 2.8, 0.4, 3.4, 'Asian Foods Database', 'Vegetables', 'China', 'Chinese', 'green', 90, '{Gai Lan,芥兰}'::text[]),
('Water Spinach (Kangkong)', 'water spinach (kangkong)', 19, 2.6, 0.2, 2.9, 'Asian Foods Database', 'Vegetables', 'China', 'Chinese', 'green', 95, '{Kangkong,空心菜}'::text[]),
('Chinese Long Beans', 'chinese long beans', 47, 2.8, 0.4, 8.4, 'Asian Foods Database', 'Vegetables', 'China', 'Chinese', 'green', 85, '{Long Beans,长豆角}'::text[]),
('Chinese Eggplant', 'chinese eggplant', 25, 1.0, 0.2, 5.9, 'Asian Foods Database', 'Vegetables', 'China', 'Chinese', 'green', 80, '{Chinese Eggplant,茄子}'::text[]),
('Bitter Melon (Chinese)', 'bitter melon (chinese)', 17, 1.0, 0.2, 3.7, 'Asian Foods Database', 'Vegetables', 'China', 'Chinese', 'green', 95, '{Chinese Bitter Melon,苦瓜}'::text[]),
('Winter Melon (Dong Gua)', 'winter melon (dong gua)', 13, 0.4, 0.0, 3.0, 'Asian Foods Database', 'Vegetables', 'China', 'Chinese', 'green', 95, '{Dong Gua,冬瓜}'::text[]),
('Lotus Root (Lian Ou)', 'lotus root (lian ou)', 74, 2.6, 0.1, 17.2, 'Asian Foods Database', 'Vegetables', 'China', 'Chinese', 'yellow', 70, '{Lian Ou,莲藕}'::text[]),
('Water Chestnut', 'water chestnut', 97, 1.4, 0.1, 23.9, 'Asian Foods Database', 'Vegetables', 'China', 'Chinese', 'yellow', 75, '{Water Chestnut,马蹄}'::text[]),
('Bamboo Shoots', 'bamboo shoots', 27, 2.6, 0.3, 5.2, 'Asian Foods Database', 'Vegetables', 'China', 'Chinese', 'green', 90, '{Bamboo Shoots,竹笋}'::text[]),
('Snow Peas', 'snow peas', 42, 2.8, 0.2, 7.6, 'Asian Foods Database', 'Vegetables', 'China', 'Chinese', 'green', 85, '{Snow Peas,豌豆}'::text[]),
('Shanghai Bok Choy', 'shanghai bok choy', 13, 1.5, 0.2, 2.2, 'Asian Foods Database', 'Vegetables', 'China', 'Chinese', 'green', 95, '{Shanghai Bok Choy,上海白菜}'::text[]);

-- TRADITIONAL INDIAN DISHES (Telugu Names)
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Idli (2 pieces)', 'idli (2 pieces)', 128, 4.2, 1.0, 25.0, 'Asian Foods Database', 'Breakfast', 'India', 'Indian', 'green', 85, '{Idli,ఇడ్లి,Idly}'::text[]),
('Dosa (Plain)', 'dosa (plain)', 198, 4.0, 6.0, 30.0, 'Asian Foods Database', 'Breakfast', 'India', 'Indian', 'yellow', 70, '{Dosa,దోస,Masala Dosa}'::text[]),
('Upma (Rava Upma)', 'upma (rava upma)', 240, 6.0, 8.0, 38.0, 'Asian Foods Database', 'Breakfast', 'India', 'Indian', 'yellow', 65, '{Upma,ఉప్మా,Uppittu}'::text[]),
('Pongal (Ven Pongal)', 'pongal (ven pongal)', 180, 4.5, 4.0, 32.0, 'Asian Foods Database', 'Breakfast', 'India', 'Indian', 'yellow', 70, '{Ven Pongal,వెన్ పొంగల్,Khara Pongal}'::text[]),
('Sambar (100ml)', 'sambar (100ml)', 35, 1.2, 1.0, 5.0, 'Asian Foods Database', 'Curry', 'India', 'Indian', 'green', 80, '{Sambar,సాంబార్,Sambhar}'::text[]),
('Rasam (100ml)', 'rasam (100ml)', 25, 0.8, 0.5, 4.0, 'Asian Foods Database', 'Soup', 'India', 'Indian', 'green', 85, '{Rasam,రసం,Saaru}'::text[]),
('Curd Rice (Perugu Annam)', 'curd rice (perugu annam)', 195, 4.5, 3.5, 36.0, 'Asian Foods Database', 'Lunch', 'India', 'Indian', 'yellow', 70, '{Perugu Annam,పెరుగు అన్నం,Thayir Sadam}'::text[]),
('Tamarind Rice (Pulihora)', 'tamarind rice (pulihora)', 280, 4.8, 8.5, 48.0, 'Asian Foods Database', 'Lunch', 'India', 'Indian', 'yellow', 65, '{Pulihora,పులిహోర,Puliyogare}'::text[]),
('Lemon Rice (Nimmakaya Annam)', 'lemon rice (nimmakaya annam)', 265, 4.5, 7.0, 46.0, 'Asian Foods Database', 'Lunch', 'India', 'Indian', 'yellow', 70, '{Nimmakaya Annam,నిమ్మకాయ అన్నం,Chitrannam}'::text[]),
('Coconut Rice (Kobbari Annam)', 'coconut rice (kobbari annam)', 310, 5.0, 12.0, 48.0, 'Asian Foods Database', 'Lunch', 'India', 'Indian', 'yellow', 60, '{Kobbari Annam,కొబ్బరి అన్నం}'::text[]),
('Biryani (Chicken)', 'biryani (chicken)', 350, 18.0, 12.0, 45.0, 'Asian Foods Database', 'Lunch', 'India', 'Indian', 'yellow', 60, '{Biryani,బిర్యాని}'::text[]),
('Hyderabadi Biryani', 'hyderabadi biryani', 380, 20.0, 15.0, 48.0, 'Asian Foods Database', 'Lunch', 'India', 'Indian', 'yellow', 58, '{Hyderabadi Biryani,హైదరాబాది బిర్యాని}'::text[]),
('Dal (Lentil Curry)', 'dal (lentil curry)', 120, 7.0, 3.0, 18.0, 'Asian Foods Database', 'Curry', 'India', 'Indian', 'green', 80, '{Dal,దాల్,Pappu}'::text[]),
('Dal Fry (Vepudu Pappu)', 'dal fry (vepudu pappu)', 140, 7.5, 5.0, 18.0, 'Asian Foods Database', 'Curry', 'India', 'Indian', 'green', 75, '{Vepudu Pappu,వేపుడు పప్పు}'::text[]),
('Rajma (Red Kidney Beans)', 'rajma (red kidney beans)', 127, 8.7, 0.5, 22.8, 'Asian Foods Database', 'Curry', 'India', 'Indian', 'green', 80, '{Rajma,రాజ్మ,Rajmah}'::text[]),
('Chole (Chickpeas Curry)', 'chole (chickpeas curry)', 164, 8.9, 2.6, 27.4, 'Asian Foods Database', 'Curry', 'India', 'Indian', 'green', 80, '{Chole,చోలే,Chana Masala}'::text[]);

-- MORE INDIAN VEGETABLES & LEGUMES
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Raw Mango (Kachha Aam)', 'raw mango (kachha aam)', 60, 0.5, 0.3, 15.0, 'Asian Foods Database', 'Fruits', 'India', 'Indian', 'yellow', 70, '{Kachha Aam,కచ్చ ఆం,Kairi}'::text[]),
('Raw Banana (Arati Kaya)', 'raw banana (arati kaya)', 89, 1.1, 0.3, 22.8, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'yellow', 65, '{Arati Kaya,అరటి కాయ,Kaccha Kela}'::text[]),
('Plantain (Balasankari)', 'plantain (balasankari)', 122, 1.3, 0.4, 31.9, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'yellow', 60, '{Balasankari,బాలశంకరి,Nendran}'::text[]),
('Taro Root (Chamadumpa)', 'taro root (chamadumpa)', 112, 1.5, 0.2, 26.5, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'yellow', 70, '{Chamadumpa,చమదుంప,Arbi,Colocasia}'::text[]),
('Sweet Potato (Chilakada Dumpa)', 'sweet potato (chilakada dumpa)', 86, 1.6, 0.1, 20.1, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'yellow', 75, '{Chilakada Dumpa,చిలకడ దుంప,Shakarkandi,Ratale}'::text[]),
('Elephant Foot Yam (Kandagadda)', 'elephant foot yam (kandagadda)', 97, 1.5, 0.2, 23.0, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'yellow', 70, '{Kandagadda,కందగడ్డ,Suran,Jimikand}'::text[]),
('Colocasia Leaves (Chamagadda Aaku)', 'colocasia leaves (chamagadda aaku)', 42, 4.9, 0.7, 6.7, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 85, '{Chamagadda Aaku,చమగడ్డ ఆకు,Arbi Ke Patte}'::text[]),
('Mint Leaves (Pudina)', 'mint leaves (pudina)', 44, 3.8, 0.9, 8.4, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 90, '{Pudina,పుదిన,Pudhina}'::text[]),
('Coriander Leaves (Kothimeera)', 'coriander leaves (kothimeera)', 23, 2.1, 0.5, 3.7, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 95, '{Kothimeera,కోథిమీర,Dhaniya}'::text[]),
('Curry Leaves (Karivepaku)', 'curry leaves (karivepaku)', 108, 6.1, 1.0, 18.7, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 85, '{Karivepaku,కరివేపాకు,Kadi Patta}'::text[]),
('Fenugreek Leaves (Menthikura)', 'fenugreek leaves (menthikura)', 49, 4.4, 0.9, 6.0, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 90, '{Menthikura,మెంతికూర,Methi}'::text[]),
('Spinach (Palakura)', 'spinach (palakura)', 23, 2.9, 0.4, 3.6, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 95, '{Palakura,పాలకూర,Palak}'::text[]),
('Amaranth Leaves (Thotakura)', 'amaranth leaves (thotakura)', 23, 2.5, 0.3, 4.0, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 95, '{Thotakura,తోటకూర,Chaulai}'::text[]),
('Malabar Spinach (Bachalakura)', 'malabar spinach (bachalakura)', 19, 1.8, 0.3, 3.4, 'Asian Foods Database', 'Vegetables', 'India', 'Indian', 'green', 95, '{Bachalakura,బచ్చలకూర,Poi}'::text[]);

-- SPICES & CONDIMENTS
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score, regional_names) VALUES
('Turmeric (Pasupu)', 'turmeric (pasupu)', 354, 7.8, 9.9, 64.9, 'Asian Foods Database', 'Spices', 'India', 'Indian', 'green', 80, '{Pasupu,పసుపు,Haldi}'::text[]),
('Cumin Seeds (Jeelakarra)', 'cumin seeds (jeelakarra)', 375, 17.8, 22.3, 44.2, 'Asian Foods Database', 'Spices', 'India', 'Indian', 'green', 75, '{Jeelakarra,జీలకర్ర,Jeera}'::text[]),
('Coriander Seeds (Dhaniyalu)', 'coriander seeds (dhaniyalu)', 298, 12.4, 17.8, 54.9, 'Asian Foods Database', 'Spices', 'India', 'Indian', 'green', 80, '{Dhaniyalu,ధనియలు,Dhania}'::text[]),
('Mustard Seeds (Aavalu)', 'mustard seeds (aavalu)', 508, 26.1, 36.2, 28.1, 'Asian Foods Database', 'Spices', 'India', 'Indian', 'green', 70, '{Aavalu,ఆవలు,Rai}'::text[]),
('Fenugreek Seeds (Menthulu)', 'fenugreek seeds (menthulu)', 323, 23.0, 6.4, 58.4, 'Asian Foods Database', 'Spices', 'India', 'Indian', 'green', 85, '{Menthulu,మెంతులు,Methi Dana}'::text[]),
('Sesame Seeds (Nuvvulu)', 'sesame seeds (nuvvulu)', 573, 17.7, 49.7, 23.4, 'Asian Foods Database', 'Nuts', 'India', 'Indian', 'yellow', 65, '{Nuvvulu,నువ్వులు,Til}'::text[]),
('Poppy Seeds (Gasagasalu)', 'poppy seeds (gasagasalu)', 525, 18.0, 41.6, 28.1, 'Asian Foods Database', 'Spices', 'India', 'Indian', 'yellow', 60, '{Gasagasalu,గసగసాల,Khus Khus}'::text[]);

-- Verification Query (run this after inserting to check results)
-- SELECT COUNT(*) as total_asian_foods FROM food_nutrition WHERE data_source = 'Asian Foods Database';
-- SELECT food_name, regional_names, country FROM food_nutrition WHERE data_source = 'Asian Foods Database' ORDER BY country, food_name LIMIT 20;

