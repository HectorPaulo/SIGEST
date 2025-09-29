"use client";

import GenericEdit from '@/components/private/GenericEdit/GenericEdit';
import { funcionConfig } from '@/lib/config/entityConfigs';
import type { Funcion } from '@/types/funcion';

export default function FuncionEditPage() {
    return <GenericEdit<Funcion> config={funcionConfig} />;
}