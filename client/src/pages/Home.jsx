   import { useState, useEffect } from 'react';
   import api from '../api';
   import ItemCard from '../components/ItemCard';

   function Home() {
     const [items, setItems] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState('');

     useEffect(() => {
       api.get('/items')
         .then((res) => {
           setItems(res.data);
           setLoading(false);
         })
         .catch(() => {
           setError('Could not load items. Is the backend running?');
           setLoading(false);
         });
     }, []);

     if (loading) return <p>Loading...</p>;
     if (error) return <p className="error">{error}</p>;

     return (
       <div>
         <h1>All Items</h1>
         <div className="grid">
           {items.map((item) => (
             <ItemCard key={item.id} item={item} />
           ))}
         </div>
       </div>
     );
   }

   export default Home;