import { Separator } from "@/components/ui/separator";
import Info from "./components/info";
import ProjectList from "./components/projectList";


const OrganizationPage = async() => {

    return ( 
        <div
            className="
                w-full
                mb-20
            "
        >
            <Info/>
            <Separator
                className="
                    my-4
                "
            />
            <div
                className="
                    px-2
                    md:px-4
                "
            >
                <ProjectList/>
            </div>

        </div>
     );
}
 
export default OrganizationPage;