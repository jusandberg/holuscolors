(function (root, factory) {
  const index = factory();

  if (typeof module === 'object' && module.exports) {
    module.exports = index;
  }

  root.HOLUS_SEARCH_INDEX = index;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const records = [
    {
      id: 'page-home',
      type: 'Page',
      title: 'Hōlus Nutrition Counselling',
      summary: 'Personalized nutrition education with Juliana dos Santos, built around your body, routines and real life.',
      url: '/',
      keywords: ['nutrition in context', 'nutritionist', 'Ottawa', 'Stittsville', 'Kanata', 'Ontario', 'Juliana dos Santos', 'RNCP', 'NNCP', 'CFNP']
    },
    {
      id: 'page-about',
      type: 'Page',
      title: 'About Juliana',
      summary: 'Meet Juliana dos Santos and learn about the practical, personalized approach behind Hōlus.',
      url: '/about/',
      keywords: ['about', 'Juliana', 'credentials', 'RNCP', 'NNCP', 'CFNP', 'nutritionist', 'professional background']
    },
    {
      id: 'page-services',
      type: 'Page',
      title: 'Nutrition counselling services',
      summary: 'Explore consultations, follow-ups, packages, pricing and elective nutrition testing.',
      url: '/nutritional-counselling/',
      keywords: ['services', 'appointments', 'pricing', 'cost', 'booking', 'consultation', 'package', 'testing']
    },
    {
      id: 'page-approach',
      type: 'Page',
      title: 'Nutrition and behaviour-change approach',
      summary: 'See how physiology, routines, preferences, motivation and real-life constraints shape practical nutrition support.',
      url: '/nutrition-behaviour-change/',
      keywords: ['approach', 'behaviour change', 'behavior change', 'habits', 'motivation', 'routines', 'preferences', 'real life', 'physiology']
    },
    {
      id: 'page-digest',
      type: 'Page',
      title: 'Hōlus Digest',
      summary: 'Clear, practical education about nutrients, what they do and where to find them.',
      url: '/digest/',
      keywords: ['nutrition education', 'nutrients', 'macronutrients', 'micronutrients', 'food sources', 'vitamins', 'minerals']
    },
    {
      id: "wd-late-eating",
      type: 'Article',
      title: "Eating late: what a tightly controlled study found",
      summary: "The same meals eaten about four hours later left people hungrier and burning slightly less energy.",
      url: "/worth-digesting/#late-eating",
      keywords: ["July 2026", 'Worth Digesting', 'research']
    },
    {
      id: "wd-time-restricted-eating",
      type: 'Article',
      title: "Time-restricted eating: is the clock the trick?",
      summary: "Eating within a shorter daily window works mostly because people end up eating less, not because of the clock itself.",
      url: "/worth-digesting/#time-restricted-eating",
      keywords: ["July 2026", 'Worth Digesting', 'research']
    },
    {
      id: "wd-flavonoids-ageing",
      type: 'Article',
      title: "Berries, tea and apples: flavonoids and healthy ageing",
      summary: "In a 2025 study of 86,000 older adults, people who ate more flavonoid-rich foods had a lower risk of frailty and poor mental health.",
      url: "/worth-digesting/#flavonoids-ageing",
      keywords: ["June 2026", 'Worth Digesting', 'research']
    },
    {
      id: "wd-dark-chocolate",
      type: 'Article',
      title: "Dark chocolate vs milk chocolate",
      summary: "In a 2024 BMJ study, dark chocolate was linked with a lower risk of type 2 diabetes. Milk chocolate wasn’t, and was linked with weight gain.",
      url: "/worth-digesting/#dark-chocolate",
      keywords: ["June 2026", 'Worth Digesting', 'research']
    },
    {
      id: "wd-creatine-brain",
      type: 'Article',
      title: "Creatine: not just for the gym",
      summary: "A 2024 review of 16 trials found creatine gave a small boost to memory in adults.",
      url: "/worth-digesting/#creatine-brain",
      keywords: ["May 2026", 'Worth Digesting', 'research']
    },
    {
      id: "wd-omega3-ageing",
      type: 'Article',
      title: "Omega-3s and the pace of ageing",
      summary: "In a 3-year trial, older adults taking omega-3s aged a few months more slowly by biological measures.",
      url: "/worth-digesting/#omega3-ageing",
      keywords: ["May 2026", 'Worth Digesting', 'research']
    },
    {
      id: "wd-fermented-foods",
      type: 'Article',
      title: "Fermented foods and your gut",
      summary: "In a Stanford trial, eating more fermented foods increased gut bacteria variety and lowered markers of inflammation.",
      url: "/worth-digesting/#fermented-foods",
      keywords: ["April 2026", 'Worth Digesting', 'research']
    },
    {
      id: "wd-sweeteners",
      type: 'Article',
      title: "Sugar substitutes: what the WHO advises",
      summary: "The World Health Organization advises against using non-sugar sweeteners to control weight. Experts still debate the evidence.",
      url: "/worth-digesting/#sweeteners",
      keywords: ["April 2026", 'Worth Digesting', 'research']
    },
    {
      id: "wd-ultra-processed",
      type: 'Article',
      title: "Ultra-processed foods: what the biggest review found",
      summary: "A 2024 BMJ review of studies covering nearly 10 million people linked eating more ultra-processed foods with 32 poorer health outcomes.",
      url: "/worth-digesting/#ultra-processed",
      keywords: ["March 2026", 'Worth Digesting', 'research']
    },
    {
      id: "wd-plant-protein",
      type: 'Article',
      title: "Plant protein in midlife and healthy ageing",
      summary: "In a 30-year study of 48,000 women, eating more plant protein in midlife was linked with higher odds of ageing healthily.",
      url: "/worth-digesting/#plant-protein",
      keywords: ["March 2026", 'Worth Digesting', 'research']
    },
    {
      id: "wd-coffee-timing",
      type: 'Article',
      title: "Coffee: when you drink it may matter",
      summary: "In a 2025 study, morning coffee drinkers had lower risk of death, especially from heart disease. All-day drinkers didn’t.",
      url: "/worth-digesting/#coffee-timing",
      keywords: ["February 2026", 'Worth Digesting', 'research']
    },
    {
      id: "wd-mediterranean-women",
      type: 'Article',
      title: "The Mediterranean pattern and women’s heart health",
      summary: "In a 25-year study of 25,000 women, eating Mediterranean-style was linked with up to 23% lower risk of death.",
      url: "/worth-digesting/#mediterranean-women",
      keywords: ["February 2026", 'Worth Digesting', 'research']
    },
    {
      id: "wd-front-of-package",
      type: 'Article',
      title: "The new “High in” symbol on food packages",
      summary: "Since January 1, 2026, many packaged foods in Canada must show a magnifying-glass symbol if they’re high in saturated fat, sugars or sodium.",
      url: "/worth-digesting/#front-of-package",
      keywords: ["January 2026", 'Worth Digesting', 'research']
    },
    {
      id: "wd-healthy-ageing-diet",
      type: 'Article',
      title: "The eating pattern most linked with ageing well",
      summary: "A 30-year study of 105,000 people found healthy eating patterns were linked with much higher odds of healthy ageing.",
      url: "/worth-digesting/#healthy-ageing-diet",
      keywords: ["January 2026", 'Worth Digesting', 'research']
    },
    {
      id: "wd-olive-oil-brain",
      type: 'Article',
      title: "Olive oil and the brain",
      summary: "In a 28-year study, people who used at least half a tablespoon of olive oil a day had a 28% lower risk of dying from dementia.",
      url: "/worth-digesting/#olive-oil-brain",
      keywords: ["December 2025", 'Worth Digesting', 'research']
    },
    {
      id: "wd-early-peanut",
      type: 'Article',
      title: "Babies and peanuts: early introduction lasts",
      summary: "Babies who ate peanut early were 71% less likely to have a peanut allergy at age 12, even if they didn’t eat it often later.",
      url: "/worth-digesting/#early-peanut",
      keywords: ["December 2025", 'Worth Digesting', 'research']
    },
    {
      id: 'page-worth-digesting',
      type: 'Page',
      title: 'Worth Digesting',
      summary: 'Monthly, science-backed nutrition reads in plain language, with links to every source.',
      url: '/worth-digesting/',
      keywords: ['articles', 'monthly', 'research', 'science', 'newsletter', 'reads']
    },
    {
      id: 'digest-season',
      type: 'Page',
      title: 'In season in Ontario',
      summary: 'Local Ontario produce by month, with one simple idea for each.',
      url: '/digest/#ss-title',
      keywords: ['seasonal', 'local', 'Ontario', 'farmers market', 'produce', 'in season']
    },
    {
      id: 'wd-vitamin-c-colds',
      type: 'Article',
      title: 'Vitamin C and colds: what it can and can’t do',
      summary: 'Regular vitamin C won’t stop most people catching a cold, and starting it once you’re sick doesn’t seem to help.',
      url: '/worth-digesting/#vitamin-c-colds',
      keywords: ['November 2026', 'Worth Digesting']
    },
    {
      id: 'wd-alcohol-guidance',
      type: 'Article',
      title: 'Holiday drinks: what Canada’s alcohol guidance says',
      summary: 'Less is better. Two drinks or fewer a week is the low-risk range, and that’s a ceiling, not a target.',
      url: '/worth-digesting/#alcohol-guidance',
      keywords: ['November 2026', 'Worth Digesting']
    },
    {
      id: 'wd-vitamin-d-winter',
      type: 'Article',
      title: 'Vitamin D through a Canadian winter',
      summary: 'Vitamin D is in very few foods. Health Canada suggests food sources or a daily 400 IU supplement.',
      url: '/worth-digesting/#vitamin-d-winter',
      keywords: ['October 2026', 'Worth Digesting']
    },
    {
      id: 'wd-orange-vegetables',
      type: 'Article',
      title: 'Squash, carrots and sweet potatoes: your vitamin A season',
      summary: 'Orange vegetables are rich in beta-carotene, which your body turns into vitamin A as it needs it.',
      url: '/worth-digesting/#orange-vegetables',
      keywords: ['October 2026', 'Worth Digesting']
    },
    {
      id: 'wd-packed-lunches',
      type: 'Article',
      title: 'Packed lunches: build them like a plate',
      summary: 'Half vegetables and fruits, a quarter whole grains, a quarter protein, plus water and an ice pack.',
      url: '/worth-digesting/#packed-lunches',
      keywords: ['September 2026', 'Worth Digesting']
    },
    {
      id: 'wd-fibre-go-slow',
      type: 'Article',
      title: 'More fibre, less discomfort: go slow',
      summary: 'Most Canadians get about half the fibre they need. Add it a little at a time, with plenty of fluids.',
      url: '/worth-digesting/#fibre-go-slow',
      keywords: ['September 2026', 'Worth Digesting']
    },
    {
      id: 'wd-water-in-the-heat',
      type: 'Article',
      title: 'Water in the heat: drink before you’re thirsty',
      summary: 'Thirst is a late signal. In hot weather, drink water early and often, and skip the sports drinks.',
      url: '/worth-digesting/#water-in-the-heat',
      keywords: ['August 2026', 'Worth Digesting']
    },
    {
      id: 'wd-summer-food-safety',
      type: 'Article',
      title: 'Picnics and barbecues: keep cold food cold',
      summary: 'Bacteria grow fastest between 4°C and 60°C. Use a cooler, an ice pack and a thermometer.',
      url: '/worth-digesting/#summer-food-safety',
      keywords: ['August 2026', 'Worth Digesting']
    },
    {
      id: 'page-faq',
      type: 'Page',
      title: 'Frequently asked questions',
      summary: 'Answers about first sessions, referrals, follow-ups, appointment format, insurance and scope.',
      url: '/faq/',
      keywords: ['FAQ', 'questions', 'before booking', 'appointments', 'insurance', 'referral', 'scope']
    },
    {
      id: 'page-policies',
      type: 'Page',
      title: 'Practice policies',
      summary: 'Privacy, scope of practice, terms, cancellations and rescheduling for Hōlus Nutrition Counselling.',
      url: '/practice-policies.html',
      keywords: ['policies', 'privacy', 'terms', 'cancellation', 'rescheduling', 'scope']
    },
    {
      id: 'page-contact',
      type: 'Page',
      title: 'Contact Hōlus',
      summary: 'Send a general question about services or booking. Existing clients should use the secure Jane portal for clinical communication.',
      url: '/contact/',
      keywords: ['contact', 'email', 'hello at holus', 'general enquiry', 'general inquiry', 'booking question', 'Jane portal']
    },

    {
      id: 'service-initial-consultation',
      type: 'Service',
      title: 'Nutrition & Health Behaviour Consultation',
      summary: 'An initial consultation to understand your nutrition, lifestyle, routines, goals and priorities.',
      url: '/nutritional-counselling/#initial-consultation',
      keywords: ['initial session', 'first appointment', 'first visit', 'consultation', '60 minute', 'price', 'cost', 'book']
    },
    {
      id: 'service-follow-up',
      type: 'Service',
      title: 'Nutritional Counselling Follow-Up',
      summary: 'Review what is working, work through barriers and adjust your nutrition plan together.',
      url: '/nutritional-counselling/#follow-up',
      keywords: ['follow up', 'follow-up', 'check in', 'progress', '30 minute', 'price', 'cost', 'adjust plan']
    },
    {
      id: 'service-package',
      type: 'Service',
      title: 'Personalized Nutrition Package',
      summary: 'A 60-minute consultation, personalized 7-day meal plan and 30-minute follow-up to review and adjust it together.',
      url: '/nutritional-counselling/#personalized-package',
      keywords: ['package', 'meal plan', '7 day plan', 'follow up', 'ongoing support', 'price', 'cost', 'plan']
    },
    {
      id: 'service-intro-chat',
      type: 'Service',
      title: 'Free 15-minute introductory chat',
      summary: 'A short conversation to ask questions and decide whether Hōlus is the right fit.',
      url: '/nutritional-counselling/#intro-chat',
      keywords: ['free call', 'intro call', 'discovery call', '15 minute', 'not sure where to start', 'questions before booking']
    },

    {
      id: 'testing-gi-map',
      type: 'Testing',
      title: 'GI-MAP and microbiome stool testing',
      summary: 'Elective, non-diagnostic stool testing offered with a nutrition results review.',
      url: '/nutritional-counselling/#gi-map',
      keywords: ['GI MAP', 'microbiome', 'stool test', 'gut test', 'digestive testing', 'lab']
    },
    {
      id: 'testing-food-sensitivity',
      type: 'Testing',
      title: 'Food sensitivity (IgG)',
      summary: 'Elective, non-diagnostic IgG food sensitivity testing with a nutrition results review.',
      url: '/nutritional-counselling/#food-sensitivity',
      keywords: ['IgG', 'food sensitivity', 'food test', 'lab', 'testing']
    },
    {
      id: 'testing-htma',
      type: 'Testing',
      title: 'Hair tissue mineral analysis',
      summary: 'Elective, non-diagnostic hair mineral testing with a nutrition results review.',
      url: '/nutritional-counselling/#htma',
      keywords: ['HTMA', 'hair test', 'minerals', 'mineral analysis', 'lab', 'testing']
    },
    {
      id: 'testing-nutrigenomics',
      type: 'Testing',
      title: 'Nutrigenomics',
      summary: 'Elective, non-diagnostic cheek-swab DNA testing with a nutrition results review.',
      url: '/nutritional-counselling/#nutrigenomics',
      keywords: ['DNA', 'genes', 'genetic nutrition', 'cheek swab', 'caffeine', 'lactose', 'lab', 'testing']
    },
    {
      id: 'testing-dutch',
      type: 'Testing',
      title: 'DUTCH and other hormone profiles',
      summary: 'Elective, non-diagnostic dried urine or saliva hormone testing with a results review.',
      url: '/nutritional-counselling/#dutch',
      keywords: ['DUTCH test', 'hormones', 'cortisol', 'urine test', 'saliva test', 'lab', 'testing']
    },
    {
      id: 'testing-histamine',
      type: 'Testing',
      title: 'Histamine, DAO and zonulin',
      summary: 'Elective, non-diagnostic testing for markers related to histamine breakdown and zonulin.',
      url: '/nutritional-counselling/#histamine-dao-zonulin',
      keywords: ['histamine', 'DAO', 'zonulin', 'gut markers', 'lab', 'testing']
    },

    {
      id: 'nutrient-protein',
      type: 'Nutrient',
      title: 'Protein',
      summary: 'A building block of every cell that supports growth, repair and making new cells.',
      url: '/digest/#n-protein',
      keywords: ['amino acids', 'eggs', 'fish', 'yogurt', 'lentils', 'beans', 'nuts', 'seeds', 'plant protein']
    },
    {
      id: 'nutrient-carbohydrates',
      type: 'Nutrient',
      title: 'Carbohydrates',
      summary: 'Sugars and starches are broken down into glucose, which the body uses for energy.',
      url: '/digest/#n-carbs',
      keywords: ['carbs', 'glucose', 'energy', 'whole grains', 'fruit', 'potatoes', 'beans', 'fibre']
    },
    {
      id: 'nutrient-fats',
      type: 'Nutrient',
      title: 'Fats',
      summary: 'Dietary fats provide energy and help the body absorb vitamins A, D, E and K.',
      url: '/digest/#n-fats',
      keywords: ['fat', 'unsaturated fats', 'saturated fats', 'oils', 'avocado', 'nuts', 'fatty fish', 'vitamin absorption']
    },
    {
      id: 'nutrient-fibre',
      type: 'Nutrient',
      title: 'Fibre',
      summary: 'Fibre supports bowel regularity, fullness, cholesterol and blood sugar control.',
      url: '/digest/#n-fibre',
      keywords: ['fiber', 'regularity', 'bowel', 'cholesterol', 'blood sugar', 'oats', 'whole grains', 'beans', 'vegetables', 'fruit']
    },
    {
      id: 'nutrient-omega3',
      type: 'Nutrient',
      title: 'Omega-3s',
      summary: 'ALA, EPA and DHA are fats involved in cell membranes, the brain, eyes, heart and immune system.',
      url: '/digest/#n-omega3',
      keywords: ['omega3', 'omega 3', 'omega-3', 'ALA', 'EPA', 'DHA', 'fish', 'walnuts', 'flax', 'chia']
    },
    {
      id: 'nutrient-iron',
      type: 'Nutrient',
      title: 'Iron',
      summary: 'Iron helps make haemoglobin, which carries oxygen from the lungs through the body.',
      url: '/digest/#n-iron',
      keywords: ['hemoglobin', 'haemoglobin', 'oxygen', 'tiredness', 'energy', 'red meat', 'poultry', 'lentils', 'beans', 'spinach']
    },
    {
      id: 'nutrient-calcium',
      type: 'Nutrient',
      title: 'Calcium',
      summary: 'Calcium gives bones and teeth structure and supports muscles, nerves and blood vessels.',
      url: '/digest/#n-calcium',
      keywords: ['bones', 'teeth', 'osteoporosis', 'milk', 'yogurt', 'cheese', 'fortified beverage', 'tofu']
    },
    {
      id: 'nutrient-vitamin-d',
      type: 'Nutrient',
      title: 'Vitamin D',
      summary: 'Vitamin D helps absorb calcium and supports bones, muscles, nerves and immunity.',
      url: '/digest/#n-vitd',
      keywords: ['vit d', 'sunlight', 'calcium absorption', 'bones', 'muscles', 'immunity', 'fatty fish', 'egg yolks', 'fortified milk']
    },
    {
      id: 'nutrient-vitamin-b12',
      type: 'Nutrient',
      title: 'Vitamin B12',
      summary: 'Vitamin B12 helps keep blood and nerve cells healthy and supports DNA production.',
      url: '/digest/#n-b12',
      keywords: ['B12', 'blood cells', 'nerves', 'DNA', 'anaemia', 'anemia', 'metformin', 'plant based', 'vegan']
    },
    {
      id: 'nutrient-magnesium',
      type: 'Nutrient',
      title: 'Magnesium',
      summary: 'Magnesium supports many body processes, including muscle, nerve and bone function.',
      url: '/digest/#n-mg',
      keywords: ['muscles', 'nerves', 'bones', 'nuts', 'seeds', 'leafy greens', 'beans', 'whole grains']
    },
    {
      id: 'nutrient-folate',
      type: 'Nutrient',
      title: 'Folate',
      summary: 'Folate helps the body make DNA and new cells and is especially important around pregnancy.',
      url: '/digest/#n-folate',
      keywords: ['folic acid', 'vitamin B9', 'pregnancy', 'DNA', 'cell division', 'leafy greens', 'beans', 'enriched bread']
    },
    {
      id: 'nutrient-potassium',
      type: 'Nutrient',
      title: 'Potassium',
      summary: 'Potassium supports the kidneys, heart, muscle contraction and nerve signals.',
      url: '/digest/#n-potassium',
      keywords: ['heart', 'kidneys', 'muscles', 'nerves', 'blood pressure', 'bananas', 'potatoes', 'leafy greens', 'beans']
    },
    {
      id: 'nutrient-zinc',
      type: 'Nutrient',
      title: 'Zinc',
      summary: 'Zinc supports immunity, protein and DNA production, wound healing, taste and smell.',
      url: '/digest/#n-zinc',
      keywords: ['immune system', 'wound healing', 'taste', 'smell', 'meat', 'fish', 'poultry', 'beans', 'nuts']
    },
    {
      id: 'nutrient-vitc',
      type: 'Nutrient',
      title: 'Vitamin C',
      summary: 'Vitamin C supports collagen, healing, immunity and iron absorption from plant foods.',
      url: '/digest/#n-vitc',
      keywords: ['vitamin c', 'immune system', 'collagen', 'iron absorption', 'oranges', 'citrus', 'strawberries', 'peppers', 'broccoli', 'kiwi']
    },
    {
      id: 'nutrient-vita',
      type: 'Nutrient',
      title: 'Vitamin A',
      summary: 'Vitamin A supports vision in low light, immunity, skin and cell growth.',
      url: '/digest/#n-vita',
      keywords: ['vitamin a', 'vision', 'eyes', 'immune system', 'skin', 'carrots', 'sweet potatoes', 'leafy greens', 'eggs', 'dairy']
    },

    {
      id: 'faq-first-session',
      type: 'FAQ',
      title: 'What happens in a first session?',
      summary: 'A comprehensive conversation about nutrition, lifestyle, routines, goals and priorities, followed by practical next steps.',
      url: '/faq/#first-session',
      keywords: ['initial session', 'first appointment', 'what to expect', 'recommendations', 'resources']
    },
    {
      id: 'faq-referral-needed',
      type: 'FAQ',
      title: 'Do I need a diagnosis or referral?',
      summary: 'You can book directly. Nutrition support can work alongside care from another practitioner.',
      url: '/faq/#referral-needed',
      keywords: ['doctor referral', 'physician referral', 'diagnosis', 'book directly']
    },
    {
      id: 'faq-follow-ups',
      type: 'FAQ',
      title: 'What are follow-up appointments for?',
      summary: 'Follow-ups review what is working, address barriers and adjust the approach together.',
      url: '/faq/#follow-up-appointments',
      keywords: ['follow up', 'progress', 'barriers', 'adjust plan', 'ongoing care']
    },
    {
      id: 'faq-format',
      type: 'FAQ',
      title: 'Are appointments virtual or in person?',
      summary: 'Appointment format and availability are confirmed when you book.',
      url: '/faq/#appointment-format',
      keywords: ['virtual appointment', 'online', 'in person', 'location', 'availability']
    },
    {
      id: 'faq-booking',
      type: 'FAQ',
      title: 'How do I book?',
      summary: 'Contact Hōlus about an initial consultation or a free 15-minute introductory chat.',
      url: '/faq/#booking',
      keywords: ['book', 'booking', 'appointment', 'consultation', 'intro chat', 'contact']
    },
    {
      id: 'faq-scope',
      type: 'FAQ',
      title: 'What is outside your scope?',
      summary: 'Hōlus does not diagnose conditions, treat disease, interpret medical tests or prescribe or adjust medication.',
      url: '/faq/#scope',
      keywords: ['scope of practice', 'diagnosis', 'medical treatment', 'lab interpretation', 'medication', 'limits']
    },
    {
      id: 'faq-collaboration',
      type: 'FAQ',
      title: 'Can you work alongside my physician or another practitioner?',
      summary: 'Nutrition counselling can complement care from a physician, prescriber or another practitioner.',
      url: '/faq/#collaborative-care',
      keywords: ['physician', 'doctor', 'prescriber', 'healthcare team', 'collaborative care', 'multidisciplinary']
    },
    {
      id: 'faq-referrals',
      type: 'FAQ',
      title: 'When would you refer me elsewhere?',
      summary: 'Referral is used when something needs medical assessment or care beyond nutrition education.',
      url: '/faq/#referrals',
      keywords: ['refer out', 'red flag', 'medical assessment', 'doctor', 'scope', 'safety']
    },
    {
      id: 'faq-insurance',
      type: 'FAQ',
      title: 'Are appointments covered by insurance or benefits?',
      summary: 'Coverage varies by plan. Receipts list Juliana’s professional designations for benefit claims.',
      url: '/faq/#insurance-benefits',
      keywords: ['insurance', 'benefits', 'extended health', 'coverage', 'receipt', 'claim', 'reimbursement', 'RNCP', 'NNCP', 'CFNP']
    },

    {
      id: 'policy-privacy',
      type: 'Policy',
      title: 'Privacy Policy',
      summary: 'What Hōlus collects, why it is used, where it is kept, who it may be shared with and your privacy rights.',
      url: '/practice-policies.html#privacy',
      keywords: ['privacy', 'personal information', 'data', 'consent', 'retention', 'PIPEDA', 'PHIPA', 'security']
    },
    {
      id: 'policy-scope',
      type: 'Policy',
      title: 'Scope of Practice',
      summary: 'The role and limits of nutrition education and lifestyle support at Hōlus.',
      url: '/practice-policies.html#scope',
      keywords: ['scope', 'nutrition education', 'diagnosis', 'treatment', 'medication', 'medical care', 'referral']
    },
    {
      id: 'policy-terms',
      type: 'Policy',
      title: 'Terms and Conditions',
      summary: 'Information about sessions, client responsibilities, fees, payment and website resources.',
      url: '/practice-policies.html#terms',
      keywords: ['terms', 'conditions', 'sessions', 'fees', 'payment', 'client responsibilities', 'website use']
    },
    {
      id: 'policy-cancellation',
      type: 'Policy',
      title: 'Cancellation and rescheduling policy',
      summary: 'Practice terms for cancelling or rescheduling an appointment.',
      url: '/practice-policies.html#cancellation',
      keywords: ['cancel', 'cancellation', 'reschedule', 'rescheduling', 'missed appointment', 'late notice', 'refund']
    }
  ];

  return Object.freeze(records.map(function (record) {
    return Object.freeze({
      id: record.id,
      type: record.type,
      title: record.title,
      summary: record.summary,
      url: record.url,
      keywords: Object.freeze(record.keywords.slice())
    });
  }));
});
