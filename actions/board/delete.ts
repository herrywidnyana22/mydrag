"use server"

import { auth } from "@clerk/nextjs"
import { InputDelete, ReturnTypeDelete } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createAction } from "@/lib/createAction"
import { initDeleteBoard } from "./init"
import { redirect } from "next/navigation"

const handler = async(data: InputDelete): Promise<ReturnTypeDelete> =>{
    const { userId, orgId } = auth()

    if(!userId || !orgId){
        return{
            error: "Anda tidak memiliki akses!"
        }
    }

    const { id } = data


    try {
        await db.board.delete({
            where:{
                id, 
                orgId
            }
        })
    } catch (e) {
        return{
            error: "Gagal menghapus data..!"
        }
    }

    revalidatePath(`/organization/${orgId}`)
    redirect(`/organization/${orgId}`)
}

export const deleteBoard = createAction(initDeleteBoard, handler)