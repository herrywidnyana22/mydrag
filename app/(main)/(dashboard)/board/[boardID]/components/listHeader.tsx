'use client'

import InputForm from "@/components/form/inputForm"
import { List } from "@prisma/client"
import { ElementRef, useRef, useState } from "react"

const ListHeader = ({dataList}: {dataList: List}) => {
    
    const [title, setTitle] = useState(dataList.title)
    const [isEditMode, setIsEditMode] = useState(false)

    const refForm = useRef<ElementRef<"form">>(null)
    const refInput = useRef<ElementRef<"input">>(null)

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

    return (
        <div
            className="
                flex
                gap-x-2
                justify-between
                items-start
                px-1
                pt-2
                font-semibold
                text-sm
            "
        >
        {
            isEditMode
            ?   (
                    <form 
                        action=""
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
                            onBlur={() =>{}}
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
                        {title}
                    </div>
                )
        }
            
        </div>
    )
}

export default ListHeader
