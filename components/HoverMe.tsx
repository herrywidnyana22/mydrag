'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"

interface TooltipProps{
    children: React.ReactNode
    text: string
    position?: "left" | "right" | "top" | "bottom"
    gap? : number
}

export const HoverMe =({
    text,
    position = "bottom",
    gap= 0,
    children,
}: TooltipProps) =>{
    return(
        <TooltipProvider>
            <Tooltip 
                delayDuration={0}
            >
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    sideOffset={gap}
                    side={position}
                    className="
                        max-w-[220px]
                        text-xs
                        break-words
                    "
                >
                    {text}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}