"use server"

import { auth } from "@clerk/nextjs"
import { InputUpdate, ReturnTypeUpdate } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createAction } from "@/lib/createAction"
import { initUpdateList } from "./init"

const handler = async(data: InputUpdate): Promise<ReturnTypeUpdate> =>{
    const { userId, orgId } = auth()

    if(!userId || !orgId){
        return{
            error: "Anda tidak memiliki akses!"
        }
    }

    const { id, title, boardID } = data
    
    let queryUpdate

    try {
        queryUpdate = await db.list.update({
            where:{
                id,
                boardID,
                board:{
                    orgId
                }
            },
            data:{
                title
            }
        })
    } catch (e) {
        return{
            error: "Gagal mengubah data..!"
        }
    }

    revalidatePath(`/board/${boardID}`)

    return { 
        data: queryUpdate 
    }
}

export const updateList = createAction(initUpdateList, handler)