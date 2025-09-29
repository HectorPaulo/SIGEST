import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import { GetAllUsers } from '@/lib/Controllers/UsersController';
import { GetAllEmpleados } from '@/lib/Controllers/EmpleadosController';
import { GetAllInventario } from '@/lib/Controllers/InventarioController';
import { GetAllVales } from '@/lib/Controllers/ValesController';
import { GetAllAreas } from '@/lib/Controllers/AreaController';
import { GetAllRoles } from '@/lib/Controllers/RolController';

interface ModuleData {
    nombre: string;
    total: number;
    porcentaje: number;
    color: string;
    [key: string]: string | number;
}

export default function ModuleStatsChart() {
    const theme = useTheme();
    const [moduleData, setModuleData] = React.useState<ModuleData[]>([]);
    const [totalRecords, setTotalRecords] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [usersResponse, empleadosResponse, inventarioResponse, valesResponse, areasResponse, rolesResponse] = await Promise.all([
                    GetAllUsers(),
                    GetAllEmpleados(),
                    GetAllInventario(),
                    GetAllVales(),
                    GetAllAreas(),
                    GetAllRoles(),
                ]);

                const users = usersResponse?.data || [];
                const empleados = empleadosResponse?.data || [];
                const inventario = inventarioResponse?.data || [];
                const vales = valesResponse?.data || [];
                const areas = areasResponse?.data || [];
                const roles = rolesResponse?.data || [];

                const moduleStats = [
                    { nombre: 'Usuarios', total: users.length, color: theme.palette.primary.main },
                    { nombre: 'Empleados', total: empleados.length, color: theme.palette.primary.light },
                    { nombre: 'Inventario', total: inventario.length, color: theme.palette.secondary.main },
                    { nombre: 'Vales', total: vales.length, color: theme.palette.secondary.light },
                    { nombre: 'Áreas', total: areas.length, color: theme.palette.success.main },
                    { nombre: 'Roles', total: roles.length, color: theme.palette.warning.main },
                ];

                const total = moduleStats.reduce((sum, module) => sum + module.total, 0);

                const dataWithPercentage = moduleStats.map(module => ({
                    ...module,
                    porcentaje: total > 0 ? Math.round((module.total / total) * 100) : 0,
                }));

                setModuleData(dataWithPercentage);
                setTotalRecords(total);
                setError(null);
            } catch (err: unknown) {
                const error = err as { response?: { data?: { message?: string } }; message?: string };
                setError(error?.response?.data?.message || error?.message || 'Error al cargar datos');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [theme]);

    if (loading) {
        return (
            <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                    <Typography component="h2" variant="subtitle2" gutterBottom>
                        Estadísticas por Módulo
                    </Typography>
                    <Typography variant="body2">Cargando...</Typography>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                    <Typography component="h2" variant="subtitle2" gutterBottom>
                        Estadísticas por Módulo
                    </Typography>
                    <Typography variant="body2" color="error">
                        Error: {error}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    const chartSetting = {
        xAxis: [
            {
                label: 'Registros',
            },
        ],
        width: 500,
        height: 300,
    };

    return (
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    Estadísticas por Módulo
                </Typography>
                <Stack sx={{ justifyContent: 'space-between' }}>
                    <Stack
                        direction="row"
                        sx={{
                            alignContent: { xs: 'center', sm: 'flex-start' },
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Typography variant="h4" component="p">
                            {totalRecords}
                        </Typography>
                        <Chip size="small" color="success" label="Total" />
                    </Stack>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Registros distribuidos en {moduleData.length} módulos
                    </Typography>
                </Stack>
                <BarChart
                    dataset={moduleData}
                    yAxis={[{ scaleType: 'band', dataKey: 'nombre' }]}
                    series={[
                        {
                            dataKey: 'total',
                            label: 'Registros',
                            valueFormatter: (value: number | null) => value?.toString() || '0',
                        },
                    ]}
                    layout="horizontal"
                    colors={moduleData.map(module => module.color)}
                    {...chartSetting}
                />

                {/* Mostrar porcentajes */}
                <Stack spacing={1} sx={{ mt: 2 }}>
                    {moduleData.map((module) => (
                        <Stack
                            key={module.nombre}
                            direction="row"
                            sx={{
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                                <div
                                    style={{
                                        width: 12,
                                        height: 12,
                                        backgroundColor: module.color,
                                        borderRadius: 2,
                                    }}
                                />
                                <Typography variant="body2">
                                    {module.nombre}
                                </Typography>
                            </Stack>
                            <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {module.total}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    ({module.porcentaje}%)
                                </Typography>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}