"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { InputDelete, ReturnTypeDelete } from "./types"
import { revalidatePath } from "next/cache"
import { createAction } from "@/lib/createAction"
import { initDeleteList } from "./init"

const handler = async(data: InputDelete): Promise<ReturnTypeDelete> =>{
    const { userId, orgId } = auth()

    if(!userId || !orgId){
        return{
            error: "Anda tidak memiliki akses!"
        }
    }

    const { id, boardID } = data

    let queryDelete

    try {
        queryDelete = await db.list.delete({
            where:{
                id,
                boardID,
                board:{
                    orgId
                } 
            }
        })
    } catch (e) {
        return{
            error: "Gagal menghapus data..!"
        }
    }

    revalidatePath(`/board/${boardID}`)
    return { data: queryDelete }
}

export const deleteList = createAction(initDeleteList, handler)