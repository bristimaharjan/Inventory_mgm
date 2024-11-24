const API_BASE_URL="http://localhost:8080";
export async function makeApiCall (endpoint,method ="GET",body =null){
    try{
        const headers ={
            "Content-Type":"application/json",
        };
        const options ={
            method,
            headers,
        };
        if(body){
            options.body =JSON.stringify(body);
        }
        const response = await fetch (`${API_BASE_URL}${endpoint}`,options);
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message ||"API error")
        }
        return await response.json();
    }catch(error){
        console.error(`error in API call to ${endpoint}:`,error);
        throw error;
    }
}
export function getUsers(){
    return makeApiCall("/users/list","GET");
}
export async function login (data){
    console.log("Making api call");
    return await makeApiCall("/auth/login","POST",data);
} 
export async function fetchMenuItems() {
    console.log("Fetching menu items");
    return await makeApiCall("/menu_items/list", "GET");
}
export async function addMenuItems(MenuItem){
    console.log("Adding menu items");
    return await makeApiCall("/menu_items/add","POST",MenuItem);
}

export async function deleteUser(id) {
    return await makeApiCall(`/users/${id}`,"DELETE");
    
}
export async function deleteMenuItem(itemId) {
    return await makeApiCall(`/menu_items/${itemId}`,"DELETE");
    
}
export async function updateMenuItem(itemId) {
    return await makeApiCall(`/menu_items/${itemId}`,"PUT");
    
}




  