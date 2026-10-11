// FrozenMart demo (frontend only). Data is kept in the browser (localStorage)
// until PHP + MySQL is added. Pages are switched with the URL hash (#/login, #/checkout ...).

// category: [name, icon]
const cats = [
  ["Chicken", "🍗"], ["Fish", "🐟"], ["Red Meat", "🥩"],
  ["Vegetables", "🥦"], ["Frozen Snacks", "🥟"], ["Ice Cream", "🍦"], ["Dairy", "🥛"]
];
// product: [name, categoryIndex, pack, price, stock, discount%, featured]
// Image file = English name, lowercase, dashes (e.g. images/chicken-leg-piece.jpg)
const products = [
  ["Chicken Leg Piece", 0, "1 kg pack", 220, 40, 0, 1],
  ["Chicken Nuggets", 0, "500 g pack", 420, 40, 20, 0],
  ["Chicken Sausage", 0, "500 g pack", 450, 4, 0, 0],
  ["Rohu Fish", 1, "1 kg pack", 280, 25, 10, 1],
  ["Hilsa Fish Cut", 1, "1 kg pack", 1650, 3, 0, 0],
  ["Prawn", 1, "500 g pack", 780, 15, 0, 0],
  ["Beef Seekh Kebab", 2, "400 g pack", 520, 20, 10, 0],
  ["Beef Burger Patty", 2, "6 pieces", 480, 25, 0, 0],
  ["Beef Meatball", 2, "500 g pack", 560, 0, 0, 0],
  ["Mixed Vegetables", 3, "500 g pack", 120, 45, 0, 1],
  ["Green Peas", 3, "500 g pack", 140, 60, 0, 0],
  ["Sweet Corn", 3, "500 g pack", 150, 30, 15, 0],
  ["Frozen Samosa", 4, "10 pieces", 150, 30, 0, 1],
  ["Frozen Paratha", 4, "20 pieces", 320, 50, 15, 0],
  ["Veg Spring Roll", 4, "10 pieces", 260, 35, 25, 0],
  ["French Fries", 4, "1 kg pack", 380, 50, 0, 0],
  ["Vanilla Ice Cream", 5, "1 L pack", 480, 25, 0, 0],
  ["Chocolate Ice Cream", 5, "1 L pack", 500, 20, 10, 0],
  ["Kulfi", 5, "6 pieces", 240, 3, 0, 0],
  ["Chicken Momo", 4, "12 pieces", 280, 35, 0, 1],
  ["Veg Momo", 4, "12 pieces", 220, 30, 10, 1],
  ["Fuchka Puri", 4, "50 pieces", 180, 40, 0, 1],
  ["Snack Mix Package", 4, "30 pieces mix", 590, 20, 10, 1],
  ["Family Mix Package", 4, "60 pieces mix", 1090, 12, 15, 0],
  ["Fresh Milk", 6, "1 L pack", 90, 20, 0, 0]
];

