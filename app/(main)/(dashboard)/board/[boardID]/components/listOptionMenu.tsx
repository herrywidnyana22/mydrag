'use client'

import { deleteList } from "@/actions/list/delete";
import ButtonForm from "@/components/form/buttonForm";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/action";
import { List } from "@prisma/client";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Copy, MoreHorizontal, Plus, Trash2, X } from "lucide-react";
import { copyList } from "@/actions/list/copy";

interface ListOptionMenuProps{
    data: List
    onCreateCard: () => void
}

const ListOptionMenu = ({data, onCreateCard}: ListOptionMenuProps) => {
    const refClose = useRef<ElementRef<"button">>(null)

    const { execute: goDelete } = useAction(deleteList, {
        onSuccess(data) {
            toast.success(`List ${data.title} berhasil dihapus`)
            refClose.current?.click()
        },
        onError: (errorMsg) =>{
            toast.error(errorMsg)
        }
    })

    const { execute: goCopy } = useAction(copyList, {
        onSuccess(data) {
            toast.success(`List ${data.title} disalin`)
            refClose.current?.click()
        },
        onError: (errorMsg) =>{
            toast.error(errorMsg)
        }
    })

    const onDelete = (formData: FormData) =>{
        const id = formData.get("id") as string
        const boardID = formData.get("boardID") as string

        goDelete({id, boardID})
    }

    const onCopy = (formData: FormData) =>{
        const id = formData.get("id") as string
        const boardID = formData.get("boardID") as string

        goCopy({id, boardID})
    }
    

    return ( 
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
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
                        pb-4
                        text-center
                        text-sm
                        font-medium
                        text-neutral-600
                    "
                >
                    List Actons
                </div>
                <PopoverClose ref={refClose} asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="
                            absolute
                            w-auto
                            h-auto
                            top-2
                            right-2
                            p-2
                            text-rose-500
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
                    variant="ghost"
                    onClick={onCreateCard}
                    className="
                        w-full
                        h-auto
                        justify-start
                        p-2
                        px-5
                        space-x-2
                        font-normal
                        text-sm
                        rounded-none
                    "
                >
                    <Plus
                        className="
                            w-4
                            h-4
                        "
                    />
                    <p>Tambah Baru</p>
                </Button>

                <form action={onCopy}>
                    <input id="id" name="id" value={data.id} hidden/>
                    <input id="boardID" name="boardID" value={data.boardID} hidden/>
                    <ButtonForm
                        varian="ghost"
                        className="
                            w-full
                            h-auto
                            justify-start
                            p-2
                            px-5
                            space-x-2
                            font-normal
                            text-sm
                            rounded-none
                        "
                    >
                        <Copy
                            className="
                                w-4
                                h-4
                            "
                        />
                        <p>Salin list ini</p>
                    </ButtonForm>
                </form>
                <Separator/>
                <form action={onDelete}>
                    <input id="id" name="id" value={data.id} hidden/>
                    <input id="boardID" name="boardID" value={data.boardID} hidden/>
                    <ButtonForm
                        varian="ghost"
                        className="
                            w-full
                            h-auto
                            justify-start
                            p-2
                            px-5
                            space-x-2
                            font-normal
                            text-muted-foreground
                            text-sm
                            rounded-none
                            hover:bg-rose-700
                            hover:text-white
                        "
                    >
                        <Trash2
                            className="
                                w-4
                                h-4
                            "
                        />
                        <p>Delete list ini</p>
                    </ButtonForm>
                </form>
            </PopoverContent>
        </Popover>
    )
}
 
export default ListOptionMenu;