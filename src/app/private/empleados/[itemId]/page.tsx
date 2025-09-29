"use client";

import GenericShow from '@/components/private/GenericShow/GenericShow';
import { empleadoConfig } from '@/lib/config/entityConfigs';
import type { Empleado } from '@/types/empleado';

export default function EmpleadoShowPage() {
    return <GenericShow<Empleado> config={empleadoConfig} />;
}