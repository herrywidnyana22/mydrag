import { OrgControl } from "./components/orgControl";

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