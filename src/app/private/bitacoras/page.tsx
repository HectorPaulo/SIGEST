'use client'

import GenericList from '@/components/private/GenericList/GenericList'
import { bitacoraConfig } from '@/lib/config/entityConfigs'

export default function BitacorasPage() {
    return <GenericList config={bitacoraConfig} />
}