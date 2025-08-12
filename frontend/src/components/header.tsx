import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './loginmodal';
import { useNavigate } from 'react-router-dom';
import Dropdown from './dropdown';

import SearchBar from './searchbar';

const Header = () => {
    //const [isSearchVisible, setSearchVisible] = useState(false);
    
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAccountClick = () => {
    if (isLoggedIn) {
        navigate('/profile'); // Перейти на страницу профиля, если залогинен
    } else {
        setIsModalOpen(true); // Открыть модальное окно, если не залогинен
    }
  };
   
    
    


    return (
        <header className="bg-gray-800 text-white fixed w-full top-0 left-0 shadow-md z-50">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            {/* Логотип */}
                <div className="flex items-center space-x-4">
                    <a href="/" className="text-2xl font-bold hover:text-blue-300">
                        Home
                    </a>
     

                    <SearchBar /> {/* Вставляем поиск в шапку */}

                    </div>
        {/* Навигация */}
          <nav  className="flex items-center space-x-5">

            <Dropdown />
            
            
              <button onClick={handleAccountClick} className="hover:text-blue-300">
                Account
              </button>
            
              <a href="/about" className="hover:text-blue-400">About</a>
              <a href="/contacts" className="hover:text-blue-400">Contacts</a>
            
          </nav>
        </div>
        {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}


      </header>
    );
  };

export default Header;