'use client'

import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useLocalStorage } from "usehooks-ts"
import { SidebarItem, Org } from "./SidebarItem"

interface SidebarProps{
    storageKey?: string
}

export const Sidebar = ({storageKey = "t-sidebar-state"}: SidebarProps) => {

    const [expand, setExpand] = useLocalStorage<Record<string, any>>(
        storageKey, 
        {}
    )

    const { 
        organization: activeOrg,
        isLoaded:  isLoadedOrg
    } = useOrganization()

    const {
        userMemberships,
        isLoaded: isLoadedOrgList
    } = useOrganizationList({
        userMemberships:{
            infinite: true
        }
    })

    const defaultAccordion: string[] = Object.keys(expand).reduce((acc: string[], key: string) =>{
        if(expand[key]) {
            acc.push(key)
        }

        return acc
    }, [])

    const onExpand = (id: string) =>{
        setExpand((current) =>({
            ...current,
            [id]: !expand[id]
        }))
    }

    if(!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading){
        return (
            <>
                <Skeleton/>
            </>
        )
    }

    return (
        <>
            <div 
                className="
                    flex
                    items-center
                    mb-1
                    text-xs
                    font-medium
                "
            >
                <span>
                    Workspaces
                </span>
                <Button
                    asChild
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="
                        ml-auto
                    "
                >
                    <Link
                        href="/org-list"
                    >
                        <Plus
                            className="
                                w-4
                                h-4
                            "
                        />
                    </Link>
                </Button>
            </div>

            <Accordion
                type="multiple"
                defaultValue={defaultAccordion}
                className="
                    space-y-2
                "
            >
                { 
                    userMemberships.data.map(({ organization }) =>(
                    <SidebarItem
                        key={ organization.id }
                        isActive= { activeOrg?.id === organization.id}
                        isExpand= { expand[organization.id] }
                        org={ organization as Org }
                        onExpand={ onExpand }
                    />
                ))}
            </Accordion>
        </>
    )
}
