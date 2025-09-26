"use client";

import { useEffect } from "react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
    }, []);

    return <>{children}</>;
}