const T = {
  nav_home: "Home", nav_cats: "Categories", nav_products: "Products", nav_about: "About Us", cart: "Cart",
    tagline: "PREMIUM FROZEN FOODS", hero_h1: "Freshness You<br>Can Count On",
    hero_p: "Quality frozen food for your family, delivered to your door.",
    search_ph: "Search chicken, fish, samosa…", search_btn: "Search", shop_now: "Shop Now",
    cats_title: "Shop by Category", cats_sub: "Open a folder to see the items inside.",
    feat_title: "Featured Products", feat_sub: "Frozen favorites for everyday life. Red badges are special offers.",
    all: "All products", items: "items", back: "Back", results: "Search results",
    in_stock: "In stock", only_left: "Only {n} left", out: "Out of stock", units: "units",
    add: "Add to Cart", added: "Added", maxed: "Max stock reached", no_results: "Nothing found. Try another word or category.",
    view3d: "3D view", drag: "Drag to rotate", close: "Close",
    cart_title: "Your Cart", cart_empty: "Your cart is empty.", remove: "Remove", total: "Total", checkout: "Checkout", clear: "Clear cart",
    about_title: "Supporting Local Food Businesses", about_p: "Quality frozen food, easy online ordering, and simple shopping for everyone.",
    login_btn: "Log in", register_btn: "Create account", logout: "Log out", hi: "Hi, {n}", my_orders: "My Orders",
    login_title: "Log in", login_sub: "Welcome back! Log in to place your order.",
    reg_title: "Create account", reg_sub: "Register once and order any time.",
    email: "Email", password: "Password", confirm_pw: "Confirm password", name: "Full name", phone: "Phone number", address: "Delivery address", note: "Note (optional)",
    no_account: "New here?", have_account: "Already have an account?",
    err_required: "Please fill in all required fields.", err_email: "Enter a valid email address.",
    err_phone: "Enter a valid phone number (for example 01712345678).", err_pw_len: "Password must be at least 6 characters.",
    err_pw_match: "Passwords do not match.", err_exists: "An account with this email already exists.", err_login: "Wrong email or password.",
    err_stock: "Some items are not available in that quantity any more. Your cart was updated, please check it.",
    checkout_title: "Checkout", delivery_info: "Delivery details", payment: "Payment", cod: "Cash on Delivery",
    order_summary: "Order summary", place_order: "Place order", go_shop: "Continue shopping",
    thanks: "Thank you for your order!", thanks_sub: "We received your order and will confirm it soon.",
    order_no: "Order no.", date: "Date", status: "Status", deliver_to: "Deliver to", track: "Track my orders",
    orders_title: "My Orders", no_orders: "You have not placed any orders yet.",
    st_Pending: "Pending", st_Confirmed: "Confirmed", st_Processing: "Processing", st_Shipped: "Shipped", st_Delivered: "Delivered", st_Cancelled: "Cancelled",
    quantity: "Quantity", related: "More in this category", not_found: "Page or product not found.", pay_cod: "Cash on Delivery", pay_bkash: "bKash", pay_card: "Card (Visa / Mastercard)",
    bkash_help: "Send {amt} to bKash number {no} (Send Money). Then enter your bKash number and the Transaction ID (TrxID) below. We will verify it.",
    your_bkash: "Your bKash number", trx: "Transaction ID (TrxID)", err_trx: "Enter a valid Transaction ID (8-12 letters or numbers).",
    card_help: "You will be taken to a secure payment page to enter your card details. This shop never sees or stores your card number.",
    card_demo: "Demo only: here the card payment is simulated and no card details are asked.",
    ps_Unpaid: "Pay on delivery", ps_Verifying: "Awaiting verification", ps_Paid: "Paid",
    reset: "Reset demo data"
  };
// Shop owner: put your real bKash (personal) number here
const SHOP_BKASH = "01XXXXXXXXX";
const STEPS = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"];

// ---------- storage (safe: works even if the browser blocks it) ----------
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  clear() { try { Object.keys(localStorage).filter(k => k.startsWith("fm_")).forEach(k => localStorage.removeItem(k)); } catch (e) {} }
};
let cartQty = store.get("fm_cart", {});
let users = store.get("fm_users", []);          // DEMO ONLY: real passwords are hashed in PHP (password_hash)
let orders = store.get("fm_orders", []);
let session = store.get("fm_session", null);    // email of the logged-in customer
const savedStock = store.get("fm_stock", null);
if (savedStock && savedStock.length === products.length) savedStock.forEach((s, i) => products[i][4] = s);
let afterLogin = null, pendingScroll = null, cartTotal = 0;

// ---------- helpers ----------
const $ = id => document.getElementById(id);
const t = k => T[k];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const num = n => String(n);
const itemsLabel = n => n + " " + (n === 1 ? "item" : "items");
const taka = n => "৳" + num(n);
const L = a => a[0];
const price = p => Math.round(p[3] * (100 - p[5]) / 100);
const packText = pk => pk;
const pack = p => packText(p[2]);
const slug = p => p[0].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function imgFallback(img) {   // try .jpg, then .png, then .webp; if none exists the emoji stays
  const next = { jpg: "png", png: "webp" }[img.src.split(".").pop()];
  if (next) img.src = img.src.replace(/\.\w+$/, "." + next); else img.remove();
}
const stockText = p => p[4] === 0 ? t("out") : t("in_stock") + ": " + num(p[4]) + " " + t("units");
const stockLine = p => p[4] === 0 ? `<div class="stock out">${t("out")}</div>`
  : p[4] <= 5 ? `<div class="stock low">${t("only_left").replace("{n}", num(p[4]))}</div>`
  : `<div class="stock ok">${stockText(p)}</div>`;
