const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let userGoals = {};
let userDietPlans = {};

//hello world
app.get('/', (req, res) => {
  res.send('Hello World!!!!!!!!!');
});


const foodInfo = {
  "ovaz": { calories: 150, info: "Ovăzul este bogat în fibre și ajută la menținerea senzației de sațietate.", equivalent: ["muesli", "cereale integrale"] },
  "fructe": { calories: 60, info: "Fructele sunt o sursă excelentă de vitamine și antioxidanți.", equivalent: ["legume proaspete", "smoothie"] },
  "salata cu pui la gratar": { calories: 350, info: "Salata cu pui la grătar este bogată în proteine și fibre.", equivalent: ["salată cu tofu", "salată cu ton"] },
  "quinoa": { calories: 222, info: "Quinoa este o sursă completă de proteine și este bogată în fibre.", equivalent: ["orez brun", "couscous"] },
  "legume": { calories: 50, info: "Legumele sunt sărace în calorii și bogate în vitamine și minerale.", equivalent: ["fructe proaspete", "legume aburite"] },
  "smoothie cu spanac si banane": { calories: 200, info: "Smoothie-ul cu spanac și banane este o sursă bună de vitamine și fibre.", equivalent: ["smoothie cu kale și mango", "smoothie cu fructe de pădure"] },
  "supa de legume": { calories: 100, info: "Supa de legume este săracă în calorii și bogată în nutrienți.", equivalent: ["supă de pui", "supă de linte"] },
  "pui la cuptor cu broccoli": { calories: 300, info: "Puiul la cuptor cu broccoli este o masă echilibrată, bogată în proteine și fibre.", equivalent: ["curcan la cuptor cu sparanghel", "vită la cuptor cu legume"] },
  "iaurt grecesc cu fructe": { calories: 150, info: "Iaurtul grecesc cu fructe este bogat în proteine și probiotice.", equivalent: ["iaurt de cocos cu fructe", "iaurt de soia cu fructe"] },
  "wrap de pui cu legume": { calories: 250, info: "Wrap-ul de pui cu legume este o masă ușoară și echilibrată.", equivalent: ["wrap cu tofu", "wrap cu curcan"] },
  "somon la gratar cu sparanghel": { calories: 350, info: "Somonul la grătar cu sparanghel este bogat în omega-3 și fibre.", equivalent: ["ton la grătar cu legume", "păstrăv la grătar cu legume"] },
  "carne": { calories: 200, info: "Carnea este o sursă excelentă de proteine și fier.", equivalent: ["curcan", "vită"] },
  "peste": { calories: 250, info: "Peștele este o sursă bună de proteine și acizi grași omega-3.", equivalent: ["fructe de mare", "pui"] },
  "oua": { calories: 70, info: "Ouăle sunt o sursă excelentă de proteine și nutrienți.", equivalent: ["tofu", "iaurt"] },
  "broccoli": { calories: 50, info: "Broccoli este bogat în vitamine și minerale.", equivalent: ["conopidă", "spanac"] },
  "spanac": { calories: 30, info: "Spanacul este o sursă excelentă de fier și vitamine.", equivalent: ["kale", "rucola"] },
  "banane": { calories: 100, info: "Bananele sunt o sursă bună de potasiu și fibre.", equivalent: ["mere", "pere"] },
  "sparanghel": { calories: 40, info: "Sparanghelul este bogat în vitamine și minerale.", equivalent: ["fasole verde", "broccoli"] },
};

const nutrientInfo = {
  "proteina": "Proteinele sunt esențiale pentru construirea și repararea țesuturilor. Surse bune includ carne, pește, ouă, leguminoase și tofu.",
  "vitamina c": "Vitamina C este importantă pentru creșterea și repararea țesuturilor din corpul tău. Surse bune includ citricele, căpșunile și ardeii grași.",
  "fibra": "Fibra ajută la reglarea utilizării zaharurilor de către organism, contribuind la menținerea senzației de sațietate și a nivelului de zahăr din sânge. Surse bune includ fructele, legumele și cerealele integrale.",
  "calciul": "Calciul este esențial pentru sănătatea oaselor și dinților. Surse bune includ lactatele, migdalele și legumele verzi.",
  "fier": "Fierul este important pentru formarea hemoglobinei. Surse bune includ carne roșie, leguminoase și spanac.",
  "potasiu": "Potasiul ajută la funcționarea corectă a nervilor și mușchilor. Surse bune includ bananele, cartofii și avocado.",
  "magneziu": "Magneziul este implicat în peste 300 de reacții enzimatice din organism. Surse bune includ nucile, semințele și legumele verzi.",
  "vitamina d": "Vitamina D este crucială pentru absorbția calciului și sănătatea oaselor. Surse bune includ peștele gras și expunerea la soare.",
  "vitamina b12": "Vitamina B12 este esențială pentru formarea celulelor roșii din sânge și funcționarea sistemului nervos. Surse bune includ carne, pește și lactate.",
  "zinc": "Zincul este important pentru sistemul imunitar și pentru vindecarea rănilor. Surse bune includ carne, semințe și nuci."
};


