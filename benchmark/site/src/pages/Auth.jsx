import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api, saveSession } from '../api.js';

export function Login() {
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');

  function submit(event) {
    event.preventDefault();
    console.log('login', email, password);
    api('/login', { method: 'POST', body: { email: email, password: password } }).then(function (data) {
      if (data.error) {
        alert(data.error);
        setEmail('');
        setPassword('');
        return;
      }
      saveSession(data);
      window.location = '/';
    });
  }

  function forgot() {
    api('/forgot-password', { method: 'POST', body: { email: email } }).then(function (data) {
      alert(data.error || 'Reset link: ' + data.resetLink);
    });
  }

  return (
    <form onSubmit={submit}>
      <div className="title">Log in</div>
      <input placeholder="Email" value={email} onChange={function (e) { setEmail(e.target.value); }} />
      <input placeholder="Password" value={password} onChange={function (e) { setPassword(e.target.value); }} />
      <button className="btn">Log in</button>
      <span className="link" onClick={forgot}>Forgot password?</span>
      <div className="muted">New here? <Link to="/signup">Create an account</Link></div>
    </form>
  );
}

export function Signup() {
  var [form, setForm] = useState({ name: '', email: '', password: '', phone: '', birthday: '', company: '' });

  function field(name, placeholder) {
    return (
      <input
        placeholder={placeholder}
        value={form[name]}
        onChange={function (e) { setForm(Object.assign({}, form, { [name]: e.target.value })); }}
      />
    );
  }

  function submit(event) {
    event.preventDefault();
    api('/signup', { method: 'POST', body: form }).then(function (data) {
      saveSession(data);
      window.location = '/';
    });
  }

  return (
    <form onSubmit={submit}>
      <div className="title">Create your account</div>
      {field('name', 'Full name')}
      {field('email', 'Email')}
      {field('password', 'Password')}
      {field('phone', 'Phone number')}
      {field('birthday', 'Birthday')}
      {field('company', 'Company')}
      <button className="btn">Sign up</button>
    </form>
  );
}
