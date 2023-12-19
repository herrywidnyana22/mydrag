import { z } from "zod"
import { List } from "@prisma/client"
import { initCreateList, initDeleteList, initUpdateList } from "./init"
import { ActionState } from "@/lib/createAction"

export type InputCreate = z.infer<typeof initCreateList>
export type InputUpdate = z.infer<typeof initDeleteList>
export type InputDelete = z.infer<typeof initUpdateList>

export type ReturnTypeCreate = ActionState<InputCreate, List>
export type ReturnTypeUpdate = ActionState<InputUpdate, List>
export type ReturnTypeDelete = ActionState<InputDelete, List>
