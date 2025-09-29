'use client'

import GenericForm from '@/components/private/GenericForm/GenericForm'
import { archivoConfig } from '@/lib/config/entityConfigs'

export default function CreateArchivoPage() {
    return <GenericForm config={archivoConfig} mode="create" />
}