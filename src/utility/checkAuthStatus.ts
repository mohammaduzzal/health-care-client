 
const checkAuthStatus = async() => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,{
            method : "GET",
            headers: {
            "Content-Type" : 'application/json'
        },
        credentials : "include"
        });

        const data =await res.json();

          if(!res.ok){
            throw new Error("Failed to fetch authentication status.");
        }
        
        return {
            isAuthenticated: true,
            user: data.data,
        }
        
    } catch (error : any) {
        console.log(error.message)
        return{
            isAuthenticated: false,
            user: null,
        }
    }
    
}
 
export default checkAuthStatus;