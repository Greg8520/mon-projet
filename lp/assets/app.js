/* Apogée Men · landing page "cortisol"
   Vanilla JS: plan selector, cart (localStorage with in-memory fallback), drawer,
   Shopify checkout permalink, sticky mobile CTA, gallery, chart tooltip, count-up, reveal.
   Every value rendered here equals the static HTML default, so a JS failure leaves a correct page. */
(function () {
  'use strict';

  var CONFIG = {
    // Store domain for the checkout permalink. To confirm with the client (BRAND-BRIEF.md, section 10).
    shopDomain: 'apogeemen.com',
    storageKey: 'apogee_lp_cart_v1',
    maxQty: 10
  };

  var doc = document;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var money = (function () {
    var fmt = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
    return function (cents) { return fmt.format(cents / 100); };
  })();

  function $(sel, root) { return (root || doc).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }

  /* ---------- storage (localStorage, in-memory fallback when blocked) ---------- */
  var store = (function () {
    var memory = [];
    var usable = false;
    try {
      localStorage.setItem('__apogee_t', '1');
      localStorage.removeItem('__apogee_t');
      usable = true;
    } catch (e) { usable = false; }

    function valid(line) {
      return line && typeof line.key === 'string' && typeof line.variantId === 'string' &&
        typeof line.price === 'number' && line.price >= 0 && Number.isInteger(line.qty) && line.qty > 0;
    }
    return {
      get: function () {
        if (!usable) return memory.slice();
        try {
          var parsed = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
          return Array.isArray(parsed) ? parsed.filter(valid) : [];
        } catch (e) { return memory.slice(); }
      },
      set: function (lines) {
        memory = lines.slice();
        if (!usable) return;
        try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(lines)); } catch (e) { usable = false; }
      }
    };
  })();

  var live = $('[data-live]');
  function announce(msg) {
    if (!live) return;
    live.textContent = '';
    window.setTimeout(function () { live.textContent = msg; }, 60);
  }

  /* ---------- plan selector (role=radiogroup, roving tabindex, arrow keys) ---------- */
  var form = $('[data-buy]');
  var plans = $$('[data-plan]');
  var planInput = $('[data-plan-input]');

  function currentPlan() {
    return plans.filter(function (p) { return p.getAttribute('aria-checked') === 'true'; })[0] || plans[0];
  }

  function renderPrices() {
    var plan = currentPlan();
    if (!plan) return;
    var price = money(Number(plan.getAttribute('data-price')));
    $$('[data-price-display]').forEach(function (el) { el.textContent = price; });
    $$('[data-receipt-item], [data-receipt-total]').forEach(function (el) { el.textContent = price; });
    if (planInput) planInput.value = plan.getAttribute('data-selling-plan') || '';
  }

  function selectPlan(plan, focus) {
    plans.forEach(function (p) {
      var on = p === plan;
      p.setAttribute('aria-checked', on ? 'true' : 'false');
      p.tabIndex = on ? 0 : -1;
    });
    if (focus) plan.focus();
    renderPrices();
  }

  plans.forEach(function (plan, i) {
    plan.addEventListener('click', function () { selectPlan(plan, false); });
    plan.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = plans[(i + 1) % plans.length];
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = plans[(i - 1 + plans.length) % plans.length];
      else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); selectPlan(plan, false); return; }
      if (next) { e.preventDefault(); selectPlan(next, true); }
    });
  });
  if (plans.length) selectPlan(currentPlan(), false);

  /* ---------- cart ---------- */
  var drawer = $('#panier');
  var linesEl = $('[data-cart-lines]');
  var emptyEl = $('[data-cart-empty]');
  var footEl = $('[data-cart-foot]');
  var checkoutEl = $('[data-checkout]');

  function units(lines) { return lines.reduce(function (n, l) { return n + l.qty; }, 0); }
  function total(lines) { return lines.reduce(function (n, l) { return n + l.price * l.qty; }, 0); }

  // Shopify cart permalink: /cart/{variant}:{qty}[,...]?selling_plan={id}
  // A permalink carries one selling_plan; this page sells a single subscription line.
  function checkoutUrl(lines) {
    if (!lines.length) return '#';
    var items = lines.map(function (l) { return encodeURIComponent(l.variantId) + ':' + l.qty; }).join(',');
    var url = 'https://' + CONFIG.shopDomain + '/cart/' + items;
    var plan = lines[0].sellingPlan;
    if (plan) url += '?selling_plan=' + encodeURIComponent(plan);
    return url;
  }

  function lineTemplate(l) {
    var li = doc.createElement('li');
    li.className = 'line';
    li.setAttribute('data-key', l.key);
    li.innerHTML =
      '<img width="160" height="303" alt="">' +
      '<div>' +
        '<p class="line__title"></p>' +
        '<p class="line__plan"></p>' +
        '<div class="line__actions">' +
          '<div class="qty">' +
            '<button type="button" data-qty="-1"><svg class="icon" aria-hidden="true"><use href="#i-minus"/></svg></button>' +
            '<output aria-live="polite"></output>' +
            '<button type="button" data-qty="1"><svg class="icon" aria-hidden="true"><use href="#i-plus"/></svg></button>' +
          '</div>' +
          '<button class="line__remove" type="button" data-remove>Retirer</button>' +
        '</div>' +
      '</div>' +
      '<p class="line__price"></p>';
    $('img', li).src = /^assets\/img\/[\w.-]+$/.test(l.image) ? l.image : 'assets/img/bottle-160.webp';
    $('.line__title', li).textContent = l.title;
    $('.line__plan', li).textContent = l.planLabel;
    $('output', li).textContent = String(l.qty);
    $('.line__price', li).textContent = money(l.price * l.qty);
    var minus = $('[data-qty="-1"]', li);
    var plus = $('[data-qty="1"]', li);
    minus.setAttribute('aria-label', 'Diminuer la quantité de ' + l.title);
    plus.setAttribute('aria-label', 'Augmenter la quantité de ' + l.title);
    $('[data-remove]', li).setAttribute('aria-label', 'Retirer ' + l.title + ' du panier');
    minus.disabled = l.qty <= 1;
    plus.disabled = l.qty >= CONFIG.maxQty;
    return li;
  }

  function renderCart() {
    var lines = store.get();
    var n = units(lines);
    $$('[data-cart-count]').forEach(function (el) {
      el.textContent = String(n);
      if (n === 0) el.setAttribute('data-empty', ''); else el.removeAttribute('data-empty');
    });
    $$('[data-cart-count-label]').forEach(function (el) { el.textContent = n > 1 ? 'articles' : 'article'; });

    if (!linesEl) return;
    linesEl.innerHTML = '';
    lines.forEach(function (l) { linesEl.appendChild(lineTemplate(l)); });
    emptyEl.hidden = lines.length > 0;
    footEl.hidden = lines.length === 0;
    var sum = money(total(lines));
    $('[data-cart-subtotal]').textContent = sum;
    $('[data-cart-total]').textContent = sum;
    checkoutEl.href = checkoutUrl(lines);
  }

  function addToCart(item, qty) {
    var lines = store.get();
    var found = lines.filter(function (l) { return l.key === item.key; })[0];
    if (found) found.qty = Math.min(found.qty + qty, CONFIG.maxQty); // duplicate adds merge
    else lines.push(Object.assign({ qty: Math.min(qty, CONFIG.maxQty) }, item));
    store.set(lines);
    renderCart();
  }

  function changeQty(key, delta) {
    var lines = store.get().map(function (l) {
      if (l.key === key) l.qty = Math.max(1, Math.min(CONFIG.maxQty, l.qty + delta));
      return l;
    });
    store.set(lines);
    renderCart();
    var line = linesEl && linesEl.querySelector('[data-key="' + key + '"]');
    var btn = line && line.querySelector('[data-qty="' + (delta > 0 ? '1' : '-1') + '"]');
    if (btn && !btn.disabled) btn.focus();
    else if (line) line.querySelector('[data-remove]').focus();
  }

  function removeLine(key) {
    store.set(store.get().filter(function (l) { return l.key !== key; }));
    renderCart();
    announce('Article retiré du panier.');
    var closeBtn = $('[data-cart-close-btn]');
    if (closeBtn) closeBtn.focus();
  }

  if (linesEl) {
    linesEl.addEventListener('click', function (e) {
      var line = e.target.closest('.line');
      if (!line) return;
      var key = line.getAttribute('data-key');
      var qtyBtn = e.target.closest('[data-qty]');
      if (qtyBtn) changeQty(key, Number(qtyBtn.getAttribute('data-qty')));
      else if (e.target.closest('[data-remove]')) removeLine(key);
    });
  }

  if (form) {
    var variantId = form.getAttribute('data-variant-id');
    if (/\D/.test(variantId)) {
      console.warn('[Apogée LP] Identifiants Shopify factices (' + variantId + '). Remplacer VARIANT_ID et SELLING_PLAN_ID avant la mise en ligne.');
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var plan = currentPlan();
      var sellingPlan = plan.getAttribute('data-selling-plan') || '';
      addToCart({
        key: variantId + '|' + sellingPlan,
        variantId: variantId,
        sellingPlan: sellingPlan,
        title: form.getAttribute('data-title'),
        planLabel: plan.getAttribute('data-plan-label'),
        price: Number(plan.getAttribute('data-price')),
        image: form.getAttribute('data-image')
      }, 1);
      openCart(e.submitter || $('[data-add]'));
      announce(form.getAttribute('data-title') + ' ajouté au panier.');
    });
  }

  /* ---------- drawer: role=dialog, focus trap, Escape, focus restore, inert background ---------- */
  var chrome = $$('[data-chrome]');
  var lastFocus = null;
  var closeTimer = null;

  function focusables() {
    return $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', drawer)
      .filter(function (el) { return el.offsetParent !== null || el === doc.activeElement; });
  }

  function openCart(opener) {
    if (!drawer) return;
    window.clearTimeout(closeTimer);
    lastFocus = opener || doc.activeElement;
    drawer.hidden = false;
    chrome.forEach(function (el) { el.setAttribute('inert', ''); });
    doc.documentElement.classList.add('no-scroll');
    void drawer.offsetWidth; // let the closed state paint before animating in
    drawer.classList.add('is-open');
    $('[data-cart-close-btn]').focus();
  }

  function closeCart(restore) {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('is-open');
    chrome.forEach(function (el) { el.removeAttribute('inert'); });
    doc.documentElement.classList.remove('no-scroll');
    closeTimer = window.setTimeout(function () { drawer.hidden = true; }, reduceMotion ? 0 : 200);
    if (restore !== false && lastFocus && doc.contains(lastFocus)) lastFocus.focus();
  }

  $$('[data-cart-open]').forEach(function (btn) {
    btn.addEventListener('click', function () { openCart(btn); });
  });
  $$('[data-cart-close]').forEach(function (el) {
    el.addEventListener('click', function () { closeCart(!el.hasAttribute('data-no-restore')); });
  });
  if (drawer) {
    drawer.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeCart(true); return; }
      if (e.key !== 'Tab') return;
      var items = focusables();
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---------- sticky mobile CTA: visible after the hero, hidden over the buy block ---------- */
  var sticky = $('[data-sticky]');
  var hero = $('.hero');
  var buy = $('#acheter');
  if (sticky && hero && buy && 'IntersectionObserver' in window) {
    var pastHero = false;
    var overBuy = false;
    var update = function () { sticky.classList.toggle('is-visible', pastHero && !overBuy); };
    new IntersectionObserver(function (entries) {
      pastHero = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
      update();
    }).observe(hero);
    new IntersectionObserver(function (entries) {
      overBuy = entries[0].isIntersecting;
      update();
    }, { rootMargin: '0px 0px -20% 0px' }).observe(buy);
  }

  /* ---------- gallery ---------- */
  var gallery = $('[data-gallery]');
  if (gallery) {
    var main = $('[data-gallery-main]', gallery);
    var mainWrap = $('.gallery__main', gallery);
    var thumbs = $$('.thumb', gallery);
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        thumbs.forEach(function (o) { o.setAttribute('aria-pressed', o === t ? 'true' : 'false'); });
        main.srcset = t.getAttribute('data-srcset');
        main.src = t.getAttribute('data-src');
        main.width = Number(t.getAttribute('data-width'));
        main.height = Number(t.getAttribute('data-height'));
        main.alt = t.getAttribute('data-alt');
        mainWrap.classList.toggle('is-cover', t.getAttribute('data-fit') === 'cover');
      });
    });
  }

  /* ---------- chart tooltip (hover and keyboard focus show the same thing) ---------- */
  var plot = $('.chart__plot');
  if (plot) {
    var tip = doc.createElement('div');
    tip.className = 'chart__tip';
    tip.setAttribute('aria-hidden', 'true');
    tip.hidden = true;
    plot.appendChild(tip);
    var showTip = function (bar) {
      var pr = plot.getBoundingClientRect();
      var br = bar.getBoundingClientRect();
      tip.textContent = bar.getAttribute('data-tip');
      tip.hidden = false;
      var half = tip.offsetWidth / 2;
      var x = br.left - pr.left + br.width / 2;
      x = Math.max(half, Math.min(pr.width - half, x));
      tip.style.left = x + 'px';
      tip.style.top = (br.top - pr.top) + 'px';
    };
    var hideTip = function () { tip.hidden = true; };
    $$('.chart__bar', plot).forEach(function (bar) {
      bar.addEventListener('mouseenter', function () { showTip(bar); });
      bar.addEventListener('focus', function () { showTip(bar); });
      bar.addEventListener('mouseleave', hideTip);
      bar.addEventListener('blur', hideTip);
      bar.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideTip(); });
    });
  }

  /* ---------- motion: count-up and reveal (skipped entirely under reduced motion) ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var counters = $$('[data-count-to]');
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        countIO.unobserve(el);
        var target = Number(el.getAttribute('data-count-to'));
        var start = null;
        var step = function (ts) {
          if (start === null) start = ts;
          var p = Math.min(1, (ts - start) / 900);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) {
      // Only counters that start off-screen animate; one already in view keeps its static value.
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.textContent = '0';
        countIO.observe(el);
      }
    });

    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealIO.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('[data-reveal]').forEach(function (el) {
      el.classList.add('reveal');
      revealIO.observe(el);
    });
  }

  renderCart();
})();
