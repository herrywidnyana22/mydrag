"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { revalidatePath } from "next/cache"
import { createAction } from "@/lib/createAction"
import { AddBoard } from "./init"

const handler = async (data: InputType): Promise<ReturnType> =>{
    const { userId, orgId } = auth()

    if(!userId || !orgId){
        return {
            error: "Akses dibatasi!"
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
            error: "Bambar tidak ditemukan. Gagal menambahkan Project baru"
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
    return { data: QueryCreateBoard }
}

export const addBoard = createAction(AddBoard, handler)