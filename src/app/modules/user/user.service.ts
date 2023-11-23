import { TUser } from "./user.interface";
import { User } from "./user.model";


//create user
const createUserIntoDb = async (userData: TUser) => {
    const result = await User.create(userData);
    return result;
  };

//get all user
const getAllUsersFromDb = async () => {
    const result = await User.find();
    return result;
  };

//get single user
const getSingleUserFromDb = async (userId: number) => {
    const result = await User.findOne({userId})
    return result;
  };

  //delete single user
const deleteSingleUserFromDb = async (userId: number) => {
  const result = await User.deleteOne({userId})
  return result;
};

 //update single user
const updateSingleUserFromDb = async (userId: number, userData: any) => {
  const result = await User.updateOne({userId}, userData)
  return result;
};


  export const userServices = {
    createUserIntoDb,
    getAllUsersFromDb,
    getSingleUserFromDb,
    deleteSingleUserFromDb,
    updateSingleUserFromDb
  }