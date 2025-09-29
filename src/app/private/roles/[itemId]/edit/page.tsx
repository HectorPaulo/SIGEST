"use client";

import GenericEdit from '@/components/private/GenericEdit/GenericEdit';
import { rolConfig } from '@/lib/config/entityConfigs';
import type { Rol } from '@/types/rol';

export default function RolEditPage() {
    return <GenericEdit<Rol> config={rolConfig} />;
}