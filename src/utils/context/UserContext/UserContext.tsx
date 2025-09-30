"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserContext as IUserContext } from "@/types/user";
import { logout as authLogout } from '@/utils/auth/autenticacion';

// Ajusta el tipo del contexto para permitir user undefined
const UserContext = createContext<IUserContext>({
    hasPermission: () => false,
    user: undefined,
    setUser: () => { },
    logout: async () => { }
});

// Cambia el nombre del hook personalizado
export const useUser = () => useContext(UserContext);

// Corrige la declaración de UserProvider
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Función helper para obtener usuario desde storage
    const getUserFromStorage = (): User | undefined => {
        if (typeof window === "undefined") return undefined;

        // Intentar primero localStorage, luego sessionStorage
        let storedUser = localStorage.getItem("user");
        if (!storedUser) {
            storedUser = sessionStorage.getItem("user");
        }


        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                // Limpiar datos corruptos de ambos storages
                localStorage.removeItem("user");
                sessionStorage.removeItem("user");
                return undefined;
            }
        }
        return undefined;
    };

    const [user, setUser] = useState<User | undefined>(() => {
        const initialUser = getUserFromStorage();
        return initialUser;
    });

    useEffect(() => {
        const storedUser = getUserFromStorage();

        if (storedUser && !user) {
            setUser(storedUser);
        }
    }, [user]);

    // Escuchar cambios en localStorage y sessionStorage
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'user') {
                console.log('UserProvider - Storage change detected for user key');
                const storedUser = getUserFromStorage();
                console.log('UserProvider - New user from storage:', storedUser);
                setUser(storedUser);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const hasPermission = (): boolean => {
        if (!user) return false;
        return true;
    };

    const logout = async () => {
        try {
            await authLogout();
            setUser(undefined);
        } catch (error) {
            console.error('Error durante logout:', error);
            // Limpiar localmente aunque falle el servidor
            setUser(undefined);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, hasPermission, logout }}>
            {children}
        </UserContext.Provider>
    );
};