const imgTag = p => `<img src="images/${slug(p)}.jpg" alt="${p[0]}" loading="lazy" onerror="imgFallback(this)">`;
const currentUser = () => users.find(u => u.email === session) || null;
const fmtDate = iso => new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
const saveStock = () => store.set("fm_stock", products.map(p => p[4]));

// ---------- product card ----------
function card(i) {
  const p = products[i], off = p[5] > 0;
  return `<article class="product-card">
    <div class="product-image" data-open="${i}">
      ${off ? `<span class="badge-off">-${num(p[5])}%</span>` : ""}
      <span class="emoji">${cats[p[1]][1]}</span>${imgTag(p)}
      <button type="button" class="btn-3d" data-3d="${i}">▣ ${t("view3d")}</button>
    </div>
    <div class="pc-body">
      <h3><a href="#/product/${i}">${p[0]}</a></h3>
      <p class="pack">${pack(p)}</p>
      <div class="price">${taka(price(p))}${off ? `<s class="old">${taka(p[3])}</s>` : ""}</div>
      ${stockLine(p)}
      <button type="button" class="btn add-cart" data-add="${i}" ${p[4] === 0 ? "disabled" : ""}>${p[4] === 0 ? t("out") : t("add")}</button>
    </div></article>`;
}

// ---------- cart ----------
function syncCart() {
  Object.keys(cartQty).forEach(k => { if (!(cartQty[k] > 0) || !products[k]) delete cartQty[k]; });
  cartTotal = Object.values(cartQty).reduce((a, b) => a + b, 0);
  store.set("fm_cart", cartQty);
  $("cart-count").textContent = num(cartTotal);
  renderCart();
}
function setQty(i, q) {
  q = Math.max(0, Math.min(q, products[i][4]));
  if (q === 0) delete cartQty[i]; else cartQty[i] = q;
  syncCart();
}
function addToCart(i, n = 1) {
  const room = products[i][4] - (cartQty[i] || 0);
  if (room <= 0) return false;
  cartQty[i] = (cartQty[i] || 0) + Math.min(n, room);
  syncCart();
  return true;
}
function cartIds() { return Object.keys(cartQty).map(Number).filter(i => cartQty[i] > 0); }
function cartSum() { return cartIds().reduce((a, i) => a + price(products[i]) * cartQty[i], 0); }

function renderCart() {
  const ids = cartIds();
  if (!ids.length) { $("cartItems").innerHTML = `<p class="cart-empty">${t("cart_empty")}</p>`; $("cartFoot").innerHTML = ""; return; }
  $("cartItems").innerHTML = ids.map(i => {
    const p = products[i], q = cartQty[i];
    return `<div class="cart-item">
      <div class="ci-icon">${cats[p[1]][1]}</div>
      <div class="ci-info"><strong>${p[0]}</strong><small>${pack(p)} · ${taka(price(p))}</small>
        <div class="qty"><button type="button" data-dec="${i}" aria-label="−">−</button><span>${num(q)}</span><button type="button" data-inc="${i}" aria-label="+" ${q >= p[4] ? "disabled" : ""}>+</button></div>
      </div>
      <div class="ci-end"><b>${taka(price(p) * q)}</b><button type="button" class="ci-remove" data-remove="${i}">${t("remove")}</button></div>
    </div>`;
  }).join("");
  $("cartFoot").innerHTML = `<div class="cart-total"><span>${t("total")}</span><b>${taka(cartSum())}</b></div>
    <button type="button" class="btn" data-checkout>${t("checkout")}</button>
    <button type="button" class="link-clear" data-clear>${t("clear")}</button>`;
}
function openCart() { renderCart(); $("cartOverlay").classList.remove("d-none"); document.body.style.overflow = "hidden"; }
function closeCart() { $("cartOverlay").classList.add("d-none"); document.body.style.overflow = ""; }

// ---------- header account area ----------
function renderAccount() {
  const u = currentUser();
  $("account").innerHTML = u
    ? `<a href="#/orders" class="acc-link">${t("my_orders")}</a><span class="acc-hi">${t("hi").replace("{n}", esc(u.name.split(" ")[0]))}</span><button type="button" class="acc-btn" data-logout>${t("logout")}</button>`
    : `<a href="#/login" class="acc-link">${t("login_btn")}</a><a href="#/register" class="btn btn-sm">${t("register_btn")}</a>`;
}

