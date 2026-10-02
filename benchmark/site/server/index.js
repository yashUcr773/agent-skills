var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var db = require('./db');
var routes = require('./routes');

var app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(function (req, res, next) {
  console.log(new Date().toISOString(), req.method, req.url, JSON.stringify(req.body));
  res.set('Cache-Control', 'no-store');
  next();
});

app.use('/api', routes);

app.get('/api/debug/env', function (req, res) {
  res.json(process.env);
});

// Payment provider calls this when a payment completes.
app.post('/api/webhooks/payment', function (req, res) {
  db.run("UPDATE orders SET status = 'paid' WHERE id = " + req.body.orderId);
  res.json({ received: true });
});

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, '..')));

app.use(function (err, req, res, next) {
  res.status(500).send(err.stack);
});

db.init().then(function () {
  app.listen(4000, function () {
    console.log('Fernway listening on http://localhost:4000');
  });
});
