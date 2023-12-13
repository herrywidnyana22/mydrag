import { HelpCircle, User2 } from "lucide-react";
import { HoverMe } from "@/components/HoverMe";
import { PopoverForm } from "@/components/form/popover";

const ProjectList = () => {
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
 
export default ProjectList;