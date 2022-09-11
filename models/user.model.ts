import {DataTypes, Model} from "sequelize";
import {sequelizeConnection} from "../global/environment";

export interface UserInterface {
    id?: number | null;
    email: string;
    identification: number;
    identificationType: string;
    firstname: string;
    lastname: string;
    phone: number;
    documentFrontImage: any;
    documentBackImage: any;
    password: string;
    latitude: number;
    longitude: number;
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export default class User extends Model implements UserInterface{

    public id?: number;
    public email!: string;
    public identification!: number;
    public identificationType!: string;
    public firstname!: string;
    public lastname!: string;
    public phone!: number;
    public documentFrontImage!: any;
    public documentBackImage!: any;
    public password!: string;
    public latitude!: number;
    public longitude!: number;
    public createdBy!: string;
    public updatedBy!: string;
    public deletedBy!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt!: Date;

}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        identification: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        identificationType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        documentFrontImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        documentBackImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },        
        createdBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deletedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'users',
        paranoid: true,
        timestamps: true,
        sequelize: sequelizeConnection,
    }
);

