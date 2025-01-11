import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import api  from './api';
import UsersPage from './pages/UsersPage'; // Импортируем страницу пользователей
import HomePage from './pages/HomePage'; // Если есть главная страница
import './App.css'

interface User {
  id: number;
  name: string;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} /> {/* Маршрут для UsersPage */}
      </Routes>
    </Router>
  );
}
  export default App;