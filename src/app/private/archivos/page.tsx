'use client'

import GenericList from '@/components/private/GenericList/GenericList'
import { archivoConfig } from '@/lib/config/entityConfigs'

export default function ArchivosPage() {
    return <GenericList config={archivoConfig} />
}