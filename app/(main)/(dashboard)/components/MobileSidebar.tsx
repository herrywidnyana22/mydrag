'use client'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useMobileSidebar } from "@/hooks/mobileSidebar"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Sidebar } from "./Sidebar"

const MobileSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const isOpen = useMobileSidebar((state) => state.isOpen)
    const onOpen = useMobileSidebar((state) => state.onOpen)
    const onClose = useMobileSidebar((state) => state.onClose)

    const url = usePathname()

    useEffect(() =>{
        setIsSidebarOpen(true)
    },[])

    useEffect(() =>{
        onClose()
    },[url, onClose])

    if(!isSidebarOpen) {
        return null
    }

    return (
        <>
            <Button
                onClick={onOpen}
                size={"sm"}
                variant={"ghost"}
                className="
                    block
                    mr-2
                    md:hidden
                "
            >
                <Menu className="w-4 h-4"/>
            </Button>
            <Sheet
                open={isOpen}
                onOpenChange={onClose}
            >
                <SheetContent
                    side={"left"}
                    className="p-2 pt-10"
                >
                    <Sidebar
                        storageKey="t-sidebar-mobile-state"
                    />
                </SheetContent>
            </Sheet>
        </>
    )
}

export default MobileSidebar
