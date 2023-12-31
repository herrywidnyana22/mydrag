import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"

export const Navbar = () => {
  return (
    <nav
        className="
            fixed
            w-full
            h-14
            flex
            items-center
            top-0
            px-4
            z-50
            border-b
            shadow-sm
            bg-white
        "
    >
        {/* Mobile Sidebar */}
        <div
            className="
                flex
                items-center
                gap-x-4
            "
        >
            <div
                className="
                    hidden
                    md:flex
                "
            >
                <Logo/>
            </div>
            <Button
                size="sm"
                variant="thema"
                className="
                    hidden
                    h-auto
                    rounded-md
                    p-2
                    md:flex
                    gap-1
                "
            >
                <Plus
                    className="
                        h-4
                        w-4
                    "
                />
                Buat Baru
            </Button>
            <Button
                size="sm"
                variant="thema"
                className="
                    block
                    rounded-md
                    md:hidden
                "
            >
                <Plus
                    className="
                        h-4
                        w-4
                    "
                />
            </Button>
        </div>

        {/* Organization Option List */}
        <div 
            className="
                flex
                items-center
                gap-x-2
                ml-auto
            "
        >
            <OrganizationSwitcher
                hidePersonal
                afterCreateOrganizationUrl="/organization/:id"
                afterSelectOrganizationUrl="/organization/:id"
                afterLeaveOrganizationUrl="/org-list"
                appearance={{
                    elements:{
                        rootBox:{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }
                    }
                }}  
            />
            <UserButton
                afterSignOutUrl="/"
                appearance={{
                    elements:{
                        avatarBox:{
                            height: "30",
                            width: "30"
                        }
                    }
                }}
            />
        </div>
    </nav>
  )
}