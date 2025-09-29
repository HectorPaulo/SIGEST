"use client";

import GenericList from '@/components/private/GenericList/GenericList';
import { rolConfig } from '@/lib/config/entityConfigs';
import type { Rol } from '@/types/rol';

export default function RolesPage() {
    return <GenericList<Rol> config={rolConfig} />;
}