import html,os,re
exec(open(os.path.join(os.path.dirname(__file__),'articles.py')).read())
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..')+'/'; e=html.escape
MYTHS=[
 ("You need a detox or cleanse.","There’s no convincing research that detox diets remove toxins or help long-term weight loss, and weight lost on them tends to come back. Some can be unsafe.","NCCIH (NIH)","https://www.nccih.nih.gov/health/detoxes-and-cleanses-what-you-need-to-know"),
 ("Frozen vegetables aren’t as good as fresh.","Frozen and canned vegetables and fruits are just as nutritious as fresh. Choose plain ones, without added sugar, salt or sauces.","Canada’s Food Guide","https://food-guide.canada.ca/en/healthy-eating-recommendations/make-it-a-habit-to-eat-vegetables-fruit-whole-grains-and-protein-foods/eat-vegetables-and-fruits/"),
 ("Honey and maple syrup are healthier sugars.","They count as free sugars, just like table sugar. Canada’s guidance is to keep free sugars low, whatever the source.","Health Canada","https://www.canada.ca/en/health-canada/services/nutrients/sugars.html"),
 ("More protein is always better.","Most Canadians already get enough protein from a mixed diet, which is why labels show no % Daily Value for it. You don’t need large amounts.","Health Canada","https://www.canada.ca/en/health-canada/services/nutrients/protein.html"),
 ("Sports drinks beat water in the heat.","For most people in hot weather, sports drinks offer little advantage. Water is the recommended choice.","Health Canada","https://www.canada.ca/en/health-canada/services/climate-change-health/extreme-heat/how-protect-yourself.html"),
 ("Vitamin C stops you catching colds.","For most people, regular vitamin C doesn’t lower the chance of a cold. It may make colds slightly shorter.","NIH Office of Dietary Supplements","https://ods.od.nih.gov/factsheets/VitaminC-Consumer/"),
 ("“Whole wheat” means whole grain.","Not always. Look for “whole grain” followed by the grain’s name near the top of the ingredient list.","Canada’s Food Guide","https://food-guide.canada.ca/en/healthy-eating-recommendations/make-it-a-habit-to-eat-vegetables-fruit-whole-grains-and-protein-foods/eat-whole-grain-foods/"),
]
SEASON={ # Foodland Ontario availability guide; one idea each
 8:[("Peaches","fruit-peach","Slice onto yogurt or oats."),("Plums","fruit-plum","Halve and roast with cinnamon."),("Raspberries","fruit-raspberry","Freeze extras for winter oatmeal."),("Corn","veg-corn","Grill and toss into a bean salad."),("Field tomatoes","veg-tomato","Slice with basil and a pinch of salt."),("Zucchini","veg-zucchini","Grate into pasta sauce or muffins.")],
 9:[("Grapes","fruit-grapes","Freeze for a cold, sweet snack."),("Peaches","fruit-peach","Bake with a crumble of oats."),("Apples","fruit-apple","Pair with a spoon of nut butter."),("Broccoli","veg-broccoli","Roast until the edges crisp."),("Pumpkin","food-pumpkin","Roast the seeds for a crunchy snack."),("Spinach","veg-greens","Wilt into eggs or pasta.")],
 10:[("Apples","fruit-apple","Bake with cinnamon and oats on top."),("Pears","fruit-pear","Slice into a salad with walnuts."),("Grapes","fruit-grapes","Roast with chicken for a sweet-savoury tray."),("Pumpkin","food-pumpkin","Stir purée into chili or oatmeal."),("Cauliflower","veg-cauliflower","Roast whole or mash with potatoes."),("Kale","veg-kale","Massage with lemon for a quick salad.")],
 11:[("Apples","fruit-apple","Simmer into a quick, no-sugar sauce."),("Pears","fruit-pear","Poach and serve with yogurt."),("Carrots","veg-carrot-orange","Roast with a little oil and thyme."),("Sweet potatoes","veg-sweet-potato","Bake and top with black beans."),("Nappa cabbage","food-cabbage","Shred into a fast slaw or stir-fry."),("Kale","veg-kale","Add to soups in the last few minutes.")],
}
for m in SEASON.values():
    for n,i,_ in m: assert os.path.exists(R+'assets/illustrations/'+i+'.svg'),i
