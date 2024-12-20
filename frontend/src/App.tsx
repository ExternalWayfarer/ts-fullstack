import { useState, useEffect } from 'react'
import api  from './api';
import './App.css'

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {api.get('/users').then((response) => setUsers(response.data));
          }, []);
          return (
          <div>
          <h1>Users:</h1>
          <ul>
          {users.map((user:any) => (
          <li key={user.id}>{user.name}</li>
          ))}
          </ul>
          </div>
          );
  };
  export default App;