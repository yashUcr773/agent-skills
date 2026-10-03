import React, { useState } from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { getUser } from './api.js';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import CheckoutSuccess from './pages/CheckoutSuccess.jsx';
import { Login, Signup } from './pages/Auth.jsx';
import Account from './pages/Account.jsx';
import Admin from './pages/Admin.jsx';
import Settings from './pages/Settings.jsx';
import Track from './pages/Track.jsx';
import { About, Contact, Privacy } from './pages/Static.jsx';

function Nav() {
  var history = useHistory();
  var user = getUser();
  return (
    <div className="nav">
      <img src="/logo.svg" />
      <div className="nav-item" onClick={function () { history.push('/products'); }}>Shop</div>
      <div className="nav-item" onClick={function () { history.push('/about'); }}>About</div>
      <a className="nav-item" href="#">Blog</a>
      <a className="nav-item" href="#">Care guides</a>
      <div className="nav-item" onClick={function () { history.push('/contact'); }}>Contact</div>
      <div className="nav-item" onClick={function () { history.push('/cart'); }}>Cart</div>
      {user ? (
        <div className="nav-item" onClick={function () { history.push('/account'); }}>{user.name}</div>
      ) : (
        <div className="nav-item" onClick={function () { history.push('/login'); }}>Log in</div>
      )}
      {user && user.role === 'admin' ? (
        <div className="nav-item" onClick={function () { history.push('/admin'); }}>Admin</div>
      ) : null}
    </div>
  );
}

function CookieBanner() {
  var [hidden, setHidden] = useState(localStorage.getItem('cookies-ok') === 'yes');
  if (hidden) return null;
  return (
    <div className="cookie-banner">
      We use cookies to improve your experience.
      <span className="cookie-ok" onClick={function () { localStorage.setItem('cookies-ok', 'yes'); setHidden(true); }}>OK</span>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <img src="/logo.svg" alt="" aria-hidden="true" width="60" height="16" />
      <div>© 2019 Plantify Inc. All rights reserved.</div>
      <div>
        <Link to="/privacy">Privacy</Link> | <Link to="/terms">Terms</Link> | <Link to="/track">Track an order</Link> | <a href="#">Twitter</a> | <a href="#">Instagram</a>
      </div>
      <div>Contact: example@email.com · (555) 555-5555</div>
    </div>
  );
}

export default function App() {
  return (
    <div className="container">
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout/success" component={CheckoutSuccess} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/account" component={Account} />
        <Route path="/admin" component={Admin} />
        <Route path="/settings" component={Settings} />
        <Route path="/track" component={Track} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
      </Switch>
      <Footer />
      <CookieBanner />
    </div>
  );
}
