"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { InputDelete, ReturnTypeDelete } from "./types"
import { revalidatePath } from "next/cache"
import { createAction } from "@/lib/createAction"
import { initCopyList } from "./init"

const handler = async(data: InputDelete): Promise<ReturnTypeDelete> =>{
    const { userId, orgId } = auth()

    if(!userId || !orgId){
        return{
            error: "Anda tidak memiliki akses!"
        }
    }

    const { id, boardID } = data

    let queryCopy

    try {
        const dataListToCopy = await db.list.findUnique({
            where: {
                id,
                boardID,
                board:{
                    orgId
                }
            },
            include:{
                card: true
            }
        })

        if(!dataListToCopy) return { error: "List tidak ditemukan"}

        const lastList = await db.list.findFirst({
            where:{
                boardID
            },
            orderBy:{
                position: 'desc'
            },
            select:{
                position: true
            }
        })

        const newCardPosition = lastList 
        ? lastList.position + 1
        : 1
        
        queryCopy = await db.list.create({
            data:{
                boardID: dataListToCopy.boardID,
                title: `${dataListToCopy.title} - Copy`,
                position: newCardPosition,
                card:{
                    createMany:{
                        data: dataListToCopy.card.map((cardItem) => ({
                            title: cardItem.title,
                            desc: cardItem.desc,
                            position: cardItem.position
                        }))
                    }
                }
            }, include:{
                card: true
            }
        })

    } catch (e) {
        return{
            error: "Gagal menyalin list..!"
        }
    }

    revalidatePath(`/board/${boardID}`)
    return { data: queryCopy }
}

export const copyList = createAction(initCopyList, handler)