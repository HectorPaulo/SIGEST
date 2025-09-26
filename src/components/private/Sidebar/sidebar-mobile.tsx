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
import { ChevronRight, LogOut, Menu, Settings, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SidebarButtonSheet as SidebarButton } from './sidebar-button';
import { usePathname } from 'next/navigation';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {useUser} from "@/utils/context/UserContext/UserContext";
import {User} from "@/types/user";

interface SidebarMobileProps {
    sidebarItems: SidebarItems;
}

export function SidebarMobile(props: SidebarMobileProps) {
    const pathname = usePathname();
    const { user, setUser } = useUser();
    const [userData, setUserData] = useState<User | null>(null);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<"success" | "error" | "attention" | null>(null);

    async function getUserByEmail(email: string): Promise<User | null> {
        try {
            const response = await getUserByEmail(email);
            return response ? response : null;
        } catch (error) {
            console.error("Error intentando encontrar al usuario por su email: ", error);
            return null;
        }
    }

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
        '/dashboard/area',
        '/dashboard/area/create',
        '/dashboard/area/edit',
        '/dashboard/empleado',
        '/dashboard/empleado/create',
        '/dashboard/empleado/edit',
        '/dashboard/inventario',
        '/dashboard/inventario/create',
        '/dashboard/inventario/edit',
        '/dashboard/vales',
        '/dashboard/vales/create',
        '/dashboard/vales/edit',
        '/dashboard/bitacora',
        '/dashboard/bitacora/create',
        '/dashboard/bitacora/edit',
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
    <Link href={'/dashboard'}>
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
            icon={link.icon}
            className='w-full'
            isActive={link.href === '/dashboard' ? pathname === link.href : pathname.startsWith(link.href)}
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
        <AlertSuccess
            message={alertMessage}
        onClose={() => setAlertMessage(null)}
        />
    )}

    {alertMessage && alertType === "error" && (
        <AlertError
            message={alertMessage}
        onClose={() => setAlertMessage(null)}
        />
    )}

    {alertMessage && alertType === "attention" && (
        <AlertAttention
            message={alertMessage}
        onClose={() => setAlertMessage(null)}
        />
    )}
    </div>
    </SheetContent>
    </Sheet>
);
}