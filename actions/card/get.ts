import { db } from "@/lib/db"

export const getDataListByBoardID = async(boardID: string, orgId: any) =>{
    return (
        await db.list.findMany({
            where:{
                boardID: boardID,
                board:{
                    orgId
                }
            },
    
            include:{
                card:{
                    orderBy:{
                        position: 'asc'
                    }
                }
            },
    
            orderBy:{
                position: 'asc'
            }
        })
    ) 
}