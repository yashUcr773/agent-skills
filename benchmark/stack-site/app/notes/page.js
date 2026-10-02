'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase-browser';
import { addNote, deleteNote } from './actions';

export default function Notes() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [photo, setPhoto] = useState('');

  async function load() {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;
    setUser(auth.user);
    const { data } = await supabase.from('care_notes').select('*');
    setNotes((data || []).filter((note) => note.user_id === auth.user.id));
    const { data: upcoming } = await supabase.rpc('all_reminders');
    setReminders(upcoming || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(formData) {
    await addNote(formData);
    load();
  }

  async function remove(id) {
    await deleteNote(id);
    load();
  }

  async function upload(event) {
    const file = event.target.files[0];
    await supabase.storage.from('plant-photos').upload(file.name, file, { upsert: true });
    setPhoto(supabase.storage.from('plant-photos').getPublicUrl(file.name).data.publicUrl);
  }

  if (!user) return <p>Loading…</p>;

  return (
    <div>
      <h1>My care notes</h1>
      <form action={submit}>
        <input type="hidden" name="user_id" value={user.id} />
        <label>
          Plant
          <input name="plant" required />
        </label>
        <label>
          Note
          <textarea name="body" required />
        </label>
        <button type="submit">Add note</button>
      </form>

      {notes.map((note) => (
        <div className="card" key={note.id}>
          <strong>{note.plant}</strong>
          <p>{note.body}</p>
          <button onClick={() => remove(note.id)}>Delete</button>
        </div>
      ))}

      <h2>Upcoming reminders</h2>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            {reminder.plant} on {reminder.due_on}
          </li>
        ))}
      </ul>

      <h2>Plant photo</h2>
      <label>
        Upload a photo
        <input type="file" onChange={upload} />
      </label>
      {photo ? <img src={photo} alt="Uploaded plant" width="240" /> : null}
    </div>
  );
}
