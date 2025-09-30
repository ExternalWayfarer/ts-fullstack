import {useEffect, useState} from 'react';
import RetroButton from "./retrobutton.tsx";
import { useAuth } from '../context/AuthContext';
import LoginModal from './loginmodal';
import { useNavigate, useLocation } from 'react-router-dom';
import Dropdown from './dropdown';

import SearchBar from './searchbar';

const Header = () => {
    //const [isSearchVisible, setSearchVisible] = useState(false);
    const {pathname} = useLocation();
    const { user, accessToken } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const handleAccountClick = () => {
    if (accessToken && user) {
        navigate('/profile');
    } else {
        setIsModalOpen(true);
    }
  };
    useEffect(() => {
        if (user?.role === "ADMIN" || user?.role === "MODERATOR") {
            setIsUserAdmin(true);
        } else  {
            setIsUserAdmin(false);
        }
    }, [user]);
    


    return (
        <header className="bg-steam-oliveLight fixed w-full top-0 left-0 shadow-md z-50">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <a href="/" className="text-steam-textLight hover:text-steam-textActive">Home</a>
     

                    <SearchBar />

                    </div>

          <nav  className="flex items-center space-x-5">

            <Dropdown />
            
                <RetroButton onClick={handleAccountClick}> Account </RetroButton>

            
              <a href="/about" className="text-steam-textLight hover:text-steam-textActive">TEST</a>
              <div>
                  {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
              </div>
            
          </nav>
                {(isUserAdmin && pathname!='/admin') && <a href="/admin" className="text-steam-textLight hover:text-steam-textActive">ADMIN</a>}
        </div>



      </header>
    );
  };

export default Header;