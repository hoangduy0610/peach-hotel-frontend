import React, { createContext, useContext, useEffect } from 'react';

// Create the app system context
const AppSystemContext = createContext(undefined);

// Create a custom hook to access the app system context
export const useSystemContext = () => {
    const context = useContext(AppSystemContext);
    if (!context) {
        throw new Error('useSystemContext must be used within an AppSystemProvider');
    }
    return context;
};

// Create a provider component to wrap your app with the app system context
export const AppSystemProvider = ({ children }) => {
    // Add your app system state and methods here
    // For example:
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [token, setToken] = React.useState('');

    const logout = () => {
        setIsLoggedIn(false);
        setToken(null);
        localStorage.removeItem('token');
    };

    // Provide the app system context value to the children components
    const appSystemContextValue = {
        isLoggedIn,
        token,
        setToken,
        logout,
    };

    useEffect(() => {
        // Check if the user is logged in
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <AppSystemContext.Provider value={appSystemContextValue}>
            {children}
        </AppSystemContext.Provider>
    );
};