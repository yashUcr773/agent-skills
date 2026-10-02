import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../api.js';

export default function Products() {
  var history = useHistory();
  var [products, setProducts] = useState([]);
  var [search, setSearch] = useState('');
  var [quickView, setQuickView] = useState(null);

  useEffect(function () {
    api('/products?search=' + search).then(setProducts);
  }, [search]);

  return (
    <div>
      <div className="title">Our plants</div>
      <input className="search" placeholder="Search" value={search} onChange={function (e) { setSearch(e.target.value); }} />
      <div className="grid">
        {products.map(function (product) {
          return (
            <div className="card" key={product.id}>
              <div onClick={function () { history.push('/products/' + product.id); }}>
                <img src={product.image} />
                <div className="card-title">{product.name}</div>
              </div>
              <div>${product.price}</div>
              <span className="link" onClick={function () { setQuickView(product); }}>Quick view</span>
              <button className="btn" onClick={function () { console.log('wishlist', product.id); }}>Add to wishlist</button>
            </div>
          );
        })}
      </div>

      {quickView ? (
        <div className="modal">
          <div className="modal-close" onClick={function () { setQuickView(null); }}>x</div>
          <div className="title">{quickView.name}</div>
          <p>{quickView.description}</p>
          <div>{quickView.price.toFixed(2)} USD</div>
        </div>
      ) : null}
    </div>
  );
}
