import express from 'express';
import fileUpload from 'express-fileupload';
import {SERVER_PORT, SERVER_PORT_SSL} from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import https from 'https';
import fs from 'fs';
import cors from 'cors';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public portSSL: number;
    public io: socketIO.Server;
    private httpServer: http.Server;
    // @ts-ignore
    private httpsServer: https.Server;

    private constructor() {
        let options: any = {
            key: new Buffer(''),
            cert: new Buffer(''),
        };
        try {        
            options.key = fs.readFileSync("/etc/letsencrypt/archive/www.qbit.ryd.com.co-0001/privkey9.pem");
            options.cert = fs.readFileSync("/etc/letsencrypt/archive/www.qbit.ryd.com.co-0001/fullchain9.pem");
        } catch (e) {

        }
        this.app = express();
        this.app.use( cors({
                origin: '*',
                credentials: false,
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
                preflightContinue: true,
            })
        );

        this.app.use(fileUpload());
        this.app.use('/profiles', express.static('uploads/profiles'));
        this.app.use('/vehicles', express.static('uploads/vehicles'));
        this.app.use('/documents', express.static('uploads/documents'));
        this.port = SERVER_PORT;
        this.portSSL = SERVER_PORT_SSL;
        this.httpServer = new http.Server( this.app );
        console.log('http server running on port ' + this.port);
        try {
            this.httpsServer = https.createServer( options, this.app );
            console.log('https server running on port ' + this.port);
            this.io = socketIO( this.httpsServer );
        } catch (e) {
            this.io = socketIO( this.httpServer );
        }
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }



    start( callback: Function ) {
        this.httpServer.listen( this.port );
        try {
            this.httpsServer.listen( this.portSSL );
        } catch (e) {

        }
    }

}
