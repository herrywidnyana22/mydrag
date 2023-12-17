'use client'

import InputForm from "@/components/form/inputForm";
import ListWrapper from "./ListWarpper";
import ButtonForm from "@/components/form/buttonForm";

import { Plus, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const ListForm = () => {
    const [isEditMode, setIsEditMode] = useState(false)

    const urlName = useParams()

    const refForm = useRef<ElementRef<"form">>(null)
    const refInput = useRef<ElementRef<"input">>(null)

    const editModeON = () =>{
        setIsEditMode(true)
        setTimeout(() => {
            refInput.current?.focus()
        });
    }
    
    const editModeOFF = () =>{
        setIsEditMode(false)
    }

    const onKeyPress = (e:KeyboardEvent) =>{
        if(e.key === "Escape"){
            editModeOFF()
        }
    }

    useEventListener("keydown", onKeyPress)
    useOnClickOutside(refForm, editModeOFF)

    if(isEditMode){
        return(
            <ListWrapper>
                <form
                    ref={refForm}
                    className="
                        w-full
                        space-y-4
                        p-3
                        rounded-md
                        shadow-md
                        bg-white
                    "
                >
                    <InputForm
                        id="title"
                        ref={refInput}
                        placeholder="Masukkan judul List..."
                        className="
                            h-7
                            px-2
                            py-2
                            font-medium
                            text-sm
                            border-transparent
                            hover:border-input
                            focus:border-input
                            transition
                        "
                    />
                    <input
                        name="boardID"
                        value={urlName.boardId}
                        hidden
                    />

                    <div
                        className="
                            flex
                            justify-between
                            items-center
                            gap-x-1
                        "
                    >
                        <ButtonForm
                        
                        >
                            Tambah List Baru
                        </ButtonForm>
                        <Button
                            onClick={editModeOFF}
                            size="sm"
                            variant="ghost"
                        >
                            <X
                                className="
                                    w-5
                                    h-5
                                    text-rose-500
                                "
                            />
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>
            <form
                ref={refForm}
                className="
                    w-full
                    space-y-4
                    p-3
                    shadow-sm
                    rounded-md
                    bg-white
                "
            >
                <button
                    onClick={editModeON}
                    className="
                        flex
                        w-full
                        items-center
                        rounded-md
                        font-medium
                        text-sm
                        transition
                        bg-white
                        hover:bg-white/50
                    "
                >
                    <Plus
                        className="
                            w-4
                            h-4
                            mr-2
                        "
                    />
                    Tambah List
                </button>
            </form>
        </ListWrapper>
    );
}
 
export default ListForm;