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

// What the backend sends back when a user tries to log in but fails due to too many attempts
export type LoginTooManyAttemptsResponse = {
    detail: string;
    retry_after: number; // in seconds
}

// what the backend sends back when a user tries to log in but fails due to invalid credentials
export type LoginInvalidCredentialsResponse = {
    detail: string;
}

// Register request sent to the backend when a user tries to register
export type RegisterRequest = {
    full_name: string;
    email: string;
    country: string;
    password: string;
    confirm_password: string;
}

// what the backend sends back after successfully registering a user
export type RegisterResponse = {
    message: string;
    user: string;
}