import { Sidebar } from "../components/Sidebar";

const OrganizationLayout = ({children}: {
    children: React.ReactNode
}) => {
    return ( 
        <main
            className="
                max-w-6xl
                mx-auto
                pt-20
                px-4
                md:pt-24
                2xl:max-w-screen-xl
            "
        >
            <div
                className="
                    flex
                    gap-x-7
                "
            >
                <div 
                    className="
                        hidden
                        w-64
                        shrink-0
                        md:block
                    "
                >
                    <Sidebar/>
                </div>
                { children }

            </div>
        </main>
     );
}
 
export default OrganizationLayout;