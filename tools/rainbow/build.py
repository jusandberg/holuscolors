# Builds the "Eating a rainbow" section on the Digest page: foods sit on a rainbow,
# tapping one fills its colour band and shows what that colour's compounds are linked with.
# Run: python3 tools/rainbow/build.py   (replaces the <section class="rb ..."> block in digest/index.html)
import json, os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
PAGE = os.path.join(ROOT, 'digest', 'index.html')

# [colour, hex, compounds, health benefit, [[food, icon, what it brings], ...]]
BANDS = [
    ['Red', '#ad6459', 'Lycopene, anthocyanins',
     'Many red foods carry anthocyanins. In large population studies, people who eat more of them tend to have better heart health.',
     [['Tomatoes', 'veg-tomato', 'Lycopene, the red pigment. Cooked tomatoes release more of it than raw.'],
      ['Strawberries', 'fruit-strawberry', 'Anthocyanins and ellagitannins, which gut bacteria turn into other compounds.'],
      ['Apples', 'fruit-apple', 'Quercetin and other polyphenols, mostly in the skin.']]],
    ['Orange + yellow', '#c7b07a', 'Carotenoids, citrus flavonoids',
     'Beta-carotene becomes vitamin A, which helps you see in low light and supports your immune system and skin.',
     [['Carrots', 'veg-carrot-orange', 'Beta-carotene, which your body can turn into vitamin A.'],
      ['Sweet potato', 'veg-sweet-potato', 'Beta-carotene. The deeper the orange, the more there tends to be.'],
      ['Oranges', 'fruit-orange', 'Hesperidin, a citrus flavonoid found mostly in the white pith.']]],
    ['Green', '#71836d', 'Glucosinolates, lutein, catechins',
     'Lutein collects in the back of the eye, and research from the U.S. National Eye Institute links it with healthy eyes as we age.',
     [['Broccoli', 'veg-broccoli', 'Glucosinolates, which gut bacteria help turn into sulforaphane.'],
      ['Kale', 'veg-kale', 'Glucosinolates, plus lutein hiding under the green.'],
      ['Kiwi', 'fruit-kiwi', 'Lutein, plus plenty of vitamin C.']]],
    ['Blue + purple', '#9c8aa2', 'Anthocyanins, resveratrol',
     'Most anthocyanins reach your colon, where gut bacteria break them into smaller compounds that may explain some of their benefits. Higher intakes are linked with better heart health in population studies; research in people on gut bacteria is still early and mixed.',
     [['Blueberries', 'fruit-blueberries', 'Anthocyanins, the blue-purple pigment, mostly in the skins.'],
      ['Grapes', 'fruit-grapes', 'Anthocyanins and resveratrol, mostly in the skins.'],
      ['Eggplant', 'veg-eggplant', 'Nasunin, an anthocyanin in the purple skin.']]],
    ['White + brown', '#bfae8a', 'Sulphur compounds, prebiotic fibres',
     'Garlic and onions bring inulin-type fibres. In studies of healthy adults, these fibres feed helpful gut bacteria such as bifidobacteria.',
     [['Garlic', 'veg-garlic', 'Sulphur compounds such as allicin, made when it’s chopped or crushed.'],
      ['Onions', 'veg-onion', 'Quercetin, plus inulin-type fibres. Onions are one of the richest everyday sources of quercetin.'],
      ['Cauliflower', 'veg-cauliflower', 'Glucosinolates, just like its cousin broccoli.']]],
]

