import { z } from "zod"
import { Card } from "@prisma/client"
import { initCopyCard, initCreateCard, initDeleteCard, initUpdateCard } from "./init"
import { ActionState } from "@/lib/createAction"

export type InputCreate = z.infer<typeof initCreateCard>
export type InputUpdate = z.infer<typeof initUpdateCard>
export type InputDelete = z.infer<typeof initDeleteCard>
export type InputCopy = z.infer<typeof initCopyCard>

export type ReturnTypeCreate = ActionState<InputCreate, Card>
export type ReturnTypeUpdate = ActionState<InputUpdate, Card>
export type ReturnTypeDelete = ActionState<InputDelete, Card>
export type ReturnTypeCopy = ActionState<InputCopy, Card>
