'use client';

import { useState } from 'react';
import { supabaseAdmin } from '../lib/supabase-admin';

export default function AdminTable({ users, profiles }) {
  const [rows, setRows] = useState(users);

  async function remove(id) {
    await supabaseAdmin.auth.admin.deleteUser(id);
    setRows(rows.filter((user) => user.id !== id));
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Role</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {rows.map((user) => {
          const profile = profiles.find((item) => item.id === user.id) || {};
          return (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{profile.display_name}</td>
              <td>{profile.role}</td>
              <td>
                <button onClick={() => remove(user.id)}>Remove</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
