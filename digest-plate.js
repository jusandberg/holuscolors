const plateTopics = {
  macros: {
    name: 'Macronutrients',
    intro: 'Nutrients the body needs in larger amounts. They provide energy, structure and materials the body uses every day.',
    details: [
      ['Energy', 'Carbohydrates', 'The body’s preferred energy source for many activities. Carbohydrates include sugars, starches and fibre.'],
      ['Structure', 'Protein', 'Provides amino acids used to build and repair tissues and make enzymes, hormones and other body proteins.'],
      ['Energy & function', 'Fats', 'Provide concentrated energy, supply essential fatty acids and help the body absorb fat-soluble vitamins.']
    ],
    note: 'Most foods contain a combination of nutrients. Categories help us understand food, but the whole eating pattern matters more than any one nutrient.'
  },
  micros: {
    name: 'Micronutrients',
    intro: 'Vitamins and minerals the body needs in smaller amounts. They do not provide energy, but they help many body processes function normally.',
    details: [
      ['Organic compounds', 'Vitamins', 'Include vitamins A, C, D, E, K and the B vitamins. Each has distinct roles, and no single food provides them all.'],
      ['Elements', 'Minerals', 'Include calcium, iron, magnesium, potassium, zinc and others used in body structure and regulation.'],
      ['The big picture', 'Variety matters', 'Different foods contribute different vitamins and minerals, which is one reason varied eating patterns are useful.']
    ],
    note: 'More is not automatically better. Needs differ, and high-dose supplements are not the same as obtaining a variety of nutrients from food.'
  },
  phyto: {
    name: 'Phytochemicals',
    intro: 'Naturally occurring compounds made by plants. They are not classified as essential nutrients, but they are part of what makes plant foods biologically diverse.',
    details: [
      ['What they are', 'Plant compounds', 'Large families include carotenoids, flavonoids, glucosinolates and many other compounds.'],
      ['Where they appear', 'Colour, flavour & aroma', 'They occur across vegetables, fruit, legumes, whole grains, herbs, spices, tea, coffee, nuts and seeds.'],
      ['Practical takeaway', 'Eat a variety', 'Different plants contain different compounds. Variety is more useful than chasing one “superfood.”']
    ],
    note: 'Research continues to explore how phytochemicals relate to health. They complement—not replace—essential nutrients and an overall nourishing eating pattern.'
  },
  fibre: {
    name: 'Fibre',
    intro: 'A type of carbohydrate the body does not fully digest. Fibre contributes to digestive function, fullness and the way meals are absorbed.',
    details: [
      ['Forms a gel', 'Soluble fibre', 'Dissolves in water and can influence digestion, blood cholesterol and the rise in blood glucose after eating.'],
      ['Adds bulk', 'Insoluble fibre', 'Helps add bulk to stool and supports regular movement through the digestive tract.'],
      ['Feeds microbes', 'Fermentable fibre', 'Some fibres are used by gut microbes, which produce compounds that interact with the gut environment.']
    ],
    note: 'Different foods provide different fibres. Increase fibre gradually when appropriate and pair it with adequate fluid; individual tolerance varies.'
  },
  water: {
    name: 'Water & hydration',
    intro: 'Water is an essential nutrient. It does not provide energy, but every part of the body depends on adequate fluid balance.',
    details: [
      ['Daily sources', 'Fluids', 'Water and other beverages contribute to hydration throughout the day.'],
      ['Often overlooked', 'Food contributes too', 'Fruit, vegetables, soups, yogurt and many other foods also contribute water.'],
      ['Context matters', 'Needs vary', 'Fluid needs change with body size, activity, climate, pregnancy, illness and other individual factors.']
    ],
    note: 'Hydration is more than following one universal number. Thirst, urine colour, activity, environment and healthcare guidance can all provide context.'
  }
};

const plateButtons = document.querySelectorAll('[data-plate-topic]');
const plateName = document.querySelector('[data-plate-name]');
const plateIntro = document.querySelector('[data-plate-intro]');
const plateNote = document.querySelector('[data-plate-note]');
const detailFields = [
  [document.querySelector('[data-detail-one-label]'), document.querySelector('[data-detail-one-title]'), document.querySelector('[data-detail-one-text]')],
  [document.querySelector('[data-detail-two-label]'), document.querySelector('[data-detail-two-title]'), document.querySelector('[data-detail-two-text]')],
  [document.querySelector('[data-detail-three-label]'), document.querySelector('[data-detail-three-title]'), document.querySelector('[data-detail-three-text]')]
];

plateButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const topic = plateTopics[button.dataset.plateTopic];
    if (!topic) return;

    plateButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });

    if (plateName) plateName.textContent = topic.name;
    if (plateIntro) plateIntro.textContent = topic.intro;
    if (plateNote) plateNote.textContent = topic.note;
    topic.details.forEach((detail, index) => {
      detailFields[index].forEach((field, fieldIndex) => {
        if (field) field.textContent = detail[fieldIndex];
      });
    });
  });
});