const dietPlans = {
  slabire: {
    general: [
      { breakfast: "Ovăz cu fructe", lunch: "Salată cu pui la grătar", dinner: "Quinoa cu legume" },
      { breakfast: "Smoothie cu spanac și banane", lunch: "Supă de legume", dinner: "Pui la cuptor cu broccoli" },
      { breakfast: "Iaurt grecesc cu fructe", lunch: "Wrap de pui cu legume", dinner: "Somon la grătar cu sparanghel" }
    ],
    vegetarian: [
      { breakfast: "Smoothie cu lapte de migdale și fructe", lunch: "Legume sotate cu tofu", dinner: "Supă de linte cu salată" },
      { breakfast: "Ovăz cu lapte de migdale și fructe", lunch: "Burger vegetarian cu salată", dinner: "Quinoa cu legume și hummus" },
      { breakfast: "Toast cu avocado", lunch: "Salată de năut și legume", dinner: "Paste cu sos de roșii și legume" }
    ],
    vegan: [
      { breakfast: "Toast cu avocado și pâine integrală", lunch: "Salată de quinoa cu năut și legume", dinner: "Curry vegan cu orez" },
      { breakfast: "Smoothie cu lapte de soia și fructe", lunch: "Wrap cu legume și hummus", dinner: "Tofu la grătar cu legume" },
      { breakfast: "Porridge cu fructe și semințe", lunch: "Salată de linte și legume", dinner: "Burger vegan cu salată" }
    ],
    alergii: {
      lapte: [
        { breakfast: "Ovăz cu apă și fructe", lunch: "Salată de pui fără dressing cu lactate", dinner: "Pește la grătar cu legume" },
        { breakfast: "Smoothie cu lapte de cocos și fructe", lunch: "Wrap de curcan cu legume", dinner: "Tocană de legume" }
      ],
      nuci: [
        { breakfast: "Salată de fructe cu iaurt de cocos", lunch: "Wrap cu pui și legume", dinner: "Pește la grătar cu legume aburite" },
        { breakfast: "Porridge cu fructe și semințe de chia", lunch: "Salată de năut și legume", dinner: "Pui la cuptor cu legume" }
      ],
      gluten: [
        { breakfast: "Ovăz fără gluten cu fructe de pădure", lunch: "Salată cu pui la grătar și quinoa", dinner: "Legume sotate cu tofu și orez" },
        { breakfast: "Smoothie cu fructe și lapte de migdale", lunch: "Tocană de legume cu quinoa", dinner: "Pește la cuptor cu legume" }
      ]
    }
  },
  masa_musculara: {
    general: [
      { breakfast: "Ouă și toast cu avocado", lunch: "Bol cu pui și quinoa", dinner: "Stir-fry cu vită și legume" },
      { breakfast: "Smoothie proteic cu lapte de migdale", lunch: "Salată de pui cu avocado", dinner: "Curcan la grătar cu orez brun" },
      { breakfast: "Omletă cu legume", lunch: "Wrap de pui cu legume", dinner: "Somon la grătar cu cartofi dulci" }
    ],
    vegetarian: [
      { breakfast: "Iaurt grecesc cu granola și fructe", lunch: "Bol cu quinoa și fasole neagră", dinner: "Paste cu legume și chiftele de linte" },
      { breakfast: "Smoothie proteic cu lapte de migdale", lunch: "Salată de linte cu legume", dinner: "Curry de legume cu orez" },
      { breakfast: "Ovăz cu proteine și fructe", lunch: "Tocană de legume și tofu", dinner: "Burger vegetarian cu cartofi dulci" }
    ],
    vegan: [
      { breakfast: "Omletă de tofu cu legume", lunch: "Salată de linte și quinoa", dinner: "Curry cu năut și spanac cu orez" },
      { breakfast: "Smoothie proteic cu lapte de soia", lunch: "Wrap cu legume și tofu", dinner: "Tocană de legume cu năut" },
      { breakfast: "Ovăz cu proteine și lapte de migdale", lunch: "Salată de năut și legume", dinner: "Tofu la grătar cu legume" }
    ],
    alergii: {
      lapte: [
        { breakfast: "Smoothie cu lapte de ovăz și fructe", lunch: "Wrap cu pui și legume", dinner: "Pește la grătar cu quinoa și legume" },
        { breakfast: "Ovăz cu apă și fructe", lunch: "Salată de pui fără lactate", dinner: "Tocană de legume cu năut" }
      ],
      nuci: [
        { breakfast: "Smoothie cu lapte de ovăz și fructe", lunch: "Wrap cu pui și legume", dinner: "Pește la grătar cu quinoa și legume" },
        { breakfast: "Porridge cu fructe și semințe de chia", lunch: "Salată de pui fără nuci", dinner: "Tocană de legume cu năut" }
      ],
      gluten: [
        { breakfast: "Clătite fără gluten cu fructe de pădure", lunch: "Salată cu pui la grătar și cartofi dulci", dinner: "Orez cu legume și fasole" },
        { breakfast: "Ovăz fără gluten cu fructe de pădure", lunch: "Tocană de legume cu quinoa", dinner: "Pește la cuptor cu legume" }
      ]
    }
  },
  tonifiere: {
    general: [
      { breakfast: "Iaurt grecesc cu miere și nuci", lunch: "Sandwich cu curcan și avocado", dinner: "Somon la grătar cu sparanghel" },
      { breakfast: "Smoothie proteic cu lapte de migdale", lunch: "Salată de pui cu avocado", dinner: "Curcan la cuptor cu legume" },
      { breakfast: "Omletă cu legume", lunch: "Wrap de pui cu legume", dinner: "Pui la grătar cu broccoli" }
    ],
    vegetarian: [
      { breakfast: "Bol de smoothie cu fructe și granola", lunch: "Salată Caprese cu quinoa", dinner: "Ardei umpluți cu orez și fasole" },
      { breakfast: "Iaurt grecesc cu miere și fructe", lunch: "Burger vegetarian cu salată", dinner: "Quinoa cu legume și hummus" },
      { breakfast: "Toast cu avocado", lunch: "Salată de năut și legume", dinner: "Paste cu sos de roșii și legume" }
    ],
    vegan: [
      { breakfast: "Ovăz peste noapte cu lapte de migdale și fructe", lunch: "Bol Buddha vegan cu tofu", dinner: "Legume sotate cu tempeh și orez" },
      { breakfast: "Smoothie cu lapte de soia și fructe", lunch: "Wrap cu legume și hummus", dinner: "Tofu la grătar cu legume" },
      { breakfast: "Porridge cu fructe și semințe", lunch: "Salată de linte și legume", dinner: "Burger vegan cu salată" }
    ],
    alergii: {
      lapte: [
        { breakfast: "Smoothie cu lapte de cocos", lunch: "Salată de pui cu avocado", dinner: "Cod la cuptor cu legume la grătar" },
        { breakfast: "Ovăz cu apă și fructe", lunch: "Salată de pui fără lactate", dinner: "Tocană de legume cu năut" }
      ],
      nuci: [
        { breakfast: "Budincă de chia cu lapte de cocos", lunch: "Salată de pui cu avocado", dinner: "Cod la cuptor cu legume la grătar" },
        { breakfast: "Porridge cu fructe și semințe de chia", lunch: "Salată de pui fără nuci", dinner: "Tocană de legume cu năut" }
      ],
      gluten: [
        { breakfast: "Smoothie cu granola fără gluten", lunch: "Salată de quinoa și legume cu pui", dinner: "Legume sotate cu tofu și orez" },
        { breakfast: "Ovăz fără gluten cu fructe de pădure", lunch: "Tocană de legume cu quinoa", dinner: "Pește la cuptor cu legume" }
      ]
    }
  }
};

