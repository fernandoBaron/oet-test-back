import {Options, Sequelize} from "sequelize";
import fs from 'fs';

const settingsFile = fs.readFileSync('settings.conf', { encoding: 'utf-8'});
const settings = JSON.parse(settingsFile);

export const SERVER_PORT: number = Number( process.env.PORT ) || 5500;
export const SERVER_PORT_SSL: number = Number( process.env.PORT ) || 5501;
export const TOKEN_SEED = settings.token_seed;

const options: Options = {
    host: settings.host,
    port: settings.port,
    database: settings.database,
    username: settings.username,
    password: settings.password,
    dialect: 'mariadb',
    dialectOptions: {connectTimeout: 1000, useUTC: false, timezone: 'America/Bogota'}, // mariadb connector option
    timezone: 'America/Bogota',
};

export const sequelizeConnection = new Sequelize(options);
