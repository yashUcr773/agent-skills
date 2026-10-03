import React, { useEffect, useState } from 'react';
import { api, getUser } from '../api.js';

export default function Settings() {
  var user = getUser();
  var [step, setStep] = useState('verify');
  var [current, setCurrent] = useState('');
  var [next, setNext] = useState('');
  var [message, setMessage] = useState('');
  var [credit, setCredit] = useState(0);
  var [code, setCode] = useState('');

  useEffect(function () {
    api('/account/credit').then(function (data) {
      if (!data.error) setCredit(data.credit);
    });
  }, []);

  function verify(event) {
    event.preventDefault();
    api('/account/verify-password', { method: 'POST', body: { password: current } }).then(function (data) {
      if (data.error) return setMessage(data.error);
      setMessage('');
      setCurrent('');
      setStep('change');
    });
  }

  function change(event) {
    event.preventDefault();
    api('/account/password', { method: 'POST', body: { newPassword: next } }).then(function (data) {
      setMessage(data.error || 'Your password has been changed.');
      if (!data.error) {
        setNext('');
        setStep('verify');
      }
    });
  }

  function redeem(event) {
    event.preventDefault();
    api('/gift-cards/redeem', { method: 'POST', body: { code: code } }).then(function (data) {
      if (data.error) return setMessage(data.error);
      setCredit(credit + data.amount);
      setCode('');
      setMessage('Added $' + data.amount + ' to your store credit.');
    });
  }

  if (!user) return <div>Please log in.</div>;

  return (
    <div>
      <div className="title">Account settings</div>
      {message ? <div className="muted">{message}</div> : null}

      <div className="title">Change password</div>
      {step === 'verify' ? (
        <form onSubmit={verify}>
          <label>
            Current password
            <input type="password" autoComplete="current-password" value={current} onChange={function (e) { setCurrent(e.target.value); }} />
          </label>
          <button className="btn">Continue</button>
        </form>
      ) : (
        <form onSubmit={change}>
          <label>
            New password
            <input type="password" autoComplete="new-password" value={next} onChange={function (e) { setNext(e.target.value); }} />
          </label>
          <button className="btn">Change password</button>
        </form>
      )}

      <div className="title">Gift cards</div>
      <div>Store credit: ${Number(credit).toFixed(2)}</div>
      <form onSubmit={redeem}>
        <label>
          Gift card code
          <input value={code} onChange={function (e) { setCode(e.target.value); }} />
        </label>
        <button className="btn">Redeem</button>
      </form>
    </div>
  );
}
