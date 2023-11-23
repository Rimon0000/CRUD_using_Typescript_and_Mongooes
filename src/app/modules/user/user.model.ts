import { Schema, model, connect } from 'mongoose';
import { TAddress, TFullName, TUser } from './user.interface';

const fullNameSchema = new Schema<TFullName>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

const addressSchema = new Schema<TAddress>({
    street: {type: String},
    city: {type: String},
    country: {type: String}
})


const userSchema = new Schema<TUser>({
    userId: {type: Number},
    username: {type: String, required: [true, 'username is required']},
    password: {type: String, required: [true, 'password is required']},
    fullName: {
        type: fullNameSchema,
        required: [true, 'FullName is required'],
        trim: true
    },
    age: {type: Number},
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },
    isActive: {type: Boolean},
    hobbies: [{ type: String }, { type: String }],
    address: {type: addressSchema, required: [true, 'FullName is required']}
})


//creating model
export const User = model <TUser>('User', userSchema)