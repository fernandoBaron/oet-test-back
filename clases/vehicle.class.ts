import { VehicleNotFoundException } from "../exceptions/Vehicle-not-found.exception";
import Vehicle from "../models/vehicle.model";
import { UploadedFile } from 'express-fileupload';
import { CriptoHelper } from "../helper/cripto.helper";


export class VehicleClass {

    private vehicle: Vehicle | undefined;
    private readonly currentUserEmail: string;

    constructor(currentUserEmail: string) {
        this.currentUserEmail = currentUserEmail;
    }

    //Finders

    async showAllByUserId(userId: any) {
        const vehicles = Vehicle.findAll({
            where: {
                userId
            },
            include: [
                {
                    association: 'UserId'
                }
            ]
        });
        return vehicles;
    }

    async findById(vehicleId: number) {
        const vehicle = await Vehicle.findOne( {
            where: {
                id: vehicleId
            },
            include: [
                {
                    association: 'UserId'
                }
            ]
        });
        if (!vehicle) {
            throw new VehicleNotFoundException().getError();
        }
        this.vehicle = vehicle;
    }

    public async findByPlate(plate: string) {
        const vehicle = await Vehicle.findOne({
            where: {
                plate
            }
        });
        if (!vehicle) {
            throw new VehicleNotFoundException().getError();
        }
        this.vehicle = vehicle;
    }

    //Getters

    getVehicle(): any {
        if (!this.vehicle) {
            throw new VehicleNotFoundException().getError();
        }
        return this.vehicle;
    }

    //Functionality

    async addNewVehicle(plate: string, model: number, configuration: string,
                        carBodywork: string, vehiclePicture: UploadedFile, userId: any) {
        console.log('entra a la clase', plate, model, configuration, carBodywork, vehiclePicture, userId)
                            const vehicle = await Vehicle.build({
            plate: plate,
            model: model,
            userId: userId,
            configuration: configuration,
            carBodywork: carBodywork,  
            vehiclePicture: await this.uploadNewFile(vehiclePicture, 'uploads/vehicles/'),
            createdBy: this.currentUserEmail,
            createdAt: new Date(),
        });
        console.log('pasa el build')
        this.vehicle = vehicle;
        console.log('asigna')
        await this.vehicle.save();
    }

    async delete() {
        if (!this.vehicle) {
            throw new VehicleNotFoundException().getError();
        }
        this.vehicle.deletedAt = new Date();
        this.vehicle.deletedBy = this.currentUserEmail;
        this.vehicle.save();
        this.vehicle.destroy();
    }


    uploadNewFile(image: UploadedFile, folder: string){
        const filename = image.name;
            const filenameArray = filename.split(".");
            const cryptoHelper = new CriptoHelper();
            const hashName = cryptoHelper.getHashHex();
            const newName = hashName + '.' + filenameArray[filenameArray.length - 1];
            console.log(newName); console.log(`${folder}` + newName)
            return new Promise(async(resolve, reject) => {
                image.mv(`${folder}` + newName, (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(newName);
                    }
                });
            });
    }   
}

