import { deleteBoard } from "@/actions/board/delete"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { DeleteForm } from "./deleteForm"

interface BoardProps{
    title: string
    id: string
}

const Board = ({title, id}: BoardProps) =>{
    const deleteBoardById = deleteBoard.bind(null, id)
    return(
        <form
            action={deleteBoardById} 
            className="
                flex
                gap-x-2
                items-center
            "
        >
            <p>
                Board title : { title }
            </p>
            <DeleteForm/>
        </form> 
    )
}

export default Board