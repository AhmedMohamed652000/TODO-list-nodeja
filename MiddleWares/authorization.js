export const allowedTo = (...roles) => {
    return (request, response, next) => {
        if (roles.includes(userInfo.isFound.role)) {
            next();
        } else {
            let error = new Error("not Authorized");
            error.status = 403;
            next(error);
        }
    }
}