import {Request, Response, Router} from "express";
import {tokenVerify} from "../middlewares/auth.middleware";
import {FieldNotSentException} from "../exceptions/field-not-sent.exception";
import { VehicleController } from "../controller/vehicle.controller";
import { Console } from 'console';

const vehicleRouter = Router();

vehicleRouter.get('/', tokenVerify, async (req: Request, res:Response) => {
    const currentUser: any = req.headers.currentUserTx;


    const vehicleController = new VehicleController(currentUser);
    try {
        const vehicles = await vehicleController.showAll();
        return res.status(200)
            .json({
                ok: true,
                err: null,
                vehicles,
            });
    } catch (e) {
        return res.status(400)
            .json(e)
    }
});

vehicleRouter.post('/add', tokenVerify, async (req: Request, res: Response ) => { 
    const currentUser: any = req.headers.currentUserTx;
    const body = JSON.parse(req.body.vehicle);
    const plate = body.plate;
    if (!plate) {
        const exceptionError = new FieldNotSentException('plate').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }
    console.log(plate, 'PLACA')
    const model = body.model;
    if (!model) {
        const exceptionError = new FieldNotSentException('model').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }
    console.log(model, 'MODEL')
    const configuration = body.configuration;
    if (!configuration) {
        const exceptionError = new FieldNotSentException('configuration').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }
    console.log(configuration, 'CONF')
    const carBodywork = body.carBodywork;
    if (!carBodywork) {
        const exceptionError = new FieldNotSentException('carBodywork').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }
    console.log(carBodywork, 'CAR')
    if(req.files){
        const vehiclePicture = req.files.fileName;
        if (!vehiclePicture) {
            const exceptionError = new FieldNotSentException('vehiclePicture').getError();
            return res.status(<number>exceptionError.code)
                .json(exceptionError);
        }
    

        const vehicleController = new VehicleController(currentUser);
        try {
            const vehicle = await vehicleController.add(plate, model, configuration, carBodywork, vehiclePicture);
            return res.status(200)
                .json({
                    ok: true,
                    err: null,
                    message: 'Vehicle created successfully',
                    vehicle
                });
        } catch (e: any) {
            return res.status(e.code)
                .json(e);
        }
    }
});


vehicleRouter.post('/:vehicleId/show', tokenVerify, async (req:Request, res: Response) => {
    const currentUser: any = req.headers.currentUserTx;
    const vehicleId = parseInt(req.params.vehicleId, 10);

    if (!vehicleId) {
        const exceptionError = new FieldNotSentException('vehicleId').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }

    const vehicleController = new VehicleController(currentUser)
    try {
        const vehicle = await vehicleController.show(vehicleId);
        return res.status(200)
            .json({
                ok: true,
                err: 'Ok',
                vehicle,
            });
    } catch (e) {
        return res.status(400)
            .json(e);
    }

});

vehicleRouter.post('/:vehicleId/delete', tokenVerify, async (req: Request, res: Response) => {
    const currentUser: any = req.headers.currentUserTx
    const vehicleId = parseInt(req.params.vehicleId, 10);
    const vehicleController = new VehicleController(currentUser);
    try {
        await vehicleController.delete(vehicleId);
        return res.status(200)
            .json({
                ok: true,
                err: 'ok'
            });
    } catch (e: any) {
        return res.status(e.code)
            .json(e)
    }
});

export default vehicleRouter;
