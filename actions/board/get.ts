import { db } from "@/lib/db"

export const getByID = async(id: string, orgId: any) =>{
    const boardDataByID = await db.board.findUnique({
        where:{
            id,
            orgId: orgId!
        }
    })

    return boardDataByID
}