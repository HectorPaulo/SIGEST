'use client'

import GenericForm from '@/components/private/GenericForm/GenericForm'
import { bitacoraConfig } from '@/lib/config/entityConfigs'

export default function CreateBitacoraPage() {
    return <GenericForm config={bitacoraConfig} mode="create" />
}