import request from 'supertest';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import app from '../src/app';
import User from '../src/models/user';
import { IUserDocument } from '../src/interfaces/user';

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    email: 'test@gmail.com',
    username: 'test',
    password: 'test123',
    repeatPassword: 'test123',
    tokens: [
        {
            token: jwt.sign(
                { _id: userOneId },
                process.env.JWT_SECRET as string
            ),
        },
    ],
};

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

test('should signup a new user', async () => {
    const response = await request(app)
        .post('/api/users')
        .send({
            email: 'tes@gmail.com',
            username: 'testUsername',
            password: 'iasbd92iadv8aogdbUIYB321a',
            repeatPassword: 'iasbd92iadv8aogdbUIYB321a',
        })
        .expect(201);

    // Checking if db has changed
    // ts ignore -> I know there should be more interfaces, just practicing
    //@ts-ignore
    const user: IUserDocument = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Checking if data in db has correct values
    expect(response.body).toMatchObject({
        user: {
            email: 'tes@gmail.com',
            username: 'testUsername',
        },
        //@ts-ignore
        token: user.tokens[0].token,
    });
});

test('should not signup a new user with already taken email', async () => {
    await request(app)
        .post('/api/users')
        .send({
            email: 'test@gmail.com',
            username: 'safgsaefsesaef',
            password: 'fsaesfaafessfae',
            repeatPassword: 'fsaesfaafessfae',
        })
        .expect(400);
});

test('should not signup a new user with already taken username', async () => {
    await request(app)
        .post('/api/users')
        .send({
            email: 'test_test_test_test@gmail.com',
            username: 'test',
            password: 'test123',
            repeatPassword: 'test123',
        })
        .expect(400);
});

test('should login an existing user', async () => {
    const response = await request(app)
        .post('/api/users/login')
        .send({
            username: userOne.username,
            password: userOne.password,
        })
        .expect(200);

    const user = await User.findOne({ _id: userOneId });
    //@ts-ignore
    expect(response.body.token).toBe(user?.tokens[1].token);
});

test('should not login a not exisiting user', async () => {
    await request(app)
        .post('/api/users/login')
        .send({
            username: 'iamnotexisits',
            password: 'justlikeme',
        })
        .expect(401);
});

test('should not login a user with incorrect password', async () => {
    await request(app)
        .post('/api/users/login')
        .send({
            username: userOne.username,
            password: `${userOne.password}iWillFail`,
        })
        .expect(401);
});

test('should logout a user', async () => {
    await request(app)
        .post('/api/users/logout')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    // Making sure that auth token in db has been removed
    //@ts-ignore
    const user: IUserDocument = await User.findById(userOneId);
    expect(user.tokens).toHaveLength(0);
});

test('should not logout a user with invalid authroziaton token', async () => {
    await request(app)
        .post('/api/users/logout')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}123`)
        .send()
        .expect(401);
});
