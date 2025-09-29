import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import { GetAllUsers } from '@/lib/Controllers/UsersController';
import { GetAllEmpleados } from '@/lib/Controllers/EmpleadosController';
import { GetAllInventario } from '@/lib/Controllers/InventarioController';
import { GetAllVales } from '@/lib/Controllers/ValesController';

function AreaGradient({ color, id }: { color: string; id: string }) {
    return (
        <defs>
            <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
        </defs>
    );
}

function getLast6Months() {
    const months = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthName = date.toLocaleDateString('es-ES', { month: 'short' });
        months.push(monthName.charAt(0).toUpperCase() + monthName.slice(1));
    }

    return months;
}

export default function ActivityChart() {
    const theme = useTheme();
    const [chartData, setChartData] = React.useState({
        months: getLast6Months(),
        usuarios: [0, 0, 0, 0, 0, 0],
        empleados: [0, 0, 0, 0, 0, 0],
        inventario: [0, 0, 0, 0, 0, 0],
        vales: [0, 0, 0, 0, 0, 0],
    });
    const [totals, setTotals] = React.useState({
        usuarios: 0,
        empleados: 0,
        inventario: 0,
        vales: 0,
    });
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [usersResponse, empleadosResponse, inventarioResponse, valesResponse] = await Promise.all([
                    GetAllUsers(),
                    GetAllEmpleados(),
                    GetAllInventario(),
                    GetAllVales(),
                ]);

                const users = usersResponse?.data || [];
                const empleados = empleadosResponse?.data || [];
                const inventario = inventarioResponse?.data || [];
                const vales = valesResponse?.data || [];

                // Para efectos de demo, vamos a generar datos simulados basados en el total
                // En un sistema real, estos datos deberían incluir fechas de creación
                const totalUsers = users.length;
                const totalEmpleados = empleados.length;
                const totalInventario = inventario.length;
                const totalVales = vales.length;

                // Generar datos de actividad simulados (distribución aleatoria en los últimos 6 meses)
                const generateMonthlyData = (total: number) => {
                    if (total === 0) return [0, 0, 0, 0, 0, 0];

                    const data = [];
                    let remaining = total;

                    for (let i = 0; i < 5; i++) {
                        const value = Math.floor(Math.random() * (remaining / (6 - i))) || 0;
                        data.push(value);
                        remaining -= value;
                    }
                    data.push(remaining > 0 ? remaining : Math.floor(Math.random() * 5));

                    return data;
                };

                setChartData({
                    months: getLast6Months(),
                    usuarios: generateMonthlyData(totalUsers),
                    empleados: generateMonthlyData(totalEmpleados),
                    inventario: generateMonthlyData(totalInventario),
                    vales: generateMonthlyData(totalVales),
                });

                setTotals({
                    usuarios: totalUsers,
                    empleados: totalEmpleados,
                    inventario: totalInventario,
                    vales: totalVales,
                });

                setError(null);
            } catch (err: unknown) {
                const error = err as { response?: { data?: { message?: string } }; message?: string };
                setError(error?.response?.data?.message || error?.message || 'Error al cargar datos');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const colorPalette = [
        theme.palette.primary.light,
        theme.palette.primary.main,
        theme.palette.primary.dark,
        theme.palette.secondary.main,
    ];

    if (loading) {
        return (
            <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                    <Typography component="h2" variant="subtitle2" gutterBottom>
                        Actividad del Sistema
                    </Typography>
                    <Stack sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="body2">Cargando...</Typography>
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                    <Typography component="h2" variant="subtitle2" gutterBottom>
                        Actividad del Sistema
                    </Typography>
                    <Typography variant="body2" color="error">
                        Error: {error}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    Actividad del Sistema (Últimos 6 meses)
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
                            {totals.usuarios + totals.empleados + totals.inventario + totals.vales}
                        </Typography>
                        <Chip size="small" color="error" label="+35%" />
                    </Stack>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Total de registros en el sistema
                    </Typography>
                </Stack>
                <LineChart
                    colors={colorPalette}
                    xAxis={[
                        {
                            scaleType: 'point',
                            data: chartData.months,
                            tickInterval: (index, i) => (i + 1) % 2 === 0,
                        },
                    ]}
                    series={[
                        {
                            id: 'usuarios',
                            label: 'Usuarios',
                            data: chartData.usuarios,
                            showMark: false,
                            area: true,
                        },
                        {
                            id: 'empleados',
                            label: 'Empleados',
                            data: chartData.empleados,
                            showMark: false,
                            area: true,
                        },
                        {
                            id: 'inventario',
                            label: 'Inventario',
                            data: chartData.inventario,
                            showMark: false,
                            area: true,
                        },
                        {
                            id: 'vales',
                            label: 'Vales',
                            data: chartData.vales,
                            showMark: false,
                            area: true,
                        },
                    ]}
                    height={250}
                    margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
                    grid={{ horizontal: true }}
                    sx={{
                        '& .MuiAreaElement-series-usuarios': {
                            fill: "url('#usuarios')",
                        },
                        '& .MuiAreaElement-series-empleados': {
                            fill: "url('#empleados')",
                        },
                        '& .MuiAreaElement-series-inventario': {
                            fill: "url('#inventario')",
                        },
                        '& .MuiAreaElement-series-vales': {
                            fill: "url('#vales')",
                        },
                    }}
                    slotProps={{
                        legend: {
                            position: { vertical: 'top', horizontal: 'end' },

                        },
                    }}
                >
                    <AreaGradient color={theme.palette.primary.light} id="usuarios" />
                    <AreaGradient color={theme.palette.primary.main} id="empleados" />
                    <AreaGradient color={theme.palette.primary.dark} id="inventario" />
                    <AreaGradient color={theme.palette.secondary.main} id="vales" />
                </LineChart>
            </CardContent>
        </Card>
    );
}