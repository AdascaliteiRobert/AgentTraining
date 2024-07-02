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
  "ovaz": { 
    calories: 150, 
    info: "Ovazul este bogat in fibre, ajutand la mentinerea senzatiei de satietate si reglarea digestiei. Contine vitamine din complexul B, fier si antioxidanti.", 
    equivalent: ["muesli", "cereale integrale"] 
  },
  "fructe": { 
    calories: 60, 
    info: "Fructele sunt o sursa excelenta de vitamine (A, C, K), minerale (potasiu, magneziu) si antioxidanti. Consumul regulat de fructe imbunatateste sistemul imunitar si sanatatea pielii.", 
    equivalent: ["legume proaspete", "smoothie"] 
  },
  "salata cu pui la gratar": { 
    calories: 350, 
    info: "Salata cu pui la gratar este bogata in proteine si fibre, contribuind la constructia muschilor si mentinerea unei digestii sanatoase. Include vitaminele A si C, calciu si fier.", 
    equivalent: ["salata cu tofu", "salata cu ton"] 
  },
  "quinoa": { 
    calories: 222, 
    info: "Quinoa este o sursa completa de proteine, contine toti cei noua aminoacizi esentiali. Este bogata in fibre, magneziu, vitaminele B si E, fier, potasiu si antioxidanti.", 
    equivalent: ["orez brun", "couscous"] 
  },
  "legume": { 
    calories: 50, 
    info: "Legumele sunt sarace in calorii si bogate in vitamine (A, C, K), minerale (potasiu, calciu, fier) si fibre. Consumul de legume sprijina sanatatea sistemului imunitar si digestiv.", 
    equivalent: ["fructe proaspete", "legume aburite"] 
  },
  "smoothie cu spanac si banane": { 
    calories: 200, 
    info: "Smoothie-ul cu spanac si banane este o sursa buna de vitamine (A, C, K), minerale (potasiu, magneziu) si fibre. Ajuta la imbunatatirea digestiei si cresterea energiei.", 
    equivalent: ["smoothie cu kale si mango", "smoothie cu fructe de padure"] 
  },
  "supa de legume": { 
    calories: 100, 
    info: "Supa de legume este saraca in calorii si bogata in nutrienti, precum vitaminele A si C, minerale (calciu, fier) si fibre. Sprijina detoxifierea organismului si mentinerea hidratarii.", 
    equivalent: ["supa de pui", "supa de linte"] 
  },
  "pui la cuptor cu broccoli": { 
    calories: 300, 
    info: "Puiul la cuptor cu broccoli este o masa echilibrata, bogata in proteine si fibre. Puiul asigura proteine de inalta calitate, iar broccoli este o sursa excelenta de vitamine C si K, folat si fibre.", 
    equivalent: ["curcan la cuptor cu sparanghel", "vita la cuptor cu legume"] 
  },
  "iaurt grecesc cu fructe": { 
    calories: 150, 
    info: "Iaurtul grecesc cu fructe este bogat in proteine, probiotice, calciu si vitamine din complexul B. Consumul regulat sprijina sanatatea oaselor si a sistemului digestiv.", 
    equivalent: ["iaurt de cocos cu fructe", "iaurt de soia cu fructe"] 
  },
  "wrap de pui cu legume": { 
    calories: 250, 
    info: "Wrap-ul de pui cu legume este o masa usoara si echilibrata, bogata in proteine, fibre, vitamine (A, C, K) si minerale (potasiu, magneziu). Ideal pentru un pranz rapid si sanatos.", 
    equivalent: ["wrap cu tofu", "wrap cu curcan"] 
  },
  "somon la gratar cu sparanghel": { 
    calories: 350, 
    info: "Somonul la gratar cu sparanghel este bogat in omega-3, proteine, vitaminele D si B12, minerale (selenium, potasiu) si fibre. Sprijina sanatatea cardiovasculara si imunitara.", 
    equivalent: ["ton la gratar cu legume", "pastrav la gratar cu legume"] 
  },
  "carne": { 
    calories: 200, 
    info: "Carnea este o sursa excelenta de proteine, fier, zinc, si vitaminele B6 si B12. Consumul de carne ajuta la constructia muschilor si functionarea optima a sistemului imunitar.", 
    equivalent: ["curcan", "vita"] 
  },
  "peste": { 
    calories: 250, 
    info: "Pestele este o sursa buna de proteine, acizi grasi omega-3, vitaminele D si B2, calciu, fosfor si minerale precum fierul, zincul, iodul si magneziul. Imbunatateste sanatatea inimii si a creierului.", 
    equivalent: ["fructe de mare", "pui"] 
  },
  "oua": { 
    calories: 70, 
    info: "Ouale sunt o sursa excelenta de proteine, vitaminele B2, B6, B12, D si minerale (zinc, fier). Consumul de oua sprijina sanatatea ochilor, a creierului si a oaselor.", 
    equivalent: ["tofu", "iaurt"] 
  },
  "broccoliul": { 
    calories: 50, 
    info: "Broccoliul este bogat in vitaminele C si K, fibre, potasiu, calciu, si fitonutrienti. Consumul de broccoli sprijina sanatatea cardiovasculara, digestiva si a sistemului imunitar.", 
    equivalent: ["conopida", "spanac"] 
  },
  "spanac": { 
    calories: 30, 
    info: "Spanacul este o sursa excelenta de fier, vitaminele A, C, K, folat, si magneziu. Ajuta la imbunatatirea sanatatii ochilor, a pielii si a sistemului cardiovascular.", 
    equivalent: ["kale", "rucola"] 
  },
  "banane": { 
    calories: 100, 
    info: "Bananele sunt o sursa buna de potasiu, vitaminele B6 si C, fibre, si antioxidanti. Consumul de banane ajuta la reglarea tensiunii arteriale si imbunatatirea digestiei.", 
    equivalent: ["mere", "pere"] 
  },
  "sparanghel": { 
    calories: 40, 
    info: "Sparanghelul este bogat in vitaminele A, C, E, K, fibre, si folat. Ajuta la detoxifierea organismului si imbunatatirea sanatatii oaselor si a sistemului digestiv.", 
    equivalent: ["fasole verde", "broccoli"] 
  }
};

