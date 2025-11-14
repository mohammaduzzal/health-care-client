"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LogoutSuccessToast = () => {

    const searchParam = useSearchParams();
    const router = useRouter();

    useEffect(()=>{

        if(searchParam.get("loggedout") === "true"){
            toast.success("You have been logged out successfully.");


            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete("loggedout");
            router.replace(newUrl.toString())

        }

    },[searchParam,router])

  return null;
  
}

export default LogoutSuccessToast