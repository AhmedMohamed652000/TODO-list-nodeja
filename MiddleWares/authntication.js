import { verify } from "jsonwebtoken";
export default (request, response, next) => {
  try {
    let token = request.get("authorization").split(" ")[1];
    let decodedToken = verify(token, process.env.SECRET_KEY);
    request.userInfo = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};



