export class CommonHelper {

    generateNumberBetween(min: number, max: number) {
        return Math.round(Math.random() * (max - min) + min);
    }


};
