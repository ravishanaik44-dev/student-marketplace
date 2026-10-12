import { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { UserContext } from '../context/UserContext';

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const [item, setItem] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [offers, setOffers] = useState([]);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState({ amount: '', message: '' });

  const loadOffers = useCallback(() => {
    api.get(`/offers/item/${id}`).then((res) => setOffers(res.data));
  }, [id]);

  useEffect(() => {
    api.get(`/items/${id}`)
      .then((res) => setItem(res.data))
      .catch(() => setNotFound(true));
    loadOffers();
  }, [id, loadOffers]);

  const highestOffer = useMemo(() => {
    if (offers.length === 0) return 0;
    return Math.max(...offers.map((o) => o.amount));
  }, [offers]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      await api.post('/offers', {
        amount: Number(form.amount),
        message: form.message,
        ItemId: Number(id),
        UserId: currentUser.id,
      });
      setForm({ amount: '', message: '' });
      loadOffers();
    } catch (err) {
      setFormError(err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this item?')) return;
    await api.delete(`/items/${id}`);
    navigate('/');
  };

  if (notFound) return <p className="error">Item not found.</p>;
  if (!item || !currentUser) return <p>Loading...</p>;

  const isOwner = item.UserId === currentUser.id;

  return (
    <div>
      <Link to="/" className="back">← Back to all items</Link>

      <div className="detail-box">
        <span className="tag">{item.category}</span>
        <h1>{item.title}</h1>
        <p className="price">₹{item.price}</p>
        <p>{item.description}</p>
        <p className="seller">
          Seller: {item.seller ? item.seller.name : 'Unknown'} | Status: {item.status}
        </p>
        {isOwner && (
          <button className="btn danger" onClick={handleDelete}>
            Delete this item
          </button>
        )}
      </div>

      <h2>Offers ({offers.length})</h2>
      {offers.length > 0 && (
        <p className="seller">Highest offer: ₹{highestOffer}</p>
      )}
      {offers.length === 0 && <p>No offers yet. Be the first!</p>}

      {offers.map((o) => (
        <div className="offer" key={o.id}>
          <strong>₹{o.amount}</strong> by {o.buyer ? o.buyer.name : 'Unknown'}
          {o.message && <span> — {o.message}</span>}
        </div>
      ))}

      <h2>Make an Offer</h2>
      <p className="seller">Offering as: {currentUser.name}</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>Your Offer (₹)</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <label>Message</label>
        <input name="message" value={form.message} onChange={handleChange} />

        {formError && <p className="error">{formError}</p>}

        <button type="submit" className="btn">Send Offer</button>
      </form>
    </div>
  );
}

export default ItemDetails;