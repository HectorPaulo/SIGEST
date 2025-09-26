'use client';

import React, { useState } from 'react';
import {
    Home,
    List,
    FileText,
    FileStack,
    User,
    Users,
} from 'lucide-react';
import { SidebarDesktop } from './sidebar-desktop';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMobile } from './sidebar-mobile';
import { SidebarItems } from '@/types/SidebarItem';

const sidebarItems: SidebarItems = {
    links: [
        { label: 'Inicio', href: '/dashboard', icon: 'Home' },
        { label: 'Roles', href: '/dashboard/roles', icon: 'User' },
        { label: 'Area', href: '/dashboard/area', icon: 'Users' },
        { label: 'Usuarios', href: '/dashboard/users', icon: 'Users' },
        { label: 'Funciones', href: '/dashboard/funciones', icon: 'User' },
        { label: 'Empleado', href: '/dashboard/empleado', icon: 'User' },
        { label: 'Inventario', href: '/dashboard/inventario', icon: 'List' },
        { label: 'Vales', href: '/dashboard/vales', icon: 'FileText' },
        { label: 'Bitácora', href: '/dashboard/bitacora', icon: 'FileStack' },
        { label: 'Archivos', href: '/dashboard/archivos', icon: 'FileStack' },
    ],
};

export interface SidebarProps {
    onSidebarToggle?: (visible: boolean) => void;
}

export function Sidebar({ onSidebarToggle }: SidebarProps) {
    const isDesktop = useMediaQuery('(min-width: 800px)', {
        initializeWithValue: false,
    });

    const [showSidebar, setShowSidebar] = useState(false);

    // * Notifica al padre cuando cambia la visibilidad
    React.useEffect(() => {
        if (onSidebarToggle) onSidebarToggle(showSidebar);
    }, [showSidebar, onSidebarToggle]);

    if (isDesktop) {
        return (
            <>
                <div
                    style={{
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        width: '220px',
                        zIndex: 90,
                        pointerEvents: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    className="flex flex-col"
                >
                    {/*<Link href={'/dashboard'} style={{ pointerEvents: 'auto' }}>*/}
                    {/*  <Image*/}
                    {/*    className='cursor-pointer flex justify-center items-center mt-4 mb-4'*/}
                    {/*    src="/assets/institucional/logo_texto.png"*/}
                    {/*    alt="UPN201"*/}
                    {/*    width={250}*/}
                    {/*    height={250}*/}
                    {/*  />*/}
                    {/*</Link>*/}
                    <div className=" flex bg-blue-950 w-10 h-16 self-start mt-20 rounded-r-full">
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#fff" className="text-bold my-auto "><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                    </div>
                </div>
                {/* Sidebar */}
                <div
                    style={{
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        width: showSidebar ? '260px' : '200px',
                        height: '100vh',
                        zIndex: 100,
                        pointerEvents: 'auto',
                    }}
                    onMouseEnter={() => setShowSidebar(true)}
                    onMouseLeave={() => setShowSidebar(false)}
                >
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '260px',
                            height: '100vh',
                            transition: 'transform 0.2s cubic-bezier(0.4,0,0.2,1)',
                            transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)',
                            boxShadow: showSidebar ? '2px 0 8px rgba(0,0,0,0.08)' : 'none',
                            background: 'white',
                            borderRight: '1px solid #e5e7eb',
                            overflow: 'hidden',
                        }}
                        onMouseLeave={() => setShowSidebar(false)}
                        onMouseEnter={() => setShowSidebar(true)}
                    >
                        <SidebarDesktop sidebarItems={sidebarItems} />
                    </div>
                </div>
            </>
        );
    }

    return <SidebarMobile sidebarItems={sidebarItems} />;
}
