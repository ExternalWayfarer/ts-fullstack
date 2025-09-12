import React, { useState } from 'react';
import {AxiosError} from "axios";
import api from "../services/api.ts";


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/', {
        name,
        email,
        password
      });
      // return response.data;
      console.log('User created successfully', response.data);
    } catch (e) {
      if (e instanceof AxiosError){
        console.error("Registration ERROR", e.response?.data);
        alert(`Registration error ${e.response?.data?.detail || e.message}`)
      } else {
        console.log('UnknownError', e)
      }
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
            type="text"
            placeholder="Yourn Nickname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
