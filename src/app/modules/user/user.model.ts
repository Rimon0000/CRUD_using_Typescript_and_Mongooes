import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrders, TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>({
    firstName: {type: String, required: [true, 'firstName is required']},
    lastName: {type: String, required: [true, 'lastName is required']}
})

const addressSchema = new Schema<TAddress>({
    street: {type: String, required: [true, 'street is required']},
    city: {type: String, required: [true, 'city is required']},
    country: {type: String, required: [true, 'country is required']}
})

const ordersSchema = new Schema<TOrders>({
    productName: {type: String},
    price: {type: Number},
    quantity: {type: Number}
})


const userSchema = new Schema<TUser, UserModel>({
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
    address: {type: addressSchema,  required: [true, 'Address is required']},
    orders: { type: [ordersSchema] },
})

  //creating a custom static method
  userSchema.statics.isUserExists = async function (userId: number) {
    const existingUser = await User.findOne({ userId });
    return existingUser;
  };


//pre save middleware/ hook: will work on create(), save()
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; //doc

    //hashing password and save into DB
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
    //remove orders
    user.$set('orders', undefined);
    next();
  });


//creating model
export const User = model <TUser, UserModel>('User', userSchema)
