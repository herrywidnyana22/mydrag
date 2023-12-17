import { Board } from "@prisma/client";
import TitleBoard from "./board-title";
import OpsiBoard from "./opsi-board";

interface NavbarBoardProps{
    data: Board
}

const NavbarBoard = async({
    data
}: NavbarBoardProps) => {

    return (
        <div
            className="
                fixed
                flex
                w-full
                h-14
                gap-x-4
                top-14
                items-center
                z-[40]
                px-6
                text-white
                bg-black/50
            "
        >
            <TitleBoard 
                data={data}
            />
            <div
                className="
                    ml-auto
                "
            >
                <OpsiBoard
                    id={data.id}
                />
                
            </div>
        </div>
    );
}
 
export default NavbarBoard;