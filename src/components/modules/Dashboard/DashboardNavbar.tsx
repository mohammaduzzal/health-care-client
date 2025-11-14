import { getUserInfo } from "@/services/auth/getUserInfo"
import DashboardNavbarContent from "./DashboardNavbarContent"
import { userInterface } from "@/types/userTypes";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { NavSection } from "@/types/dashboard.interface";
import { getNavItemsByRole } from "@/lib/navItems.config";

const DashboardNavbar = async() => {

   const userInfo = (await getUserInfo()) as userInterface;
    const navItems : NavSection[] = getNavItemsByRole(userInfo.role);
   const dashboardHome = getDefaultDashboardRoute(userInfo.role);


  return <DashboardNavbarContent 
  userInfo={userInfo}
  navItems={navItems}
  dashboardHome={dashboardHome}
  />
}

export default DashboardNavbar