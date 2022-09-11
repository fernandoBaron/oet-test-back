import {DataTypes, Model} from "sequelize";
import {sequelizeConnection} from "../global/environment";
import User from './user.model';

export interface VehicleInterface {
    id?: number | null;
    userId: number;
    plate: string;
    model: number;
    configuration: string;
    carBodywork: string;
    vehiclePicture: string;
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;


}

export default class Vehicle extends Model implements VehicleInterface {

    public id?: number;
    public userId!: number;
    public plate!: string;
    public model!: number;
    public configuration!: string;
    public carBodywork!: string;
    public vehiclePicture!: string;
    public createdBy!: string;
    public updatedBy!: string;
    public deletedBy!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt!: Date;

}

Vehicle.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: User,
                key: 'id'
            }
        },
        plate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        model: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        configuration: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        carBodywork: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        vehiclePicture: {
            type: DataTypes.STRING,
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
        tableName: 'vehicles',
        paranoid: true,
        timestamps: true,
        sequelize: sequelizeConnection,
    }
);
Vehicle.belongsTo(User, {
    foreignKey: 'userId',
    as: 'UserId'
})


