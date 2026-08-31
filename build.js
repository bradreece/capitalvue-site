const fs = require('fs');
const path = require('path');
const DIR = '/home/claude/capitalvue-site';
const BASE = 'https://www.capitalvue.com.au/';
const A = f => 'assets/' + f;
const LOGO_DARK = A('logo-2.png');
const LOGO_WHITE = A('logo-white.png');
const FAVICON = A('favicon.png');
const PHOTO = {
  brad:A('team-brad.png'), andrew:A('team-andrew.png'), chris:A('team-chris.png'),
  bec:A('team-bec.png'), tony:A('team-tony.png'), nolan:A('team-nolan.png')
};
const BUY = {
  taigum:A('buy-taigum.jpg'), carina:A('buy-carina.jpg'),
  chapel:A('buy-chapelhill.jpg'), morning:A('buy-morningside.jpg'),
  keperra:A('buy-keperra.jpg'), stmorris:A('buy-stmorris.jpg'),
  petigrain:A('buy-petigrain.jpg'), wellington:A('buy-wellington.jpg')
};
const PURCHASES = [
  {img:BUY.morning,   type:'Investment purchase', loc:'Morningside, QLD', paid:'$1,925,000', value:'$1,990,000', grow:'+3.38%'},
  {img:BUY.carina,    type:'Investment purchase', loc:'Carina Heights, QLD', paid:'$944,500', value:'$1,250,000', grow:'+32.35%'},
  {img:BUY.taigum,    type:'Investment purchase', loc:'Taigum, QLD', paid:'$865,000', value:'$1,050,000', grow:'+21.39%'},
  {img:BUY.chapel,    type:'Investment purchase', loc:'Chapel Hill, QLD', paid:'$1,642,500', value:'$1,840,000', grow:'+12.02%'},
  {img:BUY.keperra,   type:'Owner-occupier home', loc:'Keperra, QLD', paid:'$1,160,000', value:'$1,260,000', grow:'+8.62%'},
  {img:BUY.stmorris,  type:'Investment purchase', loc:'St Morris, SA', paid:'$1,507,000', value:'$1,720,000', grow:'+14.13%'},
  {img:BUY.petigrain, type:'Owner-occupier home', loc:'Palmwoods, QLD', paid:'$1,070,000', value:'$1,170,000', grow:'+9.35%'},
  {img:BUY.wellington,type:'Investment purchase · apartment', loc:'Kangaroo Point, QLD', paid:'$850,000', value:'$1,193,000', grow:'+40.35%'}
];
const fcard = p => `<a class="fcard" href="#purchases"><div class="fimg"><img loading="lazy" decoding="async" src="${p.img}" alt="${p.type} secured in ${p.loc}"></div><div class="fbd"><div class="ftype">${p.type}</div><div class="floc">${p.loc}</div><div class="fgrow">${p.grow} <span>since purchase</span></div></div></a>`;
const featBand = `
<section class="featband"><div class="wrap feat-wrap">
  <div class="feat-lead reveal">
    <span class="eyebrow" style="color:#4fc2c2">Recent client wins</span>
    <div class="feat-title serif">Real assets, already working.</div>
    <a class="feat-jump" href="#purchases">See other purchases <span>↓</span></a>
  </div>
  <div class="feat-cards" id="featCards">${fcard(PURCHASES[0])}${fcard(PURCHASES[1])}</div>
</div></section>`;
const readContent = f => fs.readFileSync(path.join(DIR,'content',f),'utf8');
const DASH = A('tracker-shot.jpg');
const BLOGIMG = {
  'buyers-agent-fees-australia': A('blog-buyers-agent-fees.jpg'),
  'adelaide-house-vs-unit-yield-gap': A('blog-adelaide-yield.jpg'),
  'property-due-diligence-checklist': A('blog-due-diligence.jpg'),
  'wait-or-buy-brisbane-2026': A('blog-wait-or-buy.jpg'),
  'australian-property-investment-structures': A('blog-structures.jpg'),
  'rental-crisis-cgt-investors': A('blog-perfect-storm.jpg'),
  'cgt-discount-review': A('blog-cgt-review.jpg'),
  'benefits-of-rentvesting': A('blog-rentvesting.jpg'),
};

const CSS = `
@font-face{font-family:'Poppins';font-style:normal;font-weight:400;font-display:optional;src:url('assets/fonts/poppins-400.woff2') format('woff2')}
@font-face{font-family:'Poppins';font-style:normal;font-weight:500;font-display:optional;src:url('assets/fonts/poppins-500.woff2') format('woff2')}
@font-face{font-family:'Poppins';font-style:normal;font-weight:600;font-display:optional;src:url('assets/fonts/poppins-600.woff2') format('woff2')}
@font-face{font-family:'Poppins';font-style:normal;font-weight:700;font-display:optional;src:url('assets/fonts/poppins-700.woff2') format('woff2')}
@font-face{font-family:'Fraunces';font-style:normal;font-weight:400 700;font-display:optional;src:url('assets/fonts/fraunces-var.woff2') format('woff2-variations')}
@font-face{font-family:'Poppins Fallback';src:local('Roboto'),local('Arial'),local('Helvetica Neue');ascent-override:93.62%;descent-override:31.21%;line-gap-override:8.92%;size-adjust:112.15%}
@font-face{font-family:'Fraunces Fallback';src:local('Georgia'),local('Times New Roman'),local('Times');size-adjust:125%}
:root{
  --navy:#092a4b; --navy-2:#123a63; --ink:#071f38;
  --emerald:#148f8f; --emerald-d:#0f7373;
  --purple:#6d3bf0; --gold:#c9a24b;
  --paper:#f6f8fb; --paper-2:#eef1f6; --line:#dde3ec;
  --muted:#57687f; --white:#fff; --radius:18px;
  --shadow:0 18px 45px -20px rgba(9,42,75,.4);
  --shadow-sm:0 8px 24px -14px rgba(9,42,75,.45);
  --maxw:1160px;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Poppins','Poppins Fallback',system-ui,-apple-system,sans-serif;color:var(--ink);background:#fff;line-height:1.6;-webkit-font-smoothing:antialiased}
h1,h2,h3{line-height:1.14;letter-spacing:-.02em;font-weight:700}
h2{font-size:clamp(1.8rem,4vw,2.7rem)}
h3{font-size:1.25rem}
p{color:var(--muted)}
a{color:inherit;text-decoration:none}
img{max-width:100%;display:block}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 22px}
.eyebrow{font-size:.78rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--emerald)}
.serif{font-family:'Fraunces','Fraunces Fallback',Georgia,serif;font-weight:600;letter-spacing:-.01em}
.btn{display:inline-flex;align-items:center;gap:.5rem;font-weight:600;font-size:.98rem;padding:.85rem 1.5rem;border-radius:999px;transition:.2s;cursor:pointer;border:1px solid transparent;white-space:nowrap}
.btn-primary{background:var(--emerald);color:#fff;box-shadow:0 10px 22px -10px rgba(20,143,143,.7)}
.btn-primary:hover{background:var(--emerald-d);transform:translateY(-2px)}
.btn-ghost{background:transparent;color:var(--navy);border-color:var(--line)}
.btn-ghost:hover{border-color:var(--navy);background:#fff}
.btn-navy{background:var(--navy);color:#fff}
.btn-navy:hover{background:#0c3a66;transform:translateY(-2px)}
.btn-light{background:#fff;color:var(--navy)}
.btn-light:hover{transform:translateY(-2px)}
.btn-outline-l{background:transparent;color:#fff;border-color:rgba(255,255,255,.35)}
.btn-outline-l:hover{border-color:#fff;background:rgba(255,255,255,.08)}
header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;justify-content:space-between;gap:1.6rem;height:74px}
.logo{flex:0 0 auto}
.logo img{height:38px;width:auto;max-width:none}
.nav-links{display:flex;align-items:center;gap:1.15rem}
.nav-links a{font-size:.93rem;font-weight:500;color:#33465f}
.nav-links a:hover,.nav-links a.active{color:var(--emerald)}
.nav-dd{position:relative;padding:27px 0}
.nav-dd>button{font:inherit;font-size:.93rem;font-weight:500;color:#33465f;background:none;border:0;padding:0;cursor:pointer;display:inline-flex;align-items:center;gap:.34rem;line-height:1.2}
.nav-dd>button:after{content:"";width:6px;height:6px;border-right:1.7px solid currentColor;border-bottom:1.7px solid currentColor;transform:rotate(45deg) translateY(-2px);opacity:.55}
.nav-dd:hover>button,.nav-dd:focus-within>button,.nav-dd.on>button{color:var(--emerald)}
.nav-dd-menu{position:absolute;top:100%;left:-14px;min-width:250px;background:#fff;border:1px solid var(--line);border-radius:14px;box-shadow:var(--shadow-sm);padding:8px;display:none;flex-direction:column}
.nav-dd:hover>.nav-dd-menu,.nav-dd:focus-within>.nav-dd-menu{display:flex}
.nav-dd-menu a{display:block;padding:9px 12px;border-radius:9px;font-size:.9rem;white-space:nowrap;color:#33465f}
.nav-dd-menu a:hover,.nav-dd-menu a.active{background:#f2f6fa;color:var(--emerald)}
.nav-m{display:none}
.nav-cta{display:flex;align-items:center;gap:.8rem}
.cta-short{display:none}
.nav-phone{font-weight:600;color:var(--navy);font-size:.93rem;white-space:nowrap}
@media(max-width:1300px){.nav-phone{display:none}}
.burger{display:none;flex-direction:column;gap:5px;background:none;border:0;cursor:pointer;padding:6px}
.burger span{width:24px;height:2px;background:var(--navy);border-radius:2px}
/* Burger from 960px, not 640px: the flat nav was already overflowing on tablets
   between those widths, and the dropdowns need room to sit. */
@media(max-width:960px){
  .nav-links{display:none}
  .nav-links.open{display:flex;position:absolute;top:74px;left:0;right:0;flex-direction:column;align-items:flex-start;text-align:left;background:#fff;padding:18px 22px;gap:.95rem;border-bottom:1px solid var(--line);box-shadow:var(--shadow-sm);max-height:calc(100vh - 74px);overflow-y:auto}
  .nav-links.open>a{width:100%;font-weight:600;color:var(--navy)}
  .burger{display:flex}
  .nav-dd{padding:0;width:100%}
  .nav-dd>button{width:100%;justify-content:flex-start;font-weight:600;color:var(--navy)}
  .nav-dd>button:after{display:none}
  .nav-dd-menu{display:flex;position:static;border:0;box-shadow:none;padding:4px 0 2px 14px;min-width:0;background:none}
  .nav-dd-menu a{padding:6px 0;white-space:normal}
  /* Client portal and the phone number live in .nav-cta, outside the link list,
     so they were unreachable once the burger took over. Surface them in the menu. */
  .nav-m{display:block;width:100%;font-weight:600;color:var(--emerald)}
  .nav-links.open>.nav-m{border-top:1px solid var(--line);padding-top:.9rem;margin-top:.15rem}
  .nav-links.open>.nav-m+.nav-m{border-top:0;padding-top:0;margin-top:-.2rem}
  .nav-portal{display:none}
}
.hero{position:relative;background:radial-gradient(1200px 600px at 80% -10%,#12457b 0%,var(--navy) 45%,#061a30 100%);color:#fff;overflow:hidden}
.hero:before{content:"";position:absolute;inset:0;background:radial-gradient(600px 300px at 12% 100%,rgba(20,143,143,.22),transparent 60%),radial-gradient(500px 260px at 95% 30%,rgba(109,59,240,.16),transparent 60%)}
.hero-grid{position:relative;display:grid;grid-template-columns:1.1fr .9fr;gap:52px;align-items:center;padding:78px 0 84px}
.hero h1{font-size:clamp(2.2rem,5vw,3.6rem);color:#fff}
.hero h1 em{font-style:normal;color:#4fc2c2}
.hero .sub{color:#c6d2e2;font-size:1.12rem;margin:1.3rem 0 2rem;max-width:34ch}
.hero-actions{display:flex;gap:.9rem;flex-wrap:wrap}
.hero-trust{margin-top:2.2rem;display:flex;align-items:center;gap:1rem;color:#aebccf;font-size:.9rem}
.stars{color:#f5b942;letter-spacing:2px}
.hcard{background:linear-gradient(180deg,#fff,#f4f7fb);border-radius:22px;padding:26px;box-shadow:0 40px 80px -30px rgba(0,0,0,.55);color:var(--ink)}
.hc-top{display:flex;align-items:center;justify-content:space-between;padding-bottom:16px;border-bottom:1px solid var(--line)}
.hc-badge{display:flex;align-items:center;gap:.5rem;font-weight:600;color:var(--navy);font-size:.95rem}
.hc-badge .dot{width:22px;height:22px;border-radius:50%;background:var(--emerald);display:grid;place-items:center;color:#fff;font-size:.7rem}
.hc-tag{font-size:.72rem;font-weight:600;color:var(--emerald);background:#e3f4f4;padding:.25rem .6rem;border-radius:999px}
.res-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:8px}
.res-table{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;font-size:.94rem;min-width:560px}
.res-table th{text-align:left;padding:13px 14px;background:#f6f8fa;color:var(--navy);font-size:.76rem;letter-spacing:.06em;text-transform:uppercase;font-weight:700;border-bottom:1px solid var(--line)}
.res-table td{padding:13px 14px;border-bottom:1px solid var(--line);color:var(--muted)}
.res-table td strong{color:var(--ink)}
.res-table tbody tr:last-child td{border-bottom:1px solid var(--line)}
.res-table td.g{color:var(--emerald);font-weight:700;white-space:nowrap}
.res-table tfoot td{background:#f6f8fa;border-bottom:0;color:var(--ink)}
.hc-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:18px}
.mkt-copy p{margin-bottom:1.05rem;font-size:1.02rem;line-height:1.75}
.mkt-copy p:last-child{margin-bottom:0}
.hc-stat{background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px 12px}
.hc-stat .ic{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;margin-bottom:8px;font-size:.85rem}
.hc-stat .n{font-size:1.35rem;font-weight:700;color:var(--ink);letter-spacing:-.02em}
.hc-stat .l{font-size:.72rem;color:var(--muted);line-height:1.3}
.hc-foot{margin-top:16px;font-size:.72rem;color:#93a1b5}
.featband{position:relative;background:linear-gradient(180deg,#061a30,#04121f);color:#fff}
.feat-wrap{display:grid;grid-template-columns:.62fr 1.38fr;gap:32px;align-items:center;padding:30px 0 40px}
.feat-lead .eyebrow{display:block}
.feat-title{font-size:1.45rem;color:#fff;margin:.3rem 0 1rem;line-height:1.2}
.feat-jump{display:inline-flex;align-items:center;gap:.4rem;font-weight:600;font-size:.9rem;color:#4fc2c2;border:1px solid rgba(79,194,194,.4);border-radius:999px;padding:.5rem 1rem;transition:background .2s}
.feat-jump:hover{background:rgba(79,194,194,.12)}
.feat-jump span{transition:transform .2s}.feat-jump:hover span{transform:translateY(2px)}
.feat-cards{display:grid;grid-template-columns:1fr 1fr;gap:18px;transition:opacity .45s ease}
.feat-cards.fade{opacity:0}
.fcard{display:flex;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden;color:#fff;transition:border-color .2s,transform .2s}
.fcard:hover{border-color:rgba(79,194,194,.5);transform:translateY(-2px)}
.fcard .fimg{width:118px;flex:0 0 118px;overflow:hidden}
.fcard .fimg img{width:100%;height:100%;object-fit:cover;display:block}
.fcard .fbd{padding:14px 16px;display:flex;flex-direction:column;justify-content:center;min-width:0}
.fcard .ftype{font-size:.7rem;letter-spacing:.04em;text-transform:uppercase;color:#8fb0c9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fcard{min-height:92px}
.fcard .floc{font-family:'Fraunces','Fraunces Fallback',serif;font-size:1.05rem;font-weight:600;margin:.15rem 0 .4rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fcard .fgrow{font-size:1.1rem;font-weight:700;color:#4fc2c2}
.fcard .fgrow span{font-size:.72rem;font-weight:500;color:#8fb0c9}
@media(max-width:860px){.feat-wrap{grid-template-columns:1fr;gap:20px;padding:26px 0 32px}}
@media(max-width:560px){.feat-cards{grid-template-columns:1fr}.feat-cards .fcard:nth-child(2){display:none}}
.trustbar{background:var(--ink);color:#fff}
.trustbar .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:18px;padding:22px}
.tb-item{display:flex;flex-direction:column}
.tb-item .n{font-size:1.5rem;font-weight:700;letter-spacing:-.02em}
.tb-item .n b{color:#4fc2c2}
.tb-item .l{font-size:.78rem;color:#9fb0c6;text-transform:uppercase;letter-spacing:.08em}
section{padding:84px 0}
.sec-head{max-width:660px;margin-bottom:48px}
.sec-head.center{margin-left:auto;margin-right:auto;text-align:center}
.sec-head h2{margin-top:.5rem}
.sec-head p{margin-top:1rem;font-size:1.05rem}
.bg-paper{background:var(--paper)}
.page-hero{background:radial-gradient(900px 400px at 85% -20%,#12457b,var(--navy) 55%,#061a30);color:#fff;padding:66px 0 58px}
.page-hero .eyebrow{color:#4fc2c2}
.page-hero h1{font-size:clamp(2rem,4.5vw,3rem);color:#fff;margin-top:.5rem}
.page-hero p{color:#c6d2e2;margin-top:1rem;max-width:56ch;font-size:1.08rem}
.crumb{font-size:.82rem;color:#93a7c2;margin-bottom:.3rem}
.crumb a:hover{color:#fff}
.prob-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.prob{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:28px}
.prob h3{font-size:1.05rem;margin-bottom:.5rem;color:var(--ink)}
.prob p{font-size:.95rem}
.prob .q{font-family:'Fraunces','Fraunces Fallback',serif;font-size:1.05rem;color:var(--navy);font-style:italic;margin-bottom:.8rem}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.step{padding:28px 22px;border-radius:var(--radius);background:#fff;border:1px solid var(--line)}
.step .num{font-family:'Fraunces','Fraunces Fallback',serif;font-size:2.2rem;color:var(--emerald);line-height:1}
.step h3{font-size:1.05rem;margin:.7rem 0 .4rem;color:var(--ink)}
.step p{font-size:.9rem}
.svc-grid{display:grid;grid-template-columns:1.35fr 1fr;gap:24px}
.svc-hero{background:linear-gradient(160deg,var(--navy),#061a30);color:#fff;border-radius:22px;padding:38px;position:relative;overflow:hidden}
.svc-hero:after{content:"";position:absolute;right:-60px;bottom:-60px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(20,143,143,.35),transparent 70%)}
.svc-hero .price{font-size:2.4rem;font-weight:700;letter-spacing:-.02em;margin:.4rem 0}
.svc-hero .price span{font-size:.95rem;font-weight:500;color:#aebccf}
.svc-hero ul{list-style:none;margin:1.4rem 0 1.8rem;display:grid;gap:.6rem}
.svc-hero li{display:flex;gap:.6rem;align-items:flex-start;font-size:.95rem;color:#dbe4f0}
.svc-hero li svg{flex:0 0 auto;margin-top:3px}
.svc-side{display:grid;gap:24px}
.svc-min{background:#fff;border:1px solid var(--line);border-radius:18px;padding:24px}
.svc-min h3{font-size:1.05rem;color:var(--ink)}
.svc-min .p2{font-weight:700;color:var(--navy);font-size:1.3rem;margin:.3rem 0}
.svc-min p{font-size:.9rem}
.svc-min .row{display:flex;justify-content:space-between;align-items:baseline;gap:10px;padding:.55rem 0;border-top:1px dashed var(--line);font-size:.92rem}
.svc-min .row:first-of-type{border-top:0}
.svc-min .row b{color:var(--navy)}
.feat{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.feat-list{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:1.6rem}
.feat-item{display:flex;gap:.6rem;align-items:flex-start;font-size:.92rem;color:#33465f}
.feat-item .tick{width:22px;height:22px;border-radius:6px;background:#e3f4f4;color:var(--emerald);display:grid;place-items:center;flex:0 0 auto;font-size:.7rem;font-weight:700}
.feat-visual{background:linear-gradient(160deg,#0d3157,#061a30);border-radius:22px;padding:26px;color:#fff;box-shadow:var(--shadow)}
.fv-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.fv-chip{font-size:.7rem;background:rgba(255,255,255,.1);padding:.3rem .7rem;border-radius:999px;color:#cdd8e8}
.fv-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.fv-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:16px}
.fv-card .l{font-size:.72rem;color:#9fb0c6}
.fv-card .n{font-size:1.4rem;font-weight:700;margin-top:4px}
.fv-card .n.up{color:#4fc2c2}
.fv-bar{margin-top:12px;height:60px;display:flex;align-items:flex-end;gap:6px}
.fv-bar span{flex:1;background:linear-gradient(180deg,#148f8f,#123a63);border-radius:4px 4px 0 0;opacity:.85}
.rev-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.rev{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:26px;display:flex;flex-direction:column;box-shadow:var(--shadow-sm)}
.rev .stars{font-size:.95rem;margin-bottom:.8rem}
.rev q{font-family:'Fraunces','Fraunces Fallback',serif;font-size:1.06rem;color:var(--ink);quotes:none;line-height:1.5}
.rev .who{margin-top:auto;padding-top:18px;display:flex;align-items:center;gap:.7rem}
.rev .av{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:600;font-size:.95rem;flex:0 0 auto}
.rev .who .nm{font-weight:600;color:var(--ink);font-size:.92rem}
.rev .who .src{font-size:.75rem;color:var(--muted)}
.rev-cta{text-align:center;margin-top:36px}
.team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.member{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:24px;text-align:center}
.member .av{width:70px;height:70px;border-radius:50%;margin:0 auto 14px;display:grid;place-items:center;color:#fff;font-weight:600;font-size:1.3rem}
.member .nm{font-weight:600;color:var(--ink)}
.member .rl{font-size:.82rem;color:var(--emerald);font-weight:600;margin-bottom:.6rem}
.member p{font-size:.85rem}
.member .contact{margin-top:.7rem;font-size:.82rem;line-height:1.6}
.member .contact a{color:var(--emerald);font-weight:600}
.member .contact .lbl{color:var(--muted);font-weight:500}
.member.wide{grid-column:span 2;text-align:left;display:flex;gap:18px;align-items:flex-start}
.member.wide .av{margin:0}
.member .av img{width:100%;height:100%;object-fit:cover;border-radius:50%}
.member .photo{width:100%;aspect-ratio:37/48;max-height:240px;object-fit:cover;border-radius:14px;margin-bottom:14px}
.member.wide{display:flex;gap:18px;align-items:flex-start;text-align:left}
.member.wide .photo{width:118px;height:150px;margin-bottom:0;flex:0 0 auto}
.socials{display:flex;gap:.6rem;margin-top:1.1rem}
.socials a{width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,.08);display:grid;place-items:center;color:#c2cddd;transition:.2s}
.socials a:hover{background:var(--emerald);color:#fff}
.hero .slogan{font-family:'Fraunces','Fraunces Fallback',serif;font-size:1.22rem;color:#eaf3ff;margin-top:.7rem}
.buys{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;max-width:920px;margin:0 auto}
.buy{background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-sm)}
.buy .img{height:210px;overflow:hidden}
.buy .img img{width:100%;height:100%;object-fit:cover}
.buy .bd{padding:22px}
.buy .sub2{font-size:.8rem;color:var(--muted)}
.buy .loc{font-weight:600;color:var(--ink);font-size:1.05rem;margin:.1rem 0 .8rem}
.buy .figs{display:flex;justify-content:space-between;gap:8px;border-top:1px solid var(--line);padding-top:12px}
.buy .fig .l{font-size:.66rem;color:var(--muted);text-transform:uppercase;letter-spacing:.05em}
.buy .fig .v{font-weight:700;color:var(--ink)}
.buy .fig .v.up{color:var(--emerald)}
@media(max-width:960px){.buys{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.buys{grid-template-columns:1fr}}
.cta{background:radial-gradient(900px 400px at 20% 0%,#12457b,var(--navy));color:#fff;text-align:center;border-radius:26px;padding:60px 26px;box-shadow:var(--shadow)}
.cta h2{color:#fff}
.cta p{color:#c6d2e2;max-width:52ch;margin:1rem auto 2rem;font-size:1.05rem}
.cta .hero-actions{justify-content:center}
.timeline{display:grid;gap:0;max-width:760px}
.tl{display:grid;grid-template-columns:130px 1fr;gap:22px;padding:0 0 26px;position:relative}
.tl:before{content:"";position:absolute;left:139px;top:6px;bottom:-6px;width:2px;background:var(--line)}
.tl:last-child:before{display:none}
.tl .yr{font-weight:700;color:var(--navy);font-size:.95rem;text-align:right;position:relative}
.tl .yr:after{content:"";position:absolute;right:-16px;top:5px;width:11px;height:11px;border-radius:50%;background:var(--emerald);border:3px solid #fff;box-shadow:0 0 0 2px var(--emerald)}
.tl .bd h3{font-size:1.02rem;color:var(--ink);margin-bottom:.2rem}
.tl .bd p{font-size:.92rem}
.values{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:10px}
.value{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:28px;text-align:center}
.value .vi{width:48px;height:48px;border-radius:12px;background:#e3f4f4;color:var(--emerald);display:grid;place-items:center;margin:0 auto 14px;font-size:1.3rem}
.value h3{font-size:1.1rem;color:var(--ink)}
.value p{font-size:.92rem;margin-top:.4rem}
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.post{background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column;transition:.2s}
.post:hover{transform:translateY(-4px);box-shadow:var(--shadow-sm)}
.post .thumb{height:150px;background:linear-gradient(140deg,var(--navy),#123a63);position:relative;overflow:hidden}
.post .thumb img{width:100%;height:100%;object-fit:cover}
.post .thumb .cat{position:absolute;left:14px;bottom:14px;font-size:.7rem;font-weight:600;color:#fff;background:rgba(255,255,255,.15);padding:.25rem .6rem;border-radius:999px}
.post .pb{padding:20px;display:flex;flex-direction:column;flex:1}
.post .dt{font-size:.76rem;color:var(--muted)}
.post h3{font-size:1.05rem;color:var(--ink);margin:.4rem 0 .8rem;line-height:1.3}
.post .rd{margin-top:auto;font-size:.85rem;color:var(--emerald);font-weight:600}
.article-meta{font-size:.88rem;color:#93a7c2;margin-top:.6rem}
.article{max-width:760px;margin:0 auto}
.article .lead{font-size:1.12rem;color:var(--ink)}
.article p{color:#33465f;margin:0 0 1.15rem;font-size:1.02rem;line-height:1.75}
.article h3{font-family:'Fraunces','Fraunces Fallback',serif;font-size:1.5rem;color:var(--ink);margin:2.2rem 0 .8rem;letter-spacing:-.01em}
.article h4{font-size:1.05rem;color:var(--navy);margin:1.4rem 0 .5rem}
.article ul{margin:0 0 1.2rem 1.15rem;color:#33465f}
.article li{margin:.4rem 0;line-height:1.65}
.article strong{color:var(--ink)}
.article table{width:100%;border-collapse:collapse;margin:1.4rem 0;font-size:.9rem}
.article th{background:var(--navy);color:#fff;text-align:left;padding:.65rem .75rem;font-weight:600}
.article td{border:1px solid var(--line);padding:.6rem .75rem;color:#33465f;vertical-align:top}
.article tbody tr:nth-child(even) td{background:var(--paper)}
.article .disc{font-size:.8rem;color:var(--muted);border-top:1px solid var(--line);margin-top:2.2rem;padding-top:1.1rem;font-style:italic}
@media(max-width:640px){.article table{font-size:.8rem}.article th,.article td{padding:.45rem .5rem}}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
.field{margin-bottom:16px}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}
@media(max-width:640px){.field-row{grid-template-columns:1fr}}
.field label{display:block;font-size:.85rem;font-weight:600;color:var(--ink);margin-bottom:.35rem}
.field input,.field textarea,.field select{width:100%;padding:.8rem 1rem;border:1px solid var(--line);border-radius:12px;font-family:inherit;font-size:.95rem;background:#fff}
.field input:focus,.field textarea:focus,.field select:focus{outline:none;border-color:var(--emerald);box-shadow:0 0 0 3px rgba(20,143,143,.15)}
.info-row{display:flex;gap:.8rem;align-items:flex-start;padding:16px 0;border-bottom:1px solid var(--line)}
.info-row .ic{width:40px;height:40px;border-radius:10px;background:#eef4fb;color:var(--navy);display:grid;place-items:center;flex:0 0 auto}
.info-row .l{font-size:.78rem;color:var(--muted)}
.info-row .v{font-weight:600;color:var(--ink)}
footer{background:var(--ink);color:#c2cddd;padding:60px 0 28px;font-size:.9rem}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.2fr;gap:32px;padding-bottom:36px;border-bottom:1px solid rgba(255,255,255,.1)}
.foot-grid h4{color:#fff;font-size:.85rem;text-transform:uppercase;letter-spacing:.1em;margin-bottom:1rem;font-weight:600}
.foot-grid a{display:block;color:#9fb0c6;margin-bottom:.55rem;overflow-wrap:anywhere}
.foot-grid a:hover{color:#fff}
.foot-logo img{height:40px;width:auto;max-width:none;margin-bottom:1rem}
.foot-bottom{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;padding-top:24px;font-size:.8rem;color:#8595ac}
.bare-head{background:#fff;border-bottom:1px solid var(--line)}
.bare-head .wrap{display:flex;align-items:center;justify-content:space-between;height:72px}
.bare-head .back{color:var(--muted);font-size:.9rem;font-weight:500}
.bare-head .back:hover{color:var(--navy)}
.bare-foot{background:var(--ink);color:#9fb0c6;font-size:.85rem}
.bare-foot .wrap{padding:26px 22px}
.bare-foot a{color:#9fb0c6}
.bare-foot a:hover{color:#fff}
.disclaimer{font-size:.76rem;color:#7889a1;margin-top:14px;line-height:1.6}
.own{background:linear-gradient(160deg,var(--navy),#061a30);border-radius:22px;padding:46px;color:#fff;display:grid;grid-template-columns:1.4fr auto;gap:32px;align-items:center;box-shadow:var(--shadow)}
.own .eyebrow{color:#4fc2c2}
.own h2{color:#fff;margin-top:.4rem;font-size:clamp(1.45rem,3vw,2rem)}
.own p{color:#c6d2e2;margin-top:1rem;max-width:52ch}
@media(max-width:760px){.own{grid-template-columns:1fr;padding:34px}}
.reveal{opacity:0;transform:translateY(22px);transition:.7s cubic-bezier(.2,.7,.2,1)}
.reveal.in{opacity:1;transform:none}
@media(max-width:960px){
  .hero-grid{grid-template-columns:1fr;gap:38px;padding:56px 0 64px}
  .feat,.contact-grid{grid-template-columns:1fr;gap:30px}
  .svc-grid{grid-template-columns:1fr}
  .team-grid,.values,.blog-grid{grid-template-columns:repeat(2,1fr)}
  .rev-grid,.prob-grid{grid-template-columns:1fr}
  .steps{grid-template-columns:1fr 1fr}
  .member.wide{grid-column:span 2}
  .foot-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:640px){
  .wrap{padding:0 28px}
  .nav-links,.nav-phone,.nav-portal{display:none}
  .nav-cta .btn-primary{padding:.6rem 1.05rem;font-size:.85rem}
  .cta-long{display:none}.cta-short{display:inline}
  .nav{gap:10px}
  .nav-cta{gap:1.05rem}
  .burger{margin-right:2px}
  .burger{display:flex}
  .nav-links.open{display:flex;position:absolute;top:74px;left:0;right:0;flex-direction:column;background:#fff;padding:18px 22px;gap:1rem;border-bottom:1px solid var(--line);box-shadow:var(--shadow-sm)}
  .nav-dd{padding:0;width:100%}
  .nav-dd>button{width:100%;justify-content:flex-start;font-weight:600;color:var(--navy)}
  .nav-dd>button:after{display:none}
  .nav-dd-menu{display:flex;position:static;border:0;box-shadow:none;padding:4px 0 2px 14px;min-width:0;background:none}
  .nav-dd-menu a{padding:6px 0;white-space:normal}
  section{padding:60px 0}
  .steps,.team-grid,.values,.blog-grid{grid-template-columns:1fr}
  .foot-grid{grid-template-columns:1fr 1fr;gap:24px}
  .foot-logo{grid-column:span 2}
  .hc-stats{grid-template-columns:1fr}
  .member.wide{grid-column:span 1;flex-direction:column;text-align:center}
  .member.wide{align-items:center}
  .member.wide .av{margin:0 auto 14px}
  .member.wide .photo{margin:0 auto 14px}
  .tb-item .n{font-size:1.25rem}
  .tl{grid-template-columns:1fr;gap:6px}
  .tl:before{display:none}
  .tl .yr{text-align:left}
  .tl .yr:after{display:none}
}
`;

