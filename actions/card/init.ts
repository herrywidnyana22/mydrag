import { z } from "zod"

export const initCreateCard = z.object({
    title: z.string({
        required_error: "Wajib diisi!",
        invalid_type_error: "Wajib diisi"
    }).min(3, {
        message: "Masukkan minimal 3 karakter!"
    }),
    
    boardID: z.string(),
    listID: z.string()
})

export const initUpdateCard = z.object({
    title: z.string({
        required_error: "Wajib diisi!",
        invalid_type_error: "Wajib diisi"
    }).min(3, {
        message: "Masukkan minimal 3 karakter!"
    }),
    
    id: z.string(),
    boardID: z.string()
})

export const initDeleteCard = z.object({
    id: z.string(),
    boardID: z.string()
})

export const initCopyCard = z.object({
    id: z.string(),
    boardID: z.string()
})
