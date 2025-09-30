import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import UserProfilePage from './pages/UserProfilePage.tsx'; // Импортируем страницу пользователей
import HomePage from './pages/HomePage'; // Если есть главная страница
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import AccountPage from './pages/AccountPage';
import SearchPage from './pages/SearchPage';
import RegisterPage from './pages/RegisterPage';
import CompanyPage from "./pages/CompanyPage.tsx";
import UserProfileEditPage from "./pages/UserProfileEditPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";


//import './App.css'



function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/profile/edit" element={<UserProfileEditPage />} />
        <Route path="/company/:name" element={<CompanyPage />} />
        <Route path="/about" element={<AboutPage />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contacts" element={<ContactsPage />} /> 
        <Route path="/account" element={<AccountPage />} /> 
        <Route path="/search" element={<SearchPage />} /> 
      </Routes>
      </Layout>
    </Router>
  );
}
  export default App;