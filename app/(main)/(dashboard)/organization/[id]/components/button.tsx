import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

export const ButtonForm = () =>{
    const { pending } = useFormStatus()
    return(
        <Button
            type="submit"
            disabled={pending}
        >
            Submit
        </Button>
    )
}