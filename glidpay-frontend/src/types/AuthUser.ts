// What is sent to the backend when a user tries to log in
export type LoginRequest = {
    username: string;
    password: string;
}