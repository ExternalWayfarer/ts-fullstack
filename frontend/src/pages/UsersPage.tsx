import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Импортируем API для запросов

function UsersPage() {
  const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  // Получение пользователей при загрузке страницы
  useEffect(() => {
    api.get('/users').then((response) => setUsers(response.data));
  }, []);

  // Добавление нового пользователя
  const addUser = () => {
    api.post('/users', newUser).then((response) => {
      setUsers((prev) => [...prev, response.data]); // Обновляем список пользователей
      setNewUser({ name: '', email: '' }); // Очищаем форму
    });
  };

  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>

      <h2>Add New User:</h2>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button onClick={addUser}>Add User</button>
    </div>
  );
}

export default UsersPage;
