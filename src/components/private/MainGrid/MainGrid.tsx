import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChartUserByCountry from "../ChartUserByCountry/ChartUserByCountry";
import CustomizedTreeView from "../CustomizedTreeView/CustomizedTreeView";
import PageViewsBarChart from "@/components/private/PageViewsBarChart/PageViewsBarChart";
import StatCard, {StatCardProps} from "@/components/private/StatCard/StatCard";
import SessionsChart from "@/components/private/SessionChart/SessionChart";
import CustomizedDataGrid from "@/components/private/CustomizedDataGrid/CustomizedDataGrid";
import Copyright from "@/components/private/copyright/copyright";
import { GetAllUsers } from '@/lib/Controllers/UsersController';
import { GetAllAreas } from '@/lib/Controllers/AreaController';
import { GetAllInventario } from '@/lib/Controllers/InventarioController';
import { GetAllVales } from '@/lib/Controllers/ValesController';

export default function MainGrid() {
    const [stats, setStats] = React.useState({
        users: 0,
        areas: 0,
        inventario: 0,
        vales: 0,
    });
    const [error, setError] = React.useState<string | null>(null);
    React.useEffect(() => {
        async function fetchStats() {
            try {
                const [users, areas, inventario, vales] = await Promise.all([
                    GetAllUsers(),
                    GetAllAreas(),
                    GetAllInventario(),
                    GetAllVales(),
                ]);
                setStats({
                    users: Array.isArray(users) ? users.length : (users?.length || 0),
                    areas: Array.isArray(areas) ? areas.length : (areas?.length || 0),
                    inventario: Array.isArray(inventario) ? inventario.length : (inventario?.length || 0),
                    vales: Array.isArray(vales) ? vales.length : (vales?.length || 0),
                });
                setError(null);
            } catch (e: any) {
                setStats({ users: 0, areas: 0, inventario: 0, vales: 0 });
                if (e?.response?.data?.message) {
                    setError(e.response.data.message);
                } else if (e?.message) {
                    setError(e.message);
                } else {
                    setError('Error desconocido al cargar los datos');
                }
            }
        }
        fetchStats();
    }, []);

    const data: StatCardProps[] = [
        {
            title: 'Usuarios registrados',
            value: stats.users.toString(),
            interval: 'Total en el sistema',
            trend: 'up',
            data: [],
        },
        {
            title: 'Áreas registradas',
            value: stats.areas.toString(),
            interval: 'Total en el sistema',
            trend: 'neutral',
            data: [],
        },
        {
            title: 'Inventario total',
            value: stats.inventario.toString(),
            interval: 'Total de activos',
            trend: 'neutral',
            data: [],
        },
        {
            title: 'Vales registrados',
            value: stats.vales.toString(),
            interval: 'Total en el sistema',
            trend: 'neutral',
            data: [],
        },
    ];

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Panel
            </Typography>
            {error && (
                <Box sx={{ color: 'gray', mb: 2, fontWeight: 'semiibold' }}>
                    Error: {error}
                </Box>
            )}
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                {data.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
                        <StatCard {...card} />
                    </Grid>
                ))}
                {/*<Grid size={{ xs: 12, sm: 6, lg: 3 }}>*/}
                {/*    <HighlightedCard />*/}
                {/*</Grid>*/}
                <Grid size={{ xs: 12, md: 6 }}>
                    <SessionsChart />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <PageViewsBarChart />
                </Grid>
            </Grid>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Details
            </Typography>
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12, lg: 9 }}>
                    <CustomizedDataGrid />
                </Grid>
                <Grid size={{ xs: 12, lg: 3 }}>
                    <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
                        <CustomizedTreeView />
                        <ChartUserByCountry />
                    </Stack>
                </Grid>
            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}
