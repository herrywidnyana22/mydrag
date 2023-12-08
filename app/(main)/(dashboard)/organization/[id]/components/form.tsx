"use client"

import { ValidateState, createBoard } from "@/actions/board/add"
import { Button } from "@/components/ui/button"
import { useFormState } from "react-dom"
import { InputForm } from "./input"
import { ButtonForm } from "./button"

export const Form = () => {
    const initialState = { error: {}, message: null} as ValidateState
    const [state, dispatch] = useFormState(createBoard, initialState)
    return(
        <form action={dispatch}>
            <div
                className="
                    flex
                    gap-2
                "
            >
                <InputForm 
                    error={state?.error}
                />
                <ButtonForm/>
            </div>
        </form>
    )
}