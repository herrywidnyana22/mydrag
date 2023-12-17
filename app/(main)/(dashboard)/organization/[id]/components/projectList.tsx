import Link from "next/link";

import { HelpCircle, User2 } from "lucide-react";
import { HoverMe } from "@/components/HoverMe";
import { PopoverForm } from "@/components/form/popover";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectList = async() => {
    const { orgId } = auth()

    if(!orgId) {
        return redirect("/org-list")
    }

    const boardData = await db.board.findMany({
        where: {
           orgId, 
        },
        orderBy:{
            createdAt: "desc"
        }
    })

    return ( 
        <div
            className="
                space-y-4
            "
        >
            <div
                className="
                    flex
                    items-center
                    text-lg
                    font-semibold
                    text-neutral-700
                "
            >
                <User2
                    className="
                        w-6
                        h-6
                        mr-2
                    "
                />
                Your Project
            </div>
            <div
                className="
                    grid
                    grid-cols-2
                    gap-4
                    sm:grid-cols-3
                    lg:grid-cols-4
                "
            
            >
                {
                    boardData.map((item, i) => (
                        <Link
                            key={item.id}
                            href={`/board/${item.id}`}
                            style={{backgroundImage: `url(${item.imageUrl})`}}
                            className="
                                group
                                relative
                                w-full
                                h-full
                                p-2
                                aspect-video
                                bg-no-repeat
                                bg-center
                                bg-cober
                                rounded-sm
                                overflow-hidden
                                bg-sky-700
                            "
                        >
                            <div
                                className="
                                    absolute
                                    inset-0
                                    transition
                                    bg-black/30
                                    group-hover:bg-black/40
                                "   
                            />
                            <p
                                className="
                                    relative
                                    font-semibold
                                    text-sm
                                    text-white
                                "
                            >
                                {item.title}
                            </p>
                        </Link>
                    ))
                }
                <PopoverForm
                    position="right"
                    gap={10}
                >
                    <div
                        role="button"
                        className="
                            relative
                            w-full
                            h-full
                            flex
                            flex-col
                            gap-y-1
                            justify-center
                            items-center
                            aspect-video
                            rounded-sm
                            bg-muted
                            transition
                            hover:opacity-75
                        "
                    >
                        <p className="text-sm font-bold">
                            Buat project baru
                        </p>
                        <span className="text-xs">5 Slot tersisa</span>
                        <HoverMe
                            gap={40}
                            text={`Free Member hanya dapat menambahkan sampai maksimal 5 project. Untuk unlimited 
                                project silahkan upgrade dan menjadi member.
                            `}
                        >
                            <HelpCircle
                                className="
                                    absolute
                                    w-[14px]
                                    h-[14px]
                                    right-2
                                    bottom-2
                                "
                            />
                        </HoverMe>
                    </div>
                </PopoverForm>
            </div>
        </div>
     );
}

ProjectList.Skeleton = function SkeletonProjectList() {
    return(
        <div
            className="
                grid
                grid-cols-2
                gap-4
                sm:grid-cols-3
                lg:grid-cols-4
            "
        >
            <Skeleton 
                className="
                    w-full
                    h-full
                    aspect-video
                    p-2
                "
            />
            <Skeleton 
                className="
                    w-full
                    h-full
                    aspect-video
                    p-2
                "
            />
            <Skeleton 
                className="
                    w-full
                    h-full
                    aspect-video
                    p-2
                "
            />
            <Skeleton 
                className="
                    w-full
                    h-full
                    aspect-video
                    p-2
                "
            />
            <Skeleton 
                className="
                    w-full
                    h-full
                    aspect-video
                    p-2
                "
            />
            <Skeleton 
                className="
                    w-full
                    h-full
                    aspect-video
                    p-2
                "
            />
            <Skeleton 
                className="
                    w-full
                    h-full
                    aspect-video
                    p-2
                "
            />
            <Skeleton 
                className="
                    w-full
                    h-full
                    aspect-video
                    p-2
                "
            />
        </div>
    )
}

 
export default ProjectList;