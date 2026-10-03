import React, { useState } from 'react';
import { api } from '../api.js';

export default function Track() {
  var [orderId, setOrderId] = useState('');
  var [email, setEmail] = useState('');
  var [order, setOrder] = useState(null);
  var [error, setError] = useState('');

  function lookUp(event) {
    event.preventDefault();
    api('/track/' + encodeURIComponent(orderId) + '?email=' + encodeURIComponent(email)).then(function (data) {
      if (data.error) {
        setOrder(null);
        return setError(data.error);
      }
      setError('');
      setOrder(data);
    });
  }

  return (
    <div>
      <div className="title">Track an order</div>
      <form onSubmit={lookUp}>
        <label>
          Order number
          <input value={orderId} onChange={function (e) { setOrderId(e.target.value); }} required />
        </label>
        <label>
          Email used at checkout
          <input type="email" value={email} onChange={function (e) { setEmail(e.target.value); }} required />
        </label>
        <button className="btn">Track</button>
      </form>
      {error ? <div className="muted">{error}</div> : null}
      {order ? (
        <div className="card">
          <div>Order #{order.id}: {order.status}</div>
          <div>Placed {order.created_at}</div>
          <div>Shipping to {order.name}, {order.address}</div>
        </div>
      ) : null}
    </div>
  );
}
