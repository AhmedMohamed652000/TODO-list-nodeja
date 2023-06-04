import mongoose from "mongoose";

const connectWith_DB_Server = (DB_Url, server, portNumber) => {
    return mongoose.
        connect(DB_Url).
        then(() => {
            server.listen(portNumber, () => {
                console.log('server is  connected');
            })
        }).catch((error) => {
            console.log('connected faild : ' + error);
        })
}
export default connectWith_DB_Server;