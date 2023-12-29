'use client'

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd"

interface CardItemProps{
    position: number
    dataCard: Card
}

const CardItem = ({dataCard, position}: CardItemProps) => {
    return (
        <Draggable
            draggableId={dataCard.id}
            index={position}
        > 
            {
                (provided) =>(
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        role="button"
                        className="
                            px-3
                            py-2
                            truncate
                            border-2
                            border-transparetn
                            rounded-md
                            shadow-sm
                            text-sm
                            bg-white
                            hover:border-black
                        "
                    >
                        {dataCard.title}
                    </div>
                )
            }
        </Draggable>
    );
}
 
export default CardItem;