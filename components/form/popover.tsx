'use client'

import { toast } from "sonner"
import { X } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useAction } from "@/hooks/action"
import { addBoard } from "@/actions/board/handler"

import InputForm from "./inputForm"
import ButtonForm from "./buttonForm"

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

    const { execute, fieldError } = useAction(addBoard,{
        onSuccess: (data) =>{
            console.log({data})
            toast.success("Berhasil ditambahkan..")
        },
        onError: (error) =>{
            console.log({error})
            toast.error(error)
        }
    })

    const onSubmit = (data: FormData) =>{
        const title = data.get("title") as string
        execute({title})
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
                <PopoverClose asChild>
                    <Button
                        variant="ghost"
                        className="
                            absolute
                            w-auto
                            h-auto
                            top-2
                            right-2
                            p-2
                            text-rose-500
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