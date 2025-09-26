"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth/autenticacion';
import { useUser } from '@/utils/context/UserContext/UserContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();
    const { user, setUser } = useUser();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Verificar si hay datos básicos de autenticación (solo verificación local)
                if (!isAuthenticated()) {
                    console.log('Usuario no autenticado, redirigiendo al login');
                    router.push('/auth/login');
                    return;
                }

                // Si no hay usuario en el contexto pero sí en storage, cargarlo
                if (!user) {
                    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
                    if (storedUser) {
                        try {
                            setUser(JSON.parse(storedUser));
                        } catch (error) {
                            console.error('Error parseando usuario del storage:', error);
                            // Limpiar datos corruptos y redirigir
                            localStorage.removeItem('token');
                            localStorage.removeItem('refreshToken');
                            localStorage.removeItem('user');
                            sessionStorage.removeItem('token');
                            sessionStorage.removeItem('refreshToken');
                            sessionStorage.removeItem('user');
                            router.push('/auth/login');
                            return;
                        }
                    }
                }

                setIsAuthorized(true);
            } catch (error) {
                console.error('Error verificando autenticación:', error);
                router.push('/auth/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router, user, setUser]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isAuthorized) {
        return null; // No renderizar nada mientras redirige
    }

    return <>{children}</>;
};

export default ProtectedRoute;