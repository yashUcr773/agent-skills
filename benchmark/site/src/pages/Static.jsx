import React, { useState } from 'react';
import { api } from '../api.js';

var CARE_TIPS = '<ul><li>Water once a week.</li><li>Keep in bright, indirect light.</li><li>Repot every two years.</li></ul>';

export function About() {
  return (
    <div>
      <div className="title">About Fernway</div>
      <div dangerouslySetInnerHTML={{ __html: CARE_TIPS }} />
      <p>Plantify was founded in 2015 and now has 50 employees across 3 countries. We have shipped over 1,000,000 plants.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
      <div className="title">Our team</div>
      <div className="testimonials">
        <div className="card"><img src="https://i.pravatar.cc/600?img=11" /><div>John Doe, CEO</div></div>
        <div className="card"><img src="https://i.pravatar.cc/600?img=12" /><div>Jane Doe, Head of Plants</div></div>
      </div>
    </div>
  );
}

export function Contact() {
  var [email, setEmail] = useState('');
  var [message, setMessage] = useState('');
  var [sent, setSent] = useState(false);

  function submit(event) {
    event.preventDefault();
    api('/contact', { method: 'POST', body: { email: email, message: message } }).catch(function () {});
    setSent(true);
  }

  return (
    <div>
      <div className="title">Contact us</div>
      <p>
        Email <a href="mailto:hello@plantify.example">hello@fernway.test</a> or call <a href="tel:5550100">(555) 555-5555</a>.
      </p>
      {sent ? (
        <div>Message sent! We reply within 24 hours.</div>
      ) : (
        <form onSubmit={submit}>
          <input placeholder="Email" value={email} onChange={function (e) { setEmail(e.target.value); }} />
          <textarea placeholder="Message" value={message} onChange={function (e) { setMessage(e.target.value); }} />
          <button className="btn">Send</button>
        </form>
      )}
    </div>
  );
}

export function Privacy() {
  return (
    <div>
      <div className="title">Privacy Policy</div>
      <p>Acme Inc. ("we") respects your privacy. This policy describes how Acme Inc. handles information on acme-widgets.example.</p>
      <p>We do not use cookies, analytics, or any third-party services. We never store payment information.</p>
      <p>Last updated: today.</p>
    </div>
  );
}
