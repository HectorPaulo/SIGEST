"use client";

import GenericShow from '@/components/private/GenericShow/GenericShow';
import { rolConfig } from '@/lib/config/entityConfigs';
import type { Rol } from '@/types/rol';

export default function RolShowPage() {
    return <GenericShow<Rol> config={rolConfig} />;
}