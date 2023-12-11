'use client'

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

interface PopoverProps{
    children: React.ReactNode
    to?: "left" | "right" | "top" | "bottom"
    align?: "start" | "center" | "end"
    gap? : number
}

export const PopoverForm = ({
    to="bottom",
    align,
    gap = 0,
    children
}: PopoverProps) =>{
    return(
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                side={to}
                sideOffset={gap}
                className="
                    w-80
                    pt-3
                "
            >
                <div
                    className="
                        pb-4
                        text-center
                        font-medium
                        text-sm
                        text-neutral-600
                    "
                >
                    Buat Project Baru
                </div>

            </PopoverContent>
        </Popover>
    )
}