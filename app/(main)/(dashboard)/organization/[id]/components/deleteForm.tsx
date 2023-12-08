"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useFormStatus } from "react-dom"

export const DeleteForm = () =>{
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit" 
            variant="destructive"
            size="sm"
            disabled={pending}
            className="flex gap-1"
        >
            <Trash2
                className="
                    w-4 
                    h-4
                "
            />
            Hapus
        </Button>
    )
}