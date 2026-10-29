'use strict';

(() => {
  const INK = '#2a1a3a';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const money = (n) => '€' + n.toFixed(2);
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* =========================================================
     1. The cup — every drink on the site is drawn here
     ========================================================= */
  let uid = 0;

  function cup({ c1, c2, topping = 'none', foam = false, fruit = 'none', ice = 3, straw = '#ff5c9a' }) {
    const id = 'c' + uid++;
    const body = 'M44 96 L156 96 L145 268 Q144 282 130 282 L70 282 Q56 282 55 268 Z';

    const iceCubes = [[66, 142, -14], [110, 134, 12], [84, 176, 20], [126, 168, -10], [70, 222, 10]]
      .slice(0, ice)
      .map(([x, y, r]) => `<rect x="${x}" y="${y}" width="26" height="26" rx="7" transform="rotate(${r} ${x + 13} ${y + 13})" fill="#fff" fill-opacity=".34" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>`)
      .join('');

    let toppings = '';
    const row = (y, off) => { const pts = []; for (let x = 62 + off; x <= 140; x += 15) pts.push([x, y]); return pts; };
    if (topping === 'pearls') {
      toppings = [...row(270, 0), ...row(256, 7), ...row(242, 0).slice(1, -1)]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7.4" fill="#3a2130"/><circle cx="${x - 2.4}" cy="${y - 2.6}" r="2" fill="#fff" opacity=".55"/>`).join('');
    } else if (topping === 'popping') {
      const cols = ['#ff5c9a', '#ffd23f', '#19c7b8'];
      toppings = [...row(270, 0), ...row(257, 7)]
        .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="6.6" fill="${cols[i % 3]}" stroke="${INK}" stroke-width="1.8"/><circle cx="${x - 2}" cy="${y - 2.2}" r="1.8" fill="#fff" opacity=".8"/>`).join('');
    } else if (topping === 'jelly') {
      toppings = [[66, 262, 8], [84, 268, -10], [102, 258, 14], [120, 266, -6], [136, 258, 10], [92, 246, 6], [112, 244, -12]]
        .map(([x, y, r]) => `<rect x="${x}" y="${y}" width="13" height="13" rx="3.5" transform="rotate(${r} ${x + 6} ${y + 6})" fill="#b6f35c" stroke="${INK}" stroke-width="1.8"/>`).join('');
    }

    const foamLayer = foam
      ? `<path d="M30 112 H170 V133 Q157 146 144 133 T118 133 T92 133 T66 133 T40 133 Q35 136 30 133 Z" fill="#fff6e6" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`
      : '';

    let fruitSvg = '';
    if (fruit === 'lime' || fruit === 'orange') {
      const [rind, flesh] = fruit === 'lime' ? ['#7bc43f', '#d9f78f'] : ['#ff9a3c', '#ffe0a8'];
      const segs = Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="0" x2="${(Math.cos(i * Math.PI / 4) * 13).toFixed(1)}" y2="${(Math.sin(i * Math.PI / 4) * 13).toFixed(1)}" stroke="${rind}" stroke-width="2" opacity=".6"/>`).join('');
      fruitSvg = `<g transform="translate(50 94) rotate(-18)"><circle r="21" fill="${rind}" stroke="${INK}" stroke-width="3.5"/><circle r="16" fill="${flesh}"/>${segs}</g>`;
    } else if (fruit === 'strawberry') {
      fruitSvg = `<g transform="translate(52 90) rotate(-14)"><path d="M0 -15 C18 -15 22 0 0 21 C-22 0 -18 -15 0 -15Z" fill="#ff3d6e" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/><path d="M-9 -15 L0 -24 L9 -15 L3 -12 L0 -17 L-3 -12Z" fill="#19c7b8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="-6" cy="-3" r="1.6" fill="#ffd23f"/><circle cx="5" cy="-1" r="1.6" fill="#ffd23f"/><circle cx="-1" cy="8" r="1.6" fill="#ffd23f"/></g>`;
    }

    return `<svg viewBox="0 0 200 300" role="img" aria-label="Bubble tea cup" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${id}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
        <clipPath id="${id}c"><path d="${body}"/></clipPath>
      </defs>
      <ellipse cx="100" cy="288" rx="62" ry="8" fill="${INK}" opacity=".18"/>
      <path d="${body}" fill="#fff" fill-opacity=".55"/>
      <g clip-path="url(#${id}c)">
        <rect x="30" y="112" width="140" height="180" fill="url(#${id}l)"/>
        ${foamLayer}${iceCubes}${toppings}
        <path d="M58 118 Q54 190 62 262" stroke="#fff" stroke-opacity=".5" stroke-width="7" stroke-linecap="round" fill="none"/>
      </g>
      <!-- face -->
      <g>
        <circle cx="79" cy="190" r="10" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="81" cy="192" r="4.6" fill="${INK}"/>
        <circle cx="123" cy="187" r="12.5" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="120" cy="190" r="5.6" fill="${INK}"/>
        <path d="M80 212 Q101 244 124 211 Z" fill="${INK}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M92 226 Q101 238 113 226 Q103 222 92 226Z" fill="#ff7aa8"/>
        <circle cx="66" cy="208" r="6" fill="#ff5c9a" opacity=".55"/><circle cx="138" cy="206" r="6" fill="#ff5c9a" opacity=".55"/>
      </g>
      <path d="${body}" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>
      <!-- lid -->
      <path d="M40 96 Q40 56 100 52 Q160 56 160 96 Z" fill="#fff" fill-opacity=".5" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M58 86 Q60 66 82 62" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".85"/>
      <rect x="34" y="90" width="132" height="14" rx="7" fill="#fff" stroke="${INK}" stroke-width="4.5"/>
      <!-- straw -->
      <line x1="128" y1="6" x2="112" y2="92" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
      <line x1="128" y1="6" x2="112" y2="92" stroke="${straw}" stroke-width="9" stroke-linecap="round"/>
      <line x1="128" y1="6" x2="112" y2="92" stroke="#fff" stroke-width="9" stroke-dasharray="6 9" opacity=".55"/>
      ${fruitSvg}
    </svg>`;
  }

  /* =========================================================
     2. Data
     ========================================================= */
  const DRINKS = [
    { id: 'classic',    cat: 'milk',     name: 'Classic Mad Milk Tea', desc: 'Black tea, creamy milk, a mountain of pearls.', price: 4.9, tint: '#ffe3c2', tag: 'Bestseller', c1: '#ecc9a0', c2: '#c48a54', topping: 'pearls', ice: 3 },
    { id: 'taro',       cat: 'milk',     name: 'Taro Tornado',          desc: 'Silky purple taro swirled into milk tea.', price: 5.2, tint: '#e8dcff', c1: '#dcc3ff', c2: '#9b6fe0', topping: 'pearls', ice: 3 },
    { id: 'matcha',     cat: 'milk',     name: 'Matcha Madness',        desc: 'Ceremonial matcha, oat milk, cheesy cream cap.', price: 5.6, tint: '#e1f4c9', c1: '#c3e69c', c2: '#6fb35a', topping: 'none', foam: true, ice: 2 },
    { id: 'brown',      cat: 'milk',     name: 'Brown Sugar Brawl',     desc: 'Caramelized sugar tigers striped through fresh milk.', price: 5.3, tint: '#ffe0cc', c1: '#f3d7b6', c2: '#8c4a22', topping: 'pearls', ice: 2 },
    { id: 'mango',      cat: 'fruit',    name: 'Mango Mayhem',          desc: 'Sunny mango, green tea, popping boba.', price: 5.1, tint: '#fff0b8', tag: 'New', c1: '#ffd166', c2: '#ff8a3c', topping: 'popping', fruit: 'orange', straw: '#19c7b8', ice: 4 },
    { id: 'strawberry', cat: 'fruit',    name: 'Strawberry Riot',       desc: 'Crushed berries, jasmine tea, a pinch of chaos.', price: 5.2, tint: '#ffd6e6', c1: '#ffa3c4', c2: '#ff4f86', topping: 'popping', fruit: 'strawberry', straw: '#ffd23f', ice: 4 },
    { id: 'lime',       cat: 'fruit',    name: 'Lime Lightning',        desc: 'Zingy lime, mint, crunchy fruit jelly.', price: 4.8, tint: '#e4f9b4', c1: '#e0f77a', c2: '#5ccf6b', topping: 'jelly', fruit: 'lime', straw: '#ff9a3c', ice: 4 },
    { id: 'blue',       cat: 'fruit',    name: 'Blue Moon Fizz',        desc: 'Butterfly-pea tea turning from blue to violet.', price: 5.0, tint: '#d4f1ff', c1: '#9be6ff', c2: '#3a8dff', topping: 'jelly', straw: '#ff5c9a', ice: 4 },
    { id: 'dragon',     cat: 'smoothie', name: 'Dragon Fruit Disco',    desc: 'Hot-pink pitaya blended with coconut water.', price: 5.9, tint: '#ffd3f3', c1: '#ff86de', c2: '#c0268f', topping: 'none', ice: 3, straw: '#ffd23f' },
    { id: 'peach',      cat: 'smoothie', name: 'Peach Parade',          desc: 'Ripe peach, yogurt and a sprinkle of honey.', price: 5.5, tint: '#ffe2cf', c1: '#ffdcba', c2: '#ff9a6a', topping: 'popping', ice: 2 },
    { id: 'coconut',    cat: 'smoothie', name: 'Coconut Chaos',         desc: 'Creamy coconut, vanilla, a lava of black pearls.', price: 5.4, tint: '#f1ecff', c1: '#ffffff', c2: '#e6dcc8', topping: 'pearls', foam: true, ice: 2, straw: '#b69cff' },
    { id: 'berry',      cat: 'smoothie', name: 'Berry Blast',           desc: 'Blueberry, blackberry and a splash of lemon.', price: 5.7, tint: '#e6dcff', c1: '#c79bff', c2: '#7a3bd9', topping: 'none', ice: 3, straw: '#ff5c9a' },
  ];

  const FLAVORS = [
    { n: 'Milk tea', s: 'Milk Tea', c1: '#ecc9a0', c2: '#c48a54', foam: false },
    { n: 'Taro', s: 'Taro', c1: '#dcc3ff', c2: '#9b6fe0', foam: false },
    { n: 'Matcha', s: 'Matcha', c1: '#c3e69c', c2: '#6fb35a', foam: true },
    { n: 'Mango', s: 'Mango', c1: '#ffd166', c2: '#ff8a3c', foam: false, fruit: 'orange' },
    { n: 'Strawberry', s: 'Berry', c1: '#ffa3c4', c2: '#ff4f86', foam: false, fruit: 'strawberry' },
    { n: 'Lime', s: 'Lime', c1: '#e0f77a', c2: '#5ccf6b', foam: false, fruit: 'lime' },
    { n: 'Blue moon', s: 'Moon', c1: '#9be6ff', c2: '#3a8dff', foam: false },
    { n: 'Dragon fruit', s: 'Dragon', c1: '#ff86de', c2: '#c0268f', foam: false },
  ];
  const TOPPINGS = [
    { k: 'pearls', n: 'Tapioca pearls', s: 'Pearls', extra: 0.6 },
    { k: 'popping', n: 'Popping boba', s: 'Popping', extra: 0.6 },
    { k: 'jelly', n: 'Fruit jelly', s: 'Jelly', extra: 0.6 },
    { k: 'none', n: 'No topping', s: '', extra: 0 },
  ];
  const ICES = [{ n: 'No ice', v: 0 }, { n: 'Less ice', v: 2 }, { n: 'Regular ice', v: 4 }];
  const SIZES = [{ n: 'M · 500 ml', extra: 0 }, { n: 'L · 700 ml', extra: 0.8 }];
  const SWEET_NAMES = ['Zen', 'Chill', 'Mad', 'Wild', 'Turbo'];
  const BASE_PRICE = 4.5;

  /* =========================================================
     3. Scroll reveal
     ========================================================= */
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
      }, { threshold: 0.12 })
    : null;
  const watch = (el) => (io ? io.observe(el) : el.classList.add('is-visible'));

  /* =========================================================
     4. Hero: headline, cups, floating bubbles
     ========================================================= */
  const h1 = $('.hero h1');
  if (h1) {
    let i = 0;
    const frag = document.createDocumentFragment();
    const wrap = (node) => {
      const w = document.createElement('span'); w.className = 'w';
      const inner = document.createElement('span'); inner.className = 'w__in';
      inner.style.setProperty('--i', i++);
      inner.appendChild(node); w.appendChild(inner); return w;
    };
    [...h1.childNodes].forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        n.textContent.split(/(\s+)/).forEach((p) => {
          if (!p) return;
          frag.appendChild(/^\s+$/.test(p) ? document.createTextNode(' ') : wrap(document.createTextNode(p)));
        });
      } else frag.appendChild(wrap(n));
    });
    h1.textContent = ''; h1.appendChild(frag);
  }
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('is-loaded')));

  $$('.hero__cup').forEach((el) => {
    const d = DRINKS.find((x) => x.id === el.dataset.drink);
    el.innerHTML = cup(d);
  });

  const bubbleWrap = $('#bubbles');
  if (bubbleWrap) {
    for (let i = 0; i < 16; i++) {
      const b = document.createElement('span');
      const size = 14 + Math.random() * 54;
      b.className = 'bubble';
      b.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;bottom:-${size + 20}px;animation-duration:${11 + Math.random() * 12}s;animation-delay:-${Math.random() * 20}s`;
      bubbleWrap.appendChild(b);
    }
  }

  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    const hero = $('.hero');
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      $$('.hero__cup').forEach((el) => {
        const d = Number(el.dataset.depth);
        el.firstElementChild.style.transform = `translate(${x * d}px, ${y * d}px)`;
      });
    });
  }

  /* =========================================================
     5. Menu
     ========================================================= */
  const grid = $('#menu-grid');
  grid.innerHTML = DRINKS.map((d, i) => `
    <li class="card reveal" data-cat="${d.cat}" style="--tint:${d.tint}; --rd:${(i % 4) * 0.07}s">
      ${d.tag ? `<span class="tag">${d.tag}</span>` : ''}
      <div class="card__art">${cup(d)}</div>
      <h3>${d.name}</h3>
      <p>${d.desc}</p>
      <div class="card__foot">
        <span class="price">${money(d.price)}</span>
        <button class="add" type="button" data-id="${d.id}" aria-label="Add ${d.name} to order">+</button>
      </div>
    </li>`).join('');
  $$('.card', grid).forEach(watch);

  $$('.tabs [role="tab"]').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('.tabs [role="tab"]').forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
      const cat = tab.dataset.cat;
      $$('.card', grid).forEach((c, i) => {
        const show = cat === 'all' || c.dataset.cat === cat;
        c.classList.toggle('is-hidden', !show);
        if (show) { c.classList.remove('is-visible'); void c.offsetWidth; c.style.setProperty('--rd', (i % 4) * 0.06 + 's'); requestAnimationFrame(() => c.classList.add('is-visible')); }
      });
    });
  });

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.add');
    if (!btn) return;
    const d = DRINKS.find((x) => x.id === btn.dataset.id);
    addToCart({ key: d.id, name: d.name, detail: 'Regular size', price: d.price });
  });

  /* =========================================================
     6. Builder
     ========================================================= */
  const state = { flavor: 3, topping: 1, sweet: 50, ice: 2, size: 0 };
  const stage = $('#build-cup');

  const chip = (label, pressed, extra = '') => `<button type="button" class="chip" aria-pressed="${pressed}" ${extra}>${label}</button>`;
  function renderOptions() {
    $('#opt-flavor').innerHTML = FLAVORS.map((f, i) => chip(`<i style="--sw:${f.c2}"></i>${f.n}`, state.flavor === i, `data-i="${i}"`)).join('');
    $('#opt-topping').innerHTML = TOPPINGS.map((t, i) => chip(t.n, state.topping === i, `data-i="${i}"`)).join('');
    $('#opt-ice').innerHTML = ICES.map((t, i) => chip(t.n, state.ice === i, `data-i="${i}"`)).join('');
    $('#opt-size').innerHTML = SIZES.map((t, i) => chip(t.n, state.size === i, `data-i="${i}"`)).join('');
  }

  function current() {
    const f = FLAVORS[state.flavor], t = TOPPINGS[state.topping], ice = ICES[state.ice], size = SIZES[state.size];
    const adj = SWEET_NAMES[state.sweet / 25];
    const name = `${adj} ${f.s}${t.s ? ' + ' + t.s : ''}`;
    const price = BASE_PRICE + t.extra + size.extra;
    return { f, t, ice, size, name, price };
  }

  function renderBuild(animate) {
    const { f, t, ice, size, name, price } = current();
    stage.innerHTML = cup({ c1: f.c1, c2: f.c2, foam: f.foam, fruit: f.fruit || 'none', topping: t.k, ice: ice.v, straw: '#ff5c9a' });
    stage.classList.toggle('is-large', state.size === 1);
    $('#build-name').textContent = name;
    $('#build-price').textContent = money(price);
    $('#sweet-out').textContent = state.sweet + '%';
    if (animate && !reduce) { stage.classList.remove('pop'); void stage.offsetWidth; stage.classList.add('pop'); }
  }

  ['flavor', 'topping', 'ice', 'size'].forEach((key) => {
    $('#opt-' + key).addEventListener('click', (e) => {
      const b = e.target.closest('.chip'); if (!b) return;
      state[key] = Number(b.dataset.i);
      renderOptions(); renderBuild(true);
      $('#opt-' + key + ' .chip[aria-pressed="true"]').focus();
    });
  });
  $('#opt-sweet').addEventListener('input', (e) => { state.sweet = Number(e.target.value); renderBuild(false); });
  $('#build-add').addEventListener('click', () => {
    const { name, price, size, ice } = current();
    addToCart({ key: `custom-${name}-${size.n}-${ice.n}-${state.sweet}`, name, detail: `${size.n} · ${ice.n} · ${state.sweet}% sweet`, price });
  });
  renderOptions(); renderBuild(false);

  /* =========================================================
     7. Cart
     ========================================================= */
  const cart = [];
  const cartEl = $('#cart'), scrim = $('#scrim'), toast = $('#toast');
  let toastTimer;

  function showToast(msg) {
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }
  function openCart() { cartEl.classList.add('is-open'); cartEl.setAttribute('aria-hidden', 'false'); scrim.hidden = false; $('#cart-close').focus(); }
  function closeCart() { cartEl.classList.remove('is-open'); cartEl.setAttribute('aria-hidden', 'true'); scrim.hidden = true; $('#cart-open').focus(); }

  function renderCart() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    const total = cart.reduce((s, i) => s + i.qty * i.price, 0);
    $('#cart-count').textContent = count;
    $('#cart-total').textContent = money(total);
    $('#cart-list').innerHTML = cart.map((i, idx) => `
      <li class="cart__item">
        <b>${i.name}</b>
        <div class="qty"><button type="button" data-act="dec" data-i="${idx}" aria-label="Remove one">−</button><span>${i.qty}</span><button type="button" data-act="inc" data-i="${idx}" aria-label="Add one">+</button></div>
        <small>${i.detail} · ${money(i.price)}</small>
      </li>`).join('');
    $('#cart-note').textContent = '';
  }
  function addToCart(item) {
    const found = cart.find((c) => c.key === item.key);
    if (found) found.qty++; else cart.push({ ...item, qty: 1 });
    renderCart();
    const badge = $('#cart-count'); badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump');
    showToast(`${item.name} added`);
  }
  $('#cart-list').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-act]'); if (!b) return;
    const item = cart[Number(b.dataset.i)];
    item.qty += b.dataset.act === 'inc' ? 1 : -1;
    if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
    renderCart();
  });
  $('#cart-open').addEventListener('click', openCart);
  $('#cart-close').addEventListener('click', closeCart);
  scrim.addEventListener('click', closeCart);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && cartEl.classList.contains('is-open')) closeCart(); });
  $('#checkout').addEventListener('click', () => {
    $('#cart-note').textContent = cart.length ? 'This is a concept site, so no real orders are taken. Looks tasty though!' : 'Add a drink first.';
  });
  renderCart();

  /* =========================================================
     8. Counters, newsletter form, footer
     ========================================================= */
  const stats = $('.stats');
  const runCounters = () => $$('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count), suffix = el.dataset.suffix || '';
    if (reduce) { el.textContent = target + suffix; return; }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / 1500, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))) + (t === 1 ? suffix : '');
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(([e]) => { if (e.isIntersecting) { runCounters(); so.disconnect(); } }, { threshold: 0.4 });
    so.observe(stats);
  } else runCounters();

  $$('.visit__card, .why__card').forEach((el, i) => el.style.setProperty('--rd', (i % 3) * 0.1 + 's'));
  $$('.reveal').forEach((el) => { if (!el.classList.contains('card')) watch(el); });

  const join = $('#join-form');
  join.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#join-email');
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
    input.setAttribute('aria-invalid', String(!ok));
    $('.join__status', join).textContent = ok ? 'You are on the mad list! (Demo form: nothing was sent.)' : 'Please enter a valid email.';
    if (ok) join.reset();
  });

  $('#year').textContent = new Date().getFullYear();
})();