const nutrientInfo = {
  "proteina": "Proteinele sunt esentiale pentru construirea si repararea tesuturilor. Surse bune includ carne, peste, oua, leguminoase, si tofu. Proteinele sprijina cresterea si dezvoltarea muschilor, functia imunitara si producerea de enzime si hormoni.",
  "vitamina c": "Vitamina C este importanta pentru cresterea si repararea tesuturilor din corpul tau. Surse bune includ citricele, capsunile, si ardeii grasi. Vitamina C imbunatateste sanatatea pielii, a sistemului imunitar si ajuta la absorbtia fierului.",
  "fibra": "Fibra ajuta la reglarea utilizarii zaharurilor de catre organism, contribuind la mentinerea senzatiei de satietate si a nivelului de zahar din sange. Surse bune includ fructele, legumele si cerealele integrale. Consumul de fibre sprijina sanatatea digestiva si previne constipatia.",
  "calciul": "Calciul este esential pentru sanatatea oaselor si dintilor. Surse bune includ lactatele, migdalele, si legumele verzi. Calciul sprijina functia musculara, transmiterea nervoasa si coagularea sangelui.",
  "fier": "Fierul este important pentru formarea hemoglobinei, care transporta oxigenul in sange. Surse bune includ carne rosie, leguminoase si spanac. Consumul adecvat de fier previne anemia si imbunatateste functia imunitara.",
  "potasiu": "Potasiul ajuta la functionarea corecta a nervilor si muschilor. Surse bune includ bananele, cartofii, si avocado. Potasiul sprijina echilibrul electrolitic, sanatatea cardiovasculara si previne hipertensiunea arteriala.",
  "magneziu": "Magneziul este implicat in peste 300 de reactii enzimatice din organism. Surse bune includ nucile, semintele, si legumele verzi. Magneziul imbunatateste functia musculara si nervoasa, sanatatea oaselor si metabolismul energetic.",
  "vitamina d": "Vitamina D este cruciala pentru absorbtia calciului si sanatatea oaselor. Surse bune includ pestele gras si expunerea la soare. Vitamina D sprijina functia imunitara, sanatatea cardiovasculara si previne osteoporoza.",
  "vitamina b12": "Vitamina B12 este esentiala pentru formarea celulelor rosii din sange si functionarea sistemului nervos. Surse bune includ carne, peste si lactate. Vitamina B12 sprijina metabolismul energetic si previne anemia megaloblastica.",
  "zinc": "Zincul este important pentru sistemul imunitar si pentru vindecarea ranilor. Surse bune includ carne, seminte, si nuci. Zincul sprijina cresterea si dezvoltarea, functia reproductiva si metabolismul carbohidratilor."
};



