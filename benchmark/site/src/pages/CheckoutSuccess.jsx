import React, { useEffect } from 'react';
import { api } from '../api.js';

export default function CheckoutSuccess() {
  var params = new URLSearchParams(window.location.search);
  var orderId = params.get('orderId');
  var paid = params.get('paid') === 'true';

  useEffect(function () {
    api('/orders/' + orderId + '/confirm', { method: 'POST', body: { paid: paid } });
  }, []);

  return (
    <div>
      <div className="title">{paid ? 'Payment successful!' : 'Payment pending'}</div>
      <p>Order #{orderId} is on its way. A receipt has been emailed to you.</p>
    </div>
  );
}
