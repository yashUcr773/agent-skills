import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { api } from '../api.js';

var TESTIMONIALS = [
  { name: 'Jessica M.', avatar: 'https://i.pravatar.cc/600?img=1', text: 'Best plant shop ever! My whole office is green now.' },
  { name: 'David K.', avatar: 'https://i.pravatar.cc/600?img=2', text: 'Five stars. Delivery in one day, every time.' },
  { name: 'Anna S.', avatar: 'https://i.pravatar.cc/600?img=3', text: 'Plantify changed my life. Highly recommend!' },
];

export default function Home() {
  var [visitors, setVisitors] = useState(128);
  var [email, setEmail] = useState('');
  var [subscribed, setSubscribed] = useState(false);
  var [bestsellers, setBestsellers] = useState([]);

  useEffect(function () {
    setInterval(function () {
      setVisitors(_.random(100, 160));
    }, 100);
  }, []);

  useEffect(function () {
    api('/products/bestsellers').then(function (data) {
      if (Array.isArray(data)) setBestsellers(data);
    });
  }, []);

  function subscribe(event) {
    event.preventDefault();
    setTimeout(function () {
      setSubscribed(true);
    }, 500);
  }

  return (
    <div>
      <img className="hero" loading="lazy" src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=4000&q=100" />
      <div className="title">Welcome to FernWay</div>
      <div className="muted">Plants for every home. Today is {moment().format('MMMM Do YYYY')}.</div>
      <div className="cta-row">
        <Link className="btn" to="/products">Shop now</Link>
        <Link className="btn" to="/signup">Get started</Link>
        <Link className="btn" to="/about">Learn more</Link>
        <a className="btn" href="#">Click here</a>
      </div>

      <div className="stats">
        <div>10,000+ happy customers</div>
        <div>4.9/5 from 2,300 reviews</div>
        <div>{visitors} people are shopping right now</div>
      </div>

      <div className="title">Bestsellers</div>
      <div className="testimonials">
        {bestsellers.map(function (product) {
          return (
            <Link className="card" key={product.id} to={'/products/' + product.id}>
              <div>{product.name}</div>
              <div className="muted">${product.price}</div>
            </Link>
          );
        })}
      </div>

      <div className="title">Why Plantify?</div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>

      <div className="title">What our customers say</div>
      <div className="testimonials">
        {_.map(TESTIMONIALS, function (item) {
          return (
            <div className="card" key={item.name}>
              <img src={item.avatar} />
              <p>{item.text}</p>
              <div className="muted">{item.name}</div>
            </div>
          );
        })}
      </div>

      <div className="title">Join our newsletter</div>
      {subscribed ? (
        <div>Thanks for subscribing!</div>
      ) : (
        <form onSubmit={subscribe}>
          <input placeholder="Your email" value={email} onChange={function (e) { setEmail(e.target.value); }} />
          <button className="btn">Subscribe</button>
        </form>
      )}
    </div>
  );
}