RESEARCH = [
    ('Eating by colour: Minich, ', 'http://dx.doi.org/10.1155/2019/2125070', 'A review of the science of colourful, plant-based food and “eating the rainbow”', ', Journal of Nutrition and Metabolism, 2019.'),
    ('Anthocyanins and heart health: Xu and others, ', 'https://www.frontiersin.org/articles/10.3389/fnut.2021.747884/full', 'Anthocyanins, anthocyanin-rich berries and cardiovascular risks', ' (44 trials and 15 cohort studies), Frontiers in Nutrition, 2021.'),
    ('Anthocyanins and gut bacteria: ', 'https://www.tandfonline.com/doi/full/10.1080/10408398.2023.2187212', 'Anthocyanins–gut microbiota–health axis: a review', ', Critical Reviews in Food Science and Nutrition, 2023.'),
    ('Berries, gut bacteria and blood pressure: ', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9182664/', 'The effects of berry polyphenols on the gut microbiota and blood pressure: a systematic review of randomized clinical trials in humans', ', 2022.'),
    ('Vitamin A and beta-carotene: ', 'https://ods.od.nih.gov/factsheets/VitaminA-Consumer/', 'Vitamin A and carotenoids fact sheet', ', NIH Office of Dietary Supplements.'),
    ('Lutein and eye health: ', 'https://www.nei.nih.gov/eye-health-information/clinical-trials/age-related-eye-disease-studies-aredsareds2/aredsareds2-frequently-asked-questions', 'AREDS/AREDS2 frequently asked questions', ', U.S. National Eye Institute.'),
    ('Onion and garlic fibres: ', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8970830/', 'The prebiotic potential of inulin-type fructans: a systematic review', ' of trials in healthy adults, 2022.'),
    ('Polyphenols and gut bacteria: Lin and others, ', 'https://foodandnutritionresearch.net/index.php/fnr/article/view/1518/9101', 'Dietary polyphenols and the intestinal microecology', ', Food & Nutrition Research, 2019.'),
    ('Glucosinolates: Bouranis and others, ', 'https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2021.748433/full', 'Metabolic fate of dietary glucosinolates: a role for the microbiome', ', Frontiers in Nutrition, 2021.'),
]

def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

for b in BANDS:
    for f in b[4]:
        assert os.path.exists(os.path.join(ROOT, 'assets', 'illustrations', f[1] + '.svg')), f[1]

research = ''.join(f'<li>{esc(a)}<a href="{u}" target="_blank" rel="noopener">{esc(t)}</a>{esc(z)}</li>' for a, u, t, z in RESEARCH)

SECTION = '''<section class="rb section-pad" aria-labelledby="rb-title"><style>
.nutri.section-pad{padding-bottom:clamp(1.5rem,3vw,2.5rem)}
.rb.section-pad{padding-top:clamp(1.5rem,3vw,2.5rem)}
.rb .section-shell{max-width:62rem}
.rbw{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:clamp(1rem,3vw,2rem);align-items:center;margin-top:1.2rem}
.rbw svg{display:block;width:100%;max-width:520px;height:auto;margin:0 auto;overflow:visible;-webkit-user-select:none;user-select:none}
.rbw .band{fill:none;stroke-linecap:round}
.rbw .fill{fill:none;stroke-linecap:round;pointer-events:none;visibility:hidden;transition:stroke-dasharray .5s ease}
.rbw .food{cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent}
.rbw .food .hit{pointer-events:all}
.rbw .food image{transition:opacity .3s ease,filter .3s ease}
.rbw .food.off image{opacity:.5;filter:grayscale(.7)}
.rbw .food:focus-visible .ring{stroke-width:3;stroke-opacity:1}
.rbw .ctr{font:800 30px Manrope,sans-serif;fill:var(--ink)}.rbw .ctrs{font:700 10px Manrope,sans-serif;letter-spacing:.14em;fill:#7a8086}
.rb-msg{margin:.5rem 0 0;text-align:center;font:800 1.05rem/1.3 Manrope,sans-serif}
.rb-card{padding:1.15rem 1.2rem;border-radius:22px;background:var(--cloud);min-height:12rem}
.rb-card .rb-hint{margin:0;color:var(--muted)}
.rb-card .rb-food{display:grid;grid-template-columns:3.2rem 1fr;gap:.8rem;align-items:center}
.rb-card .rb-food img{width:3.2rem;height:auto}
.rb-card b{display:block;font:800 1.02rem/1.2 Manrope,sans-serif}
.rb-card .rb-cmp{margin:.15rem 0 0;color:var(--muted);font-size:.85rem}
.rb-card .rb-fact{margin:.75rem 0 0;font-size:.95rem}
.rb-card .rb-ben{margin:.75rem 0 0;padding:.75rem .85rem;border-radius:14px;background:#fff;font-size:.93rem;line-height:1.5}
.rb-card .rb-ben span{display:block;margin-bottom:.2rem;color:var(--sage-deep);font:800 .7rem/1 Manrope,sans-serif;letter-spacing:.1em;text-transform:uppercase}
.rb-reset{display:block;margin:.8rem auto 0;padding:.45rem .95rem;border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--ink);font:700 .82rem Manrope,sans-serif;cursor:pointer}
.rb-why{margin:1.3rem 0 0;font-size:.98rem}
.rb-research{margin-top:.6rem}.rb-research summary{cursor:pointer;color:var(--sage-deep);font:700 .85rem Manrope,sans-serif}
.rb-research ul{margin:.6rem 0 0;padding-left:1.1rem;color:var(--muted);font-size:.82rem;line-height:1.5}.rb-research a{color:var(--sage-deep)}
@media(max-width:820px){.rbw{grid-template-columns:1fr}.rb-card{min-height:0}}
@media(max-width:600px){.rbw svg{max-width:none;width:calc(100% + 1rem);margin:0 -.5rem}}
@media(prefers-reduced-motion:reduce){.rbw .fill,.rbw .food image{transition:none}}
</style><div class="section-shell">
<header class="nutri-head"><p class="eyebrow">Try it</p><h2 id="rb-title" style="margin:.7rem 0 .6rem;font-size:clamp(2.1rem,5vw,3.2rem);line-height:1;letter-spacing:-.05em">Eating a rainbow.</h2><p>Tap the foods you’ve had this week.</p></header>
<div class="rbw"><div><svg viewBox="0 0 400 240" role="group" aria-label="Foods on a rainbow, by colour"></svg></div>
<div><div class="rb-card" aria-live="polite" data-rb-card><p class="rb-hint">Tap a food on the rainbow to see what its colour brings and what it’s linked with.</p></div><button type="button" class="rb-reset" data-rb-reset hidden>Start over</button></div></div>
<p class="rb-why">Phytochemicals are compounds plants make for colour, flavour and protection. Each colour brings different ones, so a mix of colours gives you more of them.</p>
<details class="rb-research"><summary>The research behind this</summary><ul>__RESEARCH__</ul></details>
</div><script>(function(){
var root=document.querySelector('.rb');if(!root)return;var IMG='../assets/illustrations/',B=__BANDS__;
var NS='http://www.w3.org/2000/svg',CX=200,CY=210,R=[185,157,129,101,73],W=22,GREY='#ecebe7';
var svg=root.querySelector('.rbw svg'),card=root.querySelector('[data-rb-card]'),rs=root.querySelector('[data-rb-reset]');
var hint=card.innerHTML,have=B.map(function(){return [0,0,0]}),fills=[],foods=[];
function pt(r,d){var a=d*Math.PI/180;return [CX-r*Math.cos(a),CY-r*Math.sin(a)]}
function arc(r){var p=pt(r,0),q=pt(r,180);return 'M'+p[0]+' '+p[1]+' A'+r+' '+r+' 0 0 1 '+q[0]+' '+q[1]}
function el(t,a){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);return e}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
B.forEach(function(b,i){svg.appendChild(el('path',{d:arc(R[i]),'class':'band',stroke:GREY,'stroke-width':W}));var f=el('path',{d:arc(R[i]),'class':'fill',stroke:b[1],'stroke-width':W,pathLength:3,'stroke-dasharray':'0 3'});svg.appendChild(f);fills.push(f)});
B.forEach(function(b,i){var off=[-18,0,18,-18,12][i];[34,90,146].forEach(function(a,j){var fd=b[4][j],p=pt(R[i],a+off),sz=36;
 var g=el('g',{'class':'food off',tabindex:0,role:'button','aria-pressed':'false','aria-label':fd[0]+', '+b[0]});
 g.appendChild(el('circle',{cx:p[0],cy:p[1],r:23,fill:'transparent','class':'hit'}));
 g.appendChild(el('circle',{cx:p[0],cy:p[1],r:17,fill:'#fff',stroke:b[1],'stroke-width':1.5,'stroke-opacity':.5,'class':'ring'}));
 g.appendChild(el('image',{href:IMG+fd[1]+'.svg',x:p[0]-sz/2,y:p[1]-sz/2,width:sz,height:sz}));svg.appendChild(g);foods.push(g);
 function go(){have[i][j]=have[i][j]?0:1;g.classList.toggle('off',!have[i][j]);g.setAttribute('aria-pressed',String(!!have[i][j]));var k=have[i].reduce(function(x,y){return x+y});fills[i].setAttribute('stroke-dasharray',k+' 3');fills[i].style.visibility=k?'visible':'hidden';
  card.innerHTML='<div class="rb-food"><img src="'+IMG+fd[1]+'.svg" alt=""><div><b style="color:'+b[1]+'">'+esc(fd[0])+' · '+esc(b[0])+'</b><p class="rb-cmp">'+esc(b[2])+'</p></div></div><p class="rb-fact">'+esc(fd[2])+'</p><p class="rb-ben"><span>Linked with</span>'+esc(b[3])+'</p>';upd()}
 g.addEventListener('click',go);g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})})});
function upd(){var t=have.reduce(function(x,h){return x+h[0]+h[1]+h[2]},0);rs.hidden=!t}
rs.addEventListener('click',function(){have=B.map(function(){return [0,0,0]});fills.forEach(function(f){f.setAttribute('stroke-dasharray','0 3');f.style.visibility='hidden'});foods.forEach(function(g){g.classList.add('off');g.setAttribute('aria-pressed','false')});card.innerHTML=hint;upd()});
})();</script></section>'''

section = SECTION.replace('__RESEARCH__', research).replace('__BANDS__', json.dumps(BANDS, ensure_ascii=False))
t = open(PAGE).read()
i = t.find('<section class="rb section-pad"')
assert i > -1, 'rainbow section not found'
j = t.find('</section>', t.find('</script>', i)) + len('</section>')
t = t[:i] + section + t[j:]
open(PAGE, 'w').write(t)
print('rainbow section rebuilt')
