import {getUser,createUser,deleteUser,updateUser} from '../helper/requests.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// Common things

// Test setup
export let options = {
    stages: [
        { duration: '2m', target: 100 }, // below normal load
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 }, // normal load
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 }, // around the breaking point
        { duration: '5m', target: 300 },
        { duration: '2m', target: 400 }, // beyond the breaking point
        { duration: '5m', target: 400 },
        { duration: '10m', target: 0 }, // scale down. Recovery stage.
    ]
};

// Test scenario
export default function () {
    // Create user
    createUser()
    // Get user 
    getUser()
    // Update user data
    updateUser()
    // Delete user
    deleteUser()
}

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
}