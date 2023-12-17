import { z } from "zod"
import { Board } from "@prisma/client"
import { initCreateBoard, initDeleteBoard, initUpdateBoard } from "./init"
import { ActionState } from "@/lib/createAction"

export type InputCreate = z.infer<typeof initCreateBoard>
export type InputUpdate = z.infer<typeof initUpdateBoard>
export type InputDelete = z.infer<typeof initDeleteBoard>

export type ReturnTypeCreate = ActionState<InputCreate, Board>
export type ReturnTypeUpdate = ActionState<InputUpdate, Board>
export type ReturnTypeDelete = ActionState<InputDelete, Board>
