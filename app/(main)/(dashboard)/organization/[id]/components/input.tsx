"use client"

import { ValidateState } from "@/actions/board/add"
import { Input } from "@/components/ui/input"
import { useFormStatus } from "react-dom"

export const InputForm = ({error}: ValidateState) =>{
    const {pending} = useFormStatus()

    return(
        <div>
            <Input
                id="title"
                name="title"
                placeholder="Masukkan judul"
                required
                disabled={pending}
                className="
                    p-1
                    border
                    border-black
                "
            />
            { 
                error?.title 
                ? (
                    <div>
                        {
                            error.title.map((errorItem: string) => (
                                <p
                                    key={errorItem}
                                    className="text-sm text-rose-500"
                                >
                                    { errorItem}
                                </p>
                            ))
                        }
                    </div>
                    )
                : null
            }

        </div>
    )
}