// Grouped nav. Flat lists ran out of room once the city pages and the snapshot
// landed, so Services and Tools became dropdowns: 6 top-level items, everything reachable.
const NAV = [
  {href:'about.html', label:'About'},
  {label:'Services', href:'services.html', children:[
    ['services.html','Services &amp; pricing'],
    ['buyers-agent-brisbane.html','Buyers agent Brisbane'],
    ['buyers-agent-adelaide.html','Buyers agent Adelaide'],
  ]},
  {label:'Tools', href:'buying-power.html', children:[
    ['buying-power.html','Buying power calculator'],
    ['property-readiness.html','Property readiness snapshot'],
    ['tracker.html','Property Trackers'],
  ]},
  {href:'team.html', label:'Team'},
  {href:'blog.html', label:'Blog'},
  {href:'contact.html', label:'Contact'},
];
const navItem = (n, active) => {
  if(!n.children) return `<a href="${n.href}"${active===n.href?' class="active"':''}>${n.label}</a>`;
  const on = n.children.some(c=>c[0]===active);
  return `<div class="nav-dd${on?' on':''}">
        <button type="button" aria-haspopup="true" aria-expanded="false">${n.label}</button>
        <div class="nav-dd-menu">${n.children.map(c=>`<a href="${c[0]}"${active===c[0]?' class="active"':''}>${c[1]}</a>`).join('')}</div>
      </div>`;
};

const header = (active) => `
<header>
  <div class="wrap nav">
    <a class="logo" href="index.html"><img src="${LOGO_DARK}" alt="CapitalVue"></a>
    <nav class="nav-links" id="navlinks">
      ${NAV.map(n=>navItem(n, active)).join('\n      ')}
      <a class="nav-m" href="https://clientportal.capitalvue.com.au/" target="_blank" rel="noopener">Client portal</a>
      <a class="nav-m" href="tel:+61499484727">Call 0499 484 727</a>
    </nav>
    <div class="nav-cta">
      <a class="nav-phone" href="tel:+61499484727">0499 484 727</a>
      <a class="btn btn-navy nav-portal" href="https://clientportal.capitalvue.com.au/" target="_blank" rel="noopener">Client portal</a>
      <a class="btn btn-primary" href="contact.html#book">Book a call</a>
      <button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>`;

const bareHeader = `
<header class="bare-head"><div class="wrap">
  <a class="logo" href="index.html"><img src="${LOGO_DARK}" alt="CapitalVue"></a>
  <a class="back" href="index.html">← Back to site</a>
</div></header>`;
const bareFooter = `
<footer class="bare-foot"><div class="wrap">
  <p style="margin-bottom:.5rem">CapitalVue Pty Ltd · ABN 56 671 085 028 · 28 Bovelles St, Camp Hill QLD 4152 · <a href="mailto:info@capitalvue.com.au">info@capitalvue.com.au</a> · 0499 484 727</p>
  <p><a href="privacy-policy.html">Privacy Policy</a> · <a href="terms-and-conditions.html">Terms &amp; Conditions</a> · <a href="index.html">Home</a> · © 2026 CapitalVue Pty Ltd</p>
</div></footer>`;
const footer = () => `
<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <div class="foot-logo"><img src="${LOGO_WHITE}" alt="CapitalVue"></div>
        <p class="serif" style="color:#7fd6d6;font-size:1.05rem;margin-bottom:.6rem">Build a portfolio. Create a legacy.</p>
        <p style="color:#9fb0c6;max-width:34ch">A licensed buyers agency helping Australians build property portfolios, and prove they're working.</p>
        <div class="socials">
          <a href="https://www.facebook.com/capitalvueinvestments" target="_blank" rel="noopener" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.95.93-1.95 1.87v2.25h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07Z"/></svg></a>
          <a href="https://www.instagram.com/capitalvueinvestments/" target="_blank" rel="noopener" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg></a>
        </div>
      </div>
      <div>
        <h4>Explore</h4>
        <a href="about.html">About</a><a href="services.html">Services &amp; pricing</a>
        <a href="buying-power.html">Buying power calculator</a>
        <a href="buyers-agent-brisbane.html">Buyers agent Brisbane</a>
        <a href="buyers-agent-adelaide.html">Buyers agent Adelaide</a>
        <a href="property-readiness.html">Property readiness snapshot</a>
        <a href="tracker.html">Property Trackers</a><a href="team.html">Our team</a><a href="blog.html">Blog</a>
      </div>
      <div>
        <h4>Account</h4>
        <a href="https://capitalvue.app.portfoliologic.com.au/" target="_blank" rel="noopener">CapitalVue Portfolio login</a>
        <a href="https://app.capitalvue.com.au/" target="_blank" rel="noopener">Property Tracker login</a>
        <a href="https://clientportal.capitalvue.com.au/" target="_blank" rel="noopener">Client portal</a>
        <a href="contact.html#book">Book a strategy call</a>
      </div>
      <div>
        <h4>Contact</h4>
        <a href="mailto:info@capitalvue.com.au">info@capitalvue.com.au</a>
        <a href="tel:+61499484727">0499 484 727</a>
        <a href="https://maps.app.goo.gl/s9fyPFnemrxc4oq56" target="_blank" rel="noopener">28 Bovelles St, Camp Hill QLD 4152</a>
        <span style="color:#9fb0c6;display:block;margin-top:.4rem">Licensed: QLD 4769773 · SA 335016</span>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 CapitalVue. All rights reserved.</span>
      <span><a href="terms-and-conditions.html" style="color:#9fb0c6">Terms &amp; Conditions</a> &nbsp;·&nbsp; <a href="privacy-policy.html" style="color:#9fb0c6">Privacy Policy</a></span>
    </div>
    <p class="disclaimer">*Performance note: the +16.44% figure reflects the combined change in market value across CapitalVue's 23 settled client purchases since acquisition (first purchase May 2024), measured as at July 2026. It is a portfolio-wide capital growth figure, not an annualised or compounding rate, and is shown for illustration only. Past performance is not a reliable indicator of future performance. Property investment carries risk. This website is general information only and does not constitute financial, investment, legal or tax advice; seek independent advice for your circumstances.</p>
  </div>
</footer>`;