MN={8:'August',9:'September',10:'October',11:'November'}
css='''<style>
.dx.section-pad{padding-block:clamp(1.5rem,3vw,2.5rem)}
.rb.section-pad{padding-bottom:clamp(.5rem,1.5vw,1rem)}
.dx .section-shell{max-width:62rem}
.mf-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(14rem,1fr));gap:.75rem;margin-top:1.2rem}
.mf{position:relative;min-height:12.5rem;perspective:900px;border:0;padding:0;background:none;text-align:left;cursor:pointer;font:inherit;color:inherit}
.mf-in{position:absolute;inset:0;transition:transform .6s cubic-bezier(.3,.8,.3,1);transform-style:preserve-3d}
.mf[aria-pressed="true"] .mf-in{transform:rotateY(180deg)}
.mf-f,.mf-b{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;padding:1.1rem 1.15rem;border-radius:20px;backface-visibility:hidden;-webkit-backface-visibility:hidden}
.mf-f{background:var(--cloud)}
.mf-b{background:#243341;color:#fff;transform:rotateY(180deg)}
.mf-q{font:800 1.12rem/1.22 Manrope,sans-serif;letter-spacing:-.025em}
.mf-t{font:700 .72rem Manrope,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.mf-b b{font:800 .95rem Manrope,sans-serif;color:#c7d2c4}
.mf-b p{margin:.35rem 0 0;font-size:.88rem;line-height:1.45;color:rgba(255,255,255,.88)}
.mf-b a{font:700 .74rem Manrope,sans-serif;color:#c7b07a;text-underline-offset:.2rem}
.ss-tabs{display:inline-flex;gap:.25rem;padding:.25rem;margin:1rem 0 1.1rem;border-radius:999px;background:var(--mist)}
.ss-tabs button{padding:.45rem 1rem;border:0;border-radius:999px;background:none;color:var(--ink);font:700 .88rem Manrope,sans-serif;cursor:pointer}
.ss-tabs button[aria-pressed="true"]{background:var(--ink);color:#fff}
.ss-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(9.5rem,1fr));gap:.7rem}
.ss-grid[hidden]{display:none}
.ss-item{padding:.9rem .9rem 1rem;border-radius:18px;background:#f4efe2;text-align:center}
.ss-item:nth-child(3n+2){background:#eef2ed}.ss-item:nth-child(3n){background:#f3e9e5}
.ss-item img{width:4.6rem;height:auto}
.ss-item strong{display:block;margin-top:.25rem;font:800 .95rem Manrope,sans-serif}
.ss-item span{display:block;margin-top:.2rem;font-size:.82rem;color:#55585d;line-height:1.35}
.ss-note{margin:.9rem 0 0;color:var(--muted);font-size:.78rem}.ss-note a{color:var(--sage-deep)}
.wdt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:.75rem;margin-top:1.1rem}
.wdt{display:grid;grid-template-columns:auto 1fr;gap:.9rem;align-items:center;padding:1rem 1.1rem;border-radius:20px;background:var(--cloud);color:inherit;text-decoration:none}
.wdt img{width:3.4rem;height:auto}.wdt h3{margin:0;font:800 1.02rem/1.2 Manrope,sans-serif;letter-spacing:-.02em}.wdt p{margin:.2rem 0 0;font-size:.86rem;color:var(--muted)}
.wdt:hover h3{text-decoration:underline;text-underline-offset:.2rem}
.wdt-all{display:inline-block;margin-top:.9rem;font:700 .9rem Manrope,sans-serif;color:var(--sage-deep)}
@media(max-width:700px){.mf-grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;margin-inline:calc(50% - 50vw);padding:0 max(1rem,calc(50vw - 50%)) .4rem;scroll-padding-inline:max(1rem,calc(50vw - 50%));scrollbar-width:none}.mf-grid::-webkit-scrollbar{display:none}.mf{flex:0 0 78%;max-width:18rem;min-height:11.5rem;scroll-snap-align:start}}
@media(prefers-reduced-motion:reduce){.mf-in{transition:none}}
</style>'''
myths='<section class="dx section-pad" aria-labelledby="mf-title"><div class="section-shell"><header class="nutri-head"><p class="eyebrow">Myth or fact?</p><h2 id="mf-title" style="margin:.7rem 0 .6rem;font-size:clamp(2.1rem,5vw,3.2rem);line-height:1;letter-spacing:-.05em">Things you’ve probably heard.</h2><p>Tap a card to see the evidence.</p></header><div class="mf-grid">'
for q,a,src,u in MYTHS:
    myths+=f'<button type="button" class="mf" aria-pressed="false"><span class="mf-in"><span class="mf-f"><span class="mf-q">“{e(q.strip("“”"))}”</span><span class="mf-t">Myth or fact? Tap</span></span><span class="mf-b"><span><b>Mostly myth.</b><p>{e(a)}</p></span><a href="{u}" target="_blank" rel="noopener">Source: {e(src)} ↗</a></span></span></button>'
