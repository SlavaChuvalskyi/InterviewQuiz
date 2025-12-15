'use client'

import { createClient } from '@/lib/client'
import { Button } from '@/components/ui/button-custom'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/toast";

export function LogoutButton() {
    const router = useRouter()
    const { showToast } = useToast()

    const logout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        showToast('You’ve been logged out', 'success')
        router.push('/')
    }

    return <Button id={'logout'} className={'cursor-pointer'} onClick={logout}>Logout</Button>
}
