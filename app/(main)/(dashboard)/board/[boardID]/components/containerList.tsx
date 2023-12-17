'use client'

import { List } from "@prisma/client"
import ListForm from "./ListForm"

interface ContainerListProps{
    boardID: string
    data: List[]
}

const ContainerList = ({boardID, data}: ContainerListProps) => {
    return (
        <ol>
            <ListForm/>
            <div
                className="
                    flex-shrink-0
                    w-1
                "
            />
        </ol>
    );
}
 
export default ContainerList