myths+='</div></div></section>'
ss='<section class="dx section-pad" aria-labelledby="ss-title"><div class="section-shell"><header class="nutri-head"><p class="eyebrow">Eat with the season</p><h2 id="ss-title" style="margin:.7rem 0 .6rem;font-size:clamp(2.1rem,5vw,3.2rem);line-height:1;letter-spacing:-.05em">In season in Ontario.</h2><p>Local produce, with one simple idea each.</p></header><div class="ss-tabs" role="group" aria-label="Month">'
ss+=''.join(f'<button type="button" data-m="{m}" aria-pressed="false">{MN[m][:3]}</button>' for m in SEASON)+'</div>'
for m,items in SEASON.items():
    ss+=f'<div class="ss-grid" data-m="{m}" hidden>'+''.join(f'<div class="ss-item"><img src="../assets/illustrations/{i}.svg" alt="" width="240" height="200"><strong>{e(n)}</strong><span>{e(t)}</span></div>' for n,i,t in items)+'</div>'
ss+='<p class="ss-note">From the <a href="https://www.ontario.ca/foodland/page/availability-guide" target="_blank" rel="noopener">Foodland Ontario availability guide</a>. “Availability dates may change by several weeks with respect to varieties and/or weather conditions.”</p></div></section>'
latest=EDITIONS[0]
wdt=f'<section class="dx section-pad" aria-labelledby="wdt-title"><div class="section-shell"><header class="nutri-head"><p class="eyebrow">Worth Digesting · {e(latest[1])}</p><h2 id="wdt-title" style="margin:.7rem 0 .6rem;font-size:clamp(2.1rem,5vw,3.2rem);line-height:1;letter-spacing:-.05em">This month’s reads.</h2><p>Science-backed, with every source linked.</p></header><div class="wdt-grid">'
wdt+=''.join(f'<a class="wdt" href="../worth-digesting/index.html#{a["id"]}"><img src="../assets/illustrations/{a["icon"]}.svg" alt="" width="240" height="200"><span><h3>{e(a["title"])}</h3><p>{e(a["summary"])}</p></span></a>' for a in latest[4])
wdt+='</div><a class="wdt-all" href="../worth-digesting/index.html">All editions →</a></div></section>'
js='''<script>(function(){document.querySelectorAll('.mf').forEach(function(c){c.addEventListener('click',function(ev){if(ev.target.closest('a'))return;c.setAttribute('aria-pressed',String(c.getAttribute('aria-pressed')!=='true'))})});
var tabs=document.querySelectorAll('.ss-tabs button'),grids=document.querySelectorAll('.ss-grid');if(!tabs.length)return;
function show(m){tabs.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.m==m))});grids.forEach(function(g){g.hidden=g.dataset.m!=m})}
tabs.forEach(function(b){b.addEventListener('click',function(){show(b.dataset.m)})});
var now=new Date().getMonth()+1,ms=[].map.call(tabs,function(b){return +b.dataset.m}),pick=ms.indexOf(now)>-1?now:(now<ms[0]?ms[0]:ms[ms.length-1]);show(pick);})();</script>'''
block='<!-- digest-extras -->'+css+ss+wdt+js+'<!-- /digest-extras -->'  # myth tiles removed Nov 2026
p=R+'digest/index.html'; t=open(p).read()
t=re.sub(r'<!-- digest-extras -->.*?<!-- /digest-extras -->','',t,flags=re.S)
k='<section class="next-step"'; assert t.count(k)==1
t=t.replace(k,block+'\n'+k); open(p,'w').write(t); print('digest extras inserted')
