import http from "k6/http";
import { check } from "k6";
// Common requests params
const API_URL = "https://gorest.co.in/public-api";
const API_TOKEN = "YOUR_GOREST_API_TOKEN"; 
const params = { headers: { "Authorization": `Bearer ${API_TOKEN}` } };
 // Random e-mail suffix
let randomInt = Math.floor(Math.random() * 1000000);
export function createUserResponse(){
    let response = http.post(
        `${API_URL}/users`,
        {
            "name": "John Doe",
            "gender": "Male",
            "email": `john.doe+${randomInt}@tsh.io`,
            "status": "Active"
        },
        params
    );
    return response;
} 


export function createUser(){
    // Create user
    check(
        createUserResponse(),
        { "Create user response status code is 200": (r) => r.status == 200 }
    );
}
export function getUser(){
    // Get user 
    let getUserResponse = http.get(
        `${API_URL}/users/${JSON.parse(createUserResponse().body).data.id}`,
        params
    );
    
    check(
        getUserResponse,
        { "Get user response status code is 200": (r) => r.status == 200 }
    );
}
export function updateUser(){
    // Update user
    let patchUserResponse = http.patch(
        `${API_URL}/users/${JSON.parse(createUserResponse().body).data.id}`,
        {
            "gender": "Female"
        },
        params
    );
    
    check(
        patchUserResponse,
        { "Update user response status code is 200": (r) => r.status == 200 }
    );
}
export function deleteUser(){
    // Delete user
    let deleteUserResponse = http.del(
        `${API_URL}/users/${JSON.parse(createUserResponse().body).data.id}`,
        params
    );
    
    check(
        deleteUserResponse,
        { "Delete user response status code is 200": (r) => r.status == 200 }
    );
}