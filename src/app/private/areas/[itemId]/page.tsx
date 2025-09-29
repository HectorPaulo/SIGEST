"use client";

import GenericShow from '@/components/private/GenericShow/GenericShow';
import { areaConfig } from '@/lib/config/entityConfigs';
import type { Area } from '@/types/area';

export default function AreaShowPage() {
    return <GenericShow<Area> config={areaConfig} />;
}