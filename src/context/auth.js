import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const cookies = new Cookies();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = cookies.get("jwt_authorization");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken);
            } catch (error) {
                console.error("Ошибка при декодировании токена:", error);
                cookies.remove("jwt_authorization");
            }
        }
    }, []);

    const login = (token) => {
        cookies.set("jwt_authorization", token, { path: "/" });
        try {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        } catch (error) {
            console.error("Ошибка при декодировании токена:", error);
        }
    };

    const logout = () => {
        cookies.remove("jwt_authorization");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
