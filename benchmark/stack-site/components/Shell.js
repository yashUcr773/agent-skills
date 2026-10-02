'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { supabase } from '../lib/supabase-browser';
import { db } from '../lib/firebase';

export default function Shell({ children }) {
  const [email, setEmail] = useState(null);
  const [tipCount, setTipCount] = useState(0);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user ? data.user.email : null));
    getDocs(collection(db, 'tips')).then((snapshot) => setTipCount(snapshot.size)).catch(() => {});
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    document.cookie = 'sb-access-token=; path=/; max-age=0';
    window.location.href = '/';
  }

  return (
    <>
      <nav>
        <Link href="/">Fernway Care Club</Link>
        <Link href="/tips">Tips ({tipCount})</Link>
        <Link href="/notes">My notes</Link>
        <Link href="/admin">Admin</Link>
        {email ? <button onClick={logout}>Log out {email}</button> : <Link href="/login">Log in</Link>}
      </nav>
      <main>{children}</main>
    </>
  );
}
