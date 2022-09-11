import {Request, response, Response, Router} from "express";
import {tokenVerify} from "../middlewares/auth.middleware";
import {UserController} from "../controller/user.controller";
import {FieldNotSentException} from "../exceptions/field-not-sent.exception";


const userRouter = Router();

userRouter.post('/show', tokenVerify, async (req: Request, res: Response ) => {
    const currentUser: any = req.headers.currentUserTx;
    const userId: any = parseInt(currentUser.id, 10);

    const userController = new UserController(currentUser);
    try {
        const user = await userController.get(userId);
        return res.status(200)
            .json({
                ok: true,
                err: null,
                user,
            });

    } catch (e: any) {
      return res.status(e.code)
          .json(e);
    }

});

userRouter.post('/setLocation', tokenVerify, async (req: Request, res: Response ) => {
    const currentUser: any = req.headers.currentUserTx;
    const body = req.body;

    const latitude = body.latitude;
    if (!latitude) {
        const exceptionError = new FieldNotSentException('latitude').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }
    const longitude = body.longitude;
    if (!longitude) {
        const exceptionError = new FieldNotSentException('longitude').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }

    const userController = new UserController(currentUser);
    try {
        const user = await userController.setLocation(latitude, longitude);
        return res.status(200)
            .json({
                ok: true,
                err: null,
                user,
            });

    } catch (e: any) {
      return res.status(e.code)
          .json(e);
    }

});


userRouter.post('/uploadFrontDocumentImage', tokenVerify, async (req: Request, res: Response ) => {
    const currentUser: any = req.headers.currentUserTx;
    if(req.files){
        const documentFrontImage = req.files.fileName;
        if (!documentFrontImage) {
            const exceptionError = new FieldNotSentException('documentFrontImage').getError();
            return res.status(<number>exceptionError.code)
                .json(exceptionError);
        }

        const userController = new UserController(currentUser);
        try {
            await userController.uploadDocumentFrontImage(documentFrontImage);
            return res.status(200)
                .json({
                    ok: true,
                    err: null,
                });

        } catch (e: any) {
        return res.status(e.code)
            .json(e);
        }
    }
});

userRouter.post('/uploadBackDocumentImage', tokenVerify, async (req: Request, res: Response ) => {
    const currentUser: any = req.headers.currentUserTx;
    if(req.files){
        const documentBackImage = req.files.fileName;
        if (!documentBackImage) {
            const exceptionError = new FieldNotSentException('documentBackImage').getError();
            return res.status(<number>exceptionError.code)
                .json(exceptionError);
        }
        const userController = new UserController(currentUser);
        try {
            await userController.uploadDocumentBackImage(documentBackImage);
            return res.status(200)
                .json({
                    ok: true,
                    err: null,
                });

        } catch (e: any) {
        return res.status(e.code)
            .json(e);
        }
    }
});

userRouter.post('/passwordChange', tokenVerify, async (req: Request, res: Response ) => {
    const currentUser: any = req.headers.currentUserTx;
    console.log(req.headers, 'headers');

    console.log(currentUser, 'current')
    const oldPassword = req.body.oldPassword;
    if (!oldPassword) {
        const exceptionError = new FieldNotSentException('oldPassword').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }
    const newPassword = req.body.newPassword;
    if (!newPassword) {
        const exceptionError = new FieldNotSentException('newPassword').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }

    console.log(oldPassword, newPassword);

    const userController = new UserController(currentUser);
    try {
        await userController.changePassword(oldPassword, newPassword);
        return res.status(200)
            .json({
                ok: true,
                err: null,
            });

    } catch (e: any) {
        return res.status(e.code)
            .json(e);
    }

});

export default userRouter;
