"use client";

import GenericCreate from '@/components/private/GenericCreate/GenericCreate';
import { funcionConfig } from '@/lib/config/entityConfigs';
import type { Funcion } from '@/types/funcion';

export default function FuncionesNewPage() {
    return <GenericCreate<Funcion> config={funcionConfig} />;
}