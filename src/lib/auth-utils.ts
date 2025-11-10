
export type UserRole = "ADMIN" | "PATIENT" | "DOCTOR";

export type RouteConfig ={
  exact : string[],
  patterns : RegExp[],
};

export const authRoutes = ["/login", "/register", "forget-password", "/reset-password"];

export const commonProtectedRoutes : RouteConfig = {
  exact : ["/my-profile", "/setting"],
  patterns : []
}


export const doctorProtectedRoutes : RouteConfig = {
  patterns : [/^\/doctor/],
  exact : [],  // "/assistance"
}

export const adminProtectedRoutes : RouteConfig = {
  patterns : [/^\/admin/],
  exact : [],  // "/admins"
}


export const patientProtectedRoutes : RouteConfig = {
  patterns : [/^\/dashboard/],
  exact : [],  // "/dashnoard"
}


export const isAuthRoutes = (pathname : string) =>{
  return authRoutes.some((route) => route === pathname)
}


export const isRoutesMatches = (pathname : string, routes: RouteConfig) : Boolean =>{
  if(routes.exact.includes(pathname)){
    return true;
  }

  return routes.patterns.some((pattern : RegExp) => pattern.test(pathname))
}


export const getRouteOwner = (pathname : string) : "ADMIN" | "PATIENT" | "DOCTOR" | "COMMON" | null =>{

  if(isRoutesMatches(pathname,adminProtectedRoutes)){
    return "ADMIN";
  }

  if(isRoutesMatches(pathname,doctorProtectedRoutes)){
    return "DOCTOR";
  }

  if(isRoutesMatches(pathname,patientProtectedRoutes)){
    return "PATIENT";
  }


  if(isRoutesMatches(pathname,commonProtectedRoutes)){
    return "COMMON";
  }

  return null;
}


export const getDefaultDashboardRoute = (role : UserRole) : string =>{

  if(role === "ADMIN"){
    return "/admin/dashboard";
  }
  if(role === "DOCTOR"){
    return "/doctor/dashboard";
  }
  if(role === "PATIENT"){
    return "/dashboard";
  }
  return "/";
}


 export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}
