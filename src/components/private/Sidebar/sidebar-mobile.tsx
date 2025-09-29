'use client';

import React, { useEffect, useState } from 'react';
import { SidebarItems } from '@/types/SidebarItem';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { ChevronRight, LogOut, Menu, Settings, Home, List, FileText, FileStack, User as UserIcon, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SidebarButtonSheet as SidebarButton } from './sidebar-button';
import { usePathname } from 'next/navigation';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Alert, AlertTitle } from "@mui/material";
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useUser } from "@/utils/context/UserContext/UserContext";
import { User } from "@/types/user";
import { GetUserByEmail } from "@/lib/Controllers/UsersController";


interface SidebarMobileProps {
    sidebarItems: SidebarItems;
}

// Mapeo de strings a iconos de Lucide
const iconMap = {
    'Home': Home,
    'List': List,
    'FileText': FileText,
    'FileStack': FileStack,
    'User': UserIcon,
    'Users': Users,
} as const;

// Función helper fuera del componente para evitar problemas de dependencias
async function getUserByEmail(email: string): Promise<User | null> {
    try {
        const response = await GetUserByEmail(email);
        return response ? response : null;
    } catch (error) {
        console.error("Error intentando encontrar al usuario por su email: ", error);
        return null;
    }
}

export function SidebarMobile(props: SidebarMobileProps) {
    const pathname = usePathname();
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<"success" | "error" | "attention" | null>(null);

    const { user } = useUser();
    const [userData, setUserData] = useState<User | null>(null);



    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.email) {
                try {
                    const data = await getUserByEmail(user.email);
                    if (data) {
                        setUserData(data);
                    } else {
                        console.error("Datos del usuario no encontrados");
                    }
                } catch (error) {
                    console.error("Error al obtener los datos del usuario: ", error);
                    setAlertMessage("Error al obtener los datos del usuario");
                    setAlertType("error");
                }
            }
        };
        fetchUserData();
    }, [user]);

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
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' variant='ghost' className='text-blue-950 fixed top-3 left-3'>
                    <Menu size={24} />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='px-3 py-4' hideClose>
                <SheetHeader className='flex flex-row justify-between items-center space-y-0'>
                    <Link href={'/private/dashboard'}>
                        <Image
                            src="/assets/institucional/logo.png"
                            alt="UPN201"
                            width={80}
                            height={80}
                        />
                    </Link>
                    <SheetClose asChild>
                        <Button className='h-7 w-7 p-0' variant='ghost'>
                            <ChevronRight size={48} />
                        </Button>
                    </SheetClose>
                </SheetHeader>
                <SheetTitle className="sr-only">Sidebar</SheetTitle>
                <div className='h-full'>
                    <div className='mt-5 flex flex-col w-full gap-1'>
                        {props.sidebarItems.links.map((link, idx) => (
                            <Link key={idx} href={link.href}>
                                <SidebarButton
                                    variant='ghost'
                                    icon={link.icon ? iconMap[link.icon as keyof typeof iconMap] : undefined}
                                    className='w-full'
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
                        {props.sidebarItems.extras}
                    </div>
                    {showUserInfo && userData && (
                        <div className='absolute w-full bottom-4 px-1 left-0'>
                            <Separator className='absolute -top-3 left-0 w-full' />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 p-4 w-full justify-start">
                                        <Avatar className='h-10 w-10'>
                                            <AvatarImage src={userData?.profileImg || undefined} />
                                            <AvatarFallback>{userData?.username || undefined}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className='text-sm font-medium'>{userData.username}</p>
                                        </div>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-48">
                                    <div className="flex flex-col gap-2">
                                        <Button variant="ghost" className="justify-start" onClick={() => console.log('Ver perfil')}>
                                            <Settings className="mr-2 h-4 w-4" />
                                            Ver perfil
                                        </Button>
                                        <Button variant="ghost" className="justify-start" onClick={() => console.log('Cerrar sesión')}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Cerrar sesión
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
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
            </SheetContent>
        </Sheet>
    );
}