const SCRIPT = `
<script>
/* HubSpot form submit listener -> dataLayer (for GA4 generate_lead via GTM). Handles the native HubSpot embed on the contact page. */
(function(){window.dataLayer=window.dataLayer||[];var hsFired=false,mtgFired=false;window.addEventListener("message",function(e){var d=e&&e.data;if(typeof d==="string"){try{d=JSON.parse(d);}catch(_){return;}}if(!d||typeof d!=="object")return;var fn=d.eventName,ty=d.type;if(ty==="hsFormCallback"&&(fn==="onFormSubmit"||fn==="onFormSubmitted")){if(!hsFired){hsFired=true;window.dataLayer.push({event:"hs_form_submitted",form_source:"hubspot_embed"});}}if(d.meetingBookSucceeded||fn==="meetingBookSucceeded"){if(!mtgFired){mtgFired=true;window.dataLayer.push({event:"hs_meeting_booked"});}}});})();
var burger=document.getElementById("burger"),nav=document.getElementById("navlinks");
if(burger&&nav){burger.addEventListener("click",function(){nav.classList.toggle("open");});
nav.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){nav.classList.remove("open");});});}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll(".reveal").forEach(function(el){io.observe(el);});
var FEAT=${JSON.stringify(PURCHASES.map(function(p){return {img:p.img,type:p.type,loc:p.loc,grow:p.grow};}))};
var featEl=document.getElementById("featCards");
if(featEl&&FEAT.length>2){
  var fi=0;
  var card=function(p){return '<a class="fcard" href="#purchases"><div class="fimg"><img loading="lazy" decoding="async" src="'+p.img+'" alt="'+p.type+' secured in '+p.loc+'"></div><div class="fbd"><div class="ftype">'+p.type+'</div><div class="floc">'+p.loc+'</div><div class="fgrow">'+p.grow+' <span>since purchase</span></div></div></a>';};
  var mq=window.matchMedia("(prefers-reduced-motion:reduce)");
  if(!mq.matches){setInterval(function(){
    fi=(fi+2)%FEAT.length;
    featEl.classList.add("fade");
    setTimeout(function(){
      var a=FEAT[fi],b=FEAT[(fi+1)%FEAT.length];
      featEl.innerHTML=card(a)+card(b);
      featEl.classList.remove("fade");
    },460);
  },4600);}
}
var HS="https://api-ap1.hsforms.com/submissions/v3/integration/submit/45491120/0b6974fa-ec13-45d0-aa45-62d8f985f2da";
document.querySelectorAll("form[data-hs]").forEach(function(f){
  f.addEventListener("submit",function(e){
    e.preventDefault();
    var data=Object.fromEntries(new FormData(f).entries());
    if(data.service){ data.message=(data.message?data.message+" ":"")+"[Interested in: "+data.service+"]"; delete data.service; }
    var fields=Object.keys(data).filter(function(k){return data[k];}).map(function(k){return {name:k,value:data[k]};});
    var btn=f.querySelector("button[type=submit]"); var lbl=btn?btn.textContent:"";
    if(btn){btn.disabled=true;btn.textContent="Sending...";}
    fetch(HS,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fields:fields,context:{pageUri:location.href,pageName:document.title}})})
    .then(function(r){ if(!r.ok){throw new Error("bad");} f.innerHTML='<div style="text-align:center;padding:1.5rem 0"><h3 style="color:var(--ink);font-family:Fraunces,serif">Thank you</h3><p style="margin-top:.5rem">We have your details and will be in touch shortly.</p></div>'; })
    .catch(function(){ if(btn){btn.disabled=false;btn.textContent=lbl||"Try again";} alert("Sorry, something went wrong. Please email info@capitalvue.com.au and we will respond right away."); });
  });
});
</script>`;

