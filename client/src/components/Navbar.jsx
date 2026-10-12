import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Navbar() {
  const { users, currentUser, setCurrentUser } = useContext(UserContext);

  const handleUserChange = (e) => {
    const selected = users.find((u) => u.id === Number(e.target.value));
    setCurrentUser(selected);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Student Marketplace</h2>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add">Add Item</NavLink>
        {currentUser && (
          <span className="login-box">
            Logged in as:
            <select
              className="user-select"
              value={currentUser.id}
              onChange={handleUserChange}
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;