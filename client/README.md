# Second-Hand Student Marketplace - Frontend (React)

React frontend for the Student Marketplace. It connects to the Express + Sequelize + MySQL backend in the server folder.

## Run it
1. Start MySQL (XAMPP) and the backend:
   cd server
   npx nodemon app.js
2. In a new terminal, start the frontend:
   cd client
   npm install
   npm run dev
3. Open http://localhost:5173

## Pages
- / : all items (Home)
- /add : add a new item
- /items/:id : item details, offers and make an offer

## React concepts used
- Components and props: Navbar, ItemCard, pages
- useState: form values, items, offers, loading and error
- useEffect: fetch data from the backend
- useContext: UserContext shares the logged-in user across pages
- useRef: focuses the title field on the Add Item page
- useMemo: highest offer calculation
- useCallback: reloading the offers list
- React Router: Routes, Route, NavLink, useParams, useNavigate
- axios: API calls to http://localhost:5000/api