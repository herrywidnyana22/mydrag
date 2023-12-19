'use client'

import ListHeader from "./listHeader"
import FormCard from "./formCard"
import CardItem from "./cardItem"

import { ElementRef, useRef, useState } from "react"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { ListWithCard } from "@/types"
import { cn } from "@/lib/utils"


interface ListItemProps{
    position: number,
    data: ListWithCard
}

const ListItem = ({position, data}: ListItemProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const refTextarea = useRef<ElementRef<"textarea">>(null)

  const editModeON = () =>{
    setIsEditMode(true)
    setTimeout(() => {
      refTextarea.current?.focus()
    });
  }

  const editModeOFF = () =>{
    setIsEditMode(false)
  }


  return (
    <Draggable
      draggableId={data.id}
      index={position}
    >
      {
        (provided) => (
          <li
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="
              w-[270px]
              h-full
              shrink-0
              select-none
            "
          >
            <div
              {...provided.dragHandleProps}
              className="
                w-full
                pb-1.5
                shadow-md
                rounded-md
                bg-[#f1f2f4]
              "
            >
              <ListHeader
                onCreateCard={editModeON}
                dataList={data}
              />
              <Droppable
                droppableId={data.id}
                type="card"
              >
                {
                  (provided) => (
                    <ol
                    {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={cn(`
                        flex
                        flex-col
                        gap-y-2
                        p-1
                        mx-1`,
                        data.card.length > 0
                        ? "mt-2"
                        : "mt-0"
                        
                      )}
                    >
                      {
                        data.card.map((cardItem, i) => (
                          <CardItem 
                            key={i}
                            position={i}
                            dataCard={cardItem}
                          />
                        ))
                      }
                      { provided.placeholder }
                    </ol>
                  )
                }
              </Droppable>

              <FormCard
                listID={data.id}
                ref={refTextarea}
                editModeOFF={editModeOFF}
                editModeON={editModeON}
                isEditMode={isEditMode}
              />
            </div>
          </li>
        )
      }
    </Draggable>
  )
}

export default ListItem
