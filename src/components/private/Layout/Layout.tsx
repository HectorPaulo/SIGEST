"use client";

import React, { ReactNode, useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { useMediaQuery } from 'usehooks-ts';
import ProtectedRoute from "@/utils/ProtectedRoutes/ProtectedRoutes";
import {ThemeProvider} from "@/utils/context/ThemeContext/ThemeContext";

interface DashboardLayoutProps {
    children: ReactNode;
}

const Layout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const isDesktop = useMediaQuery('(min-width: 800px)', {
        initializeWithValue: false,
    });

    const [sidebarVisible, setSidebarVisible] = useState(false);

    return (
        <ThemeProvider>
            <ProtectedRoute>
                <div className="flex flex-col min-h-screen">
                    <div className="flex flex-1">
                        {isDesktop && (
                            <>
                                <Sidebar onSidebarToggle={setSidebarVisible} />
                                {/* El contenido se ajusta según la visibilidad del sidebar */}
                                <div
                                    className="flex-1 transition-transform duration-200"
                                    style={{
                                        width: '100%',
                                        transform: `translateX(${sidebarVisible ? 260 : 16}px)`,
                                        transition: 'transform 0.2s cubic-bezier(0.4,0,0.2,1)',
                                    }}
                                >
                                    <main>{children}</main>
                                </div>
                            </>
                        )}
                        {!isDesktop && (
                            <div className="flex-1">
                                <main>{children}</main>
                            </div>
                        )}
                    </div>
                </div>
                {!isDesktop && <Sidebar />}
            </ProtectedRoute>
        </ThemeProvider>
    );
};

export default Layout;
