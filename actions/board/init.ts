import { z } from "zod"

export const initCreateBoard = z.object({
    title: z.string({
        required_error: "Wajib diisi!",
        invalid_type_error: "Wajib diisi"
    }).min(3, {
        message: "Masukkan minimal 3 karakter!"
    }),
    
    image: z.string({
        required_error: "Gambar wajib diupload!",
        invalid_type_error: "Gambar wajib diupload!"
    }),
})

export const initUpdateBoard = z.object({
    title: z.string({
        required_error: "Wajib diisi!",
        invalid_type_error: "Wajib diisi"
    }).min(3, {
        message: "Masukkan minimal 3 karakter!"
    }),

    id: z.string()
})

export const initDeleteBoard = z.object({
    id: z.string()
})