const dietPlans = {
  slabire: {
    general: [
      { breakfast: "Ovăz cu fructe", lunch: "Salată cu pui la grătar", dinner: "Quinoa cu legume" },
      { breakfast: "Smoothie cu spanac și banane", lunch: "Supă de legume", dinner: "Pui la cuptor cu broccoli" },
      { breakfast: "Iaurt grecesc cu fructe", lunch: "Wrap de pui cu legume", dinner: "Somon la grătar cu sparanghel" },
      { breakfast: "Omletă cu legume", lunch: "Sandwich cu curcan și avocado", dinner: "Pește la cuptor cu legume aburite" },
      { breakfast: "Iaurt grecesc cu miere și nuci", lunch: "Salată de pui cu mix de verdețuri", dinner: "Vită prăjită cu legume" }
    ],
    vegetarian: [
      { breakfast: "Smoothie cu lapte de migdale și fructe", lunch: "Legume sotate cu tofu", dinner: "Supă de linte cu salată" },
      { breakfast: "Ovăz cu lapte de migdale și fructe", lunch: "Burger vegetarian cu salată", dinner: "Quinoa cu legume și hummus" },
      { breakfast: "Toast cu avocado", lunch: "Salată de năut și legume", dinner: "Paste cu sos de roșii și legume" },
      { breakfast: "Smoothie de fructe cu lapte de migdale", lunch: "Wrap cu legume la grătar și hummus", dinner: "Ardei umpluți cu quinoa și fasole neagră" },
      { breakfast: "Budincă de chia cu lapte de cocos și fructe", lunch: "Supă de linte cu pâine integrală", dinner: "Legume prăjite cu tofu" }
    ],
    vegan: [
      { breakfast: "Toast cu avocado și pâine integrală", lunch: "Salată de quinoa cu năut și legume", dinner: "Curry vegan cu orez" },
      { breakfast: "Smoothie cu lapte de soia și fructe", lunch: "Wrap cu legume și hummus", dinner: "Tofu la grătar cu legume" },
      { breakfast: "Ovăz cu fructe și semințe", lunch: "Salată de linte și legume", dinner: "Burger vegan cu salată" },
      { breakfast: "Ovăz peste noapte cu lapte de migdale și fructe", lunch: "Salată de năut cu quinoa", dinner: "Curry de legume cu orez brun" },
      { breakfast: "Bol de smoothie cu fructe și granola", lunch: "Wrap cu falafel și legume mixte", dinner: "Tempeh la grătar cu broccoli aburit" }
    ],
    alergii: {
      lapte: [
        { breakfast: "Ovăz cu apă și fructe", lunch: "Salată de pui fără dressing cu lactate", dinner: "Pește la grătar cu legume" },
        { breakfast: "Smoothie cu lapte de cocos și fructe", lunch: "Wrap de curcan cu legume", dinner: "Tocană de legume" },
        { breakfast: "Budincă de chia cu lapte de migdale", lunch: "Salată de quinoa cu pui la grătar", dinner: "Curry de pește cu legume aburite" },
        { breakfast: "Smoothie cu lapte de cocos", lunch: "Wrap de curcan cu legume", dinner: "Legume prăjite cu tofu" }
      ],
      nuci: [
        { breakfast: "Salată de fructe cu iaurt de cocos", lunch: "Wrap cu pui și legume", dinner: "Pește la grătar cu legume aburite" },
        { breakfast: "Ovăz cu fructe și semințe de chia", lunch: "Salată de năut și legume", dinner: "Pui la cuptor cu legume" },
        { breakfast: "Iaurt grecesc cu miere și fructe de pădure", lunch: "Wrap de pui cu mix de verdețuri", dinner: "Somon la grătar cu sparanghel" },
        { breakfast: "Smoothie cu lapte de migdale și banane", lunch: "Supă de linte cu pâine integrală", dinner: "Pui la grătar cu quinoa" }
      ],
      gluten: [
        { breakfast: "Ovăz fără gluten cu fructe de pădure", lunch: "Salată cu pui la grătar și quinoa", dinner: "Legume sotate cu tofu și orez" },
        { breakfast: "Smoothie cu fructe și lapte de migdale", lunch: "Tocană de legume cu quinoa", dinner: "Pește la cuptor cu legume" },
        { breakfast: "Clătite din hrișcă cu fructe de pădure", lunch: "Salată de quinoa cu pui la grătar", dinner: "Legume prăjite cu tofu" },
        { breakfast: "Smoothie cu ovăz fără gluten", lunch: "Salată de legume la grătar și quinoa", dinner: "Pește copt cu legume aburite" }
      ]
    }
  },
  masa_musculara: {
    general: [
      { breakfast: "Ouă și toast cu avocado", lunch: "Bol cu pui și quinoa", dinner: "Stir-fry cu vită și legume" },
      { breakfast: "Smoothie proteic cu lapte de migdale", lunch: "Salată de pui cu avocado", dinner: "Curcan la grătar cu orez brun" },
      { breakfast: "Omletă cu legume", lunch: "Wrap de pui cu legume", dinner: "Somon la grătar cu cartofi dulci" },
      { breakfast: "Ouă amestecate cu spanac și toast integral", lunch: "Bol cu pui și quinoa", dinner: "Vită prăjită cu legume" },
      { breakfast: "Smoothie proteic cu lapte de migdale", lunch: "Salată de ton cu avocado", dinner: "Somon la cuptor cu cartofi dulci" }
    ],
    vegetarian: [
      { breakfast: "Iaurt grecesc cu granola și fructe", lunch: "Bol cu quinoa și fasole neagră", dinner: "Paste cu legume și chiftele de linte" },
      { breakfast: "Smoothie proteic cu lapte de migdale", lunch: "Salată de linte cu legume", dinner: "Curry de legume cu orez" },
      { breakfast: "Ovăz cu proteine și fructe", lunch: "Tocană de legume și tofu", dinner: "Burger vegetarian cu cartofi dulci" },
      { breakfast: "Iaurt grecesc cu granola și fructe", lunch: "Bol cu quinoa și fasole", dinner: "Supă de linte cu pâine integrală" },
      { breakfast: "Smoothie proteic cu lapte de migdale", lunch: "Salată de năut cu legume mixte", dinner: "Legume prăjite cu tofu" }
    ],
    vegan: [
      { breakfast: "Omletă de tofu cu legume", lunch: "Salată de linte și quinoa", dinner: "Curry cu năut și spanac cu orez" },
      { breakfast: "Smoothie proteic cu lapte de soia", lunch: "Wrap cu legume și tofu", dinner: "Tocană de legume cu năut" },
      { breakfast: "Ovăz cu proteine și lapte de migdale", lunch: "Salată de năut și legume", dinner: "Tofu la grătar cu legume" },
      { breakfast: "Omletă de tofu cu legume", lunch: "Salată de quinoa și năut", dinner: "Curry de linte cu orez brun" },
      { breakfast: "Smoothie proteic cu lapte de soia", lunch: "Wrap cu hummus și legume", dinner: "Legume prăjite cu tofu" }
    ],
    alergii: {
      lapte: [
        { breakfast: "Smoothie cu lapte de ovăz și fructe", lunch: "Wrap cu pui și legume", dinner: "Pește la grătar cu quinoa și legume" },
        { breakfast: "Ovăz cu apă și fructe", lunch: "Salată de pui fără lactate", dinner: "Tocană de legume cu năut" },
        { breakfast: "Smoothie cu lapte de cocos și fructe", lunch: "Wrap de pui cu mix de verdețuri", dinner: "Pește la grătar cu quinoa" },
        { breakfast: "Budincă de chia cu lapte de migdale", lunch: "Salată de curcan și avocado", dinner: "Legume prăjite cu tofu" }
      ],
      nuci: [
        { breakfast: "Smoothie cu lapte de ovăz și fructe", lunch: "Wrap cu pui și legume", dinner: "Pește la grătar cu quinoa și legume" },
        { breakfast: "Ovăz cu fructe și semințe de chia", lunch: "Salată de pui fără nuci", dinner: "Tocană de legume cu năut" },
        { breakfast: "Iaurt grecesc cu fructe de pădure", lunch: "Bol cu pui și quinoa", dinner: "Somon la grătar cu legume aburite" },
        { breakfast: "Smoothie cu lapte de migdale și banane", lunch: "Supă de linte cu pâine integrală", dinner: "Pui la grătar cu legume" }
      ],
      gluten: [
        { breakfast: "Clătite fără gluten cu fructe de pădure", lunch: "Salată cu pui la grătar și cartofi dulci", dinner: "Orez cu legume și fasole" },
        { breakfast: "Ovăz fără gluten cu fructe de pădure", lunch: "Tocană de legume cu quinoa", dinner: "Pește la cuptor cu legume" },
        { breakfast: "Clătite din hrișcă cu fructe de pădure", lunch: "Salată de quinoa cu pui la grătar", dinner: "Legume prăjite cu tofu" },
        { breakfast: "Smoothie cu ovăz fără gluten", lunch: "Salată de legume la grătar și quinoa", dinner: "Pește copt cu legume aburite" }
      ]
    }
  },
  tonifiere: {
    general: [
      { breakfast: "Iaurt grecesc cu miere și nuci", lunch: "Sandwich cu curcan și avocado", dinner: "Somon la grătar cu sparanghel" },
      { breakfast: "Smoothie proteic cu lapte de migdale", lunch: "Salată de pui cu avocado", dinner: "Curcan la cuptor cu legume" },
      { breakfast: "Omletă cu legume", lunch: "Wrap de pui cu legume", dinner: "Pui la grătar cu broccoli" },
      { breakfast: "Iaurt grecesc cu miere și nuci", lunch: "Sandwich cu curcan și avocado", dinner: "Pui copt cu broccoli" },
      { breakfast: "Smoothie proteic cu lapte de migdale", lunch: "Salată de pui cu avocado", dinner: "Somon la grătar cu sparanghel" }
    ],
    vegetarian: [
      { breakfast: "Bol de smoothie cu fructe și granola", lunch: "Salată Caprese cu quinoa", dinner: "Ardei umpluți cu orez și fasole" },
      { breakfast: "Iaurt grecesc cu miere și fructe", lunch: "Burger vegetarian cu salată", dinner: "Quinoa cu legume și hummus" },
      { breakfast: "Toast cu avocado", lunch: "Salată de năut și legume", dinner: "Paste cu sos de roșii și legume" },
      { breakfast: "Bol de smoothie cu fructe și granola", lunch: "Salată de quinoa și fasole neagră", dinner: "Ardei umpluți cu legume" },
      { breakfast: "Iaurt grecesc cu miere și fructe", lunch: "Supă de linte cu pâine integrală", dinner: "Legume prăjite cu tofu" }
    ],
    vegan: [
      { breakfast: "Ovăz peste noapte cu lapte de migdale și fructe", lunch: "Bol Buddha vegan cu tofu", dinner: "Legume sotate cu tempeh și orez" },
      { breakfast: "Smoothie cu lapte de soia și fructe", lunch: "Wrap cu legume și hummus", dinner: "Tofu la grătar cu legume" },
      { breakfast: "Ovăz cu fructe și semințe", lunch: "Salată de linte și legume", dinner: "Burger vegan cu salată" },
      { breakfast: "Ovăz peste noapte cu lapte de migdale și fructe", lunch: "Salată de năut cu quinoa", dinner: "Curry de legume cu orez brun" },
      { breakfast: "Bol de smoothie cu fructe și granola", lunch: "Wrap cu falafel și legume mixte", dinner: "Tempeh la grătar cu broccoli aburit" }
    ],
    alergii: {
      lapte: [
        { breakfast: "Smoothie cu lapte de cocos", lunch: "Salată de pui cu avocado", dinner: "Cod la cuptor cu legume la grătar" },
        { breakfast: "Ovăz cu apă și fructe", lunch: "Salată de pui fără lactate", dinner: "Tocană de legume cu năut" },
        { breakfast: "Budincă de chia cu lapte de migdale", lunch: "Salată de quinoa cu pui la grătar", dinner: "Curry de pește cu legume aburite" },
        { breakfast: "Smoothie cu lapte de cocos", lunch: "Wrap de curcan cu legume", dinner: "Legume prăjite cu tofu" }
      ],
      nuci: [
        { breakfast: "Budincă de chia cu lapte de cocos", lunch: "Salată de pui cu avocado", dinner: "Cod la cuptor cu legume la grătar" },
        { breakfast: "Ovăz cu fructe și semințe de chia", lunch: "Salată de pui fără nuci", dinner: "Tocană de legume cu năut" },
        { breakfast: "Iaurt grecesc cu miere și fructe de pădure", lunch: "Wrap de pui cu mix de verdețuri", dinner: "Somon la grătar cu sparanghel" },
        { breakfast: "Smoothie cu lapte de migdale și banane", lunch: "Supă de linte cu pâine integrală", dinner: "Pui la grătar cu quinoa" }
      ],
      gluten: [
        { breakfast: "Smoothie cu granola fără gluten", lunch: "Salată de quinoa și legume cu pui", dinner: "Legume sotate cu tofu și orez" },
        { breakfast: "Ovăz fără gluten cu fructe de pădure", lunch: "Tocană de legume cu quinoa", dinner: "Pește la cuptor cu legume" },
        { breakfast: "Clătite din hrișcă cu fructe de pădure", lunch: "Salată de quinoa cu pui la grătar", dinner: "Legume prăjite cu tofu" },
        { breakfast: "Smoothie cu ovăz fără gluten", lunch: "Salată de legume la grătar și quinoa", dinner: "Pește copt cu legume aburite" }
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


