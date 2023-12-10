"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { revalidatePath } from "next/cache"
import { createAction } from "@/lib/createAction"
import { AddBoard } from "./init"

const handler = async (data: InputType): Promise<ReturnType> =>{
    const { userId } = auth()

    if(!userId){
        return {
            error: "Akses dibatasi!"
        }
    }

    const { title } = data

    let QueryCreateBoard

    try {
        QueryCreateBoard = await db.board.create({
            data:{
                title: title
            }
        })
    } catch (error) {
        return{
            error: "Gagal menambahkan data.."
        }
    }

    revalidatePath(`/board/${QueryCreateBoard.id}`)
    return { data: QueryCreateBoard }
}

export const addBoard = createAction(AddBoard, handler)