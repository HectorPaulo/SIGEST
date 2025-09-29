"use client";

import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { GetAllEmpleados } from '@/lib/Controllers/EmpleadosController';

const StyledText = styled('text', {
    shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant: 'primary' | 'secondary' }>(({ theme, variant }) => ({
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fill: (theme.vars || theme).palette.text[variant === 'primary' ? 'primary' : 'secondary'],
    fontSize: theme.typography.body2.fontSize,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
        <StyledText variant="primary" x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    );
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 8,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 8,
        backgroundColor: 'hsl(220, 25%, 65%)',
        ...theme.applyStyles('dark', {
            backgroundColor: '#308fe8',
        }),
    },
}));

export default function ChartUserByArea() {
    const [data, setData] = React.useState<Array<{ label: string; value: number; color: string }>>([]);
    const [areaStats, setAreaStats] = React.useState<Array<{ name: string; value: number; percentage: number; color: string }>>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [totalEmpleados, setTotalEmpleados] = React.useState(0);

    React.useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [empleadosResponse] = await Promise.all([
                    GetAllEmpleados(),
                ]);

                const empleados = empleadosResponse?.data || [];

                // Contar empleados por área
                const empleadosCount: { [key: string]: number } = {};
                empleados.forEach((empleado: { area?: string }) => {
                    const area = empleado.area || 'Sin área';
                    empleadosCount[area] = (empleadosCount[area] || 0) + 1;
                });

                const total = empleados.length;
                setTotalEmpleados(total);

                // Crear colores para cada área
                const colors = [
                    'hsl(220, 25%, 65%)',
                    'hsl(220, 25%, 45%)',
                    'hsl(220, 25%, 30%)',
                    'hsl(220, 25%, 20%)',
                    'hsl(220, 25%, 15%)',
                    'hsl(220, 25%, 10%)',
                ];

                // Convertir a formato para el gráfico
                const chartData = Object.entries(empleadosCount)
                    .map(([area, count], index) => ({
                        label: area,
                        value: count,
                        color: colors[index % colors.length],
                    }))
                    .sort((a, b) => b.value - a.value); // Ordenar por cantidad

                // Crear estadísticas detalladas
                const stats = chartData.map((item) => ({
                    name: item.label,
                    value: item.value,
                    percentage: total > 0 ? Math.round((item.value / total) * 100) : 0,
                    color: item.color,
                }));

                setData(chartData);
                setAreaStats(stats);
                setError(null);
            } catch (err: unknown) {
                const error = err as { response?: { data?: { message?: string } }; message?: string };
                setError(error?.response?.data?.message || error?.message || 'Error al cargar datos');
                setData([]);
                setAreaStats([]);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
                <CardContent>
                    <Typography component="h2" variant="subtitle2" gutterBottom>
                        Empleados por Área
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                        <Typography variant="body2">Cargando...</Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    if (error || data.length === 0) {
        return (
            <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
                <CardContent>
                    <Typography component="h2" variant="subtitle2" gutterBottom>
                        Empleados por Área
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                        <Typography variant="body2" color="error">
                            {error || 'No hay datos disponibles'}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    Empleados por Área
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <PieChart
                        colors={data.map(item => item.color)}
                        series={[
                            {
                                data: data,
                                innerRadius: 75,
                                outerRadius: 100,
                                paddingAngle: 0,
                                highlightScope: { fade: 'global', highlight: 'item' },
                            },
                        ]}
                        height={200}
                        width={400}
                        margin={{ left: 80, right: 80 }}
                        slotProps={{
                            legend: { position: { vertical: 'bottom', horizontal: 'center' } },
                        }}
                    >
                        <PieCenterLabel>{totalEmpleados}</PieCenterLabel>
                    </PieChart>
                </Box>
                <Stack direction="column" spacing={2}>
                    {areaStats.map((area) => (
                        <Stack key={area.name} direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                            <Stack sx={{ gap: 1, flexGrow: 1 }}>
                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: '500' }}>
                                        {area.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {area.value} ({area.percentage}%)
                                    </Typography>
                                </Stack>
                                <BorderLinearProgress
                                    variant="determinate"
                                    value={area.percentage}
                                    sx={{
                                        [`& .${linearProgressClasses.bar}`]: {
                                            backgroundColor: area.color,
                                        },
                                    }}
                                />
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}