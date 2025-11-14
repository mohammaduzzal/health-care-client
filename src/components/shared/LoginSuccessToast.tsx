"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LoginSuccessToast = () => {

    const searchParam = useSearchParams();
    const router = useRouter();

    useEffect(() => {

        if (searchParam.get("loggedIn") === "true") {
            toast.success("You have been loggedin successfully.");

            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete("loggedIn");
            router.replace(newUrl.toString())
        }

    }, [searchParam])

    return null;

}

export default LoginSuccessToast;

