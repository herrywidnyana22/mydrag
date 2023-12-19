"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { InputCreate, ReturnTypeCreate } from "./types"
import { revalidatePath } from "next/cache"
import { createAction } from "@/lib/createAction"
import { initCreateList } from "./init"

const handler = async (data: InputCreate): Promise<ReturnTypeCreate> =>{
    const { userId, orgId } = auth()

    if(!userId || !orgId){
        return {
            error: "Anda tidak memiliki akses!"
        }
    }

    const { title, boardID } = data
                                
    let QueryCreateList

    try {
        console.log(`Board ID : ${boardID}`)
        const boardId = await db.board.findUnique({
            where:{
                id: boardID,
                orgId
            }
        })

        if(!boardId){
            return{
                error: "Board tidak ditemukan"
            }
        }

        const lastList = await db.list.findFirst({
            where:{
                boardID
            },
            orderBy:{
                position: 'asc'
            },
            select:{
                position: true
            }
        })

        const newPosition = lastList 
        ? lastList.position + 1 
        : 1

        QueryCreateList = await db.list.create({
            data:{
                title,
                boardID,
                position: 1
            }
        })
    } catch (error) {
        return{
            error: "Gagal menambahkan data.."
        }
    }

    revalidatePath(`/board/${boardID}`)

    return { 
        data: QueryCreateList 
    }
}

export const addList = createAction(initCreateList, handler)