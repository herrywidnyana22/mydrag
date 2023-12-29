'use client'

import ValidateMsg from "@/components/form/validateMsg"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { KeyboardEventHandler, forwardRef } from "react"
import { useFormStatus } from "react-dom"

interface TextAreaProps{
    id: string
    label?: string
    defaultValue?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    validateMsg?: Record<string, string[] | undefined>
    className?: string
    onBlur?: () => void
    onClick?: () => void
    onKeyboardPress?: KeyboardEventHandler<HTMLTextAreaElement> | undefined
}

const TextAreaCard = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
    id,
    label,
    defaultValue,
    placeholder,
    required,
    disabled,
    validateMsg,
    className,
    onBlur,
    onClick,
    onKeyboardPress
}, ref) => {

    const { pending } = useFormStatus()
    
    return (
        <div
            className="
                w-full
                space-y-2
            "
        >
            <div
                className="
                    w-full
                    space-y-1
                "
            >
                {
                    label
                    ?   (
                            <Label
                                htmlFor={id}
                                className="
                                    text-xs
                                    font-semibold
                                    text-neutral-700
                                "
                            >
                                {label}
                            </Label>
                        )
                    : null
                }
                <Textarea
                    id={id}
                    name={id}
                    ref={ref}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onClick={onClick}
                    onBlur={onBlur}
                    onKeyDown={onKeyboardPress}
                    required={required}
                    disabled={disabled || pending}
                    aria-describedby={`${id}-error`}
                    className={cn(`
                        shadow-sm
                        outline-none
                        resize-none
                        ring-0
                        focus:ring-0
                        focus-visible:ring-0
                        focus-visible:ring-offset-0`,
                        className
                    )}
                />
            </div>
            <ValidateMsg
                id={id}
                error={validateMsg}
            />
        </div>
    )
})

TextAreaCard.displayName = "TextAreaCard"
 
export default TextAreaCard;