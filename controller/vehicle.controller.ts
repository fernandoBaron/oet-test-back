import { VehicleClass } from "../clases/vehicle.class";
import { VehicleExistException } from "../exceptions/vehicle-exist.exception";
import User from "../models/user.model";


export class VehicleController {

    private currentUser: User;
    constructor(currentUser: User) {
        this.currentUser = currentUser;
    }

    async showAll() {
        const vehicleClass = new VehicleClass(this.currentUser.email);
        const userId = this.currentUser.id;
        return await vehicleClass.showAllByUserId(userId);

    }

    async add(plate: string, model: number, configuration: string, 
              carBodywork: string, vehiclePicture: any) {
        const vehicleClass = new VehicleClass(this.currentUser.email);
        const userId = this.currentUser.id;
        console.log('entra al controller', userId);
        try {
            await vehicleClass.findByPlate(plate);
        } catch (e) {
            await vehicleClass.addNewVehicle(plate, model, configuration, 
                                carBodywork, vehiclePicture, userId);
            return vehicleClass.getVehicle();
        }
        throw new VehicleExistException().getError();
    }

    async show(vehicleId: number) {
        const vehicleClass = new VehicleClass(this.currentUser.email);
        await vehicleClass.findById(vehicleId);
        return vehicleClass.getVehicle();
    }

    async delete(vehicleId: number) {
        const vehicleClass = new VehicleClass(this.currentUser.email);
        await vehicleClass.findById(vehicleId)
        await vehicleClass.delete();
    }   

}
