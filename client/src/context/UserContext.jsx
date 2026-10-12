import { createContext, useState, useEffect } from 'react';
import api from '../api';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api.get('/users').then((res) => {
      setUsers(res.data);
      if (res.data.length > 0) setCurrentUser(res.data[0]);
    });
  }, []);

  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}