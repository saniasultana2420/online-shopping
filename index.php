<?php
require_once "config/database.php";
include "includes/header.php";

// Categories for the chips
$categories = $pdo->query(
    "SELECT category_id, category_name FROM categories ORDER BY category_name"
)->fetchAll();

// Latest 8 products that are in stock
$products = $pdo->query(
    "SELECT p.product_id, p.product_name, p.price, p.stock_quantity, p.image, c.category_name
     FROM products p
     JOIN categories c ON c.category_id = p.category_id
     WHERE p.stock_quantity > 0
     ORDER BY p.product_id DESC
     LIMIT 8"
)->fetchAll();

function e($text) { return htmlspecialchars($text, ENT_QUOTES, 'UTF-8'); }
?>

<section class="hero">
  <div class="container">
    <h1>Fill your basket<br>without leaving home.</h1>
    <p class="lead">Rice, dal, oil, eggs, vegetables and more. Stock is updated live, so what you see is what's on the shelf.</p>

    <form class="search-bar" action="products.php" method="get" role="search">
      <input type="search" name="q" class="form-control" placeholder="Search for rice, milk, eggs…" aria-label="Search products">
      <button class="btn btn-leaf" type="submit">Search</button>
    </form>

    <?php if ($categories): ?>
    <div class="chips">
      <?php foreach ($categories as $c): ?>
        <a class="chip" href="products.php?category=<?= (int)$c['category_id'] ?>"><?= e($c['category_name']) ?></a>
      <?php endforeach; ?>
    </div>
    <?php endif; ?>
  </div>
</section>

<section class="container section">
  <div class="d-flex justify-content-between align-items-end mb-4">
    <h2>Fresh on the shelf</h2>
    <a href="products.php" class="link-all">See all products</a>
  </div>

  <?php if ($products): ?>
  <div class="row g-4">
    <?php foreach ($products as $p): ?>
    <div class="col-6 col-md-4 col-lg-3">
      <div class="product">
        <a href="product-details.php?id=<?= (int)$p['product_id'] ?>" class="thumb">
          <?php if (!empty($p['image']) && file_exists("images/" . $p['image'])): ?>
            <img src="images/<?= e($p['image']) ?>" alt="<?= e($p['product_name']) ?>">
          <?php else: ?>
            <span class="placeholder-letter"><?= e(mb_substr($p['product_name'], 0, 1)) ?></span>
          <?php endif; ?>
        </a>
        <div class="body">
          <div class="cat"><?= e($p['category_name']) ?></div>
          <a href="product-details.php?id=<?= (int)$p['product_id'] ?>" class="name"><?= e($p['product_name']) ?></a>
          <div class="price">৳<?= number_format($p['price'], 2) ?></div>
          <?php if ($p['stock_quantity'] <= 5): ?>
            <div class="low">Only <?= (int)$p['stock_quantity'] ?> left</div>
          <?php endif; ?>
          <a class="btn btn-leaf w-100 mt-2" href="add-to-cart.php?id=<?= (int)$p['product_id'] ?>">Add to cart</a>
        </div>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
  <?php else: ?>
    <div class="empty">No products yet. Add some products and they will appear here.</div>
  <?php endif; ?>
</section>

<section class="how">
  <div class="container">
    <h2 class="mb-4">How ordering works</h2>
    <div class="row g-4">
      <div class="col-md-3"><div class="step"><span>1</span><h3>Create an account</h3><p>Register once with your name and delivery address.</p></div></div>
      <div class="col-md-3"><div class="step"><span>2</span><h3>Fill your cart</h3><p>Search or browse by category and add what you need.</p></div></div>
      <div class="col-md-3"><div class="step"><span>3</span><h3>Place the order</h3><p>Confirm your cart. Stock is reduced automatically.</p></div></div>
      <div class="col-md-3"><div class="step"><span>4</span><h3>Track it</h3><p>See your order status in My orders.</p></div></div>
    </div>
  </div>
</section>

<?php include "includes/footer.php"; ?>
