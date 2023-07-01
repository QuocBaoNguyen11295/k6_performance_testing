import {getUser,createUser,deleteUser,updateUser} from './helper/common_functions.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// Common things

// Test setup
export let options = {
    stages: [
        { duration: '2m', target: 10 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        { duration: '5m', target: 10 }, // stay at 100 users for 10 minutes.
        { duration: '6m', target: 0 }, // ramp-down to 0 users.
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