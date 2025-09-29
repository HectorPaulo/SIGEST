"use client";

import GenericList from '@/components/private/GenericList/GenericList';
import { funcionConfig } from '@/lib/config/entityConfigs';
import type { Funcion } from '@/types/funcion';

export default function FuncionesPage() {
    return <GenericList<Funcion> config={funcionConfig} />;
}