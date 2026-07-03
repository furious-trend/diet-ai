export const regionalFoods = {
  south_india: {
    name: "South India (Karnataka, Andhra, etc.)",
    staples: ["Rice", "Ragi", "Millet", "Dosa / Idli"],
    wakeUp: [
      { food: "Warm water with lemon & chia seeds", portion: "1 glass", notes: "Metabolism booster" },
      { food: "Ragi malt (unsweetened)", portion: "1 small cup", notes: "High calcium, safe for diabetes" },
      { food: "Warm water with overnight soaked almonds (4-5 nos)", portion: "1 set", notes: "Healthy fats" }
    ],
    breakfast: [
      { food: "Steamed Idli with vegetable sambar & mint chutney", portion: "2 idlis", notes: "Fermented & easy to digest", restrictions: { avoid: ["high_glycemic"] } },
      { food: "Ragi Dosa (millet crepe) with coconut chutney", portion: "2 nos", notes: "Rich in fiber and calcium", therapeutic: ["diabetes_management", "weight_loss"] },
      { food: "Vegetable Upma (semolina/broken wheat)", portion: "1 plate", notes: "Load with carrots and beans", restrictions: { avoid: [] } },
      { food: "Millet Pesarattu (green gram crepe) with ginger ginger chutney", portion: "2 nos", notes: "Extremely high protein", therapeutic: ["weight_loss", "pcos_support", "muscle_gain"] }
    ],
    midMorning: [
      { food: "Spiced Buttermilk with curry leaves & ginger", portion: "1 glass", notes: "Probiotic, hydration", restrictions: { avoid: [] } },
      { food: "Tender Coconut Water", portion: "1 glass", notes: "Electrolyte rich", restrictions: { avoid: ["kidney_friendly_diet"] } },
      { food: "Fresh guava or pear fruit", portion: "1 serving", notes: "Low glycemic index, rich in fiber", therapeutic: ["diabetes_management"] }
    ],
    lunch: [
      { food: "Brown rice, mixed vegetable Sambar, cabbage Poriyal, and cow's milk Curd", portion: "1 cup rice, 1 cup dal, 1 cup veg", notes: "Well balanced local meal", restrictions: { avoid: [] } },
      { food: "Millet Rice, Keerai Kootu (spinach lentil), beans Poriyal, Rasam, & boiled egg whites (2 nos)", portion: "1 cup millet, 1 cup kootu, 2 whites", notes: "High protein and low carb", therapeutic: ["diabetes_management", "weight_loss", "thyroid_support"] },
      { food: "Boiled Quinoa, Sambar, stir-fried Ivy Gourd (Tindora), & stir-fried tofu", portion: "1 cup quinoa, 1 cup veg, 100g tofu", notes: "Vegan friendly, high protein", therapeutic: ["cholesterol", "heart_health"] }
    ],
    eveningSnack: [
      { food: "Sundal (boiled seasoned chickpeas/black chana)", portion: "1 small cup", notes: "Excellent protein & fiber", therapeutic: ["weight_loss", "pcos_support"] },
      { food: "Roasted Makhana (foxnuts) option", portion: "1 bowl", notes: "Low calorie, crispy", restrictions: { avoid: [] } },
      { food: "Mixed plain tree nuts (walnuts & almonds)", portion: "30g", notes: "Engine health, thyroid safety", therapeutic: ["thyroid_support", "heart_health"] }
    ],
    dinner: [
      { food: "Ragi Roti with cucumber raita & vegetable kurma", portion: "2 small rotis", notes: "Complex carbs for slow digestion", therapeutic: ["diabetes_management"] },
      { food: "Stir-fried paneer with bell peppers & steamed moong sprouts salad", portion: "1 plate (100g paneer)", notes: "Extremely low carb, high protein", therapeutic: ["diabetes_management", "weight_loss", "muscle_gain"] },
      { food: "Oats vegetable Khichdi with curd", portion: "1 bowl", notes: "Light and comforting bedtime meal", restrictions: { avoid: [] } }
    ],
    bedtime: [
      { food: "Warm turmeric golden milk (cow's milk or almond milk, no sugar)", portion: "1 small cup", notes: "Anti-inflammatory and promotes sleep", restrictions: { avoid: [] } },
      { food: "Chamomile herbal tea", portion: "1 cup", notes: "Excellent for sleep, digestion, and anxiety relief", restrictions: { avoid: [] } }
    ]
  },
  north_india: {
    name: "North India (Punjab, UP, Delhi, Rajasthan, etc.)",
    staples: ["Wheat / Roti", "Dal", "Chana & Rajma", "Curd / Paneer"],
    wakeUp: [
      { food: "Lukewarm water with organic ginger & lemon", portion: "1 glass", notes: "Good for joint pains and congestion" },
      { food: "Ajwain (carom water)", portion: "1 glass", notes: "Excellent for thyroid and digestion", therapeutic: ["thyroid_support"] }
    ],
    breakfast: [
      { food: "Besan Chilla (chickpea flour crepe) stuffed with grated paneer & mint chutney", portion: "2 crepes", notes: "High protein, gluten-free, low glycemic", therapeutic: ["diabetes_management", "weight_loss", "pcos_support"] },
      { food: "Vegetable Poha with roasted peanuts & lemon squeeze", portion: "1 plate", notes: "Light, iron-rich breakfast", restrictions: { avoid: [] } },
      { food: "Stuffed paneer multigrain paratha (cooked with olive/mustard oil) & curd", portion: "1 paratha, 1 cup curd", notes: "Limit butter, keep it healthy", restrictions: { avoid: ["weight_loss"] } },
      { food: "Oats vegetable porridge", portion: "1 bowl", notes: "Soluble fiber, lowers cholesterol", therapeutic: ["cholesterol", "heart_health"] }
    ],
    midMorning: [
      { food: "Fresh apple with a pinch of cinnamon powder", portion: "1 medium", notes: "Regulates blood glucose level", therapeutic: ["diabetes_management"] },
      { food: "Roasted chana (Bengal gram) with skin", portion: "1 handful", notes: "Fiber rich, keeps you full", restrictions: { avoid: [] } },
      { food: "Salted Lassi (buttermilk) with roasted cumin seeds", portion: "1 glass", notes: "Cooling and digestive aid", restrictions: { avoid: [] } }
    ],
    lunch: [
      { food: "Multigrain rotis (2), yellow Moong Dal, mixed vegetable dry sabzi (beans + carrot + peas), salad", portion: "2 rotis, 1 cup dal, 1 cup veg, 1 plate salad", notes: "Standard balanced dinner/lunch", restrictions: { avoid: [] } },
      { food: "Missi Roti (chana + wheat), Rajma gravy, Bhindi dry sabzi, cucumber onion salad", portion: "1 missi roti, 0.75 cup rajma, 1 cup veg", notes: "Proteins and complex carbs", therapeutic: ["diabetes_management"] },
      { food: "Brown Rice, grilled chicken breast (120g), mixed green salad, thin Dal Tadka", portion: "0.5 cup rice, 120g chicken, 1 cup dal", notes: "High lean protein, low carb", therapeutic: ["muscle_gain", "thyroid_support", "weight_loss"] }
    ],
    eveningSnack: [
      { food: "Sprouted Moong salad with cucumber, tomato & lemon juice", portion: "1 bowl", notes: "Rich in vitamin C & proteins", therapeutic: ["general_wellness", "thyroid_support"] },
      { food: "Clear double-extracted chicken or vegetable soup", portion: "1 bowl", notes: "Light hydration, warm", restrictions: { avoid: [] } },
      { food: "Handful of walnuts (4 halves) & almonds (5 almonds)", portion: "1 handful", notes: "Omega 3, supports thyroid hormone", therapeutic: ["thyroid_support", "heart_health"] }
    ],
    dinner: [
      { food: "Jowar (sorghum) roti (2), green vegetable Shahi Paneer (low grease), cooked beetroot salad", portion: "2 rotis, 1 cup paneer, 0.5 cup beetroot", notes: "Increases hemoglobin, high fiber", therapeutic: ["diabetes_management", "pregnancy_nutrition"] },
      { food: "Baked fish fillet (150g) with stir-fried broccoli, baby corn & mushrooms", portion: "1 plate", notes: "High heart-healthy fats & proteins", therapeutic: ["heart_health", "muscle_gain"] },
      { food: "Plain Daliya Khichdi (broken wheat) with green peas and curd", portion: "1 bowl", notes: "Easily digestible, fiber rich", restrictions: { avoid: [] } }
    ],
    bedtime: [
      { food: "Warm milk with a pinch of nutmeg powder", portion: "1 cup", notes: "Helps calm the nerves and induces sleep", restrictions: { avoid: [] } }
    ]
  },
  hyderabad: {
    name: "Hyderabad & Telangana",
    staples: ["Jowar Roti", "Millets", "Khichdi", "Bagara/Dalcha style (lighter)", "Chicken/Mutton"],
    wakeUp: [
      { food: "Warm mint-infused water", portion: "1 glass", notes: "Helps with acidity and gastric issues" },
      { food: "Fenugreek (Methi) seed water", portion: "1 glass", notes: "Overnight soaked, excellent for HbA1c control", therapeutic: ["diabetes_management"] }
    ],
    breakfast: [
      { food: "Millet Upma cooked with mint, peas, and green chilies", portion: "1 plate", notes: "Rich in magnesium and fiber", therapeutic: ["diabetes_management", "weight_loss"] },
      { food: "Jowar Flakes (Sorghum poha style) with peanuts & curry leaves", portion: "1 bowl", notes: "Low sugar index, high energy", restrictions: { avoid: [] } },
      { food: "Light Oats Khichdi with grated ginger & cracked black pepper", portion: "1 plate", notes: "Cholesterol reducing", therapeutic: ["cholesterol", "heart_health"] },
      { food: "Boiled eggs (2 whole) + multigrain toast (1 slice) with avocado", portion: "1 plate", notes: "High protein, healthy fats", therapeutic: ["muscle_gain", "pcos_support"] }
    ],
    midMorning: [
      { food: "Seasonal fruit slices (Jamun, papaya, or pomegranate)", portion: "1 cup", notes: "High antioxidants", restrictions: { avoid: [] } },
      { food: "Chaas (spiced buttermilk) with mint & coriander", portion: "1 glass", notes: "Prevents bloating", restrictions: { avoid: [] } }
    ],
    lunch: [
      { food: "Jowar Roti (2 nos), Kaddu ka Dalcha (split chana cooked with bottleneck gourd), boiled egg white (2 nos), salad", portion: "2 rotis, 1.5 cup dalcha", notes: "Excellent fiber and low-fat vegetarian dalcha", therapeutic: ["diabetes_management", "kidney_friendly_diet"] },
      { food: "Millet Rice (Korra Annam), Palak Pappu (spinach dal), stir-fried Snake Gourd (Potlakaya), grilled chicken breast", portion: "1 cup millet, 0.75 cup dal, 120g chicken", notes: "Locally inspired, fiber-dense", therapeutic: ["weight_loss", "pregnancy_nutrition"] },
      { food: "Broken wheat Khichdi with a bowl of roasted vegetable raita", portion: "1.5 cup khichdi", notes: "Low calorie comfort meal", restrictions: { avoid: [] } }
    ],
    eveningSnack: [
      { food: "Dry roasted chana dal or chickpea salad", portion: "0.5 cup", notes: "High protein snack", restrictions: { avoid: [] } },
      { food: "Handful of dried pumpkin seeds and almonds", portion: "20-30g", notes: "Rich in zinc and magnesium", therapeutic: ["pcos_support", "thyroid_support"] }
    ],
    dinner: [
      { food: "Jowar Roti (2 nos), Methi Chaman (fenugreek leaves with cottage cheese), boiled egg whites (2 nos)", portion: "2 rotis, 1 cup sabzi", notes: "Helps regulate blood sugar and hormone balance", therapeutic: ["pcos_support", "diabetes_management"] },
      { food: "Baked Salmon or grilled local murrel fish with roasted asparagus and carrots", portion: "150g fish, 1 cup veg", notes: "Rich in omega-3 fatty acids", therapeutic: ["heart_health", "thyroid_support"] },
      { food: "Warm chicken clear soup with shredded breast, ginger, cabbage, and mushrooms", portion: "2 bowls", notes: "Low carbohydrate, clean protein, hydrating", therapeutic: ["weight_loss"] }
    ],
    bedtime: [
      { food: "Warm almond milk with cardamom (no sugar)", portion: "1 cup", notes: "Calms brain and relaxes muscles", restrictions: { avoid: [] } }
    ]
  },
  kerala: {
    name: "Kerala",
    staples: ["Red Rice (Matta)", "Appam / Puttu", "Fish Curry (controlled oil)", "Coconut", "Thoran"],
    wakeUp: [
      { food: "Jeera (Cumin) water warm", portion: "1 glass", notes: "Speeds up digestion and detoxifies" }
    ],
    breakfast: [
      { food: "Oats / Ragi Puttu with legume curry (Kadala curry)", portion: "1 small cup puttu, 0.5 cup kadala", notes: "Switching white rice puttu to oats/ragi adds high fiber", therapeutic: ["cholesterol", "diabetes_management"] },
      { food: "Rava Idli with vegetable sambar & coconut chutney", portion: "2 idlis", notes: "Controlled coconut oil usage", restrictions: { avoid: [] } },
      { food: "Whole wheat Appam (2 nos) with egg curry cooked in light coconut milk", portion: "2 appams, 1 cup curry", notes: "High protein, traditional", restrictions: { avoid: ["weight_loss"] } }
    ],
    midMorning: [
      { food: "Buttermilk flavored with crushed ginger, shallots, and green chilies", portion: "1 glass", notes: "Traditional refreshing probiotic drink", restrictions: { avoid: [] } },
      { food: "A portion of cooked long yellow banana (Nendran) - steamed", portion: "1 small banana", notes: "Potassium rich", restrictions: { avoid: ["diabetes_management"] } }
    ],
    lunch: [
      { food: "Matta brown rice (limited portion), Ayila (mackerel) fish curry in clay pot (no oil fry), cabbage Thoran", portion: "0.5 cup matta rice, 1 cup cabbage cup kootu", notes: "Very rich in omega 3, low saturate fat", therapeutic: ["heart_health", "thyroid_support"] },
      { food: "Boiled Quinoa OR Broken wheat rice, Thoran (vegetable stir fry with limited grated coconut), yellow dal curry, salad", portion: "1 cup grain, 1 cup thoran, 0.75 cup dal", notes: "Fibre-dense vegan meal", restrictions: { avoid: [] } },
      { food: "Millet rice, Moru Curry (tempered buttermilk), boiled egg whites (3 nos), stir-fried Ivy Gourd (Kovakka)", portion: "1 cup millet, 1 cup kovakka, 3 whites", notes: "Lighter calorie layout", therapeutic: ["weight_loss", "diabetes_management"] }
    ],
    eveningSnack: [
      { food: "Boiled green gram (Cherupayru) seasoned with mustard & curry leaves", portion: "1 cup", notes: "High lean fiber, complex protein", therapeutic: ["pcos_support", "weight_loss"] },
      { food: "Roasted almonds and walnuts", portion: "30g", notes: "Great for cognitive health", restrictions: { avoid: [] } }
    ],
    dinner: [
      { food: "Wheat parotta (or wheat chapati) with chicken stew (no coconut milk cream, thin style)", portion: "2 chapatis, 1 cup stew", notes: "Keep it light with chicken and vegetables", restrictions: { avoid: [] } },
      { food: "Grilled Pomfret fish, steamed broccoli, cauliflower rice with stir-fried mushrooms", portion: "1 plate", notes: "Low glycemic index, rich in proteins", therapeutic: ["diabetes_management", "weight_loss", "muscle_gain"] },
      { food: "Kanji (broken red rice gruel) with green gram payaru and coconut chutney", portion: "1 bowl kanji", notes: "Digestive rest option, high comfort", restrictions: { avoid: ["diabetes_management"] } }
    ],
    bedtime: [
      { food: "Warm green cardamom milk", portion: "1 cup", notes: "Relieves indigestion, soothing", restrictions: { avoid: [] } }
    ]
  },
  tamil_nadu: {
    name: "Tamil Nadu",
    staples: ["Idli / Dosa", "Sambar", "Keerai (Spinach)", "Millet Dosa", "Kootu / Rasam", "Rice"],
    wakeUp: [
      { food: "Lukewarm water with coriander seeds (Dhania) infusion", portion: "1 glass", notes: "Excellent for thyroid regulation", therapeutic: ["thyroid_support"] }
    ],
    breakfast: [
      { food: "Ragi Dosa (or Millet Kambu Dosa) with mint & tomato chutney", portion: "2 nos", notes: "High calcium, slow sugar release", therapeutic: ["diabetes_management", "thyroid_support"] },
      { food: "Steamed Idli with sambar (with lots of drumstick, pumpkin, carrot)", portion: "3 idlis", notes: "Fiber rich sambar balances grain", restrictions: { avoid: [] } },
      { food: "Kuthiraivali (Barnyard millet) Pongal with sambar & small portion of chutney", portion: "1 plate", notes: "Healthy, gluten free, low sugar", therapeutic: ["weight_loss"] }
    ],
    midMorning: [
      { food: "Neer Mor (diluted spiced buttermilk with asafoetida & curry leaves)", portion: "1 glass", notes: "Digestion activator, cooling", restrictions: { avoid: [] } },
      { food: "Fresh sweet lime or orange juice (no sugar)", portion: "1 cup", notes: "High vitamin C, boosts iron absorption", therapeutic: ["general_wellness"] }
    ],
    lunch: [
      { food: "Limit White or Brown rice, Keerai Kootu (spinach stew with lentils), Carrot Poriyal, Rasam", portion: "1 cup rice, 1 cup kootu, 1 cup poriyal", notes: "Highly alkalizing, rich in vitamins", restrictions: { avoid: [] } },
      { food: "Millet rice, Kudamilagai (Capsicum) dry sabzi, Sambhar dal, boiled egg whites (2 nos)", portion: "1 cup millet, 1 cup capsicum, 1 cup sambar", notes: "Protein and micronutrient loaded", therapeutic: ["diabetes_management", "pcos_support"] },
      { food: "Samai (Little millet) curd rice, stir-fried beans, double boiled roasted turkey slice or chicken breast", portion: "1 cup curd millet, 1 cup beans", notes: "Low scale, soothing and cooling", therapeutic: ["cholesterol", "heart_health"] }
    ],
    eveningSnack: [
      { food: "Roasted chickpeas (Kondakadalai sundal)", portion: "1 small cup", notes: "Vegetarian high protein", therapeutic: ["diabetes_management", "weight_loss"] },
      { food: "Spiced boiled peanuts", portion: "1 small cup", notes: "Lecithin & polyunsaturated fats", restrictions: { avoid: ["weight_loss"] } }
    ],
    dinner: [
      { food: "Oats idli (2 nos) or wheat dosa (2 nos) with onion tomato chutney and small pumpkin kootu", portion: "2 dosas", notes: "Light calorie count, high fiber", therapeutic: ["diabetes_management", "weight_loss"] },
      { food: "Paneer & grilled capsicum cubes sautéed with green herbs, served with small cucumber raita", portion: "1 plate", notes: "Low-carb protein option", therapeutic: ["muscle_gain", "pcos_support"] }
    ],
    bedtime: [
      { food: "Warm milk with ashwagandha powder", portion: "1 cup", notes: "Supports cortisol reduction & thyroid helper", therapeutic: ["thyroid_support", "pcos_support"] }
    ]
  },
  global: {
    name: "Global / Western Staples",
    staples: ["Oats", "Bread", "Brown Rice", "Quinoa", "Sweet Potato", "Grilled Protein"],
    wakeUp: [
      { food: "Warm lemon water with a dash of honey", portion: "1 glass", notes: "Standard digestive rinse" },
      { food: "Green tea with unsweetened fresh mint leaves", portion: "1 cup", notes: "Antioxidant booster" }
    ],
    breakfast: [
      { food: "Steel-cut oatmeal cooked in skimmed milk, topped with chia seeds & strawberries", portion: "1 bowl", notes: "Rich in beta-glucans, lowers cholesterol", therapeutic: ["cholesterol", "heart_health", "diabetes_management"] },
      { food: "Scrambled egg whites (3 nos) with sautéed spinach and cherry tomatoes, 1 slice whole-wheat toast", portion: "1 plate", notes: "Lean protein, vitamins", therapeutic: ["weight_loss", "muscle_gain"] },
      { food: "Smashed avocado toast on sourdough bread with a sprinkle of chia seeds", portion: "1 slice toast", notes: "Healthy monounsaturated fat", therapeutic: ["pcos_support"] }
    ],
    midMorning: [
      { food: "Low-fat Greek yogurt (plain) with a sprinkle of blueberries", portion: "1 cup", notes: "High protein, calcium", therapeutic: ["muscle_gain", "pregnancy_nutrition"] },
      { food: "Celery sticks with a tablespoon of natural peanut butter", portion: "4 sticks, 1 tbsp", notes: "Satisfying snack", restrictions: { avoid: ["weight_loss"] } }
    ],
    lunch: [
      { food: "Baked chicken breast (150g), roasted sweet potato, steamed kale or green beans", portion: "150g chicken, 1 medium sweet potato", notes: "Standard bodybuilder/physique plan", therapeutic: ["muscle_gain", "weight_loss"] },
      { food: "Quinoa salad with cherry tomatoes, cucumbers, feta cheese (low fat), olives, and chickpeas", portion: "1.5 cup salad", notes: "Low GI vegetarian protein profile", therapeutic: ["diabetes_management", "heart_health"] },
      { food: "Grilled Tofu (150g), steam asparagus, cauliflower mash, raw leafy spinach salad", portion: "1 plate", notes: "Low carb, vegan safe, liver support", therapeutic: ["diabetes_management", "cholesterol"] }
    ],
    eveningSnack: [
      { food: "Mixed fresh raw berries (blueberries, raspberries, blackberries)", portion: "1 cup", notes: "Anti-aging antioxidants", restrictions: { avoid: [] } },
      { food: "Unsalted raw almonds", portion: "30g", notes: "Easy portable healthy fat option", restrictions: { avoid: [] } }
    ],
    dinner: [
      { food: "Seared Salmon fillet (150g), sautéed broccolini in olive oil, green vegetable garden salad", portion: "1 plate", notes: "Highly brain/heart active omega-3", therapeutic: ["heart_health", "thyroid_support", "pcos_support"] },
      { food: "Baked Turkey meatballs, spiralized zucchini noodles (Zoodles) cooked in light marinara sauce", portion: "1 plate", notes: "Low-calorie, low-carbohydrate protein dinner", therapeutic: ["weight_loss"] },
      { food: "Chunky Lentil and Vegetable Soup with a slice of barley bread", portion: "1 large bowl", notes: "Comforting, high fiber", restrictions: { avoid: [] } }
    ],
    bedtime: [
      { food: "Chamomile tea with a drop of lemon juice", portion: "1 cup", notes: "Naturally relaxing, no stimulants", restrictions: { avoid: [] } }
    ]
  }
};
