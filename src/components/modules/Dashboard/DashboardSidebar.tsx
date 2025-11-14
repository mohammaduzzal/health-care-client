import { getUserInfo } from "@/services/auth/getUserInfo";
import { userInterface } from "@/types/userTypes";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";


const DashboardSidebar = async() => {

   const userInfo = (await getUserInfo()) as userInterface;


   const navItems : NavSection[] = getNavItemsByRole(userInfo.role);
   const dashboardHome  = getDefaultDashboardRoute(userInfo.role)


  return <DashboardSidebarContent
   userInfo={userInfo}
   navItems={navItems}
   dashboardHome={dashboardHome}
   />
}

export default DashboardSidebar