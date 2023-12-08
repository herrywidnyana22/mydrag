"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

export type ValidateState = {
    error?: {
        title?: string[]
    },
    message?: string | null
}

const create = z.object({
    title: z.string()
        .min(3, {
            message: "Masukkan minimal 3 karakter"
        })
})

export const createBoard = async(prevState: ValidateState, formData: FormData) =>{
// export async function createBoard(prevState: State, formData: FormData){
    const validate = create.safeParse({
        title: formData.get("title")
    })

    if(!validate.success){
        return{
            error: validate.error.flatten().fieldErrors,
            message: "Missing fields"
        }
    }

    const { title } = validate.data

    try {
        await db.board.create({
            data: {
                title,
            }
        })        
    } catch (error) {
        return{
            message: "Database Error!"
        }
    }

    revalidatePath("/organization/org_2Z0DNNjcFeoKuV1kuXbaKxS3Ffe")
    redirect("/organization/org_2Z0DNNjcFeoKuV1kuXbaKxS3Ffe")
}