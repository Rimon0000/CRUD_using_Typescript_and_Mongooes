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

  export const userServices = {
    createUserIntoDb,
    getAllUsersFromDb

    
  }