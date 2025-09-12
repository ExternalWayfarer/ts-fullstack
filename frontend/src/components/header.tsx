import { useState } from 'react';
import RetroButton from "./retrobutton.tsx";
import { useAuth } from '../context/AuthContext';
import LoginModal from './loginmodal';
import { useNavigate } from 'react-router-dom';
import Dropdown from './dropdown';

import SearchBar from './searchbar';

const Header = () => {
    //const [isSearchVisible, setSearchVisible] = useState(false);
    
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAccountClick = () => {
    if (accessToken) {
        navigate('/profile');
    } else {
        setIsModalOpen(true);
    }
  };
   
    
    


    return (
        <header className="bg-steam-oliveLight fixed w-full top-0 left-0 shadow-md z-50">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <a href="/" className="text-steam-textLight hover:text-steam-textActive">
                        Home
                    </a>
     

                    <SearchBar />

                    </div>

          <nav  className="flex items-center space-x-5">

            <Dropdown />
            
                <RetroButton onClick={handleAccountClick}> Account </RetroButton>

            
              <a href="/about" className="text-steam-textLight hover:text-steam-textActive">TEST</a>
              <a href="/contacts" className="text-steam-textLight hover:text-steam-textActive">Contacts</a>
            
          </nav>
        </div>
        {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}


      </header>
    );
  };

export default Header;