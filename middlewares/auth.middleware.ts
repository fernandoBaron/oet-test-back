import jwt from "jsonwebtoken";
import {TOKEN_SEED} from "../global/environment";
import {Request, Response} from "express";
import User from "../models/user.model";

export function tokenVerify (req: Request, res: Response, next: any) {
    const token: string = <string>req.headers.token;
    jwt.verify(token, TOKEN_SEED, async (err: any, decoded: any) => {
        if(err) {
            res.status(401)
                .json({
                    ok: false,
                    err: 'invalid token',
                    details: err,
                });
        } else {
            console.log('entra')
            const email = decoded.userDB.email;
            const user = await User.findOne({where: {'email': email }});
            if (user !== null) {
                // @ts-ignore
                req.headers.currentUserTx = user;
                next();
            } else {
                res.status(401)
                    .json({
                        ok: false,
                        err: 'invalid token',
                        details: err,
                    });
            }
        }
    })
}
