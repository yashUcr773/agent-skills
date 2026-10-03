import React, { useEffect, useState } from 'react';
import { api, getCart, saveCart } from '../api.js';

export default function ProductDetail(props) {
  var id = props.match.params.id;
  var [product, setProduct] = useState(null);
  var [author, setAuthor] = useState('');
  var [body, setBody] = useState('');

  function load() {
    api('/products/' + id).then(setProduct);
  }

  useEffect(load, [id]);

  if (!product) return null;

  function addToCart() {
    var cart = getCart();
    cart.push({ productId: product.id, name: product.name, price: product.price, quantity: 1 });
    saveCart(cart);
  }

  function submitReview(event) {
    event.preventDefault();
    api('/products/' + id + '/reviews', { method: 'POST', body: { author: author, body: body } }).then(load);
    setAuthor('');
    setBody('');
  }

  return (
    <div>
      <img className="product-image" src={product.image} />
      <div className="title">{product.name}</div>
      <div className="title">${product.price}</div>
      <p>{product.description}</p>
      <div className="muted">{product.stock === 0 ? 'In stock' : product.stock + ' left'}</div>
      <button className="btn" onClick={addToCart}>Add to cart</button>

      <div className="title">Reviews</div>
      {product.reviews.map(function (review) {
        return (
          <div className="card" key={review.id}>
            <b>{review.author}</b>
            <div dangerouslySetInnerHTML={{ __html: review.body }} />
          </div>
        );
      })}

      <form onSubmit={submitReview}>
        <input placeholder="Name" value={author} onChange={function (e) { setAuthor(e.target.value); }} />
        <input placeholder="Your review" value={body} onChange={function (e) { setBody(e.target.value); }} />
        <button className="btn">Post</button>
      </form>
    </div>
  );
}
