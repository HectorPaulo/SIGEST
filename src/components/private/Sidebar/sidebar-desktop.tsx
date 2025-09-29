'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarButton } from './sidebar-button';
import Link from 'next/link';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LogOut, Settings, Home, List, FileText, FileStack, User as UserIcon, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SidebarItems } from "@/types/SidebarItem";
import { logout } from "@/utils/auth/autenticacion";
import { Alert, AlertTitle } from "@mui/material";
import { useUser } from "@/utils/context/UserContext/UserContext";
import { GetUserByEmail } from "@/lib/Controllers/UsersController";
import { User } from "@/types/user";

// Mapeo de strings a iconos de Lucide
const iconMap = {
    'Home': Home,
    'List': List,
    'FileText': FileText,
    'FileStack': FileStack,
    'User': UserIcon,
    'Users': Users,
} as const;

interface SidebarDesktopProps {
    sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
    const pathname = usePathname();
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    // Debug temporal - ver ruta actual
    console.log('Current pathname:', pathname);
    const [alertType, setAlertType] = useState<"success" | "error" | "attention" | null>(null);
    const router = useRouter();
    const { user, setUser } = useUser();

    const handleLogoutClick = async () => {
        await logout();
        router.push('/auth/login');
    };

    async function getUserByEmail(email: string): Promise<User | null> {
        try {
            const response = await GetUserByEmail(email);
            return response ? response : null;
        } catch (error) {
            console.error("Error intentando encontrar al usuario por su email: ", error);
            return null;
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            if (!(user && user.email)) {
                return;
            }
            try {
                const data = await getUserByEmail(user.email);
                if (data) {
                    setUser(data);
                } else {
                    console.error("Datos del usuario no encontrados");
                }
            } catch (error) {
                console.error("Error al obtener los datos del usuario: ", error);
                setAlertMessage("Error al obtener los datos del usuario");
                setAlertType("error");
            }
        };
        fetchUserData();
    }, [user, setUser]);

    const showUserInfo = [
        '/private/dashboard/area',
        '/private/dashboard/area/create',
        '/private/dashboard/area/edit',
        '/private/dashboard/empleado',
        '/private/dashboard/empleado/create',
        '/private/dashboard/empleado/edit',
        '/private/dashboard/inventario',
        '/private/dashboard/inventario/create',
        '/private/dashboard/inventario/edit',
        '/private/dashboard/vales',
        '/private/dashboard/vales/create',
        '/private/dashboard/vales/edit',
        '/private/dashboard/bitacora',
        '/private/dashboard/bitacora/create',
        '/private/dashboard/bitacora/edit',
    ].some((path) => pathname.startsWith(path));

    return (
        <aside className='bg-white max-w-xs h-screen fixed left-0 top-0 z-40 border-r overflow-y-auto'>
            <div className='h-full px-4 py-5 flex flex-col justify-between'>
                <div>
                    <Link href={'/private/dashboard'}>
                        <Image
                            className='cursor-pointer flex justify-center'
                            src="/assets/institucional/logo_texto.png"
                            alt="UPN201"
                            width={200}
                            height={200}
                        />
                    </Link>
                    <div className='mt-5'>
                        <div className='flex flex-col gap-10 w-full'>
                            {props.sidebarItems.links.map((link, index) => (
                                <Link key={index} href={link.href}>
                                    <SidebarButton
                                        variant='ghost'
                                        icon={link.icon ? iconMap[link.icon as keyof typeof iconMap] : undefined}
                                        className='w-full my-4 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:scale-105 transition-all duration-200'
                                        isActive={(() => {
                                            if (link.href === '/private/dashboard') {
                                                return pathname === '/private/dashboard';
                                            }
                                            return pathname.startsWith(link.href);
                                        })()}
                                    >
                                        {link.label}
                                    </SidebarButton>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                {showUserInfo && user && (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="flex items-center gap-2 pb-4 lg:pl-4 border-t w-full justify-start mt-[-10px]">

                                <Avatar className='h-12 w-12'>
                                    <AvatarImage src={user?.profileImg || undefined} />
                                    <AvatarFallback>{user?.username || undefined}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className='text-lg'>{user.username}</p>
                                </div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48">
                            <div className="flex flex-col gap-2">
                                <Link href="/dashboard/profile">
                                    <Button variant="ghost" className="justify-start">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Ver perfil
                                    </Button>
                                </Link>
                                <Button variant="ghost" className="justify-start" onClick={handleLogoutClick}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Cerrar sesión
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
                {alertMessage && alertType === "success" && (
                    <Alert severity="success">
                        <AlertTitle>¡Éxito!</AlertTitle>
                        {alertMessage}
                    </Alert>
                )}

                {alertMessage && alertType === "error" && (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {alertMessage}
                    </Alert>
                )}

                {alertMessage && alertType === "attention" && (
                    <Alert severity="warning">
                        <AlertTitle>Atención</AlertTitle>
                        {alertMessage}
                    </Alert>
                )}
            </div>
        </aside>
    );
}
