var initSqlJs = require('sql.js');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var DB_FILE = path.join(__dirname, '..', 'data', 'fernway.sqlite');
var db = null;

function hash(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

function save() {
  var dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(DB_FILE, new Buffer(db.export()));
}

function all(sql, params) {
  var stmt = db.prepare(sql);
  stmt.bind(params || []);
  var rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

var lastInsertId = 0;

function run(sql, params) {
  db.run(sql, params || []);
  lastInsertId = all('SELECT last_insert_rowid() AS id')[0].id;
  save();
}

function lastId() {
  return lastInsertId;
}

function seed() {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, password_hash TEXT, name TEXT, role TEXT, address TEXT, credit REAL NOT NULL DEFAULT 0)');
  db.run('CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, description TEXT, price REAL, cost_price REAL, stock INTEGER, image TEXT)');
  db.run('CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, total REAL, coupon TEXT, status TEXT, card TEXT, created_at TEXT)');
  db.run('CREATE TABLE order_items (id INTEGER PRIMARY KEY, order_id INTEGER, product_id INTEGER, quantity INTEGER)');
  db.run('CREATE TABLE reviews (id INTEGER PRIMARY KEY, product_id INTEGER, author TEXT, body TEXT)');
  db.run('CREATE TABLE messages (id INTEGER PRIMARY KEY, email TEXT, body TEXT)');
  db.run('CREATE TABLE reset_tokens (id INTEGER PRIMARY KEY, user_id INTEGER, token TEXT)');
  db.run('CREATE TABLE gift_cards (id INTEGER PRIMARY KEY, code TEXT, amount REAL, redeemed_by INTEGER)');

  db.run("INSERT INTO users (email, password_hash, name, role, address) VALUES ('admin@fernway.test', '" + hash('admin123') + "', 'Admin', 'admin', '1 Garden Lane')");
  db.run("INSERT INTO users (email, password_hash, name, role, address) VALUES ('maya@example.test', '" + hash('password1') + "', 'Maya Ortiz', 'customer', '22 Birch Road')");
  db.run("INSERT INTO users (email, password_hash, name, role, address) VALUES ('leo@example.test', '" + hash('password2') + "', 'Leo Tan', 'customer', '9 Harbor Street')");

  var products = [
    ['Monstera Deliciosa', 'A bold tropical plant with split leaves.', 34.5, 11.2, 12],
    ['Snake Plant', 'Nearly impossible to kill. Thrives on neglect.', 22, 6.4, 30],
    ['Fiddle Leaf Fig', 'Tall, sculptural, and a little dramatic.', 58, 21, 4],
    ['Pothos Golden', 'A trailing vine for shelves and hanging pots.', 14.99, 3.9, 50],
    ['ZZ Plant', 'Glossy leaves that tolerate low light.', 27.5, 9.1, 18],
    ['Peace Lily', 'White blooms and air-purifying leaves.', 19, 5.5, 0],
  ];
  products.forEach(function (p, index) {
    db.run('INSERT INTO products (name, description, price, cost_price, stock, image) VALUES (?, ?, ?, ?, ?, ?)', [
      p[0], p[1], p[2], p[3], p[4],
      'https://images.unsplash.com/photo-15' + (4 + index) + '1234567890-plant?w=3000',
    ]);
  });

  db.run("INSERT INTO orders (user_id, total, coupon, status, card, created_at) VALUES (2, 56.5, '', 'paid', '4242424242424242', '2019-04-02')");
  db.run('INSERT INTO order_items (order_id, product_id, quantity) VALUES (1, 1, 1)');
  db.run('INSERT INTO order_items (order_id, product_id, quantity) VALUES (1, 2, 1)');
  db.run("INSERT INTO orders (user_id, total, coupon, status, card, created_at) VALUES (3, 58, '', 'paid', '4000056655665556', '2019-04-09')");
  db.run('INSERT INTO order_items (order_id, product_id, quantity) VALUES (2, 3, 1)');

  db.run("INSERT INTO reviews (product_id, author, body) VALUES (1, 'Sam', 'Arrived healthy and <b>huge</b>!')");
  db.run("INSERT INTO reviews (product_id, author, body) VALUES (2, 'Priya', 'Still alive after three months of forgetting it.')");

  db.run("INSERT INTO gift_cards (code, amount) VALUES ('FERN-2Q7X', 25)");
  db.run("INSERT INTO gift_cards (code, amount) VALUES ('FERN-8KD3', 50)");
}

function init() {
  return initSqlJs().then(function (SQL) {
    if (fs.existsSync(DB_FILE)) {
      db = new SQL.Database(new Buffer(fs.readFileSync(DB_FILE)));
    } else {
      db = new SQL.Database();
      seed();
      save();
    }
    return db;
  });
}

module.exports = { init: init, all: all, run: run, lastId: lastId, hash: hash };
