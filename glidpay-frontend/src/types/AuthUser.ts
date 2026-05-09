// What is sent to the backend when a user tries to log in
export type LoginRequest = {
    username: string;
    password: string;
}

// What the backend sends back when a user successfully logs in 
export type LoginResponse = {
    token: string;
    token_type: string;
    user: string;
}

// What the backend sends back when a user tries to log in but fails
export type LoginErrorResponse = {
    detail: string;
}