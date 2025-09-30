"use client";

import GenericEdit from '@/components/private/GenericEdit/GenericEdit';
import { rolConfig} from '@/lib/config/entityConfigs';
import type { Rol } from '@/types/rol';
import {chartsCustomizations, datePickersCustomizations, treeViewCustomizations} from "@/utils/theme/customizations";
import Box from "@mui/material/Box";
import SideMenu from "@/components/private/SideMenu/SideMenu";
import AppNavbar from "@/components/private/AppNavbar/AppNavbar";
import {alpha} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Header from "@/components/private/Header/Header";
import Copyright from "@/components/private/copyright/copyright";
import { useTheme } from '@/utils/context/ThemeContext/ThemeContext';
import AppTheme from '@/utils/theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';

import * as React from "react";

const PageContent = (props: { disableCustomTheme?: boolean }) => {
    const { theme } = useTheme();
    const xThemeComponents = {
        ...chartsCustomizations,
        ...datePickersCustomizations,
        ...treeViewCustomizations,
    }

    return <AppTheme {...props} themeComponent={xThemeComponents} mode={theme}>
        <CssBaseline enableColorScheme/>
        <Box sx={{ display: 'flex' }}>

            <SideMenu />
            <AppNavbar />

            {/*Contenido principal*/}
            <Box
                component="main"
                sx={( theme) => ({
                    flexGrow: 1,
                    backgroundColor: theme.vars
                        ? `rgba(${theme.vars.palette.background.defaultChannel} /1)`
                        : alpha(theme.palette.background.default, 1),
                    overflow: 'auto',
                })}
            >
                <Stack spacing={2}
                       sx={{
                           alignItems: 'center',
                           mx: 3,
                           pb: 5,
                           mt: { xs: 8, md: 0 },
                       }}>
                    <Header />
                    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                        <div className='h-screen'>
                            <GenericEdit<Rol> config={rolConfig} />
                            <Copyright sx={{ my: 4 }} />
                        </div>
                    </Box>
                </Stack>
            </Box>

        </Box>

    </AppTheme>;
}
export default function RolEditPage() {
    return <PageContent disableCustomTheme={false} />
}