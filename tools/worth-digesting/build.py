import re,html,os
exec(open(os.path.join(os.path.dirname(__file__),'articles.py')).read())
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..')+'/'
T=open(R+'digest/index.html').read()
head=T[:T.index('<main')]; foot=T[T.index('</main>')+len('</main>'):]
head=re.sub(r'<title>.*?</title>','<title>Worth Digesting | hōlus.</title>',head)
head=re.sub(r'<meta name="description" content="[^"]*">','<meta name="description" content="Worth Digesting: short, science-backed nutrition reads from Hōlus Nutrition Counselling, explained plainly with links to the original sources.">',head)
head=re.sub(r'<link rel="canonical" href="[^"]*">','<link rel="canonical" href="https://holus.ca/worth-digesting/">',head)
for icon in {a['icon'] for e in EDITIONS for a in e[4]}:
    assert os.path.exists(R+'assets/illustrations/'+icon+'.svg'),icon
e=html.escape
css='''<style>
.wd .section-shell{max-width:58rem}
.wd-tabs{display:inline-flex;flex-wrap:wrap;gap:.25rem;padding:.25rem;margin:1.4rem 0 1.6rem;border-radius:999px;background:var(--mist)}
.wd-tabs button{padding:.5rem 1.1rem;border:0;border-radius:999px;background:none;color:var(--ink);font:700 .9rem Manrope,sans-serif;cursor:pointer}
.wd-tabs button[aria-pressed="true"]{background:var(--ink);color:#fff}
.wd-ed[hidden]{display:none}
.wd-ed>.eyebrow{margin:0 0 .4rem}.wd-ed>h2{margin:0 0 .35rem;font:800 clamp(1.5rem,3vw,2rem)/1.1 Manrope,sans-serif;letter-spacing:-.035em}
.wd-ed>p{margin:0 0 1.2rem;color:var(--muted)}
.wd-art{margin:0 0 .9rem;border-radius:22px;background:var(--cloud);overflow:hidden}
.wd-art summary{display:grid;grid-template-columns:auto 1fr auto;gap:1rem;align-items:center;padding:1.05rem 1.2rem;cursor:pointer;list-style:none}
.wd-art summary::-webkit-details-marker{display:none}
.wd-art summary img{width:3.6rem;height:auto}
.wd-art h3{margin:0;font:800 1.12rem/1.2 Manrope,sans-serif;letter-spacing:-.025em}
.wd-art summary p{margin:.25rem 0 0;color:var(--muted);font-size:.93rem}
.wd-art summary .wd-go{font:700 .82rem Manrope,sans-serif;color:var(--sage-deep);white-space:nowrap}
.wd-art[open] summary .wd-go{visibility:hidden}
.wd-body{padding:0 1.2rem 1.3rem;display:grid;gap:.75rem}
.wd-hook{margin:0;font:600 1.02rem/1.5 Inter,sans-serif;color:var(--ink)}
.wd-blk{padding:1rem 1.15rem;border-radius:16px;background:#fff}
.wd-blk h4{margin:0 0 .5rem;color:var(--sage-deep);font:800 .74rem/1 Manrope,sans-serif;letter-spacing:.1em;text-transform:uppercase}
.wd-blk p{margin:0 0 .6rem}.wd-blk p:last-child{margin:0}
.wd-blk ul{margin:0;padding-left:1.1rem}.wd-blk li{margin:.3rem 0}
.wd-src a{color:var(--sage-deep);text-underline-offset:.2rem}
.wd-note{margin:0;color:var(--muted);font-size:.8rem}
.wd-share{justify-self:start;padding:.4rem .85rem;border:1px solid var(--line);border-radius:999px;background:#fff;font:700 .78rem Manrope,sans-serif;color:var(--ink);cursor:pointer}
@media(max-width:600px){.wd-art summary{grid-template-columns:auto 1fr}.wd-art summary .wd-go{display:none}.wd-art summary img{width:2.8rem}}
</style>'''
tabs=''.join(f'<button type="button" data-ed="{k}" aria-pressed="{str(i==0).lower()}">{e(lbl.split()[0][:3])}</button>' for i,(k,lbl,_,_,_) in enumerate(EDITIONS))
eds=''
for i,(k,lbl,theme,intro,arts) in enumerate(EDITIONS):
    eds+=f'<section class="wd-ed" id="{k}" data-ed="{k}"{"" if i==0 else " hidden"}><p class="eyebrow">{e(lbl)} edition</p><h2>{e(theme)}.</h2><p>{e(intro)}</p>'
    for a in arts:
        eds+=(f'<details class="wd-art" id="{a["id"]}"><summary><img src="../assets/illustrations/{a["icon"]}.svg" alt="" width="240" height="200">'
              f'<div><h3>{e(a["title"])}</h3><p>{e(a["summary"])}</p></div><span class="wd-go">Read →</span></summary><div class="wd-body">'
              f'<p class="wd-hook">{e(a["hook"])}</p>'
              f'<div class="wd-blk"><h4>What the evidence says</h4>'+''.join(f'<p>{e(x)}</p>' for x in a['evidence'])+'</div>'
              f'<div class="wd-blk"><h4>On your plate</h4><ul>'+''.join(f'<li>{e(x)}</li>' for x in a['plate'])+'</ul></div>'
              f'<div class="wd-blk wd-src"><h4>Where this comes from</h4><ul>'+''.join(f'<li><a href="{u}" target="_blank" rel="noopener">{e(n)}</a></li>' for n,u in a['sources'])+'</ul></div>'
              f'<p class="wd-note">General information, not personal advice. Talk to a qualified professional before changing your diet or supplements.</p>'
              f'<button type="button" class="wd-share" data-link="{a["id"]}">Copy link to this article</button></div></details>')
    eds+='</section>'
js='''<script>(function(){var r=document.querySelector('.wd');if(!r)return;
function show(k){r.querySelectorAll('.wd-ed').forEach(function(s){s.hidden=s.dataset.ed!==k});r.querySelectorAll('.wd-tabs button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.ed===k))});}
r.querySelectorAll('.wd-tabs button').forEach(function(b){b.addEventListener('click',function(){show(b.dataset.ed)})});
function route(){var h=location.hash.slice(1);if(!h)return;var t=document.getElementById(h);if(!t)return;var ed=t.closest('.wd-ed');if(ed)show(ed.dataset.ed);if(t.tagName==='DETAILS'){t.open=true;setTimeout(function(){t.scrollIntoView({block:'start'})},60);}}
route();window.addEventListener('hashchange',route);
r.querySelectorAll('.wd-share').forEach(function(b){b.addEventListener('click',function(){var u=location.href.split('#')[0]+'#'+b.dataset.link;var done=function(){b.textContent='Link copied';setTimeout(function(){b.textContent='Copy link to this article'},1800)};if(navigator.clipboard)navigator.clipboard.writeText(u).then(done,function(){prompt('Copy this link',u)});else prompt('Copy this link',u);})});
})();</script>'''
main=(f'<main id="main">{css}<section class="wd section-pad" aria-labelledby="wd-title"><div class="section-shell">'
      f'<header class="nutri-head"><p class="eyebrow">Hōlus Digest</p><h1 id="wd-title">Worth Digesting.</h1><p>Science-backed reads, every source linked.</p></header>'
      f'<div class="wd-tabs" role="group" aria-label="Edition">{tabs}</div>{eds}</div></section>{js}</main>')
os.makedirs(R+'worth-digesting',exist_ok=True)
open(R+'worth-digesting/index.html','w').write(head+main+foot)
print('built', sum(len(x[4]) for x in EDITIONS),'articles')
