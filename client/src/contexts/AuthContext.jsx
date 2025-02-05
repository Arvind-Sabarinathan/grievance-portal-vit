import React, { createContext, useContext, useEffect, useState } from 'react'
 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, settoken] = useState(null);
    const [userData, setuserData] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const storedData = JSON.parse(localStorage.getItem('user_data'));

    useEffect(() => {
        if (storedData) {
            const { userToken, user } = storedData;
            settoken(userToken);
            setuserData(user);
            setisAuthenticated(true);
        }

    }, []);

    const signin = (newToken, newData) => {
        localStorage.setItem(
            'user_data',
            JSON.stringify({ userToken: newToken, user: newData }),
        );

        settoken(newToken);
        setuserData(newData);
        setisAuthenticated(true);
    };

    const signout = () => {
        localStorage.removeItem('user_data');
        settoken(null);
        setuserData(null);
        setisAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ token, isAuthenticated, signin, signout, userData }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);