// ---------- pages ----------
const PAGE_BOX = ["homeView", "listView", "pageView"];
function show(box) {
  PAGE_BOX.forEach(b => $(b).classList.toggle("d-none", b !== box));
  $("home").classList.toggle("d-none", box === "pageView");   // hero only on home / list
}
function page(html) { show("pageView"); $("pageView").innerHTML = `<div class="page-inner">${html}</div>`; }
const backBtn = () => `<button type="button" class="back-btn" data-back>← ${t("back")}</button>`;

function renderHome() {
  show("homeView");
  $("categoryGrid").innerHTML = cats.map((c, k) =>
    `<button type="button" class="category-card" data-cat="${k}">${c[1]}<h3>${L(c)}</h3><small>${itemsLabel(products.filter(p => p[1] === k).length)}</small></button>`).join("");
  $("featuredGrid").innerHTML = products.map((p, i) => p[6] ? card(i) : "").join("");
}
function renderList(kind, arg) {
  show("listView");
  let ids = products.map((_, i) => i), title;
  if (kind === "search") {
    const q = arg.toLowerCase();
    ids = ids.filter(i => products[i][0].toLowerCase().includes(q));
    title = t("results") + ": " + arg;
  } else if (arg === "all") title = t("all");
  else { const k = Number(arg); ids = ids.filter(i => products[i][1] === k); title = cats[k] ? cats[k][1] + " " + L(cats[k]) : t("not_found"); }
  $("listTitle").textContent = title;
  $("listSub").textContent = itemsLabel(ids.length);
  $("productGrid").innerHTML = ids.map(card).join("");
  $("emptyMsg").classList.toggle("d-none", ids.length > 0);
}

function renderProduct(i) {
  const p = products[i];
  if (!p) return page(`${backBtn()}<p class="empty">${t("not_found")}</p>`);
  const off = p[5] > 0, rel = products.map((_, k) => k).filter(k => products[k][1] === p[1] && k !== i).slice(0, 4);
  page(`${backBtn()}
    <div class="pd">
      <div class="pd-image">${off ? `<span class="badge-off">-${num(p[5])}%</span>` : ""}<span class="emoji">${cats[p[1]][1]}</span>${imgTag(p)}</div>
      <div class="pd-info">
        <div class="pd-cat">${cats[p[1]][1]} ${L(cats[p[1]])}</div>
        <h2>${p[0]}</h2>
        <p class="pack">${pack(p)}</p>
        <div class="price big">${taka(price(p))}${off ? `<s class="old">${taka(p[3])}</s>` : ""}</div>
        ${stockLine(p)}
        <div class="pd-buy">
          <span>${t("quantity")}</span>
          <div class="qty"><button type="button" data-pd-dec aria-label="−">−</button><span id="pdQty">1</span><button type="button" data-pd-inc aria-label="+">+</button></div>
        </div>
        <button type="button" class="btn add-cart" data-add-qty="${i}" ${p[4] === 0 ? "disabled" : ""}>${p[4] === 0 ? t("out") : t("add")}</button>
        <button type="button" class="btn-3d-lg" data-3d="${i}">▣ ${t("view3d")}</button>
      </div>
    </div>
    ${rel.length ? `<h3 class="rel-title">${t("related")}</h3><div class="product-grid">${rel.map(card).join("")}</div>` : ""}`);
}

const field = (id, label, type = "text", val = "", extra = "") =>
  `<label class="fld">${label}<input id="${id}" type="${type}" value="${esc(val)}" ${extra}></label>`;

function renderLogin() {
  page(`<div class="auth-box"><h2>${t("login_title")}</h2><p class="subtitle">${t("login_sub")}</p>
    <form id="loginForm" novalidate>
      ${field("fEmail", t("email"), "email", "", 'autocomplete="email"')}
      ${field("fPw", t("password"), "password", "", 'autocomplete="current-password"')}
      <p class="form-error" id="formError" role="alert"></p>
      <button class="btn" type="submit">${t("login_btn")}</button>
    </form>
    <p class="auth-alt">${t("no_account")} <a href="#/register">${t("register_btn")}</a></p></div>`);
}
function renderRegister() {
  page(`<div class="auth-box"><h2>${t("reg_title")}</h2><p class="subtitle">${t("reg_sub")}</p>
    <form id="registerForm" novalidate>
      ${field("fName", t("name"), "text", "", 'autocomplete="name"')}
      ${field("fPhone", t("phone"), "tel", "", 'autocomplete="tel"')}
      ${field("fEmail", t("email"), "email", "", 'autocomplete="email"')}
      ${field("fAddress", t("address"), "text", "", 'autocomplete="street-address"')}
      ${field("fPw", t("password"), "password", "", 'autocomplete="new-password"')}
      ${field("fPw2", t("confirm_pw"), "password", "", 'autocomplete="new-password"')}
      <p class="form-error" id="formError" role="alert"></p>
      <button class="btn" type="submit">${t("register_btn")}</button>
    </form>
    <p class="auth-alt">${t("have_account")} <a href="#/login">${t("login_btn")}</a></p></div>`);
}

