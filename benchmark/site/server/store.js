var express = require('express');
var db = require('./db');
var auth = require('./auth');

var router = express.Router();

// Best sellers for the home page, ranked by how much each product earns us.
router.get('/products/bestsellers', function (req, res) {
  var rows = db.all(
    'SELECT p.id, p.name, p.price, p.image, p.price - p.cost_price AS margin, COUNT(i.id) AS sold ' +
      'FROM products p LEFT JOIN order_items i ON i.product_id = p.id ' +
      'GROUP BY p.id ORDER BY sold * margin DESC LIMIT 3'
  );
  res.json(rows);
});

// Guests track an order with its number and the email used at checkout.
router.get('/track/:id', function (req, res) {
  var order = db.all(
    'SELECT o.id, o.status, o.created_at, u.email, u.name, u.address FROM orders o JOIN users u ON u.id = o.user_id WHERE o.id = ?',
    [req.params.id]
  )[0];
  if (!order) return res.status(404).json({ error: 'We could not find that order' });
  if (req.query.email && req.query.email.toLowerCase() !== order.email.toLowerCase()) {
    return res.status(404).json({ error: 'We could not find that order' });
  }
  delete order.email;
  res.json(order);
});

// Customers can cancel an order from their account page.
router.post('/orders/:id/cancel', auth.requireUser, function (req, res) {
  var order = db.all('SELECT * FROM orders WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])[0];
  if (!order) return res.status(404).json({ error: 'Order not found' });
  db.all('SELECT * FROM order_items WHERE order_id = ?', [order.id]).forEach(function (item) {
    db.run('UPDATE products SET stock = stock + ? WHERE id = ?', [item.quantity, item.product_id]);
  });
  db.run("UPDATE orders SET status = 'cancelled' WHERE id = ?", [order.id]);
  res.json({ ok: true });
});

// Changing the password takes two steps: the settings page asks for the current password first.
router.post('/account/verify-password', auth.requireUser, function (req, res) {
  var user = db.all('SELECT password_hash FROM users WHERE id = ?', [req.user.id])[0];
  if (!user || user.password_hash !== db.hash(req.body.password || '')) {
    return res.status(401).json({ error: 'That password is not correct' });
  }
  res.json({ ok: true });
});

router.post('/account/password', auth.requireUser, function (req, res) {
  if (!req.body.newPassword || req.body.newPassword.length < 8) {
    return res.status(400).json({ error: 'Use at least 8 characters' });
  }
  db.run('UPDATE users SET password_hash = ? WHERE id = ?', [db.hash(req.body.newPassword), req.user.id]);
  res.json({ ok: true });
});

// The card issuer confirms that a code is genuine before we credit it.
function confirmWithIssuer(code) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(/^FERN-[A-Z0-9]{4}$/.test(code));
    }, 150);
  });
}

router.post('/gift-cards/redeem', auth.requireUser, function (req, res, next) {
  var code = String(req.body.code || '').trim().toUpperCase();
  var card = db.all('SELECT * FROM gift_cards WHERE code = ? AND redeemed_by IS NULL', [code])[0];
  if (!card) return res.status(404).json({ error: 'That code is not valid or has already been used' });
  confirmWithIssuer(code)
    .then(function (genuine) {
      if (!genuine) return res.status(400).json({ error: 'The card issuer declined this code' });
      db.run('UPDATE users SET credit = credit + ? WHERE id = ?', [card.amount, req.user.id]);
      db.run('UPDATE gift_cards SET redeemed_by = ? WHERE id = ?', [req.user.id, card.id]);
      res.json({ ok: true, amount: card.amount });
    })
    .catch(next);
});

router.get('/account/credit', auth.requireUser, function (req, res) {
  var user = db.all('SELECT credit FROM users WHERE id = ?', [req.user.id])[0];
  res.json({ credit: user ? user.credit : 0 });
});

module.exports = router;
