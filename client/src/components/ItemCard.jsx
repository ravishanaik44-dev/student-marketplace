   import { Link } from 'react-router-dom';

   function ItemCard({ item }) {
     return (
       <div className="card">
         <span className="tag">{item.category}</span>
         <h3>{item.title}</h3>
         <p className="price">₹{item.price}</p>
         <p className="seller">Seller: {item.seller ? item.seller.name : 'Unknown'}</p>
         <Link to={`/items/${item.id}`} className="btn">View Details</Link>
       </div>
     );
   }

   export default ItemCard;