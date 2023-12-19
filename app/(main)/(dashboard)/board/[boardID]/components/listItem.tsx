'use client'

import ListHeader from "./listHeader"

import { ListWithCard } from "@/types"

interface ListItemProps{
    position: number,
    data: ListWithCard
}

const ListItem = ({position, data}: ListItemProps) => {
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
            dataList={data}
        />
      </div>
    </li>
  )
}

export default ListItem
