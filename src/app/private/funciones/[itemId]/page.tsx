"use client";

import GenericShow from '@/components/private/GenericShow/GenericShow';
import { funcionConfig } from '@/lib/config/entityConfigs';
import type { Funcion } from '@/types/funcion';

export default function FuncionShowPage() {
    return <GenericShow<Funcion> config={funcionConfig} />;
}