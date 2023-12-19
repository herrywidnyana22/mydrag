'use client'

import ListForm from "./listForm"
import ListItem from "./listItem"

import { List } from "@prisma/client"
import { useEffect, useState } from "react"

interface ContainerListProps{
    boardID: string
    data: List[]
}

const ContainerList = ({boardID, data}: ContainerListProps) => {

    const [positionData, setPositionData] = useState(data)

    useEffect(() => {
        setPositionData(data)
    },[data])

    return (
        <ol
            className="
                flex
                h-full
                gap-x-3
            "
        >
            {
                positionData.map((listItem: any, i) =>(
                    <ListItem
                        key={i}
                        position={i}
                        data={listItem}
                    />
                ))
            }
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