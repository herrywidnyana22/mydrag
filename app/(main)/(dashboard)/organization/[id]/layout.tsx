import { auth } from "@clerk/nextjs";
import { OrgControl } from "./components/orgControl";
import { startCase } from "lodash";


export async function generateMetadata() {
    const { orgSlug } = auth()

    return{
        title: startCase(orgSlug || "organization")
    }
}

const OrgIdLayout = ({children} :{
    children: React.ReactNode
}) => {
    return ( 
        <>
            <OrgControl/>
            {children}
        </>
     );
}
 
export default OrgIdLayout;