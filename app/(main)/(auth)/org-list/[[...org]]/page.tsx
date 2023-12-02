import { OrganizationList } from "@clerk/nextjs";

const OrgListPage = () => {
    return ( 
        <OrganizationList
            hidePersonal
            afterCreateOrganizationUrl="/organization/:id"
            afterSelectOrganizationUrl="/organization/:id"
        />
     );
}
 
export default OrgListPage;