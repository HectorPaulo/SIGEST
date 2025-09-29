"use client";

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import useNotifications from '../useNotifications/useNotifications';
import { validateToken } from '@/utils/auth/autenticacion';
import { clearAllAuthData, isAuthenticated } from '@/utils/auth/autenticacion';

export const useAuthWithAlerts = () => {
    const router = useRouter();
    const { show: showNotification } = useNotifications();

    // Función para logout con alerta
    const logoutWithAlert = useCallback((message?: string) => {
        clearAllAuthData();
        showNotification(
            message || 'Sesión cerrada correctamente.',
            { severity: 'info' }
        );
        router.push('/auth/login');
    }, [showNotification, router]);

    // Función para validar token simple
    const validateTokenSimple = useCallback(() => {
        return validateToken();
    }, []);

    // Función para verificar autenticación
    const checkAuthentication = useCallback(() => {
        if (!isAuthenticated()) {
            showNotification(
                'Debes iniciar sesión para acceder a esta página.',
                { severity: 'warning' }
            );
            router.push('/auth/login');
            return false;
        }
        return validateTokenSimple();
    }, [showNotification, router, validateTokenSimple]);

    return {
        validateToken: validateTokenSimple,
        checkAuthentication,
        logoutWithAlert,
        showNotification,
    };
};