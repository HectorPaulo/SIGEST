'use client'

import GenericForm from '@/components/private/GenericForm/GenericForm'
import { valeConfig } from '@/lib/config/entityConfigs'

export default function CreateValePage() {
    return <GenericForm config={valeConfig} mode="create" />
}