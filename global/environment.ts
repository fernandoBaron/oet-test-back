import {Options, Sequelize} from "sequelize";
import fs from 'fs';

const settingsFile = fs.readFileSync('settings.conf', { encoding: 'utf-8'});
const settings = JSON.parse(settingsFile);

export const SERVER_PORT: number = 5300;
export const SERVER_PORT_SSL: number = 5301;
export const TOKEN_SEED = settings.token_seed;

const options: Options = {
    database: settings.database,
    username: settings.username,
    password: settings.password,
    dialect: 'mariadb',
    dialectOptions: {connectTimeout: 1000, useUTC: false, timezone: 'America/Bogota'}, // mariadb connector option
    timezone: 'America/Bogota',
};

export const sequelizeConnection = new Sequelize(options);
