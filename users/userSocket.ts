import User from "../models/user.model";


export class UserSocket {

    private readonly id: string;
    private email: string;
    private room: string;
    private user: User | null = null;

    constructor( id: string ) {
        this.id = id;
        this.email = 'pending-email';
        this.room   = 'no-room';
    }

    getId() {
        return this.id;
    }

    getUser() {
        return this.user;
    }

    setUser(user: User) {
        this.user = user;
    }

    getEmail() {
        return this.email;
    }
    setEmail(email: string) {
        this.email = email;
    }

}