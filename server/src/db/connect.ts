import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () => {
    await connect(process.env.DB_URL as string);
};

export default connectDb;
