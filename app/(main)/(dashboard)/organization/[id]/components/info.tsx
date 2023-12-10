'use client'

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";



const Info = () => {
    const { organization, isLoaded } = useOrganization()
    
    if(!isLoaded){
        return(
            <Info.Skeleton/>
        )
    }

    return ( 
        <div
            className="
                flex
                items-center
                gap-x-4
            "
        >
            <div
                className="
                    relative
                    w-[60px]
                    h-[60px]
                "
            >
                <Image
                    src={organization?.imageUrl!}
                    alt="Project photo profile"
                    fill
                    className="
                        object-cover
                        rounded-md
                    "
                />
            </div>
            <div className="space-y-1">
                <p
                    className="
                        font-semibold
                        text-xl
                    "
                >
                    { organization?.name }
                </p>
                <div
                    className="
                       flex
                       items-center
                       text-xs
                       text-muted-foreground
                    "
                >
                    <CreditCard
                        className="
                            w-3
                            h-3
                            mr-1
                        "
                    />
                    Free
                </div>
            </div>
        </div>
     );
}

const SkeletonInfo = () => {
    return(
        <div
            className="
                flex
                items-center
                gap-x-4
            "
        >
            <div
                className="
                    relative
                    w-[60px]
                    h-[60px]
                "
            >
                <Skeleton
                    className="
                        absolute
                        w-full
                        h-full
                    "
                />
            </div>
            <div
                className="
                    space-y-2
                "
            >
                <Skeleton
                    className="
                        w-[200px]
                        h-10
                    "
                />
                <div    
                    className="
                        flex
                        items-center
                    "
                >
                    <Skeleton 
                        className="
                            w-4
                            h-4
                            mr-2
                        "
                    />
                    <Skeleton 
                        className="
                            w-[100px]
                            h-4
                        "
                    />
                </div>
            </div>
        </div>
    )
}

Info.Skeleton = SkeletonInfo
 
export default Info;