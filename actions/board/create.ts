"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { InputCreate, ReturnTypeCreate } from "./types"
import { revalidatePath } from "next/cache"
import { createAction } from "@/lib/createAction"
import { initCreateBoard } from "./init"

const handler = async (data: InputCreate): Promise<ReturnTypeCreate> =>{
    const { userId, orgId } = auth()

    if(!userId || !orgId){
        return {
            error: "Anda tidak memiliki akses!"
        }
    }

    const { title, image } = data
                                
    // value={`${imageItem.id}|${imageItem.urls.thumb}|${imageItem.urls.full}|${imageItem.links.html}|${imageItem.user.name}`}
    const [
        imageId,
        imageUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
    ] = image.split("|")

    if(!imageId || !imageUrl || !imageFullUrl || !imageLinkHTML || !imageUserName){
        return {
            error: "Gambar tidak ditemukan. Gagal menambahkan Project baru"
        }
    }

    let QueryCreateBoard

    try {
        QueryCreateBoard = await db.board.create({
            data:{
                title,
                orgId,
                imageId,
                imageUrl,
                imageFullUrl,
                imageLinkHTML,
                imageUserName,

            }
        })
    } catch (error) {
        return{
            error: "Gagal menambahkan data.."
        }
    }

    revalidatePath(`/board/${QueryCreateBoard.id}`)

    return { 
        data: QueryCreateBoard 
    }
}

export const addBoard = createAction(initCreateBoard, handler)