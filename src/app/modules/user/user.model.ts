import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser } from './user.interface';

const fullNameSchema = new Schema<TFullName>({
    firstName: {type: String, required: [true, 'firstName is required']},
    lastName: {type: String, required: [true, 'lastName is required']}
})

const addressSchema = new Schema<TAddress>({
    street: {type: String, required: [true, 'street is required']},
    city: {type: String, required: [true, 'city is required']},
    country: {type: String, required: [true, 'country is required']}
})


const userSchema = new Schema<TUser>({
    userId: {type: Number, unique: true},
    username: {type: String, unique: true, required: [true, 'username is required']},
    password: {type: String, required: [true, 'password is required']},
    fullName: {
        type: fullNameSchema,
        required: [true, 'FullName is required']
    },
    age: {type: Number, required: [true, 'age is required']},
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    isActive: {type: Boolean},
    hobbies: [{ type: String }, { type: String }],
    address: {type: addressSchema,  required: [true, 'Address is required']}
})


//creating model
export const User = model <TUser>('User', userSchema)