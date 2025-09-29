"use client";

import GenericEdit from '@/components/private/GenericEdit/GenericEdit';
import { empleadoConfig } from '@/lib/config/entityConfigs';
import type { Empleado } from '@/types/empleado';

export default function EmpleadoEditPage() {
    return <GenericEdit<Empleado> config={empleadoConfig} />;
}