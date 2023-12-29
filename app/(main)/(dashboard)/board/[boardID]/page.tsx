import ContainerList from "./components/listContainer";

import { getDataListByBoardID } from "@/actions/list/get";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface BoardPageProps{
    params:{
        boardID: string
    }
}

const BoardIdPage = async({params}: BoardPageProps) => {
    const {orgId} = auth()

    if(!orgId) redirect("org-list")

    const dataList = await getDataListByBoardID(params.boardID, orgId)

    return ( 
        <div
            className="
                h-full
                overflow-x-auto
                p-4
            "
        >
            <ContainerList
                boardID={params.boardID}
                data={dataList}
            />
        </div>
    );
}
 
export default BoardIdPage;