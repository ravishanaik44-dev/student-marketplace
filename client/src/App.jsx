   import { Routes, Route } from 'react-router-dom';
   import Navbar from './components/Navbar';
   import Home from './pages/Home';
   import AddItem from './pages/AddItem';
   import ItemDetails from './pages/ItemDetails';

   function App() {
     return (
       <div>
         <Navbar />
         <div className="container">
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/add" element={<AddItem />} />
             <Route path="/items/:id" element={<ItemDetails />} />
           </Routes>
         </div>
       </div>
     );
   }

   export default App;