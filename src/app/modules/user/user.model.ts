import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser } from './user.interface';
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

// //creating a custom static method
// userSchema.statics.getUser = async function (userId: string) {
//     const gettingUser = await User.findOne({ userId: userId });
//     return gettingUser;
//   };


//pre save middleware/ hook: will work on create(), save()
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; //doc

    //hashing password and save into DB
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
    //remove password
    user.$set('password', undefined);
    next();
    
  });


  //query middleware
userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });
  



//creating model
export const User = model <TUser>('User', userSchema)