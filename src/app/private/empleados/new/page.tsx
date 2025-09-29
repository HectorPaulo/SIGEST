"use client";

import GenericCreate from '@/components/private/GenericCreate/GenericCreate';
import { empleadoConfig } from '@/lib/config/entityConfigs';
import type { Empleado } from '@/types/empleado';

export default function EmpleadosNewPage() {
    return <GenericCreate<Empleado> config={empleadoConfig} />;
}