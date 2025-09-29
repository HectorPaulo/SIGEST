'use client'

import GenericForm from '@/components/private/GenericForm/GenericForm'
import { inventarioConfig } from '@/lib/config/entityConfigs'

export default function CreateInventarioPage() {
    return <GenericForm config={inventarioConfig} mode="create" />
}