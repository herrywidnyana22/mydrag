'use client'

import { ElementRef, useRef } from "react"
import { toast } from "sonner"
import { X } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useAction } from "@/hooks/action"
import { addBoard } from "@/actions/board/create"

import InputForm from "./inputForm"
import ButtonForm from "./buttonForm"
import Picker from "./picker"
import { useRouter } from "next/navigation"

interface PopoverProps{
    children: React.ReactNode
    position?: "left" | "right" | "top" | "bottom"
    align?: "start" | "center" | "end"
    gap? : number
}

export const PopoverForm = ({
    position="bottom",
    align,
    gap = 0,
    children
}: PopoverProps) =>{

    const closeRef = useRef<ElementRef<"button">>(null)
    const redirect = useRouter()

    const { execute, fieldError } = useAction(addBoard,{
        onSuccess: (data) =>{
            toast.success("Berhasil ditambahkan..")
            closeRef.current?.click()
            redirect.push(`/board/${data.id}`)
        },
        onError: (error) =>{
            toast.error(error)
        }
    })

    const onSubmit = (data: FormData) =>{
        const title = data.get("title") as string
        const image = data.get("image")as string
        
        execute({title, image})
    }

    
    return(
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                side={position}
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
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        variant="ghost"
                        className="
                            absolute
                            w-auto
                            h-auto
                            top-2
                            right-2
                            p-2
                            text-rose-600
                            hover:bg-rose-500
                            hover:text-white
                        "
                    >
                        <X
                            className="w-4 h-4"
                        />
                    </Button>
                </PopoverClose>
                <form
                    action={onSubmit}
                    className="
                        space-y-4
                    " 
                >
                    <div
                        className="
                            space-y-4
                        "
                    >
                        <Picker
                            id="image"
                            validateMsg={fieldError}
                        />
                        <InputForm
                            id="title"
                            label="Nama Project"
                            type="text"
                            validateMsg={fieldError}
                        />
                        <ButtonForm
                            className="
                                w-full
                            "
                        >
                            Simpan 
                        </ButtonForm>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}