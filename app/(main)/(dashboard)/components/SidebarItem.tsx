'use client'

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Activity, CreditCard, Layout, Settings } from "lucide-react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

export type Org = {
    id: string
    slug: string
    imageUrl: string
    name: string
}

interface SidebarItemProps{
    isActive: boolean
    isExpand: boolean
    org: Org
    onExpand: (id:string) => void
}

export const SidebarItem = ({
    isActive,
    isExpand,
    org,
    onExpand
}: SidebarItemProps) =>{

    const router = useRouter()
    const url = usePathname()
    const sidebarRoutes = [
        {
            label: "Boards",
            icon: <Layout className="h-4 w-4 mr-2"/>,
            href: `/organization/${ org.id }`
        }, {
            label: "Aktivitas",
            icon: <Activity className="h-4 w-4 mr-2"/>,
            href: `/organization/${ org.id }/activity`
        }, {
            label: "Pengaturan",
            icon: <Settings className="h-4 w-4 mr-2"/>,
            href: `/organization/${ org.id }/setting`
        }, {
            label: "Langganan",
            icon: <CreditCard className="h-4 w-4 mr-2"/>,
            href: `/organization/${ org.id }/billing`
        },
    ]

    const onSidebarClick = (href: string) =>{
        router.push(href)
    }

    return(
        <AccordionItem
            value={ org.id }
            className="
                border-none
            "
        >
            <AccordionTrigger
                onClick={() => onExpand(org.id)}
                className={cn(`
                    flex
                    items-center
                    gap-x-2
                    p-2
                    rounded-md
                    text-start
                    no-underline
                    text-neutral-700
                    hover:bg-neutral-500/10
                    hover:no-underline`,
                    isActive && !isExpand && "bg-sky500/20 text-sky-700"
                )}
            >
                <div
                    className="
                        flex
                        items-center
                        gap-x-2
                    "
                >
                    <div
                        className="
                            w-7
                            h-7
                            relative
                        "
                    >
                        <Image
                            alt="organization"
                            src={ org.imageUrl }
                            fill
                            className="
                                rounded-sm
                                object-cover
                            "
                        />
                    </div>
                    <span
                        className="
                            font-medium
                            text-sm
                        "
                    >
                        { org.name }
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent
                className="
                    pt-1
                    text-neutral-700
                "
            >
                {
                    sidebarRoutes.map((item) => (
                        <Button
                            key={item.href}
                            size={"sm"}
                            onClick={() => onSidebarClick(item.href)}
                            variant={"ghost"}
                            className={cn(`
                                w-full
                                justify-start
                                font-normal
                                mb-1
                                pl-10`,
                                url === item.href && 
                                "bg-sky-500/10 text-sky-700"
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </Button>
                    ))
                }
            </AccordionContent>
        </AccordionItem>
    )
}