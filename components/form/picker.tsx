'use client'

import Image from "next/image"

import { useEffect, useState } from "react"
import { unsplash } from "@/lib/unsplash"
import { toast } from "sonner"
import { Check, Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"
import { cn } from "@/lib/utils"
import { defaultImage } from "@/constants/images"
import Link from "next/link"
import ValidateMsg from "./validateMsg"


interface PickerProps{
    id: string
    validateMsg?: Record<string, string[] | undefined>
}

const Picker = ({id, validateMsg}: PickerProps) => {
    const [image, setImage] = useState<Array<Record<string, any>>>(defaultImage)
    const [isLoading, setIsLoading] = useState(true)
    const [imageId, setImageId] = useState(null)

    const { pending } = useFormStatus()

    useEffect(() => {
        const fetchImage = async () =>{
            try {
                throw new Error("unsplash Error")
                const result = await unsplash.photos.getRandom({
                    collectionIds: ["540986"],
                    count: 9
                })

                if(result && result.response){
                    const resultImage = (result.response as Array<Record<string, any>>)
                    setImage(resultImage)
                } else {
                    console.log("Gagal mendapatkan foto dari Unsplash")
                    toast.error("Gagal mendapatkan foto dari Unsplash")
                }

            } catch (error) {
                console.log(error)
                // setImage([])
                setImage(defaultImage)
            } finally{
                setIsLoading(false)
            }
        }

        fetchImage()

    },[])

    if(isLoading){
        return(
            <div
                className="
                    flex
                    justify-center
                    items-center
                    p-6
                "
            >
                <Loader2
                    className="
                        w-6
                        h-6
                        text-sky-700
                        animate-spin
                    "
                />
            </div>
        )
    }

    return (
        <div
            className="relative"
        >
            <div 
                className="
                    grid
                    grid-cols-3
                    gap-2
                    mb-2
                "
            >
                {
                    image.map((imageItem) =>(
                        <div
                            key={imageItem.id}
                            className={cn(`
                                relative
                                group 
                                aspect-video
                                cursor-pointer
                                transtion
                                bg-muted
                                hover:opacity-75`,
                                pending &&
                                "opacity-50 cursor-auto"
                            
                            )}
                            onClick={() =>{
                                if(!pending) {
                                    setImageId(imageItem.id)
                                }
                            }}
                        >
                            <input
                                id={id}
                                name={id}
                                type="radio"
                                checked={imageId === imageItem.id}
                                disabled={pending}
                                value={`${imageItem.id}|${imageItem.urls.thumb}|${imageItem.urls.full}|${imageItem.links.html}|${imageItem.user.name}`}
                                className="hidden"
                                />
                            <Image
                                alt="image"
                                src={imageItem.urls.thumb}
                                fill
                                className="
                                    object-cover
                                    rounded-sm
                                "
                            />
                            {
                                imageId === imageItem.id && (
                                    <div
                                        className="
                                            absolute
                                            flex
                                            w-full
                                            h-full
                                            justify-center
                                            items-center
                                            inset-y-0
                                            bg-black/30
                                        "
                                    >
                                        <Check 
                                            className="
                                                w-4
                                                h-4
                                                text-white
                                            "
                                        />
                                    </div>
                                )
                            }
                            <Link
                                href={imageItem.links.html}
                                target="_blank"
                                className="
                                    absolute
                                    w-full
                                    bottom-0
                                    p-1
                                    text-[10px]
                                    opacity-0
                                    truncate
                                    text-white
                                    bg-black/50
                                    hover:underline
                                    group-hover:opacity-100
                                "
                            >
                                {imageItem.user.name}
                            </Link>
                        </div>
                    ))
                }
            </div>
            <ValidateMsg
                id={"image"}
                error={validateMsg}
            />
        </div>
    );
}
 
export default Picker;