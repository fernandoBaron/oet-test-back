import { UserSocket } from './userSocket';
import User from "../models/user.model";


export class UserSocketsAdministrator {

    private list: UserSocket[] = [];
    private static _instance: UserSocketsAdministrator;

    private constructor() { }

    public newConnection(user: UserSocket ) {
        console.log('===== Conectando Usuario ====');
        this.list.push( user );
        return user;
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    public updateUser(id: string, email: string, user: User ) {
        for( let userSocket of this.list ) {
            if ( userSocket.getId() === id ) {
                userSocket.setEmail(email);
                userSocket.setUser(user);
                console.log('===== Actualizando usuario ====');
                break;
            }
        }
    }

    public getList() {
        return this.list.filter( user => user.getEmail() !== 'pending-email' );
    }

    public getUserSocket(id: string ) {
        return this.list.find( socket => socket.getId() === id );
    }

    public deleteUser(id: string ) {
        const tempUser = this.getUserSocket( id );
        this.list = this.list.filter( user => {
            if (user.getId() === id) {
                const userObj = user.getUser();
                if(userObj) {
                }
                console.log('===== Desconectando usuario ====');
            }
            return user.getId() !== id;
        } );
        return tempUser;
    }


}