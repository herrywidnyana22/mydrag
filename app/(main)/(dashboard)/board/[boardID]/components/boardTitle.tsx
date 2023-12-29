'use client'

import InputForm from "@/components/form/inputForm";

import { ElementRef, useRef, useState } from "react";
import { useAction } from "@/hooks/action";
import { updateBoard } from "@/actions/board/update";
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { toast } from "sonner";

interface TitleBoardProps{
    data: Board
}

const TitleBoard = ({data}: TitleBoardProps) => {

    const [isEditMode, setIsEditMode] = useState(false)
    const [title, setTitle] = useState(data.title)
    
    const refForm = useRef<ElementRef<"form">>(null)
    const refInput = useRef<ElementRef<"input">>(null)

    const { execute } = useAction(updateBoard,{
        onSuccess: (data) =>{
            toast.success(`Board "${data.title}" berhasil diperbarui..!`)
            setTitle(data.title)
            editModeOff()
        },
        onError: (error) => {
            toast.error(error)
        }
    }) 

    const editModeOn = () => {
        setIsEditMode(true)

        setTimeout(() => {
            refInput.current?.focus()
            refInput.current?.select()
        });
    }

    const editModeOff = () => {
        setIsEditMode(false)
    }

    const onSubmit = (formData: FormData) =>{
        const title = formData.get("title") as string
        
        execute({
            title,
            id: data.id
        })
    }

    const onBlur = () =>{
        refForm.current?.requestSubmit()
    }

    if(isEditMode){
        return(
            <form
                ref={refForm}
                action={onSubmit}
                className="
                    flex
                    gap-x-2
                    items-center
                "
            >
                <InputForm 
                    id="title"
                    ref={refInput}
                    onBlur={onBlur}
                    defaultValue={title}
                    className="
                        h-7
                        px-[7px]
                        py-1
                        text-lg
                        font-bold
                        bg-transparent
                        border-none
                        focus-visible:outline-none
                        focus-visible:ring-transparent
                    "
                />
            </form>
        )
    }

    return (
        <Button
            onClick={editModeOn}
            variant="transparent"
            className="
                w-auto
                h-auto
                p-1
                px-2
                font-bold
                text-lg
            "
        >
            { title }
        </Button>
    );
}
 
export default TitleBoard;