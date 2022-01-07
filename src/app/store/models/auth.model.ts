export interface UserItem {
    isSignedIn: boolean;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
}

export interface UserLogin{
    username: string,
    password: string
}