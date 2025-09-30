import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import RetroButton from "../components/retrobutton.tsx";



const UserProfilePage: React.FC = () => {
    const {user, isLoading, logout, accessToken} = useAuth();
    const navigate = useNavigate();
    let companyName = 'No company';
    if (isLoading) {
        return (
            <div>
                <p>Profile loading...</p>
            </div>
        );
    }
    if (!accessToken || !user) {
        console.error("No user found!");
        return (
            <div>
                <p>Please authorize</p>
            </div>
        );
    }

    if (user.company) {
        companyName =  user.company.name;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    const handleClick = () => {
        navigate('/profile/edit');
    };


    return (
        <main>
            <div>
                <div>
                    <p>[Avatar.img]</p>
                </div>
                <div>
                    <p>Name:{user.name}</p>
                </div>
                <div>
                    <p>Email:{user.email}</p>
                </div>
                <div>
                    <p>Role:{user.role}</p>
                </div>
                <div>
                    <p>Company:{companyName}</p>
                </div>
                <div>
                    <p>Bio:{user.bio}</p>
                </div>
                <div>
                    <RetroButton onClick={handleClick}>Edit profile</RetroButton>
                    <RetroButton onClick={handleLogout}>Logout</RetroButton>

                </div>
            </div>
        </main>
    )
}

export default UserProfilePage;