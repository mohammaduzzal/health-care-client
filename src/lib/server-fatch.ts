import { getCookie } from "@/services/auth/tokenHandlers";

const BACKEND_API_URL = process.env.
NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";


export const serverFatchHelper = async(endpoint : string, options : RequestInit) : Promise<Response> =>{

    const {headers, ...restOptions} = options;

    // const accessToken = await getCookie("accessToken");
 
    const response = await fetch(`${BACKEND_API_URL}${endpoint}`,{
        headers :{
            ...headers,
              // ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
            // ...(accessToken ? { "Authorization": accessToken } : {}),
            // Cookie: accessToken ? `accessToken=${accessToken}` : "",
        },
        ...restOptions

    })


    return response;
} 



export const serverFetch = {
    get : async(endpoint : string, options : RequestInit = {}) : Promise<Response> => serverFatchHelper(endpoint, {...options, method : "GET"}),


    post : async(endpoint : string, options : RequestInit = {}) : Promise<Response> => serverFatchHelper(endpoint, {...options, method : "POST"}),

    put : async(endpoint : string, options : RequestInit = {}) : Promise<Response> => serverFatchHelper(endpoint, {...options, method : "PUT"}),

    patch : async(endpoint : string, options : RequestInit = {}) : Promise<Response> => serverFatchHelper(endpoint, {...options, method : "PATCH"}),


    delete : async(endpoint : string, options : RequestInit = {}) : Promise<Response> => serverFatchHelper(endpoint, {...options, method : "DELETE"}),
}


/**
 * 
 * serverFetch.get("/auth/me")
 * serverFetch.post("/auth/login", { body: JSON.stringify({}) })
 */