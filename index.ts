import Server from './server/server';
import bodyParser from 'body-parser';
import userRouter from "./router/user.router";
import securityRouter from "./router/security.router";
import {sequelizeConnection} from "./global/environment";
import vehicleRouter from './router/vehicle.router';

const server = Server.instance;

// BodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// CORS

sequelizeConnection.sync();

//Services Routing
server.app.use('/app/users/', userRouter);
server.app.use('/app/vehicles/', vehicleRouter);
server.app.use('/', securityRouter);

server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});

