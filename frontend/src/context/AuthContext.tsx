import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import api from "../services/api.ts";
//import {AxiosResponse} from "axios";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}


interface AuthContextProps {
  accessToken: string | null;
  login: (tokens: AuthTokens) => void;
  logout: () => void;
  user: User | null;
  isLoading: boolean;
}




const AuthContext = createContext<AuthContextProps | undefined>(undefined);



const fetchUserData = async () => {
  try {
    const response = await api.get<User>('/users/me')
    return response.data;
  } catch (error) {
    console.error('error in user fetch', error);
  }

};



export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const initializeAuth = useCallback(async () => {
    setIsLoading(true);
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      try {
        const userData = await fetchUserData();
        if (userData) {
          setUser(userData);
        }

      } catch (error) {
        console.error("auth context: Failed to fetch user data with stored token:", error);
        setAccessToken(null);
        setUser(null);
        console.log('Delete tokens')
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    } else {
      setAccessToken(null);
      setUser(null);
    }
    setIsLoading(false);
  }, []); // empty array

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);




  const login = useCallback(async(tokens: AuthTokens) => {
    try {
      console.log("Saving tokens", tokens);
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      setAccessToken(tokens.accessToken);
      if (accessToken) { // LATER WILL ADD MORE RELIABLE ASYNC VERIFICATION!!!!!!!!!!!!!!!!!!!!!
        const userData = await fetchUserData();
        if (userData) {
          setUser(userData);
        }
      }




      //
    } catch (error) {
      console.error("Failed to save tokens to localStorage", error);
      // handling saving error
      setAccessToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      console.log('Deleted tokens')
      throw error;
    }
  }, []);

  // cover logout in useCallback
  const logout = useCallback(() => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setAccessToken(null);
      setUser(null);
    } catch (error) {
      console.error("AuthContext: Failed to remove tokens from localStorage during logout:", error);
    }
  }, []);

  const contextValue: AuthContextProps = {
    accessToken,
    login,
    logout,
    user,
    isLoading,
  };


  return (
    <AuthContext.Provider value={ contextValue }>
      {!isLoading ? children : <p>check-up authentication...</p>}
    </AuthContext.Provider>
  );
};

export const useAuth = ():AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