const ORG_SCHEMA = {"@context":"https://schema.org","@type":"RealEstateAgent","@id":BASE+"#organisation","name":"CapitalVue","description":"Licensed Australian buyers agency helping busy Australians buy investment property and homes, with real-time portfolio tracking.","url":BASE,"logo":BASE+"assets/cv-logo-stacked.png","image":BASE+"assets/og.jpg","telephone":"+61499484727","email":"info@capitalvue.com.au","priceRange":"$$$","address":{"@type":"PostalAddress","streetAddress":"28 Bovelles St","addressLocality":"Camp Hill","addressRegion":"QLD","postalCode":"4152","addressCountry":"AU"},"areaServed":[{"@type":"State","name":"Queensland"},{"@type":"State","name":"South Australia"}],"aggregateRating":{"@type":"AggregateRating","ratingValue":"5.0","reviewCount":"27"},"sameAs":["https://www.facebook.com/capitalvueinvestments","https://www.instagram.com/capitalvueinvestments/"]};
const esc = s => String(s).replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/"/g,'&quot;');
const CRUMB = {
  'about.html':'About','services.html':'Services & pricing','tracker.html':'Property Trackers',
  'buying-power.html':'Buying Power Calculator',
  'buyers-agent-brisbane.html':'Buyers Agent Brisbane','buyers-agent-adelaide.html':'Buyers Agent Adelaide',
  'team.html':'Team','blog.html':'Blog','contact.html':'Contact',
  'terms-and-conditions.html':'Terms & Conditions','privacy-policy.html':'Privacy Policy'
};
const bcList = items => ({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":items.map((it,i)=>({"@type":"ListItem","position":i+1,"name":it.name,"item":it.url}))});
const page = (title, desc, body, active, pathName, schema, opts) => {
  const bare = !!(opts && opts.bare);
  const og = opts||{};
  const ogTitle = og.ogTitle || title;
  const ogDesc = og.ogDesc || desc;
  const ogImage = BASE + (og.ogImage || 'assets/og.jpg');
  const url = BASE + (pathName==='index.html'?'':(pathName||''));
  const extra = schema ? (Array.isArray(schema)?schema:[schema]) : [];
  let crumbLd = null;
  if (pathName && pathName!=='index.html') {
    const items = [{name:'Home',url:BASE}];
    const post = pathName.indexOf('post-')===0 ? ARTICLES.find(a=>'post-'+a.slug+'.html'===pathName) : null;
    if (post) {
      items.push({name:'Blog',url:BASE+'blog.html'});
      items.push({name:post.title.replace(/&amp;/g,'&').replace(/&#39;/g,"'"),url});
    } else {
      items.push({name:CRUMB[pathName]||title.split('|')[0].replace(/&amp;/g,'&').trim(),url});
    }
    crumbLd = bcList(items);
  }
  const ld = [ORG_SCHEMA, ...extra, ...(crumbLd?[crumbLd]:[])];
  return `<!DOCTYPE html>
<html lang="en-AU"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="${(opts&&opts.noindex)?'noindex,follow':'index,follow,max-image-preview:large'}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="CapitalVue">
<meta property="og:title" content="${esc(ogTitle)}">
<meta property="og:description" content="${esc(ogDesc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(ogTitle)}">
<meta name="twitter:description" content="${esc(ogDesc)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" type="image/png" href="${FAVICON}">
<link rel="apple-touch-icon" href="${FAVICON}">
<meta name="theme-color" content="#092a4b">
<meta name="facebook-domain-verification" content="17ylvcghlmyioj9ehbiswnt20svyf2">
<link rel="preload" href="assets/fonts/poppins-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/poppins-400.woff2" as="font" type="font/woff2" crossorigin>
<style>${CSS.trim()}</style>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<!-- Tags (GTM + GA4 + Meta pixel) load on the production host only, to keep deploy-preview and non-www traffic out of analytics. NOTE: if a GA4 tag is ever added inside GTM container GTM-WFV2RRJZ, remove the gtag block below to avoid double-counting.
     META: the base pixel is hardcoded here, NOT delivered by GTM. The GTM tag 'Meta Pixel - Base Code' MUST stay paused or PageView fires twice. GTM should carry Meta EVENT tags only, which reuse this fbq. -->
<script>(function(){var d=document;window.dataLayer=window.dataLayer||[];if(!/(^|\.)capitalvue\.com\.au$/i.test(location.hostname))return;(function(w,s,l,i){w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,'script','dataLayer','GTM-WFV2RRJZ');var g=d.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id=G-MB36F9MP7P';d.head.appendChild(g);function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','G-MB36F9MP7P');!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,d,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','440670218340973');fbq('track','PageView');})();</script>
<!-- End tags -->
</head>
<body>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WFV2RRJZ" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
${bare?bareHeader:header(active)}
${body}
${bare?bareFooter:footer()}
${bare?'':SCRIPT}
</body></html>`;
};

const check = (color='#4fc2c2') => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="m5 12 5 5 9-11" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const pageHero = (crumb,eyebrow,h1,p) => `
<section class="page-hero"><div class="wrap">
  <div class="crumb"><a href="index.html">Home</a> / ${crumb}</div>
  <span class="eyebrow">${eyebrow}</span>
  <h1 class="serif">${h1}</h1>
  <p>${p}</p>
</div></section>`;

const trustbar = `
<div class="trustbar"><div class="wrap">
  <div class="tb-item"><span class="n"><b>$21.31M</b></span><span class="l">Property secured</span></div>
  <div class="tb-item"><span class="n"><b>23</b> settled</span><span class="l">Client purchases</span></div>
  <div class="tb-item"><span class="n"><b>+16.44%</b></span><span class="l">Capital growth (settled)*</span></div>
  <div class="tb-item"><span class="n">5.0 <span class="stars">★</span></span><span class="l">From 27 Google reviews</span></div>
  <div class="tb-item"><span class="n">QLD · SA</span><span class="l">Fully licensed</span></div>
</div></div>`;

const REVIEWS = [
  ['CA','#6d3bf0','Chris Anderson','Local Guide · Verified Google review',"Having worked with other buyers agents before, Brad is on another level. We wouldn't look back. He saved us from making a foolish mistake, that level of integrity and professional conviction is rare."],
  ['SJ','#148f8f','Stephen Jacobsen','Verified Google review',"After months of open houses we were about to give up. We engaged Brad and within weeks we had a contract. He fought hard for our best interests and secured us a fantastic investment property."],
  ['SR','#092a4b','Shaun David Randles','Verified Google review',"Hiring Brad was the secret weapon we needed. His brilliance in negotiating and thorough due diligence meant the deal was signed in under one week. Stress-free and worth every cent."],
  ['X','#c9a24b','Xavier','Verified Google review',"There is no one better than Brad if you're wanting to build a property portfolio. We purchased interstate and secured an asset that is already growing in value at pace."],
  ['AT','#148f8f','Anna Thompson','Local Guide · Verified Google review',"It has been absolutely seamless from day one. Brad made the whole search super simple. We'd 100% recommend him to anyone looking to save time, energy and money."],
  ['RO','#6d3bf0',"Rosie O'Connor",'Verified Google review',"I used Brad to purchase my first investment property and it made the process so easy. He handles everything and explains it all in so much detail. Highly recommend."],
];
const revCard = r => `<div class="rev reveal"><div class="stars">★★★★★</div><q>${r[4]}</q><div class="who"><span class="av" style="background:${r[1]}">${r[0]}</span><span><span class="nm">${r[2]}</span><span class="src">${r[3]}</span></span></div></div>`;

const ctaBand = `
<section id="book"><div class="wrap"><div class="cta reveal">
  <span class="eyebrow" style="color:#4fc2c2">Free, no obligation</span>
  <h2 class="serif">Let's talk about your next property.</h2>
  <p>Book a free strategy call. We'll pressure-test your goals, show you what's possible, and tell you honestly whether we can help.</p>
  <div class="hero-actions"><a class="btn btn-primary" href="contact.html#book">Book a free strategy call</a><a class="btn btn-outline-l" href="tel:+61499484727">Call 0499 484 727</a></div>
</div></div></section>`;

/* ---------------- INDEX ---------------- */
const indexBody = `
<section class="hero" style="padding:0"><div class="wrap hero-grid">
  <div class="reveal in">
    <span class="eyebrow" style="color:#4fc2c2">Licensed buyers agency · QLD · SA</span>
    <h1>We buy the right property for <em>busy Australians</em>, investment or home.</h1>
    <p class="slogan">Build a portfolio. Create a legacy.</p>
    <p class="sub">Stop losing out on offers and second-guessing the market. Whether you're building an investment portfolio or buying the home you'll live in, we find, negotiate and secure the right property for you.</p>
    <div class="hero-actions"><a class="btn btn-primary" href="contact.html#book">Book a free strategy call</a><a class="btn btn-outline-l" href="#how">See how it works</a></div>
    <div class="hero-trust"><span class="stars">★★★★★</span><span>5.0 from 27 Google reviews · $21.31M secured for clients</span></div>
  </div>
  <div class="hcard reveal in">
    <div class="hc-top"><div class="hc-badge"><span class="dot">✓</span> Client portfolio · settled</div><span class="hc-tag">Live data</span></div>
    <div class="hc-stats">
      <div class="hc-stat"><div class="ic" style="background:#eef0ff;color:#6d3bf0">◈</div><div class="n">23</div><div class="l">Properties secured &amp; settled</div></div>
      <div class="hc-stat"><div class="ic" style="background:#eef0ff;color:#6d3bf0">⌂</div><div class="n">$21.31M</div><div class="l">Total purchase value</div></div>
      <div class="hc-stat"><div class="ic" style="background:#e3f4f4;color:#148f8f">↗</div><div class="n" style="color:#148f8f">+16.44%</div><div class="l">Capital growth on settled*</div></div>
    </div>
    <div class="hc-foot">*See performance note below. Past performance is not a reliable indicator of future performance.</div>
  </div>
</div></section>
${featBand}
${trustbar}
<section><div class="wrap">
  <div class="sec-head center reveal"><span class="eyebrow">Who we help</span><h2 class="serif">Investors and home buyers, both looked after.</h2><p>Whatever you're buying, you get the same rigour: the right property, well bought, with a team on your side of the table.</p></div>
  <div class="prob-grid" style="grid-template-columns:1fr 1fr">
    <div class="prob reveal"><h3>Building an investment portfolio</h3><p>Data-led acquisition, structuring and real-time performance tracking, led by founder Brad Reece. Grow with confidence and know exactly how every asset is performing.</p></div>
    <div class="prob reveal"><h3>Buying the home you'll live in</h3><p>Owner-occupier search, evaluation and negotiation, led by Dr Rebecca Cox, so you secure the right home at the right price without the stress or the guesswork.</p></div>
  </div>
  <p style="text-align:center;color:var(--muted);font-size:.92rem;margin-top:20px">Relocating to Brisbane from interstate or overseas? Tony guides both investors and home buyers through the move.</p>
</div></section>
<section id="problem"><div class="wrap">
  <div class="sec-head center reveal"><span class="eyebrow">Sound familiar?</span><h2 class="serif">Buying investment property alone is exhausting, and expensive when you get it wrong.</h2></div>
  <div class="prob-grid">
    <div class="prob reveal"><div class="q">"We were tired of losing out on several offers and started to put in emotional bids."</div><h3>Missing out, over and over</h3><p>Weekend after weekend at open homes, out-negotiated by agents who do this for a living. Real client, real words.</p></div>
    <div class="prob reveal"><div class="q">"It all seemed too much, so I kept avoiding investing."</div><h3>Paralysed by the risk</h3><p>The stakes feel too high to guess, and generic advice doesn't give you the confidence to act.</p></div>
    <div class="prob reveal"><div class="q">"How do I even tell if this is a fair price?"</div><h3>Flying blind on value</h3><p>Without the data and the network, you can't see what a property is really worth, or what it will do next.</p></div>
  </div>
</div></section>
<section id="how" class="bg-paper"><div class="wrap">
  <div class="sec-head reveal"><span class="eyebrow">The CapitalVue process</span><h2 class="serif">We handle the heavy lifting, from strategy to settled and tenanted.</h2><p>One team, one accountable point of contact, and a vetted network of specialists behind every purchase.</p></div>
  <div class="steps">
    <div class="step reveal"><div class="num">01</div><h3>Strategy</h3><p>We map your goals, borrowing capacity and structure with our data-driven approach, and build a clear investment brief.</p></div>
    <div class="step reveal"><div class="num">02</div><h3>Search &amp; due diligence</h3><p>We source on and off market, run comprehensive due diligence, and inspect virtually or on the ground, interstate included.</p></div>
    <div class="step reveal"><div class="num">03</div><h3>Negotiate &amp; secure</h3><p>We negotiate hard or bid at auction on your behalf, and fight for terms that protect your interests.</p></div>
    <div class="step reveal"><div class="num">04</div><h3>Settle &amp; track</h3><p>We oversee settlement, connect a vetted property manager to find a tenant, and put the asset on your live dashboard.</p></div>
  </div>
  <p style="text-align:center;max-width:760px;margin:34px auto 0">We buy across South East Queensland and South Australia. Most of our work runs through our <a href="buyers-agent-brisbane.html">Brisbane buyers agent</a> and <a href="buyers-agent-adelaide.html">Adelaide buyers agent</a> desks, where you can see the current market data and every purchase we have made in that state.</p>
  <div style="text-align:center;margin-top:26px"><a class="btn btn-primary" href="services.html">See services &amp; pricing</a></div>
</div></section>
<section><div class="wrap">
  <div class="own reveal">
    <div>
      <span class="eyebrow">The CapitalVue difference</span>
      <h2 class="serif">Most buyers agents disappear at settlement. We hand you the keys and the data.</h2>
      <p>Every CapitalVue purchase client gets exclusive access to CapitalVue Portfolio, our platform that tracks your equity, yield and growth in real time, so you always know your next move.</p>
    </div>
    <div><a class="btn btn-primary" href="tracker.html">See the platform</a></div>
  </div>
</div></section>
<section id="purchases" class="bg-paper"><div class="wrap">
  <div class="sec-head center reveal"><span class="eyebrow">Recent client purchases</span><h2 class="serif">Real assets, already working.</h2><p>A selection of settled purchases we've secured for clients, with growth since acquisition.*</p></div>
  <div class="buys">
    <div class="buy reveal"><div class="img"><img loading="lazy" decoding="async" src="${BUY.morning}" alt="Investment property secured in Morningside, QLD"></div><div class="bd"><div class="sub2">Investment purchase</div><div class="loc">Morningside, QLD</div><div class="figs"><div class="fig"><div class="l">Paid</div><div class="v">$1,925,000</div></div><div class="fig"><div class="l">Value</div><div class="v">$1,990,000</div></div><div class="fig"><div class="l">Growth</div><div class="v up">+3.38%</div></div></div></div></div>
    <div class="buy reveal"><div class="img"><img loading="lazy" decoding="async" src="${BUY.carina}" alt="Investment property secured in Carina Heights, QLD"></div><div class="bd"><div class="sub2">Investment purchase</div><div class="loc">Carina Heights, QLD</div><div class="figs"><div class="fig"><div class="l">Paid</div><div class="v">$944,500</div></div><div class="fig"><div class="l">Value</div><div class="v">$1,250,000</div></div><div class="fig"><div class="l">Growth</div><div class="v up">+32.35%</div></div></div></div></div>
    <div class="buy reveal"><div class="img"><img loading="lazy" decoding="async" src="${BUY.taigum}" alt="Investment property secured in Taigum, QLD"></div><div class="bd"><div class="sub2">Investment purchase</div><div class="loc">Taigum, QLD</div><div class="figs"><div class="fig"><div class="l">Paid</div><div class="v">$865,000</div></div><div class="fig"><div class="l">Value</div><div class="v">$1,050,000</div></div><div class="fig"><div class="l">Growth</div><div class="v up">+21.39%</div></div></div></div></div>
    <div class="buy reveal"><div class="img"><img loading="lazy" decoding="async" src="${BUY.chapel}" alt="Investment property secured in Chapel Hill, QLD"></div><div class="bd"><div class="sub2">Investment purchase</div><div class="loc">Chapel Hill, QLD</div><div class="figs"><div class="fig"><div class="l">Paid</div><div class="v">$1,642,500</div></div><div class="fig"><div class="l">Value</div><div class="v">$1,840,000</div></div><div class="fig"><div class="l">Growth</div><div class="v up">+12.02%</div></div></div></div></div>
    <div class="buy reveal"><div class="img"><img loading="lazy" decoding="async" src="${BUY.keperra}" alt="Home secured in Keperra, QLD"></div><div class="bd"><div class="sub2">Owner-occupier home</div><div class="loc">Keperra, QLD</div><div class="figs"><div class="fig"><div class="l">Paid</div><div class="v">$1,160,000</div></div><div class="fig"><div class="l">Value</div><div class="v">$1,260,000</div></div><div class="fig"><div class="l">Growth</div><div class="v up">+8.62%</div></div></div></div></div>
    <div class="buy reveal"><div class="img"><img loading="lazy" decoding="async" src="${BUY.stmorris}" alt="Investment property secured in St Morris, SA"></div><div class="bd"><div class="sub2">Investment purchase</div><div class="loc">St Morris, SA</div><div class="figs"><div class="fig"><div class="l">Paid</div><div class="v">$1,507,000</div></div><div class="fig"><div class="l">Value</div><div class="v">$1,720,000</div></div><div class="fig"><div class="l">Growth</div><div class="v up">+14.13%</div></div></div></div></div>
    <div class="buy reveal"><div class="img"><img loading="lazy" decoding="async" src="${BUY.petigrain}" alt="Home secured in Palmwoods, QLD"></div><div class="bd"><div class="sub2">Owner-occupier home</div><div class="loc">Palmwoods, QLD</div><div class="figs"><div class="fig"><div class="l">Paid</div><div class="v">$1,070,000</div></div><div class="fig"><div class="l">Value</div><div class="v">$1,170,000</div></div><div class="fig"><div class="l">Growth</div><div class="v up">+9.35%</div></div></div></div></div>
    <div class="buy reveal"><div class="img"><img loading="lazy" decoding="async" src="${BUY.wellington}" alt="Investment apartment secured in Kangaroo Point, QLD"></div><div class="bd"><div class="sub2">Investment purchase · apartment</div><div class="loc">Kangaroo Point, QLD</div><div class="figs"><div class="fig"><div class="l">Paid</div><div class="v">$850,000</div></div><div class="fig"><div class="l">Value</div><div class="v">$1,193,000</div></div><div class="fig"><div class="l">Growth</div><div class="v up">+40.35%</div></div></div></div></div>
  </div>
  <p style="text-align:center;color:var(--muted);font-size:.8rem;margin-top:22px">Growth reflects current estimated value versus purchase price, as at July 2026. Past performance is not a reliable indicator of future performance.</p>
</div></section>
<section id="reviews"><div class="wrap">
  <div class="sec-head center reveal"><span class="eyebrow">★★★★★ &nbsp;5.0 from 27 Google reviews</span><h2 class="serif">Clients don't just recommend CapitalVue. They come back.</h2></div>
  <div class="rev-grid">${REVIEWS.map(revCard).join('')}</div>
  <div class="rev-cta"><a class="btn btn-ghost" href="https://maps.app.goo.gl/s9fyPFnemrxc4oq56" target="_blank" rel="noopener">Read all reviews on Google →</a></div>
</div></section>
${ctaBand}`;

/* ---------------- ABOUT ---------------- */
const aboutBody = `
${pageHero('About','Your property investment experts','Built to make property investing simple, transparent and provable.','CapitalVue pairs a licensed buyers agency with technology that shows you exactly how your portfolio is performing. No jargon, no guesswork, no hidden agenda.')}
<section><div class="wrap feat">
  <div class="reveal">
    <span class="eyebrow">Our story</span>
    <h2 class="serif">From an idea in 2023 to $21.31M secured for clients.</h2>
    <p style="margin-top:1rem">CapitalVue was founded on a simple frustration: investment property is one of the biggest financial decisions people make, yet most buyers are left to navigate it alone, without data and without an advocate. We built the agency we wished existed, then built the technology to keep clients informed long after settlement.</p>
    <p style="margin-top:1rem">Today we help busy Australians and expats acquire the right assets for their strategy, and prove the results with live portfolio data.</p>
  </div>
  <div class="reveal">
    <div class="values" style="grid-template-columns:1fr">
      <div class="value" style="text-align:left"><div class="vi" style="margin:0 0 12px">◎</div><h3>Deliver value</h3><p>Every recommendation is judged on the outcome it creates for you, not the commission it creates for us.</p></div>
      <div class="value" style="text-align:left"><div class="vi" style="margin:0 0 12px">✦</div><h3>Communication</h3><p>You are informed at every stage. Clients repeatedly tell us this is what set the experience apart.</p></div>
      <div class="value" style="text-align:left"><div class="vi" style="margin:0 0 12px">⚖</div><h3>Operate with integrity</h3><p>We'll challenge your decision if we think you're wrong, and walk away from a deal that isn't right.</p></div>
    </div>
  </div>
</div></section>
${trustbar}
<section class="bg-paper"><div class="wrap">
  <div class="sec-head reveal"><span class="eyebrow">The journey so far</span><h2 class="serif">A short history, backed by real numbers.</h2></div>
  <div class="timeline reveal">
    <div class="tl"><div class="yr">Early 2023</div><div class="bd"><h3>The idea</h3><p>CapitalVue is conceptualised, with foundational work beginning in September 2023.</p></div></div>
    <div class="tl"><div class="yr">May 2024</div><div class="bd"><h3>Licensed &amp; live</h3><p>Licensing obtained and the buyers agency service launches. Our first client purchase settles.</p></div></div>
    <div class="tl"><div class="yr">Dec 2024</div><div class="bd"><h3>Early traction</h3><p>$15M in refinancing arranged (saving clients over $6,000 a month), $8.5M in purchases completed, and 100+ Dashboard accounts created.</p></div></div>
    <div class="tl"><div class="yr">2025</div><div class="bd"><h3>The Dashboard grows up</h3><p>The CapitalVue Dashboard evolves into a full portfolio-performance and landlord-retention platform.</p></div></div>
    <div class="tl"><div class="yr">Jul 2026</div><div class="bd"><h3>Where we are now</h3><p>$21.31M secured across 23 settled client purchases, with +16.44% capital growth on settled properties.*</p></div></div>
  </div>
</div></section>
<section><div class="wrap">
  <div class="sec-head center reveal"><span class="eyebrow">Why CapitalVue</span><h2 class="serif">Advice, technology and a network, in one place.</h2></div>
  <div class="prob-grid">
    <div class="prob reveal" style="text-align:center"><h3>A licensed buyers agent</h3><p>Experience, technology and data analysis to find opportunities aligned with your strategy.</p></div>
    <div class="prob reveal" style="text-align:center"><h3>The CapitalVue Dashboard</h3><p>Personalised, real-time monitoring of your portfolio's performance and equity.</p></div>
    <div class="prob reveal" style="text-align:center"><h3>A trusted partner network</h3><p>Vetted brokers, accountants, conveyancers and property managers supporting the whole journey.</p></div>
  </div>
</div></section>
${ctaBand}`;

/* ---------------- SERVICES ---------------- */
const li = t => `<li>${check()} ${t}</li>`;
const servicesBody = `
${pageHero('Services &amp; pricing','Services &amp; pricing','Transparent, fixed fees. No surprises.','From full done-for-you acquisition to lighter-touch support and ongoing strategy, choose the level of help that fits where you are.')}
<section><div class="wrap">
  <div class="svc-grid">
    <div class="svc-hero reveal">
      <span class="hc-tag" style="background:rgba(20,143,143,.18);color:#4fc2c2">Most popular</span>
      <h3 style="color:#fff;font-size:1.5rem;margin-top:.9rem">Full Buyers Agent Service</h3>
      <div class="price">$19,500 <span>inc GST</span></div>
      <p style="color:#c6d2e2">End-to-end. We manage every intricate detail so you get the outcome without the workload.</p>
      <ul>
        ${li('Personalised investment strategy &amp; structuring')}
        ${li('On &amp; off-market property identification')}
        ${li('Virtual &amp; on-site inspections and full due diligence')}
        ${li('Price negotiation &amp; auction representation')}
        ${li('Settlement oversight &amp; vetted property manager')}
        ${li('Secure client portal with AML compliance')}
      </ul>
      <a class="btn btn-light" href="contact.html#book">Book a free strategy call</a>
    </div>
    <div class="svc-side">
      <div class="svc-min reveal">
        <h3>Owner-Occupier Evaluation &amp; Negotiation</h3>
        <div class="p2">$11,500 <span style="font-size:.8rem;font-weight:500;color:var(--muted)">inc GST</span></div>
        <p>Found your home already? We handle due diligence, building &amp; pest review, agent liaison, negotiation, contract review and settlement management.</p>
      </div>
      <div class="svc-min reveal">
        <h3>Auction Bidding Service</h3>
        <div class="p2">$2,200 <span style="font-size:.8rem;font-weight:500;color:var(--muted)">/ auction</span></div>
        <p>Standalone, expert auction representation. We set the strategy and bid on your behalf so you never overpay under pressure.</p>
      </div>
      <div class="svc-min reveal">
        <h3>Property Strategy Service</h3>
        <div class="p2">Ongoing advisory</div>
        <p>Ongoing maintenance, rental and loan reviews to keep your portfolio performing long after you buy.</p>
      </div>
      <div class="svc-min reveal" style="background:var(--paper)">
        <h3>Property Tracker</h3>
        <div class="p2" style="color:var(--emerald)">Free</div>
        <p>Track your whole portfolio in real time. Plus CapitalVue Portfolio, our exclusive platform for purchase clients. <a href="tracker.html" style="color:var(--emerald);font-weight:600">Learn more →</a></p>
      </div>
    </div>
  </div>
</div></section>
<section class="bg-paper"><div class="wrap">
  <div class="sec-head reveal"><span class="eyebrow">What you get</span><h2 class="serif">The full-service process, step by step.</h2></div>
  <div class="steps">
    <div class="step reveal"><div class="num">01</div><h3>Strategy</h3><p>Goals, borrowing capacity and ownership structure mapped into a clear investment brief.</p></div>
    <div class="step reveal"><div class="num">02</div><h3>Search &amp; due diligence</h3><p>On and off-market sourcing, inspections and comprehensive due diligence.</p></div>
    <div class="step reveal"><div class="num">03</div><h3>Negotiate &amp; secure</h3><p>Hard negotiation or auction bidding, with terms that protect you.</p></div>
    <div class="step reveal"><div class="num">04</div><h3>Settle &amp; track</h3><p>Settlement oversight, a tenant via our PM network, and your live dashboard.</p></div>
  </div>
</div></section>
<section><div class="wrap" style="max-width:860px">
  <div class="sec-head reveal"><span class="eyebrow">Where we buy</span><h2 class="serif">The same service, in the markets we know.</h2></div>
  <p>These fees apply wherever we buy, but most of our work runs through two desks. Our <a href="buyers-agent-brisbane.html">Brisbane buyers agent</a> page covers the four South East Queensland submarkets we work in, with every Queensland client purchase and what it is worth now. Our <a href="buyers-agent-adelaide.html">Adelaide buyers agent</a> page does the same for South Australia, including our $700,000 minimum and the reasoning behind it. Both carry current market data, refreshed against the Cotality index.</p>
  <p style="margin-top:1rem">If you are not yet sure which service fits, the free <a href="property-readiness.html">property readiness snapshot</a> takes about 90 seconds and gives you a personalised read on where you stand.</p>
</div></section>
<section><div class="wrap"><div class="sec-head center reveal"><span class="eyebrow">In their words</span><h2 class="serif">Worth every cent.</h2></div>
<div class="rev-grid">${[REVIEWS[2],REVIEWS[1],REVIEWS[0]].map(revCard).join('')}</div></div></section>
${ctaBand}`;

/* ---------------- TRACKER ---------------- */
const feat = t => `<div class="feat-item"><span class="tick">✓</span> ${t}</div>`;
const trackerBody = `
${pageHero('Property Trackers','CapitalVue Dashboard','The only buyers agency that hands you the data to prove it worked.','Real-time visibility into your portfolio\'s key financial metrics, powered by live valuations and market rates. No spreadsheets, no guesswork.')}
<section><div class="wrap feat">
  <div class="reveal">
    <span class="eyebrow">Real-time portfolio intelligence</span>
    <h2 class="serif">Every number that matters, in one place.</h2>
    <p style="margin-top:1rem">The CapitalVue Dashboard gives Australian property investors a live view of value, equity, yield and tax, so decisions are based on current data, not outdated estimates.</p>
    <div class="feat-list">
      ${feat('Live market value (REIP Nexus)')}${feat('Comprehensive yield analysis')}
      ${feat('Loan-to-value ratio (LVR)')}${feat('Usable equity visibility')}
      ${feat('Cash-on-cash return')}${feat('Interest rate comparison')}
      ${feat('Tax reporting')}${feat('Automatic rate-change alerts')}
    </div>
    <div class="hero-actions" style="margin-top:1.8rem"><a class="btn btn-navy" href="https://app.capitalvue.com.au/" target="_blank" rel="noopener">Property Tracker Login</a></div>
    <p style="color:var(--muted);font-size:.88rem;margin-top:.9rem">Existing clients, log in to your CapitalVue Property Tracker. Our next-generation platform, CapitalVue Portfolio, is below.</p>
  </div>
  <div class="feat-visual reveal" style="padding:12px">
    <img src="${DASH}" alt="CapitalVue Property Tracker dashboard showing market value, equity, yield and tax metrics" loading="lazy" decoding="async" style="width:100%;border-radius:12px;display:block">
  </div>
</div></section>
<section class="bg-paper"><div class="wrap">
  <div class="sec-head center reveal"><span class="eyebrow">Platform capabilities</span><h2 class="serif">Every metric that matters, in one place.</h2><p>CapitalVue Portfolio, our next-generation platform powered by PortfolioLogic, available exclusively to clients who have purchased a property with CapitalVue.</p></div>
  <div class="prob-grid">
    <div class="prob reveal"><h3>Mortgage Dashboard</h3><p>Track every loan across all lenders in one view. Monitor rates, repayment schedules, fixed-rate expiry dates and outstanding balances with precision.</p></div>
    <div class="prob reveal"><h3>Equity Tracker</h3><p>Calculate available equity across the entire portfolio in real time. See when LVR thresholds are crossed and equity becomes accessible for the next acquisition.</p></div>
    <div class="prob reveal"><h3>Cash Flow Analysis</h3><p>Understand the true cash-flow position of each property and the portfolio as a whole. Rental income, repayments, rates, insurance and fees in a single figure.</p></div>
    <div class="prob reveal"><h3>Market Rate Benchmarking</h3><p>Compare current mortgage rates against live market benchmarks, and automatically flag loans where refinancing may improve your borrowing position.</p></div>
    <div class="prob reveal"><h3>Portfolio Net Worth</h3><p>A single, consolidated view of total asset value minus total debt, updated on demand with a full historical timeline of your growth over time.</p></div>
  </div>
  <div style="text-align:center;margin-top:40px"><a class="btn btn-primary" href="https://capitalvue.app.portfoliologic.com.au/" target="_blank" rel="noopener">CapitalVue Portfolio Login</a><p style="color:var(--muted);font-size:.85rem;margin-top:.9rem">Exclusive to CapitalVue clients. Access is unlocked once you have purchased a property with us.</p></div>
</div></section>
${ctaBand}`;

/* ---------------- TEAM ---------------- */
const teamBody = `
${pageHero('Team','Your investment team','The people behind every purchase.','Decades of real estate leadership, finance, construction and negotiation, all on your side of the table.')}
<section><div class="wrap"><div class="team-grid">
  <div class="member wide reveal" id="brad"><img class="photo" loading="lazy" decoding="async" src="${PHOTO.brad}" alt="Brad Reece"><div><div class="nm">Brad Reece</div><div class="rl">Founder &amp; CEO</div><p>Property investor since 2004 with a substantial personal portfolio that reflects his strategic acumen and eye for opportunity. Leads our investment clients, the data-driven approach and the CapitalVue Dashboard platform.</p><p class="contact"><a href="mailto:brad@capitalvue.com.au">brad@capitalvue.com.au</a></p></div></div>
  <div class="member wide reveal" id="andrew"><img class="photo" loading="lazy" decoding="async" src="${PHOTO.andrew}" alt="Andrew Friebe"><div><div class="nm">Andrew Friebe</div><div class="rl">Advisor</div><p>A real estate veteran since 2005 and currently Harcourts CEO for Queensland. Previously LJ Hooker Managing Director (SA/WA) and Harcourts International COO.</p><p>At CapitalVue his focus is technology and partnerships, including the PortfolioLogic platform behind our trackers. He takes no part in client property purchases, and CapitalVue is never paid by a seller, agency or developer.</p><p class="contact"><a href="mailto:andrew@capitalvue.com.au">andrew@capitalvue.com.au</a></p></div></div>
  <div class="member reveal" id="tony"><img class="photo" loading="lazy" decoding="async" src="${PHOTO.tony}" alt="Tony Eaton"><div class="nm">Tony Eaton</div><div class="rl">Buyers Agent</div><p>Former law-enforcement professional known for honesty, integrity and advocacy. Works across both investment and owner-occupier purchases, and specialises in relocations to Brisbane from interstate or overseas.</p><p style="font-size:.86rem;color:var(--muted);margin-top:.5rem">您真诚，专业，值得信赖的房屋顾问</p><p class="contact"><a href="tel:+61400630674">0400 630 674</a><br><a href="mailto:tony@capitalvue.com.au">tony@capitalvue.com.au</a><br><span class="lbl">WeChat:</span> AntEater64</p></div>
  <div class="member reveal" id="dr-rebecca-cox"><img class="photo" loading="lazy" decoding="async" src="${PHOTO.bec}" alt="Dr Rebecca Cox"><div class="nm">Dr Rebecca Cox</div><div class="rl">Owner-Occupier Buyers Agent</div><p>Clinical optometrist and researcher, PhD, still practising at the Queensland Eye Institute. She reads a building and pest report the way she reads a clinical file: what actually matters, and what only sounds alarming. Leads our owner-occupier purchases. Her research background is reading evidence for what has been left out, which is the same job as reading a seller disclosure.</p><p class="contact"><a href="mailto:bec@capitalvue.com.au">bec@capitalvue.com.au</a></p></div>
  <div class="member reveal" id="chris"><img class="photo" loading="lazy" decoding="async" src="${PHOTO.chris}" alt="Chris van Rensburg"><div class="nm">Chris van Rensburg</div><div class="rl">Founder &amp; Construction Director</div><p>Finance and accounting background applied to building and construction, with a portfolio spanning short-term rentals and commercial property.</p><p class="contact"><a href="mailto:chris@capitalvue.com.au">chris@capitalvue.com.au</a></p></div>
  <div class="member reveal" id="nolan"><img class="photo" loading="lazy" decoding="async" src="${PHOTO.nolan}" alt="Nolan Fuazudeen"><div class="nm">Nolan Fuazudeen</div><div class="rl">Business Development Director</div><p>Property investor and long-time CapitalVue client whose network and belief in the mission make him a vital part of the team.</p><p class="contact"><a href="mailto:nolan@capitalvue.com.au">nolan@capitalvue.com.au</a></p></div>
</div>
<div style="margin-top:26px"><div class="cta reveal" style="padding:44px 26px"><h2 class="serif" style="font-size:1.7rem">Meet the team on a free strategy call.</h2><div class="hero-actions" style="margin-top:1.3rem"><a class="btn btn-primary" href="contact.html#book">Book a free strategy call</a><a class="btn btn-outline-l" href="tel:+61499484727">Call 0499 484 727</a></div></div></div>
</div></section>
<section class="bg-paper"><div class="wrap"><div class="sec-head center reveal"><span class="eyebrow">★★★★★ 5.0 from 27 Google reviews</span><h2 class="serif">What it's like to work with us.</h2></div>
<div class="rev-grid">${[REVIEWS[0],REVIEWS[3],REVIEWS[4]].map(revCard).join('')}</div></div></section>
${ctaBand}`;

/* ---------------- BLOG ---------------- */
const ARTICLES = [
  {slug:'buyers-agent-fees-australia', date:'17 August 2026', iso:'2026-08-17', cat:'Fees', title:'Buyers Agent Fees in Australia: What You Actually Pay', seo:'Buyers Agent Fees in Australia 2026', og:'assets/og-buyers-agent-fees.jpg', file:'buyers-agent-fees.html'},
  {slug:'adelaide-house-vs-unit-yield-gap', date:'5 August 2026', iso:'2026-08-05', cat:'Market update', title:'Adelaide&#39;s House vs Unit Yield Gap, and the Cost That Eats It', seo:'Adelaide House vs Unit Yields 2026', og:'assets/og-adelaide-yield.jpg', file:'adelaide-yield-gap.html'},
  {slug:'property-due-diligence-checklist', date:'6 July 2026', iso:'2026-07-06', cat:'Due diligence', title:'Property Due Diligence Checklist: Adelaide &amp; SEQ Investors', seo:'Property Due Diligence Checklist', file:'due-diligence.html'},
  {slug:'wait-or-buy-brisbane-2026', date:'17 June 2026', iso:'2026-06-17', cat:'Market update', title:'Wait or Buy? A Decision Framework for Brisbane Investors', seo:'Wait or Buy? Brisbane Investors 2026', file:'wait-or-buy.html'},
  {slug:'australian-property-investment-structures', date:'6 May 2026', iso:'2026-05-06', cat:'Strategy', title:'Australian Property Investment Structures', file:'structures.html'},
  {slug:'rental-crisis-cgt-investors', date:'20 March 2026', iso:'2026-03-20', cat:'Market update', title:'The Perfect Storm: Rental Crisis, CGT Changes &amp; the Role of Investors', seo:'Rental Crisis &amp; CGT: What Investors Face', file:'perfect-storm.html'},
  {slug:'cgt-discount-review', date:'5 February 2026', iso:'2026-02-05', cat:'Policy', title:'Australia&#39;s CGT Discount Is Under Formal Government Review', seo:'CGT Discount Review: What It Means', file:'cgt-review.html'},
  {slug:'benefits-of-rentvesting', date:'24 November 2025', iso:'2025-11-24', cat:'Strategy', title:'The Benefits of Rentvesting Explained', file:'rentvesting.html'},
];
const articleSchema = a => ({"@context":"https://schema.org","@type":"BlogPosting","headline":esc(a.title),"datePublished":a.iso,"dateModified":a.iso,"author":{"@type":"Organization","name":"CapitalVue"},"publisher":{"@type":"Organization","name":"CapitalVue","logo":{"@type":"ImageObject","url":BASE+"assets/cv-logo-stacked.png"}},"image":BASE+BLOGIMG[a.slug],"articleSection":a.cat,"mainEntityOfPage":{"@type":"WebPage","@id":BASE+"post-"+a.slug+".html"}});
const postCard = a => `<a class="post reveal" href="post-${a.slug}.html"><div class="thumb"><img src="${BLOGIMG[a.slug]}" alt="${esc(a.title)}" loading="lazy" decoding="async" width="820" height="470"><span class="cat">${a.cat}</span></div><div class="pb"><span class="dt">${a.date}</span><h3>${a.title}</h3><span class="rd">Read article →</span></div></a>`;
const articleBody = a => `
<section class="page-hero"><div class="wrap" style="max-width:820px;margin:0 auto">
  <div class="crumb"><a href="index.html">Home</a> / <a href="blog.html">Blog</a></div>
  <span class="eyebrow">${a.cat}</span>
  <h1 class="serif" style="font-size:clamp(1.8rem,3.8vw,2.6rem)">${a.title}</h1>
  <div class="article-meta">${a.date} · By Brad · CapitalVue</div>
</div></section>
<section><div class="wrap"><div class="article">
<img src="${BLOGIMG[a.slug]}" alt="${esc(a.title)}" decoding="async" style="width:100%;border-radius:16px;margin-bottom:2rem;aspect-ratio:16/8;object-fit:cover;box-shadow:var(--shadow-sm)">
${readContent(a.file)}
<p style="margin-top:2.4rem"><a href="blog.html" style="color:var(--emerald);font-weight:600">← Back to all articles</a></p>
</div></div></section>
${ctaBand}`;

/* ---------------- 404 ---------------- */
const notFoundBody = `
<section class="page-hero"><div class="wrap" style="max-width:760px;margin:0 auto;text-align:center">
  <span class="eyebrow">Error 404</span>
  <h1 class="serif" style="font-size:clamp(1.9rem,4vw,2.8rem)">That page has moved, or never existed.</h1>
  <p style="margin-top:1rem">We rebuilt the CapitalVue site, so a few older links no longer resolve. Everything below is where you probably wanted to go.</p>
  <div class="hero-actions" style="margin-top:1.6rem;justify-content:center">
    <a class="btn btn-primary" href="index.html">Back to home</a>
    <a class="btn btn-outline-l" href="contact.html#book">Book a strategy call</a>
  </div>
</div></section>
<section><div class="wrap"><div class="team-grid" style="max-width:900px;margin:0 auto">
  <div class="member"><div><div class="nm"><a href="services.html">Services &amp; pricing</a></div><p>Fixed-fee buyers agent packages for investors and home buyers across QLD and SA.</p></div></div>
  <div class="member"><div><div class="nm"><a href="buying-power.html">Buying power calculator</a></div><p>Estimate what you could buy, your repayments and an illustrative growth picture in 60 seconds.</p></div></div>
  <div class="member"><div><div class="nm"><a href="tracker.html">Property trackers</a></div><p>Track market value, equity, yield and LVR on your portfolio in real time.</p></div></div>
  <div class="member"><div><div class="nm"><a href="team.html">Our team</a></div><p>Meet the buyers agents behind every CapitalVue purchase.</p></div></div>
  <div class="member"><div><div class="nm"><a href="blog.html">The Vue blog</a></div><p>Market updates, strategy and buying frameworks for Australian property.</p></div></div>
  <div class="member"><div><div class="nm"><a href="contact.html">Contact us</a></div><p>Call 0499 484 727 or book a free, no-obligation strategy call.</p></div></div>
</div></div></section>
${ctaBand}`;

const legalBody = (title,file) => `
<section class="page-hero"><div class="wrap" style="max-width:820px;margin:0 auto">
  <div class="crumb"><a href="index.html">Home</a> / ${title}</div>
  <h1 class="serif" style="font-size:clamp(1.8rem,3.8vw,2.4rem)">${title}</h1>
  <div class="article-meta">CapitalVue Pty Ltd · ABN 56 671 085 028</div>
</div></section>
<section><div class="wrap"><div class="article">
${readContent(file)}
<p style="margin-top:2.4rem"><a href="contact.html#book" style="color:var(--emerald);font-weight:600">Questions? Get in touch →</a></p>
</div></div></section>`;
const blogBody = `
${pageHero('Blog','Property Investment Blog – The Vue','Insight for Australian property investors.','Market updates, strategy and the frameworks we use with clients. Straight talk, no hype.')}
<section><div class="wrap">
  <div class="blog-grid">${ARTICLES.map(postCard).join('')}</div>
</div></section>
<section class="bg-paper"><div class="wrap"><div class="cta reveal">
  <span class="eyebrow" style="color:#4fc2c2">Free guide</span>
  <h2 class="serif">Get the Property Due Diligence Checklist.</h2>
  <p>The same checklist we run on every purchase. Enter your email and we'll send it over.</p>
  <div class="hero-actions" style="justify-content:center"><a class="btn btn-primary" href="contact.html#book">Request the checklist</a></div>
</div></div></section>`;

/* ---------------- CONTACT ---------------- */
const contactBody = `
${pageHero('Contact','Get in touch','Book a free strategy call.','Tell us where you\'re at. We\'ll pressure-test your goals, show you what\'s possible, and tell you honestly whether we can help. No pressure, no obligation.')}
<section id="book"><div class="wrap">
  <div class="reveal" style="max-width:860px;margin:0 auto 52px">
    <h2 class="serif" style="font-size:1.7rem;margin-bottom:.5rem;text-align:center">Book your free strategy call</h2>
    <p style="color:var(--muted);text-align:center;margin-bottom:1.6rem">Pick a time that suits you. No obligation, no hard sell.</p>
    <div class="meetings-iframe-container" data-src="https://meetings-ap1.hubspot.com/brad660/ba-brad-reece?embed=true" style="min-height:720px"></div>
    <script type="text/javascript" src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"></script>
    <noscript><p style="text-align:center"><a class="btn btn-primary" href="https://meetings-ap1.hubspot.com/brad660/ba-brad-reece" target="_blank" rel="noopener">Open the booking calendar</a></p></noscript>
    <p style="text-align:center;color:var(--muted);font-size:.85rem;margin-top:.9rem">Calendar not showing? <a href="https://meetings-ap1.hubspot.com/brad660/ba-brad-reece" target="_blank" rel="noopener" style="color:var(--emerald);text-decoration:underline">Open it in a new tab</a>.</p>
  </div>
  <div class="contact-grid">
  <div class="reveal">
    <h2 class="serif" style="font-size:1.6rem;margin-bottom:.6rem">Prefer to send a message?</h2>
    <p style="color:var(--muted);margin-bottom:1.3rem;font-size:.96rem">Not ready to pick a time? Send us a note and we'll reply within one business day, with no obligation and no hard sell.</p>
    <div class="hs-form-frame" data-region="ap1" data-form-id="0b6974fa-ec13-45d0-aa45-62d8f985f2da" data-portal-id="45491120"></div>
    <script src="https://js-ap1.hsforms.net/forms/embed/45491120.js" defer></script>
    <p style="color:var(--muted);font-size:.8rem;margin-top:.9rem;line-height:1.5">By submitting this form you agree to our <a href="privacy-policy.html" style="color:var(--emerald);text-decoration:underline">Privacy Policy</a>. This site uses cookies and tracking (Google, Meta and HubSpot) to measure traffic and advertising.</p>
  </div>
  <div class="reveal">
    <h2 class="serif" style="font-size:1.6rem;margin-bottom:1rem">Contact details</h2>
    <div class="info-row"><span class="ic">✉</span><div><div class="l">Email</div><a class="v" href="mailto:info@capitalvue.com.au">info@capitalvue.com.au</a></div></div>
    <div class="info-row"><span class="ic">✆</span><div><div class="l">Phone</div><a class="v" href="tel:+61499484727">0499 484 727</a></div></div>
    <div class="info-row"><span class="ic">⌖</span><div><div class="l">Office</div><div class="v">28 Bovelles St, Camp Hill QLD 4152</div></div></div>
    <div class="info-row"><span class="ic">◷</span><div><div class="l">Licensing</div><div class="v">QLD 4769773 · SA 335016</div></div></div>
    <div style="margin-top:22px;padding:22px;background:var(--navy);border-radius:var(--radius);color:#fff">
      <div class="stars" style="font-size:1.05rem">★★★★★</div>
      <p style="color:#c6d2e2;margin:.5rem 0 1rem">Rated 5.0 from 27 client reviews on Google.</p>
      <a class="btn btn-light" href="https://maps.app.goo.gl/s9fyPFnemrxc4oq56" target="_blank" rel="noopener">Read our reviews</a>
    </div>
  </div>
  </div>
</div></section>`;

const calcBody = `
${pageHero('Calculator','Borrowing &amp; buying power calculator','What can you buy, and what could it be worth?','Get an indicative buying budget and an illustrative growth picture in under a minute. Adjust the numbers, then reveal your results.')}
<section><div class="wrap">
<div class="calc-grid">
  <div class="calc-inputs reveal">
    <h2 class="serif" style="font-size:1.5rem;margin-bottom:.3rem">Your numbers</h2>
    <p style="color:var(--muted);font-size:.92rem;margin-bottom:1.4rem">Estimates only. Nothing is saved until you choose to reveal your results.</p>
    <div class="cf"><label>Your gross annual income</label><input id="inc1" inputmode="numeric" placeholder="$120,000"></div>
    <div class="cf"><label>Partner's gross annual income <span class="opt">(optional)</span></label><input id="inc2" inputmode="numeric" placeholder="$0"></div>
    <div class="cf"><label>Deposit / equity available</label><input id="dep" inputmode="numeric" placeholder="$100,000"></div>
    <div class="cf"><label>Monthly living expenses</label><input id="exp" inputmode="numeric" placeholder="$4,000"></div>
    <div class="cf-row">
      <div class="cf"><label>Other monthly loan repayments</label><input id="debt" inputmode="numeric" placeholder="$0"></div>
      <div class="cf"><label>Total credit card limits</label><input id="cc" inputmode="numeric" placeholder="$0"></div>
    </div>
    <div class="cf-row">
      <div class="cf"><label>Interest rate (%)</label><input id="rate" inputmode="decimal" value="6.2"></div>
      <div class="cf"><label>Loan term (years)</label><input id="term" inputmode="numeric" value="30"></div>
    </div>
    <div class="calc-assume">
      <div class="ca-head">Your growth assumption <span class="opt">(you choose)</span></div>
      <div class="cf-row">
        <div class="cf"><label>Annual growth rate (%)</label><input id="growth" inputmode="decimal" value="5"></div>
        <div class="cf"><label>Time horizon (years)</label><input id="years" inputmode="numeric" value="10"></div>
      </div>
      <p class="ca-note">This is an assumption you set, not a CapitalVue forecast. Past performance is not a reliable indicator of future performance and property values can fall as well as rise.</p>
    </div>
    <div class="calc-own">
      <label class="own-toggle"><input type="checkbox" id="own"><span>I already own property (add equity &amp; rental income)</span></label>
      <div id="ownFields" class="own-fields" hidden>
        <div class="cf"><label>Current property value(s)</label><input id="pval" inputmode="numeric" placeholder="$800,000"></div>
        <div class="cf-row">
          <div class="cf"><label>Current loan balance(s)</label><input id="ploan" inputmode="numeric" placeholder="$400,000"></div>
          <div class="cf"><label>Rent received (per week)</label><input id="prent" inputmode="numeric" placeholder="$550"></div>
        </div>
        <p class="ca-note">We estimate usable equity at 80% of value less current loans, shade rental income to 80%, and assess your existing loan at the buffered rate. Indicative only &mdash; a lender will assess your portfolio in detail.</p>
      </div>
    </div>
    <button type="button" id="revealBtn" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:.4rem">Reveal my results</button>
    <p id="calc_err" style="color:#c0392b;font-size:.85rem;margin-top:.5rem;min-height:1em;text-align:center"></p>
  </div>

  <div class="calc-results reveal">
    <div id="gate" class="calc-gate">
      <h3 class="serif" style="font-size:1.4rem;margin-bottom:.4rem">Where should we send your results?</h3>
      <p style="color:var(--muted);font-size:.92rem;margin-bottom:1.1rem">Enter your details to unlock your indicative buying power and growth picture. We'll also send you a copy.</p>
      <div class="cf"><label>Full name</label><input id="g_name" placeholder="Jane Smith"></div>
      <div class="cf"><label>Email</label><input id="g_email" type="email" placeholder="jane@email.com"></div>
      <div class="cf"><label>Phone</label><input id="g_phone" inputmode="tel" placeholder="0400 000 000"></div>
      <input id="cv_hp" name="cv_hp" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" placeholder="">
      <p class="gate-notice">CapitalVue Pty Ltd (ABN 56 671 085 028) collects your details to respond to your enquiry and provide our services. We may share information with service providers, some located overseas, and use cookies and tracking (Google, Meta, HubSpot). Our <a href="privacy-policy.html" target="_blank" rel="noopener">Privacy Policy</a> explains how we handle your information and how to access, correct or complain.</p>
      <label class="gate-consent"><input type="checkbox" id="g_consent"><span>I've read and agree to CapitalVue's Privacy Policy.</span></label>
      <label class="gate-consent"><input type="checkbox" id="g_mkt"><span>Send me property insights and market updates from CapitalVue. I can unsubscribe anytime.</span></label>
      <button type="button" id="unlockBtn" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:.7rem">Unlock my results</button>
      <p id="gate_err" class="gate-err"></p>
    </div>

    <div id="output" class="calc-output" hidden>
      <div class="ro-head">Your indicative results</div>
      <div class="ro-cards">
        <div class="ro-card ro-hero"><span class="ro-l">Indicative borrowing power</span><span class="ro-v" id="r_loan">—</span></div>
        <div class="ro-card"><span class="ro-l">Estimated purchase budget</span><span class="ro-v" id="r_budget">—</span><span class="ro-s">loan + deposit/equity, before buying costs</span></div>
        <div class="ro-card" id="r_usable_card" hidden><span class="ro-l">Usable equity from existing property</span><span class="ro-v" id="r_usable">—</span><span class="ro-s">~80% of value less current loans</span></div>
        <div class="ro-card"><span class="ro-l">Repayment at your rate</span><span class="ro-v" id="r_repay">—</span><span class="ro-s">per month, principal &amp; interest</span></div>
      </div>
      <div class="ro-growth">
        <div class="ro-g-head">Illustrative picture in <span id="r_years">10</span> years <span class="ro-g-sub">at <span id="r_growth">5</span>% growth you chose</span></div>
        <div class="ro-cards">
          <div class="ro-card"><span class="ro-l">Projected property value</span><span class="ro-v" id="r_fv">—</span></div>
          <div class="ro-card"><span class="ro-l">Projected equity</span><span class="ro-v" id="r_equity">—</span><span class="ro-s">value less remaining loan</span></div>
        </div>
      </div>
      <p id="r_flag" class="ro-flag" hidden></p>
      <a class="btn btn-primary" href="contact.html#book" style="width:100%;justify-content:center;margin-top:.4rem">Turn this into a plan — book a free call</a>
      <button type="button" id="editBtn" class="ro-edit">Change my numbers</button>
    </div>
  </div>
</div>

<div class="calc-disc">
  <strong>Important:</strong> This calculator provides indicative estimates only, based on the information you enter and general assumptions (a 3% serviceability buffer, 2026&ndash;27 resident tax rates, a minimum household living-expense estimate, and a conservative buffer applied to the result). It is deliberately cautious, so a lender may assess you higher or lower. It is not a loan approval, credit assistance, or personal financial or credit advice, and it does not account for your full circumstances or a lender's individual policies. CapitalVue is a licensed buyers agency, not a credit provider, mortgage broker or financial adviser. Speak to a licensed mortgage broker or lender for a borrowing assessment, and obtain independent financial advice before making any investment decision.
</div>
</div></section>

<section style="background:#f4f7fb"><div class="wrap" style="max-width:820px">
  <h2 class="serif" style="font-size:1.6rem;margin-bottom:1rem">How the borrowing power calculator works</h2>
  <p style="color:var(--muted);margin-bottom:1.4rem">This free borrowing power calculator gives Australian home buyers and property investors an indicative estimate of how much they could borrow, their likely purchase budget, and monthly repayments, plus an illustrative view of how the property could grow over time. Enter your income, deposit and expenses to see your buying power in about a minute. If you already own property, you can add your equity and rental income to estimate your next-purchase capacity. CapitalVue is a licensed Australian buyers agency operating across South East Queensland and South Australia.</p>
  <div class="faq">
    <div class="fq"><h3>How much can I borrow for a property?</h3><p>Your borrowing power depends mainly on your income, living expenses, existing debts and the interest rate. This calculator gives an indicative estimate using a 3% serviceability buffer, the way lenders stress-test repayments. A lender will assess your full circumstances and may lend more or less.</p></div>
    <div class="fq"><h3>How is my property buying budget calculated?</h3><p>Your estimated purchase budget is your indicative loan plus your available deposit or usable equity, before buying costs such as stamp duty and legal fees, which typically come out of your deposit.</p></div>
    <div class="fq"><h3>Can I use my existing property's equity to buy another?</h3><p>Yes. Tick "I already own property" to estimate your usable equity (roughly 80% of the property's value less your current loans) and factor in rental income, so you can see your indicative next-purchase capacity.</p></div>
    <div class="fq"><h3>Is this financial or credit advice?</h3><p>No. It is an indicative estimate only and not credit assistance or personal financial advice. Speak to a licensed mortgage broker or lender for a borrowing assessment, and obtain independent advice before making an investment decision.</p></div>
  </div>
</div>
  <p style="margin-top:1.6rem">Know your number? See what it buys in the markets we work in, on our <a href="buyers-agent-brisbane.html">Brisbane buyers agent</a> and <a href="buyers-agent-adelaide.html">Adelaide buyers agent</a> pages. Not sure you are ready yet? Take the free <a href="property-readiness.html">property readiness snapshot</a>.</p>
</section>

<style>
.faq{display:flex;flex-direction:column;gap:.4rem}
.fq{background:#fff;border:1px solid var(--line);border-radius:12px;padding:18px 20px}
.fq h3{font-size:1.02rem;margin-bottom:.4rem;color:var(--ink)}
.fq p{color:#33465f;font-size:.94rem}
.calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:start}
.calc-inputs,.calc-results{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:28px;box-shadow:var(--shadow-sm)}
.calc-results{background:linear-gradient(170deg,#0d3157,#061a30);color:#fff;border:0}
.cf{margin-bottom:1rem}
.cf label{display:block;font-size:.85rem;font-weight:600;color:var(--ink);margin-bottom:.35rem}
.calc-results .cf label{color:#dbe6f4}
.cf .opt{font-weight:400;color:var(--muted)}
.cf input{width:100%;padding:.7rem .9rem;border:1px solid var(--line);border-radius:10px;font-family:inherit;font-size:1rem;background:#fff;color:var(--ink)}
.cf-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:end}
.cf-row .cf label{min-height:2.5em;display:flex;align-items:flex-end}
.calc-assume{background:#f4f7fb;border:1px solid var(--line);border-radius:14px;padding:16px;margin:1.1rem 0}
.calc-own{border:1px dashed var(--line);border-radius:14px;padding:14px 16px;margin:0 0 1.1rem}
.own-toggle{display:flex;align-items:center;gap:.6rem;font-weight:600;font-size:.9rem;color:var(--ink);cursor:pointer;user-select:none}
.own-toggle input{width:18px;height:18px;flex:0 0 auto;accent-color:var(--emerald)}
.own-fields{margin-top:14px}
.ca-head{font-weight:600;font-size:.9rem;margin-bottom:.7rem;color:var(--ink)}
.ca-note{font-size:.76rem;color:var(--muted);margin-top:.3rem;line-height:1.5}
.calc-gate .cf label{color:#dbe6f4}
.gate-err{color:#ff9b9b;font-size:.82rem;margin-top:.6rem;min-height:1em}
.gate-notice{color:#a9c0d8;font-size:.76rem;line-height:1.5;margin-top:.9rem}
.gate-notice a{color:#7fe3e3}
.gate-consent{display:flex;gap:.55rem;align-items:flex-start;font-size:.82rem;color:#dbe6f4;margin-top:.7rem;cursor:pointer}
.gate-consent input{margin-top:.15rem;width:16px;height:16px;flex:0 0 auto;accent-color:var(--emerald)}
.gate-consent a{color:#7fe3e3}
.hp{position:absolute!important;left:-9999px!important;top:auto;width:1px;height:1px;overflow:hidden;opacity:0}
.ro-head,.ro-g-head{font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:#8fb3d6;font-weight:600;margin-bottom:1rem}
.ro-cards{display:flex;flex-direction:column;gap:12px}
.ro-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:16px 18px;display:flex;flex-direction:column}
.ro-hero{background:rgba(79,194,194,.14);border-color:rgba(79,194,194,.4)}
.ro-card[hidden]{display:none}
.ro-l{font-size:.85rem;color:#c6d2e2}
.ro-v{font-size:1.7rem;font-weight:700;font-family:'Poppins','Poppins Fallback',sans-serif;margin-top:.15rem}
.ro-hero .ro-v{color:#7fe3e3}
.ro-s{font-size:.75rem;color:#8fb3d6;margin-top:.2rem}
.ro-growth{margin-top:1.4rem;padding-top:1.4rem;border-top:1px solid rgba(255,255,255,.12)}
.ro-g-sub{text-transform:none;letter-spacing:0;color:#8fb3d6;font-weight:400}
.ro-flag{background:rgba(255,196,120,.14);border:1px solid rgba(255,196,120,.35);color:#ffd9a8;font-size:.82rem;border-radius:10px;padding:10px 12px;margin-top:1rem;line-height:1.5}
.ro-edit{background:none;border:0;color:#8fb3d6;text-decoration:underline;font-family:inherit;font-size:.85rem;cursor:pointer;margin-top:.9rem;width:100%}
.calc-disc{font-size:.8rem;color:var(--muted);line-height:1.6;border-top:1px solid var(--line);margin-top:40px;padding-top:20px;max-width:860px}
@media(max-width:860px){.calc-grid{grid-template-columns:1fr;gap:20px}}
</style>

<script>
(function(){
  if(!document.getElementById('revealBtn')) return;
  var HSCALC="https://api-ap1.hsforms.com/submissions/v3/integration/submit/45491120/9f419495-172c-4c2b-9578-e0e87d37fbbe";
  function el(id){return document.getElementById(id);}
  function num(id){var s=(el(id).value||'').toString().replace(/[^0-9.]/g,'');var v=parseFloat(s);return isNaN(v)?0:v;}
  function money(n){return '$'+Math.round(n).toLocaleString('en-AU');}
  function tax(g){var t=0;if(g>190000){t+=(g-190000)*0.45;g=190000;}if(g>135000){t+=(g-135000)*0.37;g=135000;}if(g>45000){t+=(g-45000)*0.30;g=45000;}if(g>18200){t+=(g-18200)*0.15;}return t;}
  function netAnnual(g){if(g<=0)return 0;return g-tax(g)-g*0.02;}
  function factor(ratePct,years){var r=ratePct/100/12,n=years*12;if(r===0)return 1/n;return r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);}
  function balance(loan,ratePct,years,after){var r=ratePct/100/12,k=after*12,m=loan*factor(ratePct,years);if(r===0)return Math.max(0,loan-m*k);var b=loan*Math.pow(1+r,k)-m*((Math.pow(1+r,k)-1)/r);return Math.max(0,b);}
  function calc(){
    var net=(netAnnual(num('inc1'))+netAnnual(num('inc2')))/12;
    var floor=num('inc2')>0?3500:2400;              // HEM-style minimum household living expenses
    var exp=Math.max(num('exp'),floor);
    var rate=num('rate')||6.2,term=num('term')||30;
    var surplus=net-exp-num('debt')-num('cc')*0.038;
    var dep=num('dep'),usable=0;
    if(el('own')&&el('own').checked){               // existing-property investor
      usable=Math.max(0,num('pval')*0.80-num('ploan'));   // accessible equity at 80% LVR
      surplus+=(num('prent')*52/12)*0.80;                 // net rent shaded to 80%
      surplus-=num('ploan')*factor(rate+3,term);          // existing loan assessed at buffered rate
      dep+=usable;
    }
    var HAIRCUT=0.88;                               // conservative buffer for lender policies/haircuts
    var maxLoan=(surplus>0?surplus/factor(rate+3,term):0)*HAIRCUT;
    var budget=maxLoan+dep;
    var repay=maxLoan*factor(rate,term);
    var g=num('growth'),yrs=num('years')||10;
    var fv=budget*Math.pow(1+g/100,yrs);
    var bal=balance(maxLoan,rate,term,Math.min(yrs,term));
    var equity=fv-bal;
    return {maxLoan:maxLoan,budget:budget,repay:repay,fv:fv,equity:equity,dep:dep,surplus:surplus,yrs:yrs,g:g,usable:usable};
  }
  function render(){
    var d=calc();
    el('r_loan').textContent=money(d.maxLoan);
    el('r_budget').textContent=money(d.budget);
    el('r_repay').textContent=money(d.repay);
    if(d.usable>0){el('r_usable_card').hidden=false;el('r_usable').textContent=money(d.usable);}else{el('r_usable_card').hidden=true;}
    el('r_fv').textContent=money(d.fv);
    el('r_equity').textContent=money(d.equity);
    el('r_years').textContent=d.yrs;
    el('r_growth').textContent=d.g;
    var flag=el('r_flag');
    if(d.surplus<=0){flag.hidden=false;flag.textContent="Based on these figures there isn't much surplus income to service a new loan. That's exactly the kind of thing a strategy call can work through.";}
    else if(d.budget>0 && d.dep/d.budget<0.20){flag.hidden=false;flag.textContent="Your deposit is under 20% of the budget, so lenders may require Lenders Mortgage Insurance (LMI), and buying costs like stamp duty come out of your deposit.";}
    else{flag.hidden=true;}
  }
  function reveal(){
    var ce=el('calc_err');
    if(num('inc1')<=0){ce.textContent='Please enter your gross annual income above to see results.';el('inc1').focus();return;}
    if(num('dep')<=0 && !(el('own').checked && num('pval')>0)){ce.textContent='Please enter your deposit, or your property value if you already own.';el('dep').focus();return;}
    ce.textContent='';
    el('gate').hidden=false;el('output').hidden=true;el('gate').scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  ['inc1','inc2','dep','exp','debt','cc','pval','ploan','prent'].forEach(function(id){var f=el(id);if(!f)return;f.addEventListener('input',function(){var v=f.value.replace(/[^0-9]/g,'');f.value=(v==='')?'':'$'+parseInt(v,10).toLocaleString('en-AU');});});
  el('own').addEventListener('change',function(){el('ownFields').hidden=!this.checked;});
  el('revealBtn').addEventListener('click',reveal);
  el('editBtn').addEventListener('click',function(){el('output').hidden=true;el('gate').hidden=false;var ub=el('unlockBtn');ub.disabled=false;ub.textContent='Unlock my results';});
  el('unlockBtn').addEventListener('click',function(){
    if((el('cv_hp').value||'')!==''){return;}   // honeypot (non-autofill name so browsers don't fill it): bots fill this, humans never see it
    var name=(el('g_name').value||'').trim(),email=(el('g_email').value||'').trim(),phone=(el('g_phone').value||'').trim();
    var err=el('gate_err');
    if(!name){err.textContent='Please enter your name.';return;}
    if(!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)){err.textContent='Please enter a valid email.';return;}
    if(phone.replace(/[^0-9]/g,'').length<8){err.textContent='Please enter a valid phone number.';return;}
    if(!el('g_consent').checked){err.textContent='Please agree to the Privacy Policy to continue.';return;}
    err.textContent='';
    var mkt=el('g_mkt')&&el('g_mkt').checked;
    var d=calc();
    var owns=el('own')&&el('own').checked;
    var summary='[Buying Power Calculator] Income1 '+money(num('inc1'))+', Income2 '+money(num('inc2'))+', Cash deposit '+money(num('dep'))+', Expenses/mo '+money(num('exp'))+'.'+(owns?(' EXISTING OWNER: value '+money(num('pval'))+', loan '+money(num('ploan'))+', rent/wk '+money(num('prent'))+', usable equity '+money(d.usable)+'.'):'')+' Indicative borrowing power '+money(d.maxLoan)+', budget '+money(d.budget)+', repayment/mo '+money(d.repay)+'. Illustrative value in '+d.yrs+'yr at '+d.g+'%: '+money(d.fv)+' (equity '+money(d.equity)+'). Marketing opt-in: '+(mkt?'yes':'no')+'.';
    var fields=[{name:'firstname',value:name},{name:'email',value:email},{name:'mobilephone',value:phone},{name:'message',value:summary}];
    var payload={fields:fields,context:{pageUri:location.href,pageName:document.title},legalConsentOptions:{consent:{consentToProcess:true,text:"I have read and agree to CapitalVue's Privacy Policy and consent to CapitalVue collecting and handling my personal information."}}};
    var btn=el('unlockBtn');btn.disabled=true;btn.textContent='Unlocking...';
    render();el('gate').hidden=true;el('output').hidden=false;el('output').scrollIntoView({behavior:'smooth',block:'nearest'});
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({event:'hs_form_submitted',form_source:'buying_power_calculator',marketing_optin:mkt?'yes':'no'});
    try{fetch(HSCALC,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),keepalive:true}).catch(function(){});}catch(e){}
  });
})();
</script>`;

/* ---------------- CITY LANDING PAGES ---------------- */
// ---- Full client results, sourced from the CapitalVue tracker (Aug 2026 valuations).
// Suburb + figures only. No client names or street numbers, per APP obligations.
const RESULTS = [
  {sub:'Morningside',    st:'QLD', type:'Investment',            paid:1925000, val:1990000},
  {sub:'Carina Heights', st:'QLD', type:'Investment',            paid:944500,  val:1250000},
  {sub:'Taigum',         st:'QLD', type:'Investment',            paid:865000,  val:1050000},
  {sub:'Chapel Hill',    st:'QLD', type:'Investment',            paid:1642500, val:1840000},
  {sub:'Keperra',        st:'QLD', type:'Owner-occupier',        paid:1160000, val:1260000},
  {sub:'Palmwoods',      st:'QLD', type:'Owner-occupier',        paid:1070000, val:1170000},
  {sub:'Kangaroo Point', st:'QLD', type:'Investment · apartment',paid:850000,  val:1193000},
  {sub:'Huntfield Heights',st:'SA', type:'Investment',           paid:630000,  val:770000},
  {sub:'St Morris',      st:'SA',  type:'Investment',            paid:1507000, val:1720000},
  {sub:'Elizabeth',      st:'SA',  type:'Investment',            paid:525000,  val:626000},
  {sub:'Andrews Farm',   st:'SA',  type:'Investment',            paid:585000,  val:689000},
  {sub:'Andrews Farm',   st:'SA',  type:'Investment',            paid:615000,  val:712800},
  {sub:'Salisbury',      st:'SA',  type:'Investment',            paid:575000,  val:625000},
];
const aud = n => '$' + n.toLocaleString('en-AU');
const growPc = r => ((r.val / r.paid - 1) * 100);
const resultsTable = state => {
  const rows = RESULTS.filter(r => r.st === state).sort((a,b) => growPc(b) - growPc(a));
  const paid = rows.reduce((t,r)=>t+r.paid,0), val = rows.reduce((t,r)=>t+r.val,0);
  return `<div class="res-wrap"><table class="res-table">
  <thead><tr><th>Suburb</th><th>Type</th><th>Purchased</th><th>Current value</th><th>Growth</th></tr></thead>
  <tbody>${rows.map(r=>`<tr><td><strong>${r.sub}</strong></td><td>${r.type}</td><td>${aud(r.paid)}</td><td>${aud(r.val)}</td><td class="g">+${growPc(r).toFixed(2)}%</td></tr>`).join('')}</tbody>
  <tfoot><tr><td colspan="2"><strong>${rows.length} purchases</strong></td><td><strong>${aud(paid)}</strong></td><td><strong>${aud(val)}</strong></td><td class="g"><strong>+${((val/paid-1)*100).toFixed(2)}%</strong></td></tr></tfoot>
  </table></div>`;
};

// Market figures sourced Aug 2026. Refresh quarterly: Cotality HVI (monthly release),
// SQM Research vacancy + asking rents (monthly), RBA cash rate.
const MKT_ASOF = 'August 2026';
const faqHtml = items => `<div class="faq">${items.map(f=>`<div class="fq"><h3>${f.q}</h3><p>${f.a}</p></div>`).join('')}</div>`;
const faqSchema = items => ({"@context":"https://schema.org","@type":"FAQPage","mainEntity":items.map(f=>({"@type":"Question","name":esc(f.q.replace(/<[^>]+>/g,'')),"acceptedAnswer":{"@type":"Answer","text":esc(f.a.replace(/<[^>]+>/g,''))}}))});
// A Service node that points back at the single RealEstateAgent entity (#organisation).
// Deliberately no second aggregateRating or address: duplicating those across two
// entities is a rich-results problem, not a bonus.
const svcAreaSchema = (city,state,areas) => ({"@context":"https://schema.org","@type":"Service","@id":BASE+`buyers-agent-${city.toLowerCase()}.html#service`,"name":`Buyers agent services in ${city}`,"serviceType":"Buyers agent","description":`Licensed buyers agency helping property investors search, assess, negotiate and secure property in ${city}, ${state}.`,"url":BASE+`buyers-agent-${city.toLowerCase()}.html`,"provider":{"@id":BASE+"#organisation"},"areaServed":[{"@type":"City","name":city},...areas.filter(a=>a!==city).map(a=>({"@type":"Place","name":a}))],"offers":[{"@type":"Offer","name":"Full buyers agent service (investors)","price":"19500","priceCurrency":"AUD"},{"@type":"Offer","name":"Owner-occupier support","price":"11500","priceCurrency":"AUD"},{"@type":"Offer","name":"Auction bidding only","price":"2200","priceCurrency":"AUD"}]});
const statCard = (ic,col,bg,n,l,nc) => `<div class="hc-stat"><div class="ic" style="background:${bg};color:${col}">${ic}</div><div class="n"${nc?` style="color:${nc}"`:''}>${n}</div><div class="l">${l}</div></div>`;
const buyRow = p => `<div class="prob"><div class="q">${p.loc}</div><p style="margin-bottom:.5rem"><strong>${p.type}</strong></p><p>Purchased ${p.paid} &middot; now valued ${p.value}<br><span style="color:var(--emerald);font-weight:700">${p.grow} since purchase</span></p></div>`;
const dataNote = `<p class="disclaimer" style="margin-top:1.6rem">Market figures are indicative and current as at ${MKT_ASOF}. Dwelling values and annual growth: Cotality (formerly CoreLogic) Home Value Index, July 2026 release. Vacancy rates and asking rents: SQM Research, June 2026. Cash rate: Reserve Bank of Australia, 4.35% held at the June 2026 meeting. Figures change monthly and are provided as general market context only. Past performance is not a reliable indicator of future performance.</p>
<p class="disclaimer">CapitalVue Pty Ltd is a licensed buyers agency (QLD 4769773, SA 335016). Nothing on this page is personal financial advice, credit assistance or a recommendation to buy a particular property. Consider your own circumstances and obtain independent financial, credit, legal and tax advice before making a property decision.</p>`;

const BNE_FAQ = [
  {q:'How much does a buyers agent cost in Brisbane?', a:'CapitalVue charges fixed fees, not a percentage of the purchase price, so our fee does not rise when the price does. Full buyers agent service for investors is $19,500, owner-occupier support is $11,500, and auction bidding only is $2,200. Fees are published in full on our services page.'},
  {q:'Is now a good time to buy an investment property in Brisbane?', a:'Brisbane dwelling values fell 0.6% in July 2026 and 0.6% over the quarter, after rising 14.8% across the year. At the same time vacancy sits near 0.9% and asking rents rose about 9.1% year on year. In plain terms, the capital growth run has paused while rental income has held up, which historically gives buyers more negotiating room. Whether that suits you depends entirely on your borrowing position, timeframe and risk tolerance, which is a conversation, not a blanket answer.'},
  {q:'Which Brisbane suburbs do you buy in?', a:'We focus on four Brisbane submarkets: the inner east (Morningside, Camp Hill, Carina Heights, Cannon Hill, Balmoral), the inner west and north-west (Chapel Hill, Kenmore, Keperra, Mitchelton), the northside corridor (Taigum, Zillmere, Bracken Ridge, Aspley, Chermside) and inner-city apartments (Kangaroo Point, Woolloongabba, South Brisbane, Newstead). We do not buy in a suburb simply because it is trending.'},
  {q:'Do I need to live in Brisbane to use a Brisbane buyers agent?', a:'No. A large share of our clients buy in Brisbane from interstate or overseas without inspecting in person. We inspect, video walk the property, run the due diligence, negotiate and manage settlement. Our office is in Camp Hill, so inspections are local to us rather than a flight away.'},
  {q:'What is the difference between a buyers agent and a real estate agent?', a:'A selling agent is paid by the vendor and is legally obliged to get the highest price for them. A buyers agent is engaged and paid by you, and works to secure the right property at the lowest defensible price. We never accept commissions or referral fees from sellers, developers or project marketers.'},
  {q:'What price range do you buy in around Brisbane?', a:'Most CapitalVue Brisbane purchases sit between roughly $850,000 and $1.6m, which is where the established, well-located stock in our four submarkets trades. Our documented client purchases span $850,000 for an inner-city apartment up to $1,925,000 for an inner-east house.'},
  {q:'How long does it take to buy a property in Brisbane?', a:'Most CapitalVue purchases run six to ten weeks from strategy session to signed contract, then a standard 30 to 45 day settlement. Tighter briefs take longer. We would rather miss a deal than push you into the wrong asset to hit a deadline.'},
];

const brisbaneBody = `
${pageHero('Buyers Agent Brisbane','Brisbane &middot; Investor buyers agency','Buyers agent Brisbane: we buy the property, you keep the leverage.','A licensed Brisbane buyers agency for investors. Fixed fees, no commissions from sellers, and a Camp Hill office so the inspections are ours, not yours.')}

<section><div class="wrap">
  <div class="sec-head reveal"><span class="eyebrow">Brisbane market, ${MKT_ASOF}</span><h2 class="serif">The Brisbane run has paused. The rental market has not.</h2></div>
  <div class="hc-stats" style="grid-template-columns:repeat(4,1fr);gap:12px">
    ${statCard('⌂','#6d3bf0','#eef0ff','$1,118,306','Median dwelling value (Cotality, June 2026)')}
    ${statCard('↘','#b4482f','#fdeeea','-0.6%','Change over the July 2026 quarter')}
    ${statCard('↗','#148f8f','#e3f4f4','+14.8%','Annual change to July 2026','#148f8f')}
    ${statCard('◈','#148f8f','#e3f4f4','0.9%','Rental vacancy rate (SQM, June 2026)','#148f8f')}
  </div>
  <div class="mkt-copy" style="max-width:820px;margin:2.4rem auto 0">
    <p>For two years Brisbane was the capital everyone pointed at. That has changed. Cotality's July 2026 index has Brisbane dwelling values down 0.6% for the month and down 0.6% across the quarter, the second consecutive monthly fall. The annual figure still reads +14.8%, but almost all of that was earned in the first half of the period.</p>
    <p>The income side of the ledger tells a different story. Brisbane's vacancy rate sits at 0.9%, asking rents average roughly $752 a week, and rents rose about 9.1% over the year to June 2026, the strongest rental profile of any Australian capital in that release. Median house values are around $1,225,350 and units around $885,132, with units having run harder than houses over the past year.</p>
    <p>Put together, that is a market where the price side has softened while the income side has held. Vendors who listed expecting last year's result are meeting buyers who have read this year's data. That gap is where a buyers agent earns their fee, and it is why we are having more honest conversations with sellers now than at any point in the last two years.</p>
    <p>The other number that matters is the cost of money. The RBA cash rate is 4.35%, held at the June 2026 meeting after three consecutive increases earlier in the year. Higher rates compress borrowing capacity, which is precisely why knowing your genuine buying position before you start looking is worth more than another weekend of open homes. Our <a href="buying-power.html">buying power calculator</a> gives you an indicative figure in about a minute.</p>
  </div>
  ${dataNote}
</div></section>

<section class="bg-paper"><div class="wrap">
  <div class="sec-head center reveal"><span class="eyebrow">Where we buy</span><h2 class="serif">Four Brisbane submarkets, chosen deliberately.</h2><p>We do not cover every postcode in South East Queensland. We cover the pockets we know well enough to price a property without guessing.</p></div>
  <div class="prob-grid" style="grid-template-columns:1fr 1fr">
    <div class="prob"><div class="q">Inner east</div><p>Morningside, Camp Hill, Carina Heights, Cannon Hill, Balmoral. Established, tightly held, close to the city and the Gabba precinct. Three of our documented client purchases sit here, including Carina Heights at +32.35% since acquisition. This is our home ground, our office is in Camp Hill.</p></div>
    <div class="prob"><div class="q">Inner west and north-west</div><p>Chapel Hill, Kenmore, Keperra, Mitchelton, Everton Park. Larger blocks, strong school catchments and a family-buyer floor under prices. Suits investors who want a lower-volatility hold with genuine owner-occupier demand underneath.</p></div>
    <div class="prob"><div class="q">Northside corridor</div><p>Taigum, Zillmere, Bracken Ridge, Aspley, Chermside. Better entry prices and stronger gross yields than the inner ring, with infrastructure and retail investment continuing. Our Taigum purchase is up 21.39% since acquisition.</p></div>
    <div class="prob"><div class="q">Inner-city apartments</div><p>Kangaroo Point, Woolloongabba, South Brisbane, Newstead. The most misunderstood segment in Brisbane, and the one where stock selection matters most. Our Kangaroo Point apartment is our strongest single result at +40.35%. It is also the segment where buying the wrong building costs you years.</p></div>
  </div>
</div></section>

<section><div class="wrap">
  <div class="sec-head center reveal"><span class="eyebrow">Proof, not promises</span><h2 class="serif">Brisbane purchases we have actually made.</h2><p>Every figure below is a real client purchase with the price paid and the current market value. Nothing here is a case study we wrote about someone else's deal.</p></div>
  ${resultsTable('QLD')}
  <p class="disclaimer" style="margin-top:1.4rem">Every row is a settled CapitalVue client purchase. Current values are indicative market estimates as at August 2026, not formal valuations or sale prices, and growth is measured from the purchase price at acquisition. Client names and street addresses are withheld. Individual results vary and past performance is not a reliable indicator of future performance.</p>
</div></section>

<section class="bg-paper"><div class="wrap">
  <div class="sec-head center reveal"><span class="eyebrow">How it works</span><h2 class="serif">Four stages, fixed fee, no surprises.</h2></div>
  <div class="steps">
    <div class="step"><div class="num">1</div><h3>Strategy</h3><p>We establish your borrowing position, timeframe, risk tolerance and what the property actually needs to do. If the honest answer is that you are not ready, we say so.</p></div>
    <div class="step"><div class="num">2</div><h3>Search</h3><p>We work our agent relationships across the four submarkets, including stock that never reaches portals, and shortlist against your brief rather than what is available this weekend.</p></div>
    <div class="step"><div class="num">3</div><h3>Due diligence</h3><p>Comparable sales, building and pest, flood and overlay checks, body corporate records where relevant, and a defensible price ceiling we will not exceed on your behalf.</p></div>
    <div class="step"><div class="num">4</div><h3>Negotiate and settle</h3><p>We negotiate or bid, manage the contract through to settlement, then load the asset into your CapitalVue tracker so you can see how it performs from day one.</p></div>
  </div>
  <div style="margin-top:26px"><div class="cta reveal" style="padding:44px 26px"><h2 class="serif" style="font-size:1.7rem">Find out what you can actually buy in Brisbane.</h2><p style="margin-top:.8rem">A free, no-obligation strategy call. If Brisbane is the wrong market for your brief, we will tell you that on the call.</p><div class="hero-actions" style="margin-top:1.3rem"><a class="btn btn-primary" href="contact.html#book">Book a free strategy call</a><a class="btn btn-outline-l" href="tel:+61499484727">Call 0499 484 727</a></div></div></div>
</div></section>

<section><div class="wrap" style="max-width:860px">
  <div class="sec-head reveal"><span class="eyebrow">Common questions</span><h2 class="serif">Buyers agents in Brisbane, answered plainly.</h2></div>
  ${faqHtml(BNE_FAQ)}
  <p style="margin-top:1.8rem">Also buying in South Australia? See our <a href="buyers-agent-adelaide.html">Adelaide buyers agent</a> page, or read the full <a href="services.html">services and pricing</a> breakdown.</p>
</div></section>
${ctaBand}`;

const ADL_FAQ = [
  {q:'How much does a buyers agent cost in Adelaide?', a:'The same fixed fees apply regardless of the city: $19,500 for the full investor buyers agent service, $11,500 for owner-occupier support and $2,200 for auction bidding only. We do not charge a percentage of the purchase price, and we do not accept commissions from sellers or developers.'},
  {q:'Are you licensed to buy property in South Australia?', a:'Yes. CapitalVue holds South Australian land agent licence 335016, alongside Queensland licence 4769773. Anyone acting as a buyers agent in South Australia must hold a current SA licence, so it is worth asking any agency you speak with to show you theirs.'},
  {q:'Is Adelaide still a good investment market in 2026?', a:'Adelaide dwelling values eased 0.2% in July 2026 after an annual rise of 10.5%, so like Brisbane the growth run has flattened rather than collapsed. The distinguishing feature is the rental market: vacancy sits at roughly 0.7%, the tightest of the mainland capitals. Adelaide has also become expensive relative to its own history, with median house values now above $1m, so the affordability argument that drove the last cycle is largely spent.'},
  {q:'Should I buy a house or a unit in Adelaide?', a:'It depends on whether you are buying for income or growth. On current Cotality figures Adelaide units yield around 4.3% gross against roughly 3.4% for houses, a meaningful gap, and units carry a median around $692,861 against roughly $1,007,684 for houses. Houses typically carry the land component that drives long-run growth. Neither is automatically right, which is exactly the trade-off we work through on a strategy call.'},
  {q:'What is your minimum purchase price in Adelaide?', a:'We buy from $700,000 upwards in South Australia. We have bought below that for clients previously and those results are published on this page, but in a flattening market the sub-$700,000 end is where build quality, tenant profile and resale depth get tested hardest. Above $700,000 we can be selective on the things that actually drive a fifteen-year hold.'},
  {q:'Which Adelaide suburbs do you buy in?', a:'Four clusters: the inner east (St Morris, Norwood, Payneham, Kensington, Marden), the northern corridor (Salisbury, Elizabeth, Parafield Gardens, Mawson Lakes), the western suburbs (Woodville, Findon, Seaton, Fulham Gardens) and the southern suburbs (Marion, Morphett Vale, Christies Beach, Hallett Cove). Each serves a different brief, from yield-led entry to established inner-ring holds.'},
  {q:'Can I buy in Adelaide from interstate?', a:'Yes, and most of our SA clients do. We handle inspections, due diligence, negotiation and settlement remotely, and we will tell you when a property genuinely warrants you getting on a plane. Buying interstate without representation is where most avoidable mistakes happen, because you cannot read a street from a listing photo.'},
];

const adelaideBody = `
${pageHero('Buyers Agent Adelaide','Adelaide &middot; Investor buyers agency','Buyers agent Adelaide: licensed in SA, and honest about the cycle.','A licensed South Australian buyers agency for investors buying from $700,000 upwards. Fixed fees, no seller commissions, and a clear view of a market that has just come off the boil.')}

<section><div class="wrap">
  <div class="sec-head reveal"><span class="eyebrow">Adelaide market, ${MKT_ASOF}</span><h2 class="serif">Australia's most resilient capital is finally flattening.</h2></div>
  <div class="hc-stats" style="grid-template-columns:repeat(4,1fr);gap:12px">
    ${statCard('⌂','#6d3bf0','#eef0ff','$944,909','Median dwelling value (Cotality, July 2026)')}
    ${statCard('↘','#b4482f','#fdeeea','-0.2%','Change over July 2026')}
    ${statCard('↗','#148f8f','#e3f4f4','+10.5%','Annual change to July 2026','#148f8f')}
    ${statCard('◈','#148f8f','#e3f4f4','0.7%','Rental vacancy rate (SQM, June 2026)','#148f8f')}
  </div>
  <div class="mkt-copy" style="max-width:820px;margin:2.4rem auto 0">
    <p>Adelaide spent two years outperforming while larger capitals stalled. That phase is ending. Cotality's July 2026 index shows Adelaide dwelling values down 0.2% for the month, the second consecutive monthly fall, against annual growth of 10.5%. Cotality's own commentary described the preceding month as the first sign the most resilient capital of the past two years was topping out.</p>
    <p>Two numbers explain why. First, price: the median Adelaide house is now around $1,007,684 and the median unit around $692,861. Adelaide is no longer the affordable capital, and the affordability gap that powered the last cycle has largely closed. Second, rates: with the RBA cash rate at 4.35% after three increases in the first half of 2026, borrowing capacity has tightened for exactly the buyer cohort that drove Adelaide's run.</p>
    <p>What has not softened is the rental market. Adelaide's vacancy rate of roughly 0.7% is the tightest of the mainland capitals, with asking rents averaging around $644 a week. Rental growth of about 3.4% over the year is slower than Brisbane's, so Adelaide currently offers scarcity without the same rent momentum.</p>
    <p>The most actionable detail in the current data is the yield gap. Adelaide units are returning roughly 4.3% gross against roughly 3.4% for houses. That is a wide spread by historical standards, and it means the house-versus-unit decision in Adelaide right now is a genuine strategic choice rather than a default. Get your borrowing position clear first with our <a href="buying-power.html">buying power calculator</a>, then the choice gets easier.</p>
    <p><strong>Where we buy now.</strong> Our South Australian mandate starts at $700,000. We have bought well below that historically and the results table further down this page shows it, but in a market where values have stopped rising, the cheapest stock is where quality problems get exposed first. Above $700,000 we can be genuinely selective on land, position and tenant appeal instead of buying whatever the budget reaches.</p>
  </div>
  ${dataNote}
</div></section>

<section class="bg-paper"><div class="wrap">
  <div class="sec-head center reveal"><span class="eyebrow">Where we buy</span><h2 class="serif">Four Adelaide clusters, four different jobs.</h2><p>Adelaide is a small enough market that suburb selection genuinely changes the outcome. These are the areas we buy in and why.</p></div>
  <div class="prob-grid" style="grid-template-columns:1fr 1fr">
    <div class="prob"><div class="q">Inner east</div><p>St Morris, Norwood, Payneham, Kensington, Marden. Established, land-constrained and the closest Adelaide has to blue chip. Our St Morris purchase at $1,507,000 is up 14.13% since acquisition. Lower yields, stronger long-run land value, and the cluster our $700,000-plus mandate points at most often.</p></div>
    <div class="prob"><div class="q">Northern corridor</div><p>Salisbury, Elizabeth, Andrews Farm, Parafield Gardens, Mawson Lakes. Where gross yields are strongest and where four of our six South Australian purchases sit, including Elizabeth at +19.24% and Andrews Farm at +17.78%. We are now selective here and buy above $700,000, because quality varies sharply within a single postcode and the cheapest stock is where the avoidable mistakes live.</p></div>
    <div class="prob"><div class="q">Western suburbs</div><p>Woodville, Findon, Seaton, Fulham Gardens. Genuinely between the city and the coast, with ongoing gentrification and redevelopment. Often the best balance of yield and growth potential in the current market.</p></div>
    <div class="prob"><div class="q">Southern suburbs</div><p>Marion, Morphett Vale, Christies Beach, Hallett Cove, Huntfield Heights. Coastal appeal at a discount to the inner ring, supported by owner-occupier demand. Our Huntfield Heights purchase is our strongest South Australian result at +22.22%. Suits a longer hold where you want lifestyle demand underpinning the asset.</p></div>
  </div>
</div></section>

<section><div class="wrap">
  <div class="sec-head center reveal"><span class="eyebrow">Credentials</span><h2 class="serif">What we bring to a South Australian purchase.</h2></div>
  <div class="hc-stats" style="grid-template-columns:repeat(4,1fr);gap:12px">
    ${statCard('⚖','#6d3bf0','#eef0ff','SA 335016','Current South Australian land agent licence')}
    ${statCard('◈','#6d3bf0','#eef0ff','23','Client properties secured and settled')}
    ${statCard('⌂','#6d3bf0','#eef0ff','$21.31M','Total purchase value across clients')}
    ${statCard('★','#c9a24b','#faf3e2','5.0','From 27 Google reviews','#c9a24b')}
  </div>
  <div class="mkt-copy" style="max-width:820px;margin:2.2rem auto 0">
    <p>We are a Queensland-headquartered agency licensed to act in South Australia, and we are direct about what that means. You get a team that buys across multiple markets and can tell you honestly when Adelaide is not the right answer for your brief, which is not something a single-city agency has any incentive to say.</p>
    <p>South Australian purchases also carry their own disclosure regime. Every SA sale requires a Form 1 vendor statement under section 7 of the Land and Business (Sale and Conveyancing) Act 1994, and the detail buried in it routinely changes what a property is worth. We read them properly rather than forwarding them to you with a note saying "looks fine".</p>
  </div>
</div></section>

<section><div class="wrap">
  <div class="sec-head center reveal"><span class="eyebrow">Proof, not promises</span><h2 class="serif">Every South Australian purchase we have made.</h2><p>Real client purchases with the price paid and the current market value. Five of these six sit below our current $700,000 minimum, and several are among our strongest results anywhere. We have published them anyway, because selective reporting is not proof.</p></div>
  ${resultsTable('SA')}
  <p class="disclaimer" style="margin-top:1.4rem">Every row is a settled CapitalVue client purchase. Current values are indicative market estimates as at August 2026, not formal valuations or sale prices, and growth is measured from the purchase price at acquisition. Client names and street addresses are withheld. Individual results vary and past performance is not a reliable indicator of future performance.</p>
  <div class="mkt-copy" style="max-width:820px;margin:1.8rem auto 0">
    <p><strong>Why the minimum moved, given those results.</strong> The honest answer is not that cheap Adelaide stock performed badly, because it plainly did not. It is that a fixed fee is a much larger share of a $525,000 purchase than a $900,000 one, and that the sub-$700,000 end of a flattening market is where build quality, tenant profile and resale depth get tested hardest. We would rather be selective on the things that drive a fifteen-year hold than buy whatever a tight budget reaches. If entry-price stock is genuinely the right answer for your brief, we will say so on the call, even though it is not where our mandate sits.</p>
    <p>Buying across both states? Our full track record spans 23 settled client purchases worth $21.31M, with combined capital growth of +16.44% since acquisition. The Queensland results are on the <a href="buyers-agent-brisbane.html">Brisbane buyers agent</a> page.</p>
  </div>
</div></section>

<section class="bg-paper"><div class="wrap">
  <div class="sec-head center reveal"><span class="eyebrow">How it works</span><h2 class="serif">The same four stages, wherever we buy.</h2></div>
  <div class="steps">
    <div class="step"><div class="num">1</div><h3>Strategy</h3><p>Borrowing position, timeframe and objective first. This is also where we test whether Adelaide, Brisbane or neither is the right market for you right now.</p></div>
    <div class="step"><div class="num">2</div><h3>Search</h3><p>Agent relationships across the four clusters, including off-market and pre-market stock, shortlisted against your brief rather than against what is listed.</p></div>
    <div class="step"><div class="num">3</div><h3>Due diligence</h3><p>Comparable sales, building and pest, the Form 1 read in full, strata records where relevant, and a price ceiling we will not exceed on your behalf.</p></div>
    <div class="step"><div class="num">4</div><h3>Negotiate and settle</h3><p>We negotiate or bid, run the contract through to settlement, then load the property into your CapitalVue tracker so performance is visible from day one.</p></div>
  </div>
  <div style="margin-top:26px"><div class="cta reveal" style="padding:44px 26px"><h2 class="serif" style="font-size:1.7rem">Is Adelaide right for your next purchase?</h2><p style="margin-top:.8rem">A free, no-obligation strategy call. We will give you our honest read on the market, including when the answer is to wait.</p><div class="hero-actions" style="margin-top:1.3rem"><a class="btn btn-primary" href="contact.html#book">Book a free strategy call</a><a class="btn btn-outline-l" href="tel:+61499484727">Call 0499 484 727</a></div></div></div>
</div></section>

<section><div class="wrap" style="max-width:860px">
  <div class="sec-head reveal"><span class="eyebrow">Common questions</span><h2 class="serif">Buyers agents in Adelaide, answered plainly.</h2></div>
  ${faqHtml(ADL_FAQ)}
  <p style="margin-top:1.8rem">Also looking at South East Queensland? See our <a href="buyers-agent-brisbane.html">Brisbane buyers agent</a> page, or read the full <a href="services.html">services and pricing</a> breakdown.</p>
</div></section>
${ctaBand}`;

const CALC_SCHEMA = [
  {"@context":"https://schema.org","@type":"WebApplication","name":"CapitalVue Property Buying Power Calculator","url":BASE+"buying-power.html","applicationCategory":"FinanceApplication","operatingSystem":"Web","browserRequirements":"Requires JavaScript","offers":{"@type":"Offer","price":"0","priceCurrency":"AUD"},"provider":{"@id":BASE+"#organisation"},"description":"Free calculator estimating your indicative property borrowing power, purchase budget, monthly repayments and illustrative growth, including equity release for existing owners."},
  {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
    {"@type":"Question","name":"How much can I borrow for a property?","acceptedAnswer":{"@type":"Answer","text":"Your borrowing power depends mainly on your income, living expenses, existing debts and the interest rate. This calculator gives an indicative estimate using a 3% serviceability buffer, the way lenders stress-test repayments. A lender will assess your full circumstances and may lend more or less."}},
    {"@type":"Question","name":"How is my property buying budget calculated?","acceptedAnswer":{"@type":"Answer","text":"Your estimated purchase budget is your indicative loan plus your available deposit or usable equity, before buying costs such as stamp duty and legal fees, which typically come out of your deposit."}},
    {"@type":"Question","name":"Can I use my existing property's equity to buy another?","acceptedAnswer":{"@type":"Answer","text":"Yes. Tick \"I already own property\" to estimate your usable equity (roughly 80% of the property's value less your current loans) and factor in rental income, so you can see your indicative next-purchase capacity."}},
    {"@type":"Question","name":"Is this financial or credit advice?","acceptedAnswer":{"@type":"Answer","text":"No. It is an indicative estimate only and not credit assistance or personal financial advice. Speak to a licensed mortgage broker or lender for a borrowing assessment, and obtain independent advice before making an investment decision."}}
  ]}
];

/* ---------------- WRITE ---------------- */
const pages = {
  'index.html':   page('Property Buyers Agency for Investors | CapitalVue','Licensed buyers agency for Brisbane and Adelaide. We find, negotiate and secure the right investment property or home. Rated 5.0 from 27 Google reviews.', indexBody,'index.html','index.html',{"@context":"https://schema.org","@type":"WebSite","name":"CapitalVue","url":BASE}),
  'about.html':   page('About CapitalVue | Licensed Buyers Agency (QLD, SA)','CapitalVue pairs a licensed buyers agency with real-time portfolio technology to make buying an investment property or a home simple, transparent and provable.', aboutBody,'about.html','about.html'),
  'services.html':page('Services &amp; Pricing | CapitalVue Buyers Agency','Transparent fixed fees: full buyers agent service $19,500, owner-occupier support $11,500, auction bidding $2,200, plus ongoing property strategy.', servicesBody,'services.html','services.html'),
  'tracker.html': page('Property Portfolio Trackers | CapitalVue','Track your property portfolio in real time: market value, equity, yield, LVR and tax. Free Property Tracker plus CapitalVue Portfolio for clients, powered by PortfolioLogic.', trackerBody,'tracker.html','tracker.html'),
  'team.html':    page('Our Team | CapitalVue Buyers Agents','Meet the CapitalVue team: buyers agents for investors and home buyers, backed by decades of real estate, finance and construction experience.', teamBody,'team.html','team.html'),
  'blog.html':    page('The Vue | Property Investment Blog | CapitalVue','The Vue: market updates, strategy and buying frameworks for Australian property investors and home buyers, from CapitalVue.', blogBody,'blog.html','blog.html'),
  'contact.html': page('Book a Strategy Call | Contact CapitalVue','Book a free, no-obligation property strategy call with CapitalVue, buyers agents for investors and home buyers in Brisbane and Adelaide.', contactBody,'contact.html','contact.html'),
  'buyers-agent-brisbane.html': page('Buyers Agent Brisbane for Investors | CapitalVue','Licensed Brisbane buyers agent for property investors. Fixed fees from $2,200, no seller commissions, Camp Hill office. Current Brisbane market data and real client results.', brisbaneBody,'','buyers-agent-brisbane.html',[svcAreaSchema('Brisbane','QLD',['Brisbane','Morningside','Camp Hill','Carina Heights','Chapel Hill','Keperra','Taigum','Kangaroo Point','Woolloongabba','Chermside']), faqSchema(BNE_FAQ)],{ogTitle:'Buyers Agent Brisbane | CapitalVue',ogDesc:'Licensed Brisbane buyers agency for investors. Fixed fees, no seller commissions, and current market data on where Brisbane actually sits.'}),
  'buyers-agent-adelaide.html': page('Buyers Agent Adelaide for Investors | CapitalVue','Licensed South Australian buyers agent (SA 335016) for property investors. Fixed fees, no seller commissions, and an honest read on the current Adelaide market.', adelaideBody,'','buyers-agent-adelaide.html',[svcAreaSchema('Adelaide','SA',['Adelaide','St Morris','Norwood','Payneham','Salisbury','Mawson Lakes','Woodville','Findon','Marion','Hallett Cove']), faqSchema(ADL_FAQ)],{ogTitle:'Buyers Agent Adelaide | CapitalVue',ogDesc:'Licensed SA buyers agency for investors. Fixed fees, no seller commissions, and a clear view of a market that has just come off the boil.'}),
  'buying-power.html': page('Borrowing Power Calculator | CapitalVue','Free borrowing power calculator for Australian buyers and investors. Estimate how much you can borrow, your purchase budget, repayments and property growth in 60 seconds.', calcBody,'buying-power.html','buying-power.html', CALC_SCHEMA, {ogTitle:'What can you buy, and what could it be worth?', ogDesc:'A free 60-second estimate of your property borrowing power, buying budget and illustrative growth. From CapitalVue, licensed Australian buyers agents.', ogImage:'assets/og-calculator.jpg'}),
};
for (const a of ARTICLES) {
  const clean = a.title.replace(/&amp;/g,'&').replace(/&#39;/g,"'");
  const desc = clean + ' — property insight from CapitalVue for Australian investors and home buyers.';
  pages['post-'+a.slug+'.html'] = page((a.seo||clean)+' | CapitalVue', desc, articleBody(a), 'blog.html', 'post-'+a.slug+'.html', articleSchema(a), a.og?{ogImage:a.og}:null);
}
pages['terms-and-conditions.html'] = page('Terms &amp; Conditions | CapitalVue','CapitalVue website and dashboard terms and conditions of use.', legalBody('Terms &amp; Conditions','terms.html'),'','terms-and-conditions.html',null,{bare:true});
pages['privacy-policy.html'] = page('Privacy Policy | CapitalVue','How CapitalVue collects, holds and manages your personal information under the Australian Privacy Principles.', legalBody('Privacy Policy','privacy.html'),'','privacy-policy.html',null,{bare:true});

pages['404.html'] = page('Page not found | CapitalVue','That page has moved or no longer exists. Find CapitalVue services, the buying power calculator, property trackers and contact details here.', notFoundBody,'','404.html',null,{noindex:true});

// ---- Property Readiness Snapshot landing page ----
// Self-contained quiz funnel with its own CSS/JS, so it deliberately does NOT go
// through page(): the site stylesheet would collide on .wrap/.btn/.card/.cta/.nav.
// We inject only the head essentials (meta, canonical, OG, schema, tag loader).
{
  const FUNNEL_PATH = 'property-readiness.html';
  const FUNNEL_TITLE = 'Property Readiness Snapshot | CapitalVue';
  const FUNNEL_DESC = 'Answer eight quick questions and get a personalised property readiness snapshot in under two minutes. Free, no obligation, from licensed Australian buyers agents CapitalVue.';
  const url = BASE + FUNNEL_PATH;
  const ld = [ORG_SCHEMA, {"@context":"https://schema.org","@type":"WebPage","name":"Property Readiness Snapshot","description":FUNNEL_DESC,"url":url,"isPartOf":{"@id":BASE+"#organisation"},"publisher":{"@id":BASE+"#organisation"}}, bcList([{name:'Home',url:BASE},{name:'Property Readiness Snapshot',url}])];
  const head = `<meta name="description" content="${esc(FUNNEL_DESC)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:site_name" content="CapitalVue">
<meta property="og:title" content="Where are you really at with property?">
<meta property="og:description" content="A free 90-second property readiness snapshot from CapitalVue, licensed Australian buyers agents.">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${BASE}assets/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Where are you really at with property?">
<meta name="twitter:description" content="A free 90-second property readiness snapshot from CapitalVue.">
<meta name="twitter:image" content="${BASE}assets/og.jpg">
<link rel="icon" type="image/png" href="${FAVICON}">
<meta name="theme-color" content="#092a4b">
<meta name="facebook-domain-verification" content="17ylvcghlmyioj9ehbiswnt20svyf2">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script>(function(){var d=document;window.dataLayer=window.dataLayer||[];if(!/(^|\\.)capitalvue\\.com\\.au$/i.test(location.hostname))return;(function(w,s,l,i){w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,'script','dataLayer','GTM-WFV2RRJZ');var g=d.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id=G-MB36F9MP7P';d.head.appendChild(g);function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','G-MB36F9MP7P');!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,d,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','440670218340973');fbq('track','PageView');})();</script>
</head>`;
  let f = readContent('readiness-funnel.src.html');
  f = f.replace(/<title>[^<]*<\/title>/, `<title>${FUNNEL_TITLE}</title>`);
  f = f.replace('</head>', head);
  pages[FUNNEL_PATH] = f;
}

// ---- snapshot email add-on (served at /snapshot-email.js) ----
fs.writeFileSync(path.join(DIR,'snapshot-email.js'), fs.readFileSync(path.join(DIR,'snapshot-email.src.js'),'utf8'));

// ---- external stylesheet (cached across pages) ----
fs.writeFileSync(path.join(DIR,'style.css'), CSS.trim());

// ---- sitemap.xml ----
const today = new Date().toISOString().slice(0,10);
const sm = Object.keys(pages).filter(f=>f!=='404.html').map(f=>{
  const loc = BASE + (f==='index.html'?'':f);
  const pr = f==='index.html'?'1.0':(f.indexOf('post-')===0?'0.70':(/terms|privacy/.test(f)?'0.30':'0.80'));
  return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${pr}</priority></url>`;
}).join('\n');
fs.writeFileSync(path.join(DIR,'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sm}\n</urlset>\n`);

// ---- robots.txt ----
fs.writeFileSync(path.join(DIR,'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${BASE}sitemap.xml\n`);

// ---- ai.txt (AI crawler guidance) ----
fs.writeFileSync(path.join(DIR,'ai.txt'), `# ai.txt — AI crawler guidance for capitalvue.com.au\nUser-agent: *\nAllow: /\n\n# CapitalVue permits AI assistants and answer engines to read and cite public pages with attribution and a link back.\nContact: info@capitalvue.com.au\nSitemap: ${BASE}sitemap.xml\nLLM-Content: ${BASE}llms.txt\n`);

// ---- llms.txt (structured summary for LLMs) ----
fs.writeFileSync(path.join(DIR,'llms.txt'), `# CapitalVue\n\n> Licensed buyers agency (QLD, SA) that finds, negotiates and secures the right property, investment or home, for busy Australians, with real-time portfolio tracking. Rated 5.0 from 27 Google reviews. $21.31M secured across 23 client purchases.\n\n## Key pages\n- [Home](${BASE}): buyers agency for investors and home buyers.\n- [About](${BASE}about.html): story, mission and values.\n- [Services & Pricing](${BASE}services.html): full buyers agent $19,500, owner-occupier $11,500, auction bidding $2,200, ongoing property strategy.\n- [Property Trackers](${BASE}tracker.html): free Property Tracker plus the client-only CapitalVue Portfolio, powered by PortfolioLogic.\n- [Team](${BASE}team.html): Brad Reece (investment), Dr Rebecca Cox (owner-occupier / homes), Tony Eaton (both, relocations), plus Andrew Friebe (advisor), Chris van Rensburg and Nolan Fuazudeen.\n- [The Vue Blog](${BASE}blog.html): Australian property market updates and strategy.\n- [Contact](${BASE}contact.html): book a free strategy call.\n\n## Contact\n- Phone: 0499 484 727\n- Email: info@capitalvue.com.au\n- Office: 28 Bovelles St, Camp Hill QLD 4152\n- Licensed: QLD 4769773 | SA 335016\n`);

// ---- _redirects (301s from old WordPress URLs, applied at domain cutover) ----
// Old URLs sourced from the live Yoast sitemaps (page / post / category).
const REDIRECTS = [
  // Pages
  ['/our-team/', '/team.html'],
  ['/your-investment-team/', '/team.html'],
  ['/capitalvue-property-investment-experts/', '/about.html'],
  ['/capitalvue-investment-property-buyers-agent/', '/services.html'],
  ['/services-pricing/', '/services.html'],
  ['/property-portfolio-performance-tracker/', '/tracker.html'],
  ['/property-portfolio-tracker/', '/tracker.html'],
  // Old team member profile pages -> matching bio anchor on /team.html
  ['/team/brad/', '/team.html#brad'],
  ['/team/brad-reece/', '/team.html#brad'],
  ['/team/andrew/', '/team.html#andrew'],
  ['/team/tony/', '/team.html#tony'],
  ['/team/bec/', '/team.html#dr-rebecca-cox'],
  ['/team/rebecca/', '/team.html#dr-rebecca-cox'],
  ['/team/dr-rebecca-cox/', '/team.html#dr-rebecca-cox'],
  ['/team/chris/', '/team.html#chris'],
  ['/team/nolan/', '/team.html#nolan'],
  ['/property-investment-blog-australia/', '/blog.html'],
  ['/contact/', '/contact.html'],
  ['/legal/', '/terms-and-conditions.html'],
  ['/terms-and-conditions/', '/terms-and-conditions.html'],
  ['/privacy-policy/', '/privacy-policy.html'],
  // Posts with a direct equivalent on the new site
  ['/property-due-diligence-checklist-adelaide-seq-investors/', '/post-property-due-diligence-checklist.html'],
  ['/wait-or-buy-a-decision-framework-for-brisbane-investors-in-june-2026/', '/post-wait-or-buy-brisbane-2026.html'],
  ['/australian-property-investment-structures/', '/post-australian-property-investment-structures.html'],
  ['/navigating-australias-rental-crisis-cgt-change/', '/post-rental-crisis-cgt-investors.html'],
  ['/australias-capital-gains-tax-cgt-discount-is-under-formal-government-review/', '/post-cgt-discount-review.html'],
  ['/capital-gains-tax/', '/post-cgt-discount-review.html'],
  ['/the-benefits-of-rentvesting-explained/', '/post-benefits-of-rentvesting.html'],
  // Posts with no exact equivalent -> nearest topical article (NOT the blog index:
  // article -> index redirects get treated as soft 404s and drop the equity)
  ['/median-house-price-month-on-month-price-change/', '/post-wait-or-buy-brisbane-2026.html'],
  ['/cpi-data-analysis/', '/post-wait-or-buy-brisbane-2026.html'],
  ['/australian-housing/', '/post-rental-crisis-cgt-investors.html'],
  ['/real-estate-investment/', '/post-australian-property-investment-structures.html'],
  // Categories -> blog index
  ['/category/uncategorized/', '/blog.html'],
  ['/category/market-update/', '/blog.html'],
  ['/category/videos-and-podcasts/', '/blog.html'],
  ['/category/investment-strategies/', '/blog.html'],
  ['/category/capital-gains-tax-cgt/', '/blog.html'],
  // Old Yoast sitemaps + RSS feed that Google/Search Console still point at
  ['/sitemap_index.xml', '/sitemap.xml'],
  ['/page-sitemap.xml', '/sitemap.xml'],
  ['/post-sitemap.xml', '/sitemap.xml'],
  ['/category-sitemap.xml', '/sitemap.xml'],
  ['/local-sitemap.xml', '/sitemap.xml'],
  ['/feed/', '/blog.html'],
  ['/comments/feed/', '/blog.html'],
];
const redirectLines = [];
for (const [from,to] of REDIRECTS) {
  redirectLines.push(`${from.padEnd(74)} ${to.padEnd(46)} 301`);
  const noSlash = from.replace(/\/$/, '');
  if (noSlash && noSlash !== from) redirectLines.push(`${noSlash.padEnd(74)} ${to.padEnd(46)} 301`);
}
// Catch-all for any other old blog category / author / feed noise
redirectLines.push(`${'/category/*'.padEnd(74)} ${'/blog.html'.padEnd(46)} 301`);
redirectLines.push(`${'/author/*'.padEnd(74)} ${'/blog.html'.padEnd(46)} 301`);
// Any other old team profile slug we haven't mapped by name
redirectLines.push(`${'/team/*'.padEnd(74)} ${'/team.html'.padEnd(46)} 301`);
redirectLines.push(`${'/our-team/*'.padEnd(74)} ${'/team.html'.padEnd(46)} 301`);
// NOTE: deliberately NO catch-all for the injected spam URLs (/shower/*, /rather/*,
// /transit/*, /explore/*, /?ja/product/*). Those must keep returning 404 so Google
// drops them. Redirecting them would pass their spam signals into the real site.
// Everything else unmatched falls through to the branded 404.html.
// Trailing-slash canonicalisation, PREPENDED so it wins first-match. Netlify serves
// /blog/ from blog.html with a 200, but the page's links are relative, so the browser
// resolves them against /blog/ and every one 404s. Force a 301 to the .html file.
// Forced (301!) because a matching static file otherwise shadows an ordinary rule.
{
  const slashRules = [];
  for (const f of Object.keys(pages)) {
    if (f === 'index.html' || f === '404.html') continue;
    const slug = '/' + f.replace(/\.html$/, '') + '/';
    slashRules.push(`${slug.padEnd(74)} ${('/' + f).padEnd(46)} 301!`);
  }
  redirectLines.unshift(...slashRules, '# --- legacy WordPress URLs below ---');
}

fs.writeFileSync(path.join(DIR,'_redirects'),
  `# CapitalVue 301 redirects — old WordPress URLs to new site\n# Generated by build.js. Active the moment the domain points at Netlify.\n\n${redirectLines.join('\n')}\n`);

// ---- _headers (security + long cache for immutable assets) ----
fs.writeFileSync(path.join(DIR,'_headers'),
`/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://googleads.g.doubleclick.net https://www.google.com https://www.google.com.au https://connect.facebook.net https://js.hsforms.net https://js-ap1.hsforms.net https://js.hs-scripts.com https://js-ap1.hs-scripts.com https://static.hsappstatic.net https://static-ap1.hsappstatic.net https://js.hs-analytics.net https://js-ap1.hs-analytics.net https://js.hsadspixel.net https://js-ap1.hsadspixel.net https://js.usemessages.com https://js-ap1.usemessages.com; style-src 'self' 'unsafe-inline' https://static.hsappstatic.net https://static-ap1.hsappstatic.net https://js.hsforms.net https://js-ap1.hsforms.net; font-src 'self' data: https://fonts.gstatic.com https://static.hsappstatic.net; img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.google.com.au https://googleads.g.doubleclick.net https://*.doubleclick.net https://www.facebook.com https://connect.facebook.net https://*.hubspot.com https://*.hsforms.com https://track.hubspot.com https://forms.hsforms.com https://*.hs-analytics.net; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://*.g.doubleclick.net https://www.google.com https://www.google.com.au https://connect.facebook.net https://www.facebook.com https://*.hubspot.com https://*.hubapi.com https://*.hsforms.com https://*.hscollectedforms.net https://*.hs-analytics.net https://*.hsadspixel.net; frame-src 'self' https://*.hubspot.com https://*.hsforms.com https://*.hsforms.net https://td.doubleclick.net https://www.googletagmanager.com https://www.facebook.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://*.hsforms.com; object-src 'none'

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*.woff2
  Cache-Control: public, max-age=31536000, immutable

/assets/*.jpg
  Cache-Control: public, max-age=2592000

/assets/*.png
  Cache-Control: public, max-age=2592000
`);

for (const [f,html] of Object.entries(pages)) fs.writeFileSync(path.join(DIR,f),html);

// ---- Licensure guard ----------------------------------------------------
// CapitalVue holds QLD 4769773 and SA 335016 only. There is no WA licence and
// no WA purchase history, so WA is out of remit. Representing a licence you do
// not hold is a different order of problem from an out-of-date market list, so
// this fails the build rather than warning. If a WA licence is ever obtained,
// add the number and remove this block deliberately.
{
  const BANNED = [
    /Western Australia/i,
    /\bWA\s*[·|,]\s*QLD/i,
    /QLD[^.]{0,24}SA[,\s]+(and\s+)?WA\b/i,
    /,\s*WA\)/,
    /WA·/,
  ];
  const hits = [];
  const scan = (name, text) => BANNED.forEach(re => {
    const m = text.match(re);
    if (m) hits.push(`${name}: "${text.slice(Math.max(0, m.index - 45), m.index + m[0].length + 35).replace(/\s+/g, ' ')}"`);
  });
  for (const [f, html] of Object.entries(pages)) scan(f, html);
  ['llms.txt','ai.txt','robots.txt'].forEach(f => {
    const fp = path.join(DIR, f);
    if (fs.existsSync(fp)) scan(f, fs.readFileSync(fp, 'utf8'));
  });
  if (hits.length) {
    console.error('\nBUILD FAILED — WA licence/market claim found in output:');
    hits.forEach(h => console.error('  ' + h));
    console.error('\nCapitalVue is licensed in QLD and SA only. Remove the claim, then rebuild.\n');
    process.exit(1);
  }
  console.log('Licensure guard: clean (QLD + SA only across ' + Object.keys(pages).length + ' pages)');
}

console.log('Wrote:', Object.keys(pages).length, 'pages + style.css, sitemap.xml, robots.txt, ai.txt, llms.txt, _redirects');
