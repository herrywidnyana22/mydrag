import { z } from "zod"
import { Board } from "@prisma/client"
import { AddBoard } from "./init"
import { ActionState } from "@/lib/createAction"

export type InputType = z.infer<typeof AddBoard>
export type ReturnType = ActionState<InputType, Board>