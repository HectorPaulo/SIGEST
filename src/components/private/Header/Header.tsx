// "use client";
//
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import {logout} from "@/utils/auth/autenticacion";
//
// interface DashboardHeaderProps {
//     username: string | null;
//     profileImg: string | null;
// }
//
// const Header: React.FC<DashboardHeaderProps> = ({ username, profileImg }) => {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const router = useRouter();
//     const handleMenuToggle = () => {
//         setMenuOpen(!menuOpen);
//     };
//
//     const handleProfileClick = () => {
//         router.push('/dashboard/profile');
//         setMenuOpen(false);
//     };
//
//     const handleLogoutClick = async () => {
//         await logout();
//         router.push('/auth/login');
//         setMenuOpen(false);
//     };
//
//     const displayName = username || 'Usuario desconocido';
//     const displayProfileImg = profileImg || '/assets/user.png';
//
//     return (
//         <header className="flex items-center justify-between p-4 md:bg-white md:text-blue-900 md:font-semibold text-blue-950 font-semibold">
//             <br />
//             <div className="relative">
//                 <button onClick={handleMenuToggle} className="flex items-center space-x-2">
//                     <span className="text-sm lg:text-lg">{displayName}</span>
//                     <Image
//                         src={displayProfileImg}
//                         alt="Perfil"
//                         width={32}
//                         height={32}
//                         className="h-10 w-10 lg:h-16 lg:w-16 rounded-full cursor-pointer"
//                     />
//                 </button>
//
//                 {menuOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
//                         <button
//                             onClick={handleProfileClick}
//                             className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
//                         >
//                             Ver perfil
//                         </button>
//                         <button
//                             onClick={handleLogoutClick}
//                             className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
//                         >
//                             Cerrar sesión
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </header>
//     );
// };
//
// export default Header;

import * as React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import NavbarBreadcrumbs from "@/components/private/NavbarBreadcrumbs/NavbarBreadcrumbs";
import Search from "@/components/private/Search/Search";
import CustomDatePicker from "@/components/private/CustomDatePicker/CustomDatePicker";
import MenuButton from "@/components/private/MenuButton/MenuButton";
import ColorModeIconDropdown from "@/utils/theme/ColorModelconDropdown";

export default function Header() {
    return (
        <Stack
            direction="row"
            sx={{
                display: { xs: 'none', md: 'flex' },
                width: '100%',
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                maxWidth: { sm: '100%', md: '1700px' },
                pt: 1.5,
            }}
            spacing={2}
        >
            <NavbarBreadcrumbs />
            <Stack direction="row" sx={{ gap: 1 }}>
                {/*<Search />*/}
                {/*<CustomDatePicker />*/}
                {/*<MenuButton showBadge aria-label="Open notifications">*/}
                {/*    <NotificationsRoundedIcon />*/}
                {/*</MenuButton>*/}
                <ColorModeIconDropdown />
            </Stack>
        </Stack>
    );
}