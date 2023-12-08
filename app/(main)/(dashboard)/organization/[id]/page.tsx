import { createBoard } from "@/actions/board/add";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Board from "./components/board";
import { Form } from "./components/form";

const OrganizationPage = async() => {
    const boardData = await db.board.findMany()

    return ( 
        <div
            className="
                flex
                flex-col
                space-y-4
            "
        >
            <Form/>
            <div
                className="
                    space-y-2
                "
            >
                {
                    boardData.map((boardItem) =>(
                        <Board
                            key={boardItem.id} 
                            id={boardItem.id}
                            title={boardItem.title}
                        />
                    ))
                }
            </div>
        </div>
     );
}
 
export default OrganizationPage;