import { z } from "zod"

export const initCreateList = z.object({
    title: z.string({
        required_error: "Wajib diisi!",
        invalid_type_error: "Wajib diisi"
    }).min(3, {
        message: "Masukkan minimal 3 karakter!"
    }),
    
    boardID: z.string()
})

export const initUpdateList = z.object({
    title: z.string({
        required_error: "Wajib diisi!",
        invalid_type_error: "Wajib diisi"
    }).min(3, {
        message: "Masukkan minimal 3 karakter!"
    }),
    
    id: z.string(),
    boardID: z.string()
})

export const initDeleteList = z.object({
    id: z.string(),
    boardID: z.string()
})

export const initCopyList = z.object({
    id: z.string(),
    boardID: z.string()
})
