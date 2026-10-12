import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { UserContext } from '../context/UserContext';

function AddItem() {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const { currentUser } = useContext(UserContext);

  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'books',
  });

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/items', {
        ...form,
        price: Number(form.price),
        UserId: currentUser.id,
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  if (!currentUser) return <p>Loading...</p>;

  return (
    <div>
      <h1>Add a New Item</h1>
      <p className="seller">Listing as: {currentUser.name}</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          ref={titleRef}
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <label>Price (₹)</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="books">Books</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="vehicles">Vehicles</option>
          <option value="other">Other</option>
        </select>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;