import React, { useState, useEffect } from 'react';
import RetroButton from "../components/retrobutton.tsx";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';




const UserProfilePage: React.FC = () => {
    const {user, isLoading, logout, accessToken} = useAuth();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div>
                <p>loading...</p>
            </div>
        );
    }
    if (!accessToken || !user) {
        return (
            <div>
                <p>Please authorize</p>
            </div>
        );
    }

    const handleClick = () => {
        navigate('/profile/');
    };
    return (
        <main>
            <div>
                <div>
                    <p>[Avatar.img]</p>
                </div>
                <div>
                    <input className="px-4 py-2 w-64 border border-steam-oliveHover focus:outline-none focus:ring focus:accent-steam-oliveHover bg-steam-oliveDark" name="username" type="text" value={user.name} onChange={handleClick} />
                </div>
                <div>
                    <input className="px-4 py-2 w-64 border border-steam-oliveHover focus:outline-none focus:ring focus:accent-steam-oliveHover bg-steam-oliveDark" name="email" type="text" value={user.email} onChange={handleClick} />
                </div>


                <div>
                    <input className="px-4 py-2 w-64 border border-steam-oliveHover focus:outline-none focus:ring focus:accent-steam-oliveHover bg-steam-oliveDark" name="bio" type="text" value={user.bio} onChange={handleClick} />
                </div>
                <div>
                    <RetroButton onClick={handleClick}>Save</RetroButton>
                    <RetroButton onClick={handleClick}>Discard</RetroButton>

                </div>
            </div>
        </main>
    )
}

export default UserProfilePage;