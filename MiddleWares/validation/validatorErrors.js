import { validationResult } from "express-validator";

export default (request, response, next) => {
    let result = validationResult(request);
    if (result.errors.length != 0) {
        let stringError = result.errors.reduce((current, object) => {
            return current + object.msg + " ,";
        }, ' ')
        let error = new Error(stringError)
        error.status = 442;
        next(error)

    } else {
        next()
    }

}