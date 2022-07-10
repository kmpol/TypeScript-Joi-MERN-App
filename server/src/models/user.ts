import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUser, IUserDocument, IUserModel } from '../interfaces/user';

const UserSchema: Schema<IUserDocument> = new Schema({
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
    tokens: [
        {
            token: { type: String },
        },
    ],
});

UserSchema.statics.findByCredentials = async function (
    username: string,
    password: string
) {
    const user: IUserDocument = await this.findOne({ username });
    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
        throw new Error('Unable to login');
    }
    return user;
};

UserSchema.statics.isEmailTaken = async function (
    email: string
): Promise<boolean> {
    const user: IUserDocument = await this.findOne({ email });
    if (user) throw new Error('Email is taken already');
    return false;
};

UserSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign(
        { _id: this.id.toString() },
        process.env.JWT_SECRET as string
    );

    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
};

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
});

const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default User;
