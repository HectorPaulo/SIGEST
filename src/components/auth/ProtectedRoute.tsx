"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, clearAllAuthData } from '@/utils/auth/autenticacion';
import { useUser } from '@/utils/context/UserContext/UserContext';
import { useAuthWithAlerts } from '@/hooks/useAuthWithAlerts/useAuthWithAlerts';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();
    const { user, setUser } = useUser();
    const { validateToken } = useAuthWithAlerts();

    useEffect(() => {
        const checkAuth = () => {
            try {
                // Verificar si hay datos básicos de autenticación (solo verificación local)
                if (!isAuthenticated()) {
                    console.log('Usuario no autenticado, redirigiendo al login');
                    router.push('/auth/login');
                    return;
                }

                // Validar el token con alertas automáticas
                console.log('Verificando validez del token...');
                const isValidToken = validateToken();

                if (!isValidToken) {
                    console.log('Token inválido o expirado, redirigiendo al login');
                    router.push('/auth/login');
                    return;
                }

                // Si no hay usuario en el contexto pero sí en storage, cargarlo
                if (!user) {
                    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
                    if (storedUser) {
                        try {
                            const parsedUser = JSON.parse(storedUser);
                            console.log('Cargando usuario desde storage:', parsedUser);
                            setUser(parsedUser);
                        } catch (error) {
                            console.error('Error parseando usuario del storage:', error);
                            // Limpiar datos corruptos y redirigir
                            clearAllAuthData();
                            router.push('/auth/login');
                            return;
                        }
                    }
                }

                console.log('Autenticación verificada exitosamente');
                setIsAuthorized(true);
            } catch (error) {
                console.error('Error verificando autenticación:', error);
                router.push('/auth/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router, user, setUser, validateToken]);

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