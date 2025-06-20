import dotenv from 'dotenv';

dotenv.config();

export default {
    node_env: process.env.NODE_ENV || 'development',
    port: process.env.PORT|| 5000,
    database_url: process.env.DATABASE_URL || 'mongodb+srv://library_management:LGSa2Uk7Nh0OXQ71@cluster0.b5mwu75.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0'
};