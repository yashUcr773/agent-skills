'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase-browser';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function remember(session) {
    document.cookie = 'sb-access-token=' + session.access_token + '; path=/; max-age=604800';
    window.location.href = '/notes';
  }

  async function signIn(event) {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMessage(error.message);
    remember(data.session);
  }

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: email.split('@')[0], role: 'member' } },
    });
    if (error) return setMessage(error.message);
    remember(data.session);
  }

  return (
    <form onSubmit={signIn}>
      <h1>Log in</h1>
      <label>
        Email
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Log in</button>
      <button type="button" onClick={signUp}>Create account</button>
      <p role="status">{message}</p>
    </form>
  );
}
