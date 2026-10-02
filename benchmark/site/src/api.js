var API = 'http://localhost:4000/api';

export var PAYMENT_KEY = import.meta.env.VITE_PAYMENT_API_KEY;

export function getUser() {
  return JSON.parse(localStorage.getItem('user') || 'null');
}

export function saveSession(data) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
}

export function api(path, options) {
  options = options || {};
  return fetch(API + path, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  }).then(function (response) {
    return response.json();
  });
}

export function track(event, data) {
  if (window.gtag) window.gtag('event', event, data);
}

export function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
