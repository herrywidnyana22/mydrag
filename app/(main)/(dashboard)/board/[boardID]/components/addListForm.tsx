'use client'

import InputForm from "@/components/form/inputForm";
import ListWrapper from "./listWrapper";
import ButtonForm from "@/components/form/buttonForm";

import { Plus, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/action";
import { addList } from "@/actions/list/create";
import { toast } from "sonner";

const AddListForm = () => {
    const [isEditMode, setIsEditMode] = useState(false)

    const urlName = useParams()
    const router = useRouter()

    const refForm = useRef<ElementRef<"form">>(null)
    const refInput = useRef<ElementRef<"input">>(null)

    const { execute, fieldError }= useAction(addList, {
        onSuccess: (data) =>{
            toast.success(`List ${data.title} berhasil ditambahkan`)
            editModeOFF()
            router.refresh()
        },
        onError: (errorMsg) =>{
            toast.error(errorMsg)
        }
    })

    const onSubmit = (formData: FormData) =>{
        const title = formData.get("title") as string
        const boardID = formData.get("boardID") as string

        execute({
            title,
            boardID
        })
    }


    const editModeON = () =>{
        setIsEditMode(true)
        setTimeout(() => {
            refInput.current?.focus()
        });
    }
    
    const editModeOFF = () =>{
        setIsEditMode(false)
    }

    const onKeyboardPress = (e:KeyboardEvent) =>{
        if(e.key === "Escape"){
            editModeOFF()
        }
    }

    useEventListener("keydown", onKeyboardPress)
    useOnClickOutside(refForm, editModeOFF)

    if(isEditMode){
        return(
            <ListWrapper>
                <form
                    action={onSubmit}
                    ref={refForm}
                    className="
                        w-full
                        space-y-4
                        p-2
                        rounded-md
                        shadow-md
                        bg-white
                    "
                >
                    <InputForm
                        id="title"
                        ref={refInput}
                        placeholder="Masukkan judul List..."
                        validateMsg={fieldError}
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
                        value={urlName.boardID}
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
                            className="
                                text-rose-500
                            "
                        >
                            <X
                                className="
                                    w-5
                                    h-5                                    
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
                        space-x-2
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
                        "
                    />
                    <p>Tambah List</p>
                </button>
            </form>
        </ListWrapper>
    );
}
 
export default AddListForm;