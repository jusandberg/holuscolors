(() => {
  const resources = [
    {
      category: 'One study',
      description: 'Research worth knowing about, with context around what the findings actually mean.',
      title: 'Easy-to-learn dietary behavior change intervention',
      summary: 'A 2025 randomized trial found that simple, semi-personalized dietary prompts were feasible but did not significantly improve overall diet quality.',
      why: 'It is a useful reminder that information alone may not be enough—and that tailoring and ongoing contact matter.',
      url: 'https://www.sciencedirect.com/science/article/pii/S0271531725000727',
      action: 'Read the study',
      icon: '<path d="M6 4h9l5 5v11H6z"></path><path d="M15 4v5h5M9 13h8M9 17h6"></path>'
    },
    {
      category: 'One excellent article',
      description: 'Clear, credible writing that makes a nutrition or health topic easier to understand.',
      title: 'Health Canada’s 2025 evidence review supporting Canada’s Food Guide',
      summary: 'A concise review of current evidence, including how social, cultural, economic and physical environments shape eating decisions.',
      why: 'It reflects the idea at the centre of Hōlus Nutrition Counselling: food choices happen within a person’s wider life and environment.',
      url: 'https://www.canada.ca/en/health-canada/services/food-guide/educators-professionals/evidence-review-cycle/summaries/2025.html',
      action: 'Read the evidence review',
      icon: '<path d="M5 4h14v16H5z"></path><path d="M8 8h8M8 12h8M8 16h5"></path>'
    },
    {
      category: 'One podcast',
      description: 'A conversation worth listening to, selected for the ideas it brings to the table.',
      title: 'What Makes a Habit Stick?',
      summary: 'A Mayo Clinic on Nutrition conversation about decision fatigue, realistic change, flexibility, perfectionism and how habits evolve.',
      why: 'It connects nutrition advice with the realities of behaviour change instead of treating consistency as willpower.',
      url: 'https://podcasts.apple.com/us/podcast/what-makes-a-habit-stick/id1742274110?i=1000756970145',
      action: 'Listen to the episode',
      icon: '<path d="M4 13a8 8 0 0 1 16 0"></path><path d="M4 13v5h3v-6H4M20 13v5h-3v-6h3"></path>'
    },
    {
      category: 'One video or talk',
      description: 'A useful explanation of a topic that is sometimes easier to see than read about.',
      title: 'Eat Smart: A Simple Guide to Balanced Nutrition',
      summary: 'A short Academy of Nutrition and Dietetics video explaining balanced nutrition and how food groups can fit together.',
      why: 'At under two minutes, it proves a useful resource does not need to become another long lecture.',
      url: 'https://www.eatright.org/health/wellness/healthful-habits/eat-smart-a-simple-guide-to-balanced-nutrition',
      action: 'Watch the video',
      icon: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m10 9 5 3-5 3z"></path>'
    },
    {
      category: 'Behaviour-change resource',
      description: 'Practical ideas for understanding habits, motivation and the realities behind changing how we eat.',
      title: 'Be mindful of your eating habits',
      summary: 'Health Canada prompts reflection on how, why, what, when, where and how much we eat, including the environment around eating.',
      why: 'It is practical and specific without turning mindful eating into vague wellness language.',
      url: 'https://www.canada.ca/en/health-canada/services/food-guide/explore/healthy-eating-recommendations/be-mindful-eating-habits.html',
      action: 'Explore the resource',
      icon: '<path d="M7 7h8a5 5 0 0 1 5 5v1"></path><path d="m17 10 3 3 3-3M17 17H9a5 5 0 0 1-5-5v-1"></path><path d="m7 14-3-3-3 3"></path>'
    },
    {
      category: 'Practical nutrition resource',
      description: 'A useful tool, guide or resource you can take away and use in everyday life.',
      title: 'Plan what you eat',
      summary: 'A practical Health Canada guide to planning around schedules, cooking time, leftovers, overlapping ingredients and household needs.',
      why: 'It offers useful structure while making room for the reality that there is no single right way to meal-plan.',
      url: 'https://www.canada.ca/en/health-canada/services/food-guide/explore/healthy-eating-recommendations/cook-more-often/plan-what-you-eat.html',
      action: 'Use the meal-planning resource',
      icon: '<rect x="5" y="4" width="14" height="17" rx="2"></rect><path d="M9 4.5h6M9 9h6M9 13h6M9 17h4"></path>'
    },
    {
      category: 'Juliana’s pick',
      description: 'Something I found especially useful, interesting or worth sharing this month.',
      title: 'Canada Food Guide Kitchen',
      summary: 'Recipes and practical collections for meals with 10 ingredients or less, 30 minutes or less, freezer-friendly, no-cook and more.',
      why: 'It is the kind of genuinely useful resource someone might bookmark and return to on a busy week.',
      url: 'https://www.canada.ca/en/health-canada/services/food-guide/eating-support/kitchen.html',
      action: 'Explore the Food Guide Kitchen',
      icon: '<path d="M6 4h12v17l-6-4-6 4z"></path><path d="m12 8 .9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 10l2-.3z"></path>'
    }
  ];

  const grid = document.getElementById('digest-resource-grid');
  if (!grid) return;

  grid.innerHTML = resources.map((resource) => `
    <article class="digest-card digest-card-linked">
      <svg class="digest-card-icon" viewBox="0 0 24 24" aria-hidden="true">${resource.icon}</svg>
      <h3>${resource.category}</h3>
      <p class="digest-category-description">${resource.description}</p>
      <div class="digest-resource-content">
        <h4>${resource.title}</h4>
        <p>${resource.summary}</p>
        <p class="digest-why"><strong>Why I picked it:</strong> ${resource.why}</p>
        <a href="${resource.url}" target="_blank" rel="noopener noreferrer">${resource.action} →</a>
      </div>
    </article>`).join('');
})();
