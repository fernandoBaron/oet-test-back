import bcrypt from 'bcrypt';
import crypto from 'crypto';

export class CriptoHelper {

    encode(plainSecretWord: string): Promise<string> {
        return new Promise(  (resolve, reject) => {
            bcrypt.hash(plainSecretWord, 10, (err, hash) =>{
                if(err) {
                    reject(err);
                } else {
                    console.log(hash);
                    resolve(hash);
                }
            });
        });
    }

    decode (plainSecretWord: string, encodeSecretWord: any) {
        return new Promise( (resolve, reject) => {
            bcrypt.compare(plainSecretWord, encodeSecretWord,  (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if(result) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    hashCode (plainSecretWord: string, seed = 0) {

        const SALT = this.generateNumberBetween(1, 100000).toString();
        return crypto.createHmac('sha256', SALT)
            .update(plainSecretWord + SALT)
            .digest('hex')
            .substring(0, 20)
            ;

    }

    hashCodeFull (plainSecretWord: string, seed = 0) {

        const SALT = this.generateNumberBetween(1, 100000).toString();
        return crypto.createHmac('sha256', SALT)
            .update(plainSecretWord + SALT)
            .digest('hex')
            ;

    }

    getHashHex() {
        return crypto.createHash('md5').update(new Date().getTime().toString()).digest('hex');
    }

    generateNumberBetween(min: number, max: number) {
        return Math.round(Math.random() * (max - min) + min);
    }


}
//