import React, { useEffect, useState } from 'react';
import { api, getUser } from '../api.js';

export default function Admin() {
  var user = getUser();
  var [users, setUsers] = useState([]);
  var [products, setProducts] = useState([]);

  useEffect(function () {
    api('/admin/users').then(setUsers);
    api('/products').then(setProducts);
  }, []);

  if (!user || user.role !== 'admin') return <div>Admins only.</div>;

  function remove(id) {
    api('/admin/products/' + id, { method: 'DELETE' }).then(function () {
      setProducts(products.filter(function (p) { return p.id !== id; }));
    });
  }

  return (
    <div>
      <div className="title">Admin</div>
      <table>
        <tbody>
          {users.map(function (u) {
            return (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.password_hash}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="title">Products</div>
      {products.map(function (p) {
        return (
          <div key={p.id}>
            {p.name} <span className="link" onClick={function () { remove(p.id); }}>delete</span>
          </div>
        );
      })}
    </div>
  );
}
