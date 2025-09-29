'use client'

import GenericForm from '@/components/private/GenericForm/GenericForm'
import { userConfig } from '@/lib/config/entityConfigs'

export default function CreateUsuarioPage() {
    return <GenericForm config={userConfig} mode="create" />
}