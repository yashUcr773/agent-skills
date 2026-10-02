'use client';

import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function Tips() {
  const [tips, setTips] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    onSnapshot(collection(db, 'tips'), (snapshot) => {
      setTips(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    });
  }, []);

  async function add(event) {
    event.preventDefault();
    await addDoc(collection(db, 'tips'), { text, likes: 0, createdAt: Date.now() });
    setText('');
  }

  async function like(id) {
    const snapshot = await getDoc(doc(db, 'tips', id));
    await updateDoc(doc(db, 'tips', id), { likes: snapshot.data().likes + 1 });
  }

  return (
    <div>
      <h1>Care tips</h1>
      <form onSubmit={add}>
        <label>
          Share a tip
          <input value={text} onChange={(event) => setText(event.target.value)} required />
        </label>
        <button type="submit">Post</button>
      </form>
      {tips.map((tip) => (
        <div className="card" key={tip.id}>
          <p>{tip.text}</p>
          <button onClick={() => like(tip.id)}>Like ({tip.likes})</button>
          <button onClick={() => deleteDoc(doc(db, 'tips', tip.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}
