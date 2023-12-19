"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { InputCreate, ReturnTypeCreate } from "./types"
import { revalidatePath } from "next/cache"
import { createAction } from "@/lib/createAction"
import { initCreateCard } from "./init"

const handler = async (data: InputCreate): Promise<ReturnTypeCreate> =>{
    const { userId, orgId } = auth()

    if(!userId || !orgId){
        return {
            error: "Anda tidak memiliki akses!"
        }
    }

    const { title, boardID, listID } = data
                                
    let QueryCreateCard

    try {
        const dataList = await db.list.findUnique({
            where:{
                id: listID,
                board:{
                    orgId
                }
            }
        })

        if(!dataList) return { error: "Data list tidak ditemukan..."}

        const lastCard = await db.card.findFirst({
            where:{
                listID
            },
            orderBy:{
                position: 'desc'
            },
            select:{
                position: true
            }
        })

        const newCardPosition = lastCard
        ? lastCard.position + 1
        : 1

        QueryCreateCard = await db.card.create({
            data:{
                title,
                listID,
                position: newCardPosition
            }
        })

    } catch (error) {
        return{
            error: "Gagal menambahkan data.."
        }
    }

    revalidatePath(`/board/${boardID}`)

    return { 
        data: QueryCreateCard
    }
}

export const addCard = createAction(initCreateCard, handler)