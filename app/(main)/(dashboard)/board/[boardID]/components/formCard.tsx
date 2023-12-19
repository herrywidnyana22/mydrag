'use client'

import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import TextAreaCard from "./textAreaCard"
import ButtonForm from "@/components/form/buttonForm"
import { useParams } from "next/navigation"
import { useAction } from "@/hooks/action"
import { addCard } from "@/actions/card/create"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { toast } from "sonner"

interface FormCardProps{
    listID : string
    editModeON: () => void
    editModeOFF: () => void
    isEditMode: boolean
}

const FormCard = forwardRef<HTMLTextAreaElement, FormCardProps>(({
    listID,
    editModeON,
    editModeOFF,
    isEditMode
}, ref) => {

    const urlName = useParams()
    const refForm = useRef<ElementRef<"form">>(null)

    const { execute, fieldError } = useAction(addCard, {
        onSuccess: (data) => {
            toast.success(`Card ${data.title} berhasil ditambahkan`)
            refForm.current?.reset()
        },
        onError: (errorMsg) =>{
            toast.error(errorMsg)
        }
    })

    const onKeyboardPress = (e: KeyboardEvent) =>{
        if(e.key === "Escape"){
            editModeOFF()
        }
    }

    useOnClickOutside(refForm, editModeOFF)
    useEventListener("keydown", onKeyboardPress)

    const onTextAreaTrigger: KeyboardEventHandler<HTMLTextAreaElement> = (e) =>{
        if(e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            refForm.current?.requestSubmit()
        }
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string
        const boardID = urlName.boardID as string
        const listID = formData.get("listID") as string

        execute({title, boardID, listID})
    }

    if(isEditMode){
        return(
            <form
                ref={refForm}  
                action={onSubmit}
                className="
                   p-1
                   m-1
                   space-y-4 
                "
            >
                <TextAreaCard
                    id="title"
                    ref={ref}
                    onKeyboardPress={onTextAreaTrigger}
                    placeholder="Masukkan judul card..."
                    validateMsg={fieldError }

                />
                <input
                    id="listID"
                    name="listID"
                    value={listID}
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
                    <ButtonForm>
                        Simpan
                    </ButtonForm>
                    <Button
                        onClick={editModeOFF}
                        size="sm"
                        variant="ghost"
                        className="
                            text-rose-500
                            hover:bg-rose-500
                            hover:text-white
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
        )
    }

    return (
        <div
            className="
                
                pt-2
                
            "
        >
            <Button
                onClick={editModeON}
                variant="ghost"
                size="sm"
                className="
                    w-full
                    h-auto
                    justify-start
                    p-2
                    px-5
                    space-x-2
                    font-normal
                    text-muted-foreground
                    text-sm
                    rounded-none
                    hover:bg-sky-700
                    hover:text-white
                "
            >
                <Plus
                    className="
                        w-4
                        h-4
                        mr-2
                    "
                />
                Tambah Card
            </Button>
        </div>
    );
})

FormCard.displayName = "FormCard"

export default FormCard;