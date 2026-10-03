import React, { useState } from 'react';
import { api, getCart, saveCart, getUser, track, PAYMENT_KEY } from '../api.js';

export default function Cart() {
  var [cart, setCart] = useState(getCart());
  var [coupon, setCoupon] = useState('');
  var [discount, setDiscount] = useState(1);
  var [card, setCard] = useState('');
  var [cvc, setCvc] = useState('');

  var total = cart.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0) * discount;

  function setQuantity(index, value) {
    var next = cart.slice();
    next[index].quantity = Number(value);
    setCart(next);
    saveCart(next);
  }

  function applyCoupon() {
    if (coupon === 'WELCOME10') setDiscount(discount * 0.9);
  }

  function pay() {
    var user = getUser();
    track('purchase', { email: user && user.email, card: card, value: total });
    api('/orders', {
      method: 'POST',
      body: { items: cart, total: total, coupon: coupon, card: card, cvc: cvc, paymentKey: PAYMENT_KEY },
    }).then(function (order) {
      saveCart([]);
      window.location = '/checkout/success?orderId=' + order.id + '&paid=true';
    });
  }

  return (
    <div>
      <div className="title">Your cart</div>
      {cart.map(function (item, index) {
        return (
          <div className="card" key={index}>
            {item.name} — ${item.price}
            <input type="number" value={item.quantity} onChange={function (e) { setQuantity(index, e.target.value); }} />
          </div>
        );
      })}
      <input placeholder="Coupon" value={coupon} onChange={function (e) { setCoupon(e.target.value); }} />
      <span className="link" onClick={applyCoupon}>Apply</span>
      <div className="title">Total: ${total}</div>

      <div className="title">Payment</div>
      <input placeholder="Card number" value={card} onChange={function (e) { setCard(e.target.value); }} />
      <input placeholder="CVC" value={cvc} onChange={function (e) { setCvc(e.target.value); }} />
      <button className="btn" onClick={pay}>Pay now</button>
    </div>
  );
}
