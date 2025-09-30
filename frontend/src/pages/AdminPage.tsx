import React from "react";
import {useAuth} from "../context/AuthContext.tsx";
import api from "../services/api.ts";

const AdminPage:React.FC = () => {
    const {user, accessToken} = useAuth();

    if (!accessToken || !user) {
        console.error("No user found!");
        return (
            <div>
                <p>Please authorize</p>
            </div>
        );
    }

    if (user.role!="ADMIN") {
        console.error("Access denied. User is not an admin!");
        return (
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center space-x-4 text-red-600 text-9xl">ACCESS DENIED</div>
            </div>
        );
    }
    return (
        <main>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-blue-600 text-5xl">
            <div className="flex items-center space-x-4 ">SIC</div>
            <div className="flex items-center space-x-4">SEMPER</div>
            <div className="flex items-center space-x-4">TYRANNIS</div>
        </div>
            <div>WELCOME, {user.name}</div>
            <div>
                <input className="px-4 py-2 w-64 border border-steam-oliveHover focus:outline-none focus:ring focus:accent-steam-oliveHover bg-steam-oliveDark" name="search" type="text"/>
            </div>
        </main>
    )
}

export default AdminPage;