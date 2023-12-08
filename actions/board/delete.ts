"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"


export const deleteBoard = async(id: string) =>{
    await db.board.delete({
        where:{
            id: id 
        }
    })

    revalidatePath("/organization/org_2Z0DNNjcFeoKuV1kuXbaKxS3Ffe")
}
