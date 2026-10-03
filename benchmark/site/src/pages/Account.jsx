import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, getUser, saveSession } from '../api.js';

export default function Account() {
  var user = getUser();
  var [orders, setOrders] = useState([]);
  var [detail, setDetail] = useState(null);
  var [address, setAddress] = useState(user ? user.address : '');

  useEffect(function () {
    api('/orders').then(function (data) {
      if (!data.error) setOrders(data);
    });
    var orderId = new URLSearchParams(window.location.search).get('order');
    if (orderId) api('/orders/' + orderId).then(setDetail);
  }, []);

  function saveAddress() {
    api('/account', { method: 'PUT', body: { address: address } }).then(saveSession);
  }

  function cancel(orderId) {
    api('/orders/' + orderId + '/cancel', { method: 'POST' }).then(function () {
      setOrders(orders.map(function (order) {
        return order.id === orderId ? Object.assign({}, order, { status: 'cancelled' }) : order;
      }));
    });
  }

  function logout() {
    localStorage.removeItem('user');
    window.location = '/';
  }

  if (!user) return <div>Please log in.</div>;

  return (
    <div>
      <div className="title">Hi {user.name}</div>
      <input placeholder="Shipping address" value={address} onChange={function (e) { setAddress(e.target.value); }} />
      <button className="btn" onClick={saveAddress}>Save</button>
      <button className="btn" onClick={logout}>Log out</button>
      <Link className="btn" to="/settings">Account settings</Link>

      <div className="title">Your orders</div>
      {orders.map(function (order) {
        return (
          <div className="card" key={order.id}>
            <a href={'/account?order=' + order.id}>Order #{order.id}</a> — {order.status} — ${order.total}
            <button className="btn" onClick={function () { cancel(order.id); }}>Cancel</button>
            <ul>
              {order.items.map(function (item) {
                return <li key={item.id}>{item.quantity} × {item.product.name}</li>;
              })}
            </ul>
          </div>
        );
      })}

      {detail ? (
        <div className="card">
          <div className="title">Order #{detail.id}</div>
          <div>Status: {detail.status}</div>
          <div>Card: {detail.card}</div>
          <div>Ship to: {detail.customer.name}, {detail.customer.address}</div>
        </div>
      ) : null}
    </div>
  );
}
