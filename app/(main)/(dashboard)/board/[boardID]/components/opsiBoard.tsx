'use client'

import { deleteBoard } from "@/actions/board/delete";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover";
import { useAction } from "@/hooks/action";
import { MoreHorizontal, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface OpsiBoardProps{
    id: string
}

const OpsiBoard = ({id}: OpsiBoardProps) => {

    const { execute, isLoading } = useAction(deleteBoard,{
        onError: (e) =>{
            toast.error(e)
        }
    })

    const onDelete= () =>{
        execute({id})
    }

    return ( 
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="transparent"
                    className="
                        w-auto
                        h-auto
                        p-2
                    "
                >
                    <MoreHorizontal
                        className="
                            w-4
                            h-4
                        "
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side="bottom"
                align="start"
                className="
                    px-0
                    pt-3
                    pb-3
                "
            >
                <div
                    className="
                        pb-6
                        text-center
                        text-sm
                        font-medium
                        text-neutral-600
                    "
                >
                    Board Acrtiobn
                </div>
                <PopoverClose>
                    <Button
                        variant="ghost"
                        className="
                            absolute
                            w-auto
                            h-auto
                            top-2
                            right-2
                            text-rose-600
                            hover:bg-rose-500
                            hover:text-white
                        "
                    >
                        <X
                            className="
                                w-4
                                h-4
                            "
                        />
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onDelete}
                    variant="ghost"
                    disabled={isLoading}
                    className="
                        flex
                        items-center
                        group
                        w-full
                        h-auto
                        p-2
                        px-5
                        justify-start
                        text-sm
                        font-normal
                        rounded-none
                        hover:text-rose-600
                    "
                >
                    <p>
                        Delete Board ini
                    </p>
                    <Trash2
                        className="
                            w-4
                            h-4
                            ml-2
                            opacity-0
                            transition
                            text-rose-600
                            group-hover:opacity-100
                        "
                    />
                </Button>
            </PopoverContent>
        </Popover>
    );
}
 
export default OpsiBoard;