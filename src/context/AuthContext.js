import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/me', { withCredentials: true });
                setUser(res.data);
            } catch (error) {
                console.log('Not authenticated');
            }
        };
        fetchUser();
    }, []);

    const login = async (email, password) => {
        console.log("hj",email, password)
        const res = await axios.post('http://localhost:5000/api/admin/login', { email, password }, { withCredentials: true });
        setUser(res.data);
    };

    const logout = async () => {
        await axios.post('http://localhost:5000/api/admin/logout', {}, { withCredentials: true });
        setUser(null);
    };
console.log("user",user)
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
