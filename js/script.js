// Sample data for the design only. Later PHP + MySQL will replace this.
const categories = ["Rice & Grains", "Cooking Oil", "Dairy & Eggs", "Snacks", "Beverages"];

const products = [
  { name: "Miniket Rice (1 kg)",    category: "Rice & Grains", price: 75,  stock: 50,  image: "" },
  { name: "Masoor Dal (1 kg)",      category: "Rice & Grains", price: 130, stock: 30,  image: "" },
  { name: "Soybean Oil (1 L)",      category: "Cooking Oil",   price: 185, stock: 25,  image: "" },
  { name: "Mustard Oil (500 ml)",   category: "Cooking Oil",   price: 160, stock: 4,   image: "" },
  { name: "Fresh Milk (1 L)",       category: "Dairy & Eggs",  price: 90,  stock: 20,  image: "" },
  { name: "Eggs (dozen)",           category: "Dairy & Eggs",  price: 150, stock: 40,  image: "" },
  { name: "Instant Noodles (pack)", category: "Snacks",        price: 25,  stock: 100, image: "" },
  { name: "Tea Leaves (400 g)",     category: "Beverages",     price: 210, stock: 3,   image: "" }
];

let activeCategory = "";
let searchText = "";
let cartCount = 0;

const grid = document.getElementById("productGrid");
const chips = document.getElementById("chips");
const emptyMsg = document.getElementById("emptyMsg");

function renderChips() {
  chips.innerHTML = categories.map(c =>
    `<button type="button" class="chip ${c === activeCategory ? 'active' : ''}" data-cat="${c}">${c}</button>`
  ).join("");
}

function renderProducts() {
  const list = products.filter(p =>
    p.stock > 0 &&
    (!activeCategory || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  emptyMsg.classList.toggle("d-none", list.length > 0);

  grid.innerHTML = list.map(p => `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="product">
        <div class="thumb">
          ${p.image
            ? `<img src="images/${p.image}" alt="${p.name}">`
            : `<span class="placeholder-letter">${p.name.charAt(0)}</span>`}
        </div>
        <div class="body">
          <div class="cat">${p.category}</div>
          <span class="name">${p.name}</span>
          <div class="price">৳${p.price.toFixed(2)}</div>
          ${p.stock <= 5 ? `<div class="low">Only ${p.stock} left</div>` : ""}
          <button type="button" class="btn btn-leaf w-100 mt-2 add-btn">Add to cart</button>
        </div>
      </div>
    </div>`).join("");
}

// Category chip click
chips.addEventListener("click", e => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  activeCategory = activeCategory === btn.dataset.cat ? "" : btn.dataset.cat;
  renderChips();
  renderProducts();
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});

// Search
document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  searchText = document.getElementById("searchInput").value.trim();
  renderProducts();
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});

// Show all
document.getElementById("showAll").addEventListener("click", e => {
  e.preventDefault();
  activeCategory = "";
  searchText = "";
  document.getElementById("searchInput").value = "";
  renderChips();
  renderProducts();
});

// Add to cart (demo only: just changes the counter)
grid.addEventListener("click", e => {
  if (!e.target.classList.contains("add-btn")) return;
  cartCount++;
  document.getElementById("cartCount").textContent = cartCount;
  e.target.textContent = "Added";
  setTimeout(() => e.target.textContent = "Add to cart", 900);
});

renderChips();
renderProducts();
