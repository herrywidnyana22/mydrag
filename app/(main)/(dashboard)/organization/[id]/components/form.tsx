"use client"

import InputForm from "@/components/form/inputForm"

import { ValidateState, createBoard } from "@/actions/board/add"
import { useAction } from "@/hooks/action"
import { addBoard } from "@/actions/board/handler"
import ButtonForm from "@/components/form/buttonForm"

export const Form = () => {
    const { execute, fieldError } = useAction(addBoard, {
        onSuccess: (data) => {
            console.log(data, "SUCCESS")
        },
        onError: (error) =>{
            console.log(error)
        }
    })

    const onSubmit = (data: FormData) =>{
        const title = data.get("title") as string

        execute({title})
    }
    const initialState = { error: {}, message: null} as ValidateState
    return(
        <form action={onSubmit}>
            <div
                className="
                    flex
                    gap-2
                "
            >
                <InputForm
                    id="title"
                    label="Project Title"
                    error={fieldError}
                />
                <ButtonForm>
                    save
                </ButtonForm>
            </div>
        </form>
    )
}