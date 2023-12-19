'use client'

import { ElementRef, useRef, useState } from "react"
import ListHeader from "./listHeader"

import { ListWithCard } from "@/types"
import FormCard from "./formCard"

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
    <li
        className="
            w-[270px]
            h-full
            shrink-0
            select-none
        "
    >
      <div
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

export default ListItem
