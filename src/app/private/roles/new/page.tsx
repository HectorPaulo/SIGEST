"use client";

import GenericCreate from '@/components/private/GenericCreate/GenericCreate';
import { rolConfig } from '@/lib/config/entityConfigs';
import type { Rol } from '@/types/rol';

export default function RolesNewPage() {
    return <GenericCreate<Rol> config={rolConfig} />;
}