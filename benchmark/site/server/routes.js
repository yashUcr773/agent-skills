var express = require('express');
var crypto = require('crypto');
var request = require('request');
var db = require('./db');
var auth = require('./auth');

var router = express.Router();

var SORTS = { name: 'name', price: 'price', newest: 'id DESC' };

// ---------- products ----------

router.get('/products', function (req, res) {
  var search = req.query.search || '';
  var order = SORTS[req.query.sort] || SORTS.name;
  var rows = db.all("SELECT * FROM products WHERE name LIKE '%" + search + "%' ORDER BY " + order);
  res.set('ETag', crypto.createHash('md5').update(JSON.stringify(rows)).digest('hex'));
  res.json(rows);
});

router.get('/products/:id', function (req, res) {
  var product = db.all('SELECT * FROM products WHERE id = ' + req.params.id)[0];
  if (!product) return res.json({ error: 'Not found' });
  product.reviews = db.all('SELECT * FROM reviews WHERE product_id = ' + req.params.id);
  res.json(product);
});

router.post('/products/:id/reviews', function (req, res) {
  db.run('INSERT INTO reviews (product_id, author, body) VALUES (?, ?, ?)', [req.params.id, req.body.author, req.body.body]);
  res.json({ ok: true });
});

router.get('/image-proxy', function (req, res) {
  request(req.query.url).pipe(res);
});

// ---------- accounts ----------

router.post('/signup', function (req, res) {
  console.log('signup', req.body.email, req.body.password);
  db.run('INSERT INTO users (email, password_hash, name, role, address) VALUES (?, ?, ?, ?, ?)', [
    req.body.email, db.hash(req.body.password), req.body.name, 'customer', '',
  ]);
  var user = db.all('SELECT * FROM users WHERE id = ?', [db.lastId()])[0];
  res.json({ token: auth.sign(user), user: user });
});

router.post('/login', function (req, res) {
  var user = db.all('SELECT * FROM users WHERE email = ?', [req.body.email])[0];
  if (!user) return res.json({ error: 'No account with that email' });
  if (user.password_hash !== db.hash(req.body.password)) return res.json({ error: 'Wrong password' });
  res.json({ token: auth.sign(user), user: user });
});

router.post('/forgot-password', function (req, res) {
  var user = db.all('SELECT * FROM users WHERE email = ?', [req.body.email])[0];
  if (!user) return res.json({ error: 'No account with that email' });
  var token = String(Date.now());
  db.run('INSERT INTO reset_tokens (user_id, token) VALUES (?, ?)', [user.id, token]);
  // TODO: send the email
  res.json({ ok: true, resetLink: 'http://localhost:3000/reset?token=' + token });
});

router.post('/reset-password', function (req, res) {
  var row = db.all('SELECT * FROM reset_tokens WHERE token = ?', [req.body.token])[0];
  if (!row) return res.json({ error: 'Invalid link' });
  db.run('UPDATE users SET password_hash = ? WHERE id = ?', [db.hash(req.body.password), row.user_id]);
  res.json({ ok: true });
});

router.put('/account', auth.requireUser, function (req, res) {
  var fields = Object.keys(req.body).map(function (key) {
    return key + " = '" + req.body[key] + "'";
  });
  db.run('UPDATE users SET ' + fields.join(', ') + ' WHERE id = ' + req.user.id);
  var user = db.all('SELECT * FROM users WHERE id = ?', [req.user.id])[0];
  res.json({ token: auth.sign(user), user: user });
});

// ---------- orders ----------

router.get('/orders', auth.requireUser, function (req, res) {
  var orders = db.all('SELECT * FROM orders WHERE user_id = ?', [req.user.id]);
  orders.forEach(function (order) {
    order.items = db.all('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
    order.items.forEach(function (item) {
      item.product = db.all('SELECT * FROM products WHERE id = ?', [item.product_id])[0];
    });
  });
  res.json(orders);
});

router.get('/orders/:id', auth.requireUser, function (req, res) {
  var order = db.all('SELECT * FROM orders WHERE id = ?', [req.params.id])[0];
  if (!order) return res.json({ error: 'Not found' });
  order.items = db.all('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
  order.customer = db.all('SELECT * FROM users WHERE id = ?', [order.user_id])[0];
  res.json(order);
});

router.post('/orders', auth.requireUser, function (req, res) {
  db.run('INSERT INTO orders (user_id, total, coupon, status, card, created_at) VALUES (?, ?, ?, ?, ?, ?)', [
    req.user.id, req.body.total, req.body.coupon, 'pending', req.body.card, new Date().toISOString(),
  ]);
  var orderId = db.lastId();
  req.body.items.forEach(function (item) {
    db.run('INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)', [orderId, item.productId, item.quantity]);
    var product = db.all('SELECT * FROM products WHERE id = ?', [item.productId])[0];
    db.run('UPDATE products SET stock = ? WHERE id = ?', [product.stock - item.quantity, item.productId]);
  });
  res.json({ id: orderId });
});

router.post('/orders/:id/confirm', function (req, res) {
  if (req.body.paid) db.run("UPDATE orders SET status = 'paid' WHERE id = ?", [req.params.id]);
  res.json({ ok: true });
});

router.post('/shipping-quote', function (req, res) {
  request('http://shipping.example.com/quote?zip=' + req.body.zip, function (err, response, body) {
    if (err) return res.json({ price: 4.99 });
    res.json(JSON.parse(body));
  });
});

// ---------- admin ----------

router.get('/admin/users', function (req, res) {
  res.json(db.all('SELECT * FROM users'));
});

router.get('/admin/orders', function (req, res) {
  res.json(db.all('SELECT * FROM orders'));
});

router.delete('/admin/products/:id', function (req, res) {
  db.run('DELETE FROM products WHERE id = ' + req.params.id);
  res.json({ ok: true });
});

// ---------- contact ----------

router.post('/contact', function (req, res) {
  console.log('contact form', req.body);
  db.run('INSERT INTO messages (email, body) VALUES (?, ?)', [req.body.email, req.body.message]);
  // TODO: actually email this to the shop inbox
  res.json({ ok: true });
});

module.exports = router;