app.post('/webhook', (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const sessionId = req.body.session;
  const parameters = req.body.queryResult.parameters;
  let response;

  const getMealInfo = (meal) => {
    return meal.split(' și ').map(item => {
      const food = foodInfo[item.toLowerCase()];
      return food ? `${item} (${food.calories} calorii): ${food.info}` : item;
    }).join('. ');
  };

  const getEquivalentFood = (foodItem) => {
    const food = foodInfo[foodItem];
    if (food && food.equivalent) {
      return food.equivalent.join(', ');
    }
    return null;
  };

  switch (intent) {
    case 'User Goal Intent':
      const goal = parameters.scop ? parameters.scop.toLowerCase() : null;
      if (goal) {
        userGoals[sessionId] = { goal: goal };
        response = {
          fulfillmentText: "Minunat! Ai vreo restricție alimentară? De exemplu, ești vegetarian, vegan sau ai alergii alimentare?"
        };
      } else {
        response = {
          fulfillmentText: "Te rog să îmi spui care este scopul tău: slăbit, masă musculară, tonifiere?"
        };
      }
      break;

    case 'Dietary Restrictions Intent':
      if (!userGoals[sessionId] || !userGoals[sessionId].goal) {
        response = {
          fulfillmentText: "Te rog să îmi spui mai întâi care este scopul tău: slăbit, masă musculară, tonifiere?"
        };
        break;
      }
      const dietValues = Array.isArray(parameters.dieta) ? parameters.dieta.map(d => d.toLowerCase()) : [parameters.dieta.toLowerCase()];
      const allergyValues = Array.isArray(parameters.alergie) ? parameters.alergie.map(a => a.toLowerCase()) : [parameters.alergie.toLowerCase()];
      const userGoal = userGoals[sessionId].goal;

      let mealPlanOptions = dietPlans[userGoal].general;

      dietValues.forEach(diet => {
        if (dietPlans[userGoal][diet]) {
          mealPlanOptions = dietPlans[userGoal][diet];
        }
      });

      allergyValues.forEach(allergy => {
        if (dietPlans[userGoal].alergii && dietPlans[userGoal].alergii[allergy]) {
          mealPlanOptions = mealPlanOptions.filter(mealPlan => 
            dietPlans[userGoal].alergii[allergy].every(allergyMealPlan => 
              mealPlan.breakfast === allergyMealPlan.breakfast &&
              mealPlan.lunch === allergyMealPlan.lunch &&
              mealPlan.dinner === allergyMealPlan.dinner
            )
          );
        }
      });

      if (mealPlanOptions.length > 0) {
        const randomMealPlan = mealPlanOptions[Math.floor(Math.random() * mealPlanOptions.length)];
        userDietPlans[sessionId] = mealPlanOptions.filter(plan => plan !== randomMealPlan);  // Store remaining plans
        response = {
          fulfillmentText: `Iată un plan de masă pentru scopul tău de  ${userGoal}, având în vedere dieta ta:
          \nMic dejun: ${randomMealPlan.breakfast}. 
          \nPrânz: ${randomMealPlan.lunch}. 
          \nCină: ${randomMealPlan.dinner}. `
        };
      } else {
        response = {
          fulfillmentText: "Îmi pare rău, nu am găsit un plan de masă potrivit pentru cerințele tale."
        };
      }
      break;

    case 'Another Meal Plan Intent':
      if (userDietPlans[sessionId] && userDietPlans[sessionId].length > 0) {
        const nextMealPlan = userDietPlans[sessionId].pop();  // Get the next meal plan
        response = {
          fulfillmentText: `Iată un alt plan de masă:
          \nMic dejun: ${nextMealPlan.breakfast}. 
          \nPrânz: ${nextMealPlan.lunch}. 
          \nCină: ${nextMealPlan.dinner}. `
        };
      } else {
        response = {
          fulfillmentText: "Îmi pare rău, nu mai am alte planuri de masă disponibile în acest moment."
        };
      }
      break;

    case 'Food Information Intent':
      const foodItem = parameters.food ? parameters.food.toLowerCase() : null;
      if (foodItem && foodInfo[foodItem]) {
        const foodDetails = foodInfo[foodItem];
        response = {
          fulfillmentText: `${foodItem.charAt(0).toUpperCase() + foodItem.slice(1)} are ${foodDetails.calories} calorii. ${foodDetails.info}`
        };
      } else {
        response = {
          fulfillmentText: `Îmi pare rău, nu am informații despre ${foodItem}.`
        };
      }
      break;

    case 'Equivalent Food Intent':
      const equivalentFoodItem = parameters.food ? parameters.food.toLowerCase() : null;
      if (equivalentFoodItem && foodInfo[equivalentFoodItem]) {
        const equivalentFoods = getEquivalentFood(equivalentFoodItem);
        response = {
          fulfillmentText: `Un aliment echivalent cu ${equivalentFoodItem} ar putea fi: ${equivalentFoods}.`
        };
      } else {
        response = {
          fulfillmentText: `Îmi pare rău, nu am informații despre un echivalent pentru ${equivalentFoodItem}.`
        };
      }
      break;

    case 'Nutrient Information Intent':
      const nutrient = parameters.nutrient ? parameters.nutrient.toLowerCase() : null;
      if (nutrient && nutrientInfo[nutrient]) {
        response = {
          fulfillmentText: nutrientInfo[nutrient]
        };
      } else {
        response = {
          fulfillmentText: "Nu am informații despre acest nutrient în acest moment."
        };
      }
      break;

    case 'Thank You Intent':
      response = {
        fulfillmentText: "Cu plăcere! Dacă mai ai nevoie de ajutor, sunt aici."
      };
      break;

    default:
      response = {
        fulfillmentText: "Nu sunt sigur cum să te ajut cu asta."
      };
      break;
  }

  res.json(response);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ceva nu a mers bine!');
});

app.listen(3000, () => {
  console.log('Serverul rulează pe portul 3000');
});


