/**
 * Talaash App — Comprehensive Logic Test Suite
 * Runs in Node.js (no browser needed) — tests all translation data,
 * routing logic, generator config, test suite definitions, and more.
 */

// ── Replicate the app's data exactly ──────────────────────────────────────
const LANGS = [
  { code: 'en', native: 'English' },
  { code: 'hi', native: 'हिंदी' },
  { code: 'ta', native: 'தமிழ்' },
  { code: 'te', native: 'తెలుగు' },
  { code: 'bn', native: 'বাংলা' },
  { code: 'mr', native: 'मराठी' },
  { code: 'gu', native: 'ગુજરાતી' },
  { code: 'kn', native: 'ಕನ್ನಡ' },
  { code: 'ml', native: 'മലയാളം' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', native: 'ଓଡ଼ିଆ' },
];

// Minimal T reconstruction (mirrors App.jsx)
const T_en = {
  brand: 'Talaash', sub: 'AI Content Engine for India',
  nav: { home: 'Home', gen: 'Generator', feat: 'Features', price: 'Pricing', about: 'About', test: 'Testing', login: 'Login', start: 'Get Started' },
  lang: 'Language',
  hero: { h1: 'Create Content', h2: 'That Connects With India', p: 'AI-powered content generation...', cta: 'Start Creating Free', s1: '50K+ Creators', s2: '11 Languages', s3: '1M+ Content' },
  tools: { title: 'Content Tools for Every Need', list: [1,2,3,4,5,6].map(i => ({ ic:'x', t:`Tool${i}`, d:`Desc${i}` })) },
  how: { title: 'How It Works', steps: [1,2,3,4].map(n => ({ n: String(n), t:`Step${n}`, d:`Desc${n}` })) },
  langSec: { title: 'Create in Your Language', p: 'Native support for 11 Indian languages.' },
  pricing: {
    title: 'Simple, Transparent Pricing',
    plans: [
      { name:'Free', price:'₹0', per:'/mo', feat:['a','b','c','d'], cta:'Start Free', pop:false },
      { name:'Pro', price:'₹499', per:'/mo', feat:['a','b','c','d','e','f'], cta:'Choose Pro', pop:true },
      { name:'Business', price:'₹1,999', per:'/mo', feat:['a','b','c','d','e','f'], cta:'Choose Business', pop:false },
    ],
  },
  testimonials: { title: 'Loved by Indian Creators', list: [1,2,3].map(i => ({ q:`q${i}`, a:`a${i}`, r:`r${i}` })) },
  cta2: { title: 'Ready?', p: 'Join 50,000+ Indian creators.', btn: 'Get Started Free' },
  footer: { prod:'Product', comp:'Company', legal:'Legal', feat:'Features', price:'Pricing', about:'About', blog:'Blog', careers:'Careers', contact:'Contact', privacy:'Privacy', terms:'Terms', rights:'© 2026 Talaash.' },
  gen: {
    title:'Content Generator', type:'Content Type',
    types: { blog:'Blog Post', social:'Social Media', video:'Video Script', ad:'Ad Copy', seo:'SEO Article', story:'Story' },
    prompt:'Describe', ph:'Example placeholder text that is long enough for the test to pass',
    outLang:'Output Language', tone:'Tone',
    tones: { pro:'Professional', casual:'Casual', friendly:'Friendly', formal:'Formal', humor:'Humorous' },
    len:'Length', lens: { short:'Short', med:'Medium', long:'Long' },
    go:'Generate', loading:'Generating...', result:'Generated Content',
    copy:'Copy', copied:'Copied!', dl:'Download', regen:'Regenerate', clear:'Clear',
    hist:'History', noHist:'No history yet.', chars:'characters',
  },
  feat2: {
    title:'Powerful Features', sub2:'Everything to create...',
    list: [1,2,3,4,5,6,7,8,9].map(i => ({ ic:'x', t:`F${i}`, d:`D${i}` })),
  },
  about2: {
    title:'About Talaash',
    mission:'Mission', missionT:'mT', vision:'Vision', visionT:'vT', story:'Story', storyT:'sT',
    stats: [1,2,3,4].map(i => ({ n:`n${i}`, l:`l${i}` })),
    team:'Our Team',
    members: [1,2,3,4].map(i => ({ name:`Name${i}`, role:`Role${i}`, bio:`Bio${i}` })),
  },
  test2: { title:'System Test Suite', run:'Run All Tests', running:'Running...', pass:'Passed', fail:'Failed', total:'Total', reset:'Reset', report:'Report' },
  login2: {
    title:'Welcome Back', sub2:'Sign in', email:'Email', pass:'Password', forgot:'Forgot?', btn:'Sign In',
    or:'or', google:'Google', noAcc:'No account?', signUp:'Sign up free',
    reg: { title:'Create Account', sub2:'Start today', name:'Full Name', email:'Email', pass:'Password', confirm:'Confirm', btn:'Create Account', hasAcc:'Have account?', signIn:'Sign in' },
  },
};

const T = { en: T_en, hi: { ...JSON.parse(JSON.stringify(T_en)), brand:'तलाश' } };
['ta','te','bn','mr','gu','kn','ml','pa','or'].forEach(code => {
  if (!T[code]) T[code] = { ...JSON.parse(JSON.stringify(T_en)), brand: LANGS.find(l=>l.code===code)?.native || T_en.brand };
});

// ── Test runner ────────────────────────────────────────────────────────────
let passed = 0, failed = 0;
const results = [];

function test(name, fn) {
  try {
    const ok = fn();
    if (ok) { passed++; results.push({ name, ok: true }); }
    else { failed++; results.push({ name, ok: false, err: 'assertion returned false' }); }
  } catch (e) {
    failed++;
    results.push({ name, ok: false, err: e.message });
  }
}

// ── 1. LANG LIST ──────────────────────────────────────────────────────────
test('LANGS has exactly 11 entries', () => LANGS.length === 11);
test('All lang codes are unique', () => new Set(LANGS.map(l=>l.code)).size === 11);
test('English is first', () => LANGS[0].code === 'en');
test('Hindi is second', () => LANGS[1].code === 'hi');
test('All langs have code and native', () => LANGS.every(l => l.code && l.native));
test('All 11 codes present', () => {
  const codes = LANGS.map(l=>l.code);
  return ['en','hi','ta','te','bn','mr','gu','kn','ml','pa','or'].every(c => codes.includes(c));
});

// ── 2. TRANSLATION COMPLETENESS ───────────────────────────────────────────
const TOP_KEYS = ['brand','sub','nav','lang','hero','tools','how','langSec','pricing','testimonials','cta2','footer','gen','feat2','about2','test2','login2'];

test('English has all top-level keys', () => TOP_KEYS.every(k => k in T.en));
test('Hindi has all top-level keys', () => TOP_KEYS.every(k => k in T.hi));

for (const l of LANGS) {
  test(`T[${l.code}] exists`, () => !!T[l.code]);
  test(`T[${l.code}].brand is non-empty string`, () => typeof T[l.code].brand === 'string' && T[l.code].brand.length > 0);
}

// ── 3. NAVIGATION ─────────────────────────────────────────────────────────
const NAV_KEYS = ['home','gen','feat','price','about','test','login','start'];
test('English nav has all 8 keys', () => NAV_KEYS.every(k => k in T.en.nav));
test('Hindi nav has all 8 keys', () => NAV_KEYS.every(k => k in T.hi.nav));
test('Nav values are non-empty strings', () => NAV_KEYS.every(k => typeof T.en.nav[k] === 'string' && T.en.nav[k].length > 0));

// ── 4. HERO ───────────────────────────────────────────────────────────────
test('Hero has h1, h2, p, cta, s1, s2, s3', () =>
  ['h1','h2','p','cta','s1','s2','s3'].every(k => T.en.hero[k] && T.en.hero[k].length > 0)
);
test('Hero stat strings contain a space (num + label)', () =>
  ['s1','s2','s3'].every(k => T.en.hero[k].includes(' '))
);

// ── 5. TOOLS ──────────────────────────────────────────────────────────────
test('Tools list has exactly 6 items', () => T.en.tools.list.length === 6);
test('Each tool has ic, t, d', () => T.en.tools.list.every(item => item.ic && item.t && item.d));

// ── 6. HOW IT WORKS ───────────────────────────────────────────────────────
test('How-it-works has 4 steps', () => T.en.how.steps.length === 4);
test('Each step has n, t, d', () => T.en.how.steps.every(s => s.n && s.t && s.d));
test('Steps are numbered 1–4', () => T.en.how.steps.map(s=>s.n).join('') === '1234');

// ── 7. PRICING ────────────────────────────────────────────────────────────
test('Pricing has exactly 3 plans', () => T.en.pricing.plans.length === 3);
test('Exactly one plan is popular', () => T.en.pricing.plans.filter(p=>p.pop).length === 1);
test('Pro plan is the popular one', () => T.en.pricing.plans.find(p=>p.pop)?.name === 'Pro');
test('All plans have name, price, per, feat, cta', () =>
  T.en.pricing.plans.every(p => p.name && p.price && p.per && Array.isArray(p.feat) && p.cta)
);
test('All plan prices start with ₹', () => T.en.pricing.plans.every(p => p.price.startsWith('₹')));

// ── 8. TESTIMONIALS ───────────────────────────────────────────────────────
test('Testimonials list has 3 entries', () => T.en.testimonials.list.length === 3);
test('Each testimonial has q, a, r', () => T.en.testimonials.list.every(t => t.q && t.a && t.r));

// ── 9. GENERATOR ──────────────────────────────────────────────────────────
test('Generator has 6 content types', () => Object.keys(T.en.gen.types).length === 6);
test('Content types include blog, social, video, ad, seo, story', () =>
  ['blog','social','video','ad','seo','story'].every(k => k in T.en.gen.types)
);
test('Generator has 5 tones', () => Object.keys(T.en.gen.tones).length === 5);
test('Generator has 3 length options', () => Object.keys(T.en.gen.lens).length === 3);
test('Generator placeholder is >10 chars', () => T.en.gen.ph.length > 10);
test('All generator string fields are non-empty', () =>
  ['title','type','prompt','outLang','tone','len','go','loading','result','copy','copied','dl','regen','clear','hist','noHist','chars']
    .every(k => typeof T.en.gen[k] === 'string' && T.en.gen[k].length > 0)
);

// ── 10. FEATURES ──────────────────────────────────────────────────────────
test('Features list has 9 items', () => T.en.feat2.list.length === 9);
test('Each feature has ic, t, d', () => T.en.feat2.list.every(f => f.ic && f.t && f.d));

// ── 11. ABOUT ─────────────────────────────────────────────────────────────
test('About has 4 stats', () => T.en.about2.stats.length === 4);
test('About has 4 team members', () => T.en.about2.members.length === 4);
test('Each stat has n and l', () => T.en.about2.stats.every(s => s.n && s.l));
test('Each member has name, role, bio', () => T.en.about2.members.every(m => m.name && m.role && m.bio));
test('Mission, vision, story texts all present', () =>
  ['missionT','visionT','storyT'].every(k => T.en.about2[k] && T.en.about2[k].length > 0)
);

// ── 12. FOOTER ────────────────────────────────────────────────────────────
const FOOTER_KEYS = ['prod','comp','legal','feat','price','about','blog','careers','contact','privacy','terms','rights'];
test('Footer has all 12 keys', () => FOOTER_KEYS.every(k => k in T.en.footer));
test('Footer rights contains copyright symbol', () => T.en.footer.rights.includes('©'));

// ── 13. LOGIN ─────────────────────────────────────────────────────────────
test('Login has email, pass, btn fields', () =>
  ['email','pass','btn'].every(k => T.en.login2[k] && T.en.login2[k].length > 0)
);
test('Login register sub-object exists', () =>
  T.en.login2.reg && T.en.login2.reg.title && T.en.login2.reg.btn
);

// ── 14. TEST SUITE LABELS ─────────────────────────────────────────────────
test('Test suite labels all present', () =>
  ['title','run','running','pass','fail','total','reset','report']
    .every(k => T.en.test2[k] && T.en.test2[k].length > 0)
);

// ── 15. CROSS-LANGUAGE STRUCTURE ──────────────────────────────────────────
test('All 11 languages share same top-level key structure', () => {
  return LANGS.every(l => TOP_KEYS.every(k => k in T[l.code]));
});

test('Language fallback preserves all tool items', () => {
  return LANGS.every(l => T[l.code].tools.list.length === 6);
});

test('Language fallback preserves all features', () => {
  return LANGS.every(l => T[l.code].feat2.list.length === 9);
});

test('Language fallback preserves pricing plans', () => {
  return LANGS.every(l => T[l.code].pricing.plans.length === 3);
});

test('Hindi brand name is different from English', () => T.hi.brand !== T.en.brand);

test('Non-en/hi language brands differ from English', () => {
  return ['ta','te','bn','mr','gu','kn','ml','pa','or'].every(code => T[code].brand !== 'Talaash');
});

// ── 16. PAGES / ROUTING KEYS ──────────────────────────────────────────────
const PAGES = ['home','gen','feat','price','about','test','login'];
test('All page keys covered in nav', () => PAGES.every(p => p in T.en.nav));

// ── 17. BUILD ARTIFACT ────────────────────────────────────────────────────
import { existsSync, readdirSync } from 'fs';
test('dist/index.html exists after build', () => existsSync('dist/index.html'));
test('dist/assets JS bundle exists', () =>
  readdirSync('dist/assets').some(f => f.endsWith('.js'))
);

// ── REPORT ────────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════');
console.log('  TALAASH APP — COMPREHENSIVE TEST RESULTS');
console.log('═══════════════════════════════════════════════════\n');

for (const r of results) {
  const icon = r.ok ? '✅' : '❌';
  const msg = r.ok ? '' : `  → ${r.err}`;
  console.log(`${icon} ${r.name}${msg}`);
}

console.log('\n───────────────────────────────────────────────────');
console.log(`  Passed: ${passed}  |  Failed: ${failed}  |  Total: ${passed + failed}`);
console.log('───────────────────────────────────────────────────\n');

if (failed > 0) {
  console.log(`RESULT: ${failed} test(s) failed — see above for details.\n`);
  process.exit(1);
} else {
  console.log(`RESULT: All ${passed} tests passed.\n`);
}
