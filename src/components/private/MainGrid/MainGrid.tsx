import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ChartUserByArea from "../ChartUserByCountry/ChartUserByArea";
import SystemTreeView from "../CustomizedTreeView/SystemTreeView";
import ModuleStatsChart from "@/components/private/PageViewsBarChart/ModuleStatsChart";
import StatCard, { StatCardProps } from "@/components/private/StatCard/StatCard";
import ActivityChart from "@/components/private/SessionChart/ActivityChart";
import CustomizedDataGridReal from "@/components/private/CustomizedDataGrid/CustomizedDataGridReal";
import Copyright from "@/components/private/copyright/copyright";
import { GetAllUsers } from '@/lib/Controllers/UsersController';
import { GetAllAreas } from '@/lib/Controllers/AreaController';
import { GetAllInventario } from '@/lib/Controllers/InventarioController';
import { GetAllVales } from '@/lib/Controllers/ValesController';
import { GetAllRoles } from '@/lib/Controllers/RolController';
import { GetAllEmpleados } from '@/lib/Controllers/EmpleadosController';

export default function MainGrid() {
    const [stats, setStats] = React.useState({
        users: 0,
        areas: 0,
        inventario: 0,
        vales: 0,
        roles: 0,
        empleados: 0,
    });
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchStats() {
            try {
                setLoading(true);

                const [usersResponse, areasResponse, inventarioResponse, valesResponse, rolesResponse, empleadosResponse] = await Promise.all([
                    GetAllUsers(),
                    GetAllAreas(),
                    GetAllInventario(),
                    GetAllVales(),
                    GetAllRoles(),
                    GetAllEmpleados(),
                ]);

                // Extraer datos de las respuestas
                const users = usersResponse?.data || [];
                const areas = areasResponse?.data || [];
                const inventario = inventarioResponse?.data || [];
                const vales = valesResponse?.data || [];
                const roles = rolesResponse?.data || [];
                const empleados = empleadosResponse?.data || [];

                setStats({
                    users: Array.isArray(users) ? users.length : 0,
                    areas: Array.isArray(areas) ? areas.length : 0,
                    inventario: Array.isArray(inventario) ? inventario.length : 0,
                    vales: Array.isArray(vales) ? vales.length : 0,
                    roles: Array.isArray(roles) ? roles.length : 0,
                    empleados: Array.isArray(empleados) ? empleados.length : 0,
                });
                setError(null);
            } catch (e: unknown) {
                setStats({ users: 0, areas: 0, inventario: 0, vales: 0, roles: 0, empleados: 0 });
                const error = e as { response?: { data?: { message?: string } }; message?: string; config?: { url?: string } };

                let errorMessage = 'Error desconocido al cargar los datos';
                if (error?.response?.data?.message) {
                    errorMessage = error.response.data.message;
                } else if (error?.message) {
                    errorMessage = error.message;
                }

                setError(`${errorMessage} ${error?.config?.url ? `(URL: ${error.config.url})` : ''}`);
            } finally {
                setLoading(false);
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
            title: 'Empleados registrados',
            value: stats.empleados.toString(),
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
            title: 'Roles definidos',
            value: stats.roles.toString(),
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

    if (loading) {
        return (
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <Stack alignItems="center" spacing={2}>
                    <CircularProgress />
                    <Typography>Cargando datos del dashboard...</Typography>
                </Stack>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                        <strong>Error al cargar datos:</strong> {error}
                    </Typography>
                </Alert>
            )}

            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Panel
            </Typography>
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
                    <ActivityChart />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <ModuleStatsChart />
                </Grid>
            </Grid>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Detalles
            </Typography>
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12, lg: 9 }}>
                    <CustomizedDataGridReal />
                </Grid>
                <Grid size={{ xs: 12, lg: 3 }}>
                    <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
                        <SystemTreeView />
                        <ChartUserByArea />
                    </Stack>
                </Grid>
            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}
