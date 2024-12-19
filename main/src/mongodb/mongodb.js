const { default: mongoose } = require("mongoose")

const connectMongoDB = async (retries = 5, delay = 5000) => {
    while (retries) {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            mongoose.set('debug', process.env.NODE_ENV === 'development');
            console.log(`Connected To The Mngodb at ${mongoose.connection.host}:${mongoose.connection.port}`);
            break;
        } catch (error) {
            console.error(`MongoDb Connection Faild. Retries Left: ${retries - 1}`);
            retries -= 1;
            if (!retries) {
                console.error("MongDB Conncetion unsuccessfull after multiple attemps: ", error.message);
                process.exit(1);
            }
            await new Promise((res) => setTimeout(res, delay));
        }
    }

}

export default connectMongoDB;
export { connectMongoDB };
