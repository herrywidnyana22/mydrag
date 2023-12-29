import NavbarBoard from "./components/navbarBoard"

import { auth } from "@clerk/nextjs"
import { notFound, redirect } from "next/navigation"
import { getByID } from "@/actions/board/get"


export async function generateMetadata({
    params
} : {
    params: {boardID: string}
}) {
    const { orgId } = auth()

    if(!orgId) return { title: "board"}

    const boardDataByID = await getByID(params.boardID, orgId)

    return{
        title: boardDataByID?.title || "Board"
    }
}

const BoardIdLayout = async({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {boardID: string}
}) =>{

    const { orgId } = auth()

    if(!orgId) return redirect("/org-list")

    const boardDataByID = await getByID(params.boardID, orgId)

    if(!boardDataByID) notFound()

    return(
        <div
            style={{backgroundImage: `url(${boardDataByID.imageFullUrl})`}}
            className="
                realtive
                h-full
                bg-center
                bg-cover
                bg-no-repeat
            "
        >
            <NavbarBoard
                data={boardDataByID}
            />

            <div
                className="
                    absolute
                    inset-0
                    bg-black/20
                "
            />
            <main
                className="
                    relative
                    h-full
                    pt-28
                "
            >
                {children}
            </main>
        </div>
    )
}

export default BoardIdLayout