'use client'

import InputForm from "@/components/form/inputForm"
import ListOptionMenu from "./listOptionMenu"

import { updateList } from "@/actions/list/update"
import { useAction } from "@/hooks/action"
import { List } from "@prisma/client"
import { ElementRef, useRef, useState } from "react"
import { useEventListener } from "usehooks-ts"
import { toast } from "sonner"

const ListHeader = ({dataList}: {dataList: List}) => {
    
    const [title, setTitle] = useState(dataList.title)
    const [isEditMode, setIsEditMode] = useState(false)

    const refForm = useRef<ElementRef<"form">>(null)
    const refInput = useRef<ElementRef<"input">>(null)

    const { execute, fieldError } = useAction(updateList,{
        onSuccess(data) {
            toast.success(`Judul List diubah menjadi ${dataList.title}`)
            setTitle(data.title)
            editModeOFF()
        },

        onError:(errorMsg) =>{
            toast.error(errorMsg)
        }
    })

    const onSubmit = (formData: FormData) =>{
        const title = formData.get("title") as string
        const id = formData.get("id") as string
        const boardID = formData.get("boardID") as string

        if(title === dataList.title) {
            return editModeOFF()
        }

        execute({ id, title, boardID })
    }

    const onBlur = () =>{
        refForm.current?.requestSubmit()
    }


    const editModeON = () =>{
        setIsEditMode(true)
        setTimeout(() => {
            refInput.current?.focus()
            refInput.current?.select()
        });
    }

    const editModeOFF = () =>{
        setIsEditMode(false)
    }

    const onKeyboardPress = (e:KeyboardEvent) =>{
        if(e.key === "Escape"){
            refForm.current?.requestSubmit()
        }
    }

    useEventListener("keydown", onKeyboardPress)

    return (
        <div
            className="
                flex
                gap-x-2
                justify-between
                items-start
                px-2
                pt-2
                font-semibold
                text-sm
            "
        >
            {
                isEditMode
                ?   (
                        <form 
                            action={onSubmit}
                            ref={refForm}
                            className="
                                flex-1
                                px-[2px]
                            "
                        >
                            <input 
                                type="hidden"
                                id="id"
                                name="id"
                                value={dataList.id}
                            />
                            <input 
                                type="hidden"
                                id="boardID"
                                name="boardID"
                                value={dataList.boardID}
                            />
                            <InputForm
                                id="title"
                                ref={refInput}
                                placeholder="Masukkan judul board"
                                onBlur={onBlur}
                                defaultValue={title}
                                className="
                                    h-7
                                    px-[7px]
                                    py-1
                                    text-sm
                                    font-medium
                                    border-transparent
                                    transition
                                    truncate
                                    bg-transparent
                                    hover:border-input
                                    focus:border-input
                                    focus:bg-white
                                "
                            />
                            <button type="submit" hidden/>
                        </form>
                    )
                :   (
                        <div
                            onClick={editModeON}
                            className="
                                w-full
                                h-7
                                px-3
                                py-1
                                font-medium
                                text-sm
                                border-transparent
                            "
                        >
                            {dataList.title}
                        </div>
                        
                    )
            }

            <ListOptionMenu
                data={dataList}
                onCreateCard={() =>{}}
            />
        </div>
    )
}

export default ListHeader
