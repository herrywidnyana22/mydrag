'use client'

import AddListForm from "./addListForm"
import ListItem from "./listItem"

import { List } from "@prisma/client"
import { useEffect, useState } from "react"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
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
        <DragDropContext
            
            onDragEnd={() =>{}}
        >
            <Droppable
                droppableId="list"
                type="list"
                direction="horizontal"
            >

                {
                    (provided) => (
                        <ol
                            {...provided.droppableProps}
                            ref={provided.innerRef}
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
                        { provided.placeholder }
                        <AddListForm/>
                        <div
                            className="
                                flex-shrink-0
                                w-1
                            "
                        />
                        </ol>

                    )
                }
            </Droppable>
        </DragDropContext>
    );
}
 
export default ContainerList