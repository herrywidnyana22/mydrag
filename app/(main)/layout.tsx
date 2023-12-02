import { ClerkProvider } from "@clerk/nextjs"

const MainLayout = ({
    children
}:{
    children: React.ReactNode
}) =>{
    return(
        <ClerkProvider>
            {
                children
            }
        </ClerkProvider>
    )
}

export default MainLayout