function renderCheckout() {
  const ids = cartIds(), u = currentUser();
  if (!ids.length) return page(`<h2>${t("checkout_title")}</h2><p class="empty">${t("cart_empty")}</p><p style="text-align:center;margin-top:16px"><a class="btn" href="#/">${t("go_shop")}</a></p>`);
  page(`<h2>${t("checkout_title")}</h2>
    <div class="co">
      <form id="checkoutForm" class="co-form" novalidate>
        <h3>${t("delivery_info")}</h3>
        ${field("fName", t("name"), "text", u.name)}
        ${field("fPhone", t("phone"), "tel", u.phone)}
        ${field("fAddress", t("address"), "text", u.address)}
        ${field("fNote", t("note"))}
        <h3>${t("payment")}</h3>
        ${["cod", "bkash", "card"].map((v, k) => `<label class="pay-opt"><input type="radio" name="pay" value="${v}" ${k === 0 ? "checked" : ""}> ${t("pay_" + v)}</label>`).join("")}
        <div class="pay-panel d-none" id="payBkash">
          <p>${t("bkash_help").replace("{amt}", "<b>" + taka(cartSum()) + "</b>").replace("{no}", "<b>" + esc(SHOP_BKASH) + "</b>")}</p>
          ${field("fBkashNo", t("your_bkash"), "tel")}${field("fTrx", t("trx"), "text", "", 'autocomplete="off"')}
        </div>
        <div class="pay-panel d-none" id="payCard"><p>${t("card_help")}</p><p class="demo-note">${t("card_demo")}</p></div>
        <p class="form-error" id="formError" role="alert"></p>
        <button class="btn" type="submit">${t("place_order")}</button>
      </form>
      <aside class="co-sum"><h3>${t("order_summary")}</h3>
        ${ids.map(i => `<div class="sum-row"><span>${products[i][0]} × ${num(cartQty[i])}</span><b>${taka(price(products[i]) * cartQty[i])}</b></div>`).join("")}
        <div class="sum-row total"><span>${t("total")}</span><b>${taka(cartSum())}</b></div>
      </aside>
    </div>`);
}

const payInfo = o => {
  const m = o.pay || "cod", s = o.payStatus || "Unpaid";
  return `${t("pay_" + m)} · <span class="st st-${s}">${t("ps_" + s)}</span>` + (m === "bkash" && o.trx ? `<br><small>TrxID: ${esc(o.trx)}</small>` : "");
};
const itemsHtml = o => o.items.map(it => `<div class="sum-row"><span>${esc(it.n[0])} (${packText(it.pk)}) × ${num(it.q)}</span><b>${taka(it.price * it.q)}</b></div>`).join("");

function renderConfirm(id) {
  const o = orders.find(x => x.id === Number(id) && x.email === session);
  if (!o) return page(`<p class="empty">${t("not_found")}</p>`);
  page(`<div class="thanks"><div class="tick">✓</div><h2>${t("thanks")}</h2><p class="subtitle">${t("thanks_sub")}</p>
    <div class="co-sum">
      <div class="sum-row"><span>${t("order_no")}</span><b>#${num(o.id)}</b></div>
      <div class="sum-row"><span>${t("date")}</span><b>${fmtDate(o.date)}</b></div>
      <div class="sum-row"><span>${t("status")}</span><b><span class="st st-${o.status}">${t("st_" + o.status)}</span></b></div>
      <div class="sum-row"><span>${t("payment")}</span><b>${payInfo(o)}</b></div>
      <div class="sum-row"><span>${t("deliver_to")}</span><b>${esc(o.name)}, ${esc(o.phone)}<br>${esc(o.address)}</b></div>
      <hr>${itemsHtml(o)}
      <div class="sum-row total"><span>${t("total")}</span><b>${taka(o.total)}</b></div>
    </div>
    <p style="margin-top:18px"><a class="btn" href="#/orders">${t("track")}</a> <a class="btn btn-light" href="#/">${t("go_shop")}</a></p></div>`);
}

