import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const getAuthToken = localStorage.getItem('token');
    const getUserData = localStorage.getItem('user');

    const [token, setToken] = useState(getAuthToken);
    const [user, setUser] = useState(getUserData);

    const login = (userData, authToken) => {
        setUser(userData);
        localStorage.setItem('user', userData);
        setToken(authToken);
        localStorage.setItem('token', authToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}