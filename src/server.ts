import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

let server: Server;

let PORT = config.port;
let MONGO_URL = config.database_url;

if (!MONGO_URL) {
    throw new Error('Database URL is not defined in config.');
}

async function main() {
    try {
        await mongoose.connect(MONGO_URL!);

        console.log('Connected to MongoDB using Mongoose');

        server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();