function tracker(status) {
  if (status === "Cancelled") return `<span class="st st-Cancelled">${t("st_Cancelled")}</span>`;
  const at = STEPS.indexOf(status);
  return `<ol class="track">${STEPS.map((s, k) => `<li class="${k <= at ? "done" : ""}"><span></span>${t("st_" + s)}</li>`).join("")}</ol>`;
}
function renderOrders() {
  const mine = orders.filter(o => o.email === session);
  page(`<h2>${t("orders_title")}</h2>` + (mine.length ? mine.map(o => `<div class="order-card">
      <div class="oc-head"><b>${t("order_no")} #${num(o.id)}</b><span>${fmtDate(o.date)}</span><span class="st st-${o.status}">${t("st_" + o.status)}</span></div>
      ${tracker(o.status)}<div class="sum-row"><span>${t("payment")}</span><b>${payInfo(o)}</b></div>${itemsHtml(o)}
      <div class="sum-row total"><span>${t("total")}</span><b>${taka(o.total)}</b></div></div>`).join("")
    : `<p class="empty">${t("no_orders")}</p><p style="text-align:center;margin-top:16px"><a class="btn" href="#/">${t("go_shop")}</a></p>`));
}

// ---------- router ----------
function route(keepScroll) {
  const parts = location.hash.replace(/^#\/?/, "").split("/").map(decodeURIComponent);
  const name = parts[0] || "home", arg = parts.slice(1).join("/");
  if ((name === "checkout" || name === "orders" || name === "confirmation") && !currentUser()) {
    afterLogin = "#/" + name + (arg ? "/" + arg : ""); location.hash = "#/login"; return;
  }
  switch (name) {
    case "home": renderHome(); break;
    case "category": renderList("category", arg); break;
    case "search": renderList("search", arg); break;
    case "product": renderProduct(Number(arg)); break;
    case "login": renderLogin(); break;
    case "register": renderRegister(); break;
    case "checkout": renderCheckout(); break;
    case "confirmation": renderConfirm(arg); break;
    case "orders": renderOrders(); break;
    default: page(`<p class="empty">${t("not_found")}</p>`);
  }
  if (keepScroll) return;
  if (pendingScroll && name === "home") { $(pendingScroll).scrollIntoView({ behavior: "smooth" }); pendingScroll = null; }
  else window.scrollTo(0, 0);
}
function refresh() {   // re-draw everything in the current language
  document.querySelectorAll("[data-i18n]").forEach(e => e.textContent = t(e.dataset.i18n));
  document.querySelectorAll("[data-i18n-html]").forEach(e => e.innerHTML = t(e.dataset.i18nHtml));
  document.querySelectorAll("[data-i18n-ph]").forEach(e => e.placeholder = t(e.dataset.i18nPh));
  renderAccount(); syncCart(); route(true);
}
function go(where) {
  if (where === "home") { if (location.hash && location.hash !== "#/") location.hash = "#/"; else window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  if (!location.hash || location.hash === "#/") $(where).scrollIntoView({ behavior: "smooth" });
  else { pendingScroll = where; location.hash = "#/"; }
}
window.addEventListener("hashchange", () => route());

// ---------- forms ----------
const val = id => $(id).value.trim();
const fail = msg => { $("formError").textContent = t(msg); return false; };
const emailOk = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const phoneOk = p => /^01[3-9]\d{8}$/.test(String(p).replace(/[\s-]/g, ""));

function loginUser(email) {
  session = email; store.set("fm_session", session); renderAccount();
  const to = afterLogin || "#/"; afterLogin = null; location.hash = to;
}
document.addEventListener("submit", e => {
  const f = e.target.id;
  if (!["searchForm", "loginForm", "registerForm", "checkoutForm"].includes(f)) return;
  e.preventDefault();
  if (f === "searchForm") { const q = val("searchInput"); location.hash = q ? "#/search/" + encodeURIComponent(q) : "#/"; return; }
  if (f === "loginForm") {
    const email = val("fEmail").toLowerCase(), u = users.find(x => x.email === email && x.password === $("fPw").value);
    if (!email || !$("fPw").value) return fail("err_required");
    return u ? loginUser(u.email) : fail("err_login");
  }
  if (f === "registerForm") {
    const u = { name: val("fName"), phone: String(val("fPhone")).replace(/[\s-]/g, ""), email: val("fEmail").toLowerCase(), address: val("fAddress"), password: $("fPw").value, role: "customer" };
    if (!u.name || !u.phone || !u.email || !u.address || !u.password) return fail("err_required");
    if (!emailOk(u.email)) return fail("err_email");
    if (!phoneOk(u.phone)) return fail("err_phone");
    if (u.password.length < 6) return fail("err_pw_len");
    if (u.password !== $("fPw2").value) return fail("err_pw_match");
    if (users.some(x => x.email === u.email)) return fail("err_exists");
    users.push(u); store.set("fm_users", users); return loginUser(u.email);
  }
  if (f === "checkoutForm") placeOrder();
});

function placeOrder() {
  const name = val("fName"), phone = String(val("fPhone")).replace(/[\s-]/g, ""), address = val("fAddress"), note = val("fNote");
  if (!name || !phone || !address) return fail("err_required");
  if (!phoneOk(phone)) return fail("err_phone");
  const pay = (document.querySelector('input[name="pay"]:checked') || {}).value || "cod";
  const bkashNo = pay === "bkash" ? String(val("fBkashNo")).replace(/[\s-]/g, "") : "", trx = pay === "bkash" ? val("fTrx").toUpperCase() : "";
  if (pay === "bkash") {
    if (!bkashNo || !trx) return fail("err_required");
    if (!phoneOk(bkashNo)) return fail("err_phone");
    if (!/^[A-Z0-9]{8,12}$/.test(trx)) return fail("err_trx");
  }
  const ids = cartIds();
  if (ids.some(i => cartQty[i] > products[i][4])) {       // stock changed since the item was added
    ids.forEach(i => { if (cartQty[i] > products[i][4]) setQty(i, products[i][4]); });
    renderCheckout(); $("formError").textContent = t("err_stock"); return;
  }
  const o = {
    id: orders.reduce((m, x) => Math.max(m, x.id), 1000) + 1, email: session, name, phone, address, note, status: "Pending",
    pay, payStatus: { cod: "Unpaid", bkash: "Verifying", card: "Paid" }[pay], bkashNo, trx,
    date: new Date().toISOString(), total: cartSum(),
    items: ids.map(i => ({ n: [products[i][0]], pk: products[i][2], q: cartQty[i], price: price(products[i]) }))
  };
  ids.forEach(i => products[i][4] -= cartQty[i]);          // inventory goes down automatically
  saveStock();
  orders.push(o); store.set("fm_orders", orders);
  cartQty = {}; syncCart();
  location.hash = "#/confirmation/" + o.id;
}

// ---------- clicks ----------
document.addEventListener("click", e => {
  const c = sel => e.target.closest(sel);
  let b;
  if ((b = c("[data-go]"))) { e.preventDefault(); go(b.dataset.go); return; }
  if ((b = c("[data-cat]"))) { location.hash = "#/category/" + b.dataset.cat; return; }
  if (c("[data-cart]")) { e.preventDefault(); openCart(); return; }
  if (c("[data-cart-close]") || e.target === $("cartOverlay")) { closeCart(); return; }
  if ((b = c("[data-inc]"))) { setQty(Number(b.dataset.inc), (cartQty[b.dataset.inc] || 0) + 1); return; }
  if ((b = c("[data-dec]"))) { setQty(Number(b.dataset.dec), (cartQty[b.dataset.dec] || 0) - 1); return; }
  if ((b = c("[data-remove]"))) { setQty(Number(b.dataset.remove), 0); return; }
  if (c("[data-clear]")) { cartQty = {}; syncCart(); return; }
  if (c("[data-checkout]")) { closeCart(); location.hash = "#/checkout"; return; }
  if ((b = c("[data-add]"))) {
    const ok = addToCart(Number(b.dataset.add));
    b.textContent = ok ? t("added") : t("maxed");
    setTimeout(() => { if (b.isConnected) b.textContent = t("add"); }, 1000); return;
  }
  if ((b = c("[data-add-qty]"))) {
    const ok = addToCart(Number(b.dataset.addQty), Number($("pdQty").textContent));
    b.textContent = ok ? t("added") : t("maxed");
    setTimeout(() => { if (b.isConnected) b.textContent = t("add"); }, 1000); return;
  }
  if (c("[data-pd-inc]")) { const s = $("pdQty"); s.textContent = Math.min(Number(s.textContent) + 1, 99); return; }
  if (c("[data-pd-dec]")) { const s = $("pdQty"); s.textContent = Math.max(Number(s.textContent) - 1, 1); return; }
  if ((b = c("[data-3d]"))) { open3D(Number(b.dataset["3d"])); return; }
  if ((b = c("[data-open]"))) { location.hash = "#/product/" + b.dataset.open; return; }
  if (c("[data-back]")) { if (history.length > 1) history.back(); else location.hash = "#/"; return; }
  if (c("[data-logout]")) { session = null; store.set("fm_session", null); renderAccount(); location.hash = "#/"; route(); return; }
  if (c("[data-reset]")) { e.preventDefault(); store.clear(); location.hash = "#/"; location.reload(); return; }
  if (c("[data-close]") || e.target === $("modal")) close3D();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeCart(); close3D(); } });
document.addEventListener("change", e => {
  if (e.target.name !== "pay") return;
  $("payBkash").classList.toggle("d-none", e.target.value !== "bkash");
  $("payCard").classList.toggle("d-none", e.target.value !== "card");
});

// ---------- 3D: card tilt + rotating product box ----------
const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.addEventListener("mousemove", e => {
  if (still) return;
  const c = e.target.closest(".product-card");
  if (!c) return;
  const r = c.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
  c.style.transform = `perspective(700px) rotateX(${(-y * 12).toFixed(1)}deg) rotateY(${(x * 14).toFixed(1)}deg) translateY(-4px)`;
});
document.addEventListener("mouseout", e => {
  const c = e.target.closest(".product-card");
  if (c && !c.contains(e.relatedTarget)) c.style.transform = "";
});

let raf = null;
function open3D(i) {
  const p = products[i], off = p[5] > 0, cat = cats[p[1]];
  const face = (cls, inner) => `<div class="face ${cls}">${inner}</div>`;
  $("modal").innerHTML = `<div class="modal-box">
    <button type="button" class="modal-close" data-close>✕ ${t("close")}</button>
    <div class="scene"><div class="cube" id="cube">
      ${face("f-front", `<span class="big">${cat[1]}</span><b>${p[0]}</b>`)}
      ${face("f-back", `<b>${taka(price(p))}</b>${off ? `<s>${taka(p[3])}</s><em>-${num(p[5])}%</em>` : ""}`)}
      ${face("f-right", `<b>${stockText(p)}</b>`)}
      ${face("f-left", `<b>${L(cat)}</b><span>${pack(p)}</span>`)}
      ${face("f-top", `<b>FrozenMart</b>`)}
      ${face("f-bottom", `<b>❄</b>`)}
    </div></div>
    <p class="hint">${t("drag")}</p>
    <div><strong>${p[0]}</strong><br>${pack(p)} · ${taka(price(p))} · ${stockText(p)}</div>
    <button type="button" class="btn add-cart" style="margin-top:10px" data-add="${i}" ${p[4] === 0 ? "disabled" : ""}>${p[4] === 0 ? t("out") : t("add")}</button>
  </div>`;
  $("modal").classList.remove("d-none");
  document.body.style.overflow = "hidden";
  const cube = $("cube"), scene = cube.parentElement;
  let rx = -18, ry = 25, drag = false, lx = 0, ly = 0;
  const loop = () => { if (!drag && !still) ry += 0.5; cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; raf = requestAnimationFrame(loop); };
  cancelAnimationFrame(raf); loop();
  scene.onpointerdown = e => { drag = true; lx = e.clientX; ly = e.clientY; scene.setPointerCapture(e.pointerId); };
  scene.onpointermove = e => { if (!drag) return; ry += (e.clientX - lx) * 0.8; rx -= (e.clientY - ly) * 0.8; lx = e.clientX; ly = e.clientY; };
  scene.onpointerup = () => drag = false;
}
function close3D() { $("modal").classList.add("d-none"); if ($("cartOverlay").classList.contains("d-none")) document.body.style.overflow = ""; cancelAnimationFrame(raf); }

refresh();
